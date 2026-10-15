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
  sdkId: "repostspace",
  serviceShapeName: "RepostSpace",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "repostspace" });
const ver = /*@__PURE__*/ T.ServiceVersion("2022-05-13");
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
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://repostspace.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://repostspace.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://repostspace.{R}.{D}","properties":{},"headers":{}}');

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
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      retryAfterSeconds: /*@__PURE__*/ S.optional(S.Number).pipe(
        /*@__PURE__*/ T.HttpHeader("Retry-After"),
      ),
    },
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
      resourceId: S.String,
      resourceType: S.String,
      serviceCode: S.String,
      quotaCode: S.String,
    },
    /*@__PURE__*/ T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      serviceCode: /*@__PURE__*/ S.optional(S.String),
      quotaCode: /*@__PURE__*/ S.optional(S.String),
      retryAfterSeconds: /*@__PURE__*/ S.optional(S.Number).pipe(
        /*@__PURE__*/ T.HttpHeader("Retry-After"),
      ),
    },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.HttpError(429),
      /*@__PURE__*/ T.Retryable({ throttling: true }),
    ),
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
        /*@__PURE__*/ S.suspend(() => __S(81, __c20, 1)).annotate({
          identifier: "ValidationExceptionFieldList",
        }),
      ),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type SpaceId = string;
export type ChannelId = string;
export type AccessorId = string;
export type AccessorIdList = string[];
export type ChannelRole = "ASKER" | "EXPERT" | "MODERATOR" | "SUPPORTREQUESTOR" | (string & {});
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
export type Role = "EXPERT" | "MODERATOR" | "ADMINISTRATOR" | "SUPPORTREQUESTOR" | (string & {});
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
export type VanityDomainStatus = "PENDING" | "APPROVED" | "UNAPPROVED" | (string & {});
export type Url = string;
export type StorageLimit = number;
export type UserAdmins = string[];
export type GroupAdmins = string[];
export type RoleList = Role[];
export type Roles = { [key: string]: Role[] | undefined };
export type UserCount = number;
export type ContentSize = number;
export type FeatureEnableStatus = "ENABLED" | "DISABLED" | "NOT_ALLOWED" | (string & {});
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
  input: __S(84, __c21, 0) as any as S.Schema<BatchAddChannelRoleToAccessorsInput>,
  output: __S(88, __c22, 0) as any as S.Schema<BatchAddChannelRoleToAccessorsOutput>,
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
}));

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
  input: __S(100, __c25, 0) as any as S.Schema<BatchAddRoleInput>,
  output: __S(88, __c22, 0) as any as S.Schema<BatchAddRoleOutput>,
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
}));

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
  input: __S(104, __c26, 0) as any as S.Schema<BatchRemoveChannelRoleFromAccessorsInput>,
  output: __S(108, __c27, 0) as any as S.Schema<BatchRemoveChannelRoleFromAccessorsOutput>,
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
}));

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
  input: __S(0, __c0, 0) as any as S.Schema<BatchRemoveRoleInput>,
  output: __S(108, __c27, 0) as any as S.Schema<BatchRemoveRoleOutput>,
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
}));

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
  input: __S(4, __c1, 0) as any as S.Schema<CreateChannelInput>,
  output: __S(5, __c1, 1) as any as S.Schema<CreateChannelOutput>,
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
}));

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
  input: __S(8, __c2, 0) as any as S.Schema<CreateSpaceInput>,
  output: __S(9, __c2, 1) as any as S.Schema<CreateSpaceOutput>,
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
}));

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
  input: __S(20, __c5, 0) as any as S.Schema<DeleteSpaceInput>,
  output: __S(24, __c6, 0) as any as S.Schema<DeleteSpaceResponse>,
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
}));

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
  input: __S(28, __c7, 0) as any as S.Schema<DeregisterAdminInput>,
  output: __S(24, __c6, 0) as any as S.Schema<DeregisterAdminResponse>,
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
}));

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
  input: __S(32, __c8, 0) as any as S.Schema<GetChannelInput>,
  output: __S(33, __c8, 1) as any as S.Schema<GetChannelOutput>,
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
}));

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
  input: __S(40, __c10, 0) as any as S.Schema<GetSpaceInput>,
  output: __S(41, __c10, 1) as any as S.Schema<GetSpaceOutput>,
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
}));

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
  input: __S(44, __c11, 0) as any as S.Schema<ListChannelsInput>,
  output: __S(47, __c11, 3) as any as S.Schema<ListChannelsOutput>,
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
  input: __S(48, __c12, 0) as any as S.Schema<ListSpacesInput>,
  output: __S(51, __c12, 3) as any as S.Schema<ListSpacesOutput>,
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
  input: __S(52, __c13, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(53, __c13, 1) as any as S.Schema<ListTagsForResourceResponse>,
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
}));

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
  input: __S(56, __c14, 0) as any as S.Schema<RegisterAdminInput>,
  output: __S(24, __c6, 0) as any as S.Schema<RegisterAdminResponse>,
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
}));

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
  input: __S(60, __c15, 0) as any as S.Schema<SendInvitesInput>,
  output: __S(24, __c6, 0) as any as S.Schema<SendInvitesResponse>,
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
}));

