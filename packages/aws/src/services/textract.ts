import * as API from "@distilled.cloud/core/api";
import * as S from "@distilled.cloud/core/schema-lite";
import * as __L from "@distilled.cloud/core/schema-lite";
import * as TxXray from "@distilled.cloud/core/telemetry-xray";
import type * as HttpClient from "effect/http/HttpClient";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import { AwsServiceErrors } from "../errors.ts";
import { AwsProtocol } from "../protocol.ts";
import type { RegionInput } from "../region.ts";
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

/** Span facts shared by every operation (com.distilled.telemetry#service). */
const TELEMETRY = {
  system: "aws-api",
  responseHeaders: [
    { header: "x-amzn-requestid", name: "aws.request_id" },
    { header: "x-amz-request-id", name: "aws.request_id" },
    { header: "x-amzn-request-id", name: "aws.request_id" },
    { header: "x-amz-id-2", name: "aws.extended_request_id" },
  ],
  prefix: "Textract",
  service: "Textract",
  templates: false,
  propagate: TxXray.propagate,
} as const;

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
  }).pipe(C.withThrottlingError, C.withRetryableError) {}
export class ProvisionedThroughputExceededException
  extends /*@__PURE__*/ S.TaggedError<ProvisionedThroughputExceededException>()(
    "ProvisionedThroughputExceededException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      Code: /*@__PURE__*/ S.optional(S.String),
    },
  ).pipe(C.withThrottlingError, C.withRetryableError) {}
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
  }).pipe(C.withThrottlingError, C.withRetryableError) {}
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
  Bucket?: string | undefined;
  Name?: string | undefined;
  Version?: string | undefined;
}
export interface Document {
  Bytes?: Uint8Array | undefined;
  S3Object?: S3Object | undefined;
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
  ContentClassifiers?: ContentClassifier[] | undefined;
}
export interface HumanLoopConfig {
  HumanLoopName: string;
  FlowDefinitionArn: string;
  DataAttributes?: HumanLoopDataAttributes | undefined;
}
export type QueryInput = string;
export type QueryPage = string;
export type QueryPages = string[];
export interface Query {
  Text: string;
  Alias?: string | undefined;
  Pages?: string[] | undefined;
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
  Pages?: string[] | undefined;
  Version: string;
}
export type Adapters = Adapter[];
export interface AdaptersConfig {
  Adapters: Adapter[];
}
export interface AnalyzeDocumentRequest {
  Document: Document;
  FeatureTypes: FeatureType[];
  HumanLoopConfig?: HumanLoopConfig | undefined;
  QueriesConfig?: QueriesConfig | undefined;
  AdaptersConfig?: AdaptersConfig | undefined;
}
export type UInteger = number;
export interface DocumentMetadata {
  Pages?: number | undefined;
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
  Width?: number | undefined;
  Height?: number | undefined;
  Left?: number | undefined;
  Top?: number | undefined;
}
export interface Point {
  X?: number | undefined;
  Y?: number | undefined;
}
export type Polygon = Point[];
export type Angle = number;
export interface Geometry {
  BoundingBox?: BoundingBox | undefined;
  Polygon?: Point[] | undefined;
  RotationAngle?: number | undefined;
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
  Type?: RelationshipType | undefined;
  Ids?: string[] | undefined;
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
  BlockType?: BlockType | undefined;
  Confidence?: number | undefined;
  Text?: string | undefined;
  TextType?: TextType | undefined;
  RowIndex?: number | undefined;
  ColumnIndex?: number | undefined;
  RowSpan?: number | undefined;
  ColumnSpan?: number | undefined;
  Geometry?: Geometry | undefined;
  Id?: string | undefined;
  Relationships?: Relationship[] | undefined;
  EntityTypes?: EntityType[] | undefined;
  SelectionStatus?: SelectionStatus | undefined;
  Page?: number | undefined;
  Query?: Query | undefined;
}
export type BlockList = Block[];
export type HumanLoopArn = string;
export type HumanLoopActivationReason = string;
export type HumanLoopActivationReasons = string[];
export type SynthesizedJsonHumanLoopActivationConditionsEvaluationResults = string;
export interface HumanLoopActivationOutput {
  HumanLoopArn?: string | undefined;
  HumanLoopActivationReasons?: string[] | undefined;
  HumanLoopActivationConditionsEvaluationResults?: string | undefined;
}
export interface AnalyzeDocumentResponse {
  DocumentMetadata?: DocumentMetadata | undefined;
  Blocks?: Block[] | undefined;
  HumanLoopActivationOutput?: HumanLoopActivationOutput | undefined;
  AnalyzeDocumentModelVersion?: string | undefined;
}
export interface AnalyzeExpenseRequest {
  Document: Document;
}
export interface ExpenseType {
  Text?: string | undefined;
  Confidence?: number | undefined;
}
export interface ExpenseDetection {
  Text?: string | undefined;
  Geometry?: Geometry | undefined;
  Confidence?: number | undefined;
}
export interface ExpenseCurrency {
  Code?: string | undefined;
  Confidence?: number | undefined;
}
export type StringList = string[];
export interface ExpenseGroupProperty {
  Types?: string[] | undefined;
  Id?: string | undefined;
}
export type ExpenseGroupPropertyList = ExpenseGroupProperty[];
export interface ExpenseField {
  Type?: ExpenseType | undefined;
  LabelDetection?: ExpenseDetection | undefined;
  ValueDetection?: ExpenseDetection | undefined;
  PageNumber?: number | undefined;
  Currency?: ExpenseCurrency | undefined;
  GroupProperties?: ExpenseGroupProperty[] | undefined;
}
export type ExpenseFieldList = ExpenseField[];
export interface LineItemFields {
  LineItemExpenseFields?: ExpenseField[] | undefined;
}
export type LineItemList = LineItemFields[];
export interface LineItemGroup {
  LineItemGroupIndex?: number | undefined;
  LineItems?: LineItemFields[] | undefined;
}
export type LineItemGroupList = LineItemGroup[];
export interface ExpenseDocument {
  ExpenseIndex?: number | undefined;
  SummaryFields?: ExpenseField[] | undefined;
  LineItemGroups?: LineItemGroup[] | undefined;
  Blocks?: Block[] | undefined;
}
export type ExpenseDocumentList = ExpenseDocument[];
export interface AnalyzeExpenseResponse {
  DocumentMetadata?: DocumentMetadata | undefined;
  ExpenseDocuments?: ExpenseDocument[] | undefined;
}
export type DocumentPages = Document[];
export interface AnalyzeIDRequest {
  DocumentPages: Document[];
}
export type ValueType = "DATE" | (string & {});
export interface NormalizedValue {
  Value?: string | undefined;
  ValueType?: ValueType | undefined;
}
export interface AnalyzeIDDetections {
  Text: string;
  NormalizedValue?: NormalizedValue | undefined;
  Confidence?: number | undefined;
}
export interface IdentityDocumentField {
  Type?: AnalyzeIDDetections | undefined;
  ValueDetection?: AnalyzeIDDetections | undefined;
}
export type IdentityDocumentFieldList = IdentityDocumentField[];
export interface IdentityDocument {
  DocumentIndex?: number | undefined;
  IdentityDocumentFields?: IdentityDocumentField[] | undefined;
  Blocks?: Block[] | undefined;
}
export type IdentityDocumentList = IdentityDocument[];
export interface AnalyzeIDResponse {
  IdentityDocuments?: IdentityDocument[] | undefined;
  DocumentMetadata?: DocumentMetadata | undefined;
  AnalyzeIDModelVersion?: string | undefined;
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
  ClientRequestToken?: string | undefined;
  Description?: string | undefined;
  FeatureTypes: FeatureType[];
  AutoUpdate?: AutoUpdate | undefined;
  Tags?: { [key: string]: string | undefined } | undefined;
}
export interface CreateAdapterResponse {
  AdapterId?: string | undefined;
}
export interface AdapterVersionDatasetConfig {
  ManifestS3Object?: S3Object | undefined;
}
export type KMSKeyId = string;
export interface OutputConfig {
  S3Bucket: string;
  S3Prefix?: string | undefined;
}
export interface CreateAdapterVersionRequest {
  AdapterId: string;
  ClientRequestToken?: string | undefined;
  DatasetConfig: AdapterVersionDatasetConfig;
  KMSKeyId?: string | undefined;
  OutputConfig: OutputConfig;
  Tags?: { [key: string]: string | undefined } | undefined;
}
export interface CreateAdapterVersionResponse {
  AdapterId?: string | undefined;
  AdapterVersion?: string | undefined;
}
export type BlueprintName = string;
export type BlueprintSchema = string;
export type EncryptionKmsKeyId = string;
export type EncryptionContextKey = string;
export type EncryptionContextValue = string;
export type KmsEncryptionContext = { [key: string]: string | undefined };
export interface EncryptionConfiguration {
  KmsKeyId: string;
  KmsEncryptionContext?: { [key: string]: string | undefined } | undefined;
}
export interface CreateBlueprintRequest {
  ClientRequestToken?: string | undefined;
  BlueprintName: string;
  Schema: string;
  EncryptionConfiguration?: EncryptionConfiguration | undefined;
  Tags?: { [key: string]: string | undefined } | undefined;
}
export type BlueprintArn = string;
export interface CreateBlueprintResponse {
  BlueprintArn: string;
}
export interface CreateBlueprintVersionRequest {
  BlueprintArn: string;
  ClientRequestToken?: string | undefined;
}
export type BlueprintVersion = string;
export interface CreateBlueprintVersionResponse {
  BlueprintArn: string;
  BlueprintVersion: string;
}
export type ProjectName = string;
export type ProjectDescription = string;
export type State = "ENABLED" | "DISABLED" | (string & {});
export interface BoundingBoxConfiguration {
  State: State;
}
export type ExtractionGranularityType =
  | "DOCUMENT"
  | "PAGE"
  | "ELEMENT"
  | "WORD"
  | "LINE"
  | (string & {});
