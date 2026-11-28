import * as API from "@distilled.cloud/core/api";
import * as S from "@distilled.cloud/core/schema-lite";
import * as __L from "@distilled.cloud/core/schema-lite";
import * as TxXray from "@distilled.cloud/core/telemetry-xray";
import type * as HttpClient from "effect/http/HttpClient";
import type * as redacted from "effect/Redacted";
import type * as stream from "effect/Stream";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import { AwsServiceErrors } from "../errors.ts";
import { AwsProtocol } from "../protocol.ts";
import type { RegionInput } from "../region.ts";
import { Retry } from "../retry.ts";
import { SensitiveString, SensitiveBlob } from "../sensitive.ts";
import * as T from "../traits.ts";
// Schema table, filled on first reach (see __S at the end).
const __s: any[] = [];
const ns = /*@__PURE__*/ T.XmlNamespace("http://polly.amazonaws.com/doc/v1");
const svc = /*@__PURE__*/ T.AwsApiService({ sdkId: "Polly", serviceShapeName: "Parrot_v1" });
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "polly" });
const ver = /*@__PURE__*/ T.ServiceVersion("2016-06-10");
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
              `https://polly-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(`https://polly-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(`https://polly.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`);
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://polly.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://polly.{R}.{D}","properties":{},"headers":{}}');

