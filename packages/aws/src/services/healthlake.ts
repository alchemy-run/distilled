import type * as HttpClient from "effect/unstable/http/HttpClient";
import type * as redacted from "effect/Redacted";
import * as API from "@distilled.cloud/core/api";
import * as D from "@distilled.cloud/core/shape";
import * as TE from "@distilled.cloud/core/error-class";
import { AwsProtocol } from "../protocol.ts";
import { awsJson1_0Protocol } from "../protocols/aws-json.ts";
import { Retry } from "../retry.ts";
import type * as T from "../types.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
const svc: T.ServiceInfo = {
  sdkId: "HealthLake",
  target: "HealthLake",
  version: "2017-07-01",
  sigv4: "healthlake",
  protocol: awsJson1_0Protocol,
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
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://healthlake.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://healthlake.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
export class AgentMessageOutOfContextException
  extends /*@__PURE__*/ TE.TaggedError("AgentMessageOutOfContextException")<{
    readonly message: string;
  }> {}
export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError("ConflictException", ["ConflictError"], {
    status: 409,
  })<{ readonly message?: string }> {}
export class ConversationNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ConversationNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message: string }> {}
export class FailedDependencyException
  extends /*@__PURE__*/ TE.TaggedError("FailedDependencyException", [], {
    status: 424,
  })<{ readonly message?: string }> {}
export class InternalServerException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerException",
    ["ServerError"],
    { status: 500 },
  )<{ readonly message?: string }> {}
export class NotImplementedOperationException
  extends /*@__PURE__*/ TE.TaggedError(
    "NotImplementedOperationException",
    ["ServerError"],
    { status: 501 },
  )<{ readonly message: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceQuotaExceededException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["ThrottlingError"],
    { status: 429 },
  )<{ readonly message?: string }> {}
export class UnauthorizedException
  extends /*@__PURE__*/ TE.TaggedError("UnauthorizedException", ["AuthError"], {
    status: 401,
  })<{ readonly message: string }> {}
export class UnsupportedMIMETypeException
  extends /*@__PURE__*/ TE.TaggedError(
    "UnsupportedMIMETypeException",
    ["BadRequestError"],
    { status: 415 },
  )<{ readonly message: string }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
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
export type CmkType =
  | "CUSTOMER_MANAGED_KMS_KEY"
  | "AWS_OWNED_KMS_KEY"
  | (string & {});
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
export type NlpStatus =
  | "ENABLED"
  | "ENABLING"
  | "DISABLED"
  | "DISABLING"
  | (string & {});
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
export type ErrorCategory =
  | "RETRYABLE_ERROR"
  | "NON_RETRYABLE_ERROR"
  | (string & {});
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
export type ValidationLevel =
  | "strict"
  | "structure-only"
  | "minimal"
  | (string & {});
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
export type DataTransformationProfileSummaryList =
  DataTransformationProfileSummary[];
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
export type DataTransformationProfileVersionSummaryList =
  DataTransformationProfileVersionSummary[];
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
export type AgentInputMessageType =
  | "normal"
  | "confirmation_response"
  | (string & {});
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
export type DataTransformationChatOptionString =
  | string
  | redacted.Redacted<string>;