export type ExtractionGranularityTypes = ExtractionGranularityType[];
export interface ExtractionGranularity {
  Types?: ExtractionGranularityType[] | undefined;
}
export interface OutputAdditionalFileFormat {
  State: State;
}
export type OutputTextFormatType = "PLAIN_TEXT" | "MARKDOWN" | "HTML" | "CSV" | (string & {});
export type OutputTextFormatTypes = OutputTextFormatType[];
export interface OutputTextFormat {
  Types?: OutputTextFormatType[] | undefined;
}
export interface OutputFormat {
  AdditionalFileFormat: OutputAdditionalFileFormat;
  TextFormat: OutputTextFormat;
}
export interface ExtractionConfiguration {
  BoundingBox: BoundingBoxConfiguration;
  Granularity: ExtractionGranularity;
  OutputFormat: OutputFormat;
}
export interface SummarizationConfiguration {
  State: State;
}
export interface FigureCaptionConfiguration {
  State: State;
}
export interface GenerativeConfiguration {
  Summarization?: SummarizationConfiguration | undefined;
  FigureCaption?: FigureCaptionConfiguration | undefined;
}
export interface BlueprintItem {
  BlueprintArn: string;
  BlueprintVersion?: string | undefined;
}
export type BlueprintItems = BlueprintItem[];
export type FallbackBlueprintItems = BlueprintItem[];
export interface CustomConfiguration {
  Blueprints: BlueprintItem[];
  FallbackBlueprints?: BlueprintItem[] | undefined;
}
export interface SplitterConfiguration {
  State: State;
}
export type SensitiveDataDetectionMode =
  | "DETECTION"
  | "DETECTION_AND_REDACTION"
  | "DISABLED"
  | (string & {});
export type PIIEntityType =
  | "ALL"
  | "ADDRESS"
  | "AGE"
  | "NAME"
  | "EMAIL"
  | "PHONE"
  | "USERNAME"
  | "PASSWORD"
  | "DRIVER_ID"
  | "LICENSE_PLATE"
  | "VEHICLE_IDENTIFICATION_NUMBER"
  | "CREDIT_DEBIT_CARD_CVV"
  | "CREDIT_DEBIT_CARD_EXPIRY"
  | "CREDIT_DEBIT_CARD_NUMBER"
  | "PIN"
  | "INTERNATIONAL_BANK_ACCOUNT_NUMBER"
  | "SWIFT_CODE"
  | "IP_ADDRESS"
  | "MAC_ADDRESS"
  | "URL"
  | "AWS_ACCESS_KEY"
  | "AWS_SECRET_KEY"
  | "US_BANK_ACCOUNT_NUMBER"
  | "US_BANK_ROUTING_NUMBER"
  | "US_INDIVIDUAL_TAX_IDENTIFICATION_NUMBER"
  | "US_PASSPORT_NUMBER"
  | "US_SOCIAL_SECURITY_NUMBER"
  | "CA_HEALTH_NUMBER"
  | "CA_SOCIAL_INSURANCE_NUMBER"
  | "UK_NATIONAL_HEALTH_SERVICE_NUMBER"
  | "UK_NATIONAL_INSURANCE_NUMBER"
  | "UK_UNIQUE_TAXPAYER_REFERENCE_NUMBER"
  | (string & {});
