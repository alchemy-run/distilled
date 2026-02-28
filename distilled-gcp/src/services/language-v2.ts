// ==========================================================================
// Cloud Natural Language API (language v2)
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
  name: "language",
  version: "v2",
  rootUrl: "https://language.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface Document {
  /** Required. If the type is not set or is `TYPE_UNSPECIFIED`, returns an `INVALID_ARGUMENT` error. */
  type?: "TYPE_UNSPECIFIED" | "PLAIN_TEXT" | "HTML" | (string & {});
  /** The content of the input in string format. Cloud audit logging exempt since it is based on user data. */
  content?: string;
  /** The Google Cloud Storage URI where the file content is located. This URI must be of the form: gs://bucket_name/object_name. For more details, see https://cloud.google.com/storage/docs/reference-uris. NOTE: Cloud Storage object versioning is not supported. */
  gcsContentUri?: string;
  /** Optional. The language of the document (if not specified, the language is automatically detected). Both ISO and BCP-47 language codes are accepted. [Language Support](https://cloud.google.com/natural-language/docs/languages) lists currently supported languages for each API method. If the language (either specified by the caller or automatically detected) is not supported by the called API method, an `INVALID_ARGUMENT` error is returned. */
  languageCode?: string;
}

export const Document: Schema.Schema<Document> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
  content: Schema.optional(Schema.String),
  gcsContentUri: Schema.optional(Schema.String),
  languageCode: Schema.optional(Schema.String),
})).annotate({ identifier: "Document" }) as any as Schema.Schema<Document>;

export interface AnalyzeSentimentRequest {
  /** Required. Input document. */
  document?: Document;
  /** The encoding type used by the API to calculate sentence offsets. */
  encodingType?: "NONE" | "UTF8" | "UTF16" | "UTF32" | (string & {});
}

export const AnalyzeSentimentRequest: Schema.Schema<AnalyzeSentimentRequest> = Schema.suspend(() => Schema.Struct({
  document: Schema.optional(Document),
  encodingType: Schema.optional(Schema.String),
})).annotate({ identifier: "AnalyzeSentimentRequest" }) as any as Schema.Schema<AnalyzeSentimentRequest>;

export interface Sentiment {
  /** A non-negative number in the [0, +inf] range, which represents the absolute magnitude of sentiment regardless of score (positive or negative). */
  magnitude?: number;
  /** Sentiment score between -1.0 (negative sentiment) and 1.0 (positive sentiment). */
  score?: number;
}

export const Sentiment: Schema.Schema<Sentiment> = Schema.suspend(() => Schema.Struct({
  magnitude: Schema.optional(Schema.Number),
  score: Schema.optional(Schema.Number),
})).annotate({ identifier: "Sentiment" }) as any as Schema.Schema<Sentiment>;

export interface TextSpan {
  /** The content of the text span, which is a substring of the document. */
  content?: string;
  /** The API calculates the beginning offset of the content in the original document according to the EncodingType specified in the API request. */
  beginOffset?: number;
}

export const TextSpan: Schema.Schema<TextSpan> = Schema.suspend(() => Schema.Struct({
  content: Schema.optional(Schema.String),
  beginOffset: Schema.optional(Schema.Number),
})).annotate({ identifier: "TextSpan" }) as any as Schema.Schema<TextSpan>;

export interface Sentence {
  /** The sentence text. */
  text?: TextSpan;
  /** For calls to AnalyzeSentiment or if AnnotateTextRequest.Features.extract_document_sentiment is set to true, this field will contain the sentiment for the sentence. */
  sentiment?: Sentiment;
}

export const Sentence: Schema.Schema<Sentence> = Schema.suspend(() => Schema.Struct({
  text: Schema.optional(TextSpan),
  sentiment: Schema.optional(Sentiment),
})).annotate({ identifier: "Sentence" }) as any as Schema.Schema<Sentence>;

export interface AnalyzeSentimentResponse {
  /** The overall sentiment of the input document. */
  documentSentiment?: Sentiment;
  /** The language of the text, which will be the same as the language specified in the request or, if not specified, the automatically-detected language. See Document.language_code field for more details. */
  languageCode?: string;
  /** The sentiment for all the sentences in the document. */
  sentences?: Array<Sentence>;
  /** Whether the language is officially supported. The API may still return a response when the language is not supported, but it is on a best effort basis. */
  languageSupported?: boolean;
}

export const AnalyzeSentimentResponse: Schema.Schema<AnalyzeSentimentResponse> = Schema.suspend(() => Schema.Struct({
  documentSentiment: Schema.optional(Sentiment),
  languageCode: Schema.optional(Schema.String),
  sentences: Schema.optional(Schema.Array(Sentence)),
  languageSupported: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "AnalyzeSentimentResponse" }) as any as Schema.Schema<AnalyzeSentimentResponse>;

export interface AnalyzeEntitiesRequest {
  /** Required. Input document. */
  document?: Document;
  /** The encoding type used by the API to calculate offsets. */
  encodingType?: "NONE" | "UTF8" | "UTF16" | "UTF32" | (string & {});
}

export const AnalyzeEntitiesRequest: Schema.Schema<AnalyzeEntitiesRequest> = Schema.suspend(() => Schema.Struct({
  document: Schema.optional(Document),
  encodingType: Schema.optional(Schema.String),
})).annotate({ identifier: "AnalyzeEntitiesRequest" }) as any as Schema.Schema<AnalyzeEntitiesRequest>;

export interface EntityMention {
  /** The mention text. */
  text?: TextSpan;
  /** The type of the entity mention. */
  type?: "TYPE_UNKNOWN" | "PROPER" | "COMMON" | (string & {});
  /** For calls to AnalyzeEntitySentiment this field will contain the sentiment expressed for this mention of the entity in the provided document. */
  sentiment?: Sentiment;
  /** Probability score associated with the entity. The score shows the probability of the entity mention being the entity type. The score is in (0, 1] range. */
  probability?: number;
}

export const EntityMention: Schema.Schema<EntityMention> = Schema.suspend(() => Schema.Struct({
  text: Schema.optional(TextSpan),
  type: Schema.optional(Schema.String),
  sentiment: Schema.optional(Sentiment),
  probability: Schema.optional(Schema.Number),
})).annotate({ identifier: "EntityMention" }) as any as Schema.Schema<EntityMention>;

export interface Entity {
  /** The representative name for the entity. */
  name?: string;
  /** The entity type. */
  type?: "UNKNOWN" | "PERSON" | "LOCATION" | "ORGANIZATION" | "EVENT" | "WORK_OF_ART" | "CONSUMER_GOOD" | "OTHER" | "PHONE_NUMBER" | "ADDRESS" | "DATE" | "NUMBER" | "PRICE" | (string & {});
  /** Metadata associated with the entity. For the metadata associated with other entity types, see the Type table below. */
  metadata?: Record<string, string>;
  /** The mentions of this entity in the input document. The API currently supports proper noun mentions. */
  mentions?: Array<EntityMention>;
  /** For calls to AnalyzeEntitySentiment this field will contain the aggregate sentiment expressed for this entity in the provided document. */
  sentiment?: Sentiment;
}

export const Entity: Schema.Schema<Entity> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  mentions: Schema.optional(Schema.Array(EntityMention)),
  sentiment: Schema.optional(Sentiment),
})).annotate({ identifier: "Entity" }) as any as Schema.Schema<Entity>;

export interface AnalyzeEntitiesResponse {
  /** The recognized entities in the input document. */
  entities?: Array<Entity>;
  /** The language of the text, which will be the same as the language specified in the request or, if not specified, the automatically-detected language. See Document.language_code field for more details. */
  languageCode?: string;
  /** Whether the language is officially supported. The API may still return a response when the language is not supported, but it is on a best effort basis. */
  languageSupported?: boolean;
}

export const AnalyzeEntitiesResponse: Schema.Schema<AnalyzeEntitiesResponse> = Schema.suspend(() => Schema.Struct({
  entities: Schema.optional(Schema.Array(Entity)),
  languageCode: Schema.optional(Schema.String),
  languageSupported: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "AnalyzeEntitiesResponse" }) as any as Schema.Schema<AnalyzeEntitiesResponse>;

export interface ClassifyTextRequest {
  /** Required. Input document. */
  document?: Document;
}

export const ClassifyTextRequest: Schema.Schema<ClassifyTextRequest> = Schema.suspend(() => Schema.Struct({
  document: Schema.optional(Document),
})).annotate({ identifier: "ClassifyTextRequest" }) as any as Schema.Schema<ClassifyTextRequest>;

export interface ClassificationCategory {
  /** The name of the category representing the document. */
  name?: string;
  /** The classifier's confidence of the category. Number represents how certain the classifier is that this category represents the given text. */
  confidence?: number;
  /** Optional. The classifier's severity of the category. This is only present when the ModerateTextRequest.ModelVersion is set to MODEL_VERSION_2, and the corresponding category has a severity score. */
  severity?: number;
}

export const ClassificationCategory: Schema.Schema<ClassificationCategory> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  confidence: Schema.optional(Schema.Number),
  severity: Schema.optional(Schema.Number),
})).annotate({ identifier: "ClassificationCategory" }) as any as Schema.Schema<ClassificationCategory>;

export interface ClassifyTextResponse {
  /** Categories representing the input document. */
  categories?: Array<ClassificationCategory>;
  /** The language of the text, which will be the same as the language specified in the request or, if not specified, the automatically-detected language. See Document.language_code field for more details. */
  languageCode?: string;
  /** Whether the language is officially supported. The API may still return a response when the language is not supported, but it is on a best effort basis. */
  languageSupported?: boolean;
}

