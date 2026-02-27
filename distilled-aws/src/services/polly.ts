import * as HttpClient from "effect/unstable/http/HttpClient";
import * as effect from "effect/Effect";
import * as redacted from "effect/Redacted";
import * as S from "effect/Schema";
import * as stream from "effect/Stream";
import * as API from "../client/api.ts";
import * as T from "../traits.ts";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import type { Region } from "../region.ts";
import { SensitiveString, SensitiveBlob } from "../sensitive.ts";
const ns = T.XmlNamespace("http://polly.amazonaws.com/doc/v1");
const svc = T.AwsApiService({ sdkId: "Polly", serviceShapeName: "Parrot_v1" });
const auth = T.AwsAuthSigv4({ name: "polly" });
const ver = T.ServiceVersion("2016-06-10");
const proto = T.AwsProtocolsRestJson1();
const rules = T.EndpointResolver((p, _) => {
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
});

//# Newtypes
export type LexiconName = string;
export type ErrorMessage = string;
export type IncludeAdditionalLanguageCodes = boolean;
export type NextToken = string;
export type LanguageName = string;
export type VoiceName = string;
export type LexiconContent = string | redacted.Redacted<string>;
export type Alphabet = string;
export type LastModified = Date;
export type LexiconArn = string;
export type LexemesCount = number;
export type Size = number;
export type TaskId = string;
export type TaskStatusReason = string;
export type OutputUri = string;
export type RequestCharacters = number;
export type SnsTopicArn = string;
export type SampleRate = string;
export type MaxResults = number;
export type OutputS3BucketName = string;
export type OutputS3KeyPrefix = string;
export type Text = string;
export type ContentType = string;

//# Schemas
export interface DeleteLexiconInput {
  Name: string;
}
export const DeleteLexiconInput = S.suspend(() =>
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
).annotate({
  identifier: "DeleteLexiconInput",
}) as any as S.Schema<DeleteLexiconInput>;
export interface DeleteLexiconOutput {}
export const DeleteLexiconOutput = S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteLexiconOutput",
}) as any as S.Schema<DeleteLexiconOutput>;
export type Engine =
  | "standard"
  | "neural"
  | "long-form"
  | "generative"
  | (string & {});
