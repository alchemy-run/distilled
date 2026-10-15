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
  sdkId: "Chime SDK Identity",
  serviceShapeName: "ChimeIdentityService",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "chime" });
const ver = /*@__PURE__*/ T.ServiceVersion("2021-04-20");
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
              `https://identity-chime-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://identity-chime-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://identity-chime.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://identity-chime.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://identity-chime.{R}.{D}","properties":{},"headers":{}}');

export class BadRequestException
  extends /*@__PURE__*/ S.TaggedError<BadRequestException>()(
    "BadRequestException",
    {
      Code: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => S.String).annotate({ identifier: "ErrorCode" }),
      ),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    {
      Code: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => S.String).annotate({ identifier: "ErrorCode" }),
      ),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class ForbiddenException
  extends /*@__PURE__*/ S.TaggedError<ForbiddenException>()(
    "ForbiddenException",
    {
      Code: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => S.String).annotate({ identifier: "ErrorCode" }),
      ),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class NotFoundException
  extends /*@__PURE__*/ S.TaggedError<NotFoundException>()(
    "NotFoundException",
    {
      Code: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => S.String).annotate({ identifier: "ErrorCode" }),
      ),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ResourceLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<ResourceLimitExceededException>()(
    "ResourceLimitExceededException",
    {
      Code: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => S.String).annotate({ identifier: "ErrorCode" }),
      ),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ServiceFailureException
  extends /*@__PURE__*/ S.TaggedError<ServiceFailureException>()(
    "ServiceFailureException",
    {
      Code: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => S.String).annotate({ identifier: "ErrorCode" }),
      ),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError) {}
export class ServiceUnavailableException
  extends /*@__PURE__*/ S.TaggedError<ServiceUnavailableException>()(
    "ServiceUnavailableException",
    {
      Code: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => S.String).annotate({ identifier: "ErrorCode" }),
      ),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(503),
  ).pipe(C.withServerError) {}
export class ThrottledClientException
  extends /*@__PURE__*/ S.TaggedError<ThrottledClientException>()(
    "ThrottledClientException",
    {
      Code: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => S.String).annotate({ identifier: "ErrorCode" }),
      ),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class UnauthorizedClientException
  extends /*@__PURE__*/ S.TaggedError<UnauthorizedClientException>()(
    "UnauthorizedClientException",
    {
      Code: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => S.String).annotate({ identifier: "ErrorCode" }),
      ),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(401),
  ).pipe(C.withAuthError) {}
export type NonEmptyResourceName = string | redacted.Redacted<string>;
export type Metadata = string | redacted.Redacted<string>;
export type ClientRequestToken = string;
export type TagKey = string | redacted.Redacted<string>;
export type TagValue = string | redacted.Redacted<string>;
export interface Tag {
  Key: string | redacted.Redacted<string>;
  Value: string | redacted.Redacted<string>;
}
export type TagList = Tag[];
export interface CreateAppInstanceRequest {
  Name: string | redacted.Redacted<string>;
  Metadata?: string | redacted.Redacted<string>;
  ClientRequestToken: string;
  Tags?: Tag[];
}
export type ChimeArn = string;
export interface CreateAppInstanceResponse {
  AppInstanceArn?: string;
}
export interface CreateAppInstanceAdminRequest {
  AppInstanceAdminArn: string;
  AppInstanceArn: string;
}
export type ResourceName = string | redacted.Redacted<string>;
export interface Identity {
  Arn?: string;
  Name?: string | redacted.Redacted<string>;
}
export interface CreateAppInstanceAdminResponse {
  AppInstanceAdmin?: Identity;
  AppInstanceArn?: string;
}
export type RespondsTo = "STANDARD_MESSAGES" | (string & {});
export type StandardMessages = "AUTO" | "ALL" | "MENTIONS" | "NONE" | (string & {});
export type TargetedMessages = "ALL" | "NONE" | (string & {});
export interface InvokedBy {
  StandardMessages: StandardMessages;
  TargetedMessages: TargetedMessages;
}
export type LexBotAliasArn = string;
export type LexIntentName = string;
export interface LexConfiguration {
  RespondsTo?: RespondsTo;
  InvokedBy?: InvokedBy;
  LexBotAliasArn: string;
  LocaleId: string;
  WelcomeIntent?: string;
}
export interface Configuration {
  Lex: LexConfiguration;
}
export interface CreateAppInstanceBotRequest {
  AppInstanceArn: string;
  Name?: string | redacted.Redacted<string>;
  Metadata?: string | redacted.Redacted<string>;
  ClientRequestToken: string;
  Tags?: Tag[];
  Configuration: Configuration;
}
export interface CreateAppInstanceBotResponse {
  AppInstanceBotArn?: string;
}
export type UserId = string | redacted.Redacted<string>;
export type UserName = string | redacted.Redacted<string>;
export type ExpirationDays = number;
export type ExpirationCriterion = "CREATED_TIMESTAMP" | (string & {});
export interface ExpirationSettings {
  ExpirationDays: number;
  ExpirationCriterion: ExpirationCriterion;
}
export interface CreateAppInstanceUserRequest {
  AppInstanceArn: string;
  AppInstanceUserId: string | redacted.Redacted<string>;
  Name: string | redacted.Redacted<string>;
  Metadata?: string | redacted.Redacted<string>;
  ClientRequestToken: string;
  Tags?: Tag[];
  ExpirationSettings?: ExpirationSettings;
}
export interface CreateAppInstanceUserResponse {
  AppInstanceUserArn?: string;
}
export interface DeleteAppInstanceRequest {
  AppInstanceArn: string;
}
export interface DeleteAppInstanceResponse {}
export interface DeleteAppInstanceAdminRequest {
  AppInstanceAdminArn: string;
  AppInstanceArn: string;
}
export interface DeleteAppInstanceAdminResponse {}
export interface DeleteAppInstanceBotRequest {
  AppInstanceBotArn: string;
}
export interface DeleteAppInstanceBotResponse {}
export interface DeleteAppInstanceUserRequest {
  AppInstanceUserArn: string;
}
export interface DeleteAppInstanceUserResponse {}
export type String64 = string;
export interface DeregisterAppInstanceUserEndpointRequest {
  AppInstanceUserArn: string;
  EndpointId: string;
}
export interface DeregisterAppInstanceUserEndpointResponse {}
export interface DescribeAppInstanceRequest {
  AppInstanceArn: string;
}
export interface AppInstance {
  AppInstanceArn?: string;
  Name?: string | redacted.Redacted<string>;
  CreatedTimestamp?: Date;
  LastUpdatedTimestamp?: Date;
  Metadata?: string | redacted.Redacted<string>;
}
export interface DescribeAppInstanceResponse {
  AppInstance?: AppInstance;
}
export interface DescribeAppInstanceAdminRequest {
  AppInstanceAdminArn: string;
  AppInstanceArn: string;
}
export interface AppInstanceAdmin {
  Admin?: Identity;
  AppInstanceArn?: string;
  CreatedTimestamp?: Date;
}
export interface DescribeAppInstanceAdminResponse {
  AppInstanceAdmin?: AppInstanceAdmin;
}
export interface DescribeAppInstanceBotRequest {
  AppInstanceBotArn: string;
}
export interface AppInstanceBot {
  AppInstanceBotArn?: string;
  Name?: string | redacted.Redacted<string>;
  Configuration?: Configuration;
  CreatedTimestamp?: Date;
  LastUpdatedTimestamp?: Date;
  Metadata?: string | redacted.Redacted<string>;
}
export interface DescribeAppInstanceBotResponse {
  AppInstanceBot?: AppInstanceBot;
}
export interface DescribeAppInstanceUserRequest {
  AppInstanceUserArn: string;
}
export interface AppInstanceUser {
  AppInstanceUserArn?: string;
  Name?: string | redacted.Redacted<string>;
  Metadata?: string | redacted.Redacted<string>;
  CreatedTimestamp?: Date;
  LastUpdatedTimestamp?: Date;
  ExpirationSettings?: ExpirationSettings;
}
export interface DescribeAppInstanceUserResponse {
  AppInstanceUser?: AppInstanceUser;
}
export type String1600 = string;
export interface DescribeAppInstanceUserEndpointRequest {
  AppInstanceUserArn: string;
  EndpointId: string;
}
export type SensitiveString1600 = string | redacted.Redacted<string>;
export type AppInstanceUserEndpointType = "APNS" | "APNS_SANDBOX" | "GCM" | (string & {});
export type NonEmptySensitiveString1600 = string | redacted.Redacted<string>;
export interface EndpointAttributes {
  DeviceToken: string | redacted.Redacted<string>;
  VoipDeviceToken?: string | redacted.Redacted<string>;
}
export type AllowMessages = "ALL" | "NONE" | (string & {});
export type EndpointStatus = "ACTIVE" | "INACTIVE" | (string & {});
export type EndpointStatusReason = "INVALID_DEVICE_TOKEN" | "INVALID_PINPOINT_ARN" | (string & {});
export interface EndpointState {
  Status: EndpointStatus;
  StatusReason?: EndpointStatusReason;
}
export interface AppInstanceUserEndpoint {
  AppInstanceUserArn?: string;
  EndpointId?: string;
  Name?: string | redacted.Redacted<string>;
  Type?: AppInstanceUserEndpointType;
  ResourceArn?: string;
  EndpointAttributes?: EndpointAttributes;
  CreatedTimestamp?: Date;
  LastUpdatedTimestamp?: Date;
  AllowMessages?: AllowMessages;
  EndpointState?: EndpointState;
}
export interface DescribeAppInstanceUserEndpointResponse {
  AppInstanceUserEndpoint?: AppInstanceUserEndpoint;
}
export interface GetAppInstanceRetentionSettingsRequest {
  AppInstanceArn: string;
}
export type RetentionDays = number;
export interface ChannelRetentionSettings {
  RetentionDays?: number;
}
export interface AppInstanceRetentionSettings {
  ChannelRetentionSettings?: ChannelRetentionSettings;
}
export interface GetAppInstanceRetentionSettingsResponse {
  AppInstanceRetentionSettings?: AppInstanceRetentionSettings;
  InitiateDeletionTimestamp?: Date;
}
export type MaxResults = number;
export type NextToken = string | redacted.Redacted<string>;
export interface ListAppInstanceAdminsRequest {
  AppInstanceArn: string;
  MaxResults?: number;
  NextToken?: string | redacted.Redacted<string>;
}
export interface AppInstanceAdminSummary {
  Admin?: Identity;
}
export type AppInstanceAdminList = AppInstanceAdminSummary[];
export interface ListAppInstanceAdminsResponse {
  AppInstanceArn?: string;
  AppInstanceAdmins?: AppInstanceAdminSummary[];
  NextToken?: string | redacted.Redacted<string>;
}
export interface ListAppInstanceBotsRequest {
  AppInstanceArn: string;
  MaxResults?: number;
  NextToken?: string | redacted.Redacted<string>;
}
export interface AppInstanceBotSummary {
  AppInstanceBotArn?: string;
  Name?: string | redacted.Redacted<string>;
  Metadata?: string | redacted.Redacted<string>;
}
export type AppInstanceBotList = AppInstanceBotSummary[];
export interface ListAppInstanceBotsResponse {
  AppInstanceArn?: string;
  AppInstanceBots?: AppInstanceBotSummary[];
  NextToken?: string | redacted.Redacted<string>;
}
export interface ListAppInstancesRequest {
  MaxResults?: number;
  NextToken?: string | redacted.Redacted<string>;
}
export interface AppInstanceSummary {
  AppInstanceArn?: string;
  Name?: string | redacted.Redacted<string>;
  Metadata?: string | redacted.Redacted<string>;
}
export type AppInstanceList = AppInstanceSummary[];
export interface ListAppInstancesResponse {
  AppInstances?: AppInstanceSummary[];
  NextToken?: string | redacted.Redacted<string>;
}
export type SensitiveChimeArn = string | redacted.Redacted<string>;
export interface ListAppInstanceUserEndpointsRequest {
  AppInstanceUserArn: string | redacted.Redacted<string>;
  MaxResults?: number;
  NextToken?: string | redacted.Redacted<string>;
}
export interface AppInstanceUserEndpointSummary {
  AppInstanceUserArn?: string;
  EndpointId?: string;
  Name?: string | redacted.Redacted<string>;
  Type?: AppInstanceUserEndpointType;
  AllowMessages?: AllowMessages;
  EndpointState?: EndpointState;
}
export type AppInstanceUserEndpointSummaryList = AppInstanceUserEndpointSummary[];
export interface ListAppInstanceUserEndpointsResponse {
  AppInstanceUserEndpoints?: AppInstanceUserEndpointSummary[];
  NextToken?: string | redacted.Redacted<string>;
}
export interface ListAppInstanceUsersRequest {
  AppInstanceArn: string;
  MaxResults?: number;
  NextToken?: string | redacted.Redacted<string>;
}
export interface AppInstanceUserSummary {
  AppInstanceUserArn?: string;
  Name?: string | redacted.Redacted<string>;
  Metadata?: string | redacted.Redacted<string>;
}
export type AppInstanceUserList = AppInstanceUserSummary[];
export interface ListAppInstanceUsersResponse {
  AppInstanceArn?: string;
  AppInstanceUsers?: AppInstanceUserSummary[];
  NextToken?: string | redacted.Redacted<string>;
}
export interface ListTagsForResourceRequest {
  ResourceARN: string;
}
export interface ListTagsForResourceResponse {
  Tags?: Tag[];
}
export interface PutAppInstanceRetentionSettingsRequest {
  AppInstanceArn: string;
  AppInstanceRetentionSettings: AppInstanceRetentionSettings;
}
export interface PutAppInstanceRetentionSettingsResponse {
  AppInstanceRetentionSettings?: AppInstanceRetentionSettings;
  InitiateDeletionTimestamp?: Date;
}
export interface PutAppInstanceUserExpirationSettingsRequest {
  AppInstanceUserArn: string;
  ExpirationSettings?: ExpirationSettings;
}
export interface PutAppInstanceUserExpirationSettingsResponse {
  AppInstanceUserArn?: string;
  ExpirationSettings?: ExpirationSettings;
}
export interface RegisterAppInstanceUserEndpointRequest {
  AppInstanceUserArn: string | redacted.Redacted<string>;
  Name?: string | redacted.Redacted<string>;
  Type: AppInstanceUserEndpointType;
  ResourceArn: string;
  EndpointAttributes: EndpointAttributes;
  ClientRequestToken: string;
  AllowMessages?: AllowMessages;
}
export interface RegisterAppInstanceUserEndpointResponse {
  AppInstanceUserArn?: string;
  EndpointId?: string;
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
export interface UpdateAppInstanceRequest {
  AppInstanceArn: string;
  Name: string | redacted.Redacted<string>;
  Metadata: string | redacted.Redacted<string>;
}
export interface UpdateAppInstanceResponse {
  AppInstanceArn?: string;
}
export interface UpdateAppInstanceBotRequest {
  AppInstanceBotArn: string;
  Name: string | redacted.Redacted<string>;
  Metadata: string | redacted.Redacted<string>;
  Configuration?: Configuration;
}
export interface UpdateAppInstanceBotResponse {
  AppInstanceBotArn?: string;
}
export interface UpdateAppInstanceUserRequest {
  AppInstanceUserArn: string;
  Name: string | redacted.Redacted<string>;
  Metadata: string | redacted.Redacted<string>;
}
export interface UpdateAppInstanceUserResponse {
  AppInstanceUserArn?: string;
}
export interface UpdateAppInstanceUserEndpointRequest {
  AppInstanceUserArn: string;
  EndpointId: string;
  Name?: string | redacted.Redacted<string>;
  AllowMessages?: AllowMessages;
}
export interface UpdateAppInstanceUserEndpointResponse {
  AppInstanceUserArn?: string;
  EndpointId?: string;
}
export type ErrorCode =
  | "BadRequest"
  | "Conflict"
  | "Forbidden"
  | "NotFound"
  | "PreconditionFailed"
  | "ResourceLimitExceeded"
  | "ServiceFailure"
  | "AccessDenied"
  | "ServiceUnavailable"
  | "Throttled"
  | "Throttling"
  | "Unauthorized"
  | "Unprocessable"
  | "VoiceConnectorGroupAssociationsExist"
  | "PhoneNumberAssociationsExist"
  | (string & {});
export type CreateAppInstanceError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | ResourceLimitExceededException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Creates an Amazon Chime SDK messaging `AppInstance` under an AWS account.
 * Only SDK messaging customers use this API. `CreateAppInstance` supports
 * idempotency behavior as described in the AWS API Standard.
 *
 * identity
 */
export const createAppInstance: API.OperationMethod<
  CreateAppInstanceRequest,
  CreateAppInstanceResponse,
  CreateAppInstanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(156, __c39, 0) as any as S.Schema<CreateAppInstanceRequest>,
  output: __S(164, __c41, 0) as any as S.Schema<CreateAppInstanceResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    ResourceLimitExceededException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAppInstance",
}));

export type CreateAppInstanceAdminError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | ResourceLimitExceededException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Promotes an `AppInstanceUser` or `AppInstanceBot` to an
 * `AppInstanceAdmin`. The
 * promoted entity can perform the following actions.
 *
 * - `ChannelModerator` actions across all channels in the
 * `AppInstance`.
 *
 * - `DeleteChannelMessage` actions.
 *
 * Only an `AppInstanceUser` and `AppInstanceBot` can be promoted to an `AppInstanceAdmin`
 * role.
 */
export const createAppInstanceAdmin: API.OperationMethod<
  CreateAppInstanceAdminRequest,
  CreateAppInstanceAdminResponse,
  CreateAppInstanceAdminError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<CreateAppInstanceAdminRequest>,
  output: __S(1, __c0, 1) as any as S.Schema<CreateAppInstanceAdminResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    ResourceLimitExceededException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAppInstanceAdmin",
}));

export type CreateAppInstanceBotError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | ResourceLimitExceededException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Creates a bot under an Amazon Chime `AppInstance`. The request consists of a
 * unique `Configuration` and `Name` for that bot.
 */
export const createAppInstanceBot: API.OperationMethod<
  CreateAppInstanceBotRequest,
  CreateAppInstanceBotResponse,
  CreateAppInstanceBotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(8, __c2, 0) as any as S.Schema<CreateAppInstanceBotRequest>,
  output: __S(16, __c4, 0) as any as S.Schema<CreateAppInstanceBotResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    ResourceLimitExceededException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAppInstanceBot",
}));

export type CreateAppInstanceUserError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | ResourceLimitExceededException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Creates a user under an Amazon Chime `AppInstance`. The request consists of a
 * unique `appInstanceUserId` and `Name` for that user.
 */
export const createAppInstanceUser: API.OperationMethod<
  CreateAppInstanceUserRequest,
  CreateAppInstanceUserResponse,
  CreateAppInstanceUserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(20, __c5, 0) as any as S.Schema<CreateAppInstanceUserRequest>,
  output: __S(28, __c7, 0) as any as S.Schema<CreateAppInstanceUserResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    ResourceLimitExceededException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAppInstanceUser",
}));

export type DeleteAppInstanceError =
  | BadRequestException
  | ForbiddenException
  | ResourceLimitExceededException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Deletes an `AppInstance` and all associated data asynchronously.
 */
export const deleteAppInstance: API.OperationMethod<
  DeleteAppInstanceRequest,
  DeleteAppInstanceResponse,
  DeleteAppInstanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(32, __c8, 0) as any as S.Schema<DeleteAppInstanceRequest>,
  output: __S(36, __c9, 0) as any as S.Schema<DeleteAppInstanceResponse>,
  errors: [
    BadRequestException,
    ForbiddenException,
    ResourceLimitExceededException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAppInstance",
}));

export type DeleteAppInstanceAdminError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | ResourceLimitExceededException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Demotes an `AppInstanceAdmin` to an `AppInstanceUser` or
 * `AppInstanceBot`. This action
 * does not delete the user.
 */
export const deleteAppInstanceAdmin: API.OperationMethod<
  DeleteAppInstanceAdminRequest,
  DeleteAppInstanceAdminResponse,
  DeleteAppInstanceAdminError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(40, __c10, 0) as any as S.Schema<DeleteAppInstanceAdminRequest>,
  output: __S(36, __c9, 0) as any as S.Schema<DeleteAppInstanceAdminResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    ResourceLimitExceededException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAppInstanceAdmin",
}));

export type DeleteAppInstanceBotError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | ResourceLimitExceededException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Deletes an `AppInstanceBot`.
 */
export const deleteAppInstanceBot: API.OperationMethod<
  DeleteAppInstanceBotRequest,
  DeleteAppInstanceBotResponse,
  DeleteAppInstanceBotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(44, __c11, 0) as any as S.Schema<DeleteAppInstanceBotRequest>,
  output: __S(36, __c9, 0) as any as S.Schema<DeleteAppInstanceBotResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    ResourceLimitExceededException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAppInstanceBot",
}));

export type DeleteAppInstanceUserError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | ResourceLimitExceededException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Deletes an `AppInstanceUser`.
 */
export const deleteAppInstanceUser: API.OperationMethod<
  DeleteAppInstanceUserRequest,
  DeleteAppInstanceUserResponse,
  DeleteAppInstanceUserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(48, __c12, 0) as any as S.Schema<DeleteAppInstanceUserRequest>,
  output: __S(36, __c9, 0) as any as S.Schema<DeleteAppInstanceUserResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    ResourceLimitExceededException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAppInstanceUser",
}));

export type DeregisterAppInstanceUserEndpointError =
  | BadRequestException
  | ForbiddenException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Deregisters an `AppInstanceUserEndpoint`.
 */
export const deregisterAppInstanceUserEndpoint: API.OperationMethod<
  DeregisterAppInstanceUserEndpointRequest,
  DeregisterAppInstanceUserEndpointResponse,
  DeregisterAppInstanceUserEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(52, __c13, 0) as any as S.Schema<DeregisterAppInstanceUserEndpointRequest>,
  output: __S(36, __c9, 0) as any as S.Schema<DeregisterAppInstanceUserEndpointResponse>,
  errors: [
    BadRequestException,
    ForbiddenException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeregisterAppInstanceUserEndpoint",
}));

export type DescribeAppInstanceError =
  | BadRequestException
  | ForbiddenException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Returns the full details of an `AppInstance`.
 */
export const describeAppInstance: API.OperationMethod<
  DescribeAppInstanceRequest,
  DescribeAppInstanceResponse,
  DescribeAppInstanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(56, __c14, 0) as any as S.Schema<DescribeAppInstanceRequest>,
  output: __S(58, __c14, 2) as any as S.Schema<DescribeAppInstanceResponse>,
  errors: [
    BadRequestException,
    ForbiddenException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAppInstance",
}));

export type DescribeAppInstanceAdminError =
  | BadRequestException
  | ForbiddenException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Returns the full details of an `AppInstanceAdmin`.
 */
export const describeAppInstanceAdmin: API.OperationMethod<
  DescribeAppInstanceAdminRequest,
  DescribeAppInstanceAdminResponse,
  DescribeAppInstanceAdminError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(60, __c15, 0) as any as S.Schema<DescribeAppInstanceAdminRequest>,
  output: __S(62, __c15, 2) as any as S.Schema<DescribeAppInstanceAdminResponse>,
  errors: [
    BadRequestException,
    ForbiddenException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAppInstanceAdmin",
}));

export type DescribeAppInstanceBotError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * The `AppInstanceBot's` information.
 */
