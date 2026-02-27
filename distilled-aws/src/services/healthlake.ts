import * as HttpClient from "effect/unstable/http/HttpClient";
import * as effect from "effect/Effect";
import * as redacted from "effect/Redacted";
import * as S from "effect/Schema";
import * as stream from "effect/Stream";
import * as API from "../client/api.ts";
import * as T from "../traits.ts";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import type { Region } from "../region.ts";
import { SensitiveString, SensitiveBlob } from "../sensitive.ts";
const svc = T.AwsApiService({
  sdkId: "HealthLake",
  serviceShapeName: "HealthLake",
});
const auth = T.AwsAuthSigv4({ name: "healthlake" });
const ver = T.ServiceVersion("2017-07-01");
const proto = T.AwsProtocolsAwsJson1_0();
const rules = T.EndpointResolver((p, _) => {
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
});

//# Newtypes
export type DatastoreName = string;
export type EncryptionKeyID = string;
export type ClientTokenString = string;
export type TagKey = string;
export type TagValue = string;
export type ConfigurationMetadata = string;
export type LambdaArn = string;
export type DatastoreId = string;
export type DatastoreArn = string;
export type BoundedLengthString = string;
export type ErrorMessage = string;
export type JobId = string;
export type JobName = string;
export type S3Uri = string;
export type IamRoleArn = string;
export type Message = string;
export type NextToken = string;
export type MaxResultsInteger = number;
export type AmazonResourceName = string;

//# Schemas
export type FHIRVersion = "R4" | (string & {});
export const FHIRVersion = S.String;
export type CmkType =
  | "CUSTOMER_MANAGED_KMS_KEY"
  | "AWS_OWNED_KMS_KEY"
  | (string & {});
export const CmkType = S.String;
export interface KmsEncryptionConfig {
  CmkType: CmkType;
  KmsKeyId?: string;
}
export const KmsEncryptionConfig = S.suspend(() =>
  S.Struct({ CmkType: CmkType, KmsKeyId: S.optional(S.String) }),
).annotate({
  identifier: "KmsEncryptionConfig",
}) as any as S.Schema<KmsEncryptionConfig>;
export interface SseConfiguration {
  KmsEncryptionConfig: KmsEncryptionConfig;
}
export const SseConfiguration = S.suspend(() =>
  S.Struct({ KmsEncryptionConfig: KmsEncryptionConfig }),
).annotate({
  identifier: "SseConfiguration",
}) as any as S.Schema<SseConfiguration>;
export type PreloadDataType = "SYNTHEA" | (string & {});
export const PreloadDataType = S.String;
export interface PreloadDataConfig {
  PreloadDataType: PreloadDataType;
}
export const PreloadDataConfig = S.suspend(() =>
  S.Struct({ PreloadDataType: PreloadDataType }),
).annotate({
  identifier: "PreloadDataConfig",
}) as any as S.Schema<PreloadDataConfig>;
export interface Tag {
  Key: string;
  Value: string;
}
export const Tag = S.suspend(() =>
  S.Struct({ Key: S.String, Value: S.String }),
).annotate({ identifier: "Tag" }) as any as S.Schema<Tag>;
export type TagList = Tag[];
export const TagList = S.Array(Tag);
export type AuthorizationStrategy =
  | "SMART_ON_FHIR_V1"
  | "SMART_ON_FHIR"
  | "AWS_AUTH"
  | (string & {});
