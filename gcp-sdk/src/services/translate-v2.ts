// ==========================================================================
// Google Cloud Translation API (translate v2)
// DO NOT EDIT - Generated from GCP Discovery Document
// ==========================================================================

import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";
import * as C from "../category";
import type { Credentials } from "../credentials";
import type { DefaultErrors } from "../errors";
import type * as HttpClient from "effect/unstable/http/HttpClient";

// Service metadata
const svc = T.Service({
  name: "translate",
  version: "v2",
  rootUrl: "https://translation.googleapis.com/",
  servicePath: "language/translate/",
});

// ==========================================================================
// Schemas
// ==========================================================================

export type DetectionsResource = unknown;
export const DetectionsResource = Schema.Unknown;

export interface DetectionsListResponse {
  /** A detections contains detection results of several text */
  detections?: Array<DetectionsResource>;
}

export const DetectionsListResponse: Schema.Schema<DetectionsListResponse> = Schema.suspend(() => Schema.Struct({
  detections: Schema.optional(Schema.Array(DetectionsResource)),
})).annotate({ identifier: "DetectionsListResponse" }) as any as Schema.Schema<DetectionsListResponse>;

export interface LanguagesResource {
  /** Supported language code, generally consisting of its ISO 639-1 identifier. (E.g. 'en', 'ja'). In certain cases, BCP-47 codes including language + region identifiers are returned (e.g. 'zh-TW' and 'zh-CH') */
  language?: string;
  /** Human readable name of the language localized to the target language. */
  name?: string;
}

