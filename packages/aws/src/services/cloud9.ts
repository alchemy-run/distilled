import type * as HttpClient from "effect/unstable/http/HttpClient";
import type * as redacted from "effect/Redacted";
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
  sdkId: "Cloud9",
  target: "AWSCloud9WorkspaceManagementService",
  version: "2017-09-23",
  sigv4: "cloud9",
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
                `https://cloud9-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://cloud9-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://cloud9.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://cloud9.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class BadRequestException
  extends /*@__PURE__*/ TE.TaggedError("BadRequestException")<{
    readonly message?: string;
    readonly className?: string;
    readonly code?: number;
  }> {}
export class ConcurrentAccessException
  extends /*@__PURE__*/ TE.TaggedError("ConcurrentAccessException")<{
    readonly message?: string;
    readonly className?: string;
    readonly code?: number;
  }> {}
export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError("ConflictException")<{
    readonly message?: string;
    readonly className?: string;
    readonly code?: number;
  }> {}
export class ForbiddenException
  extends /*@__PURE__*/ TE.TaggedError("ForbiddenException")<{
    readonly message?: string;
    readonly className?: string;
    readonly code?: number;
  }> {}
export class InternalServerErrorException
  extends /*@__PURE__*/ TE.TaggedError("InternalServerErrorException")<{
    readonly message?: string;
    readonly className?: string;
    readonly code?: number;
  }> {}
export class LimitExceededException
  extends /*@__PURE__*/ TE.TaggedError("LimitExceededException")<{
    readonly message?: string;
    readonly className?: string;
    readonly code?: number;
  }> {}
export class NotFoundException
  extends /*@__PURE__*/ TE.TaggedError("NotFoundException")<{
    readonly message?: string;
    readonly className?: string;
    readonly code?: number;
  }> {}
export class TooManyRequestsException
  extends /*@__PURE__*/ TE.TaggedError("TooManyRequestsException")<{
    readonly message?: string;
    readonly className?: string;
    readonly code?: number;
  }> {}
export type EnvironmentName = string;
export type EnvironmentDescription = string | redacted.Redacted<string>;
export type ClientRequestToken = string;
export type InstanceType = string;
export type SubnetId = string;
export type ImageId = string;
export type AutomaticStopTimeMinutes = number;
export type UserArn = string;
export type TagKey = string | redacted.Redacted<string>;
export type TagValue = string | redacted.Redacted<string>;
export interface Tag {
  Key: string | redacted.Redacted<string>;
  Value: string | redacted.Redacted<string>;
}
export type TagList = Tag[];
export type ConnectionType = "CONNECT_SSH" | "CONNECT_SSM" | (string & {});
export interface CreateEnvironmentEC2Request {
  name: string;
  description?: string | redacted.Redacted<string>;
  clientRequestToken?: string;
  instanceType: string;
  subnetId?: string;
  imageId: string;
  automaticStopTimeMinutes?: number;
  ownerArn?: string;
  tags?: Tag[];
  connectionType?: ConnectionType;
  dryRun?: boolean;
}
export type EnvironmentId = string;
export interface CreateEnvironmentEC2Result {
  environmentId?: string;
}
export type MemberPermissions = "read-write" | "read-only" | (string & {});
export interface CreateEnvironmentMembershipRequest {
  environmentId: string;
  userArn: string;
  permissions: MemberPermissions;
}
export type Permissions = "owner" | "read-write" | "read-only" | (string & {});
export interface EnvironmentMember {
  permissions: Permissions;
  userId: string;
  userArn: string;
  environmentId: string;
  lastAccess?: Date;
}
export interface CreateEnvironmentMembershipResult {
  membership: EnvironmentMember;
}
export interface DeleteEnvironmentRequest {
  environmentId: string;
}
export interface DeleteEnvironmentResult {}
export interface DeleteEnvironmentMembershipRequest {
  environmentId: string;
  userArn: string;
}
export interface DeleteEnvironmentMembershipResult {}
export type PermissionsList = Permissions[];
export type MaxResults = number;
export interface DescribeEnvironmentMembershipsRequest {
  userArn?: string;
  environmentId?: string;
  permissions?: Permissions[];
  nextToken?: string;
  maxResults?: number;
}
export type EnvironmentMembersList = EnvironmentMember[];
export interface DescribeEnvironmentMembershipsResult {
  memberships?: EnvironmentMember[];
  nextToken?: string;
}
export type BoundedEnvironmentIdList = string[];
export interface DescribeEnvironmentsRequest {
  environmentIds: string[];
}
export type EnvironmentType = "ssh" | "ec2" | (string & {});
export type EnvironmentLifecycleStatus =
  | "CREATING"
  | "CREATED"
  | "CREATE_FAILED"
  | "DELETING"
  | "DELETE_FAILED"
  | (string & {});
export interface EnvironmentLifecycle {
  status?: EnvironmentLifecycleStatus;
  reason?: string;
  failureResource?: string;
}
export type ManagedCredentialsStatus =
  | "ENABLED_ON_CREATE"
  | "ENABLED_BY_OWNER"
  | "DISABLED_BY_DEFAULT"
  | "DISABLED_BY_OWNER"
  | "DISABLED_BY_COLLABORATOR"
  | "PENDING_REMOVAL_BY_COLLABORATOR"
  | "PENDING_START_REMOVAL_BY_COLLABORATOR"
  | "PENDING_REMOVAL_BY_OWNER"
  | "PENDING_START_REMOVAL_BY_OWNER"
  | "FAILED_REMOVAL_BY_COLLABORATOR"
  | "FAILED_REMOVAL_BY_OWNER"
  | (string & {});
export interface Environment {
  id?: string;
  name?: string;
  description?: string | redacted.Redacted<string>;
  type: EnvironmentType;
  connectionType?: ConnectionType;
  arn: string;
  ownerArn: string;
  lifecycle?: EnvironmentLifecycle;
  managedCredentialsStatus?: ManagedCredentialsStatus;
}
export type EnvironmentList = Environment[];
export interface DescribeEnvironmentsResult {
  environments?: Environment[];
}
export interface DescribeEnvironmentStatusRequest {
  environmentId: string;
}
export type EnvironmentStatus =
  | "error"
  | "creating"
  | "connecting"
  | "ready"
  | "stopping"
  | "stopped"
  | "deleting"
  | (string & {});
export interface DescribeEnvironmentStatusResult {
  status: EnvironmentStatus;
  message: string;
}
export interface ListEnvironmentsRequest {
  nextToken?: string;
  maxResults?: number;
}
export type EnvironmentIdList = string[];
export interface ListEnvironmentsResult {
  nextToken?: string;
  environmentIds?: string[];
}
export type EnvironmentArn = string;
export interface ListTagsForResourceRequest {
  ResourceARN: string;
}
export interface ListTagsForResourceResponse {
  Tags?: Tag[];
}
export interface TagResourceRequest {
  ResourceARN: string;
  Tags: Tag[];
}
export interface TagResourceResponse {}
export type TagKeyList = (string | redacted.Redacted<string>)[];
export interface UntagResourceRequest {
  ResourceARN: string;
  TagKeys: (string | redacted.Redacted<string>)[];
}
export interface UntagResourceResponse {}
export type ManagedCredentialsAction = "ENABLE" | "DISABLE" | (string & {});
export interface UpdateEnvironmentRequest {
  environmentId: string;
  name?: string;
  description?: string | redacted.Redacted<string>;
  managedCredentialsAction?: ManagedCredentialsAction;
}
export interface UpdateEnvironmentResult {}
export interface UpdateEnvironmentMembershipRequest {
  environmentId: string;
  userArn: string;
  permissions: MemberPermissions;
}
export interface UpdateEnvironmentMembershipResult {
  membership?: EnvironmentMember;
}
export type CreateEnvironmentEC2Error =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | LimitExceededException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates an Cloud9 development environment, launches an Amazon Elastic Compute Cloud (Amazon EC2) instance, and
 * then connects from the instance to the environment.
 *
 * Cloud9 is no longer available to new customers. Existing customers of
 * Cloud9 can continue to use the service as normal.
 * Learn more"
 */
export const createEnvironmentEC2: API.OperationMethod<
  CreateEnvironmentEC2Request,
  CreateEnvironmentEC2Result,
  CreateEnvironmentEC2Error,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      name: 0,
      description: 0,
      clientRequestToken: 0,
      instanceType: 0,
      subnetId: 0,
      imageId: 0,
      automaticStopTimeMinutes: 0,
      ownerArn: 0,
      tags: D.list(i_Tag),
      connectionType: 0,
      dryRun: 0,
    },
  },
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    LimitExceededException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateEnvironmentEC2",
})) as any;

export type CreateEnvironmentMembershipError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | LimitExceededException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Adds an environment member to an Cloud9 development environment.
 *
 * Cloud9 is no longer available to new customers. Existing customers of
 * Cloud9 can continue to use the service as normal.
 * Learn more"
 */
export const createEnvironmentMembership: API.OperationMethod<
  CreateEnvironmentMembershipRequest,
  CreateEnvironmentMembershipResult,
  CreateEnvironmentMembershipError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { environmentId: 0, userArn: 0, permissions: 0 },
    output: { membership: o_EnvironmentMember },
  },
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    LimitExceededException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateEnvironmentMembership",
})) as any;

export type DeleteEnvironmentError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | LimitExceededException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes an Cloud9 development environment. If an Amazon EC2 instance is connected to the
 * environment, also terminates the instance.
 *
 * Cloud9 is no longer available to new customers. Existing customers of
 * Cloud9 can continue to use the service as normal.
 * Learn more"
 */
export const deleteEnvironment: API.OperationMethod<
  DeleteEnvironmentRequest,
  DeleteEnvironmentResult,
  DeleteEnvironmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { environmentId: 0 } },
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    LimitExceededException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteEnvironment",
})) as any;

export type DeleteEnvironmentMembershipError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | LimitExceededException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes an environment member from a development environment.
 *
 * Cloud9 is no longer available to new customers. Existing customers of
 * Cloud9 can continue to use the service as normal.
 * Learn more"
 */
export const deleteEnvironmentMembership: API.OperationMethod<
  DeleteEnvironmentMembershipRequest,
  DeleteEnvironmentMembershipResult,
  DeleteEnvironmentMembershipError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { environmentId: 0, userArn: 0 } },
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    LimitExceededException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteEnvironmentMembership",
})) as any;

export type DescribeEnvironmentMembershipsError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | LimitExceededException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets information about environment members for an Cloud9 development environment.
 *
 * Cloud9 is no longer available to new customers. Existing customers of
 * Cloud9 can continue to use the service as normal.
 * Learn more"
 */
export const describeEnvironmentMemberships: API.PaginatedOperationMethod<
  DescribeEnvironmentMembershipsRequest,
  DescribeEnvironmentMembershipsResult,
  DescribeEnvironmentMembershipsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      userArn: 0,
      environmentId: 0,
      permissions: 0,
      nextToken: 0,
      maxResults: 0,
    },
    output: { memberships: D.list(o_EnvironmentMember) },
  },
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    LimitExceededException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeEnvironmentMemberships",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type DescribeEnvironmentsError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | LimitExceededException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets information about Cloud9 development environments.
 *
 * Cloud9 is no longer available to new customers. Existing customers of
 * Cloud9 can continue to use the service as normal.
 * Learn more"
 */
export const describeEnvironments: API.OperationMethod<
  DescribeEnvironmentsRequest,
  DescribeEnvironmentsResult,
  DescribeEnvironmentsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { environmentIds: 0 },
    output: { environments: D.list({ description: D.secret }) },
  },
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    LimitExceededException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeEnvironments",
})) as any;

export type DescribeEnvironmentStatusError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | LimitExceededException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets status information for an Cloud9 development environment.
 *
 * Cloud9 is no longer available to new customers. Existing customers of
 * Cloud9 can continue to use the service as normal.
 * Learn more"
 */
export const describeEnvironmentStatus: API.OperationMethod<
  DescribeEnvironmentStatusRequest,
  DescribeEnvironmentStatusResult,
  DescribeEnvironmentStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { environmentId: 0 } },
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    LimitExceededException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeEnvironmentStatus",
})) as any;

export type ListEnvironmentsError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | LimitExceededException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets a list of Cloud9 development environment identifiers.
 *
 * Cloud9 is no longer available to new customers. Existing customers of
 * Cloud9 can continue to use the service as normal.
 * Learn more"
 *
 * Cloud9 is no longer available to new customers. Existing customers of
 * Cloud9 can continue to use the service as normal.
 * Learn more"
 */
export const listEnvironments: API.PaginatedOperationMethod<
  ListEnvironmentsRequest,
  ListEnvironmentsResult,
  ListEnvironmentsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: { service: svc, input: { nextToken: 0, maxResults: 0 } },
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    LimitExceededException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEnvironments",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | BadRequestException
  | InternalServerErrorException
  | NotFoundException
  | CommonErrors;
/**
 * Gets a list of the tags associated with an Cloud9 development environment.
 *
 * Cloud9 is no longer available to new customers. Existing customers of
 * Cloud9 can continue to use the service as normal.
 * Learn more"
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ResourceARN: 0 },
    output: { Tags: D.list({ Key: D.secret, Value: D.secret }) },
  },
  errors: [
    BadRequestException,
    InternalServerErrorException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

export type TagResourceError =
  | BadRequestException
  | ConcurrentAccessException
  | InternalServerErrorException
  | NotFoundException
  | CommonErrors;
/**
 * Adds tags to an Cloud9 development environment.
 *
 * Cloud9 is no longer available to new customers. Existing customers of
 * Cloud9 can continue to use the service as normal.
 * Learn more"
 *
 * Tags that you add to an Cloud9 environment by using this method will NOT be
 * automatically propagated to underlying resources.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceARN: 0, Tags: D.list(i_Tag) } },
  errors: [
    BadRequestException,
    ConcurrentAccessException,
    InternalServerErrorException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

export type UntagResourceError =
  | BadRequestException
  | ConcurrentAccessException
  | InternalServerErrorException
  | NotFoundException
  | CommonErrors;
/**
 * Removes tags from an Cloud9 development environment.
 *
 * Cloud9 is no longer available to new customers. Existing customers of
 * Cloud9 can continue to use the service as normal.
 * Learn more"
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceARN: 0, TagKeys: 0 } },
  errors: [
    BadRequestException,
    ConcurrentAccessException,
    InternalServerErrorException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

export type UpdateEnvironmentError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | LimitExceededException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Changes the settings of an existing Cloud9 development environment.
 *
 * Cloud9 is no longer available to new customers. Existing customers of
 * Cloud9 can continue to use the service as normal.
 * Learn more"
 */
export const updateEnvironment: API.OperationMethod<
  UpdateEnvironmentRequest,
  UpdateEnvironmentResult,
  UpdateEnvironmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      environmentId: 0,
      name: 0,
      description: 0,
      managedCredentialsAction: 0,
    },
  },
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    LimitExceededException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateEnvironment",
})) as any;

export type UpdateEnvironmentMembershipError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | LimitExceededException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Changes the settings of an existing environment member for an Cloud9 development
 * environment.
 *
 * Cloud9 is no longer available to new customers. Existing customers of
 * Cloud9 can continue to use the service as normal.
 * Learn more"
 */
export const updateEnvironmentMembership: API.OperationMethod<
  UpdateEnvironmentMembershipRequest,
  UpdateEnvironmentMembershipResult,
  UpdateEnvironmentMembershipError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { environmentId: 0, userArn: 0, permissions: 0 },
    output: { membership: o_EnvironmentMember },
  },
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    LimitExceededException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateEnvironmentMembership",
})) as any;

const i_Tag: D.LazyStruct = () => ({ Key: 0, Value: 0 });
const o_EnvironmentMember: D.LazyStruct = () => ({ lastAccess: D.ts });
