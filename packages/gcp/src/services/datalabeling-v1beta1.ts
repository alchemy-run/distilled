// ==========================================================================
// Data Labeling API (datalabeling v1beta1)
// DO NOT EDIT - Generated from GCP Discovery Document
// ==========================================================================

import * as Schema from "effect/Schema";
import * as API from "../client/api.ts";
import * as T from "../traits";
import type { Credentials } from "../credentials";
import type { DefaultErrors } from "../errors";
import type * as HttpClient from "effect/unstable/http/HttpClient";

// Service metadata
const svc = T.Service({
  name: "datalabeling",
  version: "v1beta1",
  rootUrl: "https://datalabeling.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface GoogleCloudDatalabelingV1beta1VideoThumbnail {
  /** A byte string of the video frame. */
  thumbnail?: string;
  /** Time offset relative to the beginning of the video, corresponding to the video frame where the thumbnail has been extracted from. */
  timeOffset?: string;
}

export const GoogleCloudDatalabelingV1beta1VideoThumbnail: Schema.Schema<GoogleCloudDatalabelingV1beta1VideoThumbnail> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      thumbnail: Schema.optional(Schema.String),
      timeOffset: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDatalabelingV1beta1VideoThumbnail",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1beta1VideoThumbnail>;

export interface GoogleCloudDatalabelingV1beta1VideoPayload {
  /** FPS of the video. */
  frameRate?: number;
  /** Video format. */
  mimeType?: string;
  /** The list of video thumbnails. */
  videoThumbnails?: Array<GoogleCloudDatalabelingV1beta1VideoThumbnail>;
  /** Signed uri of the video file in the service bucket. */
  signedUri?: string;
  /** Video uri from the user bucket. */
  videoUri?: string;
}

export const GoogleCloudDatalabelingV1beta1VideoPayload: Schema.Schema<GoogleCloudDatalabelingV1beta1VideoPayload> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      frameRate: Schema.optional(Schema.Number),
      mimeType: Schema.optional(Schema.String),
      videoThumbnails: Schema.optional(
        Schema.Array(GoogleCloudDatalabelingV1beta1VideoThumbnail),
      ),
      signedUri: Schema.optional(Schema.String),
      videoUri: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDatalabelingV1beta1VideoPayload",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1beta1VideoPayload>;

export interface GoogleCloudDatalabelingV1beta1GcsFolderDestination {
  /** Required. Cloud Storage directory to export data to. */
  outputFolderUri?: string;
}

export const GoogleCloudDatalabelingV1beta1GcsFolderDestination: Schema.Schema<GoogleCloudDatalabelingV1beta1GcsFolderDestination> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      outputFolderUri: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDatalabelingV1beta1GcsFolderDestination",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1beta1GcsFolderDestination>;

export interface GoogleCloudDatalabelingV1beta1GcsDestination {
  /** Required. The output uri of destination file. */
  outputUri?: string;
  /** Required. The format of the gcs destination. Only "text/csv" and "application/json" are supported. */
  mimeType?: string;
}

export const GoogleCloudDatalabelingV1beta1GcsDestination: Schema.Schema<GoogleCloudDatalabelingV1beta1GcsDestination> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      outputUri: Schema.optional(Schema.String),
      mimeType: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDatalabelingV1beta1GcsDestination",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1beta1GcsDestination>;

export interface GoogleCloudDatalabelingV1beta1OutputConfig {
  /** Output to a folder in Cloud Storage. Should be used for image segmentation or document de-identification labeling outputs. */
  gcsFolderDestination?: GoogleCloudDatalabelingV1beta1GcsFolderDestination;
  /** Output to a file in Cloud Storage. Should be used for labeling output other than image segmentation. */
  gcsDestination?: GoogleCloudDatalabelingV1beta1GcsDestination;
}

export const GoogleCloudDatalabelingV1beta1OutputConfig: Schema.Schema<GoogleCloudDatalabelingV1beta1OutputConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      gcsFolderDestination: Schema.optional(
        GoogleCloudDatalabelingV1beta1GcsFolderDestination,
      ),
      gcsDestination: Schema.optional(
        GoogleCloudDatalabelingV1beta1GcsDestination,
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDatalabelingV1beta1OutputConfig",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1beta1OutputConfig>;

export interface GoogleCloudDatalabelingV1p2alpha1HumanAnnotationConfig {
  /** Optional. If you want your own labeling contributors to manage and work on this labeling request, you can set these contributors here. We will give them access to the question types in crowdcompute. Note that these emails must be registered in crowdcompute worker UI: https://crowd-compute.appspot.com/ */
  contributorEmails?: Array<string>;
  /** Optional. A human-readable description for AnnotatedDataset. The description can be up to 10000 characters long. */
  annotatedDatasetDescription?: string;
  /** Optional. A human-readable label used to logically group labeling tasks. This string must match the regular expression `[a-zA-Z\\d_-]{0,128}`. */
  labelGroup?: string;
  /** Required. A human-readable name for AnnotatedDataset defined by users. Maximum of 64 characters . */
  annotatedDatasetDisplayName?: string;
  /** Email of the user who started the labeling task and should be notified by email. If empty no notification will be sent. */
  userEmailAddress?: string;
  /** Required. Instruction resource name. */
  instruction?: string;
  /** Optional. Replication of questions. Each question will be sent to up to this number of contributors to label. Aggregated answers will be returned. Default is set to 1. For image related labeling, valid values are 1, 3, 5. */
  replicaCount?: number;
  /** Optional. The Language of this question, as a [BCP-47](https://www.rfc-editor.org/rfc/bcp/bcp47.txt). Default value is en-US. Only need to set this when task is language related. For example, French text classification. */
  languageCode?: string;
  /** Optional. Maximum duration for contributors to answer a question. Maximum is 3600 seconds. Default is 3600 seconds. */
  questionDuration?: string;
}

export const GoogleCloudDatalabelingV1p2alpha1HumanAnnotationConfig: Schema.Schema<GoogleCloudDatalabelingV1p2alpha1HumanAnnotationConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      contributorEmails: Schema.optional(Schema.Array(Schema.String)),
      annotatedDatasetDescription: Schema.optional(Schema.String),
      labelGroup: Schema.optional(Schema.String),
      annotatedDatasetDisplayName: Schema.optional(Schema.String),
      userEmailAddress: Schema.optional(Schema.String),
      instruction: Schema.optional(Schema.String),
      replicaCount: Schema.optional(Schema.Number),
      languageCode: Schema.optional(Schema.String),
      questionDuration: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDatalabelingV1p2alpha1HumanAnnotationConfig",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1p2alpha1HumanAnnotationConfig>;

export interface GoogleRpcStatus {
  /** A list of messages that carry the error details. There is a common set of message types for APIs to use. */
  details?: Array<Record<string, unknown>>;
  /** A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. */
  message?: string;
  /** The status code, which should be an enum value of google.rpc.Code. */
  code?: number;
}

export const GoogleRpcStatus: Schema.Schema<GoogleRpcStatus> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      details: Schema.optional(
        Schema.Array(Schema.Record(Schema.String, Schema.Unknown)),
      ),
      message: Schema.optional(Schema.String),
      code: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "GoogleRpcStatus",
  }) as any as Schema.Schema<GoogleRpcStatus>;

export interface GoogleCloudDatalabelingV1beta1Attempt {
  /** Details of errors that occurred. */
  partialFailures?: Array<GoogleRpcStatus>;
  attemptTime?: string;
}

export const GoogleCloudDatalabelingV1beta1Attempt: Schema.Schema<GoogleCloudDatalabelingV1beta1Attempt> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      partialFailures: Schema.optional(Schema.Array(GoogleRpcStatus)),
      attemptTime: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDatalabelingV1beta1Attempt",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1beta1Attempt>;

export interface GoogleCloudDatalabelingV1beta1EvaluationJobAlertConfig {
  /** Required. An email address to send alerts to. */
  email?: string;
  /** Required. A number between 0 and 1 that describes a minimum mean average precision threshold. When the evaluation job runs, if it calculates that your model version's predictions from the recent interval have meanAveragePrecision below this threshold, then it sends an alert to your specified email. */
  minAcceptableMeanAveragePrecision?: number;
}

export const GoogleCloudDatalabelingV1beta1EvaluationJobAlertConfig: Schema.Schema<GoogleCloudDatalabelingV1beta1EvaluationJobAlertConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      email: Schema.optional(Schema.String),
      minAcceptableMeanAveragePrecision: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "GoogleCloudDatalabelingV1beta1EvaluationJobAlertConfig",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1beta1EvaluationJobAlertConfig>;

export interface GoogleCloudDatalabelingV1beta1BoundingPolyConfig {
  /** Optional. Instruction message showed on contributors UI. */
  instructionMessage?: string;
  /** Required. Annotation spec set resource name. */
  annotationSpecSet?: string;
}

export const GoogleCloudDatalabelingV1beta1BoundingPolyConfig: Schema.Schema<GoogleCloudDatalabelingV1beta1BoundingPolyConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      instructionMessage: Schema.optional(Schema.String),
      annotationSpecSet: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDatalabelingV1beta1BoundingPolyConfig",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1beta1BoundingPolyConfig>;

export interface GoogleCloudDatalabelingV1beta1TextMetadata {
  /** The language of this text, as a [BCP-47](https://www.rfc-editor.org/rfc/bcp/bcp47.txt). Default value is en-US. */
  languageCode?: string;
}

export const GoogleCloudDatalabelingV1beta1TextMetadata: Schema.Schema<GoogleCloudDatalabelingV1beta1TextMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      languageCode: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDatalabelingV1beta1TextMetadata",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1beta1TextMetadata>;

export interface GoogleCloudDatalabelingV1beta1GcsSource {
  /** Required. The format of the source file. Only "text/csv" is supported. */
  mimeType?: string;
  /** Required. The input URI of source file. This must be a Cloud Storage path (`gs://...`). */
  inputUri?: string;
}

export const GoogleCloudDatalabelingV1beta1GcsSource: Schema.Schema<GoogleCloudDatalabelingV1beta1GcsSource> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      mimeType: Schema.optional(Schema.String),
      inputUri: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDatalabelingV1beta1GcsSource",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1beta1GcsSource>;

export interface GoogleCloudDatalabelingV1beta1BigQuerySource {
  /** Required. BigQuery URI to a table, up to 2,000 characters long. If you specify the URI of a table that does not exist, Data Labeling Service creates a table at the URI with the correct schema when you create your EvaluationJob. If you specify the URI of a table that already exists, it must have the [correct schema](/ml-engine/docs/continuous-evaluation/create-job#table-schema). Provide the table URI in the following format: "bq://{your_project_id}/ {your_dataset_name}/{your_table_name}" [Learn more](/ml-engine/docs/continuous-evaluation/create-job#table-schema). */
  inputUri?: string;
}

export const GoogleCloudDatalabelingV1beta1BigQuerySource: Schema.Schema<GoogleCloudDatalabelingV1beta1BigQuerySource> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      inputUri: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDatalabelingV1beta1BigQuerySource",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1beta1BigQuerySource>;

export interface GoogleCloudDatalabelingV1beta1ClassificationMetadata {
  /** Whether the classification task is multi-label or not. */
  isMultiLabel?: boolean;
}

export const GoogleCloudDatalabelingV1beta1ClassificationMetadata: Schema.Schema<GoogleCloudDatalabelingV1beta1ClassificationMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      isMultiLabel: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "GoogleCloudDatalabelingV1beta1ClassificationMetadata",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1beta1ClassificationMetadata>;

export interface GoogleCloudDatalabelingV1beta1InputConfig {
  /** Required. Data type must be specifed when user tries to import data. */
  dataType?:
    | "DATA_TYPE_UNSPECIFIED"
    | "IMAGE"
    | "VIDEO"
    | "TEXT"
    | "GENERAL_DATA"
    | (string & {});
  /** Required for text import, as language code must be specified. */
  textMetadata?: GoogleCloudDatalabelingV1beta1TextMetadata;
  /** Optional. The type of annotation to be performed on this data. You must specify this field if you are using this InputConfig in an EvaluationJob. */
  annotationType?:
    | "ANNOTATION_TYPE_UNSPECIFIED"
    | "IMAGE_CLASSIFICATION_ANNOTATION"
    | "IMAGE_BOUNDING_BOX_ANNOTATION"
    | "IMAGE_ORIENTED_BOUNDING_BOX_ANNOTATION"
    | "IMAGE_BOUNDING_POLY_ANNOTATION"
    | "IMAGE_POLYLINE_ANNOTATION"
    | "IMAGE_SEGMENTATION_ANNOTATION"
    | "VIDEO_SHOTS_CLASSIFICATION_ANNOTATION"
    | "VIDEO_OBJECT_TRACKING_ANNOTATION"
    | "VIDEO_OBJECT_DETECTION_ANNOTATION"
    | "VIDEO_EVENT_ANNOTATION"
    | "TEXT_CLASSIFICATION_ANNOTATION"
    | "TEXT_ENTITY_EXTRACTION_ANNOTATION"
    | "GENERAL_CLASSIFICATION_ANNOTATION"
    | (string & {});
  /** Source located in Cloud Storage. */
  gcsSource?: GoogleCloudDatalabelingV1beta1GcsSource;
  /** Source located in BigQuery. You must specify this field if you are using this InputConfig in an EvaluationJob. */
  bigquerySource?: GoogleCloudDatalabelingV1beta1BigQuerySource;
  /** Optional. Metadata about annotations for the input. You must specify this field if you are using this InputConfig in an EvaluationJob for a model version that performs classification. */
  classificationMetadata?: GoogleCloudDatalabelingV1beta1ClassificationMetadata;
}

