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
const svc = /*@__PURE__*/ T.AwsApiService({ sdkId: "HealthLake", serviceShapeName: "HealthLake" });
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "healthlake" });
const ver = /*@__PURE__*/ T.ServiceVersion("2017-07-01");
const proto = /*@__PURE__*/ T.AwsProtocolsAwsJson1_0();
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
              `https://healthlake-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://healthlake-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://healthlake.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://healthlake.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://healthlake.{R}.{D}","properties":{},"headers":{}}');

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class AgentMessageOutOfContextException
  extends /*@__PURE__*/ S.TaggedError<AgentMessageOutOfContextException>()(
    "AgentMessageOutOfContextException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class ConversationNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ConversationNotFoundException>()(
    "ConversationNotFoundException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class FailedDependencyException
  extends /*@__PURE__*/ S.TaggedError<FailedDependencyException>()(
    "FailedDependencyException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(424),
  ) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError) {}
export class NotImplementedOperationException
  extends /*@__PURE__*/ S.TaggedError<NotImplementedOperationException>()(
    "NotImplementedOperationException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(501),
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
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class UnauthorizedException
  extends /*@__PURE__*/ S.TaggedError<UnauthorizedException>()(
    "UnauthorizedException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(401),
  ).pipe(C.withAuthError) {}
export class UnsupportedMIMETypeException
  extends /*@__PURE__*/ S.TaggedError<UnsupportedMIMETypeException>()(
    "UnsupportedMIMETypeException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(415),
  ).pipe(C.withBadRequestError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type SourceFormat = "CCDA" | "CSV" | (string & {});
export interface StarterProfileSource {
  StarterProfileName: string;
}
export interface ExistingVersionedProfileSource {
  ProfileId: string;
  Version: number;
}
export type StringMap = { [key: string]: string | undefined };
export interface ProfileMappingSource {
  ProfileMapping: { [key: string]: string | undefined };
}
export type SampleDataS3Uri = string;
export interface SampleDataSource {
  S3Uri: string;
}
export type CreateDataTransformationProfileSource =
  | {
      StarterProfile: StarterProfileSource;
      ExistingVersionedProfileId?: never;
      ProfileMapping?: never;
      SampleData?: never;
    }
  | {
      StarterProfile?: never;
      ExistingVersionedProfileId: ExistingVersionedProfileSource;
      ProfileMapping?: never;
      SampleData?: never;
    }
  | {
      StarterProfile?: never;
      ExistingVersionedProfileId?: never;
      ProfileMapping: ProfileMappingSource;
      SampleData?: never;
    }
  | {
      StarterProfile?: never;
      ExistingVersionedProfileId?: never;
      ProfileMapping?: never;
      SampleData: SampleDataSource;
    };
export type KmsKeyId = string;
export type ProfileDescription = string;
export type ProfileNameString = string;
export type DataTransformationTagKey = string;
export type DataTransformationTagValue = string;
export type TagMap = { [key: string]: string | undefined };
export type ClientToken = string;
export interface CreateDataTransformationProfileRequest {
  SourceFormat: SourceFormat;
  Source: CreateDataTransformationProfileSource;
  KmsKeyId?: string;
  ProfileDescription?: string;
  ProfileName: string;
  Tags?: { [key: string]: string | undefined };
  ClientToken?: string;
}
export type ProfileIdString = string;
export type ProfileVersion = number;
export type TargetFormat = "FHIR_R4" | (string & {});
export interface CreateDataTransformationProfileResponse {
  ProfileId: string;
  Version: number;
  SourceFormat: SourceFormat;
  TargetFormat: TargetFormat;
  ProfileName: string;
  LastUpdatedAt: Date;
}
export type DatastoreName = string;
export type FHIRVersion = "R4" | (string & {});
export type CmkType = "CUSTOMER_MANAGED_KMS_KEY" | "AWS_OWNED_KMS_KEY" | (string & {});
export type EncryptionKeyID = string;
export interface KmsEncryptionConfig {
  CmkType: CmkType;
  KmsKeyId?: string;
}
export interface SseConfiguration {
  KmsEncryptionConfig: KmsEncryptionConfig;
}
export type PreloadDataType = "SYNTHEA" | (string & {});
export interface PreloadDataConfig {
  PreloadDataType: PreloadDataType;
}
export type ClientTokenString = string;
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  Key: string;
  Value: string;
}
export type TagList = Tag[];
export type AuthorizationStrategy =
  | "SMART_ON_FHIR_V1"
  | "SMART_ON_FHIR"
  | "AWS_AUTH"
  | (string & {});
export type HealthLakeBoolean = boolean;
export type ConfigurationMetadata = string;
export type LambdaArn = string;
export interface IdentityProviderConfiguration {
  AuthorizationStrategy: AuthorizationStrategy;
  FineGrainedAuthorizationEnabled?: boolean;
  Metadata?: string;
  IdpLambdaArn?: string;
}
export type AnalyticsStatus =
  | "ENABLED"
  | "ENABLING"
  | "DISABLED"
  | "DISABLING"
  | "PAUSING"
  | "PAUSED"
  | (string & {});
export interface AnalyticsConfiguration {
  Status?: AnalyticsStatus;
}
export type NlpStatus = "ENABLED" | "ENABLING" | "DISABLED" | "DISABLING" | (string & {});
export interface NlpConfiguration {
  Status?: NlpStatus;
}
export type HealthLakeString = string;
export type DefaultProfiles = string[];
export interface ProfileConfiguration {
  DefaultProfiles?: string[];
}
export type BackupStatus = "ENABLED" | "DISABLED" | (string & {});
export type BackupType = "CONTINUOUS" | (string & {});
export type BackupRetentionPeriodInDays = number;
export interface BackupConfiguration {
  Status?: BackupStatus;
  BackupType?: BackupType;
  RetentionPeriodInDays?: number;
  BackupTagsEnabled?: boolean;
}
export interface CreateFHIRDatastoreRequest {
  DatastoreName?: string;
  DatastoreTypeVersion: FHIRVersion;
  SseConfiguration?: SseConfiguration;
  PreloadDataConfig?: PreloadDataConfig;
  ClientToken?: string;
  Tags?: Tag[];
  IdentityProviderConfiguration?: IdentityProviderConfiguration;
  AnalyticsConfiguration?: AnalyticsConfiguration;
  NlpConfiguration?: NlpConfiguration;
  ProfileConfiguration?: ProfileConfiguration;
  BackupConfiguration?: BackupConfiguration;
}
export type DatastoreId = string;
export type DatastoreArn = string;
export type DatastoreStatus =
  | "CREATING"
  | "ACTIVE"
  | "DELETING"
  | "DELETED"
  | "CREATE_FAILED"
  | "UPDATING"
  | "UPDATE_FAILED"
  | (string & {});
export type BoundedLengthString = string;
export interface CreateFHIRDatastoreResponse {
  DatastoreId: string;
  DatastoreArn: string;
  DatastoreStatus: DatastoreStatus;
  DatastoreEndpoint: string;
}
export interface DeleteDataTransformationProfileRequest {
  ProfileId: string;
}
export interface DeleteDataTransformationProfileResponse {
  ProfileId: string;
  ProfileName?: string;
  DeletionTime: Date;
}
export interface DeleteFHIRDatastoreRequest {
  DatastoreId: string;
}
export interface DeleteFHIRDatastoreResponse {
  DatastoreId: string;
  DatastoreArn: string;
  DatastoreStatus: DatastoreStatus;
  DatastoreEndpoint: string;
}
export type DataTransformationJobId = string;
export interface DescribeDataTransformationJobRequest {
  JobId: string;
}
export type TransformationJobStatus =
  | "SUBMITTED"
  | "QUEUED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "COMPLETED_WITH_ERRORS"
  | "FAILED"
  | (string & {});
export type DataTransformationS3Uri = string;
export interface TransformationInputDataConfig {
  S3Uri: string;
  SourceFormat?: SourceFormat;
}
export interface DataTransformationS3Configuration {
  S3Uri: string;
  KmsKeyId: string;
}
export interface TransformationOutputDataConfig {
  S3Configuration: DataTransformationS3Configuration;
}
export type DataTransformationIamRoleArn = string;
export type DataTransformationJobName = string;
export type BoundedString = string;
export interface TransformationJobProgressReport {
  TotalFilesScanned: number;
  TotalFilesConverted: number;
  TotalFilesFailed: number;
  TotalResourcesGenerated: number;
}
export interface TransformationJobProperties {
  JobId: string;
  JobStatus: TransformationJobStatus;
  InputDataConfig: TransformationInputDataConfig;
  OutputDataConfig: TransformationOutputDataConfig;
  DataAccessRoleArn: string;
  SubmitTime: Date;
  JobName?: string;
  ProfileId?: string;
  ProfileName?: string;
  ProfileVersion?: number;
  EndTime?: Date;
  DriftDetectionEnabled?: boolean;
  ProvenanceEnabled?: boolean;
  Message?: string;
  JobProgressReport?: TransformationJobProgressReport;
}
export interface DescribeDataTransformationJobResponse {
  TransformationJobProperties: TransformationJobProperties;
}
export interface DescribeFHIRDatastoreRequest {
  DatastoreId: string;
}
export type HealthLakeTimestamp = Date;
export type ErrorMessage = string;
export type ErrorCategory = "RETRYABLE_ERROR" | "NON_RETRYABLE_ERROR" | (string & {});
export interface ErrorCause {
  ErrorMessage?: string;
  ErrorCategory?: ErrorCategory;
}
export interface DatastoreBackupStatus {
  Configuration?: BackupConfiguration;
  BackupEnabledAt?: Date;
  EarliestRestorePoint?: Date;
  LatestRestorePoint?: Date;
  ScheduledPermanentDeletionTime?: Date;
}
export interface DatastoreProperties {
  DatastoreId: string;
  DatastoreArn: string;
  DatastoreName?: string;
  DatastoreStatus: DatastoreStatus;
  CreatedAt?: Date;
  DatastoreTypeVersion: FHIRVersion;
  DatastoreEndpoint: string;
  SseConfiguration?: SseConfiguration;
  PreloadDataConfig?: PreloadDataConfig;
  IdentityProviderConfiguration?: IdentityProviderConfiguration;
  ErrorCause?: ErrorCause;
  NlpConfiguration?: NlpConfiguration;
  AnalyticsConfiguration?: AnalyticsConfiguration;
  ProfileConfiguration?: ProfileConfiguration;
  BackupStatusInfo?: DatastoreBackupStatus;
}
export interface DescribeFHIRDatastoreResponse {
  DatastoreProperties: DatastoreProperties;
}
export type JobId = string;
export interface DescribeFHIRExportJobRequest {
  DatastoreId: string;
  JobId: string;
}
export type JobName = string;
export type JobStatus =
  | "SUBMITTED"
  | "QUEUED"
  | "IN_PROGRESS"
  | "COMPLETED_WITH_ERRORS"
  | "COMPLETED"
  | "FAILED"
  | "CANCEL_SUBMITTED"
  | "CANCEL_IN_PROGRESS"
  | "CANCEL_COMPLETED"
  | "CANCEL_FAILED"
  | (string & {});
export type S3Uri = string;
export interface S3Configuration {
  S3Uri: string;
  KmsKeyId: string;
}
export type OutputDataConfig = { S3Configuration: S3Configuration };
export type IamRoleArn = string;
export type Message = string;
export interface ExportJobProperties {
  JobId: string;
  JobName?: string;
  JobStatus: JobStatus;
  SubmitTime: Date;
  EndTime?: Date;
  DatastoreId: string;
  OutputDataConfig: OutputDataConfig;
  DataAccessRoleArn?: string;
  Message?: string;
}
export interface DescribeFHIRExportJobResponse {
  ExportJobProperties: ExportJobProperties;
}
export interface DescribeFHIRImportJobRequest {
  DatastoreId: string;
  JobId: string;
}
export type InputDataConfig = { S3Uri: string };
export interface JobProgressReport {
  TotalNumberOfScannedFiles?: number;
  TotalSizeOfScannedFilesInMB?: number;
  TotalNumberOfImportedFiles?: number;
  TotalNumberOfResourcesScanned?: number;
  TotalNumberOfResourcesImported?: number;
  TotalNumberOfResourcesWithCustomerError?: number;
  TotalNumberOfFilesReadWithCustomerError?: number;
  TotalNumberOfScannedNonFhirFiles?: number;
  TotalSizeOfScannedNonFhirFilesInMB?: number;
  TotalNumberOfImportedNonFhirFiles?: number;
  TotalNumberOfNonFhirResourcesScanned?: number;
  TotalNumberOfNonFhirResourcesImported?: number;
  TotalNumberOfNonFhirResourcesWithCustomerError?: number;
  TotalNumberOfNonFhirFilesReadWithCustomerError?: number;
  Throughput?: number;
  TotalFilesConverted?: number;
  TotalResourcesGenerated?: number;
}
export type ValidationLevel = "strict" | "structure-only" | "minimal" | (string & {});
export interface ImportJobProperties {
  JobId: string;
  JobName?: string;
  JobStatus: JobStatus;
  SubmitTime: Date;
  EndTime?: Date;
  DatastoreId: string;
  InputDataConfig: InputDataConfig;
  JobOutputDataConfig?: OutputDataConfig;
  JobProgressReport?: JobProgressReport;
  DataAccessRoleArn?: string;
  Message?: string;
  ValidationLevel?: ValidationLevel;
}
export interface DescribeFHIRImportJobResponse {
  ImportJobProperties: ImportJobProperties;
}
export interface GetDataTransformationProfileRequest {
  ProfileId: string;
  ProfileVersion?: number;
}
export type ProfileMappingKey = string;
export type ProfileMappingValue = string;
export type ProfileMapping = { [key: string]: string | undefined };
export type ChangeDescription = string;
export interface GetDataTransformationProfileResponse {
  ProfileId: string;
  Version: number;
  SourceFormat: SourceFormat;
  TargetFormat: TargetFormat;
  ProfileMapping: { [key: string]: string | undefined };
  ProfileName?: string;
  ProfileDescription?: string;
  ChangeDescription?: string;
  LastUpdatedAt: Date;
}
export type MaxResults = number;
export type DataTransformationNextToken = string;
export interface ListDataTransformationJobsRequest {
  MaxResults?: number;
  NextToken?: string;
  JobStatus?: TransformationJobStatus;
  JobName?: string;
  SubmittedAfter?: Date;
  SubmittedBefore?: Date;
}
export interface TransformationJobSummary {
  JobId: string;
  JobStatus: TransformationJobStatus;
  SubmitTime: Date;
  JobName?: string;
  EndTime?: Date;
  SourceFormat?: SourceFormat;
}
export type TransformationJobSummaryList = TransformationJobSummary[];
export interface ListDataTransformationJobsResponse {
  Items: TransformationJobSummary[];
  NextToken?: string;
}
export interface ListDataTransformationProfilesRequest {
  SourceFormat: SourceFormat;
  MaxResults?: number;
  NextToken?: string;
}
export interface DataTransformationProfileSummary {
  ProfileId: string;
  Version: number;
  SourceFormat: SourceFormat;
  TargetFormat: TargetFormat;
  ProfileName?: string;
  ProfileDescription?: string;
  LastUpdatedAt?: Date;
}
export type DataTransformationProfileSummaryList = DataTransformationProfileSummary[];
export interface ListDataTransformationProfilesResponse {
  Items: DataTransformationProfileSummary[];
  NextToken?: string;
}
export interface ListDataTransformationProfileVersionsRequest {
  ProfileId: string;
  MaxResults?: number;
  NextToken?: string;
}
export interface DataTransformationProfileVersionSummary {
  ProfileId: string;
  Version: number;
  SourceFormat: SourceFormat;
  TargetFormat: TargetFormat;
  ProfileName?: string;
  ChangeDescription?: string;
  LastUpdatedAt?: Date;
}
export type DataTransformationProfileVersionSummaryList = DataTransformationProfileVersionSummary[];
export interface ListDataTransformationProfileVersionsResponse {
  Items: DataTransformationProfileVersionSummary[];
  NextToken?: string;
}
export interface DatastoreFilter {
  DatastoreName?: string;
  DatastoreStatus?: DatastoreStatus;
  CreatedBefore?: Date;
  CreatedAfter?: Date;
}
export type NextToken = string;
export type MaxResultsInteger = number;
export interface ListFHIRDatastoresRequest {
  Filter?: DatastoreFilter;
  NextToken?: string;
  MaxResults?: number;
}
export type DatastorePropertiesList = DatastoreProperties[];
export interface ListFHIRDatastoresResponse {
  DatastorePropertiesList: DatastoreProperties[];
  NextToken?: string;
}
export interface ListFHIRExportJobsRequest {
  DatastoreId: string;
  NextToken?: string;
  MaxResults?: number;
  JobName?: string;
  JobStatus?: JobStatus;
  SubmittedBefore?: Date;
  SubmittedAfter?: Date;
}
export type ExportJobPropertiesList = ExportJobProperties[];
export interface ListFHIRExportJobsResponse {
  ExportJobPropertiesList: ExportJobProperties[];
  NextToken?: string;
}
export interface ListFHIRImportJobsRequest {
  DatastoreId: string;
  NextToken?: string;
  MaxResults?: number;
  JobName?: string;
  JobStatus?: JobStatus;
  SubmittedBefore?: Date;
  SubmittedAfter?: Date;
}
export type ImportJobPropertiesList = ImportJobProperties[];
export interface ListFHIRImportJobsResponse {
  ImportJobPropertiesList: ImportJobProperties[];
  NextToken?: string;
}
export type AmazonResourceName = string;
export interface ListTagsForResourceRequest {
  ResourceARN: string;
}
export interface ListTagsForResourceResponse {
  Tags?: Tag[];
}
export interface PublishDataTransformationProfileRequest {
  ProfileId: string;
  SourceFormat: SourceFormat;
  FromExistingVersion?: number;
  ChangeDescription?: string;
}
export interface PublishDataTransformationProfileResponse {
  ProfileId: string;
  Version: number;
  SourceFormat: SourceFormat;
  TargetFormat: TargetFormat;
  ProfileName?: string;
  LastUpdatedAt: Date;
}
export interface ContinuousBackupRestoreConfiguration {
  RestorePointTime?: Date;
}
export type RestoreConfiguration = {
  ContinuousBackupRestoreConfiguration: ContinuousBackupRestoreConfiguration;
};
export interface RestoreFHIRDatastoreRequest {
  SourceDatastoreId: string;
  RestoreConfiguration: RestoreConfiguration;
  DatastoreName?: string;
  SseConfiguration?: SseConfiguration;
  ClientToken?: string;
  Tags?: Tag[];
  IdentityProviderConfiguration?: IdentityProviderConfiguration;
  AnalyticsConfiguration?: AnalyticsConfiguration;
  NlpConfiguration?: NlpConfiguration;
  ProfileConfiguration?: ProfileConfiguration;
}
export interface RestoreFHIRDatastoreResponse {
  DatastoreId: string;
  DatastoreArn: string;
  DatastoreStatus: DatastoreStatus;
  DatastoreEndpoint: string;
}
export interface StartDataTransformationJobRequest {
  InputDataConfig: TransformationInputDataConfig;
  OutputDataConfig: TransformationOutputDataConfig;
  DataAccessRoleArn: string;
  ClientToken: string;
  JobName?: string;
  ProfileId: string;
  DriftDetectionEnabled?: boolean;
  ProvenanceEnabled?: boolean;
}
export interface StartDataTransformationJobResponse {
  JobId: string;
  JobStatus: TransformationJobStatus;
}
export interface StartFHIRExportJobRequest {
  JobName?: string;
  OutputDataConfig: OutputDataConfig;
  DatastoreId: string;
  DataAccessRoleArn: string;
  ClientToken?: string;
}
export interface StartFHIRExportJobResponse {
  JobId: string;
  JobStatus: JobStatus;
  DatastoreId?: string;
}
export type DefaultEnabledBoolean = boolean;
export interface StartFHIRImportJobRequest {
  JobName?: string;
  InputDataConfig: InputDataConfig;
  JobOutputDataConfig: OutputDataConfig;
  DatastoreId: string;
  DataAccessRoleArn: string;
  ClientToken?: string;
  ValidationLevel?: ValidationLevel;
  ProfileId?: string;
  InputFormat?: string;
  DriftDetectionEnabled?: boolean;
  ProvenanceEnabled?: boolean;
}
export interface StartFHIRImportJobResponse {
  JobId: string;
  JobStatus: JobStatus;
  DatastoreId?: string;
}
export interface TagResourceRequest {
  ResourceARN: string;
  Tags: Tag[];
}
export interface TagResourceResponse {}
export type TagKeyList = string[];
export interface UntagResourceRequest {
  ResourceARN: string;
  TagKeys: string[];
}
export interface UntagResourceResponse {}
export interface UpdateDataTransformationProfileRequest {
  ProfileId: string;
  ProfileMapping: { [key: string]: string | undefined };
  ChangeDescription?: string;
}
export interface UpdateDataTransformationProfileResponse {
  ProfileId: string;
  SourceFormat: SourceFormat;
  TargetFormat: TargetFormat;
  ProfileName?: string;
  LastUpdatedAt: Date;
}
export interface UpdateFHIRDatastoreRequest {
  DatastoreId: string;
  DatastoreName?: string;
  AnalyticsConfiguration?: AnalyticsConfiguration;
  NlpConfiguration?: NlpConfiguration;
  ProfileConfiguration?: ProfileConfiguration;
  IdentityProviderConfiguration?: IdentityProviderConfiguration;
  BackupConfiguration?: BackupConfiguration;
}
export interface UpdateFHIRDatastoreResponse {
  DatastoreProperties: DatastoreProperties;
}
export type AgentMessageString = string | redacted.Redacted<string>;
export type AgentInputMessageType = "normal" | "confirmation_response" | (string & {});
export interface AgentInputMessage {
  Body: string | redacted.Redacted<string>;
  Type: AgentInputMessageType;
}
export type ConversationIdString = string;
export interface UpdateProfileWithAgentRequest {
  ProfileId: string;
  SourceFormat: SourceFormat;
  InputMessage: AgentInputMessage;
  ConversationId?: string;
}
export type AgentOutputMessageType =
  | "INITIAL_GREETING"
  | "normal"
  | "confirmation"
  | "complete"
  | "error"
  | "options"
  | "choices"
  | (string & {});
export type DataTransformationChatOptionString = string | redacted.Redacted<string>;
export type DataTransformationChatOptionsList = (string | redacted.Redacted<string>)[];
export interface AgentOutputMessage {
  Body: string | redacted.Redacted<string>;
  Type: AgentOutputMessageType;
  OptionsList?: (string | redacted.Redacted<string>)[];
}
export interface UpdateProfileWithAgentResponse {
  AgentResponse: AgentOutputMessage;
  ConversationId: string;
}
export type CreateDataTransformationProfileError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a data transformation profile in DRAFT state. Specify a built-in starter profile, an existing profile version, raw profile content, or a sample data file as the source.
 */
export const createDataTransformationProfile: API.OperationMethod<
  CreateDataTransformationProfileRequest,
  CreateDataTransformationProfileResponse,
  CreateDataTransformationProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(5, __c0, 5) as any as S.Schema<CreateDataTransformationProfileRequest>,
  output: __S(6, __c0, 6) as any as S.Schema<CreateDataTransformationProfileResponse>,
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
  operationName: "CreateDataTransformationProfile",
  endpointHostPrefix: "datatransformation.",
}));

export type CreateFHIRDatastoreError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Create a FHIR-enabled data store.
 */
export const createFHIRDatastore: API.OperationMethod<
  CreateFHIRDatastoreRequest,
  CreateFHIRDatastoreResponse,
  CreateFHIRDatastoreError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(16, __c2, 0) as any as S.Schema<CreateFHIRDatastoreRequest>,
  output: __S(24, __c3, 0) as any as S.Schema<CreateFHIRDatastoreResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateFHIRDatastore",
}));

export type DeleteDataTransformationProfileError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a data transformation profile and all its versions, including the DRAFT and all published versions.
 */
export const deleteDataTransformationProfile: API.OperationMethod<
  DeleteDataTransformationProfileRequest,
  DeleteDataTransformationProfileResponse,
  DeleteDataTransformationProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(64, __c8, 0) as any as S.Schema<DeleteDataTransformationProfileRequest>,
  output: __S(65, __c8, 1) as any as S.Schema<DeleteDataTransformationProfileResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDataTransformationProfile",
  endpointHostPrefix: "datatransformation.",
}));

export type DeleteFHIRDatastoreError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Delete a FHIR-enabled data store.
 */
export const deleteFHIRDatastore: API.OperationMethod<
  DeleteFHIRDatastoreRequest,
  DeleteFHIRDatastoreResponse,
  DeleteFHIRDatastoreError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(72, __c9, 0) as any as S.Schema<DeleteFHIRDatastoreRequest>,
  output: __S(24, __c3, 0) as any as S.Schema<DeleteFHIRDatastoreResponse>,
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
  operationName: "DeleteFHIRDatastore",
}));

export type DescribeDataTransformationJobError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Describes a data transformation job, including its current status, configuration, and progress information.
 */
export const describeDataTransformationJob: API.OperationMethod<
  DescribeDataTransformationJobRequest,
  DescribeDataTransformationJobResponse,
  DescribeDataTransformationJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(80, __c10, 0) as any as S.Schema<DescribeDataTransformationJobRequest>,
  output: __S(83, __c10, 3) as any as S.Schema<DescribeDataTransformationJobResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDataTransformationJob",
  endpointHostPrefix: "datatransformation.",
}));

export type DescribeFHIRDatastoreError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get properties for a FHIR-enabled data store.
 */
export const describeFHIRDatastore: API.OperationMethod<
  DescribeFHIRDatastoreRequest,
  DescribeFHIRDatastoreResponse,
  DescribeFHIRDatastoreError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(104, __c13, 0) as any as S.Schema<DescribeFHIRDatastoreRequest>,
  output: __S(120, __c15, 0) as any as S.Schema<DescribeFHIRDatastoreResponse>,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeFHIRDatastore",
}));

export type DescribeFHIRExportJobError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get FHIR export job properties.
 */
export const describeFHIRExportJob: API.OperationMethod<
  DescribeFHIRExportJobRequest,
  DescribeFHIRExportJobResponse,
  DescribeFHIRExportJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(128, __c16, 0) as any as S.Schema<DescribeFHIRExportJobRequest>,
  output: __S(129, __c16, 1) as any as S.Schema<DescribeFHIRExportJobResponse>,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeFHIRExportJob",
}));

export type DescribeFHIRImportJobError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get the import job properties to learn more about the job or job progress.
 */
export const describeFHIRImportJob: API.OperationMethod<
  DescribeFHIRImportJobRequest,
  DescribeFHIRImportJobResponse,
  DescribeFHIRImportJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(152, __c19, 0) as any as S.Schema<DescribeFHIRImportJobRequest>,
  output: __S(153, __c19, 1) as any as S.Schema<DescribeFHIRImportJobResponse>,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeFHIRImportJob",
}));

export type GetDataTransformationProfileError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a data transformation profile's metadata and profile content at a specific version. Specify version 0 to retrieve the DRAFT, a version number between 1 and 99 to retrieve a specific published version, or omit the version to retrieve the latest published version.
 */
export const getDataTransformationProfile: API.OperationMethod<
  GetDataTransformationProfileRequest,
  GetDataTransformationProfileResponse,
  GetDataTransformationProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(176, __c22, 0) as any as S.Schema<GetDataTransformationProfileRequest>,
  output: __S(177, __c22, 1) as any as S.Schema<GetDataTransformationProfileResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDataTransformationProfile",
  endpointHostPrefix: "datatransformation.",
}));

export type ListDataTransformationJobsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists data transformation jobs for your Amazon Web Services account. Results can be filtered by status, job name, and submit time window. Results are paginated. Use the `NextToken` parameter to retrieve additional results.
 */
export const listDataTransformationJobs: API.PaginatedOperationMethod<
  ListDataTransformationJobsRequest,
  ListDataTransformationJobsResponse,
  ListDataTransformationJobsError,
  Credentials | HttpClient.HttpClient,
  TransformationJobSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(184, __c23, 0) as any as S.Schema<ListDataTransformationJobsRequest>,
  output: __S(187, __c23, 3) as any as S.Schema<ListDataTransformationJobsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDataTransformationJobs",
  endpointHostPrefix: "datatransformation.",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Items",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListDataTransformationProfilesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all data transformation profiles in your account, returning the latest version summary for each. Use `GetDataTransformationProfile` to retrieve profile content. Results are paginated. Use the `NextToken` parameter to retrieve additional results.
 */
export const listDataTransformationProfiles: API.PaginatedOperationMethod<
  ListDataTransformationProfilesRequest,
  ListDataTransformationProfilesResponse,
  ListDataTransformationProfilesError,
  Credentials | HttpClient.HttpClient,
  DataTransformationProfileSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(192, __c24, 0) as any as S.Schema<ListDataTransformationProfilesRequest>,
  output: __S(195, __c24, 3) as any as S.Schema<ListDataTransformationProfilesResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDataTransformationProfiles",
  endpointHostPrefix: "datatransformation.",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Items",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListDataTransformationProfileVersionsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all versions of a specific data transformation profile (DRAFT and published), in reverse chronological order (newest first). Use `GetDataTransformationProfile` to retrieve profile content. Results are paginated. Use the `NextToken` parameter to retrieve additional results.
 */
export const listDataTransformationProfileVersions: API.PaginatedOperationMethod<
  ListDataTransformationProfileVersionsRequest,
  ListDataTransformationProfileVersionsResponse,
  ListDataTransformationProfileVersionsError,
  Credentials | HttpClient.HttpClient,
  DataTransformationProfileVersionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(200, __c25, 0) as any as S.Schema<ListDataTransformationProfileVersionsRequest>,
  output: __S(203, __c25, 3) as any as S.Schema<ListDataTransformationProfileVersionsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDataTransformationProfileVersions",
  endpointHostPrefix: "datatransformation.",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Items",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListFHIRDatastoresError =
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List all FHIR-enabled data stores in a user's account, regardless of data store status.
 */
export const listFHIRDatastores: API.PaginatedOperationMethod<
  ListFHIRDatastoresRequest,
  ListFHIRDatastoresResponse,
  ListFHIRDatastoresError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(209, __c26, 1) as any as S.Schema<ListFHIRDatastoresRequest>,
  output: __S(211, __c26, 3) as any as S.Schema<ListFHIRDatastoresResponse>,
  errors: [InternalServerException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListFHIRDatastores",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListFHIRExportJobsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all FHIR export jobs associated with an account and their statuses.
 */
export const listFHIRExportJobs: API.PaginatedOperationMethod<
  ListFHIRExportJobsRequest,
  ListFHIRExportJobsResponse,
  ListFHIRExportJobsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(216, __c27, 0) as any as S.Schema<ListFHIRExportJobsRequest>,
  output: __S(218, __c27, 2) as any as S.Schema<ListFHIRExportJobsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListFHIRExportJobs",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListFHIRImportJobsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List all FHIR import jobs associated with an account and their statuses.
 */
export const listFHIRImportJobs: API.PaginatedOperationMethod<
  ListFHIRImportJobsRequest,
  ListFHIRImportJobsResponse,
  ListFHIRImportJobsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(224, __c28, 0) as any as S.Schema<ListFHIRImportJobsRequest>,
  output: __S(226, __c28, 2) as any as S.Schema<ListFHIRImportJobsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListFHIRImportJobs",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of all existing tags associated with a data store.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(232, __c29, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(233, __c29, 1) as any as S.Schema<ListTagsForResourceResponse>,
  errors: [ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type PublishDataTransformationProfileError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Promotes the current DRAFT version of a data transformation profile to a new immutable published version. Also supports rollback by publishing from a previously published version.
 */
export const publishDataTransformationProfile: API.OperationMethod<
  PublishDataTransformationProfileRequest,
  PublishDataTransformationProfileResponse,
  PublishDataTransformationProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(240, __c30, 0) as any as S.Schema<PublishDataTransformationProfileRequest>,
  output: __S(241, __c30, 1) as any as S.Schema<PublishDataTransformationProfileResponse>,
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
  operationName: "PublishDataTransformationProfile",
  endpointHostPrefix: "datatransformation.",
}));

export type RestoreFHIRDatastoreError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Restore a backup-enabled data store to a point in time. Creates a new data store from the backup.
 */
export const restoreFHIRDatastore: API.OperationMethod<
  RestoreFHIRDatastoreRequest,
  RestoreFHIRDatastoreResponse,
  RestoreFHIRDatastoreError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(250, __c31, 2) as any as S.Schema<RestoreFHIRDatastoreRequest>,
  output: __S(24, __c3, 0) as any as S.Schema<RestoreFHIRDatastoreResponse>,
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
  operationName: "RestoreFHIRDatastore",
}));

export type StartDataTransformationJobError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Starts an asynchronous data transformation job that converts source files from Amazon Simple Storage Service (Amazon S3) and writes the output to Amazon S3 or HealthLake.
 */
export const startDataTransformationJob: API.OperationMethod<
  StartDataTransformationJobRequest,
  StartDataTransformationJobResponse,
  StartDataTransformationJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(256, __c32, 0) as any as S.Schema<StartDataTransformationJobRequest>,
  output: __S(257, __c32, 1) as any as S.Schema<StartDataTransformationJobResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartDataTransformationJob",
  endpointHostPrefix: "datatransformation.",
}));

export type StartFHIRExportJobError =
  | AccessDeniedException
  | FailedDependencyException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Start a FHIR export job.
 */
export const startFHIRExportJob: API.OperationMethod<
  StartFHIRExportJobRequest,
  StartFHIRExportJobResponse,
  StartFHIRExportJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(264, __c33, 0) as any as S.Schema<StartFHIRExportJobRequest>,
  output: __S(272, __c34, 0) as any as S.Schema<StartFHIRExportJobResponse>,
  errors: [
    AccessDeniedException,
    FailedDependencyException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartFHIRExportJob",
}));

export type StartFHIRImportJobError =
  | AccessDeniedException
  | FailedDependencyException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Start importing bulk FHIR data into an ACTIVE data store. The import job imports FHIR data found in the `InputDataConfig` object and stores processing results in the `JobOutputDataConfig` object.
 */
export const startFHIRImportJob: API.OperationMethod<
  StartFHIRImportJobRequest,
  StartFHIRImportJobResponse,
  StartFHIRImportJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(280, __c35, 0) as any as S.Schema<StartFHIRImportJobRequest>,
  output: __S(272, __c34, 0) as any as S.Schema<StartFHIRImportJobResponse>,
  errors: [
    AccessDeniedException,
    FailedDependencyException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartFHIRImportJob",
}));

export type TagResourceError = ResourceNotFoundException | ValidationException | CommonErrors;
/**
 * Add a user-specifed key and value tag to a data store.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(288, __c36, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(296, __c37, 0) as any as S.Schema<TagResourceResponse>,
  errors: [ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError = ResourceNotFoundException | ValidationException | CommonErrors;
/**
 * Remove a user-specifed key and value tag from a data store.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(304, __c38, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(296, __c37, 0) as any as S.Schema<UntagResourceResponse>,
  errors: [ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateDataTransformationProfileError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the DRAFT version (version 0) of a data transformation profile with new profile content. The update replaces all existing DRAFT content.
 */
export const updateDataTransformationProfile: API.OperationMethod<
  UpdateDataTransformationProfileRequest,
  UpdateDataTransformationProfileResponse,
  UpdateDataTransformationProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(312, __c39, 0) as any as S.Schema<UpdateDataTransformationProfileRequest>,
  output: __S(313, __c39, 1) as any as S.Schema<UpdateDataTransformationProfileResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDataTransformationProfile",
  endpointHostPrefix: "datatransformation.",
}));

export type UpdateFHIRDatastoreError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Update the properties of a FHIR-enabled data store.
 */
export const updateFHIRDatastore: API.OperationMethod<
  UpdateFHIRDatastoreRequest,
  UpdateFHIRDatastoreResponse,
  UpdateFHIRDatastoreError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(320, __c40, 0) as any as S.Schema<UpdateFHIRDatastoreRequest>,
  output: __S(120, __c15, 0) as any as S.Schema<UpdateFHIRDatastoreResponse>,
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
  operationName: "UpdateFHIRDatastore",
}));

export type UpdateProfileWithAgentError =
  | AccessDeniedException
  | AgentMessageOutOfContextException
  | ConversationNotFoundException
  | InternalServerException
  | NotImplementedOperationException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | UnsupportedMIMETypeException
  | ValidationException
  | CommonErrors;
/**
 * Updates a data transformation profile using chat-based interaction with an agent. Supports multi-turn conversations for iteratively customizing profiles.
 */
export const updateProfileWithAgent: API.OperationMethod<
  UpdateProfileWithAgentRequest,
  UpdateProfileWithAgentResponse,
  UpdateProfileWithAgentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(329, __c41, 1) as any as S.Schema<UpdateProfileWithAgentRequest>,
  output: __S(332, __c41, 4) as any as S.Schema<UpdateProfileWithAgentResponse>,
  errors: [
    AccessDeniedException,
    AgentMessageOutOfContextException,
    ConversationNotFoundException,
    InternalServerException,
    NotImplementedOperationException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
    UnsupportedMIMETypeException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateProfileWithAgent",
  endpointHostPrefix: "datatransformation.",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ StarterProfileName: S.String })).annotate({
        identifier: "StarterProfileSource",
      });
    case 1:
      return S.suspend(() => S.Struct({ ProfileId: S.String, Version: S.Number })).annotate({
        identifier: "ExistingVersionedProfileSource",
      });
    case 2:
      return S.suspend(() => S.Struct({ ProfileMapping: __S(8, __c1, 0) })).annotate({
        identifier: "ProfileMappingSource",
      });
    case 3:
      return S.suspend(() => S.Struct({ S3Uri: S.String })).annotate({
        identifier: "SampleDataSource",
      });
    case 4:
      return S.Union([
        /*@__PURE__*/ S.Struct({ StarterProfile: __S(0, __c0, 0) }),
        /*@__PURE__*/ S.Struct({ ExistingVersionedProfileId: __S(1, __c0, 1) }),
        /*@__PURE__*/ S.Struct({ ProfileMapping: __S(2, __c0, 2) }),
        /*@__PURE__*/ S.Struct({ SampleData: __S(3, __c0, 3) }),
      ]);
    case 5:
      return S.suspend(() =>
        S.Struct({
          SourceFormat: S.String,
          Source: __S(4, __c0, 4),
          KmsKeyId: S.optional(S.String),
          ProfileDescription: S.optional(S.String),
          ProfileName: S.String,
          Tags: S.optional(__S(8, __c1, 0)),
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/data-transformation-profile" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateDataTransformationProfileRequest" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          ProfileId: S.String,
          Version: S.Number,
          SourceFormat: S.String,
          TargetFormat: S.String,
          ProfileName: S.String,
          LastUpdatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "CreateDataTransformationProfileResponse" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DatastoreName: S.optional(S.String),
          DatastoreTypeVersion: S.String,
          SseConfiguration: S.optional(__S(41, __c5, 1)),
          PreloadDataConfig: S.optional(__S(48, __c6, 0)),
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          Tags: S.optional(__S(57, __c7, 1)),
          IdentityProviderConfiguration: S.optional(__S(42, __c5, 2)),
          AnalyticsConfiguration: S.optional(__S(43, __c5, 3)),
          NlpConfiguration: S.optional(__S(43, __c5, 3)),
          ProfileConfiguration: S.optional(__S(44, __c5, 4)),
          BackupConfiguration: S.optional(__S(49, __c6, 1)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateFHIRDatastoreRequest" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DatastoreId: S.String,
          DatastoreArn: S.String,
          DatastoreStatus: S.String,
          DatastoreEndpoint: S.String,
        }),
      ).annotate({ identifier: "CreateFHIRDatastoreResponse" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ CmkType: S.String, KmsKeyId: S.optional(S.String) }),
      ).annotate({ identifier: "KmsEncryptionConfig" });
    case 1:
      return S.suspend(() => S.Struct({ KmsEncryptionConfig: __S(40, __c5, 0) })).annotate({
        identifier: "SseConfiguration",
      });
    case 2:
      return S.suspend(() =>
        S.Struct({
          AuthorizationStrategy: S.String,
          FineGrainedAuthorizationEnabled: S.optional(S.Boolean),
          Metadata: S.optional(S.String),
          IdpLambdaArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "IdentityProviderConfiguration" });
    case 3:
      return S.suspend(() => S.Struct({ Status: S.optional(S.String) })).annotate({
        identifier: "AnalyticsConfiguration",
      });
    case 4:
      return S.suspend(() => S.Struct({ DefaultProfiles: S.optional(__S(32, __c4, 0)) })).annotate({
        identifier: "ProfileConfiguration",
      });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ PreloadDataType: S.String })).annotate({
        identifier: "PreloadDataConfig",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Status: S.optional(S.String),
          BackupType: S.optional(S.String),
          RetentionPeriodInDays: S.optional(S.Number),
          BackupTagsEnabled: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "BackupConfiguration" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Key: S.String, Value: S.String })).annotate({
        identifier: "Tag",
      });
    case 1:
      return S.Array(__S(56, __c7, 0));
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ProfileId: S.String.pipe(T.HttpLabel("ProfileId")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/data-transformation-profile/{ProfileId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteDataTransformationProfileRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ProfileId: S.String,
          ProfileName: S.optional(S.String),
          DeletionTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "DeleteDataTransformationProfileResponse" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DatastoreId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteFHIRDatastoreRequest" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ JobId: S.String.pipe(T.HttpLabel("JobId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/data-transformation-job/{JobId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeDataTransformationJobRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          TotalFilesScanned: S.Number,
          TotalFilesConverted: S.Number,
          TotalFilesFailed: S.Number,
          TotalResourcesGenerated: S.Number,
        }),
      ).annotate({ identifier: "TransformationJobProgressReport" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          JobId: S.String,
          JobStatus: S.String,
          InputDataConfig: __S(96, __c12, 0),
          OutputDataConfig: __S(97, __c12, 1),
          DataAccessRoleArn: S.String,
          SubmitTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          JobName: S.optional(S.String),
          ProfileId: S.optional(S.String),
          ProfileName: S.optional(S.String),
          ProfileVersion: S.optional(S.Number),
          EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          DriftDetectionEnabled: S.optional(S.Boolean),
          ProvenanceEnabled: S.optional(S.Boolean),
          Message: S.optional(S.String),
          JobProgressReport: S.optional(__S(81, __c10, 1)),
        }),
      ).annotate({ identifier: "TransformationJobProperties" });
    case 3:
      return S.suspend(() => S.Struct({ TransformationJobProperties: __S(82, __c10, 2) })).annotate(
        { identifier: "DescribeDataTransformationJobResponse" },
      );
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ S3Uri: S.String, KmsKeyId: S.String })).annotate({
        identifier: "DataTransformationS3Configuration",
      });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ S3Uri: S.String, SourceFormat: S.optional(S.String) }),
      ).annotate({ identifier: "TransformationInputDataConfig" });
    case 1:
      return S.suspend(() => S.Struct({ S3Configuration: __S(88, __c11, 0) })).annotate({
        identifier: "TransformationOutputDataConfig",
      });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DatastoreId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeFHIRDatastoreRequest" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ErrorMessage: S.optional(S.String), ErrorCategory: S.optional(S.String) }),
      ).annotate({ identifier: "ErrorCause" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Configuration: S.optional(__S(49, __c6, 1)),
          BackupEnabledAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          EarliestRestorePoint: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LatestRestorePoint: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ScheduledPermanentDeletionTime: S.optional(
            S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          ),
        }),
      ).annotate({ identifier: "DatastoreBackupStatus" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          DatastoreId: S.String,
          DatastoreArn: S.String,
          DatastoreName: S.optional(S.String),
          DatastoreStatus: S.String,
          CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          DatastoreTypeVersion: S.String,
          DatastoreEndpoint: S.String,
          SseConfiguration: S.optional(__S(41, __c5, 1)),
          PreloadDataConfig: S.optional(__S(48, __c6, 0)),
          IdentityProviderConfiguration: S.optional(__S(42, __c5, 2)),
          ErrorCause: S.optional(__S(112, __c14, 0)),
          NlpConfiguration: S.optional(__S(43, __c5, 3)),
          AnalyticsConfiguration: S.optional(__S(43, __c5, 3)),
          ProfileConfiguration: S.optional(__S(44, __c5, 4)),
          BackupStatusInfo: S.optional(__S(113, __c14, 1)),
        }),
      ).annotate({ identifier: "DatastoreProperties" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ DatastoreProperties: __S(114, __c14, 2) })).annotate({
        identifier: "DescribeFHIRDatastoreResponse",
      });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DatastoreId: S.String, JobId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeFHIRExportJobRequest" });
    case 1:
      return S.suspend(() => S.Struct({ ExportJobProperties: __S(144, __c18, 0) })).annotate({
        identifier: "DescribeFHIRExportJobResponse",
      });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.Union([/*@__PURE__*/ S.Struct({ S3Configuration: __S(88, __c11, 0) })]);
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          JobId: S.String,
          JobName: S.optional(S.String),
          JobStatus: S.String,
          SubmitTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          DatastoreId: S.String,
          OutputDataConfig: __S(136, __c17, 0),
          DataAccessRoleArn: S.optional(S.String),
          Message: S.optional(S.String),
        }),
      ).annotate({ identifier: "ExportJobProperties" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DatastoreId: S.String, JobId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeFHIRImportJobRequest" });
    case 1:
      return S.suspend(() => S.Struct({ ImportJobProperties: __S(161, __c20, 1) })).annotate({
        identifier: "DescribeFHIRImportJobResponse",
      });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          TotalNumberOfScannedFiles: S.optional(S.Number),
          TotalSizeOfScannedFilesInMB: S.optional(S.Number),
          TotalNumberOfImportedFiles: S.optional(S.Number),
          TotalNumberOfResourcesScanned: S.optional(S.Number),
          TotalNumberOfResourcesImported: S.optional(S.Number),
          TotalNumberOfResourcesWithCustomerError: S.optional(S.Number),
          TotalNumberOfFilesReadWithCustomerError: S.optional(S.Number),
          TotalNumberOfScannedNonFhirFiles: S.optional(S.Number),
          TotalSizeOfScannedNonFhirFilesInMB: S.optional(S.Number),
          TotalNumberOfImportedNonFhirFiles: S.optional(S.Number),
          TotalNumberOfNonFhirResourcesScanned: S.optional(S.Number),
          TotalNumberOfNonFhirResourcesImported: S.optional(S.Number),
          TotalNumberOfNonFhirResourcesWithCustomerError: S.optional(S.Number),
          TotalNumberOfNonFhirFilesReadWithCustomerError: S.optional(S.Number),
          Throughput: S.optional(S.Number),
          TotalFilesConverted: S.optional(S.Number),
          TotalResourcesGenerated: S.optional(S.Number),
        }),
      ).annotate({ identifier: "JobProgressReport" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          JobId: S.String,
          JobName: S.optional(S.String),
          JobStatus: S.String,
          SubmitTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          DatastoreId: S.String,
          InputDataConfig: __S(168, __c21, 0),
          JobOutputDataConfig: S.optional(__S(136, __c17, 0)),
          JobProgressReport: S.optional(__S(160, __c20, 0)),
          DataAccessRoleArn: S.optional(S.String),
          Message: S.optional(S.String),
          ValidationLevel: S.optional(S.String),
        }),
      ).annotate({ identifier: "ImportJobProperties" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.Union([/*@__PURE__*/ S.Struct({ S3Uri: S.String })]);
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ProfileId: S.String.pipe(T.HttpLabel("ProfileId")),
          ProfileVersion: S.optional(S.Number).pipe(T.HttpQuery("version")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/data-transformation-profile/{ProfileId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetDataTransformationProfileRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ProfileId: S.String,
          Version: S.Number,
          SourceFormat: S.String,
          TargetFormat: S.String,
          ProfileMapping: __S(8, __c1, 0),
          ProfileName: S.optional(S.String),
          ProfileDescription: S.optional(S.String),
          ChangeDescription: S.optional(S.String),
          LastUpdatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "GetDataTransformationProfileResponse" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          JobStatus: S.optional(S.String).pipe(T.HttpQuery("jobStatus")),
          JobName: S.optional(S.String).pipe(T.HttpQuery("jobName")),
          SubmittedAfter: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))).pipe(
            T.HttpQuery("submittedAfter"),
          ),
          SubmittedBefore: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))).pipe(
            T.HttpQuery("submittedBefore"),
          ),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/data-transformation-jobs" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListDataTransformationJobsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          JobId: S.String,
          JobStatus: S.String,
          SubmitTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          JobName: S.optional(S.String),
          EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          SourceFormat: S.optional(S.String),
        }),
      ).annotate({ identifier: "TransformationJobSummary" });
    case 2:
      return S.Array(__S(185, __c23, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ Items: __S(186, __c23, 2), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListDataTransformationJobsResponse" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SourceFormat: S.String.pipe(T.HttpQuery("sourceFormat")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/data-transformation-profile" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListDataTransformationProfilesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ProfileId: S.String,
          Version: S.Number,
          SourceFormat: S.String,
          TargetFormat: S.String,
          ProfileName: S.optional(S.String),
          ProfileDescription: S.optional(S.String),
          LastUpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "DataTransformationProfileSummary" });
    case 2:
      return S.Array(__S(193, __c24, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ Items: __S(194, __c24, 2), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListDataTransformationProfilesResponse" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ProfileId: S.String.pipe(T.HttpLabel("ProfileId")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/data-transformation-profile/{ProfileId}/versions" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListDataTransformationProfileVersionsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ProfileId: S.String,
          Version: S.Number,
          SourceFormat: S.String,
          TargetFormat: S.String,
          ProfileName: S.optional(S.String),
          ChangeDescription: S.optional(S.String),
          LastUpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "DataTransformationProfileVersionSummary" });
    case 2:
      return S.Array(__S(201, __c25, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ Items: __S(202, __c25, 2), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListDataTransformationProfileVersionsResponse" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DatastoreName: S.optional(S.String),
          DatastoreStatus: S.optional(S.String),
          CreatedBefore: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          CreatedAfter: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "DatastoreFilter" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Filter: S.optional(__S(208, __c26, 0)),
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListFHIRDatastoresRequest" });
    case 2:
      return S.Array(__S(114, __c14, 2));
    case 3:
      return S.suspend(() =>
        S.Struct({ DatastorePropertiesList: __S(210, __c26, 2), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListFHIRDatastoresResponse" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DatastoreId: S.String,
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          JobName: S.optional(S.String),
          JobStatus: S.optional(S.String),
          SubmittedBefore: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          SubmittedAfter: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListFHIRExportJobsRequest" });
    case 1:
      return S.Array(__S(144, __c18, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ ExportJobPropertiesList: __S(217, __c27, 1), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListFHIRExportJobsResponse" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DatastoreId: S.String,
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          JobName: S.optional(S.String),
          JobStatus: S.optional(S.String),
          SubmittedBefore: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          SubmittedAfter: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListFHIRImportJobsRequest" });
    case 1:
      return S.Array(__S(161, __c20, 1));
    case 2:
      return S.suspend(() =>
        S.Struct({ ImportJobPropertiesList: __S(225, __c28, 1), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListFHIRImportJobsResponse" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceARN: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListTagsForResourceRequest" });
    case 1:
      return S.suspend(() => S.Struct({ Tags: S.optional(__S(57, __c7, 1)) })).annotate({
        identifier: "ListTagsForResourceResponse",
      });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ProfileId: S.String.pipe(T.HttpLabel("ProfileId")),
          SourceFormat: S.String.pipe(T.HttpQuery("sourceFormat")),
          FromExistingVersion: S.optional(S.Number),
          ChangeDescription: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/data-transformation-profile/{ProfileId}/publish" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PublishDataTransformationProfileRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ProfileId: S.String,
          Version: S.Number,
          SourceFormat: S.String,
          TargetFormat: S.String,
          ProfileName: S.optional(S.String),
          LastUpdatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "PublishDataTransformationProfileResponse" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ RestorePointTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))) }),
      ).annotate({ identifier: "ContinuousBackupRestoreConfiguration" });
    case 1:
      return S.Union([
        /*@__PURE__*/ S.Struct({ ContinuousBackupRestoreConfiguration: __S(248, __c31, 0) }),
      ]);
    case 2:
      return S.suspend(() =>
        S.Struct({
          SourceDatastoreId: S.String,
          RestoreConfiguration: __S(249, __c31, 1),
          DatastoreName: S.optional(S.String),
          SseConfiguration: S.optional(__S(41, __c5, 1)),
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          Tags: S.optional(__S(57, __c7, 1)),
          IdentityProviderConfiguration: S.optional(__S(42, __c5, 2)),
          AnalyticsConfiguration: S.optional(__S(43, __c5, 3)),
          NlpConfiguration: S.optional(__S(43, __c5, 3)),
          ProfileConfiguration: S.optional(__S(44, __c5, 4)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "RestoreFHIRDatastoreRequest" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          InputDataConfig: __S(96, __c12, 0),
          OutputDataConfig: __S(97, __c12, 1),
          DataAccessRoleArn: S.String,
          ClientToken: S.String,
          JobName: S.optional(S.String),
          ProfileId: S.String,
          DriftDetectionEnabled: S.optional(S.Boolean),
          ProvenanceEnabled: S.optional(S.Boolean),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/data-transformation-job" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartDataTransformationJobRequest" });
    case 1:
      return S.suspend(() => S.Struct({ JobId: S.String, JobStatus: S.String })).annotate({
        identifier: "StartDataTransformationJobResponse",
      });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          JobName: S.optional(S.String),
          OutputDataConfig: __S(136, __c17, 0),
          DatastoreId: S.String,
          DataAccessRoleArn: S.String,
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "StartFHIRExportJobRequest" });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ JobId: S.String, JobStatus: S.String, DatastoreId: S.optional(S.String) }),
      ).annotate({ identifier: "StartFHIRExportJobResponse" });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          JobName: S.optional(S.String),
          InputDataConfig: __S(168, __c21, 0),
          JobOutputDataConfig: __S(136, __c17, 0),
          DatastoreId: S.String,
          DataAccessRoleArn: S.String,
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          ValidationLevel: S.optional(S.String),
          ProfileId: S.optional(S.String),
          InputFormat: S.optional(S.String),
          DriftDetectionEnabled: S.optional(S.Boolean),
          ProvenanceEnabled: S.optional(S.Boolean),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "StartFHIRImportJobRequest" });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceARN: S.String, Tags: __S(57, __c7, 1) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "TagResourceRequest" });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "TagResourceResponse" });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceARN: S.String, TagKeys: __S(32, __c4, 0) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UntagResourceRequest" });
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ProfileId: S.String.pipe(T.HttpLabel("ProfileId")),
          ProfileMapping: __S(8, __c1, 0),
          ChangeDescription: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/data-transformation-profile/{ProfileId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateDataTransformationProfileRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ProfileId: S.String,
          SourceFormat: S.String,
          TargetFormat: S.String,
          ProfileName: S.optional(S.String),
          LastUpdatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "UpdateDataTransformationProfileResponse" });
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DatastoreId: S.String,
          DatastoreName: S.optional(S.String),
          AnalyticsConfiguration: S.optional(__S(43, __c5, 3)),
          NlpConfiguration: S.optional(__S(43, __c5, 3)),
          ProfileConfiguration: S.optional(__S(44, __c5, 4)),
          IdentityProviderConfiguration: S.optional(__S(42, __c5, 2)),
          BackupConfiguration: S.optional(__S(49, __c6, 1)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateFHIRDatastoreRequest" });
  }
}
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Body: SensitiveString, Type: S.String })).annotate({
        identifier: "AgentInputMessage",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ProfileId: S.String,
          SourceFormat: S.String,
          InputMessage: __S(328, __c41, 0),
          ConversationId: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/update-profile-with-agent" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateProfileWithAgentRequest" });
    case 2:
      return S.Array(SensitiveString);
    case 3:
      return S.suspend(() =>
        S.Struct({
          Body: SensitiveString,
          Type: S.String,
          OptionsList: S.optional(__S(330, __c41, 2)),
        }),
      ).annotate({ identifier: "AgentOutputMessage" });
    case 4:
      return S.suspend(() =>
        S.Struct({ AgentResponse: __S(331, __c41, 3), ConversationId: S.String }),
      ).annotate({ identifier: "UpdateProfileWithAgentResponse" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
