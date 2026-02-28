// ==========================================================================
// Cloud Translation API (translate v3)
// DO NOT EDIT - Generated from GCP Discovery Document
// ==========================================================================

import * as Schema from "effect/Schema";
import * as API from "../client/api.ts";
import * as T from "../traits.ts";
import * as C from "../category.ts";
import type { GCPAuth } from "../auth.ts";
import type { CommonErrors } from "../errors.ts";
import type * as HttpClient from "effect/unstable/http/HttpClient";

// Service metadata
const svc = T.Service({
  name: "translate",
  version: "v3",
  rootUrl: "https://translation.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface Location {
  /** Resource name for the location, which may vary between implementations. For example: `"projects/example-project/locations/us-east1"` */
  name?: string;
  /** The canonical id for this location. For example: `"us-east1"`. */
  locationId?: string;
  /** The friendly name for this location, typically a nearby city name. For example, "Tokyo". */
  displayName?: string;
  /** Cross-service attributes for the location. For example {"cloud.googleapis.com/region": "us-east1"} */
  labels?: Record<string, string>;
  /** Service-specific metadata. For example the available capacity at the given location. */
  metadata?: Record<string, unknown>;
}

export const Location: Schema.Schema<Location> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  locationId: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "Location" }) as any as Schema.Schema<Location>;

export interface ListLocationsResponse {
  /** A list of locations that matches the specified filter in the request. */
  locations?: Array<Location>;
  /** The standard List next-page token. */
  nextPageToken?: string;
}

