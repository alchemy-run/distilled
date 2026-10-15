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
  sdkId: "DocDB Elastic",
  serviceShapeName: "ChimeraDbLionfishServiceLambda",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "docdb-elastic" });
const ver = /*@__PURE__*/ T.ServiceVersion("2022-11-28");
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
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://docdb-elastic.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://docdb-elastic.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://docdb-elastic.{R}.{D}","properties":{},"headers":{}}');

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
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
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
      reason: S.String,
      fieldList: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => __S(69, __c17, 1)).annotate({
          identifier: "ValidationExceptionFieldList",
        }),
      ),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
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
export type PendingMaintenanceActionDetailsList = PendingMaintenanceActionDetails[];
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
export type ResourcePendingMaintenanceActionList = ResourcePendingMaintenanceAction[];
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
  input: __S(72, __c18, 0) as any as S.Schema<ApplyPendingMaintenanceActionInput>,
  output: __S(76, __c19, 0) as any as S.Schema<ApplyPendingMaintenanceActionOutput>,
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
}));

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
  input: __S(84, __c21, 0) as any as S.Schema<CopyClusterSnapshotInput>,
  output: __S(89, __c22, 1) as any as S.Schema<CopyClusterSnapshotOutput>,
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
}));

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
  input: __S(100, __c25, 0) as any as S.Schema<CreateClusterInput>,
  output: __S(107, __c26, 3) as any as S.Schema<CreateClusterOutput>,
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
  input: __S(0, __c0, 0) as any as S.Schema<CreateClusterSnapshotInput>,
  output: __S(89, __c22, 1) as any as S.Schema<CreateClusterSnapshotOutput>,
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
 * Delete an elastic cluster.
 */
