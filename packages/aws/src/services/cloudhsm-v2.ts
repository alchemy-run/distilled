import type * as HttpClient from "effect/unstable/http/HttpClient";
import * as API from "@distilled.cloud/core/api";
import * as D from "@distilled.cloud/core/shape";
import * as TE from "@distilled.cloud/core/error-class";
import { AwsProtocol } from "../protocol.ts";
import { awsJson1_1Protocol } from "../protocols/aws-json.ts";
import { Retry } from "../retry.ts";
import type * as T from "../types.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
const svc: T.ServiceInfo = {
  sdkId: "CloudHSM V2",
  target: "BaldrApiService",
  version: "2017-04-28",
  sigv4: "cloudhsm",
  protocol: awsJson1_1Protocol,
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
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://cloudhsmv2.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          if ("aws" === _.getAttr(PartitionResult, "name")) {
            return e(`https://cloudhsmv2.${Region}.amazonaws.com`);
          }
          if ("aws-us-gov" === _.getAttr(PartitionResult, "name")) {
            return e(`https://cloudhsmv2.${Region}.amazonaws.com`);
          }
          return e(
            `https://cloudhsmv2.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class CloudHsmAccessDeniedException
  extends /*@__PURE__*/ TE.TaggedError("CloudHsmAccessDeniedException", [
    "AuthError",
  ])<{ readonly message?: string }> {}
export class CloudHsmInternalFailureException
  extends /*@__PURE__*/ TE.TaggedError("CloudHsmInternalFailureException")<{
    readonly message?: string;
  }> {}
export class CloudHsmInvalidRequestException
  extends /*@__PURE__*/ TE.TaggedError("CloudHsmInvalidRequestException")<{
    readonly message?: string;
  }> {}
export class CloudHsmResourceLimitExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "CloudHsmResourceLimitExceededException",
  )<{ readonly message?: string }> {}
export class CloudHsmResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError("CloudHsmResourceNotFoundException")<{
    readonly message?: string;
  }> {}
export class CloudHsmServiceException
  extends /*@__PURE__*/ TE.TaggedError("CloudHsmServiceException")<{
    readonly message?: string;
  }> {}
export class CloudHsmTagException
  extends /*@__PURE__*/ TE.TaggedError("CloudHsmTagException")<{
    readonly message?: string;
  }> {}
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
  descriptor: {
    service: svc,
    input: { DestinationRegion: 0, BackupId: 0, TagList: D.list(i_Tag) },
    output: { DestinationBackup: { CreateTimestamp: D.ts } },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      BackupRetentionPolicy: i_BackupRetentionPolicy,
      HsmType: 0,
      SourceBackupId: 0,
      SubnetIds: 0,
      NetworkType: 0,
      TagList: D.list(i_Tag),
      Mode: 0,
    },
    output: { Cluster: o_Cluster },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: { ClusterId: 0, AvailabilityZone: 0, IpAddress: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: { BackupId: 0 },
    output: { Backup: o_Backup },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: { ClusterId: 0 },
    output: { Cluster: o_Cluster },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: { ClusterId: 0, HsmId: 0, EniId: 0, EniIp: 0 },
  },
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
})) as any;

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
  descriptor: { service: svc, input: { ResourceArn: 0 } },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      NextToken: 0,
      MaxResults: 0,
      Filters: 0,
      Shared: 0,
      SortAscending: 0,
    },
    output: { Backups: D.list(o_Backup) },
  },
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
  descriptor: {
    service: svc,
    input: { Filters: 0, NextToken: 0, MaxResults: 0 },
    output: { Clusters: D.list(o_Cluster) },
  },
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
  descriptor: { service: svc, input: { ResourceArn: 0 } },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: { ClusterId: 0, SignedCert: 0, TrustAnchor: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: { ResourceId: 0, NextToken: 0, MaxResults: 0 },
  },
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
  descriptor: {
    service: svc,
    input: { BackupId: 0, NeverExpires: 0 },
    output: { Backup: o_Backup },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      HsmType: 0,
      BackupRetentionPolicy: i_BackupRetentionPolicy,
      ClusterId: 0,
    },
    output: { Cluster: o_Cluster },
  },
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
})) as any;

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
  descriptor: { service: svc, input: { ResourceArn: 0, Policy: 0 } },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: { BackupId: 0 },
    output: { Backup: o_Backup },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: { ResourceId: 0, TagList: D.list(i_Tag) },
  },
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
})) as any;

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
  descriptor: { service: svc, input: { ResourceId: 0, TagKeyList: 0 } },
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
})) as any;

const i_BackupRetentionPolicy: D.LazyStruct = () => ({ Type: 0, Value: 0 });
const i_Tag: D.LazyStruct = () => ({ Key: 0, Value: 0 });
const o_Backup: D.LazyStruct = () => ({
  CreateTimestamp: D.ts,
  CopyTimestamp: D.ts,
  DeleteTimestamp: D.ts,
});
const o_Cluster: D.LazyStruct = () => ({
  CreateTimestamp: D.ts,
  HsmTypeRollbackExpiration: D.ts,
});
