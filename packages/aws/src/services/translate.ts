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
  sdkId: "Translate",
  target: "AWSShineFrontendService_20170701",
  version: "2017-07-01",
  sigv4: "translate",
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
                `https://translate-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://translate-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://translate.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://translate.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class ConcurrentModificationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ConcurrentModificationException",
    ["ConflictError"],
    { status: 409 },
  )<{ readonly message?: string }> {}
export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError("ConflictException", ["ConflictError"], {
    status: 409,
  })<{ readonly message?: string }> {}
export class DetectedLanguageLowConfidenceException
  extends /*@__PURE__*/ TE.TaggedError(
    "DetectedLanguageLowConfidenceException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string; readonly DetectedLanguageCode?: string }> {}
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
export class InvalidParameterValueException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidParameterValueException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidRequestException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidRequestException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class LimitExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "LimitExceededException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class ServiceUnavailableException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceUnavailableException",
    ["ServerError"],
    { status: 503 },
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
export class TooManyTagsException
  extends /*@__PURE__*/ TE.TaggedError(
    "TooManyTagsException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string; readonly ResourceArn?: string }> {}
export class UnsupportedDisplayLanguageCodeException
  extends /*@__PURE__*/ TE.TaggedError(
    "UnsupportedDisplayLanguageCodeException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string; readonly DisplayLanguageCode?: string }> {}
export class UnsupportedLanguagePairException
  extends /*@__PURE__*/ TE.TaggedError(
    "UnsupportedLanguagePairException",
    ["BadRequestError"],
    { status: 400 },
  )<{
    readonly message?: string;
    readonly SourceLanguageCode?: string;
    readonly TargetLanguageCode?: string;
  }> {}
export type ResourceName = string;
export type Description = string;
export type S3Uri = string;
export type ParallelDataFormat = "TSV" | "CSV" | "TMX" | (string & {});
export interface ParallelDataConfig {
  S3Uri?: string;
  Format?: ParallelDataFormat;
}
export type EncryptionKeyType = "KMS" | (string & {});
export type EncryptionKeyID = string;
export interface EncryptionKey {
  Type: EncryptionKeyType;
  Id: string;
}
export type ClientTokenString = string;
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  Key: string;
  Value: string;
}
export type TagList = Tag[];
export interface CreateParallelDataRequest {
  Name: string;
  Description?: string;
  ParallelDataConfig: ParallelDataConfig;
  EncryptionKey?: EncryptionKey;
  ClientToken: string;
  Tags?: Tag[];
}
export type ParallelDataStatus =
  | "CREATING"
  | "UPDATING"
  | "ACTIVE"
  | "DELETING"
  | "FAILED"
  | (string & {});
export interface CreateParallelDataResponse {
  Name?: string;
  Status?: ParallelDataStatus;
}
export interface DeleteParallelDataRequest {
  Name: string;
}
export interface DeleteParallelDataResponse {
  Name?: string;
  Status?: ParallelDataStatus;
}
export interface DeleteTerminologyRequest {
  Name: string;
}
export interface DeleteTerminologyResponse {}
export type JobId = string;
export interface DescribeTextTranslationJobRequest {
  JobId: string;
}
export type JobName = string;
export type JobStatus =
  | "SUBMITTED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "COMPLETED_WITH_ERROR"
  | "FAILED"
  | "STOP_REQUESTED"
  | "STOPPED"
  | (string & {});
export interface JobDetails {
  TranslatedDocumentsCount?: number;
  DocumentsWithErrorsCount?: number;
  InputDocumentsCount?: number;
}
export type LanguageCodeString = string;
export type TargetLanguageCodeStringList = string[];
export type ResourceNameList = string[];
export type UnboundedLengthString = string;
export type ContentType = string;
export interface InputDataConfig {
  S3Uri: string;
  ContentType: string;
}
export interface OutputDataConfig {
  S3Uri: string;
  EncryptionKey?: EncryptionKey;
}
export type IamRoleArn = string;
export type Formality = "FORMAL" | "INFORMAL" | (string & {});
export type Profanity = "MASK" | (string & {});
export type Brevity = "ON" | (string & {});
export interface TranslationSettings {
  Formality?: Formality;
  Profanity?: Profanity;
  Brevity?: Brevity;
}
export interface TextTranslationJobProperties {
  JobId?: string;
  JobName?: string;
  JobStatus?: JobStatus;
  JobDetails?: JobDetails;
  SourceLanguageCode?: string;
  TargetLanguageCodes?: string[];
  TerminologyNames?: string[];
  ParallelDataNames?: string[];
  Message?: string;
  SubmittedTime?: Date;
  EndTime?: Date;
  InputDataConfig?: InputDataConfig;
  OutputDataConfig?: OutputDataConfig;
  DataAccessRoleArn?: string;
  Settings?: TranslationSettings;
}
export interface DescribeTextTranslationJobResponse {
  TextTranslationJobProperties?: TextTranslationJobProperties;
}
export interface GetParallelDataRequest {
  Name: string;
}
export type ParallelDataArn = string;
export type LanguageCodeStringList = string[];
export interface ParallelDataProperties {
  Name?: string;
  Arn?: string;
  Description?: string;
  Status?: ParallelDataStatus;
  SourceLanguageCode?: string;
  TargetLanguageCodes?: string[];
  ParallelDataConfig?: ParallelDataConfig;
  Message?: string;
  ImportedDataSize?: number;
  ImportedRecordCount?: number;
  FailedRecordCount?: number;
  SkippedRecordCount?: number;
  EncryptionKey?: EncryptionKey;
  CreatedAt?: Date;
  LastUpdatedAt?: Date;
  LatestUpdateAttemptStatus?: ParallelDataStatus;
  LatestUpdateAttemptAt?: Date;
}
export interface ParallelDataDataLocation {
  RepositoryType: string;
  Location: string;
}
export interface GetParallelDataResponse {
  ParallelDataProperties?: ParallelDataProperties;
  DataLocation?: ParallelDataDataLocation;
  AuxiliaryDataLocation?: ParallelDataDataLocation;
  LatestUpdateAttemptAuxiliaryDataLocation?: ParallelDataDataLocation;
}
export type TerminologyDataFormat = "CSV" | "TMX" | "TSV" | (string & {});
export interface GetTerminologyRequest {
  Name: string;
  TerminologyDataFormat?: TerminologyDataFormat;
}
export type TerminologyArn = string;
export type Directionality = "UNI" | "MULTI" | (string & {});
export interface TerminologyProperties {
  Name?: string;
  Description?: string;
  Arn?: string;
  SourceLanguageCode?: string;
  TargetLanguageCodes?: string[];
  EncryptionKey?: EncryptionKey;
  SizeBytes?: number;
  TermCount?: number;
  CreatedAt?: Date;
  LastUpdatedAt?: Date;
  Directionality?: Directionality;
  Message?: string;
  SkippedTermCount?: number;
  Format?: TerminologyDataFormat;
}
export interface TerminologyDataLocation {
  RepositoryType: string;
  Location: string;
}
export interface GetTerminologyResponse {
  TerminologyProperties?: TerminologyProperties;
  TerminologyDataLocation?: TerminologyDataLocation;
  AuxiliaryDataLocation?: TerminologyDataLocation;
}
export type MergeStrategy = "OVERWRITE" | (string & {});
export type TerminologyFile = Uint8Array | redacted.Redacted<Uint8Array>;
export interface TerminologyData {
  File: Uint8Array | redacted.Redacted<Uint8Array>;
  Format: TerminologyDataFormat;
  Directionality?: Directionality;
}
export interface ImportTerminologyRequest {
  Name: string;
  MergeStrategy: MergeStrategy;
  Description?: string;
  TerminologyData: TerminologyData;
  EncryptionKey?: EncryptionKey;
  Tags?: Tag[];
}
export interface ImportTerminologyResponse {
  TerminologyProperties?: TerminologyProperties;
  AuxiliaryDataLocation?: TerminologyDataLocation;
}
export type DisplayLanguageCode =
  | "de"
  | "en"
  | "es"
  | "fr"
  | "it"
  | "ja"
  | "ko"
  | "pt"
  | "zh"
  | "zh-TW"
  | (string & {});
export type NextToken = string;
export type MaxResultsInteger = number;
export interface ListLanguagesRequest {
  DisplayLanguageCode?: DisplayLanguageCode;
  NextToken?: string;
  MaxResults?: number;
}
export type LocalizedNameString = string;
export interface Language {
  LanguageName: string;
  LanguageCode: string;
}
export type LanguagesList = Language[];
export interface ListLanguagesResponse {
  Languages?: Language[];
  DisplayLanguageCode?: DisplayLanguageCode;
  NextToken?: string;
}
export interface ListParallelDataRequest {
  NextToken?: string;
  MaxResults?: number;
}
export type ParallelDataPropertiesList = ParallelDataProperties[];
export interface ListParallelDataResponse {
  ParallelDataPropertiesList?: ParallelDataProperties[];
  NextToken?: string;
}
export type ResourceArn = string;
export interface ListTagsForResourceRequest {
  ResourceArn: string;
}
export interface ListTagsForResourceResponse {
  Tags?: Tag[];
}
export interface ListTerminologiesRequest {
  NextToken?: string;
  MaxResults?: number;
}
export type TerminologyPropertiesList = TerminologyProperties[];
export interface ListTerminologiesResponse {
  TerminologyPropertiesList?: TerminologyProperties[];
  NextToken?: string;
}
export interface TextTranslationJobFilter {
  JobName?: string;
  JobStatus?: JobStatus;
  SubmittedBeforeTime?: Date;
  SubmittedAfterTime?: Date;
}
export interface ListTextTranslationJobsRequest {
  Filter?: TextTranslationJobFilter;
  NextToken?: string;
  MaxResults?: number;
}
export type TextTranslationJobPropertiesList = TextTranslationJobProperties[];
export interface ListTextTranslationJobsResponse {
  TextTranslationJobPropertiesList?: TextTranslationJobProperties[];
  NextToken?: string;
}
export interface StartTextTranslationJobRequest {
  JobName?: string;
  InputDataConfig: InputDataConfig;
  OutputDataConfig: OutputDataConfig;
  DataAccessRoleArn: string;
  SourceLanguageCode: string;
  TargetLanguageCodes: string[];
  TerminologyNames?: string[];
  ParallelDataNames?: string[];
  ClientToken: string;
  Settings?: TranslationSettings;
}
export interface StartTextTranslationJobResponse {
  JobId?: string;
  JobStatus?: JobStatus;
}
export interface StopTextTranslationJobRequest {
  JobId: string;
}
export interface StopTextTranslationJobResponse {
  JobId?: string;
  JobStatus?: JobStatus;
}
export interface TagResourceRequest {
  ResourceArn: string;
  Tags: Tag[];
}
export interface TagResourceResponse {}
export type DocumentContent = Uint8Array | redacted.Redacted<Uint8Array>;
export interface Document {
  Content: Uint8Array | redacted.Redacted<Uint8Array>;
  ContentType: string;
}
export interface TranslateDocumentRequest {
  Document: Document;
  TerminologyNames?: string[];
  SourceLanguageCode: string;
  TargetLanguageCode: string;
  Settings?: TranslationSettings;
}
export type TranslatedDocumentContent =
  | Uint8Array
  | redacted.Redacted<Uint8Array>;
export interface TranslatedDocument {
  Content: Uint8Array | redacted.Redacted<Uint8Array>;
}
export interface Term {
  SourceText?: string;
  TargetText?: string;
}
export type TermList = Term[];
export interface AppliedTerminology {
  Name?: string;
  Terms?: Term[];
}
export type AppliedTerminologyList = AppliedTerminology[];
export interface TranslateDocumentResponse {
  TranslatedDocument: TranslatedDocument;
  SourceLanguageCode: string;
  TargetLanguageCode: string;
  AppliedTerminologies?: AppliedTerminology[];
  AppliedSettings?: TranslationSettings;
}
export type BoundedLengthString = string;
export interface TranslateTextRequest {
  Text: string;
  TerminologyNames?: string[];
  SourceLanguageCode: string;
  TargetLanguageCode: string;
  Settings?: TranslationSettings;
}
export type TranslatedTextString = string;
export interface TranslateTextResponse {
  TranslatedText: string;
  SourceLanguageCode: string;
  TargetLanguageCode: string;
  AppliedTerminologies?: AppliedTerminology[];
  AppliedSettings?: TranslationSettings;
}
export type TagKeyList = string[];
export interface UntagResourceRequest {
  ResourceArn: string;
  TagKeys: string[];
}
export interface UntagResourceResponse {}
export interface UpdateParallelDataRequest {
  Name: string;
  Description?: string;
  ParallelDataConfig: ParallelDataConfig;
  ClientToken: string;
}
export interface UpdateParallelDataResponse {
  Name?: string;
  Status?: ParallelDataStatus;
  LatestUpdateAttemptStatus?: ParallelDataStatus;
  LatestUpdateAttemptAt?: Date;
}
export type CreateParallelDataError =
  | ConcurrentModificationException
  | ConflictException
  | InternalServerException
  | InvalidParameterValueException
  | InvalidRequestException
  | LimitExceededException
  | TooManyRequestsException
  | TooManyTagsException
  | CommonErrors;
/**
 * Creates a parallel data resource in Amazon Translate by importing an input file from
 * Amazon S3. Parallel data files contain examples that show how you want segments of text to be
 * translated. By adding parallel data, you can influence the style, tone, and word choice in
 * your translation output.
 */
export const createParallelData: API.OperationMethod<
  CreateParallelDataRequest,
  CreateParallelDataResponse,
  CreateParallelDataError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Name: 0,
      Description: 0,
      ParallelDataConfig: i_ParallelDataConfig,
      EncryptionKey: i_EncryptionKey,
      ClientToken: D.m({ idempotency: true }),
      Tags: D.list(i_Tag),
    },
  },
  errors: [
    ConcurrentModificationException,
    ConflictException,
    InternalServerException,
    InvalidParameterValueException,
    InvalidRequestException,
    LimitExceededException,
    TooManyRequestsException,
    TooManyTagsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateParallelData",
})) as any;

export type DeleteParallelDataError =
  | ConcurrentModificationException
  | InternalServerException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes a parallel data resource in Amazon Translate.
 */
export const deleteParallelData: API.OperationMethod<
  DeleteParallelDataRequest,
  DeleteParallelDataResponse,
  DeleteParallelDataError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { Name: 0 } },
  errors: [
    ConcurrentModificationException,
    InternalServerException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteParallelData",
})) as any;

export type DeleteTerminologyError =
  | InternalServerException
  | InvalidParameterValueException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * A synchronous action that deletes a custom terminology.
 */
export const deleteTerminology: API.OperationMethod<
  DeleteTerminologyRequest,
  DeleteTerminologyResponse,
  DeleteTerminologyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { Name: 0 } },
  errors: [
    InternalServerException,
    InvalidParameterValueException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTerminology",
})) as any;

export type DescribeTextTranslationJobError =
  | InternalServerException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets the properties associated with an asynchronous batch translation job including name,
 * ID, status, source and target languages, input/output S3 buckets, and so on.
 */
export const describeTextTranslationJob: API.OperationMethod<
  DescribeTextTranslationJobRequest,
  DescribeTextTranslationJobResponse,
  DescribeTextTranslationJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { JobId: 0 },
    output: { TextTranslationJobProperties: o_TextTranslationJobProperties },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeTextTranslationJob",
})) as any;

export type GetParallelDataError =
  | InternalServerException
  | InvalidParameterValueException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Provides information about a parallel data resource.
 */
export const getParallelData: API.OperationMethod<
  GetParallelDataRequest,
  GetParallelDataResponse,
  GetParallelDataError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { Name: 0 },
    output: { ParallelDataProperties: o_ParallelDataProperties },
  },
  errors: [
    InternalServerException,
    InvalidParameterValueException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetParallelData",
})) as any;

export type GetTerminologyError =
  | InternalServerException
  | InvalidParameterValueException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves a custom terminology.
 */
export const getTerminology: API.OperationMethod<
  GetTerminologyRequest,
  GetTerminologyResponse,
  GetTerminologyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { Name: 0, TerminologyDataFormat: 0 },
    output: { TerminologyProperties: o_TerminologyProperties },
  },
  errors: [
    InternalServerException,
    InvalidParameterValueException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTerminology",
})) as any;

export type ImportTerminologyError =
  | ConcurrentModificationException
  | InternalServerException
  | InvalidParameterValueException
  | LimitExceededException
  | TooManyRequestsException
  | TooManyTagsException
  | CommonErrors;
/**
 * Creates or updates a custom terminology, depending on whether one already exists for the
 * given terminology name. Importing a terminology with the same name as an existing one will
 * merge the terminologies based on the chosen merge strategy. The only supported merge strategy
 * is OVERWRITE, where the imported terminology overwrites the existing terminology of the same
 * name.
 *
 * If you import a terminology that overwrites an existing one, the new terminology takes up
 * to 10 minutes to fully propagate. After that, translations have access to the new
 * terminology.
 */
export const importTerminology: API.OperationMethod<
  ImportTerminologyRequest,
  ImportTerminologyResponse,
  ImportTerminologyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Name: 0,
      MergeStrategy: 0,
      Description: 0,
      TerminologyData: { File: 0, Format: 0, Directionality: 0 },
      EncryptionKey: i_EncryptionKey,
      Tags: D.list(i_Tag),
    },
    output: { TerminologyProperties: o_TerminologyProperties },
  },
  errors: [
    ConcurrentModificationException,
    InternalServerException,
    InvalidParameterValueException,
    LimitExceededException,
    TooManyRequestsException,
    TooManyTagsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ImportTerminology",
})) as any;

export type ListLanguagesError =
  | InternalServerException
  | InvalidParameterValueException
  | TooManyRequestsException
  | UnsupportedDisplayLanguageCodeException
  | CommonErrors;
/**
 * Provides a list of languages (RFC-5646 codes and names) that Amazon Translate supports.
 */
export const listLanguages: API.PaginatedOperationMethod<
  ListLanguagesRequest,
  ListLanguagesResponse,
  ListLanguagesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { DisplayLanguageCode: 0, NextToken: 0, MaxResults: 0 },
  },
  errors: [
    InternalServerException,
    InvalidParameterValueException,
    TooManyRequestsException,
    UnsupportedDisplayLanguageCodeException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListLanguages",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListParallelDataError =
  | InternalServerException
  | InvalidParameterValueException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Provides a list of your parallel data resources in Amazon Translate.
 */
export const listParallelData: API.PaginatedOperationMethod<
  ListParallelDataRequest,
  ListParallelDataResponse,
  ListParallelDataError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { NextToken: 0, MaxResults: 0 },
    output: { ParallelDataPropertiesList: D.list(o_ParallelDataProperties) },
  },
  errors: [
    InternalServerException,
    InvalidParameterValueException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListParallelData",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | InternalServerException
  | InvalidParameterValueException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Lists all tags associated with a given Amazon Translate resource.
 * For more information, see
 * Tagging your resources.
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
    InvalidParameterValueException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

export type ListTerminologiesError =
  | InternalServerException
  | InvalidParameterValueException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Provides a list of custom terminologies associated with your account.
 */
export const listTerminologies: API.PaginatedOperationMethod<
  ListTerminologiesRequest,
  ListTerminologiesResponse,
  ListTerminologiesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { NextToken: 0, MaxResults: 0 },
    output: { TerminologyPropertiesList: D.list(o_TerminologyProperties) },
  },
  errors: [
    InternalServerException,
    InvalidParameterValueException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTerminologies",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTextTranslationJobsError =
  | InternalServerException
  | InvalidFilterException
  | InvalidRequestException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets a list of the batch translation jobs that you have submitted.
 */
export const listTextTranslationJobs: API.PaginatedOperationMethod<
  ListTextTranslationJobsRequest,
  ListTextTranslationJobsResponse,
  ListTextTranslationJobsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      Filter: {
        JobName: 0,
        JobStatus: 0,
        SubmittedBeforeTime: 0,
        SubmittedAfterTime: 0,
      },
      NextToken: 0,
      MaxResults: 0,
    },
    output: {
      TextTranslationJobPropertiesList: D.list(o_TextTranslationJobProperties),
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
  operationName: "ListTextTranslationJobs",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type StartTextTranslationJobError =
  | InternalServerException
  | InvalidParameterValueException
  | InvalidRequestException
  | ResourceNotFoundException
  | TooManyRequestsException
  | UnsupportedLanguagePairException
  | CommonErrors;
/**
 * Starts an asynchronous batch translation job. Use batch translation jobs to
 * translate large volumes of text across multiple documents at once.
 * For batch translation, you can input documents with different source languages (specify `auto`
 * as the source language). You can specify one
 * or more target languages. Batch translation translates each input document into each of the target languages.
 * For more information, see
 * Asynchronous batch processing.
 *
 * Batch translation jobs can be described with the DescribeTextTranslationJob operation, listed with the ListTextTranslationJobs operation, and stopped with the StopTextTranslationJob operation.
 */
export const startTextTranslationJob: API.OperationMethod<
  StartTextTranslationJobRequest,
  StartTextTranslationJobResponse,
  StartTextTranslationJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      JobName: 0,
      InputDataConfig: { S3Uri: 0, ContentType: 0 },
      OutputDataConfig: { S3Uri: 0, EncryptionKey: i_EncryptionKey },
      DataAccessRoleArn: 0,
      SourceLanguageCode: 0,
      TargetLanguageCodes: 0,
      TerminologyNames: 0,
      ParallelDataNames: 0,
      ClientToken: D.m({ idempotency: true }),
      Settings: i_TranslationSettings,
    },
  },
  errors: [
    InternalServerException,
    InvalidParameterValueException,
    InvalidRequestException,
    ResourceNotFoundException,
    TooManyRequestsException,
    UnsupportedLanguagePairException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartTextTranslationJob",
})) as any;

export type StopTextTranslationJobError =
  | InternalServerException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Stops an asynchronous batch translation job that is in progress.
 *
 * If the job's state is `IN_PROGRESS`, the job will be marked for termination and
 * put into the `STOP_REQUESTED` state. If the job completes before it can be stopped,
 * it is put into the `COMPLETED` state. Otherwise, the job is put into the
 * `STOPPED` state.
 *
 * Asynchronous batch translation jobs are started with the StartTextTranslationJob operation. You can use the DescribeTextTranslationJob or ListTextTranslationJobs
 * operations to get a batch translation job's `JobId`.
 */
export const stopTextTranslationJob: API.OperationMethod<
  StopTextTranslationJobRequest,
  StopTextTranslationJobResponse,
  StopTextTranslationJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { JobId: 0 } },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopTextTranslationJob",
})) as any;

export type TagResourceError =
  | ConcurrentModificationException
  | InternalServerException
  | InvalidParameterValueException
  | ResourceNotFoundException
  | TooManyTagsException
  | CommonErrors;
/**
 * Associates a specific tag with a resource. A tag is a key-value pair
 * that adds as a metadata to a resource.
 * For more information, see
 * Tagging your resources.
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
    InvalidParameterValueException,
    ResourceNotFoundException,
    TooManyTagsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

export type TranslateDocumentError =
  | InternalServerException
  | InvalidRequestException
  | LimitExceededException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | UnsupportedLanguagePairException
  | CommonErrors;
/**
 * Translates the input document from the source language to the target language.
 * This synchronous operation supports text, HTML, or Word documents as the input document.
 *
 * `TranslateDocument` supports translations from English to any supported language,
 * and from any supported language to English. Therefore, specify either the source language code
 * or the target language code as “en” (English).
 *
 * If you set the `Formality` parameter, the request will fail if the target language does
 * not support formality. For a list of target languages that support formality, see
 * Setting formality.
 */
export const translateDocument: API.OperationMethod<
  TranslateDocumentRequest,
  TranslateDocumentResponse,
  TranslateDocumentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Document: { Content: 0, ContentType: 0 },
      TerminologyNames: 0,
      SourceLanguageCode: 0,
      TargetLanguageCode: 0,
      Settings: i_TranslationSettings,
    },
    output: { TranslatedDocument: { Content: D.secretBlob } },
  },
  errors: [
    InternalServerException,
    InvalidRequestException,
    LimitExceededException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
    UnsupportedLanguagePairException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TranslateDocument",
})) as any;

export type TranslateTextError =
  | DetectedLanguageLowConfidenceException
  | InternalServerException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | TextSizeLimitExceededException
  | TooManyRequestsException
  | UnsupportedLanguagePairException
  | CommonErrors;
/**
 * Translates input text from the source language to the target language. For a list of
 * available languages and language codes, see Supported languages.
 */
export const translateText: API.OperationMethod<
  TranslateTextRequest,
  TranslateTextResponse,
  TranslateTextError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Text: 0,
      TerminologyNames: 0,
      SourceLanguageCode: 0,
      TargetLanguageCode: 0,
      Settings: i_TranslationSettings,
    },
  },
  errors: [
    DetectedLanguageLowConfidenceException,
    InternalServerException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    TextSizeLimitExceededException,
    TooManyRequestsException,
    UnsupportedLanguagePairException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TranslateText",
})) as any;

export type UntagResourceError =
  | ConcurrentModificationException
  | InternalServerException
  | InvalidParameterValueException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Removes a specific tag associated with an Amazon Translate resource.
 * For more information, see
 * Tagging your resources.
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
    InvalidParameterValueException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

export type UpdateParallelDataError =
  | ConcurrentModificationException
  | ConflictException
  | InternalServerException
  | InvalidParameterValueException
  | InvalidRequestException
  | LimitExceededException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates a previously created parallel data resource by importing a new input file from
 * Amazon S3.
 */
export const updateParallelData: API.OperationMethod<
  UpdateParallelDataRequest,
  UpdateParallelDataResponse,
  UpdateParallelDataError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Name: 0,
      Description: 0,
      ParallelDataConfig: i_ParallelDataConfig,
      ClientToken: D.m({ idempotency: true }),
    },
    output: { LatestUpdateAttemptAt: D.ts },
  },
  errors: [
    ConcurrentModificationException,
    ConflictException,
    InternalServerException,
    InvalidParameterValueException,
    InvalidRequestException,
    LimitExceededException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateParallelData",
})) as any;

const i_EncryptionKey: D.LazyStruct = () => ({ Type: 0, Id: 0 });
const i_ParallelDataConfig: D.LazyStruct = () => ({ S3Uri: 0, Format: 0 });
const i_Tag: D.LazyStruct = () => ({ Key: 0, Value: 0 });
const i_TranslationSettings: D.LazyStruct = () => ({
  Formality: 0,
  Profanity: 0,
  Brevity: 0,
});
const o_ParallelDataProperties: D.LazyStruct = () => ({
  CreatedAt: D.ts,
  LastUpdatedAt: D.ts,
  LatestUpdateAttemptAt: D.ts,
});
const o_TerminologyProperties: D.LazyStruct = () => ({
  CreatedAt: D.ts,
  LastUpdatedAt: D.ts,
});
const o_TextTranslationJobProperties: D.LazyStruct = () => ({
  SubmittedTime: D.ts,
  EndTime: D.ts,
});
