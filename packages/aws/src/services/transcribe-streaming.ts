import * as API from "@distilled.cloud/core/api";
import * as S from "@distilled.cloud/core/schema-lite";
import * as __L from "@distilled.cloud/core/schema-lite";
import type * as HttpClient from "effect/http/HttpClient";
import type * as stream from "effect/Stream";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import { AwsProtocol } from "../protocol.ts";
import { Retry } from "../retry.ts";
import * as T from "../traits.ts";
// Schema table, filled on first reach (see __S at the end).
const __s: any[] = [];
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "Transcribe Streaming",
  serviceShapeName: "Transcribe",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "transcribe" });
const ver = /*@__PURE__*/ T.ServiceVersion("2017-10-26");
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
              `https://transcribestreaming-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://transcribestreaming-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://transcribestreaming.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(
          `https://transcribestreaming.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://transcribestreaming.{R}.{D}","properties":{},"headers":{}}');

export class BadRequestException
  extends /*@__PURE__*/ S.TaggedError<BadRequestException>()(
    "BadRequestException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalFailureException
  extends /*@__PURE__*/ S.TaggedError<InternalFailureException>()(
    "InternalFailureException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError) {}
export class LimitExceededException
  extends /*@__PURE__*/ S.TaggedError<LimitExceededException>()(
    "LimitExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceUnavailableException
  extends /*@__PURE__*/ S.TaggedError<ServiceUnavailableException>()(
    "ServiceUnavailableException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(503),
  ).pipe(C.withServerError) {}
export type SessionId = string;
export interface GetMedicalScribeStreamRequest {
  SessionId: string;
}
export type MedicalScribeLanguageCode = "en-US" | (string & {});
export type MedicalScribeMediaSampleRateHertz = number;
export type MedicalScribeMediaEncoding = "pcm" | "ogg-opus" | "flac" | (string & {});
export type VocabularyName = string;
export type VocabularyFilterName = string;
export type MedicalScribeVocabularyFilterMethod = "remove" | "mask" | "tag" | (string & {});
export type IamRoleArn = string;
export type MedicalScribeChannelId = number;
export type MedicalScribeParticipantRole = "PATIENT" | "CLINICIAN" | (string & {});
export interface MedicalScribeChannelDefinition {
  ChannelId: number;
  ParticipantRole: MedicalScribeParticipantRole;
}
export type MedicalScribeChannelDefinitions = MedicalScribeChannelDefinition[];
export type NonEmptyString = string;
export type KMSEncryptionContextMap = { [key: string]: string | undefined };
export type KMSKeyId = string;
export interface MedicalScribeEncryptionSettings {
  KmsEncryptionContext?: { [key: string]: string | undefined };
  KmsKeyId: string;
}
export type MedicalScribeStreamStatus =
  | "IN_PROGRESS"
  | "PAUSED"
  | "FAILED"
  | "COMPLETED"
  | (string & {});
export type BucketName = string;
export type MedicalScribeNoteTemplate =
  | "HISTORY_AND_PHYSICAL"
  | "GIRPP"
  | "DAP"
  | "SIRP"
  | "BIRP"
  | "BEHAVIORAL_SOAP"
  | "PHYSICAL_SOAP"
  | (string & {});
export interface ClinicalNoteGenerationSettings {
  OutputBucketName: string;
  NoteTemplate?: MedicalScribeNoteTemplate;
}
export interface MedicalScribePostStreamAnalyticsSettings {
  ClinicalNoteGenerationSettings: ClinicalNoteGenerationSettings;
}
export type Uri = string;
export type ClinicalNoteGenerationStatus = "IN_PROGRESS" | "FAILED" | "COMPLETED" | (string & {});
export interface ClinicalNoteGenerationResult {
  ClinicalNoteOutputLocation?: string;
  TranscriptOutputLocation?: string;
  Status?: ClinicalNoteGenerationStatus;
  FailureReason?: string;
}
export interface MedicalScribePostStreamAnalyticsResult {
  ClinicalNoteGenerationResult?: ClinicalNoteGenerationResult;
}
export interface MedicalScribeStreamDetails {
  SessionId?: string;
  StreamCreatedAt?: Date;
  StreamEndedAt?: Date;
  LanguageCode?: MedicalScribeLanguageCode;
  MediaSampleRateHertz?: number;
  MediaEncoding?: MedicalScribeMediaEncoding;
  VocabularyName?: string;
  VocabularyFilterName?: string;
  VocabularyFilterMethod?: MedicalScribeVocabularyFilterMethod;
  ResourceAccessRoleArn?: string;
  ChannelDefinitions?: MedicalScribeChannelDefinition[];
  EncryptionSettings?: MedicalScribeEncryptionSettings;
  StreamStatus?: MedicalScribeStreamStatus;
  PostStreamAnalyticsSettings?: MedicalScribePostStreamAnalyticsSettings;
  PostStreamAnalyticsResult?: MedicalScribePostStreamAnalyticsResult;
  MedicalScribeContextProvided?: boolean;
}
export interface GetMedicalScribeStreamResponse {
  MedicalScribeStreamDetails?: MedicalScribeStreamDetails;
}
export type CallAnalyticsLanguageCode =
  | "en-US"
  | "en-GB"
  | "es-US"
  | "fr-CA"
  | "fr-FR"
  | "en-AU"
  | "it-IT"
  | "de-DE"
  | "pt-BR"
  | (string & {});
export type MediaSampleRateHertz = number;
export type MediaEncoding =
  | "pcm"
  | "ogg-opus"
  | "flac"
  | "g711-alaw"
  | "g711-ulaw"
  | "g729"
  | (string & {});
export type AudioChunk = Uint8Array;
export interface AudioEvent {
  AudioChunk?: Uint8Array;
}
export type ChannelId = number;
export type ParticipantRole = "AGENT" | "CUSTOMER" | (string & {});
export interface ChannelDefinition {
  ChannelId: number;
  ParticipantRole: ParticipantRole;
}
export type ChannelDefinitions = ChannelDefinition[];
export type ContentRedactionOutput = "redacted" | "redacted_and_unredacted" | (string & {});
export interface PostCallAnalyticsSettings {
  OutputLocation: string;
  DataAccessRoleArn: string;
  ContentRedactionOutput?: ContentRedactionOutput;
  OutputEncryptionKMSKeyId?: string;
}
export interface ConfigurationEvent {
  ChannelDefinitions?: ChannelDefinition[];
  PostCallAnalyticsSettings?: PostCallAnalyticsSettings;
}
export type AudioStream =
  | { AudioEvent: AudioEvent; ConfigurationEvent?: never }
  | { AudioEvent?: never; ConfigurationEvent: ConfigurationEvent };
export type VocabularyFilterMethod = "remove" | "mask" | "tag" | (string & {});
export type ModelName = string;
export type LanguageOptions = string;
export type VocabularyNames = string;
export type VocabularyFilterNames = string;
export type PartialResultsStability = "high" | "medium" | "low" | (string & {});
export type ContentIdentificationType = "PII" | (string & {});
export type ContentRedactionType = "PII" | (string & {});
export type PiiEntityTypes = string;
export interface StartCallAnalyticsStreamTranscriptionRequest {
  LanguageCode?: CallAnalyticsLanguageCode;
  MediaSampleRateHertz: number;
  MediaEncoding: MediaEncoding;
  VocabularyName?: string;
  SessionId?: string;
  AudioStream: stream.Stream<AudioStream, Error, never>;
  VocabularyFilterName?: string;
  VocabularyFilterMethod?: VocabularyFilterMethod;
  LanguageModelName?: string;
  IdentifyLanguage?: boolean;
  LanguageOptions?: string;
  PreferredLanguage?: CallAnalyticsLanguageCode;
  VocabularyNames?: string;
  VocabularyFilterNames?: string;
  EnablePartialResultsStabilization?: boolean;
  PartialResultsStability?: PartialResultsStability;
  ContentIdentificationType?: ContentIdentificationType;
  ContentRedactionType?: ContentRedactionType;
  PiiEntityTypes?: string;
}
export type RequestId = string;
export type ItemType = "pronunciation" | "punctuation" | (string & {});
export type Confidence = number;
export type Stable = boolean;
export interface CallAnalyticsItem {
  BeginOffsetMillis?: number;
  EndOffsetMillis?: number;
  Type?: ItemType;
  Content?: string;
  Confidence?: number;
  VocabularyFilterMatch?: boolean;
  Stable?: boolean;
}
export type CallAnalyticsItemList = CallAnalyticsItem[];
export interface CallAnalyticsEntity {
  BeginOffsetMillis?: number;
  EndOffsetMillis?: number;
  Category?: string;
  Type?: string;
  Content?: string;
  Confidence?: number;
}
export type CallAnalyticsEntityList = CallAnalyticsEntity[];
export type Sentiment = "POSITIVE" | "NEGATIVE" | "MIXED" | "NEUTRAL" | (string & {});
export interface CharacterOffsets {
  Begin?: number;
  End?: number;
}
export interface IssueDetected {
  CharacterOffsets?: CharacterOffsets;
}
export type IssuesDetected = IssueDetected[];
export interface CallAnalyticsLanguageWithScore {
  LanguageCode?: CallAnalyticsLanguageCode;
  Score?: number;
}
export type CallAnalyticsLanguageIdentification = CallAnalyticsLanguageWithScore[];
export interface UtteranceEvent {
  UtteranceId?: string;
  IsPartial?: boolean;
  ParticipantRole?: ParticipantRole;
  BeginOffsetMillis?: number;
  EndOffsetMillis?: number;
  Transcript?: string;
  Items?: CallAnalyticsItem[];
  Entities?: CallAnalyticsEntity[];
  Sentiment?: Sentiment;
  IssuesDetected?: IssueDetected[];
  LanguageCode?: CallAnalyticsLanguageCode;
  LanguageIdentification?: CallAnalyticsLanguageWithScore[];
}
export type StringList = string[];
export interface TimestampRange {
  BeginOffsetMillis?: number;
  EndOffsetMillis?: number;
}
export type TimestampRanges = TimestampRange[];
export interface PointsOfInterest {
  TimestampRanges?: TimestampRange[];
}
export type MatchedCategoryDetails = { [key: string]: PointsOfInterest | undefined };
export interface CategoryEvent {
  MatchedCategories?: string[];
  MatchedDetails?: { [key: string]: PointsOfInterest | undefined };
}
export type CallAnalyticsTranscriptResultStream =
  | {
      UtteranceEvent: UtteranceEvent;
      CategoryEvent?: never;
      BadRequestException?: never;
      LimitExceededException?: never;
      InternalFailureException?: never;
      ConflictException?: never;
      ServiceUnavailableException?: never;
    }
  | {
      UtteranceEvent?: never;
      CategoryEvent: CategoryEvent;
      BadRequestException?: never;
      LimitExceededException?: never;
      InternalFailureException?: never;
      ConflictException?: never;
      ServiceUnavailableException?: never;
    }
  | {
      UtteranceEvent?: never;
      CategoryEvent?: never;
      BadRequestException: BadRequestException;
      LimitExceededException?: never;
      InternalFailureException?: never;
      ConflictException?: never;
      ServiceUnavailableException?: never;
    }
  | {
      UtteranceEvent?: never;
      CategoryEvent?: never;
      BadRequestException?: never;
      LimitExceededException: LimitExceededException;
      InternalFailureException?: never;
      ConflictException?: never;
      ServiceUnavailableException?: never;
    }
  | {
      UtteranceEvent?: never;
      CategoryEvent?: never;
      BadRequestException?: never;
      LimitExceededException?: never;
      InternalFailureException: InternalFailureException;
      ConflictException?: never;
      ServiceUnavailableException?: never;
    }
  | {
      UtteranceEvent?: never;
      CategoryEvent?: never;
      BadRequestException?: never;
      LimitExceededException?: never;
      InternalFailureException?: never;
      ConflictException: ConflictException;
      ServiceUnavailableException?: never;
    }
  | {
      UtteranceEvent?: never;
      CategoryEvent?: never;
      BadRequestException?: never;
      LimitExceededException?: never;
      InternalFailureException?: never;
      ConflictException?: never;
      ServiceUnavailableException: ServiceUnavailableException;
    };
export interface StartCallAnalyticsStreamTranscriptionResponse {
  RequestId?: string;
  LanguageCode?: CallAnalyticsLanguageCode;
  MediaSampleRateHertz?: number;
  MediaEncoding?: MediaEncoding;
  VocabularyName?: string;
  SessionId?: string;
  CallAnalyticsTranscriptResultStream?: stream.Stream<
    CallAnalyticsTranscriptResultStream,
    Error,
    never
  >;
  VocabularyFilterName?: string;
  VocabularyFilterMethod?: VocabularyFilterMethod;
  LanguageModelName?: string;
  IdentifyLanguage?: boolean;
  LanguageOptions?: string;
  PreferredLanguage?: CallAnalyticsLanguageCode;
  VocabularyNames?: string;
  VocabularyFilterNames?: string;
  EnablePartialResultsStabilization?: boolean;
  PartialResultsStability?: PartialResultsStability;
  ContentIdentificationType?: ContentIdentificationType;
  ContentRedactionType?: ContentRedactionType;
  PiiEntityTypes?: string;
}
export interface MedicalScribeAudioEvent {
  AudioChunk: Uint8Array;
}
export type MedicalScribeSessionControlEventType = "END_OF_SESSION" | (string & {});
export interface MedicalScribeSessionControlEvent {
  Type: MedicalScribeSessionControlEventType;
}
export type Pronouns = "HE_HIM" | "SHE_HER" | "THEY_THEM" | (string & {});
export interface MedicalScribePatientContext {
  Pronouns?: Pronouns;
}
export interface MedicalScribeContext {
  PatientContext?: MedicalScribePatientContext;
}
export interface MedicalScribeConfigurationEvent {
  VocabularyName?: string;
  VocabularyFilterName?: string;
  VocabularyFilterMethod?: MedicalScribeVocabularyFilterMethod;
  ResourceAccessRoleArn: string;
  ChannelDefinitions?: MedicalScribeChannelDefinition[];
  EncryptionSettings?: MedicalScribeEncryptionSettings;
  PostStreamAnalyticsSettings: MedicalScribePostStreamAnalyticsSettings;
  MedicalScribeContext?: MedicalScribeContext;
}
export type MedicalScribeInputStream =
  | { AudioEvent: MedicalScribeAudioEvent; SessionControlEvent?: never; ConfigurationEvent?: never }
  | {
      AudioEvent?: never;
      SessionControlEvent: MedicalScribeSessionControlEvent;
      ConfigurationEvent?: never;
    }
  | {
      AudioEvent?: never;
      SessionControlEvent?: never;
      ConfigurationEvent: MedicalScribeConfigurationEvent;
    };
export interface StartMedicalScribeStreamRequest {
  SessionId?: string;
  LanguageCode: MedicalScribeLanguageCode;
  MediaSampleRateHertz: number;
  MediaEncoding: MedicalScribeMediaEncoding;
  InputStream: stream.Stream<MedicalScribeInputStream, Error, never>;
}
export type MedicalScribeTranscriptItemType = "pronunciation" | "punctuation" | (string & {});
export interface MedicalScribeTranscriptItem {
  BeginAudioTime?: number;
  EndAudioTime?: number;
  Type?: MedicalScribeTranscriptItemType;
  Confidence?: number;
  Content?: string;
  VocabularyFilterMatch?: boolean;
}
export type MedicalScribeTranscriptItemList = MedicalScribeTranscriptItem[];
export interface MedicalScribeTranscriptSegment {
  SegmentId?: string;
  BeginAudioTime?: number;
  EndAudioTime?: number;
  Content?: string;
  Items?: MedicalScribeTranscriptItem[];
  IsPartial?: boolean;
  ChannelId?: string;
}
export interface MedicalScribeTranscriptEvent {
  TranscriptSegment?: MedicalScribeTranscriptSegment;
}
export type MedicalScribeResultStream =
  | {
      TranscriptEvent: MedicalScribeTranscriptEvent;
      BadRequestException?: never;
      LimitExceededException?: never;
      InternalFailureException?: never;
      ConflictException?: never;
      ServiceUnavailableException?: never;
    }
  | {
      TranscriptEvent?: never;
      BadRequestException: BadRequestException;
      LimitExceededException?: never;
      InternalFailureException?: never;
      ConflictException?: never;
      ServiceUnavailableException?: never;
    }
  | {
      TranscriptEvent?: never;
      BadRequestException?: never;
      LimitExceededException: LimitExceededException;
      InternalFailureException?: never;
      ConflictException?: never;
      ServiceUnavailableException?: never;
    }
  | {
      TranscriptEvent?: never;
      BadRequestException?: never;
      LimitExceededException?: never;
      InternalFailureException: InternalFailureException;
      ConflictException?: never;
      ServiceUnavailableException?: never;
    }
  | {
      TranscriptEvent?: never;
      BadRequestException?: never;
      LimitExceededException?: never;
      InternalFailureException?: never;
      ConflictException: ConflictException;
      ServiceUnavailableException?: never;
    }
  | {
      TranscriptEvent?: never;
      BadRequestException?: never;
      LimitExceededException?: never;
      InternalFailureException?: never;
      ConflictException?: never;
      ServiceUnavailableException: ServiceUnavailableException;
    };
export interface StartMedicalScribeStreamResponse {
  SessionId?: string;
  RequestId?: string;
  LanguageCode?: MedicalScribeLanguageCode;
  MediaSampleRateHertz?: number;
  MediaEncoding?: MedicalScribeMediaEncoding;
  ResultStream?: stream.Stream<MedicalScribeResultStream, Error, never>;
}
export type LanguageCode =
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
  | "es-ES"
  | "ar-SA"
  | "pt-PT"
  | "ca-ES"
  | "ar-AE"
  | "hi-IN"
  | "zh-HK"
  | "nl-NL"
  | "no-NO"
  | "sv-SE"
  | "pl-PL"
  | "fi-FI"
  | "zh-TW"
  | "en-IN"
  | "en-IE"
  | "en-NZ"
  | "en-AB"
  | "en-ZA"
  | "en-WL"
  | "de-CH"
  | "af-ZA"
  | "eu-ES"
  | "hr-HR"
  | "cs-CZ"
  | "da-DK"
  | "fa-IR"
  | "gl-ES"
  | "el-GR"
  | "he-IL"
  | "id-ID"
  | "lv-LV"
  | "ms-MY"
  | "ro-RO"
  | "ru-RU"
  | "sr-RS"
  | "sk-SK"
  | "so-SO"
  | "tl-PH"
  | "uk-UA"
  | "vi-VN"
  | "zu-ZA"
  | "am-ET"
  | "be-BY"
  | "bg-BG"
  | "bn-IN"
  | "bs-BA"
  | "ckb-IQ"
  | "ckb-IR"
  | "cy-WL"
  | "es-MX"
  | "et-ET"
  | "fa-AF"
  | "gu-IN"
  | "ht-HT"
  | "hu-HU"
  | "hy-AM"
  | "is-IS"
  | "jv-ID"
  | "ka-GE"
  | "kab-DZ"
  | "kk-KZ"
  | "km-KH"
  | "kn-IN"
  | "lg-IN"
  | "lt-LT"
  | "mk-MK"
  | "ml-IN"
  | "mr-IN"
  | "my-MM"
  | "ne-NP"
  | "or-IN"
  | "pa-IN"
  | "ps-AF"
  | "si-LK"
  | "sl-SI"
  | "sq-AL"
  | "su-ID"
  | "sw-BI"
  | "sw-KE"
  | "sw-RW"
  | "sw-TZ"
  | "sw-UG"
  | "ta-IN"
  | "te-IN"
  | "tr-TR"
  | "uz-UZ"
  | (string & {});
export type Specialty =
  | "PRIMARYCARE"
  | "CARDIOLOGY"
  | "NEUROLOGY"
  | "ONCOLOGY"
  | "RADIOLOGY"
  | "UROLOGY"
  | (string & {});
export type Type = "CONVERSATION" | "DICTATION" | (string & {});
export type NumberOfChannels = number;
export type MedicalContentIdentificationType = "PHI" | (string & {});
export interface StartMedicalStreamTranscriptionRequest {
  LanguageCode: LanguageCode;
  MediaSampleRateHertz: number;
  MediaEncoding: MediaEncoding;
  VocabularyName?: string;
  Specialty: Specialty;
  Type: Type;
  ShowSpeakerLabel?: boolean;
  SessionId?: string;
  AudioStream: stream.Stream<AudioStream, Error, never>;
  EnableChannelIdentification?: boolean;
  NumberOfChannels?: number;
  ContentIdentificationType?: MedicalContentIdentificationType;
}
export interface MedicalItem {
  StartTime?: number;
  EndTime?: number;
  Type?: ItemType;
  Content?: string;
  Confidence?: number;
  Speaker?: string;
}
export type MedicalItemList = MedicalItem[];
export interface MedicalEntity {
  StartTime?: number;
  EndTime?: number;
  Category?: string;
  Content?: string;
  Confidence?: number;
}
export type MedicalEntityList = MedicalEntity[];
export interface MedicalAlternative {
  Transcript?: string;
  Items?: MedicalItem[];
  Entities?: MedicalEntity[];
}
export type MedicalAlternativeList = MedicalAlternative[];
export interface MedicalResult {
  ResultId?: string;
  StartTime?: number;
  EndTime?: number;
  IsPartial?: boolean;
  Alternatives?: MedicalAlternative[];
  ChannelId?: string;
}
export type MedicalResultList = MedicalResult[];
export interface MedicalTranscript {
  Results?: MedicalResult[];
}
export interface MedicalTranscriptEvent {
  Transcript?: MedicalTranscript;
}
export type MedicalTranscriptResultStream =
  | {
      TranscriptEvent: MedicalTranscriptEvent;
      BadRequestException?: never;
      LimitExceededException?: never;
      InternalFailureException?: never;
      ConflictException?: never;
      ServiceUnavailableException?: never;
    }
  | {
      TranscriptEvent?: never;
      BadRequestException: BadRequestException;
      LimitExceededException?: never;
      InternalFailureException?: never;
      ConflictException?: never;
      ServiceUnavailableException?: never;
    }
  | {
      TranscriptEvent?: never;
      BadRequestException?: never;
      LimitExceededException: LimitExceededException;
      InternalFailureException?: never;
      ConflictException?: never;
      ServiceUnavailableException?: never;
    }
  | {
      TranscriptEvent?: never;
      BadRequestException?: never;
      LimitExceededException?: never;
      InternalFailureException: InternalFailureException;
      ConflictException?: never;
      ServiceUnavailableException?: never;
    }
  | {
      TranscriptEvent?: never;
      BadRequestException?: never;
      LimitExceededException?: never;
      InternalFailureException?: never;
      ConflictException: ConflictException;
      ServiceUnavailableException?: never;
    }
  | {
      TranscriptEvent?: never;
      BadRequestException?: never;
      LimitExceededException?: never;
      InternalFailureException?: never;
      ConflictException?: never;
      ServiceUnavailableException: ServiceUnavailableException;
    };
export interface StartMedicalStreamTranscriptionResponse {
  RequestId?: string;
  LanguageCode?: LanguageCode;
  MediaSampleRateHertz?: number;
  MediaEncoding?: MediaEncoding;
  VocabularyName?: string;
  Specialty?: Specialty;
  Type?: Type;
  ShowSpeakerLabel?: boolean;
  SessionId?: string;
  TranscriptResultStream?: stream.Stream<MedicalTranscriptResultStream, Error, never>;
  EnableChannelIdentification?: boolean;
  NumberOfChannels?: number;
  ContentIdentificationType?: MedicalContentIdentificationType;
}
export type SessionResumeWindow = number;
export type TranscriptFormat = "spoken" | "written" | (string & {});
export interface StartStreamTranscriptionRequest {
  LanguageCode?: LanguageCode;
  MediaSampleRateHertz: number;
  MediaEncoding: MediaEncoding;
  VocabularyName?: string;
  SessionId?: string;
  AudioStream: stream.Stream<AudioStream, Error, never>;
  VocabularyFilterName?: string;
  VocabularyFilterMethod?: VocabularyFilterMethod;
  ShowSpeakerLabel?: boolean;
  EnableChannelIdentification?: boolean;
  NumberOfChannels?: number;
  EnablePartialResultsStabilization?: boolean;
  PartialResultsStability?: PartialResultsStability;
  ContentIdentificationType?: ContentIdentificationType;
  ContentRedactionType?: ContentRedactionType;
  PiiEntityTypes?: string;
  LanguageModelName?: string;
  IdentifyLanguage?: boolean;
  LanguageOptions?: string;
  PreferredLanguage?: LanguageCode;
  IdentifyMultipleLanguages?: boolean;
  VocabularyNames?: string;
  VocabularyFilterNames?: string;
  SessionResumeWindow?: number;
  TranscriptFormat?: TranscriptFormat;
}
export interface Item {
  StartTime?: number;
  EndTime?: number;
  Type?: ItemType;
  Content?: string;
  VocabularyFilterMatch?: boolean;
  Speaker?: string;
  Confidence?: number;
  Stable?: boolean;
}
export type ItemList = Item[];
export interface Entity {
  StartTime?: number;
  EndTime?: number;
  Category?: string;
  Type?: string;
  Content?: string;
  Confidence?: number;
}
export type EntityList = Entity[];
export interface Alternative {
  Transcript?: string;
  Items?: Item[];
  Entities?: Entity[];
}
export type AlternativeList = Alternative[];
export interface LanguageWithScore {
  LanguageCode?: LanguageCode;
  Score?: number;
}
export type LanguageIdentification = LanguageWithScore[];
export interface Result {
  ResultId?: string;
  StartTime?: number;
  EndTime?: number;
  IsPartial?: boolean;
  Alternatives?: Alternative[];
  ChannelId?: string;
  LanguageCode?: LanguageCode;
  LanguageIdentification?: LanguageWithScore[];
}
export type ResultList = Result[];
export interface Transcript {
  Results?: Result[];
}
export interface TranscriptEvent {
  Transcript?: Transcript;
}
export type TranscriptResultStream =
  | {
      TranscriptEvent: TranscriptEvent;
      BadRequestException?: never;
      LimitExceededException?: never;
      InternalFailureException?: never;
      ConflictException?: never;
      ServiceUnavailableException?: never;
    }
  | {
      TranscriptEvent?: never;
      BadRequestException: BadRequestException;
      LimitExceededException?: never;
      InternalFailureException?: never;
      ConflictException?: never;
      ServiceUnavailableException?: never;
    }
  | {
      TranscriptEvent?: never;
      BadRequestException?: never;
      LimitExceededException: LimitExceededException;
      InternalFailureException?: never;
      ConflictException?: never;
      ServiceUnavailableException?: never;
    }
  | {
      TranscriptEvent?: never;
      BadRequestException?: never;
      LimitExceededException?: never;
      InternalFailureException: InternalFailureException;
      ConflictException?: never;
      ServiceUnavailableException?: never;
    }
  | {
      TranscriptEvent?: never;
      BadRequestException?: never;
      LimitExceededException?: never;
      InternalFailureException?: never;
      ConflictException: ConflictException;
      ServiceUnavailableException?: never;
    }
  | {
      TranscriptEvent?: never;
      BadRequestException?: never;
      LimitExceededException?: never;
      InternalFailureException?: never;
      ConflictException?: never;
      ServiceUnavailableException: ServiceUnavailableException;
    };
export interface StartStreamTranscriptionResponse {
  RequestId?: string;
  LanguageCode?: LanguageCode;
  MediaSampleRateHertz?: number;
  MediaEncoding?: MediaEncoding;
  VocabularyName?: string;
  SessionId?: string;
  TranscriptResultStream?: stream.Stream<TranscriptResultStream, Error, never>;
  VocabularyFilterName?: string;
  VocabularyFilterMethod?: VocabularyFilterMethod;
  ShowSpeakerLabel?: boolean;
  EnableChannelIdentification?: boolean;
  NumberOfChannels?: number;
  EnablePartialResultsStabilization?: boolean;
  PartialResultsStability?: PartialResultsStability;
  ContentIdentificationType?: ContentIdentificationType;
  ContentRedactionType?: ContentRedactionType;
  PiiEntityTypes?: string;
  LanguageModelName?: string;
  IdentifyLanguage?: boolean;
  LanguageOptions?: string;
  PreferredLanguage?: LanguageCode;
  IdentifyMultipleLanguages?: boolean;
  VocabularyNames?: string;
  VocabularyFilterNames?: string;
  SessionResumeWindow?: number;
  TranscriptFormat?: TranscriptFormat;
}
export type GetMedicalScribeStreamError =
  | BadRequestException
  | InternalFailureException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Provides details about the specified Amazon Web Services HealthScribe streaming session.
 * To view the status of the streaming session, check the `StreamStatus` field in the response. To get the
 * details of post-stream analytics, including its status, check the `PostStreamAnalyticsResult` field in the response.
 */
export const getMedicalScribeStream: API.OperationMethod<
  GetMedicalScribeStreamRequest,
  GetMedicalScribeStreamResponse,
  GetMedicalScribeStreamError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(32, __c1, 0) as any as S.Schema<GetMedicalScribeStreamRequest>,
  output: __S(36, __c1, 4) as any as S.Schema<GetMedicalScribeStreamResponse>,
  errors: [
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMedicalScribeStream",
}));

export type StartCallAnalyticsStreamTranscriptionError =
  | BadRequestException
  | ConflictException
  | InternalFailureException
  | LimitExceededException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Starts a bidirectional HTTP/2 or WebSocket stream where audio is streamed to
 * Amazon Transcribe and the transcription results are streamed to your application. Use this operation
 * for Call Analytics transcriptions.
 *
 * The following parameters are required:
 *
 * - `language-code` or `identify-language`
 *
 * - `media-encoding`
 *
 * - `sample-rate`
 *
 * For more information on streaming with Amazon Transcribe, see Transcribing streaming audio.
 */
export const startCallAnalyticsStreamTranscription: API.OperationMethod<
  StartCallAnalyticsStreamTranscriptionRequest,
  StartCallAnalyticsStreamTranscriptionResponse,
  StartCallAnalyticsStreamTranscriptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(128, __c4, 0) as any as S.Schema<StartCallAnalyticsStreamTranscriptionRequest>,
  output: __S(144, __c4, 16) as any as S.Schema<StartCallAnalyticsStreamTranscriptionResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    InternalFailureException,
    LimitExceededException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartCallAnalyticsStreamTranscription",
}));

