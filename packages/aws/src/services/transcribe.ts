import type * as HttpClient from "effect/unstable/http/HttpClient";
import * as API from "@distilled.cloud/core/api";
import * as D from "@distilled.cloud/core/shape";
import * as TE from "@distilled.cloud/core/error-class";
import { AwsProtocol } from "../protocol.ts";
import { awsJson1_1Protocol } from "../protocols/aws-json.ts";
import { Retry } from "../retry.ts";
import type * as T from "../types.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
const svc: T.ServiceInfo = {
  sdkId: "Transcribe",
  target: "Transcribe",
  version: "2017-10-26",
  sigv4: "transcribe",
  protocol: awsJson1_1Protocol,
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
                `https://transcribe-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              if (_.getAttr(PartitionResult, "name") === "aws") {
                return e(`https://fips.transcribe.${Region}.amazonaws.com`);
              }
              if (_.getAttr(PartitionResult, "name") === "aws-us-gov") {
                return e(`https://fips.transcribe.${Region}.amazonaws.com`);
              }
              return e(
                `https://transcribe-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://transcribe.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          if (Region === "cn-north-1") {
            return e("https://cn.transcribe.cn-north-1.amazonaws.com.cn");
          }
          if (Region === "cn-northwest-1") {
            return e("https://cn.transcribe.cn-northwest-1.amazonaws.com.cn");
          }
          return e(
            `https://transcribe.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
export class NotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "NotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export type CategoryName = string;
export type TimestampMilliseconds = number;
export interface AbsoluteTimeRange {
  StartTime?: number;
  EndTime?: number;
  First?: number;
  Last?: number;
}
export type Percentage = number;
export interface RelativeTimeRange {
  StartPercentage?: number;
  EndPercentage?: number;
  First?: number;
  Last?: number;
}
export interface NonTalkTimeFilter {
  Threshold?: number;
  AbsoluteTimeRange?: AbsoluteTimeRange;
  RelativeTimeRange?: RelativeTimeRange;
  Negate?: boolean;
}
export type ParticipantRole = "AGENT" | "CUSTOMER" | (string & {});
export interface InterruptionFilter {
  Threshold?: number;
  ParticipantRole?: ParticipantRole;
  AbsoluteTimeRange?: AbsoluteTimeRange;
  RelativeTimeRange?: RelativeTimeRange;
  Negate?: boolean;
}
export type TranscriptFilterType = "EXACT" | (string & {});
export type NonEmptyString = string;
export type StringTargetList = string[];
export interface TranscriptFilter {
  TranscriptFilterType: TranscriptFilterType;
  AbsoluteTimeRange?: AbsoluteTimeRange;
  RelativeTimeRange?: RelativeTimeRange;
  ParticipantRole?: ParticipantRole;
  Negate?: boolean;
  Targets: string[];
}
export type SentimentValue =
  | "POSITIVE"
  | "NEGATIVE"
  | "NEUTRAL"
  | "MIXED"
  | (string & {});
export type SentimentValueList = SentimentValue[];
export interface SentimentFilter {
  Sentiments: SentimentValue[];
  AbsoluteTimeRange?: AbsoluteTimeRange;
  RelativeTimeRange?: RelativeTimeRange;
  ParticipantRole?: ParticipantRole;
  Negate?: boolean;
}
export type Rule =
  | {
      NonTalkTimeFilter: NonTalkTimeFilter;
      InterruptionFilter?: never;
      TranscriptFilter?: never;
      SentimentFilter?: never;
    }
  | {
      NonTalkTimeFilter?: never;
      InterruptionFilter: InterruptionFilter;
      TranscriptFilter?: never;
      SentimentFilter?: never;
    }
  | {
      NonTalkTimeFilter?: never;
      InterruptionFilter?: never;
      TranscriptFilter: TranscriptFilter;
      SentimentFilter?: never;
    }
  | {
      NonTalkTimeFilter?: never;
      InterruptionFilter?: never;
      TranscriptFilter?: never;
      SentimentFilter: SentimentFilter;
    };
export type RuleList = Rule[];
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  Key: string;
  Value: string;
}
export type TagList = Tag[];
export type InputType = "REAL_TIME" | "POST_CALL" | (string & {});
export interface CreateCallAnalyticsCategoryRequest {
  CategoryName: string;
  Rules: Rule[];
  Tags?: Tag[];
  InputType?: InputType;
}
export interface CategoryProperties {
  CategoryName?: string;
  Rules?: Rule[];
  CreateTime?: Date;
  LastUpdateTime?: Date;
  Tags?: Tag[];
  InputType?: InputType;
}
export interface CreateCallAnalyticsCategoryResponse {
  CategoryProperties?: CategoryProperties;
}
export type CLMLanguageCode =
  | "en-US"
  | "hi-IN"
  | "es-US"
  | "en-GB"
  | "en-AU"
  | "de-DE"
  | "ja-JP"
  | (string & {});
export type BaseModelName = "NarrowBand" | "WideBand" | (string & {});
export type ModelName = string;
export type Uri = string;
export type DataAccessRoleArn = string;
export interface InputDataConfig {
  S3Uri: string;
  TuningDataS3Uri?: string;
  DataAccessRoleArn: string;
}
export interface CreateLanguageModelRequest {
  LanguageCode: CLMLanguageCode;
  BaseModelName: BaseModelName;
  ModelName: string;
  InputDataConfig: InputDataConfig;
  Tags?: Tag[];
}
export type ModelStatus =
  | "IN_PROGRESS"
  | "FAILED"
  | "COMPLETED"
  | (string & {});
export interface CreateLanguageModelResponse {
  LanguageCode?: CLMLanguageCode;
  BaseModelName?: BaseModelName;
  ModelName?: string;
  InputDataConfig?: InputDataConfig;
  ModelStatus?: ModelStatus;
}
export type VocabularyName = string;
export type LanguageCode =
  | "af-ZA"
  | "ar-AE"
  | "ar-SA"
  | "am-ET"
  | "cy-GB"
  | "da-DK"
  | "de-CH"
  | "de-DE"
  | "en-AB"
  | "en-AU"
  | "en-GB"
  | "en-IE"
  | "en-IN"
  | "en-US"
  | "en-WL"
  | "es-ES"
  | "es-MX"
  | "es-US"
  | "fa-AF"
  | "fa-IR"
  | "fr-CA"
  | "fr-FR"
  | "ga-IE"
  | "gd-GB"
  | "he-IL"
  | "hi-IN"
  | "ht-HT"
  | "id-ID"
  | "it-IT"
  | "ja-JP"
  | "jv-ID"
  | "km-KH"
  | "ko-KR"
  | "my-MM"
  | "ms-MY"
  | "nl-NL"
  | "pt-BR"
  | "pt-PT"
  | "ru-RU"
  | "ta-IN"
  | "te-IN"
  | "tr-TR"
  | "zh-CN"
  | "zh-TW"
  | "th-TH"
  | "en-ZA"
  | "en-NZ"
  | "vi-VN"
  | "sv-SE"
  | "ab-GE"
  | "ast-ES"
  | "az-AZ"
  | "ba-RU"
  | "be-BY"
  | "bg-BG"
  | "bn-IN"
  | "bs-BA"
  | "ca-ES"
  | "ckb-IQ"
  | "ckb-IR"
  | "cs-CZ"
  | "cy-WL"
  | "el-GR"
  | "et-EE"
  | "et-ET"
  | "eu-ES"
  | "fi-FI"
  | "gl-ES"
  | "gu-IN"
  | "ha-NG"
  | "hr-HR"
  | "hu-HU"
  | "hy-AM"
  | "is-IS"
  | "ka-GE"
  | "kab-DZ"
  | "kk-KZ"
  | "kn-IN"
  | "ky-KG"
  | "lg-IN"
  | "lt-LT"
  | "lv-LV"
  | "mhr-RU"
  | "mi-NZ"
  | "mk-MK"
  | "ml-IN"
  | "mn-MN"
  | "mr-IN"
  | "mt-MT"
  | "no-NO"
  | "ne-NP"
  | "or-IN"
  | "pa-IN"
  | "pl-PL"
  | "ps-AF"
  | "ro-RO"
  | "rw-RW"
  | "si-LK"
  | "sk-SK"
  | "sl-SI"
  | "so-SO"
  | "sq-AL"
  | "sr-RS"
  | "su-ID"
  | "sw-BI"
  | "sw-KE"
  | "sw-RW"
  | "sw-TZ"
  | "sw-UG"
  | "tl-PH"
  | "tt-RU"
  | "ug-CN"
  | "uk-UA"
  | "uz-UZ"
  | "wo-SN"
  | "zh-HK"
  | "zu-ZA"
  | (string & {});