export const ListLocationsResponse: Schema.Schema<ListLocationsResponse> = Schema.suspend(() => Schema.Struct({
  locations: Schema.optional(Schema.Array(Location)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListLocationsResponse" }) as any as Schema.Schema<ListLocationsResponse>;

export interface Status {
  /** The status code, which should be an enum value of google.rpc.Code. */
  code?: number;
  /** A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. */
  message?: string;
  /** A list of messages that carry the error details. There is a common set of message types for APIs to use. */
  details?: Array<Record<string, unknown>>;
}

export const Status: Schema.Schema<Status> = Schema.suspend(() => Schema.Struct({
  code: Schema.optional(Schema.Number),
  message: Schema.optional(Schema.String),
  details: Schema.optional(Schema.Array(Schema.Record(Schema.String, Schema.Unknown))),
})).annotate({ identifier: "Status" }) as any as Schema.Schema<Status>;

export interface Operation {
  /** The server-assigned name, which is only unique within the same service that originally returns it. If you use the default HTTP mapping, the `name` should be a resource name ending with `operations/{unique_id}`. */
  name?: string;
  /** Service-specific metadata associated with the operation. It typically contains progress information and common metadata such as create time. Some services might not provide such metadata. Any method that returns a long-running operation should document the metadata type, if any. */
  metadata?: Record<string, unknown>;
  /** If the value is `false`, it means the operation is still in progress. If `true`, the operation is completed, and either `error` or `response` is available. */
  done?: boolean;
  /** The error result of the operation in case of failure or cancellation. */
  error?: Status;
  /** The normal, successful response of the operation. If the original method returns no data on success, such as `Delete`, the response is `google.protobuf.Empty`. If the original method is standard `Get`/`Create`/`Update`, the response should be the resource. For other methods, the response should have the type `XxxResponse`, where `Xxx` is the original method name. For example, if the original method name is `TakeSnapshot()`, the inferred response type is `TakeSnapshotResponse`. */
  response?: Record<string, unknown>;
}

export const Operation: Schema.Schema<Operation> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  done: Schema.optional(Schema.Boolean),
  error: Schema.optional(Status),
  response: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "Operation" }) as any as Schema.Schema<Operation>;

export interface ListOperationsResponse {
  /** A list of operations that matches the specified filter in the request. */
  operations?: Array<Operation>;
  /** The standard List next-page token. */
  nextPageToken?: string;
  /** Unordered list. Unreachable resources. Populated when the request sets `ListOperationsRequest.return_partial_success` and reads across collections. For example, when attempting to list all resources across all supported locations. */
  unreachable?: Array<string>;
}

export const ListOperationsResponse: Schema.Schema<ListOperationsResponse> = Schema.suspend(() => Schema.Struct({
  operations: Schema.optional(Schema.Array(Operation)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListOperationsResponse" }) as any as Schema.Schema<ListOperationsResponse>;

export interface Empty {
}

export const Empty: Schema.Schema<Empty> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "Empty" }) as any as Schema.Schema<Empty>;

export interface CancelOperationRequest {
}

export const CancelOperationRequest: Schema.Schema<CancelOperationRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "CancelOperationRequest" }) as any as Schema.Schema<CancelOperationRequest>;

export interface WaitOperationRequest {
  /** The maximum duration to wait before timing out. If left blank, the wait will be at most the time permitted by the underlying HTTP/RPC protocol. If RPC context deadline is also specified, the shorter one will be used. */
  timeout?: string;
}

export const WaitOperationRequest: Schema.Schema<WaitOperationRequest> = Schema.suspend(() => Schema.Struct({
  timeout: Schema.optional(Schema.String),
})).annotate({ identifier: "WaitOperationRequest" }) as any as Schema.Schema<WaitOperationRequest>;

export interface TranslateTextGlossaryConfig {
  /** Required. The `glossary` to be applied for this translation. The format depends on the glossary: - User-provided custom glossary: `projects/{project-number-or-id}/locations/{location-id}/glossaries/{glossary-id}` */
  glossary?: string;
  /** Optional. Indicates match is case insensitive. The default value is `false` if missing. */
  ignoreCase?: boolean;
  /** Optional. If set to true, the glossary will be used for contextual translation. */
  contextualTranslationEnabled?: boolean;
}

export const TranslateTextGlossaryConfig: Schema.Schema<TranslateTextGlossaryConfig> = Schema.suspend(() => Schema.Struct({
  glossary: Schema.optional(Schema.String),
  ignoreCase: Schema.optional(Schema.Boolean),
  contextualTranslationEnabled: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "TranslateTextGlossaryConfig" }) as any as Schema.Schema<TranslateTextGlossaryConfig>;

export interface TransliterationConfig {
  /** If true, source text in romanized form can be translated to the target language. */
  enableTransliteration?: boolean;
}

export const TransliterationConfig: Schema.Schema<TransliterationConfig> = Schema.suspend(() => Schema.Struct({
  enableTransliteration: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "TransliterationConfig" }) as any as Schema.Schema<TransliterationConfig>;

export interface TranslateTextRequest {
  /** Required. The content of the input in string format. We recommend the total content be less than 30,000 codepoints. The max length of this field is 1024. Use BatchTranslateText for larger text. */
  contents?: Array<string>;
  /** Optional. The format of the source text, for example, "text/html", "text/plain". If left blank, the MIME type defaults to "text/html". */
  mimeType?: string;
  /** Optional. The ISO-639 language code of the input text if known, for example, "en-US" or "sr-Latn". Supported language codes are listed in [Language Support](https://cloud.google.com/translate/docs/languages). If the source language isn't specified, the API attempts to identify the source language automatically and returns the source language within the response. */
  sourceLanguageCode?: string;
  /** Required. The ISO-639 language code to use for translation of the input text, set to one of the language codes listed in [Language Support](https://cloud.google.com/translate/docs/languages). */
  targetLanguageCode?: string;
  /** Optional. The `model` type requested for this translation. The format depends on model type: - AutoML Translation models: `projects/{project-number-or-id}/locations/{location-id}/models/{model-id}` - General (built-in) models: `projects/{project-number-or-id}/locations/{location-id}/models/general/nmt`, - Translation LLM models: `projects/{project-number-or-id}/locations/{location-id}/models/general/translation-llm`, For global (non-regionalized) requests, use `location-id` `global`. For example, `projects/{project-number-or-id}/locations/global/models/general/nmt`. If not provided, the default Google model (NMT) will be used */
  model?: string;
  /** Optional. Glossary to be applied. The glossary must be within the same region (have the same location-id) as the model, otherwise an INVALID_ARGUMENT (400) error is returned. */
  glossaryConfig?: TranslateTextGlossaryConfig;
  /** Optional. Transliteration to be applied. */
  transliterationConfig?: TransliterationConfig;
  /** Optional. The labels with user-defined metadata for the request. Label keys and values can be no longer than 63 characters (Unicode codepoints), can only contain lowercase letters, numeric characters, underscores and dashes. International characters are allowed. Label values are optional. Label keys must start with a letter. See https://cloud.google.com/translate/docs/advanced/labels for more information. */
  labels?: Record<string, string>;
}

export const TranslateTextRequest: Schema.Schema<TranslateTextRequest> = Schema.suspend(() => Schema.Struct({
  contents: Schema.optional(Schema.Array(Schema.String)),
  mimeType: Schema.optional(Schema.String),
  sourceLanguageCode: Schema.optional(Schema.String),
  targetLanguageCode: Schema.optional(Schema.String),
  model: Schema.optional(Schema.String),
  glossaryConfig: Schema.optional(TranslateTextGlossaryConfig),
  transliterationConfig: Schema.optional(TransliterationConfig),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "TranslateTextRequest" }) as any as Schema.Schema<TranslateTextRequest>;

export interface Translation {
  /** Text translated into the target language. If an error occurs during translation, this field might be excluded from the response. */
  translatedText?: string;
  /** Only present when `model` is present in the request. `model` here is normalized to have project number. For example: If the `model` requested in TranslationTextRequest is `projects/{project-id}/locations/{location-id}/models/general/nmt` then `model` here would be normalized to `projects/{project-number}/locations/{location-id}/models/general/nmt`. */
  model?: string;
  /** The ISO-639 language code of source text in the initial request, detected automatically, if no source language was passed within the initial request. If the source language was passed, auto-detection of the language does not occur and this field is empty. */
  detectedLanguageCode?: string;
  /** The `glossary_config` used for this translation. */
  glossaryConfig?: TranslateTextGlossaryConfig;
}

export const Translation: Schema.Schema<Translation> = Schema.suspend(() => Schema.Struct({
  translatedText: Schema.optional(Schema.String),
  model: Schema.optional(Schema.String),
  detectedLanguageCode: Schema.optional(Schema.String),
  glossaryConfig: Schema.optional(TranslateTextGlossaryConfig),
})).annotate({ identifier: "Translation" }) as any as Schema.Schema<Translation>;

export interface TranslateTextResponse {
  /** Text translation responses with no glossary applied. This field has the same length as `contents`. */
  translations?: Array<Translation>;
  /** Text translation responses if a glossary is provided in the request. This can be the same as `translations` if no terms apply. This field has the same length as `contents`. */
  glossaryTranslations?: Array<Translation>;
}

export const TranslateTextResponse: Schema.Schema<TranslateTextResponse> = Schema.suspend(() => Schema.Struct({
  translations: Schema.optional(Schema.Array(Translation)),
  glossaryTranslations: Schema.optional(Schema.Array(Translation)),
})).annotate({ identifier: "TranslateTextResponse" }) as any as Schema.Schema<TranslateTextResponse>;

export interface RomanizeTextRequest {
  /** Required. The content of the input in string format. */
  contents?: Array<string>;
  /** Optional. The ISO-639 language code of the input text if known, for example, "hi" or "zh". Supported language codes are listed in [Language Support](https://cloud.google.com/translate/docs/languages#roman). If the source language isn't specified, the API attempts to identify the source language automatically and returns the source language for each content in the response. */
  sourceLanguageCode?: string;
}

export const RomanizeTextRequest: Schema.Schema<RomanizeTextRequest> = Schema.suspend(() => Schema.Struct({
  contents: Schema.optional(Schema.Array(Schema.String)),
  sourceLanguageCode: Schema.optional(Schema.String),
})).annotate({ identifier: "RomanizeTextRequest" }) as any as Schema.Schema<RomanizeTextRequest>;

export interface Romanization {
  /** Romanized text. If an error occurs during romanization, this field might be excluded from the response. */
  romanizedText?: string;
  /** The ISO-639 language code of source text in the initial request, detected automatically, if no source language was passed within the initial request. If the source language was passed, auto-detection of the language does not occur and this field is empty. */
  detectedLanguageCode?: string;
}

export const Romanization: Schema.Schema<Romanization> = Schema.suspend(() => Schema.Struct({
  romanizedText: Schema.optional(Schema.String),
  detectedLanguageCode: Schema.optional(Schema.String),
})).annotate({ identifier: "Romanization" }) as any as Schema.Schema<Romanization>;

export interface RomanizeTextResponse {
  /** Text romanization responses. This field has the same length as `contents`. */
  romanizations?: Array<Romanization>;
}

export const RomanizeTextResponse: Schema.Schema<RomanizeTextResponse> = Schema.suspend(() => Schema.Struct({
  romanizations: Schema.optional(Schema.Array(Romanization)),
})).annotate({ identifier: "RomanizeTextResponse" }) as any as Schema.Schema<RomanizeTextResponse>;

export interface GcsSource {
  /** Required. Source data URI. For example, `gs://my_bucket/my_object`. */
  inputUri?: string;
}

export const GcsSource: Schema.Schema<GcsSource> = Schema.suspend(() => Schema.Struct({
  inputUri: Schema.optional(Schema.String),
})).annotate({ identifier: "GcsSource" }) as any as Schema.Schema<GcsSource>;

export interface DocumentInputConfig {
  /** Document's content represented as a stream of bytes. */
  content?: string;
  /** Google Cloud Storage location. This must be a single file. For example: gs://example_bucket/example_file.pdf */
  gcsSource?: GcsSource;
  /** Specifies the input document's mime_type. If not specified it will be determined using the file extension for gcs_source provided files. For a file provided through bytes content the mime_type must be provided. Currently supported mime types are: - application/pdf - application/vnd.openxmlformats-officedocument.wordprocessingml.document - application/vnd.openxmlformats-officedocument.presentationml.presentation - application/vnd.openxmlformats-officedocument.spreadsheetml.sheet */
  mimeType?: string;
}

export const DocumentInputConfig: Schema.Schema<DocumentInputConfig> = Schema.suspend(() => Schema.Struct({
  content: Schema.optional(Schema.String),
  gcsSource: Schema.optional(GcsSource),
  mimeType: Schema.optional(Schema.String),
})).annotate({ identifier: "DocumentInputConfig" }) as any as Schema.Schema<DocumentInputConfig>;

export interface DetectLanguageRequest {
  /** Optional. The language detection model to be used. Format: `projects/{project-number-or-id}/locations/{location-id}/models/language-detection/{model-id}` Only one language detection model is currently supported: `projects/{project-number-or-id}/locations/{location-id}/models/language-detection/default`. If not specified, the default model is used. */
  model?: string;
  /** The content of the input stored as a string. */
  content?: string;
  /** Optional. The document configuration of the input. */
  documentInputConfig?: DocumentInputConfig;
  /** Optional. The format of the source text, for example, "text/html", "text/plain". If left blank, the MIME type defaults to "text/html". */
  mimeType?: string;
  /** Optional. The labels with user-defined metadata for the request. Label keys and values can be no longer than 63 characters (Unicode codepoints), can only contain lowercase letters, numeric characters, underscores and dashes. International characters are allowed. Label values are optional. Label keys must start with a letter. See https://cloud.google.com/translate/docs/advanced/labels for more information. */
  labels?: Record<string, string>;
}

export const DetectLanguageRequest: Schema.Schema<DetectLanguageRequest> = Schema.suspend(() => Schema.Struct({
  model: Schema.optional(Schema.String),
  content: Schema.optional(Schema.String),
  documentInputConfig: Schema.optional(DocumentInputConfig),
  mimeType: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "DetectLanguageRequest" }) as any as Schema.Schema<DetectLanguageRequest>;

export interface DetectedLanguage {
  /** The ISO-639 language code of the source content in the request, detected automatically. */
  languageCode?: string;
  /** The confidence of the detection result for this language. */
  confidence?: number;
}

export const DetectedLanguage: Schema.Schema<DetectedLanguage> = Schema.suspend(() => Schema.Struct({
  languageCode: Schema.optional(Schema.String),
  confidence: Schema.optional(Schema.Number),
})).annotate({ identifier: "DetectedLanguage" }) as any as Schema.Schema<DetectedLanguage>;

export interface DetectLanguageResponse {
  /** The most probable language detected by the Translation API. For each request, the Translation API will always return only one result. */
  languages?: Array<DetectedLanguage>;
}

export const DetectLanguageResponse: Schema.Schema<DetectLanguageResponse> = Schema.suspend(() => Schema.Struct({
  languages: Schema.optional(Schema.Array(DetectedLanguage)),
})).annotate({ identifier: "DetectLanguageResponse" }) as any as Schema.Schema<DetectLanguageResponse>;

export interface SupportedLanguage {
  /** Supported language code, generally consisting of its ISO 639-1 identifier, for example, 'en', 'ja'. In certain cases, ISO-639 codes including language and region identifiers are returned (for example, 'zh-TW' and 'zh-CN'). */
  languageCode?: string;
  /** Human-readable name of the language localized in the display language specified in the request. */
  displayName?: string;
  /** Can be used as a source language. */
  supportSource?: boolean;
  /** Can be used as a target language. */
  supportTarget?: boolean;
}

export const SupportedLanguage: Schema.Schema<SupportedLanguage> = Schema.suspend(() => Schema.Struct({
  languageCode: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  supportSource: Schema.optional(Schema.Boolean),
  supportTarget: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "SupportedLanguage" }) as any as Schema.Schema<SupportedLanguage>;

export interface SupportedLanguages {
  /** A list of supported language responses. This list contains an entry for each language the Translation API supports. */
  languages?: Array<SupportedLanguage>;
}

export const SupportedLanguages: Schema.Schema<SupportedLanguages> = Schema.suspend(() => Schema.Struct({
  languages: Schema.optional(Schema.Array(SupportedLanguage)),
})).annotate({ identifier: "SupportedLanguages" }) as any as Schema.Schema<SupportedLanguages>;

export interface GcsDestination {
  /** Required. The bucket used in 'output_uri_prefix' must exist and there must be no files under 'output_uri_prefix'. 'output_uri_prefix' must end with "/" and start with "gs://". One 'output_uri_prefix' can only be used by one batch translation job at a time. Otherwise an INVALID_ARGUMENT (400) error is returned. */
  outputUriPrefix?: string;
}

export const GcsDestination: Schema.Schema<GcsDestination> = Schema.suspend(() => Schema.Struct({
  outputUriPrefix: Schema.optional(Schema.String),
})).annotate({ identifier: "GcsDestination" }) as any as Schema.Schema<GcsDestination>;

export interface DocumentOutputConfig {
  /** Optional. Google Cloud Storage destination for the translation output, e.g., `gs://my_bucket/my_directory/`. The destination directory provided does not have to be empty, but the bucket must exist. If a file with the same name as the output file already exists in the destination an error will be returned. For a DocumentInputConfig.contents provided document, the output file will have the name "output_[trg]_translations.[ext]", where - [trg] corresponds to the translated file's language code, - [ext] corresponds to the translated file's extension according to its mime type. For a DocumentInputConfig.gcs_uri provided document, the output file will have a name according to its URI. For example: an input file with URI: `gs://a/b/c.[extension]` stored in a gcs_destination bucket with name "my_bucket" will have an output URI: `gs://my_bucket/a_b_c_[trg]_translations.[ext]`, where - [trg] corresponds to the translated file's language code, - [ext] corresponds to the translated file's extension according to its mime type. If the document was directly provided through the request, then the output document will have the format: `gs://my_bucket/translated_document_[trg]_translations.[ext]`, where - [trg] corresponds to the translated file's language code, - [ext] corresponds to the translated file's extension according to its mime type. If a glossary was provided, then the output URI for the glossary translation will be equal to the default output URI but have `glossary_translations` instead of `translations`. For the previous example, its glossary URI would be: `gs://my_bucket/a_b_c_[trg]_glossary_translations.[ext]`. Thus the max number of output files will be 2 (Translated document, Glossary translated document). Callers should expect no partial outputs. If there is any error during document translation, no output will be stored in the Cloud Storage bucket. */
  gcsDestination?: GcsDestination;
  /** Optional. Specifies the translated document's mime_type. If not specified, the translated file's mime type will be the same as the input file's mime type. Currently only support the output mime type to be the same as input mime type. - application/pdf - application/vnd.openxmlformats-officedocument.wordprocessingml.document - application/vnd.openxmlformats-officedocument.presentationml.presentation - application/vnd.openxmlformats-officedocument.spreadsheetml.sheet */
  mimeType?: string;
}

export const DocumentOutputConfig: Schema.Schema<DocumentOutputConfig> = Schema.suspend(() => Schema.Struct({
  gcsDestination: Schema.optional(GcsDestination),
  mimeType: Schema.optional(Schema.String),
})).annotate({ identifier: "DocumentOutputConfig" }) as any as Schema.Schema<DocumentOutputConfig>;

export interface TranslateDocumentRequest {
  /** Optional. The ISO-639 language code of the input document if known, for example, "en-US" or "sr-Latn". Supported language codes are listed in [Language Support](https://cloud.google.com/translate/docs/languages). If the source language isn't specified, the API attempts to identify the source language automatically and returns the source language within the response. Source language must be specified if the request contains a glossary or a custom model. */
  sourceLanguageCode?: string;
  /** Required. The ISO-639 language code to use for translation of the input document, set to one of the language codes listed in [Language Support](https://cloud.google.com/translate/docs/languages). */
  targetLanguageCode?: string;
  /** Required. Input configurations. */
  documentInputConfig?: DocumentInputConfig;
  /** Optional. Output configurations. Defines if the output file should be stored within Cloud Storage as well as the desired output format. If not provided the translated file will only be returned through a byte-stream and its output mime type will be the same as the input file's mime type. */
  documentOutputConfig?: DocumentOutputConfig;
  /** Optional. The `model` type requested for this translation. The format depends on model type: - AutoML Translation models: `projects/{project-number-or-id}/locations/{location-id}/models/{model-id}` - General (built-in) models: `projects/{project-number-or-id}/locations/{location-id}/models/general/nmt`, If not provided, the default Google model (NMT) will be used for translation. */
  model?: string;
  /** Optional. Glossary to be applied. The glossary must be within the same region (have the same location-id) as the model, otherwise an INVALID_ARGUMENT (400) error is returned. */
  glossaryConfig?: TranslateTextGlossaryConfig;
  /** Optional. The labels with user-defined metadata for the request. Label keys and values can be no longer than 63 characters (Unicode codepoints), can only contain lowercase letters, numeric characters, underscores and dashes. International characters are allowed. Label values are optional. Label keys must start with a letter. See https://cloud.google.com/translate/docs/advanced/labels for more information. */
  labels?: Record<string, string>;
  /** Optional. This flag is to support user customized attribution. If not provided, the default is `Machine Translated by Google`. Customized attribution should follow rules in https://cloud.google.com/translate/attribution#attribution_and_logos */
  customizedAttribution?: string;
  /** Optional. is_translate_native_pdf_only field for external customers. If true, the page limit of online native pdf translation is 300 and only native pdf pages will be translated. */
  isTranslateNativePdfOnly?: boolean;
  /** Optional. If true, use the text removal server to remove the shadow text on background image for native pdf translation. Shadow removal feature can only be enabled when is_translate_native_pdf_only: false && pdf_native_only: false */
  enableShadowRemovalNativePdf?: boolean;
  /** Optional. If true, enable auto rotation correction in DVS. */
  enableRotationCorrection?: boolean;
}

export const TranslateDocumentRequest: Schema.Schema<TranslateDocumentRequest> = Schema.suspend(() => Schema.Struct({
  sourceLanguageCode: Schema.optional(Schema.String),
  targetLanguageCode: Schema.optional(Schema.String),
  documentInputConfig: Schema.optional(DocumentInputConfig),
  documentOutputConfig: Schema.optional(DocumentOutputConfig),
  model: Schema.optional(Schema.String),
  glossaryConfig: Schema.optional(TranslateTextGlossaryConfig),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  customizedAttribution: Schema.optional(Schema.String),
  isTranslateNativePdfOnly: Schema.optional(Schema.Boolean),
  enableShadowRemovalNativePdf: Schema.optional(Schema.Boolean),
  enableRotationCorrection: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "TranslateDocumentRequest" }) as any as Schema.Schema<TranslateDocumentRequest>;

export interface DocumentTranslation {
  /** The array of translated documents. It is expected to be size 1 for now. We may produce multiple translated documents in the future for other type of file formats. */
  byteStreamOutputs?: Array<string>;
  /** The translated document's mime type. */
  mimeType?: string;
  /** The detected language for the input document. If the user did not provide the source language for the input document, this field will have the language code automatically detected. If the source language was passed, auto-detection of the language does not occur and this field is empty. */
  detectedLanguageCode?: string;
}

export const DocumentTranslation: Schema.Schema<DocumentTranslation> = Schema.suspend(() => Schema.Struct({
  byteStreamOutputs: Schema.optional(Schema.Array(Schema.String)),
  mimeType: Schema.optional(Schema.String),
  detectedLanguageCode: Schema.optional(Schema.String),
})).annotate({ identifier: "DocumentTranslation" }) as any as Schema.Schema<DocumentTranslation>;

export interface TranslateDocumentResponse {
  /** Translated document. */
  documentTranslation?: DocumentTranslation;
  /** The document's translation output if a glossary is provided in the request. This can be the same as [TranslateDocumentResponse.document_translation] if no glossary terms apply. */
  glossaryDocumentTranslation?: DocumentTranslation;
  /** Only present when 'model' is present in the request. 'model' is normalized to have a project number. For example: If the 'model' field in TranslateDocumentRequest is: `projects/{project-id}/locations/{location-id}/models/general/nmt` then `model` here would be normalized to `projects/{project-number}/locations/{location-id}/models/general/nmt`. */
  model?: string;
  /** The `glossary_config` used for this translation. */
  glossaryConfig?: TranslateTextGlossaryConfig;
}

export const TranslateDocumentResponse: Schema.Schema<TranslateDocumentResponse> = Schema.suspend(() => Schema.Struct({
  documentTranslation: Schema.optional(DocumentTranslation),
  glossaryDocumentTranslation: Schema.optional(DocumentTranslation),
  model: Schema.optional(Schema.String),
  glossaryConfig: Schema.optional(TranslateTextGlossaryConfig),
})).annotate({ identifier: "TranslateDocumentResponse" }) as any as Schema.Schema<TranslateDocumentResponse>;

export interface InputConfig {
  /** Optional. Can be "text/plain" or "text/html". For `.tsv`, "text/html" is used if mime_type is missing. For `.html`, this field must be "text/html" or empty. For `.txt`, this field must be "text/plain" or empty. */
  mimeType?: string;
  /** Required. Google Cloud Storage location for the source input. This can be a single file (for example, `gs://translation-test/input.tsv`) or a wildcard (for example, `gs://translation-test/*`). If a file extension is `.tsv`, it can contain either one or two columns. The first column (optional) is the id of the text request. If the first column is missing, we use the row number (0-based) from the input file as the ID in the output file. The second column is the actual text to be translated. We recommend each row be <= 10K Unicode codepoints, otherwise an error might be returned. Note that the input tsv must be RFC 4180 compliant. You could use https://github.com/Clever/csvlint to check potential formatting errors in your tsv file. csvlint --delimiter='\t' your_input_file.tsv The other supported file extensions are `.txt` or `.html`, which is treated as a single large chunk of text. */
  gcsSource?: GcsSource;
}

export const InputConfig: Schema.Schema<InputConfig> = Schema.suspend(() => Schema.Struct({
  mimeType: Schema.optional(Schema.String),
  gcsSource: Schema.optional(GcsSource),
})).annotate({ identifier: "InputConfig" }) as any as Schema.Schema<InputConfig>;

export interface OutputConfig {
  /** Google Cloud Storage destination for output content. For every single input file (for example, gs://a/b/c.[extension]), we generate at most 2 * n output files. (n is the # of target_language_codes in the BatchTranslateTextRequest). Output files (tsv) generated are compliant with RFC 4180 except that record delimiters are '\n' instead of '\r\n'. We don't provide any way to change record delimiters. While the input files are being processed, we write/update an index file 'index.csv' under 'output_uri_prefix' (for example, gs://translation-test/index.csv) The index file is generated/updated as new files are being translated. The format is: input_file,target_language_code,translations_file,errors_file, glossary_translations_file,glossary_errors_file input_file is one file we matched using gcs_source.input_uri. target_language_code is provided in the request. translations_file contains the translations. (details provided below) errors_file contains the errors during processing of the file. (details below). Both translations_file and errors_file could be empty strings if we have no content to output. glossary_translations_file and glossary_errors_file are always empty strings if the input_file is tsv. They could also be empty if we have no content to output. Once a row is present in index.csv, the input/output matching never changes. Callers should also expect all the content in input_file are processed and ready to be consumed (that is, no partial output file is written). Since index.csv will be keeping updated during the process, please make sure there is no custom retention policy applied on the output bucket that may avoid file updating. (https://cloud.google.com/storage/docs/bucket-lock#retention-policy) The format of translations_file (for target language code 'trg') is: `gs://translation_test/a_b_c_'trg'_translations.[extension]` If the input file extension is tsv, the output has the following columns: Column 1: ID of the request provided in the input, if it's not provided in the input, then the input row number is used (0-based). Column 2: source sentence. Column 3: translation without applying a glossary. Empty string if there is an error. Column 4 (only present if a glossary is provided in the request): translation after applying the glossary. Empty string if there is an error applying the glossary. Could be same string as column 3 if there is no glossary applied. If input file extension is a txt or html, the translation is directly written to the output file. If glossary is requested, a separate glossary_translations_file has format of `gs://translation_test/a_b_c_'trg'_glossary_translations.[extension]` The format of errors file (for target language code 'trg') is: `gs://translation_test/a_b_c_'trg'_errors.[extension]` If the input file extension is tsv, errors_file contains the following: Column 1: ID of the request provided in the input, if it's not provided in the input, then the input row number is used (0-based). Column 2: source sentence. Column 3: Error detail for the translation. Could be empty. Column 4 (only present if a glossary is provided in the request): Error when applying the glossary. If the input file extension is txt or html, glossary_error_file will be generated that contains error details. glossary_error_file has format of `gs://translation_test/a_b_c_'trg'_glossary_errors.[extension]` */
  gcsDestination?: GcsDestination;
}

export const OutputConfig: Schema.Schema<OutputConfig> = Schema.suspend(() => Schema.Struct({
  gcsDestination: Schema.optional(GcsDestination),
})).annotate({ identifier: "OutputConfig" }) as any as Schema.Schema<OutputConfig>;

export interface BatchTranslateTextRequest {
  /** Required. Source language code. Supported language codes are listed in [Language Support](https://cloud.google.com/translate/docs/languages). */
  sourceLanguageCode?: string;
  /** Required. Specify up to 10 language codes here. Supported language codes are listed in [Language Support](https://cloud.google.com/translate/docs/languages). */
  targetLanguageCodes?: Array<string>;
  /** Optional. The models to use for translation. Map's key is target language code. Map's value is model name. Value can be a built-in general model, or an AutoML Translation model. The value format depends on model type: - AutoML Translation models: `projects/{project-number-or-id}/locations/{location-id}/models/{model-id}` - General (built-in) models: `projects/{project-number-or-id}/locations/{location-id}/models/general/nmt`, If the map is empty or a specific model is not requested for a language pair, then default google model (nmt) is used. */
  models?: Record<string, string>;
  /** Required. Input configurations. The total number of files matched should be <= 100. The total content size should be <= 100M Unicode codepoints. The files must use UTF-8 encoding. */
  inputConfigs?: Array<InputConfig>;
  /** Required. Output configuration. If 2 input configs match to the same file (that is, same input path), we don't generate output for duplicate inputs. */
  outputConfig?: OutputConfig;
  /** Optional. Glossaries to be applied for translation. It's keyed by target language code. */
  glossaries?: Record<string, TranslateTextGlossaryConfig>;
  /** Optional. The labels with user-defined metadata for the request. Label keys and values can be no longer than 63 characters (Unicode codepoints), can only contain lowercase letters, numeric characters, underscores and dashes. International characters are allowed. Label values are optional. Label keys must start with a letter. See https://cloud.google.com/translate/docs/advanced/labels for more information. */
  labels?: Record<string, string>;
}

export const BatchTranslateTextRequest: Schema.Schema<BatchTranslateTextRequest> = Schema.suspend(() => Schema.Struct({
  sourceLanguageCode: Schema.optional(Schema.String),
  targetLanguageCodes: Schema.optional(Schema.Array(Schema.String)),
  models: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  inputConfigs: Schema.optional(Schema.Array(InputConfig)),
  outputConfig: Schema.optional(OutputConfig),
  glossaries: Schema.optional(Schema.Record(Schema.String, TranslateTextGlossaryConfig)),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "BatchTranslateTextRequest" }) as any as Schema.Schema<BatchTranslateTextRequest>;

export interface BatchDocumentInputConfig {
  /** Google Cloud Storage location for the source input. This can be a single file (for example, `gs://translation-test/input.docx`) or a wildcard (for example, `gs://translation-test/*`). File mime type is determined based on extension. Supported mime type includes: - `pdf`, application/pdf - `docx`, application/vnd.openxmlformats-officedocument.wordprocessingml.document - `pptx`, application/vnd.openxmlformats-officedocument.presentationml.presentation - `xlsx`, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet The max file size to support for `.docx`, `.pptx` and `.xlsx` is 100MB. The max file size to support for `.pdf` is 1GB and the max page limit is 1000 pages. The max file size to support for all input documents is 1GB. */
  gcsSource?: GcsSource;
}

export const BatchDocumentInputConfig: Schema.Schema<BatchDocumentInputConfig> = Schema.suspend(() => Schema.Struct({
  gcsSource: Schema.optional(GcsSource),
})).annotate({ identifier: "BatchDocumentInputConfig" }) as any as Schema.Schema<BatchDocumentInputConfig>;

export interface BatchDocumentOutputConfig {
  /** Google Cloud Storage destination for output content. For every single input document (for example, gs://a/b/c.[extension]), we generate at most 2 * n output files. (n is the # of target_language_codes in the BatchTranslateDocumentRequest). While the input documents are being processed, we write/update an index file `index.csv` under `gcs_destination.output_uri_prefix` (for example, gs://translation_output/index.csv) The index file is generated/updated as new files are being translated. The format is: input_document,target_language_code,translation_output,error_output, glossary_translation_output,glossary_error_output `input_document` is one file we matched using gcs_source.input_uri. `target_language_code` is provided in the request. `translation_output` contains the translations. (details provided below) `error_output` contains the error message during processing of the file. Both translations_file and errors_file could be empty strings if we have no content to output. `glossary_translation_output` and `glossary_error_output` are the translated output/error when we apply glossaries. They could also be empty if we have no content to output. Once a row is present in index.csv, the input/output matching never changes. Callers should also expect all the content in input_file are processed and ready to be consumed (that is, no partial output file is written). Since index.csv will be keeping updated during the process, please make sure there is no custom retention policy applied on the output bucket that may avoid file updating. (https://cloud.google.com/storage/docs/bucket-lock#retention-policy) The naming format of translation output files follows (for target language code [trg]): `translation_output`: `gs://translation_output/a_b_c_[trg]_translation.[extension]` `glossary_translation_output`: `gs://translation_test/a_b_c_[trg]_glossary_translation.[extension]`. The output document will maintain the same file format as the input document. The naming format of error output files follows (for target language code [trg]): `error_output`: `gs://translation_test/a_b_c_[trg]_errors.txt` `glossary_error_output`: `gs://translation_test/a_b_c_[trg]_glossary_translation.txt`. The error output is a txt file containing error details. */
  gcsDestination?: GcsDestination;
}

export const BatchDocumentOutputConfig: Schema.Schema<BatchDocumentOutputConfig> = Schema.suspend(() => Schema.Struct({
  gcsDestination: Schema.optional(GcsDestination),
})).annotate({ identifier: "BatchDocumentOutputConfig" }) as any as Schema.Schema<BatchDocumentOutputConfig>;

export interface BatchTranslateDocumentRequest {
  /** Required. The ISO-639 language code of the input document if known, for example, "en-US" or "sr-Latn". Supported language codes are listed in [Language Support](https://cloud.google.com/translate/docs/languages). */
  sourceLanguageCode?: string;
  /** Required. The ISO-639 language code to use for translation of the input document. Specify up to 10 language codes here. Supported language codes are listed in [Language Support](https://cloud.google.com/translate/docs/languages). */
  targetLanguageCodes?: Array<string>;
  /** Required. Input configurations. The total number of files matched should be <= 100. The total content size to translate should be <= 100M Unicode codepoints. The files must use UTF-8 encoding. */
  inputConfigs?: Array<BatchDocumentInputConfig>;
  /** Required. Output configuration. If 2 input configs match to the same file (that is, same input path), we don't generate output for duplicate inputs. */
  outputConfig?: BatchDocumentOutputConfig;
  /** Optional. The models to use for translation. Map's key is target language code. Map's value is the model name. Value can be a built-in general model, or an AutoML Translation model. The value format depends on model type: - AutoML Translation models: `projects/{project-number-or-id}/locations/{location-id}/models/{model-id}` - General (built-in) models: `projects/{project-number-or-id}/locations/{location-id}/models/general/nmt`, If the map is empty or a specific model is not requested for a language pair, then default google model (nmt) is used. */
  models?: Record<string, string>;
  /** Optional. Glossaries to be applied. It's keyed by target language code. */
  glossaries?: Record<string, TranslateTextGlossaryConfig>;
  /** Optional. The file format conversion map that is applied to all input files. The map key is the original mime_type. The map value is the target mime_type of translated documents. Supported file format conversion includes: - `application/pdf` to `application/vnd.openxmlformats-officedocument.wordprocessingml.document` If nothing specified, output files will be in the same format as the original file. */
  formatConversions?: Record<string, string>;
  /** Optional. This flag is to support user customized attribution. If not provided, the default is `Machine Translated by Google`. Customized attribution should follow rules in https://cloud.google.com/translate/attribution#attribution_and_logos */
  customizedAttribution?: string;
  /** Optional. If true, use the text removal server to remove the shadow text on background image for native pdf translation. Shadow removal feature can only be enabled when is_translate_native_pdf_only: false && pdf_native_only: false */
  enableShadowRemovalNativePdf?: boolean;
  /** Optional. If true, enable auto rotation correction in DVS. */
  enableRotationCorrection?: boolean;
  /** Optional. If true, only native pdf pages will be translated. */
  pdfNativeOnly?: boolean;
}

export const BatchTranslateDocumentRequest: Schema.Schema<BatchTranslateDocumentRequest> = Schema.suspend(() => Schema.Struct({
  sourceLanguageCode: Schema.optional(Schema.String),
  targetLanguageCodes: Schema.optional(Schema.Array(Schema.String)),
  inputConfigs: Schema.optional(Schema.Array(BatchDocumentInputConfig)),
  outputConfig: Schema.optional(BatchDocumentOutputConfig),
  models: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  glossaries: Schema.optional(Schema.Record(Schema.String, TranslateTextGlossaryConfig)),
  formatConversions: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  customizedAttribution: Schema.optional(Schema.String),
  enableShadowRemovalNativePdf: Schema.optional(Schema.Boolean),
  enableRotationCorrection: Schema.optional(Schema.Boolean),
  pdfNativeOnly: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "BatchTranslateDocumentRequest" }) as any as Schema.Schema<BatchTranslateDocumentRequest>;

export interface LanguageCodePair {
  /** Required. The ISO-639 language code of the input text, for example, "en-US". Expected to be an exact match for GlossaryTerm.language_code. */
  sourceLanguageCode?: string;
  /** Required. The ISO-639 language code for translation output, for example, "zh-CN". Expected to be an exact match for GlossaryTerm.language_code. */
  targetLanguageCode?: string;
}

export const LanguageCodePair: Schema.Schema<LanguageCodePair> = Schema.suspend(() => Schema.Struct({
  sourceLanguageCode: Schema.optional(Schema.String),
  targetLanguageCode: Schema.optional(Schema.String),
})).annotate({ identifier: "LanguageCodePair" }) as any as Schema.Schema<LanguageCodePair>;

export interface LanguageCodesSet {
  /** Optional. The ISO-639 language code(s) for terms defined in the glossary. All entries are unique. The list contains at least two entries. Expected to be an exact match for GlossaryTerm.language_code. */
  languageCodes?: Array<string>;
}

export const LanguageCodesSet: Schema.Schema<LanguageCodesSet> = Schema.suspend(() => Schema.Struct({
  languageCodes: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "LanguageCodesSet" }) as any as Schema.Schema<LanguageCodesSet>;

export interface GlossaryInputConfig {
  /** Required. Google Cloud Storage location of glossary data. File format is determined based on the filename extension. API returns [google.rpc.Code.INVALID_ARGUMENT] for unsupported URI-s and file formats. Wildcards are not allowed. This must be a single file in one of the following formats: For unidirectional glossaries: - TSV/CSV (`.tsv`/`.csv`): Two column file, tab- or comma-separated. The first column is source text. The second column is target text. No headers in this file. The first row contains data and not column names. - TMX (`.tmx`): TMX file with parallel data defining source/target term pairs. For equivalent term sets glossaries: - CSV (`.csv`): Multi-column CSV file defining equivalent glossary terms in multiple languages. See documentation for more information - [glossaries](https://cloud.google.com/translate/docs/advanced/glossary). */
  gcsSource?: GcsSource;
}

export const GlossaryInputConfig: Schema.Schema<GlossaryInputConfig> = Schema.suspend(() => Schema.Struct({
  gcsSource: Schema.optional(GcsSource),
})).annotate({ identifier: "GlossaryInputConfig" }) as any as Schema.Schema<GlossaryInputConfig>;

export interface Glossary {
  /** Identifier. The resource name of the glossary. Glossary names have the form `projects/{project-number-or-id}/locations/{location-id}/glossaries/{glossary-id}`. */
  name?: string;
  /** Used with unidirectional glossaries. */
  languagePair?: LanguageCodePair;
  /** Used with equivalent term set glossaries. */
  languageCodesSet?: LanguageCodesSet;
  /** Required. Provides examples to build the glossary from. Total glossary must not exceed 10M Unicode codepoints. */
  inputConfig?: GlossaryInputConfig;
  /** Output only. The number of entries defined in the glossary. */
  entryCount?: number;
  /** Output only. When CreateGlossary was called. */
  submitTime?: string;
  /** Output only. When the glossary creation was finished. */
  endTime?: string;
  /** Optional. The display name of the glossary. */
  displayName?: string;
}

export const Glossary: Schema.Schema<Glossary> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  languagePair: Schema.optional(LanguageCodePair),
  languageCodesSet: Schema.optional(LanguageCodesSet),
  inputConfig: Schema.optional(GlossaryInputConfig),
  entryCount: Schema.optional(Schema.Number),
  submitTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
})).annotate({ identifier: "Glossary" }) as any as Schema.Schema<Glossary>;

export interface ListGlossariesResponse {
  /** The list of glossaries for a project. */
  glossaries?: Array<Glossary>;
  /** A token to retrieve a page of results. Pass this value in the [ListGlossariesRequest.page_token] field in the subsequent call to `ListGlossaries` method to retrieve the next page of results. */
  nextPageToken?: string;
}

export const ListGlossariesResponse: Schema.Schema<ListGlossariesResponse> = Schema.suspend(() => Schema.Struct({
  glossaries: Schema.optional(Schema.Array(Glossary)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListGlossariesResponse" }) as any as Schema.Schema<ListGlossariesResponse>;

export interface GlossaryTerm {
  /** The language for this glossary term. */
  languageCode?: string;
  /** The text for the glossary term. */
  text?: string;
}

export const GlossaryTerm: Schema.Schema<GlossaryTerm> = Schema.suspend(() => Schema.Struct({
  languageCode: Schema.optional(Schema.String),
  text: Schema.optional(Schema.String),
})).annotate({ identifier: "GlossaryTerm" }) as any as Schema.Schema<GlossaryTerm>;

export interface GlossaryTermsPair {
  /** The source term is the term that will get match in the text, */
  sourceTerm?: GlossaryTerm;
  /** The term that will replace the match source term. */
  targetTerm?: GlossaryTerm;
}

export const GlossaryTermsPair: Schema.Schema<GlossaryTermsPair> = Schema.suspend(() => Schema.Struct({
  sourceTerm: Schema.optional(GlossaryTerm),
  targetTerm: Schema.optional(GlossaryTerm),
})).annotate({ identifier: "GlossaryTermsPair" }) as any as Schema.Schema<GlossaryTermsPair>;

export interface GlossaryTermsSet {
  /** Each term in the set represents a term that can be replaced by the other terms. */
  terms?: Array<GlossaryTerm>;
}

export const GlossaryTermsSet: Schema.Schema<GlossaryTermsSet> = Schema.suspend(() => Schema.Struct({
  terms: Schema.optional(Schema.Array(GlossaryTerm)),
})).annotate({ identifier: "GlossaryTermsSet" }) as any as Schema.Schema<GlossaryTermsSet>;

export interface GlossaryEntry {
  /** Identifier. The resource name of the entry. Format: `projects/* /locations/* /glossaries/* /glossaryEntries/*` */
  name?: string;
  /** Used for an unidirectional glossary. */
  termsPair?: GlossaryTermsPair;
  /** Used for an equivalent term sets glossary. */
  termsSet?: GlossaryTermsSet;
  /** Describes the glossary entry. */
  description?: string;
}

export const GlossaryEntry: Schema.Schema<GlossaryEntry> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  termsPair: Schema.optional(GlossaryTermsPair),
  termsSet: Schema.optional(GlossaryTermsSet),
  description: Schema.optional(Schema.String),
})).annotate({ identifier: "GlossaryEntry" }) as any as Schema.Schema<GlossaryEntry>;

export interface ListGlossaryEntriesResponse {
  /** Optional. The Glossary Entries */
  glossaryEntries?: Array<GlossaryEntry>;
  /** Optional. A token to retrieve a page of results. Pass this value in the [ListGLossaryEntriesRequest.page_token] field in the subsequent calls. */
  nextPageToken?: string;
}

export const ListGlossaryEntriesResponse: Schema.Schema<ListGlossaryEntriesResponse> = Schema.suspend(() => Schema.Struct({
  glossaryEntries: Schema.optional(Schema.Array(GlossaryEntry)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListGlossaryEntriesResponse" }) as any as Schema.Schema<ListGlossaryEntriesResponse>;

export interface Dataset {
  /** The resource name of the dataset, in form of `projects/{project-number-or-id}/locations/{location_id}/datasets/{dataset_id}` */
  name?: string;
  /** The name of the dataset to show in the interface. The name can be up to 32 characters long and can consist only of ASCII Latin letters A-Z and a-z, underscores (_), and ASCII digits 0-9. */
  displayName?: string;
  /** The BCP-47 language code of the source language. */
  sourceLanguageCode?: string;
  /** The BCP-47 language code of the target language. */
  targetLanguageCode?: string;
  /** Output only. The number of examples in the dataset. */
  exampleCount?: number;
  /** Output only. Number of training examples (sentence pairs). */
  trainExampleCount?: number;
  /** Output only. Number of validation examples (sentence pairs). */
  validateExampleCount?: number;
  /** Output only. Number of test examples (sentence pairs). */
  testExampleCount?: number;
  /** Output only. Timestamp when this dataset was created. */
  createTime?: string;
  /** Output only. Timestamp when this dataset was last updated. */
  updateTime?: string;
}

export const Dataset: Schema.Schema<Dataset> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  sourceLanguageCode: Schema.optional(Schema.String),
  targetLanguageCode: Schema.optional(Schema.String),
  exampleCount: Schema.optional(Schema.Number),
  trainExampleCount: Schema.optional(Schema.Number),
  validateExampleCount: Schema.optional(Schema.Number),
  testExampleCount: Schema.optional(Schema.Number),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
})).annotate({ identifier: "Dataset" }) as any as Schema.Schema<Dataset>;

export interface ListDatasetsResponse {
  /** The datasets read. */
  datasets?: Array<Dataset>;
  /** A token to retrieve next page of results. Pass this token to the page_token field in the ListDatasetsRequest to obtain the corresponding page. */
  nextPageToken?: string;
}

export const ListDatasetsResponse: Schema.Schema<ListDatasetsResponse> = Schema.suspend(() => Schema.Struct({
  datasets: Schema.optional(Schema.Array(Dataset)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListDatasetsResponse" }) as any as Schema.Schema<ListDatasetsResponse>;

export interface AdaptiveMtDataset {
  /** Identifier. The resource name of the dataset, in form of `projects/{project-number-or-id}/locations/{location_id}/adaptiveMtDatasets/{dataset_id}` */
  name?: string;
  /** The name of the dataset to show in the interface. The name can be up to 32 characters long and can consist only of ASCII Latin letters A-Z and a-z, underscores (_), and ASCII digits 0-9. */
  displayName?: string;
  /** The BCP-47 language code of the source language. */
  sourceLanguageCode?: string;
  /** The BCP-47 language code of the target language. */
  targetLanguageCode?: string;
  /** The number of examples in the dataset. */
  exampleCount?: number;
  /** Output only. Timestamp when this dataset was created. */
  createTime?: string;
  /** Output only. Timestamp when this dataset was last updated. */
  updateTime?: string;
}

export const AdaptiveMtDataset: Schema.Schema<AdaptiveMtDataset> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  sourceLanguageCode: Schema.optional(Schema.String),
  targetLanguageCode: Schema.optional(Schema.String),
  exampleCount: Schema.optional(Schema.Number),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
})).annotate({ identifier: "AdaptiveMtDataset" }) as any as Schema.Schema<AdaptiveMtDataset>;

export interface ListAdaptiveMtDatasetsResponse {
  /** Output only. A list of Adaptive MT datasets. */
  adaptiveMtDatasets?: Array<AdaptiveMtDataset>;
  /** Optional. A token to retrieve a page of results. Pass this value in the [ListAdaptiveMtDatasetsRequest.page_token] field in the subsequent call to `ListAdaptiveMtDatasets` method to retrieve the next page of results. */
  nextPageToken?: string;
}

export const ListAdaptiveMtDatasetsResponse: Schema.Schema<ListAdaptiveMtDatasetsResponse> = Schema.suspend(() => Schema.Struct({
  adaptiveMtDatasets: Schema.optional(Schema.Array(AdaptiveMtDataset)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListAdaptiveMtDatasetsResponse" }) as any as Schema.Schema<ListAdaptiveMtDatasetsResponse>;

export interface ReferenceSentencePair {
  /** Source sentence in the sentence pair. */
  sourceSentence?: string;
  /** Target sentence in the sentence pair. */
  targetSentence?: string;
}

export const ReferenceSentencePair: Schema.Schema<ReferenceSentencePair> = Schema.suspend(() => Schema.Struct({
  sourceSentence: Schema.optional(Schema.String),
  targetSentence: Schema.optional(Schema.String),
})).annotate({ identifier: "ReferenceSentencePair" }) as any as Schema.Schema<ReferenceSentencePair>;

export interface ReferenceSentencePairList {
  /** Reference sentence pairs. */
  referenceSentencePairs?: Array<ReferenceSentencePair>;
}

export const ReferenceSentencePairList: Schema.Schema<ReferenceSentencePairList> = Schema.suspend(() => Schema.Struct({
  referenceSentencePairs: Schema.optional(Schema.Array(ReferenceSentencePair)),
})).annotate({ identifier: "ReferenceSentencePairList" }) as any as Schema.Schema<ReferenceSentencePairList>;

export interface ReferenceSentenceConfig {
  /** Reference sentences pair lists. Each list will be used as the references to translate the sentence under "content" field at the corresponding index. Length of the list is required to be equal to the length of "content" field. */
  referenceSentencePairLists?: Array<ReferenceSentencePairList>;
  /** Source language code. */
  sourceLanguageCode?: string;
  /** Target language code. */
  targetLanguageCode?: string;
}

export const ReferenceSentenceConfig: Schema.Schema<ReferenceSentenceConfig> = Schema.suspend(() => Schema.Struct({
  referenceSentencePairLists: Schema.optional(Schema.Array(ReferenceSentencePairList)),
  sourceLanguageCode: Schema.optional(Schema.String),
  targetLanguageCode: Schema.optional(Schema.String),
})).annotate({ identifier: "ReferenceSentenceConfig" }) as any as Schema.Schema<ReferenceSentenceConfig>;

export interface GlossaryConfig {
  /** Required. The `glossary` to be applied for this translation. The format depends on the glossary: - User-provided custom glossary: `projects/{project-number-or-id}/locations/{location-id}/glossaries/{glossary-id}` */
  glossary?: string;
  /** Optional. Indicates match is case insensitive. The default value is `false` if missing. */
  ignoreCase?: boolean;
  /** Optional. If set to true, the glossary will be used for contextual translation. */
  contextualTranslationEnabled?: boolean;
}

export const GlossaryConfig: Schema.Schema<GlossaryConfig> = Schema.suspend(() => Schema.Struct({
  glossary: Schema.optional(Schema.String),
  ignoreCase: Schema.optional(Schema.Boolean),
  contextualTranslationEnabled: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GlossaryConfig" }) as any as Schema.Schema<GlossaryConfig>;

export interface AdaptiveMtTranslateRequest {
  /** Required. The resource name for the dataset to use for adaptive MT translation. `projects/{project}/locations/{location-id}/adaptiveMtDatasets/{dataset}` */
  dataset?: string;
  /** Required. The content of the input in string format. */
  content?: Array<string>;
  /** Configuration for caller provided reference sentences. */
  referenceSentenceConfig?: ReferenceSentenceConfig;
  /** Optional. Glossary to be applied. The glossary must be within the same region (have the same location-id) as the model, otherwise an INVALID_ARGUMENT (400) error is returned. */
  glossaryConfig?: GlossaryConfig;
}

export const AdaptiveMtTranslateRequest: Schema.Schema<AdaptiveMtTranslateRequest> = Schema.suspend(() => Schema.Struct({
  dataset: Schema.optional(Schema.String),
  content: Schema.optional(Schema.Array(Schema.String)),
  referenceSentenceConfig: Schema.optional(ReferenceSentenceConfig),
  glossaryConfig: Schema.optional(GlossaryConfig),
})).annotate({ identifier: "AdaptiveMtTranslateRequest" }) as any as Schema.Schema<AdaptiveMtTranslateRequest>;

export interface AdaptiveMtTranslation {
  /** Output only. The translated text. */
  translatedText?: string;
}

export const AdaptiveMtTranslation: Schema.Schema<AdaptiveMtTranslation> = Schema.suspend(() => Schema.Struct({
  translatedText: Schema.optional(Schema.String),
})).annotate({ identifier: "AdaptiveMtTranslation" }) as any as Schema.Schema<AdaptiveMtTranslation>;

export interface AdaptiveMtTranslateResponse {
  /** Output only. The translation. */
  translations?: Array<AdaptiveMtTranslation>;
  /** Output only. The translation's language code. */
  languageCode?: string;
  /** Text translation response if a glossary is provided in the request. This could be the same as 'translation' above if no terms apply. */
  glossaryTranslations?: Array<AdaptiveMtTranslation>;
}

export const AdaptiveMtTranslateResponse: Schema.Schema<AdaptiveMtTranslateResponse> = Schema.suspend(() => Schema.Struct({
  translations: Schema.optional(Schema.Array(AdaptiveMtTranslation)),
  languageCode: Schema.optional(Schema.String),
  glossaryTranslations: Schema.optional(Schema.Array(AdaptiveMtTranslation)),
})).annotate({ identifier: "AdaptiveMtTranslateResponse" }) as any as Schema.Schema<AdaptiveMtTranslateResponse>;

export interface AdaptiveMtFile {
  /** Identifier. The resource name of the file, in form of `projects/{project-number-or-id}/locations/{location_id}/adaptiveMtDatasets/{dataset}/adaptiveMtFiles/{file}` */
  name?: string;
  /** The file's display name. */
  displayName?: string;
  /** The number of entries that the file contains. */
  entryCount?: number;
  /** Output only. Timestamp when this file was created. */
  createTime?: string;
  /** Output only. Timestamp when this file was last updated. */
  updateTime?: string;
}

export const AdaptiveMtFile: Schema.Schema<AdaptiveMtFile> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  entryCount: Schema.optional(Schema.Number),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
})).annotate({ identifier: "AdaptiveMtFile" }) as any as Schema.Schema<AdaptiveMtFile>;

export interface FileInputSource {
  /** Required. The file's mime type. */
  mimeType?: string;
  /** Required. The file's byte contents. */
  content?: string;
  /** Required. The file's display name. */
  displayName?: string;
}

export const FileInputSource: Schema.Schema<FileInputSource> = Schema.suspend(() => Schema.Struct({
  mimeType: Schema.optional(Schema.String),
  content: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
})).annotate({ identifier: "FileInputSource" }) as any as Schema.Schema<FileInputSource>;

export interface GcsInputSource {
  /** Required. Source data URI. For example, `gs://my_bucket/my_object`. */
  inputUri?: string;
}

export const GcsInputSource: Schema.Schema<GcsInputSource> = Schema.suspend(() => Schema.Struct({
  inputUri: Schema.optional(Schema.String),
})).annotate({ identifier: "GcsInputSource" }) as any as Schema.Schema<GcsInputSource>;

export interface ImportAdaptiveMtFileRequest {
  /** Inline file source. */
  fileInputSource?: FileInputSource;
  /** Google Cloud Storage file source. */
  gcsInputSource?: GcsInputSource;
}

export const ImportAdaptiveMtFileRequest: Schema.Schema<ImportAdaptiveMtFileRequest> = Schema.suspend(() => Schema.Struct({
  fileInputSource: Schema.optional(FileInputSource),
  gcsInputSource: Schema.optional(GcsInputSource),
})).annotate({ identifier: "ImportAdaptiveMtFileRequest" }) as any as Schema.Schema<ImportAdaptiveMtFileRequest>;

export interface ImportAdaptiveMtFileResponse {
  /** Output only. The Adaptive MT file that was imported. */
  adaptiveMtFile?: AdaptiveMtFile;
}

export const ImportAdaptiveMtFileResponse: Schema.Schema<ImportAdaptiveMtFileResponse> = Schema.suspend(() => Schema.Struct({
  adaptiveMtFile: Schema.optional(AdaptiveMtFile),
})).annotate({ identifier: "ImportAdaptiveMtFileResponse" }) as any as Schema.Schema<ImportAdaptiveMtFileResponse>;

export interface ListAdaptiveMtFilesResponse {
  /** Output only. The Adaptive MT files. */
  adaptiveMtFiles?: Array<AdaptiveMtFile>;
  /** Optional. A token to retrieve a page of results. Pass this value in the ListAdaptiveMtFilesRequest.page_token field in the subsequent call to `ListAdaptiveMtFiles` method to retrieve the next page of results. */
  nextPageToken?: string;
}

export const ListAdaptiveMtFilesResponse: Schema.Schema<ListAdaptiveMtFilesResponse> = Schema.suspend(() => Schema.Struct({
  adaptiveMtFiles: Schema.optional(Schema.Array(AdaptiveMtFile)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListAdaptiveMtFilesResponse" }) as any as Schema.Schema<ListAdaptiveMtFilesResponse>;

export interface AdaptiveMtSentence {
  /** Identifier. The resource name of the file, in form of `projects/{project-number-or-id}/locations/{location_id}/adaptiveMtDatasets/{dataset}/adaptiveMtFiles/{file}/adaptiveMtSentences/{sentence}` */
  name?: string;
  /** Required. The source sentence. */
  sourceSentence?: string;
  /** Required. The target sentence. */
  targetSentence?: string;
  /** Output only. Timestamp when this sentence was created. */
  createTime?: string;
  /** Output only. Timestamp when this sentence was last updated. */
  updateTime?: string;
}

export const AdaptiveMtSentence: Schema.Schema<AdaptiveMtSentence> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  sourceSentence: Schema.optional(Schema.String),
  targetSentence: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
})).annotate({ identifier: "AdaptiveMtSentence" }) as any as Schema.Schema<AdaptiveMtSentence>;

export interface ListAdaptiveMtSentencesResponse {
  /** Output only. The list of AdaptiveMtSentences. */
  adaptiveMtSentences?: Array<AdaptiveMtSentence>;
  /** Optional. */
  nextPageToken?: string;
}

export const ListAdaptiveMtSentencesResponse: Schema.Schema<ListAdaptiveMtSentencesResponse> = Schema.suspend(() => Schema.Struct({
  adaptiveMtSentences: Schema.optional(Schema.Array(AdaptiveMtSentence)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListAdaptiveMtSentencesResponse" }) as any as Schema.Schema<ListAdaptiveMtSentencesResponse>;

export interface InputFile {
  /** Optional. Usage of the file contents. Options are TRAIN|VALIDATION|TEST, or UNASSIGNED (by default) for auto split. */
  usage?: string;
  /** Google Cloud Storage file source. */
  gcsSource?: GcsInputSource;
}

export const InputFile: Schema.Schema<InputFile> = Schema.suspend(() => Schema.Struct({
  usage: Schema.optional(Schema.String),
  gcsSource: Schema.optional(GcsInputSource),
})).annotate({ identifier: "InputFile" }) as any as Schema.Schema<InputFile>;

export interface DatasetInputConfig {
  /** Files containing the sentence pairs to be imported to the dataset. */
  inputFiles?: Array<InputFile>;
}

export const DatasetInputConfig: Schema.Schema<DatasetInputConfig> = Schema.suspend(() => Schema.Struct({
  inputFiles: Schema.optional(Schema.Array(InputFile)),
})).annotate({ identifier: "DatasetInputConfig" }) as any as Schema.Schema<DatasetInputConfig>;

export interface ImportDataRequest {
  /** Required. The config for the input content. */
  inputConfig?: DatasetInputConfig;
}

export const ImportDataRequest: Schema.Schema<ImportDataRequest> = Schema.suspend(() => Schema.Struct({
  inputConfig: Schema.optional(DatasetInputConfig),
})).annotate({ identifier: "ImportDataRequest" }) as any as Schema.Schema<ImportDataRequest>;

export interface GcsOutputDestination {
  /** Required. Google Cloud Storage URI to output directory. For example, `gs://bucket/directory`. The requesting user must have write permission to the bucket. The directory will be created if it doesn't exist. */
  outputUriPrefix?: string;
}

export const GcsOutputDestination: Schema.Schema<GcsOutputDestination> = Schema.suspend(() => Schema.Struct({
  outputUriPrefix: Schema.optional(Schema.String),
})).annotate({ identifier: "GcsOutputDestination" }) as any as Schema.Schema<GcsOutputDestination>;

export interface DatasetOutputConfig {
  /** Google Cloud Storage destination to write the output. */
  gcsDestination?: GcsOutputDestination;
}

export const DatasetOutputConfig: Schema.Schema<DatasetOutputConfig> = Schema.suspend(() => Schema.Struct({
  gcsDestination: Schema.optional(GcsOutputDestination),
})).annotate({ identifier: "DatasetOutputConfig" }) as any as Schema.Schema<DatasetOutputConfig>;

export interface ExportDataRequest {
  /** Required. The config for the output content. */
  outputConfig?: DatasetOutputConfig;
}

export const ExportDataRequest: Schema.Schema<ExportDataRequest> = Schema.suspend(() => Schema.Struct({
  outputConfig: Schema.optional(DatasetOutputConfig),
})).annotate({ identifier: "ExportDataRequest" }) as any as Schema.Schema<ExportDataRequest>;

export interface Example {
  /** Output only. The resource name of the example, in form of `projects/{project-number-or-id}/locations/{location_id}/datasets/{dataset_id}/examples/{example_id}` */
  name?: string;
  /** Sentence in source language. */
  sourceText?: string;
  /** Sentence in target language. */
  targetText?: string;
  /** Output only. Usage of the sentence pair. Options are TRAIN|VALIDATION|TEST. */
  usage?: string;
}

export const Example: Schema.Schema<Example> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  sourceText: Schema.optional(Schema.String),
  targetText: Schema.optional(Schema.String),
  usage: Schema.optional(Schema.String),
})).annotate({ identifier: "Example" }) as any as Schema.Schema<Example>;

export interface ListExamplesResponse {
  /** The sentence pairs. */
  examples?: Array<Example>;
  /** A token to retrieve next page of results. Pass this token to the page_token field in the ListExamplesRequest to obtain the corresponding page. */
  nextPageToken?: string;
}

export const ListExamplesResponse: Schema.Schema<ListExamplesResponse> = Schema.suspend(() => Schema.Struct({
  examples: Schema.optional(Schema.Array(Example)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListExamplesResponse" }) as any as Schema.Schema<ListExamplesResponse>;

export interface Model {
  /** The resource name of the model, in form of `projects/{project-number-or-id}/locations/{location_id}/models/{model_id}` */
  name?: string;
  /** The name of the model to show in the interface. The name can be up to 32 characters long and can consist only of ASCII Latin letters A-Z and a-z, underscores (_), and ASCII digits 0-9. */
  displayName?: string;
  /** Required. The dataset from which the model is trained, in form of `projects/{project-number-or-id}/locations/{location_id}/datasets/{dataset_id}` */
  dataset?: string;
  /** Output only. The BCP-47 language code of the source language. */
  sourceLanguageCode?: string;
  /** Output only. The BCP-47 language code of the target language. */
  targetLanguageCode?: string;
  /** Output only. Number of examples (sentence pairs) used to train the model. */
  trainExampleCount?: number;
  /** Output only. Number of examples (sentence pairs) used to validate the model. */
  validateExampleCount?: number;
  /** Output only. Number of examples (sentence pairs) used to test the model. */
  testExampleCount?: number;
  /** Output only. Timestamp when the model resource was created, which is also when the training started. */
  createTime?: string;
  /** Output only. Timestamp when this model was last updated. */
  updateTime?: string;
}

export const Model: Schema.Schema<Model> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  dataset: Schema.optional(Schema.String),
  sourceLanguageCode: Schema.optional(Schema.String),
  targetLanguageCode: Schema.optional(Schema.String),
  trainExampleCount: Schema.optional(Schema.Number),
  validateExampleCount: Schema.optional(Schema.Number),
  testExampleCount: Schema.optional(Schema.Number),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
})).annotate({ identifier: "Model" }) as any as Schema.Schema<Model>;

export interface ListModelsResponse {
  /** The models read. */
  models?: Array<Model>;
  /** A token to retrieve next page of results. Pass this token to the page_token field in the ListModelsRequest to obtain the corresponding page. */
  nextPageToken?: string;
}

export const ListModelsResponse: Schema.Schema<ListModelsResponse> = Schema.suspend(() => Schema.Struct({
  models: Schema.optional(Schema.Array(Model)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListModelsResponse" }) as any as Schema.Schema<ListModelsResponse>;

export interface RefinementEntry {
  /** Required. The source text to be refined. */
  sourceText?: string;
  /** Required. The original translation of the source text. */
  originalTranslation?: string;
}

export const RefinementEntry: Schema.Schema<RefinementEntry> = Schema.suspend(() => Schema.Struct({
  sourceText: Schema.optional(Schema.String),
  originalTranslation: Schema.optional(Schema.String),
})).annotate({ identifier: "RefinementEntry" }) as any as Schema.Schema<RefinementEntry>;

export interface RefineTextRequest {
  /** Required. The source texts and original translations in the source and target languages. */
  refinementEntries?: Array<RefinementEntry>;
  /** Required. The BCP-47 language code of the source text in the request, for example, "en-US". */
  sourceLanguageCode?: string;
  /** Required. The BCP-47 language code for translation output, for example, "zh-CN". */
  targetLanguageCode?: string;
}

export const RefineTextRequest: Schema.Schema<RefineTextRequest> = Schema.suspend(() => Schema.Struct({
  refinementEntries: Schema.optional(Schema.Array(RefinementEntry)),
  sourceLanguageCode: Schema.optional(Schema.String),
  targetLanguageCode: Schema.optional(Schema.String),
})).annotate({ identifier: "RefineTextRequest" }) as any as Schema.Schema<RefineTextRequest>;

export interface RefineTextResponse {
  /** The refined translations obtained from the original translations. */
  refinedTranslations?: Array<string>;
}

export const RefineTextResponse: Schema.Schema<RefineTextResponse> = Schema.suspend(() => Schema.Struct({
  refinedTranslations: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "RefineTextResponse" }) as any as Schema.Schema<RefineTextResponse>;

// ==========================================================================
// Operations
// ==========================================================================

/** Translates input text and returns translated text. */
export interface TranslateTextProjectsRequest {
  /** Required. Project or location to make a call. Must refer to a caller's project. Format: `projects/{project-number-or-id}` or `projects/{project-number-or-id}/locations/{location-id}`. For global calls, use `projects/{project-number-or-id}/locations/global` or `projects/{project-number-or-id}`. Non-global location is required for requests using AutoML models or custom glossaries. Models and glossaries must be within the same region (have same location-id), otherwise an INVALID_ARGUMENT (400) error is returned. */
  parent: string;
  /** Request body */
  body?: TranslateTextRequest;
}

export const TranslateTextProjectsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(TranslateTextRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3/projects/{projectsId}:translateText", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TranslateTextProjectsRequest>;

export type TranslateTextProjectsResponse = TranslateTextResponse;
export const TranslateTextProjectsResponse = TranslateTextResponse;

export type TranslateTextProjectsError = CommonErrors;

export const translateTextProjects: API.OperationMethod<TranslateTextProjectsRequest, TranslateTextProjectsResponse, TranslateTextProjectsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TranslateTextProjectsRequest,
  output: TranslateTextProjectsResponse,
  errors: [],
}));

/** Romanize input text written in non-Latin scripts to Latin text. */
export interface RomanizeTextProjectsRequest {
  /** Required. Project or location to make a call. Must refer to a caller's project. Format: `projects/{project-number-or-id}/locations/{location-id}` or `projects/{project-number-or-id}`. For global calls, use `projects/{project-number-or-id}/locations/global` or `projects/{project-number-or-id}`. */
  parent: string;
  /** Request body */
  body?: RomanizeTextRequest;
}

export const RomanizeTextProjectsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(RomanizeTextRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3/projects/{projectsId}:romanizeText", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RomanizeTextProjectsRequest>;

export type RomanizeTextProjectsResponse = RomanizeTextResponse;
export const RomanizeTextProjectsResponse = RomanizeTextResponse;

export type RomanizeTextProjectsError = CommonErrors;

export const romanizeTextProjects: API.OperationMethod<RomanizeTextProjectsRequest, RomanizeTextProjectsResponse, RomanizeTextProjectsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RomanizeTextProjectsRequest,
  output: RomanizeTextProjectsResponse,
  errors: [],
}));

/** Detects the language of text within a request. */
export interface DetectLanguageProjectsRequest {
  /** Required. Project or location to make a call. Must refer to a caller's project. Format: `projects/{project-number-or-id}/locations/{location-id}` or `projects/{project-number-or-id}`. For global calls, use `projects/{project-number-or-id}/locations/global` or `projects/{project-number-or-id}`. Only models within the same region (has same location-id) can be used. Otherwise an INVALID_ARGUMENT (400) error is returned. */
  parent: string;
  /** Request body */
  body?: DetectLanguageRequest;
}

export const DetectLanguageProjectsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(DetectLanguageRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3/projects/{projectsId}:detectLanguage", hasBody: true }),
  svc,
) as unknown as Schema.Schema<DetectLanguageProjectsRequest>;

export type DetectLanguageProjectsResponse = DetectLanguageResponse;
export const DetectLanguageProjectsResponse = DetectLanguageResponse;

export type DetectLanguageProjectsError = CommonErrors;

export const detectLanguageProjects: API.OperationMethod<DetectLanguageProjectsRequest, DetectLanguageProjectsResponse, DetectLanguageProjectsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DetectLanguageProjectsRequest,
  output: DetectLanguageProjectsResponse,
  errors: [],
}));

/** Returns a list of supported languages for translation. */
export interface GetSupportedLanguagesProjectsRequest {
  /** Required. Project or location to make a call. Must refer to a caller's project. Format: `projects/{project-number-or-id}` or `projects/{project-number-or-id}/locations/{location-id}`. For global calls, use `projects/{project-number-or-id}/locations/global` or `projects/{project-number-or-id}`. Non-global location is required for AutoML models. Only models within the same region (have same location-id) can be used, otherwise an INVALID_ARGUMENT (400) error is returned. */
  parent: string;
  /** Optional. The language to use to return localized, human readable names of supported languages. If missing, then display names are not returned in a response. */
  displayLanguageCode?: string;
  /** Optional. Get supported languages of this model. The format depends on model type: - AutoML Translation models: `projects/{project-number-or-id}/locations/{location-id}/models/{model-id}` - General (built-in) models: `projects/{project-number-or-id}/locations/{location-id}/models/general/nmt`, Returns languages supported by the specified model. If missing, we get supported languages of Google general NMT model. */
  model?: string;
}

export const GetSupportedLanguagesProjectsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  displayLanguageCode: Schema.optional(Schema.String).pipe(T.HttpQuery("displayLanguageCode")),
  model: Schema.optional(Schema.String).pipe(T.HttpQuery("model")),
}).pipe(
  T.Http({ method: "GET", path: "v3/projects/{projectsId}/supportedLanguages" }),
  svc,
) as unknown as Schema.Schema<GetSupportedLanguagesProjectsRequest>;

export type GetSupportedLanguagesProjectsResponse = SupportedLanguages;
export const GetSupportedLanguagesProjectsResponse = SupportedLanguages;

export type GetSupportedLanguagesProjectsError = CommonErrors;

export const getSupportedLanguagesProjects: API.OperationMethod<GetSupportedLanguagesProjectsRequest, GetSupportedLanguagesProjectsResponse, GetSupportedLanguagesProjectsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetSupportedLanguagesProjectsRequest,
  output: GetSupportedLanguagesProjectsResponse,
  errors: [],
}));

/** Lists information about the supported locations for this service. This method can be called in two ways: * **List all public locations:** Use the path `GET /v1/locations`. * **List project-visible locations:** Use the path `GET /v1/projects/{project_id}/locations`. This may include public locations as well as private or other locations specifically visible to the project. */
export interface ListProjectsLocationsRequest {
  /** The resource that owns the locations collection, if applicable. */
  name: string;
  /** A filter to narrow down results to a preferred subset. The filtering language accepts strings like `"displayName=tokyo"`, and is documented in more detail in [AIP-160](https://google.aip.dev/160). */
  filter?: string;
  /** The maximum number of results to return. If not set, the service selects a default. */
  pageSize?: number;
  /** A page token received from the `next_page_token` field in the response. Send that page token to receive the subsequent page. */
  pageToken?: string;
  /** Optional. Do not use this field. It is unsupported and is ignored unless explicitly documented otherwise. This is primarily for internal usage. */
  extraLocationTypes?: string[];
}

export const ListProjectsLocationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  extraLocationTypes: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("extraLocationTypes")),
}).pipe(
  T.Http({ method: "GET", path: "v3/projects/{projectsId}/locations" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsRequest>;

export type ListProjectsLocationsResponse = ListLocationsResponse;
export const ListProjectsLocationsResponse = ListLocationsResponse;

export type ListProjectsLocationsError = CommonErrors;

export const listProjectsLocations = API.makePaginated(() => ({
  input: ListProjectsLocationsRequest,
  output: ListProjectsLocationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets information about a location. */
export interface GetProjectsLocationsRequest {
  /** Resource name for the location. */
  name: string;
}

export const GetProjectsLocationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v3/projects/{projectsId}/locations/{locationsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsRequest>;

export type GetProjectsLocationsResponse = Location;
export const GetProjectsLocationsResponse = Location;

export type GetProjectsLocationsError = CommonErrors;

export const getProjectsLocations: API.OperationMethod<GetProjectsLocationsRequest, GetProjectsLocationsResponse, GetProjectsLocationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsRequest,
  output: GetProjectsLocationsResponse,
  errors: [],
}));

/** Translates input text and returns translated text. */
export interface TranslateTextProjectsLocationsRequest {
  /** Required. Project or location to make a call. Must refer to a caller's project. Format: `projects/{project-number-or-id}` or `projects/{project-number-or-id}/locations/{location-id}`. For global calls, use `projects/{project-number-or-id}/locations/global` or `projects/{project-number-or-id}`. Non-global location is required for requests using AutoML models or custom glossaries. Models and glossaries must be within the same region (have same location-id), otherwise an INVALID_ARGUMENT (400) error is returned. */
  parent: string;
  /** Request body */
  body?: TranslateTextRequest;
}

export const TranslateTextProjectsLocationsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(TranslateTextRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3/projects/{projectsId}/locations/{locationsId}:translateText", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TranslateTextProjectsLocationsRequest>;

export type TranslateTextProjectsLocationsResponse = TranslateTextResponse;
export const TranslateTextProjectsLocationsResponse = TranslateTextResponse;

export type TranslateTextProjectsLocationsError = CommonErrors;

export const translateTextProjectsLocations: API.OperationMethod<TranslateTextProjectsLocationsRequest, TranslateTextProjectsLocationsResponse, TranslateTextProjectsLocationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TranslateTextProjectsLocationsRequest,
  output: TranslateTextProjectsLocationsResponse,
  errors: [],
}));

/** Romanize input text written in non-Latin scripts to Latin text. */
export interface RomanizeTextProjectsLocationsRequest {
  /** Required. Project or location to make a call. Must refer to a caller's project. Format: `projects/{project-number-or-id}/locations/{location-id}` or `projects/{project-number-or-id}`. For global calls, use `projects/{project-number-or-id}/locations/global` or `projects/{project-number-or-id}`. */
  parent: string;
  /** Request body */
  body?: RomanizeTextRequest;
}

export const RomanizeTextProjectsLocationsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(RomanizeTextRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3/projects/{projectsId}/locations/{locationsId}:romanizeText", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RomanizeTextProjectsLocationsRequest>;

export type RomanizeTextProjectsLocationsResponse = RomanizeTextResponse;
export const RomanizeTextProjectsLocationsResponse = RomanizeTextResponse;

export type RomanizeTextProjectsLocationsError = CommonErrors;

export const romanizeTextProjectsLocations: API.OperationMethod<RomanizeTextProjectsLocationsRequest, RomanizeTextProjectsLocationsResponse, RomanizeTextProjectsLocationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RomanizeTextProjectsLocationsRequest,
  output: RomanizeTextProjectsLocationsResponse,
  errors: [],
}));

/** Detects the language of text within a request. */
export interface DetectLanguageProjectsLocationsRequest {
  /** Required. Project or location to make a call. Must refer to a caller's project. Format: `projects/{project-number-or-id}/locations/{location-id}` or `projects/{project-number-or-id}`. For global calls, use `projects/{project-number-or-id}/locations/global` or `projects/{project-number-or-id}`. Only models within the same region (has same location-id) can be used. Otherwise an INVALID_ARGUMENT (400) error is returned. */
  parent: string;
  /** Request body */
  body?: DetectLanguageRequest;
}

export const DetectLanguageProjectsLocationsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(DetectLanguageRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3/projects/{projectsId}/locations/{locationsId}:detectLanguage", hasBody: true }),
  svc,
) as unknown as Schema.Schema<DetectLanguageProjectsLocationsRequest>;

export type DetectLanguageProjectsLocationsResponse = DetectLanguageResponse;
export const DetectLanguageProjectsLocationsResponse = DetectLanguageResponse;

export type DetectLanguageProjectsLocationsError = CommonErrors;

export const detectLanguageProjectsLocations: API.OperationMethod<DetectLanguageProjectsLocationsRequest, DetectLanguageProjectsLocationsResponse, DetectLanguageProjectsLocationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DetectLanguageProjectsLocationsRequest,
  output: DetectLanguageProjectsLocationsResponse,
  errors: [],
}));

/** Returns a list of supported languages for translation. */
export interface GetSupportedLanguagesProjectsLocationsRequest {
  /** Required. Project or location to make a call. Must refer to a caller's project. Format: `projects/{project-number-or-id}` or `projects/{project-number-or-id}/locations/{location-id}`. For global calls, use `projects/{project-number-or-id}/locations/global` or `projects/{project-number-or-id}`. Non-global location is required for AutoML models. Only models within the same region (have same location-id) can be used, otherwise an INVALID_ARGUMENT (400) error is returned. */
  parent: string;
  /** Optional. The language to use to return localized, human readable names of supported languages. If missing, then display names are not returned in a response. */
  displayLanguageCode?: string;
  /** Optional. Get supported languages of this model. The format depends on model type: - AutoML Translation models: `projects/{project-number-or-id}/locations/{location-id}/models/{model-id}` - General (built-in) models: `projects/{project-number-or-id}/locations/{location-id}/models/general/nmt`, Returns languages supported by the specified model. If missing, we get supported languages of Google general NMT model. */
  model?: string;
}

export const GetSupportedLanguagesProjectsLocationsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  displayLanguageCode: Schema.optional(Schema.String).pipe(T.HttpQuery("displayLanguageCode")),
  model: Schema.optional(Schema.String).pipe(T.HttpQuery("model")),
}).pipe(
  T.Http({ method: "GET", path: "v3/projects/{projectsId}/locations/{locationsId}/supportedLanguages" }),
  svc,
) as unknown as Schema.Schema<GetSupportedLanguagesProjectsLocationsRequest>;

export type GetSupportedLanguagesProjectsLocationsResponse = SupportedLanguages;
export const GetSupportedLanguagesProjectsLocationsResponse = SupportedLanguages;

export type GetSupportedLanguagesProjectsLocationsError = CommonErrors;

export const getSupportedLanguagesProjectsLocations: API.OperationMethod<GetSupportedLanguagesProjectsLocationsRequest, GetSupportedLanguagesProjectsLocationsResponse, GetSupportedLanguagesProjectsLocationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetSupportedLanguagesProjectsLocationsRequest,
  output: GetSupportedLanguagesProjectsLocationsResponse,
  errors: [],
}));