export type DataTransformationChatOptionsList = (
  | string
  | redacted.Redacted<string>
)[];
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
  descriptor: {
    service: svc,
    input: {
      SourceFormat: 0,
      Source: {
        StarterProfile: { StarterProfileName: 0 },
        ExistingVersionedProfileId: { ProfileId: 0, Version: 0 },
        ProfileMapping: { ProfileMapping: 0 },
        SampleData: { S3Uri: 0 },
      },
      KmsKeyId: 0,
      ProfileDescription: 0,
      ProfileName: 0,
      Tags: 0,
      ClientToken: D.m({ idempotency: true }),
    },
    output: { LastUpdatedAt: D.ts },
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
  operationName: "CreateDataTransformationProfile",
  endpointHostPrefix: "datatransformation.",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      DatastoreName: 0,
      DatastoreTypeVersion: 0,
      SseConfiguration: i_SseConfiguration,
      PreloadDataConfig: { PreloadDataType: 0 },
      ClientToken: D.m({ idempotency: true }),
      Tags: D.list(i_Tag),
      IdentityProviderConfiguration: i_IdentityProviderConfiguration,
      AnalyticsConfiguration: i_AnalyticsConfiguration,
      NlpConfiguration: i_NlpConfiguration,
      ProfileConfiguration: i_ProfileConfiguration,
      BackupConfiguration: i_BackupConfiguration,
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateFHIRDatastore",
})) as any;

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
  descriptor: {
    service: svc,
    input: { ProfileId: 0 },
    output: { DeletionTime: D.ts },
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
  operationName: "DeleteDataTransformationProfile",
  endpointHostPrefix: "datatransformation.",
})) as any;

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
  descriptor: { service: svc, input: { DatastoreId: 0 } },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: { JobId: 0 },
    output: {
      TransformationJobProperties: { SubmitTime: D.ts, EndTime: D.ts },
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
  operationName: "DescribeDataTransformationJob",
  endpointHostPrefix: "datatransformation.",
})) as any;

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
  descriptor: {
    service: svc,
    input: { DatastoreId: 0 },
    output: { DatastoreProperties: o_DatastoreProperties },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeFHIRDatastore",
})) as any;

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
  descriptor: {
    service: svc,
    input: { DatastoreId: 0, JobId: 0 },
    output: { ExportJobProperties: o_ExportJobProperties },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeFHIRExportJob",
})) as any;

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
  descriptor: {
    service: svc,
    input: { DatastoreId: 0, JobId: 0 },
    output: { ImportJobProperties: o_ImportJobProperties },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeFHIRImportJob",
})) as any;

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
  descriptor: {
    service: svc,
    input: { ProfileId: 0, ProfileVersion: 0 },
    output: { LastUpdatedAt: D.ts },
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
  operationName: "GetDataTransformationProfile",
  endpointHostPrefix: "datatransformation.",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      MaxResults: 0,
      NextToken: 0,
      JobStatus: 0,
      JobName: 0,
      SubmittedAfter: 0,
      SubmittedBefore: 0,
    },
    output: { Items: D.list({ SubmitTime: D.ts, EndTime: D.ts }) },
  },
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
  descriptor: {
    service: svc,
    input: { SourceFormat: 0, MaxResults: 0, NextToken: 0 },
    output: { Items: D.list({ LastUpdatedAt: D.ts }) },
  },
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
  descriptor: {
    service: svc,
    input: { ProfileId: 0, MaxResults: 0, NextToken: 0 },
    output: { Items: D.list({ LastUpdatedAt: D.ts }) },
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
 * List all FHIR-enabled data stores in a user’s account, regardless of data store status.
 */
export const listFHIRDatastores: API.PaginatedOperationMethod<
  ListFHIRDatastoresRequest,
  ListFHIRDatastoresResponse,
  ListFHIRDatastoresError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      Filter: {
        DatastoreName: 0,
        DatastoreStatus: 0,
        CreatedBefore: 0,
        CreatedAfter: 0,
      },
      NextToken: 0,
      MaxResults: 0,
    },
    output: { DatastorePropertiesList: D.list(o_DatastoreProperties) },
  },
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
  descriptor: {
    service: svc,
    input: {
      DatastoreId: 0,
      NextToken: 0,
      MaxResults: 0,
      JobName: 0,
      JobStatus: 0,
      SubmittedBefore: 0,
      SubmittedAfter: 0,
    },
    output: { ExportJobPropertiesList: D.list(o_ExportJobProperties) },
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
  descriptor: {
    service: svc,
    input: {
      DatastoreId: 0,
      NextToken: 0,
      MaxResults: 0,
      JobName: 0,
      JobStatus: 0,
      SubmittedBefore: 0,
      SubmittedAfter: 0,
    },
    output: { ImportJobPropertiesList: D.list(o_ImportJobProperties) },
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
  descriptor: { service: svc, input: { ResourceARN: 0 } },
  errors: [ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      ProfileId: 0,
      SourceFormat: 0,
      FromExistingVersion: 0,
      ChangeDescription: 0,
    },
    output: { LastUpdatedAt: D.ts },
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
  operationName: "PublishDataTransformationProfile",
  endpointHostPrefix: "datatransformation.",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      SourceDatastoreId: 0,
      RestoreConfiguration: {
        ContinuousBackupRestoreConfiguration: { RestorePointTime: 0 },
      },
      DatastoreName: 0,
      SseConfiguration: i_SseConfiguration,
      ClientToken: D.m({ idempotency: true }),
      Tags: D.list(i_Tag),
      IdentityProviderConfiguration: i_IdentityProviderConfiguration,
      AnalyticsConfiguration: i_AnalyticsConfiguration,
      NlpConfiguration: i_NlpConfiguration,
      ProfileConfiguration: i_ProfileConfiguration,
    },
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
  operationName: "RestoreFHIRDatastore",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      InputDataConfig: { S3Uri: 0, SourceFormat: 0 },
      OutputDataConfig: { S3Configuration: { S3Uri: 0, KmsKeyId: 0 } },
      DataAccessRoleArn: 0,
      ClientToken: 0,
      JobName: 0,
      ProfileId: 0,
      DriftDetectionEnabled: 0,
      ProvenanceEnabled: 0,
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
  operationName: "StartDataTransformationJob",
  endpointHostPrefix: "datatransformation.",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      JobName: 0,
      OutputDataConfig: i_OutputDataConfig,
      DatastoreId: 0,
      DataAccessRoleArn: 0,
      ClientToken: D.m({ idempotency: true }),
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      JobName: 0,
      InputDataConfig: { S3Uri: 0 },
      JobOutputDataConfig: i_OutputDataConfig,
      DatastoreId: 0,
      DataAccessRoleArn: 0,
      ClientToken: D.m({ idempotency: true }),
      ValidationLevel: 0,
      ProfileId: 0,
      InputFormat: 0,
      DriftDetectionEnabled: 0,
      ProvenanceEnabled: 0,
    },
  },
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
})) as any;

