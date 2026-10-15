import * as API from "@distilled.cloud/core/api";
import * as S from "@distilled.cloud/core/schema-lite";
import * as __L from "@distilled.cloud/core/schema-lite";
import type * as HttpClient from "effect/http/HttpClient";
import type * as redacted from "effect/Redacted";
import type * as stream from "effect/Stream";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import { AwsProtocol } from "../protocol.ts";
import { Retry } from "../retry.ts";
import { SensitiveString } from "../sensitive.ts";
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
export class ServiceFailureException
  extends /*@__PURE__*/ S.TaggedError<ServiceFailureException>()(
    "ServiceFailureException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError) {}
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
export type LexiconName = string;
export interface DeleteLexiconInput {
  Name: string;
}
export interface DeleteLexiconOutput {}
export type Engine = "standard" | "neural" | "long-form" | "generative" | (string & {});
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
export type IncludeAdditionalLanguageCodes = boolean;
export type NextToken = string;
export interface DescribeVoicesInput {
  Engine?: Engine;
  LanguageCode?: LanguageCode;
  IncludeAdditionalLanguageCodes?: boolean;
  NextToken?: string;
}
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
  | (string & {});
export type LanguageName = string;
export type VoiceName = string;
export type LanguageCodeList = LanguageCode[];
export type EngineList = Engine[];
export interface Voice {
  Gender?: Gender;
  Id?: VoiceId;
  LanguageCode?: LanguageCode;
  LanguageName?: string;
  Name?: string;
  AdditionalLanguageCodes?: LanguageCode[];
  SupportedEngines?: Engine[];
}
export type VoiceList = Voice[];
export interface DescribeVoicesOutput {
  Voices?: Voice[];
  NextToken?: string;
}
export interface GetLexiconInput {
  Name: string;
}
export type LexiconContent = string | redacted.Redacted<string>;
export interface Lexicon {
  Content?: string | redacted.Redacted<string>;
  Name?: string;
}
export type Alphabet = string;
export type LastModified = Date;
export type LexiconArn = string;
export type LexemesCount = number;
export type Size = number;
export interface LexiconAttributes {
  Alphabet?: string;
  LanguageCode?: LanguageCode;
  LastModified?: Date;
  LexiconArn?: string;
  LexemesCount?: number;
  Size?: number;
}
export interface GetLexiconOutput {
  Lexicon?: Lexicon;
  LexiconAttributes?: LexiconAttributes;
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
  Engine?: Engine;
  TaskId?: string;
  TaskStatus?: TaskStatus;
  TaskStatusReason?: string;
  OutputUri?: string;
  CreationTime?: Date;
  RequestCharacters?: number;
  SnsTopicArn?: string;
  LexiconNames?: string[];
  OutputFormat?: OutputFormat;
  SampleRate?: string;
  SpeechMarkTypes?: SpeechMarkType[];
  TextType?: TextType;
  VoiceId?: VoiceId;
  LanguageCode?: LanguageCode;
}
export interface GetSpeechSynthesisTaskOutput {
  SynthesisTask?: SynthesisTask;
}
export interface ListLexiconsInput {
  NextToken?: string;
}
export interface LexiconDescription {
  Name?: string;
  Attributes?: LexiconAttributes;
}
export type LexiconDescriptionList = LexiconDescription[];
export interface ListLexiconsOutput {
  Lexicons?: LexiconDescription[];
  NextToken?: string;
}
export type MaxResults = number;
export interface ListSpeechSynthesisTasksInput {
  MaxResults?: number;
  NextToken?: string;
  Status?: TaskStatus;
}
export type SynthesisTasks = SynthesisTask[];
export interface ListSpeechSynthesisTasksOutput {
  NextToken?: string;
  SynthesisTasks?: SynthesisTask[];
}
export interface PutLexiconInput {
  Name: string;
  Content: string | redacted.Redacted<string>;
}
export interface PutLexiconOutput {}
export type Text = string;
export type Force = boolean;
export interface FlushStreamConfiguration {
  Force?: boolean;
}
export interface TextEvent {
  Text: string;
  TextType?: TextType;
  FlushStreamConfiguration?: FlushStreamConfiguration;
}
export interface CloseStreamEvent {}
export type StartSpeechSynthesisStreamActionStream =
  | { TextEvent: TextEvent; CloseStreamEvent?: never }
  | { TextEvent?: never; CloseStreamEvent: CloseStreamEvent };
export interface StartSpeechSynthesisStreamInput {
  Engine: Engine;
  LanguageCode?: LanguageCode;
  LexiconNames?: string[];
  OutputFormat: OutputFormat;
  SampleRate?: string;
  VoiceId: VoiceId;
  ActionStream?: stream.Stream<StartSpeechSynthesisStreamActionStream, Error, never>;
}
export type AudioChunk = Uint8Array;
export interface AudioEvent {
  AudioChunk?: Uint8Array;
}
export interface StreamClosedEvent {
  RequestCharacters?: number;
}
export type ErrorMessage = string;
export type ValidationExceptionReason =
  | "unsupportedOperation"
  | "fieldValidationFailed"
  | "other"
  | "invalidInboundEvent"
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
  | (string & {});
export type ServiceCode = "polly" | (string & {});
export type AvailabilityErrorMessage = string;
export type CoralAvailabilityThrottlingReason = string;
export type CoralAvailabilityThrottledResource = string;
export interface ThrottlingReason {
  reason?: string;
  resource?: string;
}
export type ThrottlingReasonList = ThrottlingReason[];
export type StartSpeechSynthesisStreamEventStream =
  | {
      AudioEvent: AudioEvent;
      StreamClosedEvent?: never;
      ValidationException?: never;
      ServiceQuotaExceededException?: never;
      ServiceFailureException?: never;
      ThrottlingException?: never;
    }
  | {
      AudioEvent?: never;
      StreamClosedEvent: StreamClosedEvent;
      ValidationException?: never;
      ServiceQuotaExceededException?: never;
      ServiceFailureException?: never;
      ThrottlingException?: never;
    }
  | {
      AudioEvent?: never;
      StreamClosedEvent?: never;
      ValidationException: ValidationException;
      ServiceQuotaExceededException?: never;
      ServiceFailureException?: never;
      ThrottlingException?: never;
    }
  | {
      AudioEvent?: never;
      StreamClosedEvent?: never;
      ValidationException?: never;
      ServiceQuotaExceededException: ServiceQuotaExceededException;
      ServiceFailureException?: never;
      ThrottlingException?: never;
    }
  | {
      AudioEvent?: never;
      StreamClosedEvent?: never;
      ValidationException?: never;
      ServiceQuotaExceededException?: never;
      ServiceFailureException: ServiceFailureException;
      ThrottlingException?: never;
    }
  | {
      AudioEvent?: never;
      StreamClosedEvent?: never;
      ValidationException?: never;
      ServiceQuotaExceededException?: never;
      ServiceFailureException?: never;
      ThrottlingException: ThrottlingException;
    };
export interface StartSpeechSynthesisStreamOutput {
  EventStream?: stream.Stream<StartSpeechSynthesisStreamEventStream, Error, never>;
}
export type OutputS3BucketName = string;
export type OutputS3KeyPrefix = string;
export interface StartSpeechSynthesisTaskInput {
  Engine?: Engine;
  LanguageCode?: LanguageCode;
  LexiconNames?: string[];
  OutputFormat: OutputFormat;
  OutputS3BucketName: string;
  OutputS3KeyPrefix?: string;
  SampleRate?: string;
  SnsTopicArn?: string;
  SpeechMarkTypes?: SpeechMarkType[];
  Text: string;
  TextType?: TextType;
  VoiceId: VoiceId;
}
export interface StartSpeechSynthesisTaskOutput {
  SynthesisTask?: SynthesisTask;
}
export interface SynthesizeSpeechInput {
  Engine?: Engine;
  LanguageCode?: LanguageCode;
  LexiconNames?: string[];
  OutputFormat: OutputFormat;
  SampleRate?: string;
  SpeechMarkTypes?: SpeechMarkType[];
  Text: string;
  TextType?: TextType;
  VoiceId: VoiceId;
}
export type ContentType = string;
export interface SynthesizeSpeechOutput {
  AudioStream?: T.StreamingOutputBody;
  ContentType?: string;
  RequestCharacters?: number;
}
export type DeleteLexiconError = LexiconNotFoundException | ServiceFailureException | CommonErrors;
/**
 * Deletes the specified pronunciation lexicon stored in an Amazon Web Services Region. A lexicon which has been deleted is not available for
 * speech synthesis, nor is it possible to retrieve it using either the
 * `GetLexicon` or `ListLexicon` APIs.
 *
 * For more information, see Managing Lexicons.
 */
export const deleteLexicon: API.OperationMethod<
  DeleteLexiconInput,
  DeleteLexiconOutput,
  DeleteLexiconError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(32, __c2, 0) as any as S.Schema<DeleteLexiconInput>,
  output: __S(48, __c3, 0) as any as S.Schema<DeleteLexiconOutput>,
  errors: [LexiconNotFoundException, ServiceFailureException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteLexicon",
}));

