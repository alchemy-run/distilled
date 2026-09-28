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
  sdkId: "Chime SDK Identity",
  target: "ChimeIdentityService",
  version: "2021-04-20",
  sigv4: "chime",
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
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://identity-chime.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://identity-chime.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class BadRequestException
  extends /*@__PURE__*/ TE.TaggedError(
    "BadRequestException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly Code?: ErrorCode; readonly message?: string }> {}
export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError("ConflictException", ["ConflictError"], {
    status: 409,
  })<{ readonly Code?: ErrorCode; readonly message?: string }> {}
export class ForbiddenException
  extends /*@__PURE__*/ TE.TaggedError("ForbiddenException", ["AuthError"], {
    status: 403,
  })<{ readonly Code?: ErrorCode; readonly message?: string }> {}
export class NotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "NotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly Code?: ErrorCode; readonly message?: string }> {}
export class ResourceLimitExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceLimitExceededException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly Code?: ErrorCode; readonly message?: string }> {}
export class ServiceFailureException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceFailureException",
    ["ServerError"],
    { status: 500 },
  )<{ readonly Code?: ErrorCode; readonly message?: string }> {}
export class ServiceUnavailableException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceUnavailableException",
    ["ServerError"],
    { status: 503 },
  )<{ readonly Code?: ErrorCode; readonly message?: string }> {}
export class ThrottledClientException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottledClientException",
    ["ThrottlingError"],
    { status: 429 },
  )<{ readonly Code?: ErrorCode; readonly message?: string }> {}
export class UnauthorizedClientException
  extends /*@__PURE__*/ TE.TaggedError(
    "UnauthorizedClientException",
    ["AuthError"],
    { status: 401 },
  )<{ readonly Code?: ErrorCode; readonly message?: string }> {}
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
export type StandardMessages =
  | "AUTO"
  | "ALL"
  | "MENTIONS"
  | "NONE"
  | (string & {});
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
export type AppInstanceUserEndpointType =
  | "APNS"
  | "APNS_SANDBOX"
  | "GCM"
  | (string & {});