/** Span facts shared by every operation (com.distilled.telemetry#service). */
const TELEMETRY = {
  system: "aws-api",
  responseHeaders: [
    { header: "x-amzn-requestid", name: "aws.request_id" },
    { header: "x-amz-request-id", name: "aws.request_id" },
    { header: "x-amzn-request-id", name: "aws.request_id" },
    { header: "x-amz-id-2", name: "aws.extended_request_id" },
  ],
  prefix: "Polly",
  service: "Polly",
  propagate: TxXray.propagate,
} as const;

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "AccessDenied", httpResponseCode: 403 }),
      /*@__PURE__*/ T.HttpError(403),
    ),
  ).pipe(C.withAuthError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      resourceId: S.String,
      resourceType: /*@__PURE__*/ S.suspend(() => S.String).annotate({
        identifier: "ResourceType",
      }),
    },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class EngineNotSupportedException
  extends /*@__PURE__*/ S.TaggedError<EngineNotSupportedException>()(
    "EngineNotSupportedException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidLexiconException
  extends /*@__PURE__*/ S.TaggedError<InvalidLexiconException>()(
    "InvalidLexiconException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidNextTokenException
  extends /*@__PURE__*/ S.TaggedError<InvalidNextTokenException>()(
    "InvalidNextTokenException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidS3BucketException
  extends /*@__PURE__*/ S.TaggedError<InvalidS3BucketException>()(
    "InvalidS3BucketException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidS3KeyException
  extends /*@__PURE__*/ S.TaggedError<InvalidS3KeyException>()(
    "InvalidS3KeyException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidSampleRateException
  extends /*@__PURE__*/ S.TaggedError<InvalidSampleRateException>()(
    "InvalidSampleRateException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidSnsTopicArnException
  extends /*@__PURE__*/ S.TaggedError<InvalidSnsTopicArnException>()(
    "InvalidSnsTopicArnException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidSsmlException
  extends /*@__PURE__*/ S.TaggedError<InvalidSsmlException>()(
    "InvalidSsmlException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidTagParameterException
  extends /*@__PURE__*/ S.TaggedError<InvalidTagParameterException>()(
    "InvalidTagParameterException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidTaskIdException
  extends /*@__PURE__*/ S.TaggedError<InvalidTaskIdException>()(
    "InvalidTaskIdException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class LanguageNotSupportedException
  extends /*@__PURE__*/ S.TaggedError<LanguageNotSupportedException>()(
    "LanguageNotSupportedException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class LexiconNotFoundException
  extends /*@__PURE__*/ S.TaggedError<LexiconNotFoundException>()(
    "LexiconNotFoundException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class LexiconSizeExceededException
  extends /*@__PURE__*/ S.TaggedError<LexiconSizeExceededException>()(
    "LexiconSizeExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class MarksNotSupportedForFormatException
  extends /*@__PURE__*/ S.TaggedError<MarksNotSupportedForFormatException>()(
    "MarksNotSupportedForFormatException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class MaxLexemeLengthExceededException
  extends /*@__PURE__*/ S.TaggedError<MaxLexemeLengthExceededException>()(
    "MaxLexemeLengthExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class MaxLexiconsNumberExceededException
  extends /*@__PURE__*/ S.TaggedError<MaxLexiconsNumberExceededException>()(
    "MaxLexiconsNumberExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      resourceId: S.String,
      resourceType: /*@__PURE__*/ S.suspend(() => S.String).annotate({
        identifier: "ResourceType",
      }),
    },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceFailureException
  extends /*@__PURE__*/ S.TaggedError<ServiceFailureException>()(
    "ServiceFailureException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError, C.withRetryableError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      quotaCode: /*@__PURE__*/ S.suspend(() => S.String).annotate({ identifier: "QuotaCode" }),
      serviceCode: /*@__PURE__*/ S.suspend(() => S.String).annotate({ identifier: "ServiceCode" }),
    },
    /*@__PURE__*/ T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class SsmlMarksNotSupportedForTextTypeException
  extends /*@__PURE__*/ S.TaggedError<SsmlMarksNotSupportedForTextTypeException>()(
    "SsmlMarksNotSupportedForTextTypeException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class SynthesisTaskNotFoundException
  extends /*@__PURE__*/ S.TaggedError<SynthesisTaskNotFoundException>()(
    "SynthesisTaskNotFoundException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class TextLengthExceededException
  extends /*@__PURE__*/ S.TaggedError<TextLengthExceededException>()(
    "TextLengthExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      throttlingReasons: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => __S(1, __c0, 1)).annotate({
          identifier: "ThrottlingReasonList",
        }),
      ),
    },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "Throttling", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError, C.withThrottlingError, C.withRetryableError) {}
export class TooManyTagsException
  extends /*@__PURE__*/ S.TaggedError<TooManyTagsException>()(
    "TooManyTagsException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class UnsupportedPlsAlphabetException
  extends /*@__PURE__*/ S.TaggedError<UnsupportedPlsAlphabetException>()(
    "UnsupportedPlsAlphabetException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class UnsupportedPlsLanguageException
  extends /*@__PURE__*/ S.TaggedError<UnsupportedPlsLanguageException>()(
    "UnsupportedPlsLanguageException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      reason: /*@__PURE__*/ S.suspend(() => S.String).annotate({
        identifier: "ValidationExceptionReason",
      }),
      fields: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => __S(17, __c1, 1)).annotate({
          identifier: "ValidationExceptionFieldList",
        }),
      ),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type CustomVoiceName = string;
export type CustomVoiceLanguageCode =
  | "de-DE"
  | "en-US"
  | "es-US"
  | "fr-FR"
  | "hi-IN"
  | "it-IT"
  | "pt-BR"
  | (string & {});
export type TermsAccepted = boolean;
export type AudioFormat = "wav" | "flac" | "ogg_vorbis" | "mp3" | (string & {});
export type S3Url = string;
export type RecordingBytes = Uint8Array | redacted.Redacted<Uint8Array>;
export interface RecordingData {
  S3Url?: string | undefined;
  Bytes?: Uint8Array | redacted.Redacted<Uint8Array> | undefined;
}
export interface Recording {
  Format: AudioFormat;
  Data: RecordingData;
}
export type RecordingList = Recording[];
export interface VoiceCreationData {
  Recordings: Recording[];
}
export type KmsKeyArn = string;
export type EncryptionContextKey = string;
export type EncryptionContextValue = string;
export type EncryptionContext = { [key: string]: string | undefined };
export interface CustomerManagedEncryption {
  KmsKeyArn: string;
  EncryptionContext?: { [key: string]: string | undefined } | undefined;
}
export type TagKey = string;
export type TagValue = string;
export type TagMap = { [key: string]: string | undefined };
export type ClientToken = string;
export interface CreateVoiceInput {
  Name: string;
  LanguageCode: CustomVoiceLanguageCode;
  TermsAccepted: boolean;
  VoiceCreationData: VoiceCreationData;
  CustomerManagedEncryption?: CustomerManagedEncryption | undefined;
  Tags?: { [key: string]: string | undefined } | undefined;
  ClientToken?: string | undefined;
}
export type VoiceArn = string;
export type Gender = "Female" | "Male" | (string & {});
export type VoiceId =
  | "Aditi"
  | "Amy"
  | "Astrid"
  | "Bianca"
  | "Brian"
  | "Camila"
  | "Carla"
  | "Carmen"
  | "Celine"
  | "Chantal"
  | "Conchita"
  | "Cristiano"
  | "Dora"
  | "Emma"
  | "Enrique"
  | "Ewa"
  | "Filiz"
  | "Gabrielle"
  | "Geraint"
  | "Giorgio"
  | "Gwyneth"
  | "Hans"
  | "Ines"
  | "Ivy"
  | "Jacek"
  | "Jan"
  | "Joanna"
  | "Joey"
  | "Justin"
  | "Karl"
  | "Kendra"
  | "Kevin"
  | "Kimberly"
  | "Lea"
  | "Liv"
  | "Lotte"
  | "Lucia"
  | "Lupe"
  | "Mads"
  | "Maja"
  | "Marlene"
  | "Mathieu"
  | "Matthew"
  | "Maxim"
  | "Mia"
  | "Miguel"
  | "Mizuki"
  | "Naja"
  | "Nicole"
  | "Olivia"
  | "Penelope"
  | "Raveena"
  | "Ricardo"
  | "Ruben"
  | "Russell"
  | "Salli"
  | "Seoyeon"
  | "Takumi"
  | "Tatyana"
  | "Vicki"
  | "Vitoria"
  | "Zeina"
  | "Zhiyu"
  | "Aria"
  | "Ayanda"
  | "Arlet"
  | "Hannah"
  | "Arthur"
  | "Daniel"
  | "Liam"
  | "Pedro"
  | "Kajal"
  | "Hiujin"
  | "Laura"
  | "Elin"
  | "Ida"
  | "Suvi"
  | "Ola"
  | "Hala"
  | "Andres"
  | "Sergio"
  | "Remi"
  | "Adriano"
  | "Thiago"
  | "Ruth"
  | "Stephen"
  | "Kazuha"
  | "Tomoko"
  | "Niamh"
  | "Sofie"
  | "Lisa"
  | "Isabelle"
  | "Zayd"
  | "Danielle"
  | "Gregory"
  | "Burcu"
  | "Jitka"
  | "Sabrina"
  | "Jasmine"
  | "Jihye"
  | "Ambre"
  | "Beatrice"
  | "Florian"
  | "Lennart"
  | "Lorenzo"
  | "Tiffany"
  | "Arjun"
  | "Carlos"
  | "Carolina"
  | "Curtis"
  | "Hyunduk"
  | "Kenneth"
  | "Kiara"
  | "Leo"
  | "Nate"
  | "Tina"
  | (string & {});
export type LanguageCode =
  | "arb"
  | "cmn-CN"
  | "cy-GB"
  | "da-DK"
  | "de-DE"
  | "en-AU"
  | "en-GB"
  | "en-GB-WLS"
  | "en-IN"
  | "en-US"
  | "es-ES"
  | "es-MX"
  | "es-US"
  | "fr-CA"
  | "fr-FR"
  | "is-IS"
  | "it-IT"
  | "ja-JP"
  | "hi-IN"
  | "ko-KR"
  | "nb-NO"
  | "nl-NL"
  | "pl-PL"
  | "pt-BR"
  | "pt-PT"
  | "ro-RO"
  | "ru-RU"
  | "sv-SE"
  | "tr-TR"
  | "en-NZ"
  | "en-ZA"
  | "ca-ES"
  | "de-AT"
  | "yue-CN"
  | "ar-AE"
  | "fi-FI"
  | "en-IE"
  | "nl-BE"
  | "fr-BE"
  | "cs-CZ"
  | "de-CH"
  | "en-SG"
  | (string & {});
export type LanguageName = string;
export type VoiceName = string;
export type VoiceOrigin = "aws" | "customer" | (string & {});
export type VoiceStatus = "pending" | "active" | "failed" | (string & {});
export type StatusReason = string;
export type LanguageCodeList = LanguageCode[];
export type Engine = "standard" | "neural" | "long-form" | "generative" | (string & {});
export type EngineList = Engine[];
export interface Voice {
  Arn?: string | undefined;
  Gender?: Gender | undefined;
  Id?: VoiceId | undefined;
  LanguageCode?: LanguageCode | undefined;
  LanguageName?: string | undefined;
  Name?: string | undefined;
  Origin?: VoiceOrigin | undefined;
  Status?: VoiceStatus | undefined;
  StatusReason?: string | undefined;
  AdditionalLanguageCodes?: LanguageCode[] | undefined;
  SupportedEngines?: Engine[] | undefined;
  VoiceCreationData?: VoiceCreationData | undefined;
  CustomerManagedEncryption?: CustomerManagedEncryption | undefined;
  CreationTime?: Date | undefined;
}
export interface CreateVoiceOutput {
  Voice?: Voice | undefined;
}
export type LexiconName = string;
export interface DeleteLexiconInput {
  Name: string;
}
export interface DeleteLexiconOutput {}
export type CustomVoiceId = string;
export interface DeleteVoiceInput {
  VoiceId: string;
}
export interface DeleteVoiceOutput {}
export type IncludeAdditionalLanguageCodes = boolean;
export type NextToken = string;
export interface DescribeVoicesInput {
  Engine?: Engine | undefined;
  LanguageCode?: LanguageCode | undefined;
  IncludeAdditionalLanguageCodes?: boolean | undefined;
  NextToken?: string | undefined;
}
export type VoiceList = Voice[];
export interface DescribeVoicesOutput {
  Voices?: Voice[] | undefined;
  NextToken?: string | undefined;
}
export interface GetLexiconInput {
  Name: string;
}
export type LexiconContent = string | redacted.Redacted<string>;
export interface Lexicon {
  Content?: string | redacted.Redacted<string> | undefined;
  Name?: string | undefined;
}
export type Alphabet = string;
export type LastModified = Date;
export type LexiconArn = string;
export type LexemesCount = number;
export type Size = number;
export interface LexiconAttributes {
  Alphabet?: string | undefined;
  LanguageCode?: LanguageCode | undefined;
  LastModified?: Date | undefined;
  LexiconArn?: string | undefined;
  LexemesCount?: number | undefined;
  Size?: number | undefined;
}
export interface GetLexiconOutput {
  Lexicon?: Lexicon | undefined;
  LexiconAttributes?: LexiconAttributes | undefined;
}
export type TaskId = string;
export interface GetSpeechSynthesisTaskInput {
  TaskId: string;
}
export type TaskStatus = "scheduled" | "inProgress" | "completed" | "failed" | (string & {});
export type TaskStatusReason = string;
export type OutputUri = string;
export type RequestCharacters = number;
export type SnsTopicArn = string;
export type LexiconNameList = string[];
export type OutputFormat =
  | "json"
  | "mp3"
  | "ogg_opus"
  | "ogg_vorbis"
  | "pcm"
  | "mulaw"
  | "alaw"
  | (string & {});
export type SampleRate = string;
export type SpeechMarkType = "sentence" | "ssml" | "viseme" | "word" | (string & {});
export type SpeechMarkTypeList = SpeechMarkType[];
export type TextType = "ssml" | "text" | (string & {});
export interface SynthesisTask {
  Engine?: Engine | undefined;
  TaskId?: string | undefined;
  TaskStatus?: TaskStatus | undefined;
  TaskStatusReason?: string | undefined;
  OutputUri?: string | undefined;
  CreationTime?: Date | undefined;
  RequestCharacters?: number | undefined;
  SnsTopicArn?: string | undefined;
  LexiconNames?: string[] | undefined;
  OutputFormat?: OutputFormat | undefined;
  SampleRate?: string | undefined;
  SpeechMarkTypes?: SpeechMarkType[] | undefined;
  TextType?: TextType | undefined;
  VoiceId?: VoiceId | undefined;
  LanguageCode?: LanguageCode | undefined;
}
export interface GetSpeechSynthesisTaskOutput {
  SynthesisTask?: SynthesisTask | undefined;
}
export interface GetVoiceInput {
  VoiceId: string;
}
export interface GetVoiceOutput {
  Voice?: Voice | undefined;
}
export interface ListLexiconsInput {
  NextToken?: string | undefined;
}
export interface LexiconDescription {
  Name?: string | undefined;
  Attributes?: LexiconAttributes | undefined;
}
export type LexiconDescriptionList = LexiconDescription[];
export interface ListLexiconsOutput {
  Lexicons?: LexiconDescription[] | undefined;
  NextToken?: string | undefined;
}
export type MaxResults = number;
export interface ListSpeechSynthesisTasksInput {
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
  Status?: TaskStatus | undefined;
}
export type SynthesisTasks = SynthesisTask[];
export interface ListSpeechSynthesisTasksOutput {
  NextToken?: string | undefined;
  SynthesisTasks?: SynthesisTask[] | undefined;
}
export type AmazonResourceName = string;
export interface ListTagsForResourceInput {
  ResourceArn: string;
}
export interface ListTagsForResourceOutput {
  Tags?: { [key: string]: string | undefined } | undefined;
}
export interface PutLexiconInput {
  Name: string;
  Content: string | redacted.Redacted<string>;
  Tags?: { [key: string]: string | undefined } | undefined;
}
export interface PutLexiconOutput {}
export type Text = string;
export type Force = boolean;
export interface FlushStreamConfiguration {
  Force?: boolean | undefined;
}
export interface TextEvent {
  Text: string;
  TextType?: TextType | undefined;
  FlushStreamConfiguration?: FlushStreamConfiguration | undefined;
}
export interface CloseStreamEvent {}
export type StartSpeechSynthesisStreamActionStream =
  | { TextEvent: TextEvent; CloseStreamEvent?: undefined }
  | { TextEvent?: undefined; CloseStreamEvent: CloseStreamEvent };
export interface StartSpeechSynthesisStreamInput {
  Engine: Engine;
  LanguageCode?: LanguageCode | undefined;
  LexiconNames?: string[] | undefined;
  OutputFormat: OutputFormat;
  SampleRate?: string | undefined;
  VoiceId: VoiceId;
  ActionStream?: stream.Stream<StartSpeechSynthesisStreamActionStream, Error, never> | undefined;
}
export type AudioChunk = Uint8Array;
export interface AudioEvent {
  AudioChunk?: Uint8Array | undefined;
}
export interface StreamClosedEvent {
  RequestCharacters?: number | undefined;
}
export type ErrorMessage = string;
export type ValidationExceptionReason =
  | "unsupportedOperation"
  | "fieldValidationFailed"
  | "other"
  | "invalidInboundEvent"
  | "kmsKeyNotFound"
  | "kmsKeyUnusable"
  | (string & {});
export type ValidationExceptionFieldName = string;
export type ValidationExceptionFieldMessage = string;
export interface ValidationExceptionField {
  name: string;
  message: string;
}
export type ValidationExceptionFieldList = ValidationExceptionField[];
export type QuotaCode =
  | "input-stream-inbound-event-timeout"
  | "input-stream-timeout"
  | "custom-voice-max-count"
  | (string & {});
export type ServiceCode = "polly" | (string & {});
export type AvailabilityErrorMessage = string;
export type CoralAvailabilityThrottlingReason = string;
export type CoralAvailabilityThrottledResource = string;
export interface ThrottlingReason {
  reason?: string | undefined;
  resource?: string | undefined;
}
export type ThrottlingReasonList = ThrottlingReason[];
export type StartSpeechSynthesisStreamEventStream =
  | {
      AudioEvent: AudioEvent;
      StreamClosedEvent?: undefined;
      ValidationException?: undefined;
      ServiceQuotaExceededException?: undefined;
      ServiceFailureException?: undefined;
      ThrottlingException?: undefined;
    }
  | {
      AudioEvent?: undefined;
      StreamClosedEvent: StreamClosedEvent;
      ValidationException?: undefined;
      ServiceQuotaExceededException?: undefined;
      ServiceFailureException?: undefined;
      ThrottlingException?: undefined;
    }
  | {
      AudioEvent?: undefined;
      StreamClosedEvent?: undefined;
      ValidationException: ValidationException;
      ServiceQuotaExceededException?: undefined;
      ServiceFailureException?: undefined;
      ThrottlingException?: undefined;
    }
  | {
      AudioEvent?: undefined;
      StreamClosedEvent?: undefined;
      ValidationException?: undefined;
      ServiceQuotaExceededException: ServiceQuotaExceededException;
      ServiceFailureException?: undefined;
      ThrottlingException?: undefined;
    }
  | {
      AudioEvent?: undefined;
      StreamClosedEvent?: undefined;
      ValidationException?: undefined;
      ServiceQuotaExceededException?: undefined;
      ServiceFailureException: ServiceFailureException;
      ThrottlingException?: undefined;
    }
  | {
      AudioEvent?: undefined;
      StreamClosedEvent?: undefined;
      ValidationException?: undefined;
      ServiceQuotaExceededException?: undefined;
      ServiceFailureException?: undefined;
      ThrottlingException: ThrottlingException;
    };
export interface StartSpeechSynthesisStreamOutput {
  EventStream?: stream.Stream<StartSpeechSynthesisStreamEventStream, Error, never> | undefined;
}
export type OutputS3BucketName = string;
export type OutputS3KeyPrefix = string;
export interface StartSpeechSynthesisTaskInput {
  Engine?: Engine | undefined;
  LanguageCode?: LanguageCode | undefined;
  LexiconNames?: string[] | undefined;
  OutputFormat: OutputFormat;
  OutputS3BucketName: string;
  OutputS3KeyPrefix?: string | undefined;
  SampleRate?: string | undefined;
  SnsTopicArn?: string | undefined;
  SpeechMarkTypes?: SpeechMarkType[] | undefined;
  Text: string;
  TextType?: TextType | undefined;
  VoiceId: VoiceId;
}
export interface StartSpeechSynthesisTaskOutput {
  SynthesisTask?: SynthesisTask | undefined;
}
export interface SynthesizeSpeechInput {
  Engine?: Engine | undefined;
  LanguageCode?: LanguageCode | undefined;
  LexiconNames?: string[] | undefined;
  OutputFormat: OutputFormat;
  SampleRate?: string | undefined;
  SpeechMarkTypes?: SpeechMarkType[] | undefined;
  Text: string;
  TextType?: TextType | undefined;
  VoiceId: VoiceId;
}
export type ContentType = string;
export interface SynthesizeSpeechOutput {
  AudioStream?: T.StreamingOutputBody | undefined;
  ContentType?: string | undefined;
  RequestCharacters?: number | undefined;
}
export interface TagResourceInput {
  ResourceArn: string;
  Tags: { [key: string]: string | undefined };
}
export interface TagResourceOutput {}
export type TagKeyList = string[];
export interface UntagResourceInput {
  ResourceArn: string;
  TagKeys: string[];
}
export interface UntagResourceOutput {}
export type ServiceErrorMessage = string;
export type ExceptionMessage = string;
export type ResourceId = string;
export type ResourceType = "lexicon" | "voice" | (string & {});
export type CreateVoiceError =
  | AccessDeniedException
  | InvalidTagParameterException
  | ServiceFailureException
  | ServiceQuotaExceededException
  | ThrottlingException
  | TooManyTagsException
  | ValidationException
  | CommonErrors;
/**
 * Creates a custom voice from recordings of a speaker and returns it
 * in `pending` status. Use `GetVoice` to check the
 * status. When the status is `active`, you can use the voice ID
 * in `SynthesizeSpeech`, `StartSpeechSynthesisTask`,
 * and `StartSpeechSynthesisStream`.
 *
 * The `custom-voice-max-count` service quota limits the
 * number of custom voices in your account in each Region. If you reach the
 * quota, the request fails with
 * `ServiceQuotaExceededException`.
 *
 * This operation requires permissions to perform the
 * `polly:CreateVoice` action. You also need
 * `s3:GetObject` permission on each recording that you specify by
 * `S3Url`. If you specify a customer managed key, you also need
 * `kms:DescribeKey`, `kms:GenerateDataKey`, and
 * `kms:Decrypt` permissions on the key. If you specify
 * `Tags`, you also need the `polly:TagResource`
 * permission.
 */
export const createVoice: API.OperationMethod<
  CreateVoiceInput & RegionInput,
  CreateVoiceOutput,
  CreateVoiceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(32, __c2, 0) as any as S.Schema<CreateVoiceInput>,
  output: __S(96, __c6, 0) as any as S.Schema<CreateVoiceOutput>,
  errors: [
    AccessDeniedException,
    InvalidTagParameterException,
    ServiceFailureException,
    ServiceQuotaExceededException,
    ThrottlingException,
    TooManyTagsException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateVoice",
  telemetry: TELEMETRY,
  span: "CreateVoice",
}));

export type DeleteLexiconError = LexiconNotFoundException | ServiceFailureException | CommonErrors;
/**
 * Deletes the specified pronunciation lexicon stored in an Amazon Web Services Region. A lexicon which has been deleted is not available for
 * speech synthesis, nor is it possible to retrieve it using either the
 * `GetLexicon` or `ListLexicon` APIs.
 *
 * For more information, see Managing Lexicons.
 */
export const deleteLexicon: API.OperationMethod<
  DeleteLexiconInput & RegionInput,
  DeleteLexiconOutput,
  DeleteLexiconError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(112, __c7, 0) as any as S.Schema<DeleteLexiconInput>,
  output: __S(128, __c8, 0) as any as S.Schema<DeleteLexiconOutput>,
  errors: [LexiconNotFoundException, ServiceFailureException],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteLexicon",
  telemetry: TELEMETRY,
  span: "DeleteLexicon",
}));

export type DeleteVoiceError =
  | ConflictException
  | ResourceNotFoundException
  | ServiceFailureException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a custom voice. `DescribeVoices` and
 * `GetVoice` stop returning the voice immediately. You can't
 * restore a deleted voice.
 *
 * You can delete a voice in `active` or `failed`
 * status. If the voice is in `pending` status, the request fails
 * with `ConflictException`. If no custom voice with the specified
 * ID exists in your account and Region, the request fails with
 * `ResourceNotFoundException`. You can delete the voice even if
 * you disabled its Amazon Web Services KMS key or scheduled it for deletion.
 *
 * This operation requires permissions to perform the
 * `polly:DeleteVoice` action.
 */
export const deleteVoice: API.OperationMethod<
  DeleteVoiceInput & RegionInput,
  DeleteVoiceOutput,
  DeleteVoiceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(144, __c9, 0) as any as S.Schema<DeleteVoiceInput>,
  output: __S(128, __c8, 0) as any as S.Schema<DeleteVoiceOutput>,
  errors: [
    ConflictException,
    ResourceNotFoundException,
    ServiceFailureException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteVoice",
  telemetry: TELEMETRY,
  span: "DeleteVoice",
}));

export type DescribeVoicesError =
  | InvalidNextTokenException
  | ServiceFailureException
  | CommonErrors;
/**
 * Returns the list of voices: the voices that Amazon Polly provides and
 * the custom voices in your account. Each voice speaks a specified language
 * and is identified by an ID. A voice that Amazon Polly provides is either male or
 * female, and its ID is the ASCII version of the voice name.
 *
 * When synthesizing speech (`SynthesizeSpeech`), you
 * provide the voice ID for the voice you want from the list of voices
 * returned by `DescribeVoices`.
 *
 * For example, your news reader application reads news in a specific
 * language, and you want to give users the option to choose the voice. With
 * the `DescribeVoices` operation, you can provide a list of
 * available voices for users to choose from.
 *
 * You can optionally specify a language code to filter the available
 * voices. For example, if you specify `en-US`, the operation
 * returns a list of all available US English voices.
 *
 * The list includes custom voices in every status. For each voice, `Origin` indicates whether Amazon Polly
 * provides the voice or you created it. You can use a custom voice for
 * synthesis only when its status is `active`. A voice in
 * `failed` status stays in the list until you delete it.
 *
 * For a custom voice, `DescribeVoices` returns
 * `Origin`, `Id`, `Name`,
 * `Status`, `LanguageCode`, `LanguageName`,
 * `SupportedEngines`, and `CreationTime`. To get
 * `Arn`, `StatusReason`,
 * `VoiceCreationData`, and
 * `CustomerManagedEncryption`, use `GetVoice`.
 *
 * The `LanguageCode` and `Engine` filters apply
 * to custom voices in the same way as to voices that Amazon Polly
 * provides.
 *
 * This operation requires permissions to perform the
 * `polly:DescribeVoices` action.
 */
export const describeVoices: API.OperationMethod<
  DescribeVoicesInput & RegionInput,
  DescribeVoicesOutput,
  DescribeVoicesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(160, __c10, 0) as any as S.Schema<DescribeVoicesInput>,
  output: __S(162, __c10, 2) as any as S.Schema<DescribeVoicesOutput>,
  errors: [InvalidNextTokenException, ServiceFailureException],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeVoices",
  telemetry: TELEMETRY,
  span: "DescribeVoices",
}));

export type GetLexiconError = LexiconNotFoundException | ServiceFailureException | CommonErrors;
/**
 * Returns the content of the specified pronunciation lexicon stored
 * in an Amazon Web Services Region. For more information, see Managing Lexicons.
 */
export const getLexicon: API.OperationMethod<
  GetLexiconInput & RegionInput,
  GetLexiconOutput,
  GetLexiconError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(176, __c11, 0) as any as S.Schema<GetLexiconInput>,
  output: __S(178, __c11, 2) as any as S.Schema<GetLexiconOutput>,
  errors: [LexiconNotFoundException, ServiceFailureException],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetLexicon",
  telemetry: TELEMETRY,
  span: "GetLexicon",
}));