export const ClassifyTextResponse: Schema.Schema<ClassifyTextResponse> = Schema.suspend(() => Schema.Struct({
  categories: Schema.optional(Schema.Array(ClassificationCategory)),
  languageCode: Schema.optional(Schema.String),
  languageSupported: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "ClassifyTextResponse" }) as any as Schema.Schema<ClassifyTextResponse>;

export interface ModerateTextRequest {
  /** Required. Input document. */
  document?: Document;
  /** Optional. The model version to use for ModerateText. */
  modelVersion?: "MODEL_VERSION_UNSPECIFIED" | "MODEL_VERSION_1" | "MODEL_VERSION_2" | (string & {});
}

export const ModerateTextRequest: Schema.Schema<ModerateTextRequest> = Schema.suspend(() => Schema.Struct({
  document: Schema.optional(Document),
  modelVersion: Schema.optional(Schema.String),
})).annotate({ identifier: "ModerateTextRequest" }) as any as Schema.Schema<ModerateTextRequest>;

export interface ModerateTextResponse {
  /** Harmful and sensitive categories representing the input document. */
  moderationCategories?: Array<ClassificationCategory>;
  /** The language of the text, which will be the same as the language specified in the request or, if not specified, the automatically-detected language. See Document.language_code field for more details. */
  languageCode?: string;
  /** Whether the language is officially supported. The API may still return a response when the language is not supported, but it is on a best effort basis. */
  languageSupported?: boolean;
}

export const ModerateTextResponse: Schema.Schema<ModerateTextResponse> = Schema.suspend(() => Schema.Struct({
  moderationCategories: Schema.optional(Schema.Array(ClassificationCategory)),
  languageCode: Schema.optional(Schema.String),
  languageSupported: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "ModerateTextResponse" }) as any as Schema.Schema<ModerateTextResponse>;

export interface AnnotateTextRequestFeatures {
  /** Optional. Extract entities. */
  extractEntities?: boolean;
  /** Optional. Extract document-level sentiment. */
  extractDocumentSentiment?: boolean;
  /** Optional. Classify the full document into categories. */
  classifyText?: boolean;
  /** Optional. Moderate the document for harmful and sensitive categories. */
  moderateText?: boolean;
}

export const AnnotateTextRequestFeatures: Schema.Schema<AnnotateTextRequestFeatures> = Schema.suspend(() => Schema.Struct({
  extractEntities: Schema.optional(Schema.Boolean),
  extractDocumentSentiment: Schema.optional(Schema.Boolean),
  classifyText: Schema.optional(Schema.Boolean),
  moderateText: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "AnnotateTextRequestFeatures" }) as any as Schema.Schema<AnnotateTextRequestFeatures>;

export interface AnnotateTextRequest {
  /** Required. Input document. */
  document?: Document;
  /** Required. The enabled features. */
  features?: AnnotateTextRequestFeatures;
  /** The encoding type used by the API to calculate offsets. */
  encodingType?: "NONE" | "UTF8" | "UTF16" | "UTF32" | (string & {});
}

export const AnnotateTextRequest: Schema.Schema<AnnotateTextRequest> = Schema.suspend(() => Schema.Struct({
  document: Schema.optional(Document),
  features: Schema.optional(AnnotateTextRequestFeatures),
  encodingType: Schema.optional(Schema.String),
})).annotate({ identifier: "AnnotateTextRequest" }) as any as Schema.Schema<AnnotateTextRequest>;

export interface AnnotateTextResponse {
  /** Sentences in the input document. Populated if the user enables AnnotateTextRequest.Features.extract_document_sentiment. */
  sentences?: Array<Sentence>;
  /** Entities, along with their semantic information, in the input document. Populated if the user enables AnnotateTextRequest.Features.extract_entities . */
  entities?: Array<Entity>;
  /** The overall sentiment for the document. Populated if the user enables AnnotateTextRequest.Features.extract_document_sentiment. */
  documentSentiment?: Sentiment;
  /** The language of the text, which will be the same as the language specified in the request or, if not specified, the automatically-detected language. See Document.language_code field for more details. */
  languageCode?: string;
  /** Categories identified in the input document. */
  categories?: Array<ClassificationCategory>;
  /** Harmful and sensitive categories identified in the input document. */
  moderationCategories?: Array<ClassificationCategory>;
  /** Whether the language is officially supported by all requested features. The API may still return a response when the language is not supported, but it is on a best effort basis. */
  languageSupported?: boolean;
}

export const AnnotateTextResponse: Schema.Schema<AnnotateTextResponse> = Schema.suspend(() => Schema.Struct({
  sentences: Schema.optional(Schema.Array(Sentence)),
  entities: Schema.optional(Schema.Array(Entity)),
  documentSentiment: Schema.optional(Sentiment),
  languageCode: Schema.optional(Schema.String),
  categories: Schema.optional(Schema.Array(ClassificationCategory)),
  moderationCategories: Schema.optional(Schema.Array(ClassificationCategory)),
  languageSupported: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "AnnotateTextResponse" }) as any as Schema.Schema<AnnotateTextResponse>;

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

export interface XPSFileSpec {
  fileFormat?: "FILE_FORMAT_UNKNOWN" | "FILE_FORMAT_SSTABLE" | "FILE_FORMAT_TRANSLATION_RKV" | "FILE_FORMAT_RECORDIO" | "FILE_FORMAT_RAW_CSV" | "FILE_FORMAT_RAW_CAPACITOR" | (string & {});
  /** Deprecated. Use file_spec. */
  directoryPath?: string;
  /** Deprecated. Use file_spec. */
  singleFilePath?: string;
  /** Single file path, or file pattern of format "/path/to/file@shard_count". E.g. /cns/cell-d/somewhere/file@2 is expanded to two files: /cns/cell-d/somewhere/file-00000-of-00002 and /cns/cell-d/somewhere/file-00001-of-00002. */
  fileSpec?: string;
}

export const XPSFileSpec: Schema.Schema<XPSFileSpec> = Schema.suspend(() => Schema.Struct({
  fileFormat: Schema.optional(Schema.String),
  directoryPath: Schema.optional(Schema.String),
  singleFilePath: Schema.optional(Schema.String),
  fileSpec: Schema.optional(Schema.String),
})).annotate({ identifier: "XPSFileSpec" }) as any as Schema.Schema<XPSFileSpec>;

export interface XPSExampleSet {
  /** File spec of the examples or input sources. */
  fileSpec?: XPSFileSpec;
  /** Number of examples. */
  numExamples?: string;
  /** Number of input sources. */
  numInputSources?: string;
  /** Fingerprint of the example set. */
  fingerprint?: string;
}

export const XPSExampleSet: Schema.Schema<XPSExampleSet> = Schema.suspend(() => Schema.Struct({
  fileSpec: Schema.optional(XPSFileSpec),
  numExamples: Schema.optional(Schema.String),
  numInputSources: Schema.optional(Schema.String),
  fingerprint: Schema.optional(Schema.String),
})).annotate({ identifier: "XPSExampleSet" }) as any as Schema.Schema<XPSExampleSet>;

export interface XPSBatchPredictResponse {
  /** Examples for batch prediction result. Under full API implementation, results are stored in shared RecordIO of AnnotatedExample protobufs, the annotations field of which is populated by XPS backend. */
  exampleSet?: XPSExampleSet;
}

export const XPSBatchPredictResponse: Schema.Schema<XPSBatchPredictResponse> = Schema.suspend(() => Schema.Struct({
  exampleSet: Schema.optional(XPSExampleSet),
})).annotate({ identifier: "XPSBatchPredictResponse" }) as any as Schema.Schema<XPSBatchPredictResponse>;

export interface XPSDataErrors {
  /** Type of the error. */
  errorType?: "ERROR_TYPE_UNSPECIFIED" | "UNSUPPORTED_AUDIO_FORMAT" | "FILE_EXTENSION_MISMATCH_WITH_AUDIO_FORMAT" | "FILE_TOO_LARGE" | "MISSING_TRANSCRIPTION" | (string & {});
  /** Number of records having errors associated with the enum. */
  count?: number;
}

export const XPSDataErrors: Schema.Schema<XPSDataErrors> = Schema.suspend(() => Schema.Struct({
  errorType: Schema.optional(Schema.String),
  count: Schema.optional(Schema.Number),
})).annotate({ identifier: "XPSDataErrors" }) as any as Schema.Schema<XPSDataErrors>;

export interface XPSSpeechPreprocessStats {
  /** The number of examples labeled as TRAIN by Speech xps server. */
  trainExamplesCount?: number;
  /** The number of examples labelled as TEST by Speech xps server. */
  testExamplesCount?: number;
  /** The number of rows marked as MACHINE_TRANSCRIBED */
  numMachineTranscribedExamples?: number;
  /** The number of rows marked HUMAN_LABELLED */
  numHumanLabeledExamples?: number;
  /** The number of samples found in the previously recorded logs data. */
  numLogsExamples?: number;
  /** Different types of data errors and the counts associated with them. */
  dataErrors?: Array<XPSDataErrors>;
  /** The number of sentences in the training data set. */
  trainSentencesCount?: number;
  /** The number of sentences in the test data set. */
  testSentencesCount?: number;
  /** The number of words in the training data set. */
  trainWordsCount?: number;
  /** The number of words in the test data set. */
  testWordsCount?: number;
}

export const XPSSpeechPreprocessStats: Schema.Schema<XPSSpeechPreprocessStats> = Schema.suspend(() => Schema.Struct({
  trainExamplesCount: Schema.optional(Schema.Number),
  testExamplesCount: Schema.optional(Schema.Number),
  numMachineTranscribedExamples: Schema.optional(Schema.Number),
  numHumanLabeledExamples: Schema.optional(Schema.Number),
  numLogsExamples: Schema.optional(Schema.Number),
  dataErrors: Schema.optional(Schema.Array(XPSDataErrors)),
  trainSentencesCount: Schema.optional(Schema.Number),
  testSentencesCount: Schema.optional(Schema.Number),
  trainWordsCount: Schema.optional(Schema.Number),
  testWordsCount: Schema.optional(Schema.Number),
})).annotate({ identifier: "XPSSpeechPreprocessStats" }) as any as Schema.Schema<XPSSpeechPreprocessStats>;

export interface XPSSpeechEvaluationMetricsSubModelEvaluationMetric {
  /** Word error rate (standard error metric used for speech recognition). */
  wer?: number;
  /** Number of words over which the word error rate was computed. */
  numWords?: number;
  /** Number of utterances used in the wer computation. */
  numUtterances?: number;
  /** Below fields are used for debugging purposes */
  sentenceAccuracy?: number;
  numInsertions?: number;
  numSubstitutions?: number;
  numDeletions?: number;
  /** Type of the biasing model. */
  biasingModelType?: "BIASING_MODEL_TYPE_UNSPECIFIED" | "COMMAND_AND_SEARCH" | "PHONE_CALL" | "VIDEO" | "DEFAULT" | (string & {});
  /** If true then it means we have an enhanced version of the biasing models. */
  isEnhancedModel?: boolean;
}

export const XPSSpeechEvaluationMetricsSubModelEvaluationMetric: Schema.Schema<XPSSpeechEvaluationMetricsSubModelEvaluationMetric> = Schema.suspend(() => Schema.Struct({
  wer: Schema.optional(Schema.Number),
  numWords: Schema.optional(Schema.Number),
  numUtterances: Schema.optional(Schema.Number),
  sentenceAccuracy: Schema.optional(Schema.Number),
  numInsertions: Schema.optional(Schema.Number),
  numSubstitutions: Schema.optional(Schema.Number),
  numDeletions: Schema.optional(Schema.Number),
  biasingModelType: Schema.optional(Schema.String),
  isEnhancedModel: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "XPSSpeechEvaluationMetricsSubModelEvaluationMetric" }) as any as Schema.Schema<XPSSpeechEvaluationMetricsSubModelEvaluationMetric>;

export interface XPSSpeechEvaluationMetrics {
  /** Evaluation metrics for all submodels contained in this model. */
  subModelEvaluationMetrics?: Array<XPSSpeechEvaluationMetricsSubModelEvaluationMetric>;
}

export const XPSSpeechEvaluationMetrics: Schema.Schema<XPSSpeechEvaluationMetrics> = Schema.suspend(() => Schema.Struct({
  subModelEvaluationMetrics: Schema.optional(Schema.Array(XPSSpeechEvaluationMetricsSubModelEvaluationMetric)),
})).annotate({ identifier: "XPSSpeechEvaluationMetrics" }) as any as Schema.Schema<XPSSpeechEvaluationMetrics>;

export interface XPSSpeechPreprocessResponse {
  /** Stats associated with the data. */
  speechPreprocessStats?: XPSSpeechPreprocessStats;
  /** Location of shards of sstables (training data) of DataUtterance protos. */
  cnsTrainDataPath?: string;
  /** Location od shards of sstables (test data) of DataUtterance protos. */
  cnsTestDataPath?: string;
  /** The metrics for prebuilt speech models. They are included here because there is no prebuilt speech models stored in the AutoML. */
  prebuiltModelEvaluationMetrics?: XPSSpeechEvaluationMetrics;
}

export const XPSSpeechPreprocessResponse: Schema.Schema<XPSSpeechPreprocessResponse> = Schema.suspend(() => Schema.Struct({
  speechPreprocessStats: Schema.optional(XPSSpeechPreprocessStats),
  cnsTrainDataPath: Schema.optional(Schema.String),
  cnsTestDataPath: Schema.optional(Schema.String),
  prebuiltModelEvaluationMetrics: Schema.optional(XPSSpeechEvaluationMetrics),
})).annotate({ identifier: "XPSSpeechPreprocessResponse" }) as any as Schema.Schema<XPSSpeechPreprocessResponse>;

export interface XPSTranslationPreprocessResponse {
  /** Total example count parsed. */
  parsedExampleCount?: string;
  /** Total valid example count. */
  validExampleCount?: string;
}

export const XPSTranslationPreprocessResponse: Schema.Schema<XPSTranslationPreprocessResponse> = Schema.suspend(() => Schema.Struct({
  parsedExampleCount: Schema.optional(Schema.String),
  validExampleCount: Schema.optional(Schema.String),
})).annotate({ identifier: "XPSTranslationPreprocessResponse" }) as any as Schema.Schema<XPSTranslationPreprocessResponse>;

export interface XPSStructType {
  /** Unordered map of struct field names to their data types. */
  fields?: Record<string, XPSDataType>;
}

export const XPSStructType: Schema.Schema<XPSStructType> = Schema.suspend(() => Schema.Struct({
  fields: Schema.optional(Schema.Record(Schema.String, XPSDataType)),
})).annotate({ identifier: "XPSStructType" }) as any as Schema.Schema<XPSStructType>;

export interface XPSDataType {
  /** Required. The TypeCode for this type. */
  typeCode?: "TYPE_CODE_UNSPECIFIED" | "FLOAT64" | "TIMESTAMP" | "STRING" | "ARRAY" | "STRUCT" | "CATEGORY" | (string & {});
  /** If true, this DataType can also be `null`. */
  nullable?: boolean;
  /** If type_code == ARRAY, then `list_element_type` is the type of the elements. */
  listElementType?: XPSDataType;
  /** If type_code == STRUCT, then `struct_type` provides type information for the struct's fields. */
  structType?: XPSStructType;
  /** If type_code == TIMESTAMP then `time_format` provides the format in which that time field is expressed. The time_format must be written in `strftime` syntax. If time_format is not set, then the default format as described on the field is used. */
  timeFormat?: string;
  /** The highly compatible data types to this data type. */
  compatibleDataTypes?: Array<XPSDataType>;
}

export const XPSDataType: Schema.Schema<XPSDataType> = Schema.suspend(() => Schema.Struct({
  typeCode: Schema.optional(Schema.String),
  nullable: Schema.optional(Schema.Boolean),
  listElementType: Schema.optional(XPSDataType),
  structType: Schema.optional(XPSStructType),
  timeFormat: Schema.optional(Schema.String),
  compatibleDataTypes: Schema.optional(Schema.Array(XPSDataType)),
})).annotate({ identifier: "XPSDataType" }) as any as Schema.Schema<XPSDataType>;

export interface XPSFloat64StatsHistogramBucket {
  /** The minimum value of the bucket, inclusive. */
  min?: number;
  /** The maximum value of the bucket, exclusive unless max = `"Infinity"`, in which case it's inclusive. */
  max?: number;
  /** The number of data values that are in the bucket, i.e. are between min and max values. */
  count?: string;
}

export const XPSFloat64StatsHistogramBucket: Schema.Schema<XPSFloat64StatsHistogramBucket> = Schema.suspend(() => Schema.Struct({
  min: Schema.optional(Schema.Number),
  max: Schema.optional(Schema.Number),
  count: Schema.optional(Schema.String),
})).annotate({ identifier: "XPSFloat64StatsHistogramBucket" }) as any as Schema.Schema<XPSFloat64StatsHistogramBucket>;

export interface XPSCommonStats {
  distinctValueCount?: string;
  validValueCount?: string;
  nullValueCount?: string;
}

export const XPSCommonStats: Schema.Schema<XPSCommonStats> = Schema.suspend(() => Schema.Struct({
  distinctValueCount: Schema.optional(Schema.String),
  validValueCount: Schema.optional(Schema.String),
  nullValueCount: Schema.optional(Schema.String),
})).annotate({ identifier: "XPSCommonStats" }) as any as Schema.Schema<XPSCommonStats>;

export interface XPSFloat64Stats {
  /** The mean of the series. */
  mean?: number;
  /** The standard deviation of the series. */
  standardDeviation?: number;
  /** Ordered from 0 to k k-quantile values of the data series of n values. The value at index i is, approximately, the i*n/k-th smallest value in the series; for i = 0 and i = k these are, respectively, the min and max values. */
  quantiles?: Array<number>;
  /** Histogram buckets of the data series. Sorted by the min value of the bucket, ascendingly, and the number of the buckets is dynamically generated. The buckets are non-overlapping and completely cover whole FLOAT64 range with min of first bucket being `"-Infinity"`, and max of the last one being `"Infinity"`. */
  histogramBuckets?: Array<XPSFloat64StatsHistogramBucket>;
  commonStats?: XPSCommonStats;
}

export const XPSFloat64Stats: Schema.Schema<XPSFloat64Stats> = Schema.suspend(() => Schema.Struct({
  mean: Schema.optional(Schema.Number),
  standardDeviation: Schema.optional(Schema.Number),
  quantiles: Schema.optional(Schema.Array(Schema.Number)),
  histogramBuckets: Schema.optional(Schema.Array(XPSFloat64StatsHistogramBucket)),
  commonStats: Schema.optional(XPSCommonStats),
})).annotate({ identifier: "XPSFloat64Stats" }) as any as Schema.Schema<XPSFloat64Stats>;

export interface XPSStringStatsUnigramStats {
  /** The unigram. */
  value?: string;
  /** The number of occurrences of this unigram in the series. */
  count?: string;
}

export const XPSStringStatsUnigramStats: Schema.Schema<XPSStringStatsUnigramStats> = Schema.suspend(() => Schema.Struct({
  value: Schema.optional(Schema.String),
  count: Schema.optional(Schema.String),
})).annotate({ identifier: "XPSStringStatsUnigramStats" }) as any as Schema.Schema<XPSStringStatsUnigramStats>;

export interface XPSStringStats {
  /** The statistics of the top 20 unigrams, ordered by StringStats.UnigramStats.count. */
  topUnigramStats?: Array<XPSStringStatsUnigramStats>;
  commonStats?: XPSCommonStats;
}

export const XPSStringStats: Schema.Schema<XPSStringStats> = Schema.suspend(() => Schema.Struct({
  topUnigramStats: Schema.optional(Schema.Array(XPSStringStatsUnigramStats)),
  commonStats: Schema.optional(XPSCommonStats),
})).annotate({ identifier: "XPSStringStats" }) as any as Schema.Schema<XPSStringStats>;

export interface XPSTimestampStatsGranularStats {
  /** A map from granularity key to example count for that key. E.g. for hour_of_day `13` means 1pm, or for month_of_year `5` means May). */
  buckets?: Record<string, string>;
}

export const XPSTimestampStatsGranularStats: Schema.Schema<XPSTimestampStatsGranularStats> = Schema.suspend(() => Schema.Struct({
  buckets: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "XPSTimestampStatsGranularStats" }) as any as Schema.Schema<XPSTimestampStatsGranularStats>;

export interface XPSTimestampStats {
  /** The string key is the pre-defined granularity. Currently supported: hour_of_day, day_of_week, month_of_year. Granularities finer that the granularity of timestamp data are not populated (e.g. if timestamps are at day granularity, then hour_of_day is not populated). */
  granularStats?: Record<string, XPSTimestampStatsGranularStats>;
  commonStats?: XPSCommonStats;
  medianTimestampNanos?: string;
}

export const XPSTimestampStats: Schema.Schema<XPSTimestampStats> = Schema.suspend(() => Schema.Struct({
  granularStats: Schema.optional(Schema.Record(Schema.String, XPSTimestampStatsGranularStats)),
  commonStats: Schema.optional(XPSCommonStats),
  medianTimestampNanos: Schema.optional(Schema.String),
})).annotate({ identifier: "XPSTimestampStats" }) as any as Schema.Schema<XPSTimestampStats>;

export interface XPSArrayStats {
  /** Stats of all the values of all arrays, as if they were a single long series of data. The type depends on the element type of the array. */
  memberStats?: XPSDataStats;
  commonStats?: XPSCommonStats;
}

export const XPSArrayStats: Schema.Schema<XPSArrayStats> = Schema.suspend(() => Schema.Struct({
  memberStats: Schema.optional(XPSDataStats),
  commonStats: Schema.optional(XPSCommonStats),
})).annotate({ identifier: "XPSArrayStats" }) as any as Schema.Schema<XPSArrayStats>;

export interface XPSStructStats {
  /** Map from a field name of the struct to data stats aggregated over series of all data in that field across all the structs. */
  fieldStats?: Record<string, XPSDataStats>;
  commonStats?: XPSCommonStats;
}

export const XPSStructStats: Schema.Schema<XPSStructStats> = Schema.suspend(() => Schema.Struct({
  fieldStats: Schema.optional(Schema.Record(Schema.String, XPSDataStats)),
  commonStats: Schema.optional(XPSCommonStats),
})).annotate({ identifier: "XPSStructStats" }) as any as Schema.Schema<XPSStructStats>;

export interface XPSCategoryStatsSingleCategoryStats {
  /** The CATEGORY value. */
  value?: string;
  /** The number of occurrences of this value in the series. */
  count?: string;
}

export const XPSCategoryStatsSingleCategoryStats: Schema.Schema<XPSCategoryStatsSingleCategoryStats> = Schema.suspend(() => Schema.Struct({
  value: Schema.optional(Schema.String),
  count: Schema.optional(Schema.String),
})).annotate({ identifier: "XPSCategoryStatsSingleCategoryStats" }) as any as Schema.Schema<XPSCategoryStatsSingleCategoryStats>;

export interface XPSCategoryStats {
  /** The statistics of the top 20 CATEGORY values, ordered by CategoryStats.SingleCategoryStats.count. */
  topCategoryStats?: Array<XPSCategoryStatsSingleCategoryStats>;
  commonStats?: XPSCommonStats;
}

export const XPSCategoryStats: Schema.Schema<XPSCategoryStats> = Schema.suspend(() => Schema.Struct({
  topCategoryStats: Schema.optional(Schema.Array(XPSCategoryStatsSingleCategoryStats)),
  commonStats: Schema.optional(XPSCommonStats),
})).annotate({ identifier: "XPSCategoryStats" }) as any as Schema.Schema<XPSCategoryStats>;

export interface XPSDataStats {
  /** The number of distinct values. */
  distinctValueCount?: string;
  /** The number of values that are null. */
  nullValueCount?: string;
  /** The number of values that are valid. */
  validValueCount?: string;
  /** The statistics for FLOAT64 DataType. */
  float64Stats?: XPSFloat64Stats;
  /** The statistics for STRING DataType. */
  stringStats?: XPSStringStats;
  /** The statistics for TIMESTAMP DataType. */
  timestampStats?: XPSTimestampStats;
  /** The statistics for ARRAY DataType. */
  arrayStats?: XPSArrayStats;
  /** The statistics for STRUCT DataType. */
  structStats?: XPSStructStats;
  /** The statistics for CATEGORY DataType. */
  categoryStats?: XPSCategoryStats;
}

export const XPSDataStats: Schema.Schema<XPSDataStats> = Schema.suspend(() => Schema.Struct({
  distinctValueCount: Schema.optional(Schema.String),
  nullValueCount: Schema.optional(Schema.String),
  validValueCount: Schema.optional(Schema.String),
  float64Stats: Schema.optional(XPSFloat64Stats),
  stringStats: Schema.optional(XPSStringStats),
  timestampStats: Schema.optional(XPSTimestampStats),
  arrayStats: Schema.optional(XPSArrayStats),
  structStats: Schema.optional(XPSStructStats),
  categoryStats: Schema.optional(XPSCategoryStats),
})).annotate({ identifier: "XPSDataStats" }) as any as Schema.Schema<XPSDataStats>;

export interface XPSCorrelationStats {
  /** The correlation value using the Cramer's V measure. */
  cramersV?: number;
}

export const XPSCorrelationStats: Schema.Schema<XPSCorrelationStats> = Schema.suspend(() => Schema.Struct({
  cramersV: Schema.optional(Schema.Number),
})).annotate({ identifier: "XPSCorrelationStats" }) as any as Schema.Schema<XPSCorrelationStats>;

export interface XPSColumnSpecCorrelatedColumn {
  columnId?: number;
  correlationStats?: XPSCorrelationStats;
}

export const XPSColumnSpecCorrelatedColumn: Schema.Schema<XPSColumnSpecCorrelatedColumn> = Schema.suspend(() => Schema.Struct({
  columnId: Schema.optional(Schema.Number),
  correlationStats: Schema.optional(XPSCorrelationStats),
})).annotate({ identifier: "XPSColumnSpecCorrelatedColumn" }) as any as Schema.Schema<XPSColumnSpecCorrelatedColumn>;

export interface XPSColumnSpecForecastingMetadata {
  /** The type of the column for FORECASTING model training purposes. */
  columnType?: "COLUMN_TYPE_UNSPECIFIED" | "KEY" | "KEY_METADATA" | "TIME_SERIES_AVAILABLE_PAST_ONLY" | "TIME_SERIES_AVAILABLE_PAST_AND_FUTURE" | (string & {});
}

export const XPSColumnSpecForecastingMetadata: Schema.Schema<XPSColumnSpecForecastingMetadata> = Schema.suspend(() => Schema.Struct({
  columnType: Schema.optional(Schema.String),
})).annotate({ identifier: "XPSColumnSpecForecastingMetadata" }) as any as Schema.Schema<XPSColumnSpecForecastingMetadata>;

export interface XPSColumnSpec {
  /** The unique id of the column. When Preprocess, the Tables BE will popuate the order id of the column, which reflects the order of the column inside the table, i.e. 0 means the first column in the table, N-1 means the last column. AutoML BE will persist this order id in Spanner and set the order id here when calling RefreshTablesStats and Train. Note: it's different than the column_spec_id that is generated in AutoML BE. */
  columnId?: number;
  /** The display name of the column. It's outputed in Preprocess and a required input for RefreshTablesStats and Train. */
  displayName?: string;
  /** The data type of the column. It's outputed in Preprocess rpc and a required input for RefreshTablesStats and Train. */
  dataType?: XPSDataType;
  /** The data stats of the column. It's outputed in RefreshTablesStats and a required input for Train. */
  dataStats?: XPSDataStats;
  /** It's outputed in RefreshTablesStats, and a required input in Train. */
  topCorrelatedColumns?: Array<XPSColumnSpecCorrelatedColumn>;
  forecastingMetadata?: XPSColumnSpecForecastingMetadata;
}

export const XPSColumnSpec: Schema.Schema<XPSColumnSpec> = Schema.suspend(() => Schema.Struct({
  columnId: Schema.optional(Schema.Number),
  displayName: Schema.optional(Schema.String),
  dataType: Schema.optional(XPSDataType),
  dataStats: Schema.optional(XPSDataStats),
  topCorrelatedColumns: Schema.optional(Schema.Array(XPSColumnSpecCorrelatedColumn)),
  forecastingMetadata: Schema.optional(XPSColumnSpecForecastingMetadata),
})).annotate({ identifier: "XPSColumnSpec" }) as any as Schema.Schema<XPSColumnSpec>;

export interface XPSTableSpec {
  /** The id of the time column. */
  timeColumnId?: number;
  /** The number of rows in the table. */
  rowCount?: string;
  /** The number of valid rows. */
  validRowCount?: string;
  /** Mapping from column id to column spec. */
  columnSpecs?: Record<string, XPSColumnSpec>;
  /** The total size of imported data of the table. */
  importedDataSizeInBytes?: string;
}

export const XPSTableSpec: Schema.Schema<XPSTableSpec> = Schema.suspend(() => Schema.Struct({
  timeColumnId: Schema.optional(Schema.Number),
  rowCount: Schema.optional(Schema.String),
  validRowCount: Schema.optional(Schema.String),
  columnSpecs: Schema.optional(Schema.Record(Schema.String, XPSColumnSpec)),
  importedDataSizeInBytes: Schema.optional(Schema.String),
})).annotate({ identifier: "XPSTableSpec" }) as any as Schema.Schema<XPSTableSpec>;

export interface XPSTablesDatasetMetadata {
  /** Primary table. */
  primaryTableSpec?: XPSTableSpec;
  /** Id of the primary table column that should be used as the training label. */
  targetColumnId?: number;
  /** Id of the primary table column that should be used as the weight column. */
  weightColumnId?: number;
  /** Id the column to split the table. */
  mlUseColumnId?: number;
  /** (the column id : its CorrelationStats with target column). */
  targetColumnCorrelations?: Record<string, XPSCorrelationStats>;
}

export const XPSTablesDatasetMetadata: Schema.Schema<XPSTablesDatasetMetadata> = Schema.suspend(() => Schema.Struct({
  primaryTableSpec: Schema.optional(XPSTableSpec),
  targetColumnId: Schema.optional(Schema.Number),
  weightColumnId: Schema.optional(Schema.Number),
  mlUseColumnId: Schema.optional(Schema.Number),
  targetColumnCorrelations: Schema.optional(Schema.Record(Schema.String, XPSCorrelationStats)),
})).annotate({ identifier: "XPSTablesDatasetMetadata" }) as any as Schema.Schema<XPSTablesDatasetMetadata>;

export interface XPSTablesPreprocessResponse {
  /** The table/column id, column_name and the DataTypes of the columns will be populated. */
  tablesDatasetMetadata?: XPSTablesDatasetMetadata;
}

export const XPSTablesPreprocessResponse: Schema.Schema<XPSTablesPreprocessResponse> = Schema.suspend(() => Schema.Struct({
  tablesDatasetMetadata: Schema.optional(XPSTablesDatasetMetadata),
})).annotate({ identifier: "XPSTablesPreprocessResponse" }) as any as Schema.Schema<XPSTablesPreprocessResponse>;

export interface XPSPreprocessResponse {
  /** Preprocessed examples, that are to be imported into AutoML storage. This should point to RecordIO file(s) of PreprocessedExample messages. The PreprocessedExample.mvp_training_data-s returned here are later verbatim passed to Train() call in TrainExample.mvp_training_data. */
  outputExampleSet?: XPSExampleSet;
  speechPreprocessResp?: XPSSpeechPreprocessResponse;
  translationPreprocessResp?: XPSTranslationPreprocessResponse;
  tablesPreprocessResponse?: XPSTablesPreprocessResponse;
}

export const XPSPreprocessResponse: Schema.Schema<XPSPreprocessResponse> = Schema.suspend(() => Schema.Struct({
  outputExampleSet: Schema.optional(XPSExampleSet),
  speechPreprocessResp: Schema.optional(XPSSpeechPreprocessResponse),
  translationPreprocessResp: Schema.optional(XPSTranslationPreprocessResponse),
  tablesPreprocessResponse: Schema.optional(XPSTablesPreprocessResponse),
})).annotate({ identifier: "XPSPreprocessResponse" }) as any as Schema.Schema<XPSPreprocessResponse>;

export interface XPSSpeechModelSpecSubModelSpec {
  /** In S3, Recognition ClientContextId.client_id */
  clientId?: string;
  /** In S3, Recognition ClientContextId.context_id */
  contextId?: string;
  /** Type of the biasing model. */
  biasingModelType?: "BIASING_MODEL_TYPE_UNSPECIFIED" | "COMMAND_AND_SEARCH" | "PHONE_CALL" | "VIDEO" | "DEFAULT" | (string & {});
  /** If true then it means we have an enhanced version of the biasing models. */
  isEnhancedModel?: boolean;
}

export const XPSSpeechModelSpecSubModelSpec: Schema.Schema<XPSSpeechModelSpecSubModelSpec> = Schema.suspend(() => Schema.Struct({
  clientId: Schema.optional(Schema.String),
  contextId: Schema.optional(Schema.String),
  biasingModelType: Schema.optional(Schema.String),
  isEnhancedModel: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "XPSSpeechModelSpecSubModelSpec" }) as any as Schema.Schema<XPSSpeechModelSpecSubModelSpec>;

export interface XPSSpeechModelSpec {
  /** Model specs for all submodels contained in this model. */
  subModelSpecs?: Array<XPSSpeechModelSpecSubModelSpec>;
  /** Required for speech xps backend. Speech xps has to use dataset_id and model_id as the primary key in db so that speech API can query the db directly. */
  datasetId?: string;
  language?: string;
}

export const XPSSpeechModelSpec: Schema.Schema<XPSSpeechModelSpec> = Schema.suspend(() => Schema.Struct({
  subModelSpecs: Schema.optional(Schema.Array(XPSSpeechModelSpecSubModelSpec)),
  datasetId: Schema.optional(Schema.String),
  language: Schema.optional(Schema.String),
})).annotate({ identifier: "XPSSpeechModelSpec" }) as any as Schema.Schema<XPSSpeechModelSpec>;

export interface XPSTablesModelColumnInfo {
  /** The ID of the column. */
  columnId?: number;
  /** When given as part of a Model: Measurement of how much model predictions correctness on the TEST data depend on values in this column. A value between 0 and 1, higher means higher influence. These values are normalized - for all input feature columns of a given model they add to 1. When given back by Predict or Batch Predict: Measurement of how impactful for the prediction returned for the given row the value in this column was. Specifically, the feature importance specifies the marginal contribution that the feature made to the prediction score compared to the baseline score. These values are computed using the Sampled Shapley method. */
  featureImportance?: number;
}

export const XPSTablesModelColumnInfo: Schema.Schema<XPSTablesModelColumnInfo> = Schema.suspend(() => Schema.Struct({
  columnId: Schema.optional(Schema.Number),
  featureImportance: Schema.optional(Schema.Number),
})).annotate({ identifier: "XPSTablesModelColumnInfo" }) as any as Schema.Schema<XPSTablesModelColumnInfo>;

export interface XPSRow {
  /** The ids of the columns. Note: The below `values` field must match order of this field, if this field is set. */
  columnIds?: Array<number>;
  /** The values of the row cells, given in the same order as the column_ids. If column_ids is not set, then in the same order as the input_feature_column_ids in TablesModelMetadata. */
  values?: Array<unknown>;
}

export const XPSRow: Schema.Schema<XPSRow> = Schema.suspend(() => Schema.Struct({
  columnIds: Schema.optional(Schema.Array(Schema.Number)),
  values: Schema.optional(Schema.Array(Schema.Unknown)),
})).annotate({ identifier: "XPSRow" }) as any as Schema.Schema<XPSRow>;

export interface XPSTablesModelStructureModelParametersParameter {
  /** Parameter name. */
  name?: string;
  /** Float type parameter value. */
  floatValue?: number;
  /** Integer type parameter value. */
  intValue?: string;
  /** String type parameter value. */
  stringValue?: string;
}

export const XPSTablesModelStructureModelParametersParameter: Schema.Schema<XPSTablesModelStructureModelParametersParameter> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  floatValue: Schema.optional(Schema.Number),
  intValue: Schema.optional(Schema.String),
  stringValue: Schema.optional(Schema.String),
})).annotate({ identifier: "XPSTablesModelStructureModelParametersParameter" }) as any as Schema.Schema<XPSTablesModelStructureModelParametersParameter>;

export interface XPSTablesModelStructureModelParameters {
  hyperparameters?: Array<XPSTablesModelStructureModelParametersParameter>;
}

export const XPSTablesModelStructureModelParameters: Schema.Schema<XPSTablesModelStructureModelParameters> = Schema.suspend(() => Schema.Struct({
  hyperparameters: Schema.optional(Schema.Array(XPSTablesModelStructureModelParametersParameter)),
})).annotate({ identifier: "XPSTablesModelStructureModelParameters" }) as any as Schema.Schema<XPSTablesModelStructureModelParameters>;

export interface XPSTablesModelStructure {
  /** A list of models. */
  modelParameters?: Array<XPSTablesModelStructureModelParameters>;
}

export const XPSTablesModelStructure: Schema.Schema<XPSTablesModelStructure> = Schema.suspend(() => Schema.Struct({
  modelParameters: Schema.optional(Schema.Array(XPSTablesModelStructureModelParameters)),
})).annotate({ identifier: "XPSTablesModelStructure" }) as any as Schema.Schema<XPSTablesModelStructure>;

export interface XPSTablesTrainResponse {
  /** Output only. Auxiliary information for each of the input_feature_column_specs, with respect to this particular model. */
  tablesModelColumnInfo?: Array<XPSTablesModelColumnInfo>;
  /** Sample rows from the dataset this model was trained. */
  predictionSampleRows?: Array<XPSRow>;
  /** The actual training cost of the model, expressed in milli node hours, i.e. 1,000 value in this field means 1 node hour. Guaranteed to not exceed the train budget. */
  trainCostMilliNodeHours?: string;
  modelStructure?: XPSTablesModelStructure;
}

export const XPSTablesTrainResponse: Schema.Schema<XPSTablesTrainResponse> = Schema.suspend(() => Schema.Struct({
  tablesModelColumnInfo: Schema.optional(Schema.Array(XPSTablesModelColumnInfo)),
  predictionSampleRows: Schema.optional(Schema.Array(XPSRow)),
  trainCostMilliNodeHours: Schema.optional(Schema.String),
  modelStructure: Schema.optional(XPSTablesModelStructure),
})).annotate({ identifier: "XPSTablesTrainResponse" }) as any as Schema.Schema<XPSTablesTrainResponse>;

export interface XPSImageModelServingSpecModelThroughputEstimation {
  /** The approximate qps a deployed node can serve. */
  nodeQps?: number;
  /** Estimated latency. */
  latencyInMilliseconds?: number;
  computeEngineAcceleratorType?: "UNSPECIFIED" | "NVIDIA_TESLA_K80" | "NVIDIA_TESLA_P100" | "NVIDIA_TESLA_V100" | "NVIDIA_TESLA_P4" | "NVIDIA_TESLA_T4" | "NVIDIA_TESLA_A100" | "NVIDIA_A100_80GB" | "NVIDIA_L4" | "NVIDIA_H100_80GB" | "NVIDIA_H100_MEGA_80GB" | "NVIDIA_H200_141GB" | "NVIDIA_B200" | "NVIDIA_GB200" | "TPU_V2" | "TPU_V3" | "TPU_V4_POD" | "TPU_V5_LITEPOD" | (string & {});
  servomaticPartitionType?: "PARTITION_TYPE_UNSPECIFIED" | "PARTITION_ZERO" | "PARTITION_REDUCED_HOMING" | "PARTITION_JELLYFISH" | "PARTITION_CPU" | "PARTITION_CUSTOM_STORAGE_CPU" | (string & {});
}

export const XPSImageModelServingSpecModelThroughputEstimation: Schema.Schema<XPSImageModelServingSpecModelThroughputEstimation> = Schema.suspend(() => Schema.Struct({
  nodeQps: Schema.optional(Schema.Number),
  latencyInMilliseconds: Schema.optional(Schema.Number),
  computeEngineAcceleratorType: Schema.optional(Schema.String),
  servomaticPartitionType: Schema.optional(Schema.String),
})).annotate({ identifier: "XPSImageModelServingSpecModelThroughputEstimation" }) as any as Schema.Schema<XPSImageModelServingSpecModelThroughputEstimation>;

export interface XPSImageModelServingSpec {
  /** An estimated value of how much traffic a node can serve. Populated for AutoMl request only. */
  nodeQps?: number;
  /** ## The fields below are only populated under uCAIP request scope. https://cloud.google.com/ml-engine/docs/runtime-version-list */
  tfRuntimeVersion?: string;
  /** Populate under uCAIP request scope. */
  modelThroughputEstimation?: Array<XPSImageModelServingSpecModelThroughputEstimation>;
}

export const XPSImageModelServingSpec: Schema.Schema<XPSImageModelServingSpec> = Schema.suspend(() => Schema.Struct({
  nodeQps: Schema.optional(Schema.Number),
  tfRuntimeVersion: Schema.optional(Schema.String),
  modelThroughputEstimation: Schema.optional(Schema.Array(XPSImageModelServingSpecModelThroughputEstimation)),
})).annotate({ identifier: "XPSImageModelServingSpec" }) as any as Schema.Schema<XPSImageModelServingSpec>;

export interface XPSTfLiteFormat {
}

export const XPSTfLiteFormat: Schema.Schema<XPSTfLiteFormat> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "XPSTfLiteFormat" }) as any as Schema.Schema<XPSTfLiteFormat>;

export interface XPSEdgeTpuTfLiteFormat {
}

export const XPSEdgeTpuTfLiteFormat: Schema.Schema<XPSEdgeTpuTfLiteFormat> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "XPSEdgeTpuTfLiteFormat" }) as any as Schema.Schema<XPSEdgeTpuTfLiteFormat>;