export type DescribeVoicesError =
  | InvalidNextTokenException
  | ServiceFailureException
  | CommonErrors;
/**
 * Returns the list of voices that are available for use when
 * requesting speech synthesis. Each voice speaks a specified language, is
 * either male or female, and is identified by an ID, which is the ASCII
 * version of the voice name.
 *
 * When synthesizing speech ( `SynthesizeSpeech` ), you
 * provide the voice ID for the voice you want from the list of voices
 * returned by `DescribeVoices`.
 *
 * For example, you want your news reader application to read news in
 * a specific language, but giving a user the option to choose the voice.
 * Using the `DescribeVoices` operation you can provide the user
 * with a list of available voices to select from.
 *
 * You can optionally specify a language code to filter the available
 * voices. For example, if you specify `en-US`, the operation
 * returns a list of all available US English voices.
 *
 * This operation requires permissions to perform the
 * `polly:DescribeVoices` action.
 */
export const describeVoices: API.OperationMethod<
  DescribeVoicesInput,
  DescribeVoicesOutput,
  DescribeVoicesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(64, __c4, 0) as any as S.Schema<DescribeVoicesInput>,
  output: __S(67, __c4, 3) as any as S.Schema<DescribeVoicesOutput>,
  errors: [InvalidNextTokenException, ServiceFailureException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeVoices",
}));