export type GetSpeechSynthesisTaskError =
  | InvalidTaskIdException
  | ServiceFailureException
  | SynthesisTaskNotFoundException
  | CommonErrors;
/**
 * Retrieves a specific SpeechSynthesisTask object based on its TaskID.
 * This object contains information about the given speech synthesis task,
 * including the status of the task, and a link to the S3 bucket containing
 * the output of the task.
 */
export const getSpeechSynthesisTask: API.OperationMethod<
  GetSpeechSynthesisTaskInput & RegionInput,
  GetSpeechSynthesisTaskOutput,
  GetSpeechSynthesisTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(208, __c13, 0) as any as S.Schema<GetSpeechSynthesisTaskInput>,
  output: __S(256, __c16, 0) as any as S.Schema<GetSpeechSynthesisTaskOutput>,
  errors: [InvalidTaskIdException, ServiceFailureException, SynthesisTaskNotFoundException],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSpeechSynthesisTask",
  telemetry: TELEMETRY,
  span: "GetSpeechSynthesisTask",
}));

export type GetVoiceError =
  | ResourceNotFoundException
  | ServiceFailureException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns the status and properties of a custom voice. Use this
 * operation after `CreateVoice` to check whether the status of
 * the voice is `active` or `failed`. Unlike
 * `DescribeVoices`, `GetVoice` also returns
 * `Arn`, `VoiceCreationData`,
 * `CustomerManagedEncryption`, and
 * `StatusReason`. If no custom voice with the specified ID exists
 * in your account and Region, the request fails with
 * `ResourceNotFoundException`.
 *
 * This operation requires permissions to perform the
 * `polly:GetVoice` action.
 */