export const describeAppInstanceBot: API.OperationMethod<
  DescribeAppInstanceBotRequest,
  DescribeAppInstanceBotResponse,
  DescribeAppInstanceBotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(64, __c16, 0) as any as S.Schema<DescribeAppInstanceBotRequest>,
  output: __S(66, __c16, 2) as any as S.Schema<DescribeAppInstanceBotResponse>,
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAppInstanceBot",
}));

export type DescribeAppInstanceUserError =
  | BadRequestException
  | ForbiddenException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Returns the full details of an `AppInstanceUser`.
 */
export const describeAppInstanceUser: API.OperationMethod<
  DescribeAppInstanceUserRequest,
  DescribeAppInstanceUserResponse,
  DescribeAppInstanceUserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(68, __c17, 0) as any as S.Schema<DescribeAppInstanceUserRequest>,
  output: __S(70, __c17, 2) as any as S.Schema<DescribeAppInstanceUserResponse>,
  errors: [
    BadRequestException,
    ForbiddenException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAppInstanceUser",
}));

export type DescribeAppInstanceUserEndpointError =
  | BadRequestException
  | ForbiddenException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Returns the full details of an `AppInstanceUserEndpoint`.
 */
export const describeAppInstanceUserEndpoint: API.OperationMethod<
  DescribeAppInstanceUserEndpointRequest,
  DescribeAppInstanceUserEndpointResponse,
  DescribeAppInstanceUserEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(72, __c18, 0) as any as S.Schema<DescribeAppInstanceUserEndpointRequest>,
  output: __S(74, __c18, 2) as any as S.Schema<DescribeAppInstanceUserEndpointResponse>,
  errors: [
    BadRequestException,
    ForbiddenException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAppInstanceUserEndpoint",
}));