/** Translates documents in synchronous mode. */
export interface TranslateDocumentProjectsLocationsRequest {
  /** Required. Location to make a regional call. Format: `projects/{project-number-or-id}/locations/{location-id}`. For global calls, use `projects/{project-number-or-id}/locations/global` or `projects/{project-number-or-id}`. Non-global location is required for requests using AutoML models or custom glossaries. Models and glossaries must be within the same region (have the same location-id), otherwise an INVALID_ARGUMENT (400) error is returned. */
  parent: string;
  /** Request body */
  body?: TranslateDocumentRequest;
}

export const TranslateDocumentProjectsLocationsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(TranslateDocumentRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3/projects/{projectsId}/locations/{locationsId}:translateDocument", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TranslateDocumentProjectsLocationsRequest>;

export type TranslateDocumentProjectsLocationsResponse = TranslateDocumentResponse;
export const TranslateDocumentProjectsLocationsResponse = TranslateDocumentResponse;

export type TranslateDocumentProjectsLocationsError = CommonErrors;

export const translateDocumentProjectsLocations: API.OperationMethod<TranslateDocumentProjectsLocationsRequest, TranslateDocumentProjectsLocationsResponse, TranslateDocumentProjectsLocationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TranslateDocumentProjectsLocationsRequest,
  output: TranslateDocumentProjectsLocationsResponse,
  errors: [],
}));

