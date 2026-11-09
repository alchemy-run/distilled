import * as API from "@distilled.cloud/core/api";
import * as S from "@distilled.cloud/core/schema-lite";
import * as __L from "@distilled.cloud/core/schema-lite";
import * as TxXray from "@distilled.cloud/core/telemetry-xray";
import type * as HttpClient from "effect/http/HttpClient";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import { AwsProtocol } from "../protocol.ts";
import type { RegionInput } from "../region.ts";
import { Retry } from "../retry.ts";
import * as T from "../traits.ts";
// Schema table, filled on first reach (see __S at the end).
const __s: any[] = [];
const svc = /*@__PURE__*/ T.AwsApiService({ sdkId: "Transcribe", serviceShapeName: "Transcribe" });
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "transcribe" });
const ver = /*@__PURE__*/ T.ServiceVersion("2017-10-26");
const proto = /*@__PURE__*/ T.AwsProtocolsAwsJson1_1();
const rules = /*@__PURE__*/ T.EndpointResolver(
  (p, _) => {
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
            return err("FIPS is enabled but this partition does not support FIPS");
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://transcribe.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err("DualStack is enabled but this partition does not support DualStack");
          }
          if (Region === "cn-north-1") {
            return e("https://cn.transcribe.cn-north-1.amazonaws.com.cn");
          }
          if (Region === "cn-northwest-1") {
            return e("https://cn.transcribe.cn-northwest-1.amazonaws.com.cn");
          }
          return e(`https://transcribe.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
  '{"url":"https://transcribe.{R}.{D}","properties":{},"headers":{}}',
  ["cn-north-1", "cn-northwest-1"],
);

/** Span facts shared by every operation (com.distilled.telemetry#service). */
const TELEMETRY = {
  system: "aws-api",
  responseHeaders: [
    { header: "x-amzn-requestid", name: "aws.request_id" },
    { header: "x-amz-request-id", name: "aws.request_id" },
    { header: "x-amzn-request-id", name: "aws.request_id" },
    { header: "x-amz-id-2", name: "aws.extended_request_id" },
  ],
  prefix: "Transcribe",
  service: "Transcribe",
  propagate: TxXray.propagate,
} as const;

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
export class NotFoundException
  extends /*@__PURE__*/ S.TaggedError<NotFoundException>()(
    "NotFoundException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export type CategoryName = string;
export type TimestampMilliseconds = number;
export interface AbsoluteTimeRange {
  StartTime?: number | undefined;
  EndTime?: number | undefined;
  First?: number | undefined;
  Last?: number | undefined;
}
export type Percentage = number;
export interface RelativeTimeRange {
  StartPercentage?: number | undefined;
  EndPercentage?: number | undefined;
  First?: number | undefined;
  Last?: number | undefined;
}
export interface NonTalkTimeFilter {
  Threshold?: number | undefined;
  AbsoluteTimeRange?: AbsoluteTimeRange | undefined;
  RelativeTimeRange?: RelativeTimeRange | undefined;
  Negate?: boolean | undefined;
}
export type ParticipantRole = "AGENT" | "CUSTOMER" | (string & {});
export interface InterruptionFilter {
  Threshold?: number | undefined;
  ParticipantRole?: ParticipantRole | undefined;
  AbsoluteTimeRange?: AbsoluteTimeRange | undefined;
  RelativeTimeRange?: RelativeTimeRange | undefined;
  Negate?: boolean | undefined;
}
export type TranscriptFilterType = "EXACT" | (string & {});
export type NonEmptyString = string;
export type StringTargetList = string[];
export interface TranscriptFilter {
  TranscriptFilterType: TranscriptFilterType;
  AbsoluteTimeRange?: AbsoluteTimeRange | undefined;
  RelativeTimeRange?: RelativeTimeRange | undefined;
  ParticipantRole?: ParticipantRole | undefined;
  Negate?: boolean | undefined;
  Targets: string[];
}
export type SentimentValue = "POSITIVE" | "NEGATIVE" | "NEUTRAL" | "MIXED" | (string & {});
export type SentimentValueList = SentimentValue[];
export interface SentimentFilter {
  Sentiments: SentimentValue[];
  AbsoluteTimeRange?: AbsoluteTimeRange | undefined;
  RelativeTimeRange?: RelativeTimeRange | undefined;
  ParticipantRole?: ParticipantRole | undefined;
  Negate?: boolean | undefined;
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
  Tags?: Tag[] | undefined;
  InputType?: InputType | undefined;
}
export interface CategoryProperties {
  CategoryName?: string | undefined;
  Rules?: Rule[] | undefined;
  CreateTime?: Date | undefined;
  LastUpdateTime?: Date | undefined;
  Tags?: Tag[] | undefined;
  InputType?: InputType | undefined;
}
export interface CreateCallAnalyticsCategoryResponse {
  CategoryProperties?: CategoryProperties | undefined;
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
  TuningDataS3Uri?: string | undefined;
  DataAccessRoleArn: string;
}
export type PrintableNonEmptyString = string;
export type KMSEncryptionContextMap = { [key: string]: string | undefined };
export type KMSKeyId = string;
export interface EncryptionConfiguration {
  KMSEncryptionContext?: { [key: string]: string | undefined } | undefined;
  KMSKey: string;
}
export interface CreateLanguageModelRequest {
  LanguageCode: CLMLanguageCode;
  BaseModelName: BaseModelName;
  ModelName: string;
  InputDataConfig: InputDataConfig;
  EncryptionConfiguration?: EncryptionConfiguration | undefined;
  Tags?: Tag[] | undefined;
}
export type ModelStatus = "IN_PROGRESS" | "FAILED" | "COMPLETED" | (string & {});
export interface CreateLanguageModelResponse {
  LanguageCode?: CLMLanguageCode | undefined;
  BaseModelName?: BaseModelName | undefined;
  ModelName?: string | undefined;
  InputDataConfig?: InputDataConfig | undefined;
  ModelStatus?: ModelStatus | undefined;
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
  Tags?: Tag[] | undefined;
}
export type VocabularyState = "PENDING" | "READY" | "FAILED" | (string & {});
export type FailureReason = string;
export interface CreateMedicalVocabularyResponse {
  VocabularyName?: string | undefined;
  LanguageCode?: LanguageCode | undefined;
  VocabularyState?: VocabularyState | undefined;
  LastModifiedTime?: Date | undefined;
  FailureReason?: string | undefined;
}
export type Phrase = string;
export type Phrases = string[];
export interface CreateVocabularyRequest {
  VocabularyName: string;
  LanguageCode: LanguageCode;
  Phrases?: string[] | undefined;
  VocabularyFileUri?: string | undefined;
  Tags?: Tag[] | undefined;
  DataAccessRoleArn?: string | undefined;
  EncryptionConfiguration?: EncryptionConfiguration | undefined;
}
export interface CreateVocabularyResponse {
  VocabularyName?: string | undefined;
  LanguageCode?: LanguageCode | undefined;
  VocabularyState?: VocabularyState | undefined;
  LastModifiedTime?: Date | undefined;
  FailureReason?: string | undefined;
}
export type VocabularyFilterName = string;
export type Word = string;
export type Words = string[];
export interface CreateVocabularyFilterRequest {
  VocabularyFilterName: string;
  LanguageCode: LanguageCode;
  Words?: string[] | undefined;
  VocabularyFilterFileUri?: string | undefined;
  Tags?: Tag[] | undefined;
  DataAccessRoleArn?: string | undefined;
  EncryptionConfiguration?: EncryptionConfiguration | undefined;
}
export interface CreateVocabularyFilterResponse {
  VocabularyFilterName?: string | undefined;
  LanguageCode?: LanguageCode | undefined;
  LastModifiedTime?: Date | undefined;
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
  ModelName?: string | undefined;
  CreateTime?: Date | undefined;
  LastModifiedTime?: Date | undefined;
  LanguageCode?: CLMLanguageCode | undefined;
  BaseModelName?: BaseModelName | undefined;
  ModelStatus?: ModelStatus | undefined;
  UpgradeAvailability?: boolean | undefined;
  FailureReason?: string | undefined;
  InputDataConfig?: InputDataConfig | undefined;
  EncryptionConfiguration?: EncryptionConfiguration | undefined;
}
export interface DescribeLanguageModelResponse {
  LanguageModel?: LanguageModel | undefined;
}
export interface GetCallAnalyticsCategoryRequest {
  CategoryName: string;
}
export interface GetCallAnalyticsCategoryResponse {
  CategoryProperties?: CategoryProperties | undefined;
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
  Feature?: CallAnalyticsFeature | undefined;
  ReasonCode?: CallAnalyticsSkippedReasonCode | undefined;
  Message?: string | undefined;
}
export type CallAnalyticsSkippedFeatureList = CallAnalyticsSkippedFeature[];
export interface CallAnalyticsJobDetails {
  Skipped?: CallAnalyticsSkippedFeature[] | undefined;
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
  MediaFileUri?: string | undefined;
  RedactedMediaFileUri?: string | undefined;
}
export interface Transcript {
  TranscriptFileUri?: string | undefined;
  RedactedTranscriptFileUri?: string | undefined;
}
export type IdentifiedLanguageScore = number;
export type VocabularyFilterMethod = "remove" | "mask" | "tag" | (string & {});
export type RedactionType = "PII" | (string & {});
export type RedactionOutput = "redacted" | "redacted_and_unredacted" | (string & {});
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
  | "DATE_TIME"
  | "PASSPORT_NUMBER"
  | "DRIVER_ID"
  | "URL"
  | "AGE"
  | "USERNAME"
  | "PASSWORD"
  | "AWS_ACCESS_KEY"
  | "AWS_SECRET_KEY"
  | "IP_ADDRESS"
  | "MAC_ADDRESS"
  | "LICENSE_PLATE"
  | "VEHICLE_IDENTIFICATION_NUMBER"
  | "US_INDIVIDUAL_TAX_IDENTIFICATION_NUMBER"
  | "CA_HEALTH_NUMBER"
  | "CA_SOCIAL_INSURANCE_NUMBER"
  | "INTERNATIONAL_BANK_ACCOUNT_NUMBER"
  | "SWIFT_CODE"
  | "ALL"
  | (string & {});
export type PiiEntityTypes = PiiEntityType[];
export interface ContentRedaction {
  RedactionType: RedactionType;
  RedactionOutput: RedactionOutput;
  PiiEntityTypes?: PiiEntityType[] | undefined;
}
export type LanguageOptions = LanguageCode[];
export interface LanguageIdSettings {
  VocabularyName?: string | undefined;
  VocabularyFilterName?: string | undefined;
  LanguageModelName?: string | undefined;
}
export type LanguageIdSettingsMap = { [key in LanguageCode]?: LanguageIdSettings | undefined };
export interface Summarization {
  GenerateAbstractiveSummary: boolean;
}
export interface CallAnalyticsJobSettings {
  VocabularyName?: string | undefined;
  VocabularyFilterName?: string | undefined;
  VocabularyFilterMethod?: VocabularyFilterMethod | undefined;
  LanguageModelName?: string | undefined;
  ContentRedaction?: ContentRedaction | undefined;
  LanguageOptions?: LanguageCode[] | undefined;
  LanguageIdSettings?: { [key: string]: LanguageIdSettings | undefined } | undefined;
  Summarization?: Summarization | undefined;
}
export type ChannelId = number;
export interface ChannelDefinition {
  ChannelId?: number | undefined;
  ParticipantRole?: ParticipantRole | undefined;
}
export type ChannelDefinitions = ChannelDefinition[];
export interface CallAnalyticsJob {
  CallAnalyticsJobName?: string | undefined;
  CallAnalyticsJobStatus?: CallAnalyticsJobStatus | undefined;
  CallAnalyticsJobDetails?: CallAnalyticsJobDetails | undefined;
  LanguageCode?: LanguageCode | undefined;
  MediaSampleRateHertz?: number | undefined;
  MediaFormat?: MediaFormat | undefined;
  Media?: Media | undefined;
  Transcript?: Transcript | undefined;
  StartTime?: Date | undefined;
  CreationTime?: Date | undefined;
  CompletionTime?: Date | undefined;
  FailureReason?: string | undefined;
  DataAccessRoleArn?: string | undefined;
  IdentifiedLanguageScore?: number | undefined;
  Settings?: CallAnalyticsJobSettings | undefined;
  ChannelDefinitions?: ChannelDefinition[] | undefined;
  Tags?: Tag[] | undefined;
}
export interface GetCallAnalyticsJobResponse {
  CallAnalyticsJob?: CallAnalyticsJob | undefined;
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
  NoteTemplate?: MedicalScribeNoteTemplate | undefined;
}
export interface MedicalScribeSettings {
  ShowSpeakerLabels?: boolean | undefined;
  MaxSpeakerLabels?: number | undefined;
  ChannelIdentification?: boolean | undefined;
  VocabularyName?: string | undefined;
  VocabularyFilterName?: string | undefined;
  VocabularyFilterMethod?: VocabularyFilterMethod | undefined;
  ClinicalNoteGenerationSettings?: ClinicalNoteGenerationSettings | undefined;
}
export type MedicalScribeChannelId = number;
export type MedicalScribeParticipantRole = "PATIENT" | "CLINICIAN" | (string & {});
export interface MedicalScribeChannelDefinition {
  ChannelId: number;
  ParticipantRole: MedicalScribeParticipantRole;
}
export type MedicalScribeChannelDefinitions = MedicalScribeChannelDefinition[];
export interface MedicalScribeJob {
  MedicalScribeJobName?: string | undefined;
  MedicalScribeJobStatus?: MedicalScribeJobStatus | undefined;
  LanguageCode?: MedicalScribeLanguageCode | undefined;
  Media?: Media | undefined;
  MedicalScribeOutput?: MedicalScribeOutput | undefined;
  StartTime?: Date | undefined;
  CreationTime?: Date | undefined;
  CompletionTime?: Date | undefined;
  FailureReason?: string | undefined;
  Settings?: MedicalScribeSettings | undefined;
  DataAccessRoleArn?: string | undefined;
  ChannelDefinitions?: MedicalScribeChannelDefinition[] | undefined;
  MedicalScribeContextProvided?: boolean | undefined;
  Tags?: Tag[] | undefined;
}
export interface GetMedicalScribeJobResponse {
  MedicalScribeJob?: MedicalScribeJob | undefined;
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
  TranscriptFileUri?: string | undefined;
}
export type MaxAlternatives = number;
export interface MedicalTranscriptionSetting {
  ShowSpeakerLabels?: boolean | undefined;
  MaxSpeakerLabels?: number | undefined;
  ChannelIdentification?: boolean | undefined;
  ShowAlternatives?: boolean | undefined;
  MaxAlternatives?: number | undefined;
  VocabularyName?: string | undefined;
}
export type MedicalContentIdentificationType = "PHI" | (string & {});
export type Specialty = "PRIMARYCARE" | (string & {});
export type Type = "CONVERSATION" | "DICTATION" | (string & {});
export interface MedicalTranscriptionJob {
  MedicalTranscriptionJobName?: string | undefined;
  TranscriptionJobStatus?: TranscriptionJobStatus | undefined;
  LanguageCode?: LanguageCode | undefined;
  MediaSampleRateHertz?: number | undefined;
  MediaFormat?: MediaFormat | undefined;
  Media?: Media | undefined;
  Transcript?: MedicalTranscript | undefined;
  StartTime?: Date | undefined;
  CreationTime?: Date | undefined;
  CompletionTime?: Date | undefined;
  FailureReason?: string | undefined;
  Settings?: MedicalTranscriptionSetting | undefined;
  ContentIdentificationType?: MedicalContentIdentificationType | undefined;
  Specialty?: Specialty | undefined;
  Type?: Type | undefined;
  Tags?: Tag[] | undefined;
}
export interface GetMedicalTranscriptionJobResponse {
  MedicalTranscriptionJob?: MedicalTranscriptionJob | undefined;
}
export interface GetMedicalVocabularyRequest {
  VocabularyName: string;
}
export interface GetMedicalVocabularyResponse {
  VocabularyName?: string | undefined;
  LanguageCode?: LanguageCode | undefined;
  VocabularyState?: VocabularyState | undefined;
  LastModifiedTime?: Date | undefined;
  FailureReason?: string | undefined;
  DownloadUri?: string | undefined;
}
export interface GetTranscriptionJobRequest {
  TranscriptionJobName: string;
}
export interface Settings {
  VocabularyName?: string | undefined;
  ShowSpeakerLabels?: boolean | undefined;
  MaxSpeakerLabels?: number | undefined;
  ChannelIdentification?: boolean | undefined;
  ShowAlternatives?: boolean | undefined;
  MaxAlternatives?: number | undefined;
  VocabularyFilterName?: string | undefined;
  VocabularyFilterMethod?: VocabularyFilterMethod | undefined;
}
export interface ModelSettings {
  LanguageModelName?: string | undefined;
}
export interface JobExecutionSettings {
  AllowDeferredExecution?: boolean | undefined;
  DataAccessRoleArn?: string | undefined;
}
export type DurationInSeconds = number;
export interface LanguageCodeItem {
  LanguageCode?: LanguageCode | undefined;
  DurationInSeconds?: number | undefined;
}
export type LanguageCodeList = LanguageCodeItem[];
export type SubtitleFormat = "vtt" | "srt" | (string & {});
export type SubtitleFormats = SubtitleFormat[];
export type SubtitleFileUris = string[];
export type SubtitleOutputStartIndex = number;
export interface SubtitlesOutput {
  Formats?: SubtitleFormat[] | undefined;
  SubtitleFileUris?: string[] | undefined;
  OutputStartIndex?: number | undefined;
}
export type ToxicityCategory = "ALL" | (string & {});
export type ToxicityCategories = ToxicityCategory[];
export interface ToxicityDetectionSettings {
  ToxicityCategories: ToxicityCategory[];
}
export type ToxicityDetection = ToxicityDetectionSettings[];
export interface TranscriptionJob {
  TranscriptionJobName?: string | undefined;
  TranscriptionJobStatus?: TranscriptionJobStatus | undefined;
  LanguageCode?: LanguageCode | undefined;
  MediaSampleRateHertz?: number | undefined;
  MediaFormat?: MediaFormat | undefined;
  Media?: Media | undefined;
  Transcript?: Transcript | undefined;
  StartTime?: Date | undefined;
  CreationTime?: Date | undefined;
  CompletionTime?: Date | undefined;
  FailureReason?: string | undefined;
  Settings?: Settings | undefined;
  ModelSettings?: ModelSettings | undefined;
  JobExecutionSettings?: JobExecutionSettings | undefined;
  ContentRedaction?: ContentRedaction | undefined;
  IdentifyLanguage?: boolean | undefined;
  IdentifyMultipleLanguages?: boolean | undefined;
  LanguageOptions?: LanguageCode[] | undefined;
  IdentifiedLanguageScore?: number | undefined;
  LanguageCodes?: LanguageCodeItem[] | undefined;
  Tags?: Tag[] | undefined;
  Subtitles?: SubtitlesOutput | undefined;
  LanguageIdSettings?: { [key: string]: LanguageIdSettings | undefined } | undefined;
  ToxicityDetection?: ToxicityDetectionSettings[] | undefined;
}
export interface GetTranscriptionJobResponse {
  TranscriptionJob?: TranscriptionJob | undefined;
}
export interface GetVocabularyRequest {
  VocabularyName: string;
}
export interface GetVocabularyResponse {
  VocabularyName?: string | undefined;
  LanguageCode?: LanguageCode | undefined;
  VocabularyState?: VocabularyState | undefined;
  LastModifiedTime?: Date | undefined;
  FailureReason?: string | undefined;
  DownloadUri?: string | undefined;
  DataAccessRoleArn?: string | undefined;
  EncryptionConfiguration?: EncryptionConfiguration | undefined;
}
export interface GetVocabularyFilterRequest {
  VocabularyFilterName: string;
}
export interface GetVocabularyFilterResponse {
  VocabularyFilterName?: string | undefined;
  LanguageCode?: LanguageCode | undefined;
  LastModifiedTime?: Date | undefined;
  DownloadUri?: string | undefined;
  DataAccessRoleArn?: string | undefined;
  EncryptionConfiguration?: EncryptionConfiguration | undefined;
}
export type NextToken = string;
export type MaxResults = number;
export interface ListCallAnalyticsCategoriesRequest {
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
}
export type CategoryPropertiesList = CategoryProperties[];
export interface ListCallAnalyticsCategoriesResponse {
  NextToken?: string | undefined;
  Categories?: CategoryProperties[] | undefined;
}
export interface ListCallAnalyticsJobsRequest {
  Status?: CallAnalyticsJobStatus | undefined;
  JobNameContains?: string | undefined;
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
}
export interface CallAnalyticsJobSummary {
  CallAnalyticsJobName?: string | undefined;
  CreationTime?: Date | undefined;
  StartTime?: Date | undefined;
  CompletionTime?: Date | undefined;
  LanguageCode?: LanguageCode | undefined;
  CallAnalyticsJobStatus?: CallAnalyticsJobStatus | undefined;
  CallAnalyticsJobDetails?: CallAnalyticsJobDetails | undefined;
  FailureReason?: string | undefined;
}
export type CallAnalyticsJobSummaries = CallAnalyticsJobSummary[];
export interface ListCallAnalyticsJobsResponse {
  Status?: CallAnalyticsJobStatus | undefined;
  NextToken?: string | undefined;
  CallAnalyticsJobSummaries?: CallAnalyticsJobSummary[] | undefined;
}
export interface ListLanguageModelsRequest {
  StatusEquals?: ModelStatus | undefined;
  NameContains?: string | undefined;
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
}
export type Models = LanguageModel[];
export interface ListLanguageModelsResponse {
  NextToken?: string | undefined;
  Models?: LanguageModel[] | undefined;
}
export interface ListMedicalScribeJobsRequest {
  Status?: MedicalScribeJobStatus | undefined;
  JobNameContains?: string | undefined;
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
}
export interface MedicalScribeJobSummary {
  MedicalScribeJobName?: string | undefined;
  CreationTime?: Date | undefined;
  StartTime?: Date | undefined;
  CompletionTime?: Date | undefined;
  LanguageCode?: MedicalScribeLanguageCode | undefined;
  MedicalScribeJobStatus?: MedicalScribeJobStatus | undefined;
  FailureReason?: string | undefined;
}
export type MedicalScribeJobSummaries = MedicalScribeJobSummary[];
export interface ListMedicalScribeJobsResponse {
  Status?: MedicalScribeJobStatus | undefined;
  NextToken?: string | undefined;
  MedicalScribeJobSummaries?: MedicalScribeJobSummary[] | undefined;
}
export interface ListMedicalTranscriptionJobsRequest {
  Status?: TranscriptionJobStatus | undefined;
  JobNameContains?: string | undefined;
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
}
export type OutputLocationType = "CUSTOMER_BUCKET" | "SERVICE_BUCKET" | (string & {});
export interface MedicalTranscriptionJobSummary {
  MedicalTranscriptionJobName?: string | undefined;
  CreationTime?: Date | undefined;
  StartTime?: Date | undefined;
  CompletionTime?: Date | undefined;
  LanguageCode?: LanguageCode | undefined;
  TranscriptionJobStatus?: TranscriptionJobStatus | undefined;
  FailureReason?: string | undefined;
  OutputLocationType?: OutputLocationType | undefined;
  Specialty?: Specialty | undefined;
  ContentIdentificationType?: MedicalContentIdentificationType | undefined;
  Type?: Type | undefined;
}
export type MedicalTranscriptionJobSummaries = MedicalTranscriptionJobSummary[];
export interface ListMedicalTranscriptionJobsResponse {
  Status?: TranscriptionJobStatus | undefined;
  NextToken?: string | undefined;
  MedicalTranscriptionJobSummaries?: MedicalTranscriptionJobSummary[] | undefined;
}
export interface ListMedicalVocabulariesRequest {
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
  StateEquals?: VocabularyState | undefined;
  NameContains?: string | undefined;
}
export interface VocabularyInfo {
  VocabularyName?: string | undefined;
  LanguageCode?: LanguageCode | undefined;
  LastModifiedTime?: Date | undefined;
  VocabularyState?: VocabularyState | undefined;
}
export type Vocabularies = VocabularyInfo[];
export interface ListMedicalVocabulariesResponse {
  Status?: VocabularyState | undefined;
  NextToken?: string | undefined;
  Vocabularies?: VocabularyInfo[] | undefined;
}
export type TranscribeArn = string;
export interface ListTagsForResourceRequest {
  ResourceArn: string;
}
export interface ListTagsForResourceResponse {
  ResourceArn?: string | undefined;
  Tags?: Tag[] | undefined;
}
export interface ListTranscriptionJobsRequest {
  Status?: TranscriptionJobStatus | undefined;
  JobNameContains?: string | undefined;
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
}
export interface TranscriptionJobSummary {
  TranscriptionJobName?: string | undefined;
  CreationTime?: Date | undefined;
  StartTime?: Date | undefined;
  CompletionTime?: Date | undefined;
  LanguageCode?: LanguageCode | undefined;
  TranscriptionJobStatus?: TranscriptionJobStatus | undefined;
  FailureReason?: string | undefined;
  OutputLocationType?: OutputLocationType | undefined;
  ContentRedaction?: ContentRedaction | undefined;
  ModelSettings?: ModelSettings | undefined;
  IdentifyLanguage?: boolean | undefined;
  IdentifyMultipleLanguages?: boolean | undefined;
  IdentifiedLanguageScore?: number | undefined;
  LanguageCodes?: LanguageCodeItem[] | undefined;
  ToxicityDetection?: ToxicityDetectionSettings[] | undefined;
}
export type TranscriptionJobSummaries = TranscriptionJobSummary[];
export interface ListTranscriptionJobsResponse {
  Status?: TranscriptionJobStatus | undefined;
  NextToken?: string | undefined;
  TranscriptionJobSummaries?: TranscriptionJobSummary[] | undefined;
}
export interface ListVocabulariesRequest {
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
  StateEquals?: VocabularyState | undefined;
  NameContains?: string | undefined;
}
export interface ListVocabulariesResponse {
  Status?: VocabularyState | undefined;
  NextToken?: string | undefined;
  Vocabularies?: VocabularyInfo[] | undefined;
}
export interface ListVocabularyFiltersRequest {
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
  NameContains?: string | undefined;
}
export interface VocabularyFilterInfo {
  VocabularyFilterName?: string | undefined;
  LanguageCode?: LanguageCode | undefined;
  LastModifiedTime?: Date | undefined;
}
export type VocabularyFilters = VocabularyFilterInfo[];
export interface ListVocabularyFiltersResponse {
  NextToken?: string | undefined;
  VocabularyFilters?: VocabularyFilterInfo[] | undefined;
}
export interface StartCallAnalyticsJobRequest {
  CallAnalyticsJobName: string;
  Media: Media;
  OutputLocation?: string | undefined;
  OutputEncryptionKMSKeyId?: string | undefined;
  DataAccessRoleArn?: string | undefined;
  Settings?: CallAnalyticsJobSettings | undefined;
  Tags?: Tag[] | undefined;
  ChannelDefinitions?: ChannelDefinition[] | undefined;
}
export interface StartCallAnalyticsJobResponse {
  CallAnalyticsJob?: CallAnalyticsJob | undefined;
}
export type OutputBucketName = string;
export type Pronouns = "HE_HIM" | "SHE_HER" | "THEY_THEM" | (string & {});
export interface MedicalScribePatientContext {
  Pronouns?: Pronouns | undefined;
}
export interface MedicalScribeContext {
  PatientContext?: MedicalScribePatientContext | undefined;
}
export interface StartMedicalScribeJobRequest {
  MedicalScribeJobName: string;
  Media: Media;
  OutputBucketName: string;
  OutputEncryptionKMSKeyId?: string | undefined;
  KMSEncryptionContext?: { [key: string]: string | undefined } | undefined;
  DataAccessRoleArn: string;
  Settings: MedicalScribeSettings;
  ChannelDefinitions?: MedicalScribeChannelDefinition[] | undefined;
  Tags?: Tag[] | undefined;
  MedicalScribeContext?: MedicalScribeContext | undefined;
}
export interface StartMedicalScribeJobResponse {
  MedicalScribeJob?: MedicalScribeJob | undefined;
}
export type OutputKey = string;
export interface StartMedicalTranscriptionJobRequest {
  MedicalTranscriptionJobName: string;
  LanguageCode: LanguageCode;
  MediaSampleRateHertz?: number | undefined;
  MediaFormat?: MediaFormat | undefined;
  Media: Media;
  OutputBucketName: string;
  OutputKey?: string | undefined;
  OutputEncryptionKMSKeyId?: string | undefined;
  KMSEncryptionContext?: { [key: string]: string | undefined } | undefined;
  Settings?: MedicalTranscriptionSetting | undefined;
  ContentIdentificationType?: MedicalContentIdentificationType | undefined;
  Specialty: Specialty;
  Type: Type;
  Tags?: Tag[] | undefined;
}
export interface StartMedicalTranscriptionJobResponse {
  MedicalTranscriptionJob?: MedicalTranscriptionJob | undefined;
}
export interface Subtitles {
  Formats?: SubtitleFormat[] | undefined;
  OutputStartIndex?: number | undefined;
}
export interface StartTranscriptionJobRequest {
  TranscriptionJobName: string;
  LanguageCode?: LanguageCode | undefined;
  MediaSampleRateHertz?: number | undefined;
  MediaFormat?: MediaFormat | undefined;
  Media: Media;
  OutputBucketName?: string | undefined;
  OutputKey?: string | undefined;
  OutputEncryptionKMSKeyId?: string | undefined;
  KMSEncryptionContext?: { [key: string]: string | undefined } | undefined;
  Settings?: Settings | undefined;
  ModelSettings?: ModelSettings | undefined;
  JobExecutionSettings?: JobExecutionSettings | undefined;
  ContentRedaction?: ContentRedaction | undefined;
  IdentifyLanguage?: boolean | undefined;
  IdentifyMultipleLanguages?: boolean | undefined;
  LanguageOptions?: LanguageCode[] | undefined;
  Subtitles?: Subtitles | undefined;
  Tags?: Tag[] | undefined;
  LanguageIdSettings?: { [key: string]: LanguageIdSettings | undefined } | undefined;
  ToxicityDetection?: ToxicityDetectionSettings[] | undefined;
}
export interface StartTranscriptionJobResponse {
  TranscriptionJob?: TranscriptionJob | undefined;
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
  InputType?: InputType | undefined;
}
export interface UpdateCallAnalyticsCategoryResponse {
  CategoryProperties?: CategoryProperties | undefined;
}
export interface UpdateLanguageModelRequest {
  ModelName: string;
  DataAccessRoleArn?: string | undefined;
  EncryptionConfiguration?: EncryptionConfiguration | undefined;
}
export interface UpdateLanguageModelResponse {
  ModelName?: string | undefined;
  ModelStatus?: ModelStatus | undefined;
  LastModifiedTime?: Date | undefined;
}
export interface UpdateMedicalVocabularyRequest {
  VocabularyName: string;
  LanguageCode: LanguageCode;
  VocabularyFileUri: string;
}
export interface UpdateMedicalVocabularyResponse {
  VocabularyName?: string | undefined;
  LanguageCode?: LanguageCode | undefined;
  LastModifiedTime?: Date | undefined;
  VocabularyState?: VocabularyState | undefined;
}
export interface UpdateVocabularyRequest {
  VocabularyName: string;
  LanguageCode: LanguageCode;
  Phrases?: string[] | undefined;
  VocabularyFileUri?: string | undefined;
  DataAccessRoleArn?: string | undefined;
  EncryptionConfiguration?: EncryptionConfiguration | undefined;
}
export interface UpdateVocabularyResponse {
  VocabularyName?: string | undefined;
  LanguageCode?: LanguageCode | undefined;
  LastModifiedTime?: Date | undefined;
  VocabularyState?: VocabularyState | undefined;
}
export interface UpdateVocabularyFilterRequest {
  VocabularyFilterName: string;
  Words?: string[] | undefined;
  VocabularyFilterFileUri?: string | undefined;
  DataAccessRoleArn?: string | undefined;
  EncryptionConfiguration?: EncryptionConfiguration | undefined;
}
export interface UpdateVocabularyFilterResponse {
  VocabularyFilterName?: string | undefined;
  LanguageCode?: LanguageCode | undefined;
  LastModifiedTime?: Date | undefined;
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
  CreateCallAnalyticsCategoryRequest & RegionInput,
  CreateCallAnalyticsCategoryResponse,
  CreateCallAnalyticsCategoryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(832, __c52, 0) as any as S.Schema<CreateCallAnalyticsCategoryRequest>,
  output: __S(880, __c55, 0) as any as S.Schema<CreateCallAnalyticsCategoryResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    InternalFailureException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCallAnalyticsCategory",
  telemetry: TELEMETRY,
  span: "CreateCallAnalyticsCategory",
}));

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
  CreateLanguageModelRequest & RegionInput,
  CreateLanguageModelResponse,
  CreateLanguageModelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(928, __c58, 0) as any as S.Schema<CreateLanguageModelRequest>,
  output: __S(929, __c58, 1) as any as S.Schema<CreateLanguageModelResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    InternalFailureException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateLanguageModel",
  telemetry: TELEMETRY,
  span: "CreateLanguageModel",
}));

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
  CreateMedicalVocabularyRequest & RegionInput,
  CreateMedicalVocabularyResponse,
  CreateMedicalVocabularyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(992, __c62, 0) as any as S.Schema<CreateMedicalVocabularyRequest>,
  output: __S(1008, __c63, 0) as any as S.Schema<CreateMedicalVocabularyResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    InternalFailureException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateMedicalVocabulary",
  telemetry: TELEMETRY,
  span: "CreateMedicalVocabulary",
}));

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
  CreateVocabularyRequest & RegionInput,
  CreateVocabularyResponse,
  CreateVocabularyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1024, __c64, 0) as any as S.Schema<CreateVocabularyRequest>,
  output: __S(1008, __c63, 0) as any as S.Schema<CreateVocabularyResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    InternalFailureException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateVocabulary",
  telemetry: TELEMETRY,
  span: "CreateVocabulary",
}));

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
  CreateVocabularyFilterRequest & RegionInput,
  CreateVocabularyFilterResponse,
  CreateVocabularyFilterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1040, __c65, 0) as any as S.Schema<CreateVocabularyFilterRequest>,
  output: __S(1056, __c66, 0) as any as S.Schema<CreateVocabularyFilterResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    InternalFailureException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateVocabularyFilter",
  telemetry: TELEMETRY,
  span: "CreateVocabularyFilter",
}));

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
  DeleteCallAnalyticsCategoryRequest & RegionInput,
  DeleteCallAnalyticsCategoryResponse,
  DeleteCallAnalyticsCategoryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<DeleteCallAnalyticsCategoryRequest>,
  output: __S(16, __c1, 0) as any as S.Schema<DeleteCallAnalyticsCategoryResponse>,
  errors: [
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCallAnalyticsCategory",
  telemetry: TELEMETRY,
  span: "DeleteCallAnalyticsCategory",
}));

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
  DeleteCallAnalyticsJobRequest & RegionInput,
  DeleteCallAnalyticsJobResponse,
  DeleteCallAnalyticsJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(32, __c2, 0) as any as S.Schema<DeleteCallAnalyticsJobRequest>,
  output: __S(16, __c1, 0) as any as S.Schema<DeleteCallAnalyticsJobResponse>,
  errors: [BadRequestException, InternalFailureException, LimitExceededException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCallAnalyticsJob",
  telemetry: TELEMETRY,
  span: "DeleteCallAnalyticsJob",
}));

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
  DeleteLanguageModelRequest & RegionInput,
  DeleteLanguageModelResponse,
  DeleteLanguageModelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(48, __c3, 0) as any as S.Schema<DeleteLanguageModelRequest>,
  output: __S(16, __c1, 0) as any as S.Schema<DeleteLanguageModelResponse>,
  errors: [BadRequestException, InternalFailureException, LimitExceededException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteLanguageModel",
  telemetry: TELEMETRY,
  span: "DeleteLanguageModel",
}));

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
  DeleteMedicalScribeJobRequest & RegionInput,
  DeleteMedicalScribeJobResponse,
  DeleteMedicalScribeJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(64, __c4, 0) as any as S.Schema<DeleteMedicalScribeJobRequest>,
  output: __S(16, __c1, 0) as any as S.Schema<DeleteMedicalScribeJobResponse>,
  errors: [BadRequestException, InternalFailureException, LimitExceededException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteMedicalScribeJob",
  telemetry: TELEMETRY,
  span: "DeleteMedicalScribeJob",
}));

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
  DeleteMedicalTranscriptionJobRequest & RegionInput,
  DeleteMedicalTranscriptionJobResponse,
  DeleteMedicalTranscriptionJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(80, __c5, 0) as any as S.Schema<DeleteMedicalTranscriptionJobRequest>,
  output: __S(16, __c1, 0) as any as S.Schema<DeleteMedicalTranscriptionJobResponse>,
  errors: [BadRequestException, InternalFailureException, LimitExceededException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteMedicalTranscriptionJob",
  telemetry: TELEMETRY,
  span: "DeleteMedicalTranscriptionJob",
}));

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
  DeleteMedicalVocabularyRequest & RegionInput,
  DeleteMedicalVocabularyResponse,
  DeleteMedicalVocabularyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(96, __c6, 0) as any as S.Schema<DeleteMedicalVocabularyRequest>,
  output: __S(16, __c1, 0) as any as S.Schema<DeleteMedicalVocabularyResponse>,
  errors: [
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteMedicalVocabulary",
  telemetry: TELEMETRY,
  span: "DeleteMedicalVocabulary",
}));

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
  DeleteTranscriptionJobRequest & RegionInput,
  DeleteTranscriptionJobResponse,
  DeleteTranscriptionJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(112, __c7, 0) as any as S.Schema<DeleteTranscriptionJobRequest>,
  output: __S(16, __c1, 0) as any as S.Schema<DeleteTranscriptionJobResponse>,
  errors: [BadRequestException, InternalFailureException, LimitExceededException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTranscriptionJob",
  telemetry: TELEMETRY,
  span: "DeleteTranscriptionJob",
}));

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
  DeleteVocabularyRequest & RegionInput,
  DeleteVocabularyResponse,
  DeleteVocabularyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(128, __c8, 0) as any as S.Schema<DeleteVocabularyRequest>,
  output: __S(16, __c1, 0) as any as S.Schema<DeleteVocabularyResponse>,
  errors: [
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteVocabulary",
  telemetry: TELEMETRY,
  span: "DeleteVocabulary",
}));

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
  DeleteVocabularyFilterRequest & RegionInput,
  DeleteVocabularyFilterResponse,
  DeleteVocabularyFilterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(144, __c9, 0) as any as S.Schema<DeleteVocabularyFilterRequest>,
  output: __S(16, __c1, 0) as any as S.Schema<DeleteVocabularyFilterResponse>,
  errors: [
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteVocabularyFilter",
  telemetry: TELEMETRY,
  span: "DeleteVocabularyFilter",
}));

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
  DescribeLanguageModelRequest & RegionInput,
  DescribeLanguageModelResponse,
  DescribeLanguageModelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(160, __c10, 0) as any as S.Schema<DescribeLanguageModelRequest>,
  output: __S(161, __c10, 1) as any as S.Schema<DescribeLanguageModelResponse>,
  errors: [
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeLanguageModel",
  telemetry: TELEMETRY,
  span: "DescribeLanguageModel",
}));

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
  GetCallAnalyticsCategoryRequest & RegionInput,
  GetCallAnalyticsCategoryResponse,
  GetCallAnalyticsCategoryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(192, __c12, 0) as any as S.Schema<GetCallAnalyticsCategoryRequest>,
  output: __S(880, __c55, 0) as any as S.Schema<GetCallAnalyticsCategoryResponse>,
  errors: [
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCallAnalyticsCategory",
  telemetry: TELEMETRY,
  span: "GetCallAnalyticsCategory",
}));

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
  GetCallAnalyticsJobRequest & RegionInput,
  GetCallAnalyticsJobResponse,
  GetCallAnalyticsJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(208, __c13, 0) as any as S.Schema<GetCallAnalyticsJobRequest>,
  output: __S(293, __c18, 5) as any as S.Schema<GetCallAnalyticsJobResponse>,
  errors: [
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCallAnalyticsJob",
  telemetry: TELEMETRY,
  span: "GetCallAnalyticsJob",
}));

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
  GetMedicalScribeJobRequest & RegionInput,
  GetMedicalScribeJobResponse,
  GetMedicalScribeJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(304, __c19, 0) as any as S.Schema<GetMedicalScribeJobRequest>,
  output: __S(326, __c20, 6) as any as S.Schema<GetMedicalScribeJobResponse>,
  errors: [
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMedicalScribeJob",
  telemetry: TELEMETRY,
  span: "GetMedicalScribeJob",
}));

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
  GetMedicalTranscriptionJobRequest & RegionInput,
  GetMedicalTranscriptionJobResponse,
  GetMedicalTranscriptionJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(336, __c21, 0) as any as S.Schema<GetMedicalTranscriptionJobRequest>,
  output: __S(355, __c22, 3) as any as S.Schema<GetMedicalTranscriptionJobResponse>,
  errors: [
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMedicalTranscriptionJob",
  telemetry: TELEMETRY,
  span: "GetMedicalTranscriptionJob",
}));

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
  GetMedicalVocabularyRequest & RegionInput,
  GetMedicalVocabularyResponse,
  GetMedicalVocabularyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(368, __c23, 0) as any as S.Schema<GetMedicalVocabularyRequest>,
  output: __S(369, __c23, 1) as any as S.Schema<GetMedicalVocabularyResponse>,
  errors: [
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMedicalVocabulary",
  telemetry: TELEMETRY,
  span: "GetMedicalVocabulary",
}));

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
  GetTranscriptionJobRequest & RegionInput,
  GetTranscriptionJobResponse,
  GetTranscriptionJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(384, __c24, 0) as any as S.Schema<GetTranscriptionJobRequest>,
  output: __S(420, __c26, 4) as any as S.Schema<GetTranscriptionJobResponse>,
  errors: [
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTranscriptionJob",
  telemetry: TELEMETRY,
  span: "GetTranscriptionJob",
}));

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
  GetVocabularyRequest & RegionInput,
  GetVocabularyResponse,
  GetVocabularyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(432, __c27, 0) as any as S.Schema<GetVocabularyRequest>,
  output: __S(433, __c27, 1) as any as S.Schema<GetVocabularyResponse>,
  errors: [
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetVocabulary",
  telemetry: TELEMETRY,
  span: "GetVocabulary",
}));

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
  GetVocabularyFilterRequest & RegionInput,
  GetVocabularyFilterResponse,
  GetVocabularyFilterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(448, __c28, 0) as any as S.Schema<GetVocabularyFilterRequest>,
  output: __S(449, __c28, 1) as any as S.Schema<GetVocabularyFilterResponse>,
  errors: [
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetVocabularyFilter",
  telemetry: TELEMETRY,
  span: "GetVocabularyFilter",
}));

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
  ListCallAnalyticsCategoriesRequest & RegionInput,
  ListCallAnalyticsCategoriesResponse,
  ListCallAnalyticsCategoriesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(464, __c29, 0) as any as S.Schema<ListCallAnalyticsCategoriesRequest>,
  output: __S(466, __c29, 2) as any as S.Schema<ListCallAnalyticsCategoriesResponse>,
  errors: [BadRequestException, InternalFailureException, LimitExceededException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCallAnalyticsCategories",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListCallAnalyticsCategories",
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
  ListCallAnalyticsJobsRequest & RegionInput,
  ListCallAnalyticsJobsResponse,
  ListCallAnalyticsJobsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(480, __c30, 0) as any as S.Schema<ListCallAnalyticsJobsRequest>,
  output: __S(483, __c30, 3) as any as S.Schema<ListCallAnalyticsJobsResponse>,
  errors: [BadRequestException, InternalFailureException, LimitExceededException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCallAnalyticsJobs",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListCallAnalyticsJobs",
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
  ListLanguageModelsRequest & RegionInput,
  ListLanguageModelsResponse,
  ListLanguageModelsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(496, __c31, 0) as any as S.Schema<ListLanguageModelsRequest>,
  output: __S(498, __c31, 2) as any as S.Schema<ListLanguageModelsResponse>,
  errors: [BadRequestException, InternalFailureException, LimitExceededException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListLanguageModels",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListLanguageModels",
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
  ListMedicalScribeJobsRequest & RegionInput,
  ListMedicalScribeJobsResponse,
  ListMedicalScribeJobsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(512, __c32, 0) as any as S.Schema<ListMedicalScribeJobsRequest>,
  output: __S(515, __c32, 3) as any as S.Schema<ListMedicalScribeJobsResponse>,
  errors: [BadRequestException, InternalFailureException, LimitExceededException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMedicalScribeJobs",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListMedicalScribeJobs",
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
  ListMedicalTranscriptionJobsRequest & RegionInput,
  ListMedicalTranscriptionJobsResponse,
  ListMedicalTranscriptionJobsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(528, __c33, 0) as any as S.Schema<ListMedicalTranscriptionJobsRequest>,
  output: __S(531, __c33, 3) as any as S.Schema<ListMedicalTranscriptionJobsResponse>,
  errors: [BadRequestException, InternalFailureException, LimitExceededException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMedicalTranscriptionJobs",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListMedicalTranscriptionJobs",
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
  ListMedicalVocabulariesRequest & RegionInput,
  ListMedicalVocabulariesResponse,
  ListMedicalVocabulariesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(544, __c34, 0) as any as S.Schema<ListMedicalVocabulariesRequest>,
  output: __S(561, __c35, 1) as any as S.Schema<ListMedicalVocabulariesResponse>,
  errors: [BadRequestException, InternalFailureException, LimitExceededException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMedicalVocabularies",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListMedicalVocabularies",
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
  ListTagsForResourceRequest & RegionInput,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(592, __c37, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(593, __c37, 1) as any as S.Schema<ListTagsForResourceResponse>,
  errors: [
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
  telemetry: TELEMETRY,
  span: "ListTagsForResource",
}));

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
  ListTranscriptionJobsRequest & RegionInput,
  ListTranscriptionJobsResponse,
  ListTranscriptionJobsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(608, __c38, 0) as any as S.Schema<ListTranscriptionJobsRequest>,
  output: __S(611, __c38, 3) as any as S.Schema<ListTranscriptionJobsResponse>,
  errors: [BadRequestException, InternalFailureException, LimitExceededException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTranscriptionJobs",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListTranscriptionJobs",
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
  ListVocabulariesRequest & RegionInput,
  ListVocabulariesResponse,
  ListVocabulariesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(624, __c39, 0) as any as S.Schema<ListVocabulariesRequest>,
  output: __S(561, __c35, 1) as any as S.Schema<ListVocabulariesResponse>,
  errors: [BadRequestException, InternalFailureException, LimitExceededException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListVocabularies",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListVocabularies",
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
  ListVocabularyFiltersRequest & RegionInput,
  ListVocabularyFiltersResponse,
  ListVocabularyFiltersError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(640, __c40, 0) as any as S.Schema<ListVocabularyFiltersRequest>,
  output: __S(642, __c40, 2) as any as S.Schema<ListVocabularyFiltersResponse>,
  errors: [BadRequestException, InternalFailureException, LimitExceededException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListVocabularyFilters",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListVocabularyFilters",
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
  StartCallAnalyticsJobRequest & RegionInput,
  StartCallAnalyticsJobResponse,
  StartCallAnalyticsJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(656, __c41, 0) as any as S.Schema<StartCallAnalyticsJobRequest>,
  output: __S(293, __c18, 5) as any as S.Schema<StartCallAnalyticsJobResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    InternalFailureException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartCallAnalyticsJob",
  telemetry: TELEMETRY,
  span: "StartCallAnalyticsJob",
}));

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
  StartMedicalScribeJobRequest & RegionInput,
  StartMedicalScribeJobResponse,
  StartMedicalScribeJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(674, __c42, 2) as any as S.Schema<StartMedicalScribeJobRequest>,
  output: __S(326, __c20, 6) as any as S.Schema<StartMedicalScribeJobResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    InternalFailureException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartMedicalScribeJob",
  telemetry: TELEMETRY,
  span: "StartMedicalScribeJob",
}));

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
  StartMedicalTranscriptionJobRequest & RegionInput,
  StartMedicalTranscriptionJobResponse,
  StartMedicalTranscriptionJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(688, __c43, 0) as any as S.Schema<StartMedicalTranscriptionJobRequest>,
  output: __S(355, __c22, 3) as any as S.Schema<StartMedicalTranscriptionJobResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    InternalFailureException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartMedicalTranscriptionJob",
  telemetry: TELEMETRY,
  span: "StartMedicalTranscriptionJob",
}));

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
  StartTranscriptionJobRequest & RegionInput,
  StartTranscriptionJobResponse,
  StartTranscriptionJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(705, __c44, 1) as any as S.Schema<StartTranscriptionJobRequest>,
  output: __S(420, __c26, 4) as any as S.Schema<StartTranscriptionJobResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    InternalFailureException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartTranscriptionJob",
  telemetry: TELEMETRY,
  span: "StartTranscriptionJob",
}));

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
  TagResourceRequest & RegionInput,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(720, __c45, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(16, __c1, 0) as any as S.Schema<TagResourceResponse>,
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
  telemetry: TELEMETRY,
  span: "TagResource",
}));

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
  UntagResourceRequest & RegionInput,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(736, __c46, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(16, __c1, 0) as any as S.Schema<UntagResourceResponse>,
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
  telemetry: TELEMETRY,
  span: "UntagResource",
}));

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
  UpdateCallAnalyticsCategoryRequest & RegionInput,
  UpdateCallAnalyticsCategoryResponse,
  UpdateCallAnalyticsCategoryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(752, __c47, 0) as any as S.Schema<UpdateCallAnalyticsCategoryRequest>,
  output: __S(880, __c55, 0) as any as S.Schema<UpdateCallAnalyticsCategoryResponse>,
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
  telemetry: TELEMETRY,
  span: "UpdateCallAnalyticsCategory",
}));

export type UpdateLanguageModelError =
  | BadRequestException
  | ConflictException
  | InternalFailureException
  | LimitExceededException
  | NotFoundException
  | CommonErrors;
/**
 * Updates the encryption configuration for an existing custom language model. You can
 * use this operation to change the KMS key used to encrypt your model artifacts. The model
 * artifacts are re-encrypted in place. No model training is required.
 *
 * Your custom language model must not be in the `IN_PROGRESS` state when you
 * call this operation. You cannot submit another update while a previous update is in
 * progress. Use to check the current state of
 * your model.
 *
 * Your custom language model remains available for transcription jobs while the update
 * is being processed.
 */
export const updateLanguageModel: API.OperationMethod<
  UpdateLanguageModelRequest & RegionInput,
  UpdateLanguageModelResponse,
  UpdateLanguageModelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(768, __c48, 0) as any as S.Schema<UpdateLanguageModelRequest>,
  output: __S(769, __c48, 1) as any as S.Schema<UpdateLanguageModelResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateLanguageModel",
  telemetry: TELEMETRY,
  span: "UpdateLanguageModel",
}));

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
  UpdateMedicalVocabularyRequest & RegionInput,
  UpdateMedicalVocabularyResponse,
  UpdateMedicalVocabularyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(784, __c49, 0) as any as S.Schema<UpdateMedicalVocabularyRequest>,
  output: __S(576, __c36, 0) as any as S.Schema<UpdateMedicalVocabularyResponse>,
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
  telemetry: TELEMETRY,
  span: "UpdateMedicalVocabulary",
}));

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
 *
 * Your custom vocabulary must be in a terminal state (`READY` or
 * `FAILED`) before you can update it. You must include either
 * `Phrases` or `VocabularyFileUri` in your request.
 */
export const updateVocabulary: API.OperationMethod<
  UpdateVocabularyRequest & RegionInput,
  UpdateVocabularyResponse,
  UpdateVocabularyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(800, __c50, 0) as any as S.Schema<UpdateVocabularyRequest>,
  output: __S(576, __c36, 0) as any as S.Schema<UpdateVocabularyResponse>,
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
  telemetry: TELEMETRY,
  span: "UpdateVocabulary",
}));

export type UpdateVocabularyFilterError =
  | BadRequestException
  | ConflictException
  | InternalFailureException
  | LimitExceededException
  | NotFoundException
  | CommonErrors;
/**
 * Updates an existing custom vocabulary filter with a new list of words. The new list
 * you provide overwrites all previous entries; you cannot append new terms onto an
 * existing custom vocabulary filter.
 *
 * You must include either `Words` or `VocabularyFilterFileUri`
 * in your request.
 */
export const updateVocabularyFilter: API.OperationMethod<
  UpdateVocabularyFilterRequest & RegionInput,
  UpdateVocabularyFilterResponse,
  UpdateVocabularyFilterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(816, __c51, 0) as any as S.Schema<UpdateVocabularyFilterRequest>,
  output: __S(1056, __c66, 0) as any as S.Schema<UpdateVocabularyFilterResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateVocabularyFilter",
  telemetry: TELEMETRY,
  span: "UpdateVocabularyFilter",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ CategoryName: S.String.pipe(T.HttpLabel("CategoryName")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/callanalyticscategories/{CategoryName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteCallAnalyticsCategoryRequest" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({
        identifier: "DeleteCallAnalyticsCategoryResponse",
      });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ CallAnalyticsJobName: S.String.pipe(T.HttpLabel("CallAnalyticsJobName")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/callanalyticsjobs/{CallAnalyticsJobName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteCallAnalyticsJobRequest" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ModelName: S.String.pipe(T.HttpLabel("ModelName")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/languagemodels/{ModelName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteLanguageModelRequest" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ MedicalScribeJobName: S.String.pipe(T.HttpLabel("MedicalScribeJobName")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/medicalscribejobs/{MedicalScribeJobName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteMedicalScribeJobRequest" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MedicalTranscriptionJobName: S.String.pipe(T.HttpLabel("MedicalTranscriptionJobName")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/medicaltranscriptionjobs/{MedicalTranscriptionJobName}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteMedicalTranscriptionJobRequest" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ VocabularyName: S.String.pipe(T.HttpLabel("VocabularyName")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/medicalvocabularies/{VocabularyName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteMedicalVocabularyRequest" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ TranscriptionJobName: S.String.pipe(T.HttpLabel("TranscriptionJobName")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/transcriptionjobs/{TranscriptionJobName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteTranscriptionJobRequest" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ VocabularyName: S.String.pipe(T.HttpLabel("VocabularyName")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/vocabularies/{VocabularyName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteVocabularyRequest" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ VocabularyFilterName: S.String.pipe(T.HttpLabel("VocabularyFilterName")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/vocabularyFilters/{VocabularyFilterName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteVocabularyFilterRequest" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ModelName: S.String.pipe(T.HttpLabel("ModelName")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/languagemodels/{ModelName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeLanguageModelRequest" });
    case 1:
      return S.suspend(() => S.Struct({ LanguageModel: S.optional(__S(176, __c11, 0)) })).annotate({
        identifier: "DescribeLanguageModelResponse",
      });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ModelName: S.optional(S.String),
          CreateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastModifiedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LanguageCode: S.optional(S.String),
          BaseModelName: S.optional(S.String),
          ModelStatus: S.optional(S.String),
          UpgradeAvailability: S.optional(S.Boolean),
          FailureReason: S.optional(S.String),
          InputDataConfig: S.optional(__S(944, __c59, 0)),
          EncryptionConfiguration: S.optional(__S(976, __c61, 0)),
        }),
      ).annotate({ identifier: "LanguageModel" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ CategoryName: S.String.pipe(T.HttpLabel("CategoryName")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/callanalyticscategories/{CategoryName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetCallAnalyticsCategoryRequest" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ CallAnalyticsJobName: S.String.pipe(T.HttpLabel("CallAnalyticsJobName")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/callanalyticsjobs/{CallAnalyticsJobName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetCallAnalyticsJobRequest" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MediaFileUri: S.optional(S.String),
          RedactedMediaFileUri: S.optional(S.String),
        }),
      ).annotate({ identifier: "Media" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          RedactionType: S.String,
          RedactionOutput: S.String,
          PiiEntityTypes: S.optional(__S(848, __c53, 0)),
        }),
      ).annotate({ identifier: "ContentRedaction" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          TranscriptFileUri: S.optional(S.String),
          RedactedTranscriptFileUri: S.optional(S.String),
        }),
      ).annotate({ identifier: "Transcript" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          VocabularyName: S.optional(S.String),
          VocabularyFilterName: S.optional(S.String),
          LanguageModelName: S.optional(S.String),
        }),
      ).annotate({ identifier: "LanguageIdSettings" });
    case 2:
      return S.Record(S.String, /*@__PURE__*/ __S(257, __c16, 1).pipe(S.optional));
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Feature: S.optional(S.String),
          ReasonCode: S.optional(S.String),
          Message: S.optional(S.String),
        }),
      ).annotate({ identifier: "CallAnalyticsSkippedFeature" });
    case 1:
      return S.Array(__S(272, __c17, 0));
    case 2:
      return S.suspend(() => S.Struct({ Skipped: S.optional(__S(273, __c17, 1)) })).annotate({
        identifier: "CallAnalyticsJobDetails",
      });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ GenerateAbstractiveSummary: S.Boolean })).annotate({
        identifier: "Summarization",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          VocabularyName: S.optional(S.String),
          VocabularyFilterName: S.optional(S.String),
          VocabularyFilterMethod: S.optional(S.String),
          LanguageModelName: S.optional(S.String),
          ContentRedaction: S.optional(__S(240, __c15, 0)),
          LanguageOptions: S.optional(__S(848, __c53, 0)),
          LanguageIdSettings: S.optional(__S(258, __c16, 2)),
          Summarization: S.optional(__S(288, __c18, 0)),
        }),
      ).annotate({ identifier: "CallAnalyticsJobSettings" });
    case 2:
      return S.suspend(() =>
        S.Struct({ ChannelId: S.optional(S.Number), ParticipantRole: S.optional(S.String) }),
      ).annotate({ identifier: "ChannelDefinition" });
    case 3:
      return S.Array(__S(290, __c18, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          CallAnalyticsJobName: S.optional(S.String),
          CallAnalyticsJobStatus: S.optional(S.String),
          CallAnalyticsJobDetails: S.optional(__S(274, __c17, 2)),
          LanguageCode: S.optional(S.String),
          MediaSampleRateHertz: S.optional(S.Number),
          MediaFormat: S.optional(S.String),
          Media: S.optional(__S(224, __c14, 0)),
          Transcript: S.optional(__S(256, __c16, 0)),
          StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          CompletionTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          FailureReason: S.optional(S.String),
          DataAccessRoleArn: S.optional(S.String),
          IdentifiedLanguageScore: S.optional(S.Number),
          Settings: S.optional(__S(289, __c18, 1)),
          ChannelDefinitions: S.optional(__S(291, __c18, 3)),
          Tags: S.optional(__S(897, __c56, 1)),
        }),
      ).annotate({ identifier: "CallAnalyticsJob" });
    case 5:
      return S.suspend(() =>
        S.Struct({ CallAnalyticsJob: S.optional(__S(292, __c18, 4)) }),
      ).annotate({ identifier: "GetCallAnalyticsJobResponse" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ MedicalScribeJobName: S.String.pipe(T.HttpLabel("MedicalScribeJobName")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/medicalscribejobs/{MedicalScribeJobName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetMedicalScribeJobRequest" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ TranscriptFileUri: S.String, ClinicalDocumentUri: S.String }),
      ).annotate({ identifier: "MedicalScribeOutput" });
    case 1:
      return S.suspend(() => S.Struct({ NoteTemplate: S.optional(S.String) })).annotate({
        identifier: "ClinicalNoteGenerationSettings",
      });
    case 2:
      return S.suspend(() =>
        S.Struct({
          ShowSpeakerLabels: S.optional(S.Boolean),
          MaxSpeakerLabels: S.optional(S.Number),
          ChannelIdentification: S.optional(S.Boolean),
          VocabularyName: S.optional(S.String),
          VocabularyFilterName: S.optional(S.String),
          VocabularyFilterMethod: S.optional(S.String),
          ClinicalNoteGenerationSettings: S.optional(__S(321, __c20, 1)),
        }),
      ).annotate({ identifier: "MedicalScribeSettings" });
    case 3:
      return S.suspend(() => S.Struct({ ChannelId: S.Number, ParticipantRole: S.String })).annotate(
        { identifier: "MedicalScribeChannelDefinition" },
      );
    case 4:
      return S.Array(__S(323, __c20, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          MedicalScribeJobName: S.optional(S.String),
          MedicalScribeJobStatus: S.optional(S.String),
          LanguageCode: S.optional(S.String),
          Media: S.optional(__S(224, __c14, 0)),
          MedicalScribeOutput: S.optional(__S(320, __c20, 0)),
          StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          CompletionTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          FailureReason: S.optional(S.String),
          Settings: S.optional(__S(322, __c20, 2)),
          DataAccessRoleArn: S.optional(S.String),
          ChannelDefinitions: S.optional(__S(324, __c20, 4)),
          MedicalScribeContextProvided: S.optional(S.Boolean),
          Tags: S.optional(__S(897, __c56, 1)),
        }),
      ).annotate({ identifier: "MedicalScribeJob" });
    case 6:
      return S.suspend(() =>
        S.Struct({ MedicalScribeJob: S.optional(__S(325, __c20, 5)) }),
      ).annotate({ identifier: "GetMedicalScribeJobResponse" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MedicalTranscriptionJobName: S.String.pipe(T.HttpLabel("MedicalTranscriptionJobName")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/medicaltranscriptionjobs/{MedicalTranscriptionJobName}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetMedicalTranscriptionJobRequest" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ TranscriptFileUri: S.optional(S.String) })).annotate({
        identifier: "MedicalTranscript",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ShowSpeakerLabels: S.optional(S.Boolean),
          MaxSpeakerLabels: S.optional(S.Number),
          ChannelIdentification: S.optional(S.Boolean),
          ShowAlternatives: S.optional(S.Boolean),
          MaxAlternatives: S.optional(S.Number),
          VocabularyName: S.optional(S.String),
        }),
      ).annotate({ identifier: "MedicalTranscriptionSetting" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          MedicalTranscriptionJobName: S.optional(S.String),
          TranscriptionJobStatus: S.optional(S.String),
          LanguageCode: S.optional(S.String),
          MediaSampleRateHertz: S.optional(S.Number),
          MediaFormat: S.optional(S.String),
          Media: S.optional(__S(224, __c14, 0)),
          Transcript: S.optional(__S(352, __c22, 0)),
          StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          CompletionTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          FailureReason: S.optional(S.String),
          Settings: S.optional(__S(353, __c22, 1)),
          ContentIdentificationType: S.optional(S.String),
          Specialty: S.optional(S.String),
          Type: S.optional(S.String),
          Tags: S.optional(__S(897, __c56, 1)),
        }),
      ).annotate({ identifier: "MedicalTranscriptionJob" });
    case 3:
      return S.suspend(() =>
        S.Struct({ MedicalTranscriptionJob: S.optional(__S(354, __c22, 2)) }),
      ).annotate({ identifier: "GetMedicalTranscriptionJobResponse" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ VocabularyName: S.String.pipe(T.HttpLabel("VocabularyName")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/medicalvocabularies/{VocabularyName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetMedicalVocabularyRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          VocabularyName: S.optional(S.String),
          LanguageCode: S.optional(S.String),
          VocabularyState: S.optional(S.String),
          LastModifiedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          FailureReason: S.optional(S.String),
          DownloadUri: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetMedicalVocabularyResponse" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ TranscriptionJobName: S.String.pipe(T.HttpLabel("TranscriptionJobName")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/transcriptionjobs/{TranscriptionJobName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetTranscriptionJobRequest" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ LanguageModelName: S.optional(S.String) })).annotate({
        identifier: "ModelSettings",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({ LanguageCode: S.optional(S.String), DurationInSeconds: S.optional(S.Number) }),
      ).annotate({ identifier: "LanguageCodeItem" });
    case 2:
      return S.Array(__S(401, __c25, 1));
    case 3:
      return S.suspend(() => S.Struct({ ToxicityCategories: __S(848, __c53, 0) })).annotate({
        identifier: "ToxicityDetectionSettings",
      });
    case 4:
      return S.Array(__S(403, __c25, 3));
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          VocabularyName: S.optional(S.String),
          ShowSpeakerLabels: S.optional(S.Boolean),
          MaxSpeakerLabels: S.optional(S.Number),
          ChannelIdentification: S.optional(S.Boolean),
          ShowAlternatives: S.optional(S.Boolean),
          MaxAlternatives: S.optional(S.Number),
          VocabularyFilterName: S.optional(S.String),
          VocabularyFilterMethod: S.optional(S.String),
        }),
      ).annotate({ identifier: "Settings" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          AllowDeferredExecution: S.optional(S.Boolean),
          DataAccessRoleArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "JobExecutionSettings" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          Formats: S.optional(__S(848, __c53, 0)),
          SubtitleFileUris: S.optional(__S(912, __c57, 0)),
          OutputStartIndex: S.optional(S.Number),
        }),
      ).annotate({ identifier: "SubtitlesOutput" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          TranscriptionJobName: S.optional(S.String),
          TranscriptionJobStatus: S.optional(S.String),
          LanguageCode: S.optional(S.String),
          MediaSampleRateHertz: S.optional(S.Number),
          MediaFormat: S.optional(S.String),
          Media: S.optional(__S(224, __c14, 0)),
          Transcript: S.optional(__S(256, __c16, 0)),
          StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          CompletionTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          FailureReason: S.optional(S.String),
          Settings: S.optional(__S(416, __c26, 0)),
          ModelSettings: S.optional(__S(400, __c25, 0)),
          JobExecutionSettings: S.optional(__S(417, __c26, 1)),
          ContentRedaction: S.optional(__S(240, __c15, 0)),
          IdentifyLanguage: S.optional(S.Boolean),
          IdentifyMultipleLanguages: S.optional(S.Boolean),
          LanguageOptions: S.optional(__S(848, __c53, 0)),
          IdentifiedLanguageScore: S.optional(S.Number),
          LanguageCodes: S.optional(__S(402, __c25, 2)),
          Tags: S.optional(__S(897, __c56, 1)),
          Subtitles: S.optional(__S(418, __c26, 2)),
          LanguageIdSettings: S.optional(__S(258, __c16, 2)),
          ToxicityDetection: S.optional(__S(404, __c25, 4)),
        }),
      ).annotate({ identifier: "TranscriptionJob" });
    case 4:
      return S.suspend(() =>
        S.Struct({ TranscriptionJob: S.optional(__S(419, __c26, 3)) }),
      ).annotate({ identifier: "GetTranscriptionJobResponse" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ VocabularyName: S.String.pipe(T.HttpLabel("VocabularyName")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/vocabularies/{VocabularyName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetVocabularyRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          VocabularyName: S.optional(S.String),
          LanguageCode: S.optional(S.String),
          VocabularyState: S.optional(S.String),
          LastModifiedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          FailureReason: S.optional(S.String),
          DownloadUri: S.optional(S.String),
          DataAccessRoleArn: S.optional(S.String),
          EncryptionConfiguration: S.optional(__S(976, __c61, 0)),
        }),
      ).annotate({ identifier: "GetVocabularyResponse" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ VocabularyFilterName: S.String.pipe(T.HttpLabel("VocabularyFilterName")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/vocabularyFilters/{VocabularyFilterName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetVocabularyFilterRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          VocabularyFilterName: S.optional(S.String),
          LanguageCode: S.optional(S.String),
          LastModifiedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          DownloadUri: S.optional(S.String),
          DataAccessRoleArn: S.optional(S.String),
          EncryptionConfiguration: S.optional(__S(976, __c61, 0)),
        }),
      ).annotate({ identifier: "GetVocabularyFilterResponse" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/callanalyticscategories" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListCallAnalyticsCategoriesRequest" });
    case 1:
      return S.Array(__S(872, __c54, 8));
    case 2:
      return S.suspend(() =>
        S.Struct({ NextToken: S.optional(S.String), Categories: S.optional(__S(465, __c29, 1)) }),
      ).annotate({ identifier: "ListCallAnalyticsCategoriesResponse" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Status: S.optional(S.String).pipe(T.HttpQuery("Status")),
          JobNameContains: S.optional(S.String).pipe(T.HttpQuery("JobNameContains")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/callanalyticsjobs" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListCallAnalyticsJobsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          CallAnalyticsJobName: S.optional(S.String),
          CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          CompletionTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LanguageCode: S.optional(S.String),
          CallAnalyticsJobStatus: S.optional(S.String),
          CallAnalyticsJobDetails: S.optional(__S(274, __c17, 2)),
          FailureReason: S.optional(S.String),
        }),
      ).annotate({ identifier: "CallAnalyticsJobSummary" });
    case 2:
      return S.Array(__S(481, __c30, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          Status: S.optional(S.String),
          NextToken: S.optional(S.String),
          CallAnalyticsJobSummaries: S.optional(__S(482, __c30, 2)),
        }),
      ).annotate({ identifier: "ListCallAnalyticsJobsResponse" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          StatusEquals: S.optional(S.String).pipe(T.HttpQuery("         StatusEquals")),
          NameContains: S.optional(S.String).pipe(T.HttpQuery("NameContains")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/languagemodels" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListLanguageModelsRequest" });
    case 1:
      return S.Array(__S(176, __c11, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ NextToken: S.optional(S.String), Models: S.optional(__S(497, __c31, 1)) }),
      ).annotate({ identifier: "ListLanguageModelsResponse" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Status: S.optional(S.String).pipe(T.HttpQuery("Status")),
          JobNameContains: S.optional(S.String).pipe(T.HttpQuery("JobNameContains")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/medicalscribejobs" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListMedicalScribeJobsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          MedicalScribeJobName: S.optional(S.String),
          CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          CompletionTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LanguageCode: S.optional(S.String),
          MedicalScribeJobStatus: S.optional(S.String),
          FailureReason: S.optional(S.String),
        }),
      ).annotate({ identifier: "MedicalScribeJobSummary" });
    case 2:
      return S.Array(__S(513, __c32, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          Status: S.optional(S.String),
          NextToken: S.optional(S.String),
          MedicalScribeJobSummaries: S.optional(__S(514, __c32, 2)),
        }),
      ).annotate({ identifier: "ListMedicalScribeJobsResponse" });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Status: S.optional(S.String).pipe(T.HttpQuery("Status")),
          JobNameContains: S.optional(S.String).pipe(T.HttpQuery("JobNameContains")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/medicaltranscriptionjobs" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListMedicalTranscriptionJobsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          MedicalTranscriptionJobName: S.optional(S.String),
          CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          CompletionTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LanguageCode: S.optional(S.String),
          TranscriptionJobStatus: S.optional(S.String),
          FailureReason: S.optional(S.String),
          OutputLocationType: S.optional(S.String),
          Specialty: S.optional(S.String),
          ContentIdentificationType: S.optional(S.String),
          Type: S.optional(S.String),
        }),
      ).annotate({ identifier: "MedicalTranscriptionJobSummary" });
    case 2:
      return S.Array(__S(529, __c33, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          Status: S.optional(S.String),
          NextToken: S.optional(S.String),
          MedicalTranscriptionJobSummaries: S.optional(__S(530, __c33, 2)),
        }),
      ).annotate({ identifier: "ListMedicalTranscriptionJobsResponse" });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
          StateEquals: S.optional(S.String).pipe(T.HttpQuery("StateEquals")),
          NameContains: S.optional(S.String).pipe(T.HttpQuery("NameContains")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/medicalvocabularies" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListMedicalVocabulariesRequest" });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(576, __c36, 0));
    case 1:
      return S.suspend(() =>
        S.Struct({
          Status: S.optional(S.String),
          NextToken: S.optional(S.String),
          Vocabularies: S.optional(__S(560, __c35, 0)),
        }),
      ).annotate({ identifier: "ListMedicalVocabulariesResponse" });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          VocabularyName: S.optional(S.String),
          LanguageCode: S.optional(S.String),
          LastModifiedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          VocabularyState: S.optional(S.String),
        }),
      ).annotate({ identifier: "VocabularyInfo" });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/tags/{ResourceArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListTagsForResourceRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ ResourceArn: S.optional(S.String), Tags: S.optional(__S(897, __c56, 1)) }),
      ).annotate({ identifier: "ListTagsForResourceResponse" });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Status: S.optional(S.String).pipe(T.HttpQuery("Status")),
          JobNameContains: S.optional(S.String).pipe(T.HttpQuery("JobNameContains")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/transcriptionjobs" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListTranscriptionJobsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          TranscriptionJobName: S.optional(S.String),
          CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          CompletionTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LanguageCode: S.optional(S.String),
          TranscriptionJobStatus: S.optional(S.String),
          FailureReason: S.optional(S.String),
          OutputLocationType: S.optional(S.String),
          ContentRedaction: S.optional(__S(240, __c15, 0)),
          ModelSettings: S.optional(__S(400, __c25, 0)),
          IdentifyLanguage: S.optional(S.Boolean),
          IdentifyMultipleLanguages: S.optional(S.Boolean),
          IdentifiedLanguageScore: S.optional(S.Number),
          LanguageCodes: S.optional(__S(402, __c25, 2)),
          ToxicityDetection: S.optional(__S(404, __c25, 4)),
        }),
      ).annotate({ identifier: "TranscriptionJobSummary" });
    case 2:
      return S.Array(__S(609, __c38, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          Status: S.optional(S.String),
          NextToken: S.optional(S.String),
          TranscriptionJobSummaries: S.optional(__S(610, __c38, 2)),
        }),
      ).annotate({ identifier: "ListTranscriptionJobsResponse" });
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
          StateEquals: S.optional(S.String).pipe(T.HttpQuery("StateEquals")),
          NameContains: S.optional(S.String).pipe(T.HttpQuery("NameContains")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/vocabularies" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListVocabulariesRequest" });
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
          NameContains: S.optional(S.String).pipe(T.HttpQuery("NameContains")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/vocabularyFilters" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListVocabularyFiltersRequest" });
    case 1:
      return S.Array(__S(1056, __c66, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          VocabularyFilters: S.optional(__S(641, __c40, 1)),
        }),
      ).annotate({ identifier: "ListVocabularyFiltersResponse" });
  }
}
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CallAnalyticsJobName: S.String.pipe(T.HttpLabel("CallAnalyticsJobName")),
          Media: __S(224, __c14, 0),
          OutputLocation: S.optional(S.String),
          OutputEncryptionKMSKeyId: S.optional(S.String),
          DataAccessRoleArn: S.optional(S.String),
          Settings: S.optional(__S(289, __c18, 1)),
          Tags: S.optional(__S(897, __c56, 1)),
          ChannelDefinitions: S.optional(__S(291, __c18, 3)),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/callanalyticsjobs/{CallAnalyticsJobName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartCallAnalyticsJobRequest" });
  }
}
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Pronouns: S.optional(S.String) })).annotate({
        identifier: "MedicalScribePatientContext",
      });
    case 1:
      return S.suspend(() => S.Struct({ PatientContext: S.optional(__S(672, __c42, 0)) })).annotate(
        { identifier: "MedicalScribeContext" },
      );
    case 2:
      return S.suspend(() =>
        S.Struct({
          MedicalScribeJobName: S.String.pipe(T.HttpLabel("MedicalScribeJobName")),
          Media: __S(224, __c14, 0),
          OutputBucketName: S.String,
          OutputEncryptionKMSKeyId: S.optional(S.String),
          KMSEncryptionContext: S.optional(__S(960, __c60, 0)),
          DataAccessRoleArn: S.String,
          Settings: __S(322, __c20, 2),
          ChannelDefinitions: S.optional(__S(324, __c20, 4)),
          Tags: S.optional(__S(897, __c56, 1)),
          MedicalScribeContext: S.optional(__S(673, __c42, 1)),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/medicalscribejobs/{MedicalScribeJobName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartMedicalScribeJobRequest" });
  }
}
function __c43(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MedicalTranscriptionJobName: S.String.pipe(T.HttpLabel("MedicalTranscriptionJobName")),
          LanguageCode: S.String,
          MediaSampleRateHertz: S.optional(S.Number),
          MediaFormat: S.optional(S.String),
          Media: __S(224, __c14, 0),
          OutputBucketName: S.String,
          OutputKey: S.optional(S.String),
          OutputEncryptionKMSKeyId: S.optional(S.String),
          KMSEncryptionContext: S.optional(__S(960, __c60, 0)),
          Settings: S.optional(__S(353, __c22, 1)),
          ContentIdentificationType: S.optional(S.String),
          Specialty: S.String,
          Type: S.String,
          Tags: S.optional(__S(897, __c56, 1)),
        }).pipe(
          T.all(
            T.Http({
              method: "PUT",
              uri: "/medicaltranscriptionjobs/{MedicalTranscriptionJobName}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartMedicalTranscriptionJobRequest" });
  }
}
function __c44(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Formats: S.optional(__S(848, __c53, 0)),
          OutputStartIndex: S.optional(S.Number),
        }),
      ).annotate({ identifier: "Subtitles" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          TranscriptionJobName: S.String.pipe(T.HttpLabel("TranscriptionJobName")),
          LanguageCode: S.optional(S.String),
          MediaSampleRateHertz: S.optional(S.Number),
          MediaFormat: S.optional(S.String),
          Media: __S(224, __c14, 0),
          OutputBucketName: S.optional(S.String),
          OutputKey: S.optional(S.String),
          OutputEncryptionKMSKeyId: S.optional(S.String),
          KMSEncryptionContext: S.optional(__S(960, __c60, 0)),
          Settings: S.optional(__S(416, __c26, 0)),
          ModelSettings: S.optional(__S(400, __c25, 0)),
          JobExecutionSettings: S.optional(__S(417, __c26, 1)),
          ContentRedaction: S.optional(__S(240, __c15, 0)),
          IdentifyLanguage: S.optional(S.Boolean),
          IdentifyMultipleLanguages: S.optional(S.Boolean),
          LanguageOptions: S.optional(__S(848, __c53, 0)),
          Subtitles: S.optional(__S(704, __c44, 0)),
          Tags: S.optional(__S(897, __c56, 1)),
          LanguageIdSettings: S.optional(__S(258, __c16, 2)),
          ToxicityDetection: S.optional(__S(404, __c25, 4)),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/transcriptionjobs/{TranscriptionJobName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartTranscriptionJobRequest" });
  }
}
function __c45(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
          Tags: __S(897, __c56, 1),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/tags/{ResourceArn}" }),
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
function __c46(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
          TagKeys: __S(912, __c57, 0).pipe(T.HttpQuery("tagKeys")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/tags/{ResourceArn}" }),
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
function __c47(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CategoryName: S.String.pipe(T.HttpLabel("CategoryName")),
          Rules: __S(871, __c54, 7),
          InputType: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/callanalyticscategories/{CategoryName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateCallAnalyticsCategoryRequest" });
  }
}
function __c48(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ModelName: S.String.pipe(T.HttpLabel("ModelName")),
          DataAccessRoleArn: S.optional(S.String),
          EncryptionConfiguration: S.optional(__S(976, __c61, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/languagemodels/{ModelName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateLanguageModelRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ModelName: S.optional(S.String),
          ModelStatus: S.optional(S.String),
          LastModifiedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "UpdateLanguageModelResponse" });
  }
}
function __c49(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          VocabularyName: S.String.pipe(T.HttpLabel("VocabularyName")),
          LanguageCode: S.String,
          VocabularyFileUri: S.String,
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/medicalvocabularies/{VocabularyName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateMedicalVocabularyRequest" });
  }
}
function __c50(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          VocabularyName: S.String.pipe(T.HttpLabel("VocabularyName")),
          LanguageCode: S.String,
          Phrases: S.optional(__S(912, __c57, 0)),
          VocabularyFileUri: S.optional(S.String),
          DataAccessRoleArn: S.optional(S.String),
          EncryptionConfiguration: S.optional(__S(976, __c61, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/vocabularies/{VocabularyName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateVocabularyRequest" });
  }
}
function __c51(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          VocabularyFilterName: S.String.pipe(T.HttpLabel("VocabularyFilterName")),
          Words: S.optional(__S(912, __c57, 0)),
          VocabularyFilterFileUri: S.optional(S.String),
          DataAccessRoleArn: S.optional(S.String),
          EncryptionConfiguration: S.optional(__S(976, __c61, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/vocabularyFilters/{VocabularyFilterName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateVocabularyFilterRequest" });
  }
}
function __c52(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CategoryName: S.String.pipe(T.HttpLabel("CategoryName")),
          Rules: __S(871, __c54, 7),
          Tags: S.optional(__S(897, __c56, 1)),
          InputType: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/callanalyticscategories/{CategoryName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateCallAnalyticsCategoryRequest" });
  }
}
function __c53(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c54(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          StartTime: S.optional(S.Number),
          EndTime: S.optional(S.Number),
          First: S.optional(S.Number),
          Last: S.optional(S.Number),
        }),
      ).annotate({ identifier: "AbsoluteTimeRange" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          StartPercentage: S.optional(S.Number),
          EndPercentage: S.optional(S.Number),
          First: S.optional(S.Number),
          Last: S.optional(S.Number),
        }),
      ).annotate({ identifier: "RelativeTimeRange" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          Threshold: S.optional(S.Number),
          AbsoluteTimeRange: S.optional(__S(864, __c54, 0)),
          RelativeTimeRange: S.optional(__S(865, __c54, 1)),
          Negate: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "NonTalkTimeFilter" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          Threshold: S.optional(S.Number),
          ParticipantRole: S.optional(S.String),
          AbsoluteTimeRange: S.optional(__S(864, __c54, 0)),
          RelativeTimeRange: S.optional(__S(865, __c54, 1)),
          Negate: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "InterruptionFilter" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          TranscriptFilterType: S.String,
          AbsoluteTimeRange: S.optional(__S(864, __c54, 0)),
          RelativeTimeRange: S.optional(__S(865, __c54, 1)),
          ParticipantRole: S.optional(S.String),
          Negate: S.optional(S.Boolean),
          Targets: __S(912, __c57, 0),
        }),
      ).annotate({ identifier: "TranscriptFilter" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          Sentiments: __S(848, __c53, 0),
          AbsoluteTimeRange: S.optional(__S(864, __c54, 0)),
          RelativeTimeRange: S.optional(__S(865, __c54, 1)),
          ParticipantRole: S.optional(S.String),
          Negate: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "SentimentFilter" });
    case 6:
      return S.Union([
        /*@__PURE__*/ S.Struct({ NonTalkTimeFilter: __S(866, __c54, 2) }),
        /*@__PURE__*/ S.Struct({ InterruptionFilter: __S(867, __c54, 3) }),
        /*@__PURE__*/ S.Struct({ TranscriptFilter: __S(868, __c54, 4) }),
        /*@__PURE__*/ S.Struct({ SentimentFilter: __S(869, __c54, 5) }),
      ]);
    case 7:
      return S.Array(__S(870, __c54, 6));
    case 8:
      return S.suspend(() =>
        S.Struct({
          CategoryName: S.optional(S.String),
          Rules: S.optional(__S(871, __c54, 7)),
          CreateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastUpdateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Tags: S.optional(__S(897, __c56, 1)),
          InputType: S.optional(S.String),
        }),
      ).annotate({ identifier: "CategoryProperties" });
  }
}
function __c55(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ CategoryProperties: S.optional(__S(872, __c54, 8)) }),
      ).annotate({ identifier: "CreateCallAnalyticsCategoryResponse" });
  }
}
function __c56(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Key: S.String, Value: S.String })).annotate({
        identifier: "Tag",
      });
    case 1:
      return S.Array(__S(896, __c56, 0));
  }
}
function __c57(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c58(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          LanguageCode: S.String,
          BaseModelName: S.String,
          ModelName: S.String.pipe(T.HttpLabel("ModelName")),
          InputDataConfig: __S(944, __c59, 0),
          EncryptionConfiguration: S.optional(__S(976, __c61, 0)),
          Tags: S.optional(__S(897, __c56, 1)),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/languagemodels/{ModelName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateLanguageModelRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          LanguageCode: S.optional(S.String),
          BaseModelName: S.optional(S.String),
          ModelName: S.optional(S.String),
          InputDataConfig: S.optional(__S(944, __c59, 0)),
          ModelStatus: S.optional(S.String),
        }),
      ).annotate({ identifier: "CreateLanguageModelResponse" });
  }
}
function __c59(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          S3Uri: S.String,
          TuningDataS3Uri: S.optional(S.String),
          DataAccessRoleArn: S.String,
        }),
      ).annotate({ identifier: "InputDataConfig" });
  }
}
function __c60(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c61(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ KMSEncryptionContext: S.optional(__S(960, __c60, 0)), KMSKey: S.String }),
      ).annotate({ identifier: "EncryptionConfiguration" });
  }
}
function __c62(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          VocabularyName: S.String.pipe(T.HttpLabel("VocabularyName")),
          LanguageCode: S.String,
          VocabularyFileUri: S.String,
          Tags: S.optional(__S(897, __c56, 1)),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/medicalvocabularies/{VocabularyName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateMedicalVocabularyRequest" });
  }
}
function __c63(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          VocabularyName: S.optional(S.String),
          LanguageCode: S.optional(S.String),
          VocabularyState: S.optional(S.String),
          LastModifiedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          FailureReason: S.optional(S.String),
        }),
      ).annotate({ identifier: "CreateMedicalVocabularyResponse" });
  }
}
function __c64(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          VocabularyName: S.String.pipe(T.HttpLabel("VocabularyName")),
          LanguageCode: S.String,
          Phrases: S.optional(__S(912, __c57, 0)),
          VocabularyFileUri: S.optional(S.String),
          Tags: S.optional(__S(897, __c56, 1)),
          DataAccessRoleArn: S.optional(S.String),
          EncryptionConfiguration: S.optional(__S(976, __c61, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/vocabularies/{VocabularyName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateVocabularyRequest" });
  }
}
function __c65(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          VocabularyFilterName: S.String.pipe(T.HttpLabel("VocabularyFilterName")),
          LanguageCode: S.String,
          Words: S.optional(__S(912, __c57, 0)),
          VocabularyFilterFileUri: S.optional(S.String),
          Tags: S.optional(__S(897, __c56, 1)),
          DataAccessRoleArn: S.optional(S.String),
          EncryptionConfiguration: S.optional(__S(976, __c61, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/vocabularyFilters/{VocabularyFilterName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateVocabularyFilterRequest" });
  }
}
function __c66(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          VocabularyFilterName: S.optional(S.String),
          LanguageCode: S.optional(S.String),
          LastModifiedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "CreateVocabularyFilterResponse" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