export const getVoice: API.OperationMethod<
  GetVoiceInput & RegionInput,
  GetVoiceOutput,
  GetVoiceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(272, __c17, 0) as any as S.Schema<GetVoiceInput>,
  output: __S(96, __c6, 0) as any as S.Schema<GetVoiceOutput>,
  errors: [
    ResourceNotFoundException,
    ServiceFailureException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetVoice",
  telemetry: TELEMETRY,
  span: "GetVoice",
}));

export type ListLexiconsError = InvalidNextTokenException | ServiceFailureException | CommonErrors;
/**
 * Returns a list of pronunciation lexicons stored in an Amazon Web Services Region. For more information, see Managing Lexicons.
 */
export const listLexicons: API.OperationMethod<
  ListLexiconsInput & RegionInput,
  ListLexiconsOutput,
  ListLexiconsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(288, __c18, 0) as any as S.Schema<ListLexiconsInput>,
  output: __S(291, __c18, 3) as any as S.Schema<ListLexiconsOutput>,
  errors: [InvalidNextTokenException, ServiceFailureException],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListLexicons",
  telemetry: TELEMETRY,
  span: "ListLexicons",
}));

export type ListSpeechSynthesisTasksError =
  | InvalidNextTokenException
  | ServiceFailureException
  | CommonErrors;
