import * as API from "@distilled.cloud/core/api";
import * as S from "@distilled.cloud/core/schema-lite";
import * as __L from "@distilled.cloud/core/schema-lite";
import type * as HttpClient from "effect/http/HttpClient";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import { AwsProtocol } from "../protocol.ts";
import { Retry } from "../retry.ts";
import * as T from "../traits.ts";
// Schema table, filled on first reach (see __S at the end).
const __s: any[] = [];
const svc = /*@__PURE__*/ T.AwsApiService({ sdkId: "Textract", serviceShapeName: "Textract" });
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "textract" });
const ver = /*@__PURE__*/ T.ServiceVersion("2018-06-27");
const proto = /*@__PURE__*/ T.AwsProtocolsAwsJson1_1();
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
              `https://textract-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(`https://textract-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://textract.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://textract.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://textract.{R}.{D}","properties":{},"headers":{}}');

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()("AccessDeniedException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    Code: /*@__PURE__*/ S.optional(S.String),
  }).pipe(C.withAuthError) {}
export class BadDocumentException
  extends /*@__PURE__*/ S.TaggedError<BadDocumentException>()("BadDocumentException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    Code: /*@__PURE__*/ S.optional(S.String),
  }) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()("ConflictException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    Code: /*@__PURE__*/ S.optional(S.String),
  }) {}
export class DocumentTooLargeException
  extends /*@__PURE__*/ S.TaggedError<DocumentTooLargeException>()("DocumentTooLargeException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    Code: /*@__PURE__*/ S.optional(S.String),
  }) {}
export class HumanLoopQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<HumanLoopQuotaExceededException>()(
    "HumanLoopQuotaExceededException",
    {
      ResourceType: /*@__PURE__*/ S.optional(S.String),
      QuotaCode: /*@__PURE__*/ S.optional(S.String),
      ServiceCode: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      Code: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class IdempotentParameterMismatchException
  extends /*@__PURE__*/ S.TaggedError<IdempotentParameterMismatchException>()(
    "IdempotentParameterMismatchException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      Code: /*@__PURE__*/ S.optional(S.String),
    },
  ) {}
export class InternalServerError
  extends /*@__PURE__*/ S.TaggedError<InternalServerError>()("InternalServerError", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    Code: /*@__PURE__*/ S.optional(S.String),
  }) {}
export class InvalidJobIdException
  extends /*@__PURE__*/ S.TaggedError<InvalidJobIdException>()("InvalidJobIdException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    Code: /*@__PURE__*/ S.optional(S.String),
  }) {}
export class InvalidKMSKeyException
  extends /*@__PURE__*/ S.TaggedError<InvalidKMSKeyException>()("InvalidKMSKeyException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    Code: /*@__PURE__*/ S.optional(S.String),
  }) {}
export class InvalidParameterException
  extends /*@__PURE__*/ S.TaggedError<InvalidParameterException>()("InvalidParameterException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    Code: /*@__PURE__*/ S.optional(S.String),
  }) {}
export class InvalidS3ObjectException
  extends /*@__PURE__*/ S.TaggedError<InvalidS3ObjectException>()("InvalidS3ObjectException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    Code: /*@__PURE__*/ S.optional(S.String),
  }) {}
export class LimitExceededException
  extends /*@__PURE__*/ S.TaggedError<LimitExceededException>()("LimitExceededException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    Code: /*@__PURE__*/ S.optional(S.String),
  }) {}
export class ProvisionedThroughputExceededException
  extends /*@__PURE__*/ S.TaggedError<ProvisionedThroughputExceededException>()(
    "ProvisionedThroughputExceededException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      Code: /*@__PURE__*/ S.optional(S.String),
    },
  ) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()("ResourceNotFoundException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    Code: /*@__PURE__*/ S.optional(S.String),
  }) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      Code: /*@__PURE__*/ S.optional(S.String),
    },
  ) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()("ThrottlingException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    Code: /*@__PURE__*/ S.optional(S.String),
  }) {}