/** Translates a large volume of text in asynchronous batch mode. This function provides real-time output as the inputs are being processed. If caller cancels a request, the partial results (for an input file, it's all or nothing) may still be available on the specified output location. This call returns immediately and you can use google.longrunning.Operation.name to poll the status of the call. */
export interface BatchTranslateTextProjectsLocationsRequest {
  /** Required. Location to make a call. Must refer to a caller's project. Format: `projects/{project-number-or-id}/locations/{location-id}`. The `global` location is not supported for batch translation. Only AutoML Translation models or glossaries within the same region (have the same location-id) can be used, otherwise an INVALID_ARGUMENT (400) error is returned. */
  parent: string;
  /** Request body */
  body?: BatchTranslateTextRequest;
}

export const BatchTranslateTextProjectsLocationsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(BatchTranslateTextRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3/projects/{projectsId}/locations/{locationsId}:batchTranslateText", hasBody: true }),
  svc,
) as unknown as Schema.Schema<BatchTranslateTextProjectsLocationsRequest>;

export type BatchTranslateTextProjectsLocationsResponse = Operation;
export const BatchTranslateTextProjectsLocationsResponse = Operation;

export type BatchTranslateTextProjectsLocationsError = CommonErrors;

export const batchTranslateTextProjectsLocations: API.OperationMethod<BatchTranslateTextProjectsLocationsRequest, BatchTranslateTextProjectsLocationsResponse, BatchTranslateTextProjectsLocationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: BatchTranslateTextProjectsLocationsRequest,
  output: BatchTranslateTextProjectsLocationsResponse,
  errors: [],
}));