export interface CreateMedicalVocabularyRequest {
  VocabularyName: string;
  LanguageCode: LanguageCode;
  VocabularyFileUri: string;
  Tags?: Tag[];
}
export type VocabularyState = "PENDING" | "READY" | "FAILED" | (string & {});
export type FailureReason = string;
export interface CreateMedicalVocabularyResponse {
  VocabularyName?: string;
  LanguageCode?: LanguageCode;
  VocabularyState?: VocabularyState;
  LastModifiedTime?: Date;
  FailureReason?: string;
}
export type Phrase = string;
export type Phrases = string[];
export interface CreateVocabularyRequest {
  VocabularyName: string;
  LanguageCode: LanguageCode;
  Phrases?: string[];
  VocabularyFileUri?: string;
  Tags?: Tag[];
  DataAccessRoleArn?: string;
}
export interface CreateVocabularyResponse {
  VocabularyName?: string;
  LanguageCode?: LanguageCode;
  VocabularyState?: VocabularyState;
  LastModifiedTime?: Date;
  FailureReason?: string;
}
export type VocabularyFilterName = string;
export type Word = string;
export type Words = string[];
export interface CreateVocabularyFilterRequest {
  VocabularyFilterName: string;
  LanguageCode: LanguageCode;
  Words?: string[];
  VocabularyFilterFileUri?: string;
  Tags?: Tag[];
  DataAccessRoleArn?: string;
}
export interface CreateVocabularyFilterResponse {
  VocabularyFilterName?: string;
  LanguageCode?: LanguageCode;
  LastModifiedTime?: Date;
}
export interface DeleteCallAnalyticsCategoryRequest {
  CategoryName: string;
}
export interface DeleteCallAnalyticsCategoryResponse {}
export type CallAnalyticsJobName = string;
export interface DeleteCallAnalyticsJobRequest {
  CallAnalyticsJobName: string;
}
export interface DeleteCallAnalyticsJobResponse {}
export interface DeleteLanguageModelRequest {
  ModelName: string;
}
export interface DeleteLanguageModelResponse {}
export type TranscriptionJobName = string;
export interface DeleteMedicalScribeJobRequest {
  MedicalScribeJobName: string;
}
export interface DeleteMedicalScribeJobResponse {}
export interface DeleteMedicalTranscriptionJobRequest {
  MedicalTranscriptionJobName: string;
}
export interface DeleteMedicalTranscriptionJobResponse {}
export interface DeleteMedicalVocabularyRequest {
  VocabularyName: string;
}
export interface DeleteMedicalVocabularyResponse {}
export interface DeleteTranscriptionJobRequest {
  TranscriptionJobName: string;
}
export interface DeleteTranscriptionJobResponse {}
export interface DeleteVocabularyRequest {
  VocabularyName: string;
}
export interface DeleteVocabularyResponse {}
export interface DeleteVocabularyFilterRequest {
  VocabularyFilterName: string;
}
export interface DeleteVocabularyFilterResponse {}
export interface DescribeLanguageModelRequest {
  ModelName: string;
}
export interface LanguageModel {
  ModelName?: string;
  CreateTime?: Date;
  LastModifiedTime?: Date;
  LanguageCode?: CLMLanguageCode;
  BaseModelName?: BaseModelName;
  ModelStatus?: ModelStatus;
  UpgradeAvailability?: boolean;
  FailureReason?: string;
  InputDataConfig?: InputDataConfig;
}
export interface DescribeLanguageModelResponse {
  LanguageModel?: LanguageModel;
}
export interface GetCallAnalyticsCategoryRequest {
  CategoryName: string;
}
export interface GetCallAnalyticsCategoryResponse {
  CategoryProperties?: CategoryProperties;
}
export interface GetCallAnalyticsJobRequest {
  CallAnalyticsJobName: string;
}
export type CallAnalyticsJobStatus =
  | "QUEUED"
  | "IN_PROGRESS"
  | "FAILED"
  | "COMPLETED"
  | (string & {});
export type CallAnalyticsFeature = "GENERATIVE_SUMMARIZATION" | (string & {});
export type CallAnalyticsSkippedReasonCode =
  | "INSUFFICIENT_CONVERSATION_CONTENT"
  | "FAILED_SAFETY_GUIDELINES"
  | (string & {});
export interface CallAnalyticsSkippedFeature {
  Feature?: CallAnalyticsFeature;
  ReasonCode?: CallAnalyticsSkippedReasonCode;
  Message?: string;
}
export type CallAnalyticsSkippedFeatureList = CallAnalyticsSkippedFeature[];
export interface CallAnalyticsJobDetails {
  Skipped?: CallAnalyticsSkippedFeature[];
}
export type MediaSampleRateHertz = number;
export type MediaFormat =
  | "mp3"
  | "mp4"
  | "wav"
  | "flac"
  | "ogg"
  | "amr"
  | "webm"
  | "m4a"
  | (string & {});
export interface Media {
  MediaFileUri?: string;
  RedactedMediaFileUri?: string;
}
export interface Transcript {
  TranscriptFileUri?: string;
  RedactedTranscriptFileUri?: string;
}
export type IdentifiedLanguageScore = number;
export type VocabularyFilterMethod = "remove" | "mask" | "tag" | (string & {});
export type RedactionType = "PII" | (string & {});
export type RedactionOutput =
  | "redacted"
  | "redacted_and_unredacted"
  | (string & {});
export type PiiEntityType =
  | "BANK_ACCOUNT_NUMBER"
  | "BANK_ROUTING"
  | "CREDIT_DEBIT_NUMBER"
  | "CREDIT_DEBIT_CVV"
  | "CREDIT_DEBIT_EXPIRY"
  | "PIN"
  | "EMAIL"
  | "ADDRESS"
  | "NAME"
  | "PHONE"
  | "SSN"
  | "ALL"
  | (string & {});
export type PiiEntityTypes = PiiEntityType[];
export interface ContentRedaction {
  RedactionType: RedactionType;
  RedactionOutput: RedactionOutput;
  PiiEntityTypes?: PiiEntityType[];
}
export type LanguageOptions = LanguageCode[];
export interface LanguageIdSettings {
  VocabularyName?: string;
  VocabularyFilterName?: string;
  LanguageModelName?: string;
}
export type LanguageIdSettingsMap = {
  [key in LanguageCode]?: LanguageIdSettings;
};
export interface Summarization {
  GenerateAbstractiveSummary: boolean;
}
export interface CallAnalyticsJobSettings {
  VocabularyName?: string;
  VocabularyFilterName?: string;
  VocabularyFilterMethod?: VocabularyFilterMethod;
  LanguageModelName?: string;
  ContentRedaction?: ContentRedaction;
  LanguageOptions?: LanguageCode[];
  LanguageIdSettings?: { [key: string]: LanguageIdSettings | undefined };
  Summarization?: Summarization;
}
export type ChannelId = number;
export interface ChannelDefinition {
  ChannelId?: number;
  ParticipantRole?: ParticipantRole;
}
export type ChannelDefinitions = ChannelDefinition[];
export interface CallAnalyticsJob {
  CallAnalyticsJobName?: string;
  CallAnalyticsJobStatus?: CallAnalyticsJobStatus;
  CallAnalyticsJobDetails?: CallAnalyticsJobDetails;
  LanguageCode?: LanguageCode;
  MediaSampleRateHertz?: number;
  MediaFormat?: MediaFormat;
  Media?: Media;
  Transcript?: Transcript;
  StartTime?: Date;
  CreationTime?: Date;
  CompletionTime?: Date;
  FailureReason?: string;
  DataAccessRoleArn?: string;
  IdentifiedLanguageScore?: number;
  Settings?: CallAnalyticsJobSettings;
  ChannelDefinitions?: ChannelDefinition[];
  Tags?: Tag[];
}
export interface GetCallAnalyticsJobResponse {
  CallAnalyticsJob?: CallAnalyticsJob;
}
export interface GetMedicalScribeJobRequest {
  MedicalScribeJobName: string;
}
export type MedicalScribeJobStatus =
  | "QUEUED"
  | "IN_PROGRESS"
  | "FAILED"
  | "COMPLETED"
  | (string & {});
export type MedicalScribeLanguageCode = "en-US" | (string & {});
export interface MedicalScribeOutput {
  TranscriptFileUri: string;
  ClinicalDocumentUri: string;
}
export type MaxSpeakers = number;
export type MedicalScribeNoteTemplate =
  | "HISTORY_AND_PHYSICAL"
  | "GIRPP"
  | "BIRP"
  | "SIRP"
  | "DAP"
  | "BEHAVIORAL_SOAP"
  | "PHYSICAL_SOAP"
  | (string & {});
export interface ClinicalNoteGenerationSettings {
  NoteTemplate?: MedicalScribeNoteTemplate;
}
export interface MedicalScribeSettings {
  ShowSpeakerLabels?: boolean;
  MaxSpeakerLabels?: number;
  ChannelIdentification?: boolean;
  VocabularyName?: string;
  VocabularyFilterName?: string;
  VocabularyFilterMethod?: VocabularyFilterMethod;
  ClinicalNoteGenerationSettings?: ClinicalNoteGenerationSettings;
}
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
export interface MedicalScribeJob {
  MedicalScribeJobName?: string;
  MedicalScribeJobStatus?: MedicalScribeJobStatus;
  LanguageCode?: MedicalScribeLanguageCode;
  Media?: Media;
  MedicalScribeOutput?: MedicalScribeOutput;
  StartTime?: Date;
  CreationTime?: Date;
  CompletionTime?: Date;
  FailureReason?: string;
  Settings?: MedicalScribeSettings;
  DataAccessRoleArn?: string;
  ChannelDefinitions?: MedicalScribeChannelDefinition[];
  MedicalScribeContextProvided?: boolean;
  Tags?: Tag[];
}
export interface GetMedicalScribeJobResponse {
  MedicalScribeJob?: MedicalScribeJob;
}
export interface GetMedicalTranscriptionJobRequest {
  MedicalTranscriptionJobName: string;
}
export type TranscriptionJobStatus =
  | "QUEUED"
  | "IN_PROGRESS"
  | "FAILED"
  | "COMPLETED"
  | (string & {});