export interface XPSTfSavedModelFormat {
}

export const XPSTfSavedModelFormat: Schema.Schema<XPSTfSavedModelFormat> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "XPSTfSavedModelFormat" }) as any as Schema.Schema<XPSTfSavedModelFormat>;

export interface XPSDockerFormat {
  /** Optional. Additional cpu information describing the requirements for the to be exported model files. */
  cpuArchitecture?: "CPU_ARCHITECTURE_UNSPECIFIED" | "CPU_ARCHITECTURE_X86_64" | (string & {});
  /** Optional. Additional gpu information describing the requirements for the to be exported model files. */
  gpuArchitecture?: "GPU_ARCHITECTURE_UNSPECIFIED" | "GPU_ARCHITECTURE_NVIDIA" | (string & {});
}

export const XPSDockerFormat: Schema.Schema<XPSDockerFormat> = Schema.suspend(() => Schema.Struct({
  cpuArchitecture: Schema.optional(Schema.String),
  gpuArchitecture: Schema.optional(Schema.String),
})).annotate({ identifier: "XPSDockerFormat" }) as any as Schema.Schema<XPSDockerFormat>;

export interface XPSCoreMlFormat {
}

export const XPSCoreMlFormat: Schema.Schema<XPSCoreMlFormat> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "XPSCoreMlFormat" }) as any as Schema.Schema<XPSCoreMlFormat>;

export interface XPSTfJsFormat {
}

export const XPSTfJsFormat: Schema.Schema<XPSTfJsFormat> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "XPSTfJsFormat" }) as any as Schema.Schema<XPSTfJsFormat>;

export interface XPSExportModelOutputConfig {
  /** The Google Cloud Storage directory where XPS will output the exported models and related files. Format: gs://bucket/directory */
  outputGcsUri?: string;
  /** The Google Contained Registry path the exported files to be pushed to. This location is set if the exported format is DOCKDER. */
  outputGcrUri?: string;
  tfLiteFormat?: XPSTfLiteFormat;
  edgeTpuTfLiteFormat?: XPSEdgeTpuTfLiteFormat;
  tfSavedModelFormat?: XPSTfSavedModelFormat;
  dockerFormat?: XPSDockerFormat;
  coreMlFormat?: XPSCoreMlFormat;
  tfJsFormat?: XPSTfJsFormat;
  /** For any model and format: If true, will additionally export FirebaseExportedModelInfo in a firebase.txt file. */
  exportFirebaseAuxiliaryInfo?: boolean;
}

export const XPSExportModelOutputConfig: Schema.Schema<XPSExportModelOutputConfig> = Schema.suspend(() => Schema.Struct({
  outputGcsUri: Schema.optional(Schema.String),
  outputGcrUri: Schema.optional(Schema.String),
  tfLiteFormat: Schema.optional(XPSTfLiteFormat),
  edgeTpuTfLiteFormat: Schema.optional(XPSEdgeTpuTfLiteFormat),
  tfSavedModelFormat: Schema.optional(XPSTfSavedModelFormat),
  dockerFormat: Schema.optional(XPSDockerFormat),
  coreMlFormat: Schema.optional(XPSCoreMlFormat),
  tfJsFormat: Schema.optional(XPSTfJsFormat),
  exportFirebaseAuxiliaryInfo: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "XPSExportModelOutputConfig" }) as any as Schema.Schema<XPSExportModelOutputConfig>;

export interface XPSImageExportModelSpec {
  /** Contains the model format and internal location of the model files to be exported/downloaded. Use the Google Cloud Storage bucket name which is provided via TrainRequest.gcs_bucket_name to store the model files. */
  exportModelOutputConfig?: Array<XPSExportModelOutputConfig>;
}

export const XPSImageExportModelSpec: Schema.Schema<XPSImageExportModelSpec> = Schema.suspend(() => Schema.Struct({
  exportModelOutputConfig: Schema.optional(Schema.Array(XPSExportModelOutputConfig)),
})).annotate({ identifier: "XPSImageExportModelSpec" }) as any as Schema.Schema<XPSImageExportModelSpec>;

export interface XPSModelArtifactItem {
  /** The model artifact format. */
  artifactFormat?: "ARTIFACT_FORMAT_UNSPECIFIED" | "TF_CHECKPOINT" | "TF_SAVED_MODEL" | "TF_LITE" | "EDGE_TPU_TF_LITE" | "TF_JS" | "CORE_ML" | (string & {});
  /** The Google Cloud Storage URI that stores the model binary files. */
  gcsUri?: string;
}

export const XPSModelArtifactItem: Schema.Schema<XPSModelArtifactItem> = Schema.suspend(() => Schema.Struct({
  artifactFormat: Schema.optional(Schema.String),
  gcsUri: Schema.optional(Schema.String),
})).annotate({ identifier: "XPSModelArtifactItem" }) as any as Schema.Schema<XPSModelArtifactItem>;

export interface XPSImageModelArtifactSpec {
  /** The Tensorflow checkpoint files. e.g. Used for resumable training. */
  checkpointArtifact?: XPSModelArtifactItem;
  /** The default model binary file used for serving (e.g. online predict, batch predict) via public Cloud AI Platform API. */
  servingArtifact?: XPSModelArtifactItem;
  /** The model binary files in different formats for model export. */
  exportArtifact?: Array<XPSModelArtifactItem>;
  /** Google Cloud Storage URI of Tensorflow Lite metadata 'tflite_metadata.json'. */
  tfLiteMetadataGcsUri?: string;
  /** Google Cloud Storage URI of decoded labels file for model export 'dict.txt'. */
  labelGcsUri?: string;
  /** Google Cloud Storage URI prefix of Tensorflow JavaScript binary files 'groupX-shardXofX.bin'. Deprecated. */
  tfJsBinaryGcsPrefix?: string;
}

export const XPSImageModelArtifactSpec: Schema.Schema<XPSImageModelArtifactSpec> = Schema.suspend(() => Schema.Struct({
  checkpointArtifact: Schema.optional(XPSModelArtifactItem),
  servingArtifact: Schema.optional(XPSModelArtifactItem),
  exportArtifact: Schema.optional(Schema.Array(XPSModelArtifactItem)),
  tfLiteMetadataGcsUri: Schema.optional(Schema.String),
  labelGcsUri: Schema.optional(Schema.String),
  tfJsBinaryGcsPrefix: Schema.optional(Schema.String),
})).annotate({ identifier: "XPSImageModelArtifactSpec" }) as any as Schema.Schema<XPSImageModelArtifactSpec>;

export interface XPSImageObjectDetectionModelSpec {
  modelServingSpec?: XPSImageModelServingSpec;
  exportModelSpec?: XPSImageExportModelSpec;
  /** The actual train cost of creating this model, expressed in node seconds, i.e. 3,600 value in this field means 1 node hour. */
  trainCostNodeSeconds?: string;
  /** Stop reason for training job, e.g. 'TRAIN_BUDGET_REACHED', 'MODEL_CONVERGED'. */
  stopReason?: "TRAIN_STOP_REASON_UNSPECIFIED" | "TRAIN_STOP_REASON_BUDGET_REACHED" | "TRAIN_STOP_REASON_MODEL_CONVERGED" | "TRAIN_STOP_REASON_MODEL_EARLY_STOPPED" | (string & {});
  /** ## The fields below are only populated under uCAIP request scope. */
  modelArtifactSpec?: XPSImageModelArtifactSpec;
  /** Max number of bounding box. */
  maxBoundingBoxCount?: string;
  /** Total number of classes. */
  classCount?: string;
}

export const XPSImageObjectDetectionModelSpec: Schema.Schema<XPSImageObjectDetectionModelSpec> = Schema.suspend(() => Schema.Struct({
  modelServingSpec: Schema.optional(XPSImageModelServingSpec),
  exportModelSpec: Schema.optional(XPSImageExportModelSpec),
  trainCostNodeSeconds: Schema.optional(Schema.String),
  stopReason: Schema.optional(Schema.String),
  modelArtifactSpec: Schema.optional(XPSImageModelArtifactSpec),
  maxBoundingBoxCount: Schema.optional(Schema.String),
  classCount: Schema.optional(Schema.String),
})).annotate({ identifier: "XPSImageObjectDetectionModelSpec" }) as any as Schema.Schema<XPSImageObjectDetectionModelSpec>;

export interface XPSTextToSpeechTrainResponse {
}

export const XPSTextToSpeechTrainResponse: Schema.Schema<XPSTextToSpeechTrainResponse> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "XPSTextToSpeechTrainResponse" }) as any as Schema.Schema<XPSTextToSpeechTrainResponse>;

export interface XPSVideoExportModelSpec {
  /** Contains the model format and internal location of the model files to be exported/downloaded. Use the Google Cloud Storage bucket name which is provided via TrainRequest.gcs_bucket_name to store the model files. */
  exportModelOutputConfig?: Array<XPSExportModelOutputConfig>;
}

export const XPSVideoExportModelSpec: Schema.Schema<XPSVideoExportModelSpec> = Schema.suspend(() => Schema.Struct({
  exportModelOutputConfig: Schema.optional(Schema.Array(XPSExportModelOutputConfig)),
})).annotate({ identifier: "XPSVideoExportModelSpec" }) as any as Schema.Schema<XPSVideoExportModelSpec>;

export interface XPSVideoModelArtifactSpec {
  /** The default model binary file used for serving (e.g. batch predict) via public Cloud AI Platform API. */
  servingArtifact?: XPSModelArtifactItem;
  /** The model binary files in different formats for model export. */
  exportArtifact?: Array<XPSModelArtifactItem>;
}

export const XPSVideoModelArtifactSpec: Schema.Schema<XPSVideoModelArtifactSpec> = Schema.suspend(() => Schema.Struct({
  servingArtifact: Schema.optional(XPSModelArtifactItem),
  exportArtifact: Schema.optional(Schema.Array(XPSModelArtifactItem)),
})).annotate({ identifier: "XPSVideoModelArtifactSpec" }) as any as Schema.Schema<XPSVideoModelArtifactSpec>;

export interface XPSVideoObjectTrackingTrainResponse {
  /** Populated for AutoML request only. */
  exportModelSpec?: XPSVideoExportModelSpec;
  /** ## The fields below are only populated under uCAIP request scope. */
  modelArtifactSpec?: XPSVideoModelArtifactSpec;
  /** The actual train cost of creating this model, expressed in node seconds, i.e. 3,600 value in this field means 1 node hour. */
  trainCostNodeSeconds?: string;
}

export const XPSVideoObjectTrackingTrainResponse: Schema.Schema<XPSVideoObjectTrackingTrainResponse> = Schema.suspend(() => Schema.Struct({
  exportModelSpec: Schema.optional(XPSVideoExportModelSpec),
  modelArtifactSpec: Schema.optional(XPSVideoModelArtifactSpec),
  trainCostNodeSeconds: Schema.optional(Schema.String),
})).annotate({ identifier: "XPSVideoObjectTrackingTrainResponse" }) as any as Schema.Schema<XPSVideoObjectTrackingTrainResponse>;

export interface XPSVideoClassificationTrainResponse {
  /** ## The fields below are only populated under uCAIP request scope. */
  modelArtifactSpec?: XPSVideoModelArtifactSpec;
  /** The actual train cost of creating this model, expressed in node seconds, i.e. 3,600 value in this field means 1 node hour. */
  trainCostNodeSeconds?: string;
}

