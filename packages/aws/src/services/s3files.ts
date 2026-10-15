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
const ns = /*@__PURE__*/ T.XmlNamespace("s3files");
const svc = /*@__PURE__*/ T.AwsApiService({ sdkId: "S3Files", serviceShapeName: "S3Files" });
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "s3files" });
const ver = /*@__PURE__*/ T.ServiceVersion("2025-05-05");
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
              `https://s3files-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return e(`https://s3files.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`);
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
  '{"url":"https://s3files.{R}.api.aws","properties":{},"headers":{}}',
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

export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    {
      errorCode: S.String,
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      resourceId: /*@__PURE__*/ S.optional(S.String),
      resourceType: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    {
      errorCode: S.String,
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    {
      errorCode: S.String,
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    {
      errorCode: S.String,
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    {
      errorCode: S.String,
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
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
export type IpAddressType = "IPV4_ONLY" | "IPV6_ONLY" | "DUAL_STACK" | (string & {});
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
export type ImportTrigger = "ON_DIRECTORY_FIRST_ACCESS" | "ON_FILE_ACCESS" | (string & {});
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
  input: __S(68, __c17, 0) as any as S.Schema<CreateAccessPointRequest>,
  output: __S(72, __c18, 0) as any as S.Schema<CreateAccessPointResponse>,
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
}));

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
  input: __S(84, __c21, 0) as any as S.Schema<CreateFileSystemRequest>,
  output: __S(88, __c22, 0) as any as S.Schema<CreateFileSystemResponse>,
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
}));

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
  input: __S(92, __c23, 0) as any as S.Schema<CreateMountTargetRequest>,
  output: __S(100, __c25, 0) as any as S.Schema<CreateMountTargetResponse>,
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
}));

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
  input: __S(104, __c26, 0) as any as S.Schema<DeleteAccessPointRequest>,
  output: __S(108, __c27, 0) as any as S.Schema<DeleteAccessPointResponse>,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAccessPoint",
}));

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
  input: __S(112, __c28, 0) as any as S.Schema<DeleteFileSystemRequest>,
  output: __S(108, __c27, 0) as any as S.Schema<DeleteFileSystemResponse>,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteFileSystem",
}));

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
  input: __S(0, __c0, 0) as any as S.Schema<DeleteFileSystemPolicyRequest>,
  output: __S(108, __c27, 0) as any as S.Schema<DeleteFileSystemPolicyResponse>,
  errors: [InternalServerException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteFileSystemPolicy",
}));

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
  input: __S(4, __c1, 0) as any as S.Schema<DeleteMountTargetRequest>,
  output: __S(108, __c27, 0) as any as S.Schema<DeleteMountTargetResponse>,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteMountTarget",
}));

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
  input: __S(8, __c2, 0) as any as S.Schema<GetAccessPointRequest>,
  output: __S(72, __c18, 0) as any as S.Schema<GetAccessPointResponse>,
  errors: [InternalServerException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAccessPoint",
}));

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
  input: __S(12, __c3, 0) as any as S.Schema<GetFileSystemRequest>,
  output: __S(88, __c22, 0) as any as S.Schema<GetFileSystemResponse>,
  errors: [InternalServerException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetFileSystem",
}));

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
  input: __S(16, __c4, 0) as any as S.Schema<GetFileSystemPolicyRequest>,
  output: __S(17, __c4, 1) as any as S.Schema<GetFileSystemPolicyResponse>,
  errors: [InternalServerException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetFileSystemPolicy",
}));

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
  input: __S(20, __c5, 0) as any as S.Schema<GetMountTargetRequest>,
  output: __S(100, __c25, 0) as any as S.Schema<GetMountTargetResponse>,
  errors: [InternalServerException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMountTarget",
}));

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
  input: __S(24, __c6, 0) as any as S.Schema<GetSynchronizationConfigurationRequest>,
  output: __S(25, __c6, 1) as any as S.Schema<GetSynchronizationConfigurationResponse>,
  errors: [InternalServerException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSynchronizationConfiguration",
}));

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
  input: __S(32, __c8, 0) as any as S.Schema<ListAccessPointsRequest>,
  output: __S(35, __c8, 3) as any as S.Schema<ListAccessPointsResponse>,
  errors: [InternalServerException, ResourceNotFoundException, ValidationException],
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