export type MedicalMediaSampleRateHertz = number;
export interface MedicalTranscript {
  TranscriptFileUri?: string;
}
export type MaxAlternatives = number;
export interface MedicalTranscriptionSetting {
  ShowSpeakerLabels?: boolean;
  MaxSpeakerLabels?: number;
  ChannelIdentification?: boolean;
  ShowAlternatives?: boolean;
  MaxAlternatives?: number;
  VocabularyName?: string;
}
export type MedicalContentIdentificationType = "PHI" | (string & {});
export type Specialty = "PRIMARYCARE" | (string & {});
export type Type = "CONVERSATION" | "DICTATION" | (string & {});
export interface MedicalTranscriptionJob {
  MedicalTranscriptionJobName?: string;
  TranscriptionJobStatus?: TranscriptionJobStatus;
  LanguageCode?: LanguageCode;
  MediaSampleRateHertz?: number;
  MediaFormat?: MediaFormat;
  Media?: Media;
  Transcript?: MedicalTranscript;
  StartTime?: Date;
  CreationTime?: Date;
  CompletionTime?: Date;
  FailureReason?: string;
  Settings?: MedicalTranscriptionSetting;
  ContentIdentificationType?: MedicalContentIdentificationType;
  Specialty?: Specialty;
  Type?: Type;
  Tags?: Tag[];
}
export interface GetMedicalTranscriptionJobResponse {
  MedicalTranscriptionJob?: MedicalTranscriptionJob;
}
export interface GetMedicalVocabularyRequest {
  VocabularyName: string;
}
export interface GetMedicalVocabularyResponse {
  VocabularyName?: string;
  LanguageCode?: LanguageCode;
  VocabularyState?: VocabularyState;
  LastModifiedTime?: Date;
  FailureReason?: string;
  DownloadUri?: string;
}
export interface GetTranscriptionJobRequest {
  TranscriptionJobName: string;
}
export interface Settings {
  VocabularyName?: string;
  ShowSpeakerLabels?: boolean;
  MaxSpeakerLabels?: number;
  ChannelIdentification?: boolean;
  ShowAlternatives?: boolean;
  MaxAlternatives?: number;
  VocabularyFilterName?: string;
  VocabularyFilterMethod?: VocabularyFilterMethod;
}
export interface ModelSettings {
  LanguageModelName?: string;
}
export interface JobExecutionSettings {
  AllowDeferredExecution?: boolean;
  DataAccessRoleArn?: string;
}
export type DurationInSeconds = number;
export interface LanguageCodeItem {
  LanguageCode?: LanguageCode;
  DurationInSeconds?: number;
}
export type LanguageCodeList = LanguageCodeItem[];
export type SubtitleFormat = "vtt" | "srt" | (string & {});
export type SubtitleFormats = SubtitleFormat[];
export type SubtitleFileUris = string[];
export type SubtitleOutputStartIndex = number;
export interface SubtitlesOutput {
  Formats?: SubtitleFormat[];
  SubtitleFileUris?: string[];
  OutputStartIndex?: number;
}
export type ToxicityCategory = "ALL" | (string & {});
export type ToxicityCategories = ToxicityCategory[];
export interface ToxicityDetectionSettings {
  ToxicityCategories: ToxicityCategory[];
}
export type ToxicityDetection = ToxicityDetectionSettings[];
export interface TranscriptionJob {
  TranscriptionJobName?: string;
  TranscriptionJobStatus?: TranscriptionJobStatus;
  LanguageCode?: LanguageCode;
  MediaSampleRateHertz?: number;
  MediaFormat?: MediaFormat;
  Media?: Media;
  Transcript?: Transcript;
  StartTime?: Date;
  CreationTime?: Date;
  CompletionTime?: Date;
  FailureReason?: string;
  Settings?: Settings;
  ModelSettings?: ModelSettings;
  JobExecutionSettings?: JobExecutionSettings;
  ContentRedaction?: ContentRedaction;
  IdentifyLanguage?: boolean;
  IdentifyMultipleLanguages?: boolean;
  LanguageOptions?: LanguageCode[];
  IdentifiedLanguageScore?: number;
  LanguageCodes?: LanguageCodeItem[];
  Tags?: Tag[];
  Subtitles?: SubtitlesOutput;
  LanguageIdSettings?: { [key: string]: LanguageIdSettings | undefined };
  ToxicityDetection?: ToxicityDetectionSettings[];
}
export interface GetTranscriptionJobResponse {
  TranscriptionJob?: TranscriptionJob;
}
export interface GetVocabularyRequest {
  VocabularyName: string;
}
export interface GetVocabularyResponse {
  VocabularyName?: string;
  LanguageCode?: LanguageCode;
  VocabularyState?: VocabularyState;
  LastModifiedTime?: Date;
  FailureReason?: string;
  DownloadUri?: string;
}
export interface GetVocabularyFilterRequest {
  VocabularyFilterName: string;
}
export interface GetVocabularyFilterResponse {
  VocabularyFilterName?: string;
  LanguageCode?: LanguageCode;
  LastModifiedTime?: Date;
  DownloadUri?: string;
}
export type NextToken = string;
export type MaxResults = number;
export interface ListCallAnalyticsCategoriesRequest {
  NextToken?: string;
  MaxResults?: number;
}
export type CategoryPropertiesList = CategoryProperties[];
export interface ListCallAnalyticsCategoriesResponse {
  NextToken?: string;
  Categories?: CategoryProperties[];
}
export interface ListCallAnalyticsJobsRequest {
  Status?: CallAnalyticsJobStatus;
  JobNameContains?: string;
  NextToken?: string;
  MaxResults?: number;
}
export interface CallAnalyticsJobSummary {
  CallAnalyticsJobName?: string;
  CreationTime?: Date;
  StartTime?: Date;
  CompletionTime?: Date;
  LanguageCode?: LanguageCode;
  CallAnalyticsJobStatus?: CallAnalyticsJobStatus;
  CallAnalyticsJobDetails?: CallAnalyticsJobDetails;
  FailureReason?: string;
}
export type CallAnalyticsJobSummaries = CallAnalyticsJobSummary[];
export interface ListCallAnalyticsJobsResponse {
  Status?: CallAnalyticsJobStatus;
  NextToken?: string;
  CallAnalyticsJobSummaries?: CallAnalyticsJobSummary[];
}
export interface ListLanguageModelsRequest {
  StatusEquals?: ModelStatus;
  NameContains?: string;
  NextToken?: string;
  MaxResults?: number;
}
export type Models = LanguageModel[];
export interface ListLanguageModelsResponse {
  NextToken?: string;
  Models?: LanguageModel[];
}
export interface ListMedicalScribeJobsRequest {
  Status?: MedicalScribeJobStatus;
  JobNameContains?: string;
  NextToken?: string;
  MaxResults?: number;
}
export interface MedicalScribeJobSummary {
  MedicalScribeJobName?: string;
  CreationTime?: Date;
  StartTime?: Date;
  CompletionTime?: Date;
  LanguageCode?: MedicalScribeLanguageCode;
  MedicalScribeJobStatus?: MedicalScribeJobStatus;
  FailureReason?: string;
}
export type MedicalScribeJobSummaries = MedicalScribeJobSummary[];
export interface ListMedicalScribeJobsResponse {
  Status?: MedicalScribeJobStatus;
  NextToken?: string;
  MedicalScribeJobSummaries?: MedicalScribeJobSummary[];
}
export interface ListMedicalTranscriptionJobsRequest {
  Status?: TranscriptionJobStatus;
  JobNameContains?: string;
  NextToken?: string;
  MaxResults?: number;
}
export type OutputLocationType =
  | "CUSTOMER_BUCKET"
  | "SERVICE_BUCKET"
  | (string & {});
