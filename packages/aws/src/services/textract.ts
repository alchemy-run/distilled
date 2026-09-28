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
  sdkId: "Textract",
  target: "Textract",
  version: "2018-06-27",
  sigv4: "textract",
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
                `https://textract-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://textract-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://textract.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://textract.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class AccessDeniedException
  extends /*@__PURE__*/ TE.TaggedError("AccessDeniedException", ["AuthError"])<{
    readonly message?: string;
    readonly Code?: string;
  }> {}
export class BadDocumentException
  extends /*@__PURE__*/ TE.TaggedError("BadDocumentException")<{
    readonly message?: string;
    readonly Code?: string;
  }> {}
export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError("ConflictException")<{
    readonly message?: string;
    readonly Code?: string;
  }> {}
export class DocumentTooLargeException
  extends /*@__PURE__*/ TE.TaggedError("DocumentTooLargeException")<{
    readonly message?: string;
    readonly Code?: string;
  }> {}
export class HumanLoopQuotaExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "HumanLoopQuotaExceededException",
    ["QuotaError"],
    { status: 402 },
  )<{
    readonly ResourceType?: string;
    readonly QuotaCode?: string;
    readonly ServiceCode?: string;
    readonly message?: string;
    readonly Code?: string;
  }> {}
export class IdempotentParameterMismatchException
  extends /*@__PURE__*/ TE.TaggedError("IdempotentParameterMismatchException")<{
    readonly message?: string;
    readonly Code?: string;
  }> {}
export class InternalServerError
  extends /*@__PURE__*/ TE.TaggedError("InternalServerError")<{
    readonly message?: string;
    readonly Code?: string;
  }> {}
export class InvalidJobIdException
  extends /*@__PURE__*/ TE.TaggedError("InvalidJobIdException")<{
    readonly message?: string;
    readonly Code?: string;
  }> {}
export class InvalidKMSKeyException
  extends /*@__PURE__*/ TE.TaggedError("InvalidKMSKeyException")<{
    readonly message?: string;
    readonly Code?: string;
  }> {}
export class InvalidParameterException
  extends /*@__PURE__*/ TE.TaggedError("InvalidParameterException")<{
    readonly message?: string;
    readonly Code?: string;
  }> {}
export class InvalidS3ObjectException
  extends /*@__PURE__*/ TE.TaggedError("InvalidS3ObjectException")<{
    readonly message?: string;
    readonly Code?: string;
  }> {}
export class LimitExceededException
  extends /*@__PURE__*/ TE.TaggedError("LimitExceededException")<{
    readonly message?: string;
    readonly Code?: string;
  }> {}
export class ProvisionedThroughputExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ProvisionedThroughputExceededException",
  )<{ readonly message?: string; readonly Code?: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError("ResourceNotFoundException")<{
    readonly message?: string;
    readonly Code?: string;
  }> {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ TE.TaggedError("ServiceQuotaExceededException")<{
    readonly message?: string;
    readonly Code?: string;
  }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError("ThrottlingException")<{
    readonly message?: string;
    readonly Code?: string;
  }> {}
export class UnsupportedDocumentException
  extends /*@__PURE__*/ TE.TaggedError("UnsupportedDocumentException")<{
    readonly message?: string;
    readonly Code?: string;
  }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError("ValidationException")<{
    readonly message?: string;
    readonly Code?: string;
  }> {}
export type ImageBlob = Uint8Array;
export type S3Bucket = string;
export type S3ObjectName = string;
export type S3ObjectVersion = string;
export interface S3Object {
  Bucket?: string;
  Name?: string;
  Version?: string;
}
export interface Document {
  Bytes?: Uint8Array;
  S3Object?: S3Object;
}
export type FeatureType =
  | "TABLES"
  | "FORMS"
  | "QUERIES"
  | "SIGNATURES"
  | "LAYOUT"
  | (string & {});
export type FeatureTypes = FeatureType[];
export type HumanLoopName = string;
export type FlowDefinitionArn = string;
export type ContentClassifier =
  | "FreeOfPersonallyIdentifiableInformation"
  | "FreeOfAdultContent"
  | (string & {});
export type ContentClassifiers = ContentClassifier[];
export interface HumanLoopDataAttributes {
  ContentClassifiers?: ContentClassifier[];
}
export interface HumanLoopConfig {
  HumanLoopName: string;
  FlowDefinitionArn: string;
  DataAttributes?: HumanLoopDataAttributes;
}
export type QueryInput = string;
export type QueryPage = string;
export type QueryPages = string[];
export interface Query {
  Text: string;
  Alias?: string;
  Pages?: string[];
}
export type Queries = Query[];
export interface QueriesConfig {
  Queries: Query[];
}
export type AdapterId = string;
export type AdapterPage = string;
export type AdapterPages = string[];
export type AdapterVersion = string;
export interface Adapter {
  AdapterId: string;
  Pages?: string[];
  Version: string;
}
export type Adapters = Adapter[];
export interface AdaptersConfig {
  Adapters: Adapter[];
}
export interface AnalyzeDocumentRequest {
  Document: Document;
  FeatureTypes: FeatureType[];
  HumanLoopConfig?: HumanLoopConfig;
  QueriesConfig?: QueriesConfig;
  AdaptersConfig?: AdaptersConfig;
}
export type UInteger = number;
export interface DocumentMetadata {
  Pages?: number;
}
export type BlockType =
  | "KEY_VALUE_SET"
  | "PAGE"
  | "LINE"
  | "WORD"
  | "TABLE"
  | "CELL"
  | "SELECTION_ELEMENT"
  | "MERGED_CELL"
  | "TITLE"
  | "QUERY"
  | "QUERY_RESULT"
  | "SIGNATURE"
  | "TABLE_TITLE"
  | "TABLE_FOOTER"
  | "LAYOUT_TEXT"
  | "LAYOUT_TITLE"
  | "LAYOUT_HEADER"
  | "LAYOUT_FOOTER"
  | "LAYOUT_SECTION_HEADER"
  | "LAYOUT_PAGE_NUMBER"
  | "LAYOUT_LIST"
  | "LAYOUT_FIGURE"
  | "LAYOUT_TABLE"
  | "LAYOUT_KEY_VALUE"
  | (string & {});
export type Percent = number;
export type TextType = "HANDWRITING" | "PRINTED" | (string & {});
export interface BoundingBox {
  Width?: number;
  Height?: number;
  Left?: number;
  Top?: number;
}
export interface Point {
  X?: number;
  Y?: number;
}
export type Polygon = Point[];
export type Angle = number;
export interface Geometry {
  BoundingBox?: BoundingBox;
  Polygon?: Point[];
  RotationAngle?: number;
}
export type NonEmptyString = string;
export type RelationshipType =
  | "VALUE"
  | "CHILD"
  | "COMPLEX_FEATURES"
  | "MERGED_CELL"
  | "TITLE"
  | "ANSWER"
  | "TABLE"
  | "TABLE_TITLE"
  | "TABLE_FOOTER"
  | (string & {});
export type IdList = string[];
export interface Relationship {
  Type?: RelationshipType;
  Ids?: string[];
}
export type RelationshipList = Relationship[];
export type EntityType =
  | "KEY"
  | "VALUE"
  | "COLUMN_HEADER"
  | "TABLE_TITLE"
  | "TABLE_FOOTER"
  | "TABLE_SECTION_TITLE"
  | "TABLE_SUMMARY"
  | "STRUCTURED_TABLE"
  | "SEMI_STRUCTURED_TABLE"
  | (string & {});
export type EntityTypes = EntityType[];
export type SelectionStatus = "SELECTED" | "NOT_SELECTED" | (string & {});
export interface Block {
  BlockType?: BlockType;
  Confidence?: number;
  Text?: string;
  TextType?: TextType;
  RowIndex?: number;
  ColumnIndex?: number;
  RowSpan?: number;
  ColumnSpan?: number;
  Geometry?: Geometry;
  Id?: string;
  Relationships?: Relationship[];
  EntityTypes?: EntityType[];
  SelectionStatus?: SelectionStatus;
  Page?: number;
  Query?: Query;
}
export type BlockList = Block[];
export type HumanLoopArn = string;
export type HumanLoopActivationReason = string;
export type HumanLoopActivationReasons = string[];
export type SynthesizedJsonHumanLoopActivationConditionsEvaluationResults =
  string;
export interface HumanLoopActivationOutput {
  HumanLoopArn?: string;
  HumanLoopActivationReasons?: string[];
  HumanLoopActivationConditionsEvaluationResults?: string;
}
export interface AnalyzeDocumentResponse {
  DocumentMetadata?: DocumentMetadata;
  Blocks?: Block[];
  HumanLoopActivationOutput?: HumanLoopActivationOutput;
  AnalyzeDocumentModelVersion?: string;
}
export interface AnalyzeExpenseRequest {
  Document: Document;
}
export interface ExpenseType {
  Text?: string;
  Confidence?: number;
}
export interface ExpenseDetection {
  Text?: string;
  Geometry?: Geometry;
  Confidence?: number;
}
export interface ExpenseCurrency {
  Code?: string;
  Confidence?: number;
}
export type StringList = string[];
export interface ExpenseGroupProperty {
  Types?: string[];
  Id?: string;
}
export type ExpenseGroupPropertyList = ExpenseGroupProperty[];
export interface ExpenseField {
  Type?: ExpenseType;
  LabelDetection?: ExpenseDetection;
  ValueDetection?: ExpenseDetection;
  PageNumber?: number;
  Currency?: ExpenseCurrency;
  GroupProperties?: ExpenseGroupProperty[];
}
export type ExpenseFieldList = ExpenseField[];
export interface LineItemFields {
  LineItemExpenseFields?: ExpenseField[];
}
export type LineItemList = LineItemFields[];
export interface LineItemGroup {
  LineItemGroupIndex?: number;
  LineItems?: LineItemFields[];
}
export type LineItemGroupList = LineItemGroup[];
export interface ExpenseDocument {
  ExpenseIndex?: number;
  SummaryFields?: ExpenseField[];
  LineItemGroups?: LineItemGroup[];
  Blocks?: Block[];
}
export type ExpenseDocumentList = ExpenseDocument[];
export interface AnalyzeExpenseResponse {
  DocumentMetadata?: DocumentMetadata;
  ExpenseDocuments?: ExpenseDocument[];
}
export type DocumentPages = Document[];
export interface AnalyzeIDRequest {
  DocumentPages: Document[];
}
export type ValueType = "DATE" | (string & {});
export interface NormalizedValue {
  Value?: string;
  ValueType?: ValueType;
}
export interface AnalyzeIDDetections {
  Text: string;
  NormalizedValue?: NormalizedValue;
  Confidence?: number;
}
export interface IdentityDocumentField {
  Type?: AnalyzeIDDetections;
  ValueDetection?: AnalyzeIDDetections;
}
export type IdentityDocumentFieldList = IdentityDocumentField[];
export interface IdentityDocument {
  DocumentIndex?: number;
  IdentityDocumentFields?: IdentityDocumentField[];
  Blocks?: Block[];
}
export type IdentityDocumentList = IdentityDocument[];
export interface AnalyzeIDResponse {
  IdentityDocuments?: IdentityDocument[];
  DocumentMetadata?: DocumentMetadata;
  AnalyzeIDModelVersion?: string;
}
export type AdapterName = string;
export type ClientRequestToken = string;
export type AdapterDescription = string;
export type AutoUpdate = "ENABLED" | "DISABLED" | (string & {});
export type TagKey = string;
export type TagValue = string;
export type TagMap = { [key: string]: string | undefined };
export interface CreateAdapterRequest {
  AdapterName: string;
  ClientRequestToken?: string;
  Description?: string;
  FeatureTypes: FeatureType[];
  AutoUpdate?: AutoUpdate;
  Tags?: { [key: string]: string | undefined };
}
export interface CreateAdapterResponse {
  AdapterId?: string;
}
export interface AdapterVersionDatasetConfig {
  ManifestS3Object?: S3Object;
}
export type KMSKeyId = string;
export interface OutputConfig {
  S3Bucket: string;
  S3Prefix?: string;
}
export interface CreateAdapterVersionRequest {
  AdapterId: string;
  ClientRequestToken?: string;
  DatasetConfig: AdapterVersionDatasetConfig;
  KMSKeyId?: string;
  OutputConfig: OutputConfig;
  Tags?: { [key: string]: string | undefined };
}
export interface CreateAdapterVersionResponse {
  AdapterId?: string;
  AdapterVersion?: string;
}
export interface DeleteAdapterRequest {
  AdapterId: string;
}
export interface DeleteAdapterResponse {}
export interface DeleteAdapterVersionRequest {
  AdapterId: string;
  AdapterVersion: string;
}
export interface DeleteAdapterVersionResponse {}
export interface DetectDocumentTextRequest {
  Document: Document;
}
export interface DetectDocumentTextResponse {
  DocumentMetadata?: DocumentMetadata;
  Blocks?: Block[];
  DetectDocumentTextModelVersion?: string;
}
export interface GetAdapterRequest {
  AdapterId: string;
}
export interface GetAdapterResponse {
  AdapterId?: string;
  AdapterName?: string;
  CreationTime?: Date;
  Description?: string;
  FeatureTypes?: FeatureType[];
  AutoUpdate?: AutoUpdate;
  Tags?: { [key: string]: string | undefined };
}
export interface GetAdapterVersionRequest {
  AdapterId: string;
  AdapterVersion: string;
}
export type AdapterVersionStatus =
  | "ACTIVE"
  | "AT_RISK"
  | "DEPRECATED"
  | "CREATION_ERROR"
  | "CREATION_IN_PROGRESS"
  | (string & {});
export type AdapterVersionStatusMessage = string;
export interface EvaluationMetric {
  F1Score?: number;
  Precision?: number;
  Recall?: number;
}
export interface AdapterVersionEvaluationMetric {
  Baseline?: EvaluationMetric;
  AdapterVersion?: EvaluationMetric;
  FeatureType?: FeatureType;
}
export type AdapterVersionEvaluationMetrics = AdapterVersionEvaluationMetric[];
export interface GetAdapterVersionResponse {
  AdapterId?: string;
  AdapterVersion?: string;
  CreationTime?: Date;
  FeatureTypes?: FeatureType[];
  Status?: AdapterVersionStatus;
  StatusMessage?: string;
  DatasetConfig?: AdapterVersionDatasetConfig;
  KMSKeyId?: string;
  OutputConfig?: OutputConfig;
  EvaluationMetrics?: AdapterVersionEvaluationMetric[];
  Tags?: { [key: string]: string | undefined };
}
export type JobId = string;
export type MaxResults = number;
export type PaginationToken = string;
export interface GetDocumentAnalysisRequest {
  JobId: string;
  MaxResults?: number;
  NextToken?: string;
}
export type JobStatus =
  | "IN_PROGRESS"
  | "SUCCEEDED"
  | "FAILED"
  | "PARTIAL_SUCCESS"
  | (string & {});
export type ErrorCode = string;
export type Pages = number[];
export interface Warning {
  ErrorCode?: string;
  Pages?: number[];
}
export type Warnings = Warning[];
export type StatusMessage = string;
export interface GetDocumentAnalysisResponse {
  DocumentMetadata?: DocumentMetadata;
  JobStatus?: JobStatus;
  NextToken?: string;
  Blocks?: Block[];
  Warnings?: Warning[];
  StatusMessage?: string;
  AnalyzeDocumentModelVersion?: string;
}
export interface GetDocumentTextDetectionRequest {
  JobId: string;
  MaxResults?: number;
  NextToken?: string;
}
export interface GetDocumentTextDetectionResponse {
  DocumentMetadata?: DocumentMetadata;
  JobStatus?: JobStatus;
  NextToken?: string;
  Blocks?: Block[];
  Warnings?: Warning[];
  StatusMessage?: string;
  DetectDocumentTextModelVersion?: string;
}
export interface GetExpenseAnalysisRequest {
  JobId: string;
  MaxResults?: number;
  NextToken?: string;
}
export interface GetExpenseAnalysisResponse {
  DocumentMetadata?: DocumentMetadata;
  JobStatus?: JobStatus;
  NextToken?: string;
  ExpenseDocuments?: ExpenseDocument[];
  Warnings?: Warning[];
  StatusMessage?: string;
  AnalyzeExpenseModelVersion?: string;
}
export interface GetLendingAnalysisRequest {
  JobId: string;
  MaxResults?: number;
  NextToken?: string;
}
export interface Prediction {
  Value?: string;
  Confidence?: number;
}
export type PredictionList = Prediction[];
export interface PageClassification {
  PageType: Prediction[];
  PageNumber: Prediction[];
}
export interface LendingDetection {
  Text?: string;
  SelectionStatus?: SelectionStatus;
  Geometry?: Geometry;
  Confidence?: number;
}
export type LendingDetectionList = LendingDetection[];
export interface LendingField {
  Type?: string;
  KeyDetection?: LendingDetection;
  ValueDetections?: LendingDetection[];
}
export type LendingFieldList = LendingField[];
export interface SignatureDetection {
  Confidence?: number;
  Geometry?: Geometry;
}
export type SignatureDetectionList = SignatureDetection[];
export interface LendingDocument {
  LendingFields?: LendingField[];
  SignatureDetections?: SignatureDetection[];
}
export interface Extraction {
  LendingDocument?: LendingDocument;
  ExpenseDocument?: ExpenseDocument;
  IdentityDocument?: IdentityDocument;
}
export type ExtractionList = Extraction[];
export interface LendingResult {
  Page?: number;
  PageClassification?: PageClassification;
  Extractions?: Extraction[];
}
export type LendingResultList = LendingResult[];
export interface GetLendingAnalysisResponse {
  DocumentMetadata?: DocumentMetadata;
  JobStatus?: JobStatus;
  NextToken?: string;
  Results?: LendingResult[];
  Warnings?: Warning[];
  StatusMessage?: string;
  AnalyzeLendingModelVersion?: string;
}
export interface GetLendingAnalysisSummaryRequest {
  JobId: string;
}
export type PageList = number[];
export interface SplitDocument {
  Index?: number;
  Pages?: number[];
}
export type SplitDocumentList = SplitDocument[];
export interface DetectedSignature {
  Page?: number;
}
export type DetectedSignatureList = DetectedSignature[];
export interface UndetectedSignature {
  Page?: number;
}
export type UndetectedSignatureList = UndetectedSignature[];
export interface DocumentGroup {
  Type?: string;
  SplitDocuments?: SplitDocument[];
  DetectedSignatures?: DetectedSignature[];
  UndetectedSignatures?: UndetectedSignature[];
}
export type DocumentGroupList = DocumentGroup[];
export type UndetectedDocumentTypeList = string[];
export interface LendingSummary {
  DocumentGroups?: DocumentGroup[];
  UndetectedDocumentTypes?: string[];
}
export interface GetLendingAnalysisSummaryResponse {
  DocumentMetadata?: DocumentMetadata;
  JobStatus?: JobStatus;
  Summary?: LendingSummary;
  Warnings?: Warning[];
  StatusMessage?: string;
  AnalyzeLendingModelVersion?: string;
}
export interface ListAdaptersRequest {
  AfterCreationTime?: Date;
  BeforeCreationTime?: Date;
  MaxResults?: number;
  NextToken?: string;
}
export interface AdapterOverview {
  AdapterId?: string;
  AdapterName?: string;
  CreationTime?: Date;
  FeatureTypes?: FeatureType[];
}
export type AdapterList = AdapterOverview[];
export interface ListAdaptersResponse {
  Adapters?: AdapterOverview[];
  NextToken?: string;
}
export interface ListAdapterVersionsRequest {
  AdapterId?: string;
  AfterCreationTime?: Date;
  BeforeCreationTime?: Date;
  MaxResults?: number;
  NextToken?: string;
}
export interface AdapterVersionOverview {
  AdapterId?: string;
  AdapterVersion?: string;
  CreationTime?: Date;
  FeatureTypes?: FeatureType[];
  Status?: AdapterVersionStatus;
  StatusMessage?: string;
}
export type AdapterVersionList = AdapterVersionOverview[];
export interface ListAdapterVersionsResponse {
  AdapterVersions?: AdapterVersionOverview[];
  NextToken?: string;
}
export type AmazonResourceName = string;
export interface ListTagsForResourceRequest {
  ResourceARN: string;
}
export interface ListTagsForResourceResponse {
  Tags?: { [key: string]: string | undefined };
}
export interface DocumentLocation {
  S3Object?: S3Object;
}
export type JobTag = string;
export type SNSTopicArn = string;
export type RoleArn = string;
export interface NotificationChannel {
  SNSTopicArn: string;
  RoleArn: string;
}
export interface StartDocumentAnalysisRequest {
  DocumentLocation: DocumentLocation;
  FeatureTypes: FeatureType[];
  ClientRequestToken?: string;
  JobTag?: string;
  NotificationChannel?: NotificationChannel;
  OutputConfig?: OutputConfig;
  KMSKeyId?: string;
  QueriesConfig?: QueriesConfig;
  AdaptersConfig?: AdaptersConfig;
}
export interface StartDocumentAnalysisResponse {
  JobId?: string;
}
export interface StartDocumentTextDetectionRequest {
  DocumentLocation: DocumentLocation;
  ClientRequestToken?: string;
  JobTag?: string;
  NotificationChannel?: NotificationChannel;
  OutputConfig?: OutputConfig;
  KMSKeyId?: string;
}
export interface StartDocumentTextDetectionResponse {
  JobId?: string;
}
export interface StartExpenseAnalysisRequest {
  DocumentLocation: DocumentLocation;
  ClientRequestToken?: string;
  JobTag?: string;
  NotificationChannel?: NotificationChannel;
  OutputConfig?: OutputConfig;
  KMSKeyId?: string;
}
export interface StartExpenseAnalysisResponse {
  JobId?: string;
}
export interface StartLendingAnalysisRequest {
  DocumentLocation: DocumentLocation;
  ClientRequestToken?: string;
  JobTag?: string;
  NotificationChannel?: NotificationChannel;
  OutputConfig?: OutputConfig;
  KMSKeyId?: string;
}
export interface StartLendingAnalysisResponse {
  JobId?: string;
}
export interface TagResourceRequest {
  ResourceARN: string;
  Tags: { [key: string]: string | undefined };
}
export interface TagResourceResponse {}
export type TagKeyList = string[];
export interface UntagResourceRequest {
  ResourceARN: string;
  TagKeys: string[];
}
export interface UntagResourceResponse {}
export interface UpdateAdapterRequest {
  AdapterId: string;
  Description?: string;
  AdapterName?: string;
  AutoUpdate?: AutoUpdate;
}
export interface UpdateAdapterResponse {
  AdapterId?: string;
  AdapterName?: string;
  CreationTime?: Date;
  Description?: string;
  FeatureTypes?: FeatureType[];
  AutoUpdate?: AutoUpdate;
}
export type AnalyzeDocumentError =
  | AccessDeniedException
  | BadDocumentException
  | DocumentTooLargeException
  | HumanLoopQuotaExceededException
  | InternalServerError
  | InvalidParameterException
  | InvalidS3ObjectException
  | ProvisionedThroughputExceededException
  | ThrottlingException
  | UnsupportedDocumentException
  | CommonErrors;
/**
 * Analyzes an input document for relationships between detected items.
 *
 * The types of information returned are as follows:
 *
 * - Form data (key-value pairs). The related information is returned in two Block objects, each of type `KEY_VALUE_SET`: a KEY
 * `Block` object and a VALUE `Block` object. For example,
 * *Name: Ana Silva Carolina* contains a key and value.
 * *Name:* is the key. *Ana Silva Carolina* is
 * the value.
 *
 * - Table and table cell data. A TABLE `Block` object contains information
 * about a detected table. A CELL `Block` object is returned for each cell in
 * a table.
 *
 * - Lines and words of text. A LINE `Block` object contains one or more
 * WORD `Block` objects. All lines and words that are detected in the
 * document are returned (including text that doesn't have a relationship with the value
 * of `FeatureTypes`).
 *
 * - Signatures. A SIGNATURE `Block` object contains the location information
 * of a signature in a document. If used in conjunction with forms or tables, a signature
 * can be given a Key-Value pairing or be detected in the cell of a table.
 *
 * - Query. A QUERY Block object contains the query text, alias and link to the
 * associated Query results block object.
 *
 * - Query Result. A QUERY_RESULT Block object contains the answer to the query and an
 * ID that connects it to the query asked. This Block also contains a confidence
 * score.
 *
 * Selection elements such as check boxes and option buttons (radio buttons) can be
 * detected in form data and in tables. A SELECTION_ELEMENT `Block` object contains
 * information about a selection element, including the selection status.
 *
 * You can choose which type of analysis to perform by specifying the
 * `FeatureTypes` list.
 *
 * The output is returned in a list of `Block` objects.
 *
 * `AnalyzeDocument` is a synchronous operation. To analyze documents
 * asynchronously, use StartDocumentAnalysis.
 *
 * For more information, see Document Text
 * Analysis.
 */
export const analyzeDocument: API.OperationMethod<
  AnalyzeDocumentRequest,
  AnalyzeDocumentResponse,
  AnalyzeDocumentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Document: i_Document,
      FeatureTypes: 0,
      HumanLoopConfig: {
        HumanLoopName: 0,
        FlowDefinitionArn: 0,
        DataAttributes: { ContentClassifiers: 0 },
      },
      QueriesConfig: i_QueriesConfig,
      AdaptersConfig: i_AdaptersConfig,
    },
  },
  errors: [
    AccessDeniedException,
    BadDocumentException,
    DocumentTooLargeException,
    HumanLoopQuotaExceededException,
    InternalServerError,
    InvalidParameterException,
    InvalidS3ObjectException,
    ProvisionedThroughputExceededException,
    ThrottlingException,
    UnsupportedDocumentException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AnalyzeDocument",
})) as any;

export type AnalyzeExpenseError =
  | AccessDeniedException
  | BadDocumentException
  | DocumentTooLargeException
  | InternalServerError
  | InvalidParameterException
  | InvalidS3ObjectException
  | ProvisionedThroughputExceededException
  | ThrottlingException
  | UnsupportedDocumentException
  | CommonErrors;
/**
 * `AnalyzeExpense` synchronously analyzes an input document for financially
 * related relationships between text.
 *
 * Information is returned as `ExpenseDocuments` and seperated as
 * follows:
 *
 * - `LineItemGroups`- A data set containing `LineItems` which
 * store information about the lines of text, such as an item purchased and its price on
 * a receipt.
 *
 * - `SummaryFields`- Contains all other information a receipt, such as
 * header information or the vendors name.
 */
export const analyzeExpense: API.OperationMethod<
  AnalyzeExpenseRequest,
  AnalyzeExpenseResponse,
  AnalyzeExpenseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { Document: i_Document } },
  errors: [
    AccessDeniedException,
    BadDocumentException,
    DocumentTooLargeException,
    InternalServerError,
    InvalidParameterException,
    InvalidS3ObjectException,
    ProvisionedThroughputExceededException,
    ThrottlingException,
    UnsupportedDocumentException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AnalyzeExpense",
})) as any;

export type AnalyzeIDError =
  | AccessDeniedException
  | BadDocumentException
  | DocumentTooLargeException
  | InternalServerError
  | InvalidParameterException
  | InvalidS3ObjectException
  | ProvisionedThroughputExceededException
  | ThrottlingException
  | UnsupportedDocumentException
  | CommonErrors;
/**
 * Analyzes identity documents for relevant information. This information is extracted and
 * returned as `IdentityDocumentFields`, which records both the normalized field
 * and value of the extracted text. Unlike other Amazon Textract operations,
 * `AnalyzeID` doesn't return any Geometry data.
 */
export const analyzeID: API.OperationMethod<
  AnalyzeIDRequest,
  AnalyzeIDResponse,
  AnalyzeIDError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { DocumentPages: D.list(i_Document) } },
  errors: [
    AccessDeniedException,
    BadDocumentException,
    DocumentTooLargeException,
    InternalServerError,
    InvalidParameterException,
    InvalidS3ObjectException,
    ProvisionedThroughputExceededException,
    ThrottlingException,
    UnsupportedDocumentException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AnalyzeID",
})) as any;

export type CreateAdapterError =
  | AccessDeniedException
  | ConflictException
  | IdempotentParameterMismatchException
  | InternalServerError
  | InvalidParameterException
  | LimitExceededException
  | ProvisionedThroughputExceededException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an adapter, which can be fine-tuned for enhanced performance on user provided
 * documents. Takes an AdapterName and FeatureType. Currently the only supported feature type
 * is `QUERIES`. You can also provide a Description, Tags, and a
 * ClientRequestToken. You can choose whether or not the adapter should be AutoUpdated with
 * the AutoUpdate argument. By default, AutoUpdate is set to DISABLED.
 */
export const createAdapter: API.OperationMethod<
  CreateAdapterRequest,
  CreateAdapterResponse,
  CreateAdapterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      AdapterName: 0,
      ClientRequestToken: D.m({ idempotency: true }),
      Description: 0,
      FeatureTypes: 0,
      AutoUpdate: 0,
      Tags: 0,
    },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    IdempotentParameterMismatchException,
    InternalServerError,
    InvalidParameterException,
    LimitExceededException,
    ProvisionedThroughputExceededException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAdapter",
})) as any;

export type CreateAdapterVersionError =
  | AccessDeniedException
  | ConflictException
  | IdempotentParameterMismatchException
  | InternalServerError
  | InvalidKMSKeyException
  | InvalidParameterException
  | InvalidS3ObjectException
  | LimitExceededException
  | ProvisionedThroughputExceededException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new version of an adapter. Operates on a provided AdapterId and a specified
 * dataset provided via the DatasetConfig argument. Requires that you
 * specify an Amazon S3 bucket with the OutputConfig argument. You can provide an optional KMSKeyId,
 * an optional ClientRequestToken, and optional tags.
 */
export const createAdapterVersion: API.OperationMethod<
  CreateAdapterVersionRequest,
  CreateAdapterVersionResponse,
  CreateAdapterVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      AdapterId: 0,
      ClientRequestToken: D.m({ idempotency: true }),
      DatasetConfig: { ManifestS3Object: i_S3Object },
      KMSKeyId: 0,
      OutputConfig: i_OutputConfig,
      Tags: 0,
    },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    IdempotentParameterMismatchException,
    InternalServerError,
    InvalidKMSKeyException,
    InvalidParameterException,
    InvalidS3ObjectException,
    LimitExceededException,
    ProvisionedThroughputExceededException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAdapterVersion",
})) as any;

export type DeleteAdapterError =
  | AccessDeniedException
  | ConflictException
  | InternalServerError
  | InvalidParameterException
  | ProvisionedThroughputExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an Amazon Textract adapter. Takes an AdapterId and deletes the adapter specified by the ID.
 */
export const deleteAdapter: API.OperationMethod<
  DeleteAdapterRequest,
  DeleteAdapterResponse,
  DeleteAdapterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { AdapterId: 0 } },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerError,
    InvalidParameterException,
    ProvisionedThroughputExceededException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAdapter",
})) as any;

export type DeleteAdapterVersionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerError
  | InvalidParameterException
  | ProvisionedThroughputExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an Amazon Textract adapter version. Requires that you specify both an AdapterId and a
 * AdapterVersion. Deletes the adapter version specified by the AdapterId and the AdapterVersion.
 */
export const deleteAdapterVersion: API.OperationMethod<
  DeleteAdapterVersionRequest,
  DeleteAdapterVersionResponse,
  DeleteAdapterVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { AdapterId: 0, AdapterVersion: 0 } },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerError,
    InvalidParameterException,
    ProvisionedThroughputExceededException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAdapterVersion",
})) as any;

export type DetectDocumentTextError =
  | AccessDeniedException
  | BadDocumentException
  | DocumentTooLargeException
  | InternalServerError
  | InvalidParameterException
  | InvalidS3ObjectException
  | ProvisionedThroughputExceededException
  | ThrottlingException
  | UnsupportedDocumentException
  | CommonErrors;
/**
 * Detects text in the input document. Amazon Textract can detect lines of text and the
 * words that make up a line of text. The input document must be in one of the following image
 * formats: JPEG, PNG, PDF, or TIFF. `DetectDocumentText` returns the detected
 * text in an array of Block objects.
 *
 * Each document page has as an associated `Block` of type PAGE. Each PAGE `Block` object
 * is the parent of LINE `Block` objects that represent the lines of detected text on a page. A LINE `Block` object is
 * a parent for each word that makes up the line. Words are represented by `Block` objects of type WORD.
 *
 * `DetectDocumentText` is a synchronous operation. To analyze documents
 * asynchronously, use StartDocumentTextDetection.
 *
 * For more information, see Document Text Detection.
 */
export const detectDocumentText: API.OperationMethod<
  DetectDocumentTextRequest,
  DetectDocumentTextResponse,
  DetectDocumentTextError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { Document: i_Document } },
  errors: [
    AccessDeniedException,
    BadDocumentException,
    DocumentTooLargeException,
    InternalServerError,
    InvalidParameterException,
    InvalidS3ObjectException,
    ProvisionedThroughputExceededException,
    ThrottlingException,
    UnsupportedDocumentException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DetectDocumentText",
})) as any;

export type GetAdapterError =
  | AccessDeniedException
  | InternalServerError
  | InvalidParameterException
  | ProvisionedThroughputExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets configuration information for an adapter specified by an AdapterId, returning information on AdapterName, Description,
 * CreationTime, AutoUpdate status, and FeatureTypes.
 */
export const getAdapter: API.OperationMethod<
  GetAdapterRequest,
  GetAdapterResponse,
  GetAdapterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { AdapterId: 0 },
    output: { CreationTime: D.ts },
  },
  errors: [
    AccessDeniedException,
    InternalServerError,
    InvalidParameterException,
    ProvisionedThroughputExceededException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAdapter",
})) as any;

export type GetAdapterVersionError =
  | AccessDeniedException
  | InternalServerError
  | InvalidParameterException
  | ProvisionedThroughputExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets configuration information for the specified adapter version, including:
 * AdapterId, AdapterVersion, FeatureTypes, Status, StatusMessage, DatasetConfig,
 * KMSKeyId, OutputConfig, Tags and EvaluationMetrics.
 */
export const getAdapterVersion: API.OperationMethod<
  GetAdapterVersionRequest,
  GetAdapterVersionResponse,
  GetAdapterVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { AdapterId: 0, AdapterVersion: 0 },
    output: { CreationTime: D.ts },
  },
  errors: [
    AccessDeniedException,
    InternalServerError,
    InvalidParameterException,
    ProvisionedThroughputExceededException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAdapterVersion",
})) as any;

export type GetDocumentAnalysisError =
  | AccessDeniedException
  | InternalServerError
  | InvalidJobIdException
  | InvalidKMSKeyException
  | InvalidParameterException
  | InvalidS3ObjectException
  | ProvisionedThroughputExceededException
  | ThrottlingException
  | CommonErrors;
/**
 * Gets the results for an Amazon Textract asynchronous operation that analyzes text in a
 * document.
 *
 * You start asynchronous text analysis by calling StartDocumentAnalysis,
 * which returns a job identifier (`JobId`). When the text analysis operation
 * finishes, Amazon Textract publishes a completion status to the Amazon Simple Notification Service (Amazon SNS) topic
 * that's registered in the initial call to `StartDocumentAnalysis`. To get the
 * results of the text-detection operation, first check that the status value published to the
 * Amazon SNS topic is `SUCCEEDED`. If so, call `GetDocumentAnalysis`, and
 * pass the job identifier (`JobId`) from the initial call to
 * `StartDocumentAnalysis`.
 *
 * `GetDocumentAnalysis` returns an array of Block objects.
 * The following types of information are returned:
 *
 * - Form data (key-value pairs). The related information is returned in two Block objects, each of type `KEY_VALUE_SET`: a KEY
 * `Block` object and a VALUE `Block` object. For example,
 * *Name: Ana Silva Carolina* contains a key and value.
 * *Name:* is the key. *Ana Silva Carolina* is
 * the value.
 *
 * - Table and table cell data. A TABLE `Block` object contains information
 * about a detected table. A CELL `Block` object is returned for each cell in
 * a table.
 *
 * - Lines and words of text. A LINE `Block` object contains one or more
 * WORD `Block` objects. All lines and words that are detected in the
 * document are returned (including text that doesn't have a relationship with the value
 * of the `StartDocumentAnalysis`
 * `FeatureTypes` input parameter).
 *
 * - Query. A QUERY Block object contains the query text, alias and link to the
 * associated Query results block object.
 *
 * - Query Results. A QUERY_RESULT Block object contains the answer to the query and an
 * ID that connects it to the query asked. This Block also contains a confidence
 * score.
 *
 * While processing a document with queries, look out for
 * `INVALID_REQUEST_PARAMETERS` output. This indicates that either the per
 * page query limit has been exceeded or that the operation is trying to query a page in
 * the document which doesn’t exist.
 *
 * Selection elements such as check boxes and option buttons (radio buttons) can be
 * detected in form data and in tables. A SELECTION_ELEMENT `Block` object contains
 * information about a selection element, including the selection status.
 *
 * Use the `MaxResults` parameter to limit the number of blocks that are
 * returned. If there are more results than specified in `MaxResults`, the value of
 * `NextToken` in the operation response contains a pagination token for getting
 * the next set of results. To get the next page of results, call
 * `GetDocumentAnalysis`, and populate the `NextToken` request
 * parameter with the token value that's returned from the previous call to
 * `GetDocumentAnalysis`.
 *
 * For more information, see Document Text
 * Analysis.
 */
export const getDocumentAnalysis: API.OperationMethod<
  GetDocumentAnalysisRequest,
  GetDocumentAnalysisResponse,
  GetDocumentAnalysisError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { JobId: 0, MaxResults: 0, NextToken: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServerError,
    InvalidJobIdException,
    InvalidKMSKeyException,
    InvalidParameterException,
    InvalidS3ObjectException,
    ProvisionedThroughputExceededException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDocumentAnalysis",
})) as any;

export type GetDocumentTextDetectionError =
  | AccessDeniedException
  | InternalServerError
  | InvalidJobIdException
  | InvalidKMSKeyException
  | InvalidParameterException
  | InvalidS3ObjectException
  | ProvisionedThroughputExceededException
  | ThrottlingException
  | CommonErrors;
/**
 * Gets the results for an Amazon Textract asynchronous operation that detects text in a document.
 * Amazon Textract can detect lines of text and the words that make up a line of text.
 *
 * You start asynchronous text detection by calling StartDocumentTextDetection, which returns a job identifier
 * (`JobId`). When the text detection operation finishes, Amazon Textract publishes a
 * completion status to the Amazon Simple Notification Service (Amazon SNS) topic that's registered in the initial call to
 * `StartDocumentTextDetection`. To get the results of the text-detection
 * operation, first check that the status value published to the Amazon SNS topic is
 * `SUCCEEDED`. If so, call `GetDocumentTextDetection`, and pass the
 * job identifier (`JobId`) from the initial call to
 * `StartDocumentTextDetection`.
 *
 * `GetDocumentTextDetection` returns an array of Block
 * objects.
 *
 * Each document page has as an associated `Block` of type PAGE. Each PAGE `Block` object
 * is the parent of LINE `Block` objects that represent the lines of detected text on a page. A LINE `Block` object is
 * a parent for each word that makes up the line. Words are represented by `Block` objects of type WORD.
 *
 * Use the MaxResults parameter to limit the number of blocks that are returned. If there
 * are more results than specified in `MaxResults`, the value of
 * `NextToken` in the operation response contains a pagination token for getting
 * the next set of results. To get the next page of results, call
 * `GetDocumentTextDetection`, and populate the `NextToken` request
 * parameter with the token value that's returned from the previous call to
 * `GetDocumentTextDetection`.
 *
 * For more information, see Document Text Detection.
 */
export const getDocumentTextDetection: API.OperationMethod<
  GetDocumentTextDetectionRequest,
  GetDocumentTextDetectionResponse,
  GetDocumentTextDetectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { JobId: 0, MaxResults: 0, NextToken: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServerError,
    InvalidJobIdException,
    InvalidKMSKeyException,
    InvalidParameterException,
    InvalidS3ObjectException,
    ProvisionedThroughputExceededException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDocumentTextDetection",
})) as any;

export type GetExpenseAnalysisError =
  | AccessDeniedException
  | InternalServerError
  | InvalidJobIdException
  | InvalidKMSKeyException
  | InvalidParameterException
  | InvalidS3ObjectException
  | ProvisionedThroughputExceededException
  | ThrottlingException
  | CommonErrors;
/**
 * Gets the results for an Amazon Textract asynchronous operation that analyzes invoices and
 * receipts. Amazon Textract finds contact information, items purchased, and vendor name, from input
 * invoices and receipts.
 *
 * You start asynchronous invoice/receipt analysis by calling StartExpenseAnalysis, which returns a job identifier (`JobId`). Upon
 * completion of the invoice/receipt analysis, Amazon Textract publishes the completion status to the
 * Amazon Simple Notification Service (Amazon SNS) topic. This topic must be registered in the initial call to
 * `StartExpenseAnalysis`. To get the results of the invoice/receipt analysis operation,
 * first ensure that the status value published to the Amazon SNS topic is `SUCCEEDED`. If so,
 * call `GetExpenseAnalysis`, and pass the job identifier (`JobId`) from the
 * initial call to `StartExpenseAnalysis`.
 *
 * Use the MaxResults parameter to limit the number of blocks that are returned. If there are
 * more results than specified in `MaxResults`, the value of `NextToken` in
 * the operation response contains a pagination token for getting the next set of results. To get
 * the next page of results, call `GetExpenseAnalysis`, and populate the
 * `NextToken` request parameter with the token value that's returned from the previous
 * call to `GetExpenseAnalysis`.
 *
 * For more information, see Analyzing Invoices and Receipts.
 */
export const getExpenseAnalysis: API.OperationMethod<
  GetExpenseAnalysisRequest,
  GetExpenseAnalysisResponse,
  GetExpenseAnalysisError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { JobId: 0, MaxResults: 0, NextToken: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServerError,
    InvalidJobIdException,
    InvalidKMSKeyException,
    InvalidParameterException,
    InvalidS3ObjectException,
    ProvisionedThroughputExceededException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetExpenseAnalysis",
})) as any;

export type GetLendingAnalysisError =
  | AccessDeniedException
  | InternalServerError
  | InvalidJobIdException
  | InvalidKMSKeyException
  | InvalidParameterException
  | InvalidS3ObjectException
  | ProvisionedThroughputExceededException
  | ThrottlingException
  | CommonErrors;
/**
 * Gets the results for an Amazon Textract asynchronous operation that analyzes text in a
 * lending document.
 *
 * You start asynchronous text analysis by calling `StartLendingAnalysis`,
 * which returns a job identifier (`JobId`). When the text analysis operation
 * finishes, Amazon Textract publishes a completion status to the Amazon Simple
 * Notification Service (Amazon SNS) topic that's registered in the initial call to
 * `StartLendingAnalysis`.
 *
 * To get the results of the text analysis operation, first check that the status value
 * published to the Amazon SNS topic is SUCCEEDED. If so, call GetLendingAnalysis, and pass
 * the job identifier (`JobId`) from the initial call to
 * `StartLendingAnalysis`.
 */
export const getLendingAnalysis: API.OperationMethod<
  GetLendingAnalysisRequest,
  GetLendingAnalysisResponse,
  GetLendingAnalysisError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { JobId: 0, MaxResults: 0, NextToken: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServerError,
    InvalidJobIdException,
    InvalidKMSKeyException,
    InvalidParameterException,
    InvalidS3ObjectException,
    ProvisionedThroughputExceededException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetLendingAnalysis",
})) as any;

export type GetLendingAnalysisSummaryError =
  | AccessDeniedException
  | InternalServerError
  | InvalidJobIdException
  | InvalidKMSKeyException
  | InvalidParameterException
  | InvalidS3ObjectException
  | ProvisionedThroughputExceededException
  | ThrottlingException
  | CommonErrors;
/**
 * Gets summarized results for the `StartLendingAnalysis` operation, which analyzes
 * text in a lending document. The returned summary consists of information about documents grouped
 * together by a common document type. Information like detected signatures, page numbers, and split
 * documents is returned with respect to the type of grouped document.
 *
 * You start asynchronous text analysis by calling `StartLendingAnalysis`, which
 * returns a job identifier (`JobId`). When the text analysis operation finishes, Amazon
 * Textract publishes a completion status to the Amazon Simple Notification Service (Amazon SNS)
 * topic that's registered in the initial call to `StartLendingAnalysis`.
 *
 * To get the results of the text analysis operation, first check that the status value
 * published to the Amazon SNS topic is SUCCEEDED. If so, call
 * `GetLendingAnalysisSummary`, and pass the job identifier (`JobId`) from
 * the initial call to `StartLendingAnalysis`.
 */
export const getLendingAnalysisSummary: API.OperationMethod<
  GetLendingAnalysisSummaryRequest,
  GetLendingAnalysisSummaryResponse,
  GetLendingAnalysisSummaryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { JobId: 0 } },
  errors: [
    AccessDeniedException,
    InternalServerError,
    InvalidJobIdException,
    InvalidKMSKeyException,
    InvalidParameterException,
    InvalidS3ObjectException,
    ProvisionedThroughputExceededException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetLendingAnalysisSummary",
})) as any;

export type ListAdaptersError =
  | AccessDeniedException
  | InternalServerError
  | InvalidParameterException
  | ProvisionedThroughputExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all adapters that match the specified filtration criteria.
 */
export const listAdapters: API.PaginatedOperationMethod<
  ListAdaptersRequest,
  ListAdaptersResponse,
  ListAdaptersError,
  Credentials | HttpClient.HttpClient,
  AdapterOverview
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      AfterCreationTime: 0,
      BeforeCreationTime: 0,
      MaxResults: 0,
      NextToken: 0,
    },
    output: { Adapters: D.list({ CreationTime: D.ts }) },
  },
  errors: [
    AccessDeniedException,
    InternalServerError,
    InvalidParameterException,
    ProvisionedThroughputExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAdapters",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Adapters",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListAdapterVersionsError =
  | AccessDeniedException
  | InternalServerError
  | InvalidParameterException
  | ProvisionedThroughputExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List all version of an adapter that meet the specified filtration criteria.
 */
export const listAdapterVersions: API.PaginatedOperationMethod<
  ListAdapterVersionsRequest,
  ListAdapterVersionsResponse,
  ListAdapterVersionsError,
  Credentials | HttpClient.HttpClient,
  AdapterVersionOverview
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      AdapterId: 0,
      AfterCreationTime: 0,
      BeforeCreationTime: 0,
      MaxResults: 0,
      NextToken: 0,
    },
    output: { AdapterVersions: D.list({ CreationTime: D.ts }) },
  },
  errors: [
    AccessDeniedException,
    InternalServerError,
    InvalidParameterException,
    ProvisionedThroughputExceededException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAdapterVersions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "AdapterVersions",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | AccessDeniedException
  | InternalServerError
  | InvalidParameterException
  | ProvisionedThroughputExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all tags for an Amazon Textract resource.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceARN: 0 } },
  errors: [
    AccessDeniedException,
    InternalServerError,
    InvalidParameterException,
    ProvisionedThroughputExceededException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

export type StartDocumentAnalysisError =
  | AccessDeniedException
  | BadDocumentException
  | DocumentTooLargeException
  | IdempotentParameterMismatchException
  | InternalServerError
  | InvalidKMSKeyException
  | InvalidParameterException
  | InvalidS3ObjectException
  | LimitExceededException
  | ProvisionedThroughputExceededException
  | ThrottlingException
  | UnsupportedDocumentException
  | CommonErrors;
/**
 * Starts the asynchronous analysis of an input document for relationships between detected
 * items such as key-value pairs, tables, and selection elements.
 *
 * `StartDocumentAnalysis` can analyze text in documents that are in JPEG, PNG, TIFF, and PDF format. The
 * documents are stored in an Amazon S3 bucket. Use DocumentLocation to specify the bucket name and file name
 * of the document.
 *
 * `StartDocumentAnalysis` returns a job identifier
 * (`JobId`) that you use to get the results of the operation. When text
 * analysis is finished, Amazon Textract publishes a completion status to the Amazon Simple Notification Service (Amazon SNS)
 * topic that you specify in `NotificationChannel`. To get the results of the text
 * analysis operation, first check that the status value published to the Amazon SNS topic is
 * `SUCCEEDED`. If so, call GetDocumentAnalysis, and pass
 * the job identifier (`JobId`) from the initial call to
 * `StartDocumentAnalysis`.
 *
 * For more information, see Document Text Analysis.
 */
export const startDocumentAnalysis: API.OperationMethod<
  StartDocumentAnalysisRequest,
  StartDocumentAnalysisResponse,
  StartDocumentAnalysisError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      DocumentLocation: i_DocumentLocation,
      FeatureTypes: 0,
      ClientRequestToken: 0,
      JobTag: 0,
      NotificationChannel: i_NotificationChannel,
      OutputConfig: i_OutputConfig,
      KMSKeyId: 0,
      QueriesConfig: i_QueriesConfig,
      AdaptersConfig: i_AdaptersConfig,
    },
  },
  errors: [
    AccessDeniedException,
    BadDocumentException,
    DocumentTooLargeException,
    IdempotentParameterMismatchException,
    InternalServerError,
    InvalidKMSKeyException,
    InvalidParameterException,
    InvalidS3ObjectException,
    LimitExceededException,
    ProvisionedThroughputExceededException,
    ThrottlingException,
    UnsupportedDocumentException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartDocumentAnalysis",
})) as any;

export type StartDocumentTextDetectionError =
  | AccessDeniedException
  | BadDocumentException
  | DocumentTooLargeException
  | IdempotentParameterMismatchException
  | InternalServerError
  | InvalidKMSKeyException
  | InvalidParameterException
  | InvalidS3ObjectException
  | LimitExceededException
  | ProvisionedThroughputExceededException
  | ThrottlingException
  | UnsupportedDocumentException
  | CommonErrors;
/**
 * Starts the asynchronous detection of text in a document. Amazon Textract can detect lines of
 * text and the words that make up a line of text.
 *
 * `StartDocumentTextDetection` can analyze text in documents that are in JPEG, PNG, TIFF, and PDF format. The
 * documents are stored in an Amazon S3 bucket. Use DocumentLocation to specify the bucket name and file name
 * of the document.
 *
 * `StartDocumentTextDetection` returns a job identifier
 * (`JobId`) that you use to get the results of the operation. When text
 * detection is finished, Amazon Textract publishes a completion status to the Amazon Simple Notification Service (Amazon SNS)
 * topic that you specify in `NotificationChannel`. To get the results of the text
 * detection operation, first check that the status value published to the Amazon SNS topic is
 * `SUCCEEDED`. If so, call GetDocumentTextDetection, and
 * pass the job identifier (`JobId`) from the initial call to
 * `StartDocumentTextDetection`.
 *
 * For more information, see Document Text Detection.
 */
export const startDocumentTextDetection: API.OperationMethod<
  StartDocumentTextDetectionRequest,
  StartDocumentTextDetectionResponse,
  StartDocumentTextDetectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      DocumentLocation: i_DocumentLocation,
      ClientRequestToken: 0,
      JobTag: 0,
      NotificationChannel: i_NotificationChannel,
      OutputConfig: i_OutputConfig,
      KMSKeyId: 0,
    },
  },
  errors: [
    AccessDeniedException,
    BadDocumentException,
    DocumentTooLargeException,
    IdempotentParameterMismatchException,
    InternalServerError,
    InvalidKMSKeyException,
    InvalidParameterException,
    InvalidS3ObjectException,
    LimitExceededException,
    ProvisionedThroughputExceededException,
    ThrottlingException,
    UnsupportedDocumentException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartDocumentTextDetection",
})) as any;

export type StartExpenseAnalysisError =
  | AccessDeniedException
  | BadDocumentException
  | DocumentTooLargeException
  | IdempotentParameterMismatchException
  | InternalServerError
  | InvalidKMSKeyException
  | InvalidParameterException
  | InvalidS3ObjectException
  | LimitExceededException
  | ProvisionedThroughputExceededException
  | ThrottlingException
  | UnsupportedDocumentException
  | CommonErrors;
/**
 * Starts the asynchronous analysis of invoices or receipts for data like contact information,
 * items purchased, and vendor names.
 *
 * `StartExpenseAnalysis` can analyze text in documents that are in JPEG, PNG, and
 * PDF format. The documents must be stored in an Amazon S3 bucket. Use the DocumentLocation parameter to specify the name of your S3 bucket and the name of the
 * document in that bucket.
 *
 * `StartExpenseAnalysis` returns a job identifier (`JobId`) that you
 * will provide to `GetExpenseAnalysis` to retrieve the results of the operation. When
 * the analysis of the input invoices/receipts is finished, Amazon Textract publishes a completion
 * status to the Amazon Simple Notification Service (Amazon SNS) topic that you provide to the `NotificationChannel`.
 * To obtain the results of the invoice and receipt analysis operation, ensure that the status value
 * published to the Amazon SNS topic is `SUCCEEDED`. If so, call GetExpenseAnalysis, and pass the job identifier (`JobId`) that was
 * returned by your call to `StartExpenseAnalysis`.
 *
 * For more information, see Analyzing Invoices and Receipts.
 */
export const startExpenseAnalysis: API.OperationMethod<
  StartExpenseAnalysisRequest,
  StartExpenseAnalysisResponse,
  StartExpenseAnalysisError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      DocumentLocation: i_DocumentLocation,
      ClientRequestToken: 0,
      JobTag: 0,
      NotificationChannel: i_NotificationChannel,
      OutputConfig: i_OutputConfig,
      KMSKeyId: 0,
    },
  },
  errors: [
    AccessDeniedException,
    BadDocumentException,
    DocumentTooLargeException,
    IdempotentParameterMismatchException,
    InternalServerError,
    InvalidKMSKeyException,
    InvalidParameterException,
    InvalidS3ObjectException,
    LimitExceededException,
    ProvisionedThroughputExceededException,
    ThrottlingException,
    UnsupportedDocumentException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartExpenseAnalysis",
})) as any;

export type StartLendingAnalysisError =
  | AccessDeniedException
  | BadDocumentException
  | DocumentTooLargeException
  | IdempotentParameterMismatchException
  | InternalServerError
  | InvalidKMSKeyException
  | InvalidParameterException
  | InvalidS3ObjectException
  | LimitExceededException
  | ProvisionedThroughputExceededException
  | ThrottlingException
  | UnsupportedDocumentException
  | CommonErrors;
/**
 * Starts the classification and analysis of an input document.
 * `StartLendingAnalysis` initiates the classification and analysis of a packet of
 * lending documents. `StartLendingAnalysis` operates on a document file located in an
 * Amazon S3 bucket.
 *
 * `StartLendingAnalysis` can analyze text in documents that are in one of the
 * following formats: JPEG, PNG, TIFF, PDF. Use `DocumentLocation` to specify the bucket
 * name and the file name of the document.
 *
 * `StartLendingAnalysis` returns a job identifier (`JobId`) that you use
 * to get the results of the operation. When the text analysis is finished, Amazon Textract
 * publishes a completion status to the Amazon Simple Notification Service (Amazon SNS) topic that
 * you specify in `NotificationChannel`. To get the results of the text analysis
 * operation, first check that the status value published to the Amazon SNS topic is SUCCEEDED. If
 * the status is SUCCEEDED you can call either `GetLendingAnalysis` or
 * `GetLendingAnalysisSummary` and provide the `JobId` to obtain the results
 * of the analysis.
 *
 * If using `OutputConfig` to specify an Amazon S3 bucket, the output will be contained
 * within the specified prefix in a directory labeled with the job-id. In the directory there are 3
 * sub-directories:
 *
 * - detailedResponse (contains the GetLendingAnalysis response)
 *
 * - summaryResponse (for the GetLendingAnalysisSummary response)
 *
 * - splitDocuments (documents split across logical boundaries)
 */
export const startLendingAnalysis: API.OperationMethod<
  StartLendingAnalysisRequest,
  StartLendingAnalysisResponse,
  StartLendingAnalysisError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      DocumentLocation: i_DocumentLocation,
      ClientRequestToken: 0,
      JobTag: 0,
      NotificationChannel: i_NotificationChannel,
      OutputConfig: i_OutputConfig,
      KMSKeyId: 0,
    },
  },
  errors: [
    AccessDeniedException,
    BadDocumentException,
    DocumentTooLargeException,
    IdempotentParameterMismatchException,
    InternalServerError,
    InvalidKMSKeyException,
    InvalidParameterException,
    InvalidS3ObjectException,
    LimitExceededException,
    ProvisionedThroughputExceededException,
    ThrottlingException,
    UnsupportedDocumentException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartLendingAnalysis",
})) as any;

export type TagResourceError =
  | AccessDeniedException
  | InternalServerError
  | InvalidParameterException
  | ProvisionedThroughputExceededException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Adds one or more tags to the specified resource.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceARN: 0, Tags: 0 } },
  errors: [
    AccessDeniedException,
    InternalServerError,
    InvalidParameterException,
    ProvisionedThroughputExceededException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

export type UntagResourceError =
  | AccessDeniedException
  | InternalServerError
  | InvalidParameterException
  | ProvisionedThroughputExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes any tags with the specified keys from the specified resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceARN: 0, TagKeys: 0 } },
  errors: [
    AccessDeniedException,
    InternalServerError,
    InvalidParameterException,
    ProvisionedThroughputExceededException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

export type UpdateAdapterError =
  | AccessDeniedException
  | ConflictException
  | InternalServerError
  | InvalidParameterException
  | ProvisionedThroughputExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Update the configuration for an adapter. FeatureTypes configurations cannot be updated.
 * At least one new parameter must be specified as an argument.
 */
export const updateAdapter: API.OperationMethod<
  UpdateAdapterRequest,
  UpdateAdapterResponse,
  UpdateAdapterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { AdapterId: 0, Description: 0, AdapterName: 0, AutoUpdate: 0 },
    output: { CreationTime: D.ts },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerError,
    InvalidParameterException,
    ProvisionedThroughputExceededException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAdapter",
})) as any;

const i_AdaptersConfig: D.LazyStruct = () => ({
  Adapters: D.list({ AdapterId: 0, Pages: 0, Version: 0 }),
});
const i_Document: D.LazyStruct = () => ({ Bytes: 0, S3Object: i_S3Object });
const i_DocumentLocation: D.LazyStruct = () => ({ S3Object: i_S3Object });
const i_NotificationChannel: D.LazyStruct = () => ({
  SNSTopicArn: 0,
  RoleArn: 0,
});
const i_OutputConfig: D.LazyStruct = () => ({ S3Bucket: 0, S3Prefix: 0 });
const i_QueriesConfig: D.LazyStruct = () => ({
  Queries: D.list({ Text: 0, Alias: 0, Pages: 0 }),
});
const i_S3Object: D.LazyStruct = () => ({ Bucket: 0, Name: 0, Version: 0 });