export type GetAppInstanceRetentionSettingsError =
  | BadRequestException
  | ForbiddenException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Gets the retention settings for an `AppInstance`.
 */
export const getAppInstanceRetentionSettings: API.OperationMethod<
  GetAppInstanceRetentionSettingsRequest,
  GetAppInstanceRetentionSettingsResponse,
  GetAppInstanceRetentionSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(84, __c21, 0) as any as S.Schema<GetAppInstanceRetentionSettingsRequest>,
  output: __S(90, __c22, 2) as any as S.Schema<GetAppInstanceRetentionSettingsResponse>,
  errors: [
    BadRequestException,
    ForbiddenException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAppInstanceRetentionSettings",
}));

export type ListAppInstanceAdminsError =
  | BadRequestException
  | ForbiddenException
  | ResourceLimitExceededException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Returns a list of the administrators in the `AppInstance`.
 */
export const listAppInstanceAdmins: API.PaginatedOperationMethod<
  ListAppInstanceAdminsRequest,
  ListAppInstanceAdminsResponse,
  ListAppInstanceAdminsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(92, __c23, 0) as any as S.Schema<ListAppInstanceAdminsRequest>,
  output: __S(95, __c23, 3) as any as S.Schema<ListAppInstanceAdminsResponse>,
  errors: [
    BadRequestException,
    ForbiddenException,
    ResourceLimitExceededException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAppInstanceAdmins",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListAppInstanceBotsError =
  | BadRequestException
  | ForbiddenException
  | ResourceLimitExceededException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Lists all `AppInstanceBots` created under a single `AppInstance`.
 */
export const listAppInstanceBots: API.PaginatedOperationMethod<
  ListAppInstanceBotsRequest,
  ListAppInstanceBotsResponse,
  ListAppInstanceBotsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(96, __c24, 0) as any as S.Schema<ListAppInstanceBotsRequest>,
  output: __S(99, __c24, 3) as any as S.Schema<ListAppInstanceBotsResponse>,
  errors: [
    BadRequestException,
    ForbiddenException,
    ResourceLimitExceededException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAppInstanceBots",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListAppInstancesError =
  | BadRequestException
  | ForbiddenException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Lists all Amazon Chime `AppInstance`s created under a single AWS
 * account.
 */
export const listAppInstances: API.PaginatedOperationMethod<
  ListAppInstancesRequest,
  ListAppInstancesResponse,
  ListAppInstancesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(100, __c25, 0) as any as S.Schema<ListAppInstancesRequest>,
  output: __S(103, __c25, 3) as any as S.Schema<ListAppInstancesResponse>,
  errors: [
    BadRequestException,
    ForbiddenException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAppInstances",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListAppInstanceUserEndpointsError =
  | BadRequestException
  | ForbiddenException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Lists all the `AppInstanceUserEndpoints` created under a single `AppInstanceUser`.
 */
export const listAppInstanceUserEndpoints: API.PaginatedOperationMethod<
  ListAppInstanceUserEndpointsRequest,
  ListAppInstanceUserEndpointsResponse,
  ListAppInstanceUserEndpointsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(104, __c26, 0) as any as S.Schema<ListAppInstanceUserEndpointsRequest>,
  output: __S(107, __c26, 3) as any as S.Schema<ListAppInstanceUserEndpointsResponse>,
  errors: [
    BadRequestException,
    ForbiddenException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAppInstanceUserEndpoints",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListAppInstanceUsersError =
  | BadRequestException
  | ForbiddenException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * List all `AppInstanceUsers` created under a single
 * `AppInstance`.
 */
export const listAppInstanceUsers: API.PaginatedOperationMethod<
  ListAppInstanceUsersRequest,
  ListAppInstanceUsersResponse,
  ListAppInstanceUsersError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(108, __c27, 0) as any as S.Schema<ListAppInstanceUsersRequest>,
  output: __S(111, __c27, 3) as any as S.Schema<ListAppInstanceUsersResponse>,
  errors: [
    BadRequestException,
    ForbiddenException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAppInstanceUsers",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | BadRequestException
  | ForbiddenException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Lists the tags applied to an Amazon Chime SDK identity resource.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(112, __c28, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(113, __c28, 1) as any as S.Schema<ListTagsForResourceResponse>,
  errors: [
    BadRequestException,
    ForbiddenException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type PutAppInstanceRetentionSettingsError =
  | BadRequestException
  | ForbiddenException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Sets the amount of time in days that a given `AppInstance` retains
 * data.
 */
export const putAppInstanceRetentionSettings: API.OperationMethod<
  PutAppInstanceRetentionSettingsRequest,
  PutAppInstanceRetentionSettingsResponse,
  PutAppInstanceRetentionSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(116, __c29, 0) as any as S.Schema<PutAppInstanceRetentionSettingsRequest>,
  output: __S(90, __c22, 2) as any as S.Schema<PutAppInstanceRetentionSettingsResponse>,
  errors: [
    BadRequestException,
    ForbiddenException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutAppInstanceRetentionSettings",
}));

export type PutAppInstanceUserExpirationSettingsError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Sets the number of days before the `AppInstanceUser` is automatically deleted.
 *
 * A background process deletes expired `AppInstanceUsers` within 6 hours of expiration.
 * Actual deletion times may vary.
 *
 * Expired `AppInstanceUsers` that have not yet been deleted appear as active, and you can update
 * their expiration settings. The system honors the new settings.
 */
export const putAppInstanceUserExpirationSettings: API.OperationMethod<
  PutAppInstanceUserExpirationSettingsRequest,
  PutAppInstanceUserExpirationSettingsResponse,
  PutAppInstanceUserExpirationSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(120, __c30, 0) as any as S.Schema<PutAppInstanceUserExpirationSettingsRequest>,
  output: __S(121, __c30, 1) as any as S.Schema<PutAppInstanceUserExpirationSettingsResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutAppInstanceUserExpirationSettings",
}));

export type RegisterAppInstanceUserEndpointError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | ResourceLimitExceededException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Registers an endpoint under an Amazon Chime `AppInstanceUser`. The endpoint receives messages for a user. For push notifications, the endpoint is a mobile device used to receive mobile push notifications for a user.
 */
export const registerAppInstanceUserEndpoint: API.OperationMethod<
  RegisterAppInstanceUserEndpointRequest,
  RegisterAppInstanceUserEndpointResponse,
  RegisterAppInstanceUserEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(124, __c31, 0) as any as S.Schema<RegisterAppInstanceUserEndpointRequest>,
  output: __S(128, __c32, 0) as any as S.Schema<RegisterAppInstanceUserEndpointResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    ResourceLimitExceededException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RegisterAppInstanceUserEndpoint",
}));