export interface MedicalTranscriptionJobSummary {
  MedicalTranscriptionJobName?: string;
  CreationTime?: Date;
  StartTime?: Date;
  CompletionTime?: Date;
  LanguageCode?: LanguageCode;
  TranscriptionJobStatus?: TranscriptionJobStatus;
  FailureReason?: string;
  OutputLocationType?: OutputLocationType;
  Specialty?: Specialty;
  ContentIdentificationType?: MedicalContentIdentificationType;
  Type?: Type;
}
export type MedicalTranscriptionJobSummaries = MedicalTranscriptionJobSummary[];
export interface ListMedicalTranscriptionJobsResponse {
  Status?: TranscriptionJobStatus;
  NextToken?: string;
  MedicalTranscriptionJobSummaries?: MedicalTranscriptionJobSummary[];
}
export interface ListMedicalVocabulariesRequest {
  NextToken?: string;
  MaxResults?: number;
  StateEquals?: VocabularyState;
  NameContains?: string;
}
export interface VocabularyInfo {
  VocabularyName?: string;
  LanguageCode?: LanguageCode;
  LastModifiedTime?: Date;
  VocabularyState?: VocabularyState;
}
export type Vocabularies = VocabularyInfo[];
export interface ListMedicalVocabulariesResponse {
  Status?: VocabularyState;
  NextToken?: string;
  Vocabularies?: VocabularyInfo[];
}
export type TranscribeArn = string;
export interface ListTagsForResourceRequest {
  ResourceArn: string;
}
export interface ListTagsForResourceResponse {
  ResourceArn?: string;
  Tags?: Tag[];
}
export interface ListTranscriptionJobsRequest {
  Status?: TranscriptionJobStatus;
  JobNameContains?: string;
  NextToken?: string;
  MaxResults?: number;
}
export interface TranscriptionJobSummary {
  TranscriptionJobName?: string;
  CreationTime?: Date;
  StartTime?: Date;
  CompletionTime?: Date;
  LanguageCode?: LanguageCode;
  TranscriptionJobStatus?: TranscriptionJobStatus;
  FailureReason?: string;
  OutputLocationType?: OutputLocationType;
  ContentRedaction?: ContentRedaction;
  ModelSettings?: ModelSettings;
  IdentifyLanguage?: boolean;
  IdentifyMultipleLanguages?: boolean;
  IdentifiedLanguageScore?: number;
  LanguageCodes?: LanguageCodeItem[];
  ToxicityDetection?: ToxicityDetectionSettings[];
}
export type TranscriptionJobSummaries = TranscriptionJobSummary[];
export interface ListTranscriptionJobsResponse {
  Status?: TranscriptionJobStatus;
  NextToken?: string;
  TranscriptionJobSummaries?: TranscriptionJobSummary[];
}
export interface ListVocabulariesRequest {
  NextToken?: string;
  MaxResults?: number;
  StateEquals?: VocabularyState;
  NameContains?: string;
}
export interface ListVocabulariesResponse {
  Status?: VocabularyState;
  NextToken?: string;
  Vocabularies?: VocabularyInfo[];
}
export interface ListVocabularyFiltersRequest {
  NextToken?: string;
  MaxResults?: number;
  NameContains?: string;
}
export interface VocabularyFilterInfo {
  VocabularyFilterName?: string;
  LanguageCode?: LanguageCode;
  LastModifiedTime?: Date;
}
export type VocabularyFilters = VocabularyFilterInfo[];
export interface ListVocabularyFiltersResponse {
  NextToken?: string;
  VocabularyFilters?: VocabularyFilterInfo[];
}
export type KMSKeyId = string;
export interface StartCallAnalyticsJobRequest {
  CallAnalyticsJobName: string;
  Media: Media;
  OutputLocation?: string;
  OutputEncryptionKMSKeyId?: string;
  DataAccessRoleArn?: string;
  Settings?: CallAnalyticsJobSettings;
  Tags?: Tag[];
  ChannelDefinitions?: ChannelDefinition[];
}
export interface StartCallAnalyticsJobResponse {
  CallAnalyticsJob?: CallAnalyticsJob;
}
export type OutputBucketName = string;
export type KMSEncryptionContextMap = { [key: string]: string | undefined };
export type Pronouns = "HE_HIM" | "SHE_HER" | "THEY_THEM" | (string & {});
export interface MedicalScribePatientContext {
  Pronouns?: Pronouns;
}
export interface MedicalScribeContext {
  PatientContext?: MedicalScribePatientContext;
}
export interface StartMedicalScribeJobRequest {
  MedicalScribeJobName: string;
  Media: Media;
  OutputBucketName: string;
  OutputEncryptionKMSKeyId?: string;
  KMSEncryptionContext?: { [key: string]: string | undefined };
  DataAccessRoleArn: string;
  Settings: MedicalScribeSettings;
  ChannelDefinitions?: MedicalScribeChannelDefinition[];
  Tags?: Tag[];
  MedicalScribeContext?: MedicalScribeContext;
}
export interface StartMedicalScribeJobResponse {
  MedicalScribeJob?: MedicalScribeJob;
}
export type OutputKey = string;
export interface StartMedicalTranscriptionJobRequest {
  MedicalTranscriptionJobName: string;
  LanguageCode: LanguageCode;
  MediaSampleRateHertz?: number;
  MediaFormat?: MediaFormat;
  Media: Media;
  OutputBucketName: string;
  OutputKey?: string;
  OutputEncryptionKMSKeyId?: string;
  KMSEncryptionContext?: { [key: string]: string | undefined };
  Settings?: MedicalTranscriptionSetting;
  ContentIdentificationType?: MedicalContentIdentificationType;
  Specialty: Specialty;
  Type: Type;
  Tags?: Tag[];
}
export interface StartMedicalTranscriptionJobResponse {
  MedicalTranscriptionJob?: MedicalTranscriptionJob;
}
export interface Subtitles {
  Formats?: SubtitleFormat[];
  OutputStartIndex?: number;
}
export interface StartTranscriptionJobRequest {
  TranscriptionJobName: string;
  LanguageCode?: LanguageCode;
  MediaSampleRateHertz?: number;
  MediaFormat?: MediaFormat;
  Media: Media;
  OutputBucketName?: string;
  OutputKey?: string;
  OutputEncryptionKMSKeyId?: string;
  KMSEncryptionContext?: { [key: string]: string | undefined };
  Settings?: Settings;
  ModelSettings?: ModelSettings;
  JobExecutionSettings?: JobExecutionSettings;
  ContentRedaction?: ContentRedaction;
  IdentifyLanguage?: boolean;
  IdentifyMultipleLanguages?: boolean;
  LanguageOptions?: LanguageCode[];
  Subtitles?: Subtitles;
  Tags?: Tag[];
  LanguageIdSettings?: { [key: string]: LanguageIdSettings | undefined };
  ToxicityDetection?: ToxicityDetectionSettings[];
}
export interface StartTranscriptionJobResponse {
  TranscriptionJob?: TranscriptionJob;
}
export interface TagResourceRequest {
  ResourceArn: string;
  Tags: Tag[];
}
export interface TagResourceResponse {}
export type TagKeyList = string[];
export interface UntagResourceRequest {
  ResourceArn: string;
  TagKeys: string[];
}
export interface UntagResourceResponse {}
export interface UpdateCallAnalyticsCategoryRequest {
  CategoryName: string;
  Rules: Rule[];
  InputType?: InputType;
}
export interface UpdateCallAnalyticsCategoryResponse {
  CategoryProperties?: CategoryProperties;
}
export interface UpdateMedicalVocabularyRequest {
  VocabularyName: string;
  LanguageCode: LanguageCode;
  VocabularyFileUri: string;
}
export interface UpdateMedicalVocabularyResponse {
  VocabularyName?: string;
  LanguageCode?: LanguageCode;
  LastModifiedTime?: Date;
  VocabularyState?: VocabularyState;
}
export interface UpdateVocabularyRequest {
  VocabularyName: string;
  LanguageCode: LanguageCode;
  Phrases?: string[];
  VocabularyFileUri?: string;
  DataAccessRoleArn?: string;
}
export interface UpdateVocabularyResponse {
  VocabularyName?: string;
  LanguageCode?: LanguageCode;
  LastModifiedTime?: Date;
  VocabularyState?: VocabularyState;
}
export interface UpdateVocabularyFilterRequest {
  VocabularyFilterName: string;
  Words?: string[];
  VocabularyFilterFileUri?: string;
  DataAccessRoleArn?: string;
}
export interface UpdateVocabularyFilterResponse {
  VocabularyFilterName?: string;
  LanguageCode?: LanguageCode;
  LastModifiedTime?: Date;
}
export type CreateCallAnalyticsCategoryError =
  | BadRequestException
  | ConflictException
  | InternalFailureException
  | LimitExceededException
  | CommonErrors;
/**
 * Creates a new Call Analytics category.
 *
 * All categories are automatically applied to your Call Analytics transcriptions. Note that in
 * order to apply categories to your transcriptions, you must create them before submitting your
 * transcription request, as categories cannot be applied retroactively.
 *
 * When creating a new category, you can use the `InputType` parameter to
 * label the category as a `POST_CALL` or a `REAL_TIME` category.
 * `POST_CALL` categories can only be applied to post-call transcriptions and
 * `REAL_TIME` categories can only be applied to real-time transcriptions. If you
 * do not include `InputType`, your category is created as a
 * `POST_CALL` category by default.
 *
 * Call Analytics categories are composed of rules. For each category, you must create
 * between 1 and 20 rules. Rules can include these parameters: , , , and .
 *
 * To update an existing category, see .
 *
 * To learn more about Call Analytics categories, see Creating categories for post-call
 * transcriptions and Creating categories for
 * real-time transcriptions.
 */
export const createCallAnalyticsCategory: API.OperationMethod<
  CreateCallAnalyticsCategoryRequest,
  CreateCallAnalyticsCategoryResponse,
  CreateCallAnalyticsCategoryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      CategoryName: 0,
      Rules: D.list(i_Rule),
      Tags: D.list(i_Tag),
      InputType: 0,
    },
    output: { CategoryProperties: o_CategoryProperties },
  },
  errors: [
    BadRequestException,
    ConflictException,
    InternalFailureException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCallAnalyticsCategory",
})) as any;

export type CreateLanguageModelError =
  | BadRequestException
  | ConflictException
  | InternalFailureException
  | LimitExceededException
  | CommonErrors;
/**
 * Creates a new custom language model.
 *
 * When creating a new custom language model, you must specify:
 *
 * - If you want a Wideband (audio sample rates over 16,000 Hz) or Narrowband
 * (audio sample rates under 16,000 Hz) base model
 *
 * - The location of your training and tuning files (this must be an Amazon S3 URI)
 *
 * - The language of your model
 *
 * - A unique name for your model
 */
export const createLanguageModel: API.OperationMethod<
  CreateLanguageModelRequest,
  CreateLanguageModelResponse,
  CreateLanguageModelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      LanguageCode: 0,
      BaseModelName: 0,
      ModelName: 0,
      InputDataConfig: { S3Uri: 0, TuningDataS3Uri: 0, DataAccessRoleArn: 0 },
      Tags: D.list(i_Tag),
    },
  },
  errors: [
    BadRequestException,
    ConflictException,
    InternalFailureException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateLanguageModel",
})) as any;

export type CreateMedicalVocabularyError =
  | BadRequestException
  | ConflictException
  | InternalFailureException
  | LimitExceededException
  | CommonErrors;
/**
 * Creates a new custom medical vocabulary.
 *
 * Before creating a new custom medical vocabulary, you must first upload a text file
 * that contains your vocabulary table into an Amazon S3 bucket.
 * Note that this differs from , where you can
 * include a list of terms within your request using the `Phrases` flag;
 * `CreateMedicalVocabulary` does not support the `Phrases`
 * flag and only accepts vocabularies in table format.
 *
 * Each language has a character set that contains all allowed characters for that
 * specific language. If you use unsupported characters, your custom vocabulary request
 * fails. Refer to Character Sets for Custom Vocabularies to get the character set for your
 * language.
 *
 * For more information, see Custom
 * vocabularies.
 */
export const createMedicalVocabulary: API.OperationMethod<
  CreateMedicalVocabularyRequest,
  CreateMedicalVocabularyResponse,
  CreateMedicalVocabularyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      VocabularyName: 0,
      LanguageCode: 0,
      VocabularyFileUri: 0,
      Tags: D.list(i_Tag),
    },
    output: { LastModifiedTime: D.ts },
  },
  errors: [
    BadRequestException,
    ConflictException,
    InternalFailureException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateMedicalVocabulary",
})) as any;

export type CreateVocabularyError =
  | BadRequestException
  | ConflictException
  | InternalFailureException
  | LimitExceededException
  | CommonErrors;
/**
 * Creates a new custom vocabulary.
 *
 * When creating a new custom vocabulary, you can either upload a text file that contains
 * your new entries, phrases, and terms into an Amazon S3 bucket and include the
 * URI in your request. Or you can include a list of terms directly in your request using
 * the `Phrases` flag.
 *
 * Each language has a character set that contains all allowed characters for that
 * specific language. If you use unsupported characters, your custom vocabulary request
 * fails. Refer to Character Sets for Custom Vocabularies to get the character set for your
 * language.
 *
 * For more information, see Custom
 * vocabularies.
 */
export const createVocabulary: API.OperationMethod<
  CreateVocabularyRequest,
  CreateVocabularyResponse,
  CreateVocabularyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      VocabularyName: 0,
      LanguageCode: 0,
      Phrases: 0,
      VocabularyFileUri: 0,
      Tags: D.list(i_Tag),
      DataAccessRoleArn: 0,
    },
    output: { LastModifiedTime: D.ts },
  },
  errors: [
    BadRequestException,
    ConflictException,
    InternalFailureException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateVocabulary",
})) as any;

export type CreateVocabularyFilterError =
  | BadRequestException
  | ConflictException
  | InternalFailureException
  | LimitExceededException
  | CommonErrors;
/**
 * Creates a new custom vocabulary filter.
 *
 * You can use custom vocabulary filters to mask, delete, or flag specific words from
 * your transcript. Custom vocabulary filters are commonly used to mask profanity in
 * transcripts.
 *
 * Each language has a character set that contains all allowed characters for that
 * specific language. If you use unsupported characters, your custom vocabulary filter
 * request fails. Refer to Character Sets for Custom
 * Vocabularies to get the character set for your language.
 *
 * For more information, see Vocabulary
 * filtering.
 */