export type TagResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Associates tags with an AWS re:Post Private resource. Currently, the only resource that can be tagged is the private re:Post. If you specify a new tag key for the resource, the tag is appended to the list of tags that are associated with the resource. If you specify a tag key that's already associated with the resource, the new tag value that you specify replaces the previous value for that tag.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(64, __c16, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(24, __c6, 0) as any as S.Schema<TagResourceResponse>,
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
}));

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
  input: __S(68, __c17, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(24, __c6, 0) as any as S.Schema<UntagResourceResponse>,
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
}));

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
  input: __S(72, __c18, 0) as any as S.Schema<UpdateChannelInput>,
  output: __S(24, __c6, 0) as any as S.Schema<UpdateChannelOutput>,
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
}));

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
  input: __S(76, __c19, 0) as any as S.Schema<UpdateSpaceInput>,
  output: __S(24, __c6, 0) as any as S.Schema<UpdateSpaceResponse>,
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
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          spaceId: S.String.pipe(T.HttpLabel("spaceId")),
          accessorIds: __S(96, __c24, 0),
          role: S.String,
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/spaces/{spaceId}/roles" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "BatchRemoveRoleInput" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          spaceId: S.String.pipe(T.HttpLabel("spaceId")),
          channelName: SensitiveString,
          channelDescription: S.optional(SensitiveString),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/spaces/{spaceId}/channels" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateChannelInput" });
    case 1:
      return S.suspend(() => S.Struct({ channelId: S.String })).annotate({
        identifier: "CreateChannelOutput",
      });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: SensitiveString,
          subdomain: S.String,
          tier: S.String,
          description: S.optional(SensitiveString),
          userKMSKey: S.optional(S.String),
          tags: S.optional(__S(16, __c4, 0)),
          roleArn: S.optional(S.String),
          supportedEmailDomains: S.optional(__S(13, __c3, 1)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/spaces" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateSpaceInput" });
    case 1:
      return S.suspend(() => S.Struct({ spaceId: S.String })).annotate({
        identifier: "CreateSpaceOutput",
      });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.Array(SensitiveString);
    case 1:
      return S.suspend(() =>
        S.Struct({ enabled: S.optional(S.String), allowedDomains: S.optional(__S(12, __c3, 0)) }),
      ).annotate({ identifier: "SupportedEmailDomainsParameters" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ spaceId: S.String.pipe(T.HttpLabel("spaceId")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/spaces/{spaceId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteSpaceInput" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "DeleteSpaceResponse" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          spaceId: S.String.pipe(T.HttpLabel("spaceId")),
          adminId: S.String.pipe(T.HttpLabel("adminId")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/spaces/{spaceId}/admins/{adminId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeregisterAdminInput" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          spaceId: S.String.pipe(T.HttpLabel("spaceId")),
          channelId: S.String.pipe(T.HttpLabel("channelId")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/spaces/{spaceId}/channels/{channelId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetChannelInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          spaceId: S.String,
          channelId: S.String,
          channelName: SensitiveString,
          channelDescription: S.optional(SensitiveString),
          createDateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          deleteDateTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          channelRoles: S.optional(__S(37, __c9, 1)),
          channelStatus: S.String,
        }),
      ).annotate({ identifier: "GetChannelOutput" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
    case 1:
      return S.Record(S.String, /*@__PURE__*/ __S(36, __c9, 0).pipe(S.optional));
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ spaceId: S.String.pipe(T.HttpLabel("spaceId")) }).pipe(
          T.all(T.Http({ method: "GET", uri: "/spaces/{spaceId}" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetSpaceInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          spaceId: S.String,
          arn: S.String,
          name: SensitiveString,
          status: S.String,
          configurationStatus: S.String,
          clientId: S.String,
          identityStoreId: S.optional(S.String),
          applicationArn: S.optional(S.String),
          description: S.optional(SensitiveString),
          vanityDomainStatus: S.String,
          vanityDomain: S.String,
          randomDomain: S.String,
          customerRoleArn: S.optional(S.String),
          createDateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          deleteDateTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          tier: S.String,
          storageLimit: S.Number,
          userAdmins: S.optional(__S(96, __c24, 0)),
          groupAdmins: S.optional(__S(96, __c24, 0)),
          roles: S.optional(__S(37, __c9, 1)),
          userKMSKey: S.optional(S.String),
          userCount: S.optional(S.Number),
          contentSize: S.optional(S.Number),
          supportedEmailDomains: S.optional(__S(13, __c3, 1)),
        }),
      ).annotate({ identifier: "GetSpaceOutput" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          spaceId: S.String.pipe(T.HttpLabel("spaceId")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/spaces/{spaceId}/channels" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListChannelsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          spaceId: S.String,
          channelId: S.String,
          channelName: SensitiveString,
          channelDescription: S.optional(SensitiveString),
          createDateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          deleteDateTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          channelStatus: S.String,
          userCount: S.Number,
          groupCount: S.Number,
        }),
      ).annotate({ identifier: "ChannelData" });
    case 2:
      return S.Array(__S(45, __c11, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ channels: __S(46, __c11, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListChannelsOutput" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(T.all(T.Http({ method: "GET", uri: "/spaces" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListSpacesInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          spaceId: S.String,
          arn: S.String,
          name: SensitiveString,
          description: S.optional(SensitiveString),
          status: S.String,
          configurationStatus: S.String,
          vanityDomainStatus: S.String,
          vanityDomain: S.String,
          randomDomain: S.String,
          tier: S.String,
          storageLimit: S.Number,
          createDateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          deleteDateTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          userKMSKey: S.optional(S.String),
          userCount: S.optional(S.Number),
          contentSize: S.optional(S.Number),
          supportedEmailDomains: S.optional(__S(13, __c3, 1)),
        }),
      ).annotate({ identifier: "SpaceData" });
    case 2:
      return S.Array(__S(49, __c12, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ spaces: __S(50, __c12, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListSpacesOutput" });
  }
}
function __c13(j: number): any {
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
      return S.suspend(() => S.Struct({ tags: S.optional(__S(16, __c4, 0)) })).annotate({
        identifier: "ListTagsForResourceResponse",
      });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          spaceId: S.String.pipe(T.HttpLabel("spaceId")),
          adminId: S.String.pipe(T.HttpLabel("adminId")),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/spaces/{spaceId}/admins/{adminId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "RegisterAdminInput" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          spaceId: S.String.pipe(T.HttpLabel("spaceId")),
          accessorIds: __S(96, __c24, 0),
          title: SensitiveString,
          body: SensitiveString,
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/spaces/{spaceId}/invite" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "SendInvitesInput" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
          tags: __S(16, __c4, 0),
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
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
          tagKeys: __S(96, __c24, 0).pipe(T.HttpQuery("tagKeys")),
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
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          spaceId: S.String.pipe(T.HttpLabel("spaceId")),
          channelId: S.String.pipe(T.HttpLabel("channelId")),
          channelName: SensitiveString,
          channelDescription: S.optional(SensitiveString),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/spaces/{spaceId}/channels/{channelId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateChannelInput" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          spaceId: S.String.pipe(T.HttpLabel("spaceId")),
          description: S.optional(SensitiveString),
          tier: S.optional(S.String),
          roleArn: S.optional(S.String),
          supportedEmailDomains: S.optional(__S(13, __c3, 1)),
        }).pipe(
          T.all(T.Http({ method: "PUT", uri: "/spaces/{spaceId}" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UpdateSpaceInput" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ name: S.String, message: S.String })).annotate({
        identifier: "ValidationExceptionField",
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
          spaceId: S.String.pipe(T.HttpLabel("spaceId")),
          channelId: S.String.pipe(T.HttpLabel("channelId")),
          accessorIds: __S(96, __c24, 0),
          channelRole: S.String,
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/spaces/{spaceId}/channels/{channelId}/roles" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "BatchAddChannelRoleToAccessorsInput" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ addedAccessorIds: __S(96, __c24, 0), errors: __S(93, __c23, 1) }),
      ).annotate({ identifier: "BatchAddChannelRoleToAccessorsOutput" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ accessorId: S.String, error: S.Number, message: S.String }),
      ).annotate({ identifier: "BatchError" });
    case 1:
      return S.Array(__S(92, __c23, 0));
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
          spaceId: S.String.pipe(T.HttpLabel("spaceId")),
          accessorIds: __S(96, __c24, 0),
          role: S.String,
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/spaces/{spaceId}/roles" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "BatchAddRoleInput" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          spaceId: S.String.pipe(T.HttpLabel("spaceId")),
          channelId: S.String.pipe(T.HttpLabel("channelId")),
          accessorIds: __S(96, __c24, 0),
          channelRole: S.String,
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/spaces/{spaceId}/channels/{channelId}/roles" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "BatchRemoveChannelRoleFromAccessorsInput" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ removedAccessorIds: __S(96, __c24, 0), errors: __S(93, __c23, 1) }),
      ).annotate({ identifier: "BatchRemoveChannelRoleFromAccessorsOutput" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
