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
  sdkId: "S3Files",
  target: "S3Files",
  version: "2025-05-05",
  sigv4: "s3files",
  protocol: restJson1Protocol,
  xmlns: "s3files",
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
              `https://s3files-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return e(
            `https://s3files.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError("ConflictException", ["ConflictError"], {
    status: 409,
  })<{
    readonly errorCode: string;
    readonly message?: string;
    readonly resourceId?: string;
    readonly resourceType?: string;
  }> {}
export class InternalServerException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerException",
    ["ServerError"],
    { status: 500 },
  )<{ readonly errorCode: string; readonly message?: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly errorCode: string; readonly message?: string }> {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceQuotaExceededException",
    ["QuotaError"],
    { status: 402 },
  )<{ readonly errorCode: string; readonly message?: string }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly errorCode: string; readonly message?: string }> {}
export type ClientToken = string;
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  key: string;
  value: string;
}
export type TagList = Tag[];
export type FileSystemId = string;
export type Uid = number;
export type Gid = number;
export type SecondaryGids = number[];
export interface PosixUser {
  uid: number;
  gid: number;
  secondaryGids?: number[];
}
export type Path = string;
export type OwnerUid = number;
export type OwnerGid = number;
export type Permissions = string;
export interface CreationPermissions {
  ownerUid: number;
  ownerGid: number;
  permissions: string;
}
export interface RootDirectory {
  path?: string;
  creationPermissions?: CreationPermissions;
}
export interface CreateAccessPointRequest {
  clientToken?: string;
  tags?: Tag[];
  fileSystemId: string;
  posixUser?: PosixUser;
  rootDirectory?: RootDirectory;
}
export type AccessPointArn = string;
export type AccessPointId = string;
export type LifeCycleState =
  | "available"
  | "creating"
  | "deleting"
  | "deleted"
  | "error"
  | "updating"
  | (string & {});
export type AwsAccountId = string;
export interface CreateAccessPointResponse {
  accessPointArn: string;
  accessPointId: string;
  clientToken: string;
  fileSystemId: string;
  status: LifeCycleState;
  ownerId: string;
  posixUser?: PosixUser;
  rootDirectory?: RootDirectory;
  tags?: Tag[];
  name?: string;
}
export type BucketArn = string;
export type CreationToken = string;
export type KmsKeyId = string;
export type RoleArn = string;
export interface CreateFileSystemRequest {
  bucket: string;
  prefix?: string;
  clientToken?: string;
  kmsKeyId?: string;
  roleArn: string;
  tags?: Tag[];
  acceptBucketWarning?: boolean;
}
export type FileSystemArn = string;
export type StatusMessage = string;
export interface CreateFileSystemResponse {
  creationTime?: Date;
  fileSystemArn?: string;
  fileSystemId?: string;
  bucket?: string;
  prefix?: string;
  clientToken?: string;
  kmsKeyId?: string;
  status?: LifeCycleState;
  statusMessage?: string;
  roleArn?: string;
  ownerId?: string;
  tags?: Tag[];
  name?: string;
}
export type SubnetId = string;
export type Ipv4Address = string;
export type Ipv6Address = string;
export type IpAddressType =
  | "IPV4_ONLY"
  | "IPV6_ONLY"
  | "DUAL_STACK"
  | (string & {});