export type PIIEntityTypes = PIIEntityType[];
export type PIIRedactionMaskMode = "PII" | "ENTITY_TYPE" | (string & {});
export interface PIIEntitiesConfiguration {
  PiiEntityTypes: PIIEntityType[];
  RedactionMaskMode: PIIRedactionMaskMode;
}
export interface SensitiveDataConfiguration {
  DetectionMode: SensitiveDataDetectionMode;
  PiiEntitiesConfiguration?: PIIEntitiesConfiguration | undefined;
}
export interface CreateProjectRequest {
  ClientRequestToken?: string | undefined;
  ProjectName: string;
  ProjectDescription?: string | undefined;
  ExtractionConfiguration: ExtractionConfiguration;
  GenerativeConfiguration?: GenerativeConfiguration | undefined;
  CustomConfiguration?: CustomConfiguration | undefined;
  SplitterConfiguration?: SplitterConfiguration | undefined;
  SensitiveDataConfiguration?: SensitiveDataConfiguration | undefined;
  EncryptionConfiguration?: EncryptionConfiguration | undefined;
  Tags?: { [key: string]: string | undefined } | undefined;
}
export type ProjectArn = string;
export type ProjectStatus = "COMPLETED" | "FAILED" | (string & {});
export interface CreateProjectResponse {
  ProjectArn: string;
  Status?: ProjectStatus | undefined;
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
export interface DeleteBlueprintRequest {
  BlueprintArn: string;
  BlueprintVersion?: string | undefined;
}
export interface DeleteBlueprintResponse {}
export interface DeleteProjectRequest {
  ProjectArn: string;
}
export interface DeleteProjectResponse {}
export interface DetectDocumentTextRequest {
  Document: Document;
}
export interface DetectDocumentTextResponse {
  DocumentMetadata?: DocumentMetadata | undefined;
  Blocks?: Block[] | undefined;
  DetectDocumentTextModelVersion?: string | undefined;
}
export interface GetAdapterRequest {
  AdapterId: string;
}
export interface GetAdapterResponse {
  AdapterId?: string | undefined;
  AdapterName?: string | undefined;
  CreationTime?: Date | undefined;
  Description?: string | undefined;
  FeatureTypes?: FeatureType[] | undefined;
  AutoUpdate?: AutoUpdate | undefined;
  Tags?: { [key: string]: string | undefined } | undefined;
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
  F1Score?: number | undefined;
  Precision?: number | undefined;
  Recall?: number | undefined;
}
export interface AdapterVersionEvaluationMetric {
  Baseline?: EvaluationMetric | undefined;
  AdapterVersion?: EvaluationMetric | undefined;
  FeatureType?: FeatureType | undefined;
}
export type AdapterVersionEvaluationMetrics = AdapterVersionEvaluationMetric[];
export interface GetAdapterVersionResponse {
  AdapterId?: string | undefined;
  AdapterVersion?: string | undefined;
  CreationTime?: Date | undefined;
  FeatureTypes?: FeatureType[] | undefined;
  Status?: AdapterVersionStatus | undefined;
  StatusMessage?: string | undefined;
  DatasetConfig?: AdapterVersionDatasetConfig | undefined;
  KMSKeyId?: string | undefined;
  OutputConfig?: OutputConfig | undefined;
  EvaluationMetrics?: AdapterVersionEvaluationMetric[] | undefined;
  Tags?: { [key: string]: string | undefined } | undefined;
}
export interface GetBlueprintRequest {
  BlueprintArn: string;
  BlueprintVersion?: string | undefined;
}
export interface GetBlueprintResponse {
  BlueprintArn: string;
  BlueprintName: string;
  BlueprintVersion?: string | undefined;
  Schema: string;
  KmsKeyId?: string | undefined;
  KmsEncryptionContext?: { [key: string]: string | undefined } | undefined;
  CreationTime: Date;
  LastModifiedTime: Date;
}
export type JobId = string;
export type MaxResults = number;
export type PaginationToken = string;
export interface GetDocumentAnalysisRequest {
  JobId: string;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
}
export type JobStatus = "IN_PROGRESS" | "SUCCEEDED" | "FAILED" | "PARTIAL_SUCCESS" | (string & {});
export type ErrorCode = string;
export type Pages = number[];
export interface Warning {
  ErrorCode?: string | undefined;
  Pages?: number[] | undefined;
}
export type Warnings = Warning[];
export type StatusMessage = string;
export interface GetDocumentAnalysisResponse {
  DocumentMetadata?: DocumentMetadata | undefined;
  JobStatus?: JobStatus | undefined;
  NextToken?: string | undefined;
  Blocks?: Block[] | undefined;
  Warnings?: Warning[] | undefined;
  StatusMessage?: string | undefined;
  AnalyzeDocumentModelVersion?: string | undefined;
}
export type JobArn = string;
export interface GetDocumentInsightsRequest {
  JobArn: string;
}
export type S3Uri = string;
export interface OutputConfiguration {
  S3Uri: string;
}
export type ErrorType = string;
export type ErrorMessage = string;
export interface GetDocumentInsightsResponse {
  Status: JobStatus;
  OutputConfiguration?: OutputConfiguration | undefined;
  ErrorType?: string | undefined;
  ErrorMessage?: string | undefined;
}
export interface GetDocumentTextDetectionRequest {
  JobId: string;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
}
export interface GetDocumentTextDetectionResponse {
  DocumentMetadata?: DocumentMetadata | undefined;
  JobStatus?: JobStatus | undefined;
  NextToken?: string | undefined;
  Blocks?: Block[] | undefined;
  Warnings?: Warning[] | undefined;
  StatusMessage?: string | undefined;
  DetectDocumentTextModelVersion?: string | undefined;
}
export interface GetExpenseAnalysisRequest {
  JobId: string;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
}
export interface GetExpenseAnalysisResponse {
  DocumentMetadata?: DocumentMetadata | undefined;
  JobStatus?: JobStatus | undefined;
  NextToken?: string | undefined;
  ExpenseDocuments?: ExpenseDocument[] | undefined;
  Warnings?: Warning[] | undefined;
  StatusMessage?: string | undefined;
  AnalyzeExpenseModelVersion?: string | undefined;
}
export interface GetLendingAnalysisRequest {
  JobId: string;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
}
export interface Prediction {
  Value?: string | undefined;
  Confidence?: number | undefined;
}
export type PredictionList = Prediction[];
export interface PageClassification {
  PageType: Prediction[];
  PageNumber: Prediction[];
}
export interface LendingDetection {
  Text?: string | undefined;
  SelectionStatus?: SelectionStatus | undefined;
  Geometry?: Geometry | undefined;
  Confidence?: number | undefined;
}
export type LendingDetectionList = LendingDetection[];
export interface LendingField {
  Type?: string | undefined;
  KeyDetection?: LendingDetection | undefined;
  ValueDetections?: LendingDetection[] | undefined;
}
export type LendingFieldList = LendingField[];
export interface SignatureDetection {
  Confidence?: number | undefined;
  Geometry?: Geometry | undefined;
}
export type SignatureDetectionList = SignatureDetection[];
export interface LendingDocument {
  LendingFields?: LendingField[] | undefined;
  SignatureDetections?: SignatureDetection[] | undefined;
}
export interface Extraction {
  LendingDocument?: LendingDocument | undefined;
  ExpenseDocument?: ExpenseDocument | undefined;
  IdentityDocument?: IdentityDocument | undefined;
}
export type ExtractionList = Extraction[];
export interface LendingResult {
  Page?: number | undefined;
  PageClassification?: PageClassification | undefined;
  Extractions?: Extraction[] | undefined;
}
export type LendingResultList = LendingResult[];
export interface GetLendingAnalysisResponse {
  DocumentMetadata?: DocumentMetadata | undefined;
  JobStatus?: JobStatus | undefined;
  NextToken?: string | undefined;
  Results?: LendingResult[] | undefined;
  Warnings?: Warning[] | undefined;
  StatusMessage?: string | undefined;
  AnalyzeLendingModelVersion?: string | undefined;
}
export interface GetLendingAnalysisSummaryRequest {
  JobId: string;
}
export type PageList = number[];
export interface SplitDocument {
  Index?: number | undefined;
  Pages?: number[] | undefined;
}
export type SplitDocumentList = SplitDocument[];
export interface DetectedSignature {
  Page?: number | undefined;
}
export type DetectedSignatureList = DetectedSignature[];
export interface UndetectedSignature {
  Page?: number | undefined;
}
export type UndetectedSignatureList = UndetectedSignature[];
export interface DocumentGroup {
  Type?: string | undefined;
  SplitDocuments?: SplitDocument[] | undefined;
  DetectedSignatures?: DetectedSignature[] | undefined;
  UndetectedSignatures?: UndetectedSignature[] | undefined;
}
export type DocumentGroupList = DocumentGroup[];
export type UndetectedDocumentTypeList = string[];
export interface LendingSummary {
  DocumentGroups?: DocumentGroup[] | undefined;
  UndetectedDocumentTypes?: string[] | undefined;
}
export interface GetLendingAnalysisSummaryResponse {
  DocumentMetadata?: DocumentMetadata | undefined;
  JobStatus?: JobStatus | undefined;
  Summary?: LendingSummary | undefined;
  Warnings?: Warning[] | undefined;
  StatusMessage?: string | undefined;
  AnalyzeLendingModelVersion?: string | undefined;
}
export interface GetProjectRequest {
  ProjectArn: string;
}
export interface GetProjectResponse {
  ProjectArn: string;
  ProjectName: string;
  ProjectDescription?: string | undefined;
  Status: ProjectStatus;
  ExtractionConfiguration?: ExtractionConfiguration | undefined;
  GenerativeConfiguration?: GenerativeConfiguration | undefined;
  CustomConfiguration?: CustomConfiguration | undefined;
  SplitterConfiguration?: SplitterConfiguration | undefined;
  SensitiveDataConfiguration?: SensitiveDataConfiguration | undefined;
  EncryptionConfiguration?: EncryptionConfiguration | undefined;
  CreationTime: Date;
  LastModifiedTime: Date;
}
export interface ListAdaptersRequest {
  AfterCreationTime?: Date | undefined;
  BeforeCreationTime?: Date | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
}
export interface AdapterOverview {
  AdapterId?: string | undefined;
  AdapterName?: string | undefined;
  CreationTime?: Date | undefined;
  FeatureTypes?: FeatureType[] | undefined;
}
export type AdapterList = AdapterOverview[];
export interface ListAdaptersResponse {
  Adapters?: AdapterOverview[] | undefined;
  NextToken?: string | undefined;
}
export interface ListAdapterVersionsRequest {
  AdapterId?: string | undefined;
  AfterCreationTime?: Date | undefined;
  BeforeCreationTime?: Date | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
}
export interface AdapterVersionOverview {
  AdapterId?: string | undefined;
  AdapterVersion?: string | undefined;
  CreationTime?: Date | undefined;
  FeatureTypes?: FeatureType[] | undefined;
  Status?: AdapterVersionStatus | undefined;
  StatusMessage?: string | undefined;
}
export type AdapterVersionList = AdapterVersionOverview[];
export interface ListAdapterVersionsResponse {
  AdapterVersions?: AdapterVersionOverview[] | undefined;
  NextToken?: string | undefined;
}
export type IntelligencePaginationToken = string;
export interface ProjectFilter {
  ProjectArn: string;
}
export type ResourceOwner = "ACCOUNT" | "SERVICE" | (string & {});
export interface ListBlueprintsRequest {
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
  BlueprintArn?: string | undefined;
  ProjectFilter?: ProjectFilter | undefined;
  ResourceOwner?: ResourceOwner | undefined;
}
export interface BlueprintSummary {
  BlueprintArn: string;
  BlueprintName?: string | undefined;
  BlueprintVersion?: string | undefined;
  ResourceOwner?: ResourceOwner | undefined;
  CreationTime: Date;
  LastModifiedTime?: Date | undefined;
}
export type BlueprintSummaryList = BlueprintSummary[];
export interface ListBlueprintsResponse {
  Blueprints: BlueprintSummary[];
  NextToken?: string | undefined;
}
export interface BlueprintFilter {
  BlueprintArn: string;
  BlueprintVersion?: string | undefined;
}
export interface ListProjectsRequest {
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
  BlueprintFilter?: BlueprintFilter | undefined;
}
export interface ProjectSummary {
  ProjectArn: string;
  ProjectName?: string | undefined;
  CreationTime: Date;
  LastModifiedTime?: Date | undefined;
}
export type ProjectSummaryList = ProjectSummary[];
export interface ListProjectsResponse {
  Projects: ProjectSummary[];
  NextToken?: string | undefined;
}
export type AmazonResourceName = string;
export interface ListTagsForResourceRequest {
  ResourceARN: string;
}
export interface ListTagsForResourceResponse {
  Tags?: { [key: string]: string | undefined } | undefined;
}
export interface DocumentLocation {
  S3Object?: S3Object | undefined;
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
  ClientRequestToken?: string | undefined;
  JobTag?: string | undefined;
  NotificationChannel?: NotificationChannel | undefined;
  OutputConfig?: OutputConfig | undefined;
  KMSKeyId?: string | undefined;
  QueriesConfig?: QueriesConfig | undefined;
  AdaptersConfig?: AdaptersConfig | undefined;
}
export interface StartDocumentAnalysisResponse {
  JobId?: string | undefined;
}
export interface InputConfiguration {
  S3Uri: string;
}
export interface EventBridgeConfiguration {
  State: State;
}
export interface NotificationConfiguration {
  EventBridgeConfiguration: EventBridgeConfiguration;
}
export interface StartDocumentInsightsRequest {
  InputConfiguration: InputConfiguration;
  OutputConfiguration: OutputConfiguration;
  ProjectArn?: string | undefined;
  Blueprints?: BlueprintItem[] | undefined;
  EncryptionConfiguration?: EncryptionConfiguration | undefined;
  NotificationConfiguration?: NotificationConfiguration | undefined;
  Tags?: { [key: string]: string | undefined } | undefined;
}
export interface StartDocumentInsightsResponse {
  JobArn: string;
}
export interface StartDocumentTextDetectionRequest {
  DocumentLocation: DocumentLocation;
  ClientRequestToken?: string | undefined;
  JobTag?: string | undefined;
  NotificationChannel?: NotificationChannel | undefined;
  OutputConfig?: OutputConfig | undefined;
  KMSKeyId?: string | undefined;
}
export interface StartDocumentTextDetectionResponse {
  JobId?: string | undefined;
}
export interface StartExpenseAnalysisRequest {
  DocumentLocation: DocumentLocation;
  ClientRequestToken?: string | undefined;
  JobTag?: string | undefined;
  NotificationChannel?: NotificationChannel | undefined;
  OutputConfig?: OutputConfig | undefined;
  KMSKeyId?: string | undefined;
}
export interface StartExpenseAnalysisResponse {
  JobId?: string | undefined;
}
export interface StartLendingAnalysisRequest {
  DocumentLocation: DocumentLocation;
  ClientRequestToken?: string | undefined;
  JobTag?: string | undefined;
  NotificationChannel?: NotificationChannel | undefined;
  OutputConfig?: OutputConfig | undefined;
  KMSKeyId?: string | undefined;
}
export interface StartLendingAnalysisResponse {
  JobId?: string | undefined;
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
  Description?: string | undefined;
  AdapterName?: string | undefined;
  AutoUpdate?: AutoUpdate | undefined;
}
export interface UpdateAdapterResponse {
  AdapterId?: string | undefined;
  AdapterName?: string | undefined;
  CreationTime?: Date | undefined;
  Description?: string | undefined;
  FeatureTypes?: FeatureType[] | undefined;
  AutoUpdate?: AutoUpdate | undefined;
}
export interface UpdateBlueprintRequest {
  BlueprintArn: string;
  Schema?: string | undefined;
  EncryptionConfiguration?: EncryptionConfiguration | undefined;
}
export interface UpdateBlueprintResponse {
  BlueprintArn: string;
}
export interface UpdateProjectRequest {
  ProjectArn: string;
  ProjectDescription?: string | undefined;
  ExtractionConfiguration?: ExtractionConfiguration | undefined;
  GenerativeConfiguration?: GenerativeConfiguration | undefined;
  CustomConfiguration?: CustomConfiguration | undefined;
  SplitterConfiguration?: SplitterConfiguration | undefined;
  SensitiveDataConfiguration?: SensitiveDataConfiguration | undefined;
  EncryptionConfiguration?: EncryptionConfiguration | undefined;
}
export interface UpdateProjectResponse {
  ProjectArn: string;
  Status?: ProjectStatus | undefined;
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
  AnalyzeDocumentRequest & RegionInput,
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
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AnalyzeDocument",
  telemetry: TELEMETRY,
  span: "AnalyzeDocument",
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
  AnalyzeExpenseRequest & RegionInput,
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
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AnalyzeExpense",
  telemetry: TELEMETRY,
  span: "AnalyzeExpense",
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
  AnalyzeIDRequest & RegionInput,
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
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AnalyzeID",
  telemetry: TELEMETRY,
  span: "AnalyzeID",
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
  CreateAdapterRequest & RegionInput,
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
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAdapter",
  telemetry: TELEMETRY,
  span: "CreateAdapter",
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
  CreateAdapterVersionRequest & RegionInput,
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
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAdapterVersion",
  telemetry: TELEMETRY,
  span: "CreateAdapterVersion",
}));