export const GoogleCloudDatalabelingV1beta1InputConfig: Schema.Schema<GoogleCloudDatalabelingV1beta1InputConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      dataType: Schema.optional(Schema.String),
      textMetadata: Schema.optional(GoogleCloudDatalabelingV1beta1TextMetadata),
      annotationType: Schema.optional(Schema.String),
      gcsSource: Schema.optional(GoogleCloudDatalabelingV1beta1GcsSource),
      bigquerySource: Schema.optional(
        GoogleCloudDatalabelingV1beta1BigQuerySource,
      ),
      classificationMetadata: Schema.optional(
        GoogleCloudDatalabelingV1beta1ClassificationMetadata,
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDatalabelingV1beta1InputConfig",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1beta1InputConfig>;

export interface GoogleCloudDatalabelingV1beta1SentimentConfig {
  /** If set to true, contributors will have the option to select sentiment of the label they selected, to mark it as negative or positive label. Default is false. */
  enableLabelSentimentSelection?: boolean;
}

export const GoogleCloudDatalabelingV1beta1SentimentConfig: Schema.Schema<GoogleCloudDatalabelingV1beta1SentimentConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      enableLabelSentimentSelection: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "GoogleCloudDatalabelingV1beta1SentimentConfig",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1beta1SentimentConfig>;

export interface GoogleCloudDatalabelingV1beta1TextClassificationConfig {
  /** Optional. If allow_multi_label is true, contributors are able to choose multiple labels for one text segment. */
  allowMultiLabel?: boolean;
  /** Optional. Configs for sentiment selection. We deprecate sentiment analysis in data labeling side as it is incompatible with uCAIP. */
  sentimentConfig?: GoogleCloudDatalabelingV1beta1SentimentConfig;
  /** Required. Annotation spec set resource name. */
  annotationSpecSet?: string;
}

export const GoogleCloudDatalabelingV1beta1TextClassificationConfig: Schema.Schema<GoogleCloudDatalabelingV1beta1TextClassificationConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      allowMultiLabel: Schema.optional(Schema.Boolean),
      sentimentConfig: Schema.optional(
        GoogleCloudDatalabelingV1beta1SentimentConfig,
      ),
      annotationSpecSet: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDatalabelingV1beta1TextClassificationConfig",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1beta1TextClassificationConfig>;

export interface GoogleCloudDatalabelingV1beta1BoundingBoxEvaluationOptions {
  /** Minimum [intersection-over-union (IOU)](/vision/automl/object-detection/docs/evaluate#intersection-over-union) required for 2 bounding boxes to be considered a match. This must be a number between 0 and 1. */
  iouThreshold?: number;
}

export const GoogleCloudDatalabelingV1beta1BoundingBoxEvaluationOptions: Schema.Schema<GoogleCloudDatalabelingV1beta1BoundingBoxEvaluationOptions> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      iouThreshold: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "GoogleCloudDatalabelingV1beta1BoundingBoxEvaluationOptions",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1beta1BoundingBoxEvaluationOptions>;

export interface GoogleCloudDatalabelingV1beta1EvaluationConfig {
  /** Only specify this field if the related model performs image object detection (`IMAGE_BOUNDING_BOX_ANNOTATION`). Describes how to evaluate bounding boxes. */
  boundingBoxEvaluationOptions?: GoogleCloudDatalabelingV1beta1BoundingBoxEvaluationOptions;
}

export const GoogleCloudDatalabelingV1beta1EvaluationConfig: Schema.Schema<GoogleCloudDatalabelingV1beta1EvaluationConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      boundingBoxEvaluationOptions: Schema.optional(
        GoogleCloudDatalabelingV1beta1BoundingBoxEvaluationOptions,
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDatalabelingV1beta1EvaluationConfig",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1beta1EvaluationConfig>;

export interface GoogleCloudDatalabelingV1beta1ImageClassificationConfig {
  /** Optional. The type of how to aggregate answers. */
  answerAggregationType?:
    | "STRING_AGGREGATION_TYPE_UNSPECIFIED"
    | "MAJORITY_VOTE"
    | "UNANIMOUS_VOTE"
    | "NO_AGGREGATION"
    | (string & {});
  /** Required. Annotation spec set resource name. */
  annotationSpecSet?: string;
  /** Optional. If allow_multi_label is true, contributors are able to choose multiple labels for one image. */
  allowMultiLabel?: boolean;
}

export const GoogleCloudDatalabelingV1beta1ImageClassificationConfig: Schema.Schema<GoogleCloudDatalabelingV1beta1ImageClassificationConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      answerAggregationType: Schema.optional(Schema.String),
      annotationSpecSet: Schema.optional(Schema.String),
      allowMultiLabel: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "GoogleCloudDatalabelingV1beta1ImageClassificationConfig",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1beta1ImageClassificationConfig>;

export interface GoogleCloudDatalabelingV1beta1HumanAnnotationConfig {
  /** Required. Instruction resource name. */
  instruction?: string;
  /** Optional. A human-readable label used to logically group labeling tasks. This string must match the regular expression `[a-zA-Z\\d_-]{0,128}`. */
  labelGroup?: string;
  /** Email of the user who started the labeling task and should be notified by email. If empty no notification will be sent. */
  userEmailAddress?: string;
  /** Optional. If you want your own labeling contributors to manage and work on this labeling request, you can set these contributors here. We will give them access to the question types in crowdcompute. Note that these emails must be registered in crowdcompute worker UI: https://crowd-compute.appspot.com/ */
  contributorEmails?: Array<string>;
  /** Required. A human-readable name for AnnotatedDataset defined by users. Maximum of 64 characters . */
  annotatedDatasetDisplayName?: string;
  /** Optional. A human-readable description for AnnotatedDataset. The description can be up to 10000 characters long. */
  annotatedDatasetDescription?: string;
  /** Optional. Maximum duration for contributors to answer a question. Maximum is 3600 seconds. Default is 3600 seconds. */
  questionDuration?: string;
  /** Optional. The Language of this question, as a [BCP-47](https://www.rfc-editor.org/rfc/bcp/bcp47.txt). Default value is en-US. Only need to set this when task is language related. For example, French text classification. */
  languageCode?: string;
  /** Optional. Replication of questions. Each question will be sent to up to this number of contributors to label. Aggregated answers will be returned. Default is set to 1. For image related labeling, valid values are 1, 3, 5. */
  replicaCount?: number;
}

export const GoogleCloudDatalabelingV1beta1HumanAnnotationConfig: Schema.Schema<GoogleCloudDatalabelingV1beta1HumanAnnotationConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      instruction: Schema.optional(Schema.String),
      labelGroup: Schema.optional(Schema.String),
      userEmailAddress: Schema.optional(Schema.String),
      contributorEmails: Schema.optional(Schema.Array(Schema.String)),
      annotatedDatasetDisplayName: Schema.optional(Schema.String),
      annotatedDatasetDescription: Schema.optional(Schema.String),
      questionDuration: Schema.optional(Schema.String),
      languageCode: Schema.optional(Schema.String),
      replicaCount: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "GoogleCloudDatalabelingV1beta1HumanAnnotationConfig",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1beta1HumanAnnotationConfig>;

export interface GoogleCloudDatalabelingV1beta1EvaluationJobConfig {
  /** Optional. Configuration details for evaluation job alerts. Specify this field if you want to receive email alerts if the evaluation job finds that your predictions have low mean average precision during a run. */
  evaluationJobAlertConfig?: GoogleCloudDatalabelingV1beta1EvaluationJobAlertConfig;
  /** Required. Fraction of predictions to sample and save to BigQuery during each evaluation interval. For example, 0.1 means 10% of predictions served by your model version get saved to BigQuery. */
  exampleSamplePercentage?: number;
  /** Specify this field if your model version performs image object detection (bounding box detection). `annotationSpecSet` in this configuration must match EvaluationJob.annotationSpecSet. */
  boundingPolyConfig?: GoogleCloudDatalabelingV1beta1BoundingPolyConfig;
  /** Rquired. Details for the sampled prediction input. Within this configuration, there are requirements for several fields: * `dataType` must be one of `IMAGE`, `TEXT`, or `GENERAL_DATA`. * `annotationType` must be one of `IMAGE_CLASSIFICATION_ANNOTATION`, `TEXT_CLASSIFICATION_ANNOTATION`, `GENERAL_CLASSIFICATION_ANNOTATION`, or `IMAGE_BOUNDING_BOX_ANNOTATION` (image object detection). * If your machine learning model performs classification, you must specify `classificationMetadata.isMultiLabel`. * You must specify `bigquerySource` (not `gcsSource`). */
  inputConfig?: GoogleCloudDatalabelingV1beta1InputConfig;
  /** Specify this field if your model version performs text classification. `annotationSpecSet` in this configuration must match EvaluationJob.annotationSpecSet. `allowMultiLabel` in this configuration must match `classificationMetadata.isMultiLabel` in input_config. */
  textClassificationConfig?: GoogleCloudDatalabelingV1beta1TextClassificationConfig;
  /** Required. The maximum number of predictions to sample and save to BigQuery during each evaluation interval. This limit overrides `example_sample_percentage`: even if the service has not sampled enough predictions to fulfill `example_sample_perecentage` during an interval, it stops sampling predictions when it meets this limit. */
  exampleCount?: number;
  /** Required. Prediction keys that tell Data Labeling Service where to find the data for evaluation in your BigQuery table. When the service samples prediction input and output from your model version and saves it to BigQuery, the data gets stored as JSON strings in the BigQuery table. These keys tell Data Labeling Service how to parse the JSON. You can provide the following entries in this field: * `data_json_key`: the data key for prediction input. You must provide either this key or `reference_json_key`. * `reference_json_key`: the data reference key for prediction input. You must provide either this key or `data_json_key`. * `label_json_key`: the label key for prediction output. Required. * `label_score_json_key`: the score key for prediction output. Required. * `bounding_box_json_key`: the bounding box key for prediction output. Required if your model version perform image object detection. Learn [how to configure prediction keys](/ml-engine/docs/continuous-evaluation/create-job#prediction-keys). */
  bigqueryImportKeys?: Record<string, string>;
  /** Required. Details for calculating evaluation metrics and creating Evaulations. If your model version performs image object detection, you must specify the `boundingBoxEvaluationOptions` field within this configuration. Otherwise, provide an empty object for this configuration. */
  evaluationConfig?: GoogleCloudDatalabelingV1beta1EvaluationConfig;
  /** Specify this field if your model version performs image classification or general classification. `annotationSpecSet` in this configuration must match EvaluationJob.annotationSpecSet. `allowMultiLabel` in this configuration must match `classificationMetadata.isMultiLabel` in input_config. */
  imageClassificationConfig?: GoogleCloudDatalabelingV1beta1ImageClassificationConfig;
  /** Optional. Details for human annotation of your data. If you set labelMissingGroundTruth to `true` for this evaluation job, then you must specify this field. If you plan to provide your own ground truth labels, then omit this field. Note that you must create an Instruction resource before you can specify this field. Provide the name of the instruction resource in the `instruction` field within this configuration. */
  humanAnnotationConfig?: GoogleCloudDatalabelingV1beta1HumanAnnotationConfig;
}

export const GoogleCloudDatalabelingV1beta1EvaluationJobConfig: Schema.Schema<GoogleCloudDatalabelingV1beta1EvaluationJobConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      evaluationJobAlertConfig: Schema.optional(
        GoogleCloudDatalabelingV1beta1EvaluationJobAlertConfig,
      ),
      exampleSamplePercentage: Schema.optional(Schema.Number),
      boundingPolyConfig: Schema.optional(
        GoogleCloudDatalabelingV1beta1BoundingPolyConfig,
      ),
      inputConfig: Schema.optional(GoogleCloudDatalabelingV1beta1InputConfig),
      textClassificationConfig: Schema.optional(
        GoogleCloudDatalabelingV1beta1TextClassificationConfig,
      ),
      exampleCount: Schema.optional(Schema.Number),
      bigqueryImportKeys: Schema.optional(
        Schema.Record(Schema.String, Schema.String),
      ),
      evaluationConfig: Schema.optional(
        GoogleCloudDatalabelingV1beta1EvaluationConfig,
      ),
      imageClassificationConfig: Schema.optional(
        GoogleCloudDatalabelingV1beta1ImageClassificationConfig,
      ),
      humanAnnotationConfig: Schema.optional(
        GoogleCloudDatalabelingV1beta1HumanAnnotationConfig,
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDatalabelingV1beta1EvaluationJobConfig",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1beta1EvaluationJobConfig>;

export interface GoogleCloudDatalabelingV1beta1EvaluationJob {
  /** Output only. Every time the evaluation job runs and an error occurs, the failed attempt is appended to this array. */
  attempts?: Array<GoogleCloudDatalabelingV1beta1Attempt>;
  /** Required. Describes the interval at which the job runs. This interval must be at least 1 day, and it is rounded to the nearest day. For example, if you specify a 50-hour interval, the job runs every 2 days. You can provide the schedule in [crontab format](/scheduler/docs/configuring/cron-job-schedules) or in an [English-like format](/appengine/docs/standard/python/config/cronref#schedule_format). Regardless of what you specify, the job will run at 10:00 AM UTC. Only the interval from this schedule is used, not the specific time of day. */
  schedule?: string;
  /** Required. The [AI Platform Prediction model version](/ml-engine/docs/prediction-overview) to be evaluated. Prediction input and output is sampled from this model version. When creating an evaluation job, specify the model version in the following format: "projects/{project_id}/models/{model_name}/versions/{version_name}" There can only be one evaluation job per model version. */
  modelVersion?: string;
  /** Required. Name of the AnnotationSpecSet describing all the labels that your machine learning model outputs. You must create this resource before you create an evaluation job and provide its name in the following format: "projects/{project_id}/annotationSpecSets/{annotation_spec_set_id}" */
  annotationSpecSet?: string;
  /** Output only. After you create a job, Data Labeling Service assigns a name to the job with the following format: "projects/{project_id}/evaluationJobs/ {evaluation_job_id}" */
  name?: string;
  /** Required. Description of the job. The description can be up to 25,000 characters long. */
  description?: string;
  /** Required. Configuration details for the evaluation job. */
  evaluationJobConfig?: GoogleCloudDatalabelingV1beta1EvaluationJobConfig;
  /** Required. Whether you want Data Labeling Service to provide ground truth labels for prediction input. If you want the service to assign human labelers to annotate your data, set this to `true`. If you want to provide your own ground truth labels in the evaluation job's BigQuery table, set this to `false`. */
  labelMissingGroundTruth?: boolean;
  /** Output only. Timestamp of when this evaluation job was created. */
  createTime?: string;
  /** Output only. Describes the current state of the job. */
  state?:
    | "STATE_UNSPECIFIED"
    | "SCHEDULED"
    | "RUNNING"
    | "PAUSED"
    | "STOPPED"
    | (string & {});
}

export const GoogleCloudDatalabelingV1beta1EvaluationJob: Schema.Schema<GoogleCloudDatalabelingV1beta1EvaluationJob> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      attempts: Schema.optional(
        Schema.Array(GoogleCloudDatalabelingV1beta1Attempt),
      ),
      schedule: Schema.optional(Schema.String),
      modelVersion: Schema.optional(Schema.String),
      annotationSpecSet: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
      description: Schema.optional(Schema.String),
      evaluationJobConfig: Schema.optional(
        GoogleCloudDatalabelingV1beta1EvaluationJobConfig,
      ),
      labelMissingGroundTruth: Schema.optional(Schema.Boolean),
      createTime: Schema.optional(Schema.String),
      state: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDatalabelingV1beta1EvaluationJob",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1beta1EvaluationJob>;

export interface GoogleCloudDatalabelingV1beta1ListEvaluationJobsResponse {
  /** The list of evaluation jobs to return. */
  evaluationJobs?: Array<GoogleCloudDatalabelingV1beta1EvaluationJob>;
  /** A token to retrieve next page of results. */
  nextPageToken?: string;
}

export const GoogleCloudDatalabelingV1beta1ListEvaluationJobsResponse: Schema.Schema<GoogleCloudDatalabelingV1beta1ListEvaluationJobsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      evaluationJobs: Schema.optional(
        Schema.Array(GoogleCloudDatalabelingV1beta1EvaluationJob),
      ),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDatalabelingV1beta1ListEvaluationJobsResponse",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1beta1ListEvaluationJobsResponse>;

export interface GoogleCloudDatalabelingV1p1alpha1GenerateAnalysisReportOperationMetadata {
  /** Timestamp when generate report request was created. */
  createTime?: string;
  /** The name of the dataset for which the analysis report is generated. Format: "projects/* /datasets/*" */
  dataset?: string;
}

export const GoogleCloudDatalabelingV1p1alpha1GenerateAnalysisReportOperationMetadata: Schema.Schema<GoogleCloudDatalabelingV1p1alpha1GenerateAnalysisReportOperationMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      createTime: Schema.optional(Schema.String),
      dataset: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier:
      "GoogleCloudDatalabelingV1p1alpha1GenerateAnalysisReportOperationMetadata",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1p1alpha1GenerateAnalysisReportOperationMetadata>;

export interface GoogleCloudDatalabelingV1beta1LabelImageBoundingBoxOperationMetadata {
  /** Basic human annotation config used in labeling request. */
  basicConfig?: GoogleCloudDatalabelingV1beta1HumanAnnotationConfig;
}

export const GoogleCloudDatalabelingV1beta1LabelImageBoundingBoxOperationMetadata: Schema.Schema<GoogleCloudDatalabelingV1beta1LabelImageBoundingBoxOperationMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      basicConfig: Schema.optional(
        GoogleCloudDatalabelingV1beta1HumanAnnotationConfig,
      ),
    }),
  ).annotate({
    identifier:
      "GoogleCloudDatalabelingV1beta1LabelImageBoundingBoxOperationMetadata",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1beta1LabelImageBoundingBoxOperationMetadata>;

export interface GoogleCloudDatalabelingV1beta1AnnotationSpec {
  /** Output only. This is the integer index of the AnnotationSpec. The index for the whole AnnotationSpecSet is sequential starting from 0. For example, an AnnotationSpecSet with classes `dog` and `cat`, might contain one AnnotationSpec with `{ display_name: "dog", index: 0 }` and one AnnotationSpec with `{ display_name: "cat", index: 1 }`. This is especially useful for model training as it encodes the string labels into numeric values. */
  index?: number;
  /** Required. The display name of the AnnotationSpec. Maximum of 64 characters. */
  displayName?: string;
  /** Optional. User-provided description of the annotation specification. The description can be up to 10,000 characters long. */
  description?: string;
}

export const GoogleCloudDatalabelingV1beta1AnnotationSpec: Schema.Schema<GoogleCloudDatalabelingV1beta1AnnotationSpec> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      index: Schema.optional(Schema.Number),
      displayName: Schema.optional(Schema.String),
      description: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDatalabelingV1beta1AnnotationSpec",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1beta1AnnotationSpec>;

export interface GoogleCloudDatalabelingV1beta1AnnotationSpecSet {
  /** Optional. User-provided description of the annotation specification set. The description can be up to 10,000 characters long. */
  description?: string;
  /** Output only. The names of any related resources that are blocking changes to the annotation spec set. */
  blockingResources?: Array<string>;
  /** Required. The display name for AnnotationSpecSet that you define when you create it. Maximum of 64 characters. */
  displayName?: string;
  /** Output only. The AnnotationSpecSet resource name in the following format: "projects/{project_id}/annotationSpecSets/{annotation_spec_set_id}" */
  name?: string;
  /** Required. The array of AnnotationSpecs that you define when you create the AnnotationSpecSet. These are the possible labels for the labeling task. */
  annotationSpecs?: Array<GoogleCloudDatalabelingV1beta1AnnotationSpec>;
}

export const GoogleCloudDatalabelingV1beta1AnnotationSpecSet: Schema.Schema<GoogleCloudDatalabelingV1beta1AnnotationSpecSet> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      description: Schema.optional(Schema.String),
      blockingResources: Schema.optional(Schema.Array(Schema.String)),
      displayName: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
      annotationSpecs: Schema.optional(
        Schema.Array(GoogleCloudDatalabelingV1beta1AnnotationSpec),
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDatalabelingV1beta1AnnotationSpecSet",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1beta1AnnotationSpecSet>;

export interface GoogleCloudDatalabelingV1beta1ListAnnotationSpecSetsResponse {
  /** The list of annotation spec sets. */
  annotationSpecSets?: Array<GoogleCloudDatalabelingV1beta1AnnotationSpecSet>;
  /** A token to retrieve next page of results. */
  nextPageToken?: string;
}

export const GoogleCloudDatalabelingV1beta1ListAnnotationSpecSetsResponse: Schema.Schema<GoogleCloudDatalabelingV1beta1ListAnnotationSpecSetsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      annotationSpecSets: Schema.optional(
        Schema.Array(GoogleCloudDatalabelingV1beta1AnnotationSpecSet),
      ),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDatalabelingV1beta1ListAnnotationSpecSetsResponse",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1beta1ListAnnotationSpecSetsResponse>;

export interface GoogleCloudDatalabelingV1beta1ConfusionMatrixEntry {
  /** The annotation spec of a predicted label. */
  annotationSpec?: GoogleCloudDatalabelingV1beta1AnnotationSpec;
  /** Number of items predicted to have this label. (The ground truth label for these items is the `Row.annotationSpec` of this entry's parent.) */
  itemCount?: number;
}

export const GoogleCloudDatalabelingV1beta1ConfusionMatrixEntry: Schema.Schema<GoogleCloudDatalabelingV1beta1ConfusionMatrixEntry> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      annotationSpec: Schema.optional(
        GoogleCloudDatalabelingV1beta1AnnotationSpec,
      ),
      itemCount: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "GoogleCloudDatalabelingV1beta1ConfusionMatrixEntry",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1beta1ConfusionMatrixEntry>;

export interface GoogleCloudDatalabelingV1beta1Row {
  /** The annotation spec of the ground truth label for this row. */
  annotationSpec?: GoogleCloudDatalabelingV1beta1AnnotationSpec;
  /** A list of the confusion matrix entries. One entry for each possible predicted label. */
  entries?: Array<GoogleCloudDatalabelingV1beta1ConfusionMatrixEntry>;
}

export const GoogleCloudDatalabelingV1beta1Row: Schema.Schema<GoogleCloudDatalabelingV1beta1Row> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      annotationSpec: Schema.optional(
        GoogleCloudDatalabelingV1beta1AnnotationSpec,
      ),
      entries: Schema.optional(
        Schema.Array(GoogleCloudDatalabelingV1beta1ConfusionMatrixEntry),
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDatalabelingV1beta1Row",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1beta1Row>;

export interface GoogleCloudDatalabelingV1beta1SequentialSegment {
  /** Start position (inclusive). */
  start?: number;
  /** End position (exclusive). */
  end?: number;
}

export const GoogleCloudDatalabelingV1beta1SequentialSegment: Schema.Schema<GoogleCloudDatalabelingV1beta1SequentialSegment> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      start: Schema.optional(Schema.Number),
      end: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "GoogleCloudDatalabelingV1beta1SequentialSegment",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1beta1SequentialSegment>;

export interface GoogleCloudDatalabelingV1beta1ConfusionMatrix {
  row?: Array<GoogleCloudDatalabelingV1beta1Row>;
}

export const GoogleCloudDatalabelingV1beta1ConfusionMatrix: Schema.Schema<GoogleCloudDatalabelingV1beta1ConfusionMatrix> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      row: Schema.optional(Schema.Array(GoogleCloudDatalabelingV1beta1Row)),
    }),
  ).annotate({
    identifier: "GoogleCloudDatalabelingV1beta1ConfusionMatrix",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1beta1ConfusionMatrix>;

export interface GoogleCloudDatalabelingV1beta1TextEntityExtractionConfig {
  /** Required. Annotation spec set resource name. */
  annotationSpecSet?: string;
}

export const GoogleCloudDatalabelingV1beta1TextEntityExtractionConfig: Schema.Schema<GoogleCloudDatalabelingV1beta1TextEntityExtractionConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      annotationSpecSet: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDatalabelingV1beta1TextEntityExtractionConfig",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1beta1TextEntityExtractionConfig>;

export interface GoogleCloudDatalabelingV1beta1PolylineConfig {
  /** Required. Annotation spec set resource name. */
  annotationSpecSet?: string;
  /** Optional. Instruction message showed on contributors UI. */
  instructionMessage?: string;
}

export const GoogleCloudDatalabelingV1beta1PolylineConfig: Schema.Schema<GoogleCloudDatalabelingV1beta1PolylineConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      annotationSpecSet: Schema.optional(Schema.String),
      instructionMessage: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDatalabelingV1beta1PolylineConfig",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1beta1PolylineConfig>;

export interface GoogleCloudDatalabelingV1beta1AnnotationSpecSetConfig {
  /** Optional. If allow_multi_label is true, contributors are able to choose multiple labels from one annotation spec set. */
  allowMultiLabel?: boolean;
  /** Required. Annotation spec set resource name. */
  annotationSpecSet?: string;
}

export const GoogleCloudDatalabelingV1beta1AnnotationSpecSetConfig: Schema.Schema<GoogleCloudDatalabelingV1beta1AnnotationSpecSetConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      allowMultiLabel: Schema.optional(Schema.Boolean),
      annotationSpecSet: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDatalabelingV1beta1AnnotationSpecSetConfig",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1beta1AnnotationSpecSetConfig>;

export interface GoogleCloudDatalabelingV1beta1VideoClassificationConfig {
  /** Required. The list of annotation spec set configs. Since watching a video clip takes much longer time than an image, we support label with multiple AnnotationSpecSet at the same time. Labels in each AnnotationSpecSet will be shown in a group to contributors. Contributors can select one or more (depending on whether to allow multi label) from each group. */
  annotationSpecSetConfigs?: Array<GoogleCloudDatalabelingV1beta1AnnotationSpecSetConfig>;
  /** Optional. Option to apply shot detection on the video. */
  applyShotDetection?: boolean;
}

export const GoogleCloudDatalabelingV1beta1VideoClassificationConfig: Schema.Schema<GoogleCloudDatalabelingV1beta1VideoClassificationConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      annotationSpecSetConfigs: Schema.optional(
        Schema.Array(GoogleCloudDatalabelingV1beta1AnnotationSpecSetConfig),
      ),
      applyShotDetection: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "GoogleCloudDatalabelingV1beta1VideoClassificationConfig",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1beta1VideoClassificationConfig>;

export interface GoogleCloudDatalabelingV1beta1EventConfig {
  /** Required. The list of annotation spec set resource name. Similar to video classification, we support selecting event from multiple AnnotationSpecSet at the same time. */
  annotationSpecSets?: Array<string>;
  /** The overlap length between different video clips. Users can configure is field in seconds, if not set, default value is 1s. */
  overlapLength?: number;
  /** Videos will be cut to smaller clips to make it easier for labelers to work on. Users can configure is field in seconds, if not set, default value is 60s. */
  clipLength?: number;
}

export const GoogleCloudDatalabelingV1beta1EventConfig: Schema.Schema<GoogleCloudDatalabelingV1beta1EventConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      annotationSpecSets: Schema.optional(Schema.Array(Schema.String)),
      overlapLength: Schema.optional(Schema.Number),
      clipLength: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "GoogleCloudDatalabelingV1beta1EventConfig",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1beta1EventConfig>;

export interface GoogleCloudDatalabelingV1beta1ObjectTrackingConfig {
  /** Required. Annotation spec set resource name. */
  annotationSpecSet?: string;
  /** The overlap length between different video clips. Users can configure is field in seconds, if not set, default value is 0.3s. */
  overlapLength?: number;
  /** Videos will be cut to smaller clips to make it easier for labelers to work on. Users can configure is field in seconds, if not set, default value is 20s. */
  clipLength?: number;
}

export const GoogleCloudDatalabelingV1beta1ObjectTrackingConfig: Schema.Schema<GoogleCloudDatalabelingV1beta1ObjectTrackingConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      annotationSpecSet: Schema.optional(Schema.String),
      overlapLength: Schema.optional(Schema.Number),
      clipLength: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "GoogleCloudDatalabelingV1beta1ObjectTrackingConfig",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1beta1ObjectTrackingConfig>;

export interface GoogleCloudDatalabelingV1beta1ObjectDetectionConfig {
  /** Required. Annotation spec set resource name. */
  annotationSpecSet?: string;
  /** Required. Number of frames per second to be extracted from the video. */
  extractionFrameRate?: number;
}

export const GoogleCloudDatalabelingV1beta1ObjectDetectionConfig: Schema.Schema<GoogleCloudDatalabelingV1beta1ObjectDetectionConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      annotationSpecSet: Schema.optional(Schema.String),
      extractionFrameRate: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "GoogleCloudDatalabelingV1beta1ObjectDetectionConfig",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1beta1ObjectDetectionConfig>;

export interface GoogleCloudDatalabelingV1beta1SegmentationConfig {
  /** Instruction message showed on labelers UI. */
  instructionMessage?: string;
  /** Required. Annotation spec set resource name. format: projects/{project_id}/annotationSpecSets/{annotation_spec_set_id} */
  annotationSpecSet?: string;
}

export const GoogleCloudDatalabelingV1beta1SegmentationConfig: Schema.Schema<GoogleCloudDatalabelingV1beta1SegmentationConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      instructionMessage: Schema.optional(Schema.String),
      annotationSpecSet: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDatalabelingV1beta1SegmentationConfig",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1beta1SegmentationConfig>;

export interface GoogleCloudDatalabelingV1beta1AnnotatedDatasetMetadata {
  /** Configuration for text entity extraction task. */
  textEntityExtractionConfig?: GoogleCloudDatalabelingV1beta1TextEntityExtractionConfig;
  /** Configuration for image polyline task. */
  polylineConfig?: GoogleCloudDatalabelingV1beta1PolylineConfig;
  /** Configuration for video classification task. */
  videoClassificationConfig?: GoogleCloudDatalabelingV1beta1VideoClassificationConfig;
  /** Configuration for video event labeling task. */
  eventConfig?: GoogleCloudDatalabelingV1beta1EventConfig;
  /** Configuration for text classification task. */
  textClassificationConfig?: GoogleCloudDatalabelingV1beta1TextClassificationConfig;
  /** HumanAnnotationConfig used when requesting the human labeling task for this AnnotatedDataset. */
  humanAnnotationConfig?: GoogleCloudDatalabelingV1beta1HumanAnnotationConfig;
  /** Configuration for video object tracking task. */
  objectTrackingConfig?: GoogleCloudDatalabelingV1beta1ObjectTrackingConfig;
  /** Configuration for video object detection task. */
  objectDetectionConfig?: GoogleCloudDatalabelingV1beta1ObjectDetectionConfig;
  /** Configuration for image segmentation task. */
  segmentationConfig?: GoogleCloudDatalabelingV1beta1SegmentationConfig;
  /** Configuration for image bounding box and bounding poly task. */
  boundingPolyConfig?: GoogleCloudDatalabelingV1beta1BoundingPolyConfig;
  /** Configuration for image classification task. */
  imageClassificationConfig?: GoogleCloudDatalabelingV1beta1ImageClassificationConfig;
}

export const GoogleCloudDatalabelingV1beta1AnnotatedDatasetMetadata: Schema.Schema<GoogleCloudDatalabelingV1beta1AnnotatedDatasetMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      textEntityExtractionConfig: Schema.optional(
        GoogleCloudDatalabelingV1beta1TextEntityExtractionConfig,
      ),
      polylineConfig: Schema.optional(
        GoogleCloudDatalabelingV1beta1PolylineConfig,
      ),
      videoClassificationConfig: Schema.optional(
        GoogleCloudDatalabelingV1beta1VideoClassificationConfig,
      ),
      eventConfig: Schema.optional(GoogleCloudDatalabelingV1beta1EventConfig),
      textClassificationConfig: Schema.optional(
        GoogleCloudDatalabelingV1beta1TextClassificationConfig,
      ),
      humanAnnotationConfig: Schema.optional(
        GoogleCloudDatalabelingV1beta1HumanAnnotationConfig,
      ),
      objectTrackingConfig: Schema.optional(
        GoogleCloudDatalabelingV1beta1ObjectTrackingConfig,
      ),
      objectDetectionConfig: Schema.optional(
        GoogleCloudDatalabelingV1beta1ObjectDetectionConfig,
      ),
      segmentationConfig: Schema.optional(
        GoogleCloudDatalabelingV1beta1SegmentationConfig,
      ),
      boundingPolyConfig: Schema.optional(
        GoogleCloudDatalabelingV1beta1BoundingPolyConfig,
      ),
      imageClassificationConfig: Schema.optional(
        GoogleCloudDatalabelingV1beta1ImageClassificationConfig,
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDatalabelingV1beta1AnnotatedDatasetMetadata",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1beta1AnnotatedDatasetMetadata>;

export interface GoogleCloudDatalabelingV1beta1FeedbackThreadMetadata {
  /** When the thread is last updated. */
  lastUpdateTime?: string;
  /** When the thread is created */
  createTime?: string;
  status?:
    | "FEEDBACK_THREAD_STATUS_UNSPECIFIED"
    | "NEW"
    | "REPLIED"
    | (string & {});
  /** An image thumbnail of this thread. */
  thumbnail?: string;
}

export const GoogleCloudDatalabelingV1beta1FeedbackThreadMetadata: Schema.Schema<GoogleCloudDatalabelingV1beta1FeedbackThreadMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      lastUpdateTime: Schema.optional(Schema.String),
      createTime: Schema.optional(Schema.String),
      status: Schema.optional(Schema.String),
      thumbnail: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDatalabelingV1beta1FeedbackThreadMetadata",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1beta1FeedbackThreadMetadata>;

export interface GoogleCloudDatalabelingV1beta1FeedbackThread {
  /** Metadata regarding the feedback thread. */
  feedbackThreadMetadata?: GoogleCloudDatalabelingV1beta1FeedbackThreadMetadata;
  /** Name of the feedback thread. Format: 'project/{project_id}/datasets/{dataset_id}/annotatedDatasets/{annotated_dataset_id}/feedbackThreads/{feedback_thread_id}' */
  name?: string;
}

export const GoogleCloudDatalabelingV1beta1FeedbackThread: Schema.Schema<GoogleCloudDatalabelingV1beta1FeedbackThread> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      feedbackThreadMetadata: Schema.optional(
        GoogleCloudDatalabelingV1beta1FeedbackThreadMetadata,
      ),
      name: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDatalabelingV1beta1FeedbackThread",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1beta1FeedbackThread>;

export interface GoogleCloudDatalabelingV1beta1ListFeedbackThreadsResponse {
  /** The list of feedback threads to return. */
  feedbackThreads?: Array<GoogleCloudDatalabelingV1beta1FeedbackThread>;
  /** A token to retrieve next page of results. */
  nextPageToken?: string;
}

export const GoogleCloudDatalabelingV1beta1ListFeedbackThreadsResponse: Schema.Schema<GoogleCloudDatalabelingV1beta1ListFeedbackThreadsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      feedbackThreads: Schema.optional(
        Schema.Array(GoogleCloudDatalabelingV1beta1FeedbackThread),
      ),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDatalabelingV1beta1ListFeedbackThreadsResponse",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1beta1ListFeedbackThreadsResponse>;

export interface GoogleCloudDatalabelingV1beta1RequesterFeedbackMetadata {}

export const GoogleCloudDatalabelingV1beta1RequesterFeedbackMetadata: Schema.Schema<GoogleCloudDatalabelingV1beta1RequesterFeedbackMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "GoogleCloudDatalabelingV1beta1RequesterFeedbackMetadata",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1beta1RequesterFeedbackMetadata>;

export interface GoogleLongrunningOperation {
  /** The server-assigned name, which is only unique within the same service that originally returns it. If you use the default HTTP mapping, the `name` should be a resource name ending with `operations/{unique_id}`. */
  name?: string;
  /** The normal, successful response of the operation. If the original method returns no data on success, such as `Delete`, the response is `google.protobuf.Empty`. If the original method is standard `Get`/`Create`/`Update`, the response should be the resource. For other methods, the response should have the type `XxxResponse`, where `Xxx` is the original method name. For example, if the original method name is `TakeSnapshot()`, the inferred response type is `TakeSnapshotResponse`. */
  response?: Record<string, unknown>;
  /** The error result of the operation in case of failure or cancellation. */
  error?: GoogleRpcStatus;
  /** Service-specific metadata associated with the operation. It typically contains progress information and common metadata such as create time. Some services might not provide such metadata. Any method that returns a long-running operation should document the metadata type, if any. */
  metadata?: Record<string, unknown>;
  /** If the value is `false`, it means the operation is still in progress. If `true`, the operation is completed, and either `error` or `response` is available. */
  done?: boolean;
}

export const GoogleLongrunningOperation: Schema.Schema<GoogleLongrunningOperation> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      response: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
      error: Schema.optional(GoogleRpcStatus),
      metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
      done: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "GoogleLongrunningOperation",
  }) as any as Schema.Schema<GoogleLongrunningOperation>;

export interface GoogleCloudDatalabelingV1p1alpha1HumanAnnotationConfig {
  /** Optional. A human-readable label used to logically group labeling tasks. This string must match the regular expression `[a-zA-Z\\d_-]{0,128}`. */
  labelGroup?: string;
  /** Optional. A human-readable description for AnnotatedDataset. The description can be up to 10000 characters long. */
  annotatedDatasetDescription?: string;
  /** Optional. Replication of questions. Each question will be sent to up to this number of contributors to label. Aggregated answers will be returned. Default is set to 1. For image related labeling, valid values are 1, 3, 5. */
  replicaCount?: number;
  /** Required. Instruction resource name. */
  instruction?: string;
  /** Optional. Maximum duration for contributors to answer a question. Maximum is 3600 seconds. Default is 3600 seconds. */
  questionDuration?: string;
  /** Email of the user who started the labeling task and should be notified by email. If empty no notification will be sent. */
  userEmailAddress?: string;
  /** Optional. The Language of this question, as a [BCP-47](https://www.rfc-editor.org/rfc/bcp/bcp47.txt). Default value is en-US. Only need to set this when task is language related. For example, French text classification. */
  languageCode?: string;
  /** Required. A human-readable name for AnnotatedDataset defined by users. Maximum of 64 characters . */
  annotatedDatasetDisplayName?: string;
  /** Optional. If you want your own labeling contributors to manage and work on this labeling request, you can set these contributors here. We will give them access to the question types in crowdcompute. Note that these emails must be registered in crowdcompute worker UI: https://crowd-compute.appspot.com/ */
  contributorEmails?: Array<string>;
}

export const GoogleCloudDatalabelingV1p1alpha1HumanAnnotationConfig: Schema.Schema<GoogleCloudDatalabelingV1p1alpha1HumanAnnotationConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      labelGroup: Schema.optional(Schema.String),
      annotatedDatasetDescription: Schema.optional(Schema.String),
      replicaCount: Schema.optional(Schema.Number),
      instruction: Schema.optional(Schema.String),
      questionDuration: Schema.optional(Schema.String),
      userEmailAddress: Schema.optional(Schema.String),
      languageCode: Schema.optional(Schema.String),
      annotatedDatasetDisplayName: Schema.optional(Schema.String),
      contributorEmails: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "GoogleCloudDatalabelingV1p1alpha1HumanAnnotationConfig",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1p1alpha1HumanAnnotationConfig>;

export interface GoogleCloudDatalabelingV1p1alpha1LabelImageSegmentationOperationMetadata {
  /** Basic human annotation config. */
  basicConfig?: GoogleCloudDatalabelingV1p1alpha1HumanAnnotationConfig;
}

export const GoogleCloudDatalabelingV1p1alpha1LabelImageSegmentationOperationMetadata: Schema.Schema<GoogleCloudDatalabelingV1p1alpha1LabelImageSegmentationOperationMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      basicConfig: Schema.optional(
        GoogleCloudDatalabelingV1p1alpha1HumanAnnotationConfig,
      ),
    }),
  ).annotate({
    identifier:
      "GoogleCloudDatalabelingV1p1alpha1LabelImageSegmentationOperationMetadata",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1p1alpha1LabelImageSegmentationOperationMetadata>;

export interface GoogleCloudDatalabelingV1beta1LabelImageOrientedBoundingBoxOperationMetadata {
  /** Basic human annotation config. */
  basicConfig?: GoogleCloudDatalabelingV1beta1HumanAnnotationConfig;
}

export const GoogleCloudDatalabelingV1beta1LabelImageOrientedBoundingBoxOperationMetadata: Schema.Schema<GoogleCloudDatalabelingV1beta1LabelImageOrientedBoundingBoxOperationMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      basicConfig: Schema.optional(
        GoogleCloudDatalabelingV1beta1HumanAnnotationConfig,
      ),
    }),
  ).annotate({
    identifier:
      "GoogleCloudDatalabelingV1beta1LabelImageOrientedBoundingBoxOperationMetadata",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1beta1LabelImageOrientedBoundingBoxOperationMetadata>;

export interface GoogleCloudDatalabelingV1p2alpha1LabelImageBoundingPolyOperationMetadata {
  /** Basic human annotation config used in labeling request. */
  basicConfig?: GoogleCloudDatalabelingV1p2alpha1HumanAnnotationConfig;
}

export const GoogleCloudDatalabelingV1p2alpha1LabelImageBoundingPolyOperationMetadata: Schema.Schema<GoogleCloudDatalabelingV1p2alpha1LabelImageBoundingPolyOperationMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      basicConfig: Schema.optional(
        GoogleCloudDatalabelingV1p2alpha1HumanAnnotationConfig,
      ),
    }),
  ).annotate({
    identifier:
      "GoogleCloudDatalabelingV1p2alpha1LabelImageBoundingPolyOperationMetadata",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1p2alpha1LabelImageBoundingPolyOperationMetadata>;

export interface GoogleCloudDatalabelingV1p2alpha1LabelVideoObjectDetectionOperationMetadata {
  /** Basic human annotation config used in labeling request. */
  basicConfig?: GoogleCloudDatalabelingV1p2alpha1HumanAnnotationConfig;
}

export const GoogleCloudDatalabelingV1p2alpha1LabelVideoObjectDetectionOperationMetadata: Schema.Schema<GoogleCloudDatalabelingV1p2alpha1LabelVideoObjectDetectionOperationMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      basicConfig: Schema.optional(
        GoogleCloudDatalabelingV1p2alpha1HumanAnnotationConfig,
      ),
    }),
  ).annotate({
    identifier:
      "GoogleCloudDatalabelingV1p2alpha1LabelVideoObjectDetectionOperationMetadata",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1p2alpha1LabelVideoObjectDetectionOperationMetadata>;

export interface GoogleCloudDatalabelingV1p2alpha1GcsFolderDestination {
  /** Required. Cloud Storage directory to export data to. */
  outputFolderUri?: string;
}

export const GoogleCloudDatalabelingV1p2alpha1GcsFolderDestination: Schema.Schema<GoogleCloudDatalabelingV1p2alpha1GcsFolderDestination> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      outputFolderUri: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDatalabelingV1p2alpha1GcsFolderDestination",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1p2alpha1GcsFolderDestination>;

export interface GoogleCloudDatalabelingV1beta1Vertex {
  /** Y coordinate. */
  y?: number;
  /** X coordinate. */
  x?: number;
}

export const GoogleCloudDatalabelingV1beta1Vertex: Schema.Schema<GoogleCloudDatalabelingV1beta1Vertex> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      y: Schema.optional(Schema.Number),
      x: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "GoogleCloudDatalabelingV1beta1Vertex",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1beta1Vertex>;

export interface GoogleCloudDatalabelingV1beta1Polyline {
  /** The polyline vertices. */
  vertices?: Array<GoogleCloudDatalabelingV1beta1Vertex>;
}

export const GoogleCloudDatalabelingV1beta1Polyline: Schema.Schema<GoogleCloudDatalabelingV1beta1Polyline> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      vertices: Schema.optional(
        Schema.Array(GoogleCloudDatalabelingV1beta1Vertex),
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDatalabelingV1beta1Polyline",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1beta1Polyline>;

export interface GoogleCloudDatalabelingV1p2alpha1GcsDestination {
  /** Required. The output uri of destination file. */
  outputUri?: string;
  /** Required. The format of the gcs destination. Only "text/csv" and "application/json" are supported. */
  mimeType?: string;
}

export const GoogleCloudDatalabelingV1p2alpha1GcsDestination: Schema.Schema<GoogleCloudDatalabelingV1p2alpha1GcsDestination> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      outputUri: Schema.optional(Schema.String),
      mimeType: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDatalabelingV1p2alpha1GcsDestination",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1p2alpha1GcsDestination>;

export interface GoogleCloudDatalabelingV1p2alpha1OutputConfig {
  /** Output to a file in Cloud Storage. Should be used for labeling output other than image segmentation. */
  gcsDestination?: GoogleCloudDatalabelingV1p2alpha1GcsDestination;
  /** Output to a folder in Cloud Storage. Should be used for image segmentation or document de-identification labeling outputs. */
  gcsFolderDestination?: GoogleCloudDatalabelingV1p2alpha1GcsFolderDestination;
}

export const GoogleCloudDatalabelingV1p2alpha1OutputConfig: Schema.Schema<GoogleCloudDatalabelingV1p2alpha1OutputConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      gcsDestination: Schema.optional(
        GoogleCloudDatalabelingV1p2alpha1GcsDestination,
      ),
      gcsFolderDestination: Schema.optional(
        GoogleCloudDatalabelingV1p2alpha1GcsFolderDestination,
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDatalabelingV1p2alpha1OutputConfig",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1p2alpha1OutputConfig>;

export interface GoogleCloudDatalabelingV1p2alpha1LabelVideoClassificationOperationMetadata {
  /** Basic human annotation config used in labeling request. */
  basicConfig?: GoogleCloudDatalabelingV1p2alpha1HumanAnnotationConfig;
}

export const GoogleCloudDatalabelingV1p2alpha1LabelVideoClassificationOperationMetadata: Schema.Schema<GoogleCloudDatalabelingV1p2alpha1LabelVideoClassificationOperationMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      basicConfig: Schema.optional(
        GoogleCloudDatalabelingV1p2alpha1HumanAnnotationConfig,
      ),
    }),
  ).annotate({
    identifier:
      "GoogleCloudDatalabelingV1p2alpha1LabelVideoClassificationOperationMetadata",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1p2alpha1LabelVideoClassificationOperationMetadata>;

export interface GoogleCloudDatalabelingV1p1alpha1ImportDataOperationResponse {
  /** Output only. Number of examples imported successfully. */
  importCount?: number;
  /** Output only. Total number of examples requested to import */
  totalCount?: number;
  /** Ouptut only. The name of imported dataset. */
  dataset?: string;
}

export const GoogleCloudDatalabelingV1p1alpha1ImportDataOperationResponse: Schema.Schema<GoogleCloudDatalabelingV1p1alpha1ImportDataOperationResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      importCount: Schema.optional(Schema.Number),
      totalCount: Schema.optional(Schema.Number),
      dataset: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDatalabelingV1p1alpha1ImportDataOperationResponse",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1p1alpha1ImportDataOperationResponse>;

export interface GoogleCloudDatalabelingV1p1alpha1GcsFolderDestination {
  /** Required. Cloud Storage directory to export data to. */
  outputFolderUri?: string;
}

export const GoogleCloudDatalabelingV1p1alpha1GcsFolderDestination: Schema.Schema<GoogleCloudDatalabelingV1p1alpha1GcsFolderDestination> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      outputFolderUri: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDatalabelingV1p1alpha1GcsFolderDestination",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1p1alpha1GcsFolderDestination>;

export interface GoogleCloudDatalabelingV1p1alpha1GcsDestination {
  /** Required. The output uri of destination file. */
  outputUri?: string;
  /** Required. The format of the gcs destination. Only "text/csv" and "application/json" are supported. */
  mimeType?: string;
}

export const GoogleCloudDatalabelingV1p1alpha1GcsDestination: Schema.Schema<GoogleCloudDatalabelingV1p1alpha1GcsDestination> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      outputUri: Schema.optional(Schema.String),
      mimeType: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDatalabelingV1p1alpha1GcsDestination",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1p1alpha1GcsDestination>;

export interface GoogleCloudDatalabelingV1p1alpha1OutputConfig {
  /** Output to a folder in Cloud Storage. Should be used for image segmentation or document de-identification labeling outputs. */
  gcsFolderDestination?: GoogleCloudDatalabelingV1p1alpha1GcsFolderDestination;
  /** Output to a file in Cloud Storage. Should be used for labeling output other than image segmentation. */
  gcsDestination?: GoogleCloudDatalabelingV1p1alpha1GcsDestination;
}

export const GoogleCloudDatalabelingV1p1alpha1OutputConfig: Schema.Schema<GoogleCloudDatalabelingV1p1alpha1OutputConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      gcsFolderDestination: Schema.optional(
        GoogleCloudDatalabelingV1p1alpha1GcsFolderDestination,
      ),
      gcsDestination: Schema.optional(
        GoogleCloudDatalabelingV1p1alpha1GcsDestination,
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDatalabelingV1p1alpha1OutputConfig",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1p1alpha1OutputConfig>;

export interface GoogleCloudDatalabelingV1p1alpha1LabelStats {
  /** Map of each annotation spec's example count. Key is the annotation spec name and value is the number of examples for that annotation spec. If the annotated dataset does not have annotation spec, the map will return a pair where the key is empty string and value is the total number of annotations. */
  exampleCount?: Record<string, string>;
}

export const GoogleCloudDatalabelingV1p1alpha1LabelStats: Schema.Schema<GoogleCloudDatalabelingV1p1alpha1LabelStats> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      exampleCount: Schema.optional(
        Schema.Record(Schema.String, Schema.String),
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDatalabelingV1p1alpha1LabelStats",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1p1alpha1LabelStats>;

export interface GoogleCloudDatalabelingV1p1alpha1ExportDataOperationResponse {
  /** Output only. output_config in the ExportData request. */
  outputConfig?: GoogleCloudDatalabelingV1p1alpha1OutputConfig;
  /** Output only. Number of examples exported successfully. */
  exportCount?: number;
  /** Output only. Total number of examples requested to export */
  totalCount?: number;
  /** Output only. The name of annotated dataset in format "projects/* /datasets/* /annotatedDatasets/*". */
  annotatedDataset?: string;
  /** Ouptut only. The name of dataset. "projects/* /datasets/*" */
  dataset?: string;
  /** Output only. Statistic infos of labels in the exported dataset. */
  labelStats?: GoogleCloudDatalabelingV1p1alpha1LabelStats;
}

export const GoogleCloudDatalabelingV1p1alpha1ExportDataOperationResponse: Schema.Schema<GoogleCloudDatalabelingV1p1alpha1ExportDataOperationResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      outputConfig: Schema.optional(
        GoogleCloudDatalabelingV1p1alpha1OutputConfig,
      ),
      exportCount: Schema.optional(Schema.Number),
      totalCount: Schema.optional(Schema.Number),
      annotatedDataset: Schema.optional(Schema.String),
      dataset: Schema.optional(Schema.String),
      labelStats: Schema.optional(GoogleCloudDatalabelingV1p1alpha1LabelStats),
    }),
  ).annotate({
    identifier: "GoogleCloudDatalabelingV1p1alpha1ExportDataOperationResponse",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1p1alpha1ExportDataOperationResponse>;

export interface GoogleCloudDatalabelingV1beta1SearchExampleComparisonsRequest {
  /** Optional. A token identifying a page of results for the server to return. Typically obtained by the nextPageToken of the response to a previous search rquest. If you don't specify this field, the API call requests the first page of the search. */
  pageToken?: string;
  /** Optional. Requested page size. Server may return fewer results than requested. Default value is 100. */
  pageSize?: number;
}

export const GoogleCloudDatalabelingV1beta1SearchExampleComparisonsRequest: Schema.Schema<GoogleCloudDatalabelingV1beta1SearchExampleComparisonsRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      pageToken: Schema.optional(Schema.String),
      pageSize: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "GoogleCloudDatalabelingV1beta1SearchExampleComparisonsRequest",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1beta1SearchExampleComparisonsRequest>;

export interface GoogleCloudDatalabelingV1beta1ImportDataOperationMetadata {
  /** Output only. The name of imported dataset. "projects/* /datasets/*" */
  dataset?: string;
  /** Output only. Timestamp when import dataset request was created. */
  createTime?: string;
  /** Output only. Partial failures encountered. E.g. single files that couldn't be read. Status details field will contain standard GCP error details. */
  partialFailures?: Array<GoogleRpcStatus>;
}

export const GoogleCloudDatalabelingV1beta1ImportDataOperationMetadata: Schema.Schema<GoogleCloudDatalabelingV1beta1ImportDataOperationMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      dataset: Schema.optional(Schema.String),
      createTime: Schema.optional(Schema.String),
      partialFailures: Schema.optional(Schema.Array(GoogleRpcStatus)),
    }),
  ).annotate({
    identifier: "GoogleCloudDatalabelingV1beta1ImportDataOperationMetadata",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1beta1ImportDataOperationMetadata>;

export interface GoogleCloudDatalabelingV1beta1LabelImageSegmentationOperationMetadata {
  /** Basic human annotation config. */
  basicConfig?: GoogleCloudDatalabelingV1beta1HumanAnnotationConfig;
}

export const GoogleCloudDatalabelingV1beta1LabelImageSegmentationOperationMetadata: Schema.Schema<GoogleCloudDatalabelingV1beta1LabelImageSegmentationOperationMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      basicConfig: Schema.optional(
        GoogleCloudDatalabelingV1beta1HumanAnnotationConfig,
      ),
    }),
  ).annotate({
    identifier:
      "GoogleCloudDatalabelingV1beta1LabelImageSegmentationOperationMetadata",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1beta1LabelImageSegmentationOperationMetadata>;

export interface GoogleCloudDatalabelingV1p2alpha1CreateInstructionMetadata {
  /** Timestamp when create instruction request was created. */
  createTime?: string;
  /** Partial failures encountered. E.g. single files that couldn't be read. Status details field will contain standard GCP error details. */
  partialFailures?: Array<GoogleRpcStatus>;
  /** The name of the created Instruction. projects/{project_id}/instructions/{instruction_id} */
  instruction?: string;
}

export const GoogleCloudDatalabelingV1p2alpha1CreateInstructionMetadata: Schema.Schema<GoogleCloudDatalabelingV1p2alpha1CreateInstructionMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      createTime: Schema.optional(Schema.String),
      partialFailures: Schema.optional(Schema.Array(GoogleRpcStatus)),
      instruction: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDatalabelingV1p2alpha1CreateInstructionMetadata",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1p2alpha1CreateInstructionMetadata>;

export interface GoogleCloudDatalabelingV1beta1TimeSegment {
  /** Start of the time segment (inclusive), represented as the duration since the example start. */
  startTimeOffset?: string;
  /** End of the time segment (exclusive), represented as the duration since the example start. */
  endTimeOffset?: string;
}

export const GoogleCloudDatalabelingV1beta1TimeSegment: Schema.Schema<GoogleCloudDatalabelingV1beta1TimeSegment> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      startTimeOffset: Schema.optional(Schema.String),
      endTimeOffset: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDatalabelingV1beta1TimeSegment",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1beta1TimeSegment>;

export interface GoogleCloudDatalabelingV1beta1NormalizedVertex {
  /** X coordinate. */
  x?: number;
  /** Y coordinate. */
  y?: number;
}

export const GoogleCloudDatalabelingV1beta1NormalizedVertex: Schema.Schema<GoogleCloudDatalabelingV1beta1NormalizedVertex> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      x: Schema.optional(Schema.Number),
      y: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "GoogleCloudDatalabelingV1beta1NormalizedVertex",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1beta1NormalizedVertex>;

export interface GoogleCloudDatalabelingV1beta1NormalizedBoundingPoly {
  /** The bounding polygon normalized vertices. */
  normalizedVertices?: Array<GoogleCloudDatalabelingV1beta1NormalizedVertex>;
}

export const GoogleCloudDatalabelingV1beta1NormalizedBoundingPoly: Schema.Schema<GoogleCloudDatalabelingV1beta1NormalizedBoundingPoly> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      normalizedVertices: Schema.optional(
        Schema.Array(GoogleCloudDatalabelingV1beta1NormalizedVertex),
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDatalabelingV1beta1NormalizedBoundingPoly",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1beta1NormalizedBoundingPoly>;

export interface GoogleCloudDatalabelingV1beta1BoundingPoly {
  /** The bounding polygon vertices. */
  vertices?: Array<GoogleCloudDatalabelingV1beta1Vertex>;
}

export const GoogleCloudDatalabelingV1beta1BoundingPoly: Schema.Schema<GoogleCloudDatalabelingV1beta1BoundingPoly> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      vertices: Schema.optional(
        Schema.Array(GoogleCloudDatalabelingV1beta1Vertex),
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDatalabelingV1beta1BoundingPoly",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1beta1BoundingPoly>;

export interface GoogleCloudDatalabelingV1beta1ObjectTrackingFrame {
  normalizedBoundingPoly?: GoogleCloudDatalabelingV1beta1NormalizedBoundingPoly;
  /** The time offset of this frame relative to the beginning of the video. */
  timeOffset?: string;
  boundingPoly?: GoogleCloudDatalabelingV1beta1BoundingPoly;
}

export const GoogleCloudDatalabelingV1beta1ObjectTrackingFrame: Schema.Schema<GoogleCloudDatalabelingV1beta1ObjectTrackingFrame> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      normalizedBoundingPoly: Schema.optional(
        GoogleCloudDatalabelingV1beta1NormalizedBoundingPoly,
      ),
      timeOffset: Schema.optional(Schema.String),
      boundingPoly: Schema.optional(GoogleCloudDatalabelingV1beta1BoundingPoly),
    }),
  ).annotate({
    identifier: "GoogleCloudDatalabelingV1beta1ObjectTrackingFrame",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1beta1ObjectTrackingFrame>;

export interface GoogleCloudDatalabelingV1beta1ConfidenceMetricsEntry {
  /** Precision value for entries with label that has highest score. */
  precisionAt1?: number;
  /** Recall value for entries with label that has highest 5 scores. */
  recallAt5?: number;
  /** Recall value for entries with label that has highest score. */
  recallAt1?: number;
  /** Precision value for entries with label that has highest 5 scores. */
  precisionAt5?: number;
  /** Precision value. */
  precision?: number;
  /** The harmonic mean of recall_at1 and precision_at1. */
  f1ScoreAt1?: number;
  /** Recall value. */
  recall?: number;
  /** The harmonic mean of recall_at5 and precision_at5. */
  f1ScoreAt5?: number;
  /** Harmonic mean of recall and precision. */
  f1Score?: number;
  /** Threshold used for this entry. For classification tasks, this is a classification threshold: a predicted label is categorized as positive or negative (in the context of this point on the PR curve) based on whether the label's score meets this threshold. For image object detection (bounding box) tasks, this is the [intersection-over-union (IOU)](/vision/automl/object-detection/docs/evaluate#intersection-over-union) threshold for the context of this point on the PR curve. */
  confidenceThreshold?: number;
}

export const GoogleCloudDatalabelingV1beta1ConfidenceMetricsEntry: Schema.Schema<GoogleCloudDatalabelingV1beta1ConfidenceMetricsEntry> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      precisionAt1: Schema.optional(Schema.Number),
      recallAt5: Schema.optional(Schema.Number),
      recallAt1: Schema.optional(Schema.Number),
      precisionAt5: Schema.optional(Schema.Number),
      precision: Schema.optional(Schema.Number),
      f1ScoreAt1: Schema.optional(Schema.Number),
      recall: Schema.optional(Schema.Number),
      f1ScoreAt5: Schema.optional(Schema.Number),
      f1Score: Schema.optional(Schema.Number),
      confidenceThreshold: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "GoogleCloudDatalabelingV1beta1ConfidenceMetricsEntry",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1beta1ConfidenceMetricsEntry>;

export interface GoogleCloudDatalabelingV1beta1PrCurve {
  /** Area under the precision-recall curve. Not to be confused with area under a receiver operating characteristic (ROC) curve. */
  areaUnderCurve?: number;
  /** Entries that make up the precision-recall graph. Each entry is a "point" on the graph drawn for a different `confidence_threshold`. */
  confidenceMetricsEntries?: Array<GoogleCloudDatalabelingV1beta1ConfidenceMetricsEntry>;
  /** The annotation spec of the label for which the precision-recall curve calculated. If this field is empty, that means the precision-recall curve is an aggregate curve for all labels. */
  annotationSpec?: GoogleCloudDatalabelingV1beta1AnnotationSpec;
  /** Mean average prcision of this curve. */
  meanAveragePrecision?: number;
}

export const GoogleCloudDatalabelingV1beta1PrCurve: Schema.Schema<GoogleCloudDatalabelingV1beta1PrCurve> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      areaUnderCurve: Schema.optional(Schema.Number),
      confidenceMetricsEntries: Schema.optional(
        Schema.Array(GoogleCloudDatalabelingV1beta1ConfidenceMetricsEntry),
      ),
      annotationSpec: Schema.optional(
        GoogleCloudDatalabelingV1beta1AnnotationSpec,
      ),
      meanAveragePrecision: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "GoogleCloudDatalabelingV1beta1PrCurve",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1beta1PrCurve>;

export interface GoogleCloudDatalabelingV1beta1ObjectDetectionMetrics {
  /** Precision-recall curve. */
  prCurve?: GoogleCloudDatalabelingV1beta1PrCurve;
}

export const GoogleCloudDatalabelingV1beta1ObjectDetectionMetrics: Schema.Schema<GoogleCloudDatalabelingV1beta1ObjectDetectionMetrics> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      prCurve: Schema.optional(GoogleCloudDatalabelingV1beta1PrCurve),
    }),
  ).annotate({
    identifier: "GoogleCloudDatalabelingV1beta1ObjectDetectionMetrics",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1beta1ObjectDetectionMetrics>;

export interface GoogleCloudDatalabelingV1beta1VideoEventAnnotation {
  /** The time segment of the video to which the annotation applies. */
  timeSegment?: GoogleCloudDatalabelingV1beta1TimeSegment;
  /** Label of the event in this annotation. */
  annotationSpec?: GoogleCloudDatalabelingV1beta1AnnotationSpec;
}

export const GoogleCloudDatalabelingV1beta1VideoEventAnnotation: Schema.Schema<GoogleCloudDatalabelingV1beta1VideoEventAnnotation> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      timeSegment: Schema.optional(GoogleCloudDatalabelingV1beta1TimeSegment),
      annotationSpec: Schema.optional(
        GoogleCloudDatalabelingV1beta1AnnotationSpec,
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDatalabelingV1beta1VideoEventAnnotation",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1beta1VideoEventAnnotation>;

export interface GoogleCloudDatalabelingV1beta1LabelImageClassificationOperationMetadata {
  /** Basic human annotation config used in labeling request. */
  basicConfig?: GoogleCloudDatalabelingV1beta1HumanAnnotationConfig;
}

export const GoogleCloudDatalabelingV1beta1LabelImageClassificationOperationMetadata: Schema.Schema<GoogleCloudDatalabelingV1beta1LabelImageClassificationOperationMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      basicConfig: Schema.optional(
        GoogleCloudDatalabelingV1beta1HumanAnnotationConfig,
      ),
    }),
  ).annotate({
    identifier:
      "GoogleCloudDatalabelingV1beta1LabelImageClassificationOperationMetadata",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1beta1LabelImageClassificationOperationMetadata>;

export interface GoogleCloudDatalabelingV1beta1ImageSegmentationAnnotation {
  /** The mapping between rgb color and annotation spec. The key is the rgb color represented in format of rgb(0, 0, 0). The value is the AnnotationSpec. */
  annotationColors?: Record<
    string,
    GoogleCloudDatalabelingV1beta1AnnotationSpec
  >;
  /** Image format. */
  mimeType?: string;
  /** A byte string of a full image's color map. */
  imageBytes?: string;
}

export const GoogleCloudDatalabelingV1beta1ImageSegmentationAnnotation: Schema.Schema<GoogleCloudDatalabelingV1beta1ImageSegmentationAnnotation> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      annotationColors: Schema.optional(
        Schema.Record(
          Schema.String,
          GoogleCloudDatalabelingV1beta1AnnotationSpec,
        ),
      ),
      mimeType: Schema.optional(Schema.String),
      imageBytes: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDatalabelingV1beta1ImageSegmentationAnnotation",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1beta1ImageSegmentationAnnotation>;

export interface GoogleCloudDatalabelingV1beta1TextEntityExtractionAnnotation {
  /** Position of the entity. */
  sequentialSegment?: GoogleCloudDatalabelingV1beta1SequentialSegment;
  /** Label of the text entities. */
  annotationSpec?: GoogleCloudDatalabelingV1beta1AnnotationSpec;
}

export const GoogleCloudDatalabelingV1beta1TextEntityExtractionAnnotation: Schema.Schema<GoogleCloudDatalabelingV1beta1TextEntityExtractionAnnotation> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      sequentialSegment: Schema.optional(
        GoogleCloudDatalabelingV1beta1SequentialSegment,
      ),
      annotationSpec: Schema.optional(
        GoogleCloudDatalabelingV1beta1AnnotationSpec,
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDatalabelingV1beta1TextEntityExtractionAnnotation",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1beta1TextEntityExtractionAnnotation>;

export interface GoogleCloudDatalabelingV1beta1NormalizedPolyline {
  /** The normalized polyline vertices. */
  normalizedVertices?: Array<GoogleCloudDatalabelingV1beta1NormalizedVertex>;
}

export const GoogleCloudDatalabelingV1beta1NormalizedPolyline: Schema.Schema<GoogleCloudDatalabelingV1beta1NormalizedPolyline> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      normalizedVertices: Schema.optional(
        Schema.Array(GoogleCloudDatalabelingV1beta1NormalizedVertex),
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDatalabelingV1beta1NormalizedPolyline",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1beta1NormalizedPolyline>;

export interface GoogleCloudDatalabelingV1beta1ImagePolylineAnnotation {
  normalizedPolyline?: GoogleCloudDatalabelingV1beta1NormalizedPolyline;
  polyline?: GoogleCloudDatalabelingV1beta1Polyline;
  /** Label of this polyline. */
  annotationSpec?: GoogleCloudDatalabelingV1beta1AnnotationSpec;
}

export const GoogleCloudDatalabelingV1beta1ImagePolylineAnnotation: Schema.Schema<GoogleCloudDatalabelingV1beta1ImagePolylineAnnotation> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      normalizedPolyline: Schema.optional(
        GoogleCloudDatalabelingV1beta1NormalizedPolyline,
      ),
      polyline: Schema.optional(GoogleCloudDatalabelingV1beta1Polyline),
      annotationSpec: Schema.optional(
        GoogleCloudDatalabelingV1beta1AnnotationSpec,
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDatalabelingV1beta1ImagePolylineAnnotation",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1beta1ImagePolylineAnnotation>;

export interface GoogleCloudDatalabelingV1beta1ImageClassificationAnnotation {
  /** Label of image. */
  annotationSpec?: GoogleCloudDatalabelingV1beta1AnnotationSpec;
}

export const GoogleCloudDatalabelingV1beta1ImageClassificationAnnotation: Schema.Schema<GoogleCloudDatalabelingV1beta1ImageClassificationAnnotation> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      annotationSpec: Schema.optional(
        GoogleCloudDatalabelingV1beta1AnnotationSpec,
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDatalabelingV1beta1ImageClassificationAnnotation",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1beta1ImageClassificationAnnotation>;

export interface GoogleCloudDatalabelingV1beta1TextClassificationAnnotation {
  /** Label of the text. */
  annotationSpec?: GoogleCloudDatalabelingV1beta1AnnotationSpec;
}

export const GoogleCloudDatalabelingV1beta1TextClassificationAnnotation: Schema.Schema<GoogleCloudDatalabelingV1beta1TextClassificationAnnotation> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      annotationSpec: Schema.optional(
        GoogleCloudDatalabelingV1beta1AnnotationSpec,
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDatalabelingV1beta1TextClassificationAnnotation",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1beta1TextClassificationAnnotation>;

export interface GoogleCloudDatalabelingV1beta1ImageBoundingPolyAnnotation {
  /** Label of object in this bounding polygon. */
  annotationSpec?: GoogleCloudDatalabelingV1beta1AnnotationSpec;
  boundingPoly?: GoogleCloudDatalabelingV1beta1BoundingPoly;
  normalizedBoundingPoly?: GoogleCloudDatalabelingV1beta1NormalizedBoundingPoly;
}

export const GoogleCloudDatalabelingV1beta1ImageBoundingPolyAnnotation: Schema.Schema<GoogleCloudDatalabelingV1beta1ImageBoundingPolyAnnotation> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      annotationSpec: Schema.optional(
        GoogleCloudDatalabelingV1beta1AnnotationSpec,
      ),
      boundingPoly: Schema.optional(GoogleCloudDatalabelingV1beta1BoundingPoly),
      normalizedBoundingPoly: Schema.optional(
        GoogleCloudDatalabelingV1beta1NormalizedBoundingPoly,
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDatalabelingV1beta1ImageBoundingPolyAnnotation",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1beta1ImageBoundingPolyAnnotation>;

export interface GoogleCloudDatalabelingV1beta1VideoClassificationAnnotation {
  /** The time segment of the video to which the annotation applies. */
  timeSegment?: GoogleCloudDatalabelingV1beta1TimeSegment;
  /** Label of the segment specified by time_segment. */
  annotationSpec?: GoogleCloudDatalabelingV1beta1AnnotationSpec;
}

export const GoogleCloudDatalabelingV1beta1VideoClassificationAnnotation: Schema.Schema<GoogleCloudDatalabelingV1beta1VideoClassificationAnnotation> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      timeSegment: Schema.optional(GoogleCloudDatalabelingV1beta1TimeSegment),
      annotationSpec: Schema.optional(
        GoogleCloudDatalabelingV1beta1AnnotationSpec,
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDatalabelingV1beta1VideoClassificationAnnotation",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1beta1VideoClassificationAnnotation>;

export interface GoogleCloudDatalabelingV1beta1VideoObjectTrackingAnnotation {
  /** The list of frames where this object track appears. */
  objectTrackingFrames?: Array<GoogleCloudDatalabelingV1beta1ObjectTrackingFrame>;
  /** The time segment of the video to which object tracking applies. */
  timeSegment?: GoogleCloudDatalabelingV1beta1TimeSegment;
  /** Label of the object tracked in this annotation. */
  annotationSpec?: GoogleCloudDatalabelingV1beta1AnnotationSpec;
}

export const GoogleCloudDatalabelingV1beta1VideoObjectTrackingAnnotation: Schema.Schema<GoogleCloudDatalabelingV1beta1VideoObjectTrackingAnnotation> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      objectTrackingFrames: Schema.optional(
        Schema.Array(GoogleCloudDatalabelingV1beta1ObjectTrackingFrame),
      ),
      timeSegment: Schema.optional(GoogleCloudDatalabelingV1beta1TimeSegment),
      annotationSpec: Schema.optional(
        GoogleCloudDatalabelingV1beta1AnnotationSpec,
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDatalabelingV1beta1VideoObjectTrackingAnnotation",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1beta1VideoObjectTrackingAnnotation>;

export interface GoogleCloudDatalabelingV1beta1AnnotationValue {
  /** Annotation value for video event case. */
  videoEventAnnotation?: GoogleCloudDatalabelingV1beta1VideoEventAnnotation;
  /** Annotation value for image segmentation. */
  imageSegmentationAnnotation?: GoogleCloudDatalabelingV1beta1ImageSegmentationAnnotation;
  /** Annotation value for text entity extraction case. */
  textEntityExtractionAnnotation?: GoogleCloudDatalabelingV1beta1TextEntityExtractionAnnotation;
  /** Annotation value for image polyline cases. Polyline here is different from BoundingPoly. It is formed by line segments connected to each other but not closed form(Bounding Poly). The line segments can cross each other. */
  imagePolylineAnnotation?: GoogleCloudDatalabelingV1beta1ImagePolylineAnnotation;
  /** Annotation value for image classification case. */
  imageClassificationAnnotation?: GoogleCloudDatalabelingV1beta1ImageClassificationAnnotation;
  /** Annotation value for text classification case. */
  textClassificationAnnotation?: GoogleCloudDatalabelingV1beta1TextClassificationAnnotation;
  /** Annotation value for image bounding box, oriented bounding box and polygon cases. */
  imageBoundingPolyAnnotation?: GoogleCloudDatalabelingV1beta1ImageBoundingPolyAnnotation;
  /** Annotation value for video classification case. */
  videoClassificationAnnotation?: GoogleCloudDatalabelingV1beta1VideoClassificationAnnotation;
  /** Annotation value for video object detection and tracking case. */
  videoObjectTrackingAnnotation?: GoogleCloudDatalabelingV1beta1VideoObjectTrackingAnnotation;
}

export const GoogleCloudDatalabelingV1beta1AnnotationValue: Schema.Schema<GoogleCloudDatalabelingV1beta1AnnotationValue> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      videoEventAnnotation: Schema.optional(
        GoogleCloudDatalabelingV1beta1VideoEventAnnotation,
      ),
      imageSegmentationAnnotation: Schema.optional(
        GoogleCloudDatalabelingV1beta1ImageSegmentationAnnotation,
      ),
      textEntityExtractionAnnotation: Schema.optional(
        GoogleCloudDatalabelingV1beta1TextEntityExtractionAnnotation,
      ),
      imagePolylineAnnotation: Schema.optional(
        GoogleCloudDatalabelingV1beta1ImagePolylineAnnotation,
      ),
      imageClassificationAnnotation: Schema.optional(
        GoogleCloudDatalabelingV1beta1ImageClassificationAnnotation,
      ),
      textClassificationAnnotation: Schema.optional(
        GoogleCloudDatalabelingV1beta1TextClassificationAnnotation,
      ),
      imageBoundingPolyAnnotation: Schema.optional(
        GoogleCloudDatalabelingV1beta1ImageBoundingPolyAnnotation,
      ),
      videoClassificationAnnotation: Schema.optional(
        GoogleCloudDatalabelingV1beta1VideoClassificationAnnotation,
      ),
      videoObjectTrackingAnnotation: Schema.optional(
        GoogleCloudDatalabelingV1beta1VideoObjectTrackingAnnotation,
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDatalabelingV1beta1AnnotationValue",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1beta1AnnotationValue>;

export interface GoogleCloudDatalabelingV1beta1OperatorFeedbackMetadata {}

export const GoogleCloudDatalabelingV1beta1OperatorFeedbackMetadata: Schema.Schema<GoogleCloudDatalabelingV1beta1OperatorFeedbackMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "GoogleCloudDatalabelingV1beta1OperatorFeedbackMetadata",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1beta1OperatorFeedbackMetadata>;

export interface GoogleCloudDatalabelingV1beta1TextPayload {
  /** Text content. */
  textContent?: string;
}

export const GoogleCloudDatalabelingV1beta1TextPayload: Schema.Schema<GoogleCloudDatalabelingV1beta1TextPayload> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      textContent: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDatalabelingV1beta1TextPayload",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1beta1TextPayload>;

export interface GoogleCloudDatalabelingV1beta1ImagePayload {
  /** Image uri from the user bucket. */
  imageUri?: string;
  /** A byte string of a thumbnail image. */
  imageThumbnail?: string;
  /** Signed uri of the image file in the service bucket. */
  signedUri?: string;
  /** Image format. */
  mimeType?: string;
}

export const GoogleCloudDatalabelingV1beta1ImagePayload: Schema.Schema<GoogleCloudDatalabelingV1beta1ImagePayload> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      imageUri: Schema.optional(Schema.String),
      imageThumbnail: Schema.optional(Schema.String),
      signedUri: Schema.optional(Schema.String),
      mimeType: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDatalabelingV1beta1ImagePayload",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1beta1ImagePayload>;

export interface GoogleCloudDatalabelingV1beta1DataItem {
  /** The video payload, a container of the video uri. */
  videoPayload?: GoogleCloudDatalabelingV1beta1VideoPayload;
  /** The text payload, a container of text content. */
  textPayload?: GoogleCloudDatalabelingV1beta1TextPayload;
  /** Output only. Name of the data item, in format of: projects/{project_id}/datasets/{dataset_id}/dataItems/{data_item_id} */
  name?: string;
  /** The image payload, a container of the image bytes/uri. */
  imagePayload?: GoogleCloudDatalabelingV1beta1ImagePayload;
}

export const GoogleCloudDatalabelingV1beta1DataItem: Schema.Schema<GoogleCloudDatalabelingV1beta1DataItem> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      videoPayload: Schema.optional(GoogleCloudDatalabelingV1beta1VideoPayload),
      textPayload: Schema.optional(GoogleCloudDatalabelingV1beta1TextPayload),
      name: Schema.optional(Schema.String),
      imagePayload: Schema.optional(GoogleCloudDatalabelingV1beta1ImagePayload),
    }),
  ).annotate({
    identifier: "GoogleCloudDatalabelingV1beta1DataItem",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1beta1DataItem>;

export interface GoogleCloudDatalabelingV1beta1ListDataItemsResponse {
  /** The list of data items to return. */
  dataItems?: Array<GoogleCloudDatalabelingV1beta1DataItem>;
  /** A token to retrieve next page of results. */
  nextPageToken?: string;
}

export const GoogleCloudDatalabelingV1beta1ListDataItemsResponse: Schema.Schema<GoogleCloudDatalabelingV1beta1ListDataItemsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      dataItems: Schema.optional(
        Schema.Array(GoogleCloudDatalabelingV1beta1DataItem),
      ),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDatalabelingV1beta1ListDataItemsResponse",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1beta1ListDataItemsResponse>;

export interface GoogleCloudDatalabelingV1alpha1GcsDestination {
  /** Required. The output uri of destination file. */
  outputUri?: string;
  /** Required. The format of the gcs destination. Only "text/csv" and "application/json" are supported. */
  mimeType?: string;
}

export const GoogleCloudDatalabelingV1alpha1GcsDestination: Schema.Schema<GoogleCloudDatalabelingV1alpha1GcsDestination> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      outputUri: Schema.optional(Schema.String),
      mimeType: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDatalabelingV1alpha1GcsDestination",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1alpha1GcsDestination>;

export interface GoogleCloudDatalabelingV1beta1CsvInstruction {
  /** CSV file for the instruction. Only gcs path is allowed. */
  gcsFileUri?: string;
}

export const GoogleCloudDatalabelingV1beta1CsvInstruction: Schema.Schema<GoogleCloudDatalabelingV1beta1CsvInstruction> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      gcsFileUri: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDatalabelingV1beta1CsvInstruction",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1beta1CsvInstruction>;

export interface GoogleCloudDatalabelingV1beta1PdfInstruction {
  /** PDF file for the instruction. Only gcs path is allowed. */
  gcsFileUri?: string;
}

export const GoogleCloudDatalabelingV1beta1PdfInstruction: Schema.Schema<GoogleCloudDatalabelingV1beta1PdfInstruction> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      gcsFileUri: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDatalabelingV1beta1PdfInstruction",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1beta1PdfInstruction>;

export interface GoogleCloudDatalabelingV1beta1Instruction {
  /** Required. The data type of this instruction. */
  dataType?:
    | "DATA_TYPE_UNSPECIFIED"
    | "IMAGE"
    | "VIDEO"
    | "TEXT"
    | "GENERAL_DATA"
    | (string & {});
  /** Output only. Instruction resource name, format: projects/{project_id}/instructions/{instruction_id} */
  name?: string;
  /** Optional. User-provided description of the instruction. The description can be up to 10000 characters long. */
  description?: string;
  /** Output only. Creation time of instruction. */
  createTime?: string;
  /** Output only. The names of any related resources that are blocking changes to the instruction. */
  blockingResources?: Array<string>;
  /** Required. The display name of the instruction. Maximum of 64 characters. */
  displayName?: string;
  /** Output only. Last update time of instruction. */
  updateTime?: string;
  /** Deprecated: this instruction format is not supported any more. Instruction from a CSV file, such as for classification task. The CSV file should have exact two columns, in the following format: * The first column is labeled data, such as an image reference, text. * The second column is comma separated labels associated with data. */
  csvInstruction?: GoogleCloudDatalabelingV1beta1CsvInstruction;
  /** Instruction from a PDF document. The PDF should be in a Cloud Storage bucket. */
  pdfInstruction?: GoogleCloudDatalabelingV1beta1PdfInstruction;
}

export const GoogleCloudDatalabelingV1beta1Instruction: Schema.Schema<GoogleCloudDatalabelingV1beta1Instruction> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      dataType: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
      description: Schema.optional(Schema.String),
      createTime: Schema.optional(Schema.String),
      blockingResources: Schema.optional(Schema.Array(Schema.String)),
      displayName: Schema.optional(Schema.String),
      updateTime: Schema.optional(Schema.String),
      csvInstruction: Schema.optional(
        GoogleCloudDatalabelingV1beta1CsvInstruction,
      ),
      pdfInstruction: Schema.optional(
        GoogleCloudDatalabelingV1beta1PdfInstruction,
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDatalabelingV1beta1Instruction",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1beta1Instruction>;

export interface GoogleCloudDatalabelingV1beta1CreateInstructionRequest {
  /** Required. Instruction of how to perform the labeling task. */
  instruction?: GoogleCloudDatalabelingV1beta1Instruction;
}

export const GoogleCloudDatalabelingV1beta1CreateInstructionRequest: Schema.Schema<GoogleCloudDatalabelingV1beta1CreateInstructionRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      instruction: Schema.optional(GoogleCloudDatalabelingV1beta1Instruction),
    }),
  ).annotate({
    identifier: "GoogleCloudDatalabelingV1beta1CreateInstructionRequest",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1beta1CreateInstructionRequest>;

export interface GoogleCloudDatalabelingV1alpha1HumanAnnotationConfig {
  /** Optional. A human-readable label used to logically group labeling tasks. This string must match the regular expression `[a-zA-Z\\d_-]{0,128}`. */
  labelGroup?: string;
  /** Optional. A human-readable description for AnnotatedDataset. The description can be up to 10000 characters long. */
  annotatedDatasetDescription?: string;
  /** Required. Instruction resource name. */
  instruction?: string;
  /** Optional. If you want your own labeling contributors to manage and work on this labeling request, you can set these contributors here. We will give them access to the question types in crowdcompute. Note that these emails must be registered in crowdcompute worker UI: https://crowd-compute.appspot.com/ */
  contributorEmails?: Array<string>;
  /** Email of the user who started the labeling task and should be notified by email. If empty no notification will be sent. */
  userEmailAddress?: string;
  /** Optional. The Language of this question, as a [BCP-47](https://www.rfc-editor.org/rfc/bcp/bcp47.txt). Default value is en-US. Only need to set this when task is language related. For example, French text classification. */
  languageCode?: string;
  /** Required. A human-readable name for AnnotatedDataset defined by users. Maximum of 64 characters . */
  annotatedDatasetDisplayName?: string;
  /** Optional. Maximum duration for contributors to answer a question. Maximum is 3600 seconds. Default is 3600 seconds. */
  questionDuration?: string;
  /** Optional. Replication of questions. Each question will be sent to up to this number of contributors to label. Aggregated answers will be returned. Default is set to 1. For image related labeling, valid values are 1, 3, 5. */
  replicaCount?: number;
}

export const GoogleCloudDatalabelingV1alpha1HumanAnnotationConfig: Schema.Schema<GoogleCloudDatalabelingV1alpha1HumanAnnotationConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      labelGroup: Schema.optional(Schema.String),
      annotatedDatasetDescription: Schema.optional(Schema.String),
      instruction: Schema.optional(Schema.String),
      contributorEmails: Schema.optional(Schema.Array(Schema.String)),
      userEmailAddress: Schema.optional(Schema.String),
      languageCode: Schema.optional(Schema.String),
      annotatedDatasetDisplayName: Schema.optional(Schema.String),
      questionDuration: Schema.optional(Schema.String),
      replicaCount: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "GoogleCloudDatalabelingV1alpha1HumanAnnotationConfig",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1alpha1HumanAnnotationConfig>;

export interface GoogleCloudDatalabelingV1alpha1LabelImageBoundingPolyOperationMetadata {
  /** Basic human annotation config used in labeling request. */
  basicConfig?: GoogleCloudDatalabelingV1alpha1HumanAnnotationConfig;
}

export const GoogleCloudDatalabelingV1alpha1LabelImageBoundingPolyOperationMetadata: Schema.Schema<GoogleCloudDatalabelingV1alpha1LabelImageBoundingPolyOperationMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      basicConfig: Schema.optional(
        GoogleCloudDatalabelingV1alpha1HumanAnnotationConfig,
      ),
    }),
  ).annotate({
    identifier:
      "GoogleCloudDatalabelingV1alpha1LabelImageBoundingPolyOperationMetadata",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1alpha1LabelImageBoundingPolyOperationMetadata>;

export interface GoogleCloudDatalabelingV1p1alpha1LabelImagePolylineOperationMetadata {
  /** Basic human annotation config used in labeling request. */
  basicConfig?: GoogleCloudDatalabelingV1p1alpha1HumanAnnotationConfig;
}

export const GoogleCloudDatalabelingV1p1alpha1LabelImagePolylineOperationMetadata: Schema.Schema<GoogleCloudDatalabelingV1p1alpha1LabelImagePolylineOperationMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      basicConfig: Schema.optional(
        GoogleCloudDatalabelingV1p1alpha1HumanAnnotationConfig,
      ),
    }),
  ).annotate({
    identifier:
      "GoogleCloudDatalabelingV1p1alpha1LabelImagePolylineOperationMetadata",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1p1alpha1LabelImagePolylineOperationMetadata>;

export interface GoogleCloudDatalabelingV1p1alpha1LabelTextEntityExtractionOperationMetadata {
  /** Basic human annotation config used in labeling request. */
  basicConfig?: GoogleCloudDatalabelingV1p1alpha1HumanAnnotationConfig;
}

export const GoogleCloudDatalabelingV1p1alpha1LabelTextEntityExtractionOperationMetadata: Schema.Schema<GoogleCloudDatalabelingV1p1alpha1LabelTextEntityExtractionOperationMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      basicConfig: Schema.optional(
        GoogleCloudDatalabelingV1p1alpha1HumanAnnotationConfig,
      ),
    }),
  ).annotate({
    identifier:
      "GoogleCloudDatalabelingV1p1alpha1LabelTextEntityExtractionOperationMetadata",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1p1alpha1LabelTextEntityExtractionOperationMetadata>;

export interface GoogleProtobufEmpty {}

export const GoogleProtobufEmpty: Schema.Schema<GoogleProtobufEmpty> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "GoogleProtobufEmpty",
  }) as any as Schema.Schema<GoogleProtobufEmpty>;

export interface GoogleCloudDatalabelingV1p2alpha1LabelStats {
  /** Map of each annotation spec's example count. Key is the annotation spec name and value is the number of examples for that annotation spec. If the annotated dataset does not have annotation spec, the map will return a pair where the key is empty string and value is the total number of annotations. */
  exampleCount?: Record<string, string>;
}

export const GoogleCloudDatalabelingV1p2alpha1LabelStats: Schema.Schema<GoogleCloudDatalabelingV1p2alpha1LabelStats> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      exampleCount: Schema.optional(
        Schema.Record(Schema.String, Schema.String),
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDatalabelingV1p2alpha1LabelStats",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1p2alpha1LabelStats>;

export interface GoogleCloudDatalabelingV1p2alpha1LabelImageSegmentationOperationMetadata {
  /** Basic human annotation config. */
  basicConfig?: GoogleCloudDatalabelingV1p2alpha1HumanAnnotationConfig;
}

export const GoogleCloudDatalabelingV1p2alpha1LabelImageSegmentationOperationMetadata: Schema.Schema<GoogleCloudDatalabelingV1p2alpha1LabelImageSegmentationOperationMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      basicConfig: Schema.optional(
        GoogleCloudDatalabelingV1p2alpha1HumanAnnotationConfig,
      ),
    }),
  ).annotate({
    identifier:
      "GoogleCloudDatalabelingV1p2alpha1LabelImageSegmentationOperationMetadata",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1p2alpha1LabelImageSegmentationOperationMetadata>;

export interface GoogleCloudDatalabelingV1p2alpha1LabelTextEntityExtractionOperationMetadata {
  /** Basic human annotation config used in labeling request. */
  basicConfig?: GoogleCloudDatalabelingV1p2alpha1HumanAnnotationConfig;
}

export const GoogleCloudDatalabelingV1p2alpha1LabelTextEntityExtractionOperationMetadata: Schema.Schema<GoogleCloudDatalabelingV1p2alpha1LabelTextEntityExtractionOperationMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      basicConfig: Schema.optional(
        GoogleCloudDatalabelingV1p2alpha1HumanAnnotationConfig,
      ),
    }),
  ).annotate({
    identifier:
      "GoogleCloudDatalabelingV1p2alpha1LabelTextEntityExtractionOperationMetadata",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1p2alpha1LabelTextEntityExtractionOperationMetadata>;

export interface GoogleCloudDatalabelingV1p2alpha1LabelVideoObjectTrackingOperationMetadata {
  /** Basic human annotation config used in labeling request. */
  basicConfig?: GoogleCloudDatalabelingV1p2alpha1HumanAnnotationConfig;
}

export const GoogleCloudDatalabelingV1p2alpha1LabelVideoObjectTrackingOperationMetadata: Schema.Schema<GoogleCloudDatalabelingV1p2alpha1LabelVideoObjectTrackingOperationMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      basicConfig: Schema.optional(
        GoogleCloudDatalabelingV1p2alpha1HumanAnnotationConfig,
      ),
    }),
  ).annotate({
    identifier:
      "GoogleCloudDatalabelingV1p2alpha1LabelVideoObjectTrackingOperationMetadata",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1p2alpha1LabelVideoObjectTrackingOperationMetadata>;

export interface GoogleCloudDatalabelingV1alpha1ImportDataOperationMetadata {
  /** Output only. Partial failures encountered. E.g. single files that couldn't be read. Status details field will contain standard GCP error details. */
  partialFailures?: Array<GoogleRpcStatus>;
  /** Output only. The name of imported dataset. "projects/* /datasets/*" */
  dataset?: string;
  /** Output only. Timestamp when import dataset request was created. */
  createTime?: string;
}

export const GoogleCloudDatalabelingV1alpha1ImportDataOperationMetadata: Schema.Schema<GoogleCloudDatalabelingV1alpha1ImportDataOperationMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      partialFailures: Schema.optional(Schema.Array(GoogleRpcStatus)),
      dataset: Schema.optional(Schema.String),
      createTime: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDatalabelingV1alpha1ImportDataOperationMetadata",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1alpha1ImportDataOperationMetadata>;

export interface GoogleCloudDatalabelingV1alpha1LabelImagePolylineOperationMetadata {
  /** Basic human annotation config used in labeling request. */
  basicConfig?: GoogleCloudDatalabelingV1alpha1HumanAnnotationConfig;
}

export const GoogleCloudDatalabelingV1alpha1LabelImagePolylineOperationMetadata: Schema.Schema<GoogleCloudDatalabelingV1alpha1LabelImagePolylineOperationMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      basicConfig: Schema.optional(
        GoogleCloudDatalabelingV1alpha1HumanAnnotationConfig,
      ),
    }),
  ).annotate({
    identifier:
      "GoogleCloudDatalabelingV1alpha1LabelImagePolylineOperationMetadata",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1alpha1LabelImagePolylineOperationMetadata>;

export interface GoogleCloudDatalabelingV1beta1PauseEvaluationJobRequest {}

export const GoogleCloudDatalabelingV1beta1PauseEvaluationJobRequest: Schema.Schema<GoogleCloudDatalabelingV1beta1PauseEvaluationJobRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "GoogleCloudDatalabelingV1beta1PauseEvaluationJobRequest",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1beta1PauseEvaluationJobRequest>;

export interface GoogleCloudDatalabelingV1p1alpha1LabelVideoObjectDetectionOperationMetadata {
  /** Basic human annotation config used in labeling request. */
  basicConfig?: GoogleCloudDatalabelingV1p1alpha1HumanAnnotationConfig;
}

export const GoogleCloudDatalabelingV1p1alpha1LabelVideoObjectDetectionOperationMetadata: Schema.Schema<GoogleCloudDatalabelingV1p1alpha1LabelVideoObjectDetectionOperationMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      basicConfig: Schema.optional(
        GoogleCloudDatalabelingV1p1alpha1HumanAnnotationConfig,
      ),
    }),
  ).annotate({
    identifier:
      "GoogleCloudDatalabelingV1p1alpha1LabelVideoObjectDetectionOperationMetadata",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1p1alpha1LabelVideoObjectDetectionOperationMetadata>;

export interface GoogleCloudDatalabelingV1p1alpha1CreateInstructionMetadata {
  /** Timestamp when create instruction request was created. */
  createTime?: string;
  /** Partial failures encountered. E.g. single files that couldn't be read. Status details field will contain standard GCP error details. */
  partialFailures?: Array<GoogleRpcStatus>;
  /** The name of the created Instruction. projects/{project_id}/instructions/{instruction_id} */
  instruction?: string;
}

export const GoogleCloudDatalabelingV1p1alpha1CreateInstructionMetadata: Schema.Schema<GoogleCloudDatalabelingV1p1alpha1CreateInstructionMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      createTime: Schema.optional(Schema.String),
      partialFailures: Schema.optional(Schema.Array(GoogleRpcStatus)),
      instruction: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDatalabelingV1p1alpha1CreateInstructionMetadata",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1p1alpha1CreateInstructionMetadata>;

export interface GoogleCloudDatalabelingV1beta1ImportDataOperationResponse {
  /** Ouptut only. The name of imported dataset. */
  dataset?: string;
  /** Output only. Total number of examples requested to import */
  totalCount?: number;
  /** Output only. Number of examples imported successfully. */
  importCount?: number;
}

export const GoogleCloudDatalabelingV1beta1ImportDataOperationResponse: Schema.Schema<GoogleCloudDatalabelingV1beta1ImportDataOperationResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      dataset: Schema.optional(Schema.String),
      totalCount: Schema.optional(Schema.Number),
      importCount: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "GoogleCloudDatalabelingV1beta1ImportDataOperationResponse",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1beta1ImportDataOperationResponse>;

export interface GoogleCloudDatalabelingV1p1alpha1ImportDataOperationMetadata {
  /** Output only. Partial failures encountered. E.g. single files that couldn't be read. Status details field will contain standard GCP error details. */
  partialFailures?: Array<GoogleRpcStatus>;
  /** Output only. The name of imported dataset. "projects/* /datasets/*" */
  dataset?: string;
  /** Output only. Timestamp when import dataset request was created. */
  createTime?: string;
}

export const GoogleCloudDatalabelingV1p1alpha1ImportDataOperationMetadata: Schema.Schema<GoogleCloudDatalabelingV1p1alpha1ImportDataOperationMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      partialFailures: Schema.optional(Schema.Array(GoogleRpcStatus)),
      dataset: Schema.optional(Schema.String),
      createTime: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDatalabelingV1p1alpha1ImportDataOperationMetadata",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1p1alpha1ImportDataOperationMetadata>;

export interface GoogleCloudDatalabelingV1p1alpha1LabelImageOrientedBoundingBoxOperationMetadata {
  /** Basic human annotation config. */
  basicConfig?: GoogleCloudDatalabelingV1p1alpha1HumanAnnotationConfig;
}

export const GoogleCloudDatalabelingV1p1alpha1LabelImageOrientedBoundingBoxOperationMetadata: Schema.Schema<GoogleCloudDatalabelingV1p1alpha1LabelImageOrientedBoundingBoxOperationMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      basicConfig: Schema.optional(
        GoogleCloudDatalabelingV1p1alpha1HumanAnnotationConfig,
      ),
    }),
  ).annotate({
    identifier:
      "GoogleCloudDatalabelingV1p1alpha1LabelImageOrientedBoundingBoxOperationMetadata",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1p1alpha1LabelImageOrientedBoundingBoxOperationMetadata>;

export interface GoogleCloudDatalabelingV1alpha1LabelVideoEventOperationMetadata {
  /** Basic human annotation config used in labeling request. */
  basicConfig?: GoogleCloudDatalabelingV1alpha1HumanAnnotationConfig;
}

export const GoogleCloudDatalabelingV1alpha1LabelVideoEventOperationMetadata: Schema.Schema<GoogleCloudDatalabelingV1alpha1LabelVideoEventOperationMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      basicConfig: Schema.optional(
        GoogleCloudDatalabelingV1alpha1HumanAnnotationConfig,
      ),
    }),
  ).annotate({
    identifier:
      "GoogleCloudDatalabelingV1alpha1LabelVideoEventOperationMetadata",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1alpha1LabelVideoEventOperationMetadata>;

export interface GoogleCloudDatalabelingV1beta1LabelStats {
  /** Map of each annotation spec's example count. Key is the annotation spec name and value is the number of examples for that annotation spec. If the annotated dataset does not have annotation spec, the map will return a pair where the key is empty string and value is the total number of annotations. */
  exampleCount?: Record<string, string>;
}

export const GoogleCloudDatalabelingV1beta1LabelStats: Schema.Schema<GoogleCloudDatalabelingV1beta1LabelStats> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      exampleCount: Schema.optional(
        Schema.Record(Schema.String, Schema.String),
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDatalabelingV1beta1LabelStats",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1beta1LabelStats>;

export interface GoogleCloudDatalabelingV1beta1AnnotatedDataset {
  /** Output only. The names of any related resources that are blocking changes to the annotated dataset. */
  blockingResources?: Array<string>;
  /** Output only. The display name of the AnnotatedDataset. It is specified in HumanAnnotationConfig when user starts a labeling task. Maximum of 64 characters. */
  displayName?: string;
  /** Output only. Number of examples that have annotation in the annotated dataset. */
  completedExampleCount?: string;
  /** Output only. The description of the AnnotatedDataset. It is specified in HumanAnnotationConfig when user starts a labeling task. Maximum of 10000 characters. */
  description?: string;
  /** Output only. Source of the annotation. */
  annotationSource?:
    | "ANNOTATION_SOURCE_UNSPECIFIED"
    | "OPERATOR"
    | (string & {});
  /** Output only. Per label statistics. */
  labelStats?: GoogleCloudDatalabelingV1beta1LabelStats;
  /** Output only. AnnotatedDataset resource name in format of: projects/{project_id}/datasets/{dataset_id}/annotatedDatasets/ {annotated_dataset_id} */
  name?: string;
  /** Output only. Type of the annotation. It is specified when starting labeling task. */
  annotationType?:
    | "ANNOTATION_TYPE_UNSPECIFIED"
    | "IMAGE_CLASSIFICATION_ANNOTATION"
    | "IMAGE_BOUNDING_BOX_ANNOTATION"
    | "IMAGE_ORIENTED_BOUNDING_BOX_ANNOTATION"
    | "IMAGE_BOUNDING_POLY_ANNOTATION"
    | "IMAGE_POLYLINE_ANNOTATION"
    | "IMAGE_SEGMENTATION_ANNOTATION"
    | "VIDEO_SHOTS_CLASSIFICATION_ANNOTATION"
    | "VIDEO_OBJECT_TRACKING_ANNOTATION"
    | "VIDEO_OBJECT_DETECTION_ANNOTATION"
    | "VIDEO_EVENT_ANNOTATION"
    | "TEXT_CLASSIFICATION_ANNOTATION"
    | "TEXT_ENTITY_EXTRACTION_ANNOTATION"
    | "GENERAL_CLASSIFICATION_ANNOTATION"
    | (string & {});
  /** Output only. Number of examples in the annotated dataset. */
  exampleCount?: string;
  /** Output only. Additional information about AnnotatedDataset. */
  metadata?: GoogleCloudDatalabelingV1beta1AnnotatedDatasetMetadata;
  /** Output only. Time the AnnotatedDataset was created. */
  createTime?: string;
}

export const GoogleCloudDatalabelingV1beta1AnnotatedDataset: Schema.Schema<GoogleCloudDatalabelingV1beta1AnnotatedDataset> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      blockingResources: Schema.optional(Schema.Array(Schema.String)),
      displayName: Schema.optional(Schema.String),
      completedExampleCount: Schema.optional(Schema.String),
      description: Schema.optional(Schema.String),
      annotationSource: Schema.optional(Schema.String),
      labelStats: Schema.optional(GoogleCloudDatalabelingV1beta1LabelStats),
      name: Schema.optional(Schema.String),
      annotationType: Schema.optional(Schema.String),
      exampleCount: Schema.optional(Schema.String),
      metadata: Schema.optional(
        GoogleCloudDatalabelingV1beta1AnnotatedDatasetMetadata,
      ),
      createTime: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDatalabelingV1beta1AnnotatedDataset",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1beta1AnnotatedDataset>;

export interface GoogleCloudDatalabelingV1beta1LabelVideoEventOperationMetadata {
  /** Basic human annotation config used in labeling request. */
  basicConfig?: GoogleCloudDatalabelingV1beta1HumanAnnotationConfig;
}

export const GoogleCloudDatalabelingV1beta1LabelVideoEventOperationMetadata: Schema.Schema<GoogleCloudDatalabelingV1beta1LabelVideoEventOperationMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      basicConfig: Schema.optional(
        GoogleCloudDatalabelingV1beta1HumanAnnotationConfig,
      ),
    }),
  ).annotate({
    identifier:
      "GoogleCloudDatalabelingV1beta1LabelVideoEventOperationMetadata",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1beta1LabelVideoEventOperationMetadata>;

export interface GoogleCloudDatalabelingV1p2alpha1LabelVideoEventOperationMetadata {
  /** Basic human annotation config used in labeling request. */
  basicConfig?: GoogleCloudDatalabelingV1p2alpha1HumanAnnotationConfig;
}

export const GoogleCloudDatalabelingV1p2alpha1LabelVideoEventOperationMetadata: Schema.Schema<GoogleCloudDatalabelingV1p2alpha1LabelVideoEventOperationMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      basicConfig: Schema.optional(
        GoogleCloudDatalabelingV1p2alpha1HumanAnnotationConfig,
      ),
    }),
  ).annotate({
    identifier:
      "GoogleCloudDatalabelingV1p2alpha1LabelVideoEventOperationMetadata",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1p2alpha1LabelVideoEventOperationMetadata>;

export interface GoogleCloudDatalabelingV1beta1LabelImageRequest {
  /** Configuration for bounding box and bounding poly task. One of image_classification_config, bounding_poly_config, polyline_config and segmentation_config are required. */
  boundingPolyConfig?: GoogleCloudDatalabelingV1beta1BoundingPolyConfig;
  /** Required. Basic human annotation config. */
  basicConfig?: GoogleCloudDatalabelingV1beta1HumanAnnotationConfig;
  /** Configuration for segmentation task. One of image_classification_config, bounding_poly_config, polyline_config and segmentation_config are required. */
  segmentationConfig?: GoogleCloudDatalabelingV1beta1SegmentationConfig;
  /** Configuration for polyline task. One of image_classification_config, bounding_poly_config, polyline_config and segmentation_config are required. */
  polylineConfig?: GoogleCloudDatalabelingV1beta1PolylineConfig;
  /** Configuration for image classification task. One of image_classification_config, bounding_poly_config, polyline_config and segmentation_config are required. */
  imageClassificationConfig?: GoogleCloudDatalabelingV1beta1ImageClassificationConfig;
  /** Required. The type of image labeling task. */
  feature?:
    | "FEATURE_UNSPECIFIED"
    | "CLASSIFICATION"
    | "BOUNDING_BOX"
    | "ORIENTED_BOUNDING_BOX"
    | "BOUNDING_POLY"
    | "POLYLINE"
    | "SEGMENTATION"
    | (string & {});
}

export const GoogleCloudDatalabelingV1beta1LabelImageRequest: Schema.Schema<GoogleCloudDatalabelingV1beta1LabelImageRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      boundingPolyConfig: Schema.optional(
        GoogleCloudDatalabelingV1beta1BoundingPolyConfig,
      ),
      basicConfig: Schema.optional(
        GoogleCloudDatalabelingV1beta1HumanAnnotationConfig,
      ),
      segmentationConfig: Schema.optional(
        GoogleCloudDatalabelingV1beta1SegmentationConfig,
      ),
      polylineConfig: Schema.optional(
        GoogleCloudDatalabelingV1beta1PolylineConfig,
      ),
      imageClassificationConfig: Schema.optional(
        GoogleCloudDatalabelingV1beta1ImageClassificationConfig,
      ),
      feature: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDatalabelingV1beta1LabelImageRequest",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1beta1LabelImageRequest>;

export interface GoogleCloudDatalabelingV1beta1ClassificationMetrics {
  /** Precision-recall curve based on ground truth labels, predicted labels, and scores for the predicted labels. */
  prCurve?: GoogleCloudDatalabelingV1beta1PrCurve;
  /** Confusion matrix of predicted labels vs. ground truth labels. */
  confusionMatrix?: GoogleCloudDatalabelingV1beta1ConfusionMatrix;
}

export const GoogleCloudDatalabelingV1beta1ClassificationMetrics: Schema.Schema<GoogleCloudDatalabelingV1beta1ClassificationMetrics> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      prCurve: Schema.optional(GoogleCloudDatalabelingV1beta1PrCurve),
      confusionMatrix: Schema.optional(
        GoogleCloudDatalabelingV1beta1ConfusionMatrix,
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDatalabelingV1beta1ClassificationMetrics",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1beta1ClassificationMetrics>;

export interface GoogleCloudDatalabelingV1beta1EvaluationMetrics {
  objectDetectionMetrics?: GoogleCloudDatalabelingV1beta1ObjectDetectionMetrics;
  classificationMetrics?: GoogleCloudDatalabelingV1beta1ClassificationMetrics;
}

export const GoogleCloudDatalabelingV1beta1EvaluationMetrics: Schema.Schema<GoogleCloudDatalabelingV1beta1EvaluationMetrics> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      objectDetectionMetrics: Schema.optional(
        GoogleCloudDatalabelingV1beta1ObjectDetectionMetrics,
      ),
      classificationMetrics: Schema.optional(
        GoogleCloudDatalabelingV1beta1ClassificationMetrics,
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDatalabelingV1beta1EvaluationMetrics",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1beta1EvaluationMetrics>;

export interface GoogleCloudDatalabelingV1beta1Evaluation {
  /** Output only. The number of items in the ground truth dataset that were used for this evaluation. Only populated when the evaulation is for certain AnnotationTypes. */
  evaluatedItemCount?: string;
  /** Output only. Resource name of an evaluation. The name has the following format: "projects/{project_id}/datasets/{dataset_id}/evaluations/ {evaluation_id}' */
  name?: string;
  /** Output only. Type of task that the model version being evaluated performs, as defined in the evaluationJobConfig.inputConfig.annotationType field of the evaluation job that created this evaluation. */
  annotationType?:
    | "ANNOTATION_TYPE_UNSPECIFIED"
    | "IMAGE_CLASSIFICATION_ANNOTATION"
    | "IMAGE_BOUNDING_BOX_ANNOTATION"
    | "IMAGE_ORIENTED_BOUNDING_BOX_ANNOTATION"
    | "IMAGE_BOUNDING_POLY_ANNOTATION"
    | "IMAGE_POLYLINE_ANNOTATION"
    | "IMAGE_SEGMENTATION_ANNOTATION"
    | "VIDEO_SHOTS_CLASSIFICATION_ANNOTATION"
    | "VIDEO_OBJECT_TRACKING_ANNOTATION"
    | "VIDEO_OBJECT_DETECTION_ANNOTATION"
    | "VIDEO_EVENT_ANNOTATION"
    | "TEXT_CLASSIFICATION_ANNOTATION"
    | "TEXT_ENTITY_EXTRACTION_ANNOTATION"
    | "GENERAL_CLASSIFICATION_ANNOTATION"
    | (string & {});
  /** Output only. Timestamp for when this evaluation was created. */
  createTime?: string;
  /** Output only. Timestamp for when the evaluation job that created this evaluation ran. */
  evaluationJobRunTime?: string;
  /** Output only. Options used in the evaluation job that created this evaluation. */
  config?: GoogleCloudDatalabelingV1beta1EvaluationConfig;
  /** Output only. Metrics comparing predictions to ground truth labels. */
  evaluationMetrics?: GoogleCloudDatalabelingV1beta1EvaluationMetrics;
}

export const GoogleCloudDatalabelingV1beta1Evaluation: Schema.Schema<GoogleCloudDatalabelingV1beta1Evaluation> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      evaluatedItemCount: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
      annotationType: Schema.optional(Schema.String),
      createTime: Schema.optional(Schema.String),
      evaluationJobRunTime: Schema.optional(Schema.String),
      config: Schema.optional(GoogleCloudDatalabelingV1beta1EvaluationConfig),
      evaluationMetrics: Schema.optional(
        GoogleCloudDatalabelingV1beta1EvaluationMetrics,
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDatalabelingV1beta1Evaluation",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1beta1Evaluation>;

export interface GoogleCloudDatalabelingV1alpha1GcsFolderDestination {
  /** Required. Cloud Storage directory to export data to. */
  outputFolderUri?: string;
}

export const GoogleCloudDatalabelingV1alpha1GcsFolderDestination: Schema.Schema<GoogleCloudDatalabelingV1alpha1GcsFolderDestination> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      outputFolderUri: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDatalabelingV1alpha1GcsFolderDestination",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1alpha1GcsFolderDestination>;

export interface GoogleCloudDatalabelingV1alpha1OutputConfig {
  /** Output to a file in Cloud Storage. Should be used for labeling output other than image segmentation. */
  gcsDestination?: GoogleCloudDatalabelingV1alpha1GcsDestination;
  /** Output to a folder in Cloud Storage. Should be used for image segmentation or document de-identification labeling outputs. */
  gcsFolderDestination?: GoogleCloudDatalabelingV1alpha1GcsFolderDestination;
}

export const GoogleCloudDatalabelingV1alpha1OutputConfig: Schema.Schema<GoogleCloudDatalabelingV1alpha1OutputConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      gcsDestination: Schema.optional(
        GoogleCloudDatalabelingV1alpha1GcsDestination,
      ),
      gcsFolderDestination: Schema.optional(
        GoogleCloudDatalabelingV1alpha1GcsFolderDestination,
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDatalabelingV1alpha1OutputConfig",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1alpha1OutputConfig>;

export interface GoogleCloudDatalabelingV1alpha1LabelTextEntityExtractionOperationMetadata {
  /** Basic human annotation config used in labeling request. */
  basicConfig?: GoogleCloudDatalabelingV1alpha1HumanAnnotationConfig;
}

export const GoogleCloudDatalabelingV1alpha1LabelTextEntityExtractionOperationMetadata: Schema.Schema<GoogleCloudDatalabelingV1alpha1LabelTextEntityExtractionOperationMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      basicConfig: Schema.optional(
        GoogleCloudDatalabelingV1alpha1HumanAnnotationConfig,
      ),
    }),
  ).annotate({
    identifier:
      "GoogleCloudDatalabelingV1alpha1LabelTextEntityExtractionOperationMetadata",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1alpha1LabelTextEntityExtractionOperationMetadata>;

export interface GoogleCloudDatalabelingV1beta1LabelTextClassificationOperationMetadata {
  /** Basic human annotation config used in labeling request. */
  basicConfig?: GoogleCloudDatalabelingV1beta1HumanAnnotationConfig;
}

export const GoogleCloudDatalabelingV1beta1LabelTextClassificationOperationMetadata: Schema.Schema<GoogleCloudDatalabelingV1beta1LabelTextClassificationOperationMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      basicConfig: Schema.optional(
        GoogleCloudDatalabelingV1beta1HumanAnnotationConfig,
      ),
    }),
  ).annotate({
    identifier:
      "GoogleCloudDatalabelingV1beta1LabelTextClassificationOperationMetadata",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1beta1LabelTextClassificationOperationMetadata>;

export interface GoogleCloudDatalabelingV1beta1Dataset {
  /** Optional. User-provided description of the annotation specification set. The description can be up to 10000 characters long. */
  description?: string;
  /** Required. The display name of the dataset. Maximum of 64 characters. */
  displayName?: string;
  /** Output only. The names of any related resources that are blocking changes to the dataset. */
  blockingResources?: Array<string>;
  /** Last time that the Dataset is migrated to AI Platform V2. If any of the AnnotatedDataset is migrated, the last_migration_time in Dataset is also updated. */
  lastMigrateTime?: string;
  /** Output only. The number of data items in the dataset. */
  dataItemCount?: string;
  /** Output only. This is populated with the original input configs where ImportData is called. It is available only after the clients import data to this dataset. */
  inputConfigs?: Array<GoogleCloudDatalabelingV1beta1InputConfig>;
  /** Output only. Time the dataset is created. */
  createTime?: string;
  /** Output only. Dataset resource name, format is: projects/{project_id}/datasets/{dataset_id} */
  name?: string;
}

export const GoogleCloudDatalabelingV1beta1Dataset: Schema.Schema<GoogleCloudDatalabelingV1beta1Dataset> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      description: Schema.optional(Schema.String),
      displayName: Schema.optional(Schema.String),
      blockingResources: Schema.optional(Schema.Array(Schema.String)),
      lastMigrateTime: Schema.optional(Schema.String),
      dataItemCount: Schema.optional(Schema.String),
      inputConfigs: Schema.optional(
        Schema.Array(GoogleCloudDatalabelingV1beta1InputConfig),
      ),
      createTime: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDatalabelingV1beta1Dataset",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1beta1Dataset>;

export interface GoogleCloudDatalabelingV1beta1ListDatasetsResponse {
  /** A token to retrieve next page of results. */
  nextPageToken?: string;
  /** The list of datasets to return. */
  datasets?: Array<GoogleCloudDatalabelingV1beta1Dataset>;
}

export const GoogleCloudDatalabelingV1beta1ListDatasetsResponse: Schema.Schema<GoogleCloudDatalabelingV1beta1ListDatasetsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      nextPageToken: Schema.optional(Schema.String),
      datasets: Schema.optional(
        Schema.Array(GoogleCloudDatalabelingV1beta1Dataset),
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDatalabelingV1beta1ListDatasetsResponse",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1beta1ListDatasetsResponse>;

export interface GoogleCloudDatalabelingV1alpha1LabelImageOrientedBoundingBoxOperationMetadata {
  /** Basic human annotation config. */
  basicConfig?: GoogleCloudDatalabelingV1alpha1HumanAnnotationConfig;
}

export const GoogleCloudDatalabelingV1alpha1LabelImageOrientedBoundingBoxOperationMetadata: Schema.Schema<GoogleCloudDatalabelingV1alpha1LabelImageOrientedBoundingBoxOperationMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      basicConfig: Schema.optional(
        GoogleCloudDatalabelingV1alpha1HumanAnnotationConfig,
      ),
    }),
  ).annotate({
    identifier:
      "GoogleCloudDatalabelingV1alpha1LabelImageOrientedBoundingBoxOperationMetadata",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1alpha1LabelImageOrientedBoundingBoxOperationMetadata>;

export interface GoogleCloudDatalabelingV1beta1ListAnnotatedDatasetsResponse {
  /** The list of annotated datasets to return. */
  annotatedDatasets?: Array<GoogleCloudDatalabelingV1beta1AnnotatedDataset>;
  /** A token to retrieve next page of results. */
  nextPageToken?: string;
}

export const GoogleCloudDatalabelingV1beta1ListAnnotatedDatasetsResponse: Schema.Schema<GoogleCloudDatalabelingV1beta1ListAnnotatedDatasetsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      annotatedDatasets: Schema.optional(
        Schema.Array(GoogleCloudDatalabelingV1beta1AnnotatedDataset),
      ),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDatalabelingV1beta1ListAnnotatedDatasetsResponse",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1beta1ListAnnotatedDatasetsResponse>;

export interface GoogleCloudDatalabelingV1beta1ExportDataRequest {
  /** Required. Annotated dataset resource name. DataItem in Dataset and their annotations in specified annotated dataset will be exported. It's in format of projects/{project_id}/datasets/{dataset_id}/annotatedDatasets/ {annotated_dataset_id} */
  annotatedDataset?: string;
  /** Optional. Filter is not supported at this moment. */
  filter?: string;
  /** Email of the user who started the export task and should be notified by email. If empty no notification will be sent. */
  userEmailAddress?: string;
  /** Required. Specify the output destination. */
  outputConfig?: GoogleCloudDatalabelingV1beta1OutputConfig;
}

export const GoogleCloudDatalabelingV1beta1ExportDataRequest: Schema.Schema<GoogleCloudDatalabelingV1beta1ExportDataRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      annotatedDataset: Schema.optional(Schema.String),
      filter: Schema.optional(Schema.String),
      userEmailAddress: Schema.optional(Schema.String),
      outputConfig: Schema.optional(GoogleCloudDatalabelingV1beta1OutputConfig),
    }),
  ).annotate({
    identifier: "GoogleCloudDatalabelingV1beta1ExportDataRequest",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1beta1ExportDataRequest>;

export interface GoogleCloudDatalabelingV1beta1OperatorMetadata {
  /** The total number of contributors that answer this question. */
  totalVotes?: number;
  /** The total number of contributors that choose this label. */
  labelVotes?: number;
  /** Comments from contributors. */
  comments?: Array<string>;
  /** Confidence score corresponding to a label. For examle, if 3 contributors have answered the question and 2 of them agree on the final label, the confidence score will be 0.67 (2/3). */
  score?: number;
}

export const GoogleCloudDatalabelingV1beta1OperatorMetadata: Schema.Schema<GoogleCloudDatalabelingV1beta1OperatorMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      totalVotes: Schema.optional(Schema.Number),
      labelVotes: Schema.optional(Schema.Number),
      comments: Schema.optional(Schema.Array(Schema.String)),
      score: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "GoogleCloudDatalabelingV1beta1OperatorMetadata",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1beta1OperatorMetadata>;

export interface GoogleCloudDatalabelingV1beta1AnnotationMetadata {
  /** Metadata related to human labeling. */
  operatorMetadata?: GoogleCloudDatalabelingV1beta1OperatorMetadata;
}

export const GoogleCloudDatalabelingV1beta1AnnotationMetadata: Schema.Schema<GoogleCloudDatalabelingV1beta1AnnotationMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      operatorMetadata: Schema.optional(
        GoogleCloudDatalabelingV1beta1OperatorMetadata,
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDatalabelingV1beta1AnnotationMetadata",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1beta1AnnotationMetadata>;

export interface GoogleCloudDatalabelingV1beta1Annotation {
  /** Output only. Annotation metadata, including information like votes for labels. */
  annotationMetadata?: GoogleCloudDatalabelingV1beta1AnnotationMetadata;
  /** Output only. This is the actual annotation value, e.g classification, bounding box values are stored here. */
  annotationValue?: GoogleCloudDatalabelingV1beta1AnnotationValue;
  /** Output only. Sentiment for this annotation. */
  annotationSentiment?:
    | "ANNOTATION_SENTIMENT_UNSPECIFIED"
    | "NEGATIVE"
    | "POSITIVE"
    | (string & {});
  /** Output only. The source of the annotation. */
  annotationSource?:
    | "ANNOTATION_SOURCE_UNSPECIFIED"
    | "OPERATOR"
    | (string & {});
  /** Output only. Unique name of this annotation, format is: projects/{project_id}/datasets/{dataset_id}/annotatedDatasets/{annotated_dataset}/examples/{example_id}/annotations/{annotation_id} */
  name?: string;
}

export const GoogleCloudDatalabelingV1beta1Annotation: Schema.Schema<GoogleCloudDatalabelingV1beta1Annotation> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      annotationMetadata: Schema.optional(
        GoogleCloudDatalabelingV1beta1AnnotationMetadata,
      ),
      annotationValue: Schema.optional(
        GoogleCloudDatalabelingV1beta1AnnotationValue,
      ),
      annotationSentiment: Schema.optional(Schema.String),
      annotationSource: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDatalabelingV1beta1Annotation",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1beta1Annotation>;

export interface GoogleCloudDatalabelingV1beta1Example {
  /** Output only. Annotations for the piece of data in Example. One piece of data can have multiple annotations. */
  annotations?: Array<GoogleCloudDatalabelingV1beta1Annotation>;
  /** The video payload, a container of the video uri. */
  videoPayload?: GoogleCloudDatalabelingV1beta1VideoPayload;
  /** The text payload, a container of the text content. */
  textPayload?: GoogleCloudDatalabelingV1beta1TextPayload;
  /** Output only. Name of the example, in format of: projects/{project_id}/datasets/{dataset_id}/annotatedDatasets/ {annotated_dataset_id}/examples/{example_id} */
  name?: string;
  /** The image payload, a container of the image bytes/uri. */
  imagePayload?: GoogleCloudDatalabelingV1beta1ImagePayload;
}

export const GoogleCloudDatalabelingV1beta1Example: Schema.Schema<GoogleCloudDatalabelingV1beta1Example> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      annotations: Schema.optional(
        Schema.Array(GoogleCloudDatalabelingV1beta1Annotation),
      ),
      videoPayload: Schema.optional(GoogleCloudDatalabelingV1beta1VideoPayload),
      textPayload: Schema.optional(GoogleCloudDatalabelingV1beta1TextPayload),
      name: Schema.optional(Schema.String),
      imagePayload: Schema.optional(GoogleCloudDatalabelingV1beta1ImagePayload),
    }),
  ).annotate({
    identifier: "GoogleCloudDatalabelingV1beta1Example",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1beta1Example>;

export interface GoogleCloudDatalabelingV1beta1ExampleComparison {
  /** The ground truth output for the input. */
  groundTruthExample?: GoogleCloudDatalabelingV1beta1Example;
  /** Predictions by the model for the input. */
  modelCreatedExamples?: Array<GoogleCloudDatalabelingV1beta1Example>;
}

export const GoogleCloudDatalabelingV1beta1ExampleComparison: Schema.Schema<GoogleCloudDatalabelingV1beta1ExampleComparison> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      groundTruthExample: Schema.optional(
        GoogleCloudDatalabelingV1beta1Example,
      ),
      modelCreatedExamples: Schema.optional(
        Schema.Array(GoogleCloudDatalabelingV1beta1Example),
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDatalabelingV1beta1ExampleComparison",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1beta1ExampleComparison>;

export interface GoogleCloudDatalabelingV1beta1SearchExampleComparisonsResponse {
  /** A list of example comparisons matching the search criteria. */
  exampleComparisons?: Array<GoogleCloudDatalabelingV1beta1ExampleComparison>;
  /** A token to retrieve next page of results. */
  nextPageToken?: string;
}

export const GoogleCloudDatalabelingV1beta1SearchExampleComparisonsResponse: Schema.Schema<GoogleCloudDatalabelingV1beta1SearchExampleComparisonsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      exampleComparisons: Schema.optional(
        Schema.Array(GoogleCloudDatalabelingV1beta1ExampleComparison),
      ),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier:
      "GoogleCloudDatalabelingV1beta1SearchExampleComparisonsResponse",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1beta1SearchExampleComparisonsResponse>;

export interface GoogleCloudDatalabelingV1p2alpha1ImportDataOperationMetadata {
  /** Output only. Timestamp when import dataset request was created. */
  createTime?: string;
  /** Output only. The name of imported dataset. "projects/* /datasets/*" */
  dataset?: string;
  /** Output only. Partial failures encountered. E.g. single files that couldn't be read. Status details field will contain standard GCP error details. */
  partialFailures?: Array<GoogleRpcStatus>;
}

export const GoogleCloudDatalabelingV1p2alpha1ImportDataOperationMetadata: Schema.Schema<GoogleCloudDatalabelingV1p2alpha1ImportDataOperationMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      createTime: Schema.optional(Schema.String),
      dataset: Schema.optional(Schema.String),
      partialFailures: Schema.optional(Schema.Array(GoogleRpcStatus)),
    }),
  ).annotate({
    identifier: "GoogleCloudDatalabelingV1p2alpha1ImportDataOperationMetadata",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1p2alpha1ImportDataOperationMetadata>;

export interface GoogleCloudDatalabelingV1beta1ListInstructionsResponse {
  /** A token to retrieve next page of results. */
  nextPageToken?: string;
  /** The list of Instructions to return. */
  instructions?: Array<GoogleCloudDatalabelingV1beta1Instruction>;
}

export const GoogleCloudDatalabelingV1beta1ListInstructionsResponse: Schema.Schema<GoogleCloudDatalabelingV1beta1ListInstructionsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      nextPageToken: Schema.optional(Schema.String),
      instructions: Schema.optional(
        Schema.Array(GoogleCloudDatalabelingV1beta1Instruction),
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDatalabelingV1beta1ListInstructionsResponse",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1beta1ListInstructionsResponse>;

export interface GoogleCloudDatalabelingV1alpha1LabelImageClassificationOperationMetadata {
  /** Basic human annotation config used in labeling request. */
  basicConfig?: GoogleCloudDatalabelingV1alpha1HumanAnnotationConfig;
}

export const GoogleCloudDatalabelingV1alpha1LabelImageClassificationOperationMetadata: Schema.Schema<GoogleCloudDatalabelingV1alpha1LabelImageClassificationOperationMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      basicConfig: Schema.optional(
        GoogleCloudDatalabelingV1alpha1HumanAnnotationConfig,
      ),
    }),
  ).annotate({
    identifier:
      "GoogleCloudDatalabelingV1alpha1LabelImageClassificationOperationMetadata",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1alpha1LabelImageClassificationOperationMetadata>;

export interface GoogleCloudDatalabelingV1beta1LabelImageBoundingPolyOperationMetadata {
  /** Basic human annotation config used in labeling request. */
  basicConfig?: GoogleCloudDatalabelingV1beta1HumanAnnotationConfig;
}

export const GoogleCloudDatalabelingV1beta1LabelImageBoundingPolyOperationMetadata: Schema.Schema<GoogleCloudDatalabelingV1beta1LabelImageBoundingPolyOperationMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      basicConfig: Schema.optional(
        GoogleCloudDatalabelingV1beta1HumanAnnotationConfig,
      ),
    }),
  ).annotate({
    identifier:
      "GoogleCloudDatalabelingV1beta1LabelImageBoundingPolyOperationMetadata",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1beta1LabelImageBoundingPolyOperationMetadata>;

export interface GoogleCloudDatalabelingV1beta1LabelVideoRequest {
  /** Configuration for video object detection task. One of video_classification_config, object_detection_config, object_tracking_config and event_config is required. */
  objectDetectionConfig?: GoogleCloudDatalabelingV1beta1ObjectDetectionConfig;
  /** Configuration for video object tracking task. One of video_classification_config, object_detection_config, object_tracking_config and event_config is required. */
  objectTrackingConfig?: GoogleCloudDatalabelingV1beta1ObjectTrackingConfig;
  /** Configuration for video classification task. One of video_classification_config, object_detection_config, object_tracking_config and event_config is required. */
  videoClassificationConfig?: GoogleCloudDatalabelingV1beta1VideoClassificationConfig;
  /** Required. The type of video labeling task. */
  feature?:
    | "FEATURE_UNSPECIFIED"
    | "CLASSIFICATION"
    | "OBJECT_DETECTION"
    | "OBJECT_TRACKING"
    | "EVENT"
    | (string & {});
  /** Required. Basic human annotation config. */
  basicConfig?: GoogleCloudDatalabelingV1beta1HumanAnnotationConfig;
  /** Configuration for video event task. One of video_classification_config, object_detection_config, object_tracking_config and event_config is required. */
  eventConfig?: GoogleCloudDatalabelingV1beta1EventConfig;
}

export const GoogleCloudDatalabelingV1beta1LabelVideoRequest: Schema.Schema<GoogleCloudDatalabelingV1beta1LabelVideoRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      objectDetectionConfig: Schema.optional(
        GoogleCloudDatalabelingV1beta1ObjectDetectionConfig,
      ),
      objectTrackingConfig: Schema.optional(
        GoogleCloudDatalabelingV1beta1ObjectTrackingConfig,
      ),
      videoClassificationConfig: Schema.optional(
        GoogleCloudDatalabelingV1beta1VideoClassificationConfig,
      ),
      feature: Schema.optional(Schema.String),
      basicConfig: Schema.optional(
        GoogleCloudDatalabelingV1beta1HumanAnnotationConfig,
      ),
      eventConfig: Schema.optional(GoogleCloudDatalabelingV1beta1EventConfig),
    }),
  ).annotate({
    identifier: "GoogleCloudDatalabelingV1beta1LabelVideoRequest",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1beta1LabelVideoRequest>;

export interface GoogleCloudDatalabelingV1beta1LabelVideoObjectTrackingOperationMetadata {
  /** Basic human annotation config used in labeling request. */
  basicConfig?: GoogleCloudDatalabelingV1beta1HumanAnnotationConfig;
}

export const GoogleCloudDatalabelingV1beta1LabelVideoObjectTrackingOperationMetadata: Schema.Schema<GoogleCloudDatalabelingV1beta1LabelVideoObjectTrackingOperationMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      basicConfig: Schema.optional(
        GoogleCloudDatalabelingV1beta1HumanAnnotationConfig,
      ),
    }),
  ).annotate({
    identifier:
      "GoogleCloudDatalabelingV1beta1LabelVideoObjectTrackingOperationMetadata",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1beta1LabelVideoObjectTrackingOperationMetadata>;

export interface GoogleLongrunningListOperationsResponse {
  /** The standard List next-page token. */
  nextPageToken?: string;
  /** Unordered list. Unreachable resources. Populated when the request sets `ListOperationsRequest.return_partial_success` and reads across collections. For example, when attempting to list all resources across all supported locations. */
  unreachable?: Array<string>;
  /** A list of operations that matches the specified filter in the request. */
  operations?: Array<GoogleLongrunningOperation>;
}

export const GoogleLongrunningListOperationsResponse: Schema.Schema<GoogleLongrunningListOperationsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      nextPageToken: Schema.optional(Schema.String),
      unreachable: Schema.optional(Schema.Array(Schema.String)),
      operations: Schema.optional(Schema.Array(GoogleLongrunningOperation)),
    }),
  ).annotate({
    identifier: "GoogleLongrunningListOperationsResponse",
  }) as any as Schema.Schema<GoogleLongrunningListOperationsResponse>;

