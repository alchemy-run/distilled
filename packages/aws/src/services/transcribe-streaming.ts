import type * as HttpClient from "effect/unstable/http/HttpClient";
import type * as stream from "effect/Stream";
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
  sdkId: "Transcribe Streaming",
  target: "Transcribe",
  version: "2017-10-26",
  sigv4: "transcribe",
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
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://transcribestreaming.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://transcribestreaming.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
  )<{ readonly message?: string }> {}
export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError("ConflictException", ["ConflictError"], {
    status: 409,
  })<{ readonly message?: string }> {}
export class InternalFailureException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalFailureException",
    ["ServerError"],
    { status: 500 },
  )<{ readonly message?: string }> {}
export class LimitExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "LimitExceededException",
    ["ThrottlingError"],
    { status: 429 },
  )<{ readonly message?: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class ServiceUnavailableException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceUnavailableException",
    ["ServerError"],
    { status: 503 },
  )<{ readonly message?: string }> {}
export type SessionId = string;
export interface GetMedicalScribeStreamRequest {
  SessionId: string;
}
export type MedicalScribeLanguageCode = "en-US" | (string & {});
export type MedicalScribeMediaSampleRateHertz = number;
export type MedicalScribeMediaEncoding =
  | "pcm"
  | "ogg-opus"
  | "flac"
  | (string & {});
export type VocabularyName = string;
export type VocabularyFilterName = string;
export type MedicalScribeVocabularyFilterMethod =
  | "remove"
  | "mask"
  | "tag"
  | (string & {});