export const createVocabularyFilter: API.OperationMethod<
  CreateVocabularyFilterRequest,
  CreateVocabularyFilterResponse,
  CreateVocabularyFilterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      VocabularyFilterName: 0,
      LanguageCode: 0,
      Words: 0,
      VocabularyFilterFileUri: 0,
      Tags: D.list(i_Tag),
      DataAccessRoleArn: 0,
    },
    output: { LastModifiedTime: D.ts },
  },
  errors: [
    BadRequestException,
    ConflictException,
    InternalFailureException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateVocabularyFilter",
})) as any;

export type DeleteCallAnalyticsCategoryError =
  | BadRequestException
  | InternalFailureException
  | LimitExceededException
  | NotFoundException
  | CommonErrors;
/**
 * Deletes a Call Analytics category. To use this operation, specify the name of the
 * category you want to delete using `CategoryName`. Category names are case
 * sensitive.
 */
export const deleteCallAnalyticsCategory: API.OperationMethod<
  DeleteCallAnalyticsCategoryRequest,
  DeleteCallAnalyticsCategoryResponse,
  DeleteCallAnalyticsCategoryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { CategoryName: 0 } },
  errors: [
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCallAnalyticsCategory",
})) as any;

export type DeleteCallAnalyticsJobError =
  | BadRequestException
  | InternalFailureException
  | LimitExceededException
  | CommonErrors;
/**
 * Deletes a Call Analytics job. To use this operation, specify the name of the job you
 * want to delete using `CallAnalyticsJobName`. Job names are case
 * sensitive.
 */
export const deleteCallAnalyticsJob: API.OperationMethod<
  DeleteCallAnalyticsJobRequest,
  DeleteCallAnalyticsJobResponse,
  DeleteCallAnalyticsJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { CallAnalyticsJobName: 0 } },
  errors: [
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCallAnalyticsJob",
})) as any;

export type DeleteLanguageModelError =
  | BadRequestException
  | InternalFailureException
  | LimitExceededException
  | CommonErrors;
/**
 * Deletes a custom language model. To use this operation, specify the name of the
 * language model you want to delete using `ModelName`. custom language model
 * names are case sensitive.
 */
export const deleteLanguageModel: API.OperationMethod<
  DeleteLanguageModelRequest,
  DeleteLanguageModelResponse,
  DeleteLanguageModelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ModelName: 0 } },
  errors: [
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteLanguageModel",
})) as any;

export type DeleteMedicalScribeJobError =
  | BadRequestException
  | InternalFailureException
  | LimitExceededException
  | CommonErrors;
/**
 * Deletes a Medical Scribe job. To use this operation, specify the name of the
 * job you want to delete using `MedicalScribeJobName`. Job names are
 * case sensitive.
 */
export const deleteMedicalScribeJob: API.OperationMethod<
  DeleteMedicalScribeJobRequest,
  DeleteMedicalScribeJobResponse,
  DeleteMedicalScribeJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { MedicalScribeJobName: 0 } },
  errors: [
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteMedicalScribeJob",
})) as any;

export type DeleteMedicalTranscriptionJobError =
  | BadRequestException
  | InternalFailureException
  | LimitExceededException
  | CommonErrors;
/**
 * Deletes a medical transcription job. To use this operation, specify the name of the
 * job you want to delete using `MedicalTranscriptionJobName`. Job names are
 * case sensitive.
 */
export const deleteMedicalTranscriptionJob: API.OperationMethod<
  DeleteMedicalTranscriptionJobRequest,
  DeleteMedicalTranscriptionJobResponse,
  DeleteMedicalTranscriptionJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { MedicalTranscriptionJobName: 0 } },
  errors: [
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteMedicalTranscriptionJob",
})) as any;

export type DeleteMedicalVocabularyError =
  | BadRequestException
  | InternalFailureException
  | LimitExceededException
  | NotFoundException
  | CommonErrors;
/**
 * Deletes a custom medical vocabulary. To use this operation, specify the name of the
 * custom vocabulary you want to delete using `VocabularyName`. Custom
 * vocabulary names are case sensitive.
 */
export const deleteMedicalVocabulary: API.OperationMethod<
  DeleteMedicalVocabularyRequest,
  DeleteMedicalVocabularyResponse,
  DeleteMedicalVocabularyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { VocabularyName: 0 } },
  errors: [
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteMedicalVocabulary",
})) as any;

export type DeleteTranscriptionJobError =
  | BadRequestException
  | InternalFailureException
  | LimitExceededException
  | CommonErrors;
/**
 * Deletes a transcription job. To use this operation, specify the name of the job you
 * want to delete using `TranscriptionJobName`. Job names are case
 * sensitive.
 */
export const deleteTranscriptionJob: API.OperationMethod<
  DeleteTranscriptionJobRequest,
  DeleteTranscriptionJobResponse,
  DeleteTranscriptionJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { TranscriptionJobName: 0 } },
  errors: [
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTranscriptionJob",
})) as any;

export type DeleteVocabularyError =
  | BadRequestException
  | InternalFailureException
  | LimitExceededException
  | NotFoundException
  | CommonErrors;
/**
 * Deletes a custom vocabulary. To use this operation, specify the name of the custom
 * vocabulary you want to delete using `VocabularyName`. Custom vocabulary names
 * are case sensitive.
 */
export const deleteVocabulary: API.OperationMethod<
  DeleteVocabularyRequest,
  DeleteVocabularyResponse,
  DeleteVocabularyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { VocabularyName: 0 } },
  errors: [
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteVocabulary",
})) as any;

export type DeleteVocabularyFilterError =
  | BadRequestException
  | InternalFailureException
  | LimitExceededException
  | NotFoundException
  | CommonErrors;
/**
 * Deletes a custom vocabulary filter. To use this operation, specify the name of the
 * custom vocabulary filter you want to delete using `VocabularyFilterName`.
 * Custom vocabulary filter names are case sensitive.
 */
export const deleteVocabularyFilter: API.OperationMethod<
  DeleteVocabularyFilterRequest,
  DeleteVocabularyFilterResponse,
  DeleteVocabularyFilterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { VocabularyFilterName: 0 } },
  errors: [
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteVocabularyFilter",
})) as any;

export type DescribeLanguageModelError =
  | BadRequestException
  | InternalFailureException
  | LimitExceededException
  | NotFoundException
  | CommonErrors;
/**
 * Provides information about the specified custom language model.
 *
 * This operation also shows if the base language model that you used to create your
 * custom language model has been updated. If Amazon Transcribe has updated the base
 * model, you can create a new custom language model using the updated base model.
 *
 * If you tried to create a new custom language model and the request wasn't successful,
 * you can use `DescribeLanguageModel` to help identify the reason for this
 * failure.
 */
export const describeLanguageModel: API.OperationMethod<
  DescribeLanguageModelRequest,
  DescribeLanguageModelResponse,
  DescribeLanguageModelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ModelName: 0 },
    output: { LanguageModel: o_LanguageModel },
  },
  errors: [
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeLanguageModel",
})) as any;

export type GetCallAnalyticsCategoryError =
  | BadRequestException
  | InternalFailureException
  | LimitExceededException
  | NotFoundException
  | CommonErrors;
/**
 * Provides information about the specified Call Analytics category.
 *
 * To get a list of your Call Analytics categories, use the operation.
 */
export const getCallAnalyticsCategory: API.OperationMethod<
  GetCallAnalyticsCategoryRequest,
  GetCallAnalyticsCategoryResponse,
  GetCallAnalyticsCategoryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { CategoryName: 0 },
    output: { CategoryProperties: o_CategoryProperties },
  },
  errors: [
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCallAnalyticsCategory",
})) as any;

export type GetCallAnalyticsJobError =
  | BadRequestException
  | InternalFailureException
  | LimitExceededException
  | NotFoundException
  | CommonErrors;
/**
 * Provides information about the specified Call Analytics job.
 *
 * To view the job's status, refer to `CallAnalyticsJobStatus`. If the status
 * is `COMPLETED`, the job is finished. You can find your completed transcript
 * at the URI specified in `TranscriptFileUri`. If the status is
 * `FAILED`, `FailureReason` provides details on why your
 * transcription job failed.
 *
 * If you enabled personally identifiable information (PII) redaction, the redacted
 * transcript appears at the location specified in
 * `RedactedTranscriptFileUri`.
 *
 * If you chose to redact the audio in your media file, you can find your redacted media
 * file at the location specified in `RedactedMediaFileUri`.
 *
 * To get a list of your Call Analytics jobs, use the operation.
 */
export const getCallAnalyticsJob: API.OperationMethod<
  GetCallAnalyticsJobRequest,
  GetCallAnalyticsJobResponse,
  GetCallAnalyticsJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { CallAnalyticsJobName: 0 },
    output: { CallAnalyticsJob: o_CallAnalyticsJob },
  },
  errors: [
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCallAnalyticsJob",
})) as any;

export type GetMedicalScribeJobError =
  | BadRequestException
  | InternalFailureException
  | LimitExceededException
  | NotFoundException
  | CommonErrors;
/**
 * Provides information about the specified Medical Scribe job.
 *
 * To view the status of the specified medical transcription job, check the
 * `MedicalScribeJobStatus` field. If the status is `COMPLETED`,
 * the job is finished. You can find the results at the location specified in
 * `MedicalScribeOutput`.
 * If the status is `FAILED`, `FailureReason` provides details on why your Medical Scribe job
 * failed.
 *
 * To get a list of your Medical Scribe jobs, use the operation.
 */
export const getMedicalScribeJob: API.OperationMethod<
  GetMedicalScribeJobRequest,
  GetMedicalScribeJobResponse,
  GetMedicalScribeJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { MedicalScribeJobName: 0 },
    output: { MedicalScribeJob: o_MedicalScribeJob },
  },
  errors: [
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMedicalScribeJob",
})) as any;

export type GetMedicalTranscriptionJobError =
  | BadRequestException
  | InternalFailureException
  | LimitExceededException
  | NotFoundException
  | CommonErrors;