export const Engine = S.String;
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
export const LanguageCode = S.String;
export interface DescribeVoicesInput {
  Engine?: Engine;
  LanguageCode?: LanguageCode;
  IncludeAdditionalLanguageCodes?: boolean;
  NextToken?: string;
}
export const DescribeVoicesInput = S.suspend(() =>
  S.Struct({
    Engine: S.optional(Engine).pipe(T.HttpQuery("Engine")),
    LanguageCode: S.optional(LanguageCode).pipe(T.HttpQuery("LanguageCode")),
    IncludeAdditionalLanguageCodes: S.optional(S.Boolean).pipe(
      T.HttpQuery("IncludeAdditionalLanguageCodes"),
    ),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "GET", uri: "/v1/voices" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeVoicesInput",
}) as any as S.Schema<DescribeVoicesInput>;
export type Gender = "Female" | "Male" | (string & {});
export const Gender = S.String;
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
  | (string & {});
export const VoiceId = S.String;
export type LanguageCodeList = LanguageCode[];
export const LanguageCodeList = S.Array(LanguageCode);
export type EngineList = Engine[];
export const EngineList = S.Array(Engine);
export interface Voice {
  Gender?: Gender;
  Id?: VoiceId;
  LanguageCode?: LanguageCode;
  LanguageName?: string;
  Name?: string;
  AdditionalLanguageCodes?: LanguageCode[];
  SupportedEngines?: Engine[];
}
export const Voice = S.suspend(() =>
  S.Struct({
    Gender: S.optional(Gender),
    Id: S.optional(VoiceId),
    LanguageCode: S.optional(LanguageCode),
    LanguageName: S.optional(S.String),
    Name: S.optional(S.String),
    AdditionalLanguageCodes: S.optional(LanguageCodeList),
    SupportedEngines: S.optional(EngineList),
  }),
).annotate({ identifier: "Voice" }) as any as S.Schema<Voice>;
export type VoiceList = Voice[];
export const VoiceList = S.Array(Voice);
export interface DescribeVoicesOutput {
  Voices?: Voice[];
  NextToken?: string;
}
export const DescribeVoicesOutput = S.suspend(() =>
  S.Struct({
    Voices: S.optional(VoiceList),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "DescribeVoicesOutput",
}) as any as S.Schema<DescribeVoicesOutput>;
export interface GetLexiconInput {
  Name: string;
}
export const GetLexiconInput = S.suspend(() =>
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
).annotate({
  identifier: "GetLexiconInput",
}) as any as S.Schema<GetLexiconInput>;
export interface Lexicon {
  Content?: string | redacted.Redacted<string>;
  Name?: string;
}
export const Lexicon = S.suspend(() =>
  S.Struct({
    Content: S.optional(SensitiveString),
    Name: S.optional(S.String),
  }),
).annotate({ identifier: "Lexicon" }) as any as S.Schema<Lexicon>;
export interface LexiconAttributes {
  Alphabet?: string;
  LanguageCode?: LanguageCode;
  LastModified?: Date;
  LexiconArn?: string;
  LexemesCount?: number;
  Size?: number;
}
export const LexiconAttributes = S.suspend(() =>
  S.Struct({
    Alphabet: S.optional(S.String),
    LanguageCode: S.optional(LanguageCode),
    LastModified: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LexiconArn: S.optional(S.String),
    LexemesCount: S.optional(S.Number),
    Size: S.optional(S.Number),
  }),
).annotate({
  identifier: "LexiconAttributes",
}) as any as S.Schema<LexiconAttributes>;
export interface GetLexiconOutput {
  Lexicon?: Lexicon;
  LexiconAttributes?: LexiconAttributes;
}
export const GetLexiconOutput = S.suspend(() =>
  S.Struct({
    Lexicon: S.optional(Lexicon),
    LexiconAttributes: S.optional(LexiconAttributes),
  }).pipe(ns),
).annotate({
  identifier: "GetLexiconOutput",
}) as any as S.Schema<GetLexiconOutput>;
export interface GetSpeechSynthesisTaskInput {
  TaskId: string;
}
export const GetSpeechSynthesisTaskInput = S.suspend(() =>
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
).annotate({
  identifier: "GetSpeechSynthesisTaskInput",
}) as any as S.Schema<GetSpeechSynthesisTaskInput>;
export type TaskStatus =
  | "scheduled"
  | "inProgress"
  | "completed"
  | "failed"
  | (string & {});
export const TaskStatus = S.String;
export type LexiconNameList = string[];
export const LexiconNameList = S.Array(S.String);
export type OutputFormat =
  | "json"
  | "mp3"
  | "ogg_opus"
  | "ogg_vorbis"
  | "pcm"
  | (string & {});
export const OutputFormat = S.String;
export type SpeechMarkType =
  | "sentence"
  | "ssml"
  | "viseme"
  | "word"
  | (string & {});
export const SpeechMarkType = S.String;
export type SpeechMarkTypeList = SpeechMarkType[];
export const SpeechMarkTypeList = S.Array(SpeechMarkType);
export type TextType = "ssml" | "text" | (string & {});
export const TextType = S.String;
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
export const SynthesisTask = S.suspend(() =>
  S.Struct({
    Engine: S.optional(Engine),
    TaskId: S.optional(S.String),
    TaskStatus: S.optional(TaskStatus),
    TaskStatusReason: S.optional(S.String),
    OutputUri: S.optional(S.String),
    CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    RequestCharacters: S.optional(S.Number),
    SnsTopicArn: S.optional(S.String),
    LexiconNames: S.optional(LexiconNameList),
    OutputFormat: S.optional(OutputFormat),
    SampleRate: S.optional(S.String),
    SpeechMarkTypes: S.optional(SpeechMarkTypeList),
    TextType: S.optional(TextType),
    VoiceId: S.optional(VoiceId),
    LanguageCode: S.optional(LanguageCode),
  }),
).annotate({ identifier: "SynthesisTask" }) as any as S.Schema<SynthesisTask>;
export interface GetSpeechSynthesisTaskOutput {
  SynthesisTask?: SynthesisTask;
}
export const GetSpeechSynthesisTaskOutput = S.suspend(() =>
  S.Struct({ SynthesisTask: S.optional(SynthesisTask) }).pipe(ns),
).annotate({
  identifier: "GetSpeechSynthesisTaskOutput",
}) as any as S.Schema<GetSpeechSynthesisTaskOutput>;
export interface ListLexiconsInput {
  NextToken?: string;
}
export const ListLexiconsInput = S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "GET", uri: "/v1/lexicons" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListLexiconsInput",
}) as any as S.Schema<ListLexiconsInput>;
export interface LexiconDescription {
  Name?: string;
  Attributes?: LexiconAttributes;
}
export const LexiconDescription = S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    Attributes: S.optional(LexiconAttributes),
  }),
).annotate({
  identifier: "LexiconDescription",
}) as any as S.Schema<LexiconDescription>;
export type LexiconDescriptionList = LexiconDescription[];
export const LexiconDescriptionList = S.Array(LexiconDescription);
export interface ListLexiconsOutput {
  Lexicons?: LexiconDescription[];
  NextToken?: string;
}
export const ListLexiconsOutput = S.suspend(() =>
  S.Struct({
    Lexicons: S.optional(LexiconDescriptionList),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListLexiconsOutput",
}) as any as S.Schema<ListLexiconsOutput>;
export interface ListSpeechSynthesisTasksInput {
  MaxResults?: number;
  NextToken?: string;
  Status?: TaskStatus;
}
export const ListSpeechSynthesisTasksInput = S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
    Status: S.optional(TaskStatus).pipe(T.HttpQuery("Status")),
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
).annotate({
  identifier: "ListSpeechSynthesisTasksInput",
}) as any as S.Schema<ListSpeechSynthesisTasksInput>;
export type SynthesisTasks = SynthesisTask[];
export const SynthesisTasks = S.Array(SynthesisTask);
export interface ListSpeechSynthesisTasksOutput {
  NextToken?: string;
  SynthesisTasks?: SynthesisTask[];
}
export const ListSpeechSynthesisTasksOutput = S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    SynthesisTasks: S.optional(SynthesisTasks),
  }).pipe(ns),
).annotate({
  identifier: "ListSpeechSynthesisTasksOutput",
}) as any as S.Schema<ListSpeechSynthesisTasksOutput>;
export interface PutLexiconInput {
  Name: string;
  Content: string | redacted.Redacted<string>;
}
export const PutLexiconInput = S.suspend(() =>
  S.Struct({
    Name: S.String.pipe(T.HttpLabel("Name")),
    Content: SensitiveString,
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
).annotate({
  identifier: "PutLexiconInput",
}) as any as S.Schema<PutLexiconInput>;
export interface PutLexiconOutput {}
export const PutLexiconOutput = S.suspend(() => S.Struct({}).pipe(ns)).annotate(
  { identifier: "PutLexiconOutput" },
) as any as S.Schema<PutLexiconOutput>;
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
export const StartSpeechSynthesisTaskInput = S.suspend(() =>
  S.Struct({
    Engine: S.optional(Engine),
    LanguageCode: S.optional(LanguageCode),
    LexiconNames: S.optional(LexiconNameList),
    OutputFormat: OutputFormat,
    OutputS3BucketName: S.String,
    OutputS3KeyPrefix: S.optional(S.String),
    SampleRate: S.optional(S.String),
    SnsTopicArn: S.optional(S.String),
    SpeechMarkTypes: S.optional(SpeechMarkTypeList),
    Text: S.String,
    TextType: S.optional(TextType),
    VoiceId: VoiceId,
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
).annotate({
  identifier: "StartSpeechSynthesisTaskInput",
}) as any as S.Schema<StartSpeechSynthesisTaskInput>;
export interface StartSpeechSynthesisTaskOutput {
  SynthesisTask?: SynthesisTask;
}
export const StartSpeechSynthesisTaskOutput = S.suspend(() =>
  S.Struct({ SynthesisTask: S.optional(SynthesisTask) }).pipe(ns),
).annotate({
  identifier: "StartSpeechSynthesisTaskOutput",
}) as any as S.Schema<StartSpeechSynthesisTaskOutput>;
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
export const SynthesizeSpeechInput = S.suspend(() =>
  S.Struct({
    Engine: S.optional(Engine),
    LanguageCode: S.optional(LanguageCode),
    LexiconNames: S.optional(LexiconNameList),
    OutputFormat: OutputFormat,
    SampleRate: S.optional(S.String),
    SpeechMarkTypes: S.optional(SpeechMarkTypeList),
    Text: S.String,
    TextType: S.optional(TextType),
    VoiceId: VoiceId,
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/v1/speech" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "SynthesizeSpeechInput",
}) as any as S.Schema<SynthesizeSpeechInput>;
export interface SynthesizeSpeechOutput {
  AudioStream?: T.StreamingOutputBody;
  ContentType?: string;
  RequestCharacters?: number;
}
export const SynthesizeSpeechOutput = S.suspend(() =>
  S.Struct({
    AudioStream: S.optional(T.StreamingOutput).pipe(T.HttpPayload()),
    ContentType: S.optional(S.String).pipe(T.HttpHeader("Content-Type")),
    RequestCharacters: S.optional(S.Number).pipe(
      T.HttpHeader("x-amzn-RequestCharacters"),
    ),
  }).pipe(ns),
).annotate({
  identifier: "SynthesizeSpeechOutput",
}) as any as S.Schema<SynthesizeSpeechOutput>;

//# Errors
export class LexiconNotFoundException extends S.TaggedErrorClass<LexiconNotFoundException>()(
  "LexiconNotFoundException",
  { message: S.optional(S.String) },
).pipe(C.withBadRequestError) {}
export class ServiceFailureException extends S.TaggedErrorClass<ServiceFailureException>()(
  "ServiceFailureException",
  { message: S.optional(S.String) },
).pipe(C.withServerError) {}
export class InvalidNextTokenException extends S.TaggedErrorClass<InvalidNextTokenException>()(
  "InvalidNextTokenException",
  { message: S.optional(S.String) },
).pipe(C.withBadRequestError) {}
export class InvalidTaskIdException extends S.TaggedErrorClass<InvalidTaskIdException>()(
  "InvalidTaskIdException",
  { message: S.optional(S.String) },
).pipe(C.withBadRequestError) {}
export class SynthesisTaskNotFoundException extends S.TaggedErrorClass<SynthesisTaskNotFoundException>()(
  "SynthesisTaskNotFoundException",
  { message: S.optional(S.String) },
).pipe(C.withBadRequestError) {}
export class InvalidLexiconException extends S.TaggedErrorClass<InvalidLexiconException>()(
  "InvalidLexiconException",
  { message: S.optional(S.String) },
).pipe(C.withBadRequestError) {}
export class LexiconSizeExceededException extends S.TaggedErrorClass<LexiconSizeExceededException>()(
  "LexiconSizeExceededException",
  { message: S.optional(S.String) },
).pipe(C.withBadRequestError) {}
export class MaxLexemeLengthExceededException extends S.TaggedErrorClass<MaxLexemeLengthExceededException>()(
  "MaxLexemeLengthExceededException",
  { message: S.optional(S.String) },
).pipe(C.withBadRequestError) {}
export class MaxLexiconsNumberExceededException extends S.TaggedErrorClass<MaxLexiconsNumberExceededException>()(
  "MaxLexiconsNumberExceededException",
  { message: S.optional(S.String) },
).pipe(C.withBadRequestError) {}
export class UnsupportedPlsAlphabetException extends S.TaggedErrorClass<UnsupportedPlsAlphabetException>()(
  "UnsupportedPlsAlphabetException",
  { message: S.optional(S.String) },
).pipe(C.withBadRequestError) {}
export class UnsupportedPlsLanguageException extends S.TaggedErrorClass<UnsupportedPlsLanguageException>()(
  "UnsupportedPlsLanguageException",
  { message: S.optional(S.String) },
).pipe(C.withBadRequestError) {}
export class EngineNotSupportedException extends S.TaggedErrorClass<EngineNotSupportedException>()(
  "EngineNotSupportedException",
  { message: S.optional(S.String) },
).pipe(C.withBadRequestError) {}
export class InvalidS3BucketException extends S.TaggedErrorClass<InvalidS3BucketException>()(
  "InvalidS3BucketException",
  { message: S.optional(S.String) },
).pipe(C.withBadRequestError) {}
export class InvalidS3KeyException extends S.TaggedErrorClass<InvalidS3KeyException>()(
  "InvalidS3KeyException",
  { message: S.optional(S.String) },
).pipe(C.withBadRequestError) {}
export class InvalidSampleRateException extends S.TaggedErrorClass<InvalidSampleRateException>()(
  "InvalidSampleRateException",
  { message: S.optional(S.String) },
).pipe(C.withBadRequestError) {}
export class InvalidSnsTopicArnException extends S.TaggedErrorClass<InvalidSnsTopicArnException>()(
  "InvalidSnsTopicArnException",
  { message: S.optional(S.String) },
).pipe(C.withBadRequestError) {}
export class InvalidSsmlException extends S.TaggedErrorClass<InvalidSsmlException>()(
  "InvalidSsmlException",
  { message: S.optional(S.String) },
).pipe(C.withBadRequestError) {}
export class LanguageNotSupportedException extends S.TaggedErrorClass<LanguageNotSupportedException>()(
  "LanguageNotSupportedException",
  { message: S.optional(S.String) },
).pipe(C.withBadRequestError) {}
export class MarksNotSupportedForFormatException extends S.TaggedErrorClass<MarksNotSupportedForFormatException>()(
  "MarksNotSupportedForFormatException",
  { message: S.optional(S.String) },
).pipe(C.withBadRequestError) {}
export class SsmlMarksNotSupportedForTextTypeException extends S.TaggedErrorClass<SsmlMarksNotSupportedForTextTypeException>()(
  "SsmlMarksNotSupportedForTextTypeException",
  { message: S.optional(S.String) },
).pipe(C.withBadRequestError) {}
export class TextLengthExceededException extends S.TaggedErrorClass<TextLengthExceededException>()(
  "TextLengthExceededException",
  { message: S.optional(S.String) },
).pipe(C.withBadRequestError) {}

//# Operations
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
  LexiconNotFoundException | ServiceFailureException | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteLexiconInput,
  output: DeleteLexiconOutput,
  errors: [LexiconNotFoundException, ServiceFailureException],
}));
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
  InvalidNextTokenException | ServiceFailureException | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DescribeVoicesInput,
  output: DescribeVoicesOutput,
  errors: [InvalidNextTokenException, ServiceFailureException],
}));
/**
 * Returns the content of the specified pronunciation lexicon stored
 * in an Amazon Web Services Region. For more information, see Managing Lexicons.
 */