export const LanguagesResource: Schema.Schema<LanguagesResource> = Schema.suspend(() => Schema.Struct({
  language: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "LanguagesResource" }) as any as Schema.Schema<LanguagesResource>;

export interface LanguagesListResponse {
  /** List of source/target languages supported by the translation API. If target parameter is unspecified, the list is sorted by the ASCII code point order of the language code. If target parameter is specified, the list is sorted by the collation order of the language name in the target language. */
  languages?: Array<LanguagesResource>;
}

export const LanguagesListResponse: Schema.Schema<LanguagesListResponse> = Schema.suspend(() => Schema.Struct({
  languages: Schema.optional(Schema.Array(LanguagesResource)),
})).annotate({ identifier: "LanguagesListResponse" }) as any as Schema.Schema<LanguagesListResponse>;

export interface TranslationsResource {
  /** The source language of the initial request, detected automatically, if no source language was passed within the initial request. If the source language was passed, auto-detection of the language will not occur and this field will be empty. */
  detectedSourceLanguage?: string;
  /** Text translated into the target language. */
  translatedText?: string;
  /** The `model` type used for this translation. Valid values are listed in public documentation. Can be different from requested `model`. Present only if specific model type was explicitly requested. */
  model?: string;
}

export const TranslationsResource: Schema.Schema<TranslationsResource> = Schema.suspend(() => Schema.Struct({
  detectedSourceLanguage: Schema.optional(Schema.String),
  translatedText: Schema.optional(Schema.String),
  model: Schema.optional(Schema.String),
})).annotate({ identifier: "TranslationsResource" }) as any as Schema.Schema<TranslationsResource>;

export interface TranslationsListResponse {
  /** Translations contains list of translation results of given text */
  translations?: Array<TranslationsResource>;
}

export const TranslationsListResponse: Schema.Schema<TranslationsListResponse> = Schema.suspend(() => Schema.Struct({
  translations: Schema.optional(Schema.Array(TranslationsResource)),
})).annotate({ identifier: "TranslationsListResponse" }) as any as Schema.Schema<TranslationsListResponse>;

export interface TranslateTextRequest {
  /** The language to use for translation of the input text, set to one of the language codes listed in Language Support. */
  target?: string;
  /** The input text to translate. Repeat this parameter to perform translation operations on multiple text inputs. */
  q?: Array<string>;
  /** The format of the source text, in either HTML (default) or plain-text. A value of "html" indicates HTML and a value of "text" indicates plain-text. */
  format?: string;
  /** The language of the source text, set to one of the language codes listed in Language Support. If the source language is not specified, the API will attempt to identify the source language automatically and return it within the response. */
  source?: string;
  /** The `model` type requested for this translation. Valid values are listed in public documentation. */
  model?: string;
}

export const TranslateTextRequest: Schema.Schema<TranslateTextRequest> = Schema.suspend(() => Schema.Struct({
  target: Schema.optional(Schema.String),
  q: Schema.optional(Schema.Array(Schema.String)),
  format: Schema.optional(Schema.String),
  source: Schema.optional(Schema.String),
  model: Schema.optional(Schema.String),
})).annotate({ identifier: "TranslateTextRequest" }) as any as Schema.Schema<TranslateTextRequest>;

export interface DetectLanguageRequest {
  /** The input text upon which to perform language detection. Repeat this parameter to perform language detection on multiple text inputs. */
  q?: Array<string>;
}

export const DetectLanguageRequest: Schema.Schema<DetectLanguageRequest> = Schema.suspend(() => Schema.Struct({
  q: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "DetectLanguageRequest" }) as any as Schema.Schema<DetectLanguageRequest>;

export interface GetSupportedLanguagesRequest {
  /** The language to use to return localized, human readable names of supported languages. */
  target?: string;
}

export const GetSupportedLanguagesRequest: Schema.Schema<GetSupportedLanguagesRequest> = Schema.suspend(() => Schema.Struct({
  target: Schema.optional(Schema.String),
})).annotate({ identifier: "GetSupportedLanguagesRequest" }) as any as Schema.Schema<GetSupportedLanguagesRequest>;

// ==========================================================================
// Operations
// ==========================================================================

export interface ListDetectionsRequest {
  /** Pretty-print response. */
  pp?: boolean;
  /** OAuth bearer token. */
  bearer_token?: string;
  /** The input text upon which to perform language detection. Repeat this parameter to perform language detection on multiple text inputs. */
  q: string[];
}

export const ListDetectionsRequest = Schema.Struct({
  pp: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("pp")),
  bearer_token: Schema.optional(Schema.String).pipe(T.HttpQuery("bearer_token")),
  q: Schema.Array(Schema.String).pipe(T.HttpQuery("q")),
}).pipe(
  T.Http({ method: "GET", path: "v2/detect" }),
  svc,
) as unknown as Schema.Schema<ListDetectionsRequest>;

export type ListDetectionsResponse = DetectionsListResponse;
export const ListDetectionsResponse = DetectionsListResponse;

export type ListDetectionsError = DefaultErrors;

/** Detects the language of text within a request. */
export const listDetections: API.OperationMethod<ListDetectionsRequest, ListDetectionsResponse, ListDetectionsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: ListDetectionsRequest,
  output: ListDetectionsResponse,
  errors: [],
}));

export interface DetectDetectionsRequest {
  /** Pretty-print response. */
  pp?: boolean;
  /** OAuth bearer token. */
  bearer_token?: string;
  /** Request body */
  body?: DetectLanguageRequest;
}

export const DetectDetectionsRequest = Schema.Struct({
  pp: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("pp")),
  bearer_token: Schema.optional(Schema.String).pipe(T.HttpQuery("bearer_token")),
  body: Schema.optional(DetectLanguageRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/detect", hasBody: true }),
  svc,
) as unknown as Schema.Schema<DetectDetectionsRequest>;

export type DetectDetectionsResponse = DetectionsListResponse;
export const DetectDetectionsResponse = DetectionsListResponse;

export type DetectDetectionsError = DefaultErrors;

/** Detects the language of text within a request. */
export const detectDetections: API.OperationMethod<DetectDetectionsRequest, DetectDetectionsResponse, DetectDetectionsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: DetectDetectionsRequest,
  output: DetectDetectionsResponse,
  errors: [],
}));

export interface ListLanguagesRequest {
  /** Pretty-print response. */
  pp?: boolean;
  /** OAuth bearer token. */
  bearer_token?: string;
  /** The language to use to return localized, human readable names of supported languages. */
  target?: string;
  /** The model type for which supported languages should be returned. */
  model?: string;
}