export type CreateBlueprintError =
  | AccessDeniedException
  | ConflictException
  | InternalServerError
  | InvalidParameterException
  | LimitExceededException
  | ProvisionedThroughputExceededException
  | ValidationException
  | CommonErrors;
/**
 * Creates a blueprint that defines the schema Amazon Textract uses to extract structured
 * data from a document during a document insights job. A blueprint describes the fields
 * to extract and how to normalize them.
 */
export const createBlueprint: API.OperationMethod<
  CreateBlueprintRequest & RegionInput,
  CreateBlueprintResponse,
  CreateBlueprintError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(304, __c19, 0) as any as S.Schema<CreateBlueprintRequest>,
  output: __S(336, __c21, 0) as any as S.Schema<CreateBlueprintResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerError,
    InvalidParameterException,
    LimitExceededException,
    ProvisionedThroughputExceededException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateBlueprint",
  telemetry: TELEMETRY,
  span: "CreateBlueprint",
}));

export type CreateBlueprintVersionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerError
  | InvalidParameterException
  | LimitExceededException
  | ProvisionedThroughputExceededException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new, immutable version of an existing blueprint so that projects can pin to a
 * specific version.
 */
export const createBlueprintVersion: API.OperationMethod<
  CreateBlueprintVersionRequest & RegionInput,
  CreateBlueprintVersionResponse,
  CreateBlueprintVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(352, __c22, 0) as any as S.Schema<CreateBlueprintVersionRequest>,
  output: __S(353, __c22, 1) as any as S.Schema<CreateBlueprintVersionResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerError,
    InvalidParameterException,
    LimitExceededException,
    ProvisionedThroughputExceededException,
    ResourceNotFoundException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateBlueprintVersion",
  telemetry: TELEMETRY,
  span: "CreateBlueprintVersion",
}));

export type CreateProjectError =
  | AccessDeniedException
  | ConflictException
  | InternalServerError
  | InvalidParameterException
  | LimitExceededException
  | ProvisionedThroughputExceededException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Creates a project that groups the configuration used to run document insights jobs.
 */