/** Translates a large volume of document in asynchronous batch mode. This function provides real-time output as the inputs are being processed. If caller cancels a request, the partial results (for an input file, it's all or nothing) may still be available on the specified output location. This call returns immediately and you can use google.longrunning.Operation.name to poll the status of the call. */
export interface BatchTranslateDocumentProjectsLocationsRequest {
  /** Required. Location to make a regional call. Format: `projects/{project-number-or-id}/locations/{location-id}`. The `global` location is not supported for batch translation. Only AutoML Translation models or glossaries within the same region (have the same location-id) can be used, otherwise an INVALID_ARGUMENT (400) error is returned. */
  parent: string;
  /** Request body */
  body?: BatchTranslateDocumentRequest;
}

export const BatchTranslateDocumentProjectsLocationsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(BatchTranslateDocumentRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3/projects/{projectsId}/locations/{locationsId}:batchTranslateDocument", hasBody: true }),
  svc,
) as unknown as Schema.Schema<BatchTranslateDocumentProjectsLocationsRequest>;

export type BatchTranslateDocumentProjectsLocationsResponse = Operation;
export const BatchTranslateDocumentProjectsLocationsResponse = Operation;

export type BatchTranslateDocumentProjectsLocationsError = CommonErrors;

export const batchTranslateDocumentProjectsLocations: API.OperationMethod<BatchTranslateDocumentProjectsLocationsRequest, BatchTranslateDocumentProjectsLocationsResponse, BatchTranslateDocumentProjectsLocationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: BatchTranslateDocumentProjectsLocationsRequest,
  output: BatchTranslateDocumentProjectsLocationsResponse,
  errors: [],
}));