export interface GoogleCloudDatalabelingV1alpha1ImportDataOperationResponse {
  /** Ouptut only. The name of imported dataset. */
  dataset?: string;
  /** Output only. Total number of examples requested to import */
  totalCount?: number;
  /** Output only. Number of examples imported successfully. */
  importCount?: number;
}

export const GoogleCloudDatalabelingV1alpha1ImportDataOperationResponse: Schema.Schema<GoogleCloudDatalabelingV1alpha1ImportDataOperationResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      dataset: Schema.optional(Schema.String),
      totalCount: Schema.optional(Schema.Number),
      importCount: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "GoogleCloudDatalabelingV1alpha1ImportDataOperationResponse",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1alpha1ImportDataOperationResponse>;

export interface GoogleCloudDatalabelingV1p1alpha1LabelImageBoundingBoxOperationMetadata {
  /** Basic human annotation config used in labeling request. */
  basicConfig?: GoogleCloudDatalabelingV1p1alpha1HumanAnnotationConfig;
}

export const GoogleCloudDatalabelingV1p1alpha1LabelImageBoundingBoxOperationMetadata: Schema.Schema<GoogleCloudDatalabelingV1p1alpha1LabelImageBoundingBoxOperationMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      basicConfig: Schema.optional(
        GoogleCloudDatalabelingV1p1alpha1HumanAnnotationConfig,
      ),
    }),
  ).annotate({
    identifier:
      "GoogleCloudDatalabelingV1p1alpha1LabelImageBoundingBoxOperationMetadata",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1p1alpha1LabelImageBoundingBoxOperationMetadata>;

export interface GoogleCloudDatalabelingV1beta1ListExamplesResponse {
  /** The list of examples to return. */
  examples?: Array<GoogleCloudDatalabelingV1beta1Example>;
  /** A token to retrieve next page of results. */
  nextPageToken?: string;
}

export const GoogleCloudDatalabelingV1beta1ListExamplesResponse: Schema.Schema<GoogleCloudDatalabelingV1beta1ListExamplesResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      examples: Schema.optional(
        Schema.Array(GoogleCloudDatalabelingV1beta1Example),
      ),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDatalabelingV1beta1ListExamplesResponse",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1beta1ListExamplesResponse>;

export interface GoogleCloudDatalabelingV1p2alpha1LabelImageOrientedBoundingBoxOperationMetadata {
  /** Basic human annotation config. */
  basicConfig?: GoogleCloudDatalabelingV1p2alpha1HumanAnnotationConfig;
}

export const GoogleCloudDatalabelingV1p2alpha1LabelImageOrientedBoundingBoxOperationMetadata: Schema.Schema<GoogleCloudDatalabelingV1p2alpha1LabelImageOrientedBoundingBoxOperationMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      basicConfig: Schema.optional(
        GoogleCloudDatalabelingV1p2alpha1HumanAnnotationConfig,
      ),
    }),
  ).annotate({
    identifier:
      "GoogleCloudDatalabelingV1p2alpha1LabelImageOrientedBoundingBoxOperationMetadata",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1p2alpha1LabelImageOrientedBoundingBoxOperationMetadata>;

export interface GoogleCloudDatalabelingV1p2alpha1LabelImageBoundingBoxOperationMetadata {
  /** Basic human annotation config used in labeling request. */
  basicConfig?: GoogleCloudDatalabelingV1p2alpha1HumanAnnotationConfig;
}

export const GoogleCloudDatalabelingV1p2alpha1LabelImageBoundingBoxOperationMetadata: Schema.Schema<GoogleCloudDatalabelingV1p2alpha1LabelImageBoundingBoxOperationMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      basicConfig: Schema.optional(
        GoogleCloudDatalabelingV1p2alpha1HumanAnnotationConfig,
      ),
    }),
  ).annotate({
    identifier:
      "GoogleCloudDatalabelingV1p2alpha1LabelImageBoundingBoxOperationMetadata",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1p2alpha1LabelImageBoundingBoxOperationMetadata>;

export interface GoogleCloudDatalabelingV1p2alpha1LabelImagePolylineOperationMetadata {
  /** Basic human annotation config used in labeling request. */
  basicConfig?: GoogleCloudDatalabelingV1p2alpha1HumanAnnotationConfig;
}

export const GoogleCloudDatalabelingV1p2alpha1LabelImagePolylineOperationMetadata: Schema.Schema<GoogleCloudDatalabelingV1p2alpha1LabelImagePolylineOperationMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      basicConfig: Schema.optional(
        GoogleCloudDatalabelingV1p2alpha1HumanAnnotationConfig,
      ),
    }),
  ).annotate({
    identifier:
      "GoogleCloudDatalabelingV1p2alpha1LabelImagePolylineOperationMetadata",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1p2alpha1LabelImagePolylineOperationMetadata>;

export interface GoogleCloudDatalabelingV1p2alpha1LabelImageClassificationOperationMetadata {
  /** Basic human annotation config used in labeling request. */
  basicConfig?: GoogleCloudDatalabelingV1p2alpha1HumanAnnotationConfig;
}

export const GoogleCloudDatalabelingV1p2alpha1LabelImageClassificationOperationMetadata: Schema.Schema<GoogleCloudDatalabelingV1p2alpha1LabelImageClassificationOperationMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      basicConfig: Schema.optional(
        GoogleCloudDatalabelingV1p2alpha1HumanAnnotationConfig,
      ),
    }),
  ).annotate({
    identifier:
      "GoogleCloudDatalabelingV1p2alpha1LabelImageClassificationOperationMetadata",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1p2alpha1LabelImageClassificationOperationMetadata>;

export interface GoogleCloudDatalabelingV1p2alpha1LabelTextClassificationOperationMetadata {
  /** Basic human annotation config used in labeling request. */
  basicConfig?: GoogleCloudDatalabelingV1p2alpha1HumanAnnotationConfig;
}

export const GoogleCloudDatalabelingV1p2alpha1LabelTextClassificationOperationMetadata: Schema.Schema<GoogleCloudDatalabelingV1p2alpha1LabelTextClassificationOperationMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      basicConfig: Schema.optional(
        GoogleCloudDatalabelingV1p2alpha1HumanAnnotationConfig,
      ),
    }),
  ).annotate({
    identifier:
      "GoogleCloudDatalabelingV1p2alpha1LabelTextClassificationOperationMetadata",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1p2alpha1LabelTextClassificationOperationMetadata>;

export interface GoogleCloudDatalabelingV1p2alpha1LabelOperationMetadata {
  /** Output only. Partial failures encountered. E.g. single files that couldn't be read. Status details field will contain standard GCP error details. */
  partialFailures?: Array<GoogleRpcStatus>;
  /** Details of label image segmentation operation. */
  imageSegmentationDetails?: GoogleCloudDatalabelingV1p2alpha1LabelImageSegmentationOperationMetadata;
  /** Details of label image bounding poly operation. */
  imageBoundingPolyDetails?: GoogleCloudDatalabelingV1p2alpha1LabelImageBoundingPolyOperationMetadata;
  /** Details of label video object detection operation. */
  videoObjectDetectionDetails?: GoogleCloudDatalabelingV1p2alpha1LabelVideoObjectDetectionOperationMetadata;
  /** Details of label video object tracking operation. */
  videoObjectTrackingDetails?: GoogleCloudDatalabelingV1p2alpha1LabelVideoObjectTrackingOperationMetadata;
  /** Details of label video classification operation. */
  videoClassificationDetails?: GoogleCloudDatalabelingV1p2alpha1LabelVideoClassificationOperationMetadata;
  /** Details of label image bounding box operation. */
  imageBoundingBoxDetails?: GoogleCloudDatalabelingV1p2alpha1LabelImageBoundingBoxOperationMetadata;
  /** Output only. The name of annotated dataset in format "projects/* /datasets/* /annotatedDatasets/*". */
  annotatedDataset?: string;
  /** Output only. The name of dataset to be labeled. "projects/* /datasets/*" */
  dataset?: string;
  /** Details of label image polyline operation. */
  imagePolylineDetails?: GoogleCloudDatalabelingV1p2alpha1LabelImagePolylineOperationMetadata;
  /** Output only. Progress of label operation. Range: [0, 100]. */
  progressPercent?: number;
  /** Details of label image oriented bounding box operation. */
  imageOrientedBoundingBoxDetails?: GoogleCloudDatalabelingV1p2alpha1LabelImageOrientedBoundingBoxOperationMetadata;
  /** Output only. Timestamp when labeling request was created. */
  createTime?: string;
  /** Details of label video event operation. */
  videoEventDetails?: GoogleCloudDatalabelingV1p2alpha1LabelVideoEventOperationMetadata;
  /** Details of label image classification operation. */
  imageClassificationDetails?: GoogleCloudDatalabelingV1p2alpha1LabelImageClassificationOperationMetadata;
  /** Details of label text entity extraction operation. */
  textEntityExtractionDetails?: GoogleCloudDatalabelingV1p2alpha1LabelTextEntityExtractionOperationMetadata;
  /** Details of label text classification operation. */
  textClassificationDetails?: GoogleCloudDatalabelingV1p2alpha1LabelTextClassificationOperationMetadata;
}

export const GoogleCloudDatalabelingV1p2alpha1LabelOperationMetadata: Schema.Schema<GoogleCloudDatalabelingV1p2alpha1LabelOperationMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      partialFailures: Schema.optional(Schema.Array(GoogleRpcStatus)),
      imageSegmentationDetails: Schema.optional(
        GoogleCloudDatalabelingV1p2alpha1LabelImageSegmentationOperationMetadata,
      ),
      imageBoundingPolyDetails: Schema.optional(
        GoogleCloudDatalabelingV1p2alpha1LabelImageBoundingPolyOperationMetadata,
      ),
      videoObjectDetectionDetails: Schema.optional(
        GoogleCloudDatalabelingV1p2alpha1LabelVideoObjectDetectionOperationMetadata,
      ),
      videoObjectTrackingDetails: Schema.optional(
        GoogleCloudDatalabelingV1p2alpha1LabelVideoObjectTrackingOperationMetadata,
      ),
      videoClassificationDetails: Schema.optional(
        GoogleCloudDatalabelingV1p2alpha1LabelVideoClassificationOperationMetadata,
      ),
      imageBoundingBoxDetails: Schema.optional(
        GoogleCloudDatalabelingV1p2alpha1LabelImageBoundingBoxOperationMetadata,
      ),
      annotatedDataset: Schema.optional(Schema.String),
      dataset: Schema.optional(Schema.String),
      imagePolylineDetails: Schema.optional(
        GoogleCloudDatalabelingV1p2alpha1LabelImagePolylineOperationMetadata,
      ),
      progressPercent: Schema.optional(Schema.Number),
      imageOrientedBoundingBoxDetails: Schema.optional(
        GoogleCloudDatalabelingV1p2alpha1LabelImageOrientedBoundingBoxOperationMetadata,
      ),
      createTime: Schema.optional(Schema.String),
      videoEventDetails: Schema.optional(
        GoogleCloudDatalabelingV1p2alpha1LabelVideoEventOperationMetadata,
      ),
      imageClassificationDetails: Schema.optional(
        GoogleCloudDatalabelingV1p2alpha1LabelImageClassificationOperationMetadata,
      ),
      textEntityExtractionDetails: Schema.optional(
        GoogleCloudDatalabelingV1p2alpha1LabelTextEntityExtractionOperationMetadata,
      ),
      textClassificationDetails: Schema.optional(
        GoogleCloudDatalabelingV1p2alpha1LabelTextClassificationOperationMetadata,
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDatalabelingV1p2alpha1LabelOperationMetadata",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1p2alpha1LabelOperationMetadata>;

export interface GoogleCloudDatalabelingV1alpha1LabelVideoObjectDetectionOperationMetadata {
  /** Basic human annotation config used in labeling request. */
  basicConfig?: GoogleCloudDatalabelingV1alpha1HumanAnnotationConfig;
}

export const GoogleCloudDatalabelingV1alpha1LabelVideoObjectDetectionOperationMetadata: Schema.Schema<GoogleCloudDatalabelingV1alpha1LabelVideoObjectDetectionOperationMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      basicConfig: Schema.optional(
        GoogleCloudDatalabelingV1alpha1HumanAnnotationConfig,
      ),
    }),
  ).annotate({
    identifier:
      "GoogleCloudDatalabelingV1alpha1LabelVideoObjectDetectionOperationMetadata",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1alpha1LabelVideoObjectDetectionOperationMetadata>;

export interface GoogleCloudDatalabelingV1beta1SearchEvaluationsResponse {
  /** The list of evaluations matching the search. */
  evaluations?: Array<GoogleCloudDatalabelingV1beta1Evaluation>;
  /** A token to retrieve next page of results. */
  nextPageToken?: string;
}

export const GoogleCloudDatalabelingV1beta1SearchEvaluationsResponse: Schema.Schema<GoogleCloudDatalabelingV1beta1SearchEvaluationsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      evaluations: Schema.optional(
        Schema.Array(GoogleCloudDatalabelingV1beta1Evaluation),
      ),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDatalabelingV1beta1SearchEvaluationsResponse",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1beta1SearchEvaluationsResponse>;

export interface GoogleCloudDatalabelingV1beta1ExportDataOperationMetadata {
  /** Output only. The name of annotated dataset in format "projects/* /datasets/* /annotatedDatasets/*". */
  annotatedDataset?: string;
  /** Output only. Timestamp when export dataset request was created. */
  createTime?: string;
  /** Output only. The name of dataset to be exported. "projects/* /datasets/*" */
  dataset?: string;
  /** Output only. Partial failures encountered. E.g. single files that couldn't be read. Status details field will contain standard GCP error details. */
  partialFailures?: Array<GoogleRpcStatus>;
}

export const GoogleCloudDatalabelingV1beta1ExportDataOperationMetadata: Schema.Schema<GoogleCloudDatalabelingV1beta1ExportDataOperationMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      annotatedDataset: Schema.optional(Schema.String),
      createTime: Schema.optional(Schema.String),
      dataset: Schema.optional(Schema.String),
      partialFailures: Schema.optional(Schema.Array(GoogleRpcStatus)),
    }),
  ).annotate({
    identifier: "GoogleCloudDatalabelingV1beta1ExportDataOperationMetadata",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1beta1ExportDataOperationMetadata>;

export interface GoogleCloudDatalabelingV1beta1ExportDataOperationResponse {
  /** Ouptut only. The name of dataset. "projects/* /datasets/*" */
  dataset?: string;
  /** Output only. Number of examples exported successfully. */
  exportCount?: number;
  /** Output only. The name of annotated dataset in format "projects/* /datasets/* /annotatedDatasets/*". */
  annotatedDataset?: string;
  /** Output only. output_config in the ExportData request. */
  outputConfig?: GoogleCloudDatalabelingV1beta1OutputConfig;
  /** Output only. Total number of examples requested to export */
  totalCount?: number;
  /** Output only. Statistic infos of labels in the exported dataset. */
  labelStats?: GoogleCloudDatalabelingV1beta1LabelStats;
}

export const GoogleCloudDatalabelingV1beta1ExportDataOperationResponse: Schema.Schema<GoogleCloudDatalabelingV1beta1ExportDataOperationResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      dataset: Schema.optional(Schema.String),
      exportCount: Schema.optional(Schema.Number),
      annotatedDataset: Schema.optional(Schema.String),
      outputConfig: Schema.optional(GoogleCloudDatalabelingV1beta1OutputConfig),
      totalCount: Schema.optional(Schema.Number),
      labelStats: Schema.optional(GoogleCloudDatalabelingV1beta1LabelStats),
    }),
  ).annotate({
    identifier: "GoogleCloudDatalabelingV1beta1ExportDataOperationResponse",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1beta1ExportDataOperationResponse>;

export interface GoogleCloudDatalabelingV1alpha1LabelStats {
  /** Map of each annotation spec's example count. Key is the annotation spec name and value is the number of examples for that annotation spec. If the annotated dataset does not have annotation spec, the map will return a pair where the key is empty string and value is the total number of annotations. */
  exampleCount?: Record<string, string>;
}

export const GoogleCloudDatalabelingV1alpha1LabelStats: Schema.Schema<GoogleCloudDatalabelingV1alpha1LabelStats> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      exampleCount: Schema.optional(
        Schema.Record(Schema.String, Schema.String),
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDatalabelingV1alpha1LabelStats",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1alpha1LabelStats>;

export interface GoogleCloudDatalabelingV1p1alpha1LabelVideoEventOperationMetadata {
  /** Basic human annotation config used in labeling request. */
  basicConfig?: GoogleCloudDatalabelingV1p1alpha1HumanAnnotationConfig;
}

export const GoogleCloudDatalabelingV1p1alpha1LabelVideoEventOperationMetadata: Schema.Schema<GoogleCloudDatalabelingV1p1alpha1LabelVideoEventOperationMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      basicConfig: Schema.optional(
        GoogleCloudDatalabelingV1p1alpha1HumanAnnotationConfig,
      ),
    }),
  ).annotate({
    identifier:
      "GoogleCloudDatalabelingV1p1alpha1LabelVideoEventOperationMetadata",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1p1alpha1LabelVideoEventOperationMetadata>;

export interface GoogleCloudDatalabelingV1beta1LabelVideoClassificationOperationMetadata {
  /** Basic human annotation config used in labeling request. */
  basicConfig?: GoogleCloudDatalabelingV1beta1HumanAnnotationConfig;
}

export const GoogleCloudDatalabelingV1beta1LabelVideoClassificationOperationMetadata: Schema.Schema<GoogleCloudDatalabelingV1beta1LabelVideoClassificationOperationMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      basicConfig: Schema.optional(
        GoogleCloudDatalabelingV1beta1HumanAnnotationConfig,
      ),
    }),
  ).annotate({
    identifier:
      "GoogleCloudDatalabelingV1beta1LabelVideoClassificationOperationMetadata",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1beta1LabelVideoClassificationOperationMetadata>;

export interface GoogleCloudDatalabelingV1alpha1LabelTextClassificationOperationMetadata {
  /** Basic human annotation config used in labeling request. */
  basicConfig?: GoogleCloudDatalabelingV1alpha1HumanAnnotationConfig;
}

export const GoogleCloudDatalabelingV1alpha1LabelTextClassificationOperationMetadata: Schema.Schema<GoogleCloudDatalabelingV1alpha1LabelTextClassificationOperationMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      basicConfig: Schema.optional(
        GoogleCloudDatalabelingV1alpha1HumanAnnotationConfig,
      ),
    }),
  ).annotate({
    identifier:
      "GoogleCloudDatalabelingV1alpha1LabelTextClassificationOperationMetadata",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1alpha1LabelTextClassificationOperationMetadata>;

export interface GoogleCloudDatalabelingV1alpha1LabelVideoClassificationOperationMetadata {
  /** Basic human annotation config used in labeling request. */
  basicConfig?: GoogleCloudDatalabelingV1alpha1HumanAnnotationConfig;
}

export const GoogleCloudDatalabelingV1alpha1LabelVideoClassificationOperationMetadata: Schema.Schema<GoogleCloudDatalabelingV1alpha1LabelVideoClassificationOperationMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      basicConfig: Schema.optional(
        GoogleCloudDatalabelingV1alpha1HumanAnnotationConfig,
      ),
    }),
  ).annotate({
    identifier:
      "GoogleCloudDatalabelingV1alpha1LabelVideoClassificationOperationMetadata",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1alpha1LabelVideoClassificationOperationMetadata>;

export interface GoogleCloudDatalabelingV1alpha1LabelImageSegmentationOperationMetadata {
  /** Basic human annotation config. */
  basicConfig?: GoogleCloudDatalabelingV1alpha1HumanAnnotationConfig;
}

export const GoogleCloudDatalabelingV1alpha1LabelImageSegmentationOperationMetadata: Schema.Schema<GoogleCloudDatalabelingV1alpha1LabelImageSegmentationOperationMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      basicConfig: Schema.optional(
        GoogleCloudDatalabelingV1alpha1HumanAnnotationConfig,
      ),
    }),
  ).annotate({
    identifier:
      "GoogleCloudDatalabelingV1alpha1LabelImageSegmentationOperationMetadata",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1alpha1LabelImageSegmentationOperationMetadata>;

export interface GoogleCloudDatalabelingV1alpha1LabelVideoObjectTrackingOperationMetadata {
  /** Basic human annotation config used in labeling request. */
  basicConfig?: GoogleCloudDatalabelingV1alpha1HumanAnnotationConfig;
}

export const GoogleCloudDatalabelingV1alpha1LabelVideoObjectTrackingOperationMetadata: Schema.Schema<GoogleCloudDatalabelingV1alpha1LabelVideoObjectTrackingOperationMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      basicConfig: Schema.optional(
        GoogleCloudDatalabelingV1alpha1HumanAnnotationConfig,
      ),
    }),
  ).annotate({
    identifier:
      "GoogleCloudDatalabelingV1alpha1LabelVideoObjectTrackingOperationMetadata",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1alpha1LabelVideoObjectTrackingOperationMetadata>;

export interface GoogleCloudDatalabelingV1alpha1LabelImageBoundingBoxOperationMetadata {
  /** Basic human annotation config used in labeling request. */
  basicConfig?: GoogleCloudDatalabelingV1alpha1HumanAnnotationConfig;
}

export const GoogleCloudDatalabelingV1alpha1LabelImageBoundingBoxOperationMetadata: Schema.Schema<GoogleCloudDatalabelingV1alpha1LabelImageBoundingBoxOperationMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      basicConfig: Schema.optional(
        GoogleCloudDatalabelingV1alpha1HumanAnnotationConfig,
      ),
    }),
  ).annotate({
    identifier:
      "GoogleCloudDatalabelingV1alpha1LabelImageBoundingBoxOperationMetadata",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1alpha1LabelImageBoundingBoxOperationMetadata>;

export interface GoogleCloudDatalabelingV1alpha1LabelOperationMetadata {
  /** Details of label text classification operation. */
  textClassificationDetails?: GoogleCloudDatalabelingV1alpha1LabelTextClassificationOperationMetadata;
  /** Output only. The name of dataset to be labeled. "projects/* /datasets/*" */
  dataset?: string;
  /** Details of label image classification operation. */
  imageClassificationDetails?: GoogleCloudDatalabelingV1alpha1LabelImageClassificationOperationMetadata;
  /** Details of label video event operation. */
  videoEventDetails?: GoogleCloudDatalabelingV1alpha1LabelVideoEventOperationMetadata;
  /** Output only. Progress of label operation. Range: [0, 100]. */
  progressPercent?: number;
  /** Details of label image bounding poly operation. */
  imageBoundingPolyDetails?: GoogleCloudDatalabelingV1alpha1LabelImageBoundingPolyOperationMetadata;
  /** Output only. The name of annotated dataset in format "projects/* /datasets/* /annotatedDatasets/*". */
  annotatedDataset?: string;
  /** Details of label video classification operation. */
  videoClassificationDetails?: GoogleCloudDatalabelingV1alpha1LabelVideoClassificationOperationMetadata;
  /** Details of label video object detection operation. */
  videoObjectDetectionDetails?: GoogleCloudDatalabelingV1alpha1LabelVideoObjectDetectionOperationMetadata;
  /** Details of label image segmentation operation. */
  imageSegmentationDetails?: GoogleCloudDatalabelingV1alpha1LabelImageSegmentationOperationMetadata;
  /** Details of label video object tracking operation. */
  videoObjectTrackingDetails?: GoogleCloudDatalabelingV1alpha1LabelVideoObjectTrackingOperationMetadata;
  /** Details of label text entity extraction operation. */
  textEntityExtractionDetails?: GoogleCloudDatalabelingV1alpha1LabelTextEntityExtractionOperationMetadata;
  /** Details of label image polyline operation. */
  imagePolylineDetails?: GoogleCloudDatalabelingV1alpha1LabelImagePolylineOperationMetadata;
  /** Output only. Timestamp when labeling request was created. */
  createTime?: string;
  /** Output only. Partial failures encountered. E.g. single files that couldn't be read. Status details field will contain standard GCP error details. */
  partialFailures?: Array<GoogleRpcStatus>;
  /** Details of label image oriented bounding box operation. */
  imageOrientedBoundingBoxDetails?: GoogleCloudDatalabelingV1alpha1LabelImageOrientedBoundingBoxOperationMetadata;
  /** Details of label image bounding box operation. */
  imageBoundingBoxDetails?: GoogleCloudDatalabelingV1alpha1LabelImageBoundingBoxOperationMetadata;
}

export const GoogleCloudDatalabelingV1alpha1LabelOperationMetadata: Schema.Schema<GoogleCloudDatalabelingV1alpha1LabelOperationMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      textClassificationDetails: Schema.optional(
        GoogleCloudDatalabelingV1alpha1LabelTextClassificationOperationMetadata,
      ),
      dataset: Schema.optional(Schema.String),
      imageClassificationDetails: Schema.optional(
        GoogleCloudDatalabelingV1alpha1LabelImageClassificationOperationMetadata,
      ),
      videoEventDetails: Schema.optional(
        GoogleCloudDatalabelingV1alpha1LabelVideoEventOperationMetadata,
      ),
      progressPercent: Schema.optional(Schema.Number),
      imageBoundingPolyDetails: Schema.optional(
        GoogleCloudDatalabelingV1alpha1LabelImageBoundingPolyOperationMetadata,
      ),
      annotatedDataset: Schema.optional(Schema.String),
      videoClassificationDetails: Schema.optional(
        GoogleCloudDatalabelingV1alpha1LabelVideoClassificationOperationMetadata,
      ),
      videoObjectDetectionDetails: Schema.optional(
        GoogleCloudDatalabelingV1alpha1LabelVideoObjectDetectionOperationMetadata,
      ),
      imageSegmentationDetails: Schema.optional(
        GoogleCloudDatalabelingV1alpha1LabelImageSegmentationOperationMetadata,
      ),
      videoObjectTrackingDetails: Schema.optional(
        GoogleCloudDatalabelingV1alpha1LabelVideoObjectTrackingOperationMetadata,
      ),
      textEntityExtractionDetails: Schema.optional(
        GoogleCloudDatalabelingV1alpha1LabelTextEntityExtractionOperationMetadata,
      ),
      imagePolylineDetails: Schema.optional(
        GoogleCloudDatalabelingV1alpha1LabelImagePolylineOperationMetadata,
      ),
      createTime: Schema.optional(Schema.String),
      partialFailures: Schema.optional(Schema.Array(GoogleRpcStatus)),
      imageOrientedBoundingBoxDetails: Schema.optional(
        GoogleCloudDatalabelingV1alpha1LabelImageOrientedBoundingBoxOperationMetadata,
      ),
      imageBoundingBoxDetails: Schema.optional(
        GoogleCloudDatalabelingV1alpha1LabelImageBoundingBoxOperationMetadata,
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDatalabelingV1alpha1LabelOperationMetadata",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1alpha1LabelOperationMetadata>;

export interface GoogleCloudDatalabelingV1p1alpha1LabelVideoObjectTrackingOperationMetadata {
  /** Basic human annotation config used in labeling request. */
  basicConfig?: GoogleCloudDatalabelingV1p1alpha1HumanAnnotationConfig;
}

export const GoogleCloudDatalabelingV1p1alpha1LabelVideoObjectTrackingOperationMetadata: Schema.Schema<GoogleCloudDatalabelingV1p1alpha1LabelVideoObjectTrackingOperationMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      basicConfig: Schema.optional(
        GoogleCloudDatalabelingV1p1alpha1HumanAnnotationConfig,
      ),
    }),
  ).annotate({
    identifier:
      "GoogleCloudDatalabelingV1p1alpha1LabelVideoObjectTrackingOperationMetadata",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1p1alpha1LabelVideoObjectTrackingOperationMetadata>;

export interface GoogleCloudDatalabelingV1p1alpha1LabelImageClassificationOperationMetadata {
  /** Basic human annotation config used in labeling request. */
  basicConfig?: GoogleCloudDatalabelingV1p1alpha1HumanAnnotationConfig;
}

export const GoogleCloudDatalabelingV1p1alpha1LabelImageClassificationOperationMetadata: Schema.Schema<GoogleCloudDatalabelingV1p1alpha1LabelImageClassificationOperationMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      basicConfig: Schema.optional(
        GoogleCloudDatalabelingV1p1alpha1HumanAnnotationConfig,
      ),
    }),
  ).annotate({
    identifier:
      "GoogleCloudDatalabelingV1p1alpha1LabelImageClassificationOperationMetadata",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1p1alpha1LabelImageClassificationOperationMetadata>;

export interface GoogleCloudDatalabelingV1p1alpha1LabelVideoClassificationOperationMetadata {
  /** Basic human annotation config used in labeling request. */
  basicConfig?: GoogleCloudDatalabelingV1p1alpha1HumanAnnotationConfig;
}

export const GoogleCloudDatalabelingV1p1alpha1LabelVideoClassificationOperationMetadata: Schema.Schema<GoogleCloudDatalabelingV1p1alpha1LabelVideoClassificationOperationMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      basicConfig: Schema.optional(
        GoogleCloudDatalabelingV1p1alpha1HumanAnnotationConfig,
      ),
    }),
  ).annotate({
    identifier:
      "GoogleCloudDatalabelingV1p1alpha1LabelVideoClassificationOperationMetadata",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1p1alpha1LabelVideoClassificationOperationMetadata>;

export interface GoogleCloudDatalabelingV1p1alpha1LabelImageBoundingPolyOperationMetadata {
  /** Basic human annotation config used in labeling request. */
  basicConfig?: GoogleCloudDatalabelingV1p1alpha1HumanAnnotationConfig;
}

export const GoogleCloudDatalabelingV1p1alpha1LabelImageBoundingPolyOperationMetadata: Schema.Schema<GoogleCloudDatalabelingV1p1alpha1LabelImageBoundingPolyOperationMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      basicConfig: Schema.optional(
        GoogleCloudDatalabelingV1p1alpha1HumanAnnotationConfig,
      ),
    }),
  ).annotate({
    identifier:
      "GoogleCloudDatalabelingV1p1alpha1LabelImageBoundingPolyOperationMetadata",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1p1alpha1LabelImageBoundingPolyOperationMetadata>;

export interface GoogleCloudDatalabelingV1p1alpha1LabelTextClassificationOperationMetadata {
  /** Basic human annotation config used in labeling request. */
  basicConfig?: GoogleCloudDatalabelingV1p1alpha1HumanAnnotationConfig;
}

export const GoogleCloudDatalabelingV1p1alpha1LabelTextClassificationOperationMetadata: Schema.Schema<GoogleCloudDatalabelingV1p1alpha1LabelTextClassificationOperationMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      basicConfig: Schema.optional(
        GoogleCloudDatalabelingV1p1alpha1HumanAnnotationConfig,
      ),
    }),
  ).annotate({
    identifier:
      "GoogleCloudDatalabelingV1p1alpha1LabelTextClassificationOperationMetadata",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1p1alpha1LabelTextClassificationOperationMetadata>;

export interface GoogleCloudDatalabelingV1p1alpha1LabelOperationMetadata {
  /** Details of label video object tracking operation. */
  videoObjectTrackingDetails?: GoogleCloudDatalabelingV1p1alpha1LabelVideoObjectTrackingOperationMetadata;
  /** Details of label image bounding box operation. */
  imageBoundingBoxDetails?: GoogleCloudDatalabelingV1p1alpha1LabelImageBoundingBoxOperationMetadata;
  /** Details of label video object detection operation. */
  videoObjectDetectionDetails?: GoogleCloudDatalabelingV1p1alpha1LabelVideoObjectDetectionOperationMetadata;
  /** Output only. Partial failures encountered. E.g. single files that couldn't be read. Status details field will contain standard GCP error details. */
  partialFailures?: Array<GoogleRpcStatus>;
  /** Details of label image polyline operation. */
  imagePolylineDetails?: GoogleCloudDatalabelingV1p1alpha1LabelImagePolylineOperationMetadata;
  /** Details of label image classification operation. */
  imageClassificationDetails?: GoogleCloudDatalabelingV1p1alpha1LabelImageClassificationOperationMetadata;
  /** Output only. Progress of label operation. Range: [0, 100]. */
  progressPercent?: number;
  /** Output only. The name of dataset to be labeled. "projects/* /datasets/*" */
  dataset?: string;
  /** Output only. The name of annotated dataset in format "projects/* /datasets/* /annotatedDatasets/*". */
  annotatedDataset?: string;
  /** Details of label image segmentation operation. */
  imageSegmentationDetails?: GoogleCloudDatalabelingV1p1alpha1LabelImageSegmentationOperationMetadata;
  /** Details of label video event operation. */
  videoEventDetails?: GoogleCloudDatalabelingV1p1alpha1LabelVideoEventOperationMetadata;
  /** Details of label text entity extraction operation. */
  textEntityExtractionDetails?: GoogleCloudDatalabelingV1p1alpha1LabelTextEntityExtractionOperationMetadata;
  /** Details of label video classification operation. */
  videoClassificationDetails?: GoogleCloudDatalabelingV1p1alpha1LabelVideoClassificationOperationMetadata;
  /** Details of label image bounding poly operation. */
  imageBoundingPolyDetails?: GoogleCloudDatalabelingV1p1alpha1LabelImageBoundingPolyOperationMetadata;
  /** Output only. Timestamp when labeling request was created. */
  createTime?: string;
  /** Details of label image oriented bounding box operation. */
  imageOrientedBoundingBoxDetails?: GoogleCloudDatalabelingV1p1alpha1LabelImageOrientedBoundingBoxOperationMetadata;
  /** Details of label text classification operation. */
  textClassificationDetails?: GoogleCloudDatalabelingV1p1alpha1LabelTextClassificationOperationMetadata;
}

export const GoogleCloudDatalabelingV1p1alpha1LabelOperationMetadata: Schema.Schema<GoogleCloudDatalabelingV1p1alpha1LabelOperationMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      videoObjectTrackingDetails: Schema.optional(
        GoogleCloudDatalabelingV1p1alpha1LabelVideoObjectTrackingOperationMetadata,
      ),
      imageBoundingBoxDetails: Schema.optional(
        GoogleCloudDatalabelingV1p1alpha1LabelImageBoundingBoxOperationMetadata,
      ),
      videoObjectDetectionDetails: Schema.optional(
        GoogleCloudDatalabelingV1p1alpha1LabelVideoObjectDetectionOperationMetadata,
      ),
      partialFailures: Schema.optional(Schema.Array(GoogleRpcStatus)),
      imagePolylineDetails: Schema.optional(
        GoogleCloudDatalabelingV1p1alpha1LabelImagePolylineOperationMetadata,
      ),
      imageClassificationDetails: Schema.optional(
        GoogleCloudDatalabelingV1p1alpha1LabelImageClassificationOperationMetadata,
      ),
      progressPercent: Schema.optional(Schema.Number),
      dataset: Schema.optional(Schema.String),
      annotatedDataset: Schema.optional(Schema.String),
      imageSegmentationDetails: Schema.optional(
        GoogleCloudDatalabelingV1p1alpha1LabelImageSegmentationOperationMetadata,
      ),
      videoEventDetails: Schema.optional(
        GoogleCloudDatalabelingV1p1alpha1LabelVideoEventOperationMetadata,
      ),
      textEntityExtractionDetails: Schema.optional(
        GoogleCloudDatalabelingV1p1alpha1LabelTextEntityExtractionOperationMetadata,
      ),
      videoClassificationDetails: Schema.optional(
        GoogleCloudDatalabelingV1p1alpha1LabelVideoClassificationOperationMetadata,
      ),
      imageBoundingPolyDetails: Schema.optional(
        GoogleCloudDatalabelingV1p1alpha1LabelImageBoundingPolyOperationMetadata,
      ),
      createTime: Schema.optional(Schema.String),
      imageOrientedBoundingBoxDetails: Schema.optional(
        GoogleCloudDatalabelingV1p1alpha1LabelImageOrientedBoundingBoxOperationMetadata,
      ),
      textClassificationDetails: Schema.optional(
        GoogleCloudDatalabelingV1p1alpha1LabelTextClassificationOperationMetadata,
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDatalabelingV1p1alpha1LabelOperationMetadata",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1p1alpha1LabelOperationMetadata>;

export interface GoogleCloudDatalabelingV1alpha1ExportDataOperationResponse {
  /** Output only. Statistic infos of labels in the exported dataset. */
  labelStats?: GoogleCloudDatalabelingV1alpha1LabelStats;
  /** Output only. Total number of examples requested to export */
  totalCount?: number;
  /** Output only. output_config in the ExportData request. */
  outputConfig?: GoogleCloudDatalabelingV1alpha1OutputConfig;
  /** Output only. The name of annotated dataset in format "projects/* /datasets/* /annotatedDatasets/*". */
  annotatedDataset?: string;
  /** Output only. Number of examples exported successfully. */
  exportCount?: number;
  /** Ouptut only. The name of dataset. "projects/* /datasets/*" */
  dataset?: string;
}

export const GoogleCloudDatalabelingV1alpha1ExportDataOperationResponse: Schema.Schema<GoogleCloudDatalabelingV1alpha1ExportDataOperationResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      labelStats: Schema.optional(GoogleCloudDatalabelingV1alpha1LabelStats),
      totalCount: Schema.optional(Schema.Number),
      outputConfig: Schema.optional(
        GoogleCloudDatalabelingV1alpha1OutputConfig,
      ),
      annotatedDataset: Schema.optional(Schema.String),
      exportCount: Schema.optional(Schema.Number),
      dataset: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDatalabelingV1alpha1ExportDataOperationResponse",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1alpha1ExportDataOperationResponse>;

export interface GoogleCloudDatalabelingV1p1alpha1ExportDataOperationMetadata {
  /** Output only. The name of dataset to be exported. "projects/* /datasets/*" */
  dataset?: string;
  /** Output only. The name of annotated dataset in format "projects/* /datasets/* /annotatedDatasets/*". */
  annotatedDataset?: string;
  /** Output only. Timestamp when export dataset request was created. */
  createTime?: string;
  /** Output only. Partial failures encountered. E.g. single files that couldn't be read. Status details field will contain standard GCP error details. */
  partialFailures?: Array<GoogleRpcStatus>;
}

export const GoogleCloudDatalabelingV1p1alpha1ExportDataOperationMetadata: Schema.Schema<GoogleCloudDatalabelingV1p1alpha1ExportDataOperationMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      dataset: Schema.optional(Schema.String),
      annotatedDataset: Schema.optional(Schema.String),
      createTime: Schema.optional(Schema.String),
      partialFailures: Schema.optional(Schema.Array(GoogleRpcStatus)),
    }),
  ).annotate({
    identifier: "GoogleCloudDatalabelingV1p1alpha1ExportDataOperationMetadata",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1p1alpha1ExportDataOperationMetadata>;

export interface GoogleCloudDatalabelingV1beta1LabelVideoObjectDetectionOperationMetadata {
  /** Basic human annotation config used in labeling request. */
  basicConfig?: GoogleCloudDatalabelingV1beta1HumanAnnotationConfig;
}

export const GoogleCloudDatalabelingV1beta1LabelVideoObjectDetectionOperationMetadata: Schema.Schema<GoogleCloudDatalabelingV1beta1LabelVideoObjectDetectionOperationMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      basicConfig: Schema.optional(
        GoogleCloudDatalabelingV1beta1HumanAnnotationConfig,
      ),
    }),
  ).annotate({
    identifier:
      "GoogleCloudDatalabelingV1beta1LabelVideoObjectDetectionOperationMetadata",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1beta1LabelVideoObjectDetectionOperationMetadata>;

export interface GoogleCloudDatalabelingV1p2alpha1ImportDataOperationResponse {
  /** Ouptut only. The name of imported dataset. */
  dataset?: string;
  /** Output only. Number of examples imported successfully. */
  importCount?: number;
  /** Output only. Total number of examples requested to import */
  totalCount?: number;
}

export const GoogleCloudDatalabelingV1p2alpha1ImportDataOperationResponse: Schema.Schema<GoogleCloudDatalabelingV1p2alpha1ImportDataOperationResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      dataset: Schema.optional(Schema.String),
      importCount: Schema.optional(Schema.Number),
      totalCount: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "GoogleCloudDatalabelingV1p2alpha1ImportDataOperationResponse",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1p2alpha1ImportDataOperationResponse>;

export interface GoogleCloudDatalabelingV1beta1CreateEvaluationJobRequest {
  /** Required. The evaluation job to create. */
  job?: GoogleCloudDatalabelingV1beta1EvaluationJob;
}

export const GoogleCloudDatalabelingV1beta1CreateEvaluationJobRequest: Schema.Schema<GoogleCloudDatalabelingV1beta1CreateEvaluationJobRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      job: Schema.optional(GoogleCloudDatalabelingV1beta1EvaluationJob),
    }),
  ).annotate({
    identifier: "GoogleCloudDatalabelingV1beta1CreateEvaluationJobRequest",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1beta1CreateEvaluationJobRequest>;

export interface GoogleCloudDatalabelingV1beta1CreateInstructionMetadata {
  /** Timestamp when create instruction request was created. */
  createTime?: string;
  /** Partial failures encountered. E.g. single files that couldn't be read. Status details field will contain standard GCP error details. */
  partialFailures?: Array<GoogleRpcStatus>;
  /** The name of the created Instruction. projects/{project_id}/instructions/{instruction_id} */
  instruction?: string;
}

export const GoogleCloudDatalabelingV1beta1CreateInstructionMetadata: Schema.Schema<GoogleCloudDatalabelingV1beta1CreateInstructionMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      createTime: Schema.optional(Schema.String),
      partialFailures: Schema.optional(Schema.Array(GoogleRpcStatus)),
      instruction: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDatalabelingV1beta1CreateInstructionMetadata",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1beta1CreateInstructionMetadata>;

export interface GoogleCloudDatalabelingV1beta1FeedbackMessage {
  requesterFeedbackMetadata?: GoogleCloudDatalabelingV1beta1RequesterFeedbackMetadata;
  /** String content of the feedback. Maximum of 10000 characters. */
  body?: string;
  /** The image storing this feedback if the feedback is an image representing operator's comments. */
  image?: string;
  /** Name of the feedback message in a feedback thread. Format: 'project/{project_id}/datasets/{dataset_id}/annotatedDatasets/{annotated_dataset_id}/feedbackThreads/{feedback_thread_id}/feedbackMessage/{feedback_message_id}' */
  name?: string;
  operatorFeedbackMetadata?: GoogleCloudDatalabelingV1beta1OperatorFeedbackMetadata;
  /** Create time. */
  createTime?: string;
}

export const GoogleCloudDatalabelingV1beta1FeedbackMessage: Schema.Schema<GoogleCloudDatalabelingV1beta1FeedbackMessage> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      requesterFeedbackMetadata: Schema.optional(
        GoogleCloudDatalabelingV1beta1RequesterFeedbackMetadata,
      ),
      body: Schema.optional(Schema.String),
      image: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
      operatorFeedbackMetadata: Schema.optional(
        GoogleCloudDatalabelingV1beta1OperatorFeedbackMetadata,
      ),
      createTime: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDatalabelingV1beta1FeedbackMessage",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1beta1FeedbackMessage>;

export interface GoogleCloudDatalabelingV1beta1ListFeedbackMessagesResponse {
  /** The list of feedback messages to return. */
  feedbackMessages?: Array<GoogleCloudDatalabelingV1beta1FeedbackMessage>;
  /** A token to retrieve next page of results. */
  nextPageToken?: string;
}

export const GoogleCloudDatalabelingV1beta1ListFeedbackMessagesResponse: Schema.Schema<GoogleCloudDatalabelingV1beta1ListFeedbackMessagesResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      feedbackMessages: Schema.optional(
        Schema.Array(GoogleCloudDatalabelingV1beta1FeedbackMessage),
      ),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDatalabelingV1beta1ListFeedbackMessagesResponse",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1beta1ListFeedbackMessagesResponse>;

export interface GoogleCloudDatalabelingV1beta1ResumeEvaluationJobRequest {}

export const GoogleCloudDatalabelingV1beta1ResumeEvaluationJobRequest: Schema.Schema<GoogleCloudDatalabelingV1beta1ResumeEvaluationJobRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "GoogleCloudDatalabelingV1beta1ResumeEvaluationJobRequest",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1beta1ResumeEvaluationJobRequest>;

export interface GoogleCloudDatalabelingV1alpha1CreateInstructionMetadata {
  /** Timestamp when create instruction request was created. */
  createTime?: string;
  /** The name of the created Instruction. projects/{project_id}/instructions/{instruction_id} */
  instruction?: string;
  /** Partial failures encountered. E.g. single files that couldn't be read. Status details field will contain standard GCP error details. */
  partialFailures?: Array<GoogleRpcStatus>;
}

export const GoogleCloudDatalabelingV1alpha1CreateInstructionMetadata: Schema.Schema<GoogleCloudDatalabelingV1alpha1CreateInstructionMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      createTime: Schema.optional(Schema.String),
      instruction: Schema.optional(Schema.String),
      partialFailures: Schema.optional(Schema.Array(GoogleRpcStatus)),
    }),
  ).annotate({
    identifier: "GoogleCloudDatalabelingV1alpha1CreateInstructionMetadata",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1alpha1CreateInstructionMetadata>;

export interface GoogleCloudDatalabelingV1beta1CreateAnnotationSpecSetRequest {
  /** Required. Annotation spec set to create. Annotation specs must be included. Only one annotation spec will be accepted for annotation specs with same display_name. */
  annotationSpecSet?: GoogleCloudDatalabelingV1beta1AnnotationSpecSet;
}

export const GoogleCloudDatalabelingV1beta1CreateAnnotationSpecSetRequest: Schema.Schema<GoogleCloudDatalabelingV1beta1CreateAnnotationSpecSetRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      annotationSpecSet: Schema.optional(
        GoogleCloudDatalabelingV1beta1AnnotationSpecSet,
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDatalabelingV1beta1CreateAnnotationSpecSetRequest",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1beta1CreateAnnotationSpecSetRequest>;

export interface GoogleCloudDatalabelingV1p2alpha1ExportDataOperationResponse {
  /** Ouptut only. The name of dataset. "projects/* /datasets/*" */
  dataset?: string;
  /** Output only. Total number of examples requested to export */
  totalCount?: number;
  /** Output only. Number of examples exported successfully. */
  exportCount?: number;
  /** Output only. The name of annotated dataset in format "projects/* /datasets/* /annotatedDatasets/*". */
  annotatedDataset?: string;
  /** Output only. output_config in the ExportData request. */
  outputConfig?: GoogleCloudDatalabelingV1p2alpha1OutputConfig;
  /** Output only. Statistic infos of labels in the exported dataset. */
  labelStats?: GoogleCloudDatalabelingV1p2alpha1LabelStats;
}

export const GoogleCloudDatalabelingV1p2alpha1ExportDataOperationResponse: Schema.Schema<GoogleCloudDatalabelingV1p2alpha1ExportDataOperationResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      dataset: Schema.optional(Schema.String),
      totalCount: Schema.optional(Schema.Number),
      exportCount: Schema.optional(Schema.Number),
      annotatedDataset: Schema.optional(Schema.String),
      outputConfig: Schema.optional(
        GoogleCloudDatalabelingV1p2alpha1OutputConfig,
      ),
      labelStats: Schema.optional(GoogleCloudDatalabelingV1p2alpha1LabelStats),
    }),
  ).annotate({
    identifier: "GoogleCloudDatalabelingV1p2alpha1ExportDataOperationResponse",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1p2alpha1ExportDataOperationResponse>;

export interface GoogleCloudDatalabelingV1alpha1ExportDataOperationMetadata {
  /** Output only. The name of dataset to be exported. "projects/* /datasets/*" */
  dataset?: string;
  /** Output only. Partial failures encountered. E.g. single files that couldn't be read. Status details field will contain standard GCP error details. */
  partialFailures?: Array<GoogleRpcStatus>;
  /** Output only. The name of annotated dataset in format "projects/* /datasets/* /annotatedDatasets/*". */
  annotatedDataset?: string;
  /** Output only. Timestamp when export dataset request was created. */
  createTime?: string;
}

export const GoogleCloudDatalabelingV1alpha1ExportDataOperationMetadata: Schema.Schema<GoogleCloudDatalabelingV1alpha1ExportDataOperationMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      dataset: Schema.optional(Schema.String),
      partialFailures: Schema.optional(Schema.Array(GoogleRpcStatus)),
      annotatedDataset: Schema.optional(Schema.String),
      createTime: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDatalabelingV1alpha1ExportDataOperationMetadata",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1alpha1ExportDataOperationMetadata>;

export interface GoogleCloudDatalabelingV1beta1CreateDatasetRequest {
  /** Required. The dataset to be created. */
  dataset?: GoogleCloudDatalabelingV1beta1Dataset;
}

export const GoogleCloudDatalabelingV1beta1CreateDatasetRequest: Schema.Schema<GoogleCloudDatalabelingV1beta1CreateDatasetRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      dataset: Schema.optional(GoogleCloudDatalabelingV1beta1Dataset),
    }),
  ).annotate({
    identifier: "GoogleCloudDatalabelingV1beta1CreateDatasetRequest",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1beta1CreateDatasetRequest>;

export interface GoogleCloudDatalabelingV1beta1ImportDataRequest {
  /** Required. Specify the input source of the data. */
  inputConfig?: GoogleCloudDatalabelingV1beta1InputConfig;
  /** Email of the user who started the import task and should be notified by email. If empty no notification will be sent. */
  userEmailAddress?: string;
}

export const GoogleCloudDatalabelingV1beta1ImportDataRequest: Schema.Schema<GoogleCloudDatalabelingV1beta1ImportDataRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      inputConfig: Schema.optional(GoogleCloudDatalabelingV1beta1InputConfig),
      userEmailAddress: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDatalabelingV1beta1ImportDataRequest",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1beta1ImportDataRequest>;

export interface GoogleCloudDatalabelingV1p2alpha1ExportDataOperationMetadata {
  /** Output only. The name of annotated dataset in format "projects/* /datasets/* /annotatedDatasets/*". */
  annotatedDataset?: string;
  /** Output only. The name of dataset to be exported. "projects/* /datasets/*" */
  dataset?: string;
  /** Output only. Timestamp when export dataset request was created. */
  createTime?: string;
  /** Output only. Partial failures encountered. E.g. single files that couldn't be read. Status details field will contain standard GCP error details. */
  partialFailures?: Array<GoogleRpcStatus>;
}

export const GoogleCloudDatalabelingV1p2alpha1ExportDataOperationMetadata: Schema.Schema<GoogleCloudDatalabelingV1p2alpha1ExportDataOperationMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      annotatedDataset: Schema.optional(Schema.String),
      dataset: Schema.optional(Schema.String),
      createTime: Schema.optional(Schema.String),
      partialFailures: Schema.optional(Schema.Array(GoogleRpcStatus)),
    }),
  ).annotate({
    identifier: "GoogleCloudDatalabelingV1p2alpha1ExportDataOperationMetadata",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1p2alpha1ExportDataOperationMetadata>;

export interface GoogleCloudDatalabelingV1beta1LabelImagePolylineOperationMetadata {
  /** Basic human annotation config used in labeling request. */
  basicConfig?: GoogleCloudDatalabelingV1beta1HumanAnnotationConfig;
}

export const GoogleCloudDatalabelingV1beta1LabelImagePolylineOperationMetadata: Schema.Schema<GoogleCloudDatalabelingV1beta1LabelImagePolylineOperationMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      basicConfig: Schema.optional(
        GoogleCloudDatalabelingV1beta1HumanAnnotationConfig,
      ),
    }),
  ).annotate({
    identifier:
      "GoogleCloudDatalabelingV1beta1LabelImagePolylineOperationMetadata",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1beta1LabelImagePolylineOperationMetadata>;

export interface GoogleCloudDatalabelingV1beta1LabelTextEntityExtractionOperationMetadata {
  /** Basic human annotation config used in labeling request. */
  basicConfig?: GoogleCloudDatalabelingV1beta1HumanAnnotationConfig;
}

export const GoogleCloudDatalabelingV1beta1LabelTextEntityExtractionOperationMetadata: Schema.Schema<GoogleCloudDatalabelingV1beta1LabelTextEntityExtractionOperationMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      basicConfig: Schema.optional(
        GoogleCloudDatalabelingV1beta1HumanAnnotationConfig,
      ),
    }),
  ).annotate({
    identifier:
      "GoogleCloudDatalabelingV1beta1LabelTextEntityExtractionOperationMetadata",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1beta1LabelTextEntityExtractionOperationMetadata>;

export interface GoogleCloudDatalabelingV1beta1LabelOperationMetadata {
  /** Output only. The name of annotated dataset in format "projects/* /datasets/* /annotatedDatasets/*". */
  annotatedDataset?: string;
  /** Details of label video object detection operation. */
  videoObjectDetectionDetails?: GoogleCloudDatalabelingV1beta1LabelVideoObjectDetectionOperationMetadata;
  /** Output only. Timestamp when labeling request was created. */
  createTime?: string;
  /** Output only. The name of dataset to be labeled. "projects/* /datasets/*" */
  dataset?: string;
  /** Details of label video classification operation. */
  videoClassificationDetails?: GoogleCloudDatalabelingV1beta1LabelVideoClassificationOperationMetadata;
  /** Details of label video event operation. */
  videoEventDetails?: GoogleCloudDatalabelingV1beta1LabelVideoEventOperationMetadata;
  /** Details of label image bounding box operation. */
  imageBoundingBoxDetails?: GoogleCloudDatalabelingV1beta1LabelImageBoundingBoxOperationMetadata;
  /** Details of label image polyline operation. */
  imagePolylineDetails?: GoogleCloudDatalabelingV1beta1LabelImagePolylineOperationMetadata;
  /** Output only. Partial failures encountered. E.g. single files that couldn't be read. Status details field will contain standard GCP error details. */
  partialFailures?: Array<GoogleRpcStatus>;
  /** Details of label video object tracking operation. */
  videoObjectTrackingDetails?: GoogleCloudDatalabelingV1beta1LabelVideoObjectTrackingOperationMetadata;
  /** Details of label image oriented bounding box operation. */
  imageOrientedBoundingBoxDetails?: GoogleCloudDatalabelingV1beta1LabelImageOrientedBoundingBoxOperationMetadata;
  /** Details of label text classification operation. */
  textClassificationDetails?: GoogleCloudDatalabelingV1beta1LabelTextClassificationOperationMetadata;
  /** Output only. Progress of label operation. Range: [0, 100]. */
  progressPercent?: number;
  /** Details of label text entity extraction operation. */
  textEntityExtractionDetails?: GoogleCloudDatalabelingV1beta1LabelTextEntityExtractionOperationMetadata;
  /** Details of label image segmentation operation. */
  imageSegmentationDetails?: GoogleCloudDatalabelingV1beta1LabelImageSegmentationOperationMetadata;
  /** Details of label image classification operation. */
  imageClassificationDetails?: GoogleCloudDatalabelingV1beta1LabelImageClassificationOperationMetadata;
  /** Details of label image bounding poly operation. */
  imageBoundingPolyDetails?: GoogleCloudDatalabelingV1beta1LabelImageBoundingPolyOperationMetadata;
}

export const GoogleCloudDatalabelingV1beta1LabelOperationMetadata: Schema.Schema<GoogleCloudDatalabelingV1beta1LabelOperationMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      annotatedDataset: Schema.optional(Schema.String),
      videoObjectDetectionDetails: Schema.optional(
        GoogleCloudDatalabelingV1beta1LabelVideoObjectDetectionOperationMetadata,
      ),
      createTime: Schema.optional(Schema.String),
      dataset: Schema.optional(Schema.String),
      videoClassificationDetails: Schema.optional(
        GoogleCloudDatalabelingV1beta1LabelVideoClassificationOperationMetadata,
      ),
      videoEventDetails: Schema.optional(
        GoogleCloudDatalabelingV1beta1LabelVideoEventOperationMetadata,
      ),
      imageBoundingBoxDetails: Schema.optional(
        GoogleCloudDatalabelingV1beta1LabelImageBoundingBoxOperationMetadata,
      ),
      imagePolylineDetails: Schema.optional(
        GoogleCloudDatalabelingV1beta1LabelImagePolylineOperationMetadata,
      ),
      partialFailures: Schema.optional(Schema.Array(GoogleRpcStatus)),
      videoObjectTrackingDetails: Schema.optional(
        GoogleCloudDatalabelingV1beta1LabelVideoObjectTrackingOperationMetadata,
      ),
      imageOrientedBoundingBoxDetails: Schema.optional(
        GoogleCloudDatalabelingV1beta1LabelImageOrientedBoundingBoxOperationMetadata,
      ),
      textClassificationDetails: Schema.optional(
        GoogleCloudDatalabelingV1beta1LabelTextClassificationOperationMetadata,
      ),
      progressPercent: Schema.optional(Schema.Number),
      textEntityExtractionDetails: Schema.optional(
        GoogleCloudDatalabelingV1beta1LabelTextEntityExtractionOperationMetadata,
      ),
      imageSegmentationDetails: Schema.optional(
        GoogleCloudDatalabelingV1beta1LabelImageSegmentationOperationMetadata,
      ),
      imageClassificationDetails: Schema.optional(
        GoogleCloudDatalabelingV1beta1LabelImageClassificationOperationMetadata,
      ),
      imageBoundingPolyDetails: Schema.optional(
        GoogleCloudDatalabelingV1beta1LabelImageBoundingPolyOperationMetadata,
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDatalabelingV1beta1LabelOperationMetadata",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1beta1LabelOperationMetadata>;

export interface GoogleCloudDatalabelingV1beta1LabelTextRequest {
  /** Required. The type of text labeling task. */
  feature?:
    | "FEATURE_UNSPECIFIED"
    | "TEXT_CLASSIFICATION"
    | "TEXT_ENTITY_EXTRACTION"
    | (string & {});
  /** Required. Basic human annotation config. */
  basicConfig?: GoogleCloudDatalabelingV1beta1HumanAnnotationConfig;
  /** Configuration for text classification task. One of text_classification_config and text_entity_extraction_config is required. */
  textClassificationConfig?: GoogleCloudDatalabelingV1beta1TextClassificationConfig;
  /** Configuration for entity extraction task. One of text_classification_config and text_entity_extraction_config is required. */
  textEntityExtractionConfig?: GoogleCloudDatalabelingV1beta1TextEntityExtractionConfig;
}

export const GoogleCloudDatalabelingV1beta1LabelTextRequest: Schema.Schema<GoogleCloudDatalabelingV1beta1LabelTextRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      feature: Schema.optional(Schema.String),
      basicConfig: Schema.optional(
        GoogleCloudDatalabelingV1beta1HumanAnnotationConfig,
      ),
      textClassificationConfig: Schema.optional(
        GoogleCloudDatalabelingV1beta1TextClassificationConfig,
      ),
      textEntityExtractionConfig: Schema.optional(
        GoogleCloudDatalabelingV1beta1TextEntityExtractionConfig,
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDatalabelingV1beta1LabelTextRequest",
  }) as any as Schema.Schema<GoogleCloudDatalabelingV1beta1LabelTextRequest>;

// ==========================================================================
// Operations
// ==========================================================================

export interface SearchProjectsEvaluationsRequest {
  /** Optional. Requested page size. Server may return fewer results than requested. Default value is 100. */
  pageSize?: number;
  /** Required. Evaluation search parent (project ID). Format: "projects/ {project_id}" */
  parent: string;
  /** Optional. A token identifying a page of results for the server to return. Typically obtained by the nextPageToken of the response to a previous search request. If you don't specify this field, the API call requests the first page of the search. */
  pageToken?: string;
  /** Optional. To search evaluations, you can filter by the following: * evaluation_job.evaluation_job_id (the last part of EvaluationJob.name) * evaluation_job.model_id (the {model_name} portion of EvaluationJob.modelVersion) * evaluation_job.evaluation_job_run_time_start (Minimum threshold for the evaluationJobRunTime that created the evaluation) * evaluation_job.evaluation_job_run_time_end (Maximum threshold for the evaluationJobRunTime that created the evaluation) * evaluation_job.job_state (EvaluationJob.state) * annotation_spec.display_name (the Evaluation contains a metric for the annotation spec with this displayName) To filter by multiple critiera, use the `AND` operator or the `OR` operator. The following examples shows a string that filters by several critiera: "evaluation_job.evaluation_job_id = {evaluation_job_id} AND evaluation_job.model_id = {model_name} AND evaluation_job.evaluation_job_run_time_start = {timestamp_1} AND evaluation_job.evaluation_job_run_time_end = {timestamp_2} AND annotation_spec.display_name = {display_name}" */
  filter?: string;
}

export const SearchProjectsEvaluationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    parent: Schema.String.pipe(T.HttpPath("parent")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta1/projects/{projectsId}/evaluations:search",
    }),
    svc,
  ) as unknown as Schema.Schema<SearchProjectsEvaluationsRequest>;

