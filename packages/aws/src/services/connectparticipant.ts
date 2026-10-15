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
  sdkId: "ConnectParticipant",
  serviceShapeName: "AmazonConnectParticipantServiceLambda",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "execute-api" });
const ver = /*@__PURE__*/ T.ServiceVersion("2018-09-07");
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
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://participant.connect.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(
          `https://participant.connect.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://participant.connect.{R}.{D}","properties":{},"headers":{}}');

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      ResourceId: /*@__PURE__*/ S.optional(S.String),
      ResourceType: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => S.String).annotate({ identifier: "ResourceType" }),
      ),
    },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
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
export type ArtifactStatus = "APPROVED" | "REJECTED" | "IN_PROGRESS" | (string & {});
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
export type MessageProcessingStatus = "PROCESSING" | "FAILED" | "REJECTED" | (string & {});
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
  input: __S(128, __c8, 0) as any as S.Schema<CancelParticipantAuthenticationRequest>,
  output: __S(144, __c9, 0) as any as S.Schema<CancelParticipantAuthenticationResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelParticipantAuthentication",
}));

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
  input: __S(161, __c10, 1) as any as S.Schema<CompleteAttachmentUploadRequest>,
  output: __S(144, __c9, 0) as any as S.Schema<CompleteAttachmentUploadResponse>,
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
}));

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
 * The participant token is valid for the lifetime of the participant - until they are
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
  input: __S(177, __c11, 1) as any as S.Schema<CreateParticipantConnectionRequest>,
  output: __S(186, __c11, 10) as any as S.Schema<CreateParticipantConnectionResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateParticipantConnection",
}));

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
  input: __S(0, __c0, 0) as any as S.Schema<DescribeViewRequest>,
  output: __S(4, __c0, 4) as any as S.Schema<DescribeViewResponse>,
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
}));

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
  input: __S(16, __c1, 0) as any as S.Schema<DisconnectParticipantRequest>,
  output: __S(144, __c9, 0) as any as S.Schema<DisconnectParticipantResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisconnectParticipant",
}));

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
  input: __S(32, __c2, 0) as any as S.Schema<GetAttachmentRequest>,
  output: __S(33, __c2, 1) as any as S.Schema<GetAttachmentResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAttachment",
}));

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
  input: __S(48, __c3, 0) as any as S.Schema<GetAuthenticationUrlRequest>,
  output: __S(49, __c3, 1) as any as S.Schema<GetAuthenticationUrlResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAuthenticationUrl",
}));

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
  input: __S(65, __c4, 1) as any as S.Schema<GetTranscriptRequest>,
  output: __S(73, __c4, 9) as any as S.Schema<GetTranscriptResponse>,
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
  input: __S(80, __c5, 0) as any as S.Schema<SendEventRequest>,
  output: __S(81, __c5, 1) as any as S.Schema<SendEventResponse>,
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
}));

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
  input: __S(96, __c6, 0) as any as S.Schema<SendMessageRequest>,
  output: __S(98, __c6, 2) as any as S.Schema<SendMessageResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SendMessage",
}));

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
  input: __S(112, __c7, 0) as any as S.Schema<StartAttachmentUploadRequest>,
  output: __S(115, __c7, 3) as any as S.Schema<StartAttachmentUploadResponse>,
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
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ViewToken: S.String.pipe(T.HttpLabel("ViewToken")),
          ConnectionToken: S.String.pipe(T.HttpHeader("X-Amz-Bearer")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/participant/views/{ViewToken}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeViewRequest" });
    case 1:
      return S.Array(SensitiveString);
    case 2:
      return S.suspend(() =>
        S.Struct({
          InputSchema: S.optional(SensitiveString),
          Template: S.optional(SensitiveString),
          Actions: S.optional(__S(1, __c0, 1)),
        }),
      ).annotate({ identifier: "ViewContent" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          Arn: S.optional(S.String),
          Name: S.optional(SensitiveString),
          Version: S.optional(S.Number),
          Content: S.optional(__S(2, __c0, 2)),
        }),
      ).annotate({ identifier: "View" });
    case 4:
      return S.suspend(() => S.Struct({ View: S.optional(__S(3, __c0, 3)) })).annotate({
        identifier: "DescribeViewResponse",
      });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          ConnectionToken: S.String.pipe(T.HttpHeader("X-Amz-Bearer")),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/participant/disconnect" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DisconnectParticipantRequest" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AttachmentId: S.String,
          ConnectionToken: S.String.pipe(T.HttpHeader("X-Amz-Bearer")),
          UrlExpiryInSeconds: S.optional(S.Number),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/participant/attachment" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetAttachmentRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Url: S.optional(S.String),
          UrlExpiry: S.optional(S.String),
          AttachmentSizeInBytes: S.Number,
        }),
      ).annotate({ identifier: "GetAttachmentResponse" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SessionId: S.String,
          RedirectUri: S.String,
          ConnectionToken: S.String.pipe(T.HttpHeader("X-Amz-Bearer")),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/participant/authentication-url" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetAuthenticationUrlRequest" });
    case 1:
      return S.suspend(() => S.Struct({ AuthenticationUrl: S.optional(S.String) })).annotate({
        identifier: "GetAuthenticationUrlResponse",
      });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          AbsoluteTime: S.optional(S.String),
          MostRecent: S.optional(S.Number),
        }),
      ).annotate({ identifier: "StartPosition" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ContactId: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
          ScanDirection: S.optional(S.String),
          SortOrder: S.optional(S.String),
          StartPosition: S.optional(__S(64, __c4, 0)),
          ConnectionToken: S.String.pipe(T.HttpHeader("X-Amz-Bearer")),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/participant/transcript" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetTranscriptRequest" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          ContentType: S.optional(S.String),
          AttachmentId: S.optional(S.String),
          AttachmentName: S.optional(S.String),
          Status: S.optional(S.String),
        }),
      ).annotate({ identifier: "AttachmentItem" });
    case 3:
      return S.Array(__S(66, __c4, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          DeliveredTimestamp: S.optional(S.String),
          ReadTimestamp: S.optional(S.String),
          RecipientParticipantId: S.optional(S.String),
        }),
      ).annotate({ identifier: "Receipt" });
    case 5:
      return S.Array(__S(68, __c4, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({
          MessageId: S.optional(S.String),
          Receipts: S.optional(__S(69, __c4, 5)),
          MessageProcessingStatus: S.optional(S.String),
        }),
      ).annotate({ identifier: "MessageMetadata" });
    case 7:
      return S.suspend(() =>
        S.Struct({
          AbsoluteTime: S.optional(S.String),
          Content: S.optional(S.String),
          ContentType: S.optional(S.String),
          Id: S.optional(S.String),
          Type: S.optional(S.String),
          ParticipantId: S.optional(S.String),
          DisplayName: S.optional(S.String),
          ParticipantRole: S.optional(S.String),
          Attachments: S.optional(__S(67, __c4, 3)),
          MessageMetadata: S.optional(__S(70, __c4, 6)),
          RelatedContactId: S.optional(S.String),
          ContactId: S.optional(S.String),
        }),
      ).annotate({ identifier: "Item" });
    case 8:
      return S.Array(__S(71, __c4, 7));
    case 9:
      return S.suspend(() =>
        S.Struct({
          InitialContactId: S.optional(S.String),
          Transcript: S.optional(__S(72, __c4, 8)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetTranscriptResponse" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ContentType: S.String,
          Content: S.optional(S.String),
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          ConnectionToken: S.String.pipe(T.HttpHeader("X-Amz-Bearer")),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/participant/event" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "SendEventRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Id: S.optional(S.String), AbsoluteTime: S.optional(S.String) }),
      ).annotate({ identifier: "SendEventResponse" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ContentType: S.String,
          Content: S.String,
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          ConnectionToken: S.String.pipe(T.HttpHeader("X-Amz-Bearer")),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/participant/message" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "SendMessageRequest" });
    case 1:
      return S.suspend(() => S.Struct({ MessageProcessingStatus: S.optional(S.String) })).annotate({
        identifier: "MessageProcessingMetadata",
      });
    case 2:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          AbsoluteTime: S.optional(S.String),
          MessageMetadata: S.optional(__S(97, __c6, 1)),
        }),
      ).annotate({ identifier: "SendMessageResponse" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ContentType: S.String,
          AttachmentSizeInBytes: S.Number,
          AttachmentName: S.String,
          ClientToken: S.String.pipe(T.IdempotencyToken()),
          ConnectionToken: S.String.pipe(T.HttpHeader("X-Amz-Bearer")),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/participant/start-attachment-upload" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartAttachmentUploadRequest" });
    case 1:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
    case 2:
      return S.suspend(() =>
        S.Struct({
          Url: S.optional(S.String),
          UrlExpiry: S.optional(S.String),
          HeadersToInclude: S.optional(__S(113, __c7, 1)),
        }),
      ).annotate({ identifier: "UploadMetadata" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          AttachmentId: S.optional(S.String),
          UploadMetadata: S.optional(__S(114, __c7, 2)),
        }),
      ).annotate({ identifier: "StartAttachmentUploadResponse" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SessionId: S.String,
          ConnectionToken: S.String.pipe(T.HttpHeader("X-Amz-Bearer")),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/participant/cancel-authentication" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CancelParticipantAuthenticationRequest" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({
        identifier: "CancelParticipantAuthenticationResponse",
      });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
    case 1:
      return S.suspend(() =>
        S.Struct({
          AttachmentIds: __S(160, __c10, 0),
          ClientToken: S.String.pipe(T.IdempotencyToken()),
          ConnectionToken: S.String.pipe(T.HttpHeader("X-Amz-Bearer")),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/participant/complete-attachment-upload" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CompleteAttachmentUploadRequest" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
    case 1:
      return S.suspend(() =>
        S.Struct({
          Type: S.optional(__S(176, __c11, 0)),
          ParticipantToken: S.String.pipe(T.HttpHeader("X-Amz-Bearer")),
          ConnectParticipant: S.optional(S.Boolean),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/participant/connection" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateParticipantConnectionRequest" });
    case 2:
      return S.suspend(() =>
        S.Struct({ Url: S.optional(S.String), ConnectionExpiry: S.optional(S.String) }),
      ).annotate({ identifier: "Websocket" });
    case 3:
      return S.suspend(() =>
        S.Struct({ ConnectionToken: S.optional(S.String), Expiry: S.optional(S.String) }),
      ).annotate({ identifier: "ConnectionCredentials" });
    case 4:
      return S.suspend(() =>
        S.Struct({ AttendeeId: S.optional(S.String), JoinToken: S.optional(SensitiveString) }),
      ).annotate({ identifier: "Attendee" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          AudioHostUrl: S.optional(S.String),
          AudioFallbackUrl: S.optional(S.String),
          SignalingUrl: S.optional(S.String),
          EventIngestionUrl: S.optional(S.String),
        }),
      ).annotate({ identifier: "WebRTCMediaPlacement" });
    case 6:
      return S.suspend(() => S.Struct({ EchoReduction: S.optional(S.String) })).annotate({
        identifier: "AudioFeatures",
      });
    case 7:
      return S.suspend(() => S.Struct({ Audio: S.optional(__S(182, __c11, 6)) })).annotate({
        identifier: "MeetingFeaturesConfiguration",
      });
    case 8:
      return S.suspend(() =>
        S.Struct({
          MediaPlacement: S.optional(__S(181, __c11, 5)),
          MeetingFeatures: S.optional(__S(183, __c11, 7)),
          MeetingId: S.optional(S.String),
        }),
      ).annotate({ identifier: "WebRTCMeeting" });
    case 9:
      return S.suspend(() =>
        S.Struct({
          Attendee: S.optional(__S(180, __c11, 4)),
          Meeting: S.optional(__S(184, __c11, 8)),
        }),
      ).annotate({ identifier: "WebRTCConnection" });
    case 10:
      return S.suspend(() =>
        S.Struct({
          Websocket: S.optional(__S(178, __c11, 2)),
          ConnectionCredentials: S.optional(__S(179, __c11, 3)),
          WebRTCConnection: S.optional(__S(185, __c11, 9)),
        }),
      ).annotate({ identifier: "CreateParticipantConnectionResponse" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