export type TagResourceError =
  | BadRequestException
  | ForbiddenException
  | ResourceLimitExceededException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Applies the specified tags to the specified Amazon Chime SDK identity resource.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(132, __c33, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(36, __c9, 0) as any as S.Schema<TagResourceResponse>,
  errors: [
    BadRequestException,
    ForbiddenException,
    ResourceLimitExceededException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError =
  | BadRequestException
  | ForbiddenException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Removes the specified tags from the specified Amazon Chime SDK identity resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(137, __c34, 1) as any as S.Schema<UntagResourceRequest>,
  output: __S(36, __c9, 0) as any as S.Schema<UntagResourceResponse>,
  errors: [
    BadRequestException,
    ForbiddenException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateAppInstanceError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Updates `AppInstance` metadata.
 */
export const updateAppInstance: API.OperationMethod<
  UpdateAppInstanceRequest,
  UpdateAppInstanceResponse,
  UpdateAppInstanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(140, __c35, 0) as any as S.Schema<UpdateAppInstanceRequest>,
  output: __S(164, __c41, 0) as any as S.Schema<UpdateAppInstanceResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAppInstance",
}));

export type UpdateAppInstanceBotError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | ResourceLimitExceededException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Updates the name and metadata of an `AppInstanceBot`.
 */