export type SearchProjectsEvaluationsResponse =
  GoogleCloudDatalabelingV1beta1SearchEvaluationsResponse;
export const SearchProjectsEvaluationsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleCloudDatalabelingV1beta1SearchEvaluationsResponse;

export type SearchProjectsEvaluationsError = DefaultErrors;

/** Searches evaluations within a project. */
export const searchProjectsEvaluations: API.PaginatedOperationMethod<
  SearchProjectsEvaluationsRequest,
  SearchProjectsEvaluationsResponse,
  SearchProjectsEvaluationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: SearchProjectsEvaluationsRequest,
  output: SearchProjectsEvaluationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsOperationsRequest {
  /** The name of the operation resource. */
  name: string;
}

export const GetProjectsOperationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta1/projects/{projectsId}/operations/{operationsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsOperationsRequest>;

export type GetProjectsOperationsResponse = GoogleLongrunningOperation;
export const GetProjectsOperationsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleLongrunningOperation;

export type GetProjectsOperationsError = DefaultErrors;

/** Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service. */
export const getProjectsOperations: API.OperationMethod<
  GetProjectsOperationsRequest,
  GetProjectsOperationsResponse,
  GetProjectsOperationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProjectsOperationsRequest,
  output: GetProjectsOperationsResponse,
  errors: [],
}));