export const createProject: API.OperationMethod<
  CreateProjectRequest & RegionInput,
  CreateProjectResponse,
  CreateProjectError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(368, __c23, 0) as any as S.Schema<CreateProjectRequest>,
  output: __S(432, __c27, 0) as any as S.Schema<CreateProjectResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerError,
    InvalidParameterException,
    LimitExceededException,
    ProvisionedThroughputExceededException,
    ResourceNotFoundException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateProject",
  telemetry: TELEMETRY,
  span: "CreateProject",
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
  DeleteAdapterRequest & RegionInput,
  DeleteAdapterResponse,
  DeleteAdapterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(448, __c28, 0) as any as S.Schema<DeleteAdapterRequest>,
  output: __S(464, __c29, 0) as any as S.Schema<DeleteAdapterResponse>,
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
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAdapter",
  telemetry: TELEMETRY,
  span: "DeleteAdapter",
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
  DeleteAdapterVersionRequest & RegionInput,
  DeleteAdapterVersionResponse,
  DeleteAdapterVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(480, __c30, 0) as any as S.Schema<DeleteAdapterVersionRequest>,
  output: __S(464, __c29, 0) as any as S.Schema<DeleteAdapterVersionResponse>,
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
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAdapterVersion",
  telemetry: TELEMETRY,
  span: "DeleteAdapterVersion",
}));

export type DeleteBlueprintError =
  | AccessDeniedException
  | ConflictException
  | InternalServerError
  | InvalidParameterException
  | ProvisionedThroughputExceededException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a blueprint, or a specific version of a blueprint.
 */
export const deleteBlueprint: API.OperationMethod<
  DeleteBlueprintRequest & RegionInput,
  DeleteBlueprintResponse,
  DeleteBlueprintError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(496, __c31, 0) as any as S.Schema<DeleteBlueprintRequest>,
  output: __S(464, __c29, 0) as any as S.Schema<DeleteBlueprintResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerError,
    InvalidParameterException,
    ProvisionedThroughputExceededException,
    ResourceNotFoundException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteBlueprint",
  telemetry: TELEMETRY,
  span: "DeleteBlueprint",
}));

export type DeleteProjectError =
  | AccessDeniedException
  | InternalServerError
  | InvalidParameterException
  | ProvisionedThroughputExceededException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a project.
 */
export const deleteProject: API.OperationMethod<
  DeleteProjectRequest & RegionInput,
  DeleteProjectResponse,
  DeleteProjectError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(512, __c32, 0) as any as S.Schema<DeleteProjectRequest>,
  output: __S(464, __c29, 0) as any as S.Schema<DeleteProjectResponse>,
  errors: [
    AccessDeniedException,
    InternalServerError,
    InvalidParameterException,
    ProvisionedThroughputExceededException,
    ResourceNotFoundException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteProject",
  telemetry: TELEMETRY,
  span: "DeleteProject",
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
  DetectDocumentTextRequest & RegionInput,
  DetectDocumentTextResponse,
  DetectDocumentTextError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(528, __c33, 0) as any as S.Schema<DetectDocumentTextRequest>,
  output: __S(529, __c33, 1) as any as S.Schema<DetectDocumentTextResponse>,
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
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DetectDocumentText",
  telemetry: TELEMETRY,
  span: "DetectDocumentText",
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
  GetAdapterRequest & RegionInput,
  GetAdapterResponse,
  GetAdapterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(544, __c34, 0) as any as S.Schema<GetAdapterRequest>,
  output: __S(545, __c34, 1) as any as S.Schema<GetAdapterResponse>,
  errors: [
    AccessDeniedException,
    InternalServerError,
    InvalidParameterException,
    ProvisionedThroughputExceededException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAdapter",
  telemetry: TELEMETRY,
  span: "GetAdapter",
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
  GetAdapterVersionRequest & RegionInput,
  GetAdapterVersionResponse,
  GetAdapterVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(560, __c35, 0) as any as S.Schema<GetAdapterVersionRequest>,
  output: __S(564, __c35, 4) as any as S.Schema<GetAdapterVersionResponse>,
  errors: [
    AccessDeniedException,
    InternalServerError,
    InvalidParameterException,
    ProvisionedThroughputExceededException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAdapterVersion",
  telemetry: TELEMETRY,
  span: "GetAdapterVersion",
}));

export type GetBlueprintError =
  | AccessDeniedException
  | InternalServerError
  | InvalidParameterException
  | ProvisionedThroughputExceededException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Gets the details of a blueprint, including its schema, encryption settings, and
 * timestamps.
 */
export const getBlueprint: API.OperationMethod<
  GetBlueprintRequest & RegionInput,
  GetBlueprintResponse,
  GetBlueprintError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(576, __c36, 0) as any as S.Schema<GetBlueprintRequest>,
  output: __S(577, __c36, 1) as any as S.Schema<GetBlueprintResponse>,
  errors: [
    AccessDeniedException,
    InternalServerError,
    InvalidParameterException,
    ProvisionedThroughputExceededException,
    ResourceNotFoundException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBlueprint",
  telemetry: TELEMETRY,
  span: "GetBlueprint",
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
  GetDocumentAnalysisRequest & RegionInput,
  GetDocumentAnalysisResponse,
  GetDocumentAnalysisError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(592, __c37, 0) as any as S.Schema<GetDocumentAnalysisRequest>,
  output: __S(593, __c37, 1) as any as S.Schema<GetDocumentAnalysisResponse>,
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
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDocumentAnalysis",
  telemetry: TELEMETRY,
  span: "GetDocumentAnalysis",
}));

export type GetDocumentInsightsError =
  | AccessDeniedException
  | InternalServerError
  | InvalidJobIdException
  | InvalidParameterException
  | ProvisionedThroughputExceededException
  | ValidationException
  | CommonErrors;
/**
 * Gets the status and results of a document insights job that was started by
 * StartDocumentInsights.
 */
export const getDocumentInsights: API.OperationMethod<
  GetDocumentInsightsRequest & RegionInput,
  GetDocumentInsightsResponse,
  GetDocumentInsightsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(624, __c39, 0) as any as S.Schema<GetDocumentInsightsRequest>,
  output: __S(625, __c39, 1) as any as S.Schema<GetDocumentInsightsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerError,
    InvalidJobIdException,
    InvalidParameterException,
    ProvisionedThroughputExceededException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDocumentInsights",
  telemetry: TELEMETRY,
  span: "GetDocumentInsights",
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
  GetDocumentTextDetectionRequest & RegionInput,
  GetDocumentTextDetectionResponse,
  GetDocumentTextDetectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(656, __c41, 0) as any as S.Schema<GetDocumentTextDetectionRequest>,
  output: __S(657, __c41, 1) as any as S.Schema<GetDocumentTextDetectionResponse>,
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
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDocumentTextDetection",
  telemetry: TELEMETRY,
  span: "GetDocumentTextDetection",
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
  GetExpenseAnalysisRequest & RegionInput,
  GetExpenseAnalysisResponse,
  GetExpenseAnalysisError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(672, __c42, 0) as any as S.Schema<GetExpenseAnalysisRequest>,
  output: __S(673, __c42, 1) as any as S.Schema<GetExpenseAnalysisResponse>,
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
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetExpenseAnalysis",
  telemetry: TELEMETRY,
  span: "GetExpenseAnalysis",
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
  GetLendingAnalysisRequest & RegionInput,
  GetLendingAnalysisResponse,
  GetLendingAnalysisError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(688, __c43, 0) as any as S.Schema<GetLendingAnalysisRequest>,
  output: __S(703, __c43, 15) as any as S.Schema<GetLendingAnalysisResponse>,
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
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetLendingAnalysis",
  telemetry: TELEMETRY,
  span: "GetLendingAnalysis",
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
  GetLendingAnalysisSummaryRequest & RegionInput,
  GetLendingAnalysisSummaryResponse,
  GetLendingAnalysisSummaryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(704, __c44, 0) as any as S.Schema<GetLendingAnalysisSummaryRequest>,
  output: __S(712, __c44, 8) as any as S.Schema<GetLendingAnalysisSummaryResponse>,
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
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetLendingAnalysisSummary",
  telemetry: TELEMETRY,
  span: "GetLendingAnalysisSummary",
}));