export type GetLexiconError = LexiconNotFoundException | ServiceFailureException | CommonErrors;
/**
 * Returns the content of the specified pronunciation lexicon stored
 * in an Amazon Web Services Region. For more information, see Managing Lexicons.
 */
export const getLexicon: API.OperationMethod<
  GetLexiconInput,
  GetLexiconOutput,
  GetLexiconError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(96, __c6, 0) as any as S.Schema<GetLexiconInput>,
  output: __S(98, __c6, 2) as any as S.Schema<GetLexiconOutput>,
  errors: [LexiconNotFoundException, ServiceFailureException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetLexicon",
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
  GetSpeechSynthesisTaskInput,
  GetSpeechSynthesisTaskOutput,
  GetSpeechSynthesisTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(128, __c8, 0) as any as S.Schema<GetSpeechSynthesisTaskInput>,
  output: __S(176, __c11, 0) as any as S.Schema<GetSpeechSynthesisTaskOutput>,
  errors: [InvalidTaskIdException, ServiceFailureException, SynthesisTaskNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSpeechSynthesisTask",
}));

export type ListLexiconsError = InvalidNextTokenException | ServiceFailureException | CommonErrors;
/**
 * Returns a list of pronunciation lexicons stored in an Amazon Web Services Region. For more information, see Managing Lexicons.
 */
export const listLexicons: API.OperationMethod<
  ListLexiconsInput,
  ListLexiconsOutput,
  ListLexiconsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(192, __c12, 0) as any as S.Schema<ListLexiconsInput>,
  output: __S(195, __c12, 3) as any as S.Schema<ListLexiconsOutput>,
  errors: [InvalidNextTokenException, ServiceFailureException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListLexicons",
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
  ListSpeechSynthesisTasksInput,
  ListSpeechSynthesisTasksOutput,
  ListSpeechSynthesisTasksError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(208, __c13, 0) as any as S.Schema<ListSpeechSynthesisTasksInput>,
  output: __S(210, __c13, 2) as any as S.Schema<ListSpeechSynthesisTasksOutput>,
  errors: [InvalidNextTokenException, ServiceFailureException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSpeechSynthesisTasks",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type PutLexiconError =
  | InvalidLexiconException
  | LexiconSizeExceededException
  | MaxLexemeLengthExceededException
  | MaxLexiconsNumberExceededException
  | ServiceFailureException
  | UnsupportedPlsAlphabetException
  | UnsupportedPlsLanguageException
  | CommonErrors;
/**
 * Stores a pronunciation lexicon in an Amazon Web Services Region. If
 * a lexicon with the same name already exists in the region, it is
 * overwritten by the new lexicon. Lexicon operations have eventual
 * consistency, therefore, it might take some time before the lexicon is
 * available to the SynthesizeSpeech operation.
 *
 * For more information, see Managing Lexicons.
 */
export const putLexicon: API.OperationMethod<
  PutLexiconInput,
  PutLexiconOutput,
  PutLexiconError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(224, __c14, 0) as any as S.Schema<PutLexiconInput>,
  output: __S(48, __c3, 0) as any as S.Schema<PutLexiconOutput>,
  errors: [
    InvalidLexiconException,
    LexiconSizeExceededException,
    MaxLexemeLengthExceededException,
    MaxLexiconsNumberExceededException,
    ServiceFailureException,
    UnsupportedPlsAlphabetException,
    UnsupportedPlsLanguageException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutLexicon",
}));