export type ListFileSystemsError = InternalServerException | ValidationException | CommonErrors;
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
  input: __S(36, __c9, 0) as any as S.Schema<ListFileSystemsRequest>,
  output: __S(39, __c9, 3) as any as S.Schema<ListFileSystemsResponse>,
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
  input: __S(40, __c10, 0) as any as S.Schema<ListMountTargetsRequest>,
  output: __S(43, __c10, 3) as any as S.Schema<ListMountTargetsResponse>,
  errors: [InternalServerException, ResourceNotFoundException, ValidationException],
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
  input: __S(44, __c11, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(45, __c11, 1) as any as S.Schema<ListTagsForResourceResponse>,
  errors: [InternalServerException, ResourceNotFoundException, ValidationException],
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
  input: __S(48, __c12, 0) as any as S.Schema<PutFileSystemPolicyRequest>,
  output: __S(108, __c27, 0) as any as S.Schema<PutFileSystemPolicyResponse>,
  errors: [InternalServerException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutFileSystemPolicy",
}));

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
  input: __S(52, __c13, 0) as any as S.Schema<PutSynchronizationConfigurationRequest>,
  output: __S(108, __c27, 0) as any as S.Schema<PutSynchronizationConfigurationResponse>,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutSynchronizationConfiguration",
}));

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
  input: __S(56, __c14, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(108, __c27, 0) as any as S.Schema<TagResourceResponse>,
  errors: [InternalServerException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

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
  input: __S(60, __c15, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(108, __c27, 0) as any as S.Schema<UntagResourceResponse>,
  errors: [InternalServerException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

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
  input: __S(64, __c16, 0) as any as S.Schema<UpdateMountTargetRequest>,
  output: __S(100, __c25, 0) as any as S.Schema<UpdateMountTargetResponse>,
  errors: [InternalServerException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateMountTarget",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ fileSystemId: S.String.pipe(T.HttpLabel("fileSystemId")) }).pipe(
          T.all(
            ns,
            T.Http({ method: "DELETE", uri: "/file-systems/{fileSystemId}/policy" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteFileSystemPolicyRequest" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ mountTargetId: S.String.pipe(T.HttpLabel("mountTargetId")) }).pipe(
          T.all(
            ns,
            T.Http({ method: "DELETE", uri: "/mount-targets/{mountTargetId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteMountTargetRequest" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ accessPointId: S.String.pipe(T.HttpLabel("accessPointId")) }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/access-points/{accessPointId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetAccessPointRequest" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ fileSystemId: S.String.pipe(T.HttpLabel("fileSystemId")) }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/file-systems/{fileSystemId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetFileSystemRequest" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ fileSystemId: S.String.pipe(T.HttpLabel("fileSystemId")) }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/file-systems/{fileSystemId}/policy" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetFileSystemPolicyRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ fileSystemId: S.String, policy: S.String }).pipe(ns),
      ).annotate({ identifier: "GetFileSystemPolicyResponse" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ mountTargetId: S.String.pipe(T.HttpLabel("mountTargetId")) }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/mount-targets/{mountTargetId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetMountTargetRequest" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ fileSystemId: S.String.pipe(T.HttpLabel("fileSystemId")) }).pipe(
          T.all(
            ns,
            T.Http({
              method: "GET",
              uri: "/file-systems/{fileSystemId}/synchronization-configuration",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetSynchronizationConfigurationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          latestVersionNumber: S.optional(S.Number),
          importDataRules: __S(29, __c7, 1),
          expirationDataRules: __S(31, __c7, 3),
        }).pipe(ns),
      ).annotate({ identifier: "GetSynchronizationConfigurationResponse" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ prefix: S.String, trigger: S.String, sizeLessThan: S.Number }),
      ).annotate({ identifier: "ImportDataRule" });
    case 1:
      return S.Array(__S(28, __c7, 0));
    case 2:
      return S.suspend(() => S.Struct({ daysAfterLastAccess: S.Number })).annotate({
        identifier: "ExpirationDataRule",
      });
    case 3:
      return S.Array(__S(30, __c7, 2));
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          fileSystemId: S.String.pipe(T.HttpQuery("fileSystemId")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(ns, T.Http({ method: "GET", uri: "/access-points" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListAccessPointsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          accessPointArn: S.String,
          accessPointId: S.String,
          fileSystemId: S.String,
          status: S.String,
          ownerId: S.String,
          posixUser: S.optional(__S(77, __c19, 1)),
          rootDirectory: S.optional(__S(79, __c19, 3)),
          name: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListAccessPointsDescription" });
    case 2:
      return S.Array(__S(33, __c8, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), accessPoints: __S(34, __c8, 2) }).pipe(ns),
      ).annotate({ identifier: "ListAccessPointsResponse" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          bucket: S.optional(S.String).pipe(T.HttpQuery("bucket")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(ns, T.Http({ method: "GET", uri: "/file-systems" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListFileSystemsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          creationTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          fileSystemArn: S.String,
          fileSystemId: S.String,
          name: S.optional(S.String),
          bucket: S.String,
          status: S.String,
          statusMessage: S.optional(S.String),
          roleArn: S.String,
          ownerId: S.String,
        }),
      ).annotate({ identifier: "ListFileSystemsDescription" });
    case 2:
      return S.Array(__S(37, __c9, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), fileSystems: __S(38, __c9, 2) }).pipe(ns),
      ).annotate({ identifier: "ListFileSystemsResponse" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          fileSystemId: S.optional(S.String).pipe(T.HttpQuery("fileSystemId")),
          accessPointId: S.optional(S.String).pipe(T.HttpQuery("accessPointId")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(ns, T.Http({ method: "GET", uri: "/mount-targets" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListMountTargetsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          availabilityZoneId: S.optional(S.String),
          fileSystemId: S.optional(S.String),
          ipv4Address: S.optional(S.String),
          ipv6Address: S.optional(S.String),
          status: S.optional(S.String),
          statusMessage: S.optional(S.String),
          mountTargetId: S.String,
          networkInterfaceId: S.optional(S.String),
          ownerId: S.String,
          subnetId: S.String,
          vpcId: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListMountTargetsDescription" });
    case 2:
      return S.Array(__S(41, __c10, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), mountTargets: __S(42, __c10, 2) }).pipe(ns),
      ).annotate({ identifier: "ListMountTargetsResponse" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceId: S.String.pipe(T.HttpLabel("resourceId")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/resource-tags/{resourceId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListTagsForResourceRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ tags: S.optional(__S(81, __c20, 1)), nextToken: S.optional(S.String) }).pipe(ns),
      ).annotate({ identifier: "ListTagsForResourceResponse" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          fileSystemId: S.String.pipe(T.HttpLabel("fileSystemId")),
          policy: S.String,
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "PUT", uri: "/file-systems/{fileSystemId}/policy" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutFileSystemPolicyRequest" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          fileSystemId: S.String.pipe(T.HttpLabel("fileSystemId")),
          latestVersionNumber: S.optional(S.Number),
          importDataRules: __S(29, __c7, 1),
          expirationDataRules: __S(31, __c7, 3),
        }).pipe(
          T.all(
            ns,
            T.Http({
              method: "PUT",
              uri: "/file-systems/{fileSystemId}/synchronization-configuration",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutSynchronizationConfigurationRequest" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceId: S.String.pipe(T.HttpLabel("resourceId")),
          tags: __S(81, __c20, 1),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/resource-tags/{resourceId}" }),
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
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceId: S.String.pipe(T.HttpLabel("resourceId")),
          tagKeys: __S(96, __c24, 0).pipe(T.HttpQuery("tagKeys")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "DELETE", uri: "/resource-tags/{resourceId}" }),
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
          mountTargetId: S.String.pipe(T.HttpLabel("mountTargetId")),
          securityGroups: __S(96, __c24, 0),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "PUT", uri: "/mount-targets/{mountTargetId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateMountTargetRequest" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          tags: S.optional(__S(81, __c20, 1)),
          fileSystemId: S.String,
          posixUser: S.optional(__S(77, __c19, 1)),
          rootDirectory: S.optional(__S(79, __c19, 3)),
        }).pipe(
          T.all(ns, T.Http({ method: "PUT", uri: "/access-points" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateAccessPointRequest" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          accessPointArn: S.String,
          accessPointId: S.String,
          clientToken: S.String,
          fileSystemId: S.String,
          status: S.String,
          ownerId: S.String,
          posixUser: S.optional(__S(77, __c19, 1)),
          rootDirectory: S.optional(__S(79, __c19, 3)),
          tags: S.optional(__S(81, __c20, 1)),
          name: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "CreateAccessPointResponse" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.Number);
    case 1:
      return S.suspend(() =>
        S.Struct({ uid: S.Number, gid: S.Number, secondaryGids: S.optional(__S(76, __c19, 0)) }),
      ).annotate({ identifier: "PosixUser" });
    case 2:
      return S.suspend(() =>
        S.Struct({ ownerUid: S.Number, ownerGid: S.Number, permissions: S.String }),
      ).annotate({ identifier: "CreationPermissions" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          path: S.optional(S.String),
          creationPermissions: S.optional(__S(78, __c19, 2)),
        }),
      ).annotate({ identifier: "RootDirectory" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ key: S.String, value: S.String })).annotate({
        identifier: "Tag",
      });
    case 1:
      return S.Array(__S(80, __c20, 0));
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          bucket: S.String,
          prefix: S.optional(S.String),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          kmsKeyId: S.optional(S.String),
          roleArn: S.String,
          tags: S.optional(__S(81, __c20, 1)),
          acceptBucketWarning: S.optional(S.Boolean),
        }).pipe(
          T.all(ns, T.Http({ method: "PUT", uri: "/file-systems" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateFileSystemRequest" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          creationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          fileSystemArn: S.optional(S.String),
          fileSystemId: S.optional(S.String),
          bucket: S.optional(S.String),
          prefix: S.optional(S.String),
          clientToken: S.optional(S.String),
          kmsKeyId: S.optional(S.String),
          status: S.optional(S.String),
          statusMessage: S.optional(S.String),
          roleArn: S.optional(S.String),
          ownerId: S.optional(S.String),
          tags: S.optional(__S(81, __c20, 1)),
          name: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "CreateFileSystemResponse" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          fileSystemId: S.String,
          subnetId: S.String,
          ipv4Address: S.optional(S.String),
          ipv6Address: S.optional(S.String),
          ipAddressType: S.optional(S.String),
          securityGroups: S.optional(__S(96, __c24, 0)),
        }).pipe(
          T.all(ns, T.Http({ method: "PUT", uri: "/mount-targets" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateMountTargetRequest" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          availabilityZoneId: S.optional(S.String),
          ownerId: S.String,
          mountTargetId: S.String,
          fileSystemId: S.optional(S.String),
          subnetId: S.String,
          ipv4Address: S.optional(S.String),
          ipv6Address: S.optional(S.String),
          networkInterfaceId: S.optional(S.String),
          vpcId: S.optional(S.String),
          securityGroups: S.optional(__S(96, __c24, 0)),
          status: S.optional(S.String),
          statusMessage: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "CreateMountTargetResponse" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ accessPointId: S.String.pipe(T.HttpLabel("accessPointId")) }).pipe(
          T.all(
            ns,
            T.Http({ method: "DELETE", uri: "/access-points/{accessPointId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteAccessPointRequest" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "DeleteAccessPointResponse",
      });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          fileSystemId: S.String.pipe(T.HttpLabel("fileSystemId")),
          forceDelete: S.optional(S.Boolean).pipe(T.HttpQuery("forceDelete")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "DELETE", uri: "/file-systems/{fileSystemId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteFileSystemRequest" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
