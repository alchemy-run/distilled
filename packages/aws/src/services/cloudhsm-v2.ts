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
  sdkId: "CloudHSM V2",
  serviceShapeName: "BaldrApiService",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "cloudhsm" });
const ver = /*@__PURE__*/ T.ServiceVersion("2017-04-28");
const proto = /*@__PURE__*/ T.AwsProtocolsAwsJson1_1();
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
              `https://cloudhsmv2-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://cloudhsmv2-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://cloudhsmv2.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        if ("aws" === _.getAttr(PartitionResult, "name")) {
          return e(`https://cloudhsmv2.${Region}.amazonaws.com`);
        }
        if ("aws-us-gov" === _.getAttr(PartitionResult, "name")) {
          return e(`https://cloudhsmv2.${Region}.amazonaws.com`);
        }
        return e(`https://cloudhsmv2.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://cloudhsmv2.{R}.{D}","properties":{},"headers":{}}');

export class CloudHsmAccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<CloudHsmAccessDeniedException>()(
    "CloudHsmAccessDeniedException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ).pipe(C.withAuthError) {}
export class CloudHsmInternalFailureException
  extends /*@__PURE__*/ S.TaggedError<CloudHsmInternalFailureException>()(
    "CloudHsmInternalFailureException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class CloudHsmInvalidRequestException
  extends /*@__PURE__*/ S.TaggedError<CloudHsmInvalidRequestException>()(
    "CloudHsmInvalidRequestException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class CloudHsmResourceLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<CloudHsmResourceLimitExceededException>()(
    "CloudHsmResourceLimitExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class CloudHsmResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<CloudHsmResourceNotFoundException>()(
    "CloudHsmResourceNotFoundException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class CloudHsmServiceException
  extends /*@__PURE__*/ S.TaggedError<CloudHsmServiceException>()("CloudHsmServiceException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class CloudHsmTagException
  extends /*@__PURE__*/ S.TaggedError<CloudHsmTagException>()("CloudHsmTagException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export type Region = string;
export type BackupId = string;
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  Key: string;
  Value: string;
}
export type TagList = Tag[];
export interface CopyBackupToRegionRequest {
  DestinationRegion: string;
  BackupId: string;
  TagList?: Tag[];
}
export type ClusterId = string;
export interface DestinationBackup {
  CreateTimestamp?: Date;
  SourceRegion?: string;
  SourceBackup?: string;
  SourceCluster?: string;
}
export interface CopyBackupToRegionResponse {
  DestinationBackup?: DestinationBackup;
}
export type BackupRetentionType = "DAYS" | (string & {});
export type BackupRetentionValue = string;
export interface BackupRetentionPolicy {
  Type?: BackupRetentionType;
  Value?: string;
}
export type HsmType = string;
export type BackupArn = string;
export type SubnetId = string;
export type SubnetIds = string[];
export type NetworkType = "IPV4" | "DUALSTACK" | (string & {});
export type ClusterMode = "FIPS" | "NON_FIPS" | (string & {});
export interface CreateClusterRequest {
  BackupRetentionPolicy?: BackupRetentionPolicy;
  HsmType: string;
  SourceBackupId?: string;
  SubnetIds: string[];
  NetworkType?: NetworkType;
  TagList?: Tag[];
  Mode?: ClusterMode;
}
export type BackupPolicy = "DEFAULT" | (string & {});
export type ExternalAz = string;
export type EniId = string;
export type IpAddress = string;
export type IpV6Address = string;
export type HsmId = string;
export type HsmState =
  | "CREATE_IN_PROGRESS"
  | "ACTIVE"
  | "DEGRADED"
  | "DELETE_IN_PROGRESS"
  | "DELETED"
  | (string & {});
export interface Hsm {
  AvailabilityZone?: string;
  ClusterId?: string;
  SubnetId?: string;
  EniId?: string;
  EniIp?: string;
  EniIpV6?: string;
  HsmId: string;
  HsmType?: string;
  State?: HsmState;
  StateMessage?: string;
}
export type Hsms = Hsm[];
export type PreCoPassword = string;
export type SecurityGroup = string;
export type ClusterState =
  | "CREATE_IN_PROGRESS"
  | "UNINITIALIZED"
  | "INITIALIZE_IN_PROGRESS"
  | "INITIALIZED"
  | "ACTIVE"
  | "UPDATE_IN_PROGRESS"
  | "MODIFY_IN_PROGRESS"
  | "ROLLBACK_IN_PROGRESS"
  | "DELETE_IN_PROGRESS"
  | "DELETED"
  | "DEGRADED"
  | (string & {});
export type StateMessage = string;
export type ExternalSubnetMapping = { [key: string]: string | undefined };
export type VpcId = string;
export type Cert = string;
export interface Certificates {
  ClusterCsr?: string;
  HsmCertificate?: string;
  AwsHardwareCertificate?: string;
  ManufacturerHardwareCertificate?: string;
  ClusterCertificate?: string;
}
export interface Cluster {
  BackupPolicy?: BackupPolicy;
  BackupRetentionPolicy?: BackupRetentionPolicy;
  ClusterId?: string;
  CreateTimestamp?: Date;
  Hsms?: Hsm[];
  HsmType?: string;
  HsmTypeRollbackExpiration?: Date;
  PreCoPassword?: string;
  SecurityGroup?: string;
  SourceBackupId?: string;
  State?: ClusterState;
  StateMessage?: string;
  SubnetMapping?: { [key: string]: string | undefined };
  VpcId?: string;
  NetworkType?: NetworkType;
  Certificates?: Certificates;
  TagList?: Tag[];
  Mode?: ClusterMode;
}
export interface CreateClusterResponse {
  Cluster?: Cluster;
}
export interface CreateHsmRequest {
  ClusterId: string;
  AvailabilityZone: string;
  IpAddress?: string;
}
export interface CreateHsmResponse {
  Hsm?: Hsm;
}
export interface DeleteBackupRequest {
  BackupId: string;
}
export type BackupState =
  | "CREATE_IN_PROGRESS"
  | "READY"
  | "DELETED"
  | "PENDING_DELETION"
  | (string & {});
export interface Backup {
  BackupId: string;
  BackupArn?: string;
  BackupState?: BackupState;
  ClusterId?: string;
  CreateTimestamp?: Date;
  CopyTimestamp?: Date;
  NeverExpires?: boolean;
  SourceRegion?: string;
  SourceBackup?: string;
  SourceCluster?: string;
  DeleteTimestamp?: Date;
  TagList?: Tag[];
  HsmType?: string;
  Mode?: ClusterMode;
}
export interface DeleteBackupResponse {
  Backup?: Backup;
}
export interface DeleteClusterRequest {
  ClusterId: string;
}
export interface DeleteClusterResponse {
  Cluster?: Cluster;
}
export interface DeleteHsmRequest {
  ClusterId: string;
  HsmId?: string;
  EniId?: string;
  EniIp?: string;
}
export interface DeleteHsmResponse {
  HsmId?: string;
}
export type CloudHsmArn = string;
export interface DeleteResourcePolicyRequest {
  ResourceArn?: string;
}
export type ResourcePolicy = string;
export interface DeleteResourcePolicyResponse {
  ResourceArn?: string;
  Policy?: string;
}
export type NextToken = string;
export type BackupsMaxSize = number;
export type Field = string;
export type Strings = string[];
export type Filters = { [key: string]: string[] | undefined };
export interface DescribeBackupsRequest {
  NextToken?: string;
  MaxResults?: number;
  Filters?: { [key: string]: string[] | undefined };
  Shared?: boolean;
  SortAscending?: boolean;
}
export type Backups = Backup[];
export interface DescribeBackupsResponse {
  Backups?: Backup[];
  NextToken?: string;
}
export type ClustersMaxSize = number;
export interface DescribeClustersRequest {
  Filters?: { [key: string]: string[] | undefined };
  NextToken?: string;
  MaxResults?: number;
}
export type Clusters = Cluster[];
export interface DescribeClustersResponse {
  Clusters?: Cluster[];
  NextToken?: string;
}
export interface GetResourcePolicyRequest {
  ResourceArn?: string;
}
export interface GetResourcePolicyResponse {
  Policy?: string;
}
export interface InitializeClusterRequest {
  ClusterId: string;
  SignedCert: string;
  TrustAnchor: string;
}
export interface InitializeClusterResponse {
  State?: ClusterState;
  StateMessage?: string;
}
export type ResourceId = string;
export type MaxSize = number;
export interface ListTagsRequest {
  ResourceId: string;
  NextToken?: string;
  MaxResults?: number;
}
export interface ListTagsResponse {
  TagList: Tag[];
  NextToken?: string;
}
export interface ModifyBackupAttributesRequest {
  BackupId: string;
  NeverExpires: boolean;
}
export interface ModifyBackupAttributesResponse {
  Backup?: Backup;
}
export interface ModifyClusterRequest {
  HsmType?: string;
  BackupRetentionPolicy?: BackupRetentionPolicy;
  ClusterId: string;
}
export interface ModifyClusterResponse {
  Cluster?: Cluster;
}
export interface PutResourcePolicyRequest {
  ResourceArn?: string;
  Policy?: string;
}
export interface PutResourcePolicyResponse {
  ResourceArn?: string;
  Policy?: string;
}
export interface RestoreBackupRequest {
  BackupId: string;
}
export interface RestoreBackupResponse {
  Backup?: Backup;
}
export interface TagResourceRequest {
  ResourceId: string;
  TagList: Tag[];
}
export interface TagResourceResponse {}
export type TagKeyList = string[];
export interface UntagResourceRequest {
  ResourceId: string;
  TagKeyList: string[];
}
export interface UntagResourceResponse {}
export type ErrorMessage = string;
export type CopyBackupToRegionError =
  | CloudHsmAccessDeniedException
  | CloudHsmInternalFailureException
  | CloudHsmInvalidRequestException
  | CloudHsmResourceNotFoundException
  | CloudHsmServiceException
  | CloudHsmTagException
  | CommonErrors;
/**
 * Copy an CloudHSM cluster backup to a different region.
 *
 * **Cross-account use:** No. You cannot perform this operation on an CloudHSM backup in a different Amazon Web Services account.
 */
export const copyBackupToRegion: API.OperationMethod<
  CopyBackupToRegionRequest,
  CopyBackupToRegionResponse,
  CopyBackupToRegionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(160, __c20, 0) as any as S.Schema<CopyBackupToRegionRequest>,
  output: __S(162, __c20, 2) as any as S.Schema<CopyBackupToRegionResponse>,
  errors: [
    CloudHsmAccessDeniedException,
    CloudHsmInternalFailureException,
    CloudHsmInvalidRequestException,
    CloudHsmResourceNotFoundException,
    CloudHsmServiceException,
    CloudHsmTagException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CopyBackupToRegion",
}));

export type CreateClusterError =
  | CloudHsmAccessDeniedException
  | CloudHsmInternalFailureException
  | CloudHsmInvalidRequestException
  | CloudHsmResourceNotFoundException
  | CloudHsmServiceException
  | CloudHsmTagException
  | CommonErrors;
/**
 * Creates a new CloudHSM cluster.
 *
 * **Cross-account use:** Yes. To perform this operation with an CloudHSM backup in a different AWS account, specify the full backup
 * ARN in the value of the SourceBackupId parameter.
 */
export const createCluster: API.OperationMethod<
  CreateClusterRequest,
  CreateClusterResponse,
  CreateClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(176, __c22, 0) as any as S.Schema<CreateClusterRequest>,
  output: __S(192, __c24, 0) as any as S.Schema<CreateClusterResponse>,
  errors: [
    CloudHsmAccessDeniedException,
    CloudHsmInternalFailureException,
    CloudHsmInvalidRequestException,
    CloudHsmResourceNotFoundException,
    CloudHsmServiceException,
    CloudHsmTagException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCluster",
}));

export type CreateHsmError =
  | CloudHsmAccessDeniedException
  | CloudHsmInternalFailureException
  | CloudHsmInvalidRequestException
  | CloudHsmResourceNotFoundException
  | CloudHsmServiceException
  | CommonErrors;
/**
 * Creates a new hardware security module (HSM) in the specified CloudHSM
 * cluster.
 *
 * **Cross-account use:** No. You cannot perform this operation on an CloudHSM cluster in a different Amazon Web Service account.
 */
export const createHsm: API.OperationMethod<
  CreateHsmRequest,
  CreateHsmResponse,
  CreateHsmError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(216, __c27, 0) as any as S.Schema<CreateHsmRequest>,
  output: __S(217, __c27, 1) as any as S.Schema<CreateHsmResponse>,
  errors: [
    CloudHsmAccessDeniedException,
    CloudHsmInternalFailureException,
    CloudHsmInvalidRequestException,
    CloudHsmResourceNotFoundException,
    CloudHsmServiceException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateHsm",
}));

export type DeleteBackupError =
  | CloudHsmAccessDeniedException
  | CloudHsmInternalFailureException
  | CloudHsmInvalidRequestException
  | CloudHsmResourceNotFoundException
  | CloudHsmServiceException
  | CommonErrors;
/**
 * Deletes a specified CloudHSM backup. A backup can be restored up to 7 days
 * after the DeleteBackup request is made. For more information on restoring a backup, see
 * RestoreBackup.
 *
 * **Cross-account use:** No. You cannot perform this operation on an CloudHSM backup in a different Amazon Web Services account.
 */
export const deleteBackup: API.OperationMethod<
  DeleteBackupRequest,
  DeleteBackupResponse,
  DeleteBackupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<DeleteBackupRequest>,
  output: __S(16, __c2, 0) as any as S.Schema<DeleteBackupResponse>,
  errors: [
    CloudHsmAccessDeniedException,
    CloudHsmInternalFailureException,
    CloudHsmInvalidRequestException,
    CloudHsmResourceNotFoundException,
    CloudHsmServiceException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteBackup",
}));

export type DeleteClusterError =
  | CloudHsmAccessDeniedException
  | CloudHsmInternalFailureException
  | CloudHsmInvalidRequestException
  | CloudHsmResourceNotFoundException
  | CloudHsmServiceException
  | CloudHsmTagException
  | CommonErrors;
/**
 * Deletes the specified CloudHSM cluster. Before you can delete a cluster, you must
 * delete all HSMs in the cluster. To see if the cluster contains any HSMs, use DescribeClusters. To delete an HSM, use DeleteHsm.
 *
 * **Cross-account use:** No. You cannot perform this operation on an CloudHSM cluster in a different Amazon Web Services account.
 */
export const deleteCluster: API.OperationMethod<
  DeleteClusterRequest,
  DeleteClusterResponse,
  DeleteClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(24, __c3, 0) as any as S.Schema<DeleteClusterRequest>,
  output: __S(192, __c24, 0) as any as S.Schema<DeleteClusterResponse>,
  errors: [
    CloudHsmAccessDeniedException,
    CloudHsmInternalFailureException,
    CloudHsmInvalidRequestException,
    CloudHsmResourceNotFoundException,
    CloudHsmServiceException,
    CloudHsmTagException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCluster",
}));

export type DeleteHsmError =
  | CloudHsmAccessDeniedException
  | CloudHsmInternalFailureException
  | CloudHsmInvalidRequestException
  | CloudHsmResourceNotFoundException
  | CloudHsmServiceException
  | CommonErrors;
/**
 * Deletes the specified HSM. To specify an HSM, you can use its identifier (ID), the IP
 * address of the HSM's elastic network interface (ENI), or the ID of the HSM's ENI. You need to
 * specify only one of these values. To find these values, use DescribeClusters.
 *
 * **Cross-account use:** No. You cannot perform this operation on an CloudHSM hsm in a different Amazon Web Services account.
 */
export const deleteHsm: API.OperationMethod<
  DeleteHsmRequest,
  DeleteHsmResponse,
  DeleteHsmError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(32, __c4, 0) as any as S.Schema<DeleteHsmRequest>,
  output: __S(33, __c4, 1) as any as S.Schema<DeleteHsmResponse>,
  errors: [
    CloudHsmAccessDeniedException,
    CloudHsmInternalFailureException,
    CloudHsmInvalidRequestException,
    CloudHsmResourceNotFoundException,
    CloudHsmServiceException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteHsm",
}));

export type DeleteResourcePolicyError =
  | CloudHsmAccessDeniedException
  | CloudHsmInternalFailureException
  | CloudHsmInvalidRequestException
  | CloudHsmResourceNotFoundException
  | CloudHsmServiceException
  | CommonErrors;
/**
 * Deletes an CloudHSM resource policy. Deleting a resource policy will result in the resource being unshared and removed from
 * any RAM resource shares. Deleting the resource policy attached to a backup will not impact any clusters created from that
 * backup.
 *
 * **Cross-account use:** No. You cannot perform this operation on an CloudHSM resource in a different Amazon Web Services account.
 */
export const deleteResourcePolicy: API.OperationMethod<
  DeleteResourcePolicyRequest,
  DeleteResourcePolicyResponse,
  DeleteResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(40, __c5, 0) as any as S.Schema<DeleteResourcePolicyRequest>,
  output: __S(48, __c6, 0) as any as S.Schema<DeleteResourcePolicyResponse>,
  errors: [
    CloudHsmAccessDeniedException,
    CloudHsmInternalFailureException,
    CloudHsmInvalidRequestException,
    CloudHsmResourceNotFoundException,
    CloudHsmServiceException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteResourcePolicy",
}));

export type DescribeBackupsError =
  | CloudHsmAccessDeniedException
  | CloudHsmInternalFailureException
  | CloudHsmInvalidRequestException
  | CloudHsmResourceNotFoundException
  | CloudHsmServiceException
  | CloudHsmTagException
  | CommonErrors;
/**
 * Gets information about backups of CloudHSM clusters. Lists either the backups you own or the backups shared with you when the Shared parameter is true.
 *
 * This is a paginated operation, which means that each response might contain only a
 * subset of all the backups. When the response contains only a subset of backups, it includes a
 * `NextToken` value. Use this value in a subsequent `DescribeBackups`
 * request to get more backups. When you receive a response with no `NextToken` (or an
 * empty or null value), that means there are no more backups to get.
 *
 * **Cross-account use:** Yes. Customers can describe backups in other Amazon Web Services accounts that are shared with them.
 */
export const describeBackups: API.PaginatedOperationMethod<
  DescribeBackupsRequest,
  DescribeBackupsResponse,
  DescribeBackupsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(56, __c7, 0) as any as S.Schema<DescribeBackupsRequest>,
  output: __S(58, __c7, 2) as any as S.Schema<DescribeBackupsResponse>,
  errors: [
    CloudHsmAccessDeniedException,
    CloudHsmInternalFailureException,
    CloudHsmInvalidRequestException,
    CloudHsmResourceNotFoundException,
    CloudHsmServiceException,
    CloudHsmTagException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeBackups",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeClustersError =
  | CloudHsmAccessDeniedException
  | CloudHsmInternalFailureException
  | CloudHsmInvalidRequestException
  | CloudHsmServiceException
  | CloudHsmTagException
  | CommonErrors;
/**
 * Gets information about CloudHSM clusters.
 *
 * This is a paginated operation, which means that each response might contain only a
 * subset of all the clusters. When the response contains only a subset of clusters, it includes
 * a `NextToken` value. Use this value in a subsequent `DescribeClusters`
 * request to get more clusters. When you receive a response with no `NextToken` (or
 * an empty or null value), that means there are no more clusters to get.
 *
 * **Cross-account use:** No. You cannot perform this operation on CloudHSM clusters in a different Amazon Web Services account.
 */
export const describeClusters: API.PaginatedOperationMethod<
  DescribeClustersRequest,
  DescribeClustersResponse,
  DescribeClustersError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(72, __c9, 0) as any as S.Schema<DescribeClustersRequest>,
  output: __S(74, __c9, 2) as any as S.Schema<DescribeClustersResponse>,
  errors: [
    CloudHsmAccessDeniedException,
    CloudHsmInternalFailureException,
    CloudHsmInvalidRequestException,
    CloudHsmServiceException,
    CloudHsmTagException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeClusters",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetResourcePolicyError =
  | CloudHsmAccessDeniedException
  | CloudHsmInternalFailureException
  | CloudHsmInvalidRequestException
  | CloudHsmResourceNotFoundException
  | CloudHsmServiceException
  | CommonErrors;
/**
 * Retrieves the resource policy document attached to a given resource.
 *
 * **Cross-account use:** No. You cannot perform this operation on an CloudHSM resource in a different Amazon Web Services account.
 */
export const getResourcePolicy: API.OperationMethod<
  GetResourcePolicyRequest,
  GetResourcePolicyResponse,
  GetResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(80, __c10, 0) as any as S.Schema<GetResourcePolicyRequest>,
  output: __S(81, __c10, 1) as any as S.Schema<GetResourcePolicyResponse>,
  errors: [
    CloudHsmAccessDeniedException,
    CloudHsmInternalFailureException,
    CloudHsmInvalidRequestException,
    CloudHsmResourceNotFoundException,
    CloudHsmServiceException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetResourcePolicy",
}));

export type InitializeClusterError =
  | CloudHsmAccessDeniedException
  | CloudHsmInternalFailureException
  | CloudHsmInvalidRequestException
  | CloudHsmResourceNotFoundException
  | CloudHsmServiceException
  | CommonErrors;
/**
 * Claims an CloudHSM cluster by submitting the cluster certificate issued by your
 * issuing certificate authority (CA) and the CA's root certificate. Before you can claim a
 * cluster, you must sign the cluster's certificate signing request (CSR) with your issuing CA.
 * To get the cluster's CSR, use DescribeClusters.
 *
 * **Cross-account use:** No. You cannot perform this operation on an CloudHSM cluster in a different Amazon Web Services account.
 */
export const initializeCluster: API.OperationMethod<
  InitializeClusterRequest,
  InitializeClusterResponse,
  InitializeClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(88, __c11, 0) as any as S.Schema<InitializeClusterRequest>,
  output: __S(89, __c11, 1) as any as S.Schema<InitializeClusterResponse>,
  errors: [
    CloudHsmAccessDeniedException,
    CloudHsmInternalFailureException,
    CloudHsmInvalidRequestException,
    CloudHsmResourceNotFoundException,
    CloudHsmServiceException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "InitializeCluster",
}));

export type ListTagsError =
  | CloudHsmAccessDeniedException
  | CloudHsmInternalFailureException
  | CloudHsmInvalidRequestException
  | CloudHsmResourceNotFoundException
  | CloudHsmServiceException
  | CloudHsmTagException
  | CommonErrors;
/**
 * Gets a list of tags for the specified CloudHSM cluster.
 *
 * This is a paginated operation, which means that each response might contain only a
 * subset of all the tags. When the response contains only a subset of tags, it includes a
 * `NextToken` value. Use this value in a subsequent `ListTags` request to
 * get more tags. When you receive a response with no `NextToken` (or an empty or null
 * value), that means there are no more tags to get.
 *
 * **Cross-account use:** No. You cannot perform this operation on an CloudHSM resource in a different Amazon Web Services account.
 */
export const listTags: API.PaginatedOperationMethod<
  ListTagsRequest,
  ListTagsResponse,
  ListTagsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(96, __c12, 0) as any as S.Schema<ListTagsRequest>,
  output: __S(97, __c12, 1) as any as S.Schema<ListTagsResponse>,
  errors: [
    CloudHsmAccessDeniedException,
    CloudHsmInternalFailureException,
    CloudHsmInvalidRequestException,
    CloudHsmResourceNotFoundException,
    CloudHsmServiceException,
    CloudHsmTagException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTags",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ModifyBackupAttributesError =
  | CloudHsmAccessDeniedException
  | CloudHsmInternalFailureException
  | CloudHsmInvalidRequestException
  | CloudHsmResourceNotFoundException
  | CloudHsmServiceException
  | CommonErrors;
/**
 * Modifies attributes for CloudHSM backup.
 *
 * **Cross-account use:** No. You cannot perform this operation on an CloudHSM backup in a different Amazon Web Services account.
 */
export const modifyBackupAttributes: API.OperationMethod<
  ModifyBackupAttributesRequest,
  ModifyBackupAttributesResponse,
  ModifyBackupAttributesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(104, __c13, 0) as any as S.Schema<ModifyBackupAttributesRequest>,
  output: __S(16, __c2, 0) as any as S.Schema<ModifyBackupAttributesResponse>,
  errors: [
    CloudHsmAccessDeniedException,
    CloudHsmInternalFailureException,
    CloudHsmInvalidRequestException,
    CloudHsmResourceNotFoundException,
    CloudHsmServiceException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyBackupAttributes",
}));

export type ModifyClusterError =
  | CloudHsmAccessDeniedException
  | CloudHsmInternalFailureException
  | CloudHsmInvalidRequestException
  | CloudHsmResourceNotFoundException
  | CloudHsmServiceException
  | CommonErrors;
/**
 * Modifies CloudHSM cluster.
 *
 * **Cross-account use:** No. You cannot perform this operation on an CloudHSM cluster in a different Amazon Web Services account.
 */
export const modifyCluster: API.OperationMethod<
  ModifyClusterRequest,
  ModifyClusterResponse,
  ModifyClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(112, __c14, 0) as any as S.Schema<ModifyClusterRequest>,
  output: __S(192, __c24, 0) as any as S.Schema<ModifyClusterResponse>,
  errors: [
    CloudHsmAccessDeniedException,
    CloudHsmInternalFailureException,
    CloudHsmInvalidRequestException,
    CloudHsmResourceNotFoundException,
    CloudHsmServiceException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyCluster",
}));

export type PutResourcePolicyError =
  | CloudHsmAccessDeniedException
  | CloudHsmInternalFailureException
  | CloudHsmInvalidRequestException
  | CloudHsmResourceNotFoundException
  | CloudHsmServiceException
  | CommonErrors;
/**
 * Creates or updates an CloudHSM resource policy. A resource policy helps you to define the IAM entity
 * (for example, an Amazon Web Services account) that can manage your CloudHSM resources. The following resources support
 * CloudHSM resource policies:
 *
 * - Backup - The resource policy allows you to describe the backup and restore a cluster from the backup in another Amazon Web Services account.
 *
 * In order to share a backup, it must be in a 'READY' state and you must own it.
 *
 * While you can share a backup using the CloudHSM PutResourcePolicy operation, we recommend using Resource Access Manager
 * (RAM) instead. Using RAM provides multiple benefits as it creates the policy for you, allows multiple resources to be shared at
 * one time, and increases the discoverability of shared resources. If you use PutResourcePolicy and want consumers to be able to
 * describe the backups you share with them, you must promote the backup to a standard RAM
 * Resource Share using the RAM PromoteResourceShareCreatedFromPolicy API operation.
 *
 * For more information, see Working with shared backups in the CloudHSM User Guide
 *
 * **Cross-account use:** No. You cannot perform this operation on an CloudHSM resource in a different Amazon Web Services account.
 */
export const putResourcePolicy: API.OperationMethod<
  PutResourcePolicyRequest,
  PutResourcePolicyResponse,
  PutResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(120, __c15, 0) as any as S.Schema<PutResourcePolicyRequest>,
  output: __S(48, __c6, 0) as any as S.Schema<PutResourcePolicyResponse>,
  errors: [
    CloudHsmAccessDeniedException,
    CloudHsmInternalFailureException,
    CloudHsmInvalidRequestException,
    CloudHsmResourceNotFoundException,
    CloudHsmServiceException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutResourcePolicy",
}));

export type RestoreBackupError =
  | CloudHsmAccessDeniedException
  | CloudHsmInternalFailureException
  | CloudHsmInvalidRequestException
  | CloudHsmResourceNotFoundException
  | CloudHsmServiceException
  | CommonErrors;
/**
 * Restores a specified CloudHSM backup that is in the
 * `PENDING_DELETION` state. For more information on deleting a backup, see
 * DeleteBackup.
 *
 * **Cross-account use:** No. You cannot perform this operation on an CloudHSM backup in a different Amazon Web Services account.
 */
export const restoreBackup: API.OperationMethod<
  RestoreBackupRequest,
  RestoreBackupResponse,
  RestoreBackupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(128, __c16, 0) as any as S.Schema<RestoreBackupRequest>,
  output: __S(16, __c2, 0) as any as S.Schema<RestoreBackupResponse>,
  errors: [
    CloudHsmAccessDeniedException,
    CloudHsmInternalFailureException,
    CloudHsmInvalidRequestException,
    CloudHsmResourceNotFoundException,
    CloudHsmServiceException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RestoreBackup",
}));

export type TagResourceError =
  | CloudHsmAccessDeniedException
  | CloudHsmInternalFailureException
  | CloudHsmInvalidRequestException
  | CloudHsmResourceLimitExceededException
  | CloudHsmResourceNotFoundException
  | CloudHsmServiceException
  | CloudHsmTagException
  | CommonErrors;
/**
 * Adds or overwrites one or more tags for the specified CloudHSM cluster.
 *
 * **Cross-account use:** No. You cannot perform this operation on an CloudHSM resource in a different Amazon Web Services account.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(136, __c17, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(144, __c18, 0) as any as S.Schema<TagResourceResponse>,
  errors: [
    CloudHsmAccessDeniedException,
    CloudHsmInternalFailureException,
    CloudHsmInvalidRequestException,
    CloudHsmResourceLimitExceededException,
    CloudHsmResourceNotFoundException,
    CloudHsmServiceException,
    CloudHsmTagException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError =
  | CloudHsmAccessDeniedException
  | CloudHsmInternalFailureException
  | CloudHsmInvalidRequestException
  | CloudHsmResourceNotFoundException
  | CloudHsmServiceException
  | CloudHsmTagException
  | CommonErrors;
/**
 * Removes the specified tag or tags from the specified CloudHSM cluster.
 *
 * **Cross-account use:** No. You cannot perform this operation on an CloudHSM resource in a different Amazon Web Services account.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(152, __c19, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(144, __c18, 0) as any as S.Schema<UntagResourceResponse>,
  errors: [
    CloudHsmAccessDeniedException,
    CloudHsmInternalFailureException,
    CloudHsmInvalidRequestException,
    CloudHsmResourceNotFoundException,
    CloudHsmServiceException,
    CloudHsmTagException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ BackupId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteBackupRequest" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          BackupId: S.String,
          BackupArn: S.optional(S.String),
          BackupState: S.optional(S.String),
          ClusterId: S.optional(S.String),
          CreateTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          CopyTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          NeverExpires: S.optional(S.Boolean),
          SourceRegion: S.optional(S.String),
          SourceBackup: S.optional(S.String),
          SourceCluster: S.optional(S.String),
          DeleteTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          TagList: S.optional(__S(169, __c21, 1)),
          HsmType: S.optional(S.String),
          Mode: S.optional(S.String),
        }),
      ).annotate({ identifier: "Backup" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Backup: S.optional(__S(8, __c1, 0)) })).annotate({
        identifier: "DeleteBackupResponse",
      });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ClusterId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteClusterRequest" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClusterId: S.String,
          HsmId: S.optional(S.String),
          EniId: S.optional(S.String),
          EniIp: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DeleteHsmRequest" });
    case 1:
      return S.suspend(() => S.Struct({ HsmId: S.optional(S.String) })).annotate({
        identifier: "DeleteHsmResponse",
      });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceArn: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteResourcePolicyRequest" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceArn: S.optional(S.String), Policy: S.optional(S.String) }),
      ).annotate({ identifier: "DeleteResourcePolicyResponse" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          Filters: S.optional(__S(64, __c8, 0)),
          Shared: S.optional(S.Boolean),
          SortAscending: S.optional(S.Boolean),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeBackupsRequest" });
    case 1:
      return S.Array(__S(8, __c1, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ Backups: S.optional(__S(57, __c7, 1)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "DescribeBackupsResponse" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ __S(200, __c25, 0).pipe(S.optional));
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Filters: S.optional(__S(64, __c8, 0)),
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeClustersRequest" });
    case 1:
      return S.Array(__S(188, __c23, 4));
    case 2:
      return S.suspend(() =>
        S.Struct({ Clusters: S.optional(__S(73, __c9, 1)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "DescribeClustersResponse" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceArn: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetResourcePolicyRequest" });
    case 1:
      return S.suspend(() => S.Struct({ Policy: S.optional(S.String) })).annotate({
        identifier: "GetResourcePolicyResponse",
      });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ClusterId: S.String, SignedCert: S.String, TrustAnchor: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "InitializeClusterRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ State: S.optional(S.String), StateMessage: S.optional(S.String) }),
      ).annotate({ identifier: "InitializeClusterResponse" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceId: S.String,
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListTagsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ TagList: __S(169, __c21, 1), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListTagsResponse" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ BackupId: S.String, NeverExpires: S.Boolean }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ModifyBackupAttributesRequest" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          HsmType: S.optional(S.String),
          BackupRetentionPolicy: S.optional(__S(184, __c23, 0)),
          ClusterId: S.String,
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ModifyClusterRequest" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceArn: S.optional(S.String), Policy: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "PutResourcePolicyRequest" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ BackupId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "RestoreBackupRequest" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceId: S.String, TagList: __S(169, __c21, 1) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "TagResourceRequest" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "TagResourceResponse" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceId: S.String, TagKeyList: __S(200, __c25, 0) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UntagResourceRequest" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DestinationRegion: S.String,
          BackupId: S.String,
          TagList: S.optional(__S(169, __c21, 1)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CopyBackupToRegionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          CreateTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          SourceRegion: S.optional(S.String),
          SourceBackup: S.optional(S.String),
          SourceCluster: S.optional(S.String),
        }),
      ).annotate({ identifier: "DestinationBackup" });
    case 2:
      return S.suspend(() =>
        S.Struct({ DestinationBackup: S.optional(__S(161, __c20, 1)) }),
      ).annotate({ identifier: "CopyBackupToRegionResponse" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Key: S.String, Value: S.String })).annotate({
        identifier: "Tag",
      });
    case 1:
      return S.Array(__S(168, __c21, 0));
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          BackupRetentionPolicy: S.optional(__S(184, __c23, 0)),
          HsmType: S.String,
          SourceBackupId: S.optional(S.String),
          SubnetIds: __S(200, __c25, 0),
          NetworkType: S.optional(S.String),
          TagList: S.optional(__S(169, __c21, 1)),
          Mode: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateClusterRequest" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Type: S.optional(S.String), Value: S.optional(S.String) }),
      ).annotate({ identifier: "BackupRetentionPolicy" });
    case 1:
      return S.Array(__S(208, __c26, 0));
    case 2:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
    case 3:
      return S.suspend(() =>
        S.Struct({
          ClusterCsr: S.optional(S.String),
          HsmCertificate: S.optional(S.String),
          AwsHardwareCertificate: S.optional(S.String),
          ManufacturerHardwareCertificate: S.optional(S.String),
          ClusterCertificate: S.optional(S.String),
        }),
      ).annotate({ identifier: "Certificates" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          BackupPolicy: S.optional(S.String),
          BackupRetentionPolicy: S.optional(__S(184, __c23, 0)),
          ClusterId: S.optional(S.String),
          CreateTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Hsms: S.optional(__S(185, __c23, 1)),
          HsmType: S.optional(S.String),
          HsmTypeRollbackExpiration: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          PreCoPassword: S.optional(S.String),
          SecurityGroup: S.optional(S.String),
          SourceBackupId: S.optional(S.String),
          State: S.optional(S.String),
          StateMessage: S.optional(S.String),
          SubnetMapping: S.optional(__S(186, __c23, 2)),
          VpcId: S.optional(S.String),
          NetworkType: S.optional(S.String),
          Certificates: S.optional(__S(187, __c23, 3)),
          TagList: S.optional(__S(169, __c21, 1)),
          Mode: S.optional(S.String),
        }),
      ).annotate({ identifier: "Cluster" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Cluster: S.optional(__S(188, __c23, 4)) })).annotate({
        identifier: "CreateClusterResponse",
      });
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
      return S.suspend(() =>
        S.Struct({
          AvailabilityZone: S.optional(S.String),
          ClusterId: S.optional(S.String),
          SubnetId: S.optional(S.String),
          EniId: S.optional(S.String),
          EniIp: S.optional(S.String),
          EniIpV6: S.optional(S.String),
          HsmId: S.String,
          HsmType: S.optional(S.String),
          State: S.optional(S.String),
          StateMessage: S.optional(S.String),
        }),
      ).annotate({ identifier: "Hsm" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClusterId: S.String,
          AvailabilityZone: S.String,
          IpAddress: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateHsmRequest" });
    case 1:
      return S.suspend(() => S.Struct({ Hsm: S.optional(__S(208, __c26, 0)) })).annotate({
        identifier: "CreateHsmResponse",
      });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