export type GetProjectError =
  | AccessDeniedException
  | InternalServerError
  | InvalidParameterException
  | ProvisionedThroughputExceededException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Gets the details of a project, including its configuration, status, and timestamps.
 */
export const getProject: API.OperationMethod<
  GetProjectRequest & RegionInput,
  GetProjectResponse,
  GetProjectError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(720, __c45, 0) as any as S.Schema<GetProjectRequest>,
  output: __S(721, __c45, 1) as any as S.Schema<GetProjectResponse>,
  errors: [
    AccessDeniedException,
    InternalServerError,
    InvalidParameterException,
    ProvisionedThroughputExceededException,
    ResourceNotFoundException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetProject",
  telemetry: TELEMETRY,
  span: "GetProject",
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
  ListAdaptersRequest & RegionInput,
  ListAdaptersResponse,
  ListAdaptersError,
  Credentials | HttpClient.HttpClient,
  AdapterOverview
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(736, __c46, 0) as any as S.Schema<ListAdaptersRequest>,
  output: __S(739, __c46, 3) as any as S.Schema<ListAdaptersResponse>,
  errors: [
    AccessDeniedException,
    InternalServerError,
    InvalidParameterException,
    ProvisionedThroughputExceededException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAdapters",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Adapters",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListAdapters",
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
  ListAdapterVersionsRequest & RegionInput,
  ListAdapterVersionsResponse,
  ListAdapterVersionsError,
  Credentials | HttpClient.HttpClient,
  AdapterVersionOverview
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(752, __c47, 0) as any as S.Schema<ListAdapterVersionsRequest>,
  output: __S(755, __c47, 3) as any as S.Schema<ListAdapterVersionsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerError,
    InvalidParameterException,
    ProvisionedThroughputExceededException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAdapterVersions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "AdapterVersions",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListAdapterVersions",
})) as any;

export type ListBlueprintsError =
  | AccessDeniedException
  | InternalServerError
  | InvalidParameterException
  | ProvisionedThroughputExceededException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists the blueprints that are available to the caller, with optional filtering by
 * project and resource owner. The results are paginated. If the response includes a
 * `NextToken` value, pass it in a subsequent call to retrieve the next page of
 * results.
 */
export const listBlueprints: API.PaginatedOperationMethod<
  ListBlueprintsRequest & RegionInput,
  ListBlueprintsResponse,
  ListBlueprintsError,
  Credentials | HttpClient.HttpClient,
  BlueprintSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(769, __c48, 1) as any as S.Schema<ListBlueprintsRequest>,
  output: __S(772, __c48, 4) as any as S.Schema<ListBlueprintsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerError,
    InvalidParameterException,
    ProvisionedThroughputExceededException,
    ResourceNotFoundException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListBlueprints",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Blueprints",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListBlueprints",
})) as any;

export type ListProjectsError =
  | AccessDeniedException
  | InternalServerError
  | InvalidParameterException
  | ProvisionedThroughputExceededException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists the projects that are available to the caller, with optional filtering by
 * blueprint. The results are paginated. If the response includes a `NextToken`
 * value, pass it in a subsequent call to retrieve the next page of results.
 */
export const listProjects: API.PaginatedOperationMethod<
  ListProjectsRequest & RegionInput,
  ListProjectsResponse,
  ListProjectsError,
  Credentials | HttpClient.HttpClient,
  ProjectSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(784, __c49, 0) as any as S.Schema<ListProjectsRequest>,
  output: __S(787, __c49, 3) as any as S.Schema<ListProjectsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerError,
    InvalidParameterException,
    ProvisionedThroughputExceededException,
    ResourceNotFoundException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListProjects",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Projects",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListProjects",
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
  ListTagsForResourceRequest & RegionInput,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(800, __c50, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(801, __c50, 1) as any as S.Schema<ListTagsForResourceResponse>,
  errors: [
    AccessDeniedException,
    InternalServerError,
    InvalidParameterException,
    ProvisionedThroughputExceededException,
    ResourceNotFoundException,
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
  StartDocumentAnalysisRequest & RegionInput,
  StartDocumentAnalysisResponse,
  StartDocumentAnalysisError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(816, __c51, 0) as any as S.Schema<StartDocumentAnalysisRequest>,
  output: __S(834, __c52, 2) as any as S.Schema<StartDocumentAnalysisResponse>,
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
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartDocumentAnalysis",
  telemetry: TELEMETRY,
  span: "StartDocumentAnalysis",
}));

export type StartDocumentInsightsError =
  | AccessDeniedException
  | InternalServerError
  | InvalidParameterException
  | LimitExceededException
  | ProvisionedThroughputExceededException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Starts an asynchronous job that analyzes a document using the configuration defined by a
 * project or a set of blueprints. Use GetDocumentInsights to
 * retrieve the results of the job.
 */
export const startDocumentInsights: API.OperationMethod<
  StartDocumentInsightsRequest & RegionInput,
  StartDocumentInsightsResponse,
  StartDocumentInsightsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(849, __c53, 1) as any as S.Schema<StartDocumentInsightsRequest>,
  output: __S(850, __c53, 2) as any as S.Schema<StartDocumentInsightsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerError,
    InvalidParameterException,
    LimitExceededException,
    ProvisionedThroughputExceededException,
    ResourceNotFoundException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartDocumentInsights",
  telemetry: TELEMETRY,
  span: "StartDocumentInsights",
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
  StartDocumentTextDetectionRequest & RegionInput,
  StartDocumentTextDetectionResponse,
  StartDocumentTextDetectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(864, __c54, 0) as any as S.Schema<StartDocumentTextDetectionRequest>,
  output: __S(834, __c52, 2) as any as S.Schema<StartDocumentTextDetectionResponse>,
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
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartDocumentTextDetection",
  telemetry: TELEMETRY,
  span: "StartDocumentTextDetection",
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
  StartExpenseAnalysisRequest & RegionInput,
  StartExpenseAnalysisResponse,
  StartExpenseAnalysisError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(880, __c55, 0) as any as S.Schema<StartExpenseAnalysisRequest>,
  output: __S(834, __c52, 2) as any as S.Schema<StartExpenseAnalysisResponse>,
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
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartExpenseAnalysis",
  telemetry: TELEMETRY,
  span: "StartExpenseAnalysis",
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
  StartLendingAnalysisRequest & RegionInput,
  StartLendingAnalysisResponse,
  StartLendingAnalysisError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(896, __c56, 0) as any as S.Schema<StartLendingAnalysisRequest>,
  output: __S(834, __c52, 2) as any as S.Schema<StartLendingAnalysisResponse>,
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
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartLendingAnalysis",
  telemetry: TELEMETRY,
  span: "StartLendingAnalysis",
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
  TagResourceRequest & RegionInput,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(912, __c57, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(464, __c29, 0) as any as S.Schema<TagResourceResponse>,
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
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
  telemetry: TELEMETRY,
  span: "TagResource",
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
  UntagResourceRequest & RegionInput,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(928, __c58, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(464, __c29, 0) as any as S.Schema<UntagResourceResponse>,
  errors: [
    AccessDeniedException,
    InternalServerError,
    InvalidParameterException,
    ProvisionedThroughputExceededException,
    ResourceNotFoundException,
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
  UpdateAdapterRequest & RegionInput,
  UpdateAdapterResponse,
  UpdateAdapterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(944, __c59, 0) as any as S.Schema<UpdateAdapterRequest>,
  output: __S(945, __c59, 1) as any as S.Schema<UpdateAdapterResponse>,
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
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAdapter",
  telemetry: TELEMETRY,
  span: "UpdateAdapter",
}));

export type UpdateBlueprintError =
  | AccessDeniedException
  | ConflictException
  | InternalServerError
  | InvalidParameterException
  | ProvisionedThroughputExceededException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Updates an existing blueprint, replacing its schema and, optionally, its encryption
 * configuration.
 */
export const updateBlueprint: API.OperationMethod<
  UpdateBlueprintRequest & RegionInput,
  UpdateBlueprintResponse,
  UpdateBlueprintError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(960, __c60, 0) as any as S.Schema<UpdateBlueprintRequest>,
  output: __S(336, __c21, 0) as any as S.Schema<UpdateBlueprintResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerError,
    InvalidParameterException,
    ProvisionedThroughputExceededException,
    ResourceNotFoundException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateBlueprint",
  telemetry: TELEMETRY,
  span: "UpdateBlueprint",
}));

