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
  sdkId: "Medical Imaging",
  target: "AHIGatewayService",
  version: "2023-07-19",
  sigv4: "medical-imaging",
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
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://medical-imaging.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://medical-imaging.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
  })<{ readonly message: string }> {}
export class BadRequestException
  extends /*@__PURE__*/ TE.TaggedError(
    "BadRequestException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message: string }> {}
export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError("ConflictException", ["ConflictError"], {
    status: 409,
  })<{ readonly message: string }> {}
export class InternalServerException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerException",
    ["ServerError"],
    { status: 500 },
  )<{ readonly message: string }> {}
export class NotAcceptableException
  extends /*@__PURE__*/ TE.TaggedError(
    "NotAcceptableException",
    ["BadRequestError"],
    { status: 406 },
  )<{ readonly message: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message: string }> {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceQuotaExceededException",
    ["QuotaError"],
    { status: 402 },
  )<{ readonly message: string }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["ThrottlingError"],
    { status: 429 },
  )<{ readonly message: string }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message: string }> {}
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
export type LosslessStorageFormat =
  | "HTJ2K"
  | "JPEG_2000_LOSSLESS"
  | (string & {});
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
export type JobStatus =
  | "SUBMITTED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "FAILED"
  | (string & {});
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
export type StorageTier =
  | "FREQUENT_ACCESS"
  | "ARCHIVE_INSTANT_ACCESS"
  | (string & {});
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
export type SortField =
  | "updatedAt"
  | "createdAt"
  | "DICOMStudyDateAndTime"
  | (string & {});
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
  descriptor: {
    service: svc,
    http: "POST /datastore/{datastoreId}/imageSet/{sourceImageSetId}/copyImageSet",
    input: {
      datastoreId: 0,
      sourceImageSetId: 0,
      copyImageSetInformation: D.m({
        payload: true,
        shape: {
          sourceImageSet: {
            latestVersionId: 0,
            DICOMCopies: { copiableAttributes: 0 },
          },
          destinationImageSet: { imageSetId: 0, latestVersionId: 0 },
        },
      }),
      force: D.m({ query: "force" }),
      promoteToPrimary: D.m({ query: "promoteToPrimary" }),
    },
    output: {
      sourceImageSetProperties: { createdAt: D.ts, updatedAt: D.ts },
      destinationImageSetProperties: { createdAt: D.ts, updatedAt: D.ts },
    },
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
  operationName: "CopyImageSet",
  endpointHostPrefix: "runtime-",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /datastore",
    input: {
      datastoreName: 0,
      clientToken: D.m({ idempotency: true }),
      tags: 0,
      kmsKeyArn: 0,
      lambdaAuthorizerArn: 0,
      losslessStorageFormat: 0,
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
  operationName: "CreateDatastore",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /datastore/{datastoreId}",
    input: { datastoreId: 0 },
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
  operationName: "DeleteDatastore",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /datastore/{datastoreId}/imageSet/{imageSetId}/deleteImageSet",
    input: { datastoreId: 0, imageSetId: 0 },
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
  operationName: "DeleteImageSet",
  endpointHostPrefix: "runtime-",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /datastore/{datastoreId}",
    input: { datastoreId: 0 },
    output: { datastoreProperties: { createdAt: D.ts, updatedAt: D.ts } },
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
  operationName: "GetDatastore",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /getDICOMImportJob/datastore/{datastoreId}/job/{jobId}",
    input: { datastoreId: 0, jobId: 0 },
    output: {
      jobProperties: {
        endedAt: D.ts,
        submittedAt: D.ts,
        importConfiguration: {
          dicomJsonMetadataImportConfiguration: {
            dicomMetadataMappings: D.list({
              studyInstanceUID: D.secret,
              seriesInstanceUID: D.secret,
            }),
          },
        },
      },
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
  operationName: "GetDICOMImportJob",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /datastore/{datastoreId}/imageSet/{imageSetId}/getImageFrame",
    input: {
      datastoreId: 0,
      imageSetId: 0,
      imageFrameInformation: D.m({ payload: true, shape: { imageFrameId: 0 } }),
    },
    output: {
      imageFrameBlob: D.m({ payload: true, shape: D.stream }),
      contentType: D.m({ header: "Content-Type" }),
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /datastore/{datastoreId}/imageSet/{imageSetId}/getImageSet",
    input: {
      datastoreId: 0,
      imageSetId: 0,
      versionId: D.m({ query: "version" }),
    },
    output: {
      createdAt: D.ts,
      updatedAt: D.ts,
      deletedAt: D.ts,
      lastAccessedAt: D.ts,
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
  operationName: "GetImageSet",
  endpointHostPrefix: "runtime-",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /datastore/{datastoreId}/imageSet/{imageSetId}/getImageSetMetadata",
    input: {
      datastoreId: 0,
      imageSetId: 0,
      versionId: D.m({ query: "version" }),
    },
    output: {
      imageSetMetadataBlob: D.m({ payload: true, shape: D.stream }),
      contentType: D.m({ header: "Content-Type" }),
      contentEncoding: D.m({ header: "Content-Encoding" }),
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
  operationName: "GetImageSetMetadata",
  endpointHostPrefix: "runtime-",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /datastore",
    input: {
      datastoreStatus: D.m({ query: "datastoreStatus" }),
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: {
      datastoreSummaries: D.list({ createdAt: D.ts, updatedAt: D.ts }),
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
  descriptor: {
    service: svc,
    http: "GET /listDICOMImportJobs/datastore/{datastoreId}",
    input: {
      datastoreId: 0,
      jobStatus: D.m({ query: "jobStatus" }),
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: { jobSummaries: D.list({ endedAt: D.ts, submittedAt: D.ts }) },
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
  descriptor: {
    service: svc,
    http: "POST /datastore/{datastoreId}/imageSet/{imageSetId}/listImageSetVersions",
    input: {
      datastoreId: 0,
      imageSetId: 0,
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: {
      imageSetPropertiesList: D.list({
        createdAt: D.ts,
        updatedAt: D.ts,
        deletedAt: D.ts,
      }),
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
  descriptor: {
    service: svc,
    http: "GET /tags/{resourceArn}",
    input: { resourceArn: 0 },
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
  descriptor: {
    service: svc,
    http: "POST /datastore/{datastoreId}/searchImageSets",
    input: {
      datastoreId: 0,
      searchCriteria: D.m({
        payload: true,
        shape: {
          filters: D.list({
            values: D.list({
              DICOMPatientId: 0,
              DICOMAccessionNumber: 0,
              DICOMStudyId: 0,
              DICOMStudyInstanceUID: 0,
              DICOMSeriesInstanceUID: 0,
              createdAt: 0,
              updatedAt: 0,
              DICOMStudyDateAndTime: { DICOMStudyDate: 0, DICOMStudyTime: 0 },
              isPrimary: 0,
            }),
            operator: 0,
          }),
          sort: { sortOrder: 0, sortField: 0 },
        },
      }),
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
    output: {
      imageSetsMetadataSummaries: D.list({
        createdAt: D.ts,
        updatedAt: D.ts,
        lastAccessedAt: D.ts,
        DICOMTags: {
          DICOMPatientId: D.secret,
          DICOMPatientName: D.secret,
          DICOMPatientBirthDate: D.secret,
          DICOMPatientSex: D.secret,
          DICOMStudyInstanceUID: D.secret,
          DICOMStudyId: D.secret,
          DICOMStudyDescription: D.secret,
          DICOMAccessionNumber: D.secret,
          DICOMSeriesInstanceUID: D.secret,
          DICOMSeriesModality: D.secret,
          DICOMSeriesBodyPart: D.secret,
          DICOMStudyDate: D.secret,
          DICOMStudyTime: D.secret,
        },
      }),
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
  descriptor: {
    service: svc,
    http: "POST /startDICOMImportJob/datastore/{datastoreId}",
    input: {
      jobName: 0,
      dataAccessRoleArn: 0,
      clientToken: D.m({ idempotency: true }),
      datastoreId: 0,
      inputS3Uri: 0,
      outputS3Uri: 0,
      inputOwnerAccountId: 0,
      importConfiguration: {
        dicomJsonMetadataImportConfiguration: {
          dicomMetadataMappings: D.list({
            studyInstanceUID: 0,
            seriesInstanceUID: 0,
            metadataFilePath: 0,
          }),
        },
      },
    },
    output: { submittedAt: D.ts },
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
  operationName: "StartDICOMImportJob",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /tags/{resourceArn}",
    input: { resourceArn: 0, tags: 0 },
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
 * Removes tags from a medical imaging resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /tags/{resourceArn}",
    input: { resourceArn: 0, tagKeys: D.m({ query: "tagKeys" }) },
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
  descriptor: {
    service: svc,
    http: "POST /datastore/{datastoreId}/imageSet/{imageSetId}/updateImageSetMetadata",
    input: {
      datastoreId: 0,
      imageSetId: 0,
      latestVersionId: D.m({ query: "latestVersion" }),
      force: D.m({ query: "force" }),
      includeStudyImageSets: D.m({ query: "includeStudyImageSets" }),
      updateImageSetMetadataUpdates: D.m({
        payload: true,
        shape: {
          DICOMUpdates: { removableAttributes: 0, updatableAttributes: 0 },
          revertToVersionId: 0,
        },
      }),
    },
    output: { createdAt: D.ts, updatedAt: D.ts },
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
  operationName: "UpdateImageSetMetadata",
  endpointHostPrefix: "runtime-",
})) as any;
