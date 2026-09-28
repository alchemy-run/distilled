import type * as HttpClient from "effect/unstable/http/HttpClient";
import type * as redacted from "effect/Redacted";
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
  sdkId: "Comprehend",
  target: "Comprehend_20171127",
  version: "2017-11-27",
  sigv4: "comprehend",
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
                `https://comprehend-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://comprehend-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://comprehend.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://comprehend.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class BatchSizeLimitExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "BatchSizeLimitExceededException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class ConcurrentModificationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ConcurrentModificationException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class InternalServerException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerException",
    ["ServerError"],
    { status: 500 },
  )<{ readonly message?: string }> {}
export class InvalidFilterException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidFilterException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidRequestException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidRequestException",
    ["BadRequestError"],
    { status: 400 },
  )<{
    readonly message?: string;
    readonly Reason?: InvalidRequestReason;
    readonly Detail?: InvalidRequestDetail;
  }> {}
export class JobNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "JobNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class KmsKeyValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "KmsKeyValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class NotAuthorizedException
  extends /*@__PURE__*/ TE.TaggedError("NotAuthorizedException", [
    "AuthError",
  ])<{ readonly message?: string }> {}
export class ResourceInUseException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceInUseException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class ResourceLimitExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceLimitExceededException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class ResourceUnavailableException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceUnavailableException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class TextSizeLimitExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "TextSizeLimitExceededException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class TooManyRequestsException
  extends /*@__PURE__*/ TE.TaggedError(
    "TooManyRequestsException",
    ["ThrottlingError"],
    { status: 429 },
  )<{ readonly message?: string }> {}
export class TooManyTagKeysException
  extends /*@__PURE__*/ TE.TaggedError(
    "TooManyTagKeysException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class TooManyTagsException
  extends /*@__PURE__*/ TE.TaggedError(
    "TooManyTagsException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class UnsupportedLanguageException
  extends /*@__PURE__*/ TE.TaggedError(
    "UnsupportedLanguageException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export type CustomerInputString = string | redacted.Redacted<string>;
export type CustomerInputStringList = (string | redacted.Redacted<string>)[];
export interface BatchDetectDominantLanguageRequest {
  TextList: (string | redacted.Redacted<string>)[];
}
export interface DominantLanguage {
  LanguageCode?: string;
  Score?: number;
}
export type ListOfDominantLanguages = DominantLanguage[];
export interface BatchDetectDominantLanguageItemResult {
  Index?: number;
  Languages?: DominantLanguage[];
}
export type ListOfDetectDominantLanguageResult =
  BatchDetectDominantLanguageItemResult[];
export interface BatchItemError {
  Index?: number;
  ErrorCode?: string;
  ErrorMessage?: string;
}
export type BatchItemErrorList = BatchItemError[];
export interface BatchDetectDominantLanguageResponse {
  ResultList: BatchDetectDominantLanguageItemResult[];
  ErrorList: BatchItemError[];
}
export type LanguageCode =
  | "en"
  | "es"
  | "fr"
  | "de"
  | "it"
  | "pt"
  | "ar"
  | "hi"
  | "ja"
  | "ko"
  | "zh"
  | "zh-TW"
  | (string & {});
export interface BatchDetectEntitiesRequest {
  TextList: (string | redacted.Redacted<string>)[];
  LanguageCode: LanguageCode;
}
export type EntityType =
  | "PERSON"
  | "LOCATION"
  | "ORGANIZATION"
  | "COMMERCIAL_ITEM"
  | "EVENT"
  | "DATE"
  | "QUANTITY"
  | "TITLE"
  | "OTHER"
  | (string & {});
export interface ChildBlock {
  ChildBlockId?: string;
  BeginOffset?: number;
  EndOffset?: number;
}
export type ListOfChildBlocks = ChildBlock[];
export interface BlockReference {
  BlockId?: string;
  BeginOffset?: number;
  EndOffset?: number;
  ChildBlocks?: ChildBlock[];
}
export type ListOfBlockReferences = BlockReference[];
export interface Entity {
  Score?: number;
  Type?: EntityType;
  Text?: string;
  BeginOffset?: number;
  EndOffset?: number;
  BlockReferences?: BlockReference[];
}
export type ListOfEntities = Entity[];
export interface BatchDetectEntitiesItemResult {
  Index?: number;
  Entities?: Entity[];
}
export type ListOfDetectEntitiesResult = BatchDetectEntitiesItemResult[];
export interface BatchDetectEntitiesResponse {
  ResultList: BatchDetectEntitiesItemResult[];
  ErrorList: BatchItemError[];
}
export interface BatchDetectKeyPhrasesRequest {
  TextList: (string | redacted.Redacted<string>)[];
  LanguageCode: LanguageCode;
}
export interface KeyPhrase {
  Score?: number;
  Text?: string;
  BeginOffset?: number;
  EndOffset?: number;
}
export type ListOfKeyPhrases = KeyPhrase[];
export interface BatchDetectKeyPhrasesItemResult {
  Index?: number;
  KeyPhrases?: KeyPhrase[];
}
export type ListOfDetectKeyPhrasesResult = BatchDetectKeyPhrasesItemResult[];
export interface BatchDetectKeyPhrasesResponse {
  ResultList: BatchDetectKeyPhrasesItemResult[];
  ErrorList: BatchItemError[];
}
export interface BatchDetectSentimentRequest {
  TextList: (string | redacted.Redacted<string>)[];
  LanguageCode: LanguageCode;
}
export type SentimentType =
  | "POSITIVE"
  | "NEGATIVE"
  | "NEUTRAL"
  | "MIXED"
  | (string & {});
export interface SentimentScore {
  Positive?: number;
  Negative?: number;
  Neutral?: number;
  Mixed?: number;
}
export interface BatchDetectSentimentItemResult {
  Index?: number;
  Sentiment?: SentimentType;
  SentimentScore?: SentimentScore;
}
export type ListOfDetectSentimentResult = BatchDetectSentimentItemResult[];
export interface BatchDetectSentimentResponse {
  ResultList: BatchDetectSentimentItemResult[];
  ErrorList: BatchItemError[];
}
export type SyntaxLanguageCode =
  | "en"
  | "es"
  | "fr"
  | "de"
  | "it"
  | "pt"
  | (string & {});
export interface BatchDetectSyntaxRequest {
  TextList: (string | redacted.Redacted<string>)[];
  LanguageCode: SyntaxLanguageCode;
}
export type PartOfSpeechTagType =
  | "ADJ"
  | "ADP"
  | "ADV"
  | "AUX"
  | "CONJ"
  | "CCONJ"
  | "DET"
  | "INTJ"
  | "NOUN"
  | "NUM"
  | "O"
  | "PART"
  | "PRON"
  | "PROPN"
  | "PUNCT"
  | "SCONJ"
  | "SYM"
  | "VERB"
  | (string & {});
export interface PartOfSpeechTag {
  Tag?: PartOfSpeechTagType;
  Score?: number;
}
export interface SyntaxToken {
  TokenId?: number;
  Text?: string;
  BeginOffset?: number;
  EndOffset?: number;
  PartOfSpeech?: PartOfSpeechTag;
}
export type ListOfSyntaxTokens = SyntaxToken[];
export interface BatchDetectSyntaxItemResult {
  Index?: number;
  SyntaxTokens?: SyntaxToken[];
}
export type ListOfDetectSyntaxResult = BatchDetectSyntaxItemResult[];
export interface BatchDetectSyntaxResponse {
  ResultList: BatchDetectSyntaxItemResult[];
  ErrorList: BatchItemError[];
}
export interface BatchDetectTargetedSentimentRequest {
  TextList: (string | redacted.Redacted<string>)[];
  LanguageCode: LanguageCode;
}
export type ListOfDescriptiveMentionIndices = number[];
export type TargetedSentimentEntityType =
  | "PERSON"
  | "LOCATION"
  | "ORGANIZATION"
  | "FACILITY"
  | "BRAND"
  | "COMMERCIAL_ITEM"
  | "MOVIE"
  | "MUSIC"
  | "BOOK"
  | "SOFTWARE"
  | "GAME"
  | "PERSONAL_TITLE"
  | "EVENT"
  | "DATE"
  | "QUANTITY"
  | "ATTRIBUTE"
  | "OTHER"
  | (string & {});
export interface MentionSentiment {
  Sentiment?: SentimentType;
  SentimentScore?: SentimentScore;
}
export interface TargetedSentimentMention {
  Score?: number;
  GroupScore?: number;
  Text?: string;
  Type?: TargetedSentimentEntityType;
  MentionSentiment?: MentionSentiment;
  BeginOffset?: number;
  EndOffset?: number;
}
export type ListOfMentions = TargetedSentimentMention[];
export interface TargetedSentimentEntity {
  DescriptiveMentionIndex?: number[];
  Mentions?: TargetedSentimentMention[];
}
export type ListOfTargetedSentimentEntities = TargetedSentimentEntity[];
export interface BatchDetectTargetedSentimentItemResult {
  Index?: number;
  Entities?: TargetedSentimentEntity[];
}
export type ListOfDetectTargetedSentimentResult =
  BatchDetectTargetedSentimentItemResult[];
export interface BatchDetectTargetedSentimentResponse {
  ResultList: BatchDetectTargetedSentimentItemResult[];
  ErrorList: BatchItemError[];
}
export type DocumentClassifierEndpointArn = string;
export type SemiStructuredDocumentBlob = Uint8Array;
export type DocumentReadAction =
  | "TEXTRACT_DETECT_DOCUMENT_TEXT"
  | "TEXTRACT_ANALYZE_DOCUMENT"
  | (string & {});
export type DocumentReadMode =
  | "SERVICE_DEFAULT"
  | "FORCE_DOCUMENT_READ_ACTION"
  | (string & {});
export type DocumentReadFeatureTypes = "TABLES" | "FORMS" | (string & {});
export type ListOfDocumentReadFeatureTypes = DocumentReadFeatureTypes[];
export interface DocumentReaderConfig {
  DocumentReadAction: DocumentReadAction;
  DocumentReadMode?: DocumentReadMode;
  FeatureTypes?: DocumentReadFeatureTypes[];
}
export interface ClassifyDocumentRequest {
  Text?: string | redacted.Redacted<string>;
  EndpointArn: string;
  Bytes?: Uint8Array;
  DocumentReaderConfig?: DocumentReaderConfig;
}
export interface DocumentClass {
  Name?: string;
  Score?: number;
  Page?: number;
}
export type ListOfClasses = DocumentClass[];
export interface DocumentLabel {
  Name?: string;
  Score?: number;
  Page?: number;
}
export type ListOfLabels = DocumentLabel[];
export interface ExtractedCharactersListItem {
  Page?: number;
  Count?: number;
}
export type ListOfExtractedCharacters = ExtractedCharactersListItem[];
export interface DocumentMetadata {
  Pages?: number;
  ExtractedCharacters?: ExtractedCharactersListItem[];
}
export type DocumentType =
  | "NATIVE_PDF"
  | "SCANNED_PDF"
  | "MS_WORD"
  | "IMAGE"
  | "PLAIN_TEXT"
  | "TEXTRACT_DETECT_DOCUMENT_TEXT_JSON"
  | "TEXTRACT_ANALYZE_DOCUMENT_JSON"
  | (string & {});
export interface DocumentTypeListItem {
  Page?: number;
  Type?: DocumentType;
}
export type ListOfDocumentType = DocumentTypeListItem[];
export type PageBasedErrorCode =
  | "TEXTRACT_BAD_PAGE"
  | "TEXTRACT_PROVISIONED_THROUGHPUT_EXCEEDED"
  | "PAGE_CHARACTERS_EXCEEDED"
  | "PAGE_SIZE_EXCEEDED"
  | "INTERNAL_SERVER_ERROR"
  | (string & {});
export interface ErrorsListItem {
  Page?: number;
  ErrorCode?: PageBasedErrorCode;
  ErrorMessage?: string;
}
export type ListOfErrors = ErrorsListItem[];
export type PageBasedWarningCode =
  | "INFERENCING_PLAINTEXT_WITH_NATIVE_TRAINED_MODEL"
  | "INFERENCING_NATIVE_DOCUMENT_WITH_PLAINTEXT_TRAINED_MODEL"
  | (string & {});
export interface WarningsListItem {
  Page?: number;
  WarnCode?: PageBasedWarningCode;
  WarnMessage?: string;
}
export type ListOfWarnings = WarningsListItem[];
export interface ClassifyDocumentResponse {
  Classes?: DocumentClass[];
  Labels?: DocumentLabel[];
  DocumentMetadata?: DocumentMetadata;
  DocumentType?: DocumentTypeListItem[];
  Errors?: ErrorsListItem[];
  Warnings?: WarningsListItem[];
}
export interface ContainsPiiEntitiesRequest {
  Text: string;
  LanguageCode: LanguageCode;
}
export type PiiEntityType =
  | "BANK_ACCOUNT_NUMBER"
  | "BANK_ROUTING"
  | "CREDIT_DEBIT_NUMBER"
  | "CREDIT_DEBIT_CVV"
  | "CREDIT_DEBIT_EXPIRY"
  | "PIN"
  | "EMAIL"
  | "ADDRESS"
  | "NAME"
  | "PHONE"
  | "SSN"
  | "DATE_TIME"
  | "PASSPORT_NUMBER"
  | "DRIVER_ID"
  | "URL"
  | "AGE"
  | "USERNAME"
  | "PASSWORD"
  | "AWS_ACCESS_KEY"
  | "AWS_SECRET_KEY"
  | "IP_ADDRESS"
  | "MAC_ADDRESS"
  | "ALL"
  | "LICENSE_PLATE"
  | "VEHICLE_IDENTIFICATION_NUMBER"
  | "UK_NATIONAL_INSURANCE_NUMBER"
  | "CA_SOCIAL_INSURANCE_NUMBER"
  | "US_INDIVIDUAL_TAX_IDENTIFICATION_NUMBER"
  | "UK_UNIQUE_TAXPAYER_REFERENCE_NUMBER"
  | "IN_PERMANENT_ACCOUNT_NUMBER"
  | "IN_NREGA"
  | "INTERNATIONAL_BANK_ACCOUNT_NUMBER"
  | "SWIFT_CODE"
  | "UK_NATIONAL_HEALTH_SERVICE_NUMBER"
  | "CA_HEALTH_NUMBER"
  | "IN_AADHAAR"
  | "IN_VOTER_NUMBER"
  | (string & {});
export interface EntityLabel {
  Name?: PiiEntityType;
  Score?: number;
}
export type ListOfEntityLabels = EntityLabel[];
export interface ContainsPiiEntitiesResponse {
  Labels?: EntityLabel[];
}
export type ComprehendFlywheelArn = string;
export type ComprehendArnName = string;
export type DatasetType = "TRAIN" | "TEST" | (string & {});
export type Description = string;
export type AttributeNamesListItem = string;
export type AttributeNamesList = string[];
export type S3Uri = string;
export type AugmentedManifestsDocumentTypeFormat =
  | "PLAIN_TEXT_DOCUMENT"
  | "SEMI_STRUCTURED_DOCUMENT"
  | (string & {});
export interface DatasetAugmentedManifestsListItem {
  AttributeNames: string[];
  S3Uri: string;
  AnnotationDataS3Uri?: string;
  SourceDocumentsS3Uri?: string;
  DocumentType?: AugmentedManifestsDocumentTypeFormat;
}
export type DatasetAugmentedManifestsList = DatasetAugmentedManifestsListItem[];
export type DatasetDataFormat =
  | "COMPREHEND_CSV"
  | "AUGMENTED_MANIFEST"
  | (string & {});
export type LabelDelimiter = string;
export interface DatasetDocumentClassifierInputDataConfig {
  S3Uri: string;
  LabelDelimiter?: string;
}
export interface DatasetEntityRecognizerAnnotations {
  S3Uri: string;
}
export type InputFormat =
  | "ONE_DOC_PER_FILE"
  | "ONE_DOC_PER_LINE"
  | (string & {});
export interface DatasetEntityRecognizerDocuments {
  S3Uri: string;
  InputFormat?: InputFormat;
}
export interface DatasetEntityRecognizerEntityList {
  S3Uri: string;
}
export interface DatasetEntityRecognizerInputDataConfig {
  Annotations?: DatasetEntityRecognizerAnnotations;
  Documents: DatasetEntityRecognizerDocuments;
  EntityList?: DatasetEntityRecognizerEntityList;
}
export interface DatasetInputDataConfig {
  AugmentedManifests?: DatasetAugmentedManifestsListItem[];
  DataFormat?: DatasetDataFormat;
  DocumentClassifierInputDataConfig?: DatasetDocumentClassifierInputDataConfig;
  EntityRecognizerInputDataConfig?: DatasetEntityRecognizerInputDataConfig;
}
export type ClientRequestTokenString = string;
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  Key: string;
  Value?: string;
}
export type TagList = Tag[];
export interface CreateDatasetRequest {
  FlywheelArn: string;
  DatasetName: string;
  DatasetType?: DatasetType;
  Description?: string;
  InputDataConfig: DatasetInputDataConfig;
  ClientRequestToken?: string;
  Tags?: Tag[];
}
export type ComprehendDatasetArn = string;
export interface CreateDatasetResponse {
  DatasetArn?: string;
}
export type VersionName = string;
export type IamRoleArn = string;
export type DocumentClassifierDataFormat =
  | "COMPREHEND_CSV"
  | "AUGMENTED_MANIFEST"
  | (string & {});
export type Split = "TRAIN" | "TEST" | (string & {});
export interface AugmentedManifestsListItem {
  S3Uri: string;
  Split?: Split;
  AttributeNames: string[];
  AnnotationDataS3Uri?: string;
  SourceDocumentsS3Uri?: string;
  DocumentType?: AugmentedManifestsDocumentTypeFormat;
}
export type DocumentClassifierAugmentedManifestsList =
  AugmentedManifestsListItem[];
export type DocumentClassifierDocumentTypeFormat =
  | "PLAIN_TEXT_DOCUMENT"
  | "SEMI_STRUCTURED_DOCUMENT"
  | (string & {});
export interface DocumentClassifierDocuments {
  S3Uri: string;
  TestS3Uri?: string;
}
export interface DocumentClassifierInputDataConfig {
  DataFormat?: DocumentClassifierDataFormat;
  S3Uri?: string;
  TestS3Uri?: string;
  LabelDelimiter?: string;
  AugmentedManifests?: AugmentedManifestsListItem[];
  DocumentType?: DocumentClassifierDocumentTypeFormat;
  Documents?: DocumentClassifierDocuments;
  DocumentReaderConfig?: DocumentReaderConfig;
}
export type KmsKeyId = string;
export interface DocumentClassifierOutputDataConfig {
  S3Uri?: string;
  KmsKeyId?: string;
  FlywheelStatsS3Prefix?: string;
}
export type SecurityGroupId = string;
export type SecurityGroupIds = string[];
export type SubnetId = string;
export type Subnets = string[];
export interface VpcConfig {
  SecurityGroupIds: string[];
  Subnets: string[];
}
export type DocumentClassifierMode =
  | "MULTI_CLASS"
  | "MULTI_LABEL"
  | (string & {});
export type Policy = string;
export interface CreateDocumentClassifierRequest {
  DocumentClassifierName: string;
  VersionName?: string;
  DataAccessRoleArn: string;
  Tags?: Tag[];
  InputDataConfig: DocumentClassifierInputDataConfig;
  OutputDataConfig?: DocumentClassifierOutputDataConfig;
  ClientRequestToken?: string;
  LanguageCode: LanguageCode;
  VolumeKmsKeyId?: string;
  VpcConfig?: VpcConfig;
  Mode?: DocumentClassifierMode;
  ModelKmsKeyId?: string;
  ModelPolicy?: string;
}
export type DocumentClassifierArn = string;
export interface CreateDocumentClassifierResponse {
  DocumentClassifierArn?: string;
}
export type ComprehendEndpointName = string;
export type ComprehendModelArn = string;
export type InferenceUnitsInteger = number;
export interface CreateEndpointRequest {
  EndpointName: string;
  ModelArn?: string;
  DesiredInferenceUnits: number;
  ClientRequestToken?: string;
  Tags?: Tag[];
  DataAccessRoleArn?: string;
  FlywheelArn?: string;
}
export type ComprehendEndpointArn = string;
export interface CreateEndpointResponse {
  EndpointArn?: string;
  ModelArn?: string;
}
export type EntityRecognizerDataFormat =
  | "COMPREHEND_CSV"
  | "AUGMENTED_MANIFEST"
  | (string & {});
export type EntityTypeName = string;
export interface EntityTypesListItem {
  Type: string;
}
export type EntityTypesList = EntityTypesListItem[];
export interface EntityRecognizerDocuments {
  S3Uri: string;
  TestS3Uri?: string;
  InputFormat?: InputFormat;
}
export interface EntityRecognizerAnnotations {
  S3Uri: string;
  TestS3Uri?: string;
}
export interface EntityRecognizerEntityList {
  S3Uri: string;
}
export type EntityRecognizerAugmentedManifestsList =
  AugmentedManifestsListItem[];
export interface EntityRecognizerInputDataConfig {
  DataFormat?: EntityRecognizerDataFormat;
  EntityTypes: EntityTypesListItem[];
  Documents?: EntityRecognizerDocuments;
  Annotations?: EntityRecognizerAnnotations;
  EntityList?: EntityRecognizerEntityList;
  AugmentedManifests?: AugmentedManifestsListItem[];
}
export interface CreateEntityRecognizerRequest {
  RecognizerName: string;
  VersionName?: string;
  DataAccessRoleArn: string;
  Tags?: Tag[];
  InputDataConfig: EntityRecognizerInputDataConfig;
  ClientRequestToken?: string;
  LanguageCode: LanguageCode;
  VolumeKmsKeyId?: string;
  VpcConfig?: VpcConfig;
  ModelKmsKeyId?: string;
  ModelPolicy?: string;
}
export type EntityRecognizerArn = string;
export interface CreateEntityRecognizerResponse {
  EntityRecognizerArn?: string;
}
export type LabelListItem = string;
export type LabelsList = string[];
export interface DocumentClassificationConfig {
  Mode: DocumentClassifierMode;
  Labels?: string[];
}
export interface EntityRecognitionConfig {
  EntityTypes: EntityTypesListItem[];
}
export interface TaskConfig {
  LanguageCode: LanguageCode;
  DocumentClassificationConfig?: DocumentClassificationConfig;
  EntityRecognitionConfig?: EntityRecognitionConfig;
}
export type ModelType =
  | "DOCUMENT_CLASSIFIER"
  | "ENTITY_RECOGNIZER"
  | (string & {});
export type FlywheelS3Uri = string;
export interface DataSecurityConfig {
  ModelKmsKeyId?: string;
  VolumeKmsKeyId?: string;
  DataLakeKmsKeyId?: string;
  VpcConfig?: VpcConfig;
}
export interface CreateFlywheelRequest {
  FlywheelName: string;
  ActiveModelArn?: string;
  DataAccessRoleArn: string;
  TaskConfig?: TaskConfig;
  ModelType?: ModelType;
  DataLakeS3Uri: string;
  DataSecurityConfig?: DataSecurityConfig;
  ClientRequestToken?: string;
  Tags?: Tag[];
}
export interface CreateFlywheelResponse {
  FlywheelArn?: string;
  ActiveModelArn?: string;
}
export interface DeleteDocumentClassifierRequest {
  DocumentClassifierArn: string;
}
export interface DeleteDocumentClassifierResponse {}
export interface DeleteEndpointRequest {
  EndpointArn: string;
}
export interface DeleteEndpointResponse {}
export interface DeleteEntityRecognizerRequest {
  EntityRecognizerArn: string;
}
export interface DeleteEntityRecognizerResponse {}
export interface DeleteFlywheelRequest {
  FlywheelArn: string;
}
export interface DeleteFlywheelResponse {}
export type PolicyRevisionId = string;
export interface DeleteResourcePolicyRequest {
  ResourceArn: string;
  PolicyRevisionId?: string;
}
export interface DeleteResourcePolicyResponse {}
export interface DescribeDatasetRequest {
  DatasetArn: string;
}
export type DatasetStatus = "CREATING" | "COMPLETED" | "FAILED" | (string & {});
export type AnyLengthString = string;
export type NumberOfDocuments = number;
export interface DatasetProperties {
  DatasetArn?: string;
  DatasetName?: string;
  DatasetType?: DatasetType;
  DatasetS3Uri?: string;
  Description?: string;
  Status?: DatasetStatus;
  Message?: string;
  NumberOfDocuments?: number;
  CreationTime?: Date;
  EndTime?: Date;
}
export interface DescribeDatasetResponse {
  DatasetProperties?: DatasetProperties;
}
export type JobId = string;
export interface DescribeDocumentClassificationJobRequest {
  JobId: string;
}
export type ComprehendArn = string;
export type JobName = string;
export type JobStatus =
  | "SUBMITTED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "FAILED"
  | "STOP_REQUESTED"
  | "STOPPED"
  | (string & {});
export interface InputDataConfig {
  S3Uri: string;
  InputFormat?: InputFormat;
  DocumentReaderConfig?: DocumentReaderConfig;
}
export interface OutputDataConfig {
  S3Uri: string;
  KmsKeyId?: string;
}
export interface DocumentClassificationJobProperties {
  JobId?: string;
  JobArn?: string;
  JobName?: string;
  JobStatus?: JobStatus;
  Message?: string;
  SubmitTime?: Date;
  EndTime?: Date;
  DocumentClassifierArn?: string;
  InputDataConfig?: InputDataConfig;
  OutputDataConfig?: OutputDataConfig;
  DataAccessRoleArn?: string;
  VolumeKmsKeyId?: string;
  VpcConfig?: VpcConfig;
  FlywheelArn?: string;
}
export interface DescribeDocumentClassificationJobResponse {
  DocumentClassificationJobProperties?: DocumentClassificationJobProperties;
}
export interface DescribeDocumentClassifierRequest {
  DocumentClassifierArn: string;
}
export type ModelStatus =
  | "SUBMITTED"
  | "TRAINING"
  | "DELETING"
  | "STOP_REQUESTED"
  | "STOPPED"
  | "IN_ERROR"
  | "TRAINED"
  | "TRAINED_WITH_WARNING"
  | (string & {});
export interface ClassifierEvaluationMetrics {
  Accuracy?: number;
  Precision?: number;
  Recall?: number;
  F1Score?: number;
  MicroPrecision?: number;
  MicroRecall?: number;
  MicroF1Score?: number;
  HammingLoss?: number;
}
export interface ClassifierMetadata {
  NumberOfLabels?: number;
  NumberOfTrainedDocuments?: number;
  NumberOfTestDocuments?: number;
  EvaluationMetrics?: ClassifierEvaluationMetrics;
}
export interface DocumentClassifierProperties {
  DocumentClassifierArn?: string;
  LanguageCode?: LanguageCode;
  Status?: ModelStatus;
  Message?: string;
  SubmitTime?: Date;
  EndTime?: Date;
  TrainingStartTime?: Date;
  TrainingEndTime?: Date;
  InputDataConfig?: DocumentClassifierInputDataConfig;
  OutputDataConfig?: DocumentClassifierOutputDataConfig;
  ClassifierMetadata?: ClassifierMetadata;
  DataAccessRoleArn?: string;
  VolumeKmsKeyId?: string;
  VpcConfig?: VpcConfig;
  Mode?: DocumentClassifierMode;
  ModelKmsKeyId?: string;
  VersionName?: string;
  SourceModelArn?: string;
  FlywheelArn?: string;
}
export interface DescribeDocumentClassifierResponse {
  DocumentClassifierProperties?: DocumentClassifierProperties;
}
export interface DescribeDominantLanguageDetectionJobRequest {
  JobId: string;
}
export interface DominantLanguageDetectionJobProperties {
  JobId?: string;
  JobArn?: string;
  JobName?: string;
  JobStatus?: JobStatus;
  Message?: string;
  SubmitTime?: Date;
  EndTime?: Date;
  InputDataConfig?: InputDataConfig;
  OutputDataConfig?: OutputDataConfig;
  DataAccessRoleArn?: string;
  VolumeKmsKeyId?: string;
  VpcConfig?: VpcConfig;
}
export interface DescribeDominantLanguageDetectionJobResponse {
  DominantLanguageDetectionJobProperties?: DominantLanguageDetectionJobProperties;
}
export interface DescribeEndpointRequest {
  EndpointArn: string;
}
export type EndpointStatus =
  | "CREATING"
  | "DELETING"
  | "FAILED"
  | "IN_SERVICE"
  | "UPDATING"
  | (string & {});
export interface EndpointProperties {
  EndpointArn?: string;
  Status?: EndpointStatus;
  Message?: string;
  ModelArn?: string;
  DesiredModelArn?: string;
  DesiredInferenceUnits?: number;
  CurrentInferenceUnits?: number;
  CreationTime?: Date;
  LastModifiedTime?: Date;
  DataAccessRoleArn?: string;
  DesiredDataAccessRoleArn?: string;
  FlywheelArn?: string;
}
export interface DescribeEndpointResponse {
  EndpointProperties?: EndpointProperties;
}
export interface DescribeEntitiesDetectionJobRequest {
  JobId: string;
}
export interface EntitiesDetectionJobProperties {
  JobId?: string;
  JobArn?: string;
  JobName?: string;
  JobStatus?: JobStatus;
  Message?: string;
  SubmitTime?: Date;
  EndTime?: Date;
  EntityRecognizerArn?: string;
  InputDataConfig?: InputDataConfig;
  OutputDataConfig?: OutputDataConfig;
  LanguageCode?: LanguageCode;
  DataAccessRoleArn?: string;
  VolumeKmsKeyId?: string;
  VpcConfig?: VpcConfig;
  FlywheelArn?: string;
}
export interface DescribeEntitiesDetectionJobResponse {
  EntitiesDetectionJobProperties?: EntitiesDetectionJobProperties;
}
export interface DescribeEntityRecognizerRequest {
  EntityRecognizerArn: string;
}
export interface EntityRecognizerEvaluationMetrics {
  Precision?: number;
  Recall?: number;
  F1Score?: number;
}
export interface EntityTypesEvaluationMetrics {
  Precision?: number;
  Recall?: number;
  F1Score?: number;
}
export interface EntityRecognizerMetadataEntityTypesListItem {
  Type?: string;
  EvaluationMetrics?: EntityTypesEvaluationMetrics;
  NumberOfTrainMentions?: number;
}
export type EntityRecognizerMetadataEntityTypesList =
  EntityRecognizerMetadataEntityTypesListItem[];
export interface EntityRecognizerMetadata {
  NumberOfTrainedDocuments?: number;
  NumberOfTestDocuments?: number;
  EvaluationMetrics?: EntityRecognizerEvaluationMetrics;
  EntityTypes?: EntityRecognizerMetadataEntityTypesListItem[];
}
export interface EntityRecognizerOutputDataConfig {
  FlywheelStatsS3Prefix?: string;
}
export interface EntityRecognizerProperties {
  EntityRecognizerArn?: string;
  LanguageCode?: LanguageCode;
  Status?: ModelStatus;
  Message?: string;
  SubmitTime?: Date;
  EndTime?: Date;
  TrainingStartTime?: Date;
  TrainingEndTime?: Date;
  InputDataConfig?: EntityRecognizerInputDataConfig;
  RecognizerMetadata?: EntityRecognizerMetadata;
  DataAccessRoleArn?: string;
  VolumeKmsKeyId?: string;
  VpcConfig?: VpcConfig;
  ModelKmsKeyId?: string;
  VersionName?: string;
  SourceModelArn?: string;
  FlywheelArn?: string;
  OutputDataConfig?: EntityRecognizerOutputDataConfig;
}
export interface DescribeEntityRecognizerResponse {
  EntityRecognizerProperties?: EntityRecognizerProperties;
}
export interface DescribeEventsDetectionJobRequest {
  JobId: string;
}
export type EventTypeString = string;
export type TargetEventTypes = string[];
export interface EventsDetectionJobProperties {
  JobId?: string;
  JobArn?: string;
  JobName?: string;
  JobStatus?: JobStatus;
  Message?: string;
  SubmitTime?: Date;
  EndTime?: Date;
  InputDataConfig?: InputDataConfig;
  OutputDataConfig?: OutputDataConfig;
  LanguageCode?: LanguageCode;
  DataAccessRoleArn?: string;
  TargetEventTypes?: string[];
}
export interface DescribeEventsDetectionJobResponse {
  EventsDetectionJobProperties?: EventsDetectionJobProperties;
}
export interface DescribeFlywheelRequest {
  FlywheelArn: string;
}
export type FlywheelStatus =
  | "CREATING"
  | "ACTIVE"
  | "UPDATING"
  | "DELETING"
  | "FAILED"
  | (string & {});
export type FlywheelIterationId = string;
export interface FlywheelProperties {
  FlywheelArn?: string;
  ActiveModelArn?: string;
  DataAccessRoleArn?: string;
  TaskConfig?: TaskConfig;
  DataLakeS3Uri?: string;
  DataSecurityConfig?: DataSecurityConfig;
  Status?: FlywheelStatus;
  ModelType?: ModelType;
  Message?: string;
  CreationTime?: Date;
  LastModifiedTime?: Date;
  LatestFlywheelIteration?: string;
}
export interface DescribeFlywheelResponse {
  FlywheelProperties?: FlywheelProperties;
}
export interface DescribeFlywheelIterationRequest {
  FlywheelArn: string;
  FlywheelIterationId: string;
}
export type FlywheelIterationStatus =
  | "TRAINING"
  | "EVALUATING"
  | "COMPLETED"
  | "FAILED"
  | "STOP_REQUESTED"
  | "STOPPED"
  | (string & {});
export interface FlywheelModelEvaluationMetrics {
  AverageF1Score?: number;
  AveragePrecision?: number;
  AverageRecall?: number;
  AverageAccuracy?: number;
}
export interface FlywheelIterationProperties {
  FlywheelArn?: string;
  FlywheelIterationId?: string;
  CreationTime?: Date;
  EndTime?: Date;
  Status?: FlywheelIterationStatus;
  Message?: string;
  EvaluatedModelArn?: string;
  EvaluatedModelMetrics?: FlywheelModelEvaluationMetrics;
  TrainedModelArn?: string;
  TrainedModelMetrics?: FlywheelModelEvaluationMetrics;
  EvaluationManifestS3Prefix?: string;
}
export interface DescribeFlywheelIterationResponse {
  FlywheelIterationProperties?: FlywheelIterationProperties;
}
export interface DescribeKeyPhrasesDetectionJobRequest {
  JobId: string;
}
export interface KeyPhrasesDetectionJobProperties {
  JobId?: string;
  JobArn?: string;
  JobName?: string;
  JobStatus?: JobStatus;
  Message?: string;
  SubmitTime?: Date;
  EndTime?: Date;
  InputDataConfig?: InputDataConfig;
  OutputDataConfig?: OutputDataConfig;
  LanguageCode?: LanguageCode;
  DataAccessRoleArn?: string;
  VolumeKmsKeyId?: string;
  VpcConfig?: VpcConfig;
}
export interface DescribeKeyPhrasesDetectionJobResponse {
  KeyPhrasesDetectionJobProperties?: KeyPhrasesDetectionJobProperties;
}
export interface DescribePiiEntitiesDetectionJobRequest {
  JobId: string;
}
export interface PiiOutputDataConfig {
  S3Uri: string;
  KmsKeyId?: string;
}
export type ListOfPiiEntityTypes = PiiEntityType[];
export type PiiEntitiesDetectionMaskMode =
  | "MASK"
  | "REPLACE_WITH_PII_ENTITY_TYPE"
  | (string & {});
export type MaskCharacter = string;
export interface RedactionConfig {
  PiiEntityTypes?: PiiEntityType[];
  MaskMode?: PiiEntitiesDetectionMaskMode;
  MaskCharacter?: string;
}
export type PiiEntitiesDetectionMode =
  | "ONLY_REDACTION"
  | "ONLY_OFFSETS"
  | (string & {});
export interface PiiEntitiesDetectionJobProperties {
  JobId?: string;
  JobArn?: string;
  JobName?: string;
  JobStatus?: JobStatus;
  Message?: string;
  SubmitTime?: Date;
  EndTime?: Date;
  InputDataConfig?: InputDataConfig;
  OutputDataConfig?: PiiOutputDataConfig;
  RedactionConfig?: RedactionConfig;
  LanguageCode?: LanguageCode;
  DataAccessRoleArn?: string;
  Mode?: PiiEntitiesDetectionMode;
}
export interface DescribePiiEntitiesDetectionJobResponse {
  PiiEntitiesDetectionJobProperties?: PiiEntitiesDetectionJobProperties;
}
export interface DescribeResourcePolicyRequest {
  ResourceArn: string;
}
export interface DescribeResourcePolicyResponse {
  ResourcePolicy?: string;
  CreationTime?: Date;
  LastModifiedTime?: Date;
  PolicyRevisionId?: string;
}
export interface DescribeSentimentDetectionJobRequest {
  JobId: string;
}
export interface SentimentDetectionJobProperties {
  JobId?: string;
  JobArn?: string;
  JobName?: string;
  JobStatus?: JobStatus;
  Message?: string;
  SubmitTime?: Date;
  EndTime?: Date;
  InputDataConfig?: InputDataConfig;
  OutputDataConfig?: OutputDataConfig;
  LanguageCode?: LanguageCode;
  DataAccessRoleArn?: string;
  VolumeKmsKeyId?: string;
  VpcConfig?: VpcConfig;
}
export interface DescribeSentimentDetectionJobResponse {
  SentimentDetectionJobProperties?: SentimentDetectionJobProperties;
}
export interface DescribeTargetedSentimentDetectionJobRequest {
  JobId: string;
}
export interface TargetedSentimentDetectionJobProperties {
  JobId?: string;
  JobArn?: string;
  JobName?: string;
  JobStatus?: JobStatus;
  Message?: string;
  SubmitTime?: Date;
  EndTime?: Date;
  InputDataConfig?: InputDataConfig;
  OutputDataConfig?: OutputDataConfig;
  LanguageCode?: LanguageCode;
  DataAccessRoleArn?: string;
  VolumeKmsKeyId?: string;
  VpcConfig?: VpcConfig;
}
export interface DescribeTargetedSentimentDetectionJobResponse {
  TargetedSentimentDetectionJobProperties?: TargetedSentimentDetectionJobProperties;
}
export interface DescribeTopicsDetectionJobRequest {
  JobId: string;
}
export interface TopicsDetectionJobProperties {
  JobId?: string;
  JobArn?: string;
  JobName?: string;
  JobStatus?: JobStatus;
  Message?: string;
  SubmitTime?: Date;
  EndTime?: Date;
  InputDataConfig?: InputDataConfig;
  OutputDataConfig?: OutputDataConfig;
  NumberOfTopics?: number;
  DataAccessRoleArn?: string;
  VolumeKmsKeyId?: string;
  VpcConfig?: VpcConfig;
}
export interface DescribeTopicsDetectionJobResponse {
  TopicsDetectionJobProperties?: TopicsDetectionJobProperties;
}
export interface DetectDominantLanguageRequest {
  Text: string | redacted.Redacted<string>;
}
export interface DetectDominantLanguageResponse {
  Languages?: DominantLanguage[];
}
export type EntityRecognizerEndpointArn = string;
export interface DetectEntitiesRequest {
  Text?: string | redacted.Redacted<string>;
  LanguageCode?: LanguageCode;
  EndpointArn?: string;
  Bytes?: Uint8Array;
  DocumentReaderConfig?: DocumentReaderConfig;
}
export type BlockType = "LINE" | "WORD" | (string & {});
export interface BoundingBox {
  Height?: number;
  Left?: number;
  Top?: number;
  Width?: number;
}
export interface Point {
  X?: number;
  Y?: number;
}
export type Polygon = Point[];
export interface Geometry {
  BoundingBox?: BoundingBox;
  Polygon?: Point[];
}
export type StringList = string[];
export type RelationshipType = "CHILD" | (string & {});
export interface RelationshipsListItem {
  Ids?: string[];
  Type?: RelationshipType;
}
export type ListOfRelationships = RelationshipsListItem[];
export interface Block {
  Id?: string;
  BlockType?: BlockType;
  Text?: string;
  Page?: number;
  Geometry?: Geometry;
  Relationships?: RelationshipsListItem[];
}
export type ListOfBlocks = Block[];
export interface DetectEntitiesResponse {
  Entities?: Entity[];
  DocumentMetadata?: DocumentMetadata;
  DocumentType?: DocumentTypeListItem[];
  Blocks?: Block[];
  Errors?: ErrorsListItem[];
}
export interface DetectKeyPhrasesRequest {
  Text: string | redacted.Redacted<string>;
  LanguageCode: LanguageCode;
}
export interface DetectKeyPhrasesResponse {
  KeyPhrases?: KeyPhrase[];
}
export interface DetectPiiEntitiesRequest {
  Text: string;
  LanguageCode: LanguageCode;
}
export interface PiiEntity {
  Score?: number;
  Type?: PiiEntityType;
  BeginOffset?: number;
  EndOffset?: number;
}
export type ListOfPiiEntities = PiiEntity[];
export interface DetectPiiEntitiesResponse {
  Entities?: PiiEntity[];
}
export interface DetectSentimentRequest {
  Text: string | redacted.Redacted<string>;
  LanguageCode: LanguageCode;
}
export interface DetectSentimentResponse {
  Sentiment?: SentimentType;
  SentimentScore?: SentimentScore;
}
export interface DetectSyntaxRequest {
  Text: string | redacted.Redacted<string>;
  LanguageCode: SyntaxLanguageCode;
}
export interface DetectSyntaxResponse {
  SyntaxTokens?: SyntaxToken[];
}
export interface DetectTargetedSentimentRequest {
  Text: string | redacted.Redacted<string>;
  LanguageCode: LanguageCode;
}
export interface DetectTargetedSentimentResponse {
  Entities?: TargetedSentimentEntity[];
}
export interface TextSegment {
  Text: string | redacted.Redacted<string>;
}
export type ListOfTextSegments = TextSegment[];
export interface DetectToxicContentRequest {
  TextSegments: TextSegment[];
  LanguageCode: LanguageCode;
}
export type ToxicContentType =
  | "GRAPHIC"
  | "HARASSMENT_OR_ABUSE"
  | "HATE_SPEECH"
  | "INSULT"
  | "PROFANITY"
  | "SEXUAL"
  | "VIOLENCE_OR_THREAT"
  | (string & {});
export interface ToxicContent {
  Name?: ToxicContentType;
  Score?: number;
}
export type ListOfToxicContent = ToxicContent[];
export interface ToxicLabels {
  Labels?: ToxicContent[];
  Toxicity?: number;
}
export type ListOfToxicLabels = ToxicLabels[];
export interface DetectToxicContentResponse {
  ResultList?: ToxicLabels[];
}
export interface ImportModelRequest {
  SourceModelArn: string;
  ModelName?: string;
  VersionName?: string;
  ModelKmsKeyId?: string;
  DataAccessRoleArn?: string;
  Tags?: Tag[];
}
export interface ImportModelResponse {
  ModelArn?: string;
}
export interface DatasetFilter {
  Status?: DatasetStatus;
  DatasetType?: DatasetType;
  CreationTimeAfter?: Date;
  CreationTimeBefore?: Date;
}
export type MaxResultsInteger = number;
export interface ListDatasetsRequest {
  FlywheelArn?: string;
  Filter?: DatasetFilter;
  NextToken?: string;
  MaxResults?: number;
}
export type DatasetPropertiesList = DatasetProperties[];
export interface ListDatasetsResponse {
  DatasetPropertiesList?: DatasetProperties[];
  NextToken?: string;
}
export interface DocumentClassificationJobFilter {
  JobName?: string;
  JobStatus?: JobStatus;
  SubmitTimeBefore?: Date;
  SubmitTimeAfter?: Date;
}
export interface ListDocumentClassificationJobsRequest {
  Filter?: DocumentClassificationJobFilter;
  NextToken?: string;
  MaxResults?: number;
}
export type DocumentClassificationJobPropertiesList =
  DocumentClassificationJobProperties[];
export interface ListDocumentClassificationJobsResponse {
  DocumentClassificationJobPropertiesList?: DocumentClassificationJobProperties[];
  NextToken?: string;
}
export interface DocumentClassifierFilter {
  Status?: ModelStatus;
  DocumentClassifierName?: string;
  SubmitTimeBefore?: Date;
  SubmitTimeAfter?: Date;
}
export interface ListDocumentClassifiersRequest {
  Filter?: DocumentClassifierFilter;
  NextToken?: string;
  MaxResults?: number;
}
export type DocumentClassifierPropertiesList = DocumentClassifierProperties[];
export interface ListDocumentClassifiersResponse {
  DocumentClassifierPropertiesList?: DocumentClassifierProperties[];
  NextToken?: string;
}
export interface ListDocumentClassifierSummariesRequest {
  NextToken?: string;
  MaxResults?: number;
}
export interface DocumentClassifierSummary {
  DocumentClassifierName?: string;
  NumberOfVersions?: number;
  LatestVersionCreatedAt?: Date;
  LatestVersionName?: string;
  LatestVersionStatus?: ModelStatus;
}
export type DocumentClassifierSummariesList = DocumentClassifierSummary[];
export interface ListDocumentClassifierSummariesResponse {
  DocumentClassifierSummariesList?: DocumentClassifierSummary[];
  NextToken?: string;
}
export interface DominantLanguageDetectionJobFilter {
  JobName?: string;
  JobStatus?: JobStatus;
  SubmitTimeBefore?: Date;
  SubmitTimeAfter?: Date;
}
export interface ListDominantLanguageDetectionJobsRequest {
  Filter?: DominantLanguageDetectionJobFilter;
  NextToken?: string;
  MaxResults?: number;
}
export type DominantLanguageDetectionJobPropertiesList =
  DominantLanguageDetectionJobProperties[];
export interface ListDominantLanguageDetectionJobsResponse {
  DominantLanguageDetectionJobPropertiesList?: DominantLanguageDetectionJobProperties[];
  NextToken?: string;
}
export interface EndpointFilter {
  ModelArn?: string;
  Status?: EndpointStatus;
  CreationTimeBefore?: Date;
  CreationTimeAfter?: Date;
}
export interface ListEndpointsRequest {
  Filter?: EndpointFilter;
  NextToken?: string;
  MaxResults?: number;
}
export type EndpointPropertiesList = EndpointProperties[];
export interface ListEndpointsResponse {
  EndpointPropertiesList?: EndpointProperties[];
  NextToken?: string;
}
export interface EntitiesDetectionJobFilter {
  JobName?: string;
  JobStatus?: JobStatus;
  SubmitTimeBefore?: Date;
  SubmitTimeAfter?: Date;
}
export interface ListEntitiesDetectionJobsRequest {
  Filter?: EntitiesDetectionJobFilter;
  NextToken?: string;
  MaxResults?: number;
}
export type EntitiesDetectionJobPropertiesList =
  EntitiesDetectionJobProperties[];
export interface ListEntitiesDetectionJobsResponse {
  EntitiesDetectionJobPropertiesList?: EntitiesDetectionJobProperties[];
  NextToken?: string;
}
export interface EntityRecognizerFilter {
  Status?: ModelStatus;
  RecognizerName?: string;
  SubmitTimeBefore?: Date;
  SubmitTimeAfter?: Date;
}
export interface ListEntityRecognizersRequest {
  Filter?: EntityRecognizerFilter;
  NextToken?: string;
  MaxResults?: number;
}
export type EntityRecognizerPropertiesList = EntityRecognizerProperties[];
export interface ListEntityRecognizersResponse {
  EntityRecognizerPropertiesList?: EntityRecognizerProperties[];
  NextToken?: string;
}
export interface ListEntityRecognizerSummariesRequest {
  NextToken?: string;
  MaxResults?: number;
}
export interface EntityRecognizerSummary {
  RecognizerName?: string;
  NumberOfVersions?: number;
  LatestVersionCreatedAt?: Date;
  LatestVersionName?: string;
  LatestVersionStatus?: ModelStatus;
}
export type EntityRecognizerSummariesList = EntityRecognizerSummary[];
export interface ListEntityRecognizerSummariesResponse {
  EntityRecognizerSummariesList?: EntityRecognizerSummary[];
  NextToken?: string;
}
export interface EventsDetectionJobFilter {
  JobName?: string;
  JobStatus?: JobStatus;
  SubmitTimeBefore?: Date;
  SubmitTimeAfter?: Date;
}
export interface ListEventsDetectionJobsRequest {
  Filter?: EventsDetectionJobFilter;
  NextToken?: string;
  MaxResults?: number;
}
export type EventsDetectionJobPropertiesList = EventsDetectionJobProperties[];
export interface ListEventsDetectionJobsResponse {
  EventsDetectionJobPropertiesList?: EventsDetectionJobProperties[];
  NextToken?: string;
}
export interface FlywheelIterationFilter {
  CreationTimeAfter?: Date;
  CreationTimeBefore?: Date;
}
export interface ListFlywheelIterationHistoryRequest {
  FlywheelArn: string;
  Filter?: FlywheelIterationFilter;
  NextToken?: string;
  MaxResults?: number;
}
export type FlywheelIterationPropertiesList = FlywheelIterationProperties[];
export interface ListFlywheelIterationHistoryResponse {
  FlywheelIterationPropertiesList?: FlywheelIterationProperties[];
  NextToken?: string;
}
export interface FlywheelFilter {
  Status?: FlywheelStatus;
  CreationTimeAfter?: Date;
  CreationTimeBefore?: Date;
}
export interface ListFlywheelsRequest {
  Filter?: FlywheelFilter;
  NextToken?: string;
  MaxResults?: number;
}
export interface FlywheelSummary {
  FlywheelArn?: string;
  ActiveModelArn?: string;
  DataLakeS3Uri?: string;
  Status?: FlywheelStatus;
  ModelType?: ModelType;
  Message?: string;
  CreationTime?: Date;
  LastModifiedTime?: Date;
  LatestFlywheelIteration?: string;
}
export type FlywheelSummaryList = FlywheelSummary[];
export interface ListFlywheelsResponse {
  FlywheelSummaryList?: FlywheelSummary[];
  NextToken?: string;
}
export interface KeyPhrasesDetectionJobFilter {
  JobName?: string;
  JobStatus?: JobStatus;
  SubmitTimeBefore?: Date;
  SubmitTimeAfter?: Date;
}
export interface ListKeyPhrasesDetectionJobsRequest {
  Filter?: KeyPhrasesDetectionJobFilter;
  NextToken?: string;
  MaxResults?: number;
}
export type KeyPhrasesDetectionJobPropertiesList =
  KeyPhrasesDetectionJobProperties[];
export interface ListKeyPhrasesDetectionJobsResponse {
  KeyPhrasesDetectionJobPropertiesList?: KeyPhrasesDetectionJobProperties[];
  NextToken?: string;
}
export interface PiiEntitiesDetectionJobFilter {
  JobName?: string;
  JobStatus?: JobStatus;
  SubmitTimeBefore?: Date;
  SubmitTimeAfter?: Date;
}
export interface ListPiiEntitiesDetectionJobsRequest {
  Filter?: PiiEntitiesDetectionJobFilter;
  NextToken?: string;
  MaxResults?: number;
}
export type PiiEntitiesDetectionJobPropertiesList =
  PiiEntitiesDetectionJobProperties[];
export interface ListPiiEntitiesDetectionJobsResponse {
  PiiEntitiesDetectionJobPropertiesList?: PiiEntitiesDetectionJobProperties[];
  NextToken?: string;
}
export interface SentimentDetectionJobFilter {
  JobName?: string;
  JobStatus?: JobStatus;
  SubmitTimeBefore?: Date;
  SubmitTimeAfter?: Date;
}
export interface ListSentimentDetectionJobsRequest {
  Filter?: SentimentDetectionJobFilter;
  NextToken?: string;
  MaxResults?: number;
}
export type SentimentDetectionJobPropertiesList =
  SentimentDetectionJobProperties[];
export interface ListSentimentDetectionJobsResponse {
  SentimentDetectionJobPropertiesList?: SentimentDetectionJobProperties[];
  NextToken?: string;
}
export interface ListTagsForResourceRequest {
  ResourceArn: string;
}
export interface ListTagsForResourceResponse {
  ResourceArn?: string;
  Tags?: Tag[];
}
export interface TargetedSentimentDetectionJobFilter {
  JobName?: string;
  JobStatus?: JobStatus;
  SubmitTimeBefore?: Date;
  SubmitTimeAfter?: Date;
}
export interface ListTargetedSentimentDetectionJobsRequest {
  Filter?: TargetedSentimentDetectionJobFilter;
  NextToken?: string;
  MaxResults?: number;
}
export type TargetedSentimentDetectionJobPropertiesList =
  TargetedSentimentDetectionJobProperties[];
export interface ListTargetedSentimentDetectionJobsResponse {
  TargetedSentimentDetectionJobPropertiesList?: TargetedSentimentDetectionJobProperties[];
  NextToken?: string;
}
export interface TopicsDetectionJobFilter {
  JobName?: string;
  JobStatus?: JobStatus;
  SubmitTimeBefore?: Date;
  SubmitTimeAfter?: Date;
}
export interface ListTopicsDetectionJobsRequest {
  Filter?: TopicsDetectionJobFilter;
  NextToken?: string;
  MaxResults?: number;
}
export type TopicsDetectionJobPropertiesList = TopicsDetectionJobProperties[];
export interface ListTopicsDetectionJobsResponse {
  TopicsDetectionJobPropertiesList?: TopicsDetectionJobProperties[];
  NextToken?: string;
}
export interface PutResourcePolicyRequest {
  ResourceArn: string;
  ResourcePolicy: string;
  PolicyRevisionId?: string;
}
export interface PutResourcePolicyResponse {
  PolicyRevisionId?: string;
}
export interface StartDocumentClassificationJobRequest {
  JobName?: string;
  DocumentClassifierArn?: string;
  InputDataConfig: InputDataConfig;
  OutputDataConfig: OutputDataConfig;
  DataAccessRoleArn: string;
  ClientRequestToken?: string;
  VolumeKmsKeyId?: string;
  VpcConfig?: VpcConfig;
  Tags?: Tag[];
  FlywheelArn?: string;
}
export interface StartDocumentClassificationJobResponse {
  JobId?: string;
  JobArn?: string;
  JobStatus?: JobStatus;
  DocumentClassifierArn?: string;
}
export interface StartDominantLanguageDetectionJobRequest {
  InputDataConfig: InputDataConfig;
  OutputDataConfig: OutputDataConfig;
  DataAccessRoleArn: string;
  JobName?: string;
  ClientRequestToken?: string;
  VolumeKmsKeyId?: string;
  VpcConfig?: VpcConfig;
  Tags?: Tag[];
}
export interface StartDominantLanguageDetectionJobResponse {
  JobId?: string;
  JobArn?: string;
  JobStatus?: JobStatus;
}
export interface StartEntitiesDetectionJobRequest {
  InputDataConfig: InputDataConfig;
  OutputDataConfig: OutputDataConfig;
  DataAccessRoleArn: string;
  JobName?: string;
  EntityRecognizerArn?: string;
  LanguageCode: LanguageCode;
  ClientRequestToken?: string;
  VolumeKmsKeyId?: string;
  VpcConfig?: VpcConfig;
  Tags?: Tag[];
  FlywheelArn?: string;
}
export interface StartEntitiesDetectionJobResponse {
  JobId?: string;
  JobArn?: string;
  JobStatus?: JobStatus;
  EntityRecognizerArn?: string;
}
export interface StartEventsDetectionJobRequest {
  InputDataConfig: InputDataConfig;
  OutputDataConfig: OutputDataConfig;
  DataAccessRoleArn: string;
  JobName?: string;
  LanguageCode: LanguageCode;
  ClientRequestToken?: string;
  TargetEventTypes: string[];
  Tags?: Tag[];
}
export interface StartEventsDetectionJobResponse {
  JobId?: string;
  JobArn?: string;
  JobStatus?: JobStatus;
}
export interface StartFlywheelIterationRequest {
  FlywheelArn: string;
  ClientRequestToken?: string;
}
export interface StartFlywheelIterationResponse {
  FlywheelArn?: string;
  FlywheelIterationId?: string;
}
export interface StartKeyPhrasesDetectionJobRequest {
  InputDataConfig: InputDataConfig;
  OutputDataConfig: OutputDataConfig;
  DataAccessRoleArn: string;
  JobName?: string;
  LanguageCode: LanguageCode;
  ClientRequestToken?: string;
  VolumeKmsKeyId?: string;
  VpcConfig?: VpcConfig;
  Tags?: Tag[];
}
export interface StartKeyPhrasesDetectionJobResponse {
  JobId?: string;
  JobArn?: string;
  JobStatus?: JobStatus;
}
export interface StartPiiEntitiesDetectionJobRequest {
  InputDataConfig: InputDataConfig;
  OutputDataConfig: OutputDataConfig;
  Mode: PiiEntitiesDetectionMode;
  RedactionConfig?: RedactionConfig;
  DataAccessRoleArn: string;
  JobName?: string;
  LanguageCode: LanguageCode;
  ClientRequestToken?: string;
  Tags?: Tag[];
}
export interface StartPiiEntitiesDetectionJobResponse {
  JobId?: string;
  JobArn?: string;
  JobStatus?: JobStatus;
}
export interface StartSentimentDetectionJobRequest {
  InputDataConfig: InputDataConfig;
  OutputDataConfig: OutputDataConfig;
  DataAccessRoleArn: string;
  JobName?: string;
  LanguageCode: LanguageCode;
  ClientRequestToken?: string;
  VolumeKmsKeyId?: string;
  VpcConfig?: VpcConfig;
  Tags?: Tag[];
}
export interface StartSentimentDetectionJobResponse {
  JobId?: string;
  JobArn?: string;
  JobStatus?: JobStatus;
}
export interface StartTargetedSentimentDetectionJobRequest {
  InputDataConfig: InputDataConfig;
  OutputDataConfig: OutputDataConfig;
  DataAccessRoleArn: string;
  JobName?: string;
  LanguageCode: LanguageCode;
  ClientRequestToken?: string;
  VolumeKmsKeyId?: string;
  VpcConfig?: VpcConfig;
  Tags?: Tag[];
}
export interface StartTargetedSentimentDetectionJobResponse {
  JobId?: string;
  JobArn?: string;
  JobStatus?: JobStatus;
}
export type NumberOfTopicsInteger = number;
export interface StartTopicsDetectionJobRequest {
  InputDataConfig: InputDataConfig;
  OutputDataConfig: OutputDataConfig;
  DataAccessRoleArn: string;
  JobName?: string;
  NumberOfTopics?: number;
  ClientRequestToken?: string;
  VolumeKmsKeyId?: string;
  VpcConfig?: VpcConfig;
  Tags?: Tag[];
}
export interface StartTopicsDetectionJobResponse {
  JobId?: string;
  JobArn?: string;
  JobStatus?: JobStatus;
}
export interface StopDominantLanguageDetectionJobRequest {
  JobId: string;
}
export interface StopDominantLanguageDetectionJobResponse {
  JobId?: string;
  JobStatus?: JobStatus;
}
export interface StopEntitiesDetectionJobRequest {
  JobId: string;
}
export interface StopEntitiesDetectionJobResponse {
  JobId?: string;
  JobStatus?: JobStatus;
}
export interface StopEventsDetectionJobRequest {
  JobId: string;
}
export interface StopEventsDetectionJobResponse {
  JobId?: string;
  JobStatus?: JobStatus;
}
export interface StopKeyPhrasesDetectionJobRequest {
  JobId: string;
}
export interface StopKeyPhrasesDetectionJobResponse {
  JobId?: string;
  JobStatus?: JobStatus;
}
export interface StopPiiEntitiesDetectionJobRequest {
  JobId: string;
}
export interface StopPiiEntitiesDetectionJobResponse {
  JobId?: string;
  JobStatus?: JobStatus;
}
export interface StopSentimentDetectionJobRequest {
  JobId: string;
}
export interface StopSentimentDetectionJobResponse {
  JobId?: string;
  JobStatus?: JobStatus;
}
export interface StopTargetedSentimentDetectionJobRequest {
  JobId: string;
}
export interface StopTargetedSentimentDetectionJobResponse {
  JobId?: string;
  JobStatus?: JobStatus;
}
export interface StopTrainingDocumentClassifierRequest {
  DocumentClassifierArn: string;
}
export interface StopTrainingDocumentClassifierResponse {}
export interface StopTrainingEntityRecognizerRequest {
  EntityRecognizerArn: string;
}
export interface StopTrainingEntityRecognizerResponse {}
export interface TagResourceRequest {
  ResourceArn: string;
  Tags: Tag[];
}
export interface TagResourceResponse {}
export type TagKeyList = string[];
export interface UntagResourceRequest {
  ResourceArn: string;
  TagKeys: string[];
}
export interface UntagResourceResponse {}
export interface UpdateEndpointRequest {
  EndpointArn: string;
  DesiredModelArn?: string;
  DesiredInferenceUnits?: number;
  DesiredDataAccessRoleArn?: string;
  FlywheelArn?: string;
}
export interface UpdateEndpointResponse {
  DesiredModelArn?: string;
}
export interface UpdateDataSecurityConfig {
  ModelKmsKeyId?: string;
  VolumeKmsKeyId?: string;
  VpcConfig?: VpcConfig;
}
export interface UpdateFlywheelRequest {
  FlywheelArn: string;
  ActiveModelArn?: string;
  DataAccessRoleArn?: string;
  DataSecurityConfig?: UpdateDataSecurityConfig;
}
export interface UpdateFlywheelResponse {
  FlywheelProperties?: FlywheelProperties;
}
export type InvalidRequestReason = "INVALID_DOCUMENT" | (string & {});
export type InvalidRequestDetailReason =
  | "DOCUMENT_SIZE_EXCEEDED"
  | "UNSUPPORTED_DOC_TYPE"
  | "PAGE_LIMIT_EXCEEDED"
  | "TEXTRACT_ACCESS_DENIED"
  | (string & {});
export interface InvalidRequestDetail {
  Reason?: InvalidRequestDetailReason;
}
export type BatchDetectDominantLanguageError =
  | BatchSizeLimitExceededException
  | InternalServerException
  | InvalidRequestException
  | TextSizeLimitExceededException
  | CommonErrors;
/**
 * Determines the dominant language of the input text for a batch of documents. For a list
 * of languages that Amazon Comprehend can detect, see Amazon Comprehend Supported Languages.
 */
export const batchDetectDominantLanguage: API.OperationMethod<
  BatchDetectDominantLanguageRequest,
  BatchDetectDominantLanguageResponse,
  BatchDetectDominantLanguageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { TextList: 0 } },
  errors: [
    BatchSizeLimitExceededException,
    InternalServerException,
    InvalidRequestException,
    TextSizeLimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchDetectDominantLanguage",
})) as any;

export type BatchDetectEntitiesError =
  | BatchSizeLimitExceededException
  | InternalServerException
  | InvalidRequestException
  | TextSizeLimitExceededException
  | UnsupportedLanguageException
  | CommonErrors;
/**
 * Inspects the text of a batch of documents for named entities and returns information
 * about them. For more information about named entities, see
 * Entities in the Comprehend Developer Guide.
 */
export const batchDetectEntities: API.OperationMethod<
  BatchDetectEntitiesRequest,
  BatchDetectEntitiesResponse,
  BatchDetectEntitiesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { TextList: 0, LanguageCode: 0 } },
  errors: [
    BatchSizeLimitExceededException,
    InternalServerException,
    InvalidRequestException,
    TextSizeLimitExceededException,
    UnsupportedLanguageException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchDetectEntities",
})) as any;

export type BatchDetectKeyPhrasesError =
  | BatchSizeLimitExceededException
  | InternalServerException
  | InvalidRequestException
  | TextSizeLimitExceededException
  | UnsupportedLanguageException
  | CommonErrors;
/**
 * Detects the key noun phrases found in a batch of documents.
 */
export const batchDetectKeyPhrases: API.OperationMethod<
  BatchDetectKeyPhrasesRequest,
  BatchDetectKeyPhrasesResponse,
  BatchDetectKeyPhrasesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { TextList: 0, LanguageCode: 0 } },
  errors: [
    BatchSizeLimitExceededException,
    InternalServerException,
    InvalidRequestException,
    TextSizeLimitExceededException,
    UnsupportedLanguageException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchDetectKeyPhrases",
})) as any;

export type BatchDetectSentimentError =
  | BatchSizeLimitExceededException
  | InternalServerException
  | InvalidRequestException
  | TextSizeLimitExceededException
  | UnsupportedLanguageException
  | CommonErrors;
/**
 * Inspects a batch of documents and returns an inference of the prevailing sentiment,
 * `POSITIVE`, `NEUTRAL`, `MIXED`, or `NEGATIVE`,
 * in each one.
 */
export const batchDetectSentiment: API.OperationMethod<
  BatchDetectSentimentRequest,
  BatchDetectSentimentResponse,
  BatchDetectSentimentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { TextList: 0, LanguageCode: 0 } },
  errors: [
    BatchSizeLimitExceededException,
    InternalServerException,
    InvalidRequestException,
    TextSizeLimitExceededException,
    UnsupportedLanguageException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchDetectSentiment",
})) as any;

export type BatchDetectSyntaxError =
  | BatchSizeLimitExceededException
  | InternalServerException
  | InvalidRequestException
  | TextSizeLimitExceededException
  | UnsupportedLanguageException
  | CommonErrors;
/**
 * Inspects the text of a batch of documents for the syntax and part of speech of the words
 * in the document and returns information about them. For more information, see
 * Syntax in the Comprehend Developer Guide.
 */
export const batchDetectSyntax: API.OperationMethod<
  BatchDetectSyntaxRequest,
  BatchDetectSyntaxResponse,
  BatchDetectSyntaxError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { TextList: 0, LanguageCode: 0 } },
  errors: [
    BatchSizeLimitExceededException,
    InternalServerException,
    InvalidRequestException,
    TextSizeLimitExceededException,
    UnsupportedLanguageException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchDetectSyntax",
})) as any;

export type BatchDetectTargetedSentimentError =
  | BatchSizeLimitExceededException
  | InternalServerException
  | InvalidRequestException
  | TextSizeLimitExceededException
  | UnsupportedLanguageException
  | CommonErrors;
/**
 * Inspects a batch of documents and returns a sentiment analysis
 * for each entity identified in the documents.
 *
 * For more information about targeted sentiment, see Targeted sentiment in the *Amazon Comprehend Developer Guide*.
 */
export const batchDetectTargetedSentiment: API.OperationMethod<
  BatchDetectTargetedSentimentRequest,
  BatchDetectTargetedSentimentResponse,
  BatchDetectTargetedSentimentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { TextList: 0, LanguageCode: 0 } },
  errors: [
    BatchSizeLimitExceededException,
    InternalServerException,
    InvalidRequestException,
    TextSizeLimitExceededException,
    UnsupportedLanguageException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchDetectTargetedSentiment",
})) as any;

export type ClassifyDocumentError =
  | InternalServerException
  | InvalidRequestException
  | ResourceUnavailableException
  | TextSizeLimitExceededException
  | NotAuthorizedException
  | CommonErrors;
/**
 * Creates a classification request to analyze a single document in real-time. `ClassifyDocument`
 * supports the following model types:
 *
 * - Custom classifier - a custom model that you have created and trained.
 * For input, you can provide plain text, a single-page document (PDF, Word, or image), or
 * Amazon Textract API output. For more information, see Custom classification in the *Amazon Comprehend Developer Guide*.
 *
 * - Prompt safety classifier - Amazon Comprehend provides a pre-trained model for classifying
 * input prompts for generative AI applications.
 * For input, you provide English plain text input.
 * For prompt safety classification, the response includes only the `Classes` field.
 * For more information about prompt safety classifiers, see Prompt safety classification in the *Amazon Comprehend Developer Guide*.
 *
 * If the system detects errors while processing a page in the input document,
 * the API response includes an `Errors` field that describes the errors.
 *
 * If the system detects a document-level error in your input document, the API returns an
 * `InvalidRequestException` error response.
 * For details about this exception, see
 *
 * Errors in semi-structured documents in the Comprehend Developer Guide.
 */
export const classifyDocument: API.OperationMethod<
  ClassifyDocumentRequest,
  ClassifyDocumentResponse,
  ClassifyDocumentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Text: 0,
      EndpointArn: 0,
      Bytes: 0,
      DocumentReaderConfig: i_DocumentReaderConfig,
    },
  },
  errors: [
    InternalServerException,
    InvalidRequestException,
    ResourceUnavailableException,
    TextSizeLimitExceededException,
    NotAuthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ClassifyDocument",
})) as any;

export type ContainsPiiEntitiesError =
  | InternalServerException
  | InvalidRequestException
  | TextSizeLimitExceededException
  | UnsupportedLanguageException
  | CommonErrors;
/**
 * Analyzes input text for the presence of personally identifiable information (PII) and
 * returns the labels of identified PII entity types such as name, address, bank account number,
 * or phone number.
 */
export const containsPiiEntities: API.OperationMethod<
  ContainsPiiEntitiesRequest,
  ContainsPiiEntitiesResponse,
  ContainsPiiEntitiesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { Text: 0, LanguageCode: 0 } },
  errors: [
    InternalServerException,
    InvalidRequestException,
    TextSizeLimitExceededException,
    UnsupportedLanguageException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ContainsPiiEntities",
})) as any;

export type CreateDatasetError =
  | InternalServerException
  | InvalidRequestException
  | ResourceInUseException
  | ResourceLimitExceededException
  | ResourceNotFoundException
  | TooManyRequestsException
  | TooManyTagsException
  | CommonErrors;
/**
 * Creates a dataset to upload training or test data for a model associated with a flywheel.
 * For more information about datasets, see
 * Flywheel overview in the *Amazon Comprehend Developer Guide*.
 */
export const createDataset: API.OperationMethod<
  CreateDatasetRequest,
  CreateDatasetResponse,
  CreateDatasetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      FlywheelArn: 0,
      DatasetName: 0,
      DatasetType: 0,
      Description: 0,
      InputDataConfig: {
        AugmentedManifests: D.list({
          AttributeNames: 0,
          S3Uri: 0,
          AnnotationDataS3Uri: 0,
          SourceDocumentsS3Uri: 0,
          DocumentType: 0,
        }),
        DataFormat: 0,
        DocumentClassifierInputDataConfig: { S3Uri: 0, LabelDelimiter: 0 },
        EntityRecognizerInputDataConfig: {
          Annotations: { S3Uri: 0 },
          Documents: { S3Uri: 0, InputFormat: 0 },
          EntityList: { S3Uri: 0 },
        },
      },
      ClientRequestToken: D.m({ idempotency: true }),
      Tags: D.list(i_Tag),
    },
  },
  errors: [
    InternalServerException,
    InvalidRequestException,
    ResourceInUseException,
    ResourceLimitExceededException,
    ResourceNotFoundException,
    TooManyRequestsException,
    TooManyTagsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDataset",
})) as any;

export type CreateDocumentClassifierError =
  | InternalServerException
  | InvalidRequestException
  | KmsKeyValidationException
  | ResourceInUseException
  | ResourceLimitExceededException
  | TooManyRequestsException
  | TooManyTagsException
  | UnsupportedLanguageException
  | CommonErrors;
/**
 * Creates a new document classifier that you can use to categorize documents. To create a
 * classifier, you provide a set of training documents that are labeled with the categories that you
 * want to use. For more information, see
 * Training classifier models
 * in the Comprehend Developer Guide.
 */
export const createDocumentClassifier: API.OperationMethod<
  CreateDocumentClassifierRequest,
  CreateDocumentClassifierResponse,
  CreateDocumentClassifierError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      DocumentClassifierName: 0,
      VersionName: 0,
      DataAccessRoleArn: 0,
      Tags: D.list(i_Tag),
      InputDataConfig: {
        DataFormat: 0,
        S3Uri: 0,
        TestS3Uri: 0,
        LabelDelimiter: 0,
        AugmentedManifests: D.list(i_AugmentedManifestsListItem),
        DocumentType: 0,
        Documents: { S3Uri: 0, TestS3Uri: 0 },
        DocumentReaderConfig: i_DocumentReaderConfig,
      },
      OutputDataConfig: { S3Uri: 0, KmsKeyId: 0, FlywheelStatsS3Prefix: 0 },
      ClientRequestToken: D.m({ idempotency: true }),
      LanguageCode: 0,
      VolumeKmsKeyId: 0,
      VpcConfig: i_VpcConfig,
      Mode: 0,
      ModelKmsKeyId: 0,
      ModelPolicy: 0,
    },
  },
  errors: [
    InternalServerException,
    InvalidRequestException,
    KmsKeyValidationException,
    ResourceInUseException,
    ResourceLimitExceededException,
    TooManyRequestsException,
    TooManyTagsException,
    UnsupportedLanguageException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDocumentClassifier",
})) as any;

export type CreateEndpointError =
  | InternalServerException
  | InvalidRequestException
  | ResourceInUseException
  | ResourceLimitExceededException
  | ResourceNotFoundException
  | ResourceUnavailableException
  | TooManyRequestsException
  | TooManyTagsException
  | CommonErrors;
/**
 * Creates a model-specific endpoint for synchronous inference for a previously trained
 * custom model
 * For information about endpoints, see Managing endpoints.
 */
export const createEndpoint: API.OperationMethod<
  CreateEndpointRequest,
  CreateEndpointResponse,
  CreateEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      EndpointName: 0,
      ModelArn: 0,
      DesiredInferenceUnits: 0,
      ClientRequestToken: D.m({ idempotency: true }),
      Tags: D.list(i_Tag),
      DataAccessRoleArn: 0,
      FlywheelArn: 0,
    },
  },
  errors: [
    InternalServerException,
    InvalidRequestException,
    ResourceInUseException,
    ResourceLimitExceededException,
    ResourceNotFoundException,
    ResourceUnavailableException,
    TooManyRequestsException,
    TooManyTagsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateEndpoint",
})) as any;

export type CreateEntityRecognizerError =
  | InternalServerException
  | InvalidRequestException
  | KmsKeyValidationException
  | ResourceInUseException
  | ResourceLimitExceededException
  | TooManyRequestsException
  | TooManyTagsException
  | UnsupportedLanguageException
  | CommonErrors;
/**
 * Creates an entity recognizer using submitted files. After your
 * `CreateEntityRecognizer` request is submitted, you can check job status using the
 * `DescribeEntityRecognizer` API.
 */
export const createEntityRecognizer: API.OperationMethod<
  CreateEntityRecognizerRequest,
  CreateEntityRecognizerResponse,
  CreateEntityRecognizerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      RecognizerName: 0,
      VersionName: 0,
      DataAccessRoleArn: 0,
      Tags: D.list(i_Tag),
      InputDataConfig: {
        DataFormat: 0,
        EntityTypes: D.list(i_EntityTypesListItem),
        Documents: { S3Uri: 0, TestS3Uri: 0, InputFormat: 0 },
        Annotations: { S3Uri: 0, TestS3Uri: 0 },
        EntityList: { S3Uri: 0 },
        AugmentedManifests: D.list(i_AugmentedManifestsListItem),
      },
      ClientRequestToken: D.m({ idempotency: true }),
      LanguageCode: 0,
      VolumeKmsKeyId: 0,
      VpcConfig: i_VpcConfig,
      ModelKmsKeyId: 0,
      ModelPolicy: 0,
    },
  },
  errors: [
    InternalServerException,
    InvalidRequestException,
    KmsKeyValidationException,
    ResourceInUseException,
    ResourceLimitExceededException,
    TooManyRequestsException,
    TooManyTagsException,
    UnsupportedLanguageException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateEntityRecognizer",
})) as any;

export type CreateFlywheelError =
  | InternalServerException
  | InvalidRequestException
  | KmsKeyValidationException
  | ResourceInUseException
  | ResourceLimitExceededException
  | ResourceNotFoundException
  | ResourceUnavailableException
  | TooManyRequestsException
  | TooManyTagsException
  | UnsupportedLanguageException
  | CommonErrors;
/**
 * A flywheel is an Amazon Web Services resource that orchestrates the ongoing training of a model for custom classification
 * or custom entity recognition. You can create a flywheel to start with an existing trained model, or
 * Comprehend can create and train a new model.
 *
 * When you create the flywheel, Comprehend creates a data lake in your account. The data lake holds the training
 * data and test data for all versions of the model.
 *
 * To use a flywheel with an existing trained model, you specify the active model version. Comprehend copies the model's
 * training data and test data into the flywheel's data lake.
 *
 * To use the flywheel with a new model, you need to provide a dataset for training data (and optional test data)
 * when you create the flywheel.
 *
 * For more information about flywheels, see
 * Flywheel overview in the *Amazon Comprehend Developer Guide*.
 */
export const createFlywheel: API.OperationMethod<
  CreateFlywheelRequest,
  CreateFlywheelResponse,
  CreateFlywheelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      FlywheelName: 0,
      ActiveModelArn: 0,
      DataAccessRoleArn: 0,
      TaskConfig: {
        LanguageCode: 0,
        DocumentClassificationConfig: { Mode: 0, Labels: 0 },
        EntityRecognitionConfig: { EntityTypes: D.list(i_EntityTypesListItem) },
      },
      ModelType: 0,
      DataLakeS3Uri: 0,
      DataSecurityConfig: {
        ModelKmsKeyId: 0,
        VolumeKmsKeyId: 0,
        DataLakeKmsKeyId: 0,
        VpcConfig: i_VpcConfig,
      },
      ClientRequestToken: D.m({ idempotency: true }),
      Tags: D.list(i_Tag),
    },
  },
  errors: [
    InternalServerException,
    InvalidRequestException,
    KmsKeyValidationException,
    ResourceInUseException,
    ResourceLimitExceededException,
    ResourceNotFoundException,
    ResourceUnavailableException,
    TooManyRequestsException,
    TooManyTagsException,
    UnsupportedLanguageException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateFlywheel",
})) as any;

export type DeleteDocumentClassifierError =
  | InternalServerException
  | InvalidRequestException
  | ResourceInUseException
  | ResourceNotFoundException
  | ResourceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes a previously created document classifier
 *
 * Only those classifiers that are in terminated states (IN_ERROR, TRAINED) will be deleted.
 * If an active inference job is using the model, a `ResourceInUseException` will be
 * returned.
 *
 * This is an asynchronous action that puts the classifier into a DELETING state, and it is
 * then removed by a background job. Once removed, the classifier disappears from your account
 * and is no longer available for use.
 */
export const deleteDocumentClassifier: API.OperationMethod<
  DeleteDocumentClassifierRequest,
  DeleteDocumentClassifierResponse,
  DeleteDocumentClassifierError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { DocumentClassifierArn: 0 } },
  errors: [
    InternalServerException,
    InvalidRequestException,
    ResourceInUseException,
    ResourceNotFoundException,
    ResourceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDocumentClassifier",
})) as any;

export type DeleteEndpointError =
  | InternalServerException
  | InvalidRequestException
  | ResourceInUseException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes a model-specific endpoint for a previously-trained custom model. All endpoints
 * must be deleted in order for the model to be deleted.
 * For information about endpoints, see Managing endpoints.
 */
export const deleteEndpoint: API.OperationMethod<
  DeleteEndpointRequest,
  DeleteEndpointResponse,
  DeleteEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { EndpointArn: 0 } },
  errors: [
    InternalServerException,
    InvalidRequestException,
    ResourceInUseException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteEndpoint",
})) as any;

export type DeleteEntityRecognizerError =
  | InternalServerException
  | InvalidRequestException
  | ResourceInUseException
  | ResourceNotFoundException
  | ResourceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes an entity recognizer.
 *
 * Only those recognizers that are in terminated states (IN_ERROR, TRAINED) will be deleted.
 * If an active inference job is using the model, a `ResourceInUseException` will be
 * returned.
 *
 * This is an asynchronous action that puts the recognizer into a DELETING state, and it is
 * then removed by a background job. Once removed, the recognizer disappears from your account
 * and is no longer available for use.
 */
export const deleteEntityRecognizer: API.OperationMethod<
  DeleteEntityRecognizerRequest,
  DeleteEntityRecognizerResponse,
  DeleteEntityRecognizerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { EntityRecognizerArn: 0 } },
  errors: [
    InternalServerException,
    InvalidRequestException,
    ResourceInUseException,
    ResourceNotFoundException,
    ResourceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteEntityRecognizer",
})) as any;

export type DeleteFlywheelError =
  | InternalServerException
  | InvalidRequestException
  | ResourceInUseException
  | ResourceNotFoundException
  | ResourceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes a flywheel. When you delete the flywheel, Amazon Comprehend
 * does not delete the data lake or the model associated with the flywheel.
 *
 * For more information about flywheels, see
 * Flywheel overview in the *Amazon Comprehend Developer Guide*.
 */
export const deleteFlywheel: API.OperationMethod<
  DeleteFlywheelRequest,
  DeleteFlywheelResponse,
  DeleteFlywheelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { FlywheelArn: 0 } },
  errors: [
    InternalServerException,
    InvalidRequestException,
    ResourceInUseException,
    ResourceNotFoundException,
    ResourceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteFlywheel",
})) as any;

export type DeleteResourcePolicyError =
  | InternalServerException
  | InvalidRequestException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes a resource-based policy that is attached to a custom model.
 */
export const deleteResourcePolicy: API.OperationMethod<
  DeleteResourcePolicyRequest,
  DeleteResourcePolicyResponse,
  DeleteResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceArn: 0, PolicyRevisionId: 0 } },
  errors: [
    InternalServerException,
    InvalidRequestException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteResourcePolicy",
})) as any;

export type DescribeDatasetError =
  | InternalServerException
  | InvalidRequestException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Returns information about the dataset that you specify.
 * For more information about datasets, see
 * Flywheel overview in the *Amazon Comprehend Developer Guide*.
 */
export const describeDataset: API.OperationMethod<
  DescribeDatasetRequest,
  DescribeDatasetResponse,
  DescribeDatasetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { DatasetArn: 0 },
    output: { DatasetProperties: o_DatasetProperties },
  },
  errors: [
    InternalServerException,
    InvalidRequestException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDataset",
})) as any;

export type DescribeDocumentClassificationJobError =
  | InternalServerException
  | InvalidRequestException
  | JobNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets the properties associated with a document classification job. Use this operation to
 * get the status of a classification job.
 */
export const describeDocumentClassificationJob: API.OperationMethod<
  DescribeDocumentClassificationJobRequest,
  DescribeDocumentClassificationJobResponse,
  DescribeDocumentClassificationJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { JobId: 0 },
    output: {
      DocumentClassificationJobProperties:
        o_DocumentClassificationJobProperties,
    },
  },
  errors: [
    InternalServerException,
    InvalidRequestException,
    JobNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDocumentClassificationJob",
})) as any;

export type DescribeDocumentClassifierError =
  | InternalServerException
  | InvalidRequestException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets the properties associated with a document classifier.
 */
export const describeDocumentClassifier: API.OperationMethod<
  DescribeDocumentClassifierRequest,
  DescribeDocumentClassifierResponse,
  DescribeDocumentClassifierError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { DocumentClassifierArn: 0 },
    output: { DocumentClassifierProperties: o_DocumentClassifierProperties },
  },
  errors: [
    InternalServerException,
    InvalidRequestException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDocumentClassifier",
})) as any;

export type DescribeDominantLanguageDetectionJobError =
  | InternalServerException
  | InvalidRequestException
  | JobNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets the properties associated with a dominant language detection job. Use this operation
 * to get the status of a detection job.
 */
export const describeDominantLanguageDetectionJob: API.OperationMethod<
  DescribeDominantLanguageDetectionJobRequest,
  DescribeDominantLanguageDetectionJobResponse,
  DescribeDominantLanguageDetectionJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { JobId: 0 },
    output: {
      DominantLanguageDetectionJobProperties:
        o_DominantLanguageDetectionJobProperties,
    },
  },
  errors: [
    InternalServerException,
    InvalidRequestException,
    JobNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDominantLanguageDetectionJob",
})) as any;

export type DescribeEndpointError =
  | InternalServerException
  | InvalidRequestException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets the properties associated with a specific endpoint. Use this operation to get the
 * status of an endpoint.
 * For information about endpoints, see Managing endpoints.
 */
export const describeEndpoint: API.OperationMethod<
  DescribeEndpointRequest,
  DescribeEndpointResponse,
  DescribeEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { EndpointArn: 0 },
    output: { EndpointProperties: o_EndpointProperties },
  },
  errors: [
    InternalServerException,
    InvalidRequestException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeEndpoint",
})) as any;

export type DescribeEntitiesDetectionJobError =
  | InternalServerException
  | InvalidRequestException
  | JobNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets the properties associated with an entities detection job. Use this operation to get
 * the status of a detection job.
 */
export const describeEntitiesDetectionJob: API.OperationMethod<
  DescribeEntitiesDetectionJobRequest,
  DescribeEntitiesDetectionJobResponse,
  DescribeEntitiesDetectionJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { JobId: 0 },
    output: {
      EntitiesDetectionJobProperties: o_EntitiesDetectionJobProperties,
    },
  },
  errors: [
    InternalServerException,
    InvalidRequestException,
    JobNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeEntitiesDetectionJob",
})) as any;

export type DescribeEntityRecognizerError =
  | InternalServerException
  | InvalidRequestException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Provides details about an entity recognizer including status, S3 buckets containing
 * training data, recognizer metadata, metrics, and so on.
 */
export const describeEntityRecognizer: API.OperationMethod<
  DescribeEntityRecognizerRequest,
  DescribeEntityRecognizerResponse,
  DescribeEntityRecognizerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { EntityRecognizerArn: 0 },
    output: { EntityRecognizerProperties: o_EntityRecognizerProperties },
  },
  errors: [
    InternalServerException,
    InvalidRequestException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeEntityRecognizer",
})) as any;

export type DescribeEventsDetectionJobError =
  | InternalServerException
  | InvalidRequestException
  | JobNotFoundException
  | TooManyRequestsException
  | NotAuthorizedException
  | CommonErrors;
/**
 * Gets the status and details of an events detection job.
 */
export const describeEventsDetectionJob: API.OperationMethod<
  DescribeEventsDetectionJobRequest,
  DescribeEventsDetectionJobResponse,
  DescribeEventsDetectionJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { JobId: 0 },
    output: { EventsDetectionJobProperties: o_EventsDetectionJobProperties },
  },
  errors: [
    InternalServerException,
    InvalidRequestException,
    JobNotFoundException,
    TooManyRequestsException,
    NotAuthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeEventsDetectionJob",
})) as any;

export type DescribeFlywheelError =
  | InternalServerException
  | InvalidRequestException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Provides configuration information about the flywheel. For more information about flywheels, see
 * Flywheel overview in the *Amazon Comprehend Developer Guide*.
 */
export const describeFlywheel: API.OperationMethod<
  DescribeFlywheelRequest,
  DescribeFlywheelResponse,
  DescribeFlywheelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { FlywheelArn: 0 },
    output: { FlywheelProperties: o_FlywheelProperties },
  },
  errors: [
    InternalServerException,
    InvalidRequestException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeFlywheel",
})) as any;

export type DescribeFlywheelIterationError =
  | InternalServerException
  | InvalidRequestException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieve the configuration properties of a flywheel iteration.
 * For more information about flywheels, see
 * Flywheel overview in the *Amazon Comprehend Developer Guide*.
 */
export const describeFlywheelIteration: API.OperationMethod<
  DescribeFlywheelIterationRequest,
  DescribeFlywheelIterationResponse,
  DescribeFlywheelIterationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { FlywheelArn: 0, FlywheelIterationId: 0 },
    output: { FlywheelIterationProperties: o_FlywheelIterationProperties },
  },
  errors: [
    InternalServerException,
    InvalidRequestException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeFlywheelIteration",
})) as any;

export type DescribeKeyPhrasesDetectionJobError =
  | InternalServerException
  | InvalidRequestException
  | JobNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets the properties associated with a key phrases detection job. Use this operation to get
 * the status of a detection job.
 */
export const describeKeyPhrasesDetectionJob: API.OperationMethod<
  DescribeKeyPhrasesDetectionJobRequest,
  DescribeKeyPhrasesDetectionJobResponse,
  DescribeKeyPhrasesDetectionJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { JobId: 0 },
    output: {
      KeyPhrasesDetectionJobProperties: o_KeyPhrasesDetectionJobProperties,
    },
  },
  errors: [
    InternalServerException,
    InvalidRequestException,
    JobNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeKeyPhrasesDetectionJob",
})) as any;

export type DescribePiiEntitiesDetectionJobError =
  | InternalServerException
  | InvalidRequestException
  | JobNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets the properties associated with a PII entities detection job. For example, you can use
 * this operation to get the job status.
 */
export const describePiiEntitiesDetectionJob: API.OperationMethod<
  DescribePiiEntitiesDetectionJobRequest,
  DescribePiiEntitiesDetectionJobResponse,
  DescribePiiEntitiesDetectionJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { JobId: 0 },
    output: {
      PiiEntitiesDetectionJobProperties: o_PiiEntitiesDetectionJobProperties,
    },
  },
  errors: [
    InternalServerException,
    InvalidRequestException,
    JobNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribePiiEntitiesDetectionJob",
})) as any;

export type DescribeResourcePolicyError =
  | InternalServerException
  | InvalidRequestException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Gets the details of a resource-based policy that is attached to a custom model, including
 * the JSON body of the policy.
 */
export const describeResourcePolicy: API.OperationMethod<
  DescribeResourcePolicyRequest,
  DescribeResourcePolicyResponse,
  DescribeResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ResourceArn: 0 },
    output: { CreationTime: D.ts, LastModifiedTime: D.ts },
  },
  errors: [
    InternalServerException,
    InvalidRequestException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeResourcePolicy",
})) as any;

export type DescribeSentimentDetectionJobError =
  | InternalServerException
  | InvalidRequestException
  | JobNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets the properties associated with a sentiment detection job. Use this operation to get
 * the status of a detection job.
 */
export const describeSentimentDetectionJob: API.OperationMethod<
  DescribeSentimentDetectionJobRequest,
  DescribeSentimentDetectionJobResponse,
  DescribeSentimentDetectionJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { JobId: 0 },
    output: {
      SentimentDetectionJobProperties: o_SentimentDetectionJobProperties,
    },
  },
  errors: [
    InternalServerException,
    InvalidRequestException,
    JobNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeSentimentDetectionJob",
})) as any;

export type DescribeTargetedSentimentDetectionJobError =
  | InternalServerException
  | InvalidRequestException
  | JobNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets the properties associated with a targeted sentiment detection job. Use this operation
 * to get the status of the job.
 */
export const describeTargetedSentimentDetectionJob: API.OperationMethod<
  DescribeTargetedSentimentDetectionJobRequest,
  DescribeTargetedSentimentDetectionJobResponse,
  DescribeTargetedSentimentDetectionJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { JobId: 0 },
    output: {
      TargetedSentimentDetectionJobProperties:
        o_TargetedSentimentDetectionJobProperties,
    },
  },
  errors: [
    InternalServerException,
    InvalidRequestException,
    JobNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeTargetedSentimentDetectionJob",
})) as any;

export type DescribeTopicsDetectionJobError =
  | InternalServerException
  | InvalidRequestException
  | JobNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets the properties associated with a topic detection job. Use this operation to get
 * the status of a detection job.
 */
export const describeTopicsDetectionJob: API.OperationMethod<
  DescribeTopicsDetectionJobRequest,
  DescribeTopicsDetectionJobResponse,
  DescribeTopicsDetectionJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { JobId: 0 },
    output: { TopicsDetectionJobProperties: o_TopicsDetectionJobProperties },
  },
  errors: [
    InternalServerException,
    InvalidRequestException,
    JobNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeTopicsDetectionJob",
})) as any;

export type DetectDominantLanguageError =
  | InternalServerException
  | InvalidRequestException
  | TextSizeLimitExceededException
  | CommonErrors;
/**
 * Determines the dominant language of the input text. For a list of languages that Amazon
 * Comprehend can detect, see Amazon Comprehend Supported Languages.
 */
export const detectDominantLanguage: API.OperationMethod<
  DetectDominantLanguageRequest,
  DetectDominantLanguageResponse,
  DetectDominantLanguageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { Text: 0 } },
  errors: [
    InternalServerException,
    InvalidRequestException,
    TextSizeLimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DetectDominantLanguage",
})) as any;

export type DetectEntitiesError =
  | InternalServerException
  | InvalidRequestException
  | ResourceUnavailableException
  | TextSizeLimitExceededException
  | UnsupportedLanguageException
  | CommonErrors;
/**
 * Detects named entities in input text when you use the pre-trained model.
 * Detects custom entities if you have a custom entity recognition model.
 *
 * When detecting named entities using the pre-trained model, use plain text as the input.
 * For more information about named entities, see
 * Entities in the Comprehend Developer Guide.
 *
 * When you use a custom entity recognition model,
 * you can input plain text or you can upload a single-page input document (text, PDF, Word, or image).
 *
 * If the system detects errors while processing a page in the input document, the API response
 * includes an entry in `Errors` for each error.
 *
 * If the system detects a document-level error in your input document, the API returns an
 * `InvalidRequestException` error response.
 * For details about this exception, see
 *
 * Errors in semi-structured documents in the Comprehend Developer Guide.
 */
export const detectEntities: API.OperationMethod<
  DetectEntitiesRequest,
  DetectEntitiesResponse,
  DetectEntitiesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Text: 0,
      LanguageCode: 0,
      EndpointArn: 0,
      Bytes: 0,
      DocumentReaderConfig: i_DocumentReaderConfig,
    },
  },
  errors: [
    InternalServerException,
    InvalidRequestException,
    ResourceUnavailableException,
    TextSizeLimitExceededException,
    UnsupportedLanguageException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DetectEntities",
})) as any;

export type DetectKeyPhrasesError =
  | InternalServerException
  | InvalidRequestException
  | TextSizeLimitExceededException
  | UnsupportedLanguageException
  | CommonErrors;
/**
 * Detects the key noun phrases found in the text.
 */
export const detectKeyPhrases: API.OperationMethod<
  DetectKeyPhrasesRequest,
  DetectKeyPhrasesResponse,
  DetectKeyPhrasesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { Text: 0, LanguageCode: 0 } },
  errors: [
    InternalServerException,
    InvalidRequestException,
    TextSizeLimitExceededException,
    UnsupportedLanguageException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DetectKeyPhrases",
})) as any;

export type DetectPiiEntitiesError =
  | InternalServerException
  | InvalidRequestException
  | TextSizeLimitExceededException
  | UnsupportedLanguageException
  | CommonErrors;
/**
 * Inspects the input text for entities that contain personally identifiable information
 * (PII) and returns information about them.
 */
export const detectPiiEntities: API.OperationMethod<
  DetectPiiEntitiesRequest,
  DetectPiiEntitiesResponse,
  DetectPiiEntitiesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { Text: 0, LanguageCode: 0 } },
  errors: [
    InternalServerException,
    InvalidRequestException,
    TextSizeLimitExceededException,
    UnsupportedLanguageException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DetectPiiEntities",
})) as any;

export type DetectSentimentError =
  | InternalServerException
  | InvalidRequestException
  | TextSizeLimitExceededException
  | UnsupportedLanguageException
  | CommonErrors;
/**
 * Inspects text and returns an inference of the prevailing sentiment
 * (`POSITIVE`, `NEUTRAL`, `MIXED`, or `NEGATIVE`).
 */
export const detectSentiment: API.OperationMethod<
  DetectSentimentRequest,
  DetectSentimentResponse,
  DetectSentimentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { Text: 0, LanguageCode: 0 } },
  errors: [
    InternalServerException,
    InvalidRequestException,
    TextSizeLimitExceededException,
    UnsupportedLanguageException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DetectSentiment",
})) as any;

export type DetectSyntaxError =
  | InternalServerException
  | InvalidRequestException
  | TextSizeLimitExceededException
  | UnsupportedLanguageException
  | CommonErrors;
/**
 * Inspects text for syntax and the part of speech of words in the document. For more
 * information, see
 * Syntax in the Comprehend Developer Guide.
 */
export const detectSyntax: API.OperationMethod<
  DetectSyntaxRequest,
  DetectSyntaxResponse,
  DetectSyntaxError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { Text: 0, LanguageCode: 0 } },
  errors: [
    InternalServerException,
    InvalidRequestException,
    TextSizeLimitExceededException,
    UnsupportedLanguageException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DetectSyntax",
})) as any;

export type DetectTargetedSentimentError =
  | InternalServerException
  | InvalidRequestException
  | TextSizeLimitExceededException
  | UnsupportedLanguageException
  | CommonErrors;
/**
 * Inspects the input text and returns a sentiment analysis for each entity identified in the text.
 *
 * For more information about targeted sentiment, see Targeted sentiment in the *Amazon Comprehend Developer Guide*.
 */
export const detectTargetedSentiment: API.OperationMethod<
  DetectTargetedSentimentRequest,
  DetectTargetedSentimentResponse,
  DetectTargetedSentimentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { Text: 0, LanguageCode: 0 } },
  errors: [
    InternalServerException,
    InvalidRequestException,
    TextSizeLimitExceededException,
    UnsupportedLanguageException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DetectTargetedSentiment",
})) as any;

export type DetectToxicContentError =
  | InternalServerException
  | InvalidRequestException
  | TextSizeLimitExceededException
  | UnsupportedLanguageException
  | CommonErrors;
/**
 * Performs toxicity analysis on the list of text strings that you provide as input.
 * The API response contains a results list that matches the size of the input list.
 * For more information about toxicity detection, see Toxicity detection in the *Amazon Comprehend Developer Guide*.
 */
export const detectToxicContent: API.OperationMethod<
  DetectToxicContentRequest,
  DetectToxicContentResponse,
  DetectToxicContentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { TextSegments: D.list({ Text: 0 }), LanguageCode: 0 },
  },
  errors: [
    InternalServerException,
    InvalidRequestException,
    TextSizeLimitExceededException,
    UnsupportedLanguageException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DetectToxicContent",
})) as any;

export type ImportModelError =
  | InternalServerException
  | InvalidRequestException
  | KmsKeyValidationException
  | ResourceInUseException
  | ResourceLimitExceededException
  | ResourceNotFoundException
  | ResourceUnavailableException
  | TooManyRequestsException
  | TooManyTagsException
  | CommonErrors;
/**
 * Creates a new custom model that replicates a source custom model that you import. The
 * source model can be in your Amazon Web Services account or another one.
 *
 * If the source model is in another Amazon Web Services account, then it must have a resource-based policy
 * that authorizes you to import it.
 *
 * The source model must be in the same Amazon Web Services Region that you're using when you import. You
 * can't import a model that's in a different Region.
 */
export const importModel: API.OperationMethod<
  ImportModelRequest,
  ImportModelResponse,
  ImportModelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      SourceModelArn: 0,
      ModelName: 0,
      VersionName: 0,
      ModelKmsKeyId: 0,
      DataAccessRoleArn: 0,
      Tags: D.list(i_Tag),
    },
  },
  errors: [
    InternalServerException,
    InvalidRequestException,
    KmsKeyValidationException,
    ResourceInUseException,
    ResourceLimitExceededException,
    ResourceNotFoundException,
    ResourceUnavailableException,
    TooManyRequestsException,
    TooManyTagsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ImportModel",
})) as any;

export type ListDatasetsError =
  | InternalServerException
  | InvalidFilterException
  | InvalidRequestException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * List the datasets that you have configured in this Region. For more information about datasets, see
 * Flywheel overview in the *Amazon Comprehend Developer Guide*.
 */
export const listDatasets: API.PaginatedOperationMethod<
  ListDatasetsRequest,
  ListDatasetsResponse,
  ListDatasetsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      FlywheelArn: 0,
      Filter: {
        Status: 0,
        DatasetType: 0,
        CreationTimeAfter: 0,
        CreationTimeBefore: 0,
      },
      NextToken: 0,
      MaxResults: 0,
    },
    output: { DatasetPropertiesList: D.list(o_DatasetProperties) },
  },
  errors: [
    InternalServerException,
    InvalidFilterException,
    InvalidRequestException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDatasets",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListDocumentClassificationJobsError =
  | InternalServerException
  | InvalidFilterException
  | InvalidRequestException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets a list of the documentation classification jobs that you have submitted.
 */
export const listDocumentClassificationJobs: API.PaginatedOperationMethod<
  ListDocumentClassificationJobsRequest,
  ListDocumentClassificationJobsResponse,
  ListDocumentClassificationJobsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      Filter: {
        JobName: 0,
        JobStatus: 0,
        SubmitTimeBefore: 0,
        SubmitTimeAfter: 0,
      },
      NextToken: 0,
      MaxResults: 0,
    },
    output: {
      DocumentClassificationJobPropertiesList: D.list(
        o_DocumentClassificationJobProperties,
      ),
    },
  },
  errors: [
    InternalServerException,
    InvalidFilterException,
    InvalidRequestException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDocumentClassificationJobs",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListDocumentClassifiersError =
  | InternalServerException
  | InvalidFilterException
  | InvalidRequestException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets a list of the document classifiers that you have created.
 */
export const listDocumentClassifiers: API.PaginatedOperationMethod<
  ListDocumentClassifiersRequest,
  ListDocumentClassifiersResponse,
  ListDocumentClassifiersError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      Filter: {
        Status: 0,
        DocumentClassifierName: 0,
        SubmitTimeBefore: 0,
        SubmitTimeAfter: 0,
      },
      NextToken: 0,
      MaxResults: 0,
    },
    output: {
      DocumentClassifierPropertiesList: D.list(o_DocumentClassifierProperties),
    },
  },
  errors: [
    InternalServerException,
    InvalidFilterException,
    InvalidRequestException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDocumentClassifiers",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListDocumentClassifierSummariesError =
  | InternalServerException
  | InvalidRequestException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets a list of summaries of the document classifiers that you have created
 */
export const listDocumentClassifierSummaries: API.PaginatedOperationMethod<
  ListDocumentClassifierSummariesRequest,
  ListDocumentClassifierSummariesResponse,
  ListDocumentClassifierSummariesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { NextToken: 0, MaxResults: 0 },
    output: {
      DocumentClassifierSummariesList: D.list({ LatestVersionCreatedAt: D.ts }),
    },
  },
  errors: [
    InternalServerException,
    InvalidRequestException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDocumentClassifierSummaries",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListDominantLanguageDetectionJobsError =
  | InternalServerException
  | InvalidFilterException
  | InvalidRequestException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets a list of the dominant language detection jobs that you have submitted.
 */
export const listDominantLanguageDetectionJobs: API.PaginatedOperationMethod<
  ListDominantLanguageDetectionJobsRequest,
  ListDominantLanguageDetectionJobsResponse,
  ListDominantLanguageDetectionJobsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      Filter: {
        JobName: 0,
        JobStatus: 0,
        SubmitTimeBefore: 0,
        SubmitTimeAfter: 0,
      },
      NextToken: 0,
      MaxResults: 0,
    },
    output: {
      DominantLanguageDetectionJobPropertiesList: D.list(
        o_DominantLanguageDetectionJobProperties,
      ),
    },
  },
  errors: [
    InternalServerException,
    InvalidFilterException,
    InvalidRequestException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDominantLanguageDetectionJobs",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListEndpointsError =
  | InternalServerException
  | InvalidRequestException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets a list of all existing endpoints that you've created.
 * For information about endpoints, see Managing endpoints.
 */
export const listEndpoints: API.PaginatedOperationMethod<
  ListEndpointsRequest,
  ListEndpointsResponse,
  ListEndpointsError,
  Credentials | HttpClient.HttpClient,
  EndpointProperties
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      Filter: {
        ModelArn: 0,
        Status: 0,
        CreationTimeBefore: 0,
        CreationTimeAfter: 0,
      },
      NextToken: 0,
      MaxResults: 0,
    },
    output: { EndpointPropertiesList: D.list(o_EndpointProperties) },
  },
  errors: [
    InternalServerException,
    InvalidRequestException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEndpoints",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "EndpointPropertiesList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListEntitiesDetectionJobsError =
  | InternalServerException
  | InvalidFilterException
  | InvalidRequestException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets a list of the entity detection jobs that you have submitted.
 */
export const listEntitiesDetectionJobs: API.PaginatedOperationMethod<
  ListEntitiesDetectionJobsRequest,
  ListEntitiesDetectionJobsResponse,
  ListEntitiesDetectionJobsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      Filter: {
        JobName: 0,
        JobStatus: 0,
        SubmitTimeBefore: 0,
        SubmitTimeAfter: 0,
      },
      NextToken: 0,
      MaxResults: 0,
    },
    output: {
      EntitiesDetectionJobPropertiesList: D.list(
        o_EntitiesDetectionJobProperties,
      ),
    },
  },
  errors: [
    InternalServerException,
    InvalidFilterException,
    InvalidRequestException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEntitiesDetectionJobs",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListEntityRecognizersError =
  | InternalServerException
  | InvalidFilterException
  | InvalidRequestException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets a list of the properties of all entity recognizers that you created, including
 * recognizers currently in training. Allows you to filter the list of recognizers based on
 * criteria such as status and submission time. This call returns up to 500 entity recognizers in
 * the list, with a default number of 100 recognizers in the list.
 *
 * The results of this list are not in any particular order. Please get the list and sort
 * locally if needed.
 */
export const listEntityRecognizers: API.PaginatedOperationMethod<
  ListEntityRecognizersRequest,
  ListEntityRecognizersResponse,
  ListEntityRecognizersError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      Filter: {
        Status: 0,
        RecognizerName: 0,
        SubmitTimeBefore: 0,
        SubmitTimeAfter: 0,
      },
      NextToken: 0,
      MaxResults: 0,
    },
    output: {
      EntityRecognizerPropertiesList: D.list(o_EntityRecognizerProperties),
    },
  },
  errors: [
    InternalServerException,
    InvalidFilterException,
    InvalidRequestException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEntityRecognizers",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListEntityRecognizerSummariesError =
  | InternalServerException
  | InvalidRequestException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets a list of summaries for the entity recognizers that you have created.
 */
export const listEntityRecognizerSummaries: API.PaginatedOperationMethod<
  ListEntityRecognizerSummariesRequest,
  ListEntityRecognizerSummariesResponse,
  ListEntityRecognizerSummariesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { NextToken: 0, MaxResults: 0 },
    output: {
      EntityRecognizerSummariesList: D.list({ LatestVersionCreatedAt: D.ts }),
    },
  },
  errors: [
    InternalServerException,
    InvalidRequestException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEntityRecognizerSummaries",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListEventsDetectionJobsError =
  | InternalServerException
  | InvalidFilterException
  | InvalidRequestException
  | TooManyRequestsException
  | NotAuthorizedException
  | CommonErrors;
/**
 * Gets a list of the events detection jobs that you have submitted.
 */
export const listEventsDetectionJobs: API.PaginatedOperationMethod<
  ListEventsDetectionJobsRequest,
  ListEventsDetectionJobsResponse,
  ListEventsDetectionJobsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      Filter: {
        JobName: 0,
        JobStatus: 0,
        SubmitTimeBefore: 0,
        SubmitTimeAfter: 0,
      },
      NextToken: 0,
      MaxResults: 0,
    },
    output: {
      EventsDetectionJobPropertiesList: D.list(o_EventsDetectionJobProperties),
    },
  },
  errors: [
    InternalServerException,
    InvalidFilterException,
    InvalidRequestException,
    TooManyRequestsException,
    NotAuthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEventsDetectionJobs",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListFlywheelIterationHistoryError =
  | InternalServerException
  | InvalidFilterException
  | InvalidRequestException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Information about the history of a flywheel iteration.
 * For more information about flywheels, see
 * Flywheel overview in the *Amazon Comprehend Developer Guide*.
 */
export const listFlywheelIterationHistory: API.PaginatedOperationMethod<
  ListFlywheelIterationHistoryRequest,
  ListFlywheelIterationHistoryResponse,
  ListFlywheelIterationHistoryError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      FlywheelArn: 0,
      Filter: { CreationTimeAfter: 0, CreationTimeBefore: 0 },
      NextToken: 0,
      MaxResults: 0,
    },
    output: {
      FlywheelIterationPropertiesList: D.list(o_FlywheelIterationProperties),
    },
  },
  errors: [
    InternalServerException,
    InvalidFilterException,
    InvalidRequestException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListFlywheelIterationHistory",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListFlywheelsError =
  | InternalServerException
  | InvalidFilterException
  | InvalidRequestException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets a list of the flywheels that you have created.
 */
export const listFlywheels: API.PaginatedOperationMethod<
  ListFlywheelsRequest,
  ListFlywheelsResponse,
  ListFlywheelsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      Filter: { Status: 0, CreationTimeAfter: 0, CreationTimeBefore: 0 },
      NextToken: 0,
      MaxResults: 0,
    },
    output: {
      FlywheelSummaryList: D.list({
        CreationTime: D.ts,
        LastModifiedTime: D.ts,
      }),
    },
  },
  errors: [
    InternalServerException,
    InvalidFilterException,
    InvalidRequestException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListFlywheels",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListKeyPhrasesDetectionJobsError =
  | InternalServerException
  | InvalidFilterException
  | InvalidRequestException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Get a list of key phrase detection jobs that you have submitted.
 */
export const listKeyPhrasesDetectionJobs: API.PaginatedOperationMethod<
  ListKeyPhrasesDetectionJobsRequest,
  ListKeyPhrasesDetectionJobsResponse,
  ListKeyPhrasesDetectionJobsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      Filter: {
        JobName: 0,
        JobStatus: 0,
        SubmitTimeBefore: 0,
        SubmitTimeAfter: 0,
      },
      NextToken: 0,
      MaxResults: 0,
    },
    output: {
      KeyPhrasesDetectionJobPropertiesList: D.list(
        o_KeyPhrasesDetectionJobProperties,
      ),
    },
  },
  errors: [
    InternalServerException,
    InvalidFilterException,
    InvalidRequestException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListKeyPhrasesDetectionJobs",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListPiiEntitiesDetectionJobsError =
  | InternalServerException
  | InvalidFilterException
  | InvalidRequestException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets a list of the PII entity detection jobs that you have submitted.
 */
export const listPiiEntitiesDetectionJobs: API.PaginatedOperationMethod<
  ListPiiEntitiesDetectionJobsRequest,
  ListPiiEntitiesDetectionJobsResponse,
  ListPiiEntitiesDetectionJobsError,
  Credentials | HttpClient.HttpClient,
  PiiEntitiesDetectionJobProperties
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      Filter: {
        JobName: 0,
        JobStatus: 0,
        SubmitTimeBefore: 0,
        SubmitTimeAfter: 0,
      },
      NextToken: 0,
      MaxResults: 0,
    },
    output: {
      PiiEntitiesDetectionJobPropertiesList: D.list(
        o_PiiEntitiesDetectionJobProperties,
      ),
    },
  },
  errors: [
    InternalServerException,
    InvalidFilterException,
    InvalidRequestException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPiiEntitiesDetectionJobs",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "PiiEntitiesDetectionJobPropertiesList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListSentimentDetectionJobsError =
  | InternalServerException
  | InvalidFilterException
  | InvalidRequestException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets a list of sentiment detection jobs that you have submitted.
 */
export const listSentimentDetectionJobs: API.PaginatedOperationMethod<
  ListSentimentDetectionJobsRequest,
  ListSentimentDetectionJobsResponse,
  ListSentimentDetectionJobsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      Filter: {
        JobName: 0,
        JobStatus: 0,
        SubmitTimeBefore: 0,
        SubmitTimeAfter: 0,
      },
      NextToken: 0,
      MaxResults: 0,
    },
    output: {
      SentimentDetectionJobPropertiesList: D.list(
        o_SentimentDetectionJobProperties,
      ),
    },
  },
  errors: [
    InternalServerException,
    InvalidFilterException,
    InvalidRequestException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSentimentDetectionJobs",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | InternalServerException
  | InvalidRequestException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Lists all tags associated with a given Amazon Comprehend resource.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceArn: 0 } },
  errors: [
    InternalServerException,
    InvalidRequestException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

export type ListTargetedSentimentDetectionJobsError =
  | InternalServerException
  | InvalidFilterException
  | InvalidRequestException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets a list of targeted sentiment detection jobs that you have submitted.
 */
export const listTargetedSentimentDetectionJobs: API.PaginatedOperationMethod<
  ListTargetedSentimentDetectionJobsRequest,
  ListTargetedSentimentDetectionJobsResponse,
  ListTargetedSentimentDetectionJobsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      Filter: {
        JobName: 0,
        JobStatus: 0,
        SubmitTimeBefore: 0,
        SubmitTimeAfter: 0,
      },
      NextToken: 0,
      MaxResults: 0,
    },
    output: {
      TargetedSentimentDetectionJobPropertiesList: D.list(
        o_TargetedSentimentDetectionJobProperties,
      ),
    },
  },
  errors: [
    InternalServerException,
    InvalidFilterException,
    InvalidRequestException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTargetedSentimentDetectionJobs",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTopicsDetectionJobsError =
  | InternalServerException
  | InvalidFilterException
  | InvalidRequestException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets a list of the topic detection jobs that you have submitted.
 */
export const listTopicsDetectionJobs: API.PaginatedOperationMethod<
  ListTopicsDetectionJobsRequest,
  ListTopicsDetectionJobsResponse,
  ListTopicsDetectionJobsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      Filter: {
        JobName: 0,
        JobStatus: 0,
        SubmitTimeBefore: 0,
        SubmitTimeAfter: 0,
      },
      NextToken: 0,
      MaxResults: 0,
    },
    output: {
      TopicsDetectionJobPropertiesList: D.list(o_TopicsDetectionJobProperties),
    },
  },
  errors: [
    InternalServerException,
    InvalidFilterException,
    InvalidRequestException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTopicsDetectionJobs",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type PutResourcePolicyError =
  | InternalServerException
  | InvalidRequestException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Attaches a resource-based policy to a custom model. You can use this policy to authorize
 * an entity in another Amazon Web Services account to import the custom model, which replicates it in Amazon
 * Comprehend in their account.
 */
export const putResourcePolicy: API.OperationMethod<
  PutResourcePolicyRequest,
  PutResourcePolicyResponse,
  PutResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ResourceArn: 0, ResourcePolicy: 0, PolicyRevisionId: 0 },
  },
  errors: [
    InternalServerException,
    InvalidRequestException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutResourcePolicy",
})) as any;

export type StartDocumentClassificationJobError =
  | InternalServerException
  | InvalidRequestException
  | KmsKeyValidationException
  | ResourceInUseException
  | ResourceNotFoundException
  | ResourceUnavailableException
  | TooManyRequestsException
  | TooManyTagsException
  | CommonErrors;
/**
 * Starts an asynchronous document classification job using a custom classification model. Use the
 * `DescribeDocumentClassificationJob`
 * operation to track the progress of the job.
 */
export const startDocumentClassificationJob: API.OperationMethod<
  StartDocumentClassificationJobRequest,
  StartDocumentClassificationJobResponse,
  StartDocumentClassificationJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      JobName: 0,
      DocumentClassifierArn: 0,
      InputDataConfig: i_InputDataConfig,
      OutputDataConfig: i_OutputDataConfig,
      DataAccessRoleArn: 0,
      ClientRequestToken: D.m({ idempotency: true }),
      VolumeKmsKeyId: 0,
      VpcConfig: i_VpcConfig,
      Tags: D.list(i_Tag),
      FlywheelArn: 0,
    },
  },
  errors: [
    InternalServerException,
    InvalidRequestException,
    KmsKeyValidationException,
    ResourceInUseException,
    ResourceNotFoundException,
    ResourceUnavailableException,
    TooManyRequestsException,
    TooManyTagsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartDocumentClassificationJob",
})) as any;

export type StartDominantLanguageDetectionJobError =
  | InternalServerException
  | InvalidRequestException
  | KmsKeyValidationException
  | ResourceInUseException
  | TooManyRequestsException
  | TooManyTagsException
  | CommonErrors;
/**
 * Starts an asynchronous dominant language detection job for a collection of documents. Use
 * the operation to track the status
 * of a job.
 */
export const startDominantLanguageDetectionJob: API.OperationMethod<
  StartDominantLanguageDetectionJobRequest,
  StartDominantLanguageDetectionJobResponse,
  StartDominantLanguageDetectionJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      InputDataConfig: i_InputDataConfig,
      OutputDataConfig: i_OutputDataConfig,
      DataAccessRoleArn: 0,
      JobName: 0,
      ClientRequestToken: D.m({ idempotency: true }),
      VolumeKmsKeyId: 0,
      VpcConfig: i_VpcConfig,
      Tags: D.list(i_Tag),
    },
  },
  errors: [
    InternalServerException,
    InvalidRequestException,
    KmsKeyValidationException,
    ResourceInUseException,
    TooManyRequestsException,
    TooManyTagsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartDominantLanguageDetectionJob",
})) as any;

export type StartEntitiesDetectionJobError =
  | InternalServerException
  | InvalidRequestException
  | KmsKeyValidationException
  | ResourceInUseException
  | ResourceNotFoundException
  | ResourceUnavailableException
  | TooManyRequestsException
  | TooManyTagsException
  | CommonErrors;
/**
 * Starts an asynchronous entity detection job for a collection of documents. Use the operation to track the status of a job.
 *
 * This API can be used for either standard entity detection or custom entity recognition. In
 * order to be used for custom entity recognition, the optional `EntityRecognizerArn`
 * must be used in order to provide access to the recognizer being used to detect the custom
 * entity.
 */
export const startEntitiesDetectionJob: API.OperationMethod<
  StartEntitiesDetectionJobRequest,
  StartEntitiesDetectionJobResponse,
  StartEntitiesDetectionJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      InputDataConfig: i_InputDataConfig,
      OutputDataConfig: i_OutputDataConfig,
      DataAccessRoleArn: 0,
      JobName: 0,
      EntityRecognizerArn: 0,
      LanguageCode: 0,
      ClientRequestToken: D.m({ idempotency: true }),
      VolumeKmsKeyId: 0,
      VpcConfig: i_VpcConfig,
      Tags: D.list(i_Tag),
      FlywheelArn: 0,
    },
  },
  errors: [
    InternalServerException,
    InvalidRequestException,
    KmsKeyValidationException,
    ResourceInUseException,
    ResourceNotFoundException,
    ResourceUnavailableException,
    TooManyRequestsException,
    TooManyTagsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartEntitiesDetectionJob",
})) as any;

export type StartEventsDetectionJobError =
  | InternalServerException
  | InvalidRequestException
  | KmsKeyValidationException
  | ResourceInUseException
  | TooManyRequestsException
  | TooManyTagsException
  | NotAuthorizedException
  | CommonErrors;
/**
 * Starts an asynchronous event detection job for a collection of documents.
 */
export const startEventsDetectionJob: API.OperationMethod<
  StartEventsDetectionJobRequest,
  StartEventsDetectionJobResponse,
  StartEventsDetectionJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      InputDataConfig: i_InputDataConfig,
      OutputDataConfig: i_OutputDataConfig,
      DataAccessRoleArn: 0,
      JobName: 0,
      LanguageCode: 0,
      ClientRequestToken: D.m({ idempotency: true }),
      TargetEventTypes: 0,
      Tags: D.list(i_Tag),
    },
  },
  errors: [
    InternalServerException,
    InvalidRequestException,
    KmsKeyValidationException,
    ResourceInUseException,
    TooManyRequestsException,
    TooManyTagsException,
    NotAuthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartEventsDetectionJob",
})) as any;

export type StartFlywheelIterationError =
  | InternalServerException
  | InvalidRequestException
  | ResourceInUseException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Start the flywheel iteration.This operation uses any new datasets to train a new model version.
 * For more information about flywheels, see
 * Flywheel overview in the *Amazon Comprehend Developer Guide*.
 */
export const startFlywheelIteration: API.OperationMethod<
  StartFlywheelIterationRequest,
  StartFlywheelIterationResponse,
  StartFlywheelIterationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { FlywheelArn: 0, ClientRequestToken: 0 },
  },
  errors: [
    InternalServerException,
    InvalidRequestException,
    ResourceInUseException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartFlywheelIteration",
})) as any;

export type StartKeyPhrasesDetectionJobError =
  | InternalServerException
  | InvalidRequestException
  | KmsKeyValidationException
  | ResourceInUseException
  | TooManyRequestsException
  | TooManyTagsException
  | CommonErrors;
/**
 * Starts an asynchronous key phrase detection job for a collection of documents. Use the
 * operation to track the status of a
 * job.
 */
export const startKeyPhrasesDetectionJob: API.OperationMethod<
  StartKeyPhrasesDetectionJobRequest,
  StartKeyPhrasesDetectionJobResponse,
  StartKeyPhrasesDetectionJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      InputDataConfig: i_InputDataConfig,
      OutputDataConfig: i_OutputDataConfig,
      DataAccessRoleArn: 0,
      JobName: 0,
      LanguageCode: 0,
      ClientRequestToken: D.m({ idempotency: true }),
      VolumeKmsKeyId: 0,
      VpcConfig: i_VpcConfig,
      Tags: D.list(i_Tag),
    },
  },
  errors: [
    InternalServerException,
    InvalidRequestException,
    KmsKeyValidationException,
    ResourceInUseException,
    TooManyRequestsException,
    TooManyTagsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartKeyPhrasesDetectionJob",
})) as any;

export type StartPiiEntitiesDetectionJobError =
  | InternalServerException
  | InvalidRequestException
  | KmsKeyValidationException
  | ResourceInUseException
  | TooManyRequestsException
  | TooManyTagsException
  | CommonErrors;
/**
 * Starts an asynchronous PII entity detection job for a collection of documents.
 */
export const startPiiEntitiesDetectionJob: API.OperationMethod<
  StartPiiEntitiesDetectionJobRequest,
  StartPiiEntitiesDetectionJobResponse,
  StartPiiEntitiesDetectionJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      InputDataConfig: i_InputDataConfig,
      OutputDataConfig: i_OutputDataConfig,
      Mode: 0,
      RedactionConfig: { PiiEntityTypes: 0, MaskMode: 0, MaskCharacter: 0 },
      DataAccessRoleArn: 0,
      JobName: 0,
      LanguageCode: 0,
      ClientRequestToken: D.m({ idempotency: true }),
      Tags: D.list(i_Tag),
    },
  },
  errors: [
    InternalServerException,
    InvalidRequestException,
    KmsKeyValidationException,
    ResourceInUseException,
    TooManyRequestsException,
    TooManyTagsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartPiiEntitiesDetectionJob",
})) as any;

export type StartSentimentDetectionJobError =
  | InternalServerException
  | InvalidRequestException
  | KmsKeyValidationException
  | ResourceInUseException
  | TooManyRequestsException
  | TooManyTagsException
  | CommonErrors;
/**
 * Starts an asynchronous sentiment detection job for a collection of documents. Use the
 * operation to track the status of a
 * job.
 */
export const startSentimentDetectionJob: API.OperationMethod<
  StartSentimentDetectionJobRequest,
  StartSentimentDetectionJobResponse,
  StartSentimentDetectionJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      InputDataConfig: i_InputDataConfig,
      OutputDataConfig: i_OutputDataConfig,
      DataAccessRoleArn: 0,
      JobName: 0,
      LanguageCode: 0,
      ClientRequestToken: D.m({ idempotency: true }),
      VolumeKmsKeyId: 0,
      VpcConfig: i_VpcConfig,
      Tags: D.list(i_Tag),
    },
  },
  errors: [
    InternalServerException,
    InvalidRequestException,
    KmsKeyValidationException,
    ResourceInUseException,
    TooManyRequestsException,
    TooManyTagsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartSentimentDetectionJob",
})) as any;

export type StartTargetedSentimentDetectionJobError =
  | InternalServerException
  | InvalidRequestException
  | KmsKeyValidationException
  | ResourceInUseException
  | TooManyRequestsException
  | TooManyTagsException
  | CommonErrors;
/**
 * Starts an asynchronous targeted sentiment detection job for a collection of documents. Use the
 * `DescribeTargetedSentimentDetectionJob` operation to track the status of a
 * job.
 */
export const startTargetedSentimentDetectionJob: API.OperationMethod<
  StartTargetedSentimentDetectionJobRequest,
  StartTargetedSentimentDetectionJobResponse,
  StartTargetedSentimentDetectionJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      InputDataConfig: i_InputDataConfig,
      OutputDataConfig: i_OutputDataConfig,
      DataAccessRoleArn: 0,
      JobName: 0,
      LanguageCode: 0,
      ClientRequestToken: D.m({ idempotency: true }),
      VolumeKmsKeyId: 0,
      VpcConfig: i_VpcConfig,
      Tags: D.list(i_Tag),
    },
  },
  errors: [
    InternalServerException,
    InvalidRequestException,
    KmsKeyValidationException,
    ResourceInUseException,
    TooManyRequestsException,
    TooManyTagsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartTargetedSentimentDetectionJob",
})) as any;

export type StartTopicsDetectionJobError =
  | InternalServerException
  | InvalidRequestException
  | KmsKeyValidationException
  | ResourceInUseException
  | TooManyRequestsException
  | TooManyTagsException
  | CommonErrors;
/**
 * Starts an asynchronous topic detection job. Use the
 * `DescribeTopicDetectionJob` operation to track the status of a job.
 */
export const startTopicsDetectionJob: API.OperationMethod<
  StartTopicsDetectionJobRequest,
  StartTopicsDetectionJobResponse,
  StartTopicsDetectionJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      InputDataConfig: i_InputDataConfig,
      OutputDataConfig: i_OutputDataConfig,
      DataAccessRoleArn: 0,
      JobName: 0,
      NumberOfTopics: 0,
      ClientRequestToken: D.m({ idempotency: true }),
      VolumeKmsKeyId: 0,
      VpcConfig: i_VpcConfig,
      Tags: D.list(i_Tag),
    },
  },
  errors: [
    InternalServerException,
    InvalidRequestException,
    KmsKeyValidationException,
    ResourceInUseException,
    TooManyRequestsException,
    TooManyTagsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartTopicsDetectionJob",
})) as any;

export type StopDominantLanguageDetectionJobError =
  | InternalServerException
  | InvalidRequestException
  | JobNotFoundException
  | CommonErrors;
/**
 * Stops a dominant language detection job in progress.
 *
 * If the job state is `IN_PROGRESS` the job is marked for termination and put
 * into the `STOP_REQUESTED` state. If the job completes before it can be stopped, it
 * is put into the `COMPLETED` state; otherwise the job is stopped and put into the
 * `STOPPED` state.
 *
 * If the job is in the `COMPLETED` or `FAILED` state when you call the
 * `StopDominantLanguageDetectionJob` operation, the operation returns a 400
 * Internal Request Exception.
 *
 * When a job is stopped, any documents already processed are written to the output
 * location.
 */
export const stopDominantLanguageDetectionJob: API.OperationMethod<
  StopDominantLanguageDetectionJobRequest,
  StopDominantLanguageDetectionJobResponse,
  StopDominantLanguageDetectionJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { JobId: 0 } },
  errors: [
    InternalServerException,
    InvalidRequestException,
    JobNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopDominantLanguageDetectionJob",
})) as any;

export type StopEntitiesDetectionJobError =
  | InternalServerException
  | InvalidRequestException
  | JobNotFoundException
  | CommonErrors;
/**
 * Stops an entities detection job in progress.
 *
 * If the job state is `IN_PROGRESS` the job is marked for termination and put
 * into the `STOP_REQUESTED` state. If the job completes before it can be stopped, it
 * is put into the `COMPLETED` state; otherwise the job is stopped and put into the
 * `STOPPED` state.
 *
 * If the job is in the `COMPLETED` or `FAILED` state when you call the
 * `StopDominantLanguageDetectionJob` operation, the operation returns a 400
 * Internal Request Exception.
 *
 * When a job is stopped, any documents already processed are written to the output
 * location.
 */
export const stopEntitiesDetectionJob: API.OperationMethod<
  StopEntitiesDetectionJobRequest,
  StopEntitiesDetectionJobResponse,
  StopEntitiesDetectionJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { JobId: 0 } },
  errors: [
    InternalServerException,
    InvalidRequestException,
    JobNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopEntitiesDetectionJob",
})) as any;

export type StopEventsDetectionJobError =
  | InternalServerException
  | InvalidRequestException
  | JobNotFoundException
  | NotAuthorizedException
  | CommonErrors;
/**
 * Stops an events detection job in progress.
 */
export const stopEventsDetectionJob: API.OperationMethod<
  StopEventsDetectionJobRequest,
  StopEventsDetectionJobResponse,
  StopEventsDetectionJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { JobId: 0 } },
  errors: [
    InternalServerException,
    InvalidRequestException,
    JobNotFoundException,
    NotAuthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopEventsDetectionJob",
})) as any;

export type StopKeyPhrasesDetectionJobError =
  | InternalServerException
  | InvalidRequestException
  | JobNotFoundException
  | CommonErrors;
/**
 * Stops a key phrases detection job in progress.
 *
 * If the job state is `IN_PROGRESS` the job is marked for termination and put
 * into the `STOP_REQUESTED` state. If the job completes before it can be stopped, it
 * is put into the `COMPLETED` state; otherwise the job is stopped and put into the
 * `STOPPED` state.
 *
 * If the job is in the `COMPLETED` or `FAILED` state when you call the
 * `StopDominantLanguageDetectionJob` operation, the operation returns a 400
 * Internal Request Exception.
 *
 * When a job is stopped, any documents already processed are written to the output
 * location.
 */
export const stopKeyPhrasesDetectionJob: API.OperationMethod<
  StopKeyPhrasesDetectionJobRequest,
  StopKeyPhrasesDetectionJobResponse,
  StopKeyPhrasesDetectionJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { JobId: 0 } },
  errors: [
    InternalServerException,
    InvalidRequestException,
    JobNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopKeyPhrasesDetectionJob",
})) as any;

export type StopPiiEntitiesDetectionJobError =
  | InternalServerException
  | InvalidRequestException
  | JobNotFoundException
  | CommonErrors;
/**
 * Stops a PII entities detection job in progress.
 */
export const stopPiiEntitiesDetectionJob: API.OperationMethod<
  StopPiiEntitiesDetectionJobRequest,
  StopPiiEntitiesDetectionJobResponse,
  StopPiiEntitiesDetectionJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { JobId: 0 } },
  errors: [
    InternalServerException,
    InvalidRequestException,
    JobNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopPiiEntitiesDetectionJob",
})) as any;

export type StopSentimentDetectionJobError =
  | InternalServerException
  | InvalidRequestException
  | JobNotFoundException
  | CommonErrors;
/**
 * Stops a sentiment detection job in progress.
 *
 * If the job state is `IN_PROGRESS`, the job is marked for termination and put
 * into the `STOP_REQUESTED` state. If the job completes before it can be stopped, it
 * is put into the `COMPLETED` state; otherwise the job is be stopped and put into the
 * `STOPPED` state.
 *
 * If the job is in the `COMPLETED` or `FAILED` state when you call the
 * `StopDominantLanguageDetectionJob` operation, the operation returns a 400
 * Internal Request Exception.
 *
 * When a job is stopped, any documents already processed are written to the output
 * location.
 */
export const stopSentimentDetectionJob: API.OperationMethod<
  StopSentimentDetectionJobRequest,
  StopSentimentDetectionJobResponse,
  StopSentimentDetectionJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { JobId: 0 } },
  errors: [
    InternalServerException,
    InvalidRequestException,
    JobNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopSentimentDetectionJob",
})) as any;

export type StopTargetedSentimentDetectionJobError =
  | InternalServerException
  | InvalidRequestException
  | JobNotFoundException
  | CommonErrors;
/**
 * Stops a targeted sentiment detection job in progress.
 *
 * If the job state is `IN_PROGRESS`, the job is marked for termination and put
 * into the `STOP_REQUESTED` state. If the job completes before it can be stopped, it
 * is put into the `COMPLETED` state; otherwise the job is be stopped and put into the
 * `STOPPED` state.
 *
 * If the job is in the `COMPLETED` or `FAILED` state when you call the
 * `StopDominantLanguageDetectionJob` operation, the operation returns a 400
 * Internal Request Exception.
 *
 * When a job is stopped, any documents already processed are written to the output
 * location.
 */
export const stopTargetedSentimentDetectionJob: API.OperationMethod<
  StopTargetedSentimentDetectionJobRequest,
  StopTargetedSentimentDetectionJobResponse,
  StopTargetedSentimentDetectionJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { JobId: 0 } },
  errors: [
    InternalServerException,
    InvalidRequestException,
    JobNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopTargetedSentimentDetectionJob",
})) as any;

export type StopTrainingDocumentClassifierError =
  | InternalServerException
  | InvalidRequestException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Stops a document classifier training job while in progress.
 *
 * If the training job state is `TRAINING`, the job is marked for termination and
 * put into the `STOP_REQUESTED` state. If the training job completes before it can be
 * stopped, it is put into the `TRAINED`; otherwise the training job is stopped and
 * put into the `STOPPED` state and the service sends back an HTTP 200 response with
 * an empty HTTP body.
 */
export const stopTrainingDocumentClassifier: API.OperationMethod<
  StopTrainingDocumentClassifierRequest,
  StopTrainingDocumentClassifierResponse,
  StopTrainingDocumentClassifierError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { DocumentClassifierArn: 0 } },
  errors: [
    InternalServerException,
    InvalidRequestException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopTrainingDocumentClassifier",
})) as any;

export type StopTrainingEntityRecognizerError =
  | InternalServerException
  | InvalidRequestException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Stops an entity recognizer training job while in progress.
 *
 * If the training job state is `TRAINING`, the job is marked for termination and
 * put into the `STOP_REQUESTED` state. If the training job completes before it can be
 * stopped, it is put into the `TRAINED`; otherwise the training job is stopped and
 * putted into the `STOPPED` state and the service sends back an HTTP 200 response
 * with an empty HTTP body.
 */
export const stopTrainingEntityRecognizer: API.OperationMethod<
  StopTrainingEntityRecognizerRequest,
  StopTrainingEntityRecognizerResponse,
  StopTrainingEntityRecognizerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { EntityRecognizerArn: 0 } },
  errors: [
    InternalServerException,
    InvalidRequestException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopTrainingEntityRecognizer",
})) as any;

export type TagResourceError =
  | ConcurrentModificationException
  | InternalServerException
  | InvalidRequestException
  | ResourceNotFoundException
  | TooManyTagsException
  | CommonErrors;
/**
 * Associates a specific tag with an Amazon Comprehend resource. A tag is a key-value pair
 * that adds as a metadata to a resource used by Amazon Comprehend. For example, a tag with
 * "Sales" as the key might be added to a resource to indicate its use by the sales department.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceArn: 0, Tags: D.list(i_Tag) } },
  errors: [
    ConcurrentModificationException,
    InternalServerException,
    InvalidRequestException,
    ResourceNotFoundException,
    TooManyTagsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

export type UntagResourceError =
  | ConcurrentModificationException
  | InternalServerException
  | InvalidRequestException
  | ResourceNotFoundException
  | TooManyTagKeysException
  | CommonErrors;
/**
 * Removes a specific tag associated with an Amazon Comprehend resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceArn: 0, TagKeys: 0 } },
  errors: [
    ConcurrentModificationException,
    InternalServerException,
    InvalidRequestException,
    ResourceNotFoundException,
    TooManyTagKeysException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

export type UpdateEndpointError =
  | InternalServerException
  | InvalidRequestException
  | ResourceInUseException
  | ResourceLimitExceededException
  | ResourceNotFoundException
  | ResourceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates information about the specified endpoint.
 * For information about endpoints, see Managing endpoints.
 */
export const updateEndpoint: API.OperationMethod<
  UpdateEndpointRequest,
  UpdateEndpointResponse,
  UpdateEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      EndpointArn: 0,
      DesiredModelArn: 0,
      DesiredInferenceUnits: 0,
      DesiredDataAccessRoleArn: 0,
      FlywheelArn: 0,
    },
  },
  errors: [
    InternalServerException,
    InvalidRequestException,
    ResourceInUseException,
    ResourceLimitExceededException,
    ResourceNotFoundException,
    ResourceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateEndpoint",
})) as any;

export type UpdateFlywheelError =
  | InternalServerException
  | InvalidRequestException
  | KmsKeyValidationException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Update the configuration information for an existing flywheel.
 */
export const updateFlywheel: API.OperationMethod<
  UpdateFlywheelRequest,
  UpdateFlywheelResponse,
  UpdateFlywheelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      FlywheelArn: 0,
      ActiveModelArn: 0,
      DataAccessRoleArn: 0,
      DataSecurityConfig: {
        ModelKmsKeyId: 0,
        VolumeKmsKeyId: 0,
        VpcConfig: i_VpcConfig,
      },
    },
    output: { FlywheelProperties: o_FlywheelProperties },
  },
  errors: [
    InternalServerException,
    InvalidRequestException,
    KmsKeyValidationException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateFlywheel",
})) as any;

const i_AugmentedManifestsListItem: D.LazyStruct = () => ({
  S3Uri: 0,
  Split: 0,
  AttributeNames: 0,
  AnnotationDataS3Uri: 0,
  SourceDocumentsS3Uri: 0,
  DocumentType: 0,
});
const i_DocumentReaderConfig: D.LazyStruct = () => ({
  DocumentReadAction: 0,
  DocumentReadMode: 0,
  FeatureTypes: 0,
});
const i_EntityTypesListItem: D.LazyStruct = () => ({ Type: 0 });
const i_InputDataConfig: D.LazyStruct = () => ({
  S3Uri: 0,
  InputFormat: 0,
  DocumentReaderConfig: i_DocumentReaderConfig,
});
const i_OutputDataConfig: D.LazyStruct = () => ({ S3Uri: 0, KmsKeyId: 0 });
const i_Tag: D.LazyStruct = () => ({ Key: 0, Value: 0 });
const i_VpcConfig: D.LazyStruct = () => ({ SecurityGroupIds: 0, Subnets: 0 });
const o_DatasetProperties: D.LazyStruct = () => ({
  CreationTime: D.ts,
  EndTime: D.ts,
});
const o_DocumentClassificationJobProperties: D.LazyStruct = () => ({
  SubmitTime: D.ts,
  EndTime: D.ts,
});
const o_DocumentClassifierProperties: D.LazyStruct = () => ({
  SubmitTime: D.ts,
  EndTime: D.ts,
  TrainingStartTime: D.ts,
  TrainingEndTime: D.ts,
});
const o_DominantLanguageDetectionJobProperties: D.LazyStruct = () => ({
  SubmitTime: D.ts,
  EndTime: D.ts,
});
const o_EndpointProperties: D.LazyStruct = () => ({
  CreationTime: D.ts,
  LastModifiedTime: D.ts,
});
const o_EntitiesDetectionJobProperties: D.LazyStruct = () => ({
  SubmitTime: D.ts,
  EndTime: D.ts,
});
const o_EntityRecognizerProperties: D.LazyStruct = () => ({
  SubmitTime: D.ts,
  EndTime: D.ts,
  TrainingStartTime: D.ts,
  TrainingEndTime: D.ts,
});
const o_EventsDetectionJobProperties: D.LazyStruct = () => ({
  SubmitTime: D.ts,
  EndTime: D.ts,
});
const o_FlywheelIterationProperties: D.LazyStruct = () => ({
  CreationTime: D.ts,
  EndTime: D.ts,
});
const o_FlywheelProperties: D.LazyStruct = () => ({
  CreationTime: D.ts,
  LastModifiedTime: D.ts,
});
const o_KeyPhrasesDetectionJobProperties: D.LazyStruct = () => ({
  SubmitTime: D.ts,
  EndTime: D.ts,
});
const o_PiiEntitiesDetectionJobProperties: D.LazyStruct = () => ({
  SubmitTime: D.ts,
  EndTime: D.ts,
});
const o_SentimentDetectionJobProperties: D.LazyStruct = () => ({
  SubmitTime: D.ts,
  EndTime: D.ts,
});
const o_TargetedSentimentDetectionJobProperties: D.LazyStruct = () => ({
  SubmitTime: D.ts,
  EndTime: D.ts,
});
const o_TopicsDetectionJobProperties: D.LazyStruct = () => ({
  SubmitTime: D.ts,
  EndTime: D.ts,
});