/** Translate text using Adaptive MT. */
export interface AdaptiveMtTranslateProjectsLocationsRequest {
  /** Required. Location to make a regional call. Format: `projects/{project-number-or-id}/locations/{location-id}`. */
  parent: string;
  /** Request body */
  body?: AdaptiveMtTranslateRequest;
}

export const AdaptiveMtTranslateProjectsLocationsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(AdaptiveMtTranslateRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3/projects/{projectsId}/locations/{locationsId}:adaptiveMtTranslate", hasBody: true }),
  svc,
) as unknown as Schema.Schema<AdaptiveMtTranslateProjectsLocationsRequest>;

export type AdaptiveMtTranslateProjectsLocationsResponse = AdaptiveMtTranslateResponse;
export const AdaptiveMtTranslateProjectsLocationsResponse = AdaptiveMtTranslateResponse;

export type AdaptiveMtTranslateProjectsLocationsError = CommonErrors;

export const adaptiveMtTranslateProjectsLocations: API.OperationMethod<AdaptiveMtTranslateProjectsLocationsRequest, AdaptiveMtTranslateProjectsLocationsResponse, AdaptiveMtTranslateProjectsLocationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: AdaptiveMtTranslateProjectsLocationsRequest,
  output: AdaptiveMtTranslateProjectsLocationsResponse,
  errors: [],
}));

/** Refines the input translated text to improve the quality. */
export interface RefineTextProjectsLocationsRequest {
  /** Required. Project or location to make a call. Must refer to a caller's project. Format: `projects/{project-number-or-id}/locations/{location-id}`. For global calls, use `projects/{project-number-or-id}/locations/global` or `projects/{project-number-or-id}`. */
  parent: string;
  /** Request body */
  body?: RefineTextRequest;
}

export const RefineTextProjectsLocationsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(RefineTextRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3/projects/{projectsId}/locations/{locationsId}:refineText", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RefineTextProjectsLocationsRequest>;

export type RefineTextProjectsLocationsResponse = RefineTextResponse;
export const RefineTextProjectsLocationsResponse = RefineTextResponse;

export type RefineTextProjectsLocationsError = CommonErrors;

export const refineTextProjectsLocations: API.OperationMethod<RefineTextProjectsLocationsRequest, RefineTextProjectsLocationsResponse, RefineTextProjectsLocationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RefineTextProjectsLocationsRequest,
  output: RefineTextProjectsLocationsResponse,
  errors: [],
}));

/** Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns `UNIMPLEMENTED`. */
export interface ListProjectsLocationsOperationsRequest {
  /** The name of the operation's parent resource. */
  name: string;
  /** The standard list filter. */
  filter?: string;
  /** The standard list page size. */
  pageSize?: number;
  /** The standard list page token. */
  pageToken?: string;
  /** When set to `true`, operations that are reachable are returned as normal, and those that are unreachable are returned in the ListOperationsResponse.unreachable field. This can only be `true` when reading across collections. For example, when `parent` is set to `"projects/example/locations/-"`. This field is not supported by default and will result in an `UNIMPLEMENTED` error if set unless explicitly documented otherwise in service or product specific documentation. */
  returnPartialSuccess?: boolean;
}

export const ListProjectsLocationsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  returnPartialSuccess: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("returnPartialSuccess")),
}).pipe(
  T.Http({ method: "GET", path: "v3/projects/{projectsId}/locations/{locationsId}/operations" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsOperationsRequest>;

export type ListProjectsLocationsOperationsResponse = ListOperationsResponse;
export const ListProjectsLocationsOperationsResponse = ListOperationsResponse;

export type ListProjectsLocationsOperationsError = CommonErrors;

export const listProjectsLocationsOperations = API.makePaginated(() => ({
  input: ListProjectsLocationsOperationsRequest,
  output: ListProjectsLocationsOperationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service. */
export interface GetProjectsLocationsOperationsRequest {
  /** The name of the operation resource. */
  name: string;
}

export const GetProjectsLocationsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v3/projects/{projectsId}/locations/{locationsId}/operations/{operationsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsOperationsRequest>;

export type GetProjectsLocationsOperationsResponse = Operation;
export const GetProjectsLocationsOperationsResponse = Operation;

export type GetProjectsLocationsOperationsError = CommonErrors;

export const getProjectsLocationsOperations: API.OperationMethod<GetProjectsLocationsOperationsRequest, GetProjectsLocationsOperationsResponse, GetProjectsLocationsOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsOperationsRequest,
  output: GetProjectsLocationsOperationsResponse,
  errors: [],
}));

/** Deletes a long-running operation. This method indicates that the client is no longer interested in the operation result. It does not cancel the operation. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. */
export interface DeleteProjectsLocationsOperationsRequest {
  /** The name of the operation resource to be deleted. */
  name: string;
}

export const DeleteProjectsLocationsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v3/projects/{projectsId}/locations/{locationsId}/operations/{operationsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsOperationsRequest>;

export type DeleteProjectsLocationsOperationsResponse = Empty;
export const DeleteProjectsLocationsOperationsResponse = Empty;

export type DeleteProjectsLocationsOperationsError = CommonErrors;

export const deleteProjectsLocationsOperations: API.OperationMethod<DeleteProjectsLocationsOperationsRequest, DeleteProjectsLocationsOperationsResponse, DeleteProjectsLocationsOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsOperationsRequest,
  output: DeleteProjectsLocationsOperationsResponse,
  errors: [],
}));

/** Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`. */
export interface CancelProjectsLocationsOperationsRequest {
  /** The name of the operation resource to be cancelled. */
  name: string;
  /** Request body */
  body?: CancelOperationRequest;
}

export const CancelProjectsLocationsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(CancelOperationRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3/projects/{projectsId}/locations/{locationsId}/operations/{operationsId}:cancel", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CancelProjectsLocationsOperationsRequest>;

export type CancelProjectsLocationsOperationsResponse = Empty;
export const CancelProjectsLocationsOperationsResponse = Empty;

export type CancelProjectsLocationsOperationsError = CommonErrors;

export const cancelProjectsLocationsOperations: API.OperationMethod<CancelProjectsLocationsOperationsRequest, CancelProjectsLocationsOperationsResponse, CancelProjectsLocationsOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CancelProjectsLocationsOperationsRequest,
  output: CancelProjectsLocationsOperationsResponse,
  errors: [],
}));

/** Waits until the specified long-running operation is done or reaches at most a specified timeout, returning the latest state. If the operation is already done, the latest state is immediately returned. If the timeout specified is greater than the default HTTP/RPC timeout, the HTTP/RPC timeout is used. If the server does not support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Note that this method is on a best-effort basis. It may return the latest state before the specified timeout (including immediately), meaning even an immediate response is no guarantee that the operation is done. */
export interface WaitProjectsLocationsOperationsRequest {
  /** The name of the operation resource to wait on. */
  name: string;
  /** Request body */
  body?: WaitOperationRequest;
}

export const WaitProjectsLocationsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(WaitOperationRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3/projects/{projectsId}/locations/{locationsId}/operations/{operationsId}:wait", hasBody: true }),
  svc,
) as unknown as Schema.Schema<WaitProjectsLocationsOperationsRequest>;

export type WaitProjectsLocationsOperationsResponse = Operation;
export const WaitProjectsLocationsOperationsResponse = Operation;

export type WaitProjectsLocationsOperationsError = CommonErrors;

export const waitProjectsLocationsOperations: API.OperationMethod<WaitProjectsLocationsOperationsRequest, WaitProjectsLocationsOperationsResponse, WaitProjectsLocationsOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: WaitProjectsLocationsOperationsRequest,
  output: WaitProjectsLocationsOperationsResponse,
  errors: [],
}));

/** Creates a glossary and returns the long-running operation. Returns NOT_FOUND, if the project doesn't exist. */
export interface CreateProjectsLocationsGlossariesRequest {
  /** Required. The project name. */
  parent: string;
  /** Request body */
  body?: Glossary;
}

export const CreateProjectsLocationsGlossariesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(Glossary).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3/projects/{projectsId}/locations/{locationsId}/glossaries", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsGlossariesRequest>;

export type CreateProjectsLocationsGlossariesResponse = Operation;
export const CreateProjectsLocationsGlossariesResponse = Operation;

export type CreateProjectsLocationsGlossariesError = CommonErrors;

export const createProjectsLocationsGlossaries: API.OperationMethod<CreateProjectsLocationsGlossariesRequest, CreateProjectsLocationsGlossariesResponse, CreateProjectsLocationsGlossariesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsGlossariesRequest,
  output: CreateProjectsLocationsGlossariesResponse,
  errors: [],
}));

/** Updates a glossary. A LRO is used since the update can be async if the glossary's entry file is updated. */
export interface PatchProjectsLocationsGlossariesRequest {
  /** Identifier. The resource name of the glossary. Glossary names have the form `projects/{project-number-or-id}/locations/{location-id}/glossaries/{glossary-id}`. */
  name: string;
  /** The list of fields to be updated. Currently, only `display_name` and `input_config` are supported. */
  updateMask?: string;
  /** Request body */
  body?: Glossary;
}

export const PatchProjectsLocationsGlossariesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(Glossary).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v3/projects/{projectsId}/locations/{locationsId}/glossaries/{glossariesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsGlossariesRequest>;

export type PatchProjectsLocationsGlossariesResponse = Operation;
export const PatchProjectsLocationsGlossariesResponse = Operation;

export type PatchProjectsLocationsGlossariesError = CommonErrors;

export const patchProjectsLocationsGlossaries: API.OperationMethod<PatchProjectsLocationsGlossariesRequest, PatchProjectsLocationsGlossariesResponse, PatchProjectsLocationsGlossariesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsGlossariesRequest,
  output: PatchProjectsLocationsGlossariesResponse,
  errors: [],
}));

/** Lists glossaries in a project. Returns NOT_FOUND, if the project doesn't exist. */
export interface ListProjectsLocationsGlossariesRequest {
  /** Required. The name of the project from which to list all of the glossaries. */
  parent: string;
  /** Optional. Requested page size. The server may return fewer glossaries than requested. If unspecified, the server picks an appropriate default. */
  pageSize?: number;
  /** Optional. A token identifying a page of results the server should return. Typically, this is the value of [ListGlossariesResponse.next_page_token] returned from the previous call to `ListGlossaries` method. The first page is returned if `page_token`is empty or missing. */
  pageToken?: string;
  /** Optional. Filter specifying constraints of a list operation. Specify the constraint by the format of "key=value", where key must be "src" or "tgt", and the value must be a valid language code. For multiple restrictions, concatenate them by "AND" (uppercase only), such as: "src=en-US AND tgt=zh-CN". Notice that the exact match is used here, which means using 'en-US' and 'en' can lead to different results, which depends on the language code you used when you create the glossary. For the unidirectional glossaries, the "src" and "tgt" add restrictions on the source and target language code separately. For the equivalent term set glossaries, the "src" and/or "tgt" add restrictions on the term set. For example: "src=en-US AND tgt=zh-CN" will only pick the unidirectional glossaries which exactly match the source language code as "en-US" and the target language code "zh-CN", but all equivalent term set glossaries which contain "en-US" and "zh-CN" in their language set will be picked. If missing, no filtering is performed. */
  filter?: string;
}

export const ListProjectsLocationsGlossariesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v3/projects/{projectsId}/locations/{locationsId}/glossaries" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsGlossariesRequest>;

export type ListProjectsLocationsGlossariesResponse = ListGlossariesResponse;
export const ListProjectsLocationsGlossariesResponse = ListGlossariesResponse;

export type ListProjectsLocationsGlossariesError = CommonErrors;

export const listProjectsLocationsGlossaries = API.makePaginated(() => ({
  input: ListProjectsLocationsGlossariesRequest,
  output: ListProjectsLocationsGlossariesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets a glossary. Returns NOT_FOUND, if the glossary doesn't exist. */
export interface GetProjectsLocationsGlossariesRequest {
  /** Required. The name of the glossary to retrieve. */
  name: string;
}

export const GetProjectsLocationsGlossariesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v3/projects/{projectsId}/locations/{locationsId}/glossaries/{glossariesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsGlossariesRequest>;

export type GetProjectsLocationsGlossariesResponse = Glossary;
export const GetProjectsLocationsGlossariesResponse = Glossary;

export type GetProjectsLocationsGlossariesError = CommonErrors;

export const getProjectsLocationsGlossaries: API.OperationMethod<GetProjectsLocationsGlossariesRequest, GetProjectsLocationsGlossariesResponse, GetProjectsLocationsGlossariesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsGlossariesRequest,
  output: GetProjectsLocationsGlossariesResponse,
  errors: [],
}));

/** Deletes a glossary, or cancels glossary construction if the glossary isn't created yet. Returns NOT_FOUND, if the glossary doesn't exist. */
export interface DeleteProjectsLocationsGlossariesRequest {
  /** Required. The name of the glossary to delete. */
  name: string;
}

export const DeleteProjectsLocationsGlossariesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v3/projects/{projectsId}/locations/{locationsId}/glossaries/{glossariesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsGlossariesRequest>;

export type DeleteProjectsLocationsGlossariesResponse = Operation;
export const DeleteProjectsLocationsGlossariesResponse = Operation;

export type DeleteProjectsLocationsGlossariesError = CommonErrors;

export const deleteProjectsLocationsGlossaries: API.OperationMethod<DeleteProjectsLocationsGlossariesRequest, DeleteProjectsLocationsGlossariesResponse, DeleteProjectsLocationsGlossariesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsGlossariesRequest,
  output: DeleteProjectsLocationsGlossariesResponse,
  errors: [],
}));