export const XPSVideoClassificationTrainResponse: Schema.Schema<XPSVideoClassificationTrainResponse> = Schema.suspend(() => Schema.Struct({
  modelArtifactSpec: Schema.optional(XPSVideoModelArtifactSpec),
  trainCostNodeSeconds: Schema.optional(Schema.String),
})).annotate({ identifier: "XPSVideoClassificationTrainResponse" }) as any as Schema.Schema<XPSVideoClassificationTrainResponse>;

export interface XPSVideoActionRecognitionTrainResponse {
  /** ## The fields below are only populated under uCAIP request scope. */
  modelArtifactSpec?: XPSVideoModelArtifactSpec;
  /** The actual train cost of creating this model, expressed in node seconds, i.e. 3,600 value in this field means 1 node hour. */
  trainCostNodeSeconds?: string;
}

export const XPSVideoActionRecognitionTrainResponse: Schema.Schema<XPSVideoActionRecognitionTrainResponse> = Schema.suspend(() => Schema.Struct({
  modelArtifactSpec: Schema.optional(XPSVideoModelArtifactSpec),
  trainCostNodeSeconds: Schema.optional(Schema.String),
})).annotate({ identifier: "XPSVideoActionRecognitionTrainResponse" }) as any as Schema.Schema<XPSVideoActionRecognitionTrainResponse>;

export interface XPSImageClassificationTrainResponse {
  /** The actual cost to create this model. - For edge type model, the cost is expressed in node hour. - For cloud type model,the cost is expressed in compute hour. - Populated for models created before GA. To be deprecated after GA. */
  trainCostInNodeTime?: string;
  /** The actual training cost, expressed in node seconds. Populated for models trained in node time. */
  trainCostNodeSeconds?: string;
  /** Stop reason for training job, e.g. 'TRAIN_BUDGET_REACHED', 'MODEL_CONVERGED', 'MODEL_EARLY_STOPPED'. */
  stopReason?: "TRAIN_STOP_REASON_UNSPECIFIED" | "TRAIN_STOP_REASON_BUDGET_REACHED" | "TRAIN_STOP_REASON_MODEL_CONVERGED" | "TRAIN_STOP_REASON_MODEL_EARLY_STOPPED" | (string & {});
  /** Information of downloadable models that are pre-generated as part of training flow and will be persisted in AutoMl backend. Populated for AutoMl requests. */
  exportModelSpec?: XPSImageExportModelSpec;
  modelServingSpec?: XPSImageModelServingSpec;
  /** ## The fields below are only populated under uCAIP request scope. */
  modelArtifactSpec?: XPSImageModelArtifactSpec;
  /** Total number of classes. */
  classCount?: string;
}

export const XPSImageClassificationTrainResponse: Schema.Schema<XPSImageClassificationTrainResponse> = Schema.suspend(() => Schema.Struct({
  trainCostInNodeTime: Schema.optional(Schema.String),
  trainCostNodeSeconds: Schema.optional(Schema.String),
  stopReason: Schema.optional(Schema.String),
  exportModelSpec: Schema.optional(XPSImageExportModelSpec),
  modelServingSpec: Schema.optional(XPSImageModelServingSpec),
  modelArtifactSpec: Schema.optional(XPSImageModelArtifactSpec),
  classCount: Schema.optional(Schema.String),
})).annotate({ identifier: "XPSImageClassificationTrainResponse" }) as any as Schema.Schema<XPSImageClassificationTrainResponse>;

export interface XPSTranslationTrainResponse {
  /** Type of the model. */
  modelType?: "MODEL_TYPE_UNSPECIFIED" | "LEGACY" | "CURRENT" | (string & {});
}

export const XPSTranslationTrainResponse: Schema.Schema<XPSTranslationTrainResponse> = Schema.suspend(() => Schema.Struct({
  modelType: Schema.optional(Schema.String),
})).annotate({ identifier: "XPSTranslationTrainResponse" }) as any as Schema.Schema<XPSTranslationTrainResponse>;

export interface Color {
  /** The amount of red in the color as a value in the interval [0, 1]. */
  red?: number;
  /** The amount of green in the color as a value in the interval [0, 1]. */
  green?: number;
  /** The amount of blue in the color as a value in the interval [0, 1]. */
  blue?: number;
  /** The fraction of this color that should be applied to the pixel. That is, the final pixel color is defined by the equation: `pixel color = alpha * (this color) + (1.0 - alpha) * (background color)` This means that a value of 1.0 corresponds to a solid color, whereas a value of 0.0 corresponds to a completely transparent color. This uses a wrapper message rather than a simple float scalar so that it is possible to distinguish between a default value and the value being unset. If omitted, this color object is rendered as a solid color (as if the alpha value had been explicitly given a value of 1.0). */
  alpha?: number;
}

export const Color: Schema.Schema<Color> = Schema.suspend(() => Schema.Struct({
  red: Schema.optional(Schema.Number),
  green: Schema.optional(Schema.Number),
  blue: Schema.optional(Schema.Number),
  alpha: Schema.optional(Schema.Number),
})).annotate({ identifier: "Color" }) as any as Schema.Schema<Color>;

export interface XPSColorMapIntColor {
  /** The value should be in range of [0, 255]. */
  red?: number;
  /** The value should be in range of [0, 255]. */
  green?: number;
  /** The value should be in range of [0, 255]. */
  blue?: number;
}

export const XPSColorMapIntColor: Schema.Schema<XPSColorMapIntColor> = Schema.suspend(() => Schema.Struct({
  red: Schema.optional(Schema.Number),
  green: Schema.optional(Schema.Number),
  blue: Schema.optional(Schema.Number),
})).annotate({ identifier: "XPSColorMapIntColor" }) as any as Schema.Schema<XPSColorMapIntColor>;

export interface XPSColorMap {
  /** This type is deprecated in favor of the IntColor below. This is because google.type.Color represent color has a float which semantically does not reflect discrete classes/categories concept. Moreover, to handle it well we need to have some tolerance when converting to a discretized color. As such, the recommendation is to have API surface still use google.type.Color while internally IntColor is used. */
  color?: Color;
  intColor?: XPSColorMapIntColor;
  /** Should be used during preprocessing. */
  displayName?: string;
  /** Should be used during training. */
  annotationSpecIdToken?: string;
}

export const XPSColorMap: Schema.Schema<XPSColorMap> = Schema.suspend(() => Schema.Struct({
  color: Schema.optional(Color),
  intColor: Schema.optional(XPSColorMapIntColor),
  displayName: Schema.optional(Schema.String),
  annotationSpecIdToken: Schema.optional(Schema.String),
})).annotate({ identifier: "XPSColorMap" }) as any as Schema.Schema<XPSColorMap>;

export interface XPSImageSegmentationTrainResponse {
  modelServingSpec?: XPSImageModelServingSpec;
  /** NOTE: These fields are not used/needed in EAP but will be set later. */
  exportModelSpec?: XPSImageExportModelSpec;
  /** The actual train cost of creating this model, expressed in node seconds, i.e. 3,600 value in this field means 1 node hour. */
  trainCostNodeSeconds?: string;
  /** Stop reason for training job, e.g. 'TRAIN_BUDGET_REACHED', 'MODEL_CONVERGED'. */
  stopReason?: "TRAIN_STOP_REASON_UNSPECIFIED" | "TRAIN_STOP_REASON_BUDGET_REACHED" | "TRAIN_STOP_REASON_MODEL_CONVERGED" | "TRAIN_STOP_REASON_MODEL_EARLY_STOPPED" | (string & {});
  /** ## The fields below are only populated under uCAIP request scope. Model artifact spec stores and model gcs pathes and related metadata */
  modelArtifactSpec?: XPSImageModelArtifactSpec;
  /** Color map of the model. */
  colorMaps?: Array<XPSColorMap>;
}

export const XPSImageSegmentationTrainResponse: Schema.Schema<XPSImageSegmentationTrainResponse> = Schema.suspend(() => Schema.Struct({
  modelServingSpec: Schema.optional(XPSImageModelServingSpec),
  exportModelSpec: Schema.optional(XPSImageExportModelSpec),
  trainCostNodeSeconds: Schema.optional(Schema.String),
  stopReason: Schema.optional(Schema.String),
  modelArtifactSpec: Schema.optional(XPSImageModelArtifactSpec),
  colorMaps: Schema.optional(Schema.Array(XPSColorMap)),
})).annotate({ identifier: "XPSImageSegmentationTrainResponse" }) as any as Schema.Schema<XPSImageSegmentationTrainResponse>;

export interface XPSTextComponentModel {
  /** The name of the trained NL submodel. */
  submodelName?: string;
  /** The type of trained NL submodel */
  submodelType?: "TEXT_MODEL_TYPE_UNSPECIFIED" | "TEXT_MODEL_TYPE_DEFAULT" | "TEXT_MODEL_TYPE_META_ARCHITECT" | "TEXT_MODEL_TYPE_ATC" | "TEXT_MODEL_TYPE_CLARA2" | "TEXT_MODEL_TYPE_CHATBASE" | "TEXT_MODEL_TYPE_SAFT_SPAN_LABELING" | "TEXT_MODEL_TYPE_TEXT_EXTRACTION" | "TEXT_MODEL_TYPE_RELATIONSHIP_EXTRACTION" | "TEXT_MODEL_TYPE_COMPOSITE" | "TEXT_MODEL_TYPE_ALL_MODELS" | "TEXT_MODEL_TYPE_BERT" | "TEXT_MODEL_TYPE_ENC_PALM" | (string & {});
  /** The name of servo model. Populated by uCAIP BE as part of online PredictRequest. */
  servoModelName?: string;
  /** The servomatic model version number. Populated by uCAIP BE as part of online PredictRequest. */
  versionNumber?: string;
  /** The partition where the model is deployed. Populated by uCAIP BE as part of online PredictRequest. */
  partition?: "PARTITION_TYPE_UNSPECIFIED" | "PARTITION_ZERO" | "PARTITION_REDUCED_HOMING" | "PARTITION_JELLYFISH" | "PARTITION_CPU" | "PARTITION_CUSTOM_STORAGE_CPU" | (string & {});
  /** The Cloud Storage resource path to hold online prediction model. */
  onlinePredictionModelGcsUri?: string;
  /** The Cloud Storage resource path to hold batch prediction model. */
  batchPredictionModelGcsUri?: string;
  /** The default model binary file used for serving (e.g. online predict, batch predict) via public Cloud Ai Platform API. */
  servingArtifact?: XPSModelArtifactItem;
  /** ## The fields below are only populated under uCAIP request scope. https://cloud.google.com/ml-engine/docs/runtime-version-list */
  tfRuntimeVersion?: string;
}

export const XPSTextComponentModel: Schema.Schema<XPSTextComponentModel> = Schema.suspend(() => Schema.Struct({
  submodelName: Schema.optional(Schema.String),
  submodelType: Schema.optional(Schema.String),
  servoModelName: Schema.optional(Schema.String),
  versionNumber: Schema.optional(Schema.String),
  partition: Schema.optional(Schema.String),
  onlinePredictionModelGcsUri: Schema.optional(Schema.String),
  batchPredictionModelGcsUri: Schema.optional(Schema.String),
  servingArtifact: Schema.optional(XPSModelArtifactItem),
  tfRuntimeVersion: Schema.optional(Schema.String),
})).annotate({ identifier: "XPSTextComponentModel" }) as any as Schema.Schema<XPSTextComponentModel>;

export interface XPSTextTrainResponse {
  /** Component submodels. */
  componentModel?: Array<XPSTextComponentModel>;
}

export const XPSTextTrainResponse: Schema.Schema<XPSTextTrainResponse> = Schema.suspend(() => Schema.Struct({
  componentModel: Schema.optional(Schema.Array(XPSTextComponentModel)),
})).annotate({ identifier: "XPSTextTrainResponse" }) as any as Schema.Schema<XPSTextTrainResponse>;

export interface XPSConfidenceMetricsEntry {
  /** Metrics are computed with an assumption that the model never return predictions with score lower than this value. */
  confidenceThreshold?: number;
  /** Metrics are computed with an assumption that the model always returns at most this many predictions (ordered by their score, descendingly), but they all still need to meet the confidence_threshold. */
  positionThreshold?: number;
  /** Recall (true positive rate) for the given confidence threshold. */
  recall?: number;
  /** Precision for the given confidence threshold. */
  precision?: number;
  /** False Positive Rate for the given confidence threshold. */
  falsePositiveRate?: number;
  /** The harmonic mean of recall and precision. */
  f1Score?: number;
  /** The recall (true positive rate) when only considering the label that has the highest prediction score and not below the confidence threshold for each example. */
  recallAt1?: number;
  /** The precision when only considering the label that has the highest prediction score and not below the confidence threshold for each example. */
  precisionAt1?: number;
  /** The False Positive Rate when only considering the label that has the highest prediction score and not below the confidence threshold for each example. */
  falsePositiveRateAt1?: number;
  /** The harmonic mean of recall_at1 and precision_at1. */
  f1ScoreAt1?: number;
  /** The number of model created labels that match a ground truth label. */
  truePositiveCount?: string;
  /** The number of model created labels that do not match a ground truth label. */
  falsePositiveCount?: string;
  /** The number of ground truth labels that are not matched by a model created label. */
  falseNegativeCount?: string;
  /** The number of labels that were not created by the model, but if they would, they would not match a ground truth label. */
  trueNegativeCount?: string;
}

export const XPSConfidenceMetricsEntry: Schema.Schema<XPSConfidenceMetricsEntry> = Schema.suspend(() => Schema.Struct({
  confidenceThreshold: Schema.optional(Schema.Number),
  positionThreshold: Schema.optional(Schema.Number),
  recall: Schema.optional(Schema.Number),
  precision: Schema.optional(Schema.Number),
  falsePositiveRate: Schema.optional(Schema.Number),
  f1Score: Schema.optional(Schema.Number),
  recallAt1: Schema.optional(Schema.Number),
  precisionAt1: Schema.optional(Schema.Number),
  falsePositiveRateAt1: Schema.optional(Schema.Number),
  f1ScoreAt1: Schema.optional(Schema.Number),
  truePositiveCount: Schema.optional(Schema.String),
  falsePositiveCount: Schema.optional(Schema.String),
  falseNegativeCount: Schema.optional(Schema.String),
  trueNegativeCount: Schema.optional(Schema.String),
})).annotate({ identifier: "XPSConfidenceMetricsEntry" }) as any as Schema.Schema<XPSConfidenceMetricsEntry>;

export interface XPSConfusionMatrixRow {
  /** Value of the specific cell in the confusion matrix. The number of values each row has (i.e. the length of the row) is equal to the length of the annotation_spec_id_token field. */
  exampleCount?: Array<number>;
  /** Same as above except intended to represent other counts (for e.g. for segmentation this is pixel count). NOTE(params): Only example_count or count is set (oneoff does not support repeated fields unless they are embedded inside another message). */
  count?: Array<string>;
}