/**
 * Returns a list of SpeechSynthesisTask objects ordered by their
 * creation date. This operation can filter the tasks by their status, for
 * example, allowing users to list only tasks that are completed.
 */
export const listSpeechSynthesisTasks: API.PaginatedOperationMethod<
  ListSpeechSynthesisTasksInput & RegionInput,
  ListSpeechSynthesisTasksOutput,
  ListSpeechSynthesisTasksError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(304, __c19, 0) as any as S.Schema<ListSpeechSynthesisTasksInput>,
  output: __S(306, __c19, 2) as any as S.Schema<ListSpeechSynthesisTasksOutput>,
  errors: [InvalidNextTokenException, ServiceFailureException],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSpeechSynthesisTasks",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListSpeechSynthesisTasks",
})) as any;

export type ListTagsForResourceError =
  | InvalidTagParameterException
  | ResourceNotFoundException
  | ServiceFailureException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the tags for an Amazon Polly resource.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceInput & RegionInput,
  ListTagsForResourceOutput,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(320, __c20, 0) as any as S.Schema<ListTagsForResourceInput>,
  output: __S(321, __c20, 1) as any as S.Schema<ListTagsForResourceOutput>,
  errors: [
    InvalidTagParameterException,
    ResourceNotFoundException,
    ServiceFailureException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
  telemetry: TELEMETRY,
  span: "ListTagsForResource",
}));

export type PutLexiconError =
  | InvalidLexiconException
  | InvalidTagParameterException
  | LexiconSizeExceededException
  | MaxLexemeLengthExceededException
  | MaxLexiconsNumberExceededException
  | ServiceFailureException
  | TooManyTagsException
  | UnsupportedPlsAlphabetException
  | UnsupportedPlsLanguageException
  | ValidationException
  | CommonErrors;
/**
 * Stores a pronunciation lexicon in an Amazon Web Services Region. If
 * a lexicon with the same name already exists in the region, it is
 * overwritten by the new lexicon. Lexicon operations have eventual
 * consistency, therefore, it might take some time before the lexicon is
 * available to the SynthesizeSpeech operation.
 *
 * Overwriting a lexicon keeps its existing tags. You can specify tags
 * only when you create a lexicon. If you specify tags for a lexicon that
 * already exists, the request fails with a `ValidationException`.
 * To change the tags of an existing lexicon, use `TagResource`
 * and `UntagResource`.
 *
 * For more information, see Managing Lexicons.
 */