export type TagResourceError =
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Add a user-specifed key and value tag to a data store.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceARN: 0, Tags: D.list(i_Tag) } },
  errors: [ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

export type UntagResourceError =
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Remove a user-specifed key and value tag from a data store.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceARN: 0, TagKeys: 0 } },
  errors: [ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

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
  descriptor: {
    service: svc,
    input: { ProfileId: 0, ProfileMapping: 0, ChangeDescription: 0 },
    output: { LastUpdatedAt: D.ts },
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
  operationName: "UpdateDataTransformationProfile",
  endpointHostPrefix: "datatransformation.",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      DatastoreId: 0,
      DatastoreName: 0,
      AnalyticsConfiguration: i_AnalyticsConfiguration,
      NlpConfiguration: i_NlpConfiguration,
      ProfileConfiguration: i_ProfileConfiguration,
      IdentityProviderConfiguration: i_IdentityProviderConfiguration,
      BackupConfiguration: i_BackupConfiguration,
    },
    output: { DatastoreProperties: o_DatastoreProperties },
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
  operationName: "UpdateFHIRDatastore",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      ProfileId: 0,
      SourceFormat: 0,
      InputMessage: { Body: 0, Type: 0 },
      ConversationId: 0,
    },
    output: {
      AgentResponse: { Body: D.secret, OptionsList: D.list(D.secret) },
    },
  },
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
})) as any;

const i_AnalyticsConfiguration: D.LazyStruct = () => ({ Status: 0 });
const i_BackupConfiguration: D.LazyStruct = () => ({
  Status: 0,
  BackupType: 0,
  RetentionPeriodInDays: 0,
  BackupTagsEnabled: 0,
});
const i_IdentityProviderConfiguration: D.LazyStruct = () => ({
  AuthorizationStrategy: 0,
  FineGrainedAuthorizationEnabled: 0,
  Metadata: 0,
  IdpLambdaArn: 0,
});
const i_NlpConfiguration: D.LazyStruct = () => ({ Status: 0 });
const i_OutputDataConfig: D.LazyStruct = () => ({
  S3Configuration: { S3Uri: 0, KmsKeyId: 0 },
});
const i_ProfileConfiguration: D.LazyStruct = () => ({ DefaultProfiles: 0 });
const i_SseConfiguration: D.LazyStruct = () => ({
  KmsEncryptionConfig: { CmkType: 0, KmsKeyId: 0 },
});
const i_Tag: D.LazyStruct = () => ({ Key: 0, Value: 0 });
const o_DatastoreProperties: D.LazyStruct = () => ({
  CreatedAt: D.ts,
  BackupStatusInfo: {
    BackupEnabledAt: D.ts,
    EarliestRestorePoint: D.ts,
    LatestRestorePoint: D.ts,
    ScheduledPermanentDeletionTime: D.ts,
  },
});
const o_ExportJobProperties: D.LazyStruct = () => ({
  SubmitTime: D.ts,
  EndTime: D.ts,
});
const o_ImportJobProperties: D.LazyStruct = () => ({
  SubmitTime: D.ts,
  EndTime: D.ts,
});