export const XPSConfusionMatrixRow: Schema.Schema<XPSConfusionMatrixRow> = Schema.suspend(() => Schema.Struct({
  exampleCount: Schema.optional(Schema.Array(Schema.Number)),
  count: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "XPSConfusionMatrixRow" }) as any as Schema.Schema<XPSConfusionMatrixRow>;

export interface XPSConfusionMatrix {
  /** For the following three repeated fields, only one is intended to be set. annotation_spec_id_token is preferable to be set. ID tokens of the annotation specs used in the confusion matrix. */
  annotationSpecIdToken?: Array<string>;
  /** Sentiment labels used in the confusion matrix. Set only for text sentiment models. For AutoML Text Revamp, use `annotation_spec_id_token` instead and leave this field empty. */
  sentimentLabel?: Array<number>;
  /** Category (mainly for segmentation). Set only for image segmentation models. Note: uCAIP Image Segmentation should use annotation_spec_id_token. */
  category?: Array<number>;
  /** Rows in the confusion matrix. The number of rows is equal to the size of `annotation_spec_id_token`. `row[i].value[j]` is the number of examples that have ground truth of the `annotation_spec_id_token[i]` and are predicted as `annotation_spec_id_token[j]` by the model being evaluated. */
  row?: Array<XPSConfusionMatrixRow>;
}

export const XPSConfusionMatrix: Schema.Schema<XPSConfusionMatrix> = Schema.suspend(() => Schema.Struct({
  annotationSpecIdToken: Schema.optional(Schema.Array(Schema.String)),
  sentimentLabel: Schema.optional(Schema.Array(Schema.Number)),
  category: Schema.optional(Schema.Array(Schema.Number)),
  row: Schema.optional(Schema.Array(XPSConfusionMatrixRow)),
})).annotate({ identifier: "XPSConfusionMatrix" }) as any as Schema.Schema<XPSConfusionMatrix>;

export interface XPSClassificationEvaluationMetrics {
  /** The Area under precision recall curve metric. */
  auPrc?: number;
  /** The Area under precision recall curve metric based on priors. */
  baseAuPrc?: number;
  /** The Area Under Receiver Operating Characteristic curve metric. Micro-averaged for the overall evaluation. */
  auRoc?: number;
  /** The Log Loss metric. */
  logLoss?: number;
  /** The number of examples used for model evaluation. */
  evaluatedExamplesCount?: number;
  /** Metrics that have confidence thresholds. Precision-recall curve can be derived from it. */
  confidenceMetricsEntries?: Array<XPSConfidenceMetricsEntry>;
  /** Confusion matrix of the evaluation. Only set for MULTICLASS classification problems where number of annotation specs is no more than 10. Only set for model level evaluation, not for evaluation per label. */
  confusionMatrix?: XPSConfusionMatrix;
}

export const XPSClassificationEvaluationMetrics: Schema.Schema<XPSClassificationEvaluationMetrics> = Schema.suspend(() => Schema.Struct({
  auPrc: Schema.optional(Schema.Number),
  baseAuPrc: Schema.optional(Schema.Number),
  auRoc: Schema.optional(Schema.Number),
  logLoss: Schema.optional(Schema.Number),
  evaluatedExamplesCount: Schema.optional(Schema.Number),
  confidenceMetricsEntries: Schema.optional(Schema.Array(XPSConfidenceMetricsEntry)),
  confusionMatrix: Schema.optional(XPSConfusionMatrix),
})).annotate({ identifier: "XPSClassificationEvaluationMetrics" }) as any as Schema.Schema<XPSClassificationEvaluationMetrics>;

export interface XPSBoundingBoxMetricsEntryConfidenceMetricsEntry {
  /** The confidence threshold value used to compute the metrics. */
  confidenceThreshold?: number;
  /** Recall for the given confidence threshold. */
  recall?: number;
  /** Precision for the given confidence threshold. */
  precision?: number;
  /** The harmonic mean of recall and precision. */
  f1Score?: number;
}

export const XPSBoundingBoxMetricsEntryConfidenceMetricsEntry: Schema.Schema<XPSBoundingBoxMetricsEntryConfidenceMetricsEntry> = Schema.suspend(() => Schema.Struct({
  confidenceThreshold: Schema.optional(Schema.Number),
  recall: Schema.optional(Schema.Number),
  precision: Schema.optional(Schema.Number),
  f1Score: Schema.optional(Schema.Number),
})).annotate({ identifier: "XPSBoundingBoxMetricsEntryConfidenceMetricsEntry" }) as any as Schema.Schema<XPSBoundingBoxMetricsEntryConfidenceMetricsEntry>;

export interface XPSBoundingBoxMetricsEntry {
  /** The intersection-over-union threshold value used to compute this metrics entry. */
  iouThreshold?: number;
  /** The mean average precision. */
  meanAveragePrecision?: number;
  /** Metrics for each label-match confidence_threshold from 0.05,0.10,...,0.95,0.96,0.97,0.98,0.99. */
  confidenceMetricsEntries?: Array<XPSBoundingBoxMetricsEntryConfidenceMetricsEntry>;
}

export const XPSBoundingBoxMetricsEntry: Schema.Schema<XPSBoundingBoxMetricsEntry> = Schema.suspend(() => Schema.Struct({
  iouThreshold: Schema.optional(Schema.Number),
  meanAveragePrecision: Schema.optional(Schema.Number),
  confidenceMetricsEntries: Schema.optional(Schema.Array(XPSBoundingBoxMetricsEntryConfidenceMetricsEntry)),
})).annotate({ identifier: "XPSBoundingBoxMetricsEntry" }) as any as Schema.Schema<XPSBoundingBoxMetricsEntry>;

export interface XPSImageObjectDetectionEvaluationMetrics {
  /** The total number of bounding boxes (i.e. summed over all images) the ground truth used to create this evaluation had. */
  evaluatedBoundingBoxCount?: number;
  /** The bounding boxes match metrics for each Intersection-over-union threshold 0.05,0.10,...,0.95,0.96,0.97,0.98,0.99 and each label confidence threshold 0.05,0.10,...,0.95,0.96,0.97,0.98,0.99 pair. */
  boundingBoxMetricsEntries?: Array<XPSBoundingBoxMetricsEntry>;
  /** The single metric for bounding boxes evaluation: the mean_average_precision averaged over all bounding_box_metrics_entries. */
  boundingBoxMeanAveragePrecision?: number;
}

export const XPSImageObjectDetectionEvaluationMetrics: Schema.Schema<XPSImageObjectDetectionEvaluationMetrics> = Schema.suspend(() => Schema.Struct({
  evaluatedBoundingBoxCount: Schema.optional(Schema.Number),
  boundingBoxMetricsEntries: Schema.optional(Schema.Array(XPSBoundingBoxMetricsEntry)),
  boundingBoxMeanAveragePrecision: Schema.optional(Schema.Number),
})).annotate({ identifier: "XPSImageObjectDetectionEvaluationMetrics" }) as any as Schema.Schema<XPSImageObjectDetectionEvaluationMetrics>;

export interface XPSTextExtractionEvaluationMetrics {
  /** If the enclosing EvaluationMetrics.label is empty, confidence_metrics_entries is an evaluation of the entire model across all labels. If the enclosing EvaluationMetrics.label is set, confidence_metrics_entries applies to that label. */
  confidenceMetricsEntries?: Array<XPSConfidenceMetricsEntry>;
  /** Values are at the highest F1 score on the precision-recall curve. Only confidence_threshold, recall, precision, and f1_score will be set. */
  bestF1ConfidenceMetrics?: XPSConfidenceMetricsEntry;
  /** Only recall, precision, and f1_score will be set. */
  perLabelConfidenceMetrics?: Record<string, XPSConfidenceMetricsEntry>;
  /** Confusion matrix of the model, at the default confidence threshold (0.0). Only set for whole-model evaluation, not for evaluation per label. */
  confusionMatrix?: XPSConfusionMatrix;
}

export const XPSTextExtractionEvaluationMetrics: Schema.Schema<XPSTextExtractionEvaluationMetrics> = Schema.suspend(() => Schema.Struct({
  confidenceMetricsEntries: Schema.optional(Schema.Array(XPSConfidenceMetricsEntry)),
  bestF1ConfidenceMetrics: Schema.optional(XPSConfidenceMetricsEntry),
  perLabelConfidenceMetrics: Schema.optional(Schema.Record(Schema.String, XPSConfidenceMetricsEntry)),
  confusionMatrix: Schema.optional(XPSConfusionMatrix),
})).annotate({ identifier: "XPSTextExtractionEvaluationMetrics" }) as any as Schema.Schema<XPSTextExtractionEvaluationMetrics>;

export interface XPSTrackMetricsEntryConfidenceMetricsEntry {
  /** Output only. The confidence threshold value used to compute the metrics. */
  confidenceThreshold?: number;
  /** Output only. Tracking precision. */
  trackingPrecision?: number;
  /** Output only. Tracking recall. */
  trackingRecall?: number;
  /** Output only. Bounding box intersection-over-union precision. Measures how well the bounding boxes overlap between each other (e.g. complete overlap or just barely above iou_threshold). */
  boundingBoxIou?: number;
  /** Output only. Mismatch rate, which measures the tracking consistency, i.e. correctness of instance ID continuity. */
  mismatchRate?: number;
}

export const XPSTrackMetricsEntryConfidenceMetricsEntry: Schema.Schema<XPSTrackMetricsEntryConfidenceMetricsEntry> = Schema.suspend(() => Schema.Struct({
  confidenceThreshold: Schema.optional(Schema.Number),
  trackingPrecision: Schema.optional(Schema.Number),
  trackingRecall: Schema.optional(Schema.Number),
  boundingBoxIou: Schema.optional(Schema.Number),
  mismatchRate: Schema.optional(Schema.Number),
})).annotate({ identifier: "XPSTrackMetricsEntryConfidenceMetricsEntry" }) as any as Schema.Schema<XPSTrackMetricsEntryConfidenceMetricsEntry>;

export interface XPSTrackMetricsEntry {
  /** Output only. The intersection-over-union threshold value between bounding boxes across frames used to compute this metric entry. */
  iouThreshold?: number;
  /** Output only. The mean average precision over all confidence thresholds. */
  meanTrackingAveragePrecision?: number;
  /** Output only. The mean bounding box iou over all confidence thresholds. */
  meanBoundingBoxIou?: number;
  /** Output only. The mean mismatch rate over all confidence thresholds. */
  meanMismatchRate?: number;
  /** Output only. Metrics for each label-match confidence_threshold from 0.05,0.10,...,0.95,0.96,0.97,0.98,0.99. Precision-recall curve is derived from them. */
  confidenceMetricsEntries?: Array<XPSTrackMetricsEntryConfidenceMetricsEntry>;
}

export const XPSTrackMetricsEntry: Schema.Schema<XPSTrackMetricsEntry> = Schema.suspend(() => Schema.Struct({
  iouThreshold: Schema.optional(Schema.Number),
  meanTrackingAveragePrecision: Schema.optional(Schema.Number),
  meanBoundingBoxIou: Schema.optional(Schema.Number),
  meanMismatchRate: Schema.optional(Schema.Number),
  confidenceMetricsEntries: Schema.optional(Schema.Array(XPSTrackMetricsEntryConfidenceMetricsEntry)),
})).annotate({ identifier: "XPSTrackMetricsEntry" }) as any as Schema.Schema<XPSTrackMetricsEntry>;

export interface XPSVideoObjectTrackingEvaluationMetrics {
  /** The number of video frames used for model evaluation. */
  evaluatedFrameCount?: number;
  /** The number of bounding boxes used for model evaluation. */
  evaluatedBoundingboxCount?: number;
  /** The number of tracks used for model evaluation. */
  evaluatedTrackCount?: number;
  /** Output only. The bounding boxes match metrics for each Intersection-over-union threshold 0.05,0.10,...,0.95,0.96,0.97,0.98,0.99. */
  boundingBoxMetricsEntries?: Array<XPSBoundingBoxMetricsEntry>;
  /** Output only. The tracks match metrics for each Intersection-over-union threshold 0.05,0.10,...,0.95,0.96,0.97,0.98,0.99. */
  trackMetricsEntries?: Array<XPSTrackMetricsEntry>;
  /** Output only. The single metric for bounding boxes evaluation: the mean_average_precision averaged over all bounding_box_metrics_entries. */
  boundingBoxMeanAveragePrecision?: number;
  /** Output only. The single metric for tracks accuracy evaluation: the mean_average_precision averaged over all track_metrics_entries. */
  trackMeanAveragePrecision?: number;
  /** Output only. The single metric for tracks bounding box iou evaluation: the mean_bounding_box_iou averaged over all track_metrics_entries. */
  trackMeanBoundingBoxIou?: number;
  /** Output only. The single metric for tracking consistency evaluation: the mean_mismatch_rate averaged over all track_metrics_entries. */
  trackMeanMismatchRate?: number;
}

export const XPSVideoObjectTrackingEvaluationMetrics: Schema.Schema<XPSVideoObjectTrackingEvaluationMetrics> = Schema.suspend(() => Schema.Struct({
  evaluatedFrameCount: Schema.optional(Schema.Number),
  evaluatedBoundingboxCount: Schema.optional(Schema.Number),
  evaluatedTrackCount: Schema.optional(Schema.Number),
  boundingBoxMetricsEntries: Schema.optional(Schema.Array(XPSBoundingBoxMetricsEntry)),
  trackMetricsEntries: Schema.optional(Schema.Array(XPSTrackMetricsEntry)),
  boundingBoxMeanAveragePrecision: Schema.optional(Schema.Number),
  trackMeanAveragePrecision: Schema.optional(Schema.Number),
  trackMeanBoundingBoxIou: Schema.optional(Schema.Number),
  trackMeanMismatchRate: Schema.optional(Schema.Number),
})).annotate({ identifier: "XPSVideoObjectTrackingEvaluationMetrics" }) as any as Schema.Schema<XPSVideoObjectTrackingEvaluationMetrics>;

export interface XPSTablesConfidenceMetricsEntry {
  /** The confidence threshold value used to compute the metrics. */
  confidenceThreshold?: number;
  /** FPR = #false positives / (#false positives + #true negatives) */
  falsePositiveRate?: number;
  /** TPR = #true positives / (#true positives + #false negatvies) */
  truePositiveRate?: number;
  /** Recall = #true positives / (#true positives + #false negatives). */
  recall?: number;
  /** Precision = #true positives / (#true positives + #false positives). */
  precision?: number;
  /** The harmonic mean of recall and precision. (2 * precision * recall) / (precision + recall) */
  f1Score?: number;
  /** True positive count. */
  truePositiveCount?: string;
  /** False positive count. */
  falsePositiveCount?: string;
  /** True negative count. */
  trueNegativeCount?: string;
  /** False negative count. */
  falseNegativeCount?: string;
}

export const XPSTablesConfidenceMetricsEntry: Schema.Schema<XPSTablesConfidenceMetricsEntry> = Schema.suspend(() => Schema.Struct({
  confidenceThreshold: Schema.optional(Schema.Number),
  falsePositiveRate: Schema.optional(Schema.Number),
  truePositiveRate: Schema.optional(Schema.Number),
  recall: Schema.optional(Schema.Number),
  precision: Schema.optional(Schema.Number),
  f1Score: Schema.optional(Schema.Number),
  truePositiveCount: Schema.optional(Schema.String),
  falsePositiveCount: Schema.optional(Schema.String),
  trueNegativeCount: Schema.optional(Schema.String),
  falseNegativeCount: Schema.optional(Schema.String),
})).annotate({ identifier: "XPSTablesConfidenceMetricsEntry" }) as any as Schema.Schema<XPSTablesConfidenceMetricsEntry>;

export interface XPSTablesClassificationMetricsCurveMetrics {
  /** The CATEGORY row value (for ARRAY unnested) the curve metrics are for. */
  value?: string;
  /** The position threshold value used to compute the metrics. */
  positionThreshold?: number;
  /** Metrics that have confidence thresholds. Precision-recall curve and ROC curve can be derived from them. */
  confidenceMetricsEntries?: Array<XPSTablesConfidenceMetricsEntry>;
  /** The area under the precision-recall curve. */
  aucPr?: number;
  /** The area under receiver operating characteristic curve. */
  aucRoc?: number;
  /** The Log loss metric. */
  logLoss?: number;
}

export const XPSTablesClassificationMetricsCurveMetrics: Schema.Schema<XPSTablesClassificationMetricsCurveMetrics> = Schema.suspend(() => Schema.Struct({
  value: Schema.optional(Schema.String),
  positionThreshold: Schema.optional(Schema.Number),
  confidenceMetricsEntries: Schema.optional(Schema.Array(XPSTablesConfidenceMetricsEntry)),
  aucPr: Schema.optional(Schema.Number),
  aucRoc: Schema.optional(Schema.Number),
  logLoss: Schema.optional(Schema.Number),
})).annotate({ identifier: "XPSTablesClassificationMetricsCurveMetrics" }) as any as Schema.Schema<XPSTablesClassificationMetricsCurveMetrics>;

export interface XPSTablesClassificationMetrics {
  /** Metrics building a curve. */
  curveMetrics?: Array<XPSTablesClassificationMetricsCurveMetrics>;
}

export const XPSTablesClassificationMetrics: Schema.Schema<XPSTablesClassificationMetrics> = Schema.suspend(() => Schema.Struct({
  curveMetrics: Schema.optional(Schema.Array(XPSTablesClassificationMetricsCurveMetrics)),
})).annotate({ identifier: "XPSTablesClassificationMetrics" }) as any as Schema.Schema<XPSTablesClassificationMetrics>;

export interface XPSRegressionMetricsEntry {
  /** The actual target value for a row in the dataset. */
  trueValue?: number;
  /** The observed value for a row in the dataset. */
  predictedValue?: number;
}

export const XPSRegressionMetricsEntry: Schema.Schema<XPSRegressionMetricsEntry> = Schema.suspend(() => Schema.Struct({
  trueValue: Schema.optional(Schema.Number),
  predictedValue: Schema.optional(Schema.Number),
})).annotate({ identifier: "XPSRegressionMetricsEntry" }) as any as Schema.Schema<XPSRegressionMetricsEntry>;

export interface XPSTablesRegressionMetrics {
  /** Root mean squared error. */
  rootMeanSquaredError?: number;
  /** Mean absolute error. */
  meanAbsoluteError?: number;
  /** Mean absolute percentage error, only set if all of the target column's values are positive. */
  meanAbsolutePercentageError?: number;
  /** R squared. */
  rSquared?: number;
  /** Root mean squared log error. */
  rootMeanSquaredLogError?: number;
  /** A list of actual versus predicted points for the model being evaluated. */
  regressionMetricsEntries?: Array<XPSRegressionMetricsEntry>;
}

export const XPSTablesRegressionMetrics: Schema.Schema<XPSTablesRegressionMetrics> = Schema.suspend(() => Schema.Struct({
  rootMeanSquaredError: Schema.optional(Schema.Number),
  meanAbsoluteError: Schema.optional(Schema.Number),
  meanAbsolutePercentageError: Schema.optional(Schema.Number),
  rSquared: Schema.optional(Schema.Number),
  rootMeanSquaredLogError: Schema.optional(Schema.Number),
  regressionMetricsEntries: Schema.optional(Schema.Array(XPSRegressionMetricsEntry)),
})).annotate({ identifier: "XPSTablesRegressionMetrics" }) as any as Schema.Schema<XPSTablesRegressionMetrics>;

export interface XPSTablesEvaluationMetrics {
  /** Classification metrics. */
  classificationMetrics?: XPSTablesClassificationMetrics;
  /** Regression metrics. */
  regressionMetrics?: XPSTablesRegressionMetrics;
}

export const XPSTablesEvaluationMetrics: Schema.Schema<XPSTablesEvaluationMetrics> = Schema.suspend(() => Schema.Struct({
  classificationMetrics: Schema.optional(XPSTablesClassificationMetrics),
  regressionMetrics: Schema.optional(XPSTablesRegressionMetrics),
})).annotate({ identifier: "XPSTablesEvaluationMetrics" }) as any as Schema.Schema<XPSTablesEvaluationMetrics>;

export interface XPSRegressionEvaluationMetrics {
  /** Root Mean Squared Error (RMSE). */
  rootMeanSquaredError?: number;
  /** Mean Absolute Error (MAE). */
  meanAbsoluteError?: number;
  /** Mean absolute percentage error. Only set if all ground truth values are positive. */
  meanAbsolutePercentageError?: number;
  /** R squared. */
  rSquared?: number;
  /** Root mean squared log error. */
  rootMeanSquaredLogError?: number;
  /** A list of actual versus predicted points for the model being evaluated. */
  regressionMetricsEntries?: Array<XPSRegressionMetricsEntry>;
}

export const XPSRegressionEvaluationMetrics: Schema.Schema<XPSRegressionEvaluationMetrics> = Schema.suspend(() => Schema.Struct({
  rootMeanSquaredError: Schema.optional(Schema.Number),
  meanAbsoluteError: Schema.optional(Schema.Number),
  meanAbsolutePercentageError: Schema.optional(Schema.Number),
  rSquared: Schema.optional(Schema.Number),
  rootMeanSquaredLogError: Schema.optional(Schema.Number),
  regressionMetricsEntries: Schema.optional(Schema.Array(XPSRegressionMetricsEntry)),
})).annotate({ identifier: "XPSRegressionEvaluationMetrics" }) as any as Schema.Schema<XPSRegressionEvaluationMetrics>;

export interface XPSVideoActionMetricsEntryConfidenceMetricsEntry {
  /** Output only. The confidence threshold value used to compute the metrics. */
  confidenceThreshold?: number;
  /** Output only. Recall for the given confidence threshold. */
  recall?: number;
  /** Output only. Precision for the given confidence threshold. */
  precision?: number;
  /** Output only. The harmonic mean of recall and precision. */
  f1Score?: number;
}

export const XPSVideoActionMetricsEntryConfidenceMetricsEntry: Schema.Schema<XPSVideoActionMetricsEntryConfidenceMetricsEntry> = Schema.suspend(() => Schema.Struct({
  confidenceThreshold: Schema.optional(Schema.Number),
  recall: Schema.optional(Schema.Number),
  precision: Schema.optional(Schema.Number),
  f1Score: Schema.optional(Schema.Number),
})).annotate({ identifier: "XPSVideoActionMetricsEntryConfidenceMetricsEntry" }) as any as Schema.Schema<XPSVideoActionMetricsEntryConfidenceMetricsEntry>;

export interface XPSVideoActionMetricsEntry {
  /** This VideoActionMetricsEntry is calculated based on this prediction window length. If the predicted action's timestamp is inside the time window whose center is the ground truth action's timestamp with this specific length, the prediction result is treated as a true positive. */
  precisionWindowLength?: string;
  /** The mean average precision. */
  meanAveragePrecision?: number;
  /** Metrics for each label-match confidence_threshold from 0.05,0.10,...,0.95,0.96,0.97,0.98,0.99. */
  confidenceMetricsEntries?: Array<XPSVideoActionMetricsEntryConfidenceMetricsEntry>;
}

export const XPSVideoActionMetricsEntry: Schema.Schema<XPSVideoActionMetricsEntry> = Schema.suspend(() => Schema.Struct({
  precisionWindowLength: Schema.optional(Schema.String),
  meanAveragePrecision: Schema.optional(Schema.Number),
  confidenceMetricsEntries: Schema.optional(Schema.Array(XPSVideoActionMetricsEntryConfidenceMetricsEntry)),
})).annotate({ identifier: "XPSVideoActionMetricsEntry" }) as any as Schema.Schema<XPSVideoActionMetricsEntry>;

export interface XPSVideoActionRecognitionEvaluationMetrics {
  /** Output only. The number of ground truth actions used to create this evaluation. */
  evaluatedActionCount?: number;
  /** Output only. The metric entries for precision window lengths: 1s,2s,3s,4s, 5s. */
  videoActionMetricsEntries?: Array<XPSVideoActionMetricsEntry>;
}

export const XPSVideoActionRecognitionEvaluationMetrics: Schema.Schema<XPSVideoActionRecognitionEvaluationMetrics> = Schema.suspend(() => Schema.Struct({
  evaluatedActionCount: Schema.optional(Schema.Number),
  videoActionMetricsEntries: Schema.optional(Schema.Array(XPSVideoActionMetricsEntry)),
})).annotate({ identifier: "XPSVideoActionRecognitionEvaluationMetrics" }) as any as Schema.Schema<XPSVideoActionRecognitionEvaluationMetrics>;

export interface XPSTranslationEvaluationMetrics {
  /** BLEU score. */
  bleuScore?: number;
  /** BLEU score for base model. */
  baseBleuScore?: number;
}

export const XPSTranslationEvaluationMetrics: Schema.Schema<XPSTranslationEvaluationMetrics> = Schema.suspend(() => Schema.Struct({
  bleuScore: Schema.optional(Schema.Number),
  baseBleuScore: Schema.optional(Schema.Number),
})).annotate({ identifier: "XPSTranslationEvaluationMetrics" }) as any as Schema.Schema<XPSTranslationEvaluationMetrics>;

export interface XPSImageSegmentationEvaluationMetricsConfidenceMetricsEntry {
  /** The confidence threshold value used to compute the metrics. */
  confidenceThreshold?: number;
  /** Recall for the given confidence threshold. */
  recall?: number;
  /** Precision for the given confidence threshold. */
  precision?: number;
  /** DSC or the F1 score: The harmonic mean of recall and precision. */
  diceScoreCoefficient?: number;
  /** IOU score. */
  iouScore?: number;
  /** Confusion matrix of the per confidence_threshold evaluation. Pixel counts are set here. Only set for model level evaluation, not for evaluation per label. */
  confusionMatrix?: XPSConfusionMatrix;
}

export const XPSImageSegmentationEvaluationMetricsConfidenceMetricsEntry: Schema.Schema<XPSImageSegmentationEvaluationMetricsConfidenceMetricsEntry> = Schema.suspend(() => Schema.Struct({
  confidenceThreshold: Schema.optional(Schema.Number),
  recall: Schema.optional(Schema.Number),
  precision: Schema.optional(Schema.Number),
  diceScoreCoefficient: Schema.optional(Schema.Number),
  iouScore: Schema.optional(Schema.Number),
  confusionMatrix: Schema.optional(XPSConfusionMatrix),
})).annotate({ identifier: "XPSImageSegmentationEvaluationMetricsConfidenceMetricsEntry" }) as any as Schema.Schema<XPSImageSegmentationEvaluationMetricsConfidenceMetricsEntry>;

export interface XPSImageSegmentationEvaluationMetrics {
  /** Metrics that have confidence thresholds. Precision-recall curve can be derived from it. */
  confidenceMetricsEntries?: Array<XPSImageSegmentationEvaluationMetricsConfidenceMetricsEntry>;
}

export const XPSImageSegmentationEvaluationMetrics: Schema.Schema<XPSImageSegmentationEvaluationMetrics> = Schema.suspend(() => Schema.Struct({
  confidenceMetricsEntries: Schema.optional(Schema.Array(XPSImageSegmentationEvaluationMetricsConfidenceMetricsEntry)),
})).annotate({ identifier: "XPSImageSegmentationEvaluationMetrics" }) as any as Schema.Schema<XPSImageSegmentationEvaluationMetrics>;

export interface XPSTextSentimentEvaluationMetrics {
  /** Output only. Precision. */
  precision?: number;
  /** Output only. Recall. */
  recall?: number;
  /** Output only. The harmonic mean of recall and precision. */
  f1Score?: number;
  /** Output only. Mean absolute error. Only set for the overall model evaluation, not for evaluation of a single annotation spec. */
  meanAbsoluteError?: number;
  /** Output only. Mean squared error. Only set for the overall model evaluation, not for evaluation of a single annotation spec. */
  meanSquaredError?: number;
  /** Output only. Linear weighted kappa. Only set for the overall model evaluation, not for evaluation of a single annotation spec. */
  linearKappa?: number;
  /** Output only. Quadratic weighted kappa. Only set for the overall model evaluation, not for evaluation of a single annotation spec. */
  quadraticKappa?: number;
  /** Output only. Confusion matrix of the evaluation. Only set for the overall model evaluation, not for evaluation of a single annotation spec. */
  confusionMatrix?: XPSConfusionMatrix;
}

export const XPSTextSentimentEvaluationMetrics: Schema.Schema<XPSTextSentimentEvaluationMetrics> = Schema.suspend(() => Schema.Struct({
  precision: Schema.optional(Schema.Number),
  recall: Schema.optional(Schema.Number),
  f1Score: Schema.optional(Schema.Number),
  meanAbsoluteError: Schema.optional(Schema.Number),
  meanSquaredError: Schema.optional(Schema.Number),
  linearKappa: Schema.optional(Schema.Number),
  quadraticKappa: Schema.optional(Schema.Number),
  confusionMatrix: Schema.optional(XPSConfusionMatrix),
})).annotate({ identifier: "XPSTextSentimentEvaluationMetrics" }) as any as Schema.Schema<XPSTextSentimentEvaluationMetrics>;

export interface XPSEvaluationMetrics {
  /** The annotation_spec for which this evaluation metrics instance had been created. Empty iff this is an overall model evaluation (like Tables evaluation metrics), i.e. aggregated across all labels. The value comes from the input annotations in AnnotatedExample. For MVP product or for text sentiment models where annotation_spec_id_token is not available, set label instead. */
  annotationSpecIdToken?: string;
  /** The label for which this evaluation metrics instance had been created. Empty iff this is an overall model evaluation (like Tables evaluation metrics), i.e. aggregated across all labels. The label maps to AnnotationSpec.display_name in Public API protos. Only used by MVP implementation and text sentiment FULL implementation. */
  label?: string;
  /** The integer category label for which this evaluation metric instance had been created. Valid categories are 0 or higher. Overall model evaluation should set this to negative values (rather than implicit zero). Only used for Image Segmentation (prefer to set annotation_spec_id_token instead). Note: uCAIP Image Segmentation should use annotation_spec_id_token. */
  category?: number;
  /** The number of examples used to create this evaluation metrics instance. */
  evaluatedExampleCount?: number;
  videoClassificationEvalMetrics?: XPSClassificationEvaluationMetrics;
  imageObjectDetectionEvalMetrics?: XPSImageObjectDetectionEvaluationMetrics;
  textExtractionEvalMetrics?: XPSTextExtractionEvaluationMetrics;
  videoObjectTrackingEvalMetrics?: XPSVideoObjectTrackingEvaluationMetrics;
  tablesEvalMetrics?: XPSTablesEvaluationMetrics;
  tablesClassificationEvalMetrics?: XPSClassificationEvaluationMetrics;
  regressionEvalMetrics?: XPSRegressionEvaluationMetrics;
  textClassificationEvalMetrics?: XPSClassificationEvaluationMetrics;
  videoActionRecognitionEvalMetrics?: XPSVideoActionRecognitionEvaluationMetrics;
  translationEvalMetrics?: XPSTranslationEvaluationMetrics;
  imageClassificationEvalMetrics?: XPSClassificationEvaluationMetrics;
  imageSegmentationEvalMetrics?: XPSImageSegmentationEvaluationMetrics;
  textSentimentEvalMetrics?: XPSTextSentimentEvaluationMetrics;
}

export const XPSEvaluationMetrics: Schema.Schema<XPSEvaluationMetrics> = Schema.suspend(() => Schema.Struct({
  annotationSpecIdToken: Schema.optional(Schema.String),
  label: Schema.optional(Schema.String),
  category: Schema.optional(Schema.Number),
  evaluatedExampleCount: Schema.optional(Schema.Number),
  videoClassificationEvalMetrics: Schema.optional(XPSClassificationEvaluationMetrics),
  imageObjectDetectionEvalMetrics: Schema.optional(XPSImageObjectDetectionEvaluationMetrics),
  textExtractionEvalMetrics: Schema.optional(XPSTextExtractionEvaluationMetrics),
  videoObjectTrackingEvalMetrics: Schema.optional(XPSVideoObjectTrackingEvaluationMetrics),
  tablesEvalMetrics: Schema.optional(XPSTablesEvaluationMetrics),
  tablesClassificationEvalMetrics: Schema.optional(XPSClassificationEvaluationMetrics),
  regressionEvalMetrics: Schema.optional(XPSRegressionEvaluationMetrics),
  textClassificationEvalMetrics: Schema.optional(XPSClassificationEvaluationMetrics),
  videoActionRecognitionEvalMetrics: Schema.optional(XPSVideoActionRecognitionEvaluationMetrics),
  translationEvalMetrics: Schema.optional(XPSTranslationEvaluationMetrics),
  imageClassificationEvalMetrics: Schema.optional(XPSClassificationEvaluationMetrics),
  imageSegmentationEvalMetrics: Schema.optional(XPSImageSegmentationEvaluationMetrics),
  textSentimentEvalMetrics: Schema.optional(XPSTextSentimentEvaluationMetrics),
})).annotate({ identifier: "XPSEvaluationMetrics" }) as any as Schema.Schema<XPSEvaluationMetrics>;

export interface XPSEvaluationMetricsSet {
  /** Inline EvaluationMetrics - should be relatively small. For passing large quantities of exhaustive metrics, use file_spec. */
  evaluationMetrics?: Array<XPSEvaluationMetrics>;
  /** File spec containing evaluation metrics of a model, must point to RecordIO file(s) of intelligence.cloud.automl.xps.EvaluationMetrics messages. */
  fileSpec?: XPSFileSpec;
  /** Number of the evaluation metrics (usually one per label plus overall). */
  numEvaluationMetrics?: string;
}

export const XPSEvaluationMetricsSet: Schema.Schema<XPSEvaluationMetricsSet> = Schema.suspend(() => Schema.Struct({
  evaluationMetrics: Schema.optional(Schema.Array(XPSEvaluationMetrics)),
  fileSpec: Schema.optional(XPSFileSpec),
  numEvaluationMetrics: Schema.optional(Schema.String),
})).annotate({ identifier: "XPSEvaluationMetricsSet" }) as any as Schema.Schema<XPSEvaluationMetricsSet>;

export interface XPSIntegratedGradientsAttribution {
  /** The number of steps for approximating the path integral. A good value to start is 50 and gradually increase until the sum to diff property is within the desired error range. Valid range of its value is [1, 100], inclusively. */
  stepCount?: number;
}

export const XPSIntegratedGradientsAttribution: Schema.Schema<XPSIntegratedGradientsAttribution> = Schema.suspend(() => Schema.Struct({
  stepCount: Schema.optional(Schema.Number),
})).annotate({ identifier: "XPSIntegratedGradientsAttribution" }) as any as Schema.Schema<XPSIntegratedGradientsAttribution>;

export interface XPSXraiAttribution {
  /** The number of steps for approximating the path integral. A good value to start is 50 and gradually increase until the sum to diff property is met within the desired error range. Valid range of its value is [1, 100], inclusively. */
  stepCount?: number;
}

export const XPSXraiAttribution: Schema.Schema<XPSXraiAttribution> = Schema.suspend(() => Schema.Struct({
  stepCount: Schema.optional(Schema.Number),
})).annotate({ identifier: "XPSXraiAttribution" }) as any as Schema.Schema<XPSXraiAttribution>;

export interface XPSResponseExplanationParameters {
  /** An attribution method that computes Aumann-Shapley values taking advantage of the model's fully differentiable structure. Refer to this paper for more details: https://arxiv.org/abs/1703.01365 */
  integratedGradientsAttribution?: XPSIntegratedGradientsAttribution;
  /** An attribution method that redistributes Integrated Gradients attribution to segmented regions, taking advantage of the model's fully differentiable structure. Refer to this paper for more details: https://arxiv.org/abs/1906.02825 XRAI currently performs better on natural images, like a picture of a house or an animal. If the images are taken in artificial environments, like a lab or manufacturing line, or from diagnostic equipment, like x-rays or quality-control cameras, use Integrated Gradients instead. */
  xraiAttribution?: XPSXraiAttribution;
}

export const XPSResponseExplanationParameters: Schema.Schema<XPSResponseExplanationParameters> = Schema.suspend(() => Schema.Struct({
  integratedGradientsAttribution: Schema.optional(XPSIntegratedGradientsAttribution),
  xraiAttribution: Schema.optional(XPSXraiAttribution),
})).annotate({ identifier: "XPSResponseExplanationParameters" }) as any as Schema.Schema<XPSResponseExplanationParameters>;

export interface XPSVisualization {
  /** Type of the image visualization. Only applicable to Integrated Gradients attribution. OUTLINES shows regions of attribution, while PIXELS shows per-pixel attribution. Defaults to OUTLINES. */
  type?: "TYPE_UNSPECIFIED" | "PIXELS" | "OUTLINES" | (string & {});
  /** Whether to only highlight pixels with positive contributions, negative or both. Defaults to POSITIVE. */
  polarity?: "POLARITY_UNSPECIFIED" | "POSITIVE" | "NEGATIVE" | "BOTH" | (string & {});
  /** The color scheme used for the highlighted areas. Defaults to PINK_GREEN for Integrated Gradients attribution, which shows positive attributions in green and negative in pink. Defaults to VIRIDIS for XRAI attribution, which highlights the most influential regions in yellow and the least influential in blue. */
  colorMap?: "COLOR_MAP_UNSPECIFIED" | "PINK_GREEN" | "VIRIDIS" | "RED" | "GREEN" | "RED_GREEN" | "PINK_WHITE_GREEN" | (string & {});
  /** Excludes attributions above the specified percentile from the highlighted areas. Using the clip_percent_upperbound and clip_percent_lowerbound together can be useful for filtering out noise and making it easier to see areas of strong attribution. Defaults to 99.9. */
  clipPercentUpperbound?: number;
  /** Excludes attributions below the specified percentile, from the highlighted areas. Defaults to 62. */
  clipPercentLowerbound?: number;
  /** How the original image is displayed in the visualization. Adjusting the overlay can help increase visual clarity if the original image makes it difficult to view the visualization. Defaults to NONE. */
  overlayType?: "OVERLAY_TYPE_UNSPECIFIED" | "NONE" | "ORIGINAL" | "GRAYSCALE" | "MASK_BLACK" | (string & {});
}

export const XPSVisualization: Schema.Schema<XPSVisualization> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
  polarity: Schema.optional(Schema.String),
  colorMap: Schema.optional(Schema.String),
  clipPercentUpperbound: Schema.optional(Schema.Number),
  clipPercentLowerbound: Schema.optional(Schema.Number),
  overlayType: Schema.optional(Schema.String),
})).annotate({ identifier: "XPSVisualization" }) as any as Schema.Schema<XPSVisualization>;