export const putLexicon: API.OperationMethod<
  PutLexiconInput & RegionInput,
  PutLexiconOutput,
  PutLexiconError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(336, __c21, 0) as any as S.Schema<PutLexiconInput>,
  output: __S(128, __c8, 0) as any as S.Schema<PutLexiconOutput>,
  errors: [
    InvalidLexiconException,
    InvalidTagParameterException,
    LexiconSizeExceededException,
    MaxLexemeLengthExceededException,
    MaxLexiconsNumberExceededException,
    ServiceFailureException,
    TooManyTagsException,
    UnsupportedPlsAlphabetException,
    UnsupportedPlsLanguageException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutLexicon",
  telemetry: TELEMETRY,
  span: "PutLexicon",
}));

export type StartSpeechSynthesisStreamError =
  | ConflictException
  | ResourceNotFoundException
  | ServiceFailureException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Synthesizes UTF-8 input, plain text, or SSML over a bidirectional streaming connection.
 * Specify synthesis parameters in HTTP/2 headers, send text incrementally as events on the input stream,
 * and receive synthesized audio as it becomes available.
 *
 * This operation serves as a bidirectional counterpart to `SynthesizeSpeech`:
 *
 * - SynthesizeSpeech
 *
 * To use a custom voice, specify its ID in `VoiceId`. The
 * voice must be in `active` status. If the voice is in
 * `pending` or `failed` status, the request fails with
 * `ConflictException`. If no custom voice with the specified ID
 * exists in your account and Region, the request fails with
 * `ResourceNotFoundException`. If the custom voice uses a
 * customer managed key, you need `kms:Decrypt` permission on the
 * key. If you disabled the key or scheduled it for deletion, the request
 * fails with `ValidationException`. If you don't have permission
 * to use the key, the request fails with
 * `AccessDeniedException`. If Amazon Web Services KMS throttles Amazon Polly's
 * request to use the key, the request fails with
 * `ThrottlingException`.
 */
export const startSpeechSynthesisStream: API.OperationMethod<
  StartSpeechSynthesisStreamInput & RegionInput,
  StartSpeechSynthesisStreamOutput,
  StartSpeechSynthesisStreamError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(356, __c22, 4) as any as S.Schema<StartSpeechSynthesisStreamInput>,
  output: __S(360, __c22, 8) as any as S.Schema<StartSpeechSynthesisStreamOutput>,
  errors: [
    ConflictException,
    ResourceNotFoundException,
    ServiceFailureException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartSpeechSynthesisStream",
  telemetry: TELEMETRY,
  span: "StartSpeechSynthesisStream",
}));

export type StartSpeechSynthesisTaskError =
  | ConflictException
  | EngineNotSupportedException
  | InvalidS3BucketException
  | InvalidS3KeyException
  | InvalidSampleRateException
  | InvalidSnsTopicArnException
  | InvalidSsmlException
  | LanguageNotSupportedException
  | LexiconNotFoundException
  | MarksNotSupportedForFormatException
  | ResourceNotFoundException
  | ServiceFailureException
  | SsmlMarksNotSupportedForTextTypeException
  | TextLengthExceededException
  | CommonErrors;
/**
 * Starts an asynchronous synthesis task by creating a new
 * `SpeechSynthesisTask`. This operation requires all the standard
 * information needed for speech synthesis, plus the name of an Amazon S3
 * bucket for the service to store the output of the synthesis task and two
 * optional parameters (`OutputS3KeyPrefix` and
 * `SnsTopicArn`). After Amazon Polly creates the synthesis task, the
 * operation returns a `SpeechSynthesisTask` object that includes
 * an identifier for the task and its current status. The
 * `SpeechSynthesisTask` object is available for 72 hours after
 * you start the asynchronous synthesis task.
 *
 * To use a custom voice, specify its ID in `VoiceId`. The
 * voice must be in `active` status. If the voice is in
 * `pending` or `failed` status, the request fails with
 * `ConflictException`. If no custom voice with the specified ID
 * exists in your account and Region, the request fails with
 * `ResourceNotFoundException`. If the custom voice uses a
 * customer managed key, you need `kms:Decrypt` permission on the
 * key. If you disable the key or schedule it for deletion before the task
 * runs, the task fails and `TaskStatusReason` describes the
 * cause.
 */
export const startSpeechSynthesisTask: API.OperationMethod<
  StartSpeechSynthesisTaskInput & RegionInput,
  StartSpeechSynthesisTaskOutput,
  StartSpeechSynthesisTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(368, __c23, 0) as any as S.Schema<StartSpeechSynthesisTaskInput>,
  output: __S(256, __c16, 0) as any as S.Schema<StartSpeechSynthesisTaskOutput>,
  errors: [
    ConflictException,
    EngineNotSupportedException,
    InvalidS3BucketException,
    InvalidS3KeyException,
    InvalidSampleRateException,
    InvalidSnsTopicArnException,
    InvalidSsmlException,
    LanguageNotSupportedException,
    LexiconNotFoundException,
    MarksNotSupportedForFormatException,
    ResourceNotFoundException,
    ServiceFailureException,
    SsmlMarksNotSupportedForTextTypeException,
    TextLengthExceededException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartSpeechSynthesisTask",
  telemetry: TELEMETRY,
  span: "StartSpeechSynthesisTask",
}));

export type SynthesizeSpeechError =
  | ConflictException
  | EngineNotSupportedException
  | InvalidSampleRateException
  | InvalidSsmlException
  | LanguageNotSupportedException
  | LexiconNotFoundException
  | MarksNotSupportedForFormatException
  | ResourceNotFoundException
  | ServiceFailureException
  | SsmlMarksNotSupportedForTextTypeException
  | TextLengthExceededException
  | CommonErrors;
/**
 * Synthesizes UTF-8 input, plain text or SSML, to a stream of bytes.
 * SSML input must be valid, well-formed SSML. Some alphabets might not be
 * available with all the voices (for example, Cyrillic might not be read at
 * all by English voices) unless phoneme mapping is used. For more
 * information, see How it Works.
 *
 * To use a custom voice, specify its ID in `VoiceId`. The
 * voice must be in `active` status. If the voice is in
 * `pending` or `failed` status, the request fails with
 * `ConflictException`. If no custom voice with the specified ID
 * exists in your account and Region, the request fails with
 * `ResourceNotFoundException`.
 *
 * If the custom voice uses a customer managed key, you need
 * `kms:Decrypt` permission on the key. If you disabled the key or
 * scheduled it for deletion, the request fails with
 * `ValidationException`. If you don't have permission to use the
 * key, the request fails with `AccessDeniedException`. If Amazon Web Services
 * KMS throttles Amazon Polly's request to use the key, the request fails with
 * `ThrottlingException`.
 */