export interface ListProjectsOperationsRequest {
  /** The name of the operation's parent resource. */
  name: string;
  /** The standard list page token. */
  pageToken?: string;
  /** When set to `true`, operations that are reachable are returned as normal, and those that are unreachable are returned in the ListOperationsResponse.unreachable field. This can only be `true` when reading across collections. For example, when `parent` is set to `"projects/example/locations/-"`. This field is not supported by default and will result in an `UNIMPLEMENTED` error if set unless explicitly documented otherwise in service or product specific documentation. */
  returnPartialSuccess?: boolean;
  /** The standard list filter. */
  filter?: string;
  /** The standard list page size. */
  pageSize?: number;
}

export const ListProjectsOperationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    returnPartialSuccess: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("returnPartialSuccess"),
    ),
    filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  }).pipe(
    T.Http({ method: "GET", path: "v1beta1/projects/{projectsId}/operations" }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsOperationsRequest>;

export type ListProjectsOperationsResponse =
  GoogleLongrunningListOperationsResponse;
export const ListProjectsOperationsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleLongrunningListOperationsResponse;

export type ListProjectsOperationsError = DefaultErrors;

/** Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns `UNIMPLEMENTED`. */
export const listProjectsOperations: API.PaginatedOperationMethod<
  ListProjectsOperationsRequest,
  ListProjectsOperationsResponse,
  ListProjectsOperationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListProjectsOperationsRequest,
  output: ListProjectsOperationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface DeleteProjectsOperationsRequest {
  /** The name of the operation resource to be deleted. */
  name: string;
}

export const DeleteProjectsOperationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v1beta1/projects/{projectsId}/operations/{operationsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteProjectsOperationsRequest>;

export type DeleteProjectsOperationsResponse = GoogleProtobufEmpty;
export const DeleteProjectsOperationsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleProtobufEmpty;

export type DeleteProjectsOperationsError = DefaultErrors;

/** Deletes a long-running operation. This method indicates that the client is no longer interested in the operation result. It does not cancel the operation. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. */
export const deleteProjectsOperations: API.OperationMethod<
  DeleteProjectsOperationsRequest,
  DeleteProjectsOperationsResponse,
  DeleteProjectsOperationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteProjectsOperationsRequest,
  output: DeleteProjectsOperationsResponse,
  errors: [],
}));