export const ListLanguagesRequest = Schema.Struct({
  pp: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("pp")),
  bearer_token: Schema.optional(Schema.String).pipe(T.HttpQuery("bearer_token")),
  target: Schema.optional(Schema.String).pipe(T.HttpQuery("target")),
  model: Schema.optional(Schema.String).pipe(T.HttpQuery("model")),
}).pipe(
  T.Http({ method: "GET", path: "v2/languages" }),
  svc,
) as unknown as Schema.Schema<ListLanguagesRequest>;

export type ListLanguagesResponse = LanguagesListResponse;
export const ListLanguagesResponse = LanguagesListResponse;

export type ListLanguagesError = DefaultErrors;

/** Returns a list of supported languages for translation. */
export const listLanguages: API.OperationMethod<ListLanguagesRequest, ListLanguagesResponse, ListLanguagesError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: ListLanguagesRequest,
  output: ListLanguagesResponse,
  errors: [],
}));

export interface ListTranslationsRequest {
  /** Pretty-print response. */
  pp?: boolean;
  /** OAuth bearer token. */
  bearer_token?: string;
  /** The customization id for translate */
  cid?: string[];
  /** The format of the source text, in either HTML (default) or plain-text. A value of "html" indicates HTML and a value of "text" indicates plain-text. */
  format?: "html" | "text" | (string & {});
  /** The input text to translate. Repeat this parameter to perform translation operations on multiple text inputs. */
  q: string[];
  /** The language of the source text, set to one of the language codes listed in Language Support. If the source language is not specified, the API will attempt to identify the source language automatically and return it within the response. */
  source?: string;
  /** The language to use for translation of the input text, set to one of the language codes listed in Language Support. */
  target: string;
  /** The `model` type requested for this translation. Valid values are listed in public documentation. */
  model?: string;
}

export const ListTranslationsRequest = Schema.Struct({
  pp: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("pp")),
  bearer_token: Schema.optional(Schema.String).pipe(T.HttpQuery("bearer_token")),
  cid: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("cid")),
  format: Schema.optional(Schema.String).pipe(T.HttpQuery("format")),
  q: Schema.Array(Schema.String).pipe(T.HttpQuery("q")),
  source: Schema.optional(Schema.String).pipe(T.HttpQuery("source")),
  target: Schema.String.pipe(T.HttpQuery("target")),
  model: Schema.optional(Schema.String).pipe(T.HttpQuery("model")),
}).pipe(
  T.Http({ method: "GET", path: "v2" }),
  svc,
) as unknown as Schema.Schema<ListTranslationsRequest>;

export type ListTranslationsResponse = TranslationsListResponse;
export const ListTranslationsResponse = TranslationsListResponse;

export type ListTranslationsError = DefaultErrors;

/** Translates input text, returning translated text. */
export const listTranslations: API.OperationMethod<ListTranslationsRequest, ListTranslationsResponse, ListTranslationsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: ListTranslationsRequest,
  output: ListTranslationsResponse,
  errors: [],
}));

export interface TranslateTranslationsRequest {
  /** Pretty-print response. */
  pp?: boolean;
  /** OAuth bearer token. */
  bearer_token?: string;
  /** Request body */
  body?: TranslateTextRequest;
}

export const TranslateTranslationsRequest = Schema.Struct({
  pp: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("pp")),
  bearer_token: Schema.optional(Schema.String).pipe(T.HttpQuery("bearer_token")),
  body: Schema.optional(TranslateTextRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TranslateTranslationsRequest>;

export type TranslateTranslationsResponse = TranslationsListResponse;
export const TranslateTranslationsResponse = TranslationsListResponse;

export type TranslateTranslationsError = DefaultErrors;

/** Translates input text, returning translated text. */
export const translateTranslations: API.OperationMethod<TranslateTranslationsRequest, TranslateTranslationsResponse, TranslateTranslationsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: TranslateTranslationsRequest,
  output: TranslateTranslationsResponse,
  errors: [],
}));

