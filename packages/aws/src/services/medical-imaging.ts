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
import { SensitiveString, SensitiveBlob } from "../sensitive.ts";
import * as T from "../traits.ts";
// Schema table, filled on first reach (see __S at the end).
const __s: any[] = [];
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "Medical Imaging",
  serviceShapeName: "AHIGatewayService",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "medical-imaging" });
const ver = /*@__PURE__*/ T.ServiceVersion("2023-07-19");
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
              `https://medical-imaging-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://medical-imaging-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://medical-imaging.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://medical-imaging.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://medical-imaging.{R}.{D}","properties":{},"headers":{}}');

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class BadRequestException
  extends /*@__PURE__*/ S.TaggedError<BadRequestException>()(
    "BadRequestException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError) {}
export class NotAcceptableException
  extends /*@__PURE__*/ S.TaggedError<NotAcceptableException>()(
    "NotAcceptableException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(406),
  ).pipe(C.withBadRequestError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type DatastoreId = string;
export type ImageSetId = string;
export type ImageSetExternalVersionId = string;
export type CopiableAttributes = string | redacted.Redacted<string>;
export interface MetadataCopies {
  copiableAttributes: string | redacted.Redacted<string>;
}
export interface CopySourceImageSetInformation {
  latestVersionId: string;
  DICOMCopies?: MetadataCopies;
}
export interface CopyDestinationImageSet {
  imageSetId: string;
  latestVersionId: string;
}
export interface CopyImageSetInformation {
  sourceImageSet: CopySourceImageSetInformation;
  destinationImageSet?: CopyDestinationImageSet;
}
export interface CopyImageSetRequest {
  datastoreId: string;
  sourceImageSetId: string;
  copyImageSetInformation: CopyImageSetInformation;
  force?: boolean;
  promoteToPrimary?: boolean;
}
export type ImageSetState = "ACTIVE" | "LOCKED" | "DELETED" | (string & {});
export type ImageSetWorkflowStatus =
  | "CREATED"
  | "COPIED"
  | "COPYING"
  | "COPYING_WITH_READ_ONLY_ACCESS"
  | "COPY_FAILED"
  | "UPDATING"
  | "UPDATING_FOR_STUDY_CONSISTENCY"
  | "UPDATED"
  | "UPDATE_FAILED"
  | "DELETING"
  | "DELETED"
  | "IMPORTING"
  | "IMPORTED"
  | "IMPORT_FAILED"
  | (string & {});
export type Arn = string;
export interface CopySourceImageSetProperties {
  imageSetId: string;
  latestVersionId: string;
  imageSetState?: ImageSetState;
  imageSetWorkflowStatus?: ImageSetWorkflowStatus;
  createdAt?: Date;
  updatedAt?: Date;
  imageSetArn?: string;
}
export interface CopyDestinationImageSetProperties {
  imageSetId: string;
  latestVersionId: string;
  imageSetState?: ImageSetState;
  imageSetWorkflowStatus?: ImageSetWorkflowStatus;
  createdAt?: Date;
  updatedAt?: Date;
  imageSetArn?: string;
}
export interface CopyImageSetResponse {
  datastoreId: string;
  sourceImageSetProperties: CopySourceImageSetProperties;
  destinationImageSetProperties: CopyDestinationImageSetProperties;
}
export type DatastoreName = string;
export type ClientToken = string;
export type TagKey = string;
export type TagValue = string;
export type TagMap = { [key: string]: string | undefined };
export type KmsKeyArn = string;
export type LambdaArn = string;
export type LosslessStorageFormat = "HTJ2K" | "JPEG_2000_LOSSLESS" | (string & {});
export interface CreateDatastoreRequest {
  datastoreName?: string;
  clientToken: string;
  tags?: { [key: string]: string | undefined };
  kmsKeyArn?: string;
  lambdaAuthorizerArn?: string;
  losslessStorageFormat?: LosslessStorageFormat;
}
export type DatastoreStatus =
  | "CREATING"
  | "CREATE_FAILED"
  | "ACTIVE"
  | "DELETING"
  | "DELETED"
  | (string & {});
export interface CreateDatastoreResponse {
  datastoreId: string;
  datastoreStatus: DatastoreStatus;
}
export interface DeleteDatastoreRequest {
  datastoreId: string;
}
export interface DeleteDatastoreResponse {
  datastoreId: string;
  datastoreStatus: DatastoreStatus;
}
export interface DeleteImageSetRequest {
  datastoreId: string;
  imageSetId: string;
}
export interface DeleteImageSetResponse {
  datastoreId: string;
  imageSetId: string;
  imageSetState: ImageSetState;
  imageSetWorkflowStatus: ImageSetWorkflowStatus;
}
export interface GetDatastoreRequest {
  datastoreId: string;
}
export interface DatastoreProperties {
  datastoreId: string;
  datastoreName: string;
  datastoreStatus: DatastoreStatus;
  kmsKeyArn?: string;
  lambdaAuthorizerArn?: string;
  losslessStorageFormat?: LosslessStorageFormat;
  datastoreArn?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface GetDatastoreResponse {
  datastoreProperties: DatastoreProperties;
}
export type JobId = string;
export interface GetDICOMImportJobRequest {
  datastoreId: string;
  jobId: string;
}
export type JobName = string;
export type JobStatus = "SUBMITTED" | "IN_PROGRESS" | "COMPLETED" | "FAILED" | (string & {});
export type RoleArn = string;
export type S3Uri = string;
export type Message = string;
export type DICOMStudyInstanceUID = string | redacted.Redacted<string>;
export type DICOMSeriesInstanceUID = string | redacted.Redacted<string>;
export type MetadataFilePath = string;
export interface DicomMetadataMapping {
  studyInstanceUID: string | redacted.Redacted<string>;
  seriesInstanceUID?: string | redacted.Redacted<string>;
  metadataFilePath: string;
}
export type DicomMetadataMappings = DicomMetadataMapping[];
export interface DicomJsonMetadataImportConfiguration {
  dicomMetadataMappings: DicomMetadataMapping[];
}
export type ImportConfiguration = {
  dicomJsonMetadataImportConfiguration: DicomJsonMetadataImportConfiguration;
};
export interface DICOMImportJobProperties {
  jobId: string;
  jobName: string;
  jobStatus: JobStatus;
  datastoreId: string;
  dataAccessRoleArn: string;
  endedAt?: Date;
  submittedAt?: Date;
  inputS3Uri: string;
  outputS3Uri: string;
  message?: string;
  importConfiguration?: ImportConfiguration;
}
export interface GetDICOMImportJobResponse {
  jobProperties: DICOMImportJobProperties;
}
export type ImageFrameId = string;
export interface ImageFrameInformation {
  imageFrameId: string;
}
export interface GetImageFrameRequest {
  datastoreId: string;
  imageSetId: string;
  imageFrameInformation: ImageFrameInformation;
}
export interface GetImageFrameResponse {
  imageFrameBlob: T.StreamingOutputBody;
  contentType?: string;
}
export interface GetImageSetRequest {
  datastoreId: string;
  imageSetId: string;
  versionId?: string;
}
export interface Overrides {
  forced?: boolean;
}
export type StorageTier = "FREQUENT_ACCESS" | "ARCHIVE_INSTANT_ACCESS" | (string & {});
export interface GetImageSetResponse {
  datastoreId: string;
  imageSetId: string;
  versionId: string;
  imageSetState: ImageSetState;
  imageSetWorkflowStatus?: ImageSetWorkflowStatus;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  message?: string;
  imageSetArn?: string;
  overrides?: Overrides;
  isPrimary?: boolean;
  lastAccessedAt?: Date;
  storageTier?: StorageTier;
}
export interface GetImageSetMetadataRequest {
  datastoreId: string;
  imageSetId: string;
  versionId?: string;
}
export interface GetImageSetMetadataResponse {
  imageSetMetadataBlob: T.StreamingOutputBody;
  contentType?: string;
  contentEncoding?: string;
}
export type NextToken = string;
export interface ListDatastoresRequest {
  datastoreStatus?: DatastoreStatus;
  nextToken?: string;
  maxResults?: number;
}
export interface DatastoreSummary {
  datastoreId: string;
  datastoreName: string;
  datastoreStatus: DatastoreStatus;
  datastoreArn?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export type DatastoreSummaries = DatastoreSummary[];
export interface ListDatastoresResponse {
  datastoreSummaries?: DatastoreSummary[];
  nextToken?: string;
}
export interface ListDICOMImportJobsRequest {
  datastoreId: string;
  jobStatus?: JobStatus;
  nextToken?: string;
  maxResults?: number;
}
export interface DICOMImportJobSummary {
  jobId: string;
  jobName: string;
  jobStatus: JobStatus;
  datastoreId: string;
  dataAccessRoleArn?: string;
  endedAt?: Date;
  submittedAt?: Date;
  message?: string;
}
export type DICOMImportJobSummaries = DICOMImportJobSummary[];
export interface ListDICOMImportJobsResponse {
  jobSummaries: DICOMImportJobSummary[];
  nextToken?: string;
}
export interface ListImageSetVersionsRequest {
  datastoreId: string;
  imageSetId: string;
  nextToken?: string;
  maxResults?: number;
}
export interface ImageSetProperties {
  imageSetId: string;
  versionId: string;
  imageSetState: ImageSetState;
  ImageSetWorkflowStatus?: ImageSetWorkflowStatus;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  message?: string;
  overrides?: Overrides;
  isPrimary?: boolean;
}
export type ImageSetPropertiesList = ImageSetProperties[];
export interface ListImageSetVersionsResponse {
  imageSetPropertiesList: ImageSetProperties[];
  nextToken?: string;
}
export interface ListTagsForResourceRequest {
  resourceArn: string;
}
export interface ListTagsForResourceResponse {
  tags: { [key: string]: string | undefined };
}
export type DICOMPatientId = string | redacted.Redacted<string>;
export type DICOMAccessionNumber = string | redacted.Redacted<string>;
export type DICOMStudyId = string | redacted.Redacted<string>;
export type DICOMStudyDate = string | redacted.Redacted<string>;
export type DICOMStudyTime = string | redacted.Redacted<string>;
export interface DICOMStudyDateAndTime {
  DICOMStudyDate: string | redacted.Redacted<string>;
  DICOMStudyTime?: string | redacted.Redacted<string>;
}
export type SearchByAttributeValue =
  | {
      DICOMPatientId: string | redacted.Redacted<string>;
      DICOMAccessionNumber?: never;
      DICOMStudyId?: never;
      DICOMStudyInstanceUID?: never;
      DICOMSeriesInstanceUID?: never;
      createdAt?: never;
      updatedAt?: never;
      DICOMStudyDateAndTime?: never;
      isPrimary?: never;
    }
  | {
      DICOMPatientId?: never;
      DICOMAccessionNumber: string | redacted.Redacted<string>;
      DICOMStudyId?: never;
      DICOMStudyInstanceUID?: never;
      DICOMSeriesInstanceUID?: never;
      createdAt?: never;
      updatedAt?: never;
      DICOMStudyDateAndTime?: never;
      isPrimary?: never;
    }
  | {
      DICOMPatientId?: never;
      DICOMAccessionNumber?: never;
      DICOMStudyId: string | redacted.Redacted<string>;
      DICOMStudyInstanceUID?: never;
      DICOMSeriesInstanceUID?: never;
      createdAt?: never;
      updatedAt?: never;
      DICOMStudyDateAndTime?: never;
      isPrimary?: never;
    }
  | {
      DICOMPatientId?: never;
      DICOMAccessionNumber?: never;
      DICOMStudyId?: never;
      DICOMStudyInstanceUID: string | redacted.Redacted<string>;
      DICOMSeriesInstanceUID?: never;
      createdAt?: never;
      updatedAt?: never;
      DICOMStudyDateAndTime?: never;
      isPrimary?: never;
    }
  | {
      DICOMPatientId?: never;
      DICOMAccessionNumber?: never;
      DICOMStudyId?: never;
      DICOMStudyInstanceUID?: never;
      DICOMSeriesInstanceUID: string | redacted.Redacted<string>;
      createdAt?: never;
      updatedAt?: never;
      DICOMStudyDateAndTime?: never;
      isPrimary?: never;
    }
  | {
      DICOMPatientId?: never;
      DICOMAccessionNumber?: never;
      DICOMStudyId?: never;
      DICOMStudyInstanceUID?: never;
      DICOMSeriesInstanceUID?: never;
      createdAt: Date;
      updatedAt?: never;
      DICOMStudyDateAndTime?: never;
      isPrimary?: never;
    }
  | {
      DICOMPatientId?: never;
      DICOMAccessionNumber?: never;
      DICOMStudyId?: never;
      DICOMStudyInstanceUID?: never;
      DICOMSeriesInstanceUID?: never;
      createdAt?: never;
      updatedAt: Date;
      DICOMStudyDateAndTime?: never;
      isPrimary?: never;
    }
  | {
      DICOMPatientId?: never;
      DICOMAccessionNumber?: never;
      DICOMStudyId?: never;
      DICOMStudyInstanceUID?: never;
      DICOMSeriesInstanceUID?: never;
      createdAt?: never;
      updatedAt?: never;
      DICOMStudyDateAndTime: DICOMStudyDateAndTime;
      isPrimary?: never;
    }
  | {
      DICOMPatientId?: never;
      DICOMAccessionNumber?: never;
      DICOMStudyId?: never;
      DICOMStudyInstanceUID?: never;
      DICOMSeriesInstanceUID?: never;
      createdAt?: never;
      updatedAt?: never;
      DICOMStudyDateAndTime?: never;
      isPrimary: boolean;
    };
export type SearchByAttributeValues = SearchByAttributeValue[];
export type Operator = "EQUAL" | "BETWEEN" | (string & {});
export interface SearchFilter {
  values: SearchByAttributeValue[];
  operator: Operator;
}
export type SearchFilters = SearchFilter[];
export type SortOrder = "ASC" | "DESC" | (string & {});
export type SortField = "updatedAt" | "createdAt" | "DICOMStudyDateAndTime" | (string & {});
export interface Sort {
  sortOrder: SortOrder;
  sortField: SortField;
}
export interface SearchCriteria {
  filters?: SearchFilter[];
  sort?: Sort;
}
export interface SearchImageSetsRequest {
  datastoreId: string;
  searchCriteria?: SearchCriteria;
  maxResults?: number;
  nextToken?: string;
}
export type DICOMPatientName = string | redacted.Redacted<string>;
export type DICOMPatientBirthDate = string | redacted.Redacted<string>;
export type DICOMPatientSex = string | redacted.Redacted<string>;
export type DICOMStudyDescription = string | redacted.Redacted<string>;
export type DICOMNumberOfStudyRelatedSeries = number;
export type DICOMNumberOfStudyRelatedInstances = number;
export type DICOMSeriesModality = string | redacted.Redacted<string>;
export type DICOMSeriesBodyPart = string | redacted.Redacted<string>;
export type DICOMSeriesNumber = number;
export interface DICOMTags {
  DICOMPatientId?: string | redacted.Redacted<string>;
  DICOMPatientName?: string | redacted.Redacted<string>;
  DICOMPatientBirthDate?: string | redacted.Redacted<string>;
  DICOMPatientSex?: string | redacted.Redacted<string>;
  DICOMStudyInstanceUID?: string | redacted.Redacted<string>;
  DICOMStudyId?: string | redacted.Redacted<string>;
  DICOMStudyDescription?: string | redacted.Redacted<string>;
  DICOMNumberOfStudyRelatedSeries?: number;
  DICOMNumberOfStudyRelatedInstances?: number;
  DICOMAccessionNumber?: string | redacted.Redacted<string>;
  DICOMSeriesInstanceUID?: string | redacted.Redacted<string>;
  DICOMSeriesModality?: string | redacted.Redacted<string>;
  DICOMSeriesBodyPart?: string | redacted.Redacted<string>;
  DICOMSeriesNumber?: number;
  DICOMStudyDate?: string | redacted.Redacted<string>;
  DICOMStudyTime?: string | redacted.Redacted<string>;
}
export interface ImageSetsMetadataSummary {
  imageSetId: string;
  version?: number;
  createdAt?: Date;
  updatedAt?: Date;
  lastAccessedAt?: Date;
  storageTier?: StorageTier;
  DICOMTags?: DICOMTags;
  isPrimary?: boolean;
}
export type ImageSetsMetadataSummaries = ImageSetsMetadataSummary[];
export interface SearchImageSetsResponse {
  imageSetsMetadataSummaries: ImageSetsMetadataSummary[];
  sort?: Sort;
  nextToken?: string;
}
export type AwsAccountId = string;
export interface StartDICOMImportJobRequest {
  jobName?: string;
  dataAccessRoleArn: string;
  clientToken: string;
  datastoreId: string;
  inputS3Uri: string;
  outputS3Uri: string;
  inputOwnerAccountId?: string;
  importConfiguration?: ImportConfiguration;
}
export interface StartDICOMImportJobResponse {
  datastoreId: string;
  jobId: string;
  jobStatus: JobStatus;
  submittedAt: Date;
}
export interface TagResourceRequest {
  resourceArn: string;
  tags: { [key: string]: string | undefined };
}
export interface TagResourceResponse {}
export type TagKeyList = string[];
export interface UntagResourceRequest {
  resourceArn: string;
  tagKeys: string[];
}
export interface UntagResourceResponse {}
export type DICOMAttribute = Uint8Array | redacted.Redacted<Uint8Array>;
export interface DICOMUpdates {
  removableAttributes?: Uint8Array | redacted.Redacted<Uint8Array>;
  updatableAttributes?: Uint8Array | redacted.Redacted<Uint8Array>;
}
export type MetadataUpdates =
  | { DICOMUpdates: DICOMUpdates; revertToVersionId?: never }
  | { DICOMUpdates?: never; revertToVersionId: string };
export interface UpdateImageSetMetadataRequest {
  datastoreId: string;
  imageSetId: string;
  latestVersionId: string;
  force?: boolean;
  includeStudyImageSets?: boolean;
  updateImageSetMetadataUpdates: MetadataUpdates;
}
export interface UpdateImageSetMetadataResponse {
  datastoreId: string;
  imageSetId: string;
  latestVersionId: string;
  imageSetState: ImageSetState;
  imageSetWorkflowStatus?: ImageSetWorkflowStatus;
  createdAt?: Date;
  updatedAt?: Date;
  message?: string;
}
export type CopyImageSetError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Copy an image set.
 */
export const copyImageSet: API.OperationMethod<
  CopyImageSetRequest,
  CopyImageSetResponse,
  CopyImageSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(356, __c22, 4) as any as S.Schema<CopyImageSetRequest>,
  output: __S(358, __c22, 6) as any as S.Schema<CopyImageSetResponse>,
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
  operationName: "CopyImageSet",
  endpointHostPrefix: "runtime-",
}));

export type CreateDatastoreError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Create a data store.
 */
export const createDatastore: API.OperationMethod<
  CreateDatastoreRequest,
  CreateDatastoreResponse,
  CreateDatastoreError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<CreateDatastoreRequest>,
  output: __S(16, __c1, 0) as any as S.Schema<CreateDatastoreResponse>,
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
  operationName: "CreateDatastore",
}));

export type DeleteDatastoreError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Delete a data store.
 *
 * Before a data store can be deleted, you must first delete all image sets within it.
 */
export const deleteDatastore: API.OperationMethod<
  DeleteDatastoreRequest,
  DeleteDatastoreResponse,
  DeleteDatastoreError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(48, __c3, 0) as any as S.Schema<DeleteDatastoreRequest>,
  output: __S(16, __c1, 0) as any as S.Schema<DeleteDatastoreResponse>,
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
  operationName: "DeleteDatastore",
}));

export type DeleteImageSetError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Delete an image set.
 */
export const deleteImageSet: API.OperationMethod<
  DeleteImageSetRequest,
  DeleteImageSetResponse,
  DeleteImageSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(64, __c4, 0) as any as S.Schema<DeleteImageSetRequest>,
  output: __S(65, __c4, 1) as any as S.Schema<DeleteImageSetResponse>,
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
  operationName: "DeleteImageSet",
  endpointHostPrefix: "runtime-",
}));

export type GetDatastoreError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get data store properties.
 */
export const getDatastore: API.OperationMethod<
  GetDatastoreRequest,
  GetDatastoreResponse,
  GetDatastoreError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(80, __c5, 0) as any as S.Schema<GetDatastoreRequest>,
  output: __S(82, __c5, 2) as any as S.Schema<GetDatastoreResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDatastore",
}));

export type GetDICOMImportJobError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get the import job properties to learn more about the job or job progress.
 *
 * The `jobStatus` refers to the execution of the import job. Therefore, an import job can return a `jobStatus` as `COMPLETED` even if validation issues are discovered during the import process. If a `jobStatus` returns as `COMPLETED`, we still recommend you review the output manifests written to S3, as they provide details on the success or failure of individual P10 object imports.
 */
export const getDICOMImportJob: API.OperationMethod<
  GetDICOMImportJobRequest,
  GetDICOMImportJobResponse,
  GetDICOMImportJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(96, __c6, 0) as any as S.Schema<GetDICOMImportJobRequest>,
  output: __S(98, __c6, 2) as any as S.Schema<GetDICOMImportJobResponse>,
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
  operationName: "GetDICOMImportJob",
}));

export type GetImageFrameError =
  | AccessDeniedException
  | BadRequestException
  | ConflictException
  | InternalServerException
  | NotAcceptableException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get an image frame (pixel data) for an image set.
 */
export const getImageFrame: API.OperationMethod<
  GetImageFrameRequest,
  GetImageFrameResponse,
  GetImageFrameError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(129, __c8, 1) as any as S.Schema<GetImageFrameRequest>,
  output: __S(130, __c8, 2) as any as S.Schema<GetImageFrameResponse>,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ConflictException,
    InternalServerException,
    NotAcceptableException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetImageFrame",
  endpointHostPrefix: "runtime-",
}));

export type GetImageSetError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get image set properties.
 */
export const getImageSet: API.OperationMethod<
  GetImageSetRequest,
  GetImageSetResponse,
  GetImageSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(144, __c9, 0) as any as S.Schema<GetImageSetRequest>,
  output: __S(145, __c9, 1) as any as S.Schema<GetImageSetResponse>,
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
  operationName: "GetImageSet",
  endpointHostPrefix: "runtime-",
}));

export type GetImageSetMetadataError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get metadata attributes for an image set.
 */
export const getImageSetMetadata: API.OperationMethod<
  GetImageSetMetadataRequest,
  GetImageSetMetadataResponse,
  GetImageSetMetadataError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(176, __c11, 0) as any as S.Schema<GetImageSetMetadataRequest>,
  output: __S(177, __c11, 1) as any as S.Schema<GetImageSetMetadataResponse>,
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
  operationName: "GetImageSetMetadata",
  endpointHostPrefix: "runtime-",
}));

export type ListDatastoresError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List data stores.
 */
export const listDatastores: API.PaginatedOperationMethod<
  ListDatastoresRequest,
  ListDatastoresResponse,
  ListDatastoresError,
  Credentials | HttpClient.HttpClient,
  DatastoreSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(192, __c12, 0) as any as S.Schema<ListDatastoresRequest>,
  output: __S(195, __c12, 3) as any as S.Schema<ListDatastoresResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDatastores",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "datastoreSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListDICOMImportJobsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List import jobs created for a specific data store.
 */
export const listDICOMImportJobs: API.PaginatedOperationMethod<
  ListDICOMImportJobsRequest,
  ListDICOMImportJobsResponse,
  ListDICOMImportJobsError,
  Credentials | HttpClient.HttpClient,
  DICOMImportJobSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(208, __c13, 0) as any as S.Schema<ListDICOMImportJobsRequest>,
  output: __S(211, __c13, 3) as any as S.Schema<ListDICOMImportJobsResponse>,
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
  operationName: "ListDICOMImportJobs",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "jobSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListImageSetVersionsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List image set versions.
 */
export const listImageSetVersions: API.PaginatedOperationMethod<
  ListImageSetVersionsRequest,
  ListImageSetVersionsResponse,
  ListImageSetVersionsError,
  Credentials | HttpClient.HttpClient,
  ImageSetProperties
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(224, __c14, 0) as any as S.Schema<ListImageSetVersionsRequest>,
  output: __S(227, __c14, 3) as any as S.Schema<ListImageSetVersionsResponse>,
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
  operationName: "ListImageSetVersions",
  endpointHostPrefix: "runtime-",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "imageSetPropertiesList",
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
 * Lists all tags associated with a medical imaging resource.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(240, __c15, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(241, __c15, 1) as any as S.Schema<ListTagsForResourceResponse>,
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

export type SearchImageSetsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Search image sets based on defined input attributes.
 *
 * `SearchImageSets` accepts a single search query parameter and returns a paginated response of all image sets that have the matching criteria. All date range queries must be input as `(lowerBound, upperBound)`.
 *
 * By default, `SearchImageSets` uses the `updatedAt` field for sorting in descending order from newest to oldest.
 */
export const searchImageSets: API.PaginatedOperationMethod<
  SearchImageSetsRequest,
  SearchImageSetsResponse,
  SearchImageSetsError,
  Credentials | HttpClient.HttpClient,
  ImageSetsMetadataSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(263, __c16, 7) as any as S.Schema<SearchImageSetsRequest>,
  output: __S(267, __c16, 11) as any as S.Schema<SearchImageSetsResponse>,
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
  operationName: "SearchImageSets",
  endpointHostPrefix: "runtime-",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "imageSetsMetadataSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type StartDICOMImportJobError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Start importing bulk data into an `ACTIVE` data store. The import job imports DICOM P10 files or enhances existing DICOM files with JSON metadata. The `importConfiguration` parameter specifies the import type. The data is found in the S3 prefix specified by the `inputS3Uri` parameter. The import job stores processing results in the file specified by the `outputS3Uri` parameter.
 */
export const startDICOMImportJob: API.OperationMethod<
  StartDICOMImportJobRequest,
  StartDICOMImportJobResponse,
  StartDICOMImportJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(272, __c17, 0) as any as S.Schema<StartDICOMImportJobRequest>,
  output: __S(273, __c17, 1) as any as S.Schema<StartDICOMImportJobResponse>,
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
  operationName: "StartDICOMImportJob",
}));

export type TagResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Adds a user-specifed key and value tag to a medical imaging resource.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(288, __c18, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(304, __c19, 0) as any as S.Schema<TagResourceResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
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
 * Removes tags from a medical imaging resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(321, __c20, 1) as any as S.Schema<UntagResourceRequest>,
  output: __S(304, __c19, 0) as any as S.Schema<UntagResourceResponse>,
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

export type UpdateImageSetMetadataError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Update image set metadata attributes.
 */
export const updateImageSetMetadata: API.OperationMethod<
  UpdateImageSetMetadataRequest,
  UpdateImageSetMetadataResponse,
  UpdateImageSetMetadataError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(338, __c21, 2) as any as S.Schema<UpdateImageSetMetadataRequest>,
  output: __S(339, __c21, 3) as any as S.Schema<UpdateImageSetMetadataResponse>,
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
  operationName: "UpdateImageSetMetadata",
  endpointHostPrefix: "runtime-",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          datastoreName: S.optional(S.String),
          clientToken: S.String.pipe(T.IdempotencyToken()),
          tags: S.optional(__S(32, __c2, 0)),
          kmsKeyArn: S.optional(S.String),
          lambdaAuthorizerArn: S.optional(S.String),
          losslessStorageFormat: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/datastore" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateDatastoreRequest" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ datastoreId: S.String, datastoreStatus: S.String }),
      ).annotate({ identifier: "CreateDatastoreResponse" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ datastoreId: S.String.pipe(T.HttpLabel("datastoreId")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/datastore/{datastoreId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteDatastoreRequest" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          datastoreId: S.String.pipe(T.HttpLabel("datastoreId")),
          imageSetId: S.String.pipe(T.HttpLabel("imageSetId")),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/datastore/{datastoreId}/imageSet/{imageSetId}/deleteImageSet",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteImageSetRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          datastoreId: S.String,
          imageSetId: S.String,
          imageSetState: S.String,
          imageSetWorkflowStatus: S.String,
        }),
      ).annotate({ identifier: "DeleteImageSetResponse" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ datastoreId: S.String.pipe(T.HttpLabel("datastoreId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/datastore/{datastoreId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetDatastoreRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          datastoreId: S.String,
          datastoreName: S.String,
          datastoreStatus: S.String,
          kmsKeyArn: S.optional(S.String),
          lambdaAuthorizerArn: S.optional(S.String),
          losslessStorageFormat: S.optional(S.String),
          datastoreArn: S.optional(S.String),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "DatastoreProperties" });
    case 2:
      return S.suspend(() => S.Struct({ datastoreProperties: __S(81, __c5, 1) })).annotate({
        identifier: "GetDatastoreResponse",
      });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          datastoreId: S.String.pipe(T.HttpLabel("datastoreId")),
          jobId: S.String.pipe(T.HttpLabel("jobId")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/getDICOMImportJob/datastore/{datastoreId}/job/{jobId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetDICOMImportJobRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          jobId: S.String,
          jobName: S.String,
          jobStatus: S.String,
          datastoreId: S.String,
          dataAccessRoleArn: S.String,
          endedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          submittedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          inputS3Uri: S.String,
          outputS3Uri: S.String,
          message: S.optional(S.String),
          importConfiguration: S.optional(__S(115, __c7, 3)),
        }),
      ).annotate({ identifier: "DICOMImportJobProperties" });
    case 2:
      return S.suspend(() => S.Struct({ jobProperties: __S(97, __c6, 1) })).annotate({
        identifier: "GetDICOMImportJobResponse",
      });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          studyInstanceUID: SensitiveString,
          seriesInstanceUID: S.optional(SensitiveString),
          metadataFilePath: S.String,
        }),
      ).annotate({ identifier: "DicomMetadataMapping" });
    case 1:
      return S.Array(__S(112, __c7, 0));
    case 2:
      return S.suspend(() => S.Struct({ dicomMetadataMappings: __S(113, __c7, 1) })).annotate({
        identifier: "DicomJsonMetadataImportConfiguration",
      });
    case 3:
      return S.Union([
        /*@__PURE__*/ S.Struct({ dicomJsonMetadataImportConfiguration: __S(114, __c7, 2) }),
      ]);
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ imageFrameId: S.String })).annotate({
        identifier: "ImageFrameInformation",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          datastoreId: S.String.pipe(T.HttpLabel("datastoreId")),
          imageSetId: S.String.pipe(T.HttpLabel("imageSetId")),
          imageFrameInformation: __S(128, __c8, 0)
            .pipe(T.HttpPayload())
            .annotate({ identifier: "ImageFrameInformation" }),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/datastore/{datastoreId}/imageSet/{imageSetId}/getImageFrame",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetImageFrameRequest" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          imageFrameBlob: T.StreamingOutput.pipe(T.HttpPayload()),
          contentType: S.optional(S.String).pipe(T.HttpHeader("Content-Type")),
        }),
      ).annotate({ identifier: "GetImageFrameResponse" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          datastoreId: S.String.pipe(T.HttpLabel("datastoreId")),
          imageSetId: S.String.pipe(T.HttpLabel("imageSetId")),
          versionId: S.optional(S.String).pipe(T.HttpQuery("version")),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/datastore/{datastoreId}/imageSet/{imageSetId}/getImageSet",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetImageSetRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          datastoreId: S.String,
          imageSetId: S.String,
          versionId: S.String,
          imageSetState: S.String,
          imageSetWorkflowStatus: S.optional(S.String),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          deletedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          message: S.optional(S.String),
          imageSetArn: S.optional(S.String),
          overrides: S.optional(__S(160, __c10, 0)),
          isPrimary: S.optional(S.Boolean),
          lastAccessedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          storageTier: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetImageSetResponse" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ forced: S.optional(S.Boolean) })).annotate({
        identifier: "Overrides",
      });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          datastoreId: S.String.pipe(T.HttpLabel("datastoreId")),
          imageSetId: S.String.pipe(T.HttpLabel("imageSetId")),
          versionId: S.optional(S.String).pipe(T.HttpQuery("version")),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/datastore/{datastoreId}/imageSet/{imageSetId}/getImageSetMetadata",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetImageSetMetadataRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          imageSetMetadataBlob: T.StreamingOutput.pipe(T.HttpPayload()),
          contentType: S.optional(S.String).pipe(T.HttpHeader("Content-Type")),
          contentEncoding: S.optional(S.String).pipe(T.HttpHeader("Content-Encoding")),
        }),
      ).annotate({ identifier: "GetImageSetMetadataResponse" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          datastoreStatus: S.optional(S.String).pipe(T.HttpQuery("datastoreStatus")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(T.all(T.Http({ method: "GET", uri: "/datastore" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListDatastoresRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          datastoreId: S.String,
          datastoreName: S.String,
          datastoreStatus: S.String,
          datastoreArn: S.optional(S.String),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "DatastoreSummary" });
    case 2:
      return S.Array(__S(193, __c12, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          datastoreSummaries: S.optional(__S(194, __c12, 2)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListDatastoresResponse" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          datastoreId: S.String.pipe(T.HttpLabel("datastoreId")),
          jobStatus: S.optional(S.String).pipe(T.HttpQuery("jobStatus")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/listDICOMImportJobs/datastore/{datastoreId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListDICOMImportJobsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          jobId: S.String,
          jobName: S.String,
          jobStatus: S.String,
          datastoreId: S.String,
          dataAccessRoleArn: S.optional(S.String),
          endedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          submittedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          message: S.optional(S.String),
        }),
      ).annotate({ identifier: "DICOMImportJobSummary" });
    case 2:
      return S.Array(__S(209, __c13, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ jobSummaries: __S(210, __c13, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListDICOMImportJobsResponse" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          datastoreId: S.String.pipe(T.HttpLabel("datastoreId")),
          imageSetId: S.String.pipe(T.HttpLabel("imageSetId")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/datastore/{datastoreId}/imageSet/{imageSetId}/listImageSetVersions",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListImageSetVersionsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          imageSetId: S.String,
          versionId: S.String,
          imageSetState: S.String,
          ImageSetWorkflowStatus: S.optional(S.String),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          deletedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          message: S.optional(S.String),
          overrides: S.optional(__S(160, __c10, 0)),
          isPrimary: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "ImageSetProperties" });
    case 2:
      return S.Array(__S(225, __c14, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ imageSetPropertiesList: __S(226, __c14, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListImageSetVersionsResponse" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceArn: S.String.pipe(T.HttpLabel("resourceArn")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/tags/{resourceArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListTagsForResourceRequest" });
    case 1:
      return S.suspend(() => S.Struct({ tags: __S(32, __c2, 0) })).annotate({
        identifier: "ListTagsForResourceResponse",
      });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DICOMStudyDate: SensitiveString, DICOMStudyTime: S.optional(SensitiveString) }),
      ).annotate({ identifier: "DICOMStudyDateAndTime" });
    case 1:
      return S.Union([
        /*@__PURE__*/ S.Struct({ DICOMPatientId: SensitiveString }),
        /*@__PURE__*/ S.Struct({ DICOMAccessionNumber: SensitiveString }),
        /*@__PURE__*/ S.Struct({ DICOMStudyId: SensitiveString }),
        /*@__PURE__*/ S.Struct({ DICOMStudyInstanceUID: SensitiveString }),
        /*@__PURE__*/ S.Struct({ DICOMSeriesInstanceUID: SensitiveString }),
        /*@__PURE__*/ S.Struct({
          createdAt: /*@__PURE__*/ S.Date.pipe(/*@__PURE__*/ T.TimestampFormat("epoch-seconds")),
        }),
        /*@__PURE__*/ S.Struct({
          updatedAt: /*@__PURE__*/ S.Date.pipe(/*@__PURE__*/ T.TimestampFormat("epoch-seconds")),
        }),
        /*@__PURE__*/ S.Struct({ DICOMStudyDateAndTime: __S(256, __c16, 0) }),
        /*@__PURE__*/ S.Struct({ isPrimary: S.Boolean }),
      ]);
    case 2:
      return S.Array(__S(257, __c16, 1));
    case 3:
      return S.suspend(() => S.Struct({ values: __S(258, __c16, 2), operator: S.String })).annotate(
        { identifier: "SearchFilter" },
      );
    case 4:
      return S.Array(__S(259, __c16, 3));
    case 5:
      return S.suspend(() => S.Struct({ sortOrder: S.String, sortField: S.String })).annotate({
        identifier: "Sort",
      });
    case 6:
      return S.suspend(() =>
        S.Struct({ filters: S.optional(__S(260, __c16, 4)), sort: S.optional(__S(261, __c16, 5)) }),
      ).annotate({ identifier: "SearchCriteria" });
    case 7:
      return S.suspend(() =>
        S.Struct({
          datastoreId: S.String.pipe(T.HttpLabel("datastoreId")),
          searchCriteria: S.optional(__S(262, __c16, 6))
            .pipe(T.HttpPayload())
            .annotate({ identifier: "SearchCriteria" }),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/datastore/{datastoreId}/searchImageSets" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "SearchImageSetsRequest" });
    case 8:
      return S.suspend(() =>
        S.Struct({
          DICOMPatientId: S.optional(SensitiveString),
          DICOMPatientName: S.optional(SensitiveString),
          DICOMPatientBirthDate: S.optional(SensitiveString),
          DICOMPatientSex: S.optional(SensitiveString),
          DICOMStudyInstanceUID: S.optional(SensitiveString),
          DICOMStudyId: S.optional(SensitiveString),
          DICOMStudyDescription: S.optional(SensitiveString),
          DICOMNumberOfStudyRelatedSeries: S.optional(S.Number),
          DICOMNumberOfStudyRelatedInstances: S.optional(S.Number),
          DICOMAccessionNumber: S.optional(SensitiveString),
          DICOMSeriesInstanceUID: S.optional(SensitiveString),
          DICOMSeriesModality: S.optional(SensitiveString),
          DICOMSeriesBodyPart: S.optional(SensitiveString),
          DICOMSeriesNumber: S.optional(S.Number),
          DICOMStudyDate: S.optional(SensitiveString),
          DICOMStudyTime: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "DICOMTags" });
    case 9:
      return S.suspend(() =>
        S.Struct({
          imageSetId: S.String,
          version: S.optional(S.Number),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastAccessedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          storageTier: S.optional(S.String),
          DICOMTags: S.optional(__S(264, __c16, 8)),
          isPrimary: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "ImageSetsMetadataSummary" });
    case 10:
      return S.Array(__S(265, __c16, 9));
    case 11:
      return S.suspend(() =>
        S.Struct({
          imageSetsMetadataSummaries: __S(266, __c16, 10),
          sort: S.optional(__S(261, __c16, 5)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "SearchImageSetsResponse" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          jobName: S.optional(S.String),
          dataAccessRoleArn: S.String,
          clientToken: S.String.pipe(T.IdempotencyToken()),
          datastoreId: S.String.pipe(T.HttpLabel("datastoreId")),
          inputS3Uri: S.String,
          outputS3Uri: S.String,
          inputOwnerAccountId: S.optional(S.String),
          importConfiguration: S.optional(__S(115, __c7, 3)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/startDICOMImportJob/datastore/{datastoreId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartDICOMImportJobRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          datastoreId: S.String,
          jobId: S.String,
          jobStatus: S.String,
          submittedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "StartDICOMImportJobResponse" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
          tags: __S(32, __c2, 0),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/tags/{resourceArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "TagResourceRequest" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "TagResourceResponse" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
    case 1:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
          tagKeys: __S(320, __c20, 0).pipe(T.HttpQuery("tagKeys")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/tags/{resourceArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UntagResourceRequest" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          removableAttributes: S.optional(SensitiveBlob),
          updatableAttributes: S.optional(SensitiveBlob),
        }),
      ).annotate({ identifier: "DICOMUpdates" });
    case 1:
      return S.Union([
        /*@__PURE__*/ S.Struct({ DICOMUpdates: __S(336, __c21, 0) }),
        /*@__PURE__*/ S.Struct({ revertToVersionId: S.String }),
      ]);
    case 2:
      return S.suspend(() =>
        S.Struct({
          datastoreId: S.String.pipe(T.HttpLabel("datastoreId")),
          imageSetId: S.String.pipe(T.HttpLabel("imageSetId")),
          latestVersionId: S.String.pipe(T.HttpQuery("latestVersion")),
          force: S.optional(S.Boolean).pipe(T.HttpQuery("force")),
          includeStudyImageSets: S.optional(S.Boolean).pipe(T.HttpQuery("includeStudyImageSets")),
          updateImageSetMetadataUpdates: __S(337, __c21, 1).pipe(T.HttpPayload()),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/datastore/{datastoreId}/imageSet/{imageSetId}/updateImageSetMetadata",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateImageSetMetadataRequest" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          datastoreId: S.String,
          imageSetId: S.String,
          latestVersionId: S.String,
          imageSetState: S.String,
          imageSetWorkflowStatus: S.optional(S.String),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          message: S.optional(S.String),
        }),
      ).annotate({ identifier: "UpdateImageSetMetadataResponse" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ copiableAttributes: SensitiveString })).annotate({
        identifier: "MetadataCopies",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({ latestVersionId: S.String, DICOMCopies: S.optional(__S(352, __c22, 0)) }),
      ).annotate({ identifier: "CopySourceImageSetInformation" });
    case 2:
      return S.suspend(() =>
        S.Struct({ imageSetId: S.String, latestVersionId: S.String }),
      ).annotate({ identifier: "CopyDestinationImageSet" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          sourceImageSet: __S(353, __c22, 1),
          destinationImageSet: S.optional(__S(354, __c22, 2)),
        }),
      ).annotate({ identifier: "CopyImageSetInformation" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          datastoreId: S.String.pipe(T.HttpLabel("datastoreId")),
          sourceImageSetId: S.String.pipe(T.HttpLabel("sourceImageSetId")),
          copyImageSetInformation: __S(355, __c22, 3)
            .pipe(T.HttpPayload())
            .annotate({ identifier: "CopyImageSetInformation" }),
          force: S.optional(S.Boolean).pipe(T.HttpQuery("force")),
          promoteToPrimary: S.optional(S.Boolean).pipe(T.HttpQuery("promoteToPrimary")),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/datastore/{datastoreId}/imageSet/{sourceImageSetId}/copyImageSet",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CopyImageSetRequest" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          imageSetId: S.String,
          latestVersionId: S.String,
          imageSetState: S.optional(S.String),
          imageSetWorkflowStatus: S.optional(S.String),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          imageSetArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "CopySourceImageSetProperties" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          datastoreId: S.String,
          sourceImageSetProperties: __S(357, __c22, 5),
          destinationImageSetProperties: __S(357, __c22, 5),
        }),
      ).annotate({ identifier: "CopyImageSetResponse" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