export const getLexicon: API.OperationMethod<
  GetLexiconInput,
  GetLexiconOutput,
  LexiconNotFoundException | ServiceFailureException | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetLexiconInput,
  output: GetLexiconOutput,
  errors: [LexiconNotFoundException, ServiceFailureException],
}));
/**
 * Retrieves a specific SpeechSynthesisTask object based on its TaskID.
 * This object contains information about the given speech synthesis task,
 * including the status of the task, and a link to the S3 bucket containing
 * the output of the task.
 */
export const getSpeechSynthesisTask: API.OperationMethod<
  GetSpeechSynthesisTaskInput,
  GetSpeechSynthesisTaskOutput,
  | InvalidTaskIdException
  | ServiceFailureException
  | SynthesisTaskNotFoundException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetSpeechSynthesisTaskInput,
  output: GetSpeechSynthesisTaskOutput,
  errors: [
    InvalidTaskIdException,
    ServiceFailureException,
    SynthesisTaskNotFoundException,
  ],
}));
/**
 * Returns a list of pronunciation lexicons stored in an Amazon Web Services Region. For more information, see Managing Lexicons.
 */
export const listLexicons: API.OperationMethod<
  ListLexiconsInput,
  ListLexiconsOutput,
  InvalidNextTokenException | ServiceFailureException | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ListLexiconsInput,
  output: ListLexiconsOutput,
  errors: [InvalidNextTokenException, ServiceFailureException],
}));
/**
 * Returns a list of SpeechSynthesisTask objects ordered by their
 * creation date. This operation can filter the tasks by their status, for
 * example, allowing users to list only tasks that are completed.
 */
