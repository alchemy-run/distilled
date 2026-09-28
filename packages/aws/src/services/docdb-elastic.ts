import type * as HttpClient from "effect/unstable/http/HttpClient";
import type * as redacted from "effect/Redacted";
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
  sdkId: "DocDB Elastic",
  target: "ChimeraDbLionfishServiceLambda",
  version: "2022-11-28",
  sigv4: "docdb-elastic",
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
                `https://docdb-elastic-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://docdb-elastic-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://docdb-elastic.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://docdb-elastic.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
  )<{ readonly message: string }> {}
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
    readonly reason: string;
    readonly fieldList?: ValidationExceptionField[];
  }> {}
export type InputString = string;
export type OptInType = string;
export interface ApplyPendingMaintenanceActionInput {
  resourceArn: string;
  applyAction: string;
  optInType: string;
  applyOn?: string;
}
export interface PendingMaintenanceActionDetails {
  action: string;
  autoAppliedAfterDate?: string;
  forcedApplyDate?: string;
  optInStatus?: string;
  currentApplyDate?: string;
  description?: string;
}
export type PendingMaintenanceActionDetailsList =
  PendingMaintenanceActionDetails[];
export interface ResourcePendingMaintenanceAction {
  resourceArn?: string;
  pendingMaintenanceActionDetails?: PendingMaintenanceActionDetails[];
}
export interface ApplyPendingMaintenanceActionOutput {
  resourcePendingMaintenanceAction: ResourcePendingMaintenanceAction;
}
export type TagKey = string;
export type TagValue = string;
export type TagMap = { [key: string]: string | undefined };
export interface CopyClusterSnapshotInput {
  snapshotArn: string;
  targetSnapshotName: string;
  kmsKeyId?: string;
  copyTags?: boolean;
  tags?: { [key: string]: string | undefined };
}
export type StringList = string[];
export type Status = string;
export type SnapshotType = string;
export interface ClusterSnapshot {
  subnetIds: string[];
  snapshotName: string;
  snapshotArn: string;
  snapshotCreationTime: string;
  clusterArn: string;
  clusterCreationTime: string;
  status: string;
  vpcSecurityGroupIds: string[];
  adminUserName: string;
  kmsKeyId: string;
  snapshotType?: string;
}
export interface CopyClusterSnapshotOutput {
  snapshot: ClusterSnapshot;
}
export type Auth = string;
export type Password = string | redacted.Redacted<string>;
export interface CreateClusterInput {
  clusterName: string;
  authType: string;
  adminUserName: string;
  adminUserPassword: string | redacted.Redacted<string>;
  shardCapacity: number;
  shardCount: number;
  vpcSecurityGroupIds?: string[];
  subnetIds?: string[];
  kmsKeyId?: string;
  clientToken?: string;
  preferredMaintenanceWindow?: string;
  tags?: { [key: string]: string | undefined };
  backupRetentionPeriod?: number;
  preferredBackupWindow?: string;
  shardInstanceCount?: number;
}
export interface Shard {
  shardId: string;
  createTime: string;
  status: string;
}
export type ShardList = Shard[];
export interface Cluster {
  clusterName: string;
  clusterArn: string;
  status: string;
  clusterEndpoint?: string;
  createTime: string;
  adminUserName: string;
  authType: string;
  shardCapacity: number;
  shardCount: number;
  vpcSecurityGroupIds: string[];
  subnetIds: string[];
  preferredMaintenanceWindow: string;
  kmsKeyId: string;
  shards?: Shard[];
  backupRetentionPeriod?: number;
  preferredBackupWindow?: string;
  shardInstanceCount?: number;
}
export interface CreateClusterOutput {
  cluster: Cluster;
}
export interface CreateClusterSnapshotInput {
  clusterArn: string;
  snapshotName: string;
  tags?: { [key: string]: string | undefined };
}
export interface CreateClusterSnapshotOutput {
  snapshot: ClusterSnapshot;
}
export interface DeleteClusterInput {
  clusterArn: string;
}
export interface DeleteClusterOutput {
  cluster: Cluster;
}
export interface DeleteClusterSnapshotInput {
  snapshotArn: string;
}
export interface DeleteClusterSnapshotOutput {
  snapshot: ClusterSnapshot;
}
export interface GetClusterInput {
  clusterArn: string;
}
export interface GetClusterOutput {
  cluster: Cluster;
}
export interface GetClusterSnapshotInput {
  snapshotArn: string;
}
export interface GetClusterSnapshotOutput {
  snapshot: ClusterSnapshot;
}
export interface GetPendingMaintenanceActionInput {
  resourceArn: string;
}
export interface GetPendingMaintenanceActionOutput {
  resourcePendingMaintenanceAction: ResourcePendingMaintenanceAction;
}
export type PaginationToken = string;
export interface ListClustersInput {
  nextToken?: string;
  maxResults?: number;
}
export interface ClusterInList {
  clusterName: string;
  clusterArn: string;
  status: string;
}
export type ClusterList = ClusterInList[];
export interface ListClustersOutput {
  clusters?: ClusterInList[];
  nextToken?: string;
}
export interface ListClusterSnapshotsInput {
  clusterArn?: string;
  nextToken?: string;
  maxResults?: number;
  snapshotType?: string;
}
export interface ClusterSnapshotInList {
  snapshotName: string;
  snapshotArn: string;
  clusterArn: string;
  status: string;
  snapshotCreationTime: string;
}
export type ClusterSnapshotList = ClusterSnapshotInList[];
export interface ListClusterSnapshotsOutput {
  snapshots?: ClusterSnapshotInList[];
  nextToken?: string;
}
export interface ListPendingMaintenanceActionsInput {
  nextToken?: string;
  maxResults?: number;
}
export type ResourcePendingMaintenanceActionList =
  ResourcePendingMaintenanceAction[];
export interface ListPendingMaintenanceActionsOutput {
  resourcePendingMaintenanceActions: ResourcePendingMaintenanceAction[];
  nextToken?: string;
}
export type Arn = string;
export interface ListTagsForResourceRequest {
  resourceArn: string;
}
export interface ListTagsForResourceResponse {
  tags?: { [key: string]: string | undefined };
}
export interface RestoreClusterFromSnapshotInput {
  clusterName: string;
  snapshotArn: string;
  vpcSecurityGroupIds?: string[];
  subnetIds?: string[];
  kmsKeyId?: string;
  tags?: { [key: string]: string | undefined };
  shardCapacity?: number;
  shardInstanceCount?: number;
}
export interface RestoreClusterFromSnapshotOutput {
  cluster: Cluster;
}
export interface StartClusterInput {
  clusterArn: string;
}
export interface StartClusterOutput {
  cluster: Cluster;
}
export interface StopClusterInput {
  clusterArn: string;
}
export interface StopClusterOutput {
  cluster: Cluster;
}
export interface TagResourceRequest {
  resourceArn: string;
  tags: { [key: string]: string | undefined };
}
export interface TagResourceResponse {}
export type TagKeyList = string[];
export interface UntagResourceRequest {
  resourceArn: string;
  tagKeys: string[];
}
export interface UntagResourceResponse {}
export interface UpdateClusterInput {
  clusterArn: string;
  authType?: string;
  shardCapacity?: number;
  shardCount?: number;
  vpcSecurityGroupIds?: string[];
  subnetIds?: string[];
  adminUserPassword?: string | redacted.Redacted<string>;
  clientToken?: string;
  preferredMaintenanceWindow?: string;
  backupRetentionPeriod?: number;
  preferredBackupWindow?: string;
  shardInstanceCount?: number;
}
export interface UpdateClusterOutput {
  cluster: Cluster;
}
export type ValidationExceptionReason = string;
export interface ValidationExceptionField {
  name: string;
  message: string;
}
export type ValidationExceptionFieldList = ValidationExceptionField[];
export type ApplyPendingMaintenanceActionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * The type of pending maintenance action to be applied to the resource.
 */
export const applyPendingMaintenanceAction: API.OperationMethod<
  ApplyPendingMaintenanceActionInput,
  ApplyPendingMaintenanceActionOutput,
  ApplyPendingMaintenanceActionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /pending-action",
    input: { resourceArn: 0, applyAction: 0, optInType: 0, applyOn: 0 },
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
  operationName: "ApplyPendingMaintenanceAction",
})) as any;

export type CopyClusterSnapshotError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Copies a snapshot of an elastic cluster.
 */
export const copyClusterSnapshot: API.OperationMethod<
  CopyClusterSnapshotInput,
  CopyClusterSnapshotOutput,
  CopyClusterSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /cluster-snapshot/{snapshotArn}/copy",
    input: {
      snapshotArn: 0,
      targetSnapshotName: 0,
      kmsKeyId: 0,
      copyTags: 0,
      tags: 0,
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
  operationName: "CopyClusterSnapshot",
})) as any;

export type CreateClusterError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new Amazon DocumentDB elastic cluster and returns its cluster structure.
 */
export const createCluster: API.OperationMethod<
  CreateClusterInput,
  CreateClusterOutput,
  CreateClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /cluster",
    input: {
      clusterName: 0,
      authType: 0,
      adminUserName: 0,
      adminUserPassword: 0,
      shardCapacity: 0,
      shardCount: 0,
      vpcSecurityGroupIds: 0,
      subnetIds: 0,
      kmsKeyId: 0,
      clientToken: D.m({ idempotency: true }),
      preferredMaintenanceWindow: 0,
      tags: 0,
      backupRetentionPeriod: 0,
      preferredBackupWindow: 0,
      shardInstanceCount: 0,
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
  operationName: "CreateCluster",
})) as any;

export type CreateClusterSnapshotError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a snapshot of an elastic cluster.
 */
export const createClusterSnapshot: API.OperationMethod<
  CreateClusterSnapshotInput,
  CreateClusterSnapshotOutput,
  CreateClusterSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /cluster-snapshot",
    input: { clusterArn: 0, snapshotName: 0, tags: 0 },
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
  operationName: "CreateClusterSnapshot",
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
 * Delete an elastic cluster.
 */
export const deleteCluster: API.OperationMethod<
  DeleteClusterInput,
  DeleteClusterOutput,
  DeleteClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /cluster/{clusterArn}",
    input: { clusterArn: 0 },
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

export type DeleteClusterSnapshotError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Delete an elastic cluster snapshot.
 */
export const deleteClusterSnapshot: API.OperationMethod<
  DeleteClusterSnapshotInput,
  DeleteClusterSnapshotOutput,
  DeleteClusterSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /cluster-snapshot/{snapshotArn}",
    input: { snapshotArn: 0 },
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
  operationName: "DeleteClusterSnapshot",
})) as any;

export type GetClusterError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about a specific elastic cluster.
 */
export const getCluster: API.OperationMethod<
  GetClusterInput,
  GetClusterOutput,
  GetClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /cluster/{clusterArn}",
    input: { clusterArn: 0 },
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
  operationName: "GetCluster",
})) as any;

export type GetClusterSnapshotError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about a specific elastic cluster snapshot
 */
export const getClusterSnapshot: API.OperationMethod<
  GetClusterSnapshotInput,
  GetClusterSnapshotOutput,
  GetClusterSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /cluster-snapshot/{snapshotArn}",
    input: { snapshotArn: 0 },
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
  operationName: "GetClusterSnapshot",
})) as any;

export type GetPendingMaintenanceActionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves all maintenance actions that are pending.
 */
export const getPendingMaintenanceAction: API.OperationMethod<
  GetPendingMaintenanceActionInput,
  GetPendingMaintenanceActionOutput,
  GetPendingMaintenanceActionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /pending-action/{resourceArn}",
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
  operationName: "GetPendingMaintenanceAction",
})) as any;

export type ListClustersError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about provisioned Amazon DocumentDB elastic clusters.
 */
export const listClusters: API.PaginatedOperationMethod<
  ListClustersInput,
  ListClustersOutput,
  ListClustersError,
  Credentials | HttpClient.HttpClient,
  ClusterInList
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /clusters",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
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
  operationName: "ListClusters",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "clusters",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListClusterSnapshotsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about snapshots for a specified elastic cluster.
 */
export const listClusterSnapshots: API.PaginatedOperationMethod<
  ListClusterSnapshotsInput,
  ListClusterSnapshotsOutput,
  ListClusterSnapshotsError,
  Credentials | HttpClient.HttpClient,
  ClusterSnapshotInList
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /cluster-snapshots",
    input: {
      clusterArn: D.m({ query: "clusterArn" }),
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
      snapshotType: D.m({ query: "snapshotType" }),
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
  operationName: "ListClusterSnapshots",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "snapshots",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListPendingMaintenanceActionsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a list of all maintenance actions that are pending.
 */
export const listPendingMaintenanceActions: API.PaginatedOperationMethod<
  ListPendingMaintenanceActionsInput,
  ListPendingMaintenanceActionsOutput,
  ListPendingMaintenanceActionsError,
  Credentials | HttpClient.HttpClient,
  ResourcePendingMaintenanceAction
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /pending-actions",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
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
  operationName: "ListPendingMaintenanceActions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "resourcePendingMaintenanceActions",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all tags on a elastic cluster resource
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
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

export type RestoreClusterFromSnapshotError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Restores an elastic cluster from a snapshot.
 */
export const restoreClusterFromSnapshot: API.OperationMethod<
  RestoreClusterFromSnapshotInput,
  RestoreClusterFromSnapshotOutput,
  RestoreClusterFromSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /cluster-snapshot/{snapshotArn}/restore",
    input: {
      clusterName: 0,
      snapshotArn: 0,
      vpcSecurityGroupIds: 0,
      subnetIds: 0,
      kmsKeyId: 0,
      tags: 0,
      shardCapacity: 0,
      shardInstanceCount: 0,
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
  operationName: "RestoreClusterFromSnapshot",
})) as any;

export type StartClusterError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Restarts the stopped elastic cluster that is specified by `clusterARN`.
 */
export const startCluster: API.OperationMethod<
  StartClusterInput,
  StartClusterOutput,
  StartClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /cluster/{clusterArn}/start",
    input: { clusterArn: 0 },
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
  operationName: "StartCluster",
})) as any;

export type StopClusterError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Stops the running elastic cluster that is specified by `clusterArn`.
 * The elastic cluster must be in the *available* state.
 */
export const stopCluster: API.OperationMethod<
  StopClusterInput,
  StopClusterOutput,
  StopClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /cluster/{clusterArn}/stop",
    input: { clusterArn: 0 },
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
  operationName: "StopCluster",
})) as any;

export type TagResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Adds metadata tags to an elastic cluster resource
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
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

export type UntagResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes metadata tags from an elastic cluster resource
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
    ThrottlingException,
    ValidationException,
  ],
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
 * Modifies an elastic cluster. This includes updating admin-username/password,
 * upgrading the API version, and setting up a backup window and maintenance window
 */
export const updateCluster: API.OperationMethod<
  UpdateClusterInput,
  UpdateClusterOutput,
  UpdateClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /cluster/{clusterArn}",
    input: {
      clusterArn: 0,
      authType: 0,
      shardCapacity: 0,
      shardCount: 0,
      vpcSecurityGroupIds: 0,
      subnetIds: 0,
      adminUserPassword: 0,
      clientToken: D.m({ idempotency: true }),
      preferredMaintenanceWindow: 0,
      backupRetentionPeriod: 0,
      preferredBackupWindow: 0,
      shardInstanceCount: 0,
    },
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
  operationName: "UpdateCluster",
})) as any;