export interface XPSResponseExplanationMetadataInputMetadata {
  /** Visualization configurations for image explanation. */
  visualizationConfig?: XPSVisualization;
  /** Name of the input tensor for this model. Only needed in train response. */
  inputTensorName?: string;
  /** Modality of the feature. Valid values are: numeric, image. Defaults to numeric. */
  modality?: "MODALITY_UNSPECIFIED" | "NUMERIC" | "IMAGE" | "CATEGORICAL" | (string & {});
}

export const XPSResponseExplanationMetadataInputMetadata: Schema.Schema<XPSResponseExplanationMetadataInputMetadata> = Schema.suspend(() => Schema.Struct({
  visualizationConfig: Schema.optional(XPSVisualization),
  inputTensorName: Schema.optional(Schema.String),
  modality: Schema.optional(Schema.String),
})).annotate({ identifier: "XPSResponseExplanationMetadataInputMetadata" }) as any as Schema.Schema<XPSResponseExplanationMetadataInputMetadata>;

export interface XPSResponseExplanationMetadataOutputMetadata {
  /** Name of the output tensor. Only needed in train response. */
  outputTensorName?: string;
}

export const XPSResponseExplanationMetadataOutputMetadata: Schema.Schema<XPSResponseExplanationMetadataOutputMetadata> = Schema.suspend(() => Schema.Struct({
  outputTensorName: Schema.optional(Schema.String),
})).annotate({ identifier: "XPSResponseExplanationMetadataOutputMetadata" }) as any as Schema.Schema<XPSResponseExplanationMetadataOutputMetadata>;

export interface XPSResponseExplanationMetadata {
  /** Metadata of the input. */
  inputs?: Record<string, XPSResponseExplanationMetadataInputMetadata>;
  /** Metadata of the output. */
  outputs?: Record<string, XPSResponseExplanationMetadataOutputMetadata>;
}

export const XPSResponseExplanationMetadata: Schema.Schema<XPSResponseExplanationMetadata> = Schema.suspend(() => Schema.Struct({
  inputs: Schema.optional(Schema.Record(Schema.String, XPSResponseExplanationMetadataInputMetadata)),
  outputs: Schema.optional(Schema.Record(Schema.String, XPSResponseExplanationMetadataOutputMetadata)),
})).annotate({ identifier: "XPSResponseExplanationMetadata" }) as any as Schema.Schema<XPSResponseExplanationMetadata>;

export interface XPSResponseExplanationSpec {
  /** Explanation type. For AutoML Image Classification models, possible values are: * `image-integrated-gradients` * `image-xrai` */
  explanationType?: string;
  /** Parameters that configure explaining of the Model's predictions. */
  parameters?: XPSResponseExplanationParameters;
  /** Metadata describing the Model's input and output for explanation. */
  metadata?: XPSResponseExplanationMetadata;
}

export const XPSResponseExplanationSpec: Schema.Schema<XPSResponseExplanationSpec> = Schema.suspend(() => Schema.Struct({
  explanationType: Schema.optional(Schema.String),
  parameters: Schema.optional(XPSResponseExplanationParameters),
  metadata: Schema.optional(XPSResponseExplanationMetadata),
})).annotate({ identifier: "XPSResponseExplanationSpec" }) as any as Schema.Schema<XPSResponseExplanationSpec>;

export interface XPSVisionErrorAnalysisConfig {
  /** The number of query examples in error analysis. */
  exampleCount?: number;
  /** The query type used in retrieval. The enum values are frozen in the foreseeable future. */
  queryType?: "QUERY_TYPE_UNSPECIFIED" | "QUERY_TYPE_ALL_SIMILAR" | "QUERY_TYPE_SAME_CLASS_SIMILAR" | "QUERY_TYPE_SAME_CLASS_DISSIMILAR" | (string & {});
}

export const XPSVisionErrorAnalysisConfig: Schema.Schema<XPSVisionErrorAnalysisConfig> = Schema.suspend(() => Schema.Struct({
  exampleCount: Schema.optional(Schema.Number),
  queryType: Schema.optional(Schema.String),
})).annotate({ identifier: "XPSVisionErrorAnalysisConfig" }) as any as Schema.Schema<XPSVisionErrorAnalysisConfig>;

export interface XPSTrainResponse {
  /** Token that represents the trained model. This is considered immutable and is persisted in AutoML. xPS can put their own proto in the byte string, to e.g. point to the model checkpoints. The token is passed to other xPS APIs to refer to the model. */
  modelToken?: string;
  speechTrainResp?: XPSSpeechModelSpec;
  tablesTrainResp?: XPSTablesTrainResponse;
  imageObjectDetectionTrainResp?: XPSImageObjectDetectionModelSpec;
  textToSpeechTrainResp?: XPSTextToSpeechTrainResponse;
  videoObjectTrackingTrainResp?: XPSVideoObjectTrackingTrainResponse;
  videoClassificationTrainResp?: XPSVideoClassificationTrainResponse;
  videoActionRecognitionTrainResp?: XPSVideoActionRecognitionTrainResponse;
  imageClassificationTrainResp?: XPSImageClassificationTrainResponse;
  translationTrainResp?: XPSTranslationTrainResponse;
  imageSegmentationTrainResp?: XPSImageSegmentationTrainResponse;
  /** Will only be needed for uCAIP from Beta. */
  textTrainResp?: XPSTextTrainResponse;
  /** The trained model evaluation metrics. This can be optionally returned. */
  evaluationMetricsSet?: XPSEvaluationMetricsSet;
  /** Examples used to evaluate the model (usually the test set), with the predicted annotations. The file_spec should point to recordio file(s) of AnnotatedExample. For each returned example, the example_id_token and annotations predicted by the model must be set. The example payload can and is recommended to be omitted. */
  evaluatedExampleSet?: XPSExampleSet;
  /** Estimated model size in bytes once deployed. */
  deployedModelSizeBytes?: string;
  /** VisionExplanationConfig for XAI on test set. Optional for when XAI is enable in training request. */
  explanationConfigs?: Array<XPSResponseExplanationSpec>;
  /** Optional vision model error analysis configuration. The field is set when model error analysis is enabled in the training request. The results of error analysis will be binded together with evaluation results (in the format of AnnotatedExample). */
  errorAnalysisConfigs?: Array<XPSVisionErrorAnalysisConfig>;
}

export const XPSTrainResponse: Schema.Schema<XPSTrainResponse> = Schema.suspend(() => Schema.Struct({
  modelToken: Schema.optional(Schema.String),
  speechTrainResp: Schema.optional(XPSSpeechModelSpec),
  tablesTrainResp: Schema.optional(XPSTablesTrainResponse),
  imageObjectDetectionTrainResp: Schema.optional(XPSImageObjectDetectionModelSpec),
  textToSpeechTrainResp: Schema.optional(XPSTextToSpeechTrainResponse),
  videoObjectTrackingTrainResp: Schema.optional(XPSVideoObjectTrackingTrainResponse),
  videoClassificationTrainResp: Schema.optional(XPSVideoClassificationTrainResponse),
  videoActionRecognitionTrainResp: Schema.optional(XPSVideoActionRecognitionTrainResponse),
  imageClassificationTrainResp: Schema.optional(XPSImageClassificationTrainResponse),
  translationTrainResp: Schema.optional(XPSTranslationTrainResponse),
  imageSegmentationTrainResp: Schema.optional(XPSImageSegmentationTrainResponse),
  textTrainResp: Schema.optional(XPSTextTrainResponse),
  evaluationMetricsSet: Schema.optional(XPSEvaluationMetricsSet),
  evaluatedExampleSet: Schema.optional(XPSExampleSet),
  deployedModelSizeBytes: Schema.optional(Schema.String),
  explanationConfigs: Schema.optional(Schema.Array(XPSResponseExplanationSpec)),
  errorAnalysisConfigs: Schema.optional(Schema.Array(XPSVisionErrorAnalysisConfig)),
})).annotate({ identifier: "XPSTrainResponse" }) as any as Schema.Schema<XPSTrainResponse>;

export interface XPSMetricEntryLabel {
  /** The name of the label. */
  labelName?: string;
  /** The value of the label. */
  labelValue?: string;
}

export const XPSMetricEntryLabel: Schema.Schema<XPSMetricEntryLabel> = Schema.suspend(() => Schema.Struct({
  labelName: Schema.optional(Schema.String),
  labelValue: Schema.optional(Schema.String),
})).annotate({ identifier: "XPSMetricEntryLabel" }) as any as Schema.Schema<XPSMetricEntryLabel>;

export interface XPSMetricEntry {
  /** The metric name defined in the service configuration. */
  metricName?: string;
  /** For billing metrics that are using legacy sku's, set the legacy billing metric id here. This will be sent to Chemist as the "cloudbilling.googleapis.com/argentum_metric_id" label. Otherwise leave empty. */
  argentumMetricId?: string;
  /** A signed 64-bit integer value. */
  int64Value?: string;
  /** A double value. */
  doubleValue?: number;
  /** Billing system labels for this (metric, value) pair. */
  systemLabels?: Array<XPSMetricEntryLabel>;
}

export const XPSMetricEntry: Schema.Schema<XPSMetricEntry> = Schema.suspend(() => Schema.Struct({
  metricName: Schema.optional(Schema.String),
  argentumMetricId: Schema.optional(Schema.String),
  int64Value: Schema.optional(Schema.String),
  doubleValue: Schema.optional(Schema.Number),
  systemLabels: Schema.optional(Schema.Array(XPSMetricEntryLabel)),
})).annotate({ identifier: "XPSMetricEntry" }) as any as Schema.Schema<XPSMetricEntry>;