export type NonEmptySensitiveString1600 = string | redacted.Redacted<string>;
export interface EndpointAttributes {
  DeviceToken: string | redacted.Redacted<string>;
  VoipDeviceToken?: string | redacted.Redacted<string>;
}
export type AllowMessages = "ALL" | "NONE" | (string & {});
export type EndpointStatus = "ACTIVE" | "INACTIVE" | (string & {});
export type EndpointStatusReason =
  | "INVALID_DEVICE_TOKEN"
  | "INVALID_PINPOINT_ARN"
  | (string & {});
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
export type AppInstanceUserEndpointSummaryList =
  AppInstanceUserEndpointSummary[];
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
  descriptor: {
    service: svc,
    http: "POST /app-instances",
    input: {
      Name: 0,
      Metadata: 0,
      ClientRequestToken: D.m({ idempotency: true }),
      Tags: D.list(i_Tag),
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /app-instances/{AppInstanceArn}/admins",
    input: { AppInstanceAdminArn: 0, AppInstanceArn: 0 },
    output: { AppInstanceAdmin: o_Identity },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /app-instance-bots",
    input: {
      AppInstanceArn: 0,
      Name: 0,
      Metadata: 0,
      ClientRequestToken: D.m({ idempotency: true }),
      Tags: D.list(i_Tag),
      Configuration: i_Configuration,
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /app-instance-users",
    input: {
      AppInstanceArn: 0,
      AppInstanceUserId: 0,
      Name: 0,
      Metadata: 0,
      ClientRequestToken: D.m({ idempotency: true }),
      Tags: D.list(i_Tag),
      ExpirationSettings: i_ExpirationSettings,
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /app-instances/{AppInstanceArn}",
    input: { AppInstanceArn: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /app-instances/{AppInstanceArn}/admins/{AppInstanceAdminArn}",
    input: { AppInstanceAdminArn: 0, AppInstanceArn: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /app-instance-bots/{AppInstanceBotArn}",
    input: { AppInstanceBotArn: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /app-instance-users/{AppInstanceUserArn}",
    input: { AppInstanceUserArn: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /app-instance-users/{AppInstanceUserArn}/endpoints/{EndpointId}",
    input: { AppInstanceUserArn: 0, EndpointId: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /app-instances/{AppInstanceArn}",
    input: { AppInstanceArn: 0 },
    output: {
      AppInstance: {
        Name: D.secret,
        CreatedTimestamp: D.ts,
        LastUpdatedTimestamp: D.ts,
        Metadata: D.secret,
      },
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /app-instances/{AppInstanceArn}/admins/{AppInstanceAdminArn}",
    input: { AppInstanceAdminArn: 0, AppInstanceArn: 0 },
    output: { AppInstanceAdmin: { Admin: o_Identity, CreatedTimestamp: D.ts } },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /app-instance-bots/{AppInstanceBotArn}",
    input: { AppInstanceBotArn: 0 },
    output: {
      AppInstanceBot: {
        Name: D.secret,
        CreatedTimestamp: D.ts,
        LastUpdatedTimestamp: D.ts,
        Metadata: D.secret,
      },
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /app-instance-users/{AppInstanceUserArn}",
    input: { AppInstanceUserArn: 0 },
    output: {
      AppInstanceUser: {
        Name: D.secret,
        Metadata: D.secret,
        CreatedTimestamp: D.ts,
        LastUpdatedTimestamp: D.ts,
      },
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /app-instance-users/{AppInstanceUserArn}/endpoints/{EndpointId}",
    input: { AppInstanceUserArn: 0, EndpointId: 0 },
    output: {
      AppInstanceUserEndpoint: {
        Name: D.secret,
        EndpointAttributes: {
          DeviceToken: D.secret,
          VoipDeviceToken: D.secret,
        },
        CreatedTimestamp: D.ts,
        LastUpdatedTimestamp: D.ts,
      },
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /app-instances/{AppInstanceArn}/retention-settings",
    input: { AppInstanceArn: 0 },
    output: { InitiateDeletionTimestamp: D.ts },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /app-instances/{AppInstanceArn}/admins",
    input: {
      AppInstanceArn: 0,
      MaxResults: D.m({ query: "max-results" }),
      NextToken: D.m({ query: "next-token" }),
    },
    output: {
      AppInstanceAdmins: D.list({ Admin: o_Identity }),
      NextToken: D.secret,
    },
  },
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
  descriptor: {
    service: svc,
    http: "GET /app-instance-bots",
    input: {
      AppInstanceArn: D.m({ query: "app-instance-arn" }),
      MaxResults: D.m({ query: "max-results" }),
      NextToken: D.m({ query: "next-token" }),
    },
    output: {
      AppInstanceBots: D.list({ Name: D.secret, Metadata: D.secret }),
      NextToken: D.secret,
    },
  },
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
  descriptor: {
    service: svc,
    http: "GET /app-instances",
    input: {
      MaxResults: D.m({ query: "max-results" }),
      NextToken: D.m({ query: "next-token" }),
    },
    output: {
      AppInstances: D.list({ Name: D.secret, Metadata: D.secret }),
      NextToken: D.secret,
    },
  },
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
  descriptor: {
    service: svc,
    http: "GET /app-instance-users/{AppInstanceUserArn}/endpoints",
    input: {
      AppInstanceUserArn: 0,
      MaxResults: D.m({ query: "max-results" }),
      NextToken: D.m({ query: "next-token" }),
    },
    output: {
      AppInstanceUserEndpoints: D.list({ Name: D.secret }),
      NextToken: D.secret,
    },
  },
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
  descriptor: {
    service: svc,
    http: "GET /app-instance-users",
    input: {
      AppInstanceArn: D.m({ query: "app-instance-arn" }),
      MaxResults: D.m({ query: "max-results" }),
      NextToken: D.m({ query: "next-token" }),
    },
    output: {
      AppInstanceUsers: D.list({ Name: D.secret, Metadata: D.secret }),
      NextToken: D.secret,
    },
  },
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
  descriptor: {
    service: svc,
    http: "GET /tags",
    input: { ResourceARN: D.m({ query: "arn" }) },
    output: { Tags: D.list({ Key: D.secret, Value: D.secret }) },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /app-instances/{AppInstanceArn}/retention-settings",
    input: {
      AppInstanceArn: 0,
      AppInstanceRetentionSettings: {
        ChannelRetentionSettings: { RetentionDays: 0 },
      },
    },
    output: { InitiateDeletionTimestamp: D.ts },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /app-instance-users/{AppInstanceUserArn}/expiration-settings",
    input: { AppInstanceUserArn: 0, ExpirationSettings: i_ExpirationSettings },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /app-instance-users/{AppInstanceUserArn}/endpoints",
    input: {
      AppInstanceUserArn: 0,
      Name: 0,
      Type: 0,
      ResourceArn: 0,
      EndpointAttributes: { DeviceToken: 0, VoipDeviceToken: 0 },
      ClientRequestToken: D.m({ idempotency: true }),
      AllowMessages: 0,
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /tags?operation=tag-resource",
    input: { ResourceARN: 0, Tags: D.list(i_Tag) },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /tags?operation=untag-resource",
    input: { ResourceARN: 0, TagKeys: 0 },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /app-instances/{AppInstanceArn}",
    input: { AppInstanceArn: 0, Name: 0, Metadata: 0 },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /app-instance-bots/{AppInstanceBotArn}",
    input: {
      AppInstanceBotArn: 0,
      Name: 0,
      Metadata: 0,
      Configuration: i_Configuration,
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /app-instance-users/{AppInstanceUserArn}",
    input: { AppInstanceUserArn: 0, Name: 0, Metadata: 0 },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /app-instance-users/{AppInstanceUserArn}/endpoints/{EndpointId}",
    input: { AppInstanceUserArn: 0, EndpointId: 0, Name: 0, AllowMessages: 0 },
    body: true,
  },
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
})) as any;

const i_Configuration: D.LazyStruct = () => ({
  Lex: {
    RespondsTo: 0,
    InvokedBy: { StandardMessages: 0, TargetedMessages: 0 },
    LexBotAliasArn: 0,
    LocaleId: 0,
    WelcomeIntent: 0,
  },
});
const i_ExpirationSettings: D.LazyStruct = () => ({
  ExpirationDays: 0,
  ExpirationCriterion: 0,
});
const i_Tag: D.LazyStruct = () => ({ Key: 0, Value: 0 });
const o_Identity: D.LazyStruct = () => ({ Name: D.secret });