export const updateAppInstanceBot: API.OperationMethod<
  UpdateAppInstanceBotRequest,
  UpdateAppInstanceBotResponse,
  UpdateAppInstanceBotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(144, __c36, 0) as any as S.Schema<UpdateAppInstanceBotRequest>,
  output: __S(16, __c4, 0) as any as S.Schema<UpdateAppInstanceBotResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    ResourceLimitExceededException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAppInstanceBot",
}));

export type UpdateAppInstanceUserError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | ResourceLimitExceededException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Updates the details of an `AppInstanceUser`. You can update names and
 * metadata.
 */
export const updateAppInstanceUser: API.OperationMethod<
  UpdateAppInstanceUserRequest,
  UpdateAppInstanceUserResponse,
  UpdateAppInstanceUserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(148, __c37, 0) as any as S.Schema<UpdateAppInstanceUserRequest>,
  output: __S(28, __c7, 0) as any as S.Schema<UpdateAppInstanceUserResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    ResourceLimitExceededException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAppInstanceUser",
}));

export type UpdateAppInstanceUserEndpointError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Updates the details of an `AppInstanceUserEndpoint`. You can update the name and `AllowMessage` values.
 */
export const updateAppInstanceUserEndpoint: API.OperationMethod<
  UpdateAppInstanceUserEndpointRequest,
  UpdateAppInstanceUserEndpointResponse,
  UpdateAppInstanceUserEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(152, __c38, 0) as any as S.Schema<UpdateAppInstanceUserEndpointRequest>,
  output: __S(128, __c32, 0) as any as S.Schema<UpdateAppInstanceUserEndpointResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAppInstanceUserEndpoint",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AppInstanceAdminArn: S.String,
          AppInstanceArn: S.String.pipe(T.HttpLabel("AppInstanceArn")),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/app-instances/{AppInstanceArn}/admins" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateAppInstanceAdminRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          AppInstanceAdmin: S.optional(__S(4, __c1, 0)),
          AppInstanceArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "CreateAppInstanceAdminResponse" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Arn: S.optional(S.String), Name: S.optional(SensitiveString) }),
      ).annotate({ identifier: "Identity" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AppInstanceArn: S.String,
          Name: S.optional(SensitiveString),
          Metadata: S.optional(SensitiveString),
          ClientRequestToken: S.String.pipe(T.IdempotencyToken()),
          Tags: S.optional(__S(161, __c40, 1)),
          Configuration: __S(14, __c3, 2),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/app-instance-bots" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateAppInstanceBotRequest" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ StandardMessages: S.String, TargetedMessages: S.String }),
      ).annotate({ identifier: "InvokedBy" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          RespondsTo: S.optional(S.String),
          InvokedBy: S.optional(__S(12, __c3, 0)),
          LexBotAliasArn: S.String,
          LocaleId: S.String,
          WelcomeIntent: S.optional(S.String),
        }),
      ).annotate({ identifier: "LexConfiguration" });
    case 2:
      return S.suspend(() => S.Struct({ Lex: __S(13, __c3, 1) })).annotate({
        identifier: "Configuration",
      });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ AppInstanceBotArn: S.optional(S.String) })).annotate({
        identifier: "CreateAppInstanceBotResponse",
      });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AppInstanceArn: S.String,
          AppInstanceUserId: SensitiveString,
          Name: SensitiveString,
          Metadata: S.optional(SensitiveString),
          ClientRequestToken: S.String.pipe(T.IdempotencyToken()),
          Tags: S.optional(__S(161, __c40, 1)),
          ExpirationSettings: S.optional(__S(24, __c6, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/app-instance-users" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateAppInstanceUserRequest" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ExpirationDays: S.Number, ExpirationCriterion: S.String }),
      ).annotate({ identifier: "ExpirationSettings" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ AppInstanceUserArn: S.optional(S.String) })).annotate({
        identifier: "CreateAppInstanceUserResponse",
      });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AppInstanceArn: S.String.pipe(T.HttpLabel("AppInstanceArn")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/app-instances/{AppInstanceArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteAppInstanceRequest" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "DeleteAppInstanceResponse" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AppInstanceAdminArn: S.String.pipe(T.HttpLabel("AppInstanceAdminArn")),
          AppInstanceArn: S.String.pipe(T.HttpLabel("AppInstanceArn")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/app-instances/{AppInstanceArn}/admins/{AppInstanceAdminArn}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteAppInstanceAdminRequest" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AppInstanceBotArn: S.String.pipe(T.HttpLabel("AppInstanceBotArn")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/app-instance-bots/{AppInstanceBotArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteAppInstanceBotRequest" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AppInstanceUserArn: S.String.pipe(T.HttpLabel("AppInstanceUserArn")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/app-instance-users/{AppInstanceUserArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteAppInstanceUserRequest" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AppInstanceUserArn: S.String.pipe(T.HttpLabel("AppInstanceUserArn")),
          EndpointId: S.String.pipe(T.HttpLabel("EndpointId")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/app-instance-users/{AppInstanceUserArn}/endpoints/{EndpointId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeregisterAppInstanceUserEndpointRequest" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AppInstanceArn: S.String.pipe(T.HttpLabel("AppInstanceArn")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/app-instances/{AppInstanceArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeAppInstanceRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          AppInstanceArn: S.optional(S.String),
          Name: S.optional(SensitiveString),
          CreatedTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastUpdatedTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Metadata: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "AppInstance" });
    case 2:
      return S.suspend(() => S.Struct({ AppInstance: S.optional(__S(57, __c14, 1)) })).annotate({
        identifier: "DescribeAppInstanceResponse",
      });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AppInstanceAdminArn: S.String.pipe(T.HttpLabel("AppInstanceAdminArn")),
          AppInstanceArn: S.String.pipe(T.HttpLabel("AppInstanceArn")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/app-instances/{AppInstanceArn}/admins/{AppInstanceAdminArn}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeAppInstanceAdminRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Admin: S.optional(__S(4, __c1, 0)),
          AppInstanceArn: S.optional(S.String),
          CreatedTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "AppInstanceAdmin" });
    case 2:
      return S.suspend(() =>
        S.Struct({ AppInstanceAdmin: S.optional(__S(61, __c15, 1)) }),
      ).annotate({ identifier: "DescribeAppInstanceAdminResponse" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AppInstanceBotArn: S.String.pipe(T.HttpLabel("AppInstanceBotArn")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/app-instance-bots/{AppInstanceBotArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeAppInstanceBotRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          AppInstanceBotArn: S.optional(S.String),
          Name: S.optional(SensitiveString),
          Configuration: S.optional(__S(14, __c3, 2)),
          CreatedTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastUpdatedTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Metadata: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "AppInstanceBot" });
    case 2:
      return S.suspend(() => S.Struct({ AppInstanceBot: S.optional(__S(65, __c16, 1)) })).annotate({
        identifier: "DescribeAppInstanceBotResponse",
      });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AppInstanceUserArn: S.String.pipe(T.HttpLabel("AppInstanceUserArn")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/app-instance-users/{AppInstanceUserArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeAppInstanceUserRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          AppInstanceUserArn: S.optional(S.String),
          Name: S.optional(SensitiveString),
          Metadata: S.optional(SensitiveString),
          CreatedTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastUpdatedTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ExpirationSettings: S.optional(__S(24, __c6, 0)),
        }),
      ).annotate({ identifier: "AppInstanceUser" });
    case 2:
      return S.suspend(() => S.Struct({ AppInstanceUser: S.optional(__S(69, __c17, 1)) })).annotate(
        { identifier: "DescribeAppInstanceUserResponse" },
      );
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AppInstanceUserArn: S.String.pipe(T.HttpLabel("AppInstanceUserArn")),
          EndpointId: S.String.pipe(T.HttpLabel("EndpointId")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/app-instance-users/{AppInstanceUserArn}/endpoints/{EndpointId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeAppInstanceUserEndpointRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          AppInstanceUserArn: S.optional(S.String),
          EndpointId: S.optional(S.String),
          Name: S.optional(SensitiveString),
          Type: S.optional(S.String),
          ResourceArn: S.optional(S.String),
          EndpointAttributes: S.optional(__S(80, __c20, 0)),
          CreatedTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastUpdatedTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          AllowMessages: S.optional(S.String),
          EndpointState: S.optional(__S(76, __c19, 0)),
        }),
      ).annotate({ identifier: "AppInstanceUserEndpoint" });
    case 2:
      return S.suspend(() =>
        S.Struct({ AppInstanceUserEndpoint: S.optional(__S(73, __c18, 1)) }),
      ).annotate({ identifier: "DescribeAppInstanceUserEndpointResponse" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Status: S.String, StatusReason: S.optional(S.String) }),
      ).annotate({ identifier: "EndpointState" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DeviceToken: SensitiveString, VoipDeviceToken: S.optional(SensitiveString) }),
      ).annotate({ identifier: "EndpointAttributes" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AppInstanceArn: S.String.pipe(T.HttpLabel("AppInstanceArn")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/app-instances/{AppInstanceArn}/retention-settings" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetAppInstanceRetentionSettingsRequest" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ RetentionDays: S.optional(S.Number) })).annotate({
        identifier: "ChannelRetentionSettings",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({ ChannelRetentionSettings: S.optional(__S(88, __c22, 0)) }),
      ).annotate({ identifier: "AppInstanceRetentionSettings" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          AppInstanceRetentionSettings: S.optional(__S(89, __c22, 1)),
          InitiateDeletionTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "GetAppInstanceRetentionSettingsResponse" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AppInstanceArn: S.String.pipe(T.HttpLabel("AppInstanceArn")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("max-results")),
          NextToken: S.optional(SensitiveString).pipe(T.HttpQuery("next-token")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/app-instances/{AppInstanceArn}/admins" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListAppInstanceAdminsRequest" });
    case 1:
      return S.suspend(() => S.Struct({ Admin: S.optional(__S(4, __c1, 0)) })).annotate({
        identifier: "AppInstanceAdminSummary",
      });
    case 2:
      return S.Array(__S(93, __c23, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          AppInstanceArn: S.optional(S.String),
          AppInstanceAdmins: S.optional(__S(94, __c23, 2)),
          NextToken: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "ListAppInstanceAdminsResponse" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AppInstanceArn: S.String.pipe(T.HttpQuery("app-instance-arn")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("max-results")),
          NextToken: S.optional(SensitiveString).pipe(T.HttpQuery("next-token")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/app-instance-bots" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListAppInstanceBotsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          AppInstanceBotArn: S.optional(S.String),
          Name: S.optional(SensitiveString),
          Metadata: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "AppInstanceBotSummary" });
    case 2:
      return S.Array(__S(97, __c24, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          AppInstanceArn: S.optional(S.String),
          AppInstanceBots: S.optional(__S(98, __c24, 2)),
          NextToken: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "ListAppInstanceBotsResponse" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("max-results")),
          NextToken: S.optional(SensitiveString).pipe(T.HttpQuery("next-token")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/app-instances" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListAppInstancesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          AppInstanceArn: S.optional(S.String),
          Name: S.optional(SensitiveString),
          Metadata: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "AppInstanceSummary" });
    case 2:
      return S.Array(__S(101, __c25, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          AppInstances: S.optional(__S(102, __c25, 2)),
          NextToken: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "ListAppInstancesResponse" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AppInstanceUserArn: SensitiveString.pipe(T.HttpLabel("AppInstanceUserArn")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("max-results")),
          NextToken: S.optional(SensitiveString).pipe(T.HttpQuery("next-token")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/app-instance-users/{AppInstanceUserArn}/endpoints" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListAppInstanceUserEndpointsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          AppInstanceUserArn: S.optional(S.String),
          EndpointId: S.optional(S.String),
          Name: S.optional(SensitiveString),
          Type: S.optional(S.String),
          AllowMessages: S.optional(S.String),
          EndpointState: S.optional(__S(76, __c19, 0)),
        }),
      ).annotate({ identifier: "AppInstanceUserEndpointSummary" });
    case 2:
      return S.Array(__S(105, __c26, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          AppInstanceUserEndpoints: S.optional(__S(106, __c26, 2)),
          NextToken: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "ListAppInstanceUserEndpointsResponse" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AppInstanceArn: S.String.pipe(T.HttpQuery("app-instance-arn")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("max-results")),
          NextToken: S.optional(SensitiveString).pipe(T.HttpQuery("next-token")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/app-instance-users" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListAppInstanceUsersRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          AppInstanceUserArn: S.optional(S.String),
          Name: S.optional(SensitiveString),
          Metadata: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "AppInstanceUserSummary" });
    case 2:
      return S.Array(__S(109, __c27, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          AppInstanceArn: S.optional(S.String),
          AppInstanceUsers: S.optional(__S(110, __c27, 2)),
          NextToken: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "ListAppInstanceUsersResponse" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceARN: S.String.pipe(T.HttpQuery("arn")) }).pipe(
          T.all(T.Http({ method: "GET", uri: "/tags" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListTagsForResourceRequest" });
    case 1:
      return S.suspend(() => S.Struct({ Tags: S.optional(__S(161, __c40, 1)) })).annotate({
        identifier: "ListTagsForResourceResponse",
      });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AppInstanceArn: S.String.pipe(T.HttpLabel("AppInstanceArn")),
          AppInstanceRetentionSettings: __S(89, __c22, 1),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/app-instances/{AppInstanceArn}/retention-settings" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutAppInstanceRetentionSettingsRequest" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AppInstanceUserArn: S.String.pipe(T.HttpLabel("AppInstanceUserArn")),
          ExpirationSettings: S.optional(__S(24, __c6, 0)),
        }).pipe(
          T.all(
            T.Http({
              method: "PUT",
              uri: "/app-instance-users/{AppInstanceUserArn}/expiration-settings",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutAppInstanceUserExpirationSettingsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          AppInstanceUserArn: S.optional(S.String),
          ExpirationSettings: S.optional(__S(24, __c6, 0)),
        }),
      ).annotate({ identifier: "PutAppInstanceUserExpirationSettingsResponse" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AppInstanceUserArn: SensitiveString.pipe(T.HttpLabel("AppInstanceUserArn")),
          Name: S.optional(SensitiveString),
          Type: S.String,
          ResourceArn: S.String,
          EndpointAttributes: __S(80, __c20, 0),
          ClientRequestToken: S.String.pipe(T.IdempotencyToken()),
          AllowMessages: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/app-instance-users/{AppInstanceUserArn}/endpoints" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "RegisterAppInstanceUserEndpointRequest" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AppInstanceUserArn: S.optional(S.String), EndpointId: S.optional(S.String) }),
      ).annotate({ identifier: "RegisterAppInstanceUserEndpointResponse" });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceARN: S.String, Tags: __S(161, __c40, 1) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/tags?operation=tag-resource" }),
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
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.Array(SensitiveString);
    case 1:
      return S.suspend(() =>
        S.Struct({ ResourceARN: S.String, TagKeys: __S(136, __c34, 0) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/tags?operation=untag-resource" }),
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
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AppInstanceArn: S.String.pipe(T.HttpLabel("AppInstanceArn")),
          Name: SensitiveString,
          Metadata: SensitiveString,
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/app-instances/{AppInstanceArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateAppInstanceRequest" });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AppInstanceBotArn: S.String.pipe(T.HttpLabel("AppInstanceBotArn")),
          Name: SensitiveString,
          Metadata: SensitiveString,
          Configuration: S.optional(__S(14, __c3, 2)),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/app-instance-bots/{AppInstanceBotArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateAppInstanceBotRequest" });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AppInstanceUserArn: S.String.pipe(T.HttpLabel("AppInstanceUserArn")),
          Name: SensitiveString,
          Metadata: SensitiveString,
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/app-instance-users/{AppInstanceUserArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateAppInstanceUserRequest" });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AppInstanceUserArn: S.String.pipe(T.HttpLabel("AppInstanceUserArn")),
          EndpointId: S.String.pipe(T.HttpLabel("EndpointId")),
          Name: S.optional(SensitiveString),
          AllowMessages: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({
              method: "PUT",
              uri: "/app-instance-users/{AppInstanceUserArn}/endpoints/{EndpointId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateAppInstanceUserEndpointRequest" });
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: SensitiveString,
          Metadata: S.optional(SensitiveString),
          ClientRequestToken: S.String.pipe(T.IdempotencyToken()),
          Tags: S.optional(__S(161, __c40, 1)),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/app-instances" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateAppInstanceRequest" });
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Key: SensitiveString, Value: SensitiveString })).annotate({
        identifier: "Tag",
      });
    case 1:
      return S.Array(__S(160, __c40, 0));
  }
}
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ AppInstanceArn: S.optional(S.String) })).annotate({
        identifier: "CreateAppInstanceResponse",
      });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