/** Gets a single glossary entry by the given id. */
export interface GetProjectsLocationsGlossariesGlossaryEntriesRequest {
  /** Required. The resource name of the glossary entry to get */
  name: string;
}

export const GetProjectsLocationsGlossariesGlossaryEntriesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v3/projects/{projectsId}/locations/{locationsId}/glossaries/{glossariesId}/glossaryEntries/{glossaryEntriesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsGlossariesGlossaryEntriesRequest>;

export type GetProjectsLocationsGlossariesGlossaryEntriesResponse = GlossaryEntry;
export const GetProjectsLocationsGlossariesGlossaryEntriesResponse = GlossaryEntry;

export type GetProjectsLocationsGlossariesGlossaryEntriesError = CommonErrors;

export const getProjectsLocationsGlossariesGlossaryEntries: API.OperationMethod<GetProjectsLocationsGlossariesGlossaryEntriesRequest, GetProjectsLocationsGlossariesGlossaryEntriesResponse, GetProjectsLocationsGlossariesGlossaryEntriesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsGlossariesGlossaryEntriesRequest,
  output: GetProjectsLocationsGlossariesGlossaryEntriesResponse,
  errors: [],
}));

/** List the entries for the glossary. */
export interface ListProjectsLocationsGlossariesGlossaryEntriesRequest {
  /** Required. The parent glossary resource name for listing the glossary's entries. */
  parent: string;
  /** Optional. Requested page size. The server may return fewer glossary entries than requested. If unspecified, the server picks an appropriate default. */
  pageSize?: number;
  /** Optional. A token identifying a page of results the server should return. Typically, this is the value of [ListGlossaryEntriesResponse.next_page_token] returned from the previous call. The first page is returned if `page_token`is empty or missing. */
  pageToken?: string;
}

export const ListProjectsLocationsGlossariesGlossaryEntriesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v3/projects/{projectsId}/locations/{locationsId}/glossaries/{glossariesId}/glossaryEntries" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsGlossariesGlossaryEntriesRequest>;

export type ListProjectsLocationsGlossariesGlossaryEntriesResponse = ListGlossaryEntriesResponse;
export const ListProjectsLocationsGlossariesGlossaryEntriesResponse = ListGlossaryEntriesResponse;

export type ListProjectsLocationsGlossariesGlossaryEntriesError = CommonErrors;

export const listProjectsLocationsGlossariesGlossaryEntries = API.makePaginated(() => ({
  input: ListProjectsLocationsGlossariesGlossaryEntriesRequest,
  output: ListProjectsLocationsGlossariesGlossaryEntriesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Creates a glossary entry. */
export interface CreateProjectsLocationsGlossariesGlossaryEntriesRequest {
  /** Required. The resource name of the glossary to create the entry under. */
  parent: string;
  /** Request body */
  body?: GlossaryEntry;
}

export const CreateProjectsLocationsGlossariesGlossaryEntriesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GlossaryEntry).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3/projects/{projectsId}/locations/{locationsId}/glossaries/{glossariesId}/glossaryEntries", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsGlossariesGlossaryEntriesRequest>;

export type CreateProjectsLocationsGlossariesGlossaryEntriesResponse = GlossaryEntry;
export const CreateProjectsLocationsGlossariesGlossaryEntriesResponse = GlossaryEntry;

export type CreateProjectsLocationsGlossariesGlossaryEntriesError = CommonErrors;

export const createProjectsLocationsGlossariesGlossaryEntries: API.OperationMethod<CreateProjectsLocationsGlossariesGlossaryEntriesRequest, CreateProjectsLocationsGlossariesGlossaryEntriesResponse, CreateProjectsLocationsGlossariesGlossaryEntriesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsGlossariesGlossaryEntriesRequest,
  output: CreateProjectsLocationsGlossariesGlossaryEntriesResponse,
  errors: [],
}));

/** Updates a glossary entry. */
export interface PatchProjectsLocationsGlossariesGlossaryEntriesRequest {
  /** Identifier. The resource name of the entry. Format: `projects/* /locations/* /glossaries/* /glossaryEntries/*` */
  name: string;
  /** Request body */
  body?: GlossaryEntry;
}

export const PatchProjectsLocationsGlossariesGlossaryEntriesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GlossaryEntry).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v3/projects/{projectsId}/locations/{locationsId}/glossaries/{glossariesId}/glossaryEntries/{glossaryEntriesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsGlossariesGlossaryEntriesRequest>;

export type PatchProjectsLocationsGlossariesGlossaryEntriesResponse = GlossaryEntry;
export const PatchProjectsLocationsGlossariesGlossaryEntriesResponse = GlossaryEntry;

export type PatchProjectsLocationsGlossariesGlossaryEntriesError = CommonErrors;

export const patchProjectsLocationsGlossariesGlossaryEntries: API.OperationMethod<PatchProjectsLocationsGlossariesGlossaryEntriesRequest, PatchProjectsLocationsGlossariesGlossaryEntriesResponse, PatchProjectsLocationsGlossariesGlossaryEntriesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsGlossariesGlossaryEntriesRequest,
  output: PatchProjectsLocationsGlossariesGlossaryEntriesResponse,
  errors: [],
}));

/** Deletes a single entry from the glossary */
export interface DeleteProjectsLocationsGlossariesGlossaryEntriesRequest {
  /** Required. The resource name of the glossary entry to delete */
  name: string;
}

export const DeleteProjectsLocationsGlossariesGlossaryEntriesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v3/projects/{projectsId}/locations/{locationsId}/glossaries/{glossariesId}/glossaryEntries/{glossaryEntriesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsGlossariesGlossaryEntriesRequest>;

export type DeleteProjectsLocationsGlossariesGlossaryEntriesResponse = Empty;
export const DeleteProjectsLocationsGlossariesGlossaryEntriesResponse = Empty;

export type DeleteProjectsLocationsGlossariesGlossaryEntriesError = CommonErrors;

export const deleteProjectsLocationsGlossariesGlossaryEntries: API.OperationMethod<DeleteProjectsLocationsGlossariesGlossaryEntriesRequest, DeleteProjectsLocationsGlossariesGlossaryEntriesResponse, DeleteProjectsLocationsGlossariesGlossaryEntriesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsGlossariesGlossaryEntriesRequest,
  output: DeleteProjectsLocationsGlossariesGlossaryEntriesResponse,
  errors: [],
}));

/** Creates a Dataset. */
export interface CreateProjectsLocationsDatasetsRequest {
  /** Required. The project name. */
  parent: string;
  /** Request body */
  body?: Dataset;
}

export const CreateProjectsLocationsDatasetsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(Dataset).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3/projects/{projectsId}/locations/{locationsId}/datasets", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsDatasetsRequest>;

export type CreateProjectsLocationsDatasetsResponse = Operation;
export const CreateProjectsLocationsDatasetsResponse = Operation;

export type CreateProjectsLocationsDatasetsError = CommonErrors;

export const createProjectsLocationsDatasets: API.OperationMethod<CreateProjectsLocationsDatasetsRequest, CreateProjectsLocationsDatasetsResponse, CreateProjectsLocationsDatasetsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsDatasetsRequest,
  output: CreateProjectsLocationsDatasetsResponse,
  errors: [],
}));

/** Gets a Dataset. */
export interface GetProjectsLocationsDatasetsRequest {
  /** Required. The resource name of the dataset to retrieve. */
  name: string;
}

export const GetProjectsLocationsDatasetsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v3/projects/{projectsId}/locations/{locationsId}/datasets/{datasetsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsDatasetsRequest>;

export type GetProjectsLocationsDatasetsResponse = Dataset;
export const GetProjectsLocationsDatasetsResponse = Dataset;

export type GetProjectsLocationsDatasetsError = CommonErrors;

export const getProjectsLocationsDatasets: API.OperationMethod<GetProjectsLocationsDatasetsRequest, GetProjectsLocationsDatasetsResponse, GetProjectsLocationsDatasetsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsDatasetsRequest,
  output: GetProjectsLocationsDatasetsResponse,
  errors: [],
}));

/** Lists datasets. */
export interface ListProjectsLocationsDatasetsRequest {
  /** Required. Name of the parent project. In form of `projects/{project-number-or-id}/locations/{location-id}` */
  parent: string;
  /** Optional. Requested page size. The server can return fewer results than requested. */
  pageSize?: number;
  /** Optional. A token identifying a page of results for the server to return. Typically obtained from next_page_token field in the response of a ListDatasets call. */
  pageToken?: string;
}

export const ListProjectsLocationsDatasetsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v3/projects/{projectsId}/locations/{locationsId}/datasets" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsDatasetsRequest>;

export type ListProjectsLocationsDatasetsResponse = ListDatasetsResponse;
export const ListProjectsLocationsDatasetsResponse = ListDatasetsResponse;

export type ListProjectsLocationsDatasetsError = CommonErrors;

export const listProjectsLocationsDatasets = API.makePaginated(() => ({
  input: ListProjectsLocationsDatasetsRequest,
  output: ListProjectsLocationsDatasetsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Deletes a dataset and all of its contents. */
export interface DeleteProjectsLocationsDatasetsRequest {
  /** Required. The name of the dataset to delete. */
  name: string;
}

export const DeleteProjectsLocationsDatasetsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v3/projects/{projectsId}/locations/{locationsId}/datasets/{datasetsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsDatasetsRequest>;

export type DeleteProjectsLocationsDatasetsResponse = Operation;
export const DeleteProjectsLocationsDatasetsResponse = Operation;

export type DeleteProjectsLocationsDatasetsError = CommonErrors;

export const deleteProjectsLocationsDatasets: API.OperationMethod<DeleteProjectsLocationsDatasetsRequest, DeleteProjectsLocationsDatasetsResponse, DeleteProjectsLocationsDatasetsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsDatasetsRequest,
  output: DeleteProjectsLocationsDatasetsResponse,
  errors: [],
}));

/** Import sentence pairs into translation Dataset. */
export interface ImportDataProjectsLocationsDatasetsRequest {
  /** Required. Name of the dataset. In form of `projects/{project-number-or-id}/locations/{location-id}/datasets/{dataset-id}` */
  dataset: string;
  /** Request body */
  body?: ImportDataRequest;
}

export const ImportDataProjectsLocationsDatasetsRequest = Schema.Struct({
  dataset: Schema.String.pipe(T.HttpPath("dataset")),
  body: Schema.optional(ImportDataRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3/projects/{projectsId}/locations/{locationsId}/datasets/{datasetsId}:importData", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ImportDataProjectsLocationsDatasetsRequest>;

export type ImportDataProjectsLocationsDatasetsResponse = Operation;
export const ImportDataProjectsLocationsDatasetsResponse = Operation;

export type ImportDataProjectsLocationsDatasetsError = CommonErrors;

export const importDataProjectsLocationsDatasets: API.OperationMethod<ImportDataProjectsLocationsDatasetsRequest, ImportDataProjectsLocationsDatasetsResponse, ImportDataProjectsLocationsDatasetsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ImportDataProjectsLocationsDatasetsRequest,
  output: ImportDataProjectsLocationsDatasetsResponse,
  errors: [],
}));

/** Exports dataset's data to the provided output location. */
export interface ExportDataProjectsLocationsDatasetsRequest {
  /** Required. Name of the dataset. In form of `projects/{project-number-or-id}/locations/{location-id}/datasets/{dataset-id}` */
  dataset: string;
  /** Request body */
  body?: ExportDataRequest;
}

export const ExportDataProjectsLocationsDatasetsRequest = Schema.Struct({
  dataset: Schema.String.pipe(T.HttpPath("dataset")),
  body: Schema.optional(ExportDataRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3/projects/{projectsId}/locations/{locationsId}/datasets/{datasetsId}:exportData", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ExportDataProjectsLocationsDatasetsRequest>;

export type ExportDataProjectsLocationsDatasetsResponse = Operation;
export const ExportDataProjectsLocationsDatasetsResponse = Operation;

export type ExportDataProjectsLocationsDatasetsError = CommonErrors;

export const exportDataProjectsLocationsDatasets: API.OperationMethod<ExportDataProjectsLocationsDatasetsRequest, ExportDataProjectsLocationsDatasetsResponse, ExportDataProjectsLocationsDatasetsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ExportDataProjectsLocationsDatasetsRequest,
  output: ExportDataProjectsLocationsDatasetsResponse,
  errors: [],
}));

/** Lists sentence pairs in the dataset. */
export interface ListProjectsLocationsDatasetsExamplesRequest {
  /** Required. Name of the parent dataset. In form of `projects/{project-number-or-id}/locations/{location-id}/datasets/{dataset-id}` */
  parent: string;
  /** Optional. An expression for filtering the examples that will be returned. Example filter: * `usage=TRAIN` */
  filter?: string;
  /** Optional. Requested page size. The server can return fewer results than requested. */
  pageSize?: number;
  /** Optional. A token identifying a page of results for the server to return. Typically obtained from next_page_token field in the response of a ListExamples call. */
  pageToken?: string;
}

export const ListProjectsLocationsDatasetsExamplesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v3/projects/{projectsId}/locations/{locationsId}/datasets/{datasetsId}/examples" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsDatasetsExamplesRequest>;

export type ListProjectsLocationsDatasetsExamplesResponse = ListExamplesResponse;
export const ListProjectsLocationsDatasetsExamplesResponse = ListExamplesResponse;

export type ListProjectsLocationsDatasetsExamplesError = CommonErrors;

export const listProjectsLocationsDatasetsExamples = API.makePaginated(() => ({
  input: ListProjectsLocationsDatasetsExamplesRequest,
  output: ListProjectsLocationsDatasetsExamplesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Creates an Adaptive MT dataset. */
export interface CreateProjectsLocationsAdaptiveMtDatasetsRequest {
  /** Required. Name of the parent project. In form of `projects/{project-number-or-id}/locations/{location-id}` */
  parent: string;
  /** Request body */
  body?: AdaptiveMtDataset;
}

export const CreateProjectsLocationsAdaptiveMtDatasetsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(AdaptiveMtDataset).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3/projects/{projectsId}/locations/{locationsId}/adaptiveMtDatasets", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsAdaptiveMtDatasetsRequest>;

export type CreateProjectsLocationsAdaptiveMtDatasetsResponse = AdaptiveMtDataset;
export const CreateProjectsLocationsAdaptiveMtDatasetsResponse = AdaptiveMtDataset;

export type CreateProjectsLocationsAdaptiveMtDatasetsError = CommonErrors;

export const createProjectsLocationsAdaptiveMtDatasets: API.OperationMethod<CreateProjectsLocationsAdaptiveMtDatasetsRequest, CreateProjectsLocationsAdaptiveMtDatasetsResponse, CreateProjectsLocationsAdaptiveMtDatasetsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsAdaptiveMtDatasetsRequest,
  output: CreateProjectsLocationsAdaptiveMtDatasetsResponse,
  errors: [],
}));

/** Deletes an Adaptive MT dataset, including all its entries and associated metadata. */
export interface DeleteProjectsLocationsAdaptiveMtDatasetsRequest {
  /** Required. Name of the dataset. In the form of `projects/{project-number-or-id}/locations/{location-id}/adaptiveMtDatasets/{adaptive-mt-dataset-id}` */
  name: string;
}

export const DeleteProjectsLocationsAdaptiveMtDatasetsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v3/projects/{projectsId}/locations/{locationsId}/adaptiveMtDatasets/{adaptiveMtDatasetsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsAdaptiveMtDatasetsRequest>;

export type DeleteProjectsLocationsAdaptiveMtDatasetsResponse = Empty;
export const DeleteProjectsLocationsAdaptiveMtDatasetsResponse = Empty;

export type DeleteProjectsLocationsAdaptiveMtDatasetsError = CommonErrors;

export const deleteProjectsLocationsAdaptiveMtDatasets: API.OperationMethod<DeleteProjectsLocationsAdaptiveMtDatasetsRequest, DeleteProjectsLocationsAdaptiveMtDatasetsResponse, DeleteProjectsLocationsAdaptiveMtDatasetsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsAdaptiveMtDatasetsRequest,
  output: DeleteProjectsLocationsAdaptiveMtDatasetsResponse,
  errors: [],
}));

/** Gets the Adaptive MT dataset. */
export interface GetProjectsLocationsAdaptiveMtDatasetsRequest {
  /** Required. Name of the dataset. In the form of `projects/{project-number-or-id}/locations/{location-id}/adaptiveMtDatasets/{adaptive-mt-dataset-id}` */
  name: string;
}

