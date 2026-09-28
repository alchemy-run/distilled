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
  sdkId: "ivschat",
  target: "AmazonInteractiveVideoServiceChat",
  version: "2020-07-14",
  sigv4: "ivschat",
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
                `https://ivschat-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://ivschat-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://ivschat.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://ivschat.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
    ["ServerError"],
    { status: 500 },
  )<{ readonly message: string }> {}
export class PendingVerification
  extends /*@__PURE__*/ TE.TaggedError("PendingVerification", ["AuthError"], {
    status: 403,
  })<{ readonly message: string }> {}
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
    readonly limit: number;
  }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["ThrottlingError"],
    { status: 429 },
  )<{
    readonly message: string;
    readonly resourceId: string;
    readonly resourceType: string;
    readonly limit: number;
  }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{
    readonly message: string;
    readonly reason?: string;
    readonly fieldList?: ValidationExceptionField[];
  }> {}
export type RoomIdentifier = string;
export type UserID = string | redacted.Redacted<string>;
export type ChatTokenCapability = string;
export type ChatTokenCapabilities = string[];
export type SessionDurationInMinutes = number;
export type ChatTokenAttributes = { [key: string]: string | undefined };
export interface CreateChatTokenRequest {
  roomIdentifier: string;
  userId: string | redacted.Redacted<string>;
  capabilities?: string[];
  sessionDurationInMinutes?: number;
  attributes?: { [key: string]: string | undefined };
}
export type ChatToken = string | redacted.Redacted<string>;
export interface CreateChatTokenResponse {
  token?: string | redacted.Redacted<string>;
  tokenExpirationTime?: Date;
  sessionExpirationTime?: Date;
}
export type LoggingConfigurationName = string;
export type BucketName = string;
export interface S3DestinationConfiguration {
  bucketName: string;
}
export type LogGroupName = string;
export interface CloudWatchLogsDestinationConfiguration {
  logGroupName: string;
}
export type DeliveryStreamName = string;
export interface FirehoseDestinationConfiguration {
  deliveryStreamName: string;
}
export type DestinationConfiguration =
  | { s3: S3DestinationConfiguration; cloudWatchLogs?: never; firehose?: never }
  | {
      s3?: never;
      cloudWatchLogs: CloudWatchLogsDestinationConfiguration;
      firehose?: never;
    }
  | {
      s3?: never;
      cloudWatchLogs?: never;
      firehose: FirehoseDestinationConfiguration;
    };
export type TagKey = string;
export type TagValue = string;
export type Tags = { [key: string]: string | undefined };
export interface CreateLoggingConfigurationRequest {
  name?: string;
  destinationConfiguration: DestinationConfiguration;
  tags?: { [key: string]: string | undefined };
}
export type LoggingConfigurationArn = string;
export type LoggingConfigurationID = string;
export type CreateLoggingConfigurationState = string;
export interface CreateLoggingConfigurationResponse {
  arn?: string;
  id?: string;
  createTime?: Date;
  updateTime?: Date;
  name?: string;
  destinationConfiguration?: DestinationConfiguration;
  state?: string;
  tags?: { [key: string]: string | undefined };
}
export type RoomName = string;
export type RoomMaxMessageRatePerSecond = number;
export type RoomMaxMessageLength = number;
export type LambdaArn = string;
export type FallbackResult = string;
export interface MessageReviewHandler {
  uri?: string;
  fallbackResult?: string;
}
export type LoggingConfigurationIdentifier = string;
export type LoggingConfigurationIdentifierList = string[];
export interface CreateRoomRequest {
  name?: string;
  maximumMessageRatePerSecond?: number;
  maximumMessageLength?: number;
  messageReviewHandler?: MessageReviewHandler;
  tags?: { [key: string]: string | undefined };
  loggingConfigurationIdentifiers?: string[];
}
export type RoomArn = string;
export type RoomID = string;
export interface CreateRoomResponse {
  arn?: string;
  id?: string;
  name?: string;
  createTime?: Date;
  updateTime?: Date;
  maximumMessageRatePerSecond?: number;
  maximumMessageLength?: number;
  messageReviewHandler?: MessageReviewHandler;
  tags?: { [key: string]: string | undefined };
  loggingConfigurationIdentifiers?: string[];
}
export interface DeleteLoggingConfigurationRequest {
  identifier: string;
}
export interface DeleteLoggingConfigurationResponse {}
export type MessageID = string;
export type Reason = string;
export interface DeleteMessageRequest {
  roomIdentifier: string;
  id: string;
  reason?: string;
}
export type ID = string;
export interface DeleteMessageResponse {
  id?: string;
}
export interface DeleteRoomRequest {
  identifier: string;
}
export interface DeleteRoomResponse {}
export interface DisconnectUserRequest {
  roomIdentifier: string;
  userId: string | redacted.Redacted<string>;
  reason?: string;
}
export interface DisconnectUserResponse {}
export interface GetLoggingConfigurationRequest {
  identifier: string;
}
export type LoggingConfigurationState = string;
export interface GetLoggingConfigurationResponse {
  arn?: string;
  id?: string;
  createTime?: Date;
  updateTime?: Date;
  name?: string;
  destinationConfiguration?: DestinationConfiguration;
  state?: string;
  tags?: { [key: string]: string | undefined };
}
export interface GetRoomRequest {
  identifier: string;
}
export interface GetRoomResponse {
  arn?: string;
  id?: string;
  name?: string;
  createTime?: Date;
  updateTime?: Date;
  maximumMessageRatePerSecond?: number;
  maximumMessageLength?: number;
  messageReviewHandler?: MessageReviewHandler;
  tags?: { [key: string]: string | undefined };
  loggingConfigurationIdentifiers?: string[];
}
export type PaginationToken = string;
export type MaxLoggingConfigurationResults = number;
export interface ListLoggingConfigurationsRequest {
  nextToken?: string;
  maxResults?: number;
}
export interface LoggingConfigurationSummary {
  arn?: string;
  id?: string;
  createTime?: Date;
  updateTime?: Date;
  name?: string;
  destinationConfiguration?: DestinationConfiguration;
  state?: string;
  tags?: { [key: string]: string | undefined };
}
export type LoggingConfigurationList = LoggingConfigurationSummary[];
export interface ListLoggingConfigurationsResponse {
  loggingConfigurations: LoggingConfigurationSummary[];
  nextToken?: string;
}
export type MaxRoomResults = number;
export interface ListRoomsRequest {
  name?: string;
  nextToken?: string;
  maxResults?: number;
  messageReviewHandlerUri?: string;
  loggingConfigurationIdentifier?: string;
}
export interface RoomSummary {
  arn?: string;
  id?: string;
  name?: string;
  messageReviewHandler?: MessageReviewHandler;
  createTime?: Date;
  updateTime?: Date;
  tags?: { [key: string]: string | undefined };
  loggingConfigurationIdentifiers?: string[];
}
export type RoomList = RoomSummary[];
export interface ListRoomsResponse {
  rooms: RoomSummary[];
  nextToken?: string;
}
export type ResourceArn = string;
export interface ListTagsForResourceRequest {
  resourceArn: string;
}
export interface ListTagsForResourceResponse {
  tags: { [key: string]: string | undefined };
}
export type EventName = string;
export type EventAttributes = { [key: string]: string | undefined };
export interface SendEventRequest {
  roomIdentifier: string;
  eventName: string;
  attributes?: { [key: string]: string | undefined };
}
export interface SendEventResponse {
  id?: string;
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
export interface UpdateLoggingConfigurationRequest {
  identifier: string;
  name?: string;
  destinationConfiguration?: DestinationConfiguration;
}
export type UpdateLoggingConfigurationState = string;
export interface UpdateLoggingConfigurationResponse {
  arn?: string;
  id?: string;
  createTime?: Date;
  updateTime?: Date;
  name?: string;
  destinationConfiguration?: DestinationConfiguration;
  state?: string;
  tags?: { [key: string]: string | undefined };
}
export interface UpdateRoomRequest {
  identifier: string;
  name?: string;
  maximumMessageRatePerSecond?: number;
  maximumMessageLength?: number;
  messageReviewHandler?: MessageReviewHandler;
  loggingConfigurationIdentifiers?: string[];
}
export interface UpdateRoomResponse {
  arn?: string;
  id?: string;
  name?: string;
  createTime?: Date;
  updateTime?: Date;
  maximumMessageRatePerSecond?: number;
  maximumMessageLength?: number;
  messageReviewHandler?: MessageReviewHandler;
  tags?: { [key: string]: string | undefined };
  loggingConfigurationIdentifiers?: string[];
}
export type ErrorMessage = string;
export type ResourceId = string;
export type ResourceType = string;
export type ValidationExceptionReason = string;
export type FieldName = string;
export interface ValidationExceptionField {
  name: string;
  message: string;
}
export type ValidationExceptionFieldList = ValidationExceptionField[];
export type Limit = number;
export type CreateChatTokenError =
  | AccessDeniedException
  | PendingVerification
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Creates an encrypted token that is used by a chat participant to establish an individual
 * WebSocket chat connection to a room. When the token is used to connect to chat, the
 * connection is valid for the session duration specified in the request. The token becomes
 * invalid at the token-expiration timestamp included in the response.
 *
 * Use the `capabilities` field to permit an end user to send messages or
 * moderate a room.
 *
 * The `attributes` field securely attaches structured data to the chat session; the data is
 * included within each message sent by the end user and received by other participants in the
 * room. Common use cases for attributes include passing end-user profile data like an icon,
 * display name, colors, badges, and other display features.
 *
 * Encryption keys are owned by Amazon IVS Chat and never used directly by your
 * application.
 */
export const createChatToken: API.OperationMethod<
  CreateChatTokenRequest,
  CreateChatTokenResponse,
  CreateChatTokenError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /CreateChatToken",
    input: {
      roomIdentifier: 0,
      userId: 0,
      capabilities: 0,
      sessionDurationInMinutes: 0,
      attributes: 0,
    },
    output: {
      token: D.secret,
      tokenExpirationTime: D.ts,
      sessionExpirationTime: D.ts,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    PendingVerification,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateChatToken",
})) as any;

export type CreateLoggingConfigurationError =
  | AccessDeniedException
  | ConflictException
  | PendingVerification
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates a logging configuration that allows clients to store and record sent
 * messages.
 */
export const createLoggingConfiguration: API.OperationMethod<
  CreateLoggingConfigurationRequest,
  CreateLoggingConfigurationResponse,
  CreateLoggingConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /CreateLoggingConfiguration",
    input: {
      name: 0,
      destinationConfiguration: i_DestinationConfiguration,
      tags: 0,
    },
    output: { createTime: D.ts, updateTime: D.ts },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    PendingVerification,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateLoggingConfiguration",
})) as any;

export type CreateRoomError =
  | AccessDeniedException
  | ConflictException
  | PendingVerification
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates a room that allows clients to connect and pass messages.
 */
export const createRoom: API.OperationMethod<
  CreateRoomRequest,
  CreateRoomResponse,
  CreateRoomError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /CreateRoom",
    input: {
      name: 0,
      maximumMessageRatePerSecond: 0,
      maximumMessageLength: 0,
      messageReviewHandler: i_MessageReviewHandler,
      tags: 0,
      loggingConfigurationIdentifiers: 0,
    },
    output: { createTime: D.ts, updateTime: D.ts },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    PendingVerification,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateRoom",
})) as any;

export type DeleteLoggingConfigurationError =
  | AccessDeniedException
  | ConflictException
  | PendingVerification
  | ResourceNotFoundException
  | ValidationException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes the specified logging configuration.
 */
export const deleteLoggingConfiguration: API.OperationMethod<
  DeleteLoggingConfigurationRequest,
  DeleteLoggingConfigurationResponse,
  DeleteLoggingConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /DeleteLoggingConfiguration",
    input: { identifier: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    PendingVerification,
    ResourceNotFoundException,
    ValidationException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteLoggingConfiguration",
})) as any;

export type DeleteMessageError =
  | AccessDeniedException
  | PendingVerification
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Sends an event to a specific room which directs clients to delete a specific message;
 * that is, unrender it from view and delete it from the client’s chat history. This event’s
 * `EventName` is `aws:DELETE_MESSAGE`. This replicates the
 * DeleteMessage WebSocket operation in the Amazon IVS Chat Messaging API.
 */
export const deleteMessage: API.OperationMethod<
  DeleteMessageRequest,
  DeleteMessageResponse,
  DeleteMessageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /DeleteMessage",
    input: { roomIdentifier: 0, id: 0, reason: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    PendingVerification,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteMessage",
})) as any;

export type DeleteRoomError =
  | AccessDeniedException
  | PendingVerification
  | ResourceNotFoundException
  | ValidationException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes the specified room.
 */
export const deleteRoom: API.OperationMethod<
  DeleteRoomRequest,
  DeleteRoomResponse,
  DeleteRoomError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /DeleteRoom",
    input: { identifier: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    PendingVerification,
    ResourceNotFoundException,
    ValidationException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRoom",
})) as any;

export type DisconnectUserError =
  | AccessDeniedException
  | PendingVerification
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Disconnects all connections using a specified user ID from a room. This replicates the
 *
 * DisconnectUser WebSocket operation in the Amazon IVS Chat Messaging API.
 */
export const disconnectUser: API.OperationMethod<
  DisconnectUserRequest,
  DisconnectUserResponse,
  DisconnectUserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /DisconnectUser",
    input: { roomIdentifier: 0, userId: 0, reason: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    PendingVerification,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisconnectUser",
})) as any;

export type GetLoggingConfigurationError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ValidationException
  | ThrottlingException
  | CommonErrors;
/**
 * Gets the specified logging configuration.
 */
export const getLoggingConfiguration: API.OperationMethod<
  GetLoggingConfigurationRequest,
  GetLoggingConfigurationResponse,
  GetLoggingConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /GetLoggingConfiguration",
    input: { identifier: 0 },
    output: { createTime: D.ts, updateTime: D.ts },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ValidationException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetLoggingConfiguration",
})) as any;

export type GetRoomError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ValidationException
  | ThrottlingException
  | CommonErrors;
/**
 * Gets the specified room.
 */
export const getRoom: API.OperationMethod<
  GetRoomRequest,
  GetRoomResponse,
  GetRoomError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /GetRoom",
    input: { identifier: 0 },
    output: { createTime: D.ts, updateTime: D.ts },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ValidationException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRoom",
})) as any;

export type ListLoggingConfigurationsError =
  | AccessDeniedException
  | ValidationException
  | ThrottlingException
  | CommonErrors;
/**
 * Gets summary information about all your logging configurations in the AWS region where
 * the API request is processed.
 */
export const listLoggingConfigurations: API.PaginatedOperationMethod<
  ListLoggingConfigurationsRequest,
  ListLoggingConfigurationsResponse,
  ListLoggingConfigurationsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /ListLoggingConfigurations",
    input: { nextToken: 0, maxResults: 0 },
    output: {
      loggingConfigurations: D.list({ createTime: D.ts, updateTime: D.ts }),
    },
    body: true,
  },
  errors: [AccessDeniedException, ValidationException, ThrottlingException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListLoggingConfigurations",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListRoomsError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ValidationException
  | ThrottlingException
  | CommonErrors;
/**
 * Gets summary information about all your rooms in the AWS region where the API request is
 * processed. Results are sorted in descending order of `updateTime`.
 */
export const listRooms: API.PaginatedOperationMethod<
  ListRoomsRequest,
  ListRoomsResponse,
  ListRoomsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /ListRooms",
    input: {
      name: 0,
      nextToken: 0,
      maxResults: 0,
      messageReviewHandlerUri: 0,
      loggingConfigurationIdentifier: 0,
    },
    output: { rooms: D.list({ createTime: D.ts, updateTime: D.ts }) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ValidationException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRooms",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | ThrottlingException
  | CommonErrors;
/**
 * Gets information about AWS tags for the specified ARN.
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
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

export type SendEventError =
  | AccessDeniedException
  | PendingVerification
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Sends an event to a room. Use this within your application’s business logic to send
 * events to clients of a room; e.g., to notify clients to change the way the chat UI is
 * rendered.
 */
export const sendEvent: API.OperationMethod<
  SendEventRequest,
  SendEventResponse,
  SendEventError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /SendEvent",
    input: { roomIdentifier: 0, eventName: 0, attributes: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    PendingVerification,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SendEvent",
})) as any;

export type TagResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | ThrottlingException
  | CommonErrors;
/**
 * Adds or updates tags for the AWS resource with the specified ARN.
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
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

export type UntagResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | ThrottlingException
  | CommonErrors;
/**
 * Removes tags from the resource with the specified ARN.
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
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

export type UpdateLoggingConfigurationError =
  | AccessDeniedException
  | ConflictException
  | PendingVerification
  | ResourceNotFoundException
  | ValidationException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates a specified logging configuration.
 */
export const updateLoggingConfiguration: API.OperationMethod<
  UpdateLoggingConfigurationRequest,
  UpdateLoggingConfigurationResponse,
  UpdateLoggingConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /UpdateLoggingConfiguration",
    input: {
      identifier: 0,
      name: 0,
      destinationConfiguration: i_DestinationConfiguration,
    },
    output: { createTime: D.ts, updateTime: D.ts },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    PendingVerification,
    ResourceNotFoundException,
    ValidationException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateLoggingConfiguration",
})) as any;

export type UpdateRoomError =
  | AccessDeniedException
  | PendingVerification
  | ResourceNotFoundException
  | ValidationException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates a room’s configuration.
 */
export const updateRoom: API.OperationMethod<
  UpdateRoomRequest,
  UpdateRoomResponse,
  UpdateRoomError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /UpdateRoom",
    input: {
      identifier: 0,
      name: 0,
      maximumMessageRatePerSecond: 0,
      maximumMessageLength: 0,
      messageReviewHandler: i_MessageReviewHandler,
      loggingConfigurationIdentifiers: 0,
    },
    output: { createTime: D.ts, updateTime: D.ts },
    body: true,
  },
  errors: [
    AccessDeniedException,
    PendingVerification,
    ResourceNotFoundException,
    ValidationException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateRoom",
})) as any;

const i_DestinationConfiguration: D.LazyStruct = () => ({
  s3: { bucketName: 0 },
  cloudWatchLogs: { logGroupName: 0 },
  firehose: { deliveryStreamName: 0 },
});
const i_MessageReviewHandler: D.LazyStruct = () => ({
  uri: 0,
  fallbackResult: 0,
});