export type StartMedicalScribeStreamError =
  | BadRequestException
  | ConflictException
  | InternalFailureException
  | LimitExceededException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Starts a bidirectional HTTP/2 stream, where audio is streamed to
 * Amazon Web Services HealthScribe
 * and the transcription results are streamed to your application.
 *
 * When you start a stream, you first specify the stream configuration in a `MedicalScribeConfigurationEvent`.
 * This event includes channel definitions, encryption settings, medical scribe context, and post-stream analytics settings, such as the output configuration for aggregated transcript and clinical note generation. These are additional
 * streaming session configurations beyond those provided in your initial start request headers. Whether you are starting a new session or resuming an existing session,
 * your first event must be a `MedicalScribeConfigurationEvent`.
 *
 * After you send a `MedicalScribeConfigurationEvent`, you start `AudioEvents` and Amazon Web Services HealthScribe
 * responds with real-time transcription results. When you are finished, to start processing the results with the post-stream analytics, send a `MedicalScribeSessionControlEvent` with a `Type` of
 * `END_OF_SESSION` and Amazon Web Services HealthScribe starts the analytics.
 *
 * You can pause or resume streaming.
 * To pause streaming, complete the input stream without sending the
 * `MedicalScribeSessionControlEvent`.
 * To resume streaming, call the `StartMedicalScribeStream` and specify the same SessionId you used to start the stream.
 *
 * The following parameters are required:
 *
 * - `language-code`
 *
 * - `media-encoding`
 *
 * - `media-sample-rate-hertz`
 *
 * For more information on streaming with
 * Amazon Web Services HealthScribe,
 * see Amazon Web Services HealthScribe.
 */
