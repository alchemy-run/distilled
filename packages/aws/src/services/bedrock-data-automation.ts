import type * as HttpClient from "effect/unstable/http/HttpClient";
import type * as redacted from "effect/Redacted";
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
  sdkId: "Bedrock Data Automation",
  target: "AmazonBedrockKeystoneBuildTimeService",
  version: "2023-07-26",
  sigv4: "bedrock",
  protocol: restJson1Protocol,
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
                `https://bedrock-data-automation-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://bedrock-data-automation-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://bedrock-data-automation.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://bedrock-data-automation.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class AccessDeniedException
  extends /*@__PURE__*/ TE.TaggedError("AccessDeniedException", ["AuthError"], {
    status: 403,
  })<{ readonly message?: string }> {}
export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError("ConflictException", ["ConflictError"], {
    status: 409,
  })<{ readonly message?: string }> {}
export class InternalServerException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerException",
    ["ServerError"],
    { status: 500 },
  )<{ readonly message?: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceQuotaExceededException",
    ["QuotaError"],
    { status: 402 },
  )<{ readonly message?: string }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["ThrottlingError"],
    { status: 429 },
  )<{ readonly message?: string }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{
    readonly message?: string;
    readonly fieldList?: ValidationExceptionField[];
  }> {}
export type BlueprintArn = string;
export type BlueprintStage = "DEVELOPMENT" | "LIVE" | (string & {});
export type ClientToken = string;
export interface CopyBlueprintStageRequest {
  blueprintArn: string;
  sourceStage: BlueprintStage;
  targetStage: BlueprintStage;
  clientToken?: string;
}
export interface CopyBlueprintStageResponse {}
export type BlueprintName = string | redacted.Redacted<string>;
export type Type = "DOCUMENT" | "IMAGE" | "AUDIO" | "VIDEO" | (string & {});
export type BlueprintSchema = string | redacted.Redacted<string>;
export type KmsKeyId = string;
export type EncryptionContextKey = string;
export type EncryptionContextValue = string;
export type KmsEncryptionContext = { [key: string]: string | undefined };
export interface EncryptionConfiguration {
  kmsKeyId: string;
  kmsEncryptionContext?: { [key: string]: string | undefined };
}
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  key: string;
  value: string;
}
export type TagList = Tag[];
export interface CreateBlueprintRequest {
  blueprintName: string | redacted.Redacted<string>;
  type: Type;
  blueprintStage?: BlueprintStage;
  schema: string | redacted.Redacted<string>;
  clientToken?: string;
  encryptionConfiguration?: EncryptionConfiguration;
  tags?: Tag[];
}
export type BlueprintVersion = string;
export type S3Uri = string;
export type S3ObjectVersion = string;
export interface S3Object {
  s3Uri: string;
  version?: string;
}
export interface BlueprintOptimizationSample {
  assetS3Object: S3Object;
  groundTruthS3Object: S3Object;
}
export type BlueprintOptimizationSamples = BlueprintOptimizationSample[];
export interface Blueprint {
  blueprintArn: string;
  schema: string | redacted.Redacted<string>;
  type: Type;
  creationTime: Date;
  lastModifiedTime: Date;
  blueprintName: string | redacted.Redacted<string>;
  blueprintVersion?: string;
  blueprintStage?: BlueprintStage;
  kmsKeyId?: string;
  kmsEncryptionContext?: { [key: string]: string | undefined };
  optimizationSamples?: BlueprintOptimizationSample[];
  optimizationTime?: Date;
}
export interface CreateBlueprintResponse {
  blueprint: Blueprint;
}
export interface CreateBlueprintVersionRequest {
  blueprintArn: string;
  clientToken?: string;
}
export interface CreateBlueprintVersionResponse {
  blueprint: Blueprint;
}
export type DataAutomationLibraryName = string | redacted.Redacted<string>;
export type DataAutomationLibraryDescription =
  | string
  | redacted.Redacted<string>;
export interface CreateDataAutomationLibraryRequest {
  libraryName: string | redacted.Redacted<string>;
  libraryDescription?: string | redacted.Redacted<string>;
  clientToken?: string;
  encryptionConfiguration?: EncryptionConfiguration;
  tags?: Tag[];
}
export type DataAutomationLibraryArn = string;
export type DataAutomationLibraryStatus = "ACTIVE" | "DELETING" | (string & {});
export interface CreateDataAutomationLibraryResponse {
  libraryArn?: string;
  status?: DataAutomationLibraryStatus;
}
export type DataAutomationProjectName = string | redacted.Redacted<string>;
export type DataAutomationProjectDescription =
  | string
  | redacted.Redacted<string>;
export type DataAutomationProjectStage = "DEVELOPMENT" | "LIVE" | (string & {});
export type DataAutomationProjectType = "ASYNC" | "SYNC" | (string & {});
export type DocumentExtractionGranularityType =
  | "DOCUMENT"
  | "PAGE"
  | "ELEMENT"
  | "WORD"
  | "LINE"
  | (string & {});
export type DocumentExtractionGranularityTypes =
  DocumentExtractionGranularityType[];
export interface DocumentExtractionGranularity {
  types?: DocumentExtractionGranularityType[];
}
export type State = "ENABLED" | "DISABLED" | (string & {});
export interface DocumentBoundingBox {
  state: State;
}
export interface DocumentStandardExtraction {
  granularity: DocumentExtractionGranularity;
  boundingBox: DocumentBoundingBox;
}
export interface DocumentStandardGenerativeField {
  state: State;
}
export type DocumentOutputTextFormatType =
  | "PLAIN_TEXT"
  | "MARKDOWN"
  | "HTML"
  | "CSV"
  | (string & {});
export type DocumentOutputTextFormatTypes = DocumentOutputTextFormatType[];
export interface DocumentOutputTextFormat {
  types?: DocumentOutputTextFormatType[];
}
export interface DocumentOutputAdditionalFileFormat {
  state: State;
}
export interface DocumentOutputFormat {
  textFormat: DocumentOutputTextFormat;
  additionalFileFormat: DocumentOutputAdditionalFileFormat;
}
export interface DocumentStandardOutputConfiguration {
  extraction?: DocumentStandardExtraction;
  generativeField?: DocumentStandardGenerativeField;
  outputFormat?: DocumentOutputFormat;
}
export type ImageExtractionCategoryType =
  | "CONTENT_MODERATION"
  | "TEXT_DETECTION"
  | "LOGOS"
  | (string & {});
export type ImageExtractionCategoryTypes = ImageExtractionCategoryType[];
export interface ImageExtractionCategory {
  state: State;
  types?: ImageExtractionCategoryType[];
}
export interface ImageBoundingBox {
  state: State;
}
export interface ImageStandardExtraction {
  category: ImageExtractionCategory;
  boundingBox: ImageBoundingBox;
}
export type ImageStandardGenerativeFieldType =
  | "IMAGE_SUMMARY"
  | "IAB"
  | (string & {});
export type ImageStandardGenerativeFieldTypes =
  ImageStandardGenerativeFieldType[];
export interface ImageStandardGenerativeField {
  state: State;
  types?: ImageStandardGenerativeFieldType[];
}
export interface ImageStandardOutputConfiguration {
  extraction?: ImageStandardExtraction;
  generativeField?: ImageStandardGenerativeField;
}
export type VideoExtractionCategoryType =
  | "CONTENT_MODERATION"
  | "TEXT_DETECTION"
  | "TRANSCRIPT"
  | "LOGOS"
  | (string & {});
export type VideoExtractionCategoryTypes = VideoExtractionCategoryType[];
export interface VideoExtractionCategory {
  state: State;
  types?: VideoExtractionCategoryType[];
}
export interface VideoBoundingBox {
  state: State;
}
export interface VideoStandardExtraction {
  category: VideoExtractionCategory;
  boundingBox: VideoBoundingBox;
}
export type VideoStandardGenerativeFieldType =
  | "VIDEO_SUMMARY"
  | "IAB"
  | "CHAPTER_SUMMARY"
  | (string & {});
export type VideoStandardGenerativeFieldTypes =
  VideoStandardGenerativeFieldType[];
export interface VideoStandardGenerativeField {
  state: State;
  types?: VideoStandardGenerativeFieldType[];
}
export interface VideoStandardOutputConfiguration {
  extraction?: VideoStandardExtraction;
  generativeField?: VideoStandardGenerativeField;
}
export type AudioExtractionCategoryType =
  | "AUDIO_CONTENT_MODERATION"
  | "TRANSCRIPT"
  | "TOPIC_CONTENT_MODERATION"
  | (string & {});
export type AudioExtractionCategoryTypes = AudioExtractionCategoryType[];
export interface SpeakerLabelingConfiguration {
  state: State;
}
export interface ChannelLabelingConfiguration {
  state: State;
}
export interface TranscriptConfiguration {
  speakerLabeling?: SpeakerLabelingConfiguration;
  channelLabeling?: ChannelLabelingConfiguration;
}
export interface AudioExtractionCategoryTypeConfiguration {
  transcript?: TranscriptConfiguration;
}
export interface AudioExtractionCategory {
  state: State;
  types?: AudioExtractionCategoryType[];
  typeConfiguration?: AudioExtractionCategoryTypeConfiguration;
}
export interface AudioStandardExtraction {
  category: AudioExtractionCategory;
}
export type AudioStandardGenerativeFieldType =
  | "AUDIO_SUMMARY"
  | "IAB"
  | "TOPIC_SUMMARY"
  | (string & {});
export type AudioStandardGenerativeFieldTypes =
  AudioStandardGenerativeFieldType[];
export interface AudioStandardGenerativeField {
  state: State;
  types?: AudioStandardGenerativeFieldType[];
}
export interface AudioStandardOutputConfiguration {
  extraction?: AudioStandardExtraction;
  generativeField?: AudioStandardGenerativeField;
}
export interface StandardOutputConfiguration {
  document?: DocumentStandardOutputConfiguration;
  image?: ImageStandardOutputConfiguration;
  video?: VideoStandardOutputConfiguration;
  audio?: AudioStandardOutputConfiguration;
}
export interface BlueprintItem {
  blueprintArn: string;
  blueprintVersion?: string;
  blueprintStage?: BlueprintStage;
}
export type BlueprintItems = BlueprintItem[];
export type FallbackBlueprintItems = BlueprintItem[];
export interface DocumentCustomOutputConfiguration {
  fallbackBlueprints?: BlueprintItem[];
}
export interface CustomOutputConfiguration {
  blueprints?: BlueprintItem[];
  document?: DocumentCustomOutputConfiguration;
}
export interface SplitterConfiguration {
  state?: State;
}
export interface ModalityProcessingConfiguration {
  state?: State;
}
export type SensitiveDataDetectionMode =
  | "DETECTION"
  | "DETECTION_AND_REDACTION"
  | (string & {});
export type SensitiveDataDetectionScopeType =
  | "STANDARD"
  | "CUSTOM"
  | (string & {});
export type SensitiveDataDetectionScope = SensitiveDataDetectionScopeType[];
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
  piiEntityTypes?: PIIEntityType[];
  redactionMaskMode?: PIIRedactionMaskMode;
}
export interface SensitiveDataConfiguration {
  detectionMode: SensitiveDataDetectionMode;
  detectionScope?: SensitiveDataDetectionScopeType[];
  piiEntitiesConfiguration?: PIIEntitiesConfiguration;
}
export interface DocumentOverrideConfiguration {
  splitter?: SplitterConfiguration;
  modalityProcessing?: ModalityProcessingConfiguration;
  sensitiveDataConfiguration?: SensitiveDataConfiguration;
}
export interface ImageOverrideConfiguration {
  modalityProcessing?: ModalityProcessingConfiguration;
  sensitiveDataConfiguration?: SensitiveDataConfiguration;
}
export interface VideoOverrideConfiguration {
  modalityProcessing?: ModalityProcessingConfiguration;
  sensitiveDataConfiguration?: SensitiveDataConfiguration;
}
export type Language =
  | "EN"
  | "DE"
  | "ES"
  | "FR"
  | "IT"
  | "PT"
  | "JA"
  | "KO"
  | "CN"
  | "TW"
  | "HK"
  | (string & {});
export type AudioInputLanguages = Language[];
export type AudioGenerativeOutputLanguage = "DEFAULT" | "EN" | (string & {});
export interface AudioLanguageConfiguration {
  inputLanguages?: Language[];
  generativeOutputLanguage?: AudioGenerativeOutputLanguage;
  identifyMultipleLanguages?: boolean;
}
export interface AudioOverrideConfiguration {
  modalityProcessing?: ModalityProcessingConfiguration;
  languageConfiguration?: AudioLanguageConfiguration;
  sensitiveDataConfiguration?: SensitiveDataConfiguration;
}
export type DesiredModality =
  | "IMAGE"
  | "DOCUMENT"
  | "AUDIO"
  | "VIDEO"
  | (string & {});
export interface ModalityRoutingConfiguration {
  jpeg?: DesiredModality;
  png?: DesiredModality;
  mp4?: DesiredModality;
  mov?: DesiredModality;
}
export interface OverrideConfiguration {
  document?: DocumentOverrideConfiguration;
  image?: ImageOverrideConfiguration;
  video?: VideoOverrideConfiguration;
  audio?: AudioOverrideConfiguration;
  modalityRouting?: ModalityRoutingConfiguration;
}
export interface DataAutomationLibraryItem {
  libraryArn: string;
}
export type DataAutomationLibraryItems = DataAutomationLibraryItem[];
export interface DataAutomationLibraryConfiguration {
  libraries?: DataAutomationLibraryItem[];
}
export interface CreateDataAutomationProjectRequest {
  projectName: string | redacted.Redacted<string>;
  projectDescription?: string | redacted.Redacted<string>;
  projectStage?: DataAutomationProjectStage;
  projectType?: DataAutomationProjectType;
  standardOutputConfiguration: StandardOutputConfiguration;
  customOutputConfiguration?: CustomOutputConfiguration;
  overrideConfiguration?: OverrideConfiguration;
  dataAutomationLibraryConfiguration?: DataAutomationLibraryConfiguration;
  clientToken?: string;
  encryptionConfiguration?: EncryptionConfiguration;
  tags?: Tag[];
}
export type DataAutomationProjectArn = string;
export type DataAutomationProjectStatus =
  | "COMPLETED"
  | "IN_PROGRESS"
  | "FAILED"
  | (string & {});
export interface CreateDataAutomationProjectResponse {
  projectArn: string;
  projectStage?: DataAutomationProjectStage;
  status?: DataAutomationProjectStatus;
}
export interface DeleteBlueprintRequest {
  blueprintArn: string;
  blueprintVersion?: string;
}
export interface DeleteBlueprintResponse {}
export interface DeleteDataAutomationLibraryRequest {
  libraryArn: string;
}
export interface DeleteDataAutomationLibraryResponse {
  libraryArn?: string;
  status?: DataAutomationLibraryStatus;
}
export interface DeleteDataAutomationProjectRequest {
  projectArn: string;
}
export interface DeleteDataAutomationProjectResponse {
  projectArn: string;
  status?: DataAutomationProjectStatus;
}
export interface GetBlueprintRequest {
  blueprintArn: string;
  blueprintVersion?: string;
  blueprintStage?: BlueprintStage;
}
export interface GetBlueprintResponse {
  blueprint: Blueprint;
}
export type BlueprintOptimizationInvocationArn = string;
export interface GetBlueprintOptimizationStatusRequest {
  invocationArn: string;
}
export type BlueprintOptimizationJobStatus =
  | "Created"
  | "InProgress"
  | "Success"
  | "ServiceError"
  | "ClientError"
  | (string & {});
export interface BlueprintOptimizationOutputConfiguration {
  s3Object: S3Object;
}
export interface GetBlueprintOptimizationStatusResponse {
  status?: BlueprintOptimizationJobStatus;
  errorType?: string;
  errorMessage?: string;
  outputConfiguration?: BlueprintOptimizationOutputConfiguration;
}
export interface GetDataAutomationLibraryRequest {
  libraryArn: string;
}
export type EntityType = "VOCABULARY" | (string & {});
export type EntityMetadata = string;
export interface EntityTypeInfo {
  entityType: EntityType;
  entityMetadata?: string;
}
export type EntityTypeInfoList = EntityTypeInfo[];
export interface DataAutomationLibrary {
  libraryArn: string;
  creationTime: Date;
  libraryName: string | redacted.Redacted<string>;
  libraryDescription?: string | redacted.Redacted<string>;
  status: DataAutomationLibraryStatus;
  entityTypes?: EntityTypeInfo[];
  kmsKeyId?: string;
  kmsEncryptionContext?: { [key: string]: string | undefined };
}
export interface GetDataAutomationLibraryResponse {
  library?: DataAutomationLibrary;
}
export type EntityId = string;
export interface GetDataAutomationLibraryEntityRequest {
  libraryArn: string;
  entityType: EntityType;
  entityId: string;
}
export type EntityDescription = string | redacted.Redacted<string>;
export type PhraseText = string | redacted.Redacted<string>;
export type PhraseDisplayAsText = string | redacted.Redacted<string>;
export interface Phrase {
  text: string | redacted.Redacted<string>;
  displayAsText?: string | redacted.Redacted<string>;
}
export type PhraseList = Phrase[];
export interface VocabularyEntity {
  entityId?: string;
  description?: string | redacted.Redacted<string>;
  language?: Language;
  phrases?: Phrase[];
  lastModifiedTime?: Date;
}
export type EntityDetails = { vocabulary: VocabularyEntity };
export interface GetDataAutomationLibraryEntityResponse {
  entity?: EntityDetails;
}
export type DataAutomationLibraryIngestionJobArn = string;
export interface GetDataAutomationLibraryIngestionJobRequest {
  libraryArn: string;
  jobArn: string;
}
export type LibraryIngestionJobOperationType =
  | "UPSERT"
  | "DELETE"
  | (string & {});
export type LibraryIngestionJobStatus =
  | "IN_PROGRESS"
  | "COMPLETED"
  | "COMPLETED_WITH_ERRORS"
  | "FAILED"
  | (string & {});
export interface OutputConfiguration {
  s3Uri: string;
}
export interface DataAutomationLibraryIngestionJob {
  jobArn: string;
  creationTime: Date;
  entityType: EntityType;
  operationType: LibraryIngestionJobOperationType;
  jobStatus: LibraryIngestionJobStatus;
  outputConfiguration: OutputConfiguration;
  completionTime?: Date;
  errorMessage?: string;
  errorType?: string;
}
export interface GetDataAutomationLibraryIngestionJobResponse {
  job?: DataAutomationLibraryIngestionJob;
}
export interface GetDataAutomationProjectRequest {
  projectArn: string;
  projectStage?: DataAutomationProjectStage;
}
export interface DataAutomationProject {
  projectArn: string;
  creationTime: Date;
  lastModifiedTime: Date;
  projectName: string | redacted.Redacted<string>;
  projectStage?: DataAutomationProjectStage;
  projectType?: DataAutomationProjectType;
  projectDescription?: string | redacted.Redacted<string>;
  standardOutputConfiguration?: StandardOutputConfiguration;
  customOutputConfiguration?: CustomOutputConfiguration;
  overrideConfiguration?: OverrideConfiguration;
  dataAutomationLibraryConfiguration?: DataAutomationLibraryConfiguration;
  status: DataAutomationProjectStatus;
  kmsKeyId?: string;
  kmsEncryptionContext?: { [key: string]: string | undefined };
}
export interface GetDataAutomationProjectResponse {
  project: DataAutomationProject;
}
export interface BlueprintOptimizationObject {
  blueprintArn: string;
  stage?: BlueprintStage;
}
export type DataAutomationProfileArn = string;
export interface InvokeBlueprintOptimizationAsyncRequest {
  blueprint: BlueprintOptimizationObject;
  samples: BlueprintOptimizationSample[];
  outputConfiguration: BlueprintOptimizationOutputConfiguration;
  dataAutomationProfileArn: string;
  encryptionConfiguration?: EncryptionConfiguration;
  tags?: Tag[];
}
export interface InvokeBlueprintOptimizationAsyncResponse {
  invocationArn: string;
}
export interface VocabularyEntityInfo {
  entityId?: string;
  description?: string | redacted.Redacted<string>;
  language: Language;
  phrases: Phrase[];
}
export type UpsertEntityInfo = { vocabulary: VocabularyEntityInfo };
export type UpsertEntitiesInfo = UpsertEntityInfo[];
export type EntityIdList = string[];
export interface DeleteEntitiesInfo {
  entityIds: string[];
}
export type InlinePayload =
  | { upsertEntitiesInfo: UpsertEntityInfo[]; deleteEntitiesInfo?: never }
  | { upsertEntitiesInfo?: never; deleteEntitiesInfo: DeleteEntitiesInfo };
export interface InputConfiguration {
  s3Object?: S3Object;
  inlinePayload?: InlinePayload;
}
export interface EventBridgeConfiguration {
  eventBridgeEnabled: boolean;
}
export interface NotificationConfiguration {
  eventBridgeConfiguration: EventBridgeConfiguration;
}
export interface InvokeDataAutomationLibraryIngestionJobRequest {
  libraryArn: string;
  clientToken?: string;
  inputConfiguration: InputConfiguration;
  entityType: EntityType;
  operationType: LibraryIngestionJobOperationType;
  outputConfiguration: OutputConfiguration;
  notificationConfiguration?: NotificationConfiguration;
  tags?: Tag[];
}
export interface InvokeDataAutomationLibraryIngestionJobResponse {
  jobArn?: string;
}
export type ResourceOwner = "SERVICE" | "ACCOUNT" | (string & {});
export type BlueprintStageFilter =
  | "DEVELOPMENT"
  | "LIVE"
  | "ALL"
  | (string & {});
export type MaxResults = number;
export type NextToken = string;
export interface DataAutomationProjectFilter {
  projectArn: string;
  projectStage?: DataAutomationProjectStage;
}
export interface ListBlueprintsRequest {
  blueprintArn?: string;
  resourceOwner?: ResourceOwner;
  blueprintStageFilter?: BlueprintStageFilter;
  maxResults?: number;
  nextToken?: string;
  projectFilter?: DataAutomationProjectFilter;
}
export interface BlueprintSummary {
  blueprintArn: string;
  blueprintVersion?: string;
  blueprintStage?: BlueprintStage;
  blueprintName?: string | redacted.Redacted<string>;
  creationTime: Date;
  lastModifiedTime?: Date;
}
export type Blueprints = BlueprintSummary[];
export interface ListBlueprintsResponse {
  blueprints: BlueprintSummary[];
  nextToken?: string;
}
export interface ListDataAutomationLibrariesRequest {
  maxResults?: number;
  nextToken?: string;
  projectFilter?: DataAutomationProjectFilter;
}
export interface DataAutomationLibrarySummary {
  libraryArn: string;
  libraryName?: string | redacted.Redacted<string>;
  creationTime: Date;
}
export type DataAutomationLibrarySummaries = DataAutomationLibrarySummary[];
export interface ListDataAutomationLibrariesResponse {
  libraries?: DataAutomationLibrarySummary[];
  nextToken?: string;
}
export interface ListDataAutomationLibraryEntitiesRequest {
  libraryArn: string;
  entityType: EntityType;
  maxResults?: number;
  nextToken?: string;
}
export interface VocabularyEntitySummary {
  entityId?: string;
  description?: string | redacted.Redacted<string>;
  language?: Language;
  numOfPhrases?: number;
  lastModifiedTime?: Date;
}
export type DataAutomationLibraryEntitySummary = {
  vocabulary: VocabularyEntitySummary;
};
export type DataAutomationLibraryEntitySummaries =
  DataAutomationLibraryEntitySummary[];
export interface ListDataAutomationLibraryEntitiesResponse {
  entities?: DataAutomationLibraryEntitySummary[];
  nextToken?: string;
}
export interface ListDataAutomationLibraryIngestionJobsRequest {
  libraryArn: string;
  maxResults?: number;
  nextToken?: string;
}
export interface DataAutomationLibraryIngestionJobSummary {
  jobArn: string;
  jobStatus: LibraryIngestionJobStatus;
  entityType: EntityType;
  operationType: LibraryIngestionJobOperationType;
  creationTime: Date;
  completionTime?: Date;
}
export type DataAutomationLibraryIngestionJobSummaries =
  DataAutomationLibraryIngestionJobSummary[];
export interface ListDataAutomationLibraryIngestionJobsResponse {
  jobs?: DataAutomationLibraryIngestionJobSummary[];
  nextToken?: string;
}
export type DataAutomationProjectStageFilter =
  | "DEVELOPMENT"
  | "LIVE"
  | "ALL"
  | (string & {});
export interface BlueprintFilter {
  blueprintArn: string;
  blueprintVersion?: string;
  blueprintStage?: BlueprintStage;
}
export interface DataAutomationLibraryFilter {
  libraryArn: string;
}
export interface ListDataAutomationProjectsRequest {
  maxResults?: number;
  nextToken?: string;
  projectStageFilter?: DataAutomationProjectStageFilter;
  blueprintFilter?: BlueprintFilter;
  resourceOwner?: ResourceOwner;
  libraryFilter?: DataAutomationLibraryFilter;
}
export interface DataAutomationProjectSummary {
  projectArn: string;
  projectStage?: DataAutomationProjectStage;
  projectType?: DataAutomationProjectType;
  projectName?: string | redacted.Redacted<string>;
  creationTime: Date;
}
export type DataAutomationProjectSummaries = DataAutomationProjectSummary[];
export interface ListDataAutomationProjectsResponse {
  projects: DataAutomationProjectSummary[];
  nextToken?: string;
}
export type TaggableResourceArn = string;
export interface ListTagsForResourceRequest {
  resourceARN: string;
}
export interface ListTagsForResourceResponse {
  tags?: Tag[];
}
export interface TagResourceRequest {
  resourceARN: string;
  tags: Tag[];
}
export interface TagResourceResponse {}
export type TagKeyList = string[];
export interface UntagResourceRequest {
  resourceARN: string;
  tagKeys: string[];
}
export interface UntagResourceResponse {}
export interface UpdateBlueprintRequest {
  blueprintArn: string;
  schema: string | redacted.Redacted<string>;
  blueprintStage?: BlueprintStage;
  encryptionConfiguration?: EncryptionConfiguration;
}
export interface UpdateBlueprintResponse {
  blueprint: Blueprint;
}
export interface UpdateDataAutomationLibraryRequest {
  libraryArn: string;
  libraryDescription?: string | redacted.Redacted<string>;
  clientToken?: string;
}
export interface UpdateDataAutomationLibraryResponse {
  libraryArn?: string;
  status?: DataAutomationLibraryStatus;
}
export interface UpdateDataAutomationProjectRequest {
  projectArn: string;
  projectStage?: DataAutomationProjectStage;
  projectDescription?: string | redacted.Redacted<string>;
  standardOutputConfiguration: StandardOutputConfiguration;
  customOutputConfiguration?: CustomOutputConfiguration;
  overrideConfiguration?: OverrideConfiguration;
  dataAutomationLibraryConfiguration?: DataAutomationLibraryConfiguration;
  encryptionConfiguration?: EncryptionConfiguration;
}
export interface UpdateDataAutomationProjectResponse {
  projectArn: string;
  projectStage?: DataAutomationProjectStage;
  status?: DataAutomationProjectStatus;
}
export type NonBlankString = string;
export interface ValidationExceptionField {
  name: string;
  message: string;
}
export type ValidationExceptionFieldList = ValidationExceptionField[];
export type CopyBlueprintStageError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Copies a Blueprint from one stage to another
 */
export const copyBlueprintStage: API.OperationMethod<
  CopyBlueprintStageRequest,
  CopyBlueprintStageResponse,
  CopyBlueprintStageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /blueprints/{blueprintArn}/copy-stage",
    input: {
      blueprintArn: 0,
      sourceStage: 0,
      targetStage: 0,
      clientToken: D.m({ idempotency: true }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CopyBlueprintStage",
})) as any;

export type CreateBlueprintError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an Amazon Bedrock Data Automation Blueprint
 */
export const createBlueprint: API.OperationMethod<
  CreateBlueprintRequest,
  CreateBlueprintResponse,
  CreateBlueprintError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /blueprints/",
    input: {
      blueprintName: 0,
      type: 0,
      blueprintStage: 0,
      schema: 0,
      clientToken: D.m({ idempotency: true }),
      encryptionConfiguration: i_EncryptionConfiguration,
      tags: D.list(i_Tag),
    },
    output: { blueprint: o_Blueprint },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateBlueprint",
})) as any;

export type CreateBlueprintVersionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new version of an existing Amazon Bedrock Data Automation Blueprint
 */
export const createBlueprintVersion: API.OperationMethod<
  CreateBlueprintVersionRequest,
  CreateBlueprintVersionResponse,
  CreateBlueprintVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /blueprints/{blueprintArn}/versions/",
    input: { blueprintArn: 0, clientToken: D.m({ idempotency: true }) },
    output: { blueprint: o_Blueprint },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateBlueprintVersion",
})) as any;

export type CreateDataAutomationLibraryError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an Amazon Bedrock Data Automation Library
 */
export const createDataAutomationLibrary: API.OperationMethod<
  CreateDataAutomationLibraryRequest,
  CreateDataAutomationLibraryResponse,
  CreateDataAutomationLibraryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /data-automation-libraries/",
    input: {
      libraryName: 0,
      libraryDescription: 0,
      clientToken: D.m({ idempotency: true }),
      encryptionConfiguration: i_EncryptionConfiguration,
      tags: D.list(i_Tag),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDataAutomationLibrary",
})) as any;

export type CreateDataAutomationProjectError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an Amazon Bedrock Data Automation Project
 */
export const createDataAutomationProject: API.OperationMethod<
  CreateDataAutomationProjectRequest,
  CreateDataAutomationProjectResponse,
  CreateDataAutomationProjectError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /data-automation-projects/",
    input: {
      projectName: 0,
      projectDescription: 0,
      projectStage: 0,
      projectType: 0,
      standardOutputConfiguration: i_StandardOutputConfiguration,
      customOutputConfiguration: i_CustomOutputConfiguration,
      overrideConfiguration: i_OverrideConfiguration,
      dataAutomationLibraryConfiguration: i_DataAutomationLibraryConfiguration,
      clientToken: D.m({ idempotency: true }),
      encryptionConfiguration: i_EncryptionConfiguration,
      tags: D.list(i_Tag),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDataAutomationProject",
})) as any;

export type DeleteBlueprintError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an existing Amazon Bedrock Data Automation Blueprint
 */
export const deleteBlueprint: API.OperationMethod<
  DeleteBlueprintRequest,
  DeleteBlueprintResponse,
  DeleteBlueprintError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /blueprints/{blueprintArn}/",
    input: {
      blueprintArn: 0,
      blueprintVersion: D.m({ query: "blueprintVersion" }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteBlueprint",
})) as any;

export type DeleteDataAutomationLibraryError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an existing Amazon Bedrock Data Automation Library
 */
export const deleteDataAutomationLibrary: API.OperationMethod<
  DeleteDataAutomationLibraryRequest,
  DeleteDataAutomationLibraryResponse,
  DeleteDataAutomationLibraryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /data-automation-libraries/{libraryArn}/",
    input: { libraryArn: 0 },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDataAutomationLibrary",
})) as any;

export type DeleteDataAutomationProjectError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an existing Amazon Bedrock Data Automation Project
 */
export const deleteDataAutomationProject: API.OperationMethod<
  DeleteDataAutomationProjectRequest,
  DeleteDataAutomationProjectResponse,
  DeleteDataAutomationProjectError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /data-automation-projects/{projectArn}/",
    input: { projectArn: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDataAutomationProject",
})) as any;

export type GetBlueprintError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets an existing Amazon Bedrock Data Automation Blueprint
 */
export const getBlueprint: API.OperationMethod<
  GetBlueprintRequest,
  GetBlueprintResponse,
  GetBlueprintError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /blueprints/{blueprintArn}/",
    input: { blueprintArn: 0, blueprintVersion: 0, blueprintStage: 0 },
    output: { blueprint: o_Blueprint },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBlueprint",
})) as any;

export type GetBlueprintOptimizationStatusError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * API used to get blueprint optimization status.
 */
export const getBlueprintOptimizationStatus: API.OperationMethod<
  GetBlueprintOptimizationStatusRequest,
  GetBlueprintOptimizationStatusResponse,
  GetBlueprintOptimizationStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /getBlueprintOptimizationStatus/{invocationArn}",
    input: { invocationArn: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBlueprintOptimizationStatus",
})) as any;

export type GetDataAutomationLibraryError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets an existing Amazon Bedrock Data Automation Library
 */
export const getDataAutomationLibrary: API.OperationMethod<
  GetDataAutomationLibraryRequest,
  GetDataAutomationLibraryResponse,
  GetDataAutomationLibraryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /data-automation-libraries/{libraryArn}/",
    input: { libraryArn: 0 },
    output: {
      library: {
        creationTime: D.ts,
        libraryName: D.secret,
        libraryDescription: D.secret,
      },
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDataAutomationLibrary",
})) as any;

export type GetDataAutomationLibraryEntityError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets an existing entity based on entity type from the library
 */
export const getDataAutomationLibraryEntity: API.OperationMethod<
  GetDataAutomationLibraryEntityRequest,
  GetDataAutomationLibraryEntityResponse,
  GetDataAutomationLibraryEntityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /data-automation-libraries/{libraryArn}/entityType/{entityType}/entities/{entityId}",
    input: { libraryArn: 0, entityType: 0, entityId: 0 },
    output: {
      entity: {
        vocabulary: {
          description: D.secret,
          phrases: D.list({ text: D.secret, displayAsText: D.secret }),
          lastModifiedTime: D.ts,
        },
      },
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDataAutomationLibraryEntity",
})) as any;

export type GetDataAutomationLibraryIngestionJobError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * API used to get status of data automation library ingestion job
 */
export const getDataAutomationLibraryIngestionJob: API.OperationMethod<
  GetDataAutomationLibraryIngestionJobRequest,
  GetDataAutomationLibraryIngestionJobResponse,
  GetDataAutomationLibraryIngestionJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /data-automation-libraries/{libraryArn}/library-ingestion-jobs/{jobArn}",
    input: { libraryArn: 0, jobArn: 0 },
    output: { job: { creationTime: D.ts, completionTime: D.ts } },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDataAutomationLibraryIngestionJob",
})) as any;

export type GetDataAutomationProjectError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets an existing Amazon Bedrock Data Automation Project
 */
export const getDataAutomationProject: API.OperationMethod<
  GetDataAutomationProjectRequest,
  GetDataAutomationProjectResponse,
  GetDataAutomationProjectError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /data-automation-projects/{projectArn}/",
    input: { projectArn: 0, projectStage: 0 },
    output: {
      project: {
        creationTime: D.ts,
        lastModifiedTime: D.ts,
        projectName: D.secret,
        projectDescription: D.secret,
      },
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDataAutomationProject",
})) as any;

export type InvokeBlueprintOptimizationAsyncError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Invoke an async job to perform Blueprint Optimization
 */
export const invokeBlueprintOptimizationAsync: API.OperationMethod<
  InvokeBlueprintOptimizationAsyncRequest,
  InvokeBlueprintOptimizationAsyncResponse,
  InvokeBlueprintOptimizationAsyncError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /invokeBlueprintOptimizationAsync",
    input: {
      blueprint: { blueprintArn: 0, stage: 0 },
      samples: D.list({
        assetS3Object: i_S3Object,
        groundTruthS3Object: i_S3Object,
      }),
      outputConfiguration: { s3Object: i_S3Object },
      dataAutomationProfileArn: 0,
      encryptionConfiguration: i_EncryptionConfiguration,
      tags: D.list(i_Tag),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "InvokeBlueprintOptimizationAsync",
})) as any;

export type InvokeDataAutomationLibraryIngestionJobError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Async API: Invoke data automation library ingestion job
 */
export const invokeDataAutomationLibraryIngestionJob: API.OperationMethod<
  InvokeDataAutomationLibraryIngestionJobRequest,
  InvokeDataAutomationLibraryIngestionJobResponse,
  InvokeDataAutomationLibraryIngestionJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /data-automation-libraries/{libraryArn}/library-ingestion-jobs/",
    input: {
      libraryArn: 0,
      clientToken: D.m({ idempotency: true }),
      inputConfiguration: {
        s3Object: i_S3Object,
        inlinePayload: {
          upsertEntitiesInfo: D.list({
            vocabulary: {
              entityId: 0,
              description: 0,
              language: 0,
              phrases: D.list({ text: 0, displayAsText: 0 }),
            },
          }),
          deleteEntitiesInfo: { entityIds: 0 },
        },
      },
      entityType: 0,
      operationType: 0,
      outputConfiguration: { s3Uri: 0 },
      notificationConfiguration: {
        eventBridgeConfiguration: { eventBridgeEnabled: 0 },
      },
      tags: D.list(i_Tag),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "InvokeDataAutomationLibraryIngestionJob",
})) as any;

export type ListBlueprintsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all existing Amazon Bedrock Data Automation Blueprints
 */
export const listBlueprints: API.PaginatedOperationMethod<
  ListBlueprintsRequest,
  ListBlueprintsResponse,
  ListBlueprintsError,
  Credentials | HttpClient.HttpClient,
  BlueprintSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /blueprints/",
    input: {
      blueprintArn: 0,
      resourceOwner: 0,
      blueprintStageFilter: 0,
      maxResults: 0,
      nextToken: 0,
      projectFilter: i_DataAutomationProjectFilter,
    },
    output: {
      blueprints: D.list({
        blueprintName: D.secret,
        creationTime: D.ts,
        lastModifiedTime: D.ts,
      }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListBlueprints",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "blueprints",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListDataAutomationLibrariesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all existing Amazon Bedrock Data Automation Libraries
 */
export const listDataAutomationLibraries: API.PaginatedOperationMethod<
  ListDataAutomationLibrariesRequest,
  ListDataAutomationLibrariesResponse,
  ListDataAutomationLibrariesError,
  Credentials | HttpClient.HttpClient,
  DataAutomationLibrarySummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /data-automation-libraries/",
    input: {
      maxResults: 0,
      nextToken: 0,
      projectFilter: i_DataAutomationProjectFilter,
    },
    output: {
      libraries: D.list({ libraryName: D.secret, creationTime: D.ts }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDataAutomationLibraries",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "libraries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListDataAutomationLibraryEntitiesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all stored entities in the library
 */
export const listDataAutomationLibraryEntities: API.PaginatedOperationMethod<
  ListDataAutomationLibraryEntitiesRequest,
  ListDataAutomationLibraryEntitiesResponse,
  ListDataAutomationLibraryEntitiesError,
  Credentials | HttpClient.HttpClient,
  DataAutomationLibraryEntitySummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /data-automation-libraries/{libraryArn}/entityType/{entityType}/entities/",
    input: { libraryArn: 0, entityType: 0, maxResults: 0, nextToken: 0 },
    output: {
      entities: D.list({
        vocabulary: { description: D.secret, lastModifiedTime: D.ts },
      }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDataAutomationLibraryEntities",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "entities",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListDataAutomationLibraryIngestionJobsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all data automation library ingestion jobs
 */
export const listDataAutomationLibraryIngestionJobs: API.PaginatedOperationMethod<
  ListDataAutomationLibraryIngestionJobsRequest,
  ListDataAutomationLibraryIngestionJobsResponse,
  ListDataAutomationLibraryIngestionJobsError,
  Credentials | HttpClient.HttpClient,
  DataAutomationLibraryIngestionJobSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /data-automation-libraries/{libraryArn}/library-ingestion-jobs/",
    input: { libraryArn: 0, maxResults: 0, nextToken: 0 },
    output: { jobs: D.list({ creationTime: D.ts, completionTime: D.ts }) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDataAutomationLibraryIngestionJobs",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "jobs",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListDataAutomationProjectsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all existing Amazon Bedrock Data Automation Projects
 */
export const listDataAutomationProjects: API.PaginatedOperationMethod<
  ListDataAutomationProjectsRequest,
  ListDataAutomationProjectsResponse,
  ListDataAutomationProjectsError,
  Credentials | HttpClient.HttpClient,
  DataAutomationProjectSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /data-automation-projects/",
    input: {
      maxResults: 0,
      nextToken: 0,
      projectStageFilter: 0,
      blueprintFilter: {
        blueprintArn: 0,
        blueprintVersion: 0,
        blueprintStage: 0,
      },
      resourceOwner: 0,
      libraryFilter: { libraryArn: 0 },
    },
    output: { projects: D.list({ projectName: D.secret, creationTime: D.ts }) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDataAutomationProjects",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "projects",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List tags for an Amazon Bedrock Data Automation resource
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /listTagsForResource",
    input: { resourceARN: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

export type TagResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Tag an Amazon Bedrock Data Automation resource
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /tagResource",
    input: { resourceARN: 0, tags: D.list(i_Tag) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
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
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Untag an Amazon Bedrock Data Automation resource
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /untagResource",
    input: { resourceARN: 0, tagKeys: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

export type UpdateBlueprintError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates an existing Amazon Bedrock Data Automation Blueprint
 */
export const updateBlueprint: API.OperationMethod<
  UpdateBlueprintRequest,
  UpdateBlueprintResponse,
  UpdateBlueprintError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /blueprints/{blueprintArn}/",
    input: {
      blueprintArn: 0,
      schema: 0,
      blueprintStage: 0,
      encryptionConfiguration: i_EncryptionConfiguration,
    },
    output: { blueprint: o_Blueprint },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateBlueprint",
})) as any;

export type UpdateDataAutomationLibraryError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates an existing Amazon Bedrock Data Automation Library
 */
export const updateDataAutomationLibrary: API.OperationMethod<
  UpdateDataAutomationLibraryRequest,
  UpdateDataAutomationLibraryResponse,
  UpdateDataAutomationLibraryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /data-automation-libraries/{libraryArn}/",
    input: {
      libraryArn: 0,
      libraryDescription: 0,
      clientToken: D.m({ idempotency: true }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDataAutomationLibrary",
})) as any;

export type UpdateDataAutomationProjectError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates an existing Amazon Bedrock Data Automation Project
 */
export const updateDataAutomationProject: API.OperationMethod<
  UpdateDataAutomationProjectRequest,
  UpdateDataAutomationProjectResponse,
  UpdateDataAutomationProjectError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /data-automation-projects/{projectArn}/",
    input: {
      projectArn: 0,
      projectStage: 0,
      projectDescription: 0,
      standardOutputConfiguration: i_StandardOutputConfiguration,
      customOutputConfiguration: i_CustomOutputConfiguration,
      overrideConfiguration: i_OverrideConfiguration,
      dataAutomationLibraryConfiguration: i_DataAutomationLibraryConfiguration,
      encryptionConfiguration: i_EncryptionConfiguration,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDataAutomationProject",
})) as any;

const i_CustomOutputConfiguration: D.LazyStruct = () => ({
  blueprints: D.list(i_BlueprintItem),
  document: { fallbackBlueprints: D.list(i_BlueprintItem) },
});
const i_DataAutomationLibraryConfiguration: D.LazyStruct = () => ({
  libraries: D.list({ libraryArn: 0 }),
});
const i_DataAutomationProjectFilter: D.LazyStruct = () => ({
  projectArn: 0,
  projectStage: 0,
});
const i_EncryptionConfiguration: D.LazyStruct = () => ({
  kmsKeyId: 0,
  kmsEncryptionContext: 0,
});
const i_OverrideConfiguration: D.LazyStruct = () => ({
  document: {
    splitter: { state: 0 },
    modalityProcessing: i_ModalityProcessingConfiguration,
    sensitiveDataConfiguration: i_SensitiveDataConfiguration,
  },
  image: {
    modalityProcessing: i_ModalityProcessingConfiguration,
    sensitiveDataConfiguration: i_SensitiveDataConfiguration,
  },
  video: {
    modalityProcessing: i_ModalityProcessingConfiguration,
    sensitiveDataConfiguration: i_SensitiveDataConfiguration,
  },
  audio: {
    modalityProcessing: i_ModalityProcessingConfiguration,
    languageConfiguration: {
      inputLanguages: 0,
      generativeOutputLanguage: 0,
      identifyMultipleLanguages: 0,
    },
    sensitiveDataConfiguration: i_SensitiveDataConfiguration,
  },
  modalityRouting: { jpeg: 0, png: 0, mp4: 0, mov: 0 },
});
const i_S3Object: D.LazyStruct = () => ({ s3Uri: 0, version: 0 });
const i_StandardOutputConfiguration: D.LazyStruct = () => ({
  document: {
    extraction: { granularity: { types: 0 }, boundingBox: { state: 0 } },
    generativeField: { state: 0 },
    outputFormat: {
      textFormat: { types: 0 },
      additionalFileFormat: { state: 0 },
    },
  },
  image: {
    extraction: { category: { state: 0, types: 0 }, boundingBox: { state: 0 } },
    generativeField: { state: 0, types: 0 },
  },
  video: {
    extraction: { category: { state: 0, types: 0 }, boundingBox: { state: 0 } },
    generativeField: { state: 0, types: 0 },
  },
  audio: {
    extraction: {
      category: {
        state: 0,
        types: 0,
        typeConfiguration: {
          transcript: {
            speakerLabeling: { state: 0 },
            channelLabeling: { state: 0 },
          },
        },
      },
    },
    generativeField: { state: 0, types: 0 },
  },
});
const i_Tag: D.LazyStruct = () => ({ key: 0, value: 0 });
const o_Blueprint: D.LazyStruct = () => ({
  schema: D.secret,
  creationTime: D.ts,
  lastModifiedTime: D.ts,
  blueprintName: D.secret,
  optimizationTime: D.ts,
});
const i_BlueprintItem: D.LazyStruct = () => ({
  blueprintArn: 0,
  blueprintVersion: 0,
  blueprintStage: 0,
});
const i_ModalityProcessingConfiguration: D.LazyStruct = () => ({ state: 0 });
const i_SensitiveDataConfiguration: D.LazyStruct = () => ({
  detectionMode: 0,
  detectionScope: 0,
  piiEntitiesConfiguration: { piiEntityTypes: 0, redactionMaskMode: 0 },
});