export const synthesizeSpeech: API.OperationMethod<
  SynthesizeSpeechInput & RegionInput,
  SynthesizeSpeechOutput,
  SynthesizeSpeechError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(384, __c24, 0) as any as S.Schema<SynthesizeSpeechInput>,
  output: __S(385, __c24, 1) as any as S.Schema<SynthesizeSpeechOutput>,
  errors: [
    ConflictException,
    EngineNotSupportedException,
    InvalidSampleRateException,
    InvalidSsmlException,
    LanguageNotSupportedException,
    LexiconNotFoundException,
    MarksNotSupportedForFormatException,
    ResourceNotFoundException,
    ServiceFailureException,
    SsmlMarksNotSupportedForTextTypeException,
    TextLengthExceededException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SynthesizeSpeech",
  telemetry: TELEMETRY,
  span: "SynthesizeSpeech",
}));

export type TagResourceError =
  | InvalidTagParameterException
  | ResourceNotFoundException
  | ServiceFailureException
  | ThrottlingException
  | TooManyTagsException
  | ValidationException
  | CommonErrors;
/**
 * Adds specified tags to a resource with the specified ARN. Existing tags
 * on a resource are not changed if they are not specified in the request
 * parameters. If you specify a tag key that already exists on the resource,
 * the value in the request replaces the existing value.
 */
export const tagResource: API.OperationMethod<
  TagResourceInput & RegionInput,
  TagResourceOutput,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(400, __c25, 0) as any as S.Schema<TagResourceInput>,
  output: __S(128, __c8, 0) as any as S.Schema<TagResourceOutput>,
  errors: [
    InvalidTagParameterException,
    ResourceNotFoundException,
    ServiceFailureException,
    ThrottlingException,
    TooManyTagsException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
  telemetry: TELEMETRY,
  span: "TagResource",
}));

