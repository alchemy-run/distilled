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
  sdkId: "Chime SDK Meetings",
  target: "ChimeMeetingsSDKService",
  version: "2021-07-15",
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
                `https://meetings-chime-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://meetings-chime-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://meetings-chime.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://meetings-chime.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
  )<{
    readonly Code?: string;
    readonly message?: string;
    readonly RequestId?: string;
  }> {}
export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError("ConflictException", ["ConflictError"], {
    status: 409,
  })<{
    readonly Code?: string;
    readonly message?: string;
    readonly RequestId?: string;
  }> {}
export class ForbiddenException
  extends /*@__PURE__*/ TE.TaggedError("ForbiddenException", ["AuthError"], {
    status: 403,
  })<{
    readonly Code?: string;
    readonly message?: string;
    readonly RequestId?: string;
  }> {}
export class LimitExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "LimitExceededException",
    ["BadRequestError"],
    { status: 400 },
  )<{
    readonly Code?: string;
    readonly message?: string;
    readonly RequestId?: string;
  }> {}
export class NotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "NotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{
    readonly Code?: string;
    readonly message?: string;
    readonly RequestId?: string;
  }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{
    readonly Code?: string;
    readonly message?: string;
    readonly RequestId?: string;
    readonly ResourceName?: string;
  }> {}
export class ServiceFailureException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceFailureException",
    ["ServerError"],
    { status: 500 },
  )<{
    readonly Code?: string;
    readonly message?: string;
    readonly RequestId?: string;
  }> {}
export class ServiceUnavailableException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceUnavailableException",
    ["ServerError"],
    { status: 503, headers: { RetryAfterSeconds: "Retry-After" } },
  )<{
    readonly Code?: string;
    readonly message?: string;
    readonly RequestId?: string;
    readonly RetryAfterSeconds?: string;
  }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["ThrottlingError"],
    { status: 429 },
  )<{
    readonly Code?: string;
    readonly message?: string;
    readonly RequestId?: string;
  }> {}
export class TooManyTagsException
  extends /*@__PURE__*/ TE.TaggedError(
    "TooManyTagsException",
    ["BadRequestError"],
    { status: 400 },
  )<{
    readonly Code?: string;
    readonly message?: string;
    readonly RequestId?: string;
    readonly ResourceName?: string;
  }> {}
export class UnauthorizedException
  extends /*@__PURE__*/ TE.TaggedError("UnauthorizedException", ["AuthError"], {
    status: 401,
  })<{
    readonly Code?: string;
    readonly message?: string;
    readonly RequestId?: string;
  }> {}
export class UnprocessableEntityException
  extends /*@__PURE__*/ TE.TaggedError(
    "UnprocessableEntityException",
    ["BadRequestError"],
    { status: 422 },
  )<{
    readonly Code?: string;
    readonly message?: string;
    readonly RequestId?: string;
  }> {}
export type GuidString = string;
export type ExternalUserId = string | redacted.Redacted<string>;
export type MediaCapabilities =
  | "SendReceive"
  | "Send"
  | "Receive"
  | "None"
  | (string & {});
export interface AttendeeCapabilities {
  Audio: MediaCapabilities;
  Video: MediaCapabilities;
  Content: MediaCapabilities;
}
export interface CreateAttendeeRequestItem {
  ExternalUserId: string | redacted.Redacted<string>;
  Capabilities?: AttendeeCapabilities;
}
export type CreateAttendeeRequestItemList = CreateAttendeeRequestItem[];
export interface BatchCreateAttendeeRequest {
  MeetingId: string;
  Attendees: CreateAttendeeRequestItem[];
}
export type JoinTokenString = string | redacted.Redacted<string>;
export interface Attendee {
  ExternalUserId?: string | redacted.Redacted<string>;
  AttendeeId?: string;
  JoinToken?: string | redacted.Redacted<string>;
  Capabilities?: AttendeeCapabilities;
}
export type AttendeeList = Attendee[];
export interface CreateAttendeeError_ {
  ExternalUserId?: string | redacted.Redacted<string>;
  ErrorCode?: string;
  ErrorMessage?: string;
}
export type BatchCreateAttendeeErrorList = CreateAttendeeError_[];
export interface BatchCreateAttendeeResponse {
  Attendees?: Attendee[];
  Errors?: CreateAttendeeError_[];
}
export interface AttendeeIdItem {
  AttendeeId: string;
}
export type AttendeeIdsList = AttendeeIdItem[];
export interface BatchUpdateAttendeeCapabilitiesExceptRequest {
  MeetingId: string;
  ExcludedAttendeeIds: AttendeeIdItem[];
  Capabilities: AttendeeCapabilities;
}
export interface BatchUpdateAttendeeCapabilitiesExceptResponse {}
export interface CreateAttendeeRequest {
  MeetingId: string;
  ExternalUserId: string | redacted.Redacted<string>;
  Capabilities?: AttendeeCapabilities;
}
export interface CreateAttendeeResponse {
  Attendee?: Attendee;
}
export type ClientRequestToken = string | redacted.Redacted<string>;
export type MediaRegion = string;
export type ExternalMeetingId = string | redacted.Redacted<string>;
export type Arn = string | redacted.Redacted<string>;
export interface NotificationsConfiguration {
  LambdaFunctionArn?: string | redacted.Redacted<string>;
  SnsTopicArn?: string | redacted.Redacted<string>;
  SqsQueueArn?: string | redacted.Redacted<string>;
}
export type MeetingFeatureStatus = "AVAILABLE" | "UNAVAILABLE" | (string & {});
export interface AudioFeatures {
  EchoReduction?: MeetingFeatureStatus;
}
export type VideoResolution = "None" | "HD" | "FHD" | (string & {});
export interface VideoFeatures {
  MaxResolution?: VideoResolution;
}
export type ContentResolution = "None" | "FHD" | "UHD" | (string & {});
export interface ContentFeatures {
  MaxResolution?: ContentResolution;
}
export type AttendeeMax = number;
export interface AttendeeFeatures {
  MaxCount?: number;
}
export interface MeetingFeaturesConfiguration {
  Audio?: AudioFeatures;
  Video?: VideoFeatures;
  Content?: ContentFeatures;
  Attendee?: AttendeeFeatures;
}
export type PrimaryMeetingId = string;
export type TenantId = string;
export type TenantIdList = string[];
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  Key: string;
  Value: string;
}
export type TagList = Tag[];
export type MediaPlacementNetworkType =
  | "Ipv4Only"
  | "DualStack"
  | (string & {});
export interface CreateMeetingRequest {
  ClientRequestToken: string | redacted.Redacted<string>;
  MediaRegion: string;
  MeetingHostId?: string | redacted.Redacted<string>;
  ExternalMeetingId: string | redacted.Redacted<string>;
  NotificationsConfiguration?: NotificationsConfiguration;
  MeetingFeatures?: MeetingFeaturesConfiguration;
  PrimaryMeetingId?: string;
  TenantIds?: string[];
  Tags?: Tag[];
  MediaPlacementNetworkType?: MediaPlacementNetworkType;
}
export interface MediaPlacement {
  AudioHostUrl?: string;
  AudioFallbackUrl?: string;
  SignalingUrl?: string;
  TurnControlUrl?: string;
  ScreenDataUrl?: string;
  ScreenViewingUrl?: string;
  ScreenSharingUrl?: string;
  EventIngestionUrl?: string;
}
export type AmazonResourceName = string;
export interface Meeting {
  MeetingId?: string;
  MeetingHostId?: string | redacted.Redacted<string>;
  ExternalMeetingId?: string | redacted.Redacted<string>;
  MediaRegion?: string;
  MediaPlacement?: MediaPlacement;
  MeetingFeatures?: MeetingFeaturesConfiguration;
  PrimaryMeetingId?: string;
  TenantIds?: string[];
  MeetingArn?: string;
}
export interface CreateMeetingResponse {
  Meeting?: Meeting;
}
export type CreateMeetingWithAttendeesRequestItemList =
  CreateAttendeeRequestItem[];
export interface CreateMeetingWithAttendeesRequest {
  ClientRequestToken: string | redacted.Redacted<string>;
  MediaRegion: string;
  MeetingHostId?: string | redacted.Redacted<string>;
  ExternalMeetingId: string | redacted.Redacted<string>;
  MeetingFeatures?: MeetingFeaturesConfiguration;
  NotificationsConfiguration?: NotificationsConfiguration;
  Attendees: CreateAttendeeRequestItem[];
  PrimaryMeetingId?: string;
  TenantIds?: string[];
  Tags?: Tag[];
  MediaPlacementNetworkType?: MediaPlacementNetworkType;
}
export interface CreateMeetingWithAttendeesResponse {
  Meeting?: Meeting;
  Attendees?: Attendee[];
  Errors?: CreateAttendeeError_[];
}
export interface DeleteAttendeeRequest {
  MeetingId: string;
  AttendeeId: string;
}
export interface DeleteAttendeeResponse {}
export interface DeleteMeetingRequest {
  MeetingId: string;
}
export interface DeleteMeetingResponse {}
export interface GetAttendeeRequest {
  MeetingId: string;
  AttendeeId: string;
}
export interface GetAttendeeResponse {
  Attendee?: Attendee;
}
export interface GetMeetingRequest {
  MeetingId: string;
}
export interface GetMeetingResponse {
  Meeting?: Meeting;
}
export type ResultMax = number;
export interface ListAttendeesRequest {
  MeetingId: string;
  NextToken?: string;
  MaxResults?: number;
}
export interface ListAttendeesResponse {
  Attendees?: Attendee[];
  NextToken?: string;
}
export interface ListTagsForResourceRequest {
  ResourceARN: string;
}
export interface ListTagsForResourceResponse {
  Tags?: Tag[];
}
export type TranscribeLanguageCode =
  | "en-US"
  | "en-GB"
  | "es-US"
  | "fr-CA"
  | "fr-FR"
  | "en-AU"
  | "it-IT"
  | "de-DE"
  | "pt-BR"
  | "ja-JP"
  | "ko-KR"
  | "zh-CN"
  | "th-TH"
  | "hi-IN"
  | (string & {});
export type TranscribeVocabularyFilterMethod =
  | "remove"
  | "mask"
  | "tag"
  | (string & {});
export type TranscribeRegion =
  | "us-east-2"
  | "us-east-1"
  | "us-west-2"
  | "ap-northeast-2"
  | "ap-southeast-2"
  | "ap-northeast-1"
  | "ca-central-1"
  | "eu-central-1"
  | "eu-west-1"
  | "eu-west-2"
  | "sa-east-1"
  | "auto"
  | "us-gov-west-1"
  | (string & {});
export type TranscribePartialResultsStability =
  | "low"
  | "medium"
  | "high"
  | (string & {});
export type TranscribeContentIdentificationType = "PII" | (string & {});
export type TranscribeContentRedactionType = "PII" | (string & {});
export type TranscribePiiEntityTypes = string;
export type TranscribeLanguageModelName = string;
export type TranscribeLanguageOptions = string;
export type TranscribeVocabularyNamesOrFilterNamesString = string;
export interface EngineTranscribeSettings {
  LanguageCode?: TranscribeLanguageCode;
  VocabularyFilterMethod?: TranscribeVocabularyFilterMethod;
  VocabularyFilterName?: string;
  VocabularyName?: string;
  Region?: TranscribeRegion;
  EnablePartialResultsStabilization?: boolean;
  PartialResultsStability?: TranscribePartialResultsStability;
  ContentIdentificationType?: TranscribeContentIdentificationType;
  ContentRedactionType?: TranscribeContentRedactionType;
  PiiEntityTypes?: string;
  LanguageModelName?: string;
  IdentifyLanguage?: boolean;
  LanguageOptions?: string;
  PreferredLanguage?: TranscribeLanguageCode;
  VocabularyNames?: string;
  VocabularyFilterNames?: string;
}
export type TranscribeMedicalLanguageCode = "en-US" | (string & {});
export type TranscribeMedicalSpecialty =
  | "PRIMARYCARE"
  | "CARDIOLOGY"
  | "NEUROLOGY"
  | "ONCOLOGY"
  | "RADIOLOGY"
  | "UROLOGY"
  | (string & {});
export type TranscribeMedicalType =
  | "CONVERSATION"
  | "DICTATION"
  | (string & {});
export type TranscribeMedicalRegion =
  | "us-east-1"
  | "us-east-2"
  | "us-west-2"
  | "ap-southeast-2"
  | "ca-central-1"
  | "eu-west-1"
  | "auto"
  | (string & {});
export type TranscribeMedicalContentIdentificationType = "PHI" | (string & {});
export interface EngineTranscribeMedicalSettings {
  LanguageCode: TranscribeMedicalLanguageCode;
  Specialty: TranscribeMedicalSpecialty;
  Type: TranscribeMedicalType;
  VocabularyName?: string;
  Region?: TranscribeMedicalRegion;
  ContentIdentificationType?: TranscribeMedicalContentIdentificationType;
}
export interface TranscriptionConfiguration {
  EngineTranscribeSettings?: EngineTranscribeSettings;
  EngineTranscribeMedicalSettings?: EngineTranscribeMedicalSettings;
}
export interface StartMeetingTranscriptionRequest {
  MeetingId: string;
  TranscriptionConfiguration: TranscriptionConfiguration;
}
export interface StartMeetingTranscriptionResponse {}
export interface StopMeetingTranscriptionRequest {
  MeetingId: string;
}
export interface StopMeetingTranscriptionResponse {}
export interface TagResourceRequest {
  ResourceARN: string;
  Tags: Tag[];
}
export interface TagResourceResponse {}
export type TagKeyList = string[];
export interface UntagResourceRequest {
  ResourceARN: string;
  TagKeys: string[];
}
export interface UntagResourceResponse {}
export interface UpdateAttendeeCapabilitiesRequest {
  MeetingId: string;
  AttendeeId: string;
  Capabilities: AttendeeCapabilities;
}
export interface UpdateAttendeeCapabilitiesResponse {
  Attendee?: Attendee;
}
export type RetryAfterSeconds = string;
export type BatchCreateAttendeeError =
  | BadRequestException
  | ForbiddenException
  | LimitExceededException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | UnprocessableEntityException
  | CommonErrors;
/**
 * Creates up to 100 attendees for an active Amazon Chime SDK meeting. For more information about the Amazon Chime SDK, see
 * Using the Amazon Chime SDK in the *Amazon Chime Developer Guide*.
 */
export const batchCreateAttendee: API.OperationMethod<
  BatchCreateAttendeeRequest,
  BatchCreateAttendeeResponse,
  BatchCreateAttendeeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /meetings/{MeetingId}/attendees?operation=batch-create",
    input: { MeetingId: 0, Attendees: D.list(i_CreateAttendeeRequestItem) },
    output: {
      Attendees: D.list(o_Attendee),
      Errors: D.list(o_CreateAttendeeError),
    },
    body: true,
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    LimitExceededException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
    UnprocessableEntityException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchCreateAttendee",
})) as any;

export type BatchUpdateAttendeeCapabilitiesExceptError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Updates `AttendeeCapabilities` except the capabilities listed in an `ExcludedAttendeeIds` table.
 *
 * You use the capabilities with a set of values that control what the capabilities can do, such as `SendReceive` data. For more information about those values, see
 * .
 *
 * When using capabilities, be aware of these corner cases:
 *
 * - If you specify `MeetingFeatures:Video:MaxResolution:None` when you create a meeting, all API requests
 * that include `SendReceive`, `Send`, or `Receive` for `AttendeeCapabilities:Video` will be rejected with `ValidationError 400`.
 *
 * - If you specify `MeetingFeatures:Content:MaxResolution:None` when you create a meeting, all API requests that include `SendReceive`, `Send`, or
 * `Receive` for `AttendeeCapabilities:Content` will be rejected with `ValidationError 400`.
 *
 * - You can't set `content` capabilities to `SendReceive` or `Receive` unless you also set `video` capabilities to `SendReceive`
 * or `Receive`. If you don't set the `video` capability to receive, the response will contain an HTTP 400 Bad Request status code. However, you can set your `video` capability
 * to receive and you set your `content` capability to not receive.
 *
 * - If meeting features is defined as `Video:MaxResolution:None` but
 * `Content:MaxResolution` is defined as something other than
 * `None` and attendee capabilities are not defined in the API
 * request, then the default attendee video capability is set to
 * `Receive` and attendee content capability is set to
 * `SendReceive`. This is because content `SendReceive`
 * requires video to be at least `Receive`.
 *
 * - When you change an `audio` capability from `None` or `Receive` to `Send` or `SendReceive` ,
 * and if the attendee left their microphone unmuted, audio will flow from the attendee to the other meeting participants.
 *
 * - When you change a `video` or `content` capability from `None` or `Receive` to `Send` or `SendReceive` ,
 * and if the attendee turned on their video or content streams, remote attendees can receive those streams, but only after media renegotiation between the client and the Amazon Chime back-end server.
 */
export const batchUpdateAttendeeCapabilitiesExcept: API.OperationMethod<
  BatchUpdateAttendeeCapabilitiesExceptRequest,
  BatchUpdateAttendeeCapabilitiesExceptResponse,
  BatchUpdateAttendeeCapabilitiesExceptError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /meetings/{MeetingId}/attendees/capabilities?operation=batch-update-except",
    input: {
      MeetingId: 0,
      ExcludedAttendeeIds: D.list({ AttendeeId: 0 }),
      Capabilities: i_AttendeeCapabilities,
    },
    body: true,
  },
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchUpdateAttendeeCapabilitiesExcept",
})) as any;

export type CreateAttendeeError =
  | BadRequestException
  | ForbiddenException
  | LimitExceededException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | UnprocessableEntityException
  | CommonErrors;
/**
 * Creates a new attendee for an active Amazon Chime SDK meeting. For more information about the Amazon Chime SDK, see
 * Using the Amazon Chime SDK
 * in the
 * *Amazon Chime Developer Guide*.
 */
export const createAttendee: API.OperationMethod<
  CreateAttendeeRequest,
  CreateAttendeeResponse,
  CreateAttendeeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /meetings/{MeetingId}/attendees",
    input: {
      MeetingId: 0,
      ExternalUserId: 0,
      Capabilities: i_AttendeeCapabilities,
    },
    output: { Attendee: o_Attendee },
    body: true,
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    LimitExceededException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
    UnprocessableEntityException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAttendee",
})) as any;

export type CreateMeetingError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | LimitExceededException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Creates a new Amazon Chime SDK meeting in the specified media Region with no initial attendees. For more information about specifying media Regions, see
 * Available Regions and
 * Using meeting Regions, both
 * in the *Amazon Chime SDK Developer Guide*. For more information about the Amazon Chime SDK, see
 * Using the Amazon Chime SDK
 * in the
 * *Amazon Chime SDK Developer Guide*.
 *
 * If you use this API in conjuction with the and APIs, and you don't specify the
 * `MeetingFeatures.Content.MaxResolution` or `MeetingFeatures.Video.MaxResolution` parameters, the following defaults are used:
 *
 * - Content.MaxResolution: FHD
 *
 * - Video.MaxResolution: HD
 */
export const createMeeting: API.OperationMethod<
  CreateMeetingRequest,
  CreateMeetingResponse,
  CreateMeetingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /meetings",
    input: {
      ClientRequestToken: D.m({ idempotency: true }),
      MediaRegion: 0,
      MeetingHostId: 0,
      ExternalMeetingId: 0,
      NotificationsConfiguration: i_NotificationsConfiguration,
      MeetingFeatures: i_MeetingFeaturesConfiguration,
      PrimaryMeetingId: 0,
      TenantIds: 0,
      Tags: D.list(i_Tag),
      MediaPlacementNetworkType: 0,
    },
    output: { Meeting: o_Meeting },
    body: true,
  },
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    LimitExceededException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateMeeting",
})) as any;

export type CreateMeetingWithAttendeesError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | LimitExceededException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Creates a new Amazon Chime SDK meeting in the specified media Region, with attendees. For more information about specifying media Regions, see
 * Available Regions and
 * Using meeting Regions, both
 * in the *Amazon Chime SDK Developer Guide*. For more information about the Amazon Chime SDK, see
 * Using the Amazon Chime SDK
 * in the
 * *Amazon Chime SDK Developer Guide*.
 *
 * If you use this API in conjuction with the and APIs, and you don't specify the
 * `MeetingFeatures.Content.MaxResolution` or `MeetingFeatures.Video.MaxResolution` parameters, the following defaults are used:
 *
 * - Content.MaxResolution: FHD
 *
 * - Video.MaxResolution: HD
 */
export const createMeetingWithAttendees: API.OperationMethod<
  CreateMeetingWithAttendeesRequest,
  CreateMeetingWithAttendeesResponse,
  CreateMeetingWithAttendeesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /meetings?operation=create-attendees",
    input: {
      ClientRequestToken: D.m({ idempotency: true }),
      MediaRegion: 0,
      MeetingHostId: 0,
      ExternalMeetingId: 0,
      MeetingFeatures: i_MeetingFeaturesConfiguration,
      NotificationsConfiguration: i_NotificationsConfiguration,
      Attendees: D.list(i_CreateAttendeeRequestItem),
      PrimaryMeetingId: 0,
      TenantIds: 0,
      Tags: D.list(i_Tag),
      MediaPlacementNetworkType: 0,
    },
    output: {
      Meeting: o_Meeting,
      Attendees: D.list(o_Attendee),
      Errors: D.list(o_CreateAttendeeError),
    },
    body: true,
  },
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    LimitExceededException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateMeetingWithAttendees",
})) as any;

export type DeleteAttendeeError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Deletes an attendee from the specified Amazon Chime SDK meeting and deletes their
 * `JoinToken`. Attendees are automatically deleted when a Amazon Chime SDK meeting is deleted. For more information about the Amazon Chime SDK, see
 * Using the Amazon Chime SDK
 * in the *Amazon Chime Developer Guide*.
 */
export const deleteAttendee: API.OperationMethod<
  DeleteAttendeeRequest,
  DeleteAttendeeResponse,
  DeleteAttendeeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /meetings/{MeetingId}/attendees/{AttendeeId}",
    input: { MeetingId: 0, AttendeeId: 0 },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAttendee",
})) as any;

export type DeleteMeetingError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Deletes the specified Amazon Chime SDK meeting. The operation deletes all attendees, disconnects all clients, and prevents new clients from
 * joining the meeting. For more information about the Amazon Chime SDK, see
 * Using the Amazon Chime SDK in the
 * *Amazon Chime Developer Guide*.
 */
export const deleteMeeting: API.OperationMethod<
  DeleteMeetingRequest,
  DeleteMeetingResponse,
  DeleteMeetingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /meetings/{MeetingId}",
    input: { MeetingId: 0 },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteMeeting",
})) as any;

export type GetAttendeeError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Gets the Amazon Chime SDK attendee details for a specified meeting ID and attendee ID. For more information about the Amazon Chime SDK, see
 * Using the Amazon Chime SDK
 * in the *Amazon Chime Developer Guide*.
 */
export const getAttendee: API.OperationMethod<
  GetAttendeeRequest,
  GetAttendeeResponse,
  GetAttendeeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /meetings/{MeetingId}/attendees/{AttendeeId}",
    input: { MeetingId: 0, AttendeeId: 0 },
    output: { Attendee: o_Attendee },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAttendee",
})) as any;

export type GetMeetingError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Gets the Amazon Chime SDK meeting details for the specified meeting ID. For more information about the Amazon Chime SDK, see
 * Using the Amazon Chime SDK
 * in the *Amazon Chime Developer Guide*.
 */
export const getMeeting: API.OperationMethod<
  GetMeetingRequest,
  GetMeetingResponse,
  GetMeetingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /meetings/{MeetingId}",
    input: { MeetingId: 0 },
    output: { Meeting: o_Meeting },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMeeting",
})) as any;

export type ListAttendeesError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Lists the attendees for the specified Amazon Chime SDK meeting. For more information about the Amazon Chime SDK, see
 * Using the Amazon Chime SDK
 * in the *Amazon Chime Developer Guide*.
 */
export const listAttendees: API.PaginatedOperationMethod<
  ListAttendeesRequest,
  ListAttendeesResponse,
  ListAttendeesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /meetings/{MeetingId}/attendees",
    input: {
      MeetingId: 0,
      NextToken: D.m({ query: "next-token" }),
      MaxResults: D.m({ query: "max-results" }),
    },
    output: { Attendees: D.list(o_Attendee) },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAttendees",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | BadRequestException
  | ForbiddenException
  | LimitExceededException
  | ResourceNotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Returns a list of the tags available for the specified resource.
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
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    LimitExceededException,
    ResourceNotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

export type StartMeetingTranscriptionError =
  | BadRequestException
  | ForbiddenException
  | LimitExceededException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | UnprocessableEntityException
  | CommonErrors;
/**
 * Starts transcription for the specified `meetingId`. For more information, refer to
 * Using Amazon Chime SDK live transcription
 * in the *Amazon Chime SDK Developer Guide*.
 *
 * If you specify an invalid configuration, a `TranscriptFailed` event will be sent with the contents of the `BadRequestException` generated by Amazon Transcribe.
 * For more information on each parameter and which combinations are valid, refer to the
 * StartStreamTranscription API in the
 * *Amazon Transcribe Developer Guide*.
 *
 * By default, Amazon Transcribe may use and store audio content processed by the service to develop and improve Amazon Web Services AI/ML services as
 * further described in section 50 of the Amazon Web Services Service Terms. Using Amazon Transcribe
 * may be subject to federal and state laws or regulations regarding the recording or interception of electronic communications. It is your and your end users’
 * responsibility to comply with all applicable laws regarding the recording, including properly notifying all participants in a recorded session or communication
 * that the session or communication is being recorded, and obtaining all necessary consents. You can opt out from Amazon Web Services using audio content to develop and
 * improve AWS AI/ML services by configuring an AI services opt out policy using Amazon Web Services Organizations.
 */
export const startMeetingTranscription: API.OperationMethod<
  StartMeetingTranscriptionRequest,
  StartMeetingTranscriptionResponse,
  StartMeetingTranscriptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /meetings/{MeetingId}/transcription?operation=start",
    input: {
      MeetingId: 0,
      TranscriptionConfiguration: {
        EngineTranscribeSettings: {
          LanguageCode: 0,
          VocabularyFilterMethod: 0,
          VocabularyFilterName: 0,
          VocabularyName: 0,
          Region: 0,
          EnablePartialResultsStabilization: 0,
          PartialResultsStability: 0,
          ContentIdentificationType: 0,
          ContentRedactionType: 0,
          PiiEntityTypes: 0,
          LanguageModelName: 0,
          IdentifyLanguage: 0,
          LanguageOptions: 0,
          PreferredLanguage: 0,
          VocabularyNames: 0,
          VocabularyFilterNames: 0,
        },
        EngineTranscribeMedicalSettings: {
          LanguageCode: 0,
          Specialty: 0,
          Type: 0,
          VocabularyName: 0,
          Region: 0,
          ContentIdentificationType: 0,
        },
      },
    },
    body: true,
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    LimitExceededException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
    UnprocessableEntityException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartMeetingTranscription",
})) as any;

export type StopMeetingTranscriptionError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | UnprocessableEntityException
  | CommonErrors;
/**
 * Stops transcription for the specified `meetingId`. For more information, refer to
 * Using Amazon Chime SDK live transcription
 * in the *Amazon Chime SDK Developer Guide*.
 *
 * By default, Amazon Transcribe may use and store audio content processed by the service to develop and improve Amazon Web Services AI/ML services as
 * further described in section 50 of the Amazon Web Services Service Terms. Using Amazon Transcribe
 * may be subject to federal and state laws or regulations regarding the recording or interception of electronic communications. It is your and your end users’
 * responsibility to comply with all applicable laws regarding the recording, including properly notifying all participants in a recorded session or communication
 * that the session or communication is being recorded, and obtaining all necessary consents. You can opt out from Amazon Web Services using audio content to develop and
 * improve Amazon Web Services AI/ML services by configuring an AI services opt out policy using Amazon Web Services Organizations.
 */
export const stopMeetingTranscription: API.OperationMethod<
  StopMeetingTranscriptionRequest,
  StopMeetingTranscriptionResponse,
  StopMeetingTranscriptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /meetings/{MeetingId}/transcription?operation=stop",
    input: { MeetingId: 0 },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
    UnprocessableEntityException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopMeetingTranscription",
})) as any;

export type TagResourceError =
  | BadRequestException
  | ForbiddenException
  | LimitExceededException
  | ResourceNotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottlingException
  | TooManyTagsException
  | UnauthorizedException
  | CommonErrors;
/**
 * The resource that supports tags.
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
    LimitExceededException,
    ResourceNotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottlingException,
    TooManyTagsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

export type UntagResourceError =
  | BadRequestException
  | ForbiddenException
  | LimitExceededException
  | ResourceNotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Removes the specified tags from the specified resources. When you specify a tag key, the action removes both that key and its associated value. The operation succeeds even if you
 * attempt to remove tags from a resource that were already removed. Note the following:
 *
 * - To remove tags from a resource, you need the necessary permissions for the service that the resource belongs to as well as permissions for removing tags. For more information,
 * see the documentation for the service whose resource you want to untag.
 *
 * - You can only tag resources that are located in the specified Amazon Web Services Region for the calling Amazon Web Services account.
 *
 * **Minimum permissions**
 *
 * In addition to the `tag:UntagResources` permission required by this operation, you must also have the remove tags permission defined by the service that created the resource.
 * For example, to remove the tags from an Amazon EC2 instance using the `UntagResources` operation, you must have both of the following permissions:
 *
 * `tag:UntagResource`
 *
 * `ChimeSDKMeetings:DeleteTags`
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
    LimitExceededException,
    ResourceNotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

export type UpdateAttendeeCapabilitiesError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * The capabilities that you want to update.
 *
 * You use the capabilities with a set of values that control what the capabilities can do, such as `SendReceive` data. For more information about those values, see
 * .
 *
 * When using capabilities, be aware of these corner cases:
 *
 * - If you specify `MeetingFeatures:Video:MaxResolution:None` when you create a meeting, all API requests
 * that include `SendReceive`, `Send`, or `Receive` for `AttendeeCapabilities:Video` will be rejected with `ValidationError 400`.
 *
 * - If you specify `MeetingFeatures:Content:MaxResolution:None` when you create a meeting, all API requests that include `SendReceive`, `Send`, or
 * `Receive` for `AttendeeCapabilities:Content` will be rejected with `ValidationError 400`.
 *
 * - You can't set `content` capabilities to `SendReceive` or `Receive` unless you also set `video` capabilities to `SendReceive`
 * or `Receive`. If you don't set the `video` capability to receive, the response will contain an HTTP 400 Bad Request status code. However, you can set your `video` capability
 * to receive and you set your `content` capability to not receive.
 *
 * - If meeting features is defined as `Video:MaxResolution:None` but
 * `Content:MaxResolution` is defined as something other than
 * `None` and attendee capabilities are not defined in the API
 * request, then the default attendee video capability is set to
 * `Receive` and attendee content capability is set to
 * `SendReceive`. This is because content `SendReceive`
 * requires video to be at least `Receive`.
 *
 * - When you change an `audio` capability from `None` or `Receive` to `Send` or `SendReceive` ,
 * and if the attendee left their microphone unmuted, audio will flow from the attendee to the other meeting participants.
 *
 * - When you change a `video` or `content` capability from `None` or `Receive` to `Send` or `SendReceive` ,
 * and if the attendee turned on their video or content streams, remote attendees can receive those streams, but only after media renegotiation between the client and the Amazon Chime back-end server.
 */
export const updateAttendeeCapabilities: API.OperationMethod<
  UpdateAttendeeCapabilitiesRequest,
  UpdateAttendeeCapabilitiesResponse,
  UpdateAttendeeCapabilitiesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /meetings/{MeetingId}/attendees/{AttendeeId}/capabilities",
    input: {
      MeetingId: 0,
      AttendeeId: 0,
      Capabilities: i_AttendeeCapabilities,
    },
    output: { Attendee: o_Attendee },
    body: true,
  },
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAttendeeCapabilities",
})) as any;

const i_AttendeeCapabilities: D.LazyStruct = () => ({
  Audio: 0,
  Video: 0,
  Content: 0,
});
const i_CreateAttendeeRequestItem: D.LazyStruct = () => ({
  ExternalUserId: 0,
  Capabilities: i_AttendeeCapabilities,
});
const i_MeetingFeaturesConfiguration: D.LazyStruct = () => ({
  Audio: { EchoReduction: 0 },
  Video: { MaxResolution: 0 },
  Content: { MaxResolution: 0 },
  Attendee: { MaxCount: 0 },
});
const i_NotificationsConfiguration: D.LazyStruct = () => ({
  LambdaFunctionArn: 0,
  SnsTopicArn: 0,
  SqsQueueArn: 0,
});
const i_Tag: D.LazyStruct = () => ({ Key: 0, Value: 0 });
const o_Attendee: D.LazyStruct = () => ({
  ExternalUserId: D.secret,
  JoinToken: D.secret,
});
const o_CreateAttendeeError: D.LazyStruct = () => ({
  ExternalUserId: D.secret,
});
const o_Meeting: D.LazyStruct = () => ({
  MeetingHostId: D.secret,
  ExternalMeetingId: D.secret,
});