/**
 * Provides information about the specified medical transcription job.
 *
 * To view the status of the specified medical transcription job, check the
 * `TranscriptionJobStatus` field. If the status is `COMPLETED`,
 * the job is finished. You can find the results at the location specified in
 * `TranscriptFileUri`. If the status is `FAILED`,
 * `FailureReason` provides details on why your transcription job
 * failed.
 *
 * To get a list of your medical transcription jobs, use the operation.
 */
export const getMedicalTranscriptionJob: API.OperationMethod<
  GetMedicalTranscriptionJobRequest,
  GetMedicalTranscriptionJobResponse,
  GetMedicalTranscriptionJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { MedicalTranscriptionJobName: 0 },
    output: { MedicalTranscriptionJob: o_MedicalTranscriptionJob },
  },
  errors: [
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMedicalTranscriptionJob",
})) as any;

export type GetMedicalVocabularyError =
  | BadRequestException
  | InternalFailureException
  | LimitExceededException
  | NotFoundException
  | CommonErrors;
/**
 * Provides information about the specified custom medical vocabulary.
 *
 * To view the status of the specified custom medical vocabulary, check the
 * `VocabularyState` field. If the status is `READY`, your custom
 * vocabulary is available to use. If the status is `FAILED`,
 * `FailureReason` provides details on why your vocabulary failed.
 *
 * To get a list of your custom medical vocabularies, use the operation.
 */
export const getMedicalVocabulary: API.OperationMethod<
  GetMedicalVocabularyRequest,
  GetMedicalVocabularyResponse,
  GetMedicalVocabularyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { VocabularyName: 0 },
    output: { LastModifiedTime: D.ts },
  },
  errors: [
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMedicalVocabulary",
})) as any;

export type GetTranscriptionJobError =
  | BadRequestException
  | InternalFailureException
  | LimitExceededException
  | NotFoundException
  | CommonErrors;
/**
 * Provides information about the specified transcription job.
 *
 * To view the status of the specified transcription job, check the
 * `TranscriptionJobStatus` field. If the status is `COMPLETED`,
 * the job is finished. You can find the results at the location specified in
 * `TranscriptFileUri`. If the status is `FAILED`,
 * `FailureReason` provides details on why your transcription job
 * failed.
 *
 * If you enabled content redaction, the redacted transcript can be found at the location
 * specified in `RedactedTranscriptFileUri`.
 *
 * To get a list of your transcription jobs, use the operation.
 */
export const getTranscriptionJob: API.OperationMethod<
  GetTranscriptionJobRequest,
  GetTranscriptionJobResponse,
  GetTranscriptionJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { TranscriptionJobName: 0 },
    output: { TranscriptionJob: o_TranscriptionJob },
  },
  errors: [
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTranscriptionJob",
})) as any;

export type GetVocabularyError =
  | BadRequestException
  | InternalFailureException
  | LimitExceededException
  | NotFoundException
  | CommonErrors;
/**
 * Provides information about the specified custom vocabulary.
 *
 * To view the status of the specified custom vocabulary, check the
 * `VocabularyState` field. If the status is `READY`, your custom
 * vocabulary is available to use. If the status is `FAILED`,
 * `FailureReason` provides details on why your custom vocabulary
 * failed.
 *
 * To get a list of your custom vocabularies, use the operation.
 */
export const getVocabulary: API.OperationMethod<
  GetVocabularyRequest,
  GetVocabularyResponse,
  GetVocabularyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { VocabularyName: 0 },
    output: { LastModifiedTime: D.ts },
  },
  errors: [
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetVocabulary",
})) as any;

export type GetVocabularyFilterError =
  | BadRequestException
  | InternalFailureException
  | LimitExceededException
  | NotFoundException
  | CommonErrors;
/**
 * Provides information about the specified custom vocabulary filter.
 *
 * To get a list of your custom vocabulary filters, use the operation.
 */
export const getVocabularyFilter: API.OperationMethod<
  GetVocabularyFilterRequest,
  GetVocabularyFilterResponse,
  GetVocabularyFilterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { VocabularyFilterName: 0 },
    output: { LastModifiedTime: D.ts },
  },
  errors: [
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetVocabularyFilter",
})) as any;

export type ListCallAnalyticsCategoriesError =
  | BadRequestException
  | InternalFailureException
  | LimitExceededException
  | CommonErrors;
/**
 * Provides a list of Call Analytics categories, including all rules that make up each
 * category.
 *
 * To get detailed information about a specific Call Analytics category, use the operation.
 */
export const listCallAnalyticsCategories: API.PaginatedOperationMethod<
  ListCallAnalyticsCategoriesRequest,
  ListCallAnalyticsCategoriesResponse,
  ListCallAnalyticsCategoriesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { NextToken: 0, MaxResults: 0 },
    output: { Categories: D.list(o_CategoryProperties) },
  },
  errors: [
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCallAnalyticsCategories",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListCallAnalyticsJobsError =
  | BadRequestException
  | InternalFailureException
  | LimitExceededException
  | CommonErrors;
/**
 * Provides a list of Call Analytics jobs that match the specified criteria. If no
 * criteria are specified, all Call Analytics jobs are returned.
 *
 * To get detailed information about a specific Call Analytics job, use the operation.
 */
export const listCallAnalyticsJobs: API.PaginatedOperationMethod<
  ListCallAnalyticsJobsRequest,
  ListCallAnalyticsJobsResponse,
  ListCallAnalyticsJobsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { Status: 0, JobNameContains: 0, NextToken: 0, MaxResults: 0 },
    output: {
      CallAnalyticsJobSummaries: D.list({
        CreationTime: D.ts,
        StartTime: D.ts,
        CompletionTime: D.ts,
      }),
    },
  },
  errors: [
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCallAnalyticsJobs",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListLanguageModelsError =
  | BadRequestException
  | InternalFailureException
  | LimitExceededException
  | CommonErrors;
/**
 * Provides a list of custom language models that match the specified criteria. If no
 * criteria are specified, all custom language models are returned.
 *
 * To get detailed information about a specific custom language model, use the operation.
 */
export const listLanguageModels: API.PaginatedOperationMethod<
  ListLanguageModelsRequest,
  ListLanguageModelsResponse,
  ListLanguageModelsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { StatusEquals: 0, NameContains: 0, NextToken: 0, MaxResults: 0 },
    output: { Models: D.list(o_LanguageModel) },
  },
  errors: [
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListLanguageModels",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListMedicalScribeJobsError =
  | BadRequestException
  | InternalFailureException
  | LimitExceededException
  | CommonErrors;
/**
 * Provides a list of Medical Scribe jobs that match the specified criteria. If no
 * criteria are specified, all Medical Scribe jobs are returned.
 *
 * To get detailed information about a specific Medical Scribe job, use the operation.
 */
export const listMedicalScribeJobs: API.PaginatedOperationMethod<
  ListMedicalScribeJobsRequest,
  ListMedicalScribeJobsResponse,
  ListMedicalScribeJobsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { Status: 0, JobNameContains: 0, NextToken: 0, MaxResults: 0 },
    output: {
      MedicalScribeJobSummaries: D.list({
        CreationTime: D.ts,
        StartTime: D.ts,
        CompletionTime: D.ts,
      }),
    },
  },
  errors: [
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMedicalScribeJobs",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListMedicalTranscriptionJobsError =
  | BadRequestException
  | InternalFailureException
  | LimitExceededException
  | CommonErrors;
/**
 * Provides a list of medical transcription jobs that match the specified criteria. If no
 * criteria are specified, all medical transcription jobs are returned.
 *
 * To get detailed information about a specific medical transcription job, use the operation.
 */
export const listMedicalTranscriptionJobs: API.PaginatedOperationMethod<
  ListMedicalTranscriptionJobsRequest,
  ListMedicalTranscriptionJobsResponse,
  ListMedicalTranscriptionJobsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { Status: 0, JobNameContains: 0, NextToken: 0, MaxResults: 0 },
    output: {
      MedicalTranscriptionJobSummaries: D.list({
        CreationTime: D.ts,
        StartTime: D.ts,
        CompletionTime: D.ts,
      }),
    },
  },
  errors: [
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMedicalTranscriptionJobs",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListMedicalVocabulariesError =
  | BadRequestException
  | InternalFailureException
  | LimitExceededException
  | CommonErrors;
/**
 * Provides a list of custom medical vocabularies that match the specified criteria. If
 * no criteria are specified, all custom medical vocabularies are returned.
 *
 * To get detailed information about a specific custom medical vocabulary, use the operation.
 */
export const listMedicalVocabularies: API.PaginatedOperationMethod<
  ListMedicalVocabulariesRequest,
  ListMedicalVocabulariesResponse,
  ListMedicalVocabulariesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { NextToken: 0, MaxResults: 0, StateEquals: 0, NameContains: 0 },
    output: { Vocabularies: D.list(o_VocabularyInfo) },
  },
  errors: [
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMedicalVocabularies",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | BadRequestException
  | InternalFailureException
  | LimitExceededException
  | NotFoundException
  | CommonErrors;
/**
 * Lists all tags associated with the specified transcription job, vocabulary, model, or
 * resource.
 *
 * To learn more about using tags with Amazon Transcribe, refer to Tagging
 * resources.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceArn: 0 } },
  errors: [
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

export type ListTranscriptionJobsError =
  | BadRequestException
  | InternalFailureException
  | LimitExceededException
  | CommonErrors;
/**
 * Provides a list of transcription jobs that match the specified criteria. If no
 * criteria are specified, all transcription jobs are returned.
 *
 * To get detailed information about a specific transcription job, use the operation.
 */
export const listTranscriptionJobs: API.PaginatedOperationMethod<
  ListTranscriptionJobsRequest,
  ListTranscriptionJobsResponse,
  ListTranscriptionJobsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { Status: 0, JobNameContains: 0, NextToken: 0, MaxResults: 0 },
    output: {
      TranscriptionJobSummaries: D.list({
        CreationTime: D.ts,
        StartTime: D.ts,
        CompletionTime: D.ts,
      }),
    },
  },
  errors: [
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTranscriptionJobs",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListVocabulariesError =
  | BadRequestException
  | InternalFailureException
  | LimitExceededException
  | CommonErrors;
/**
 * Provides a list of custom vocabularies that match the specified criteria. If no
 * criteria are specified, all custom vocabularies are returned.
 *
 * To get detailed information about a specific custom vocabulary, use the operation.
 */
export const listVocabularies: API.PaginatedOperationMethod<
  ListVocabulariesRequest,
  ListVocabulariesResponse,
  ListVocabulariesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { NextToken: 0, MaxResults: 0, StateEquals: 0, NameContains: 0 },
    output: { Vocabularies: D.list(o_VocabularyInfo) },
  },
  errors: [
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListVocabularies",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListVocabularyFiltersError =
  | BadRequestException
  | InternalFailureException
  | LimitExceededException
  | CommonErrors;
/**
 * Provides a list of custom vocabulary filters that match the specified criteria. If no
 * criteria are specified, all custom vocabularies are returned.
 *
 * To get detailed information about a specific custom vocabulary filter, use the operation.
 */
export const listVocabularyFilters: API.PaginatedOperationMethod<
  ListVocabularyFiltersRequest,
  ListVocabularyFiltersResponse,
  ListVocabularyFiltersError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { NextToken: 0, MaxResults: 0, NameContains: 0 },
    output: { VocabularyFilters: D.list({ LastModifiedTime: D.ts }) },
  },
  errors: [
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListVocabularyFilters",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type StartCallAnalyticsJobError =
  | BadRequestException
  | ConflictException
  | InternalFailureException
  | LimitExceededException
  | CommonErrors;
/**
 * Transcribes the audio from a customer service call and applies any additional Request
 * Parameters you choose to include in your request.
 *
 * In addition to many standard transcription features, Call Analytics provides you with
 * call characteristics, call summarization, speaker sentiment, and optional redaction of
 * your text transcript and your audio file. You can also apply custom categories to flag
 * specified conditions. To learn more about these features and insights, refer to Analyzing call
 * center audio with Call Analytics.
 *
 * If you want to apply categories to your Call Analytics job, you must create them
 * before submitting your job request. Categories cannot be retroactively applied to a job.
 * To create a new category, use the
 * operation. To learn more about Call Analytics categories, see Creating categories for post-call
 * transcriptions and Creating categories for
 * real-time transcriptions.
 *
 * To make a `StartCallAnalyticsJob` request, you must first upload your media
 * file into an Amazon S3 bucket; you can then specify the Amazon S3
 * location of the file using the `Media` parameter.
 *
 * Job queuing is available for Call Analytics jobs. If you pass a `DataAccessRoleArn`
 * in your request and you exceed your Concurrent Job Limit, your job will automatically be
 * added to a queue to be processed once your concurrent job count is below the limit.
 *
 * You must include the following parameters in your `StartCallAnalyticsJob`
 * request:
 *
 * - `region`: The Amazon Web Services Region where you are making your
 * request. For a list of Amazon Web Services Regions supported with Amazon Transcribe, refer to Amazon Transcribe endpoints and
 * quotas.
 *
 * - `CallAnalyticsJobName`: A custom name that you create for your
 * transcription job that's unique within your Amazon Web Services account.
 *
 * - `Media` (`MediaFileUri` or
 * `RedactedMediaFileUri`): The Amazon S3 location of your
 * media file.
 *
 * With Call Analytics, you can redact the audio contained in your media file by
 * including `RedactedMediaFileUri`, instead of `MediaFileUri`,
 * to specify the location of your input audio. If you choose to redact your audio, you
 * can find your redacted media at the location specified in the
 * `RedactedMediaFileUri` field of your response.
 */
export const startCallAnalyticsJob: API.OperationMethod<
  StartCallAnalyticsJobRequest,
  StartCallAnalyticsJobResponse,
  StartCallAnalyticsJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      CallAnalyticsJobName: 0,
      Media: i_Media,
      OutputLocation: 0,
      OutputEncryptionKMSKeyId: 0,
      DataAccessRoleArn: 0,
      Settings: {
        VocabularyName: 0,
        VocabularyFilterName: 0,
        VocabularyFilterMethod: 0,
        LanguageModelName: 0,
        ContentRedaction: i_ContentRedaction,
        LanguageOptions: 0,
        LanguageIdSettings: D.map(i_LanguageIdSettings),
        Summarization: { GenerateAbstractiveSummary: 0 },
      },
      Tags: D.list(i_Tag),
      ChannelDefinitions: D.list({ ChannelId: 0, ParticipantRole: 0 }),
    },
    output: { CallAnalyticsJob: o_CallAnalyticsJob },
  },
  errors: [
    BadRequestException,
    ConflictException,
    InternalFailureException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartCallAnalyticsJob",
})) as any;