export type UpdateProjectError =
  | AccessDeniedException
  | ConflictException
  | InternalServerError
  | InvalidParameterException
  | LimitExceededException
  | ProvisionedThroughputExceededException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Updates the configuration of an existing project. If you omit a configuration, UpdateProject leaves it unchanged.
 * A configuration that you supply replaces the stored one, so include every setting that you want to keep.
 */
export const updateProject: API.OperationMethod<
  UpdateProjectRequest & RegionInput,
  UpdateProjectResponse,
  UpdateProjectError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(976, __c61, 0) as any as S.Schema<UpdateProjectRequest>,
  output: __S(432, __c27, 0) as any as S.Schema<UpdateProjectResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerError,
    InvalidParameterException,
    LimitExceededException,
    ProvisionedThroughputExceededException,
    ResourceNotFoundException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateProject",
  telemetry: TELEMETRY,
  span: "UpdateProject",
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
        S.Struct({
          ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          BlueprintName: S.String,
          Schema: S.String,
          EncryptionConfiguration: S.optional(__S(320, __c20, 0)),
          Tags: S.optional(__S(240, __c15, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateBlueprintRequest" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ KmsKeyId: S.String, KmsEncryptionContext: S.optional(__S(240, __c15, 0)) }),
      ).annotate({ identifier: "EncryptionConfiguration" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ BlueprintArn: S.String })).annotate({
        identifier: "CreateBlueprintResponse",
      });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          BlueprintArn: S.String,
          ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateBlueprintVersionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ BlueprintArn: S.String, BlueprintVersion: S.String }),
      ).annotate({ identifier: "CreateBlueprintVersionResponse" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          ProjectName: S.String,
          ProjectDescription: S.optional(S.String),
          ExtractionConfiguration: __S(418, __c26, 2),
          GenerativeConfiguration: S.optional(__S(419, __c26, 3)),
          CustomConfiguration: S.optional(__S(420, __c26, 4)),
          SplitterConfiguration: S.optional(__S(400, __c25, 0)),
          SensitiveDataConfiguration: S.optional(__S(422, __c26, 6)),
          EncryptionConfiguration: S.optional(__S(320, __c20, 0)),
          Tags: S.optional(__S(240, __c15, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateProjectRequest" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ BlueprintArn: S.String, BlueprintVersion: S.optional(S.String) }),
      ).annotate({ identifier: "BlueprintItem" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ State: S.String })).annotate({
        identifier: "BoundingBoxConfiguration",
      });
    case 1:
      return S.Array(__S(384, __c24, 0));
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Types: S.optional(__S(16, __c1, 0)) })).annotate({
        identifier: "ExtractionGranularity",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({ AdditionalFileFormat: __S(400, __c25, 0), TextFormat: __S(416, __c26, 0) }),
      ).annotate({ identifier: "OutputFormat" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          BoundingBox: __S(400, __c25, 0),
          Granularity: __S(416, __c26, 0),
          OutputFormat: __S(417, __c26, 1),
        }),
      ).annotate({ identifier: "ExtractionConfiguration" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          Summarization: S.optional(__S(400, __c25, 0)),
          FigureCaption: S.optional(__S(400, __c25, 0)),
        }),
      ).annotate({ identifier: "GenerativeConfiguration" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          Blueprints: __S(401, __c25, 1),
          FallbackBlueprints: S.optional(__S(401, __c25, 1)),
        }),
      ).annotate({ identifier: "CustomConfiguration" });
    case 5:
      return S.suspend(() =>
        S.Struct({ PiiEntityTypes: __S(16, __c1, 0), RedactionMaskMode: S.String }),
      ).annotate({ identifier: "PIIEntitiesConfiguration" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          DetectionMode: S.String,
          PiiEntitiesConfiguration: S.optional(__S(421, __c26, 5)),
        }),
      ).annotate({ identifier: "SensitiveDataConfiguration" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ProjectArn: S.String, Status: S.optional(S.String) }),
      ).annotate({ identifier: "CreateProjectResponse" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AdapterId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteAdapterRequest" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "DeleteAdapterResponse" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AdapterId: S.String, AdapterVersion: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteAdapterVersionRequest" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ BlueprintArn: S.String, BlueprintVersion: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteBlueprintRequest" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ProjectArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteProjectRequest" });
  }
}
function __c33(j: number): any {
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
function __c34(j: number): any {
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
function __c35(j: number): any {
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
          Baseline: S.optional(__S(561, __c35, 1)),
          AdapterVersion: S.optional(__S(561, __c35, 1)),
          FeatureType: S.optional(S.String),
        }),
      ).annotate({ identifier: "AdapterVersionEvaluationMetric" });
    case 3:
      return S.Array(__S(562, __c35, 2));
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
          EvaluationMetrics: S.optional(__S(563, __c35, 3)),
          Tags: S.optional(__S(240, __c15, 0)),
        }),
      ).annotate({ identifier: "GetAdapterVersionResponse" });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ BlueprintArn: S.String, BlueprintVersion: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetBlueprintRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          BlueprintArn: S.String,
          BlueprintName: S.String,
          BlueprintVersion: S.optional(S.String),
          Schema: S.String,
          KmsKeyId: S.optional(S.String),
          KmsEncryptionContext: S.optional(__S(240, __c15, 0)),
          CreationTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          LastModifiedTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "GetBlueprintResponse" });
  }
}
function __c37(j: number): any {
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
          Warnings: S.optional(__S(610, __c38, 2)),
          StatusMessage: S.optional(S.String),
          AnalyzeDocumentModelVersion: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetDocumentAnalysisResponse" });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.Number);
    case 1:
      return S.suspend(() =>
        S.Struct({ ErrorCode: S.optional(S.String), Pages: S.optional(__S(608, __c38, 0)) }),
      ).annotate({ identifier: "Warning" });
    case 2:
      return S.Array(__S(609, __c38, 1));
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ JobArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetDocumentInsightsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Status: S.String,
          OutputConfiguration: S.optional(__S(640, __c40, 0)),
          ErrorType: S.optional(S.String),
          ErrorMessage: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetDocumentInsightsResponse" });
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ S3Uri: S.String })).annotate({
        identifier: "OutputConfiguration",
      });
  }
}
function __c41(j: number): any {
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
          Warnings: S.optional(__S(610, __c38, 2)),
          StatusMessage: S.optional(S.String),
          DetectDocumentTextModelVersion: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetDocumentTextDetectionResponse" });
  }
}
function __c42(j: number): any {
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
          Warnings: S.optional(__S(610, __c38, 2)),
          StatusMessage: S.optional(S.String),
          AnalyzeExpenseModelVersion: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetExpenseAnalysisResponse" });
  }
}
function __c43(j: number): any {
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
      return S.Array(__S(689, __c43, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ PageType: __S(690, __c43, 2), PageNumber: __S(690, __c43, 2) }),
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
      return S.Array(__S(692, __c43, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({
          Type: S.optional(S.String),
          KeyDetection: S.optional(__S(692, __c43, 4)),
          ValueDetections: S.optional(__S(693, __c43, 5)),
        }),
      ).annotate({ identifier: "LendingField" });
    case 7:
      return S.Array(__S(694, __c43, 6));
    case 8:
      return S.suspend(() =>
        S.Struct({ Confidence: S.optional(S.Number), Geometry: S.optional(__S(67, __c4, 3)) }),
      ).annotate({ identifier: "SignatureDetection" });
    case 9:
      return S.Array(__S(696, __c43, 8));
    case 10:
      return S.suspend(() =>
        S.Struct({
          LendingFields: S.optional(__S(695, __c43, 7)),
          SignatureDetections: S.optional(__S(697, __c43, 9)),
        }),
      ).annotate({ identifier: "LendingDocument" });
    case 11:
      return S.suspend(() =>
        S.Struct({
          LendingDocument: S.optional(__S(698, __c43, 10)),
          ExpenseDocument: S.optional(__S(187, __c11, 11)),
          IdentityDocument: S.optional(__S(212, __c13, 4)),
        }),
      ).annotate({ identifier: "Extraction" });
    case 12:
      return S.Array(__S(699, __c43, 11));
    case 13:
      return S.suspend(() =>
        S.Struct({
          Page: S.optional(S.Number),
          PageClassification: S.optional(__S(691, __c43, 3)),
          Extractions: S.optional(__S(700, __c43, 12)),
        }),
      ).annotate({ identifier: "LendingResult" });
    case 14:
      return S.Array(__S(701, __c43, 13));
    case 15:
      return S.suspend(() =>
        S.Struct({
          DocumentMetadata: S.optional(__S(80, __c5, 0)),
          JobStatus: S.optional(S.String),
          NextToken: S.optional(S.String),
          Results: S.optional(__S(702, __c43, 14)),
          Warnings: S.optional(__S(610, __c38, 2)),
          StatusMessage: S.optional(S.String),
          AnalyzeLendingModelVersion: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetLendingAnalysisResponse" });
  }
}
function __c44(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ JobId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetLendingAnalysisSummaryRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Index: S.optional(S.Number), Pages: S.optional(__S(608, __c38, 0)) }),
      ).annotate({ identifier: "SplitDocument" });
    case 2:
      return S.Array(__S(705, __c44, 1));
    case 3:
      return S.suspend(() => S.Struct({ Page: S.optional(S.Number) })).annotate({
        identifier: "DetectedSignature",
      });
    case 4:
      return S.Array(__S(707, __c44, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          Type: S.optional(S.String),
          SplitDocuments: S.optional(__S(706, __c44, 2)),
          DetectedSignatures: S.optional(__S(708, __c44, 4)),
          UndetectedSignatures: S.optional(__S(708, __c44, 4)),
        }),
      ).annotate({ identifier: "DocumentGroup" });
    case 6:
      return S.Array(__S(709, __c44, 5));
    case 7:
      return S.suspend(() =>
        S.Struct({
          DocumentGroups: S.optional(__S(710, __c44, 6)),
          UndetectedDocumentTypes: S.optional(__S(96, __c6, 0)),
        }),
      ).annotate({ identifier: "LendingSummary" });
    case 8:
      return S.suspend(() =>
        S.Struct({
          DocumentMetadata: S.optional(__S(80, __c5, 0)),
          JobStatus: S.optional(S.String),
          Summary: S.optional(__S(711, __c44, 7)),
          Warnings: S.optional(__S(610, __c38, 2)),
          StatusMessage: S.optional(S.String),
          AnalyzeLendingModelVersion: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetLendingAnalysisSummaryResponse" });
  }
}
function __c45(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ProjectArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetProjectRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ProjectArn: S.String,
          ProjectName: S.String,
          ProjectDescription: S.optional(S.String),
          Status: S.String,
          ExtractionConfiguration: S.optional(__S(418, __c26, 2)),
          GenerativeConfiguration: S.optional(__S(419, __c26, 3)),
          CustomConfiguration: S.optional(__S(420, __c26, 4)),
          SplitterConfiguration: S.optional(__S(400, __c25, 0)),
          SensitiveDataConfiguration: S.optional(__S(422, __c26, 6)),
          EncryptionConfiguration: S.optional(__S(320, __c20, 0)),
          CreationTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          LastModifiedTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "GetProjectResponse" });
  }
}
function __c46(j: number): any {
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
      return S.Array(__S(737, __c46, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ Adapters: S.optional(__S(738, __c46, 2)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListAdaptersResponse" });
  }
}
function __c47(j: number): any {
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
      return S.Array(__S(753, __c47, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          AdapterVersions: S.optional(__S(754, __c47, 2)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListAdapterVersionsResponse" });
  }
}
function __c48(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ ProjectArn: S.String })).annotate({
        identifier: "ProjectFilter",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
          BlueprintArn: S.optional(S.String),
          ProjectFilter: S.optional(__S(768, __c48, 0)),
          ResourceOwner: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListBlueprintsRequest" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          BlueprintArn: S.String,
          BlueprintName: S.optional(S.String),
          BlueprintVersion: S.optional(S.String),
          ResourceOwner: S.optional(S.String),
          CreationTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          LastModifiedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "BlueprintSummary" });
    case 3:
      return S.Array(__S(770, __c48, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({ Blueprints: __S(771, __c48, 3), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListBlueprintsResponse" });
  }
}
function __c49(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
          BlueprintFilter: S.optional(__S(384, __c24, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListProjectsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ProjectArn: S.String,
          ProjectName: S.optional(S.String),
          CreationTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          LastModifiedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "ProjectSummary" });
    case 2:
      return S.Array(__S(785, __c49, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ Projects: __S(786, __c49, 2), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListProjectsResponse" });
  }
}
function __c50(j: number): any {
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
function __c51(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DocumentLocation: __S(832, __c52, 0),
          FeatureTypes: __S(16, __c1, 0),
          ClientRequestToken: S.optional(S.String),
          JobTag: S.optional(S.String),
          NotificationChannel: S.optional(__S(833, __c52, 1)),
          OutputConfig: S.optional(__S(288, __c18, 0)),
          KMSKeyId: S.optional(S.String),
          QueriesConfig: S.optional(__S(129, __c8, 1)),
          AdaptersConfig: S.optional(__S(132, __c8, 4)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "StartDocumentAnalysisRequest" });
  }
}
function __c52(j: number): any {
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
function __c53(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ EventBridgeConfiguration: __S(400, __c25, 0) })).annotate({
        identifier: "NotificationConfiguration",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          InputConfiguration: __S(640, __c40, 0),
          OutputConfiguration: __S(640, __c40, 0),
          ProjectArn: S.optional(S.String),
          Blueprints: S.optional(__S(401, __c25, 1)),
          EncryptionConfiguration: S.optional(__S(320, __c20, 0)),
          NotificationConfiguration: S.optional(__S(848, __c53, 0)),
          Tags: S.optional(__S(240, __c15, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "StartDocumentInsightsRequest" });
    case 2:
      return S.suspend(() => S.Struct({ JobArn: S.String })).annotate({
        identifier: "StartDocumentInsightsResponse",
      });
  }
}
function __c54(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DocumentLocation: __S(832, __c52, 0),
          ClientRequestToken: S.optional(S.String),
          JobTag: S.optional(S.String),
          NotificationChannel: S.optional(__S(833, __c52, 1)),
          OutputConfig: S.optional(__S(288, __c18, 0)),
          KMSKeyId: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "StartDocumentTextDetectionRequest" });
  }
}
function __c55(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DocumentLocation: __S(832, __c52, 0),
          ClientRequestToken: S.optional(S.String),
          JobTag: S.optional(S.String),
          NotificationChannel: S.optional(__S(833, __c52, 1)),
          OutputConfig: S.optional(__S(288, __c18, 0)),
          KMSKeyId: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "StartExpenseAnalysisRequest" });
  }
}
function __c56(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DocumentLocation: __S(832, __c52, 0),
          ClientRequestToken: S.optional(S.String),
          JobTag: S.optional(S.String),
          NotificationChannel: S.optional(__S(833, __c52, 1)),
          OutputConfig: S.optional(__S(288, __c18, 0)),
          KMSKeyId: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "StartLendingAnalysisRequest" });
  }
}
function __c57(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceARN: S.String, Tags: __S(240, __c15, 0) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "TagResourceRequest" });
  }
}
function __c58(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceARN: S.String, TagKeys: __S(96, __c6, 0) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UntagResourceRequest" });
  }
}
function __c59(j: number): any {
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
function __c60(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          BlueprintArn: S.String,
          Schema: S.optional(S.String),
          EncryptionConfiguration: S.optional(__S(320, __c20, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateBlueprintRequest" });
  }
}
function __c61(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ProjectArn: S.String,
          ProjectDescription: S.optional(S.String),
          ExtractionConfiguration: S.optional(__S(418, __c26, 2)),
          GenerativeConfiguration: S.optional(__S(419, __c26, 3)),
          CustomConfiguration: S.optional(__S(420, __c26, 4)),
          SplitterConfiguration: S.optional(__S(400, __c25, 0)),
          SensitiveDataConfiguration: S.optional(__S(422, __c26, 6)),
          EncryptionConfiguration: S.optional(__S(320, __c20, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateProjectRequest" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