export type SecurityGroup = string;
export type SecurityGroups = string[];
export interface CreateMountTargetRequest {
  fileSystemId: string;
  subnetId: string;
  ipv4Address?: string;
  ipv6Address?: string;
  ipAddressType?: IpAddressType;
  securityGroups?: string[];
}
export type AvailabilityZoneId = string;
export type MountTargetId = string;
export type NetworkInterfaceId = string;
export type VpcId = string;
export interface CreateMountTargetResponse {
  availabilityZoneId?: string;
  ownerId: string;
  mountTargetId: string;
  fileSystemId?: string;
  subnetId: string;
  ipv4Address?: string;
  ipv6Address?: string;
  networkInterfaceId?: string;
  vpcId?: string;
  securityGroups?: string[];
  status?: LifeCycleState;
  statusMessage?: string;
}
export interface DeleteAccessPointRequest {
  accessPointId: string;
}
export interface DeleteAccessPointResponse {}
export interface DeleteFileSystemRequest {
  fileSystemId: string;
  forceDelete?: boolean;
}
export interface DeleteFileSystemResponse {}
export interface DeleteFileSystemPolicyRequest {
  fileSystemId: string;
}
export interface DeleteFileSystemPolicyResponse {}
export interface DeleteMountTargetRequest {
  mountTargetId: string;
}
export interface DeleteMountTargetResponse {}
export interface GetAccessPointRequest {
  accessPointId: string;
}
export interface GetAccessPointResponse {
  accessPointArn: string;
  accessPointId: string;
  clientToken: string;
  fileSystemId: string;
  status: LifeCycleState;
  ownerId: string;
  posixUser?: PosixUser;
  rootDirectory?: RootDirectory;
  tags?: Tag[];
  name?: string;
}
export interface GetFileSystemRequest {
  fileSystemId: string;
}
export interface GetFileSystemResponse {
  creationTime?: Date;
  fileSystemArn?: string;
  fileSystemId?: string;
  bucket?: string;
  prefix?: string;
  clientToken?: string;
  kmsKeyId?: string;
  status?: LifeCycleState;
  statusMessage?: string;
  roleArn?: string;
  ownerId?: string;
  tags?: Tag[];
  name?: string;
}
export interface GetFileSystemPolicyRequest {
  fileSystemId: string;
}
export interface GetFileSystemPolicyResponse {
  fileSystemId: string;
  policy: string;
}
export interface GetMountTargetRequest {
  mountTargetId: string;
}
export interface GetMountTargetResponse {
  availabilityZoneId?: string;
  ownerId: string;
  mountTargetId: string;
  fileSystemId?: string;
  subnetId: string;
  ipv4Address?: string;
  ipv6Address?: string;
  networkInterfaceId?: string;
  vpcId?: string;
  securityGroups?: string[];
  status?: LifeCycleState;
  statusMessage?: string;
}
export interface GetSynchronizationConfigurationRequest {
  fileSystemId: string;
}
export type ImportTrigger =
  | "ON_DIRECTORY_FIRST_ACCESS"
  | "ON_FILE_ACCESS"
  | (string & {});