export type IamRoleArn = string;
export type MedicalScribeChannelId = number;
export type MedicalScribeParticipantRole =
  | "PATIENT"
  | "CLINICIAN"
  | (string & {});
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
export type ClinicalNoteGenerationStatus =
  | "IN_PROGRESS"
  | "FAILED"
  | "COMPLETED"
  | (string & {});
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
export type ContentRedactionOutput =
  | "redacted"
  | "redacted_and_unredacted"
  | (string & {});
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
export type Sentiment =
  | "POSITIVE"
  | "NEGATIVE"
  | "MIXED"
  | "NEUTRAL"
  | (string & {});
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
export type CallAnalyticsLanguageIdentification =
  CallAnalyticsLanguageWithScore[];
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
export type MatchedCategoryDetails = {
  [key: string]: PointsOfInterest | undefined;
};
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
export type MedicalScribeSessionControlEventType =
  | "END_OF_SESSION"
  | (string & {});
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
  | {
      AudioEvent: MedicalScribeAudioEvent;
      SessionControlEvent?: never;
      ConfigurationEvent?: never;
    }
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
export type MedicalScribeTranscriptItemType =
  | "pronunciation"
  | "punctuation"
  | (string & {});
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
  TranscriptResultStream?: stream.Stream<
    MedicalTranscriptResultStream,
    Error,
    never
  >;
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
  descriptor: {
    service: svc,
    http: "GET /medical-scribe-stream/{SessionId}",
    input: { SessionId: 0 },
    output: {
      MedicalScribeStreamDetails: {
        StreamCreatedAt: D.ts,
        StreamEndedAt: D.ts,
      },
    },
  },
  errors: [
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMedicalScribeStream",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /call-analytics-stream-transcription",
    input: {
      LanguageCode: D.m({ header: "x-amzn-transcribe-language-code" }),
      MediaSampleRateHertz: D.m({ header: "x-amzn-transcribe-sample-rate" }),
      MediaEncoding: D.m({ header: "x-amzn-transcribe-media-encoding" }),
      VocabularyName: D.m({ header: "x-amzn-transcribe-vocabulary-name" }),
      SessionId: D.m({ header: "x-amzn-transcribe-session-id" }),
      AudioStream: D.m({
        payload: true,
        shape: D.events(
          {
            AudioEvent: i_AudioEvent,
            ConfigurationEvent: i_ConfigurationEvent,
          },
          { AudioEvent: "AudioChunk" },
        ),
      }),
      VocabularyFilterName: D.m({
        header: "x-amzn-transcribe-vocabulary-filter-name",
      }),
      VocabularyFilterMethod: D.m({
        header: "x-amzn-transcribe-vocabulary-filter-method",
      }),
      LanguageModelName: D.m({
        header: "x-amzn-transcribe-language-model-name",
      }),
      IdentifyLanguage: D.m({ header: "x-amzn-transcribe-identify-language" }),
      LanguageOptions: D.m({ header: "x-amzn-transcribe-language-options" }),
      PreferredLanguage: D.m({
        header: "x-amzn-transcribe-preferred-language",
      }),
      VocabularyNames: D.m({ header: "x-amzn-transcribe-vocabulary-names" }),
      VocabularyFilterNames: D.m({
        header: "x-amzn-transcribe-vocabulary-filter-names",
      }),
      EnablePartialResultsStabilization: D.m({
        header: "x-amzn-transcribe-enable-partial-results-stabilization",
      }),
      PartialResultsStability: D.m({
        header: "x-amzn-transcribe-partial-results-stability",
      }),
      ContentIdentificationType: D.m({
        header: "x-amzn-transcribe-content-identification-type",
      }),
      ContentRedactionType: D.m({
        header: "x-amzn-transcribe-content-redaction-type",
      }),
      PiiEntityTypes: D.m({ header: "x-amzn-transcribe-pii-entity-types" }),
    },
    output: {
      RequestId: D.m({ header: "x-amzn-request-id" }),
      LanguageCode: D.m({ header: "x-amzn-transcribe-language-code" }),
      MediaSampleRateHertz: D.m({
        header: "x-amzn-transcribe-sample-rate",
        shape: D.num,
      }),
      MediaEncoding: D.m({ header: "x-amzn-transcribe-media-encoding" }),
      VocabularyName: D.m({ header: "x-amzn-transcribe-vocabulary-name" }),
      SessionId: D.m({ header: "x-amzn-transcribe-session-id" }),
      CallAnalyticsTranscriptResultStream: D.m({
        payload: true,
        shape: D.events({
          UtteranceEvent: 0,
          CategoryEvent: 0,
          BadRequestException: 0,
          LimitExceededException: 0,
          InternalFailureException: 0,
          ConflictException: 0,
          ServiceUnavailableException: 0,
        }),
      }),
      VocabularyFilterName: D.m({
        header: "x-amzn-transcribe-vocabulary-filter-name",
      }),
      VocabularyFilterMethod: D.m({
        header: "x-amzn-transcribe-vocabulary-filter-method",
      }),
      LanguageModelName: D.m({
        header: "x-amzn-transcribe-language-model-name",
      }),
      IdentifyLanguage: D.m({
        header: "x-amzn-transcribe-identify-language",
        shape: D.bool,
      }),
      LanguageOptions: D.m({ header: "x-amzn-transcribe-language-options" }),
      PreferredLanguage: D.m({
        header: "x-amzn-transcribe-preferred-language",
      }),
      VocabularyNames: D.m({ header: "x-amzn-transcribe-vocabulary-names" }),
      VocabularyFilterNames: D.m({
        header: "x-amzn-transcribe-vocabulary-filter-names",
      }),
      EnablePartialResultsStabilization: D.m({
        header: "x-amzn-transcribe-enable-partial-results-stabilization",
        shape: D.bool,
      }),
      PartialResultsStability: D.m({
        header: "x-amzn-transcribe-partial-results-stability",
      }),
      ContentIdentificationType: D.m({
        header: "x-amzn-transcribe-content-identification-type",
      }),
      ContentRedactionType: D.m({
        header: "x-amzn-transcribe-content-redaction-type",
      }),
      PiiEntityTypes: D.m({ header: "x-amzn-transcribe-pii-entity-types" }),
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /medical-scribe-stream",
    input: {
      SessionId: D.m({ header: "x-amzn-transcribe-session-id" }),
      LanguageCode: D.m({ header: "x-amzn-transcribe-language-code" }),
      MediaSampleRateHertz: D.m({ header: "x-amzn-transcribe-sample-rate" }),
      MediaEncoding: D.m({ header: "x-amzn-transcribe-media-encoding" }),
      InputStream: D.m({
        payload: true,
        shape: D.events(
          {
            AudioEvent: { AudioChunk: 0 },
            SessionControlEvent: { Type: 0 },
            ConfigurationEvent: {
              VocabularyName: 0,
              VocabularyFilterName: 0,
              VocabularyFilterMethod: 0,
              ResourceAccessRoleArn: 0,
              ChannelDefinitions: D.list({ ChannelId: 0, ParticipantRole: 0 }),
              EncryptionSettings: { KmsEncryptionContext: 0, KmsKeyId: 0 },
              PostStreamAnalyticsSettings: {
                ClinicalNoteGenerationSettings: {
                  OutputBucketName: 0,
                  NoteTemplate: 0,
                },
              },
              MedicalScribeContext: { PatientContext: { Pronouns: 0 } },
            },
          },
          { AudioEvent: "AudioChunk" },
        ),
      }),
    },
    output: {
      SessionId: D.m({ header: "x-amzn-transcribe-session-id" }),
      RequestId: D.m({ header: "x-amzn-request-id" }),
      LanguageCode: D.m({ header: "x-amzn-transcribe-language-code" }),
      MediaSampleRateHertz: D.m({
        header: "x-amzn-transcribe-sample-rate",
        shape: D.num,
      }),
      MediaEncoding: D.m({ header: "x-amzn-transcribe-media-encoding" }),
      ResultStream: D.m({
        payload: true,
        shape: D.events({
          TranscriptEvent: 0,
          BadRequestException: 0,
          LimitExceededException: 0,
          InternalFailureException: 0,
          ConflictException: 0,
          ServiceUnavailableException: 0,
        }),
      }),
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /medical-stream-transcription",
    input: {
      LanguageCode: D.m({ header: "x-amzn-transcribe-language-code" }),
      MediaSampleRateHertz: D.m({ header: "x-amzn-transcribe-sample-rate" }),
      MediaEncoding: D.m({ header: "x-amzn-transcribe-media-encoding" }),
      VocabularyName: D.m({ header: "x-amzn-transcribe-vocabulary-name" }),
      Specialty: D.m({ header: "x-amzn-transcribe-specialty" }),
      Type: D.m({ header: "x-amzn-transcribe-type" }),
      ShowSpeakerLabel: D.m({ header: "x-amzn-transcribe-show-speaker-label" }),
      SessionId: D.m({ header: "x-amzn-transcribe-session-id" }),
      AudioStream: D.m({
        payload: true,
        shape: D.events(
          {
            AudioEvent: i_AudioEvent,
            ConfigurationEvent: i_ConfigurationEvent,
          },
          { AudioEvent: "AudioChunk" },
        ),
      }),
      EnableChannelIdentification: D.m({
        header: "x-amzn-transcribe-enable-channel-identification",
      }),
      NumberOfChannels: D.m({ header: "x-amzn-transcribe-number-of-channels" }),
      ContentIdentificationType: D.m({
        header: "x-amzn-transcribe-content-identification-type",
      }),
    },
    output: {
      RequestId: D.m({ header: "x-amzn-request-id" }),
      LanguageCode: D.m({ header: "x-amzn-transcribe-language-code" }),
      MediaSampleRateHertz: D.m({
        header: "x-amzn-transcribe-sample-rate",
        shape: D.num,
      }),
      MediaEncoding: D.m({ header: "x-amzn-transcribe-media-encoding" }),
      VocabularyName: D.m({ header: "x-amzn-transcribe-vocabulary-name" }),
      Specialty: D.m({ header: "x-amzn-transcribe-specialty" }),
      Type: D.m({ header: "x-amzn-transcribe-type" }),
      ShowSpeakerLabel: D.m({
        header: "x-amzn-transcribe-show-speaker-label",
        shape: D.bool,
      }),
      SessionId: D.m({ header: "x-amzn-transcribe-session-id" }),
      TranscriptResultStream: D.m({
        payload: true,
        shape: D.events({
          TranscriptEvent: 0,
          BadRequestException: 0,
          LimitExceededException: 0,
          InternalFailureException: 0,
          ConflictException: 0,
          ServiceUnavailableException: 0,
        }),
      }),
      EnableChannelIdentification: D.m({
        header: "x-amzn-transcribe-enable-channel-identification",
        shape: D.bool,
      }),
      NumberOfChannels: D.m({
        header: "x-amzn-transcribe-number-of-channels",
        shape: D.num,
      }),
      ContentIdentificationType: D.m({
        header: "x-amzn-transcribe-content-identification-type",
      }),
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /stream-transcription",
    input: {
      LanguageCode: D.m({ header: "x-amzn-transcribe-language-code" }),
      MediaSampleRateHertz: D.m({ header: "x-amzn-transcribe-sample-rate" }),
      MediaEncoding: D.m({ header: "x-amzn-transcribe-media-encoding" }),
      VocabularyName: D.m({ header: "x-amzn-transcribe-vocabulary-name" }),
      SessionId: D.m({ header: "x-amzn-transcribe-session-id" }),
      AudioStream: D.m({
        payload: true,
        shape: D.events(
          {
            AudioEvent: i_AudioEvent,
            ConfigurationEvent: i_ConfigurationEvent,
          },
          { AudioEvent: "AudioChunk" },
        ),
      }),
      VocabularyFilterName: D.m({
        header: "x-amzn-transcribe-vocabulary-filter-name",
      }),
      VocabularyFilterMethod: D.m({
        header: "x-amzn-transcribe-vocabulary-filter-method",
      }),
      ShowSpeakerLabel: D.m({ header: "x-amzn-transcribe-show-speaker-label" }),
      EnableChannelIdentification: D.m({
        header: "x-amzn-transcribe-enable-channel-identification",
      }),
      NumberOfChannels: D.m({ header: "x-amzn-transcribe-number-of-channels" }),
      EnablePartialResultsStabilization: D.m({
        header: "x-amzn-transcribe-enable-partial-results-stabilization",
      }),
      PartialResultsStability: D.m({
        header: "x-amzn-transcribe-partial-results-stability",
      }),
      ContentIdentificationType: D.m({
        header: "x-amzn-transcribe-content-identification-type",
      }),
      ContentRedactionType: D.m({
        header: "x-amzn-transcribe-content-redaction-type",
      }),
      PiiEntityTypes: D.m({ header: "x-amzn-transcribe-pii-entity-types" }),
      LanguageModelName: D.m({
        header: "x-amzn-transcribe-language-model-name",
      }),
      IdentifyLanguage: D.m({ header: "x-amzn-transcribe-identify-language" }),
      LanguageOptions: D.m({ header: "x-amzn-transcribe-language-options" }),
      PreferredLanguage: D.m({
        header: "x-amzn-transcribe-preferred-language",
      }),
      IdentifyMultipleLanguages: D.m({
        header: "x-amzn-transcribe-identify-multiple-languages",
      }),
      VocabularyNames: D.m({ header: "x-amzn-transcribe-vocabulary-names" }),
      VocabularyFilterNames: D.m({
        header: "x-amzn-transcribe-vocabulary-filter-names",
      }),
      SessionResumeWindow: D.m({
        header: "x-amzn-transcribe-session-resume-window",
      }),
      TranscriptFormat: D.m({ header: "x-amzn-transcribe-transcript-format" }),
    },
    output: {
      RequestId: D.m({ header: "x-amzn-request-id" }),
      LanguageCode: D.m({ header: "x-amzn-transcribe-language-code" }),
      MediaSampleRateHertz: D.m({
        header: "x-amzn-transcribe-sample-rate",
        shape: D.num,
      }),
      MediaEncoding: D.m({ header: "x-amzn-transcribe-media-encoding" }),
      VocabularyName: D.m({ header: "x-amzn-transcribe-vocabulary-name" }),
      SessionId: D.m({ header: "x-amzn-transcribe-session-id" }),
      TranscriptResultStream: D.m({
        payload: true,
        shape: D.events({
          TranscriptEvent: 0,
          BadRequestException: 0,
          LimitExceededException: 0,
          InternalFailureException: 0,
          ConflictException: 0,
          ServiceUnavailableException: 0,
        }),
      }),
      VocabularyFilterName: D.m({
        header: "x-amzn-transcribe-vocabulary-filter-name",
      }),
      VocabularyFilterMethod: D.m({
        header: "x-amzn-transcribe-vocabulary-filter-method",
      }),
      ShowSpeakerLabel: D.m({
        header: "x-amzn-transcribe-show-speaker-label",
        shape: D.bool,
      }),
      EnableChannelIdentification: D.m({
        header: "x-amzn-transcribe-enable-channel-identification",
        shape: D.bool,
      }),
      NumberOfChannels: D.m({
        header: "x-amzn-transcribe-number-of-channels",
        shape: D.num,
      }),
      EnablePartialResultsStabilization: D.m({
        header: "x-amzn-transcribe-enable-partial-results-stabilization",
        shape: D.bool,
      }),
      PartialResultsStability: D.m({
        header: "x-amzn-transcribe-partial-results-stability",
      }),
      ContentIdentificationType: D.m({
        header: "x-amzn-transcribe-content-identification-type",
      }),
      ContentRedactionType: D.m({
        header: "x-amzn-transcribe-content-redaction-type",
      }),
      PiiEntityTypes: D.m({ header: "x-amzn-transcribe-pii-entity-types" }),
      LanguageModelName: D.m({
        header: "x-amzn-transcribe-language-model-name",
      }),
      IdentifyLanguage: D.m({
        header: "x-amzn-transcribe-identify-language",
        shape: D.bool,
      }),
      LanguageOptions: D.m({ header: "x-amzn-transcribe-language-options" }),
      PreferredLanguage: D.m({
        header: "x-amzn-transcribe-preferred-language",
      }),
      IdentifyMultipleLanguages: D.m({
        header: "x-amzn-transcribe-identify-multiple-languages",
        shape: D.bool,
      }),
      VocabularyNames: D.m({ header: "x-amzn-transcribe-vocabulary-names" }),
      VocabularyFilterNames: D.m({
        header: "x-amzn-transcribe-vocabulary-filter-names",
      }),
      SessionResumeWindow: D.m({
        header: "x-amzn-transcribe-session-resume-window",
        shape: D.num,
      }),
      TranscriptFormat: D.m({ header: "x-amzn-transcribe-transcript-format" }),
    },
  },
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
})) as any;

const i_AudioEvent: D.LazyStruct = () => ({ AudioChunk: 0 });
const i_ConfigurationEvent: D.LazyStruct = () => ({
  ChannelDefinitions: D.list({ ChannelId: 0, ParticipantRole: 0 }),
  PostCallAnalyticsSettings: {
    OutputLocation: 0,
    DataAccessRoleArn: 0,
    ContentRedactionOutput: 0,
    OutputEncryptionKMSKeyId: 0,
  },
});