export const listSpeechSynthesisTasks: API.OperationMethod<
  ListSpeechSynthesisTasksInput,
  ListSpeechSynthesisTasksOutput,
  InvalidNextTokenException | ServiceFailureException | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListSpeechSynthesisTasksInput,
  ) => stream.Stream<
    ListSpeechSynthesisTasksOutput,
    InvalidNextTokenException | ServiceFailureException | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListSpeechSynthesisTasksInput,
  ) => stream.Stream<
    unknown,
    InvalidNextTokenException | ServiceFailureException | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListSpeechSynthesisTasksInput,
  output: ListSpeechSynthesisTasksOutput,
  errors: [InvalidNextTokenException, ServiceFailureException],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
}));
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
  | InvalidLexiconException
  | LexiconSizeExceededException
  | MaxLexemeLengthExceededException
  | MaxLexiconsNumberExceededException
  | ServiceFailureException
  | UnsupportedPlsAlphabetException
  | UnsupportedPlsLanguageException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PutLexiconInput,
  output: PutLexiconOutput,
  errors: [
    InvalidLexiconException,
    LexiconSizeExceededException,
    MaxLexemeLengthExceededException,
    MaxLexiconsNumberExceededException,
    ServiceFailureException,
    UnsupportedPlsAlphabetException,
    UnsupportedPlsLanguageException,
  ],
}));
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
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: StartSpeechSynthesisTaskInput,
  output: StartSpeechSynthesisTaskOutput,
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
}));
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
  | EngineNotSupportedException
  | InvalidSampleRateException
  | InvalidSsmlException
  | LanguageNotSupportedException
  | LexiconNotFoundException
  | MarksNotSupportedForFormatException
  | ServiceFailureException
  | SsmlMarksNotSupportedForTextTypeException
  | TextLengthExceededException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: SynthesizeSpeechInput,
  output: SynthesizeSpeechOutput,
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
}));