export const startMedicalScribeStream: API.OperationMethod<
  StartMedicalScribeStreamRequest,
  StartMedicalScribeStreamResponse,
  StartMedicalScribeStreamError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(230, __c7, 6) as any as S.Schema<StartMedicalScribeStreamRequest>,
  output: __S(236, __c7, 12) as any as S.Schema<StartMedicalScribeStreamResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    InternalFailureException,
    LimitExceededException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartMedicalScribeStream",
}));

export type StartMedicalStreamTranscriptionError =
  | BadRequestException
  | ConflictException
  | InternalFailureException
  | LimitExceededException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Starts a bidirectional HTTP/2 or WebSocket stream where audio is streamed to
 * Amazon Transcribe Medical and the transcription results are streamed to your
 * application.
 *
 * The following parameters are required:
 *
 * - `language-code`
 *
 * - `media-encoding`
 *
 * - `sample-rate`
 *
 * For more information on streaming with Amazon Transcribe Medical, see
 * Transcribing
 * streaming audio.
 */
export const startMedicalStreamTranscription: API.OperationMethod<
  StartMedicalStreamTranscriptionRequest,
  StartMedicalStreamTranscriptionResponse,
  StartMedicalStreamTranscriptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(256, __c8, 0) as any as S.Schema<StartMedicalStreamTranscriptionRequest>,
  output: __S(268, __c8, 12) as any as S.Schema<StartMedicalStreamTranscriptionResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    InternalFailureException,
    LimitExceededException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartMedicalStreamTranscription",
}));