export type StartSpeechSynthesisStreamError =
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
 */
export const startSpeechSynthesisStream: API.OperationMethod<
  StartSpeechSynthesisStreamInput,
  StartSpeechSynthesisStreamOutput,
  StartSpeechSynthesisStreamError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(244, __c15, 4) as any as S.Schema<StartSpeechSynthesisStreamInput>,
  output: __S(248, __c15, 8) as any as S.Schema<StartSpeechSynthesisStreamOutput>,
  errors: [
    ServiceFailureException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartSpeechSynthesisStream",
}));

export type StartSpeechSynthesisTaskError =
  | EngineNotSupportedException
  | InvalidS3BucketException
  | InvalidS3KeyException
  | InvalidSampleRateException
  | InvalidSnsTopicArnException
  | InvalidSsmlException
  | LanguageNotSupportedException
  | LexiconNotFoundException
  | MarksNotSupportedForFormatException
  | ServiceFailureException
  | SsmlMarksNotSupportedForTextTypeException
  | TextLengthExceededException
  | CommonErrors;
/**
 * Allows the creation of an asynchronous synthesis task, by starting a
 * new `SpeechSynthesisTask`. This operation requires all the
 * standard information needed for speech synthesis, plus the name of an
 * Amazon S3 bucket for the service to store the output of the synthesis task
 * and two optional parameters (`OutputS3KeyPrefix` and
 * `SnsTopicArn`). Once the synthesis task is created, this
 * operation will return a `SpeechSynthesisTask` object, which
 * will include an identifier of this task as well as the current status. The
 * `SpeechSynthesisTask` object is available for 72 hours after
 * starting the asynchronous synthesis task.
 */
export const startSpeechSynthesisTask: API.OperationMethod<
  StartSpeechSynthesisTaskInput,
  StartSpeechSynthesisTaskOutput,
  StartSpeechSynthesisTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(256, __c16, 0) as any as S.Schema<StartSpeechSynthesisTaskInput>,
  output: __S(176, __c11, 0) as any as S.Schema<StartSpeechSynthesisTaskOutput>,
  errors: [
    EngineNotSupportedException,
    InvalidS3BucketException,
    InvalidS3KeyException,
    InvalidSampleRateException,
    InvalidSnsTopicArnException,
    InvalidSsmlException,
    LanguageNotSupportedException,
    LexiconNotFoundException,
    MarksNotSupportedForFormatException,
    ServiceFailureException,
    SsmlMarksNotSupportedForTextTypeException,
    TextLengthExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartSpeechSynthesisTask",
}));

export type SynthesizeSpeechError =
  | EngineNotSupportedException
  | InvalidSampleRateException
  | InvalidSsmlException
  | LanguageNotSupportedException
  | LexiconNotFoundException
  | MarksNotSupportedForFormatException
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
 */
