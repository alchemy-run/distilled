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
  sdkId: "ConnectParticipant",
  target: "AmazonConnectParticipantServiceLambda",
  version: "2018-09-07",
  sigv4: "execute-api",
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
                `https://participant.connect-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              if (_.getAttr(PartitionResult, "name") === "aws-us-gov") {
                return e(`https://participant.connect.${Region}.amazonaws.com`);
              }
              return e(
                `https://participant.connect-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://participant.connect.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://participant.connect.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
  })<{ readonly message: string }> {}
export class InternalServerException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerException",
    ["ServerError"],
    { status: 500 },
  )<{ readonly message: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{
    readonly message?: string;
    readonly ResourceId?: string;
    readonly ResourceType?: ResourceType;
  }> {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceQuotaExceededException",
    ["QuotaError"],
    { status: 402 },
  )<{ readonly message: string }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["ThrottlingError"],
    { status: 429 },
  )<{ readonly message: string }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message: string }> {}
export type SessionId = string;
export type ParticipantToken = string;
export interface CancelParticipantAuthenticationRequest {
  SessionId: string;
  ConnectionToken: string;
}
export interface CancelParticipantAuthenticationResponse {}
export type ArtifactId = string;
export type AttachmentIdList = string[];
export type NonEmptyClientToken = string;
export interface CompleteAttachmentUploadRequest {
  AttachmentIds: string[];
  ClientToken: string;
  ConnectionToken: string;
}
export interface CompleteAttachmentUploadResponse {}
export type ConnectionType =
  | "WEBSOCKET"
  | "CONNECTION_CREDENTIALS"
  | "WEBRTC_CONNECTION"
  | (string & {});
export type ConnectionTypeList = ConnectionType[];
export interface CreateParticipantConnectionRequest {
  Type?: ConnectionType[];
  ParticipantToken: string;
  ConnectParticipant?: boolean;
}
export type PreSignedConnectionUrl = string;
export type ISO8601Datetime = string;
export interface Websocket {
  Url?: string;
  ConnectionExpiry?: string;
}
export interface ConnectionCredentials {
  ConnectionToken?: string;
  Expiry?: string;
}
export type AttendeeId = string;
export type JoinToken = string | redacted.Redacted<string>;
export interface Attendee {
  AttendeeId?: string;
  JoinToken?: string | redacted.Redacted<string>;
}
export type URI = string;
export interface WebRTCMediaPlacement {
  AudioHostUrl?: string;
  AudioFallbackUrl?: string;
  SignalingUrl?: string;
  EventIngestionUrl?: string;
}
export type MeetingFeatureStatus = "AVAILABLE" | "UNAVAILABLE" | (string & {});
export interface AudioFeatures {
  EchoReduction?: MeetingFeatureStatus;
}
export interface MeetingFeaturesConfiguration {
  Audio?: AudioFeatures;
}
export type GuidString = string;
export interface WebRTCMeeting {
  MediaPlacement?: WebRTCMediaPlacement;
  MeetingFeatures?: MeetingFeaturesConfiguration;
  MeetingId?: string;
}
export interface WebRTCConnection {
  Attendee?: Attendee;
  Meeting?: WebRTCMeeting;
}
export interface CreateParticipantConnectionResponse {
  Websocket?: Websocket;
  ConnectionCredentials?: ConnectionCredentials;
  WebRTCConnection?: WebRTCConnection;
}
export type ViewToken = string;
export interface DescribeViewRequest {
  ViewToken: string;
  ConnectionToken: string;
}
export type ViewId = string;
export type ARN = string;
export type ViewName = string | redacted.Redacted<string>;
export type ViewVersion = number;
export type ViewInputSchema = string | redacted.Redacted<string>;
export type ViewTemplate = string | redacted.Redacted<string>;
export type ViewAction = string | redacted.Redacted<string>;
export type ViewActions = (string | redacted.Redacted<string>)[];
export interface ViewContent {
  InputSchema?: string | redacted.Redacted<string>;
  Template?: string | redacted.Redacted<string>;
  Actions?: (string | redacted.Redacted<string>)[];
}
export interface View {
  Id?: string;
  Arn?: string;
  Name?: string | redacted.Redacted<string>;
  Version?: number;
  Content?: ViewContent;
}
export interface DescribeViewResponse {
  View?: View;
}
export type ClientToken = string;
export interface DisconnectParticipantRequest {
  ClientToken?: string;
  ConnectionToken: string;
}
export interface DisconnectParticipantResponse {}
export type URLExpiryInSeconds = number;
export interface GetAttachmentRequest {
  AttachmentId: string;
  ConnectionToken: string;
  UrlExpiryInSeconds?: number;
}
export type PreSignedAttachmentUrl = string;
export type AttachmentSizeInBytes = number;
export interface GetAttachmentResponse {
  Url?: string;
  UrlExpiry?: string;
  AttachmentSizeInBytes: number;
}
export type RedirectURI = string;
export interface GetAuthenticationUrlRequest {
  SessionId: string;
  RedirectUri: string;
  ConnectionToken: string;
}
export type AuthenticationUrl = string;
export interface GetAuthenticationUrlResponse {
  AuthenticationUrl?: string;
}
export type ContactId = string;
export type MaxResults = number;
export type NextToken = string;
export type ScanDirection = "FORWARD" | "BACKWARD" | (string & {});
export type SortKey = "DESCENDING" | "ASCENDING" | (string & {});
export type ChatItemId = string;
export type Instant = string;
export type MostRecent = number;
export interface StartPosition {
  Id?: string;
  AbsoluteTime?: string;
  MostRecent?: number;
}
export interface GetTranscriptRequest {
  ContactId?: string;
  MaxResults?: number;
  NextToken?: string;
  ScanDirection?: ScanDirection;
  SortOrder?: SortKey;
  StartPosition?: StartPosition;
  ConnectionToken: string;
}
export type ChatContent = string;
export type ChatContentType = string;
export type ChatItemType =
  | "TYPING"
  | "PARTICIPANT_JOINED"
  | "PARTICIPANT_LEFT"
  | "CHAT_ENDED"
  | "TRANSFER_SUCCEEDED"
  | "TRANSFER_FAILED"
  | "MESSAGE"
  | "EVENT"
  | "ATTACHMENT"
  | "CONNECTION_ACK"
  | "MESSAGE_DELIVERED"
  | "MESSAGE_READ"
  | (string & {});
export type ParticipantId = string;
export type DisplayName = string;
export type ParticipantRole =
  | "AGENT"
  | "CUSTOMER"
  | "SYSTEM"
  | "CUSTOM_BOT"
  | "SUPERVISOR"
  | (string & {});
export type ContentType = string;
export type AttachmentName = string;
export type ArtifactStatus =
  | "APPROVED"
  | "REJECTED"
  | "IN_PROGRESS"
  | (string & {});
export interface AttachmentItem {
  ContentType?: string;
  AttachmentId?: string;
  AttachmentName?: string;
  Status?: ArtifactStatus;
}
export type Attachments = AttachmentItem[];
export interface Receipt {
  DeliveredTimestamp?: string;
  ReadTimestamp?: string;
  RecipientParticipantId?: string;
}
export type Receipts = Receipt[];
export type MessageProcessingStatus =
  | "PROCESSING"
  | "FAILED"
  | "REJECTED"
  | (string & {});
export interface MessageMetadata {
  MessageId?: string;
  Receipts?: Receipt[];
  MessageProcessingStatus?: MessageProcessingStatus;
}
export interface Item {
  AbsoluteTime?: string;
  Content?: string;
  ContentType?: string;
  Id?: string;
  Type?: ChatItemType;
  ParticipantId?: string;
  DisplayName?: string;
  ParticipantRole?: ParticipantRole;
  Attachments?: AttachmentItem[];
  MessageMetadata?: MessageMetadata;
  RelatedContactId?: string;
  ContactId?: string;
}
export type Transcript = Item[];
export interface GetTranscriptResponse {
  InitialContactId?: string;
  Transcript?: Item[];
  NextToken?: string;
}
export interface SendEventRequest {
  ContentType: string;
  Content?: string;
  ClientToken?: string;
  ConnectionToken: string;
}
export interface SendEventResponse {
  Id?: string;
  AbsoluteTime?: string;
}
export interface SendMessageRequest {
  ContentType: string;
  Content: string;
  ClientToken?: string;
  ConnectionToken: string;
}
export interface MessageProcessingMetadata {
  MessageProcessingStatus?: MessageProcessingStatus;
}
export interface SendMessageResponse {
  Id?: string;
  AbsoluteTime?: string;
  MessageMetadata?: MessageProcessingMetadata;
}
export interface StartAttachmentUploadRequest {
  ContentType: string;
  AttachmentSizeInBytes: number;
  AttachmentName: string;
  ClientToken: string;
  ConnectionToken: string;
}
export type UploadMetadataUrl = string;
export type UploadMetadataSignedHeadersKey = string;
export type UploadMetadataSignedHeadersValue = string;
export type UploadMetadataSignedHeaders = { [key: string]: string | undefined };
export interface UploadMetadata {
  Url?: string;
  UrlExpiry?: string;
  HeadersToInclude?: { [key: string]: string | undefined };
}
export interface StartAttachmentUploadResponse {
  AttachmentId?: string;
  UploadMetadata?: UploadMetadata;
}
export type Message = string;
export type Reason = string;
export type ResourceId = string;
export type ResourceType =
  | "CONTACT"
  | "CONTACT_FLOW"
  | "INSTANCE"
  | "PARTICIPANT"
  | "HIERARCHY_LEVEL"
  | "HIERARCHY_GROUP"
  | "USER"
  | "PHONE_NUMBER"
  | (string & {});
export type CancelParticipantAuthenticationError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Cancels the authentication session. The opted out branch of the Authenticate Customer
 * flow block will be taken.
 *
 * The current supported channel is chat. This API is not supported for Apple
 * Messages for Business, WhatsApp, or SMS chats.
 *
 * `ConnectionToken` is used for invoking this API instead of
 * `ParticipantToken`.
 *
 * The Amazon Connect Participant Service APIs do not use Signature Version 4
 * authentication.
 */
export const cancelParticipantAuthentication: API.OperationMethod<
  CancelParticipantAuthenticationRequest,
  CancelParticipantAuthenticationResponse,
  CancelParticipantAuthenticationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /participant/cancel-authentication",
    input: { SessionId: 0, ConnectionToken: D.m({ header: "X-Amz-Bearer" }) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelParticipantAuthentication",
})) as any;

export type CompleteAttachmentUploadError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Allows you to confirm that the attachment has been uploaded using the pre-signed URL
 * provided in StartAttachmentUpload API. A conflict exception is thrown when an attachment
 * with that identifier is already being uploaded.
 *
 * For security recommendations, see Connect Customer Chat security best practices.
 *
 * `ConnectionToken` is used for invoking this API instead of
 * `ParticipantToken`.
 *
 * The Amazon Connect Participant Service APIs do not use Signature Version 4
 * authentication.
 */
export const completeAttachmentUpload: API.OperationMethod<
  CompleteAttachmentUploadRequest,
  CompleteAttachmentUploadResponse,
  CompleteAttachmentUploadError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /participant/complete-attachment-upload",
    input: {
      AttachmentIds: 0,
      ClientToken: D.m({ idempotency: true }),
      ConnectionToken: D.m({ header: "X-Amz-Bearer" }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CompleteAttachmentUpload",
})) as any;

export type CreateParticipantConnectionError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates the participant's connection.
 *
 * For security recommendations, see Connect Customer Chat security best practices.
 *
 * For WebRTC security recommendations, see Connect Customer WebRTC security best practices.
 *
 * `ParticipantToken` is used for invoking this API instead of
 * `ConnectionToken`.
 *
 * The participant token is valid for the lifetime of the participant – until they are
 * part of a contact. For WebRTC participants, if they leave or are disconnected for 60
 * seconds, a new participant needs to be created using the CreateParticipant API.
 *
 * **For `WEBSOCKET` Type**:
 *
 * The response URL for has a connect expiry timeout of 100s. Clients must manually
 * connect to the returned websocket URL and subscribe to the desired topic.
 *
 * For chat, you need to publish the following on the established websocket
 * connection:
 *
 * `{"topic":"aws/subscribe","content":{"topics":["aws/chat"]}}`
 *
 * Upon websocket URL expiry, as specified in the response ConnectionExpiry parameter,
 * clients need to call this API again to obtain a new websocket URL and perform the same
 * steps as before.
 *
 * The expiry time for the connection token is different than the
 * `ChatDurationInMinutes`. Expiry time for the connection token is 1
 * day.
 *
 * **For `WEBRTC_CONNECTION` Type**:
 *
 * The response includes connection data required for the client application to join the
 * call using the Amazon Chime SDK client libraries. The WebRTCConnection response contains
 * Meeting and Attendee information needed to establish the media connection.
 *
 * The attendee join token in WebRTCConnection response is valid for the lifetime of the
 * participant in the call. If a participant leaves or is disconnected for 60 seconds,
 * their participant credentials will no longer be valid, and a new participant will need
 * to be created to rejoin the call.
 *
 * **Message streaming support**: This API can also be used
 * together with the StartContactStreaming API to create a participant connection for chat
 * contacts that are not using a websocket. For more information about message streaming,
 * Enable real-time chat
 * message streaming in the Amazon Connect Administrator
 * Guide.
 *
 * **Multi-user web, in-app, video calling support**:
 *
 * For WebRTC calls, this API is used in conjunction with the CreateParticipant API to
 * enable multi-party calling. The StartWebRTCContact API creates the initial contact and
 * routes it to an agent, while CreateParticipant adds additional participants to the
 * ongoing call. For more information about multi-party WebRTC calls, see Enable multi-user web, in-app, and video calling in the Amazon Connect
 * Administrator Guide.
 *
 * **Feature specifications**: For information about feature
 * specifications, such as the allowed number of open websocket connections per participant
 * or maximum number of WebRTC participants, see Feature specifications in the Amazon Connect Administrator
 * Guide.
 *
 * The Amazon Connect Participant Service APIs do not use Signature Version 4
 * authentication.
 */
export const createParticipantConnection: API.OperationMethod<
  CreateParticipantConnectionRequest,
  CreateParticipantConnectionResponse,
  CreateParticipantConnectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /participant/connection",
    input: {
      Type: 0,
      ParticipantToken: D.m({ header: "X-Amz-Bearer" }),
      ConnectParticipant: 0,
    },
    output: { WebRTCConnection: { Attendee: { JoinToken: D.secret } } },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateParticipantConnection",
})) as any;

export type DescribeViewError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the view for the specified view token.
 *
 * For security recommendations, see Connect Customer Chat security best practices.
 */
export const describeView: API.OperationMethod<
  DescribeViewRequest,
  DescribeViewResponse,
  DescribeViewError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /participant/views/{ViewToken}",
    input: { ViewToken: 0, ConnectionToken: D.m({ header: "X-Amz-Bearer" }) },
    output: {
      View: {
        Name: D.secret,
        Content: {
          InputSchema: D.secret,
          Template: D.secret,
          Actions: D.list(D.secret),
        },
      },
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
  operationName: "DescribeView",
})) as any;

export type DisconnectParticipantError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Disconnects a participant.
 *
 * For security recommendations, see Connect Customer Chat security best practices.
 *
 * `ConnectionToken` is used for invoking this API instead of
 * `ParticipantToken`.
 *
 * The Amazon Connect Participant Service APIs do not use Signature Version 4
 * authentication.
 */
export const disconnectParticipant: API.OperationMethod<
  DisconnectParticipantRequest,
  DisconnectParticipantResponse,
  DisconnectParticipantError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /participant/disconnect",
    input: {
      ClientToken: D.m({ idempotency: true }),
      ConnectionToken: D.m({ header: "X-Amz-Bearer" }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisconnectParticipant",
})) as any;

export type GetAttachmentError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Provides a pre-signed URL for download of a completed attachment. This is an
 * asynchronous API for use with active contacts.
 *
 * For security recommendations, see Connect Customer Chat security best practices.
 *
 * - The participant role `CUSTOM_BOT` is not permitted to access
 * attachments customers may upload. An `AccessDeniedException` can
 * indicate that the participant may be a CUSTOM_BOT, and it doesn't have
 * access to attachments.
 *
 * - `ConnectionToken` is used for invoking this API instead of
 * `ParticipantToken`.
 *
 * The Amazon Connect Participant Service APIs do not use Signature Version 4
 * authentication.
 */
export const getAttachment: API.OperationMethod<
  GetAttachmentRequest,
  GetAttachmentResponse,
  GetAttachmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /participant/attachment",
    input: {
      AttachmentId: 0,
      ConnectionToken: D.m({ header: "X-Amz-Bearer" }),
      UrlExpiryInSeconds: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAttachment",
})) as any;

export type GetAuthenticationUrlError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the AuthenticationUrl for the current authentication session for the
 * AuthenticateCustomer flow block.
 *
 * For security recommendations, see Connect Customer Chat security best practices.
 *
 * - This API can only be called within one minute of receiving the
 * authenticationInitiated event.
 *
 * - The current supported channel is chat. This API is not supported for Apple
 * Messages for Business, WhatsApp, or SMS chats.
 *
 * `ConnectionToken` is used for invoking this API instead of
 * `ParticipantToken`.
 *
 * The Amazon Connect Participant Service APIs do not use Signature Version 4
 * authentication.
 */
export const getAuthenticationUrl: API.OperationMethod<
  GetAuthenticationUrlRequest,
  GetAuthenticationUrlResponse,
  GetAuthenticationUrlError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /participant/authentication-url",
    input: {
      SessionId: 0,
      RedirectUri: 0,
      ConnectionToken: D.m({ header: "X-Amz-Bearer" }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAuthenticationUrl",
})) as any;

export type GetTranscriptError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a transcript of the session, including details about any attachments. For
 * information about accessing past chat contact transcripts for a persistent chat, see
 * Enable persistent chat.
 *
 * For security recommendations, see Connect Customer Chat security best practices.
 *
 * If you have a process that consumes events in the transcript of an chat that has
 * ended, note that chat transcripts contain the following event content types if the event
 * has occurred during the chat session:
 *
 * - `application/vnd.amazonaws.connect.event.participant.invited`
 *
 * - `application/vnd.amazonaws.connect.event.participant.joined`
 *
 * - `application/vnd.amazonaws.connect.event.participant.left`
 *
 * - `application/vnd.amazonaws.connect.event.chat.ended`
 *
 * - `application/vnd.amazonaws.connect.event.transfer.succeeded`
 *
 * - `application/vnd.amazonaws.connect.event.transfer.failed`
 *
 * `ConnectionToken` is used for invoking this API instead of
 * `ParticipantToken`.
 *
 * The Amazon Connect Participant Service APIs do not use Signature Version 4
 * authentication.
 */
export const getTranscript: API.PaginatedOperationMethod<
  GetTranscriptRequest,
  GetTranscriptResponse,
  GetTranscriptError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /participant/transcript",
    input: {
      ContactId: 0,
      MaxResults: 0,
      NextToken: 0,
      ScanDirection: 0,
      SortOrder: 0,
      StartPosition: { Id: 0, AbsoluteTime: 0, MostRecent: 0 },
      ConnectionToken: D.m({ header: "X-Amz-Bearer" }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTranscript",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type SendEventError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * The `application/vnd.amazonaws.connect.event.connection.acknowledged`
 * ContentType is no longer maintained since December 31, 2024. This event has been
 * migrated to the CreateParticipantConnection API using the
 * `ConnectParticipant` field.
 *
 * Sends an event. Message receipts are not supported when there are more than two active
 * participants in the chat. Using the SendEvent API for message receipts when a supervisor
 * is barged-in will result in a conflict exception.
 *
 * For security recommendations, see Connect Customer Chat security best practices.
 *
 * `ConnectionToken` is used for invoking this API instead of
 * `ParticipantToken`.
 *
 * The Amazon Connect Participant Service APIs do not use Signature Version 4
 * authentication.
 */
export const sendEvent: API.OperationMethod<
  SendEventRequest,
  SendEventResponse,
  SendEventError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /participant/event",
    input: {
      ContentType: 0,
      Content: 0,
      ClientToken: D.m({ idempotency: true }),
      ConnectionToken: D.m({ header: "X-Amz-Bearer" }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SendEvent",
})) as any;

export type SendMessageError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Sends a message.
 *
 * For security recommendations, see Connect Customer Chat security best practices.
 *
 * `ConnectionToken` is used for invoking this API instead of
 * `ParticipantToken`.
 *
 * The Amazon Connect Participant Service APIs do not use Signature Version 4
 * authentication.
 */
export const sendMessage: API.OperationMethod<
  SendMessageRequest,
  SendMessageResponse,
  SendMessageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /participant/message",
    input: {
      ContentType: 0,
      Content: 0,
      ClientToken: D.m({ idempotency: true }),
      ConnectionToken: D.m({ header: "X-Amz-Bearer" }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SendMessage",
})) as any;

export type StartAttachmentUploadError =
  | AccessDeniedException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Provides a pre-signed Amazon S3 URL in response for uploading the file directly to
 * S3.
 *
 * For security recommendations, see Connect Customer Chat security best practices.
 *
 * `ConnectionToken` is used for invoking this API instead of
 * `ParticipantToken`.
 *
 * The Amazon Connect Participant Service APIs do not use Signature Version 4
 * authentication.
 */
export const startAttachmentUpload: API.OperationMethod<
  StartAttachmentUploadRequest,
  StartAttachmentUploadResponse,
  StartAttachmentUploadError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /participant/start-attachment-upload",
    input: {
      ContentType: 0,
      AttachmentSizeInBytes: 0,
      AttachmentName: 0,
      ClientToken: D.m({ idempotency: true }),
      ConnectionToken: D.m({ header: "X-Amz-Bearer" }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartAttachmentUpload",
})) as any;