export interface XPSReportingMetrics {
  /** One entry per metric name. The values must be aggregated per metric name. */
  metricEntries?: Array<XPSMetricEntry>;
  /** The effective time training used. If set, this is used for quota management and billing. Deprecated. AutoML BE doesn't use this. Don't set. */
  effectiveTrainingDuration?: string;
}

export const XPSReportingMetrics: Schema.Schema<XPSReportingMetrics> = Schema.suspend(() => Schema.Struct({
  metricEntries: Schema.optional(Schema.Array(XPSMetricEntry)),
  effectiveTrainingDuration: Schema.optional(Schema.String),
})).annotate({ identifier: "XPSReportingMetrics" }) as any as Schema.Schema<XPSReportingMetrics>;

export interface XPSTrainingObjectivePoint {
  /** The objective value when this point was recorded. */
  value?: number;
  /** The time at which this point was recorded. */
  createTime?: string;
}

export const XPSTrainingObjectivePoint: Schema.Schema<XPSTrainingObjectivePoint> = Schema.suspend(() => Schema.Struct({
  value: Schema.optional(Schema.Number),
  createTime: Schema.optional(Schema.String),
})).annotate({ identifier: "XPSTrainingObjectivePoint" }) as any as Schema.Schema<XPSTrainingObjectivePoint>;

export interface XPSTuningTrial {
  /** Model parameters for the trial. */
  modelStructure?: XPSTablesModelStructure;
  /** The optimization objective evaluation of the eval split data. */
  trainingObjectivePoint?: XPSTrainingObjectivePoint;
}

export const XPSTuningTrial: Schema.Schema<XPSTuningTrial> = Schema.suspend(() => Schema.Struct({
  modelStructure: Schema.optional(XPSTablesModelStructure),
  trainingObjectivePoint: Schema.optional(XPSTrainingObjectivePoint),
})).annotate({ identifier: "XPSTuningTrial" }) as any as Schema.Schema<XPSTuningTrial>;

export interface XPSTablesTrainingOperationMetadata {
  /** This field is for training. When the operation is terminated successfully, AutoML Backend post this field to operation metadata in spanner. If the metadata has no trials returned, the training operation is supposed to be a failure. */
  topTrials?: Array<XPSTuningTrial>;
  /** This field records the training objective value with respect to time, giving insight into how the model architecture search is performing as training time elapses. */
  trainingObjectivePoints?: Array<XPSTrainingObjectivePoint>;
  /** Current stage of creating model. */
  createModelStage?: "CREATE_MODEL_STAGE_UNSPECIFIED" | "DATA_PREPROCESSING" | "TRAINING" | "EVALUATING" | "MODEL_POST_PROCESSING" | (string & {});
  /** The optimization objective for model. */
  optimizationObjective?: string;
  /** Creating model budget. */
  trainBudgetMilliNodeHours?: string;
  /** Timestamp when training process starts. */
  trainingStartTime?: string;
}

export const XPSTablesTrainingOperationMetadata: Schema.Schema<XPSTablesTrainingOperationMetadata> = Schema.suspend(() => Schema.Struct({
  topTrials: Schema.optional(Schema.Array(XPSTuningTrial)),
  trainingObjectivePoints: Schema.optional(Schema.Array(XPSTrainingObjectivePoint)),
  createModelStage: Schema.optional(Schema.String),
  optimizationObjective: Schema.optional(Schema.String),
  trainBudgetMilliNodeHours: Schema.optional(Schema.String),
  trainingStartTime: Schema.optional(Schema.String),
})).annotate({ identifier: "XPSTablesTrainingOperationMetadata" }) as any as Schema.Schema<XPSTablesTrainingOperationMetadata>;

export interface XPSVideoTrainingOperationMetadata {
  /** This is an estimation of the node hours necessary for training a model, expressed in milli node hours (i.e. 1,000 value in this field means 1 node hour). A node hour represents the time a virtual machine spends running your training job. The cost of one node running for one hour is a node hour. */
  trainCostMilliNodeHour?: string;
}

export const XPSVideoTrainingOperationMetadata: Schema.Schema<XPSVideoTrainingOperationMetadata> = Schema.suspend(() => Schema.Struct({
  trainCostMilliNodeHour: Schema.optional(Schema.String),
})).annotate({ identifier: "XPSVideoTrainingOperationMetadata" }) as any as Schema.Schema<XPSVideoTrainingOperationMetadata>;

export interface XPSVideoBatchPredictOperationMetadata {
  /** All the partial batch prediction results that are completed at the moment. Output examples are sorted by completion time. The order will not be changed. Each output example should be the path of a single RecordIO file of AnnotatedExamples. */
  outputExamples?: Array<string>;
}