export type StartStreamTranscriptionError =
  | BadRequestException
  | ConflictException
  | InternalFailureException
  | LimitExceededException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Starts a bidirectional HTTP/2 or WebSocket stream where audio is streamed to
 * Amazon Transcribe and the transcription results are streamed to your application.
 *
 * The following parameters are required:
 *
 * - `language-code` or `identify-language` or `identify-multiple-language`
 *
 * - `media-encoding`
 *
 * - `sample-rate`
 *
 * For more information on streaming with Amazon Transcribe, see Transcribing streaming audio.
 */
export const startStreamTranscription: API.OperationMethod<
  StartStreamTranscriptionRequest,
  StartStreamTranscriptionResponse,
  StartStreamTranscriptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<StartStreamTranscriptionRequest>,
  output: __S(12, __c0, 12) as any as S.Schema<StartStreamTranscriptionResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    InternalFailureException,
    LimitExceededException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartStreamTranscription",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          LanguageCode: S.optional(S.String).pipe(T.HttpHeader("x-amzn-transcribe-language-code")),
          MediaSampleRateHertz: S.Number.pipe(T.HttpHeader("x-amzn-transcribe-sample-rate")),
          MediaEncoding: S.String.pipe(T.HttpHeader("x-amzn-transcribe-media-encoding")),
          VocabularyName: S.optional(S.String).pipe(
            T.HttpHeader("x-amzn-transcribe-vocabulary-name"),
          ),
          SessionId: S.optional(S.String).pipe(T.HttpHeader("x-amzn-transcribe-session-id")),
          AudioStream: __S(195, __c6, 3).pipe(T.HttpPayload()),
          VocabularyFilterName: S.optional(S.String).pipe(
            T.HttpHeader("x-amzn-transcribe-vocabulary-filter-name"),
          ),
          VocabularyFilterMethod: S.optional(S.String).pipe(
            T.HttpHeader("x-amzn-transcribe-vocabulary-filter-method"),
          ),
          ShowSpeakerLabel: S.optional(S.Boolean).pipe(
            T.HttpHeader("x-amzn-transcribe-show-speaker-label"),
          ),
          EnableChannelIdentification: S.optional(S.Boolean).pipe(
            T.HttpHeader("x-amzn-transcribe-enable-channel-identification"),
          ),
          NumberOfChannels: S.optional(S.Number).pipe(
            T.HttpHeader("x-amzn-transcribe-number-of-channels"),
          ),
          EnablePartialResultsStabilization: S.optional(S.Boolean).pipe(
            T.HttpHeader("x-amzn-transcribe-enable-partial-results-stabilization"),
          ),
          PartialResultsStability: S.optional(S.String).pipe(
            T.HttpHeader("x-amzn-transcribe-partial-results-stability"),
          ),
          ContentIdentificationType: S.optional(S.String).pipe(
            T.HttpHeader("x-amzn-transcribe-content-identification-type"),
          ),
          ContentRedactionType: S.optional(S.String).pipe(
            T.HttpHeader("x-amzn-transcribe-content-redaction-type"),
          ),
          PiiEntityTypes: S.optional(S.String).pipe(
            T.HttpHeader("x-amzn-transcribe-pii-entity-types"),
          ),
          LanguageModelName: S.optional(S.String).pipe(
            T.HttpHeader("x-amzn-transcribe-language-model-name"),
          ),
          IdentifyLanguage: S.optional(S.Boolean).pipe(
            T.HttpHeader("x-amzn-transcribe-identify-language"),
          ),
          LanguageOptions: S.optional(S.String).pipe(
            T.HttpHeader("x-amzn-transcribe-language-options"),
          ),
          PreferredLanguage: S.optional(S.String).pipe(
            T.HttpHeader("x-amzn-transcribe-preferred-language"),
          ),
          IdentifyMultipleLanguages: S.optional(S.Boolean).pipe(
            T.HttpHeader("x-amzn-transcribe-identify-multiple-languages"),
          ),
          VocabularyNames: S.optional(S.String).pipe(
            T.HttpHeader("x-amzn-transcribe-vocabulary-names"),
          ),
          VocabularyFilterNames: S.optional(S.String).pipe(
            T.HttpHeader("x-amzn-transcribe-vocabulary-filter-names"),
          ),
          SessionResumeWindow: S.optional(S.Number).pipe(
            T.HttpHeader("x-amzn-transcribe-session-resume-window"),
          ),
          TranscriptFormat: S.optional(S.String).pipe(
            T.HttpHeader("x-amzn-transcribe-transcript-format"),
          ),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/stream-transcription" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartStreamTranscriptionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          StartTime: S.optional(S.Number),
          EndTime: S.optional(S.Number),
          Type: S.optional(S.String),
          Content: S.optional(S.String),
          VocabularyFilterMatch: S.optional(S.Boolean),
          Speaker: S.optional(S.String),
          Confidence: S.optional(S.Number),
          Stable: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "Item" });
    case 2:
      return S.Array(__S(1, __c0, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          StartTime: S.optional(S.Number),
          EndTime: S.optional(S.Number),
          Category: S.optional(S.String),
          Type: S.optional(S.String),
          Content: S.optional(S.String),
          Confidence: S.optional(S.Number),
        }),
      ).annotate({ identifier: "Entity" });
    case 4:
      return S.Array(__S(3, __c0, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          Transcript: S.optional(S.String),
          Items: S.optional(__S(2, __c0, 2)),
          Entities: S.optional(__S(4, __c0, 4)),
        }),
      ).annotate({ identifier: "Alternative" });
    case 6:
      return S.Array(__S(5, __c0, 5));
    case 7:
      return S.suspend(() =>
        S.Struct({
          ResultId: S.optional(S.String),
          StartTime: S.optional(S.Number),
          EndTime: S.optional(S.Number),
          IsPartial: S.optional(S.Boolean),
          Alternatives: S.optional(__S(6, __c0, 6)),
          ChannelId: S.optional(S.String),
          LanguageCode: S.optional(S.String),
          LanguageIdentification: S.optional(__S(161, __c5, 1)),
        }),
      ).annotate({ identifier: "Result" });
    case 8:
      return S.Array(__S(7, __c0, 7));
    case 9:
      return S.suspend(() => S.Struct({ Results: S.optional(__S(8, __c0, 8)) })).annotate({
        identifier: "Transcript",
      });
    case 10:
      return S.suspend(() => S.Struct({ Transcript: S.optional(__S(9, __c0, 9)) })).annotate({
        identifier: "TranscriptEvent",
      });
    case 11:
      return T.EventStream(
        /*@__PURE__*/ S.Union([
          /*@__PURE__*/ S.Struct({ TranscriptEvent: __S(10, __c0, 10) }),
          /*@__PURE__*/ S.Struct({
            BadRequestException: /*@__PURE__*/ S.suspend(() => BadRequestException).annotate({
              identifier: "BadRequestException",
            }),
          }),
          /*@__PURE__*/ S.Struct({
            LimitExceededException: /*@__PURE__*/ S.suspend(() => LimitExceededException).annotate({
              identifier: "LimitExceededException",
            }),
          }),
          /*@__PURE__*/ S.Struct({
            InternalFailureException: /*@__PURE__*/ S.suspend(
              () => InternalFailureException,
            ).annotate({ identifier: "InternalFailureException" }),
          }),
          /*@__PURE__*/ S.Struct({
            ConflictException: /*@__PURE__*/ S.suspend(() => ConflictException).annotate({
              identifier: "ConflictException",
            }),
          }),
          /*@__PURE__*/ S.Struct({
            ServiceUnavailableException: /*@__PURE__*/ S.suspend(
              () => ServiceUnavailableException,
            ).annotate({ identifier: "ServiceUnavailableException" }),
          }),
        ]),
      );
    case 12:
      return S.suspend(() =>
        S.Struct({
          RequestId: S.optional(S.String).pipe(T.HttpHeader("x-amzn-request-id")),
          LanguageCode: S.optional(S.String).pipe(T.HttpHeader("x-amzn-transcribe-language-code")),
          MediaSampleRateHertz: S.optional(S.Number).pipe(
            T.HttpHeader("x-amzn-transcribe-sample-rate"),
          ),
          MediaEncoding: S.optional(S.String).pipe(
            T.HttpHeader("x-amzn-transcribe-media-encoding"),
          ),
          VocabularyName: S.optional(S.String).pipe(
            T.HttpHeader("x-amzn-transcribe-vocabulary-name"),
          ),
          SessionId: S.optional(S.String).pipe(T.HttpHeader("x-amzn-transcribe-session-id")),
          TranscriptResultStream: S.optional(__S(11, __c0, 11)).pipe(T.HttpPayload()),
          VocabularyFilterName: S.optional(S.String).pipe(
            T.HttpHeader("x-amzn-transcribe-vocabulary-filter-name"),
          ),
          VocabularyFilterMethod: S.optional(S.String).pipe(
            T.HttpHeader("x-amzn-transcribe-vocabulary-filter-method"),
          ),
          ShowSpeakerLabel: S.optional(S.Boolean).pipe(
            T.HttpHeader("x-amzn-transcribe-show-speaker-label"),
          ),
          EnableChannelIdentification: S.optional(S.Boolean).pipe(
            T.HttpHeader("x-amzn-transcribe-enable-channel-identification"),
          ),
          NumberOfChannels: S.optional(S.Number).pipe(
            T.HttpHeader("x-amzn-transcribe-number-of-channels"),
          ),
          EnablePartialResultsStabilization: S.optional(S.Boolean).pipe(
            T.HttpHeader("x-amzn-transcribe-enable-partial-results-stabilization"),
          ),
          PartialResultsStability: S.optional(S.String).pipe(
            T.HttpHeader("x-amzn-transcribe-partial-results-stability"),
          ),
          ContentIdentificationType: S.optional(S.String).pipe(
            T.HttpHeader("x-amzn-transcribe-content-identification-type"),
          ),
          ContentRedactionType: S.optional(S.String).pipe(
            T.HttpHeader("x-amzn-transcribe-content-redaction-type"),
          ),
          PiiEntityTypes: S.optional(S.String).pipe(
            T.HttpHeader("x-amzn-transcribe-pii-entity-types"),
          ),
          LanguageModelName: S.optional(S.String).pipe(
            T.HttpHeader("x-amzn-transcribe-language-model-name"),
          ),
          IdentifyLanguage: S.optional(S.Boolean).pipe(
            T.HttpHeader("x-amzn-transcribe-identify-language"),
          ),
          LanguageOptions: S.optional(S.String).pipe(
            T.HttpHeader("x-amzn-transcribe-language-options"),
          ),
          PreferredLanguage: S.optional(S.String).pipe(
            T.HttpHeader("x-amzn-transcribe-preferred-language"),
          ),
          IdentifyMultipleLanguages: S.optional(S.Boolean).pipe(
            T.HttpHeader("x-amzn-transcribe-identify-multiple-languages"),
          ),
          VocabularyNames: S.optional(S.String).pipe(
            T.HttpHeader("x-amzn-transcribe-vocabulary-names"),
          ),
          VocabularyFilterNames: S.optional(S.String).pipe(
            T.HttpHeader("x-amzn-transcribe-vocabulary-filter-names"),
          ),
          SessionResumeWindow: S.optional(S.Number).pipe(
            T.HttpHeader("x-amzn-transcribe-session-resume-window"),
          ),
          TranscriptFormat: S.optional(S.String).pipe(
            T.HttpHeader("x-amzn-transcribe-transcript-format"),
          ),
        }),
      ).annotate({ identifier: "StartStreamTranscriptionResponse" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ SessionId: S.String.pipe(T.HttpLabel("SessionId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/medical-scribe-stream/{SessionId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetMedicalScribeStreamRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ClinicalNoteOutputLocation: S.optional(S.String),
          TranscriptOutputLocation: S.optional(S.String),
          Status: S.optional(S.String),
          FailureReason: S.optional(S.String),
        }),
      ).annotate({ identifier: "ClinicalNoteGenerationResult" });
    case 2:
      return S.suspend(() =>
        S.Struct({ ClinicalNoteGenerationResult: S.optional(__S(33, __c1, 1)) }),
      ).annotate({ identifier: "MedicalScribePostStreamAnalyticsResult" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          SessionId: S.optional(S.String),
          StreamCreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          StreamEndedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LanguageCode: S.optional(S.String),
          MediaSampleRateHertz: S.optional(S.Number),
          MediaEncoding: S.optional(S.String),
          VocabularyName: S.optional(S.String),
          VocabularyFilterName: S.optional(S.String),
          VocabularyFilterMethod: S.optional(S.String),
          ResourceAccessRoleArn: S.optional(S.String),
          ChannelDefinitions: S.optional(__S(65, __c2, 1)),
          EncryptionSettings: S.optional(__S(97, __c3, 1)),
          StreamStatus: S.optional(S.String),
          PostStreamAnalyticsSettings: S.optional(__S(99, __c3, 3)),
          PostStreamAnalyticsResult: S.optional(__S(34, __c1, 2)),
          MedicalScribeContextProvided: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "MedicalScribeStreamDetails" });
    case 4:
      return S.suspend(() =>
        S.Struct({ MedicalScribeStreamDetails: S.optional(__S(35, __c1, 3)) }),
      ).annotate({ identifier: "GetMedicalScribeStreamResponse" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ ChannelId: S.Number, ParticipantRole: S.String })).annotate(
        { identifier: "MedicalScribeChannelDefinition" },
      );
    case 1:
      return S.Array(__S(64, __c2, 0));
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
    case 1:
      return S.suspend(() =>
        S.Struct({ KmsEncryptionContext: S.optional(__S(96, __c3, 0)), KmsKeyId: S.String }),
      ).annotate({ identifier: "MedicalScribeEncryptionSettings" });
    case 2:
      return S.suspend(() =>
        S.Struct({ OutputBucketName: S.String, NoteTemplate: S.optional(S.String) }),
      ).annotate({ identifier: "ClinicalNoteGenerationSettings" });
    case 3:
      return S.suspend(() =>
        S.Struct({ ClinicalNoteGenerationSettings: __S(98, __c3, 2) }),
      ).annotate({ identifier: "MedicalScribePostStreamAnalyticsSettings" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          LanguageCode: S.optional(S.String).pipe(T.HttpHeader("x-amzn-transcribe-language-code")),
          MediaSampleRateHertz: S.Number.pipe(T.HttpHeader("x-amzn-transcribe-sample-rate")),
          MediaEncoding: S.String.pipe(T.HttpHeader("x-amzn-transcribe-media-encoding")),
          VocabularyName: S.optional(S.String).pipe(
            T.HttpHeader("x-amzn-transcribe-vocabulary-name"),
          ),
          SessionId: S.optional(S.String).pipe(T.HttpHeader("x-amzn-transcribe-session-id")),
          AudioStream: __S(195, __c6, 3).pipe(T.HttpPayload()),
          VocabularyFilterName: S.optional(S.String).pipe(
            T.HttpHeader("x-amzn-transcribe-vocabulary-filter-name"),
          ),
          VocabularyFilterMethod: S.optional(S.String).pipe(
            T.HttpHeader("x-amzn-transcribe-vocabulary-filter-method"),
          ),
          LanguageModelName: S.optional(S.String).pipe(
            T.HttpHeader("x-amzn-transcribe-language-model-name"),
          ),
          IdentifyLanguage: S.optional(S.Boolean).pipe(
            T.HttpHeader("x-amzn-transcribe-identify-language"),
          ),
          LanguageOptions: S.optional(S.String).pipe(
            T.HttpHeader("x-amzn-transcribe-language-options"),
          ),
          PreferredLanguage: S.optional(S.String).pipe(
            T.HttpHeader("x-amzn-transcribe-preferred-language"),
          ),
          VocabularyNames: S.optional(S.String).pipe(
            T.HttpHeader("x-amzn-transcribe-vocabulary-names"),
          ),
          VocabularyFilterNames: S.optional(S.String).pipe(
            T.HttpHeader("x-amzn-transcribe-vocabulary-filter-names"),
          ),
          EnablePartialResultsStabilization: S.optional(S.Boolean).pipe(
            T.HttpHeader("x-amzn-transcribe-enable-partial-results-stabilization"),
          ),
          PartialResultsStability: S.optional(S.String).pipe(
            T.HttpHeader("x-amzn-transcribe-partial-results-stability"),
          ),
          ContentIdentificationType: S.optional(S.String).pipe(
            T.HttpHeader("x-amzn-transcribe-content-identification-type"),
          ),
          ContentRedactionType: S.optional(S.String).pipe(
            T.HttpHeader("x-amzn-transcribe-content-redaction-type"),
          ),
          PiiEntityTypes: S.optional(S.String).pipe(
            T.HttpHeader("x-amzn-transcribe-pii-entity-types"),
          ),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/call-analytics-stream-transcription" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartCallAnalyticsStreamTranscriptionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          BeginOffsetMillis: S.optional(S.Number),
          EndOffsetMillis: S.optional(S.Number),
          Type: S.optional(S.String),
          Content: S.optional(S.String),
          Confidence: S.optional(S.Number),
          VocabularyFilterMatch: S.optional(S.Boolean),
          Stable: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "CallAnalyticsItem" });
    case 2:
      return S.Array(__S(129, __c4, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          BeginOffsetMillis: S.optional(S.Number),
          EndOffsetMillis: S.optional(S.Number),
          Category: S.optional(S.String),
          Type: S.optional(S.String),
          Content: S.optional(S.String),
          Confidence: S.optional(S.Number),
        }),
      ).annotate({ identifier: "CallAnalyticsEntity" });
    case 4:
      return S.Array(__S(131, __c4, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({ Begin: S.optional(S.Number), End: S.optional(S.Number) }),
      ).annotate({ identifier: "CharacterOffsets" });
    case 6:
      return S.suspend(() =>
        S.Struct({ CharacterOffsets: S.optional(__S(133, __c4, 5)) }),
      ).annotate({ identifier: "IssueDetected" });
    case 7:
      return S.Array(__S(134, __c4, 6));
    case 8:
      return S.suspend(() =>
        S.Struct({
          UtteranceId: S.optional(S.String),
          IsPartial: S.optional(S.Boolean),
          ParticipantRole: S.optional(S.String),
          BeginOffsetMillis: S.optional(S.Number),
          EndOffsetMillis: S.optional(S.Number),
          Transcript: S.optional(S.String),
          Items: S.optional(__S(130, __c4, 2)),
          Entities: S.optional(__S(132, __c4, 4)),
          Sentiment: S.optional(S.String),
          IssuesDetected: S.optional(__S(135, __c4, 7)),
          LanguageCode: S.optional(S.String),
          LanguageIdentification: S.optional(__S(161, __c5, 1)),
        }),
      ).annotate({ identifier: "UtteranceEvent" });
    case 9:
      return S.Array(S.String);
    case 10:
      return S.suspend(() =>
        S.Struct({
          BeginOffsetMillis: S.optional(S.Number),
          EndOffsetMillis: S.optional(S.Number),
        }),
      ).annotate({ identifier: "TimestampRange" });
    case 11:
      return S.Array(__S(138, __c4, 10));
    case 12:
      return S.suspend(() =>
        S.Struct({ TimestampRanges: S.optional(__S(139, __c4, 11)) }),
      ).annotate({ identifier: "PointsOfInterest" });
    case 13:
      return S.Record(S.String, /*@__PURE__*/ __S(140, __c4, 12).pipe(S.optional));
    case 14:
      return S.suspend(() =>
        S.Struct({
          MatchedCategories: S.optional(__S(137, __c4, 9)),
          MatchedDetails: S.optional(__S(141, __c4, 13)),
        }),
      ).annotate({ identifier: "CategoryEvent" });
    case 15:
      return T.EventStream(
        /*@__PURE__*/ S.Union([
          /*@__PURE__*/ S.Struct({ UtteranceEvent: __S(136, __c4, 8) }),
          /*@__PURE__*/ S.Struct({ CategoryEvent: __S(142, __c4, 14) }),
          /*@__PURE__*/ S.Struct({
            BadRequestException: /*@__PURE__*/ S.suspend(() => BadRequestException).annotate({
              identifier: "BadRequestException",
            }),
          }),
          /*@__PURE__*/ S.Struct({
            LimitExceededException: /*@__PURE__*/ S.suspend(() => LimitExceededException).annotate({
              identifier: "LimitExceededException",
            }),
          }),
          /*@__PURE__*/ S.Struct({
            InternalFailureException: /*@__PURE__*/ S.suspend(
              () => InternalFailureException,
            ).annotate({ identifier: "InternalFailureException" }),
          }),
          /*@__PURE__*/ S.Struct({
            ConflictException: /*@__PURE__*/ S.suspend(() => ConflictException).annotate({
              identifier: "ConflictException",
            }),
          }),
          /*@__PURE__*/ S.Struct({
            ServiceUnavailableException: /*@__PURE__*/ S.suspend(
              () => ServiceUnavailableException,
            ).annotate({ identifier: "ServiceUnavailableException" }),
          }),
        ]),
      );
    case 16:
      return S.suspend(() =>
        S.Struct({
          RequestId: S.optional(S.String).pipe(T.HttpHeader("x-amzn-request-id")),
          LanguageCode: S.optional(S.String).pipe(T.HttpHeader("x-amzn-transcribe-language-code")),
          MediaSampleRateHertz: S.optional(S.Number).pipe(
            T.HttpHeader("x-amzn-transcribe-sample-rate"),
          ),
          MediaEncoding: S.optional(S.String).pipe(
            T.HttpHeader("x-amzn-transcribe-media-encoding"),
          ),
          VocabularyName: S.optional(S.String).pipe(
            T.HttpHeader("x-amzn-transcribe-vocabulary-name"),
          ),
          SessionId: S.optional(S.String).pipe(T.HttpHeader("x-amzn-transcribe-session-id")),
          CallAnalyticsTranscriptResultStream: S.optional(__S(143, __c4, 15)).pipe(T.HttpPayload()),
          VocabularyFilterName: S.optional(S.String).pipe(
            T.HttpHeader("x-amzn-transcribe-vocabulary-filter-name"),
          ),
          VocabularyFilterMethod: S.optional(S.String).pipe(
            T.HttpHeader("x-amzn-transcribe-vocabulary-filter-method"),
          ),
          LanguageModelName: S.optional(S.String).pipe(
            T.HttpHeader("x-amzn-transcribe-language-model-name"),
          ),
          IdentifyLanguage: S.optional(S.Boolean).pipe(
            T.HttpHeader("x-amzn-transcribe-identify-language"),
          ),
          LanguageOptions: S.optional(S.String).pipe(
            T.HttpHeader("x-amzn-transcribe-language-options"),
          ),
          PreferredLanguage: S.optional(S.String).pipe(
            T.HttpHeader("x-amzn-transcribe-preferred-language"),
          ),
          VocabularyNames: S.optional(S.String).pipe(
            T.HttpHeader("x-amzn-transcribe-vocabulary-names"),
          ),
          VocabularyFilterNames: S.optional(S.String).pipe(
            T.HttpHeader("x-amzn-transcribe-vocabulary-filter-names"),
          ),
          EnablePartialResultsStabilization: S.optional(S.Boolean).pipe(
            T.HttpHeader("x-amzn-transcribe-enable-partial-results-stabilization"),
          ),
          PartialResultsStability: S.optional(S.String).pipe(
            T.HttpHeader("x-amzn-transcribe-partial-results-stability"),
          ),
          ContentIdentificationType: S.optional(S.String).pipe(
            T.HttpHeader("x-amzn-transcribe-content-identification-type"),
          ),
          ContentRedactionType: S.optional(S.String).pipe(
            T.HttpHeader("x-amzn-transcribe-content-redaction-type"),
          ),
          PiiEntityTypes: S.optional(S.String).pipe(
            T.HttpHeader("x-amzn-transcribe-pii-entity-types"),
          ),
        }),
      ).annotate({ identifier: "StartCallAnalyticsStreamTranscriptionResponse" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ LanguageCode: S.optional(S.String), Score: S.optional(S.Number) }),
      ).annotate({ identifier: "CallAnalyticsLanguageWithScore" });
    case 1:
      return S.Array(__S(160, __c5, 0));
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AudioChunk: S.optional(T.Blob).pipe(T.EventPayload()) }),
      ).annotate({ identifier: "AudioEvent" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          OutputLocation: S.String,
          DataAccessRoleArn: S.String,
          ContentRedactionOutput: S.optional(S.String),
          OutputEncryptionKMSKeyId: S.optional(S.String),
        }),
      ).annotate({ identifier: "PostCallAnalyticsSettings" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          ChannelDefinitions: S.optional(__S(65, __c2, 1)),
          PostCallAnalyticsSettings: S.optional(__S(193, __c6, 1)),
        }),
      ).annotate({ identifier: "ConfigurationEvent" });
    case 3:
      return T.InputEventStream(
        /*@__PURE__*/ S.Union([
          /*@__PURE__*/ S.Struct({ AudioEvent: __S(192, __c6, 0) }),
          /*@__PURE__*/ S.Struct({ ConfigurationEvent: __S(194, __c6, 2) }),
        ]),
      );
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ AudioChunk: T.Blob.pipe(T.EventPayload()) })).annotate({
        identifier: "MedicalScribeAudioEvent",
      });
    case 1:
      return S.suspend(() => S.Struct({ Type: S.String })).annotate({
        identifier: "MedicalScribeSessionControlEvent",
      });
    case 2:
      return S.suspend(() => S.Struct({ Pronouns: S.optional(S.String) })).annotate({
        identifier: "MedicalScribePatientContext",
      });
    case 3:
      return S.suspend(() => S.Struct({ PatientContext: S.optional(__S(226, __c7, 2)) })).annotate({
        identifier: "MedicalScribeContext",
      });
    case 4:
      return S.suspend(() =>
        S.Struct({
          VocabularyName: S.optional(S.String),
          VocabularyFilterName: S.optional(S.String),
          VocabularyFilterMethod: S.optional(S.String),
          ResourceAccessRoleArn: S.String,
          ChannelDefinitions: S.optional(__S(65, __c2, 1)),
          EncryptionSettings: S.optional(__S(97, __c3, 1)),
          PostStreamAnalyticsSettings: __S(99, __c3, 3),
          MedicalScribeContext: S.optional(__S(227, __c7, 3)),
        }),
      ).annotate({ identifier: "MedicalScribeConfigurationEvent" });
    case 5:
      return T.InputEventStream(
        /*@__PURE__*/ S.Union([
          /*@__PURE__*/ S.Struct({ AudioEvent: __S(224, __c7, 0) }),
          /*@__PURE__*/ S.Struct({ SessionControlEvent: __S(225, __c7, 1) }),
          /*@__PURE__*/ S.Struct({ ConfigurationEvent: __S(228, __c7, 4) }),
        ]),
      );
    case 6:
      return S.suspend(() =>
        S.Struct({
          SessionId: S.optional(S.String).pipe(T.HttpHeader("x-amzn-transcribe-session-id")),
          LanguageCode: S.String.pipe(T.HttpHeader("x-amzn-transcribe-language-code")),
          MediaSampleRateHertz: S.Number.pipe(T.HttpHeader("x-amzn-transcribe-sample-rate")),
          MediaEncoding: S.String.pipe(T.HttpHeader("x-amzn-transcribe-media-encoding")),
          InputStream: __S(229, __c7, 5).pipe(T.HttpPayload()),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/medical-scribe-stream" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartMedicalScribeStreamRequest" });
    case 7:
      return S.suspend(() =>
        S.Struct({
          BeginAudioTime: S.optional(S.Number),
          EndAudioTime: S.optional(S.Number),
          Type: S.optional(S.String),
          Confidence: S.optional(S.Number),
          Content: S.optional(S.String),
          VocabularyFilterMatch: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "MedicalScribeTranscriptItem" });
    case 8:
      return S.Array(__S(231, __c7, 7));
    case 9:
      return S.suspend(() =>
        S.Struct({
          SegmentId: S.optional(S.String),
          BeginAudioTime: S.optional(S.Number),
          EndAudioTime: S.optional(S.Number),
          Content: S.optional(S.String),
          Items: S.optional(__S(232, __c7, 8)),
          IsPartial: S.optional(S.Boolean),
          ChannelId: S.optional(S.String),
        }),
      ).annotate({ identifier: "MedicalScribeTranscriptSegment" });
    case 10:
      return S.suspend(() =>
        S.Struct({ TranscriptSegment: S.optional(__S(233, __c7, 9)) }),
      ).annotate({ identifier: "MedicalScribeTranscriptEvent" });
    case 11:
      return T.EventStream(
        /*@__PURE__*/ S.Union([
          /*@__PURE__*/ S.Struct({ TranscriptEvent: __S(234, __c7, 10) }),
          /*@__PURE__*/ S.Struct({
            BadRequestException: /*@__PURE__*/ S.suspend(() => BadRequestException).annotate({
              identifier: "BadRequestException",
            }),
          }),
          /*@__PURE__*/ S.Struct({
            LimitExceededException: /*@__PURE__*/ S.suspend(() => LimitExceededException).annotate({
              identifier: "LimitExceededException",
            }),
          }),
          /*@__PURE__*/ S.Struct({
            InternalFailureException: /*@__PURE__*/ S.suspend(
              () => InternalFailureException,
            ).annotate({ identifier: "InternalFailureException" }),
          }),
          /*@__PURE__*/ S.Struct({
            ConflictException: /*@__PURE__*/ S.suspend(() => ConflictException).annotate({
              identifier: "ConflictException",
            }),
          }),
          /*@__PURE__*/ S.Struct({
            ServiceUnavailableException: /*@__PURE__*/ S.suspend(
              () => ServiceUnavailableException,
            ).annotate({ identifier: "ServiceUnavailableException" }),
          }),
        ]),
      );
    case 12:
      return S.suspend(() =>
        S.Struct({
          SessionId: S.optional(S.String).pipe(T.HttpHeader("x-amzn-transcribe-session-id")),
          RequestId: S.optional(S.String).pipe(T.HttpHeader("x-amzn-request-id")),
          LanguageCode: S.optional(S.String).pipe(T.HttpHeader("x-amzn-transcribe-language-code")),
          MediaSampleRateHertz: S.optional(S.Number).pipe(
            T.HttpHeader("x-amzn-transcribe-sample-rate"),
          ),
          MediaEncoding: S.optional(S.String).pipe(
            T.HttpHeader("x-amzn-transcribe-media-encoding"),
          ),
          ResultStream: S.optional(__S(235, __c7, 11)).pipe(T.HttpPayload()),
        }),
      ).annotate({ identifier: "StartMedicalScribeStreamResponse" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          LanguageCode: S.String.pipe(T.HttpHeader("x-amzn-transcribe-language-code")),
          MediaSampleRateHertz: S.Number.pipe(T.HttpHeader("x-amzn-transcribe-sample-rate")),
          MediaEncoding: S.String.pipe(T.HttpHeader("x-amzn-transcribe-media-encoding")),
          VocabularyName: S.optional(S.String).pipe(
            T.HttpHeader("x-amzn-transcribe-vocabulary-name"),
          ),
          Specialty: S.String.pipe(T.HttpHeader("x-amzn-transcribe-specialty")),
          Type: S.String.pipe(T.HttpHeader("x-amzn-transcribe-type")),
          ShowSpeakerLabel: S.optional(S.Boolean).pipe(
            T.HttpHeader("x-amzn-transcribe-show-speaker-label"),
          ),
          SessionId: S.optional(S.String).pipe(T.HttpHeader("x-amzn-transcribe-session-id")),
          AudioStream: __S(195, __c6, 3).pipe(T.HttpPayload()),
          EnableChannelIdentification: S.optional(S.Boolean).pipe(
            T.HttpHeader("x-amzn-transcribe-enable-channel-identification"),
          ),
          NumberOfChannels: S.optional(S.Number).pipe(
            T.HttpHeader("x-amzn-transcribe-number-of-channels"),
          ),
          ContentIdentificationType: S.optional(S.String).pipe(
            T.HttpHeader("x-amzn-transcribe-content-identification-type"),
          ),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/medical-stream-transcription" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartMedicalStreamTranscriptionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          StartTime: S.optional(S.Number),
          EndTime: S.optional(S.Number),
          Type: S.optional(S.String),
          Content: S.optional(S.String),
          Confidence: S.optional(S.Number),
          Speaker: S.optional(S.String),
        }),
      ).annotate({ identifier: "MedicalItem" });
    case 2:
      return S.Array(__S(257, __c8, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          StartTime: S.optional(S.Number),
          EndTime: S.optional(S.Number),
          Category: S.optional(S.String),
          Content: S.optional(S.String),
          Confidence: S.optional(S.Number),
        }),
      ).annotate({ identifier: "MedicalEntity" });
    case 4:
      return S.Array(__S(259, __c8, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          Transcript: S.optional(S.String),
          Items: S.optional(__S(258, __c8, 2)),
          Entities: S.optional(__S(260, __c8, 4)),
        }),
      ).annotate({ identifier: "MedicalAlternative" });
    case 6:
      return S.Array(__S(261, __c8, 5));
    case 7:
      return S.suspend(() =>
        S.Struct({
          ResultId: S.optional(S.String),
          StartTime: S.optional(S.Number),
          EndTime: S.optional(S.Number),
          IsPartial: S.optional(S.Boolean),
          Alternatives: S.optional(__S(262, __c8, 6)),
          ChannelId: S.optional(S.String),
        }),
      ).annotate({ identifier: "MedicalResult" });
    case 8:
      return S.Array(__S(263, __c8, 7));
    case 9:
      return S.suspend(() => S.Struct({ Results: S.optional(__S(264, __c8, 8)) })).annotate({
        identifier: "MedicalTranscript",
      });
    case 10:
      return S.suspend(() => S.Struct({ Transcript: S.optional(__S(265, __c8, 9)) })).annotate({
        identifier: "MedicalTranscriptEvent",
      });
    case 11:
      return T.EventStream(
        /*@__PURE__*/ S.Union([
          /*@__PURE__*/ S.Struct({ TranscriptEvent: __S(266, __c8, 10) }),
          /*@__PURE__*/ S.Struct({
            BadRequestException: /*@__PURE__*/ S.suspend(() => BadRequestException).annotate({
              identifier: "BadRequestException",
            }),
          }),
          /*@__PURE__*/ S.Struct({
            LimitExceededException: /*@__PURE__*/ S.suspend(() => LimitExceededException).annotate({
              identifier: "LimitExceededException",
            }),
          }),
          /*@__PURE__*/ S.Struct({
            InternalFailureException: /*@__PURE__*/ S.suspend(
              () => InternalFailureException,
            ).annotate({ identifier: "InternalFailureException" }),
          }),
          /*@__PURE__*/ S.Struct({
            ConflictException: /*@__PURE__*/ S.suspend(() => ConflictException).annotate({
              identifier: "ConflictException",
            }),
          }),
          /*@__PURE__*/ S.Struct({
            ServiceUnavailableException: /*@__PURE__*/ S.suspend(
              () => ServiceUnavailableException,
            ).annotate({ identifier: "ServiceUnavailableException" }),
          }),
        ]),
      );
    case 12:
      return S.suspend(() =>
        S.Struct({
          RequestId: S.optional(S.String).pipe(T.HttpHeader("x-amzn-request-id")),
          LanguageCode: S.optional(S.String).pipe(T.HttpHeader("x-amzn-transcribe-language-code")),
          MediaSampleRateHertz: S.optional(S.Number).pipe(
            T.HttpHeader("x-amzn-transcribe-sample-rate"),
          ),
          MediaEncoding: S.optional(S.String).pipe(
            T.HttpHeader("x-amzn-transcribe-media-encoding"),
          ),
          VocabularyName: S.optional(S.String).pipe(
            T.HttpHeader("x-amzn-transcribe-vocabulary-name"),
          ),
          Specialty: S.optional(S.String).pipe(T.HttpHeader("x-amzn-transcribe-specialty")),
          Type: S.optional(S.String).pipe(T.HttpHeader("x-amzn-transcribe-type")),
          ShowSpeakerLabel: S.optional(S.Boolean).pipe(
            T.HttpHeader("x-amzn-transcribe-show-speaker-label"),
          ),
          SessionId: S.optional(S.String).pipe(T.HttpHeader("x-amzn-transcribe-session-id")),
          TranscriptResultStream: S.optional(__S(267, __c8, 11)).pipe(T.HttpPayload()),
          EnableChannelIdentification: S.optional(S.Boolean).pipe(
            T.HttpHeader("x-amzn-transcribe-enable-channel-identification"),
          ),
          NumberOfChannels: S.optional(S.Number).pipe(
            T.HttpHeader("x-amzn-transcribe-number-of-channels"),
          ),
          ContentIdentificationType: S.optional(S.String).pipe(
            T.HttpHeader("x-amzn-transcribe-content-identification-type"),
          ),
        }),
      ).annotate({ identifier: "StartMedicalStreamTranscriptionResponse" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