export interface ImportDataRule {
  prefix: string;
  trigger: ImportTrigger;
  sizeLessThan: number;
}
export type ImportDataRuleList = ImportDataRule[];
export interface ExpirationDataRule {
  daysAfterLastAccess: number;
}
export type ExpirationDataRuleList = ExpirationDataRule[];
export interface GetSynchronizationConfigurationResponse {
  latestVersionNumber?: number;
  importDataRules: ImportDataRule[];
  expirationDataRules: ExpirationDataRule[];
}
export interface ListAccessPointsRequest {
  fileSystemId: string;
  maxResults?: number;
  nextToken?: string;
}
export interface ListAccessPointsDescription {
  accessPointArn: string;
  accessPointId: string;
  fileSystemId: string;
  status: LifeCycleState;
  ownerId: string;
  posixUser?: PosixUser;
  rootDirectory?: RootDirectory;
  name?: string;
}
export type AccessPoints = ListAccessPointsDescription[];
export interface ListAccessPointsResponse {
  nextToken?: string;
  accessPoints: ListAccessPointsDescription[];
}
export interface ListFileSystemsRequest {
  bucket?: string;
  maxResults?: number;
  nextToken?: string;
}
export interface ListFileSystemsDescription {
  creationTime: Date;
  fileSystemArn: string;
  fileSystemId: string;
  name?: string;
  bucket: string;
  status: LifeCycleState;
  statusMessage?: string;
  roleArn: string;
  ownerId: string;
}
export type FileSystems = ListFileSystemsDescription[];
export interface ListFileSystemsResponse {
  nextToken?: string;
  fileSystems: ListFileSystemsDescription[];
}
export interface ListMountTargetsRequest {
  fileSystemId?: string;
  accessPointId?: string;
  maxResults?: number;
  nextToken?: string;
}
export interface ListMountTargetsDescription {
  availabilityZoneId?: string;
  fileSystemId?: string;
  ipv4Address?: string;
  ipv6Address?: string;
  status?: LifeCycleState;
  statusMessage?: string;
  mountTargetId: string;
  networkInterfaceId?: string;
  ownerId: string;
  subnetId: string;
  vpcId?: string;
}
export type MountTargets = ListMountTargetsDescription[];
export interface ListMountTargetsResponse {
  nextToken?: string;
  mountTargets: ListMountTargetsDescription[];
}
export type ResourceId = string;
export interface ListTagsForResourceRequest {
  resourceId: string;
  maxResults?: number;
  nextToken?: string;
}
export interface ListTagsForResourceResponse {
  tags?: Tag[];
  nextToken?: string;
}
export interface PutFileSystemPolicyRequest {
  fileSystemId: string;
  policy: string;
}
export interface PutFileSystemPolicyResponse {}
export interface PutSynchronizationConfigurationRequest {
  fileSystemId: string;
  latestVersionNumber?: number;
  importDataRules: ImportDataRule[];
  expirationDataRules: ExpirationDataRule[];
}
export interface PutSynchronizationConfigurationResponse {}
export interface TagResourceRequest {
  resourceId: string;
  tags: Tag[];
}
export interface TagResourceResponse {}
export type TagKeys = string[];
export interface UntagResourceRequest {
  resourceId: string;
  tagKeys: string[];
}
export interface UntagResourceResponse {}
export interface UpdateMountTargetRequest {
  mountTargetId: string;
  securityGroups: string[];
}
export interface UpdateMountTargetResponse {
  availabilityZoneId?: string;
  ownerId: string;
  mountTargetId: string;
  fileSystemId?: string;
  subnetId: string;
  ipv4Address?: string;
  ipv6Address?: string;
  networkInterfaceId?: string;
  vpcId?: string;
  securityGroups?: string[];
  status?: LifeCycleState;
  statusMessage?: string;
}
export type ErrorCode = string;
export type CreateAccessPointError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Creates an S3 File System Access Point for application-specific access with POSIX user identity and root directory enforcement. Access points provide a way to manage access to shared datasets in multi-tenant scenarios.
 */
export const createAccessPoint: API.OperationMethod<
  CreateAccessPointRequest,
  CreateAccessPointResponse,
  CreateAccessPointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /access-points",
    input: {
      clientToken: D.m({ idempotency: true }),
      tags: D.list(i_Tag),
      fileSystemId: 0,
      posixUser: { uid: 0, gid: 0, secondaryGids: 0 },
      rootDirectory: {
        path: 0,
        creationPermissions: { ownerUid: 0, ownerGid: 0, permissions: 0 },
      },
    },
    body: true,
  },
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAccessPoint",
})) as any;

export type CreateFileSystemError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Creates an S3 File System resource scoped to a bucket or prefix within a bucket, enabling file system access to S3 data. To create a file system, you need an S3 bucket and an IAM role that grants the service permission to access the bucket.
 */
export const createFileSystem: API.OperationMethod<
  CreateFileSystemRequest,
  CreateFileSystemResponse,
  CreateFileSystemError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /file-systems",
    input: {
      bucket: 0,
      prefix: 0,
      clientToken: D.m({ idempotency: true }),
      kmsKeyId: 0,
      roleArn: 0,
      tags: D.list(i_Tag),
      acceptBucketWarning: 0,
    },
    output: { creationTime: D.ts },
    body: true,
  },
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateFileSystem",
})) as any;

export type CreateMountTargetError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Creates a mount target resource as an endpoint for mounting the S3 File System from compute resources in a specific Availability Zone and VPC. Mount targets provide network access to the file system.
 */