export const XPSVideoBatchPredictOperationMetadata: Schema.Schema<XPSVideoBatchPredictOperationMetadata> = Schema.suspend(() => Schema.Struct({
  outputExamples: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "XPSVideoBatchPredictOperationMetadata" }) as any as Schema.Schema<XPSVideoBatchPredictOperationMetadata>;

export interface CpuMetric {
  /** Required. Type of cpu, e.g. N2. */
  cpuType?: "UNKNOWN_CPU_TYPE" | "A2" | "A3" | "A4" | "A4X" | "C2" | "C2D" | "CUSTOM" | "E2" | "G2" | "G4" | "C3" | "C4" | "C4A" | "M2" | "M1" | "N1" | "N2_CUSTOM" | "N2" | "N2D" | (string & {});
  /** Required. Total seconds of core usage, e.g. 4. */
  coreSec?: string;
  /** Required. Number of CPU cores. */
  coreNumber?: string;
  /** Required. Machine spec, e.g. N1_STANDARD_4. */
  machineSpec?: "UNKNOWN_MACHINE_SPEC" | "N1_STANDARD_2" | "N1_STANDARD_4" | "N1_STANDARD_8" | "N1_STANDARD_16" | "N1_STANDARD_32" | "N1_STANDARD_64" | "N1_STANDARD_96" | "N1_HIGHMEM_2" | "N1_HIGHMEM_4" | "N1_HIGHMEM_8" | "N1_HIGHMEM_16" | "N1_HIGHMEM_32" | "N1_HIGHMEM_64" | "N1_HIGHMEM_96" | "N1_HIGHCPU_2" | "N1_HIGHCPU_4" | "N1_HIGHCPU_8" | "N1_HIGHCPU_16" | "N1_HIGHCPU_32" | "N1_HIGHCPU_64" | "N1_HIGHCPU_96" | "A2_HIGHGPU_1G" | "A2_HIGHGPU_2G" | "A2_HIGHGPU_4G" | "A2_HIGHGPU_8G" | "A2_MEGAGPU_16G" | "A2_ULTRAGPU_1G" | "A2_ULTRAGPU_2G" | "A2_ULTRAGPU_4G" | "A2_ULTRAGPU_8G" | "A3_HIGHGPU_1G" | "A3_HIGHGPU_2G" | "A3_HIGHGPU_4G" | "A3_HIGHGPU_8G" | "A3_MEGAGPU_8G" | "A3_ULTRAGPU_8G" | "A3_EDGEGPU_8G" | "A4_HIGHGPU_8G" | "A4X_HIGHGPU_4G" | "E2_STANDARD_2" | "E2_STANDARD_4" | "E2_STANDARD_8" | "E2_STANDARD_16" | "E2_STANDARD_32" | "E2_HIGHMEM_2" | "E2_HIGHMEM_4" | "E2_HIGHMEM_8" | "E2_HIGHMEM_16" | "E2_HIGHCPU_2" | "E2_HIGHCPU_4" | "E2_HIGHCPU_8" | "E2_HIGHCPU_16" | "E2_HIGHCPU_32" | "N2_STANDARD_2" | "N2_STANDARD_4" | "N2_STANDARD_8" | "N2_STANDARD_16" | "N2_STANDARD_32" | "N2_STANDARD_48" | "N2_STANDARD_64" | "N2_STANDARD_80" | "N2_STANDARD_96" | "N2_STANDARD_128" | "N2_HIGHMEM_2" | "N2_HIGHMEM_4" | "N2_HIGHMEM_8" | "N2_HIGHMEM_16" | "N2_HIGHMEM_32" | "N2_HIGHMEM_48" | "N2_HIGHMEM_64" | "N2_HIGHMEM_80" | "N2_HIGHMEM_96" | "N2_HIGHMEM_128" | "N2_HIGHCPU_2" | "N2_HIGHCPU_4" | "N2_HIGHCPU_8" | "N2_HIGHCPU_16" | "N2_HIGHCPU_32" | "N2_HIGHCPU_48" | "N2_HIGHCPU_64" | "N2_HIGHCPU_80" | "N2_HIGHCPU_96" | "N2D_STANDARD_2" | "N2D_STANDARD_4" | "N2D_STANDARD_8" | "N2D_STANDARD_16" | "N2D_STANDARD_32" | "N2D_STANDARD_48" | "N2D_STANDARD_64" | "N2D_STANDARD_80" | "N2D_STANDARD_96" | "N2D_STANDARD_128" | "N2D_STANDARD_224" | "N2D_HIGHMEM_2" | "N2D_HIGHMEM_4" | "N2D_HIGHMEM_8" | "N2D_HIGHMEM_16" | "N2D_HIGHMEM_32" | "N2D_HIGHMEM_48" | "N2D_HIGHMEM_64" | "N2D_HIGHMEM_80" | "N2D_HIGHMEM_96" | "N2D_HIGHCPU_2" | "N2D_HIGHCPU_4" | "N2D_HIGHCPU_8" | "N2D_HIGHCPU_16" | "N2D_HIGHCPU_32" | "N2D_HIGHCPU_48" | "N2D_HIGHCPU_64" | "N2D_HIGHCPU_80" | "N2D_HIGHCPU_96" | "N2D_HIGHCPU_128" | "N2D_HIGHCPU_224" | "C2_STANDARD_4" | "C2_STANDARD_8" | "C2_STANDARD_16" | "C2_STANDARD_30" | "C2_STANDARD_60" | "C2D_STANDARD_2" | "C2D_STANDARD_4" | "C2D_STANDARD_8" | "C2D_STANDARD_16" | "C2D_STANDARD_32" | "C2D_STANDARD_56" | "C2D_STANDARD_112" | "C2D_HIGHCPU_2" | "C2D_HIGHCPU_4" | "C2D_HIGHCPU_8" | "C2D_HIGHCPU_16" | "C2D_HIGHCPU_32" | "C2D_HIGHCPU_56" | "C2D_HIGHCPU_112" | "C2D_HIGHMEM_2" | "C2D_HIGHMEM_4" | "C2D_HIGHMEM_8" | "C2D_HIGHMEM_16" | "C2D_HIGHMEM_32" | "C2D_HIGHMEM_56" | "C2D_HIGHMEM_112" | "G2_STANDARD_4" | "G2_STANDARD_8" | "G2_STANDARD_12" | "G2_STANDARD_16" | "G2_STANDARD_24" | "G2_STANDARD_32" | "G2_STANDARD_48" | "G2_STANDARD_96" | "G4_STANDARD_48" | "C3_STANDARD_4" | "C3_STANDARD_8" | "C3_STANDARD_22" | "C3_STANDARD_44" | "C3_STANDARD_88" | "C3_STANDARD_176" | "C3_HIGHCPU_4" | "C3_HIGHCPU_8" | "C3_HIGHCPU_22" | "C3_HIGHCPU_44" | "C3_HIGHCPU_88" | "C3_HIGHCPU_176" | "C3_HIGHMEM_4" | "C3_HIGHMEM_8" | "C3_HIGHMEM_22" | "C3_HIGHMEM_44" | "C3_HIGHMEM_88" | "C3_HIGHMEM_176" | "C4_STANDARD_8" | "C4_STANDARD_16" | "C4_STANDARD_24" | "C4_STANDARD_32" | "C4_STANDARD_48" | "C4_STANDARD_96" | "C4_STANDARD_144" | "C4_STANDARD_192" | "C4_STANDARD_288" | "C4_HIGHCPU_8" | "C4_HIGHCPU_16" | "C4_HIGHCPU_24" | "C4_HIGHCPU_32" | "C4_HIGHCPU_48" | "C4_HIGHCPU_96" | "C4_HIGHCPU_144" | "C4_HIGHCPU_192" | "C4_HIGHCPU_288" | "C4_HIGHMEM_8" | "C4_HIGHMEM_16" | "C4_HIGHMEM_24" | "C4_HIGHMEM_32" | "C4_HIGHMEM_48" | "C4_HIGHMEM_96" | "C4_HIGHMEM_144" | "C4_HIGHMEM_192" | "C4_HIGHMEM_288" | "C4A_STANDARD_8" | "C4A_STANDARD_16" | "C4A_STANDARD_32" | "C4A_STANDARD_48" | "C4A_STANDARD_64" | "C4A_STANDARD_72" | "C4A_HIGHCPU_8" | "C4A_HIGHCPU_16" | "C4A_HIGHCPU_32" | "C4A_HIGHCPU_48" | "C4A_HIGHCPU_64" | "C4A_HIGHCPU_72" | "C4A_HIGHMEM_8" | "C4A_HIGHMEM_16" | "C4A_HIGHMEM_32" | "C4A_HIGHMEM_48" | "C4A_HIGHMEM_64" | "C4A_HIGHMEM_72" | (string & {});
  /** Billing tracking labels. They do not contain any user data but only the labels set by Vertex Core Infra itself. Tracking labels' keys are defined with special format: goog-[\p{Ll}\p{N}]+ E.g. "key": "goog-k8s-cluster-name","value": "us-east1-b4rk" */
  trackingLabels?: Record<string, string>;
}

export const CpuMetric: Schema.Schema<CpuMetric> = Schema.suspend(() => Schema.Struct({
  cpuType: Schema.optional(Schema.String),
  coreSec: Schema.optional(Schema.String),
  coreNumber: Schema.optional(Schema.String),
  machineSpec: Schema.optional(Schema.String),
  trackingLabels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "CpuMetric" }) as any as Schema.Schema<CpuMetric>;

export interface RamMetric {
  /** Required. Type of ram. */
  ramType?: "UNKNOWN_RAM_TYPE" | "A2" | "A3" | "A4" | "A4X" | "C2" | "C2D" | "CUSTOM" | "E2" | "G2" | "G4" | "C4" | "C4A" | "C3" | "M2" | "M1" | "N1" | "N2_CUSTOM" | "N2" | "N2D" | (string & {});
  /** Required. VM memory in Gigabyte second, e.g. 3600. Using int64 type to match billing metrics definition. */
  gibSec?: string;
  /** Required. VM memory in gb. */
  memories?: number;
  /** Required. Machine spec, e.g. N1_STANDARD_4. */
  machineSpec?: "UNKNOWN_MACHINE_SPEC" | "N1_STANDARD_2" | "N1_STANDARD_4" | "N1_STANDARD_8" | "N1_STANDARD_16" | "N1_STANDARD_32" | "N1_STANDARD_64" | "N1_STANDARD_96" | "N1_HIGHMEM_2" | "N1_HIGHMEM_4" | "N1_HIGHMEM_8" | "N1_HIGHMEM_16" | "N1_HIGHMEM_32" | "N1_HIGHMEM_64" | "N1_HIGHMEM_96" | "N1_HIGHCPU_2" | "N1_HIGHCPU_4" | "N1_HIGHCPU_8" | "N1_HIGHCPU_16" | "N1_HIGHCPU_32" | "N1_HIGHCPU_64" | "N1_HIGHCPU_96" | "A2_HIGHGPU_1G" | "A2_HIGHGPU_2G" | "A2_HIGHGPU_4G" | "A2_HIGHGPU_8G" | "A2_MEGAGPU_16G" | "A2_ULTRAGPU_1G" | "A2_ULTRAGPU_2G" | "A2_ULTRAGPU_4G" | "A2_ULTRAGPU_8G" | "A3_HIGHGPU_1G" | "A3_HIGHGPU_2G" | "A3_HIGHGPU_4G" | "A3_HIGHGPU_8G" | "A3_MEGAGPU_8G" | "A3_ULTRAGPU_8G" | "A3_EDGEGPU_8G" | "A4_HIGHGPU_8G" | "A4X_HIGHGPU_4G" | "E2_STANDARD_2" | "E2_STANDARD_4" | "E2_STANDARD_8" | "E2_STANDARD_16" | "E2_STANDARD_32" | "E2_HIGHMEM_2" | "E2_HIGHMEM_4" | "E2_HIGHMEM_8" | "E2_HIGHMEM_16" | "E2_HIGHCPU_2" | "E2_HIGHCPU_4" | "E2_HIGHCPU_8" | "E2_HIGHCPU_16" | "E2_HIGHCPU_32" | "N2_STANDARD_2" | "N2_STANDARD_4" | "N2_STANDARD_8" | "N2_STANDARD_16" | "N2_STANDARD_32" | "N2_STANDARD_48" | "N2_STANDARD_64" | "N2_STANDARD_80" | "N2_STANDARD_96" | "N2_STANDARD_128" | "N2_HIGHMEM_2" | "N2_HIGHMEM_4" | "N2_HIGHMEM_8" | "N2_HIGHMEM_16" | "N2_HIGHMEM_32" | "N2_HIGHMEM_48" | "N2_HIGHMEM_64" | "N2_HIGHMEM_80" | "N2_HIGHMEM_96" | "N2_HIGHMEM_128" | "N2_HIGHCPU_2" | "N2_HIGHCPU_4" | "N2_HIGHCPU_8" | "N2_HIGHCPU_16" | "N2_HIGHCPU_32" | "N2_HIGHCPU_48" | "N2_HIGHCPU_64" | "N2_HIGHCPU_80" | "N2_HIGHCPU_96" | "N2D_STANDARD_2" | "N2D_STANDARD_4" | "N2D_STANDARD_8" | "N2D_STANDARD_16" | "N2D_STANDARD_32" | "N2D_STANDARD_48" | "N2D_STANDARD_64" | "N2D_STANDARD_80" | "N2D_STANDARD_96" | "N2D_STANDARD_128" | "N2D_STANDARD_224" | "N2D_HIGHMEM_2" | "N2D_HIGHMEM_4" | "N2D_HIGHMEM_8" | "N2D_HIGHMEM_16" | "N2D_HIGHMEM_32" | "N2D_HIGHMEM_48" | "N2D_HIGHMEM_64" | "N2D_HIGHMEM_80" | "N2D_HIGHMEM_96" | "N2D_HIGHCPU_2" | "N2D_HIGHCPU_4" | "N2D_HIGHCPU_8" | "N2D_HIGHCPU_16" | "N2D_HIGHCPU_32" | "N2D_HIGHCPU_48" | "N2D_HIGHCPU_64" | "N2D_HIGHCPU_80" | "N2D_HIGHCPU_96" | "N2D_HIGHCPU_128" | "N2D_HIGHCPU_224" | "C2_STANDARD_4" | "C2_STANDARD_8" | "C2_STANDARD_16" | "C2_STANDARD_30" | "C2_STANDARD_60" | "C2D_STANDARD_2" | "C2D_STANDARD_4" | "C2D_STANDARD_8" | "C2D_STANDARD_16" | "C2D_STANDARD_32" | "C2D_STANDARD_56" | "C2D_STANDARD_112" | "C2D_HIGHCPU_2" | "C2D_HIGHCPU_4" | "C2D_HIGHCPU_8" | "C2D_HIGHCPU_16" | "C2D_HIGHCPU_32" | "C2D_HIGHCPU_56" | "C2D_HIGHCPU_112" | "C2D_HIGHMEM_2" | "C2D_HIGHMEM_4" | "C2D_HIGHMEM_8" | "C2D_HIGHMEM_16" | "C2D_HIGHMEM_32" | "C2D_HIGHMEM_56" | "C2D_HIGHMEM_112" | "G2_STANDARD_4" | "G2_STANDARD_8" | "G2_STANDARD_12" | "G2_STANDARD_16" | "G2_STANDARD_24" | "G2_STANDARD_32" | "G2_STANDARD_48" | "G2_STANDARD_96" | "G4_STANDARD_48" | "C3_STANDARD_4" | "C3_STANDARD_8" | "C3_STANDARD_22" | "C3_STANDARD_44" | "C3_STANDARD_88" | "C3_STANDARD_176" | "C3_HIGHCPU_4" | "C3_HIGHCPU_8" | "C3_HIGHCPU_22" | "C3_HIGHCPU_44" | "C3_HIGHCPU_88" | "C3_HIGHCPU_176" | "C3_HIGHMEM_4" | "C3_HIGHMEM_8" | "C3_HIGHMEM_22" | "C3_HIGHMEM_44" | "C3_HIGHMEM_88" | "C3_HIGHMEM_176" | "C4_STANDARD_8" | "C4_STANDARD_16" | "C4_STANDARD_24" | "C4_STANDARD_32" | "C4_STANDARD_48" | "C4_STANDARD_96" | "C4_STANDARD_144" | "C4_STANDARD_192" | "C4_STANDARD_288" | "C4_HIGHCPU_8" | "C4_HIGHCPU_16" | "C4_HIGHCPU_24" | "C4_HIGHCPU_32" | "C4_HIGHCPU_48" | "C4_HIGHCPU_96" | "C4_HIGHCPU_144" | "C4_HIGHCPU_192" | "C4_HIGHCPU_288" | "C4_HIGHMEM_8" | "C4_HIGHMEM_16" | "C4_HIGHMEM_24" | "C4_HIGHMEM_32" | "C4_HIGHMEM_48" | "C4_HIGHMEM_96" | "C4_HIGHMEM_144" | "C4_HIGHMEM_192" | "C4_HIGHMEM_288" | "C4A_STANDARD_8" | "C4A_STANDARD_16" | "C4A_STANDARD_32" | "C4A_STANDARD_48" | "C4A_STANDARD_64" | "C4A_STANDARD_72" | "C4A_HIGHCPU_8" | "C4A_HIGHCPU_16" | "C4A_HIGHCPU_32" | "C4A_HIGHCPU_48" | "C4A_HIGHCPU_64" | "C4A_HIGHCPU_72" | "C4A_HIGHMEM_8" | "C4A_HIGHMEM_16" | "C4A_HIGHMEM_32" | "C4A_HIGHMEM_48" | "C4A_HIGHMEM_64" | "C4A_HIGHMEM_72" | (string & {});
  /** Billing tracking labels. They do not contain any user data but only the labels set by Vertex Core Infra itself. Tracking labels' keys are defined with special format: goog-[\p{Ll}\p{N}]+ E.g. "key": "goog-k8s-cluster-name","value": "us-east1-b4rk" */
  trackingLabels?: Record<string, string>;
}

export const RamMetric: Schema.Schema<RamMetric> = Schema.suspend(() => Schema.Struct({
  ramType: Schema.optional(Schema.String),
  gibSec: Schema.optional(Schema.String),
  memories: Schema.optional(Schema.Number),
  machineSpec: Schema.optional(Schema.String),
  trackingLabels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "RamMetric" }) as any as Schema.Schema<RamMetric>;

export interface GpuMetric {
  /** Required. Type of GPU, e.g. NVIDIA_TESLA_V100. */
  gpuType?: "UNKNOWN_GPU_TYPE" | "NVIDIA_TESLA_A100" | "NVIDIA_A100_80GB" | "NVIDIA_B200" | "NVIDIA_GB200" | "NVIDIA_TESLA_K80" | "NVIDIA_L4" | "NVIDIA_TESLA_P100" | "NVIDIA_TESLA_P4" | "NVIDIA_TESLA_T4" | "NVIDIA_TESLA_V100" | "NVIDIA_H100_80GB" | "NVIDIA_H100_MEGA_80GB" | "NVIDIA_H200_141GB" | "NVIDIA_RTX_PRO_6000" | (string & {});
  /** Required. Seconds of GPU usage, e.g. 3600. */
  gpuSec?: string;
  /** Required. Machine spec, e.g. N1_STANDARD_4. */
  machineSpec?: "UNKNOWN_MACHINE_SPEC" | "N1_STANDARD_2" | "N1_STANDARD_4" | "N1_STANDARD_8" | "N1_STANDARD_16" | "N1_STANDARD_32" | "N1_STANDARD_64" | "N1_STANDARD_96" | "N1_HIGHMEM_2" | "N1_HIGHMEM_4" | "N1_HIGHMEM_8" | "N1_HIGHMEM_16" | "N1_HIGHMEM_32" | "N1_HIGHMEM_64" | "N1_HIGHMEM_96" | "N1_HIGHCPU_2" | "N1_HIGHCPU_4" | "N1_HIGHCPU_8" | "N1_HIGHCPU_16" | "N1_HIGHCPU_32" | "N1_HIGHCPU_64" | "N1_HIGHCPU_96" | "A2_HIGHGPU_1G" | "A2_HIGHGPU_2G" | "A2_HIGHGPU_4G" | "A2_HIGHGPU_8G" | "A2_MEGAGPU_16G" | "A2_ULTRAGPU_1G" | "A2_ULTRAGPU_2G" | "A2_ULTRAGPU_4G" | "A2_ULTRAGPU_8G" | "A3_HIGHGPU_1G" | "A3_HIGHGPU_2G" | "A3_HIGHGPU_4G" | "A3_HIGHGPU_8G" | "A3_MEGAGPU_8G" | "A3_ULTRAGPU_8G" | "A3_EDGEGPU_8G" | "A4_HIGHGPU_8G" | "A4X_HIGHGPU_4G" | "E2_STANDARD_2" | "E2_STANDARD_4" | "E2_STANDARD_8" | "E2_STANDARD_16" | "E2_STANDARD_32" | "E2_HIGHMEM_2" | "E2_HIGHMEM_4" | "E2_HIGHMEM_8" | "E2_HIGHMEM_16" | "E2_HIGHCPU_2" | "E2_HIGHCPU_4" | "E2_HIGHCPU_8" | "E2_HIGHCPU_16" | "E2_HIGHCPU_32" | "N2_STANDARD_2" | "N2_STANDARD_4" | "N2_STANDARD_8" | "N2_STANDARD_16" | "N2_STANDARD_32" | "N2_STANDARD_48" | "N2_STANDARD_64" | "N2_STANDARD_80" | "N2_STANDARD_96" | "N2_STANDARD_128" | "N2_HIGHMEM_2" | "N2_HIGHMEM_4" | "N2_HIGHMEM_8" | "N2_HIGHMEM_16" | "N2_HIGHMEM_32" | "N2_HIGHMEM_48" | "N2_HIGHMEM_64" | "N2_HIGHMEM_80" | "N2_HIGHMEM_96" | "N2_HIGHMEM_128" | "N2_HIGHCPU_2" | "N2_HIGHCPU_4" | "N2_HIGHCPU_8" | "N2_HIGHCPU_16" | "N2_HIGHCPU_32" | "N2_HIGHCPU_48" | "N2_HIGHCPU_64" | "N2_HIGHCPU_80" | "N2_HIGHCPU_96" | "N2D_STANDARD_2" | "N2D_STANDARD_4" | "N2D_STANDARD_8" | "N2D_STANDARD_16" | "N2D_STANDARD_32" | "N2D_STANDARD_48" | "N2D_STANDARD_64" | "N2D_STANDARD_80" | "N2D_STANDARD_96" | "N2D_STANDARD_128" | "N2D_STANDARD_224" | "N2D_HIGHMEM_2" | "N2D_HIGHMEM_4" | "N2D_HIGHMEM_8" | "N2D_HIGHMEM_16" | "N2D_HIGHMEM_32" | "N2D_HIGHMEM_48" | "N2D_HIGHMEM_64" | "N2D_HIGHMEM_80" | "N2D_HIGHMEM_96" | "N2D_HIGHCPU_2" | "N2D_HIGHCPU_4" | "N2D_HIGHCPU_8" | "N2D_HIGHCPU_16" | "N2D_HIGHCPU_32" | "N2D_HIGHCPU_48" | "N2D_HIGHCPU_64" | "N2D_HIGHCPU_80" | "N2D_HIGHCPU_96" | "N2D_HIGHCPU_128" | "N2D_HIGHCPU_224" | "C2_STANDARD_4" | "C2_STANDARD_8" | "C2_STANDARD_16" | "C2_STANDARD_30" | "C2_STANDARD_60" | "C2D_STANDARD_2" | "C2D_STANDARD_4" | "C2D_STANDARD_8" | "C2D_STANDARD_16" | "C2D_STANDARD_32" | "C2D_STANDARD_56" | "C2D_STANDARD_112" | "C2D_HIGHCPU_2" | "C2D_HIGHCPU_4" | "C2D_HIGHCPU_8" | "C2D_HIGHCPU_16" | "C2D_HIGHCPU_32" | "C2D_HIGHCPU_56" | "C2D_HIGHCPU_112" | "C2D_HIGHMEM_2" | "C2D_HIGHMEM_4" | "C2D_HIGHMEM_8" | "C2D_HIGHMEM_16" | "C2D_HIGHMEM_32" | "C2D_HIGHMEM_56" | "C2D_HIGHMEM_112" | "G2_STANDARD_4" | "G2_STANDARD_8" | "G2_STANDARD_12" | "G2_STANDARD_16" | "G2_STANDARD_24" | "G2_STANDARD_32" | "G2_STANDARD_48" | "G2_STANDARD_96" | "G4_STANDARD_48" | "C3_STANDARD_4" | "C3_STANDARD_8" | "C3_STANDARD_22" | "C3_STANDARD_44" | "C3_STANDARD_88" | "C3_STANDARD_176" | "C3_HIGHCPU_4" | "C3_HIGHCPU_8" | "C3_HIGHCPU_22" | "C3_HIGHCPU_44" | "C3_HIGHCPU_88" | "C3_HIGHCPU_176" | "C3_HIGHMEM_4" | "C3_HIGHMEM_8" | "C3_HIGHMEM_22" | "C3_HIGHMEM_44" | "C3_HIGHMEM_88" | "C3_HIGHMEM_176" | "C4_STANDARD_8" | "C4_STANDARD_16" | "C4_STANDARD_24" | "C4_STANDARD_32" | "C4_STANDARD_48" | "C4_STANDARD_96" | "C4_STANDARD_144" | "C4_STANDARD_192" | "C4_STANDARD_288" | "C4_HIGHCPU_8" | "C4_HIGHCPU_16" | "C4_HIGHCPU_24" | "C4_HIGHCPU_32" | "C4_HIGHCPU_48" | "C4_HIGHCPU_96" | "C4_HIGHCPU_144" | "C4_HIGHCPU_192" | "C4_HIGHCPU_288" | "C4_HIGHMEM_8" | "C4_HIGHMEM_16" | "C4_HIGHMEM_24" | "C4_HIGHMEM_32" | "C4_HIGHMEM_48" | "C4_HIGHMEM_96" | "C4_HIGHMEM_144" | "C4_HIGHMEM_192" | "C4_HIGHMEM_288" | "C4A_STANDARD_8" | "C4A_STANDARD_16" | "C4A_STANDARD_32" | "C4A_STANDARD_48" | "C4A_STANDARD_64" | "C4A_STANDARD_72" | "C4A_HIGHCPU_8" | "C4A_HIGHCPU_16" | "C4A_HIGHCPU_32" | "C4A_HIGHCPU_48" | "C4A_HIGHCPU_64" | "C4A_HIGHCPU_72" | "C4A_HIGHMEM_8" | "C4A_HIGHMEM_16" | "C4A_HIGHMEM_32" | "C4A_HIGHMEM_48" | "C4A_HIGHMEM_64" | "C4A_HIGHMEM_72" | (string & {});
  /** Billing tracking labels. They do not contain any user data but only the labels set by Vertex Core Infra itself. Tracking labels' keys are defined with special format: goog-[\p{Ll}\p{N}]+ E.g. "key": "goog-k8s-cluster-name","value": "us-east1-b4rk" */
  trackingLabels?: Record<string, string>;
}

export const GpuMetric: Schema.Schema<GpuMetric> = Schema.suspend(() => Schema.Struct({
  gpuType: Schema.optional(Schema.String),
  gpuSec: Schema.optional(Schema.String),
  machineSpec: Schema.optional(Schema.String),
  trackingLabels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "GpuMetric" }) as any as Schema.Schema<GpuMetric>;

export interface TpuMetric {
  /** Required. Type of TPU, e.g. TPU_V2, TPU_V3_POD. */
  tpuType?: "UNKNOWN_TPU_TYPE" | "TPU_V2_POD" | "TPU_V2" | "TPU_V3_POD" | "TPU_V3" | "TPU_V5_LITEPOD" | (string & {});
  /** Required. Seconds of TPU usage, e.g. 3600. */
  tpuSec?: string;
}

export const TpuMetric: Schema.Schema<TpuMetric> = Schema.suspend(() => Schema.Struct({
  tpuType: Schema.optional(Schema.String),
  tpuSec: Schema.optional(Schema.String),
})).annotate({ identifier: "TpuMetric" }) as any as Schema.Schema<TpuMetric>;

export interface DiskMetric {
  /** Required. Type of Disk, e.g. REGIONAL_SSD. */
  diskType?: "UNKNOWN_DISK_TYPE" | "REGIONAL_SSD" | "REGIONAL_STORAGE" | "PD_SSD" | "PD_STANDARD" | "STORAGE_SNAPSHOT" | (string & {});
  /** Required. Seconds of physical disk usage, e.g. 3600. */
  gibSec?: string;
}

export const DiskMetric: Schema.Schema<DiskMetric> = Schema.suspend(() => Schema.Struct({
  diskType: Schema.optional(Schema.String),
  gibSec: Schema.optional(Schema.String),
})).annotate({ identifier: "DiskMetric" }) as any as Schema.Schema<DiskMetric>;

export interface InfraUsage {
  /** Aggregated core metrics since requested start_time. */
  cpuMetrics?: Array<CpuMetric>;
  /** Aggregated ram metrics since requested start_time. */
  ramMetrics?: Array<RamMetric>;
  /** Aggregated gpu metrics since requested start_time. */
  gpuMetrics?: Array<GpuMetric>;
  /** Aggregated tpu metrics since requested start_time. */
  tpuMetrics?: Array<TpuMetric>;
  /** Aggregated persistent disk metrics since requested start_time. */
  diskMetrics?: Array<DiskMetric>;
}

export const InfraUsage: Schema.Schema<InfraUsage> = Schema.suspend(() => Schema.Struct({
  cpuMetrics: Schema.optional(Schema.Array(CpuMetric)),
  ramMetrics: Schema.optional(Schema.Array(RamMetric)),
  gpuMetrics: Schema.optional(Schema.Array(GpuMetric)),
  tpuMetrics: Schema.optional(Schema.Array(TpuMetric)),
  diskMetrics: Schema.optional(Schema.Array(DiskMetric)),
})).annotate({ identifier: "InfraUsage" }) as any as Schema.Schema<InfraUsage>;

export interface XPSVisionTrainingOperationMetadata {
  /** Aggregated infra usage within certain time period, for billing report purpose if XAI is enable in training request. */
  explanationUsage?: InfraUsage;
}

export const XPSVisionTrainingOperationMetadata: Schema.Schema<XPSVisionTrainingOperationMetadata> = Schema.suspend(() => Schema.Struct({
  explanationUsage: Schema.optional(InfraUsage),
})).annotate({ identifier: "XPSVisionTrainingOperationMetadata" }) as any as Schema.Schema<XPSVisionTrainingOperationMetadata>;

export interface XPSXpsOperationMetadata {
  /** Metrics for the operation. By the time the operation is terminated (whether succeeded or failed) as returned from XPS, AutoML BE assumes the metrics are finalized. AutoML BE transparently posts the metrics to Chemist if it's not empty, regardless of the response content or error type. If user is supposed to be charged in case of cancellation/error, this field should be set. In the case where the type of LRO doesn't require any billing, this field should be left unset. */
  reportingMetrics?: XPSReportingMetrics;
  /** Optional. XPS server can opt to provide example count of the long running operation (e.g. training, data importing, batch prediction). */
  exampleCount?: string;
  tablesTrainingOperationMetadata?: XPSTablesTrainingOperationMetadata;
  videoTrainingOperationMetadata?: XPSVideoTrainingOperationMetadata;
  videoBatchPredictOperationMetadata?: XPSVideoBatchPredictOperationMetadata;
  visionTrainingOperationMetadata?: XPSVisionTrainingOperationMetadata;
}

export const XPSXpsOperationMetadata: Schema.Schema<XPSXpsOperationMetadata> = Schema.suspend(() => Schema.Struct({
  reportingMetrics: Schema.optional(XPSReportingMetrics),
  exampleCount: Schema.optional(Schema.String),
  tablesTrainingOperationMetadata: Schema.optional(XPSTablesTrainingOperationMetadata),
  videoTrainingOperationMetadata: Schema.optional(XPSVideoTrainingOperationMetadata),
  videoBatchPredictOperationMetadata: Schema.optional(XPSVideoBatchPredictOperationMetadata),
  visionTrainingOperationMetadata: Schema.optional(XPSVisionTrainingOperationMetadata),
})).annotate({ identifier: "XPSXpsOperationMetadata" }) as any as Schema.Schema<XPSXpsOperationMetadata>;

// ==========================================================================
// Operations
// ==========================================================================

/** Analyzes the sentiment of the provided text. */
export interface AnalyzeSentimentDocumentsRequest {
  /** Request body */
  body?: AnalyzeSentimentRequest;
}

export const AnalyzeSentimentDocumentsRequest = Schema.Struct({
  body: Schema.optional(AnalyzeSentimentRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/documents:analyzeSentiment", hasBody: true }),
  svc,
) as unknown as Schema.Schema<AnalyzeSentimentDocumentsRequest>;

export type AnalyzeSentimentDocumentsResponse = AnalyzeSentimentResponse;
export const AnalyzeSentimentDocumentsResponse = AnalyzeSentimentResponse;

export type AnalyzeSentimentDocumentsError = CommonErrors;

export const analyzeSentimentDocuments: API.OperationMethod<AnalyzeSentimentDocumentsRequest, AnalyzeSentimentDocumentsResponse, AnalyzeSentimentDocumentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: AnalyzeSentimentDocumentsRequest,
  output: AnalyzeSentimentDocumentsResponse,
  errors: [],
}));

/** Finds named entities (currently proper names and common nouns) in the text along with entity types, probability, mentions for each entity, and other properties. */
export interface AnalyzeEntitiesDocumentsRequest {
  /** Request body */
  body?: AnalyzeEntitiesRequest;
}

export const AnalyzeEntitiesDocumentsRequest = Schema.Struct({
  body: Schema.optional(AnalyzeEntitiesRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/documents:analyzeEntities", hasBody: true }),
  svc,
) as unknown as Schema.Schema<AnalyzeEntitiesDocumentsRequest>;

export type AnalyzeEntitiesDocumentsResponse = AnalyzeEntitiesResponse;
export const AnalyzeEntitiesDocumentsResponse = AnalyzeEntitiesResponse;

export type AnalyzeEntitiesDocumentsError = CommonErrors;

export const analyzeEntitiesDocuments: API.OperationMethod<AnalyzeEntitiesDocumentsRequest, AnalyzeEntitiesDocumentsResponse, AnalyzeEntitiesDocumentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: AnalyzeEntitiesDocumentsRequest,
  output: AnalyzeEntitiesDocumentsResponse,
  errors: [],
}));

/** Classifies a document into categories. */
export interface ClassifyTextDocumentsRequest {
  /** Request body */
  body?: ClassifyTextRequest;
}

export const ClassifyTextDocumentsRequest = Schema.Struct({
  body: Schema.optional(ClassifyTextRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/documents:classifyText", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ClassifyTextDocumentsRequest>;

export type ClassifyTextDocumentsResponse = ClassifyTextResponse;
export const ClassifyTextDocumentsResponse = ClassifyTextResponse;

export type ClassifyTextDocumentsError = CommonErrors;

export const classifyTextDocuments: API.OperationMethod<ClassifyTextDocumentsRequest, ClassifyTextDocumentsResponse, ClassifyTextDocumentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ClassifyTextDocumentsRequest,
  output: ClassifyTextDocumentsResponse,
  errors: [],
}));

/** Moderates a document for harmful and sensitive categories. */
export interface ModerateTextDocumentsRequest {
  /** Request body */
  body?: ModerateTextRequest;
}

export const ModerateTextDocumentsRequest = Schema.Struct({
  body: Schema.optional(ModerateTextRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/documents:moderateText", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ModerateTextDocumentsRequest>;

export type ModerateTextDocumentsResponse = ModerateTextResponse;
export const ModerateTextDocumentsResponse = ModerateTextResponse;

export type ModerateTextDocumentsError = CommonErrors;

export const moderateTextDocuments: API.OperationMethod<ModerateTextDocumentsRequest, ModerateTextDocumentsResponse, ModerateTextDocumentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ModerateTextDocumentsRequest,
  output: ModerateTextDocumentsResponse,
  errors: [],
}));

/** A convenience method that provides all features in one call. */
export interface AnnotateTextDocumentsRequest {
  /** Request body */
  body?: AnnotateTextRequest;
}

export const AnnotateTextDocumentsRequest = Schema.Struct({
  body: Schema.optional(AnnotateTextRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/documents:annotateText", hasBody: true }),
  svc,
) as unknown as Schema.Schema<AnnotateTextDocumentsRequest>;

export type AnnotateTextDocumentsResponse = AnnotateTextResponse;
export const AnnotateTextDocumentsResponse = AnnotateTextResponse;

export type AnnotateTextDocumentsError = CommonErrors;

export const annotateTextDocuments: API.OperationMethod<AnnotateTextDocumentsRequest, AnnotateTextDocumentsResponse, AnnotateTextDocumentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: AnnotateTextDocumentsRequest,
  output: AnnotateTextDocumentsResponse,
  errors: [],
}));