export interface CancelProjectsOperationsRequest {
  /** The name of the operation resource to be cancelled. */
  name: string;
}

export const CancelProjectsOperationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta1/projects/{projectsId}/operations/{operationsId}:cancel",
    }),
    svc,
  ) as unknown as Schema.Schema<CancelProjectsOperationsRequest>;

export type CancelProjectsOperationsResponse = GoogleProtobufEmpty;
export const CancelProjectsOperationsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleProtobufEmpty;

export type CancelProjectsOperationsError = DefaultErrors;

/** Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`. */
export const cancelProjectsOperations: API.OperationMethod<
  CancelProjectsOperationsRequest,
  CancelProjectsOperationsResponse,
  CancelProjectsOperationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CancelProjectsOperationsRequest,
  output: CancelProjectsOperationsResponse,
  errors: [],
}));

export interface DeleteProjectsDatasetsRequest {
  /** Required. Dataset resource name, format: projects/{project_id}/datasets/{dataset_id} */
  name: string;
}

export const DeleteProjectsDatasetsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v1beta1/projects/{projectsId}/datasets/{datasetsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteProjectsDatasetsRequest>;

export type DeleteProjectsDatasetsResponse = GoogleProtobufEmpty;
export const DeleteProjectsDatasetsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleProtobufEmpty;

export type DeleteProjectsDatasetsError = DefaultErrors;

/** Deletes a dataset by resource name. */
export const deleteProjectsDatasets: API.OperationMethod<
  DeleteProjectsDatasetsRequest,
  DeleteProjectsDatasetsResponse,
  DeleteProjectsDatasetsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteProjectsDatasetsRequest,
  output: DeleteProjectsDatasetsResponse,
  errors: [],
}));