export const AuthorizationStrategy = S.String;
export interface IdentityProviderConfiguration {
  AuthorizationStrategy: AuthorizationStrategy;
  FineGrainedAuthorizationEnabled?: boolean;
  Metadata?: string;
  IdpLambdaArn?: string;
}
export const IdentityProviderConfiguration = S.suspend(() =>
  S.Struct({
    AuthorizationStrategy: AuthorizationStrategy,
    FineGrainedAuthorizationEnabled: S.optional(S.Boolean),
    Metadata: S.optional(S.String),
    IdpLambdaArn: S.optional(S.String),
  }),
).annotate({
  identifier: "IdentityProviderConfiguration",
}) as any as S.Schema<IdentityProviderConfiguration>;
export interface CreateFHIRDatastoreRequest {
  DatastoreName?: string;
  DatastoreTypeVersion: FHIRVersion;
  SseConfiguration?: SseConfiguration;
  PreloadDataConfig?: PreloadDataConfig;
  ClientToken?: string;
  Tags?: Tag[];
  IdentityProviderConfiguration?: IdentityProviderConfiguration;
}
export const CreateFHIRDatastoreRequest = S.suspend(() =>
  S.Struct({
    DatastoreName: S.optional(S.String),
    DatastoreTypeVersion: FHIRVersion,
    SseConfiguration: S.optional(SseConfiguration),
    PreloadDataConfig: S.optional(PreloadDataConfig),
    ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    Tags: S.optional(TagList),
    IdentityProviderConfiguration: S.optional(IdentityProviderConfiguration),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateFHIRDatastoreRequest",
}) as any as S.Schema<CreateFHIRDatastoreRequest>;
export type DatastoreStatus =
  | "CREATING"
  | "ACTIVE"
  | "DELETING"
  | "DELETED"
  | "CREATE_FAILED"
  | (string & {});
export const DatastoreStatus = S.String;
export interface CreateFHIRDatastoreResponse {
  DatastoreId: string;
  DatastoreArn: string;
  DatastoreStatus: DatastoreStatus;
  DatastoreEndpoint: string;
}
export const CreateFHIRDatastoreResponse = S.suspend(() =>
  S.Struct({
    DatastoreId: S.String,
    DatastoreArn: S.String,
    DatastoreStatus: DatastoreStatus,
    DatastoreEndpoint: S.String,
  }),
).annotate({
  identifier: "CreateFHIRDatastoreResponse",
}) as any as S.Schema<CreateFHIRDatastoreResponse>;
export interface DeleteFHIRDatastoreRequest {
  DatastoreId: string;
}
export const DeleteFHIRDatastoreRequest = S.suspend(() =>
  S.Struct({ DatastoreId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteFHIRDatastoreRequest",
}) as any as S.Schema<DeleteFHIRDatastoreRequest>;
export interface DeleteFHIRDatastoreResponse {
  DatastoreId: string;
  DatastoreArn: string;
  DatastoreStatus: DatastoreStatus;
  DatastoreEndpoint: string;
}
export const DeleteFHIRDatastoreResponse = S.suspend(() =>
  S.Struct({
    DatastoreId: S.String,
    DatastoreArn: S.String,
    DatastoreStatus: DatastoreStatus,
    DatastoreEndpoint: S.String,
  }),
).annotate({
  identifier: "DeleteFHIRDatastoreResponse",
}) as any as S.Schema<DeleteFHIRDatastoreResponse>;
export interface DescribeFHIRDatastoreRequest {
  DatastoreId: string;
}
export const DescribeFHIRDatastoreRequest = S.suspend(() =>
  S.Struct({ DatastoreId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeFHIRDatastoreRequest",
}) as any as S.Schema<DescribeFHIRDatastoreRequest>;
export type ErrorCategory =
  | "RETRYABLE_ERROR"
  | "NON_RETRYABLE_ERROR"
  | (string & {});
export const ErrorCategory = S.String;
export interface ErrorCause {
  ErrorMessage?: string;
  ErrorCategory?: ErrorCategory;
}
export const ErrorCause = S.suspend(() =>
  S.Struct({
    ErrorMessage: S.optional(S.String),
    ErrorCategory: S.optional(ErrorCategory),
  }),
).annotate({ identifier: "ErrorCause" }) as any as S.Schema<ErrorCause>;
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
}
export const DatastoreProperties = S.suspend(() =>
  S.Struct({
    DatastoreId: S.String,
    DatastoreArn: S.String,
    DatastoreName: S.optional(S.String),
    DatastoreStatus: DatastoreStatus,
    CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    DatastoreTypeVersion: FHIRVersion,
    DatastoreEndpoint: S.String,
    SseConfiguration: S.optional(SseConfiguration),
    PreloadDataConfig: S.optional(PreloadDataConfig),
    IdentityProviderConfiguration: S.optional(IdentityProviderConfiguration),
    ErrorCause: S.optional(ErrorCause),
  }),
).annotate({
  identifier: "DatastoreProperties",
}) as any as S.Schema<DatastoreProperties>;
export interface DescribeFHIRDatastoreResponse {
  DatastoreProperties: DatastoreProperties;
}
export const DescribeFHIRDatastoreResponse = S.suspend(() =>
  S.Struct({ DatastoreProperties: DatastoreProperties }),
).annotate({
  identifier: "DescribeFHIRDatastoreResponse",
}) as any as S.Schema<DescribeFHIRDatastoreResponse>;
export interface DescribeFHIRExportJobRequest {
  DatastoreId: string;
  JobId: string;
}
export const DescribeFHIRExportJobRequest = S.suspend(() =>
  S.Struct({ DatastoreId: S.String, JobId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeFHIRExportJobRequest",
}) as any as S.Schema<DescribeFHIRExportJobRequest>;
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
export const JobStatus = S.String;
export interface S3Configuration {
  S3Uri: string;
  KmsKeyId: string;
}
export const S3Configuration = S.suspend(() =>
  S.Struct({ S3Uri: S.String, KmsKeyId: S.String }),
).annotate({
  identifier: "S3Configuration",
}) as any as S.Schema<S3Configuration>;
export type OutputDataConfig = { S3Configuration: S3Configuration };
export const OutputDataConfig = S.Union([
  S.Struct({ S3Configuration: S3Configuration }),
]);
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
export const ExportJobProperties = S.suspend(() =>
  S.Struct({
    JobId: S.String,
    JobName: S.optional(S.String),
    JobStatus: JobStatus,
    SubmitTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    DatastoreId: S.String,
    OutputDataConfig: OutputDataConfig,
    DataAccessRoleArn: S.optional(S.String),
    Message: S.optional(S.String),
  }),
).annotate({
  identifier: "ExportJobProperties",
}) as any as S.Schema<ExportJobProperties>;
export interface DescribeFHIRExportJobResponse {
  ExportJobProperties: ExportJobProperties;
}
export const DescribeFHIRExportJobResponse = S.suspend(() =>
  S.Struct({ ExportJobProperties: ExportJobProperties }),
).annotate({
  identifier: "DescribeFHIRExportJobResponse",
}) as any as S.Schema<DescribeFHIRExportJobResponse>;
export interface DescribeFHIRImportJobRequest {
  DatastoreId: string;
  JobId: string;
}
export const DescribeFHIRImportJobRequest = S.suspend(() =>
  S.Struct({ DatastoreId: S.String, JobId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeFHIRImportJobRequest",
}) as any as S.Schema<DescribeFHIRImportJobRequest>;
export type InputDataConfig = { S3Uri: string };
export const InputDataConfig = S.Union([S.Struct({ S3Uri: S.String })]);
export interface JobProgressReport {
  TotalNumberOfScannedFiles?: number;
  TotalSizeOfScannedFilesInMB?: number;
  TotalNumberOfImportedFiles?: number;
  TotalNumberOfResourcesScanned?: number;
  TotalNumberOfResourcesImported?: number;
  TotalNumberOfResourcesWithCustomerError?: number;
  TotalNumberOfFilesReadWithCustomerError?: number;
  Throughput?: number;
}
export const JobProgressReport = S.suspend(() =>
  S.Struct({
    TotalNumberOfScannedFiles: S.optional(S.Number),
    TotalSizeOfScannedFilesInMB: S.optional(S.Number),
    TotalNumberOfImportedFiles: S.optional(S.Number),
    TotalNumberOfResourcesScanned: S.optional(S.Number),
    TotalNumberOfResourcesImported: S.optional(S.Number),
    TotalNumberOfResourcesWithCustomerError: S.optional(S.Number),
    TotalNumberOfFilesReadWithCustomerError: S.optional(S.Number),
    Throughput: S.optional(S.Number),
  }),
).annotate({
  identifier: "JobProgressReport",
}) as any as S.Schema<JobProgressReport>;
export type ValidationLevel =
  | "strict"
  | "structure-only"
  | "minimal"
  | (string & {});
export const ValidationLevel = S.String;
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
export const ImportJobProperties = S.suspend(() =>
  S.Struct({
    JobId: S.String,
    JobName: S.optional(S.String),
    JobStatus: JobStatus,
    SubmitTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    DatastoreId: S.String,
    InputDataConfig: InputDataConfig,
    JobOutputDataConfig: S.optional(OutputDataConfig),
    JobProgressReport: S.optional(JobProgressReport),
    DataAccessRoleArn: S.optional(S.String),
    Message: S.optional(S.String),
    ValidationLevel: S.optional(ValidationLevel),
  }),
).annotate({
  identifier: "ImportJobProperties",
}) as any as S.Schema<ImportJobProperties>;
export interface DescribeFHIRImportJobResponse {
  ImportJobProperties: ImportJobProperties;
}
export const DescribeFHIRImportJobResponse = S.suspend(() =>
  S.Struct({ ImportJobProperties: ImportJobProperties }),
).annotate({
  identifier: "DescribeFHIRImportJobResponse",
}) as any as S.Schema<DescribeFHIRImportJobResponse>;
export interface DatastoreFilter {
  DatastoreName?: string;
  DatastoreStatus?: DatastoreStatus;
  CreatedBefore?: Date;
  CreatedAfter?: Date;
}
export const DatastoreFilter = S.suspend(() =>
  S.Struct({
    DatastoreName: S.optional(S.String),
    DatastoreStatus: S.optional(DatastoreStatus),
    CreatedBefore: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    CreatedAfter: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "DatastoreFilter",
}) as any as S.Schema<DatastoreFilter>;
export interface ListFHIRDatastoresRequest {
  Filter?: DatastoreFilter;
  NextToken?: string;
  MaxResults?: number;
}
export const ListFHIRDatastoresRequest = S.suspend(() =>
  S.Struct({
    Filter: S.optional(DatastoreFilter),
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListFHIRDatastoresRequest",
}) as any as S.Schema<ListFHIRDatastoresRequest>;
export type DatastorePropertiesList = DatastoreProperties[];
export const DatastorePropertiesList = S.Array(DatastoreProperties);
export interface ListFHIRDatastoresResponse {
  DatastorePropertiesList: DatastoreProperties[];
  NextToken?: string;
}
export const ListFHIRDatastoresResponse = S.suspend(() =>
  S.Struct({
    DatastorePropertiesList: DatastorePropertiesList,
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListFHIRDatastoresResponse",
}) as any as S.Schema<ListFHIRDatastoresResponse>;
export interface ListFHIRExportJobsRequest {
  DatastoreId: string;
  NextToken?: string;
  MaxResults?: number;
  JobName?: string;
  JobStatus?: JobStatus;
  SubmittedBefore?: Date;
  SubmittedAfter?: Date;
}
export const ListFHIRExportJobsRequest = S.suspend(() =>
  S.Struct({
    DatastoreId: S.String,
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    JobName: S.optional(S.String),
    JobStatus: S.optional(JobStatus),
    SubmittedBefore: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    SubmittedAfter: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListFHIRExportJobsRequest",
}) as any as S.Schema<ListFHIRExportJobsRequest>;
export type ExportJobPropertiesList = ExportJobProperties[];
export const ExportJobPropertiesList = S.Array(ExportJobProperties);
export interface ListFHIRExportJobsResponse {
  ExportJobPropertiesList: ExportJobProperties[];
  NextToken?: string;
}
export const ListFHIRExportJobsResponse = S.suspend(() =>
  S.Struct({
    ExportJobPropertiesList: ExportJobPropertiesList,
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListFHIRExportJobsResponse",
}) as any as S.Schema<ListFHIRExportJobsResponse>;
export interface ListFHIRImportJobsRequest {
  DatastoreId: string;
  NextToken?: string;
  MaxResults?: number;
  JobName?: string;
  JobStatus?: JobStatus;
  SubmittedBefore?: Date;
  SubmittedAfter?: Date;
}
export const ListFHIRImportJobsRequest = S.suspend(() =>
  S.Struct({
    DatastoreId: S.String,
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    JobName: S.optional(S.String),
    JobStatus: S.optional(JobStatus),
    SubmittedBefore: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    SubmittedAfter: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListFHIRImportJobsRequest",
}) as any as S.Schema<ListFHIRImportJobsRequest>;
export type ImportJobPropertiesList = ImportJobProperties[];
export const ImportJobPropertiesList = S.Array(ImportJobProperties);
export interface ListFHIRImportJobsResponse {
  ImportJobPropertiesList: ImportJobProperties[];
  NextToken?: string;
}
export const ListFHIRImportJobsResponse = S.suspend(() =>
  S.Struct({
    ImportJobPropertiesList: ImportJobPropertiesList,
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListFHIRImportJobsResponse",
}) as any as S.Schema<ListFHIRImportJobsResponse>;
export interface ListTagsForResourceRequest {
  ResourceARN: string;
}
export const ListTagsForResourceRequest = S.suspend(() =>
  S.Struct({ ResourceARN: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListTagsForResourceRequest",
}) as any as S.Schema<ListTagsForResourceRequest>;
export interface ListTagsForResourceResponse {
  Tags?: Tag[];
}
export const ListTagsForResourceResponse = S.suspend(() =>
  S.Struct({ Tags: S.optional(TagList) }),
).annotate({
  identifier: "ListTagsForResourceResponse",
}) as any as S.Schema<ListTagsForResourceResponse>;
export interface StartFHIRExportJobRequest {
  JobName?: string;
  OutputDataConfig: OutputDataConfig;
  DatastoreId: string;
  DataAccessRoleArn: string;
  ClientToken?: string;
}
export const StartFHIRExportJobRequest = S.suspend(() =>
  S.Struct({
    JobName: S.optional(S.String),
    OutputDataConfig: OutputDataConfig,
    DatastoreId: S.String,
    DataAccessRoleArn: S.String,
    ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "StartFHIRExportJobRequest",
}) as any as S.Schema<StartFHIRExportJobRequest>;
export interface StartFHIRExportJobResponse {
  JobId: string;
  JobStatus: JobStatus;
  DatastoreId?: string;
}
export const StartFHIRExportJobResponse = S.suspend(() =>
  S.Struct({
    JobId: S.String,
    JobStatus: JobStatus,
    DatastoreId: S.optional(S.String),
  }),
).annotate({
  identifier: "StartFHIRExportJobResponse",
}) as any as S.Schema<StartFHIRExportJobResponse>;
export interface StartFHIRImportJobRequest {
  JobName?: string;
  InputDataConfig: InputDataConfig;
  JobOutputDataConfig: OutputDataConfig;
  DatastoreId: string;
  DataAccessRoleArn: string;
  ClientToken?: string;
  ValidationLevel?: ValidationLevel;
}
export const StartFHIRImportJobRequest = S.suspend(() =>
  S.Struct({
    JobName: S.optional(S.String),
    InputDataConfig: InputDataConfig,
    JobOutputDataConfig: OutputDataConfig,
    DatastoreId: S.String,
    DataAccessRoleArn: S.String,
    ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    ValidationLevel: S.optional(ValidationLevel),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "StartFHIRImportJobRequest",
}) as any as S.Schema<StartFHIRImportJobRequest>;
export interface StartFHIRImportJobResponse {
  JobId: string;
  JobStatus: JobStatus;
  DatastoreId?: string;
}
export const StartFHIRImportJobResponse = S.suspend(() =>
  S.Struct({
    JobId: S.String,
    JobStatus: JobStatus,
    DatastoreId: S.optional(S.String),
  }),
).annotate({
  identifier: "StartFHIRImportJobResponse",
}) as any as S.Schema<StartFHIRImportJobResponse>;
export interface TagResourceRequest {
  ResourceARN: string;
  Tags: Tag[];
}
export const TagResourceRequest = S.suspend(() =>
  S.Struct({ ResourceARN: S.String, Tags: TagList }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "TagResourceRequest",
}) as any as S.Schema<TagResourceRequest>;
export interface TagResourceResponse {}
export const TagResourceResponse = S.suspend(() => S.Struct({})).annotate({
  identifier: "TagResourceResponse",
}) as any as S.Schema<TagResourceResponse>;
export type TagKeyList = string[];
export const TagKeyList = S.Array(S.String);
export interface UntagResourceRequest {
  ResourceARN: string;
  TagKeys: string[];
}
export const UntagResourceRequest = S.suspend(() =>
  S.Struct({ ResourceARN: S.String, TagKeys: TagKeyList }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UntagResourceRequest",
}) as any as S.Schema<UntagResourceRequest>;
export interface UntagResourceResponse {}
export const UntagResourceResponse = S.suspend(() => S.Struct({})).annotate({
  identifier: "UntagResourceResponse",
}) as any as S.Schema<UntagResourceResponse>;

//# Errors
export class AccessDeniedException extends S.TaggedErrorClass<AccessDeniedException>()(
  "AccessDeniedException",
  { Message: S.optional(S.String) },
).pipe(C.withAuthError) {}
export class InternalServerException extends S.TaggedErrorClass<InternalServerException>()(
  "InternalServerException",
  { Message: S.optional(S.String) },
).pipe(C.withServerError) {}
export class ThrottlingException extends S.TaggedErrorClass<ThrottlingException>()(
  "ThrottlingException",
  { Message: S.optional(S.String) },
).pipe(C.withThrottlingError) {}
export class ValidationException extends S.TaggedErrorClass<ValidationException>()(
  "ValidationException",
  { Message: S.optional(S.String) },
).pipe(C.withBadRequestError) {}
export class ConflictException extends S.TaggedErrorClass<ConflictException>()(
  "ConflictException",
  { Message: S.optional(S.String) },
).pipe(C.withConflictError) {}
export class ResourceNotFoundException extends S.TaggedErrorClass<ResourceNotFoundException>()(
  "ResourceNotFoundException",
  { Message: S.optional(S.String) },
).pipe(C.withBadRequestError) {}

//# Operations
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateFHIRDatastoreRequest,
  output: CreateFHIRDatastoreResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteFHIRDatastoreRequest,
  output: DeleteFHIRDatastoreResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DescribeFHIRDatastoreRequest,
  output: DescribeFHIRDatastoreResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DescribeFHIRExportJobRequest,
  output: DescribeFHIRExportJobResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DescribeFHIRImportJobRequest,
  output: DescribeFHIRImportJobResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
export type ListFHIRDatastoresError =
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List all FHIR-enabled data stores in a user’s account, regardless of data store
 * status.
 */
export const listFHIRDatastores: API.OperationMethod<
  ListFHIRDatastoresRequest,
  ListFHIRDatastoresResponse,
  ListFHIRDatastoresError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListFHIRDatastoresRequest,
  ) => stream.Stream<
    ListFHIRDatastoresResponse,
    ListFHIRDatastoresError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListFHIRDatastoresRequest,
  ) => stream.Stream<
    unknown,
    ListFHIRDatastoresError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListFHIRDatastoresRequest,
  output: ListFHIRDatastoresResponse,
  errors: [InternalServerException, ThrottlingException, ValidationException],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
}));
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
export const listFHIRExportJobs: API.OperationMethod<
  ListFHIRExportJobsRequest,
  ListFHIRExportJobsResponse,
  ListFHIRExportJobsError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListFHIRExportJobsRequest,
  ) => stream.Stream<
    ListFHIRExportJobsResponse,
    ListFHIRExportJobsError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListFHIRExportJobsRequest,
  ) => stream.Stream<
    unknown,
    ListFHIRExportJobsError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListFHIRExportJobsRequest,
  output: ListFHIRExportJobsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
}));
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
export const listFHIRImportJobs: API.OperationMethod<
  ListFHIRImportJobsRequest,
  ListFHIRImportJobsResponse,
  ListFHIRImportJobsError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListFHIRImportJobsRequest,
  ) => stream.Stream<
    ListFHIRImportJobsResponse,
    ListFHIRImportJobsError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListFHIRImportJobsRequest,
  ) => stream.Stream<
    unknown,
    ListFHIRImportJobsError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListFHIRImportJobsRequest,
  output: ListFHIRImportJobsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
}));
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ListTagsForResourceRequest,
  output: ListTagsForResourceResponse,
  errors: [ResourceNotFoundException, ValidationException],
}));
export type StartFHIRExportJobError =
  | AccessDeniedException
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: StartFHIRExportJobRequest,
  output: StartFHIRExportJobResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
export type StartFHIRImportJobError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Start importing bulk FHIR data into an ACTIVE data store. The import job imports FHIR
 * data found in the `InputDataConfig` object and stores processing results in the
 * `JobOutputDataConfig` object.
 */
export const startFHIRImportJob: API.OperationMethod<
  StartFHIRImportJobRequest,
  StartFHIRImportJobResponse,
  StartFHIRImportJobError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: StartFHIRImportJobRequest,
  output: StartFHIRImportJobResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: TagResourceRequest,
  output: TagResourceResponse,
  errors: [ResourceNotFoundException, ValidationException],
}));
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UntagResourceRequest,
  output: UntagResourceResponse,
  errors: [ResourceNotFoundException, ValidationException],
}));
