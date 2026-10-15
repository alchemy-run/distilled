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
  sdkId: "Chime SDK Meetings",
  serviceShapeName: "ChimeMeetingsSDKService",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "chime" });
const ver = /*@__PURE__*/ T.ServiceVersion("2021-07-15");
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
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://meetings-chime.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://meetings-chime.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://meetings-chime.{R}.{D}","properties":{},"headers":{}}');

export class BadRequestException
  extends /*@__PURE__*/ S.TaggedError<BadRequestException>()(
    "BadRequestException",
    {
      Code: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      RequestId: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    {
      Code: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      RequestId: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class ForbiddenException
  extends /*@__PURE__*/ S.TaggedError<ForbiddenException>()(
    "ForbiddenException",
    {
      Code: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      RequestId: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class LimitExceededException
  extends /*@__PURE__*/ S.TaggedError<LimitExceededException>()(
    "LimitExceededException",
    {
      Code: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      RequestId: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class NotFoundException
  extends /*@__PURE__*/ S.TaggedError<NotFoundException>()(
    "NotFoundException",
    {
      Code: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      RequestId: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    {
      Code: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      RequestId: /*@__PURE__*/ S.optional(S.String),
      ResourceName: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceFailureException
  extends /*@__PURE__*/ S.TaggedError<ServiceFailureException>()(
    "ServiceFailureException",
    {
      Code: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      RequestId: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError) {}
export class ServiceUnavailableException
  extends /*@__PURE__*/ S.TaggedError<ServiceUnavailableException>()(
    "ServiceUnavailableException",
    {
      Code: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      RequestId: /*@__PURE__*/ S.optional(S.String),
      RetryAfterSeconds: /*@__PURE__*/ S.optional(S.String).pipe(
        /*@__PURE__*/ T.HttpHeader("Retry-After"),
      ),
    },
    /*@__PURE__*/ T.HttpError(503),
  ).pipe(C.withServerError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    {
      Code: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      RequestId: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class TooManyTagsException
  extends /*@__PURE__*/ S.TaggedError<TooManyTagsException>()(
    "TooManyTagsException",
    {
      Code: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      RequestId: /*@__PURE__*/ S.optional(S.String),
      ResourceName: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class UnauthorizedException
  extends /*@__PURE__*/ S.TaggedError<UnauthorizedException>()(
    "UnauthorizedException",
    {
      Code: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      RequestId: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(401),
  ).pipe(C.withAuthError) {}
export class UnprocessableEntityException
  extends /*@__PURE__*/ S.TaggedError<UnprocessableEntityException>()(
    "UnprocessableEntityException",
    {
      Code: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      RequestId: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(422),
  ).pipe(C.withBadRequestError) {}
export type GuidString = string;
export type ExternalUserId = string | redacted.Redacted<string>;
export type MediaCapabilities = "SendReceive" | "Send" | "Receive" | "None" | (string & {});
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
export type MediaPlacementNetworkType = "Ipv4Only" | "DualStack" | (string & {});
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
export type CreateMeetingWithAttendeesRequestItemList = CreateAttendeeRequestItem[];
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
export type TranscribeVocabularyFilterMethod = "remove" | "mask" | "tag" | (string & {});
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
export type TranscribePartialResultsStability = "low" | "medium" | "high" | (string & {});
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
export type TranscribeMedicalType = "CONVERSATION" | "DICTATION" | (string & {});
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
  input: __S(0, __c0, 0) as any as S.Schema<BatchCreateAttendeeRequest>,
  output: __S(1, __c0, 1) as any as S.Schema<BatchCreateAttendeeResponse>,
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
}));

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
  input: __S(42, __c5, 2) as any as S.Schema<BatchUpdateAttendeeCapabilitiesExceptRequest>,
  output: __S(48, __c6, 0) as any as S.Schema<BatchUpdateAttendeeCapabilitiesExceptResponse>,
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
}));

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
  input: __S(56, __c7, 0) as any as S.Schema<CreateAttendeeRequest>,
  output: __S(64, __c8, 0) as any as S.Schema<CreateAttendeeResponse>,
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
}));

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
  input: __S(72, __c9, 0) as any as S.Schema<CreateMeetingRequest>,
  output: __S(112, __c14, 0) as any as S.Schema<CreateMeetingResponse>,
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
}));

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
  input: __S(120, __c15, 0) as any as S.Schema<CreateMeetingWithAttendeesRequest>,
  output: __S(121, __c15, 1) as any as S.Schema<CreateMeetingWithAttendeesResponse>,
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
}));

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
  input: __S(128, __c16, 0) as any as S.Schema<DeleteAttendeeRequest>,
  output: __S(48, __c6, 0) as any as S.Schema<DeleteAttendeeResponse>,
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
}));

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
  input: __S(136, __c17, 0) as any as S.Schema<DeleteMeetingRequest>,
  output: __S(48, __c6, 0) as any as S.Schema<DeleteMeetingResponse>,
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
}));

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
  input: __S(144, __c18, 0) as any as S.Schema<GetAttendeeRequest>,
  output: __S(64, __c8, 0) as any as S.Schema<GetAttendeeResponse>,
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
}));

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
  input: __S(152, __c19, 0) as any as S.Schema<GetMeetingRequest>,
  output: __S(112, __c14, 0) as any as S.Schema<GetMeetingResponse>,
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
}));

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
  input: __S(160, __c20, 0) as any as S.Schema<ListAttendeesRequest>,
  output: __S(161, __c20, 1) as any as S.Schema<ListAttendeesResponse>,
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
  input: __S(168, __c21, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(169, __c21, 1) as any as S.Schema<ListTagsForResourceResponse>,
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
}));

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
 * may be subject to federal and state laws or regulations regarding the recording or interception of electronic communications. It is your and your end users'
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
  input: __S(179, __c22, 3) as any as S.Schema<StartMeetingTranscriptionRequest>,
  output: __S(48, __c6, 0) as any as S.Schema<StartMeetingTranscriptionResponse>,
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
}));

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
 * may be subject to federal and state laws or regulations regarding the recording or interception of electronic communications. It is your and your end users'
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
  input: __S(184, __c23, 0) as any as S.Schema<StopMeetingTranscriptionRequest>,
  output: __S(48, __c6, 0) as any as S.Schema<StopMeetingTranscriptionResponse>,
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
}));

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
  input: __S(192, __c24, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(48, __c6, 0) as any as S.Schema<TagResourceResponse>,
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
}));

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
  input: __S(200, __c25, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(48, __c6, 0) as any as S.Schema<UntagResourceResponse>,
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
}));

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
  input: __S(208, __c26, 0) as any as S.Schema<UpdateAttendeeCapabilitiesRequest>,
  output: __S(64, __c8, 0) as any as S.Schema<UpdateAttendeeCapabilitiesResponse>,
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
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MeetingId: S.String.pipe(T.HttpLabel("MeetingId")),
          Attendees: __S(25, __c3, 1),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/meetings/{MeetingId}/attendees?operation=batch-create",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "BatchCreateAttendeeRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Attendees: S.optional(__S(32, __c4, 0)), Errors: S.optional(__S(27, __c3, 3)) }),
      ).annotate({ identifier: "BatchCreateAttendeeResponse" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Audio: S.String, Video: S.String, Content: S.String }),
      ).annotate({ identifier: "AttendeeCapabilities" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ExternalUserId: S.optional(SensitiveString),
          AttendeeId: S.optional(S.String),
          JoinToken: S.optional(SensitiveString),
          Capabilities: S.optional(__S(8, __c1, 0)),
        }),
      ).annotate({ identifier: "Attendee" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ExternalUserId: SensitiveString, Capabilities: S.optional(__S(8, __c1, 0)) }),
      ).annotate({ identifier: "CreateAttendeeRequestItem" });
    case 1:
      return S.Array(__S(24, __c3, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          ExternalUserId: S.optional(SensitiveString),
          ErrorCode: S.optional(S.String),
          ErrorMessage: S.optional(S.String),
        }),
      ).annotate({ identifier: "CreateAttendeeError" });
    case 3:
      return S.Array(__S(26, __c3, 2));
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(16, __c2, 0));
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ AttendeeId: S.String })).annotate({
        identifier: "AttendeeIdItem",
      });
    case 1:
      return S.Array(__S(40, __c5, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          MeetingId: S.String.pipe(T.HttpLabel("MeetingId")),
          ExcludedAttendeeIds: __S(41, __c5, 1),
          Capabilities: __S(8, __c1, 0),
        }).pipe(
          T.all(
            T.Http({
              method: "PUT",
              uri: "/meetings/{MeetingId}/attendees/capabilities?operation=batch-update-except",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "BatchUpdateAttendeeCapabilitiesExceptRequest" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({
        identifier: "BatchUpdateAttendeeCapabilitiesExceptResponse",
      });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MeetingId: S.String.pipe(T.HttpLabel("MeetingId")),
          ExternalUserId: SensitiveString,
          Capabilities: S.optional(__S(8, __c1, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/meetings/{MeetingId}/attendees" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateAttendeeRequest" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Attendee: S.optional(__S(16, __c2, 0)) })).annotate({
        identifier: "CreateAttendeeResponse",
      });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClientRequestToken: SensitiveString.pipe(T.IdempotencyToken()),
          MediaRegion: S.String,
          MeetingHostId: S.optional(SensitiveString),
          ExternalMeetingId: SensitiveString,
          NotificationsConfiguration: S.optional(__S(80, __c10, 0)),
          MeetingFeatures: S.optional(__S(91, __c11, 3)),
          PrimaryMeetingId: S.optional(S.String),
          TenantIds: S.optional(__S(96, __c12, 0)),
          Tags: S.optional(__S(105, __c13, 1)),
          MediaPlacementNetworkType: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/meetings" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateMeetingRequest" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          LambdaFunctionArn: S.optional(SensitiveString),
          SnsTopicArn: S.optional(SensitiveString),
          SqsQueueArn: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "NotificationsConfiguration" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ EchoReduction: S.optional(S.String) })).annotate({
        identifier: "AudioFeatures",
      });
    case 1:
      return S.suspend(() => S.Struct({ MaxResolution: S.optional(S.String) })).annotate({
        identifier: "VideoFeatures",
      });
    case 2:
      return S.suspend(() => S.Struct({ MaxCount: S.optional(S.Number) })).annotate({
        identifier: "AttendeeFeatures",
      });
    case 3:
      return S.suspend(() =>
        S.Struct({
          Audio: S.optional(__S(88, __c11, 0)),
          Video: S.optional(__S(89, __c11, 1)),
          Content: S.optional(__S(89, __c11, 1)),
          Attendee: S.optional(__S(90, __c11, 2)),
        }),
      ).annotate({ identifier: "MeetingFeaturesConfiguration" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          AudioHostUrl: S.optional(S.String),
          AudioFallbackUrl: S.optional(S.String),
          SignalingUrl: S.optional(S.String),
          TurnControlUrl: S.optional(S.String),
          ScreenDataUrl: S.optional(S.String),
          ScreenViewingUrl: S.optional(S.String),
          ScreenSharingUrl: S.optional(S.String),
          EventIngestionUrl: S.optional(S.String),
        }),
      ).annotate({ identifier: "MediaPlacement" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          MeetingId: S.optional(S.String),
          MeetingHostId: S.optional(SensitiveString),
          ExternalMeetingId: S.optional(SensitiveString),
          MediaRegion: S.optional(S.String),
          MediaPlacement: S.optional(__S(92, __c11, 4)),
          MeetingFeatures: S.optional(__S(91, __c11, 3)),
          PrimaryMeetingId: S.optional(S.String),
          TenantIds: S.optional(__S(96, __c12, 0)),
          MeetingArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "Meeting" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Key: S.String, Value: S.String })).annotate({
        identifier: "Tag",
      });
    case 1:
      return S.Array(__S(104, __c13, 0));
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Meeting: S.optional(__S(93, __c11, 5)) })).annotate({
        identifier: "CreateMeetingResponse",
      });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClientRequestToken: SensitiveString.pipe(T.IdempotencyToken()),
          MediaRegion: S.String,
          MeetingHostId: S.optional(SensitiveString),
          ExternalMeetingId: SensitiveString,
          MeetingFeatures: S.optional(__S(91, __c11, 3)),
          NotificationsConfiguration: S.optional(__S(80, __c10, 0)),
          Attendees: __S(25, __c3, 1),
          PrimaryMeetingId: S.optional(S.String),
          TenantIds: S.optional(__S(96, __c12, 0)),
          Tags: S.optional(__S(105, __c13, 1)),
          MediaPlacementNetworkType: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/meetings?operation=create-attendees" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateMeetingWithAttendeesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Meeting: S.optional(__S(93, __c11, 5)),
          Attendees: S.optional(__S(32, __c4, 0)),
          Errors: S.optional(__S(27, __c3, 3)),
        }),
      ).annotate({ identifier: "CreateMeetingWithAttendeesResponse" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MeetingId: S.String.pipe(T.HttpLabel("MeetingId")),
          AttendeeId: S.String.pipe(T.HttpLabel("AttendeeId")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/meetings/{MeetingId}/attendees/{AttendeeId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteAttendeeRequest" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ MeetingId: S.String.pipe(T.HttpLabel("MeetingId")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/meetings/{MeetingId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteMeetingRequest" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MeetingId: S.String.pipe(T.HttpLabel("MeetingId")),
          AttendeeId: S.String.pipe(T.HttpLabel("AttendeeId")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/meetings/{MeetingId}/attendees/{AttendeeId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetAttendeeRequest" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ MeetingId: S.String.pipe(T.HttpLabel("MeetingId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/meetings/{MeetingId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetMeetingRequest" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MeetingId: S.String.pipe(T.HttpLabel("MeetingId")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("next-token")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("max-results")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/meetings/{MeetingId}/attendees" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListAttendeesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Attendees: S.optional(__S(32, __c4, 0)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListAttendeesResponse" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceARN: S.String.pipe(T.HttpQuery("arn")) }).pipe(
          T.all(T.Http({ method: "GET", uri: "/tags" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListTagsForResourceRequest" });
    case 1:
      return S.suspend(() => S.Struct({ Tags: S.optional(__S(105, __c13, 1)) })).annotate({
        identifier: "ListTagsForResourceResponse",
      });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          LanguageCode: S.optional(S.String),
          VocabularyFilterMethod: S.optional(S.String),
          VocabularyFilterName: S.optional(S.String),
          VocabularyName: S.optional(S.String),
          Region: S.optional(S.String),
          EnablePartialResultsStabilization: S.optional(S.Boolean),
          PartialResultsStability: S.optional(S.String),
          ContentIdentificationType: S.optional(S.String),
          ContentRedactionType: S.optional(S.String),
          PiiEntityTypes: S.optional(S.String),
          LanguageModelName: S.optional(S.String),
          IdentifyLanguage: S.optional(S.Boolean),
          LanguageOptions: S.optional(S.String),
          PreferredLanguage: S.optional(S.String),
          VocabularyNames: S.optional(S.String),
          VocabularyFilterNames: S.optional(S.String),
        }),
      ).annotate({ identifier: "EngineTranscribeSettings" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          LanguageCode: S.String,
          Specialty: S.String,
          Type: S.String,
          VocabularyName: S.optional(S.String),
          Region: S.optional(S.String),
          ContentIdentificationType: S.optional(S.String),
        }),
      ).annotate({ identifier: "EngineTranscribeMedicalSettings" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          EngineTranscribeSettings: S.optional(__S(176, __c22, 0)),
          EngineTranscribeMedicalSettings: S.optional(__S(177, __c22, 1)),
        }),
      ).annotate({ identifier: "TranscriptionConfiguration" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          MeetingId: S.String.pipe(T.HttpLabel("MeetingId")),
          TranscriptionConfiguration: __S(178, __c22, 2),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/meetings/{MeetingId}/transcription?operation=start" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartMeetingTranscriptionRequest" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ MeetingId: S.String.pipe(T.HttpLabel("MeetingId")) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/meetings/{MeetingId}/transcription?operation=stop" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StopMeetingTranscriptionRequest" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceARN: S.String, Tags: __S(105, __c13, 1) }).pipe(
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
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceARN: S.String, TagKeys: __S(96, __c12, 0) }).pipe(
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
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MeetingId: S.String.pipe(T.HttpLabel("MeetingId")),
          AttendeeId: S.String.pipe(T.HttpLabel("AttendeeId")),
          Capabilities: __S(8, __c1, 0),
        }).pipe(
          T.all(
            T.Http({
              method: "PUT",
              uri: "/meetings/{MeetingId}/attendees/{AttendeeId}/capabilities",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateAttendeeCapabilitiesRequest" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