export const deleteCluster: API.OperationMethod<
  DeleteClusterInput,
  DeleteClusterOutput,
  DeleteClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4, __c1, 0) as any as S.Schema<DeleteClusterInput>,
  output: __S(107, __c26, 3) as any as S.Schema<DeleteClusterOutput>,
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
  input: __S(8, __c2, 0) as any as S.Schema<DeleteClusterSnapshotInput>,
  output: __S(89, __c22, 1) as any as S.Schema<DeleteClusterSnapshotOutput>,
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
}));

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
  input: __S(12, __c3, 0) as any as S.Schema<GetClusterInput>,
  output: __S(107, __c26, 3) as any as S.Schema<GetClusterOutput>,
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
}));

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
  input: __S(16, __c4, 0) as any as S.Schema<GetClusterSnapshotInput>,
  output: __S(89, __c22, 1) as any as S.Schema<GetClusterSnapshotOutput>,
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
}));

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
  input: __S(20, __c5, 0) as any as S.Schema<GetPendingMaintenanceActionInput>,
  output: __S(76, __c19, 0) as any as S.Schema<GetPendingMaintenanceActionOutput>,
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
}));

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
  input: __S(24, __c6, 0) as any as S.Schema<ListClustersInput>,
  output: __S(27, __c6, 3) as any as S.Schema<ListClustersOutput>,
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
  input: __S(28, __c7, 0) as any as S.Schema<ListClusterSnapshotsInput>,
  output: __S(31, __c7, 3) as any as S.Schema<ListClusterSnapshotsOutput>,
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
  input: __S(32, __c8, 0) as any as S.Schema<ListPendingMaintenanceActionsInput>,
  output: __S(34, __c8, 2) as any as S.Schema<ListPendingMaintenanceActionsOutput>,
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
  input: __S(36, __c9, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(37, __c9, 1) as any as S.Schema<ListTagsForResourceResponse>,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

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
  input: __S(40, __c10, 0) as any as S.Schema<RestoreClusterFromSnapshotInput>,
  output: __S(107, __c26, 3) as any as S.Schema<RestoreClusterFromSnapshotOutput>,
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
}));

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
  input: __S(44, __c11, 0) as any as S.Schema<StartClusterInput>,
  output: __S(107, __c26, 3) as any as S.Schema<StartClusterOutput>,
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
}));

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
  input: __S(48, __c12, 0) as any as S.Schema<StopClusterInput>,
  output: __S(107, __c26, 3) as any as S.Schema<StopClusterOutput>,
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
}));

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
  input: __S(52, __c13, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(56, __c14, 0) as any as S.Schema<TagResourceResponse>,
  errors: [
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
  input: __S(60, __c15, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(56, __c14, 0) as any as S.Schema<UntagResourceResponse>,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
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
 * Modifies an elastic cluster. This includes updating admin-username/password,
 * upgrading the API version, and setting up a backup window and maintenance window
 */
export const updateCluster: API.OperationMethod<
  UpdateClusterInput,
  UpdateClusterOutput,
  UpdateClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(64, __c16, 0) as any as S.Schema<UpdateClusterInput>,
  output: __S(107, __c26, 3) as any as S.Schema<UpdateClusterOutput>,
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

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          clusterArn: S.String,
          snapshotName: S.String,
          tags: S.optional(__S(96, __c24, 0)),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/cluster-snapshot" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateClusterSnapshotInput" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ clusterArn: S.String.pipe(T.HttpLabel("clusterArn")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/cluster/{clusterArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteClusterInput" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ snapshotArn: S.String.pipe(T.HttpLabel("snapshotArn")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/cluster-snapshot/{snapshotArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteClusterSnapshotInput" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ clusterArn: S.String.pipe(T.HttpLabel("clusterArn")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/cluster/{clusterArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetClusterInput" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ snapshotArn: S.String.pipe(T.HttpLabel("snapshotArn")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/cluster-snapshot/{snapshotArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetClusterSnapshotInput" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceArn: S.String.pipe(T.HttpLabel("resourceArn")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/pending-action/{resourceArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetPendingMaintenanceActionInput" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(T.all(T.Http({ method: "GET", uri: "/clusters" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListClustersInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ clusterName: S.String, clusterArn: S.String, status: S.String }),
      ).annotate({ identifier: "ClusterInList" });
    case 2:
      return S.Array(__S(25, __c6, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ clusters: S.optional(__S(26, __c6, 2)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListClustersOutput" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          clusterArn: S.optional(S.String).pipe(T.HttpQuery("clusterArn")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          snapshotType: S.optional(S.String).pipe(T.HttpQuery("snapshotType")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/cluster-snapshots" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListClusterSnapshotsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          snapshotName: S.String,
          snapshotArn: S.String,
          clusterArn: S.String,
          status: S.String,
          snapshotCreationTime: S.String,
        }),
      ).annotate({ identifier: "ClusterSnapshotInList" });
    case 2:
      return S.Array(__S(29, __c7, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ snapshots: S.optional(__S(30, __c7, 2)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListClusterSnapshotsOutput" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/pending-actions" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListPendingMaintenanceActionsInput" });
    case 1:
      return S.Array(__S(82, __c20, 2));
    case 2:
      return S.suspend(() =>
        S.Struct({
          resourcePendingMaintenanceActions: __S(33, __c8, 1),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListPendingMaintenanceActionsOutput" });
  }
}
function __c9(j: number): any {
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
      return S.suspend(() => S.Struct({ tags: S.optional(__S(96, __c24, 0)) })).annotate({
        identifier: "ListTagsForResourceResponse",
      });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          clusterName: S.String,
          snapshotArn: S.String.pipe(T.HttpLabel("snapshotArn")),
          vpcSecurityGroupIds: S.optional(__S(92, __c23, 0)),
          subnetIds: S.optional(__S(92, __c23, 0)),
          kmsKeyId: S.optional(S.String),
          tags: S.optional(__S(96, __c24, 0)),
          shardCapacity: S.optional(S.Number),
          shardInstanceCount: S.optional(S.Number),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/cluster-snapshot/{snapshotArn}/restore" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "RestoreClusterFromSnapshotInput" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ clusterArn: S.String.pipe(T.HttpLabel("clusterArn")) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/cluster/{clusterArn}/start" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartClusterInput" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ clusterArn: S.String.pipe(T.HttpLabel("clusterArn")) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/cluster/{clusterArn}/stop" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StopClusterInput" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
          tags: __S(96, __c24, 0),
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
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "TagResourceResponse" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
          tagKeys: __S(92, __c23, 0).pipe(T.HttpQuery("tagKeys")),
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
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          clusterArn: S.String.pipe(T.HttpLabel("clusterArn")),
          authType: S.optional(S.String),
          shardCapacity: S.optional(S.Number),
          shardCount: S.optional(S.Number),
          vpcSecurityGroupIds: S.optional(__S(92, __c23, 0)),
          subnetIds: S.optional(__S(92, __c23, 0)),
          adminUserPassword: S.optional(SensitiveString),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          preferredMaintenanceWindow: S.optional(S.String),
          backupRetentionPeriod: S.optional(S.Number),
          preferredBackupWindow: S.optional(S.String),
          shardInstanceCount: S.optional(S.Number),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/cluster/{clusterArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateClusterInput" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ name: S.String, message: S.String })).annotate({
        identifier: "ValidationExceptionField",
      });
    case 1:
      return S.Array(__S(68, __c17, 0));
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String,
          applyAction: S.String,
          optInType: S.String,
          applyOn: S.optional(S.String),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/pending-action" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ApplyPendingMaintenanceActionInput" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourcePendingMaintenanceAction: __S(82, __c20, 2) }),
      ).annotate({ identifier: "ApplyPendingMaintenanceActionOutput" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          action: S.String,
          autoAppliedAfterDate: S.optional(S.String),
          forcedApplyDate: S.optional(S.String),
          optInStatus: S.optional(S.String),
          currentApplyDate: S.optional(S.String),
          description: S.optional(S.String),
        }),
      ).annotate({ identifier: "PendingMaintenanceActionDetails" });
    case 1:
      return S.Array(__S(80, __c20, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.optional(S.String),
          pendingMaintenanceActionDetails: S.optional(__S(81, __c20, 1)),
        }),
      ).annotate({ identifier: "ResourcePendingMaintenanceAction" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          snapshotArn: S.String.pipe(T.HttpLabel("snapshotArn")),
          targetSnapshotName: S.String,
          kmsKeyId: S.optional(S.String),
          copyTags: S.optional(S.Boolean),
          tags: S.optional(__S(96, __c24, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/cluster-snapshot/{snapshotArn}/copy" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CopyClusterSnapshotInput" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          subnetIds: __S(92, __c23, 0),
          snapshotName: S.String,
          snapshotArn: S.String,
          snapshotCreationTime: S.String,
          clusterArn: S.String,
          clusterCreationTime: S.String,
          status: S.String,
          vpcSecurityGroupIds: __S(92, __c23, 0),
          adminUserName: S.String,
          kmsKeyId: S.String,
          snapshotType: S.optional(S.String),
        }),
      ).annotate({ identifier: "ClusterSnapshot" });
    case 1:
      return S.suspend(() => S.Struct({ snapshot: __S(88, __c22, 0) })).annotate({
        identifier: "CopyClusterSnapshotOutput",
      });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          clusterName: S.String,
          authType: S.String,
          adminUserName: S.String,
          adminUserPassword: SensitiveString,
          shardCapacity: S.Number,
          shardCount: S.Number,
          vpcSecurityGroupIds: S.optional(__S(92, __c23, 0)),
          subnetIds: S.optional(__S(92, __c23, 0)),
          kmsKeyId: S.optional(S.String),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          preferredMaintenanceWindow: S.optional(S.String),
          tags: S.optional(__S(96, __c24, 0)),
          backupRetentionPeriod: S.optional(S.Number),
          preferredBackupWindow: S.optional(S.String),
          shardInstanceCount: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/cluster" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateClusterInput" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ shardId: S.String, createTime: S.String, status: S.String }),
      ).annotate({ identifier: "Shard" });
    case 1:
      return S.Array(__S(104, __c26, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          clusterName: S.String,
          clusterArn: S.String,
          status: S.String,
          clusterEndpoint: S.optional(S.String),
          createTime: S.String,
          adminUserName: S.String,
          authType: S.String,
          shardCapacity: S.Number,
          shardCount: S.Number,
          vpcSecurityGroupIds: __S(92, __c23, 0),
          subnetIds: __S(92, __c23, 0),
          preferredMaintenanceWindow: S.String,
          kmsKeyId: S.String,
          shards: S.optional(__S(105, __c26, 1)),
          backupRetentionPeriod: S.optional(S.Number),
          preferredBackupWindow: S.optional(S.String),
          shardInstanceCount: S.optional(S.Number),
        }),
      ).annotate({ identifier: "Cluster" });
    case 3:
      return S.suspend(() => S.Struct({ cluster: __S(106, __c26, 2) })).annotate({
        identifier: "CreateClusterOutput",
      });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