export const synthesizeSpeech: API.OperationMethod<
  SynthesizeSpeechInput,
  SynthesizeSpeechOutput,
  SynthesizeSpeechError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(272, __c17, 0) as any as S.Schema<SynthesizeSpeechInput>,
  output: __S(273, __c17, 1) as any as S.Schema<SynthesizeSpeechOutput>,
  errors: [
    EngineNotSupportedException,
    InvalidSampleRateException,
    InvalidSsmlException,
    LanguageNotSupportedException,
    LexiconNotFoundException,
    MarksNotSupportedForFormatException,
    ServiceFailureException,
    SsmlMarksNotSupportedForTextTypeException,
    TextLengthExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SynthesizeSpeech",
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
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({ identifier: "DeleteLexiconOutput" });
  }
}
function __c4(j: number): any {
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
      return S.suspend(() =>
        S.Struct({
          Gender: S.optional(S.String),
          Id: S.optional(S.String),
          LanguageCode: S.optional(S.String),
          LanguageName: S.optional(S.String),
          Name: S.optional(S.String),
          AdditionalLanguageCodes: S.optional(__S(80, __c5, 0)),
          SupportedEngines: S.optional(__S(80, __c5, 0)),
        }),
      ).annotate({ identifier: "Voice" });
    case 2:
      return S.Array(__S(65, __c4, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ Voices: S.optional(__S(66, __c4, 2)), NextToken: S.optional(S.String) }).pipe(
          ns,
        ),
      ).annotate({ identifier: "DescribeVoicesOutput" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c6(j: number): any {
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
          Lexicon: S.optional(__S(97, __c6, 1)),
          LexiconAttributes: S.optional(__S(112, __c7, 0)),
        }).pipe(ns),
      ).annotate({ identifier: "GetLexiconOutput" });
  }
}
function __c7(j: number): any {
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
function __c8(j: number): any {
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
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c10(j: number): any {
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
          LexiconNames: S.optional(__S(144, __c9, 0)),
          OutputFormat: S.optional(S.String),
          SampleRate: S.optional(S.String),
          SpeechMarkTypes: S.optional(__S(80, __c5, 0)),
          TextType: S.optional(S.String),
          VoiceId: S.optional(S.String),
          LanguageCode: S.optional(S.String),
        }),
      ).annotate({ identifier: "SynthesisTask" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ SynthesisTask: S.optional(__S(160, __c10, 0)) }).pipe(ns),
      ).annotate({ identifier: "GetSpeechSynthesisTaskOutput" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")) }).pipe(
          T.all(ns, T.Http({ method: "GET", uri: "/v1/lexicons" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListLexiconsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Name: S.optional(S.String), Attributes: S.optional(__S(112, __c7, 0)) }),
      ).annotate({ identifier: "LexiconDescription" });
    case 2:
      return S.Array(__S(193, __c12, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          Lexicons: S.optional(__S(194, __c12, 2)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListLexiconsOutput" });
  }
}
function __c13(j: number): any {
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
      return S.Array(__S(160, __c10, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          SynthesisTasks: S.optional(__S(209, __c13, 1)),
        }).pipe(ns),
      ).annotate({ identifier: "ListSpeechSynthesisTasksOutput" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.String.pipe(T.HttpLabel("Name")), Content: SensitiveString }).pipe(
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
function __c15(j: number): any {
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
          FlushStreamConfiguration: S.optional(__S(240, __c15, 0)),
        }),
      ).annotate({ identifier: "TextEvent" });
    case 2:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "CloseStreamEvent" });
    case 3:
      return T.InputEventStream(
        /*@__PURE__*/ S.Union([
          /*@__PURE__*/ S.Struct({ TextEvent: __S(241, __c15, 1) }),
          /*@__PURE__*/ S.Struct({ CloseStreamEvent: __S(242, __c15, 2) }),
        ]),
      );
    case 4:
      return S.suspend(() =>
        S.Struct({
          Engine: S.String.pipe(T.HttpHeader("x-amzn-Engine")),
          LanguageCode: S.optional(S.String).pipe(T.HttpHeader("x-amzn-LanguageCode")),
          LexiconNames: S.optional(__S(144, __c9, 0)).pipe(T.HttpHeader("x-amzn-LexiconNames")),
          OutputFormat: S.String.pipe(T.HttpHeader("x-amzn-OutputFormat")),
          SampleRate: S.optional(S.String).pipe(T.HttpHeader("x-amzn-SampleRate")),
          VoiceId: S.String.pipe(T.HttpHeader("x-amzn-VoiceId")),
          ActionStream: S.optional(__S(243, __c15, 3)).pipe(T.HttpPayload()),
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
          /*@__PURE__*/ S.Struct({ AudioEvent: __S(245, __c15, 5) }),
          /*@__PURE__*/ S.Struct({ StreamClosedEvent: __S(246, __c15, 6) }),
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
        S.Struct({ EventStream: S.optional(__S(247, __c15, 7)).pipe(T.HttpPayload()) }).pipe(ns),
      ).annotate({ identifier: "StartSpeechSynthesisStreamOutput" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Engine: S.optional(S.String),
          LanguageCode: S.optional(S.String),
          LexiconNames: S.optional(__S(144, __c9, 0)),
          OutputFormat: S.String,
          OutputS3BucketName: S.String,
          OutputS3KeyPrefix: S.optional(S.String),
          SampleRate: S.optional(S.String),
          SnsTopicArn: S.optional(S.String),
          SpeechMarkTypes: S.optional(__S(80, __c5, 0)),
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
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Engine: S.optional(S.String),
          LanguageCode: S.optional(S.String),
          LexiconNames: S.optional(__S(144, __c9, 0)),
          OutputFormat: S.String,
          SampleRate: S.optional(S.String),
          SpeechMarkTypes: S.optional(__S(80, __c5, 0)),
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
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