export class UnsupportedDocumentException
  extends /*@__PURE__*/ S.TaggedError<UnsupportedDocumentException>()(
    "UnsupportedDocumentException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      Code: /*@__PURE__*/ S.optional(S.String),
    },
  ) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()("ValidationException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    Code: /*@__PURE__*/ S.optional(S.String),
  }) {}
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
export type FeatureType = "TABLES" | "FORMS" | "QUERIES" | "SIGNATURES" | "LAYOUT" | (string & {});
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
export type SynthesizedJsonHumanLoopActivationConditionsEvaluationResults = string;
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
export type JobStatus = "IN_PROGRESS" | "SUCCEEDED" | "FAILED" | "PARTIAL_SUCCESS" | (string & {});
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
  input: __S(2, __c0, 2) as any as S.Schema<AnalyzeDocumentRequest>,
  output: __S(4, __c0, 4) as any as S.Schema<AnalyzeDocumentResponse>,
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
}));

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
  input: __S(144, __c9, 0) as any as S.Schema<AnalyzeExpenseRequest>,
  output: __S(145, __c9, 1) as any as S.Schema<AnalyzeExpenseResponse>,
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
}));

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
  input: __S(193, __c12, 1) as any as S.Schema<AnalyzeIDRequest>,
  output: __S(195, __c12, 3) as any as S.Schema<AnalyzeIDResponse>,
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
}));

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
  input: __S(224, __c14, 0) as any as S.Schema<CreateAdapterRequest>,
  output: __S(225, __c14, 1) as any as S.Schema<CreateAdapterResponse>,
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
}));

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
  input: __S(256, __c16, 0) as any as S.Schema<CreateAdapterVersionRequest>,
  output: __S(257, __c16, 1) as any as S.Schema<CreateAdapterVersionResponse>,
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
}));

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
  input: __S(304, __c19, 0) as any as S.Schema<DeleteAdapterRequest>,
  output: __S(320, __c20, 0) as any as S.Schema<DeleteAdapterResponse>,
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
}));

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
  input: __S(336, __c21, 0) as any as S.Schema<DeleteAdapterVersionRequest>,
  output: __S(320, __c20, 0) as any as S.Schema<DeleteAdapterVersionResponse>,
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
}));

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
  input: __S(352, __c22, 0) as any as S.Schema<DetectDocumentTextRequest>,
  output: __S(353, __c22, 1) as any as S.Schema<DetectDocumentTextResponse>,
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
}));

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
  input: __S(368, __c23, 0) as any as S.Schema<GetAdapterRequest>,
  output: __S(369, __c23, 1) as any as S.Schema<GetAdapterResponse>,
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
}));

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
  input: __S(384, __c24, 0) as any as S.Schema<GetAdapterVersionRequest>,
  output: __S(388, __c24, 4) as any as S.Schema<GetAdapterVersionResponse>,
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
}));

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
 * the document which doesn't exist.
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
  input: __S(400, __c25, 0) as any as S.Schema<GetDocumentAnalysisRequest>,
  output: __S(401, __c25, 1) as any as S.Schema<GetDocumentAnalysisResponse>,
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
}));

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
  input: __S(432, __c27, 0) as any as S.Schema<GetDocumentTextDetectionRequest>,
  output: __S(433, __c27, 1) as any as S.Schema<GetDocumentTextDetectionResponse>,
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
}));

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
  input: __S(448, __c28, 0) as any as S.Schema<GetExpenseAnalysisRequest>,
  output: __S(449, __c28, 1) as any as S.Schema<GetExpenseAnalysisResponse>,
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
}));

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
  input: __S(464, __c29, 0) as any as S.Schema<GetLendingAnalysisRequest>,
  output: __S(479, __c29, 15) as any as S.Schema<GetLendingAnalysisResponse>,
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
}));

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
  input: __S(480, __c30, 0) as any as S.Schema<GetLendingAnalysisSummaryRequest>,
  output: __S(488, __c30, 8) as any as S.Schema<GetLendingAnalysisSummaryResponse>,
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
}));

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
  input: __S(496, __c31, 0) as any as S.Schema<ListAdaptersRequest>,
  output: __S(499, __c31, 3) as any as S.Schema<ListAdaptersResponse>,
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
  input: __S(512, __c32, 0) as any as S.Schema<ListAdapterVersionsRequest>,
  output: __S(515, __c32, 3) as any as S.Schema<ListAdapterVersionsResponse>,
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
  input: __S(528, __c33, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(529, __c33, 1) as any as S.Schema<ListTagsForResourceResponse>,
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
}));

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
  input: __S(544, __c34, 0) as any as S.Schema<StartDocumentAnalysisRequest>,
  output: __S(562, __c35, 2) as any as S.Schema<StartDocumentAnalysisResponse>,
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
}));

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
  input: __S(576, __c36, 0) as any as S.Schema<StartDocumentTextDetectionRequest>,
  output: __S(562, __c35, 2) as any as S.Schema<StartDocumentTextDetectionResponse>,
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
}));

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
  input: __S(592, __c37, 0) as any as S.Schema<StartExpenseAnalysisRequest>,
  output: __S(562, __c35, 2) as any as S.Schema<StartExpenseAnalysisResponse>,
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
}));

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
  input: __S(608, __c38, 0) as any as S.Schema<StartLendingAnalysisRequest>,
  output: __S(562, __c35, 2) as any as S.Schema<StartLendingAnalysisResponse>,
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
}));

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
  input: __S(624, __c39, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(320, __c20, 0) as any as S.Schema<TagResourceResponse>,
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
}));

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
  input: __S(640, __c40, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(320, __c20, 0) as any as S.Schema<UntagResourceResponse>,
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
}));

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
  input: __S(656, __c41, 0) as any as S.Schema<UpdateAdapterRequest>,
  output: __S(657, __c41, 1) as any as S.Schema<UpdateAdapterResponse>,
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
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ContentClassifiers: S.optional(__S(16, __c1, 0)) }),
      ).annotate({ identifier: "HumanLoopDataAttributes" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          HumanLoopName: S.String,
          FlowDefinitionArn: S.String,
          DataAttributes: S.optional(__S(0, __c0, 0)),
        }),
      ).annotate({ identifier: "HumanLoopConfig" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          Document: __S(48, __c3, 0),
          FeatureTypes: __S(16, __c1, 0),
          HumanLoopConfig: S.optional(__S(1, __c0, 1)),
          QueriesConfig: S.optional(__S(129, __c8, 1)),
          AdaptersConfig: S.optional(__S(132, __c8, 4)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "AnalyzeDocumentRequest" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          HumanLoopArn: S.optional(S.String),
          HumanLoopActivationReasons: S.optional(__S(96, __c6, 0)),
          HumanLoopActivationConditionsEvaluationResults: S.optional(S.String),
        }),
      ).annotate({ identifier: "HumanLoopActivationOutput" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          DocumentMetadata: S.optional(__S(80, __c5, 0)),
          Blocks: S.optional(__S(71, __c4, 7)),
          HumanLoopActivationOutput: S.optional(__S(3, __c0, 3)),
          AnalyzeDocumentModelVersion: S.optional(S.String),
        }),
      ).annotate({ identifier: "AnalyzeDocumentResponse" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Bucket: S.optional(S.String),
          Name: S.optional(S.String),
          Version: S.optional(S.String),
        }),
      ).annotate({ identifier: "S3Object" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Bytes: S.optional(T.Blob), S3Object: S.optional(__S(32, __c2, 0)) }),
      ).annotate({ identifier: "Document" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Width: S.optional(S.Number),
          Height: S.optional(S.Number),
          Left: S.optional(S.Number),
          Top: S.optional(S.Number),
        }),
      ).annotate({ identifier: "BoundingBox" });
    case 1:
      return S.suspend(() =>
        S.Struct({ X: S.optional(S.Number), Y: S.optional(S.Number) }),
      ).annotate({ identifier: "Point" });
    case 2:
      return S.Array(__S(65, __c4, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          BoundingBox: S.optional(__S(64, __c4, 0)),
          Polygon: S.optional(__S(66, __c4, 2)),
          RotationAngle: S.optional(S.Number),
        }),
      ).annotate({ identifier: "Geometry" });
    case 4:
      return S.suspend(() =>
        S.Struct({ Type: S.optional(S.String), Ids: S.optional(__S(96, __c6, 0)) }),
      ).annotate({ identifier: "Relationship" });
    case 5:
      return S.Array(__S(68, __c4, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({
          BlockType: S.optional(S.String),
          Confidence: S.optional(S.Number),
          Text: S.optional(S.String),
          TextType: S.optional(S.String),
          RowIndex: S.optional(S.Number),
          ColumnIndex: S.optional(S.Number),
          RowSpan: S.optional(S.Number),
          ColumnSpan: S.optional(S.Number),
          Geometry: S.optional(__S(67, __c4, 3)),
          Id: S.optional(S.String),
          Relationships: S.optional(__S(69, __c4, 5)),
          EntityTypes: S.optional(__S(16, __c1, 0)),
          SelectionStatus: S.optional(S.String),
          Page: S.optional(S.Number),
          Query: S.optional(__S(112, __c7, 0)),
        }),
      ).annotate({ identifier: "Block" });
    case 7:
      return S.Array(__S(70, __c4, 6));
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Pages: S.optional(S.Number) })).annotate({
        identifier: "DocumentMetadata",
      });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Text: S.String,
          Alias: S.optional(S.String),
          Pages: S.optional(__S(96, __c6, 0)),
        }),
      ).annotate({ identifier: "Query" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(112, __c7, 0));
    case 1:
      return S.suspend(() => S.Struct({ Queries: __S(128, __c8, 0) })).annotate({
        identifier: "QueriesConfig",
      });
    case 2:
      return S.suspend(() =>
        S.Struct({ AdapterId: S.String, Pages: S.optional(__S(96, __c6, 0)), Version: S.String }),
      ).annotate({ identifier: "Adapter" });
    case 3:
      return S.Array(__S(130, __c8, 2));
    case 4:
      return S.suspend(() => S.Struct({ Adapters: __S(131, __c8, 3) })).annotate({
        identifier: "AdaptersConfig",
      });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Document: __S(48, __c3, 0) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "AnalyzeExpenseRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          DocumentMetadata: S.optional(__S(80, __c5, 0)),
          ExpenseDocuments: S.optional(__S(160, __c10, 0)),
        }),
      ).annotate({ identifier: "AnalyzeExpenseResponse" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(187, __c11, 11));
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Text: S.optional(S.String), Confidence: S.optional(S.Number) }),
      ).annotate({ identifier: "ExpenseType" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Text: S.optional(S.String),
          Geometry: S.optional(__S(67, __c4, 3)),
          Confidence: S.optional(S.Number),
        }),
      ).annotate({ identifier: "ExpenseDetection" });
    case 2:
      return S.suspend(() =>
        S.Struct({ Code: S.optional(S.String), Confidence: S.optional(S.Number) }),
      ).annotate({ identifier: "ExpenseCurrency" });
    case 3:
      return S.suspend(() =>
        S.Struct({ Types: S.optional(__S(96, __c6, 0)), Id: S.optional(S.String) }),
      ).annotate({ identifier: "ExpenseGroupProperty" });
    case 4:
      return S.Array(__S(179, __c11, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          Type: S.optional(__S(176, __c11, 0)),
          LabelDetection: S.optional(__S(177, __c11, 1)),
          ValueDetection: S.optional(__S(177, __c11, 1)),
          PageNumber: S.optional(S.Number),
          Currency: S.optional(__S(178, __c11, 2)),
          GroupProperties: S.optional(__S(180, __c11, 4)),
        }),
      ).annotate({ identifier: "ExpenseField" });
    case 6:
      return S.Array(__S(181, __c11, 5));
    case 7:
      return S.suspend(() =>
        S.Struct({ LineItemExpenseFields: S.optional(__S(182, __c11, 6)) }),
      ).annotate({ identifier: "LineItemFields" });
    case 8:
      return S.Array(__S(183, __c11, 7));
    case 9:
      return S.suspend(() =>
        S.Struct({
          LineItemGroupIndex: S.optional(S.Number),
          LineItems: S.optional(__S(184, __c11, 8)),
        }),
      ).annotate({ identifier: "LineItemGroup" });
    case 10:
      return S.Array(__S(185, __c11, 9));
    case 11:
      return S.suspend(() =>
        S.Struct({
          ExpenseIndex: S.optional(S.Number),
          SummaryFields: S.optional(__S(182, __c11, 6)),
          LineItemGroups: S.optional(__S(186, __c11, 10)),
          Blocks: S.optional(__S(71, __c4, 7)),
        }),
      ).annotate({ identifier: "ExpenseDocument" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(48, __c3, 0));
    case 1:
      return S.suspend(() =>
        S.Struct({ DocumentPages: __S(192, __c12, 0) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "AnalyzeIDRequest" });
    case 2:
      return S.Array(__S(212, __c13, 4));
    case 3:
      return S.suspend(() =>
        S.Struct({
          IdentityDocuments: S.optional(__S(194, __c12, 2)),
          DocumentMetadata: S.optional(__S(80, __c5, 0)),
          AnalyzeIDModelVersion: S.optional(S.String),
        }),
      ).annotate({ identifier: "AnalyzeIDResponse" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Value: S.optional(S.String), ValueType: S.optional(S.String) }),
      ).annotate({ identifier: "NormalizedValue" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Text: S.String,
          NormalizedValue: S.optional(__S(208, __c13, 0)),
          Confidence: S.optional(S.Number),
        }),
      ).annotate({ identifier: "AnalyzeIDDetections" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          Type: S.optional(__S(209, __c13, 1)),
          ValueDetection: S.optional(__S(209, __c13, 1)),
        }),
      ).annotate({ identifier: "IdentityDocumentField" });
    case 3:
      return S.Array(__S(210, __c13, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          DocumentIndex: S.optional(S.Number),
          IdentityDocumentFields: S.optional(__S(211, __c13, 3)),
          Blocks: S.optional(__S(71, __c4, 7)),
        }),
      ).annotate({ identifier: "IdentityDocument" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AdapterName: S.String,
          ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          Description: S.optional(S.String),
          FeatureTypes: __S(16, __c1, 0),
          AutoUpdate: S.optional(S.String),
          Tags: S.optional(__S(240, __c15, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateAdapterRequest" });
    case 1:
      return S.suspend(() => S.Struct({ AdapterId: S.optional(S.String) })).annotate({
        identifier: "CreateAdapterResponse",
      });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AdapterId: S.String,
          ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          DatasetConfig: __S(272, __c17, 0),
          KMSKeyId: S.optional(S.String),
          OutputConfig: __S(288, __c18, 0),
          Tags: S.optional(__S(240, __c15, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateAdapterVersionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ AdapterId: S.optional(S.String), AdapterVersion: S.optional(S.String) }),
      ).annotate({ identifier: "CreateAdapterVersionResponse" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ ManifestS3Object: S.optional(__S(32, __c2, 0)) })).annotate(
        { identifier: "AdapterVersionDatasetConfig" },
      );
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ S3Bucket: S.String, S3Prefix: S.optional(S.String) }),
      ).annotate({ identifier: "OutputConfig" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AdapterId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteAdapterRequest" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "DeleteAdapterResponse" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AdapterId: S.String, AdapterVersion: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteAdapterVersionRequest" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Document: __S(48, __c3, 0) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DetectDocumentTextRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          DocumentMetadata: S.optional(__S(80, __c5, 0)),
          Blocks: S.optional(__S(71, __c4, 7)),
          DetectDocumentTextModelVersion: S.optional(S.String),
        }),
      ).annotate({ identifier: "DetectDocumentTextResponse" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AdapterId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetAdapterRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          AdapterId: S.optional(S.String),
          AdapterName: S.optional(S.String),
          CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Description: S.optional(S.String),
          FeatureTypes: S.optional(__S(16, __c1, 0)),
          AutoUpdate: S.optional(S.String),
          Tags: S.optional(__S(240, __c15, 0)),
        }),
      ).annotate({ identifier: "GetAdapterResponse" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AdapterId: S.String, AdapterVersion: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetAdapterVersionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          F1Score: S.optional(S.Number),
          Precision: S.optional(S.Number),
          Recall: S.optional(S.Number),
        }),
      ).annotate({ identifier: "EvaluationMetric" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          Baseline: S.optional(__S(385, __c24, 1)),
          AdapterVersion: S.optional(__S(385, __c24, 1)),
          FeatureType: S.optional(S.String),
        }),
      ).annotate({ identifier: "AdapterVersionEvaluationMetric" });
    case 3:
      return S.Array(__S(386, __c24, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          AdapterId: S.optional(S.String),
          AdapterVersion: S.optional(S.String),
          CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          FeatureTypes: S.optional(__S(16, __c1, 0)),
          Status: S.optional(S.String),
          StatusMessage: S.optional(S.String),
          DatasetConfig: S.optional(__S(272, __c17, 0)),
          KMSKeyId: S.optional(S.String),
          OutputConfig: S.optional(__S(288, __c18, 0)),
          EvaluationMetrics: S.optional(__S(387, __c24, 3)),
          Tags: S.optional(__S(240, __c15, 0)),
        }),
      ).annotate({ identifier: "GetAdapterVersionResponse" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          JobId: S.String,
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetDocumentAnalysisRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          DocumentMetadata: S.optional(__S(80, __c5, 0)),
          JobStatus: S.optional(S.String),
          NextToken: S.optional(S.String),
          Blocks: S.optional(__S(71, __c4, 7)),
          Warnings: S.optional(__S(418, __c26, 2)),
          StatusMessage: S.optional(S.String),
          AnalyzeDocumentModelVersion: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetDocumentAnalysisResponse" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.Number);
    case 1:
      return S.suspend(() =>
        S.Struct({ ErrorCode: S.optional(S.String), Pages: S.optional(__S(416, __c26, 0)) }),
      ).annotate({ identifier: "Warning" });
    case 2:
      return S.Array(__S(417, __c26, 1));
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          JobId: S.String,
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetDocumentTextDetectionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          DocumentMetadata: S.optional(__S(80, __c5, 0)),
          JobStatus: S.optional(S.String),
          NextToken: S.optional(S.String),
          Blocks: S.optional(__S(71, __c4, 7)),
          Warnings: S.optional(__S(418, __c26, 2)),
          StatusMessage: S.optional(S.String),
          DetectDocumentTextModelVersion: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetDocumentTextDetectionResponse" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          JobId: S.String,
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetExpenseAnalysisRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          DocumentMetadata: S.optional(__S(80, __c5, 0)),
          JobStatus: S.optional(S.String),
          NextToken: S.optional(S.String),
          ExpenseDocuments: S.optional(__S(160, __c10, 0)),
          Warnings: S.optional(__S(418, __c26, 2)),
          StatusMessage: S.optional(S.String),
          AnalyzeExpenseModelVersion: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetExpenseAnalysisResponse" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          JobId: S.String,
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetLendingAnalysisRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Value: S.optional(S.String), Confidence: S.optional(S.Number) }),
      ).annotate({ identifier: "Prediction" });
    case 2:
      return S.Array(__S(465, __c29, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ PageType: __S(466, __c29, 2), PageNumber: __S(466, __c29, 2) }),
      ).annotate({ identifier: "PageClassification" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          Text: S.optional(S.String),
          SelectionStatus: S.optional(S.String),
          Geometry: S.optional(__S(67, __c4, 3)),
          Confidence: S.optional(S.Number),
        }),
      ).annotate({ identifier: "LendingDetection" });
    case 5:
      return S.Array(__S(468, __c29, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({
          Type: S.optional(S.String),
          KeyDetection: S.optional(__S(468, __c29, 4)),
          ValueDetections: S.optional(__S(469, __c29, 5)),
        }),
      ).annotate({ identifier: "LendingField" });
    case 7:
      return S.Array(__S(470, __c29, 6));
    case 8:
      return S.suspend(() =>
        S.Struct({ Confidence: S.optional(S.Number), Geometry: S.optional(__S(67, __c4, 3)) }),
      ).annotate({ identifier: "SignatureDetection" });
    case 9:
      return S.Array(__S(472, __c29, 8));
    case 10:
      return S.suspend(() =>
        S.Struct({
          LendingFields: S.optional(__S(471, __c29, 7)),
          SignatureDetections: S.optional(__S(473, __c29, 9)),
        }),
      ).annotate({ identifier: "LendingDocument" });
    case 11:
      return S.suspend(() =>
        S.Struct({
          LendingDocument: S.optional(__S(474, __c29, 10)),
          ExpenseDocument: S.optional(__S(187, __c11, 11)),
          IdentityDocument: S.optional(__S(212, __c13, 4)),
        }),
      ).annotate({ identifier: "Extraction" });
    case 12:
      return S.Array(__S(475, __c29, 11));
    case 13:
      return S.suspend(() =>
        S.Struct({
          Page: S.optional(S.Number),
          PageClassification: S.optional(__S(467, __c29, 3)),
          Extractions: S.optional(__S(476, __c29, 12)),
        }),
      ).annotate({ identifier: "LendingResult" });
    case 14:
      return S.Array(__S(477, __c29, 13));
    case 15:
      return S.suspend(() =>
        S.Struct({
          DocumentMetadata: S.optional(__S(80, __c5, 0)),
          JobStatus: S.optional(S.String),
          NextToken: S.optional(S.String),
          Results: S.optional(__S(478, __c29, 14)),
          Warnings: S.optional(__S(418, __c26, 2)),
          StatusMessage: S.optional(S.String),
          AnalyzeLendingModelVersion: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetLendingAnalysisResponse" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ JobId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetLendingAnalysisSummaryRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Index: S.optional(S.Number), Pages: S.optional(__S(416, __c26, 0)) }),
      ).annotate({ identifier: "SplitDocument" });
    case 2:
      return S.Array(__S(481, __c30, 1));
    case 3:
      return S.suspend(() => S.Struct({ Page: S.optional(S.Number) })).annotate({
        identifier: "DetectedSignature",
      });
    case 4:
      return S.Array(__S(483, __c30, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          Type: S.optional(S.String),
          SplitDocuments: S.optional(__S(482, __c30, 2)),
          DetectedSignatures: S.optional(__S(484, __c30, 4)),
          UndetectedSignatures: S.optional(__S(484, __c30, 4)),
        }),
      ).annotate({ identifier: "DocumentGroup" });
    case 6:
      return S.Array(__S(485, __c30, 5));
    case 7:
      return S.suspend(() =>
        S.Struct({
          DocumentGroups: S.optional(__S(486, __c30, 6)),
          UndetectedDocumentTypes: S.optional(__S(96, __c6, 0)),
        }),
      ).annotate({ identifier: "LendingSummary" });
    case 8:
      return S.suspend(() =>
        S.Struct({
          DocumentMetadata: S.optional(__S(80, __c5, 0)),
          JobStatus: S.optional(S.String),
          Summary: S.optional(__S(487, __c30, 7)),
          Warnings: S.optional(__S(418, __c26, 2)),
          StatusMessage: S.optional(S.String),
          AnalyzeLendingModelVersion: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetLendingAnalysisSummaryResponse" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AfterCreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          BeforeCreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListAdaptersRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          AdapterId: S.optional(S.String),
          AdapterName: S.optional(S.String),
          CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          FeatureTypes: S.optional(__S(16, __c1, 0)),
        }),
      ).annotate({ identifier: "AdapterOverview" });
    case 2:
      return S.Array(__S(497, __c31, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ Adapters: S.optional(__S(498, __c31, 2)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListAdaptersResponse" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AdapterId: S.optional(S.String),
          AfterCreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          BeforeCreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListAdapterVersionsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          AdapterId: S.optional(S.String),
          AdapterVersion: S.optional(S.String),
          CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          FeatureTypes: S.optional(__S(16, __c1, 0)),
          Status: S.optional(S.String),
          StatusMessage: S.optional(S.String),
        }),
      ).annotate({ identifier: "AdapterVersionOverview" });
    case 2:
      return S.Array(__S(513, __c32, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          AdapterVersions: S.optional(__S(514, __c32, 2)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListAdapterVersionsResponse" });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceARN: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListTagsForResourceRequest" });
    case 1:
      return S.suspend(() => S.Struct({ Tags: S.optional(__S(240, __c15, 0)) })).annotate({
        identifier: "ListTagsForResourceResponse",
      });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DocumentLocation: __S(560, __c35, 0),
          FeatureTypes: __S(16, __c1, 0),
          ClientRequestToken: S.optional(S.String),
          JobTag: S.optional(S.String),
          NotificationChannel: S.optional(__S(561, __c35, 1)),
          OutputConfig: S.optional(__S(288, __c18, 0)),
          KMSKeyId: S.optional(S.String),
          QueriesConfig: S.optional(__S(129, __c8, 1)),
          AdaptersConfig: S.optional(__S(132, __c8, 4)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "StartDocumentAnalysisRequest" });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ S3Object: S.optional(__S(32, __c2, 0)) })).annotate({
        identifier: "DocumentLocation",
      });
    case 1:
      return S.suspend(() => S.Struct({ SNSTopicArn: S.String, RoleArn: S.String })).annotate({
        identifier: "NotificationChannel",
      });
    case 2:
      return S.suspend(() => S.Struct({ JobId: S.optional(S.String) })).annotate({
        identifier: "StartDocumentAnalysisResponse",
      });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DocumentLocation: __S(560, __c35, 0),
          ClientRequestToken: S.optional(S.String),
          JobTag: S.optional(S.String),
          NotificationChannel: S.optional(__S(561, __c35, 1)),
          OutputConfig: S.optional(__S(288, __c18, 0)),
          KMSKeyId: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "StartDocumentTextDetectionRequest" });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DocumentLocation: __S(560, __c35, 0),
          ClientRequestToken: S.optional(S.String),
          JobTag: S.optional(S.String),
          NotificationChannel: S.optional(__S(561, __c35, 1)),
          OutputConfig: S.optional(__S(288, __c18, 0)),
          KMSKeyId: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "StartExpenseAnalysisRequest" });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DocumentLocation: __S(560, __c35, 0),
          ClientRequestToken: S.optional(S.String),
          JobTag: S.optional(S.String),
          NotificationChannel: S.optional(__S(561, __c35, 1)),
          OutputConfig: S.optional(__S(288, __c18, 0)),
          KMSKeyId: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "StartLendingAnalysisRequest" });
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceARN: S.String, Tags: __S(240, __c15, 0) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "TagResourceRequest" });
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceARN: S.String, TagKeys: __S(96, __c6, 0) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UntagResourceRequest" });
  }
}
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AdapterId: S.String,
          Description: S.optional(S.String),
          AdapterName: S.optional(S.String),
          AutoUpdate: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateAdapterRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          AdapterId: S.optional(S.String),
          AdapterName: S.optional(S.String),
          CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Description: S.optional(S.String),
          FeatureTypes: S.optional(__S(16, __c1, 0)),
          AutoUpdate: S.optional(S.String),
        }),
      ).annotate({ identifier: "UpdateAdapterResponse" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