export type UntagResourceError =
  | InvalidTagParameterException
  | ResourceNotFoundException
  | ServiceFailureException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes specified tags from a resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceInput & RegionInput,
  UntagResourceOutput,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(416, __c26, 0) as any as S.Schema<UntagResourceInput>,
  output: __S(128, __c8, 0) as any as S.Schema<UntagResourceOutput>,
  errors: [
    InvalidTagParameterException,
    ResourceNotFoundException,
    ServiceFailureException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
  telemetry: TELEMETRY,
  span: "UntagResource",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ reason: S.optional(S.String), resource: S.optional(S.String) }),
      ).annotate({ identifier: "ThrottlingReason" });
    case 1:
      return S.Array(__S(0, __c0, 0));
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ name: S.String, message: S.String })).annotate({
        identifier: "ValidationExceptionField",
      });
    case 1:
      return S.Array(__S(16, __c1, 0));
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          LanguageCode: S.String,
          TermsAccepted: S.Boolean,
          VoiceCreationData: __S(67, __c4, 3),
          CustomerManagedEncryption: S.optional(__S(68, __c4, 4)),
          Tags: S.optional(__S(80, __c5, 0)),
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/v1/voices" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateVoiceInput" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ S3Url: S.optional(S.String), Bytes: S.optional(SensitiveBlob) }),
      ).annotate({ identifier: "RecordingData" });
    case 1:
      return S.suspend(() => S.Struct({ Format: S.String, Data: __S(64, __c4, 0) })).annotate({
        identifier: "Recording",
      });
    case 2:
      return S.Array(__S(65, __c4, 1));
    case 3:
      return S.suspend(() => S.Struct({ Recordings: __S(66, __c4, 2) })).annotate({
        identifier: "VoiceCreationData",
      });
    case 4:
      return S.suspend(() =>
        S.Struct({ KmsKeyArn: S.String, EncryptionContext: S.optional(__S(80, __c5, 0)) }),
      ).annotate({ identifier: "CustomerManagedEncryption" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          Arn: S.optional(S.String),
          Gender: S.optional(S.String),
          Id: S.optional(S.String),
          LanguageCode: S.optional(S.String),
          LanguageName: S.optional(S.String),
          Name: S.optional(S.String),
          Origin: S.optional(S.String),
          Status: S.optional(S.String),
          StatusReason: S.optional(S.String),
          AdditionalLanguageCodes: S.optional(__S(48, __c3, 0)),
          SupportedEngines: S.optional(__S(48, __c3, 0)),
          VoiceCreationData: S.optional(__S(67, __c4, 3)),
          CustomerManagedEncryption: S.optional(__S(68, __c4, 4)),
          CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "Voice" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Voice: S.optional(__S(69, __c4, 5)) }).pipe(ns)).annotate({
        identifier: "CreateVoiceOutput",
      });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.String.pipe(T.HttpLabel("Name")) }).pipe(
          T.all(
            ns,
            T.Http({ method: "DELETE", uri: "/v1/lexicons/{Name}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteLexiconInput" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({ identifier: "DeleteLexiconOutput" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ VoiceId: S.String.pipe(T.HttpLabel("VoiceId")) }).pipe(
          T.all(
            ns,
            T.Http({ method: "DELETE", uri: "/v1/voices/{VoiceId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteVoiceInput" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Engine: S.optional(S.String).pipe(T.HttpQuery("Engine")),
          LanguageCode: S.optional(S.String).pipe(T.HttpQuery("LanguageCode")),
          IncludeAdditionalLanguageCodes: S.optional(S.Boolean).pipe(
            T.HttpQuery("IncludeAdditionalLanguageCodes"),
          ),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
        }).pipe(
          T.all(ns, T.Http({ method: "GET", uri: "/v1/voices" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeVoicesInput" });
    case 1:
      return S.Array(__S(69, __c4, 5));
    case 2:
      return S.suspend(() =>
        S.Struct({ Voices: S.optional(__S(161, __c10, 1)), NextToken: S.optional(S.String) }).pipe(
          ns,
        ),
      ).annotate({ identifier: "DescribeVoicesOutput" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.String.pipe(T.HttpLabel("Name")) }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/v1/lexicons/{Name}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetLexiconInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Content: S.optional(SensitiveString), Name: S.optional(S.String) }),
      ).annotate({ identifier: "Lexicon" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          Lexicon: S.optional(__S(177, __c11, 1)),
          LexiconAttributes: S.optional(__S(192, __c12, 0)),
        }).pipe(ns),
      ).annotate({ identifier: "GetLexiconOutput" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Alphabet: S.optional(S.String),
          LanguageCode: S.optional(S.String),
          LastModified: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LexiconArn: S.optional(S.String),
          LexemesCount: S.optional(S.Number),
          Size: S.optional(S.Number),
        }),
      ).annotate({ identifier: "LexiconAttributes" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ TaskId: S.String.pipe(T.HttpLabel("TaskId")) }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/v1/synthesisTasks/{TaskId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetSpeechSynthesisTaskInput" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Engine: S.optional(S.String),
          TaskId: S.optional(S.String),
          TaskStatus: S.optional(S.String),
          TaskStatusReason: S.optional(S.String),
          OutputUri: S.optional(S.String),
          CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          RequestCharacters: S.optional(S.Number),
          SnsTopicArn: S.optional(S.String),
          LexiconNames: S.optional(__S(224, __c14, 0)),
          OutputFormat: S.optional(S.String),
          SampleRate: S.optional(S.String),
          SpeechMarkTypes: S.optional(__S(48, __c3, 0)),
          TextType: S.optional(S.String),
          VoiceId: S.optional(S.String),
          LanguageCode: S.optional(S.String),
        }),
      ).annotate({ identifier: "SynthesisTask" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ SynthesisTask: S.optional(__S(240, __c15, 0)) }).pipe(ns),
      ).annotate({ identifier: "GetSpeechSynthesisTaskOutput" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ VoiceId: S.String.pipe(T.HttpLabel("VoiceId")) }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/v1/voices/{VoiceId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetVoiceInput" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")) }).pipe(
          T.all(ns, T.Http({ method: "GET", uri: "/v1/lexicons" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListLexiconsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Name: S.optional(S.String), Attributes: S.optional(__S(192, __c12, 0)) }),
      ).annotate({ identifier: "LexiconDescription" });
    case 2:
      return S.Array(__S(289, __c18, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          Lexicons: S.optional(__S(290, __c18, 2)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListLexiconsOutput" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
          Status: S.optional(S.String).pipe(T.HttpQuery("Status")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/v1/synthesisTasks" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListSpeechSynthesisTasksInput" });
    case 1:
      return S.Array(__S(240, __c15, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          SynthesisTasks: S.optional(__S(305, __c19, 1)),
        }).pipe(ns),
      ).annotate({ identifier: "ListSpeechSynthesisTasksOutput" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceArn: S.String.pipe(T.HttpQuery("arn")) }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/v1/listTagsForResource" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListTagsForResourceInput" });
    case 1:
      return S.suspend(() => S.Struct({ Tags: S.optional(__S(80, __c5, 0)) }).pipe(ns)).annotate({
        identifier: "ListTagsForResourceOutput",
      });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String.pipe(T.HttpLabel("Name")),
          Content: SensitiveString,
          Tags: S.optional(__S(80, __c5, 0)),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "PUT", uri: "/v1/lexicons/{Name}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutLexiconInput" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Force: S.optional(S.Boolean) })).annotate({
        identifier: "FlushStreamConfiguration",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Text: S.String,
          TextType: S.optional(S.String),
          FlushStreamConfiguration: S.optional(__S(352, __c22, 0)),
        }),
      ).annotate({ identifier: "TextEvent" });
    case 2:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "CloseStreamEvent" });
    case 3:
      return T.InputEventStream(
        /*@__PURE__*/ S.Union([
          /*@__PURE__*/ S.Struct({ TextEvent: __S(353, __c22, 1) }),
          /*@__PURE__*/ S.Struct({ CloseStreamEvent: __S(354, __c22, 2) }),
        ]),
      );
    case 4:
      return S.suspend(() =>
        S.Struct({
          Engine: S.String.pipe(T.HttpHeader("x-amzn-Engine")),
          LanguageCode: S.optional(S.String).pipe(T.HttpHeader("x-amzn-LanguageCode")),
          LexiconNames: S.optional(__S(224, __c14, 0)).pipe(T.HttpHeader("x-amzn-LexiconNames")),
          OutputFormat: S.String.pipe(T.HttpHeader("x-amzn-OutputFormat")),
          SampleRate: S.optional(S.String).pipe(T.HttpHeader("x-amzn-SampleRate")),
          VoiceId: S.String.pipe(T.HttpHeader("x-amzn-VoiceId")),
          ActionStream: S.optional(__S(355, __c22, 3)).pipe(T.HttpPayload()),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/v1/synthesisStream" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartSpeechSynthesisStreamInput" });
    case 5:
      return S.suspend(() =>
        S.Struct({ AudioChunk: S.optional(T.Blob).pipe(T.EventPayload()) }),
      ).annotate({ identifier: "AudioEvent" });
    case 6:
      return S.suspend(() => S.Struct({ RequestCharacters: S.optional(S.Number) })).annotate({
        identifier: "StreamClosedEvent",
      });
    case 7:
      return T.EventStream(
        /*@__PURE__*/ S.Union([
          /*@__PURE__*/ S.Struct({ AudioEvent: __S(357, __c22, 5) }),
          /*@__PURE__*/ S.Struct({ StreamClosedEvent: __S(358, __c22, 6) }),
          /*@__PURE__*/ S.Struct({
            ValidationException: /*@__PURE__*/ S.suspend(() => ValidationException).annotate({
              identifier: "ValidationException",
            }),
          }),
          /*@__PURE__*/ S.Struct({
            ServiceQuotaExceededException: /*@__PURE__*/ S.suspend(
              () => ServiceQuotaExceededException,
            ).annotate({ identifier: "ServiceQuotaExceededException" }),
          }),
          /*@__PURE__*/ S.Struct({
            ServiceFailureException: /*@__PURE__*/ S.suspend(
              () => ServiceFailureException,
            ).annotate({ identifier: "ServiceFailureException" }),
          }),
          /*@__PURE__*/ S.Struct({
            ThrottlingException: /*@__PURE__*/ S.suspend(() => ThrottlingException).annotate({
              identifier: "ThrottlingException",
            }),
          }),
        ]),
      );
    case 8:
      return S.suspend(() =>
        S.Struct({ EventStream: S.optional(__S(359, __c22, 7)).pipe(T.HttpPayload()) }).pipe(ns),
      ).annotate({ identifier: "StartSpeechSynthesisStreamOutput" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Engine: S.optional(S.String),
          LanguageCode: S.optional(S.String),
          LexiconNames: S.optional(__S(224, __c14, 0)),
          OutputFormat: S.String,
          OutputS3BucketName: S.String,
          OutputS3KeyPrefix: S.optional(S.String),
          SampleRate: S.optional(S.String),
          SnsTopicArn: S.optional(S.String),
          SpeechMarkTypes: S.optional(__S(48, __c3, 0)),
          Text: S.String,
          TextType: S.optional(S.String),
          VoiceId: S.String,
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/v1/synthesisTasks" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartSpeechSynthesisTaskInput" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Engine: S.optional(S.String),
          LanguageCode: S.optional(S.String),
          LexiconNames: S.optional(__S(224, __c14, 0)),
          OutputFormat: S.String,
          SampleRate: S.optional(S.String),
          SpeechMarkTypes: S.optional(__S(48, __c3, 0)),
          Text: S.String,
          TextType: S.optional(S.String),
          VoiceId: S.String,
        }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/v1/speech" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "SynthesizeSpeechInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          AudioStream: S.optional(T.StreamingOutput).pipe(T.HttpPayload()),
          ContentType: S.optional(S.String).pipe(T.HttpHeader("Content-Type")),
          RequestCharacters: S.optional(S.Number).pipe(T.HttpHeader("x-amzn-RequestCharacters")),
        }).pipe(ns),
      ).annotate({ identifier: "SynthesizeSpeechOutput" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceArn: S.String, Tags: __S(80, __c5, 0) }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/v1/tagResource" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "TagResourceInput" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceArn: S.String, TagKeys: __S(224, __c14, 0) }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/v1/untagResource" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UntagResourceInput" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