export const createMountTarget: API.OperationMethod<
  CreateMountTargetRequest,
  CreateMountTargetResponse,
  CreateMountTargetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /mount-targets",
    input: {
      fileSystemId: 0,
      subnetId: 0,
      ipv4Address: 0,
      ipv6Address: 0,
      ipAddressType: 0,
      securityGroups: 0,
    },
    body: true,
  },
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateMountTarget",
})) as any;

export type DeleteAccessPointError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an S3 File System Access Point. This operation is irreversible.
 */
export const deleteAccessPoint: API.OperationMethod<
  DeleteAccessPointRequest,
  DeleteAccessPointResponse,
  DeleteAccessPointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /access-points/{accessPointId}",
    input: { accessPointId: 0 },
  },
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAccessPoint",
})) as any;

export type DeleteFileSystemError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an S3 File System. You can optionally force deletion of a file system that has pending export data.
 */
export const deleteFileSystem: API.OperationMethod<
  DeleteFileSystemRequest,
  DeleteFileSystemResponse,
  DeleteFileSystemError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /file-systems/{fileSystemId}",
    input: { fileSystemId: 0, forceDelete: D.m({ query: "forceDelete" }) },
  },
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteFileSystem",
})) as any;

export type DeleteFileSystemPolicyError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the IAM resource policy of an S3 File System.
 */
export const deleteFileSystemPolicy: API.OperationMethod<
  DeleteFileSystemPolicyRequest,
  DeleteFileSystemPolicyResponse,
  DeleteFileSystemPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /file-systems/{fileSystemId}/policy",
    input: { fileSystemId: 0 },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteFileSystemPolicy",
})) as any;

export type DeleteMountTargetError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the specified mount target. This operation is irreversible.
 */
export const deleteMountTarget: API.OperationMethod<
  DeleteMountTargetRequest,
  DeleteMountTargetResponse,
  DeleteMountTargetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /mount-targets/{mountTargetId}",
    input: { mountTargetId: 0 },
  },
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteMountTarget",
})) as any;

export type GetAccessPointError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns resource information for an S3 File System Access Point.
 */
export const getAccessPoint: API.OperationMethod<
  GetAccessPointRequest,
  GetAccessPointResponse,
  GetAccessPointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /access-points/{accessPointId}",
    input: { accessPointId: 0 },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAccessPoint",
})) as any;

export type GetFileSystemError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns resource information for the specified S3 File System including status, configuration, and metadata.
 */
export const getFileSystem: API.OperationMethod<
  GetFileSystemRequest,
  GetFileSystemResponse,
  GetFileSystemError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /file-systems/{fileSystemId}",
    input: { fileSystemId: 0 },
    output: { creationTime: D.ts },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetFileSystem",
})) as any;

export type GetFileSystemPolicyError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns the IAM resource policy of an S3 File System.
 */
export const getFileSystemPolicy: API.OperationMethod<
  GetFileSystemPolicyRequest,
  GetFileSystemPolicyResponse,
  GetFileSystemPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /file-systems/{fileSystemId}/policy",
    input: { fileSystemId: 0 },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetFileSystemPolicy",
})) as any;

export type GetMountTargetError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns detailed resource information for the specified mount target including network configuration.
 */
export const getMountTarget: API.OperationMethod<
  GetMountTargetRequest,
  GetMountTargetResponse,
  GetMountTargetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /mount-targets/{mountTargetId}",
    input: { mountTargetId: 0 },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMountTarget",
})) as any;

export type GetSynchronizationConfigurationError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns the synchronization configuration for the specified S3 File System, including import data rules and expiration data rules.
 */
export const getSynchronizationConfiguration: API.OperationMethod<
  GetSynchronizationConfigurationRequest,
  GetSynchronizationConfigurationResponse,
  GetSynchronizationConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /file-systems/{fileSystemId}/synchronization-configuration",
    input: { fileSystemId: 0 },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSynchronizationConfiguration",
})) as any;

export type ListAccessPointsError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns resource information for all S3 File System Access Points associated with the specified S3 File System.
 */
