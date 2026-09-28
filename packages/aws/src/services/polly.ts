import type * as HttpClient from "effect/unstable/http/HttpClient";
import type * as redacted from "effect/Redacted";
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
  sdkId: "Polly",
  target: "Parrot_v1",
  version: "2016-06-10",
  sigv4: "polly",
  protocol: restJson1Protocol,
  xmlns: "http://polly.amazonaws.com/doc/v1",
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
                `https://polly-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://polly-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://polly.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://polly.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class EngineNotSupportedException
  extends /*@__PURE__*/ TE.TaggedError(
    "EngineNotSupportedException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidLexiconException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidLexiconException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidNextTokenException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidNextTokenException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidS3BucketException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidS3BucketException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidS3KeyException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidS3KeyException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidSampleRateException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidSampleRateException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidSnsTopicArnException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidSnsTopicArnException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidSsmlException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidSsmlException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidTaskIdException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidTaskIdException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class LanguageNotSupportedException
  extends /*@__PURE__*/ TE.TaggedError(
    "LanguageNotSupportedException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class LexiconNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "LexiconNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class LexiconSizeExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "LexiconSizeExceededException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class MarksNotSupportedForFormatException
  extends /*@__PURE__*/ TE.TaggedError(
    "MarksNotSupportedForFormatException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class MaxLexemeLengthExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "MaxLexemeLengthExceededException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class MaxLexiconsNumberExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "MaxLexiconsNumberExceededException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class ServiceFailureException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceFailureException",
    ["ServerError"],
    { status: 500 },
  )<{ readonly message?: string }> {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceQuotaExceededException",
    ["QuotaError"],
    { status: 402 },
  )<{
    readonly message: string;
    readonly quotaCode: QuotaCode;
    readonly serviceCode: ServiceCode;
  }> {}
export class SsmlMarksNotSupportedForTextTypeException
  extends /*@__PURE__*/ TE.TaggedError(
    "SsmlMarksNotSupportedForTextTypeException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class SynthesisTaskNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "SynthesisTaskNotFoundException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class TextLengthExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "TextLengthExceededException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["BadRequestError"],
    { code: "Throttling", status: 400 },
  )<{
    readonly message?: string;
    readonly throttlingReasons?: ThrottlingReason[];
  }> {}
export class UnsupportedPlsAlphabetException
  extends /*@__PURE__*/ TE.TaggedError(
    "UnsupportedPlsAlphabetException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class UnsupportedPlsLanguageException
  extends /*@__PURE__*/ TE.TaggedError(
    "UnsupportedPlsLanguageException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{
    readonly message: string;
    readonly reason: ValidationExceptionReason;
    readonly fields?: ValidationExceptionField[];
  }> {}
export type LexiconName = string;
export interface DeleteLexiconInput {
  Name: string;
}
export interface DeleteLexiconOutput {}
export type Engine =
  | "standard"
  | "neural"
  | "long-form"
  | "generative"
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
export type TaskStatus =
  | "scheduled"
  | "inProgress"
  | "completed"
  | "failed"
  | (string & {});
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
export type SpeechMarkType =
  | "sentence"
  | "ssml"
  | "viseme"
  | "word"
  | (string & {});
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
  ActionStream?: stream.Stream<
    StartSpeechSynthesisStreamActionStream,
    Error,
    never
  >;
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
  EventStream?: stream.Stream<
    StartSpeechSynthesisStreamEventStream,
    Error,
    never
  >;
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
export type DeleteLexiconError =
  | LexiconNotFoundException
  | ServiceFailureException
  | CommonErrors;
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
  descriptor: {
    service: svc,
    http: "DELETE /v1/lexicons/{Name}",
    input: { Name: 0 },
  },
  errors: [LexiconNotFoundException, ServiceFailureException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteLexicon",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /v1/voices",
    input: {
      Engine: D.m({ query: "Engine" }),
      LanguageCode: D.m({ query: "LanguageCode" }),
      IncludeAdditionalLanguageCodes: D.m({
        query: "IncludeAdditionalLanguageCodes",
      }),
      NextToken: D.m({ query: "NextToken" }),
    },
  },
  errors: [InvalidNextTokenException, ServiceFailureException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeVoices",
})) as any;

export type GetLexiconError =
  | LexiconNotFoundException
  | ServiceFailureException
  | CommonErrors;
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
  descriptor: {
    service: svc,
    http: "GET /v1/lexicons/{Name}",
    input: { Name: 0 },
    output: {
      Lexicon: { Content: D.secret },
      LexiconAttributes: o_LexiconAttributes,
    },
  },
  errors: [LexiconNotFoundException, ServiceFailureException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetLexicon",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /v1/synthesisTasks/{TaskId}",
    input: { TaskId: 0 },
    output: { SynthesisTask: o_SynthesisTask },
  },
  errors: [
    InvalidTaskIdException,
    ServiceFailureException,
    SynthesisTaskNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSpeechSynthesisTask",
})) as any;

export type ListLexiconsError =
  | InvalidNextTokenException
  | ServiceFailureException
  | CommonErrors;
/**
 * Returns a list of pronunciation lexicons stored in an Amazon Web Services Region. For more information, see Managing Lexicons.
 */
export const listLexicons: API.OperationMethod<
  ListLexiconsInput,
  ListLexiconsOutput,
  ListLexiconsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/lexicons",
    input: { NextToken: D.m({ query: "NextToken" }) },
    output: { Lexicons: D.list({ Attributes: o_LexiconAttributes }) },
  },
  errors: [InvalidNextTokenException, ServiceFailureException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListLexicons",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /v1/synthesisTasks",
    input: {
      MaxResults: D.m({ query: "MaxResults" }),
      NextToken: D.m({ query: "NextToken" }),
      Status: D.m({ query: "Status" }),
    },
    output: { SynthesisTasks: D.list(o_SynthesisTask) },
  },
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
  descriptor: {
    service: svc,
    http: "PUT /v1/lexicons/{Name}",
    input: { Name: 0, Content: 0 },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /v1/synthesisStream",
    input: {
      Engine: D.m({ header: "x-amzn-Engine" }),
      LanguageCode: D.m({ header: "x-amzn-LanguageCode" }),
      LexiconNames: D.m({ header: "x-amzn-LexiconNames" }),
      OutputFormat: D.m({ header: "x-amzn-OutputFormat" }),
      SampleRate: D.m({ header: "x-amzn-SampleRate" }),
      VoiceId: D.m({ header: "x-amzn-VoiceId" }),
      ActionStream: D.m({
        payload: true,
        shape: D.events({
          TextEvent: {
            Text: 0,
            TextType: 0,
            FlushStreamConfiguration: { Force: 0 },
          },
          CloseStreamEvent: {},
        }),
      }),
    },
    output: {
      EventStream: D.m({
        payload: true,
        shape: D.events(
          {
            AudioEvent: { AudioChunk: D.blob },
            StreamClosedEvent: 0,
            ValidationException: 0,
            ServiceQuotaExceededException: 0,
            ServiceFailureException: 0,
            ThrottlingException: 0,
          },
          { AudioEvent: "AudioChunk" },
        ),
      }),
    },
  },
  errors: [
    ServiceFailureException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartSpeechSynthesisStream",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /v1/synthesisTasks",
    input: {
      Engine: 0,
      LanguageCode: 0,
      LexiconNames: 0,
      OutputFormat: 0,
      OutputS3BucketName: 0,
      OutputS3KeyPrefix: 0,
      SampleRate: 0,
      SnsTopicArn: 0,
      SpeechMarkTypes: 0,
      Text: 0,
      TextType: 0,
      VoiceId: 0,
    },
    output: { SynthesisTask: o_SynthesisTask },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /v1/speech",
    input: {
      Engine: 0,
      LanguageCode: 0,
      LexiconNames: 0,
      OutputFormat: 0,
      SampleRate: 0,
      SpeechMarkTypes: 0,
      Text: 0,
      TextType: 0,
      VoiceId: 0,
    },
    output: {
      AudioStream: D.m({ payload: true, shape: D.stream }),
      ContentType: D.m({ header: "Content-Type" }),
      RequestCharacters: D.m({
        header: "x-amzn-RequestCharacters",
        shape: D.num,
      }),
    },
    body: true,
  },
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
})) as any;

const o_LexiconAttributes: D.LazyStruct = () => ({ LastModified: D.ts });
const o_SynthesisTask: D.LazyStruct = () => ({ CreationTime: D.ts });