export interface GetProjectsDatasetsRequest {
  /** Required. Dataset resource name, format: projects/{project_id}/datasets/{dataset_id} */
  name: string;
}

export const GetProjectsDatasetsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta1/projects/{projectsId}/datasets/{datasetsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsDatasetsRequest>;

export type GetProjectsDatasetsResponse = GoogleCloudDatalabelingV1beta1Dataset;
export const GetProjectsDatasetsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleCloudDatalabelingV1beta1Dataset;

export type GetProjectsDatasetsError = DefaultErrors;

/** Gets dataset by resource name. */
export const getProjectsDatasets: API.OperationMethod<
  GetProjectsDatasetsRequest,
  GetProjectsDatasetsResponse,
  GetProjectsDatasetsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProjectsDatasetsRequest,
  output: GetProjectsDatasetsResponse,
  errors: [],
}));

export interface ExportDataProjectsDatasetsRequest {
  /** Required. Dataset resource name, format: projects/{project_id}/datasets/{dataset_id} */
  name: string;
  /** Request body */
  body?: GoogleCloudDatalabelingV1beta1ExportDataRequest;
}

export const ExportDataProjectsDatasetsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    body: Schema.optional(GoogleCloudDatalabelingV1beta1ExportDataRequest).pipe(
      T.HttpBody(),
    ),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta1/projects/{projectsId}/datasets/{datasetsId}:exportData",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<ExportDataProjectsDatasetsRequest>;

export type ExportDataProjectsDatasetsResponse = GoogleLongrunningOperation;
export const ExportDataProjectsDatasetsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleLongrunningOperation;

export type ExportDataProjectsDatasetsError = DefaultErrors;

/** Exports data and annotations from dataset. */
export const exportDataProjectsDatasets: API.OperationMethod<
  ExportDataProjectsDatasetsRequest,
  ExportDataProjectsDatasetsResponse,
  ExportDataProjectsDatasetsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ExportDataProjectsDatasetsRequest,
  output: ExportDataProjectsDatasetsResponse,
  errors: [],
}));

export interface ListProjectsDatasetsRequest {
  /** Optional. Requested page size. Server may return fewer results than requested. Default value is 100. */
  pageSize?: number;
  /** Required. Dataset resource parent, format: projects/{project_id} */
  parent: string;
  /** Optional. Filter on dataset is not supported at this moment. */
  filter?: string;
  /** Optional. A token identifying a page of results for the server to return. Typically obtained by ListDatasetsResponse.next_page_token of the previous [DataLabelingService.ListDatasets] call. Returns the first page if empty. */
  pageToken?: string;
}

export const ListProjectsDatasetsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    parent: Schema.String.pipe(T.HttpPath("parent")),
    filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  }).pipe(
    T.Http({ method: "GET", path: "v1beta1/projects/{projectsId}/datasets" }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsDatasetsRequest>;

export type ListProjectsDatasetsResponse =
  GoogleCloudDatalabelingV1beta1ListDatasetsResponse;
export const ListProjectsDatasetsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleCloudDatalabelingV1beta1ListDatasetsResponse;

export type ListProjectsDatasetsError = DefaultErrors;

/** Lists datasets under a project. Pagination is supported. */
export const listProjectsDatasets: API.PaginatedOperationMethod<
  ListProjectsDatasetsRequest,
  ListProjectsDatasetsResponse,
  ListProjectsDatasetsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListProjectsDatasetsRequest,
  output: ListProjectsDatasetsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface ImportDataProjectsDatasetsRequest {
  /** Required. Dataset resource name, format: projects/{project_id}/datasets/{dataset_id} */
  name: string;
  /** Request body */
  body?: GoogleCloudDatalabelingV1beta1ImportDataRequest;
}

export const ImportDataProjectsDatasetsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    body: Schema.optional(GoogleCloudDatalabelingV1beta1ImportDataRequest).pipe(
      T.HttpBody(),
    ),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta1/projects/{projectsId}/datasets/{datasetsId}:importData",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<ImportDataProjectsDatasetsRequest>;

export type ImportDataProjectsDatasetsResponse = GoogleLongrunningOperation;
export const ImportDataProjectsDatasetsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleLongrunningOperation;

export type ImportDataProjectsDatasetsError = DefaultErrors;

/** Imports data into dataset based on source locations defined in request. It can be called multiple times for the same dataset. Each dataset can only have one long running operation running on it. For example, no labeling task (also long running operation) can be started while importing is still ongoing. Vice versa. */
export const importDataProjectsDatasets: API.OperationMethod<
  ImportDataProjectsDatasetsRequest,
  ImportDataProjectsDatasetsResponse,
  ImportDataProjectsDatasetsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ImportDataProjectsDatasetsRequest,
  output: ImportDataProjectsDatasetsResponse,
  errors: [],
}));

export interface CreateProjectsDatasetsRequest {
  /** Required. Dataset resource parent, format: projects/{project_id} */
  parent: string;
  /** Request body */
  body?: GoogleCloudDatalabelingV1beta1CreateDatasetRequest;
}

export const CreateProjectsDatasetsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    body: Schema.optional(
      GoogleCloudDatalabelingV1beta1CreateDatasetRequest,
    ).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta1/projects/{projectsId}/datasets",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateProjectsDatasetsRequest>;

export type CreateProjectsDatasetsResponse =
  GoogleCloudDatalabelingV1beta1Dataset;
export const CreateProjectsDatasetsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleCloudDatalabelingV1beta1Dataset;

export type CreateProjectsDatasetsError = DefaultErrors;

/** Creates dataset. If success return a Dataset resource. */
export const createProjectsDatasets: API.OperationMethod<
  CreateProjectsDatasetsRequest,
  CreateProjectsDatasetsResponse,
  CreateProjectsDatasetsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateProjectsDatasetsRequest,
  output: CreateProjectsDatasetsResponse,
  errors: [],
}));

export interface ListProjectsDatasetsDataItemsRequest {
  /** Optional. Filter is not supported at this moment. */
  filter?: string;
  /** Required. Name of the dataset to list data items, format: projects/{project_id}/datasets/{dataset_id} */
  parent: string;
  /** Optional. Requested page size. Server may return fewer results than requested. Default value is 100. */
  pageSize?: number;
  /** Optional. A token identifying a page of results for the server to return. Typically obtained by ListDataItemsResponse.next_page_token of the previous [DataLabelingService.ListDataItems] call. Return first page if empty. */
  pageToken?: string;
}

export const ListProjectsDatasetsDataItemsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
    parent: Schema.String.pipe(T.HttpPath("parent")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta1/projects/{projectsId}/datasets/{datasetsId}/dataItems",
    }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsDatasetsDataItemsRequest>;

export type ListProjectsDatasetsDataItemsResponse =
  GoogleCloudDatalabelingV1beta1ListDataItemsResponse;
export const ListProjectsDatasetsDataItemsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleCloudDatalabelingV1beta1ListDataItemsResponse;

export type ListProjectsDatasetsDataItemsError = DefaultErrors;

/** Lists data items in a dataset. This API can be called after data are imported into dataset. Pagination is supported. */
export const listProjectsDatasetsDataItems: API.PaginatedOperationMethod<
  ListProjectsDatasetsDataItemsRequest,
  ListProjectsDatasetsDataItemsResponse,
  ListProjectsDatasetsDataItemsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListProjectsDatasetsDataItemsRequest,
  output: ListProjectsDatasetsDataItemsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsDatasetsDataItemsRequest {
  /** Required. The name of the data item to get, format: projects/{project_id}/datasets/{dataset_id}/dataItems/{data_item_id} */
  name: string;
}

export const GetProjectsDatasetsDataItemsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta1/projects/{projectsId}/datasets/{datasetsId}/dataItems/{dataItemsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsDatasetsDataItemsRequest>;

export type GetProjectsDatasetsDataItemsResponse =
  GoogleCloudDatalabelingV1beta1DataItem;
export const GetProjectsDatasetsDataItemsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleCloudDatalabelingV1beta1DataItem;

export type GetProjectsDatasetsDataItemsError = DefaultErrors;

/** Gets a data item in a dataset by resource name. This API can be called after data are imported into dataset. */
export const getProjectsDatasetsDataItems: API.OperationMethod<
  GetProjectsDatasetsDataItemsRequest,
  GetProjectsDatasetsDataItemsResponse,
  GetProjectsDatasetsDataItemsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProjectsDatasetsDataItemsRequest,
  output: GetProjectsDatasetsDataItemsResponse,
  errors: [],
}));

export interface LabelProjectsDatasetsVideoRequest {
  /** Required. Name of the dataset to request labeling task, format: projects/{project_id}/datasets/{dataset_id} */
  parent: string;
  /** Request body */
  body?: GoogleCloudDatalabelingV1beta1LabelVideoRequest;
}

export const LabelProjectsDatasetsVideoRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    body: Schema.optional(GoogleCloudDatalabelingV1beta1LabelVideoRequest).pipe(
      T.HttpBody(),
    ),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta1/projects/{projectsId}/datasets/{datasetsId}/video:label",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<LabelProjectsDatasetsVideoRequest>;

export type LabelProjectsDatasetsVideoResponse = GoogleLongrunningOperation;
export const LabelProjectsDatasetsVideoResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleLongrunningOperation;

export type LabelProjectsDatasetsVideoError = DefaultErrors;

/** Starts a labeling task for video. The type of video labeling task is configured by feature in the request. */
export const labelProjectsDatasetsVideo: API.OperationMethod<
  LabelProjectsDatasetsVideoRequest,
  LabelProjectsDatasetsVideoResponse,
  LabelProjectsDatasetsVideoError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: LabelProjectsDatasetsVideoRequest,
  output: LabelProjectsDatasetsVideoResponse,
  errors: [],
}));

export interface LabelProjectsDatasetsImageRequest {
  /** Required. Name of the dataset to request labeling task, format: projects/{project_id}/datasets/{dataset_id} */
  parent: string;
  /** Request body */
  body?: GoogleCloudDatalabelingV1beta1LabelImageRequest;
}

export const LabelProjectsDatasetsImageRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    body: Schema.optional(GoogleCloudDatalabelingV1beta1LabelImageRequest).pipe(
      T.HttpBody(),
    ),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta1/projects/{projectsId}/datasets/{datasetsId}/image:label",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<LabelProjectsDatasetsImageRequest>;

export type LabelProjectsDatasetsImageResponse = GoogleLongrunningOperation;
export const LabelProjectsDatasetsImageResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleLongrunningOperation;

export type LabelProjectsDatasetsImageError = DefaultErrors;

/** Starts a labeling task for image. The type of image labeling task is configured by feature in the request. */
export const labelProjectsDatasetsImage: API.OperationMethod<
  LabelProjectsDatasetsImageRequest,
  LabelProjectsDatasetsImageResponse,
  LabelProjectsDatasetsImageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: LabelProjectsDatasetsImageRequest,
  output: LabelProjectsDatasetsImageResponse,
  errors: [],
}));

export interface ListProjectsDatasetsAnnotatedDatasetsRequest {
  /** Optional. A token identifying a page of results for the server to return. Typically obtained by ListAnnotatedDatasetsResponse.next_page_token of the previous [DataLabelingService.ListAnnotatedDatasets] call. Return first page if empty. */
  pageToken?: string;
  /** Optional. Filter is not supported at this moment. */
  filter?: string;
  /** Required. Name of the dataset to list annotated datasets, format: projects/{project_id}/datasets/{dataset_id} */
  parent: string;
  /** Optional. Requested page size. Server may return fewer results than requested. Default value is 100. */
  pageSize?: number;
}

export const ListProjectsDatasetsAnnotatedDatasetsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
    parent: Schema.String.pipe(T.HttpPath("parent")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta1/projects/{projectsId}/datasets/{datasetsId}/annotatedDatasets",
    }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsDatasetsAnnotatedDatasetsRequest>;

export type ListProjectsDatasetsAnnotatedDatasetsResponse =
  GoogleCloudDatalabelingV1beta1ListAnnotatedDatasetsResponse;
export const ListProjectsDatasetsAnnotatedDatasetsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleCloudDatalabelingV1beta1ListAnnotatedDatasetsResponse;

export type ListProjectsDatasetsAnnotatedDatasetsError = DefaultErrors;

/** Lists annotated datasets for a dataset. Pagination is supported. */
export const listProjectsDatasetsAnnotatedDatasets: API.PaginatedOperationMethod<
  ListProjectsDatasetsAnnotatedDatasetsRequest,
  ListProjectsDatasetsAnnotatedDatasetsResponse,
  ListProjectsDatasetsAnnotatedDatasetsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListProjectsDatasetsAnnotatedDatasetsRequest,
  output: ListProjectsDatasetsAnnotatedDatasetsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface DeleteProjectsDatasetsAnnotatedDatasetsRequest {
  /** Required. Name of the annotated dataset to delete, format: projects/{project_id}/datasets/{dataset_id}/annotatedDatasets/ {annotated_dataset_id} */
  name: string;
}

export const DeleteProjectsDatasetsAnnotatedDatasetsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v1beta1/projects/{projectsId}/datasets/{datasetsId}/annotatedDatasets/{annotatedDatasetsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteProjectsDatasetsAnnotatedDatasetsRequest>;

export type DeleteProjectsDatasetsAnnotatedDatasetsResponse =
  GoogleProtobufEmpty;
export const DeleteProjectsDatasetsAnnotatedDatasetsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleProtobufEmpty;

export type DeleteProjectsDatasetsAnnotatedDatasetsError = DefaultErrors;

/** Deletes an annotated dataset by resource name. */
export const deleteProjectsDatasetsAnnotatedDatasets: API.OperationMethod<
  DeleteProjectsDatasetsAnnotatedDatasetsRequest,
  DeleteProjectsDatasetsAnnotatedDatasetsResponse,
  DeleteProjectsDatasetsAnnotatedDatasetsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteProjectsDatasetsAnnotatedDatasetsRequest,
  output: DeleteProjectsDatasetsAnnotatedDatasetsResponse,
  errors: [],
}));

export interface GetProjectsDatasetsAnnotatedDatasetsRequest {
  /** Required. Name of the annotated dataset to get, format: projects/{project_id}/datasets/{dataset_id}/annotatedDatasets/ {annotated_dataset_id} */
  name: string;
}

export const GetProjectsDatasetsAnnotatedDatasetsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta1/projects/{projectsId}/datasets/{datasetsId}/annotatedDatasets/{annotatedDatasetsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsDatasetsAnnotatedDatasetsRequest>;

export type GetProjectsDatasetsAnnotatedDatasetsResponse =
  GoogleCloudDatalabelingV1beta1AnnotatedDataset;
export const GetProjectsDatasetsAnnotatedDatasetsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleCloudDatalabelingV1beta1AnnotatedDataset;

export type GetProjectsDatasetsAnnotatedDatasetsError = DefaultErrors;

/** Gets an annotated dataset by resource name. */
export const getProjectsDatasetsAnnotatedDatasets: API.OperationMethod<
  GetProjectsDatasetsAnnotatedDatasetsRequest,
  GetProjectsDatasetsAnnotatedDatasetsResponse,
  GetProjectsDatasetsAnnotatedDatasetsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProjectsDatasetsAnnotatedDatasetsRequest,
  output: GetProjectsDatasetsAnnotatedDatasetsResponse,
  errors: [],
}));

export interface GetProjectsDatasetsAnnotatedDatasetsDataItemsRequest {
  /** Required. The name of the data item to get, format: projects/{project_id}/datasets/{dataset_id}/dataItems/{data_item_id} */
  name: string;
}

export const GetProjectsDatasetsAnnotatedDatasetsDataItemsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta1/projects/{projectsId}/datasets/{datasetsId}/annotatedDatasets/{annotatedDatasetsId}/dataItems/{dataItemsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsDatasetsAnnotatedDatasetsDataItemsRequest>;

export type GetProjectsDatasetsAnnotatedDatasetsDataItemsResponse =
  GoogleCloudDatalabelingV1beta1DataItem;
export const GetProjectsDatasetsAnnotatedDatasetsDataItemsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleCloudDatalabelingV1beta1DataItem;

export type GetProjectsDatasetsAnnotatedDatasetsDataItemsError = DefaultErrors;

/** Gets a data item in a dataset by resource name. This API can be called after data are imported into dataset. */
export const getProjectsDatasetsAnnotatedDatasetsDataItems: API.OperationMethod<
  GetProjectsDatasetsAnnotatedDatasetsDataItemsRequest,
  GetProjectsDatasetsAnnotatedDatasetsDataItemsResponse,
  GetProjectsDatasetsAnnotatedDatasetsDataItemsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProjectsDatasetsAnnotatedDatasetsDataItemsRequest,
  output: GetProjectsDatasetsAnnotatedDatasetsDataItemsResponse,
  errors: [],
}));

export interface ListProjectsDatasetsAnnotatedDatasetsDataItemsRequest {
  /** Optional. A token identifying a page of results for the server to return. Typically obtained by ListDataItemsResponse.next_page_token of the previous [DataLabelingService.ListDataItems] call. Return first page if empty. */
  pageToken?: string;
  /** Optional. Filter is not supported at this moment. */
  filter?: string;
  /** Required. Name of the dataset to list data items, format: projects/{project_id}/datasets/{dataset_id} */
  parent: string;
  /** Optional. Requested page size. Server may return fewer results than requested. Default value is 100. */
  pageSize?: number;
}

export const ListProjectsDatasetsAnnotatedDatasetsDataItemsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
    parent: Schema.String.pipe(T.HttpPath("parent")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta1/projects/{projectsId}/datasets/{datasetsId}/annotatedDatasets/{annotatedDatasetsId}/dataItems",
    }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsDatasetsAnnotatedDatasetsDataItemsRequest>;

export type ListProjectsDatasetsAnnotatedDatasetsDataItemsResponse =
  GoogleCloudDatalabelingV1beta1ListDataItemsResponse;
export const ListProjectsDatasetsAnnotatedDatasetsDataItemsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleCloudDatalabelingV1beta1ListDataItemsResponse;

export type ListProjectsDatasetsAnnotatedDatasetsDataItemsError = DefaultErrors;

/** Lists data items in a dataset. This API can be called after data are imported into dataset. Pagination is supported. */
export const listProjectsDatasetsAnnotatedDatasetsDataItems: API.PaginatedOperationMethod<
  ListProjectsDatasetsAnnotatedDatasetsDataItemsRequest,
  ListProjectsDatasetsAnnotatedDatasetsDataItemsResponse,
  ListProjectsDatasetsAnnotatedDatasetsDataItemsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListProjectsDatasetsAnnotatedDatasetsDataItemsRequest,
  output: ListProjectsDatasetsAnnotatedDatasetsDataItemsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface ListProjectsDatasetsAnnotatedDatasetsExamplesRequest {
  /** Required. Example resource parent. */
  parent: string;
  /** Optional. Requested page size. Server may return fewer results than requested. Default value is 100. */
  pageSize?: number;
  /** Optional. A token identifying a page of results for the server to return. Typically obtained by ListExamplesResponse.next_page_token of the previous [DataLabelingService.ListExamples] call. Return first page if empty. */
  pageToken?: string;
  /** Optional. An expression for filtering Examples. For annotated datasets that have annotation spec set, filter by annotation_spec.display_name is supported. Format "annotation_spec.display_name = {display_name}" */
  filter?: string;
}

export const ListProjectsDatasetsAnnotatedDatasetsExamplesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta1/projects/{projectsId}/datasets/{datasetsId}/annotatedDatasets/{annotatedDatasetsId}/examples",
    }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsDatasetsAnnotatedDatasetsExamplesRequest>;

export type ListProjectsDatasetsAnnotatedDatasetsExamplesResponse =
  GoogleCloudDatalabelingV1beta1ListExamplesResponse;
export const ListProjectsDatasetsAnnotatedDatasetsExamplesResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleCloudDatalabelingV1beta1ListExamplesResponse;

export type ListProjectsDatasetsAnnotatedDatasetsExamplesError = DefaultErrors;

/** Lists examples in an annotated dataset. Pagination is supported. */
export const listProjectsDatasetsAnnotatedDatasetsExamples: API.PaginatedOperationMethod<
  ListProjectsDatasetsAnnotatedDatasetsExamplesRequest,
  ListProjectsDatasetsAnnotatedDatasetsExamplesResponse,
  ListProjectsDatasetsAnnotatedDatasetsExamplesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListProjectsDatasetsAnnotatedDatasetsExamplesRequest,
  output: ListProjectsDatasetsAnnotatedDatasetsExamplesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsDatasetsAnnotatedDatasetsExamplesRequest {
  /** Required. Name of example, format: projects/{project_id}/datasets/{dataset_id}/annotatedDatasets/ {annotated_dataset_id}/examples/{example_id} */
  name: string;
  /** Optional. An expression for filtering Examples. Filter by annotation_spec.display_name is supported. Format "annotation_spec.display_name = {display_name}" */
  filter?: string;
}

export const GetProjectsDatasetsAnnotatedDatasetsExamplesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta1/projects/{projectsId}/datasets/{datasetsId}/annotatedDatasets/{annotatedDatasetsId}/examples/{examplesId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsDatasetsAnnotatedDatasetsExamplesRequest>;

export type GetProjectsDatasetsAnnotatedDatasetsExamplesResponse =
  GoogleCloudDatalabelingV1beta1Example;
export const GetProjectsDatasetsAnnotatedDatasetsExamplesResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleCloudDatalabelingV1beta1Example;

export type GetProjectsDatasetsAnnotatedDatasetsExamplesError = DefaultErrors;

/** Gets an example by resource name, including both data and annotation. */
export const getProjectsDatasetsAnnotatedDatasetsExamples: API.OperationMethod<
  GetProjectsDatasetsAnnotatedDatasetsExamplesRequest,
  GetProjectsDatasetsAnnotatedDatasetsExamplesResponse,
  GetProjectsDatasetsAnnotatedDatasetsExamplesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProjectsDatasetsAnnotatedDatasetsExamplesRequest,
  output: GetProjectsDatasetsAnnotatedDatasetsExamplesResponse,
  errors: [],
}));

export interface GetProjectsDatasetsAnnotatedDatasetsFeedbackThreadsRequest {
  /** Required. Name of the feedback. Format: 'projects/{project_id}/datasets/{dataset_id}/annotatedDatasets/{annotated_dataset_id}/feedbackThreads/{feedback_thread_id}'. */
  name: string;
}

export const GetProjectsDatasetsAnnotatedDatasetsFeedbackThreadsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta1/projects/{projectsId}/datasets/{datasetsId}/annotatedDatasets/{annotatedDatasetsId}/feedbackThreads/{feedbackThreadsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsDatasetsAnnotatedDatasetsFeedbackThreadsRequest>;

export type GetProjectsDatasetsAnnotatedDatasetsFeedbackThreadsResponse =
  GoogleCloudDatalabelingV1beta1FeedbackThread;
export const GetProjectsDatasetsAnnotatedDatasetsFeedbackThreadsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleCloudDatalabelingV1beta1FeedbackThread;

export type GetProjectsDatasetsAnnotatedDatasetsFeedbackThreadsError =
  DefaultErrors;

/** Get a FeedbackThread object. */
export const getProjectsDatasetsAnnotatedDatasetsFeedbackThreads: API.OperationMethod<
  GetProjectsDatasetsAnnotatedDatasetsFeedbackThreadsRequest,
  GetProjectsDatasetsAnnotatedDatasetsFeedbackThreadsResponse,
  GetProjectsDatasetsAnnotatedDatasetsFeedbackThreadsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProjectsDatasetsAnnotatedDatasetsFeedbackThreadsRequest,
  output: GetProjectsDatasetsAnnotatedDatasetsFeedbackThreadsResponse,
  errors: [],
}));

export interface ListProjectsDatasetsAnnotatedDatasetsFeedbackThreadsRequest {
  /** Optional. Requested page size. Server may return fewer results than requested. Default value is 100. */
  pageSize?: number;
  /** Optional. A token identifying a page of results for the server to return. Typically obtained by ListFeedbackThreads.next_page_token of the previous [DataLabelingService.ListFeedbackThreads] call. Return first page if empty. */
  pageToken?: string;
  /** Required. FeedbackThread resource parent. Format: "projects/{project_id}/datasets/{dataset_id}/annotatedDatasets/{annotated_dataset_id}" */
  parent: string;
}

export const ListProjectsDatasetsAnnotatedDatasetsFeedbackThreadsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    parent: Schema.String.pipe(T.HttpPath("parent")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta1/projects/{projectsId}/datasets/{datasetsId}/annotatedDatasets/{annotatedDatasetsId}/feedbackThreads",
    }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsDatasetsAnnotatedDatasetsFeedbackThreadsRequest>;

export type ListProjectsDatasetsAnnotatedDatasetsFeedbackThreadsResponse =
  GoogleCloudDatalabelingV1beta1ListFeedbackThreadsResponse;
export const ListProjectsDatasetsAnnotatedDatasetsFeedbackThreadsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleCloudDatalabelingV1beta1ListFeedbackThreadsResponse;