export type StartMedicalScribeJobError =
  | BadRequestException
  | ConflictException
  | InternalFailureException
  | LimitExceededException
  | CommonErrors;
/**
 * Transcribes patient-clinician conversations and generates clinical notes.
 *
 * Amazon Web Services HealthScribe automatically provides rich conversation transcripts, identifies speaker roles,
 * classifies dialogues, extracts medical terms, and generates preliminary clinical notes.
 * To learn more about these features, refer to Amazon Web Services HealthScribe.
 *
 * To make a `StartMedicalScribeJob` request, you must first upload
 * your media file into an Amazon S3 bucket; you can then specify the Amazon S3 location
 * of the file using the `Media` parameter.
 *
 * You must include the following parameters in your
 * `StartMedicalTranscriptionJob` request:
 *
 * - `DataAccessRoleArn`: The ARN of an IAM role with the these minimum permissions: read permission on input file Amazon S3 bucket specified in `Media`,
 * write permission on the Amazon S3 bucket specified in `OutputBucketName`, and full permissions on the KMS key specified in `OutputEncryptionKMSKeyId` (if set).
 * The role should also allow `transcribe.amazonaws.com` to assume it.
 *
 * - `Media` (`MediaFileUri`): The Amazon S3 location
 * of your media file.
 *
 * - `MedicalScribeJobName`: A custom name you create for your
 * MedicalScribe job that is unique within your Amazon Web Services account.
 *
 * - `OutputBucketName`: The Amazon S3 bucket where you want
 * your output files stored.
 *
 * - `Settings`: A `MedicalScribeSettings` object
 * that must set exactly one of `ShowSpeakerLabels` or `ChannelIdentification` to true.
 * If `ShowSpeakerLabels` is true, `MaxSpeakerLabels` must also be set.
 *
 * - `ChannelDefinitions`: A `MedicalScribeChannelDefinitions` array should be set if and only if the `ChannelIdentification`
 * value of `Settings` is set to true.
 */
export const startMedicalScribeJob: API.OperationMethod<
  StartMedicalScribeJobRequest,
  StartMedicalScribeJobResponse,
  StartMedicalScribeJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      MedicalScribeJobName: 0,
      Media: i_Media,
      OutputBucketName: 0,
      OutputEncryptionKMSKeyId: 0,
      KMSEncryptionContext: 0,
      DataAccessRoleArn: 0,
      Settings: {
        ShowSpeakerLabels: 0,
        MaxSpeakerLabels: 0,
        ChannelIdentification: 0,
        VocabularyName: 0,
        VocabularyFilterName: 0,
        VocabularyFilterMethod: 0,
        ClinicalNoteGenerationSettings: { NoteTemplate: 0 },
      },
      ChannelDefinitions: D.list({ ChannelId: 0, ParticipantRole: 0 }),
      Tags: D.list(i_Tag),
      MedicalScribeContext: { PatientContext: { Pronouns: 0 } },
    },
    output: { MedicalScribeJob: o_MedicalScribeJob },
  },
  errors: [
    BadRequestException,
    ConflictException,
    InternalFailureException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartMedicalScribeJob",
})) as any;

export type StartMedicalTranscriptionJobError =
  | BadRequestException
  | ConflictException
  | InternalFailureException
  | LimitExceededException
  | CommonErrors;
/**
 * Transcribes the audio from a medical dictation or conversation and applies any
 * additional Request Parameters you choose to include in your request.
 *
 * In addition to many standard transcription features, Amazon Transcribe Medical
 * provides you with a robust medical vocabulary and, optionally, content identification,
 * which adds flags to personal health information (PHI). To learn more about these
 * features, refer to How Amazon Transcribe Medical
 * works.
 *
 * To make a `StartMedicalTranscriptionJob` request, you must first upload
 * your media file into an Amazon S3 bucket; you can then specify the Amazon S3 location
 * of the file using the `Media` parameter.
 *
 * You must include the following parameters in your
 * `StartMedicalTranscriptionJob` request:
 *
 * - `region`: The Amazon Web Services Region where you are making your
 * request. For a list of Amazon Web Services Regions supported with Amazon Transcribe, refer to Amazon Transcribe endpoints and
 * quotas.
 *
 * - `MedicalTranscriptionJobName`: A custom name you create for your
 * transcription job that is unique within your Amazon Web Services account.
 *
 * - `Media` (`MediaFileUri`): The Amazon S3 location
 * of your media file.
 *
 * - `LanguageCode`: This must be `en-US`.
 *
 * - `OutputBucketName`: The Amazon S3 bucket where you want
 * your transcript stored. If you want your output stored in a sub-folder of this
 * bucket, you must also include `OutputKey`.
 *
 * - `Specialty`: This must be `PRIMARYCARE`.
 *
 * - `Type`: Choose whether your audio is a conversation or a
 * dictation.
 */
export const startMedicalTranscriptionJob: API.OperationMethod<
  StartMedicalTranscriptionJobRequest,
  StartMedicalTranscriptionJobResponse,
  StartMedicalTranscriptionJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      MedicalTranscriptionJobName: 0,
      LanguageCode: 0,
      MediaSampleRateHertz: 0,
      MediaFormat: 0,
      Media: i_Media,
      OutputBucketName: 0,
      OutputKey: 0,
      OutputEncryptionKMSKeyId: 0,
      KMSEncryptionContext: 0,
      Settings: {
        ShowSpeakerLabels: 0,
        MaxSpeakerLabels: 0,
        ChannelIdentification: 0,
        ShowAlternatives: 0,
        MaxAlternatives: 0,
        VocabularyName: 0,
      },
      ContentIdentificationType: 0,
      Specialty: 0,
      Type: 0,
      Tags: D.list(i_Tag),
    },
    output: { MedicalTranscriptionJob: o_MedicalTranscriptionJob },
  },
  errors: [
    BadRequestException,
    ConflictException,
    InternalFailureException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartMedicalTranscriptionJob",
})) as any;

