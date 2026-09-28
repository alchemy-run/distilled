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
  sdkId: "repostspace",
  target: "RepostSpace",
  version: "2022-05-13",
  sigv4: "repostspace",
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
                `https://repostspace-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://repostspace-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://repostspace.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://repostspace.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
    { status: 500, headers: { retryAfterSeconds: ["Retry-After", "num"] } },
  )<{ readonly message: string; readonly retryAfterSeconds?: number }> {}
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
    readonly resourceId: string;
    readonly resourceType: string;
    readonly serviceCode: string;
    readonly quotaCode: string;
  }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["ThrottlingError", "RetryableError"],
    { status: 429, headers: { retryAfterSeconds: ["Retry-After", "num"] } },
  )<{
    readonly message: string;
    readonly serviceCode?: string;
    readonly quotaCode?: string;
    readonly retryAfterSeconds?: number;
  }> {}
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
export type SpaceId = string;
export type ChannelId = string;
export type AccessorId = string;
export type AccessorIdList = string[];
export type ChannelRole =
  | "ASKER"
  | "EXPERT"
  | "MODERATOR"
  | "SUPPORTREQUESTOR"
  | (string & {});
export interface BatchAddChannelRoleToAccessorsInput {
  spaceId: string;
  channelId: string;
  accessorIds: string[];
  channelRole: ChannelRole;
}
export type ErrorCode = number;
export type ErrorMessage = string;
export interface BatchError {
  accessorId: string;
  error: number;
  message: string;
}
export type BatchErrorList = BatchError[];
export interface BatchAddChannelRoleToAccessorsOutput {
  addedAccessorIds: string[];
  errors: BatchError[];
}
export type Role =
  | "EXPERT"
  | "MODERATOR"
  | "ADMINISTRATOR"
  | "SUPPORTREQUESTOR"
  | (string & {});
export interface BatchAddRoleInput {
  spaceId: string;
  accessorIds: string[];
  role: Role;
}
export interface BatchAddRoleOutput {
  addedAccessorIds: string[];
  errors: BatchError[];
}
export interface BatchRemoveChannelRoleFromAccessorsInput {
  spaceId: string;
  channelId: string;
  accessorIds: string[];
  channelRole: ChannelRole;
}
export interface BatchRemoveChannelRoleFromAccessorsOutput {
  removedAccessorIds: string[];
  errors: BatchError[];
}
export interface BatchRemoveRoleInput {
  spaceId: string;
  accessorIds: string[];
  role: Role;
}
export interface BatchRemoveRoleOutput {
  removedAccessorIds: string[];
  errors: BatchError[];
}
export type ChannelName = string | redacted.Redacted<string>;
export type ChannelDescription = string | redacted.Redacted<string>;
export interface CreateChannelInput {
  spaceId: string;
  channelName: string | redacted.Redacted<string>;
  channelDescription?: string | redacted.Redacted<string>;
}
export interface CreateChannelOutput {
  channelId: string;
}
export type SpaceName = string | redacted.Redacted<string>;
export type SpaceSubdomain = string;
export type TierLevel = "BASIC" | "STANDARD" | (string & {});
export type SpaceDescription = string | redacted.Redacted<string>;
export type KMSKey = string;
export type TagKey = string;
export type TagValue = string;
export type Tags = { [key: string]: string | undefined };
export type Arn = string;
export type FeatureEnableParameter = "ENABLED" | "DISABLED" | (string & {});
export type EmailDomain = string | redacted.Redacted<string>;
export type AllowedDomainsList = (string | redacted.Redacted<string>)[];
export interface SupportedEmailDomainsParameters {
  enabled?: FeatureEnableParameter;
  allowedDomains?: (string | redacted.Redacted<string>)[];
}
export interface CreateSpaceInput {
  name: string | redacted.Redacted<string>;
  subdomain: string;
  tier: TierLevel;
  description?: string | redacted.Redacted<string>;
  userKMSKey?: string;
  tags?: { [key: string]: string | undefined };
  roleArn?: string;
  supportedEmailDomains?: SupportedEmailDomainsParameters;
}
export interface CreateSpaceOutput {
  spaceId: string;
}
export interface DeleteSpaceInput {
  spaceId: string;
}
export interface DeleteSpaceResponse {}
export type AdminId = string;
export interface DeregisterAdminInput {
  spaceId: string;
  adminId: string;
}
export interface DeregisterAdminResponse {}
export interface GetChannelInput {
  spaceId: string;
  channelId: string;
}
export type ChannelRoleList = ChannelRole[];
export type ChannelRoles = { [key: string]: ChannelRole[] | undefined };
export type ChannelStatus =
  | "CREATED"
  | "CREATING"
  | "CREATE_FAILED"
  | "DELETED"
  | "DELETING"
  | "DELETE_FAILED"
  | (string & {});
export interface GetChannelOutput {
  spaceId: string;
  channelId: string;
  channelName: string | redacted.Redacted<string>;
  channelDescription?: string | redacted.Redacted<string>;
  createDateTime: Date;
  deleteDateTime?: Date;
  channelRoles?: { [key: string]: ChannelRole[] | undefined };
  channelStatus: ChannelStatus;
}
export interface GetSpaceInput {
  spaceId: string;
}
export type ProvisioningStatus = string;
export type ConfigurationStatus = "CONFIGURED" | "UNCONFIGURED" | (string & {});
export type ClientId = string;
export type IdentityStoreId = string;
export type VanityDomainStatus =
  | "PENDING"
  | "APPROVED"
  | "UNAPPROVED"
  | (string & {});
export type Url = string;
export type StorageLimit = number;
export type UserAdmins = string[];
export type GroupAdmins = string[];
export type RoleList = Role[];
export type Roles = { [key: string]: Role[] | undefined };
export type UserCount = number;
export type ContentSize = number;
export type FeatureEnableStatus =
  | "ENABLED"
  | "DISABLED"
  | "NOT_ALLOWED"
  | (string & {});
export interface SupportedEmailDomainsStatus {
  enabled?: FeatureEnableStatus;
  allowedDomains?: (string | redacted.Redacted<string>)[];
}
export interface GetSpaceOutput {
  spaceId: string;
  arn: string;
  name: string | redacted.Redacted<string>;
  status: string;
  configurationStatus: ConfigurationStatus;
  clientId: string;
  identityStoreId?: string;
  applicationArn?: string;
  description?: string | redacted.Redacted<string>;
  vanityDomainStatus: VanityDomainStatus;
  vanityDomain: string;
  randomDomain: string;
  customerRoleArn?: string;
  createDateTime: Date;
  deleteDateTime?: Date;
  tier: TierLevel;
  storageLimit: number;
  userAdmins?: string[];
  groupAdmins?: string[];
  roles?: { [key: string]: Role[] | undefined };
  userKMSKey?: string;
  userCount?: number;
  contentSize?: number;
  supportedEmailDomains?: SupportedEmailDomainsStatus;
}
export type ListChannelsLimit = number;
export interface ListChannelsInput {
  spaceId: string;
  nextToken?: string;
  maxResults?: number;
}
export type GroupCount = number;
export interface ChannelData {
  spaceId: string;
  channelId: string;
  channelName: string | redacted.Redacted<string>;
  channelDescription?: string | redacted.Redacted<string>;
  createDateTime: Date;
  deleteDateTime?: Date;
  channelStatus: ChannelStatus;
  userCount: number;
  groupCount: number;
}
export type ChannelsList = ChannelData[];
export interface ListChannelsOutput {
  channels: ChannelData[];
  nextToken?: string;
}
export type ListSpacesLimit = number;
export interface ListSpacesInput {
  nextToken?: string;
  maxResults?: number;
}
export interface SpaceData {
  spaceId: string;
  arn: string;
  name: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  status: string;
  configurationStatus: ConfigurationStatus;
  vanityDomainStatus: VanityDomainStatus;
  vanityDomain: string;
  randomDomain: string;
  tier: TierLevel;
  storageLimit: number;
  createDateTime: Date;
  deleteDateTime?: Date;
  userKMSKey?: string;
  userCount?: number;
  contentSize?: number;
  supportedEmailDomains?: SupportedEmailDomainsStatus;
}
export type SpacesList = SpaceData[];
export interface ListSpacesOutput {
  spaces: SpaceData[];
  nextToken?: string;
}
export interface ListTagsForResourceRequest {
  resourceArn: string;
}
export interface ListTagsForResourceResponse {
  tags?: { [key: string]: string | undefined };
}
export interface RegisterAdminInput {
  spaceId: string;
  adminId: string;
}
export interface RegisterAdminResponse {}
export type InviteTitle = string | redacted.Redacted<string>;
export type InviteBody = string | redacted.Redacted<string>;
export interface SendInvitesInput {
  spaceId: string;
  accessorIds: string[];
  title: string | redacted.Redacted<string>;
  body: string | redacted.Redacted<string>;
}
export interface SendInvitesResponse {}
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
export interface UpdateChannelInput {
  spaceId: string;
  channelId: string;
  channelName: string | redacted.Redacted<string>;
  channelDescription?: string | redacted.Redacted<string>;
}
export interface UpdateChannelOutput {}
export interface UpdateSpaceInput {
  spaceId: string;
  description?: string | redacted.Redacted<string>;
  tier?: TierLevel;
  roleArn?: string;
  supportedEmailDomains?: SupportedEmailDomainsParameters;
}
export interface UpdateSpaceResponse {}
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
export type BatchAddChannelRoleToAccessorsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Add role to multiple users or groups in a private re:Post channel.
 */
export const batchAddChannelRoleToAccessors: API.OperationMethod<
  BatchAddChannelRoleToAccessorsInput,
  BatchAddChannelRoleToAccessorsOutput,
  BatchAddChannelRoleToAccessorsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /spaces/{spaceId}/channels/{channelId}/roles",
    input: { spaceId: 0, channelId: 0, accessorIds: 0, channelRole: 0 },
    body: true,
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
  operationName: "BatchAddChannelRoleToAccessors",
})) as any;

export type BatchAddRoleError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Add a role to multiple users or groups in a private re:Post.
 */
export const batchAddRole: API.OperationMethod<
  BatchAddRoleInput,
  BatchAddRoleOutput,
  BatchAddRoleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /spaces/{spaceId}/roles",
    input: { spaceId: 0, accessorIds: 0, role: 0 },
    body: true,
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
  operationName: "BatchAddRole",
})) as any;

export type BatchRemoveChannelRoleFromAccessorsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Remove a role from multiple users or groups in a private re:Post channel.
 */
export const batchRemoveChannelRoleFromAccessors: API.OperationMethod<
  BatchRemoveChannelRoleFromAccessorsInput,
  BatchRemoveChannelRoleFromAccessorsOutput,
  BatchRemoveChannelRoleFromAccessorsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /spaces/{spaceId}/channels/{channelId}/roles",
    input: { spaceId: 0, channelId: 0, accessorIds: 0, channelRole: 0 },
    body: true,
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
  operationName: "BatchRemoveChannelRoleFromAccessors",
})) as any;

export type BatchRemoveRoleError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Remove a role from multiple users or groups in a private re:Post.
 */
export const batchRemoveRole: API.OperationMethod<
  BatchRemoveRoleInput,
  BatchRemoveRoleOutput,
  BatchRemoveRoleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /spaces/{spaceId}/roles",
    input: { spaceId: 0, accessorIds: 0, role: 0 },
    body: true,
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
  operationName: "BatchRemoveRole",
})) as any;

export type CreateChannelError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a channel in an AWS re:Post Private private re:Post.
 */
export const createChannel: API.OperationMethod<
  CreateChannelInput,
  CreateChannelOutput,
  CreateChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /spaces/{spaceId}/channels",
    input: { spaceId: 0, channelName: 0, channelDescription: 0 },
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
  operationName: "CreateChannel",
})) as any;

export type CreateSpaceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an AWS re:Post Private private re:Post.
 */
export const createSpace: API.OperationMethod<
  CreateSpaceInput,
  CreateSpaceOutput,
  CreateSpaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /spaces",
    input: {
      name: 0,
      subdomain: 0,
      tier: 0,
      description: 0,
      userKMSKey: 0,
      tags: 0,
      roleArn: 0,
      supportedEmailDomains: i_SupportedEmailDomainsParameters,
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
  operationName: "CreateSpace",
})) as any;

export type DeleteSpaceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an AWS re:Post Private private re:Post.
 */
export const deleteSpace: API.OperationMethod<
  DeleteSpaceInput,
  DeleteSpaceResponse,
  DeleteSpaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /spaces/{spaceId}",
    input: { spaceId: 0 },
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
  operationName: "DeleteSpace",
})) as any;

export type DeregisterAdminError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes the user or group from the list of administrators of the private re:Post.
 */
export const deregisterAdmin: API.OperationMethod<
  DeregisterAdminInput,
  DeregisterAdminResponse,
  DeregisterAdminError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /spaces/{spaceId}/admins/{adminId}",
    input: { spaceId: 0, adminId: 0 },
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
  operationName: "DeregisterAdmin",
})) as any;

export type GetChannelError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Displays information about a channel in a private re:Post.
 */
export const getChannel: API.OperationMethod<
  GetChannelInput,
  GetChannelOutput,
  GetChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /spaces/{spaceId}/channels/{channelId}",
    input: { spaceId: 0, channelId: 0 },
    output: {
      channelName: D.secret,
      channelDescription: D.secret,
      createDateTime: D.ts,
      deleteDateTime: D.ts,
    },
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
  operationName: "GetChannel",
})) as any;

export type GetSpaceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Displays information about the AWS re:Post Private private re:Post.
 */
export const getSpace: API.OperationMethod<
  GetSpaceInput,
  GetSpaceOutput,
  GetSpaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /spaces/{spaceId}",
    input: { spaceId: 0 },
    output: {
      name: D.secret,
      description: D.secret,
      createDateTime: D.ts,
      deleteDateTime: D.ts,
      supportedEmailDomains: o_SupportedEmailDomainsStatus,
    },
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
  operationName: "GetSpace",
})) as any;

export type ListChannelsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns the list of channel within a private re:Post with some information about each channel.
 */
export const listChannels: API.PaginatedOperationMethod<
  ListChannelsInput,
  ListChannelsOutput,
  ListChannelsError,
  Credentials | HttpClient.HttpClient,
  ChannelData
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /spaces/{spaceId}/channels",
    input: {
      spaceId: 0,
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: {
      channels: D.list({
        channelName: D.secret,
        channelDescription: D.secret,
        createDateTime: D.ts,
        deleteDateTime: D.ts,
      }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListChannels",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "channels",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListSpacesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of AWS re:Post Private private re:Posts in the account with some information about each private re:Post.
 */
export const listSpaces: API.PaginatedOperationMethod<
  ListSpacesInput,
  ListSpacesOutput,
  ListSpacesError,
  Credentials | HttpClient.HttpClient,
  SpaceData
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /spaces",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: {
      spaces: D.list({
        name: D.secret,
        description: D.secret,
        createDateTime: D.ts,
        deleteDateTime: D.ts,
        supportedEmailDomains: o_SupportedEmailDomainsStatus,
      }),
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
  operationName: "ListSpaces",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "spaces",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns the tags that are associated with the AWS re:Post Private resource specified by the resourceArn. The only resource that can be tagged is a private re:Post.
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
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

export type RegisterAdminError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Adds a user or group to the list of administrators of the private re:Post.
 */
export const registerAdmin: API.OperationMethod<
  RegisterAdminInput,
  RegisterAdminResponse,
  RegisterAdminError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /spaces/{spaceId}/admins/{adminId}",
    input: { spaceId: 0, adminId: 0 },
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
  operationName: "RegisterAdmin",
})) as any;

export type SendInvitesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Sends an invitation email to selected users and groups.
 */
export const sendInvites: API.OperationMethod<
  SendInvitesInput,
  SendInvitesResponse,
  SendInvitesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /spaces/{spaceId}/invite",
    input: { spaceId: 0, accessorIds: 0, title: 0, body: 0 },
    body: true,
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
  operationName: "SendInvites",
})) as any;

export type TagResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Associates tags with an AWS re:Post Private resource. Currently, the only resource that can be tagged is the private re:Post. If you specify a new tag key for the resource, the tag is appended to the list of tags that are associated with the resource. If you specify a tag key that’s already associated with the resource, the new tag value that you specify replaces the previous value for that tag.
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
    AccessDeniedException,
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
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes the association of the tag with the AWS re:Post Private resource.
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
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

export type UpdateChannelError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Modifies an existing channel.
 */
export const updateChannel: API.OperationMethod<
  UpdateChannelInput,
  UpdateChannelOutput,
  UpdateChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /spaces/{spaceId}/channels/{channelId}",
    input: { spaceId: 0, channelId: 0, channelName: 0, channelDescription: 0 },
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
  operationName: "UpdateChannel",
})) as any;

export type UpdateSpaceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Modifies an existing AWS re:Post Private private re:Post.
 */
export const updateSpace: API.OperationMethod<
  UpdateSpaceInput,
  UpdateSpaceResponse,
  UpdateSpaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /spaces/{spaceId}",
    input: {
      spaceId: 0,
      description: 0,
      tier: 0,
      roleArn: 0,
      supportedEmailDomains: i_SupportedEmailDomainsParameters,
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
  operationName: "UpdateSpace",
})) as any;

const i_SupportedEmailDomainsParameters: D.LazyStruct = () => ({
  enabled: 0,
  allowedDomains: 0,
});
const o_SupportedEmailDomainsStatus: D.LazyStruct = () => ({
  allowedDomains: D.list(D.secret),
});