export type ListProjectsDatasetsAnnotatedDatasetsFeedbackThreadsError =
  DefaultErrors;

/** List FeedbackThreads with pagination. */
export const listProjectsDatasetsAnnotatedDatasetsFeedbackThreads: API.PaginatedOperationMethod<
  ListProjectsDatasetsAnnotatedDatasetsFeedbackThreadsRequest,
  ListProjectsDatasetsAnnotatedDatasetsFeedbackThreadsResponse,
  ListProjectsDatasetsAnnotatedDatasetsFeedbackThreadsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListProjectsDatasetsAnnotatedDatasetsFeedbackThreadsRequest,
  output: ListProjectsDatasetsAnnotatedDatasetsFeedbackThreadsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface DeleteProjectsDatasetsAnnotatedDatasetsFeedbackThreadsRequest {
  /** Required. Name of the FeedbackThread that is going to be deleted. Format: 'projects/{project_id}/datasets/{dataset_id}/annotatedDatasets/{annotated_dataset_id}/feedbackThreads/{feedback_thread_id}'. */
  name: string;
}

export const DeleteProjectsDatasetsAnnotatedDatasetsFeedbackThreadsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v1beta1/projects/{projectsId}/datasets/{datasetsId}/annotatedDatasets/{annotatedDatasetsId}/feedbackThreads/{feedbackThreadsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteProjectsDatasetsAnnotatedDatasetsFeedbackThreadsRequest>;

export type DeleteProjectsDatasetsAnnotatedDatasetsFeedbackThreadsResponse =
  GoogleProtobufEmpty;
export const DeleteProjectsDatasetsAnnotatedDatasetsFeedbackThreadsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleProtobufEmpty;

export type DeleteProjectsDatasetsAnnotatedDatasetsFeedbackThreadsError =
  DefaultErrors;

/** Delete a FeedbackThread. */
export const deleteProjectsDatasetsAnnotatedDatasetsFeedbackThreads: API.OperationMethod<
  DeleteProjectsDatasetsAnnotatedDatasetsFeedbackThreadsRequest,
  DeleteProjectsDatasetsAnnotatedDatasetsFeedbackThreadsResponse,
  DeleteProjectsDatasetsAnnotatedDatasetsFeedbackThreadsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteProjectsDatasetsAnnotatedDatasetsFeedbackThreadsRequest,
  output: DeleteProjectsDatasetsAnnotatedDatasetsFeedbackThreadsResponse,
  errors: [],
}));

export interface GetProjectsDatasetsAnnotatedDatasetsFeedbackThreadsFeedbackMessagesRequest {
  /** Required. Name of the feedback. Format: 'projects/{project_id}/datasets/{dataset_id}/annotatedDatasets/{annotated_dataset_id}/feedbackThreads/{feedback_thread_id}/feedbackMessages/{feedback_message_id}'. */
  name: string;
}

export const GetProjectsDatasetsAnnotatedDatasetsFeedbackThreadsFeedbackMessagesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta1/projects/{projectsId}/datasets/{datasetsId}/annotatedDatasets/{annotatedDatasetsId}/feedbackThreads/{feedbackThreadsId}/feedbackMessages/{feedbackMessagesId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsDatasetsAnnotatedDatasetsFeedbackThreadsFeedbackMessagesRequest>;

export type GetProjectsDatasetsAnnotatedDatasetsFeedbackThreadsFeedbackMessagesResponse =
  GoogleCloudDatalabelingV1beta1FeedbackMessage;
export const GetProjectsDatasetsAnnotatedDatasetsFeedbackThreadsFeedbackMessagesResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleCloudDatalabelingV1beta1FeedbackMessage;

export type GetProjectsDatasetsAnnotatedDatasetsFeedbackThreadsFeedbackMessagesError =
  DefaultErrors;

/** Get a FeedbackMessage object. */
export const getProjectsDatasetsAnnotatedDatasetsFeedbackThreadsFeedbackMessages: API.OperationMethod<
  GetProjectsDatasetsAnnotatedDatasetsFeedbackThreadsFeedbackMessagesRequest,
  GetProjectsDatasetsAnnotatedDatasetsFeedbackThreadsFeedbackMessagesResponse,
  GetProjectsDatasetsAnnotatedDatasetsFeedbackThreadsFeedbackMessagesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input:
    GetProjectsDatasetsAnnotatedDatasetsFeedbackThreadsFeedbackMessagesRequest,
  output:
    GetProjectsDatasetsAnnotatedDatasetsFeedbackThreadsFeedbackMessagesResponse,
  errors: [],
}));

export interface ListProjectsDatasetsAnnotatedDatasetsFeedbackThreadsFeedbackMessagesRequest {
  /** Required. FeedbackMessage resource parent. Format: "projects/{project_id}/datasets/{dataset_id}/annotatedDatasets/{annotated_dataset_id}/feedbackThreads/{feedback_thread_id}" */
  parent: string;
  /** Optional. A token identifying a page of results for the server to return. Typically obtained by ListFeedbackMessages.next_page_token of the previous [DataLabelingService.ListFeedbackMessages] call. Return first page if empty. */
  pageToken?: string;
  /** Optional. Requested page size. Server may return fewer results than requested. Default value is 100. */
  pageSize?: number;
}

export const ListProjectsDatasetsAnnotatedDatasetsFeedbackThreadsFeedbackMessagesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta1/projects/{projectsId}/datasets/{datasetsId}/annotatedDatasets/{annotatedDatasetsId}/feedbackThreads/{feedbackThreadsId}/feedbackMessages",
    }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsDatasetsAnnotatedDatasetsFeedbackThreadsFeedbackMessagesRequest>;

export type ListProjectsDatasetsAnnotatedDatasetsFeedbackThreadsFeedbackMessagesResponse =
  GoogleCloudDatalabelingV1beta1ListFeedbackMessagesResponse;
export const ListProjectsDatasetsAnnotatedDatasetsFeedbackThreadsFeedbackMessagesResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleCloudDatalabelingV1beta1ListFeedbackMessagesResponse;

export type ListProjectsDatasetsAnnotatedDatasetsFeedbackThreadsFeedbackMessagesError =
  DefaultErrors;

/** List FeedbackMessages with pagination. */
export const listProjectsDatasetsAnnotatedDatasetsFeedbackThreadsFeedbackMessages: API.PaginatedOperationMethod<
  ListProjectsDatasetsAnnotatedDatasetsFeedbackThreadsFeedbackMessagesRequest,
  ListProjectsDatasetsAnnotatedDatasetsFeedbackThreadsFeedbackMessagesResponse,
  ListProjectsDatasetsAnnotatedDatasetsFeedbackThreadsFeedbackMessagesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input:
    ListProjectsDatasetsAnnotatedDatasetsFeedbackThreadsFeedbackMessagesRequest,
  output:
    ListProjectsDatasetsAnnotatedDatasetsFeedbackThreadsFeedbackMessagesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface CreateProjectsDatasetsAnnotatedDatasetsFeedbackThreadsFeedbackMessagesRequest {
  /** Required. FeedbackMessage resource parent, format: projects/{project_id}/datasets/{dataset_id}/annotatedDatasets/{annotated_dataset_id}/feedbackThreads/{feedback_thread_id}. */
  parent: string;
  /** Request body */
  body?: GoogleCloudDatalabelingV1beta1FeedbackMessage;
}

export const CreateProjectsDatasetsAnnotatedDatasetsFeedbackThreadsFeedbackMessagesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    body: Schema.optional(GoogleCloudDatalabelingV1beta1FeedbackMessage).pipe(
      T.HttpBody(),
    ),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta1/projects/{projectsId}/datasets/{datasetsId}/annotatedDatasets/{annotatedDatasetsId}/feedbackThreads/{feedbackThreadsId}/feedbackMessages",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateProjectsDatasetsAnnotatedDatasetsFeedbackThreadsFeedbackMessagesRequest>;

export type CreateProjectsDatasetsAnnotatedDatasetsFeedbackThreadsFeedbackMessagesResponse =
  GoogleLongrunningOperation;
export const CreateProjectsDatasetsAnnotatedDatasetsFeedbackThreadsFeedbackMessagesResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleLongrunningOperation;

export type CreateProjectsDatasetsAnnotatedDatasetsFeedbackThreadsFeedbackMessagesError =
  DefaultErrors;

/** Create a FeedbackMessage object. */
export const createProjectsDatasetsAnnotatedDatasetsFeedbackThreadsFeedbackMessages: API.OperationMethod<
  CreateProjectsDatasetsAnnotatedDatasetsFeedbackThreadsFeedbackMessagesRequest,
  CreateProjectsDatasetsAnnotatedDatasetsFeedbackThreadsFeedbackMessagesResponse,
  CreateProjectsDatasetsAnnotatedDatasetsFeedbackThreadsFeedbackMessagesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input:
    CreateProjectsDatasetsAnnotatedDatasetsFeedbackThreadsFeedbackMessagesRequest,
  output:
    CreateProjectsDatasetsAnnotatedDatasetsFeedbackThreadsFeedbackMessagesResponse,
  errors: [],
}));

export interface DeleteProjectsDatasetsAnnotatedDatasetsFeedbackThreadsFeedbackMessagesRequest {
  /** Required. Name of the FeedbackMessage that is going to be deleted. Format: 'projects/{project_id}/datasets/{dataset_id}/annotatedDatasets/{annotated_dataset_id}/feedbackThreads/{feedback_thread_id}/feedbackMessages/{feedback_message_id}'. */
  name: string;
}

export const DeleteProjectsDatasetsAnnotatedDatasetsFeedbackThreadsFeedbackMessagesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v1beta1/projects/{projectsId}/datasets/{datasetsId}/annotatedDatasets/{annotatedDatasetsId}/feedbackThreads/{feedbackThreadsId}/feedbackMessages/{feedbackMessagesId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteProjectsDatasetsAnnotatedDatasetsFeedbackThreadsFeedbackMessagesRequest>;

export type DeleteProjectsDatasetsAnnotatedDatasetsFeedbackThreadsFeedbackMessagesResponse =
  GoogleProtobufEmpty;
export const DeleteProjectsDatasetsAnnotatedDatasetsFeedbackThreadsFeedbackMessagesResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleProtobufEmpty;

export type DeleteProjectsDatasetsAnnotatedDatasetsFeedbackThreadsFeedbackMessagesError =
  DefaultErrors;

/** Delete a FeedbackMessage. */
export const deleteProjectsDatasetsAnnotatedDatasetsFeedbackThreadsFeedbackMessages: API.OperationMethod<
  DeleteProjectsDatasetsAnnotatedDatasetsFeedbackThreadsFeedbackMessagesRequest,
  DeleteProjectsDatasetsAnnotatedDatasetsFeedbackThreadsFeedbackMessagesResponse,
  DeleteProjectsDatasetsAnnotatedDatasetsFeedbackThreadsFeedbackMessagesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input:
    DeleteProjectsDatasetsAnnotatedDatasetsFeedbackThreadsFeedbackMessagesRequest,
  output:
    DeleteProjectsDatasetsAnnotatedDatasetsFeedbackThreadsFeedbackMessagesResponse,
  errors: [],
}));

export interface LabelProjectsDatasetsTextRequest {
  /** Required. Name of the data set to request labeling task, format: projects/{project_id}/datasets/{dataset_id} */
  parent: string;
  /** Request body */
  body?: GoogleCloudDatalabelingV1beta1LabelTextRequest;
}

export const LabelProjectsDatasetsTextRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    body: Schema.optional(GoogleCloudDatalabelingV1beta1LabelTextRequest).pipe(
      T.HttpBody(),
    ),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta1/projects/{projectsId}/datasets/{datasetsId}/text:label",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<LabelProjectsDatasetsTextRequest>;

export type LabelProjectsDatasetsTextResponse = GoogleLongrunningOperation;
export const LabelProjectsDatasetsTextResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleLongrunningOperation;

export type LabelProjectsDatasetsTextError = DefaultErrors;

/** Starts a labeling task for text. The type of text labeling task is configured by feature in the request. */
export const labelProjectsDatasetsText: API.OperationMethod<
  LabelProjectsDatasetsTextRequest,
  LabelProjectsDatasetsTextResponse,
  LabelProjectsDatasetsTextError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: LabelProjectsDatasetsTextRequest,
  output: LabelProjectsDatasetsTextResponse,
  errors: [],
}));

export interface GetProjectsDatasetsEvaluationsRequest {
  /** Required. Name of the evaluation. Format: "projects/{project_id}/datasets/ {dataset_id}/evaluations/{evaluation_id}' */
  name: string;
}

export const GetProjectsDatasetsEvaluationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta1/projects/{projectsId}/datasets/{datasetsId}/evaluations/{evaluationsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsDatasetsEvaluationsRequest>;

export type GetProjectsDatasetsEvaluationsResponse =
  GoogleCloudDatalabelingV1beta1Evaluation;
export const GetProjectsDatasetsEvaluationsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleCloudDatalabelingV1beta1Evaluation;

export type GetProjectsDatasetsEvaluationsError = DefaultErrors;

/** Gets an evaluation by resource name (to search, use projects.evaluations.search). */
export const getProjectsDatasetsEvaluations: API.OperationMethod<
  GetProjectsDatasetsEvaluationsRequest,
  GetProjectsDatasetsEvaluationsResponse,
  GetProjectsDatasetsEvaluationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProjectsDatasetsEvaluationsRequest,
  output: GetProjectsDatasetsEvaluationsResponse,
  errors: [],
}));

export interface SearchProjectsDatasetsEvaluationsExampleComparisonsRequest {
  /** Required. Name of the Evaluation resource to search for example comparisons from. Format: "projects/{project_id}/datasets/{dataset_id}/evaluations/ {evaluation_id}" */
  parent: string;
  /** Request body */
  body?: GoogleCloudDatalabelingV1beta1SearchExampleComparisonsRequest;
}

export const SearchProjectsDatasetsEvaluationsExampleComparisonsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    body: Schema.optional(
      GoogleCloudDatalabelingV1beta1SearchExampleComparisonsRequest,
    ).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta1/projects/{projectsId}/datasets/{datasetsId}/evaluations/{evaluationsId}/exampleComparisons:search",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<SearchProjectsDatasetsEvaluationsExampleComparisonsRequest>;

export type SearchProjectsDatasetsEvaluationsExampleComparisonsResponse =
  GoogleCloudDatalabelingV1beta1SearchExampleComparisonsResponse;
export const SearchProjectsDatasetsEvaluationsExampleComparisonsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleCloudDatalabelingV1beta1SearchExampleComparisonsResponse;

export type SearchProjectsDatasetsEvaluationsExampleComparisonsError =
  DefaultErrors;

/** Searches example comparisons from an evaluation. The return format is a list of example comparisons that show ground truth and prediction(s) for a single input. Search by providing an evaluation ID. */
export const searchProjectsDatasetsEvaluationsExampleComparisons: API.OperationMethod<
  SearchProjectsDatasetsEvaluationsExampleComparisonsRequest,
  SearchProjectsDatasetsEvaluationsExampleComparisonsResponse,
  SearchProjectsDatasetsEvaluationsExampleComparisonsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: SearchProjectsDatasetsEvaluationsExampleComparisonsRequest,
  output: SearchProjectsDatasetsEvaluationsExampleComparisonsResponse,
  errors: [],
}));

export interface DeleteProjectsInstructionsRequest {
  /** Required. Instruction resource name, format: projects/{project_id}/instructions/{instruction_id} */
  name: string;
}

export const DeleteProjectsInstructionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v1beta1/projects/{projectsId}/instructions/{instructionsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteProjectsInstructionsRequest>;

export type DeleteProjectsInstructionsResponse = GoogleProtobufEmpty;
export const DeleteProjectsInstructionsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleProtobufEmpty;

export type DeleteProjectsInstructionsError = DefaultErrors;

/** Deletes an instruction object by resource name. */
export const deleteProjectsInstructions: API.OperationMethod<
  DeleteProjectsInstructionsRequest,
  DeleteProjectsInstructionsResponse,
  DeleteProjectsInstructionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteProjectsInstructionsRequest,
  output: DeleteProjectsInstructionsResponse,
  errors: [],
}));

export interface GetProjectsInstructionsRequest {
  /** Required. Instruction resource name, format: projects/{project_id}/instructions/{instruction_id} */
  name: string;
}

export const GetProjectsInstructionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta1/projects/{projectsId}/instructions/{instructionsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsInstructionsRequest>;

export type GetProjectsInstructionsResponse =
  GoogleCloudDatalabelingV1beta1Instruction;
export const GetProjectsInstructionsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleCloudDatalabelingV1beta1Instruction;

export type GetProjectsInstructionsError = DefaultErrors;

/** Gets an instruction by resource name. */
export const getProjectsInstructions: API.OperationMethod<
  GetProjectsInstructionsRequest,
  GetProjectsInstructionsResponse,
  GetProjectsInstructionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProjectsInstructionsRequest,
  output: GetProjectsInstructionsResponse,
  errors: [],
}));

export interface CreateProjectsInstructionsRequest {
  /** Required. Instruction resource parent, format: projects/{project_id} */
  parent: string;
  /** Request body */
  body?: GoogleCloudDatalabelingV1beta1CreateInstructionRequest;
}

export const CreateProjectsInstructionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    body: Schema.optional(
      GoogleCloudDatalabelingV1beta1CreateInstructionRequest,
    ).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta1/projects/{projectsId}/instructions",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateProjectsInstructionsRequest>;

export type CreateProjectsInstructionsResponse = GoogleLongrunningOperation;
export const CreateProjectsInstructionsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleLongrunningOperation;

export type CreateProjectsInstructionsError = DefaultErrors;

/** Creates an instruction for how data should be labeled. */
export const createProjectsInstructions: API.OperationMethod<
  CreateProjectsInstructionsRequest,
  CreateProjectsInstructionsResponse,
  CreateProjectsInstructionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateProjectsInstructionsRequest,
  output: CreateProjectsInstructionsResponse,
  errors: [],
}));

export interface ListProjectsInstructionsRequest {
  /** Optional. Filter is not supported at this moment. */
  filter?: string;
  /** Required. Instruction resource parent, format: projects/{project_id} */
  parent: string;
  /** Optional. Requested page size. Server may return fewer results than requested. Default value is 100. */
  pageSize?: number;
  /** Optional. A token identifying a page of results for the server to return. Typically obtained by ListInstructionsResponse.next_page_token of the previous [DataLabelingService.ListInstructions] call. Return first page if empty. */
  pageToken?: string;
}

export const ListProjectsInstructionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
    parent: Schema.String.pipe(T.HttpPath("parent")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta1/projects/{projectsId}/instructions",
    }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsInstructionsRequest>;

export type ListProjectsInstructionsResponse =
  GoogleCloudDatalabelingV1beta1ListInstructionsResponse;
export const ListProjectsInstructionsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleCloudDatalabelingV1beta1ListInstructionsResponse;

export type ListProjectsInstructionsError = DefaultErrors;

/** Lists instructions for a project. Pagination is supported. */
export const listProjectsInstructions: API.PaginatedOperationMethod<
  ListProjectsInstructionsRequest,
  ListProjectsInstructionsResponse,
  ListProjectsInstructionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListProjectsInstructionsRequest,
  output: ListProjectsInstructionsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsAnnotationSpecSetsRequest {
  /** Required. AnnotationSpecSet resource name, format: projects/{project_id}/annotationSpecSets/{annotation_spec_set_id} */
  name: string;
}

export const GetProjectsAnnotationSpecSetsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta1/projects/{projectsId}/annotationSpecSets/{annotationSpecSetsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsAnnotationSpecSetsRequest>;

export type GetProjectsAnnotationSpecSetsResponse =
  GoogleCloudDatalabelingV1beta1AnnotationSpecSet;
export const GetProjectsAnnotationSpecSetsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleCloudDatalabelingV1beta1AnnotationSpecSet;

export type GetProjectsAnnotationSpecSetsError = DefaultErrors;

/** Gets an annotation spec set by resource name. */
export const getProjectsAnnotationSpecSets: API.OperationMethod<
  GetProjectsAnnotationSpecSetsRequest,
  GetProjectsAnnotationSpecSetsResponse,
  GetProjectsAnnotationSpecSetsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProjectsAnnotationSpecSetsRequest,
  output: GetProjectsAnnotationSpecSetsResponse,
  errors: [],
}));

export interface DeleteProjectsAnnotationSpecSetsRequest {
  /** Required. AnnotationSpec resource name, format: `projects/{project_id}/annotationSpecSets/{annotation_spec_set_id}`. */
  name: string;
}

export const DeleteProjectsAnnotationSpecSetsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v1beta1/projects/{projectsId}/annotationSpecSets/{annotationSpecSetsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteProjectsAnnotationSpecSetsRequest>;

export type DeleteProjectsAnnotationSpecSetsResponse = GoogleProtobufEmpty;
export const DeleteProjectsAnnotationSpecSetsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleProtobufEmpty;

export type DeleteProjectsAnnotationSpecSetsError = DefaultErrors;

/** Deletes an annotation spec set by resource name. */
export const deleteProjectsAnnotationSpecSets: API.OperationMethod<
  DeleteProjectsAnnotationSpecSetsRequest,
  DeleteProjectsAnnotationSpecSetsResponse,
  DeleteProjectsAnnotationSpecSetsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteProjectsAnnotationSpecSetsRequest,
  output: DeleteProjectsAnnotationSpecSetsResponse,
  errors: [],
}));

export interface ListProjectsAnnotationSpecSetsRequest {
  /** Optional. Filter is not supported at this moment. */
  filter?: string;
  /** Optional. A token identifying a page of results for the server to return. Typically obtained by ListAnnotationSpecSetsResponse.next_page_token of the previous [DataLabelingService.ListAnnotationSpecSets] call. Return first page if empty. */
  pageToken?: string;
  /** Optional. Requested page size. Server may return fewer results than requested. Default value is 100. */
  pageSize?: number;
  /** Required. Parent of AnnotationSpecSet resource, format: projects/{project_id} */
  parent: string;
}

export const ListProjectsAnnotationSpecSetsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    parent: Schema.String.pipe(T.HttpPath("parent")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta1/projects/{projectsId}/annotationSpecSets",
    }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsAnnotationSpecSetsRequest>;

export type ListProjectsAnnotationSpecSetsResponse =
  GoogleCloudDatalabelingV1beta1ListAnnotationSpecSetsResponse;
export const ListProjectsAnnotationSpecSetsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleCloudDatalabelingV1beta1ListAnnotationSpecSetsResponse;

export type ListProjectsAnnotationSpecSetsError = DefaultErrors;

/** Lists annotation spec sets for a project. Pagination is supported. */
export const listProjectsAnnotationSpecSets: API.PaginatedOperationMethod<
  ListProjectsAnnotationSpecSetsRequest,
  ListProjectsAnnotationSpecSetsResponse,
  ListProjectsAnnotationSpecSetsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListProjectsAnnotationSpecSetsRequest,
  output: ListProjectsAnnotationSpecSetsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface CreateProjectsAnnotationSpecSetsRequest {
  /** Required. AnnotationSpecSet resource parent, format: projects/{project_id} */
  parent: string;
  /** Request body */
  body?: GoogleCloudDatalabelingV1beta1CreateAnnotationSpecSetRequest;
}

export const CreateProjectsAnnotationSpecSetsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    body: Schema.optional(
      GoogleCloudDatalabelingV1beta1CreateAnnotationSpecSetRequest,
    ).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta1/projects/{projectsId}/annotationSpecSets",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateProjectsAnnotationSpecSetsRequest>;

export type CreateProjectsAnnotationSpecSetsResponse =
  GoogleCloudDatalabelingV1beta1AnnotationSpecSet;
export const CreateProjectsAnnotationSpecSetsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleCloudDatalabelingV1beta1AnnotationSpecSet;

export type CreateProjectsAnnotationSpecSetsError = DefaultErrors;

/** Creates an annotation spec set by providing a set of labels. */
export const createProjectsAnnotationSpecSets: API.OperationMethod<
  CreateProjectsAnnotationSpecSetsRequest,
  CreateProjectsAnnotationSpecSetsResponse,
  CreateProjectsAnnotationSpecSetsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateProjectsAnnotationSpecSetsRequest,
  output: CreateProjectsAnnotationSpecSetsResponse,
  errors: [],
}));

export interface DeleteProjectsEvaluationJobsRequest {
  /** Required. Name of the evaluation job that is going to be deleted. Format: "projects/{project_id}/evaluationJobs/{evaluation_job_id}" */
  name: string;
}

export const DeleteProjectsEvaluationJobsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v1beta1/projects/{projectsId}/evaluationJobs/{evaluationJobsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteProjectsEvaluationJobsRequest>;

export type DeleteProjectsEvaluationJobsResponse = GoogleProtobufEmpty;
export const DeleteProjectsEvaluationJobsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleProtobufEmpty;

export type DeleteProjectsEvaluationJobsError = DefaultErrors;

/** Stops and deletes an evaluation job. */
export const deleteProjectsEvaluationJobs: API.OperationMethod<
  DeleteProjectsEvaluationJobsRequest,
  DeleteProjectsEvaluationJobsResponse,
  DeleteProjectsEvaluationJobsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteProjectsEvaluationJobsRequest,
  output: DeleteProjectsEvaluationJobsResponse,
  errors: [],
}));

export interface ResumeProjectsEvaluationJobsRequest {
  /** Required. Name of the evaluation job that is going to be resumed. Format: "projects/{project_id}/evaluationJobs/{evaluation_job_id}" */
  name: string;
  /** Request body */
  body?: GoogleCloudDatalabelingV1beta1ResumeEvaluationJobRequest;
}

export const ResumeProjectsEvaluationJobsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    body: Schema.optional(
      GoogleCloudDatalabelingV1beta1ResumeEvaluationJobRequest,
    ).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta1/projects/{projectsId}/evaluationJobs/{evaluationJobsId}:resume",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<ResumeProjectsEvaluationJobsRequest>;

export type ResumeProjectsEvaluationJobsResponse = GoogleProtobufEmpty;
export const ResumeProjectsEvaluationJobsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleProtobufEmpty;

export type ResumeProjectsEvaluationJobsError = DefaultErrors;

/** Resumes a paused evaluation job. A deleted evaluation job can't be resumed. Resuming a running or scheduled evaluation job is a no-op. */
export const resumeProjectsEvaluationJobs: API.OperationMethod<
  ResumeProjectsEvaluationJobsRequest,
  ResumeProjectsEvaluationJobsResponse,
  ResumeProjectsEvaluationJobsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ResumeProjectsEvaluationJobsRequest,
  output: ResumeProjectsEvaluationJobsResponse,
  errors: [],
}));

export interface ListProjectsEvaluationJobsRequest {
  /** Optional. Requested page size. Server may return fewer results than requested. Default value is 100. */
  pageSize?: number;
  /** Optional. A token identifying a page of results for the server to return. Typically obtained by the nextPageToken in the response to the previous request. The request returns the first page if this is empty. */
  pageToken?: string;
  /** Optional. You can filter the jobs to list by model_id (also known as model_name, as described in EvaluationJob.modelVersion) or by evaluation job state (as described in EvaluationJob.state). To filter by both criteria, use the `AND` operator or the `OR` operator. For example, you can use the following string for your filter: "evaluation_job.model_id = {model_name} AND evaluation_job.state = {evaluation_job_state}" */
  filter?: string;
  /** Required. Evaluation job resource parent. Format: "projects/{project_id}" */
  parent: string;
}

export const ListProjectsEvaluationJobsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
    parent: Schema.String.pipe(T.HttpPath("parent")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta1/projects/{projectsId}/evaluationJobs",
    }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsEvaluationJobsRequest>;

export type ListProjectsEvaluationJobsResponse =
  GoogleCloudDatalabelingV1beta1ListEvaluationJobsResponse;
export const ListProjectsEvaluationJobsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleCloudDatalabelingV1beta1ListEvaluationJobsResponse;

export type ListProjectsEvaluationJobsError = DefaultErrors;

/** Lists all evaluation jobs within a project with possible filters. Pagination is supported. */
export const listProjectsEvaluationJobs: API.PaginatedOperationMethod<
  ListProjectsEvaluationJobsRequest,
  ListProjectsEvaluationJobsResponse,
  ListProjectsEvaluationJobsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListProjectsEvaluationJobsRequest,
  output: ListProjectsEvaluationJobsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface CreateProjectsEvaluationJobsRequest {
  /** Required. Evaluation job resource parent. Format: "projects/{project_id}" */
  parent: string;
  /** Request body */
  body?: GoogleCloudDatalabelingV1beta1CreateEvaluationJobRequest;
}

export const CreateProjectsEvaluationJobsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    body: Schema.optional(
      GoogleCloudDatalabelingV1beta1CreateEvaluationJobRequest,
    ).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta1/projects/{projectsId}/evaluationJobs",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateProjectsEvaluationJobsRequest>;

export type CreateProjectsEvaluationJobsResponse =
  GoogleCloudDatalabelingV1beta1EvaluationJob;
export const CreateProjectsEvaluationJobsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleCloudDatalabelingV1beta1EvaluationJob;

export type CreateProjectsEvaluationJobsError = DefaultErrors;

/** Creates an evaluation job. */
export const createProjectsEvaluationJobs: API.OperationMethod<
  CreateProjectsEvaluationJobsRequest,
  CreateProjectsEvaluationJobsResponse,
  CreateProjectsEvaluationJobsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateProjectsEvaluationJobsRequest,
  output: CreateProjectsEvaluationJobsResponse,
  errors: [],
}));

export interface PauseProjectsEvaluationJobsRequest {
  /** Required. Name of the evaluation job that is going to be paused. Format: "projects/{project_id}/evaluationJobs/{evaluation_job_id}" */
  name: string;
  /** Request body */
  body?: GoogleCloudDatalabelingV1beta1PauseEvaluationJobRequest;
}

export const PauseProjectsEvaluationJobsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    body: Schema.optional(
      GoogleCloudDatalabelingV1beta1PauseEvaluationJobRequest,
    ).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta1/projects/{projectsId}/evaluationJobs/{evaluationJobsId}:pause",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PauseProjectsEvaluationJobsRequest>;

export type PauseProjectsEvaluationJobsResponse = GoogleProtobufEmpty;
export const PauseProjectsEvaluationJobsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleProtobufEmpty;

export type PauseProjectsEvaluationJobsError = DefaultErrors;

/** Pauses an evaluation job. Pausing an evaluation job that is already in a `PAUSED` state is a no-op. */
export const pauseProjectsEvaluationJobs: API.OperationMethod<
  PauseProjectsEvaluationJobsRequest,
  PauseProjectsEvaluationJobsResponse,
  PauseProjectsEvaluationJobsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PauseProjectsEvaluationJobsRequest,
  output: PauseProjectsEvaluationJobsResponse,
  errors: [],
}));

export interface PatchProjectsEvaluationJobsRequest {
  /** Output only. After you create a job, Data Labeling Service assigns a name to the job with the following format: "projects/{project_id}/evaluationJobs/ {evaluation_job_id}" */
  name: string;
  /** Optional. Mask for which fields to update. You can only provide the following fields: * `evaluationJobConfig.humanAnnotationConfig.instruction` * `evaluationJobConfig.exampleCount` * `evaluationJobConfig.exampleSamplePercentage` You can provide more than one of these fields by separating them with commas. */
  updateMask?: string;
  /** Request body */
  body?: GoogleCloudDatalabelingV1beta1EvaluationJob;
}

export const PatchProjectsEvaluationJobsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    body: Schema.optional(GoogleCloudDatalabelingV1beta1EvaluationJob).pipe(
      T.HttpBody(),
    ),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v1beta1/projects/{projectsId}/evaluationJobs/{evaluationJobsId}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PatchProjectsEvaluationJobsRequest>;

export type PatchProjectsEvaluationJobsResponse =
  GoogleCloudDatalabelingV1beta1EvaluationJob;
export const PatchProjectsEvaluationJobsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleCloudDatalabelingV1beta1EvaluationJob;

export type PatchProjectsEvaluationJobsError = DefaultErrors;

/** Updates an evaluation job. You can only update certain fields of the job's EvaluationJobConfig: `humanAnnotationConfig.instruction`, `exampleCount`, and `exampleSamplePercentage`. If you want to change any other aspect of the evaluation job, you must delete the job and create a new one. */
export const patchProjectsEvaluationJobs: API.OperationMethod<
  PatchProjectsEvaluationJobsRequest,
  PatchProjectsEvaluationJobsResponse,
  PatchProjectsEvaluationJobsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchProjectsEvaluationJobsRequest,
  output: PatchProjectsEvaluationJobsResponse,
  errors: [],
}));

export interface GetProjectsEvaluationJobsRequest {
  /** Required. Name of the evaluation job. Format: "projects/{project_id} /evaluationJobs/{evaluation_job_id}" */
  name: string;
}

export const GetProjectsEvaluationJobsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta1/projects/{projectsId}/evaluationJobs/{evaluationJobsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsEvaluationJobsRequest>;

export type GetProjectsEvaluationJobsResponse =
  GoogleCloudDatalabelingV1beta1EvaluationJob;
export const GetProjectsEvaluationJobsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleCloudDatalabelingV1beta1EvaluationJob;

export type GetProjectsEvaluationJobsError = DefaultErrors;

/** Gets an evaluation job by resource name. */
export const getProjectsEvaluationJobs: API.OperationMethod<
  GetProjectsEvaluationJobsRequest,
  GetProjectsEvaluationJobsResponse,
  GetProjectsEvaluationJobsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProjectsEvaluationJobsRequest,
  output: GetProjectsEvaluationJobsResponse,
  errors: [],
}));