export type StartTranscriptionJobError =
  | BadRequestException
  | ConflictException
  | InternalFailureException
  | LimitExceededException
  | CommonErrors;
/**
 * Transcribes the audio from a media file and applies any additional Request Parameters
 * you choose to include in your request.
 *
 * To make a `StartTranscriptionJob` request, you must first upload your media
 * file into an Amazon S3 bucket; you can then specify the Amazon S3
 * location of the file using the `Media` parameter.
 *
 * You must include the following parameters in your `StartTranscriptionJob`
 * request:
 *
 * - `region`: The Amazon Web Services Region where you are making your
 * request. For a list of Amazon Web Services Regions supported with Amazon Transcribe, refer to Amazon Transcribe endpoints and
 * quotas.
 *
 * - `TranscriptionJobName`: A custom name you create for your
 * transcription job that is unique within your Amazon Web Services account.
 *
 * - `Media` (`MediaFileUri`): The Amazon S3 location
 * of your media file.
 *
 * - One of `LanguageCode`, `IdentifyLanguage`, or
 * `IdentifyMultipleLanguages`: If you know the language of your
 * media file, specify it using the `LanguageCode` parameter; you can
 * find all valid language codes in the Supported
 * languages table. If you do not know the languages spoken in your
 * media, use either `IdentifyLanguage` or
 * `IdentifyMultipleLanguages` and let Amazon Transcribe identify
 * the languages for you.
 */
export const startTranscriptionJob: API.OperationMethod<
  StartTranscriptionJobRequest,
  StartTranscriptionJobResponse,
  StartTranscriptionJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      TranscriptionJobName: 0,
      LanguageCode: 0,
      MediaSampleRateHertz: 0,
      MediaFormat: 0,
      Media: i_Media,
      OutputBucketName: 0,
      OutputKey: 0,
      OutputEncryptionKMSKeyId: 0,
      KMSEncryptionContext: 0,
      Settings: {
        VocabularyName: 0,
        ShowSpeakerLabels: 0,
        MaxSpeakerLabels: 0,
        ChannelIdentification: 0,
        ShowAlternatives: 0,
        MaxAlternatives: 0,
        VocabularyFilterName: 0,
        VocabularyFilterMethod: 0,
      },
      ModelSettings: { LanguageModelName: 0 },
      JobExecutionSettings: { AllowDeferredExecution: 0, DataAccessRoleArn: 0 },
      ContentRedaction: i_ContentRedaction,
      IdentifyLanguage: 0,
      IdentifyMultipleLanguages: 0,
      LanguageOptions: 0,
      Subtitles: { Formats: 0, OutputStartIndex: 0 },
      Tags: D.list(i_Tag),
      LanguageIdSettings: D.map(i_LanguageIdSettings),
      ToxicityDetection: D.list({ ToxicityCategories: 0 }),
    },
    output: { TranscriptionJob: o_TranscriptionJob },
  },
  errors: [
    BadRequestException,
    ConflictException,
    InternalFailureException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartTranscriptionJob",
})) as any;

export type TagResourceError =
  | BadRequestException
  | ConflictException
  | InternalFailureException
  | LimitExceededException
  | NotFoundException
  | CommonErrors;
/**
 * Adds one or more custom tags, each in the form of a key:value pair, to the specified
 * resource.
 *
 * To learn more about using tags with Amazon Transcribe, refer to Tagging
 * resources.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceArn: 0, Tags: D.list(i_Tag) } },
  errors: [
    BadRequestException,
    ConflictException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

export type UntagResourceError =
  | BadRequestException
  | ConflictException
  | InternalFailureException
  | LimitExceededException
  | NotFoundException
  | CommonErrors;
/**
 * Removes the specified tags from the specified Amazon Transcribe resource.
 *
 * If you include `UntagResource` in your request, you must also include
 * `ResourceArn` and `TagKeys`.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceArn: 0, TagKeys: 0 } },
  errors: [
    BadRequestException,
    ConflictException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

export type UpdateCallAnalyticsCategoryError =
  | BadRequestException
  | ConflictException
  | InternalFailureException
  | LimitExceededException
  | NotFoundException
  | CommonErrors;
/**
 * Updates the specified Call Analytics category with new rules. Note that the
 * `UpdateCallAnalyticsCategory` operation overwrites all existing rules
 * contained in the specified category. You cannot append additional rules onto an existing
 * category.
 *
 * To create a new category, see .
 */
export const updateCallAnalyticsCategory: API.OperationMethod<
  UpdateCallAnalyticsCategoryRequest,
  UpdateCallAnalyticsCategoryResponse,
  UpdateCallAnalyticsCategoryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { CategoryName: 0, Rules: D.list(i_Rule), InputType: 0 },
    output: { CategoryProperties: o_CategoryProperties },
  },
  errors: [
    BadRequestException,
    ConflictException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateCallAnalyticsCategory",
})) as any;

export type UpdateMedicalVocabularyError =
  | BadRequestException
  | ConflictException
  | InternalFailureException
  | LimitExceededException
  | NotFoundException
  | CommonErrors;
/**
 * Updates an existing custom medical vocabulary with new values. This operation
 * overwrites all existing information with your new values; you cannot append new terms
 * onto an existing custom vocabulary.
 */
export const updateMedicalVocabulary: API.OperationMethod<
  UpdateMedicalVocabularyRequest,
  UpdateMedicalVocabularyResponse,
  UpdateMedicalVocabularyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { VocabularyName: 0, LanguageCode: 0, VocabularyFileUri: 0 },
    output: { LastModifiedTime: D.ts },
  },
  errors: [
    BadRequestException,
    ConflictException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateMedicalVocabulary",
})) as any;

export type UpdateVocabularyError =
  | BadRequestException
  | ConflictException
  | InternalFailureException
  | LimitExceededException
  | NotFoundException
  | CommonErrors;
/**
 * Updates an existing custom vocabulary with new values. This operation overwrites all
 * existing information with your new values; you cannot append new terms onto an existing
 * custom vocabulary.
 */
export const updateVocabulary: API.OperationMethod<
  UpdateVocabularyRequest,
  UpdateVocabularyResponse,
  UpdateVocabularyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      VocabularyName: 0,
      LanguageCode: 0,
      Phrases: 0,
      VocabularyFileUri: 0,
      DataAccessRoleArn: 0,
    },
    output: { LastModifiedTime: D.ts },
  },
  errors: [
    BadRequestException,
    ConflictException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateVocabulary",
})) as any;

export type UpdateVocabularyFilterError =
  | BadRequestException
  | InternalFailureException
  | LimitExceededException
  | NotFoundException
  | CommonErrors;
/**
 * Updates an existing custom vocabulary filter with a new list of words. The new list
 * you provide overwrites all previous entries; you cannot append new terms onto an
 * existing custom vocabulary filter.
 */
export const updateVocabularyFilter: API.OperationMethod<
  UpdateVocabularyFilterRequest,
  UpdateVocabularyFilterResponse,
  UpdateVocabularyFilterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      VocabularyFilterName: 0,
      Words: 0,
      VocabularyFilterFileUri: 0,
      DataAccessRoleArn: 0,
    },
    output: { LastModifiedTime: D.ts },
  },
  errors: [
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateVocabularyFilter",
})) as any;

const i_ContentRedaction: D.LazyStruct = () => ({
  RedactionType: 0,
  RedactionOutput: 0,
  PiiEntityTypes: 0,
});
const i_LanguageIdSettings: D.LazyStruct = () => ({
  VocabularyName: 0,
  VocabularyFilterName: 0,
  LanguageModelName: 0,
});
const i_Media: D.LazyStruct = () => ({
  MediaFileUri: 0,
  RedactedMediaFileUri: 0,
});
const i_Rule: D.LazyStruct = () => ({
  NonTalkTimeFilter: {
    Threshold: 0,
    AbsoluteTimeRange: i_AbsoluteTimeRange,
    RelativeTimeRange: i_RelativeTimeRange,
    Negate: 0,
  },
  InterruptionFilter: {
    Threshold: 0,
    ParticipantRole: 0,
    AbsoluteTimeRange: i_AbsoluteTimeRange,
    RelativeTimeRange: i_RelativeTimeRange,
    Negate: 0,
  },
  TranscriptFilter: {
    TranscriptFilterType: 0,
    AbsoluteTimeRange: i_AbsoluteTimeRange,
    RelativeTimeRange: i_RelativeTimeRange,
    ParticipantRole: 0,
    Negate: 0,
    Targets: 0,
  },
  SentimentFilter: {
    Sentiments: 0,
    AbsoluteTimeRange: i_AbsoluteTimeRange,
    RelativeTimeRange: i_RelativeTimeRange,
    ParticipantRole: 0,
    Negate: 0,
  },
});
const i_Tag: D.LazyStruct = () => ({ Key: 0, Value: 0 });
const o_CallAnalyticsJob: D.LazyStruct = () => ({
  StartTime: D.ts,
  CreationTime: D.ts,
  CompletionTime: D.ts,
});
const o_CategoryProperties: D.LazyStruct = () => ({
  CreateTime: D.ts,
  LastUpdateTime: D.ts,
});
const o_LanguageModel: D.LazyStruct = () => ({
  CreateTime: D.ts,
  LastModifiedTime: D.ts,
});
const o_MedicalScribeJob: D.LazyStruct = () => ({
  StartTime: D.ts,
  CreationTime: D.ts,
  CompletionTime: D.ts,
});
const o_MedicalTranscriptionJob: D.LazyStruct = () => ({
  StartTime: D.ts,
  CreationTime: D.ts,
  CompletionTime: D.ts,
});
const o_TranscriptionJob: D.LazyStruct = () => ({
  StartTime: D.ts,
  CreationTime: D.ts,
  CompletionTime: D.ts,
});
const o_VocabularyInfo: D.LazyStruct = () => ({ LastModifiedTime: D.ts });
const i_AbsoluteTimeRange: D.LazyStruct = () => ({
  StartTime: 0,
  EndTime: 0,
  First: 0,
  Last: 0,
});
const i_RelativeTimeRange: D.LazyStruct = () => ({
  StartPercentage: 0,
  EndPercentage: 0,
  First: 0,
  Last: 0,
});