export const GetProjectsLocationsAdaptiveMtDatasetsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v3/projects/{projectsId}/locations/{locationsId}/adaptiveMtDatasets/{adaptiveMtDatasetsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsAdaptiveMtDatasetsRequest>;

export type GetProjectsLocationsAdaptiveMtDatasetsResponse = AdaptiveMtDataset;
export const GetProjectsLocationsAdaptiveMtDatasetsResponse = AdaptiveMtDataset;

export type GetProjectsLocationsAdaptiveMtDatasetsError = CommonErrors;

export const getProjectsLocationsAdaptiveMtDatasets: API.OperationMethod<GetProjectsLocationsAdaptiveMtDatasetsRequest, GetProjectsLocationsAdaptiveMtDatasetsResponse, GetProjectsLocationsAdaptiveMtDatasetsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsAdaptiveMtDatasetsRequest,
  output: GetProjectsLocationsAdaptiveMtDatasetsResponse,
  errors: [],
}));

/** Lists all Adaptive MT datasets for which the caller has read permission. */
export interface ListProjectsLocationsAdaptiveMtDatasetsRequest {
  /** Required. The resource name of the project from which to list the Adaptive MT datasets. `projects/{project-number-or-id}/locations/{location-id}` */
  parent: string;
  /** Optional. Requested page size. The server may return fewer results than requested. If unspecified, the server picks an appropriate default. */
  pageSize?: number;
  /** Optional. A token identifying a page of results the server should return. Typically, this is the value of ListAdaptiveMtDatasetsResponse.next_page_token returned from the previous call to `ListAdaptiveMtDatasets` method. The first page is returned if `page_token`is empty or missing. */
  pageToken?: string;
  /** Optional. An expression for filtering the results of the request. Filter is not supported yet. */
  filter?: string;
}

export const ListProjectsLocationsAdaptiveMtDatasetsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v3/projects/{projectsId}/locations/{locationsId}/adaptiveMtDatasets" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsAdaptiveMtDatasetsRequest>;

export type ListProjectsLocationsAdaptiveMtDatasetsResponse = ListAdaptiveMtDatasetsResponse;
export const ListProjectsLocationsAdaptiveMtDatasetsResponse = ListAdaptiveMtDatasetsResponse;

export type ListProjectsLocationsAdaptiveMtDatasetsError = CommonErrors;

export const listProjectsLocationsAdaptiveMtDatasets = API.makePaginated(() => ({
  input: ListProjectsLocationsAdaptiveMtDatasetsRequest,
  output: ListProjectsLocationsAdaptiveMtDatasetsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Imports an AdaptiveMtFile and adds all of its sentences into the AdaptiveMtDataset. */
export interface ImportAdaptiveMtFileProjectsLocationsAdaptiveMtDatasetsRequest {
  /** Required. The resource name of the file, in form of `projects/{project-number-or-id}/locations/{location_id}/adaptiveMtDatasets/{dataset}` */
  parent: string;
  /** Request body */
  body?: ImportAdaptiveMtFileRequest;
}

export const ImportAdaptiveMtFileProjectsLocationsAdaptiveMtDatasetsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(ImportAdaptiveMtFileRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3/projects/{projectsId}/locations/{locationsId}/adaptiveMtDatasets/{adaptiveMtDatasetsId}:importAdaptiveMtFile", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ImportAdaptiveMtFileProjectsLocationsAdaptiveMtDatasetsRequest>;

export type ImportAdaptiveMtFileProjectsLocationsAdaptiveMtDatasetsResponse = ImportAdaptiveMtFileResponse;
export const ImportAdaptiveMtFileProjectsLocationsAdaptiveMtDatasetsResponse = ImportAdaptiveMtFileResponse;

export type ImportAdaptiveMtFileProjectsLocationsAdaptiveMtDatasetsError = CommonErrors;

export const importAdaptiveMtFileProjectsLocationsAdaptiveMtDatasets: API.OperationMethod<ImportAdaptiveMtFileProjectsLocationsAdaptiveMtDatasetsRequest, ImportAdaptiveMtFileProjectsLocationsAdaptiveMtDatasetsResponse, ImportAdaptiveMtFileProjectsLocationsAdaptiveMtDatasetsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ImportAdaptiveMtFileProjectsLocationsAdaptiveMtDatasetsRequest,
  output: ImportAdaptiveMtFileProjectsLocationsAdaptiveMtDatasetsResponse,
  errors: [],
}));

/** Gets and AdaptiveMtFile */
export interface GetProjectsLocationsAdaptiveMtDatasetsAdaptiveMtFilesRequest {
  /** Required. The resource name of the file, in form of `projects/{project-number-or-id}/locations/{location_id}/adaptiveMtDatasets/{dataset}/adaptiveMtFiles/{file}` */
  name: string;
}

export const GetProjectsLocationsAdaptiveMtDatasetsAdaptiveMtFilesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v3/projects/{projectsId}/locations/{locationsId}/adaptiveMtDatasets/{adaptiveMtDatasetsId}/adaptiveMtFiles/{adaptiveMtFilesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsAdaptiveMtDatasetsAdaptiveMtFilesRequest>;

export type GetProjectsLocationsAdaptiveMtDatasetsAdaptiveMtFilesResponse = AdaptiveMtFile;
export const GetProjectsLocationsAdaptiveMtDatasetsAdaptiveMtFilesResponse = AdaptiveMtFile;

export type GetProjectsLocationsAdaptiveMtDatasetsAdaptiveMtFilesError = CommonErrors;

export const getProjectsLocationsAdaptiveMtDatasetsAdaptiveMtFiles: API.OperationMethod<GetProjectsLocationsAdaptiveMtDatasetsAdaptiveMtFilesRequest, GetProjectsLocationsAdaptiveMtDatasetsAdaptiveMtFilesResponse, GetProjectsLocationsAdaptiveMtDatasetsAdaptiveMtFilesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsAdaptiveMtDatasetsAdaptiveMtFilesRequest,
  output: GetProjectsLocationsAdaptiveMtDatasetsAdaptiveMtFilesResponse,
  errors: [],
}));

/** Deletes an AdaptiveMtFile along with its sentences. */
export interface DeleteProjectsLocationsAdaptiveMtDatasetsAdaptiveMtFilesRequest {
  /** Required. The resource name of the file to delete, in form of `projects/{project-number-or-id}/locations/{location_id}/adaptiveMtDatasets/{dataset}/adaptiveMtFiles/{file}` */
  name: string;
}

export const DeleteProjectsLocationsAdaptiveMtDatasetsAdaptiveMtFilesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v3/projects/{projectsId}/locations/{locationsId}/adaptiveMtDatasets/{adaptiveMtDatasetsId}/adaptiveMtFiles/{adaptiveMtFilesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsAdaptiveMtDatasetsAdaptiveMtFilesRequest>;

export type DeleteProjectsLocationsAdaptiveMtDatasetsAdaptiveMtFilesResponse = Empty;
export const DeleteProjectsLocationsAdaptiveMtDatasetsAdaptiveMtFilesResponse = Empty;

export type DeleteProjectsLocationsAdaptiveMtDatasetsAdaptiveMtFilesError = CommonErrors;

export const deleteProjectsLocationsAdaptiveMtDatasetsAdaptiveMtFiles: API.OperationMethod<DeleteProjectsLocationsAdaptiveMtDatasetsAdaptiveMtFilesRequest, DeleteProjectsLocationsAdaptiveMtDatasetsAdaptiveMtFilesResponse, DeleteProjectsLocationsAdaptiveMtDatasetsAdaptiveMtFilesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsAdaptiveMtDatasetsAdaptiveMtFilesRequest,
  output: DeleteProjectsLocationsAdaptiveMtDatasetsAdaptiveMtFilesResponse,
  errors: [],
}));

/** Lists all AdaptiveMtFiles associated to an AdaptiveMtDataset. */
export interface ListProjectsLocationsAdaptiveMtDatasetsAdaptiveMtFilesRequest {
  /** Required. The resource name of the dataset from which to list the Adaptive MT files. `projects/{project}/locations/{location}/adaptiveMtDatasets/{dataset}` */
  parent: string;
  /** Optional. */
  pageSize?: number;
  /** Optional. A token identifying a page of results the server should return. Typically, this is the value of ListAdaptiveMtFilesResponse.next_page_token returned from the previous call to `ListAdaptiveMtFiles` method. The first page is returned if `page_token`is empty or missing. */
  pageToken?: string;
}

export const ListProjectsLocationsAdaptiveMtDatasetsAdaptiveMtFilesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v3/projects/{projectsId}/locations/{locationsId}/adaptiveMtDatasets/{adaptiveMtDatasetsId}/adaptiveMtFiles" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsAdaptiveMtDatasetsAdaptiveMtFilesRequest>;

export type ListProjectsLocationsAdaptiveMtDatasetsAdaptiveMtFilesResponse = ListAdaptiveMtFilesResponse;
export const ListProjectsLocationsAdaptiveMtDatasetsAdaptiveMtFilesResponse = ListAdaptiveMtFilesResponse;

export type ListProjectsLocationsAdaptiveMtDatasetsAdaptiveMtFilesError = CommonErrors;

export const listProjectsLocationsAdaptiveMtDatasetsAdaptiveMtFiles = API.makePaginated(() => ({
  input: ListProjectsLocationsAdaptiveMtDatasetsAdaptiveMtFilesRequest,
  output: ListProjectsLocationsAdaptiveMtDatasetsAdaptiveMtFilesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Lists all AdaptiveMtSentences under a given file/dataset. */
export interface ListProjectsLocationsAdaptiveMtDatasetsAdaptiveMtFilesAdaptiveMtSentencesRequest {
  /** Required. The resource name of the Adaptive MT file from which to list the sentences. The following format lists all sentences under a file. `projects/{project}/locations/{location}/adaptiveMtDatasets/{dataset}/adaptiveMtFiles/{file}` The following format lists all sentences within a dataset. `projects/{project}/locations/{location}/adaptiveMtDatasets/{dataset}` */
  parent: string;
  pageSize?: number;
  /** A token identifying a page of results the server should return. Typically, this is the value of ListAdaptiveMtSentencesRequest.next_page_token returned from the previous call to `ListTranslationMemories` method. The first page is returned if `page_token` is empty or missing. */
  pageToken?: string;
}

export const ListProjectsLocationsAdaptiveMtDatasetsAdaptiveMtFilesAdaptiveMtSentencesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v3/projects/{projectsId}/locations/{locationsId}/adaptiveMtDatasets/{adaptiveMtDatasetsId}/adaptiveMtFiles/{adaptiveMtFilesId}/adaptiveMtSentences" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsAdaptiveMtDatasetsAdaptiveMtFilesAdaptiveMtSentencesRequest>;

export type ListProjectsLocationsAdaptiveMtDatasetsAdaptiveMtFilesAdaptiveMtSentencesResponse = ListAdaptiveMtSentencesResponse;
export const ListProjectsLocationsAdaptiveMtDatasetsAdaptiveMtFilesAdaptiveMtSentencesResponse = ListAdaptiveMtSentencesResponse;

export type ListProjectsLocationsAdaptiveMtDatasetsAdaptiveMtFilesAdaptiveMtSentencesError = CommonErrors;

export const listProjectsLocationsAdaptiveMtDatasetsAdaptiveMtFilesAdaptiveMtSentences = API.makePaginated(() => ({
  input: ListProjectsLocationsAdaptiveMtDatasetsAdaptiveMtFilesAdaptiveMtSentencesRequest,
  output: ListProjectsLocationsAdaptiveMtDatasetsAdaptiveMtFilesAdaptiveMtSentencesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Lists all AdaptiveMtSentences under a given file/dataset. */
export interface ListProjectsLocationsAdaptiveMtDatasetsAdaptiveMtSentencesRequest {
  /** Required. The resource name of the Adaptive MT file from which to list the sentences. The following format lists all sentences under a file. `projects/{project}/locations/{location}/adaptiveMtDatasets/{dataset}/adaptiveMtFiles/{file}` The following format lists all sentences within a dataset. `projects/{project}/locations/{location}/adaptiveMtDatasets/{dataset}` */
  parent: string;
  pageSize?: number;
  /** A token identifying a page of results the server should return. Typically, this is the value of ListAdaptiveMtSentencesRequest.next_page_token returned from the previous call to `ListTranslationMemories` method. The first page is returned if `page_token` is empty or missing. */
  pageToken?: string;
}

export const ListProjectsLocationsAdaptiveMtDatasetsAdaptiveMtSentencesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v3/projects/{projectsId}/locations/{locationsId}/adaptiveMtDatasets/{adaptiveMtDatasetsId}/adaptiveMtSentences" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsAdaptiveMtDatasetsAdaptiveMtSentencesRequest>;

export type ListProjectsLocationsAdaptiveMtDatasetsAdaptiveMtSentencesResponse = ListAdaptiveMtSentencesResponse;
export const ListProjectsLocationsAdaptiveMtDatasetsAdaptiveMtSentencesResponse = ListAdaptiveMtSentencesResponse;

export type ListProjectsLocationsAdaptiveMtDatasetsAdaptiveMtSentencesError = CommonErrors;

export const listProjectsLocationsAdaptiveMtDatasetsAdaptiveMtSentences = API.makePaginated(() => ({
  input: ListProjectsLocationsAdaptiveMtDatasetsAdaptiveMtSentencesRequest,
  output: ListProjectsLocationsAdaptiveMtDatasetsAdaptiveMtSentencesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Creates a Model. */
export interface CreateProjectsLocationsModelsRequest {
  /** Required. The project name, in form of `projects/{project}/locations/{location}` */
  parent: string;
  /** Request body */
  body?: Model;
}

export const CreateProjectsLocationsModelsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(Model).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3/projects/{projectsId}/locations/{locationsId}/models", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsModelsRequest>;

export type CreateProjectsLocationsModelsResponse = Operation;
export const CreateProjectsLocationsModelsResponse = Operation;

export type CreateProjectsLocationsModelsError = CommonErrors;

export const createProjectsLocationsModels: API.OperationMethod<CreateProjectsLocationsModelsRequest, CreateProjectsLocationsModelsResponse, CreateProjectsLocationsModelsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsModelsRequest,
  output: CreateProjectsLocationsModelsResponse,
  errors: [],
}));

/** Lists models. */
export interface ListProjectsLocationsModelsRequest {
  /** Required. Name of the parent project. In form of `projects/{project-number-or-id}/locations/{location-id}` */
  parent: string;
  /** Optional. An expression for filtering the models that will be returned. Supported filter: `dataset_id=${dataset_id}` */
  filter?: string;
  /** Optional. Requested page size. The server can return fewer results than requested. */
  pageSize?: number;
  /** Optional. A token identifying a page of results for the server to return. Typically obtained from next_page_token field in the response of a ListModels call. */
  pageToken?: string;
}

export const ListProjectsLocationsModelsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v3/projects/{projectsId}/locations/{locationsId}/models" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsModelsRequest>;

export type ListProjectsLocationsModelsResponse = ListModelsResponse;
export const ListProjectsLocationsModelsResponse = ListModelsResponse;

export type ListProjectsLocationsModelsError = CommonErrors;

export const listProjectsLocationsModels = API.makePaginated(() => ({
  input: ListProjectsLocationsModelsRequest,
  output: ListProjectsLocationsModelsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets a model. */
export interface GetProjectsLocationsModelsRequest {
  /** Required. The resource name of the model to retrieve. */
  name: string;
}

export const GetProjectsLocationsModelsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v3/projects/{projectsId}/locations/{locationsId}/models/{modelsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsModelsRequest>;

export type GetProjectsLocationsModelsResponse = Model;
export const GetProjectsLocationsModelsResponse = Model;

export type GetProjectsLocationsModelsError = CommonErrors;

export const getProjectsLocationsModels: API.OperationMethod<GetProjectsLocationsModelsRequest, GetProjectsLocationsModelsResponse, GetProjectsLocationsModelsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsModelsRequest,
  output: GetProjectsLocationsModelsResponse,
  errors: [],
}));

/** Deletes a model. */
export interface DeleteProjectsLocationsModelsRequest {
  /** Required. The name of the model to delete. */
  name: string;
}

export const DeleteProjectsLocationsModelsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v3/projects/{projectsId}/locations/{locationsId}/models/{modelsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsModelsRequest>;

export type DeleteProjectsLocationsModelsResponse = Operation;
export const DeleteProjectsLocationsModelsResponse = Operation;

export type DeleteProjectsLocationsModelsError = CommonErrors;

export const deleteProjectsLocationsModels: API.OperationMethod<DeleteProjectsLocationsModelsRequest, DeleteProjectsLocationsModelsResponse, DeleteProjectsLocationsModelsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsModelsRequest,
  output: DeleteProjectsLocationsModelsResponse,
  errors: [],
}));

