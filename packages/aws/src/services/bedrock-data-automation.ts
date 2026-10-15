import * as API from "@distilled.cloud/core/api";
import * as S from "@distilled.cloud/core/schema-lite";
import * as __L from "@distilled.cloud/core/schema-lite";
import type * as HttpClient from "effect/http/HttpClient";
import type * as redacted from "effect/Redacted";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import { AwsProtocol } from "../protocol.ts";
import { Retry } from "../retry.ts";
import { SensitiveString } from "../sensitive.ts";
import * as T from "../traits.ts";
// Schema table, filled on first reach (see __S at the end).
const __s: any[] = [];
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "Bedrock Data Automation",
  serviceShapeName: "AmazonBedrockKeystoneBuildTimeService",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "bedrock" });
const ver = /*@__PURE__*/ T.ServiceVersion("2023-07-26");
const proto = /*@__PURE__*/ T.AwsProtocolsRestJson1();
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
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://bedrock-data-automation.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(
          `https://bedrock-data-automation.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://bedrock-data-automation.{R}.{D}","properties":{},"headers":{}}');

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      fieldList: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => __S(1057, __c33, 1)).annotate({
          identifier: "ValidationExceptionFieldList",
        }),
      ),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
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
export type DataAutomationLibraryDescription = string | redacted.Redacted<string>;
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
export type DataAutomationProjectDescription = string | redacted.Redacted<string>;
export type DataAutomationProjectStage = "DEVELOPMENT" | "LIVE" | (string & {});
export type DataAutomationProjectType = "ASYNC" | "SYNC" | (string & {});
export type DocumentExtractionGranularityType =
  | "DOCUMENT"
  | "PAGE"
  | "ELEMENT"
  | "WORD"
  | "LINE"
  | (string & {});
export type DocumentExtractionGranularityTypes = DocumentExtractionGranularityType[];
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
export type ImageStandardGenerativeFieldType = "IMAGE_SUMMARY" | "IAB" | (string & {});
export type ImageStandardGenerativeFieldTypes = ImageStandardGenerativeFieldType[];
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
export type VideoStandardGenerativeFieldTypes = VideoStandardGenerativeFieldType[];
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
export type AudioStandardGenerativeFieldTypes = AudioStandardGenerativeFieldType[];
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
export type SensitiveDataDetectionMode = "DETECTION" | "DETECTION_AND_REDACTION" | (string & {});
export type SensitiveDataDetectionScopeType = "STANDARD" | "CUSTOM" | (string & {});
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
export type DesiredModality = "IMAGE" | "DOCUMENT" | "AUDIO" | "VIDEO" | (string & {});
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
export type DataAutomationProjectStatus = "COMPLETED" | "IN_PROGRESS" | "FAILED" | (string & {});
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
export type LibraryIngestionJobOperationType = "UPSERT" | "DELETE" | (string & {});
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
export type BlueprintStageFilter = "DEVELOPMENT" | "LIVE" | "ALL" | (string & {});
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
export type DataAutomationLibraryEntitySummary = { vocabulary: VocabularyEntitySummary };
export type DataAutomationLibraryEntitySummaries = DataAutomationLibraryEntitySummary[];
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
export type DataAutomationLibraryIngestionJobSummaries = DataAutomationLibraryIngestionJobSummary[];
export interface ListDataAutomationLibraryIngestionJobsResponse {
  jobs?: DataAutomationLibraryIngestionJobSummary[];
  nextToken?: string;
}
export type DataAutomationProjectStageFilter = "DEVELOPMENT" | "LIVE" | "ALL" | (string & {});
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
  input: __S(1088, __c34, 0) as any as S.Schema<CopyBlueprintStageRequest>,
  output: __S(1120, __c35, 0) as any as S.Schema<CopyBlueprintStageResponse>,
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
}));

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
  input: __S(1152, __c36, 0) as any as S.Schema<CreateBlueprintRequest>,
  output: __S(1345, __c42, 1) as any as S.Schema<CreateBlueprintResponse>,
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
}));

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
  input: __S(1376, __c43, 0) as any as S.Schema<CreateBlueprintVersionRequest>,
  output: __S(1345, __c42, 1) as any as S.Schema<CreateBlueprintVersionResponse>,
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
}));

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
  input: __S(0, __c0, 0) as any as S.Schema<CreateDataAutomationLibraryRequest>,
  output: __S(32, __c1, 0) as any as S.Schema<CreateDataAutomationLibraryResponse>,
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
}));

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
  input: __S(64, __c2, 0) as any as S.Schema<CreateDataAutomationProjectRequest>,
  output: __S(160, __c5, 0) as any as S.Schema<CreateDataAutomationProjectResponse>,
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
}));

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
  input: __S(192, __c6, 0) as any as S.Schema<DeleteBlueprintRequest>,
  output: __S(1120, __c35, 0) as any as S.Schema<DeleteBlueprintResponse>,
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
}));

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
  input: __S(224, __c7, 0) as any as S.Schema<DeleteDataAutomationLibraryRequest>,
  output: __S(32, __c1, 0) as any as S.Schema<DeleteDataAutomationLibraryResponse>,
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
}));

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
  input: __S(256, __c8, 0) as any as S.Schema<DeleteDataAutomationProjectRequest>,
  output: __S(257, __c8, 1) as any as S.Schema<DeleteDataAutomationProjectResponse>,
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
}));

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
  input: __S(288, __c9, 0) as any as S.Schema<GetBlueprintRequest>,
  output: __S(1345, __c42, 1) as any as S.Schema<GetBlueprintResponse>,
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
}));

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
  input: __S(320, __c10, 0) as any as S.Schema<GetBlueprintOptimizationStatusRequest>,
  output: __S(321, __c10, 1) as any as S.Schema<GetBlueprintOptimizationStatusResponse>,
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
}));

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
  input: __S(384, __c12, 0) as any as S.Schema<GetDataAutomationLibraryRequest>,
  output: __S(388, __c12, 4) as any as S.Schema<GetDataAutomationLibraryResponse>,
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
}));

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
  input: __S(416, __c13, 0) as any as S.Schema<GetDataAutomationLibraryEntityRequest>,
  output: __S(419, __c13, 3) as any as S.Schema<GetDataAutomationLibraryEntityResponse>,
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
}));

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
  input: __S(480, __c15, 0) as any as S.Schema<GetDataAutomationLibraryIngestionJobRequest>,
  output: __S(482, __c15, 2) as any as S.Schema<GetDataAutomationLibraryIngestionJobResponse>,
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
}));

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
  input: __S(544, __c17, 0) as any as S.Schema<GetDataAutomationProjectRequest>,
  output: __S(546, __c17, 2) as any as S.Schema<GetDataAutomationProjectResponse>,
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
}));

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
  input: __S(577, __c18, 1) as any as S.Schema<InvokeBlueprintOptimizationAsyncRequest>,
  output: __S(578, __c18, 2) as any as S.Schema<InvokeBlueprintOptimizationAsyncResponse>,
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
}));

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
  input: __S(616, __c19, 8) as any as S.Schema<InvokeDataAutomationLibraryIngestionJobRequest>,
  output: __S(617, __c19, 9) as any as S.Schema<InvokeDataAutomationLibraryIngestionJobResponse>,
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
}));

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
  input: __S(672, __c21, 0) as any as S.Schema<ListBlueprintsRequest>,
  output: __S(675, __c21, 3) as any as S.Schema<ListBlueprintsResponse>,
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
  input: __S(736, __c23, 0) as any as S.Schema<ListDataAutomationLibrariesRequest>,
  output: __S(739, __c23, 3) as any as S.Schema<ListDataAutomationLibrariesResponse>,
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
  input: __S(768, __c24, 0) as any as S.Schema<ListDataAutomationLibraryEntitiesRequest>,
  output: __S(772, __c24, 4) as any as S.Schema<ListDataAutomationLibraryEntitiesResponse>,
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
  input: __S(800, __c25, 0) as any as S.Schema<ListDataAutomationLibraryIngestionJobsRequest>,
  output: __S(803, __c25, 3) as any as S.Schema<ListDataAutomationLibraryIngestionJobsResponse>,
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
  input: __S(832, __c26, 0) as any as S.Schema<ListDataAutomationProjectsRequest>,
  output: __S(835, __c26, 3) as any as S.Schema<ListDataAutomationProjectsResponse>,
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
  input: __S(864, __c27, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(865, __c27, 1) as any as S.Schema<ListTagsForResourceResponse>,
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
}));

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
  input: __S(896, __c28, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(1120, __c35, 0) as any as S.Schema<TagResourceResponse>,
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
}));

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
  input: __S(928, __c29, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(1120, __c35, 0) as any as S.Schema<UntagResourceResponse>,
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
}));

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
  input: __S(960, __c30, 0) as any as S.Schema<UpdateBlueprintRequest>,
  output: __S(1345, __c42, 1) as any as S.Schema<UpdateBlueprintResponse>,
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
}));

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
  input: __S(992, __c31, 0) as any as S.Schema<UpdateDataAutomationLibraryRequest>,
  output: __S(32, __c1, 0) as any as S.Schema<UpdateDataAutomationLibraryResponse>,
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
}));

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
  input: __S(1024, __c32, 0) as any as S.Schema<UpdateDataAutomationProjectRequest>,
  output: __S(160, __c5, 0) as any as S.Schema<UpdateDataAutomationProjectResponse>,
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
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          libraryName: SensitiveString,
          libraryDescription: S.optional(SensitiveString),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          encryptionConfiguration: S.optional(__S(1216, __c38, 0)),
          tags: S.optional(__S(1185, __c37, 1)),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/data-automation-libraries/" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateDataAutomationLibraryRequest" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ libraryArn: S.optional(S.String), status: S.optional(S.String) }),
      ).annotate({ identifier: "CreateDataAutomationLibraryResponse" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          projectName: SensitiveString,
          projectDescription: S.optional(SensitiveString),
          projectStage: S.optional(S.String),
          projectType: S.optional(S.String),
          standardOutputConfiguration: __S(142, __c4, 14),
          customOutputConfiguration: S.optional(__S(145, __c4, 17)),
          overrideConfiguration: S.optional(__S(154, __c4, 26)),
          dataAutomationLibraryConfiguration: S.optional(__S(156, __c4, 28)),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          encryptionConfiguration: S.optional(__S(1216, __c38, 0)),
          tags: S.optional(__S(1185, __c37, 1)),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/data-automation-projects/" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateDataAutomationProjectRequest" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          blueprintArn: S.String,
          blueprintVersion: S.optional(S.String),
          blueprintStage: S.optional(S.String),
        }),
      ).annotate({ identifier: "BlueprintItem" });
    case 1:
      return S.suspend(() => S.Struct({ libraryArn: S.String })).annotate({
        identifier: "DataAutomationLibraryItem",
      });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
    case 1:
      return S.suspend(() => S.Struct({ types: S.optional(__S(128, __c4, 0)) })).annotate({
        identifier: "DocumentExtractionGranularity",
      });
    case 2:
      return S.suspend(() => S.Struct({ state: S.String })).annotate({
        identifier: "DocumentBoundingBox",
      });
    case 3:
      return S.suspend(() =>
        S.Struct({ granularity: __S(129, __c4, 1), boundingBox: __S(130, __c4, 2) }),
      ).annotate({ identifier: "DocumentStandardExtraction" });
    case 4:
      return S.suspend(() =>
        S.Struct({ textFormat: __S(129, __c4, 1), additionalFileFormat: __S(130, __c4, 2) }),
      ).annotate({ identifier: "DocumentOutputFormat" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          extraction: S.optional(__S(131, __c4, 3)),
          generativeField: S.optional(__S(130, __c4, 2)),
          outputFormat: S.optional(__S(132, __c4, 4)),
        }),
      ).annotate({ identifier: "DocumentStandardOutputConfiguration" });
    case 6:
      return S.suspend(() =>
        S.Struct({ state: S.String, types: S.optional(__S(128, __c4, 0)) }),
      ).annotate({ identifier: "ImageExtractionCategory" });
    case 7:
      return S.suspend(() =>
        S.Struct({ category: __S(134, __c4, 6), boundingBox: __S(130, __c4, 2) }),
      ).annotate({ identifier: "ImageStandardExtraction" });
    case 8:
      return S.suspend(() =>
        S.Struct({
          extraction: S.optional(__S(135, __c4, 7)),
          generativeField: S.optional(__S(134, __c4, 6)),
        }),
      ).annotate({ identifier: "ImageStandardOutputConfiguration" });
    case 9:
      return S.suspend(() =>
        S.Struct({
          speakerLabeling: S.optional(__S(130, __c4, 2)),
          channelLabeling: S.optional(__S(130, __c4, 2)),
        }),
      ).annotate({ identifier: "TranscriptConfiguration" });
    case 10:
      return S.suspend(() => S.Struct({ transcript: S.optional(__S(137, __c4, 9)) })).annotate({
        identifier: "AudioExtractionCategoryTypeConfiguration",
      });
    case 11:
      return S.suspend(() =>
        S.Struct({
          state: S.String,
          types: S.optional(__S(128, __c4, 0)),
          typeConfiguration: S.optional(__S(138, __c4, 10)),
        }),
      ).annotate({ identifier: "AudioExtractionCategory" });
    case 12:
      return S.suspend(() => S.Struct({ category: __S(139, __c4, 11) })).annotate({
        identifier: "AudioStandardExtraction",
      });
    case 13:
      return S.suspend(() =>
        S.Struct({
          extraction: S.optional(__S(140, __c4, 12)),
          generativeField: S.optional(__S(134, __c4, 6)),
        }),
      ).annotate({ identifier: "AudioStandardOutputConfiguration" });
    case 14:
      return S.suspend(() =>
        S.Struct({
          document: S.optional(__S(133, __c4, 5)),
          image: S.optional(__S(136, __c4, 8)),
          video: S.optional(__S(136, __c4, 8)),
          audio: S.optional(__S(141, __c4, 13)),
        }),
      ).annotate({ identifier: "StandardOutputConfiguration" });
    case 15:
      return S.Array(__S(96, __c3, 0));
    case 16:
      return S.suspend(() =>
        S.Struct({ fallbackBlueprints: S.optional(__S(143, __c4, 15)) }),
      ).annotate({ identifier: "DocumentCustomOutputConfiguration" });
    case 17:
      return S.suspend(() =>
        S.Struct({
          blueprints: S.optional(__S(143, __c4, 15)),
          document: S.optional(__S(144, __c4, 16)),
        }),
      ).annotate({ identifier: "CustomOutputConfiguration" });
    case 18:
      return S.suspend(() => S.Struct({ state: S.optional(S.String) })).annotate({
        identifier: "SplitterConfiguration",
      });
    case 19:
      return S.suspend(() =>
        S.Struct({
          piiEntityTypes: S.optional(__S(128, __c4, 0)),
          redactionMaskMode: S.optional(S.String),
        }),
      ).annotate({ identifier: "PIIEntitiesConfiguration" });
    case 20:
      return S.suspend(() =>
        S.Struct({
          detectionMode: S.String,
          detectionScope: S.optional(__S(128, __c4, 0)),
          piiEntitiesConfiguration: S.optional(__S(147, __c4, 19)),
        }),
      ).annotate({ identifier: "SensitiveDataConfiguration" });
    case 21:
      return S.suspend(() =>
        S.Struct({
          splitter: S.optional(__S(146, __c4, 18)),
          modalityProcessing: S.optional(__S(146, __c4, 18)),
          sensitiveDataConfiguration: S.optional(__S(148, __c4, 20)),
        }),
      ).annotate({ identifier: "DocumentOverrideConfiguration" });
    case 22:
      return S.suspend(() =>
        S.Struct({
          modalityProcessing: S.optional(__S(146, __c4, 18)),
          sensitiveDataConfiguration: S.optional(__S(148, __c4, 20)),
        }),
      ).annotate({ identifier: "ImageOverrideConfiguration" });
    case 23:
      return S.suspend(() =>
        S.Struct({
          inputLanguages: S.optional(__S(128, __c4, 0)),
          generativeOutputLanguage: S.optional(S.String),
          identifyMultipleLanguages: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "AudioLanguageConfiguration" });
    case 24:
      return S.suspend(() =>
        S.Struct({
          modalityProcessing: S.optional(__S(146, __c4, 18)),
          languageConfiguration: S.optional(__S(151, __c4, 23)),
          sensitiveDataConfiguration: S.optional(__S(148, __c4, 20)),
        }),
      ).annotate({ identifier: "AudioOverrideConfiguration" });
    case 25:
      return S.suspend(() =>
        S.Struct({
          jpeg: S.optional(S.String),
          png: S.optional(S.String),
          mp4: S.optional(S.String),
          mov: S.optional(S.String),
        }),
      ).annotate({ identifier: "ModalityRoutingConfiguration" });
    case 26:
      return S.suspend(() =>
        S.Struct({
          document: S.optional(__S(149, __c4, 21)),
          image: S.optional(__S(150, __c4, 22)),
          video: S.optional(__S(150, __c4, 22)),
          audio: S.optional(__S(152, __c4, 24)),
          modalityRouting: S.optional(__S(153, __c4, 25)),
        }),
      ).annotate({ identifier: "OverrideConfiguration" });
    case 27:
      return S.Array(__S(97, __c3, 1));
    case 28:
      return S.suspend(() => S.Struct({ libraries: S.optional(__S(155, __c4, 27)) })).annotate({
        identifier: "DataAutomationLibraryConfiguration",
      });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          projectArn: S.String,
          projectStage: S.optional(S.String),
          status: S.optional(S.String),
        }),
      ).annotate({ identifier: "CreateDataAutomationProjectResponse" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          blueprintArn: S.String.pipe(T.HttpLabel("blueprintArn")),
          blueprintVersion: S.optional(S.String).pipe(T.HttpQuery("blueprintVersion")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/blueprints/{blueprintArn}/" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteBlueprintRequest" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ libraryArn: S.String.pipe(T.HttpLabel("libraryArn")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/data-automation-libraries/{libraryArn}/" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteDataAutomationLibraryRequest" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ projectArn: S.String.pipe(T.HttpLabel("projectArn")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/data-automation-projects/{projectArn}/" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteDataAutomationProjectRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ projectArn: S.String, status: S.optional(S.String) }),
      ).annotate({ identifier: "DeleteDataAutomationProjectResponse" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          blueprintArn: S.String.pipe(T.HttpLabel("blueprintArn")),
          blueprintVersion: S.optional(S.String),
          blueprintStage: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/blueprints/{blueprintArn}/" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetBlueprintRequest" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ invocationArn: S.String.pipe(T.HttpLabel("invocationArn")) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/getBlueprintOptimizationStatus/{invocationArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetBlueprintOptimizationStatusRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          status: S.optional(S.String),
          errorType: S.optional(S.String),
          errorMessage: S.optional(S.String),
          outputConfiguration: S.optional(__S(352, __c11, 0)),
        }),
      ).annotate({ identifier: "GetBlueprintOptimizationStatusResponse" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ s3Object: __S(1280, __c40, 0) })).annotate({
        identifier: "BlueprintOptimizationOutputConfiguration",
      });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ libraryArn: S.String.pipe(T.HttpLabel("libraryArn")) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/data-automation-libraries/{libraryArn}/" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetDataAutomationLibraryRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ entityType: S.String, entityMetadata: S.optional(S.String) }),
      ).annotate({ identifier: "EntityTypeInfo" });
    case 2:
      return S.Array(__S(385, __c12, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          libraryArn: S.String,
          creationTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          libraryName: SensitiveString,
          libraryDescription: S.optional(SensitiveString),
          status: S.String,
          entityTypes: S.optional(__S(386, __c12, 2)),
          kmsKeyId: S.optional(S.String),
          kmsEncryptionContext: S.optional(__S(1248, __c39, 0)),
        }),
      ).annotate({ identifier: "DataAutomationLibrary" });
    case 4:
      return S.suspend(() => S.Struct({ library: S.optional(__S(387, __c12, 3)) })).annotate({
        identifier: "GetDataAutomationLibraryResponse",
      });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          libraryArn: S.String.pipe(T.HttpLabel("libraryArn")),
          entityType: S.String.pipe(T.HttpLabel("entityType")),
          entityId: S.String.pipe(T.HttpLabel("entityId")),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/data-automation-libraries/{libraryArn}/entityType/{entityType}/entities/{entityId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetDataAutomationLibraryEntityRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          entityId: S.optional(S.String),
          description: S.optional(SensitiveString),
          language: S.optional(S.String),
          phrases: S.optional(__S(449, __c14, 1)),
          lastModifiedTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "VocabularyEntity" });
    case 2:
      return S.Union([/*@__PURE__*/ S.Struct({ vocabulary: __S(417, __c13, 1) })]);
    case 3:
      return S.suspend(() => S.Struct({ entity: S.optional(__S(418, __c13, 2)) })).annotate({
        identifier: "GetDataAutomationLibraryEntityResponse",
      });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ text: SensitiveString, displayAsText: S.optional(SensitiveString) }),
      ).annotate({ identifier: "Phrase" });
    case 1:
      return S.Array(__S(448, __c14, 0));
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          libraryArn: S.String.pipe(T.HttpLabel("libraryArn")),
          jobArn: S.String.pipe(T.HttpLabel("jobArn")),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/data-automation-libraries/{libraryArn}/library-ingestion-jobs/{jobArn}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetDataAutomationLibraryIngestionJobRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          jobArn: S.String,
          creationTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          entityType: S.String,
          operationType: S.String,
          jobStatus: S.String,
          outputConfiguration: __S(512, __c16, 0),
          completionTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          errorMessage: S.optional(S.String),
          errorType: S.optional(S.String),
        }),
      ).annotate({ identifier: "DataAutomationLibraryIngestionJob" });
    case 2:
      return S.suspend(() => S.Struct({ job: S.optional(__S(481, __c15, 1)) })).annotate({
        identifier: "GetDataAutomationLibraryIngestionJobResponse",
      });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ s3Uri: S.String })).annotate({
        identifier: "OutputConfiguration",
      });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          projectArn: S.String.pipe(T.HttpLabel("projectArn")),
          projectStage: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/data-automation-projects/{projectArn}/" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetDataAutomationProjectRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          projectArn: S.String,
          creationTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          lastModifiedTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          projectName: SensitiveString,
          projectStage: S.optional(S.String),
          projectType: S.optional(S.String),
          projectDescription: S.optional(SensitiveString),
          standardOutputConfiguration: S.optional(__S(142, __c4, 14)),
          customOutputConfiguration: S.optional(__S(145, __c4, 17)),
          overrideConfiguration: S.optional(__S(154, __c4, 26)),
          dataAutomationLibraryConfiguration: S.optional(__S(156, __c4, 28)),
          status: S.String,
          kmsKeyId: S.optional(S.String),
          kmsEncryptionContext: S.optional(__S(1248, __c39, 0)),
        }),
      ).annotate({ identifier: "DataAutomationProject" });
    case 2:
      return S.suspend(() => S.Struct({ project: __S(545, __c17, 1) })).annotate({
        identifier: "GetDataAutomationProjectResponse",
      });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ blueprintArn: S.String, stage: S.optional(S.String) }),
      ).annotate({ identifier: "BlueprintOptimizationObject" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          blueprint: __S(576, __c18, 0),
          samples: __S(1313, __c41, 1),
          outputConfiguration: __S(352, __c11, 0),
          dataAutomationProfileArn: S.String,
          encryptionConfiguration: S.optional(__S(1216, __c38, 0)),
          tags: S.optional(__S(1185, __c37, 1)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/invokeBlueprintOptimizationAsync" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "InvokeBlueprintOptimizationAsyncRequest" });
    case 2:
      return S.suspend(() => S.Struct({ invocationArn: S.String })).annotate({
        identifier: "InvokeBlueprintOptimizationAsyncResponse",
      });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          entityId: S.optional(S.String),
          description: S.optional(SensitiveString),
          language: S.String,
          phrases: __S(449, __c14, 1),
        }),
      ).annotate({ identifier: "VocabularyEntityInfo" });
    case 1:
      return S.Union([/*@__PURE__*/ S.Struct({ vocabulary: __S(608, __c19, 0) })]);
    case 2:
      return S.Array(__S(609, __c19, 1));
    case 3:
      return S.suspend(() => S.Struct({ entityIds: __S(640, __c20, 0) })).annotate({
        identifier: "DeleteEntitiesInfo",
      });
    case 4:
      return S.Union([
        /*@__PURE__*/ S.Struct({ upsertEntitiesInfo: __S(610, __c19, 2) }),
        /*@__PURE__*/ S.Struct({ deleteEntitiesInfo: __S(611, __c19, 3) }),
      ]);
    case 5:
      return S.suspend(() =>
        S.Struct({
          s3Object: S.optional(__S(1280, __c40, 0)),
          inlinePayload: S.optional(__S(612, __c19, 4)),
        }),
      ).annotate({ identifier: "InputConfiguration" });
    case 6:
      return S.suspend(() => S.Struct({ eventBridgeEnabled: S.Boolean })).annotate({
        identifier: "EventBridgeConfiguration",
      });
    case 7:
      return S.suspend(() => S.Struct({ eventBridgeConfiguration: __S(614, __c19, 6) })).annotate({
        identifier: "NotificationConfiguration",
      });
    case 8:
      return S.suspend(() =>
        S.Struct({
          libraryArn: S.String.pipe(T.HttpLabel("libraryArn")),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          inputConfiguration: __S(613, __c19, 5),
          entityType: S.String,
          operationType: S.String,
          outputConfiguration: __S(512, __c16, 0),
          notificationConfiguration: S.optional(__S(615, __c19, 7)),
          tags: S.optional(__S(1185, __c37, 1)),
        }).pipe(
          T.all(
            T.Http({
              method: "PUT",
              uri: "/data-automation-libraries/{libraryArn}/library-ingestion-jobs/",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "InvokeDataAutomationLibraryIngestionJobRequest" });
    case 9:
      return S.suspend(() => S.Struct({ jobArn: S.optional(S.String) })).annotate({
        identifier: "InvokeDataAutomationLibraryIngestionJobResponse",
      });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          blueprintArn: S.optional(S.String),
          resourceOwner: S.optional(S.String),
          blueprintStageFilter: S.optional(S.String),
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
          projectFilter: S.optional(__S(704, __c22, 0)),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/blueprints/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListBlueprintsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          blueprintArn: S.String,
          blueprintVersion: S.optional(S.String),
          blueprintStage: S.optional(S.String),
          blueprintName: S.optional(SensitiveString),
          creationTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          lastModifiedTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "BlueprintSummary" });
    case 2:
      return S.Array(__S(673, __c21, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ blueprints: __S(674, __c21, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListBlueprintsResponse" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ projectArn: S.String, projectStage: S.optional(S.String) }),
      ).annotate({ identifier: "DataAutomationProjectFilter" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
          projectFilter: S.optional(__S(704, __c22, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/data-automation-libraries/" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListDataAutomationLibrariesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          libraryArn: S.String,
          libraryName: S.optional(SensitiveString),
          creationTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }),
      ).annotate({ identifier: "DataAutomationLibrarySummary" });
    case 2:
      return S.Array(__S(737, __c23, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ libraries: S.optional(__S(738, __c23, 2)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListDataAutomationLibrariesResponse" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          libraryArn: S.String.pipe(T.HttpLabel("libraryArn")),
          entityType: S.String.pipe(T.HttpLabel("entityType")),
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/data-automation-libraries/{libraryArn}/entityType/{entityType}/entities/",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListDataAutomationLibraryEntitiesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          entityId: S.optional(S.String),
          description: S.optional(SensitiveString),
          language: S.optional(S.String),
          numOfPhrases: S.optional(S.Number),
          lastModifiedTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "VocabularyEntitySummary" });
    case 2:
      return S.Union([/*@__PURE__*/ S.Struct({ vocabulary: __S(769, __c24, 1) })]);
    case 3:
      return S.Array(__S(770, __c24, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({ entities: S.optional(__S(771, __c24, 3)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListDataAutomationLibraryEntitiesResponse" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          libraryArn: S.String.pipe(T.HttpLabel("libraryArn")),
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/data-automation-libraries/{libraryArn}/library-ingestion-jobs/",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListDataAutomationLibraryIngestionJobsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          jobArn: S.String,
          jobStatus: S.String,
          entityType: S.String,
          operationType: S.String,
          creationTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          completionTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "DataAutomationLibraryIngestionJobSummary" });
    case 2:
      return S.Array(__S(801, __c25, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ jobs: S.optional(__S(802, __c25, 2)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListDataAutomationLibraryIngestionJobsResponse" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
          projectStageFilter: S.optional(S.String),
          blueprintFilter: S.optional(__S(96, __c3, 0)),
          resourceOwner: S.optional(S.String),
          libraryFilter: S.optional(__S(97, __c3, 1)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/data-automation-projects/" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListDataAutomationProjectsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          projectArn: S.String,
          projectStage: S.optional(S.String),
          projectType: S.optional(S.String),
          projectName: S.optional(SensitiveString),
          creationTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }),
      ).annotate({ identifier: "DataAutomationProjectSummary" });
    case 2:
      return S.Array(__S(833, __c26, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ projects: __S(834, __c26, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListDataAutomationProjectsResponse" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceARN: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/listTagsForResource" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListTagsForResourceRequest" });
    case 1:
      return S.suspend(() => S.Struct({ tags: S.optional(__S(1185, __c37, 1)) })).annotate({
        identifier: "ListTagsForResourceResponse",
      });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceARN: S.String, tags: __S(1185, __c37, 1) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/tagResource" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "TagResourceRequest" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceARN: S.String, tagKeys: __S(640, __c20, 0) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/untagResource" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UntagResourceRequest" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          blueprintArn: S.String.pipe(T.HttpLabel("blueprintArn")),
          schema: SensitiveString,
          blueprintStage: S.optional(S.String),
          encryptionConfiguration: S.optional(__S(1216, __c38, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/blueprints/{blueprintArn}/" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateBlueprintRequest" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          libraryArn: S.String.pipe(T.HttpLabel("libraryArn")),
          libraryDescription: S.optional(SensitiveString),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/data-automation-libraries/{libraryArn}/" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateDataAutomationLibraryRequest" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          projectArn: S.String.pipe(T.HttpLabel("projectArn")),
          projectStage: S.optional(S.String),
          projectDescription: S.optional(SensitiveString),
          standardOutputConfiguration: __S(142, __c4, 14),
          customOutputConfiguration: S.optional(__S(145, __c4, 17)),
          overrideConfiguration: S.optional(__S(154, __c4, 26)),
          dataAutomationLibraryConfiguration: S.optional(__S(156, __c4, 28)),
          encryptionConfiguration: S.optional(__S(1216, __c38, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/data-automation-projects/{projectArn}/" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateDataAutomationProjectRequest" });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ name: S.String, message: S.String })).annotate({
        identifier: "ValidationExceptionField",
      });
    case 1:
      return S.Array(__S(1056, __c33, 0));
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          blueprintArn: S.String.pipe(T.HttpLabel("blueprintArn")),
          sourceStage: S.String,
          targetStage: S.String,
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/blueprints/{blueprintArn}/copy-stage" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CopyBlueprintStageRequest" });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "CopyBlueprintStageResponse" });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          blueprintName: SensitiveString,
          type: S.String,
          blueprintStage: S.optional(S.String),
          schema: SensitiveString,
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          encryptionConfiguration: S.optional(__S(1216, __c38, 0)),
          tags: S.optional(__S(1185, __c37, 1)),
        }).pipe(
          T.all(T.Http({ method: "PUT", uri: "/blueprints/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateBlueprintRequest" });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ key: S.String, value: S.String })).annotate({
        identifier: "Tag",
      });
    case 1:
      return S.Array(__S(1184, __c37, 0));
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ kmsKeyId: S.String, kmsEncryptionContext: S.optional(__S(1248, __c39, 0)) }),
      ).annotate({ identifier: "EncryptionConfiguration" });
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ s3Uri: S.String, version: S.optional(S.String) })).annotate(
        { identifier: "S3Object" },
      );
  }
}
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ assetS3Object: __S(1280, __c40, 0), groundTruthS3Object: __S(1280, __c40, 0) }),
      ).annotate({ identifier: "BlueprintOptimizationSample" });
    case 1:
      return S.Array(__S(1312, __c41, 0));
  }
}
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          blueprintArn: S.String,
          schema: SensitiveString,
          type: S.String,
          creationTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          lastModifiedTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          blueprintName: SensitiveString,
          blueprintVersion: S.optional(S.String),
          blueprintStage: S.optional(S.String),
          kmsKeyId: S.optional(S.String),
          kmsEncryptionContext: S.optional(__S(1248, __c39, 0)),
          optimizationSamples: S.optional(__S(1313, __c41, 1)),
          optimizationTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "Blueprint" });
    case 1:
      return S.suspend(() => S.Struct({ blueprint: __S(1344, __c42, 0) })).annotate({
        identifier: "CreateBlueprintResponse",
      });
  }
}
function __c43(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          blueprintArn: S.String.pipe(T.HttpLabel("blueprintArn")),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/blueprints/{blueprintArn}/versions/" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateBlueprintVersionRequest" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