export const listAccessPoints: API.PaginatedOperationMethod<
  ListAccessPointsRequest,
  ListAccessPointsResponse,
  ListAccessPointsError,
  Credentials | HttpClient.HttpClient,
  ListAccessPointsDescription
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /access-points",
    input: {
      fileSystemId: D.m({ query: "fileSystemId" }),
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAccessPoints",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "accessPoints",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListFileSystemsError =
  | InternalServerException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of all S3 File Systems owned by the account with optional filtering by bucket.
 */
export const listFileSystems: API.PaginatedOperationMethod<
  ListFileSystemsRequest,
  ListFileSystemsResponse,
  ListFileSystemsError,
  Credentials | HttpClient.HttpClient,
  ListFileSystemsDescription
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /file-systems",
    input: {
      bucket: D.m({ query: "bucket" }),
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
    output: { fileSystems: D.list({ creationTime: D.ts }) },
  },
  errors: [InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListFileSystems",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "fileSystems",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListMountTargetsError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns resource information for all mount targets with optional filtering by file system, access point, and VPC.
 */
export const listMountTargets: API.PaginatedOperationMethod<
  ListMountTargetsRequest,
  ListMountTargetsResponse,
  ListMountTargetsError,
  Credentials | HttpClient.HttpClient,
  ListMountTargetsDescription
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /mount-targets",
    input: {
      fileSystemId: D.m({ query: "fileSystemId" }),
      accessPointId: D.m({ query: "accessPointId" }),
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMountTargets",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "mountTargets",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists all tags for S3 Files resources.
 */
export const listTagsForResource: API.PaginatedOperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient,
  Tag
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /resource-tags/{resourceId}",
    input: {
      resourceId: 0,
      maxResults: D.m({ query: "MaxResults" }),
      nextToken: D.m({ query: "NextToken" }),
    },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "tags",
    pageSize: "maxResults",
  } as const,
})) as any;

export type PutFileSystemPolicyError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Creates or replaces the IAM resource policy for an S3 File System to control access permissions.
 */
export const putFileSystemPolicy: API.OperationMethod<
  PutFileSystemPolicyRequest,
  PutFileSystemPolicyResponse,
  PutFileSystemPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /file-systems/{fileSystemId}/policy",
    input: { fileSystemId: 0, policy: 0 },
    body: true,
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutFileSystemPolicy",
})) as any;

export type PutSynchronizationConfigurationError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Creates or updates the synchronization configuration for the specified S3 File System, including import data rules and expiration data rules.
 */
export const putSynchronizationConfiguration: API.OperationMethod<
  PutSynchronizationConfigurationRequest,
  PutSynchronizationConfigurationResponse,
  PutSynchronizationConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /file-systems/{fileSystemId}/synchronization-configuration",
    input: {
      fileSystemId: 0,
      latestVersionNumber: 0,
      importDataRules: D.list({ prefix: 0, trigger: 0, sizeLessThan: 0 }),
      expirationDataRules: D.list({ daysAfterLastAccess: 0 }),
    },
    body: true,
  },
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutSynchronizationConfiguration",
})) as any;

export type TagResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Creates tags for S3 Files resources using standard Amazon Web Services tagging APIs.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /resource-tags/{resourceId}",
    input: { resourceId: 0, tags: D.list(i_Tag) },
    body: true,
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

export type UntagResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Removes tags from S3 Files resources.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /resource-tags/{resourceId}",
    input: { resourceId: 0, tagKeys: D.m({ query: "tagKeys" }) },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

export type UpdateMountTargetError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Updates the mount target resource, specifically security group configurations.
 */
export const updateMountTarget: API.OperationMethod<
  UpdateMountTargetRequest,
  UpdateMountTargetResponse,
  UpdateMountTargetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /mount-targets/{mountTargetId}",
    input: { mountTargetId: 0, securityGroups: 0 },
    body: true,
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateMountTarget",
})) as any;

const i_Tag: D.LazyStruct = () => ({ key: 0, value: 0 });
