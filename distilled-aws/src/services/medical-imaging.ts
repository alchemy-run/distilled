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
  sdkId: "Medical Imaging",
  serviceShapeName: "AHIGatewayService",
});
const auth = T.AwsAuthSigv4({ name: "medical-imaging" });
const ver = T.ServiceVersion("2023-07-19");
const proto = T.AwsProtocolsRestJson1();
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
});

//# Newtypes
export type DatastoreId = string;
export type ImageSetId = string;
export type ImageSetExternalVersionId = string;
export type CopiableAttributes = string | redacted.Redacted<string>;
export type Arn = string;
export type JobId = string;
export type JobName = string;
export type RoleArn = string;
export type S3Uri = string;
export type Message = string;
export type ImageFrameId = string;
export type NextToken = string;
export type TagKey = string;
export type TagValue = string;
export type DICOMPatientId = string | redacted.Redacted<string>;
export type DICOMAccessionNumber = string | redacted.Redacted<string>;
export type DICOMStudyId = string | redacted.Redacted<string>;
export type DICOMStudyInstanceUID = string | redacted.Redacted<string>;
export type DICOMSeriesInstanceUID = string | redacted.Redacted<string>;
export type DICOMStudyDate = string | redacted.Redacted<string>;
export type DICOMStudyTime = string | redacted.Redacted<string>;
export type DICOMPatientName = string | redacted.Redacted<string>;
export type DICOMPatientBirthDate = string | redacted.Redacted<string>;
export type DICOMPatientSex = string | redacted.Redacted<string>;
export type DICOMStudyDescription = string | redacted.Redacted<string>;
export type DICOMNumberOfStudyRelatedSeries = number;
export type DICOMNumberOfStudyRelatedInstances = number;
export type DICOMSeriesModality = string | redacted.Redacted<string>;
export type DICOMSeriesBodyPart = string | redacted.Redacted<string>;
export type DICOMSeriesNumber = number;
export type ClientToken = string;
export type AwsAccountId = string;
export type DICOMAttribute = Uint8Array | redacted.Redacted<Uint8Array>;
export type DatastoreName = string;
export type KmsKeyArn = string;
export type LambdaArn = string;

//# Schemas
export interface MetadataCopies {
  copiableAttributes: string | redacted.Redacted<string>;
}
export const MetadataCopies = S.suspend(() =>
  S.Struct({ copiableAttributes: SensitiveString }),
).annotate({ identifier: "MetadataCopies" }) as any as S.Schema<MetadataCopies>;
export interface CopySourceImageSetInformation {
  latestVersionId: string;
  DICOMCopies?: MetadataCopies;
}
export const CopySourceImageSetInformation = S.suspend(() =>
  S.Struct({
    latestVersionId: S.String,
    DICOMCopies: S.optional(MetadataCopies),
  }),
).annotate({
  identifier: "CopySourceImageSetInformation",
}) as any as S.Schema<CopySourceImageSetInformation>;
export interface CopyDestinationImageSet {
  imageSetId: string;
  latestVersionId: string;
}
export const CopyDestinationImageSet = S.suspend(() =>
  S.Struct({ imageSetId: S.String, latestVersionId: S.String }),
).annotate({
  identifier: "CopyDestinationImageSet",
}) as any as S.Schema<CopyDestinationImageSet>;
export interface CopyImageSetInformation {
  sourceImageSet: CopySourceImageSetInformation;
  destinationImageSet?: CopyDestinationImageSet;
}
export const CopyImageSetInformation = S.suspend(() =>
  S.Struct({
    sourceImageSet: CopySourceImageSetInformation,
    destinationImageSet: S.optional(CopyDestinationImageSet),
  }),
).annotate({
  identifier: "CopyImageSetInformation",
}) as any as S.Schema<CopyImageSetInformation>;
export interface CopyImageSetRequest {
  datastoreId: string;
  sourceImageSetId: string;
  copyImageSetInformation: CopyImageSetInformation;
  force?: boolean;
  promoteToPrimary?: boolean;
}
export const CopyImageSetRequest = S.suspend(() =>
  S.Struct({
    datastoreId: S.String.pipe(T.HttpLabel("datastoreId")),
    sourceImageSetId: S.String.pipe(T.HttpLabel("sourceImageSetId")),
    copyImageSetInformation: CopyImageSetInformation.pipe(
      T.HttpPayload(),
    ).annotate({ identifier: "CopyImageSetInformation" }),
    force: S.optional(S.Boolean).pipe(T.HttpQuery("force")),
    promoteToPrimary: S.optional(S.Boolean).pipe(
      T.HttpQuery("promoteToPrimary"),
    ),
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
).annotate({
  identifier: "CopyImageSetRequest",
}) as any as S.Schema<CopyImageSetRequest>;
export type ImageSetState = "ACTIVE" | "LOCKED" | "DELETED" | (string & {});
export const ImageSetState = S.String;
export type ImageSetWorkflowStatus =
  | "CREATED"
  | "COPIED"
  | "COPYING"
  | "COPYING_WITH_READ_ONLY_ACCESS"
  | "COPY_FAILED"
  | "UPDATING"
  | "UPDATED"
  | "UPDATE_FAILED"
  | "DELETING"
  | "DELETED"
  | "IMPORTING"
  | "IMPORTED"
  | "IMPORT_FAILED"
  | (string & {});
export const ImageSetWorkflowStatus = S.String;
export interface CopySourceImageSetProperties {
  imageSetId: string;
  latestVersionId: string;
  imageSetState?: ImageSetState;
  imageSetWorkflowStatus?: ImageSetWorkflowStatus;
  createdAt?: Date;
  updatedAt?: Date;
  imageSetArn?: string;
}
export const CopySourceImageSetProperties = S.suspend(() =>
  S.Struct({
    imageSetId: S.String,
    latestVersionId: S.String,
    imageSetState: S.optional(ImageSetState),
    imageSetWorkflowStatus: S.optional(ImageSetWorkflowStatus),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    imageSetArn: S.optional(S.String),
  }),
).annotate({
  identifier: "CopySourceImageSetProperties",
}) as any as S.Schema<CopySourceImageSetProperties>;
export interface CopyDestinationImageSetProperties {
  imageSetId: string;
  latestVersionId: string;
  imageSetState?: ImageSetState;
  imageSetWorkflowStatus?: ImageSetWorkflowStatus;
  createdAt?: Date;
  updatedAt?: Date;
  imageSetArn?: string;
}
export const CopyDestinationImageSetProperties = S.suspend(() =>
  S.Struct({
    imageSetId: S.String,
    latestVersionId: S.String,
    imageSetState: S.optional(ImageSetState),
    imageSetWorkflowStatus: S.optional(ImageSetWorkflowStatus),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    imageSetArn: S.optional(S.String),
  }),
).annotate({
  identifier: "CopyDestinationImageSetProperties",
}) as any as S.Schema<CopyDestinationImageSetProperties>;
export interface CopyImageSetResponse {
  datastoreId: string;
  sourceImageSetProperties: CopySourceImageSetProperties;
  destinationImageSetProperties: CopyDestinationImageSetProperties;
}
export const CopyImageSetResponse = S.suspend(() =>
  S.Struct({
    datastoreId: S.String,
    sourceImageSetProperties: CopySourceImageSetProperties,
    destinationImageSetProperties: CopyDestinationImageSetProperties,
  }),
).annotate({
  identifier: "CopyImageSetResponse",
}) as any as S.Schema<CopyImageSetResponse>;
export interface DeleteImageSetRequest {
  datastoreId: string;
  imageSetId: string;
}
export const DeleteImageSetRequest = S.suspend(() =>
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
).annotate({
  identifier: "DeleteImageSetRequest",
}) as any as S.Schema<DeleteImageSetRequest>;
export interface DeleteImageSetResponse {
  datastoreId: string;
  imageSetId: string;
  imageSetState: ImageSetState;
  imageSetWorkflowStatus: ImageSetWorkflowStatus;
}
export const DeleteImageSetResponse = S.suspend(() =>
  S.Struct({
    datastoreId: S.String,
    imageSetId: S.String,
    imageSetState: ImageSetState,
    imageSetWorkflowStatus: ImageSetWorkflowStatus,
  }),
).annotate({
  identifier: "DeleteImageSetResponse",
}) as any as S.Schema<DeleteImageSetResponse>;
export interface GetDICOMImportJobRequest {
  datastoreId: string;
  jobId: string;
}
export const GetDICOMImportJobRequest = S.suspend(() =>
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
).annotate({
  identifier: "GetDICOMImportJobRequest",
}) as any as S.Schema<GetDICOMImportJobRequest>;
export type JobStatus =
  | "SUBMITTED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "FAILED"
  | (string & {});
export const JobStatus = S.String;
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
}
export const DICOMImportJobProperties = S.suspend(() =>
  S.Struct({
    jobId: S.String,
    jobName: S.String,
    jobStatus: JobStatus,
    datastoreId: S.String,
    dataAccessRoleArn: S.String,
    endedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    submittedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    inputS3Uri: S.String,
    outputS3Uri: S.String,
    message: S.optional(S.String),
  }),
).annotate({
  identifier: "DICOMImportJobProperties",
}) as any as S.Schema<DICOMImportJobProperties>;
export interface GetDICOMImportJobResponse {
  jobProperties: DICOMImportJobProperties;
}
export const GetDICOMImportJobResponse = S.suspend(() =>
  S.Struct({ jobProperties: DICOMImportJobProperties }),
).annotate({
  identifier: "GetDICOMImportJobResponse",
}) as any as S.Schema<GetDICOMImportJobResponse>;
export interface ImageFrameInformation {
  imageFrameId: string;
}
export const ImageFrameInformation = S.suspend(() =>
  S.Struct({ imageFrameId: S.String }),
).annotate({
  identifier: "ImageFrameInformation",
}) as any as S.Schema<ImageFrameInformation>;
export interface GetImageFrameRequest {
  datastoreId: string;
  imageSetId: string;
  imageFrameInformation: ImageFrameInformation;
}
export const GetImageFrameRequest = S.suspend(() =>
  S.Struct({
    datastoreId: S.String.pipe(T.HttpLabel("datastoreId")),
    imageSetId: S.String.pipe(T.HttpLabel("imageSetId")),
    imageFrameInformation: ImageFrameInformation.pipe(T.HttpPayload()).annotate(
      { identifier: "ImageFrameInformation" },
    ),
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
).annotate({
  identifier: "GetImageFrameRequest",
}) as any as S.Schema<GetImageFrameRequest>;
export interface GetImageFrameResponse {
  imageFrameBlob: T.StreamingOutputBody;
  contentType?: string;
}
export const GetImageFrameResponse = S.suspend(() =>
  S.Struct({
    imageFrameBlob: T.StreamingOutput.pipe(T.HttpPayload()),
    contentType: S.optional(S.String).pipe(T.HttpHeader("Content-Type")),
  }),
).annotate({
  identifier: "GetImageFrameResponse",
}) as any as S.Schema<GetImageFrameResponse>;
export interface GetImageSetRequest {
  datastoreId: string;
  imageSetId: string;
  versionId?: string;
}
export const GetImageSetRequest = S.suspend(() =>
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
).annotate({
  identifier: "GetImageSetRequest",
}) as any as S.Schema<GetImageSetRequest>;
export interface Overrides {
  forced?: boolean;
}
export const Overrides = S.suspend(() =>
  S.Struct({ forced: S.optional(S.Boolean) }),
).annotate({ identifier: "Overrides" }) as any as S.Schema<Overrides>;
export type StorageTier =
  | "FREQUENT_ACCESS"
  | "ARCHIVE_INSTANT_ACCESS"
  | (string & {});
export const StorageTier = S.String;
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
export const GetImageSetResponse = S.suspend(() =>
  S.Struct({
    datastoreId: S.String,
    imageSetId: S.String,
    versionId: S.String,
    imageSetState: ImageSetState,
    imageSetWorkflowStatus: S.optional(ImageSetWorkflowStatus),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    deletedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    message: S.optional(S.String),
    imageSetArn: S.optional(S.String),
    overrides: S.optional(Overrides),
    isPrimary: S.optional(S.Boolean),
    lastAccessedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    storageTier: S.optional(StorageTier),
  }),
).annotate({
  identifier: "GetImageSetResponse",
}) as any as S.Schema<GetImageSetResponse>;
export interface GetImageSetMetadataRequest {
  datastoreId: string;
  imageSetId: string;
  versionId?: string;
}
export const GetImageSetMetadataRequest = S.suspend(() =>
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
).annotate({
  identifier: "GetImageSetMetadataRequest",
}) as any as S.Schema<GetImageSetMetadataRequest>;
export interface GetImageSetMetadataResponse {
  imageSetMetadataBlob: T.StreamingOutputBody;
  contentType?: string;
  contentEncoding?: string;
}
export const GetImageSetMetadataResponse = S.suspend(() =>
  S.Struct({
    imageSetMetadataBlob: T.StreamingOutput.pipe(T.HttpPayload()),
    contentType: S.optional(S.String).pipe(T.HttpHeader("Content-Type")),
    contentEncoding: S.optional(S.String).pipe(
      T.HttpHeader("Content-Encoding"),
    ),
  }),
).annotate({
  identifier: "GetImageSetMetadataResponse",
}) as any as S.Schema<GetImageSetMetadataResponse>;
export interface ListDICOMImportJobsRequest {
  datastoreId: string;
  jobStatus?: JobStatus;
  nextToken?: string;
  maxResults?: number;
}
export const ListDICOMImportJobsRequest = S.suspend(() =>
  S.Struct({
    datastoreId: S.String.pipe(T.HttpLabel("datastoreId")),
    jobStatus: S.optional(JobStatus).pipe(T.HttpQuery("jobStatus")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/listDICOMImportJobs/datastore/{datastoreId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListDICOMImportJobsRequest",
}) as any as S.Schema<ListDICOMImportJobsRequest>;
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
export const DICOMImportJobSummary = S.suspend(() =>
  S.Struct({
    jobId: S.String,
    jobName: S.String,
    jobStatus: JobStatus,
    datastoreId: S.String,
    dataAccessRoleArn: S.optional(S.String),
    endedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    submittedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    message: S.optional(S.String),
  }),
).annotate({
  identifier: "DICOMImportJobSummary",
}) as any as S.Schema<DICOMImportJobSummary>;
export type DICOMImportJobSummaries = DICOMImportJobSummary[];
export const DICOMImportJobSummaries = S.Array(DICOMImportJobSummary);
export interface ListDICOMImportJobsResponse {
  jobSummaries: DICOMImportJobSummary[];
  nextToken?: string;
}
export const ListDICOMImportJobsResponse = S.suspend(() =>
  S.Struct({
    jobSummaries: DICOMImportJobSummaries,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListDICOMImportJobsResponse",
}) as any as S.Schema<ListDICOMImportJobsResponse>;
export interface ListImageSetVersionsRequest {
  datastoreId: string;
  imageSetId: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListImageSetVersionsRequest = S.suspend(() =>
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
).annotate({
  identifier: "ListImageSetVersionsRequest",
}) as any as S.Schema<ListImageSetVersionsRequest>;
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
export const ImageSetProperties = S.suspend(() =>
  S.Struct({
    imageSetId: S.String,
    versionId: S.String,
    imageSetState: ImageSetState,
    ImageSetWorkflowStatus: S.optional(ImageSetWorkflowStatus),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    deletedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    message: S.optional(S.String),
    overrides: S.optional(Overrides),
    isPrimary: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "ImageSetProperties",
}) as any as S.Schema<ImageSetProperties>;
export type ImageSetPropertiesList = ImageSetProperties[];
export const ImageSetPropertiesList = S.Array(ImageSetProperties);
export interface ListImageSetVersionsResponse {
  imageSetPropertiesList: ImageSetProperties[];
  nextToken?: string;
}
export const ListImageSetVersionsResponse = S.suspend(() =>
  S.Struct({
    imageSetPropertiesList: ImageSetPropertiesList,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListImageSetVersionsResponse",
}) as any as S.Schema<ListImageSetVersionsResponse>;
export interface ListTagsForResourceRequest {
  resourceArn: string;
}
export const ListTagsForResourceRequest = S.suspend(() =>
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
).annotate({
  identifier: "ListTagsForResourceRequest",
}) as any as S.Schema<ListTagsForResourceRequest>;
export type TagMap = { [key: string]: string | undefined };
export const TagMap = S.Record(S.String, S.String.pipe(S.optional));
export interface ListTagsForResourceResponse {
  tags: { [key: string]: string | undefined };
}
export const ListTagsForResourceResponse = S.suspend(() =>
  S.Struct({ tags: TagMap }),
).annotate({
  identifier: "ListTagsForResourceResponse",
}) as any as S.Schema<ListTagsForResourceResponse>;
export interface DICOMStudyDateAndTime {
  DICOMStudyDate: string | redacted.Redacted<string>;
  DICOMStudyTime?: string | redacted.Redacted<string>;
}
export const DICOMStudyDateAndTime = S.suspend(() =>
  S.Struct({
    DICOMStudyDate: SensitiveString,
    DICOMStudyTime: S.optional(SensitiveString),
  }),
).annotate({
  identifier: "DICOMStudyDateAndTime",
}) as any as S.Schema<DICOMStudyDateAndTime>;
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
export const SearchByAttributeValue = S.Union([
  S.Struct({ DICOMPatientId: SensitiveString }),
  S.Struct({ DICOMAccessionNumber: SensitiveString }),
  S.Struct({ DICOMStudyId: SensitiveString }),
  S.Struct({ DICOMStudyInstanceUID: SensitiveString }),
  S.Struct({ DICOMSeriesInstanceUID: SensitiveString }),
  S.Struct({ createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")) }),
  S.Struct({ updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")) }),
  S.Struct({ DICOMStudyDateAndTime: DICOMStudyDateAndTime }),
  S.Struct({ isPrimary: S.Boolean }),
]);
export type SearchByAttributeValues = SearchByAttributeValue[];
export const SearchByAttributeValues = S.Array(SearchByAttributeValue);
export type Operator = "EQUAL" | "BETWEEN" | (string & {});
export const Operator = S.String;
export interface SearchFilter {
  values: SearchByAttributeValue[];
  operator: Operator;
}
export const SearchFilter = S.suspend(() =>
  S.Struct({ values: SearchByAttributeValues, operator: Operator }),
).annotate({ identifier: "SearchFilter" }) as any as S.Schema<SearchFilter>;
export type SearchFilters = SearchFilter[];
export const SearchFilters = S.Array(SearchFilter);
export type SortOrder = "ASC" | "DESC" | (string & {});
export const SortOrder = S.String;
export type SortField =
  | "updatedAt"
  | "createdAt"
  | "DICOMStudyDateAndTime"
  | (string & {});
export const SortField = S.String;
export interface Sort {
  sortOrder: SortOrder;
  sortField: SortField;
}
export const Sort = S.suspend(() =>
  S.Struct({ sortOrder: SortOrder, sortField: SortField }),
).annotate({ identifier: "Sort" }) as any as S.Schema<Sort>;
export interface SearchCriteria {
  filters?: SearchFilter[];
  sort?: Sort;
}
export const SearchCriteria = S.suspend(() =>
  S.Struct({ filters: S.optional(SearchFilters), sort: S.optional(Sort) }),
).annotate({ identifier: "SearchCriteria" }) as any as S.Schema<SearchCriteria>;
export interface SearchImageSetsRequest {
  datastoreId: string;
  searchCriteria?: SearchCriteria;
  maxResults?: number;
  nextToken?: string;
}
export const SearchImageSetsRequest = S.suspend(() =>
  S.Struct({
    datastoreId: S.String.pipe(T.HttpLabel("datastoreId")),
    searchCriteria: S.optional(SearchCriteria)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "SearchCriteria" }),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/datastore/{datastoreId}/searchImageSets",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "SearchImageSetsRequest",
}) as any as S.Schema<SearchImageSetsRequest>;
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
export const DICOMTags = S.suspend(() =>
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
).annotate({ identifier: "DICOMTags" }) as any as S.Schema<DICOMTags>;
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
export const ImageSetsMetadataSummary = S.suspend(() =>
  S.Struct({
    imageSetId: S.String,
    version: S.optional(S.Number),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    lastAccessedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    storageTier: S.optional(StorageTier),
    DICOMTags: S.optional(DICOMTags),
    isPrimary: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "ImageSetsMetadataSummary",
}) as any as S.Schema<ImageSetsMetadataSummary>;
export type ImageSetsMetadataSummaries = ImageSetsMetadataSummary[];
export const ImageSetsMetadataSummaries = S.Array(ImageSetsMetadataSummary);
export interface SearchImageSetsResponse {
  imageSetsMetadataSummaries: ImageSetsMetadataSummary[];
  sort?: Sort;
  nextToken?: string;
}
export const SearchImageSetsResponse = S.suspend(() =>
  S.Struct({
    imageSetsMetadataSummaries: ImageSetsMetadataSummaries,
    sort: S.optional(Sort),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "SearchImageSetsResponse",
}) as any as S.Schema<SearchImageSetsResponse>;
export interface StartDICOMImportJobRequest {
  jobName?: string;
  dataAccessRoleArn: string;
  clientToken: string;
  datastoreId: string;
  inputS3Uri: string;
  outputS3Uri: string;
  inputOwnerAccountId?: string;
}
export const StartDICOMImportJobRequest = S.suspend(() =>
  S.Struct({
    jobName: S.optional(S.String),
    dataAccessRoleArn: S.String,
    clientToken: S.String.pipe(T.IdempotencyToken()),
    datastoreId: S.String.pipe(T.HttpLabel("datastoreId")),
    inputS3Uri: S.String,
    outputS3Uri: S.String,
    inputOwnerAccountId: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/startDICOMImportJob/datastore/{datastoreId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartDICOMImportJobRequest",
}) as any as S.Schema<StartDICOMImportJobRequest>;
export interface StartDICOMImportJobResponse {
  datastoreId: string;
  jobId: string;
  jobStatus: JobStatus;
  submittedAt: Date;
}
export const StartDICOMImportJobResponse = S.suspend(() =>
  S.Struct({
    datastoreId: S.String,
    jobId: S.String,
    jobStatus: JobStatus,
    submittedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({
  identifier: "StartDICOMImportJobResponse",
}) as any as S.Schema<StartDICOMImportJobResponse>;
export interface TagResourceRequest {
  resourceArn: string;
  tags: { [key: string]: string | undefined };
}
export const TagResourceRequest = S.suspend(() =>
  S.Struct({
    resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
    tags: TagMap,
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
  resourceArn: string;
  tagKeys: string[];
}
export const UntagResourceRequest = S.suspend(() =>
  S.Struct({
    resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
    tagKeys: TagKeyList.pipe(T.HttpQuery("tagKeys")),
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
).annotate({
  identifier: "UntagResourceRequest",
}) as any as S.Schema<UntagResourceRequest>;
export interface UntagResourceResponse {}
export const UntagResourceResponse = S.suspend(() => S.Struct({})).annotate({
  identifier: "UntagResourceResponse",
}) as any as S.Schema<UntagResourceResponse>;
export interface DICOMUpdates {
  removableAttributes?: Uint8Array | redacted.Redacted<Uint8Array>;
  updatableAttributes?: Uint8Array | redacted.Redacted<Uint8Array>;
}
export const DICOMUpdates = S.suspend(() =>
  S.Struct({
    removableAttributes: S.optional(SensitiveBlob),
    updatableAttributes: S.optional(SensitiveBlob),
  }),
).annotate({ identifier: "DICOMUpdates" }) as any as S.Schema<DICOMUpdates>;
export type MetadataUpdates =
  | { DICOMUpdates: DICOMUpdates; revertToVersionId?: never }
  | { DICOMUpdates?: never; revertToVersionId: string };
export const MetadataUpdates = S.Union([
  S.Struct({ DICOMUpdates: DICOMUpdates }),
  S.Struct({ revertToVersionId: S.String }),
]);
export interface UpdateImageSetMetadataRequest {
  datastoreId: string;
  imageSetId: string;
  latestVersionId: string;
  force?: boolean;
  updateImageSetMetadataUpdates: MetadataUpdates;
}
export const UpdateImageSetMetadataRequest = S.suspend(() =>
  S.Struct({
    datastoreId: S.String.pipe(T.HttpLabel("datastoreId")),
    imageSetId: S.String.pipe(T.HttpLabel("imageSetId")),
    latestVersionId: S.String.pipe(T.HttpQuery("latestVersion")),
    force: S.optional(S.Boolean).pipe(T.HttpQuery("force")),
    updateImageSetMetadataUpdates: MetadataUpdates.pipe(T.HttpPayload()),
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
).annotate({
  identifier: "UpdateImageSetMetadataRequest",
}) as any as S.Schema<UpdateImageSetMetadataRequest>;
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
export const UpdateImageSetMetadataResponse = S.suspend(() =>
  S.Struct({
    datastoreId: S.String,
    imageSetId: S.String,
    latestVersionId: S.String,
    imageSetState: ImageSetState,
    imageSetWorkflowStatus: S.optional(ImageSetWorkflowStatus),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    message: S.optional(S.String),
  }),
).annotate({
  identifier: "UpdateImageSetMetadataResponse",
}) as any as S.Schema<UpdateImageSetMetadataResponse>;
export type LosslessStorageFormat =
  | "HTJ2K"
  | "JPEG_2000_LOSSLESS"
  | (string & {});
export const LosslessStorageFormat = S.String;
export interface CreateDatastoreRequest {
  datastoreName?: string;
  clientToken: string;
  tags?: { [key: string]: string | undefined };
  kmsKeyArn?: string;
  lambdaAuthorizerArn?: string;
  losslessStorageFormat?: LosslessStorageFormat;
}
export const CreateDatastoreRequest = S.suspend(() =>
  S.Struct({
    datastoreName: S.optional(S.String),
    clientToken: S.String.pipe(T.IdempotencyToken()),
    tags: S.optional(TagMap),
    kmsKeyArn: S.optional(S.String),
    lambdaAuthorizerArn: S.optional(S.String),
    losslessStorageFormat: S.optional(LosslessStorageFormat),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/datastore" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateDatastoreRequest",
}) as any as S.Schema<CreateDatastoreRequest>;
export type DatastoreStatus =
  | "CREATING"
  | "CREATE_FAILED"
  | "ACTIVE"
  | "DELETING"
  | "DELETED"
  | (string & {});
export const DatastoreStatus = S.String;
export interface CreateDatastoreResponse {
  datastoreId: string;
  datastoreStatus: DatastoreStatus;
}
export const CreateDatastoreResponse = S.suspend(() =>
  S.Struct({ datastoreId: S.String, datastoreStatus: DatastoreStatus }),
).annotate({
  identifier: "CreateDatastoreResponse",
}) as any as S.Schema<CreateDatastoreResponse>;
export interface GetDatastoreRequest {
  datastoreId: string;
}
export const GetDatastoreRequest = S.suspend(() =>
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
).annotate({
  identifier: "GetDatastoreRequest",
}) as any as S.Schema<GetDatastoreRequest>;
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
export const DatastoreProperties = S.suspend(() =>
  S.Struct({
    datastoreId: S.String,
    datastoreName: S.String,
    datastoreStatus: DatastoreStatus,
    kmsKeyArn: S.optional(S.String),
    lambdaAuthorizerArn: S.optional(S.String),
    losslessStorageFormat: S.optional(LosslessStorageFormat),
    datastoreArn: S.optional(S.String),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "DatastoreProperties",
}) as any as S.Schema<DatastoreProperties>;
export interface GetDatastoreResponse {
  datastoreProperties: DatastoreProperties;
}
export const GetDatastoreResponse = S.suspend(() =>
  S.Struct({ datastoreProperties: DatastoreProperties }),
).annotate({
  identifier: "GetDatastoreResponse",
}) as any as S.Schema<GetDatastoreResponse>;
export interface DeleteDatastoreRequest {
  datastoreId: string;
}
export const DeleteDatastoreRequest = S.suspend(() =>
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
).annotate({
  identifier: "DeleteDatastoreRequest",
}) as any as S.Schema<DeleteDatastoreRequest>;
export interface DeleteDatastoreResponse {
  datastoreId: string;
  datastoreStatus: DatastoreStatus;
}
export const DeleteDatastoreResponse = S.suspend(() =>
  S.Struct({ datastoreId: S.String, datastoreStatus: DatastoreStatus }),
).annotate({
  identifier: "DeleteDatastoreResponse",
}) as any as S.Schema<DeleteDatastoreResponse>;
export interface ListDatastoresRequest {
  datastoreStatus?: DatastoreStatus;
  nextToken?: string;
  maxResults?: number;
}
export const ListDatastoresRequest = S.suspend(() =>
  S.Struct({
    datastoreStatus: S.optional(DatastoreStatus).pipe(
      T.HttpQuery("datastoreStatus"),
    ),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/datastore" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListDatastoresRequest",
}) as any as S.Schema<ListDatastoresRequest>;
export interface DatastoreSummary {
  datastoreId: string;
  datastoreName: string;
  datastoreStatus: DatastoreStatus;
  datastoreArn?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export const DatastoreSummary = S.suspend(() =>
  S.Struct({
    datastoreId: S.String,
    datastoreName: S.String,
    datastoreStatus: DatastoreStatus,
    datastoreArn: S.optional(S.String),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "DatastoreSummary",
}) as any as S.Schema<DatastoreSummary>;
export type DatastoreSummaries = DatastoreSummary[];
export const DatastoreSummaries = S.Array(DatastoreSummary);
export interface ListDatastoresResponse {
  datastoreSummaries?: DatastoreSummary[];
  nextToken?: string;
}
export const ListDatastoresResponse = S.suspend(() =>
  S.Struct({
    datastoreSummaries: S.optional(DatastoreSummaries),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListDatastoresResponse",
}) as any as S.Schema<ListDatastoresResponse>;

//# Errors
export class AccessDeniedException extends S.TaggedErrorClass<AccessDeniedException>()(
  "AccessDeniedException",
  { message: S.String },
).pipe(C.withAuthError) {}
export class ConflictException extends S.TaggedErrorClass<ConflictException>()(
  "ConflictException",
  { message: S.String },
).pipe(C.withConflictError) {}
export class InternalServerException extends S.TaggedErrorClass<InternalServerException>()(
  "InternalServerException",
  { message: S.String },
).pipe(C.withServerError) {}
export class ResourceNotFoundException extends S.TaggedErrorClass<ResourceNotFoundException>()(
  "ResourceNotFoundException",
  { message: S.String },
).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException extends S.TaggedErrorClass<ServiceQuotaExceededException>()(
  "ServiceQuotaExceededException",
  { message: S.String },
).pipe(C.withQuotaError) {}
export class ThrottlingException extends S.TaggedErrorClass<ThrottlingException>()(
  "ThrottlingException",
  { message: S.String },
).pipe(C.withThrottlingError) {}
export class ValidationException extends S.TaggedErrorClass<ValidationException>()(
  "ValidationException",
  { message: S.String },
).pipe(C.withBadRequestError) {}

//# Operations
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CopyImageSetRequest,
  output: CopyImageSetResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteImageSetRequest,
  output: DeleteImageSetResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetDICOMImportJobRequest,
  output: GetDICOMImportJobResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
export type GetImageFrameError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetImageFrameRequest,
  output: GetImageFrameResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetImageSetRequest,
  output: GetImageSetResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetImageSetMetadataRequest,
  output: GetImageSetMetadataResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
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
export const listDICOMImportJobs: API.OperationMethod<
  ListDICOMImportJobsRequest,
  ListDICOMImportJobsResponse,
  ListDICOMImportJobsError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListDICOMImportJobsRequest,
  ) => stream.Stream<
    ListDICOMImportJobsResponse,
    ListDICOMImportJobsError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListDICOMImportJobsRequest,
  ) => stream.Stream<
    DICOMImportJobSummary,
    ListDICOMImportJobsError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListDICOMImportJobsRequest,
  output: ListDICOMImportJobsResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "jobSummaries",
    pageSize: "maxResults",
  } as const,
}));
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
export const listImageSetVersions: API.OperationMethod<
  ListImageSetVersionsRequest,
  ListImageSetVersionsResponse,
  ListImageSetVersionsError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListImageSetVersionsRequest,
  ) => stream.Stream<
    ListImageSetVersionsResponse,
    ListImageSetVersionsError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListImageSetVersionsRequest,
  ) => stream.Stream<
    ImageSetProperties,
    ListImageSetVersionsError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListImageSetVersionsRequest,
  output: ListImageSetVersionsResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "imageSetPropertiesList",
    pageSize: "maxResults",
  } as const,
}));
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ListTagsForResourceRequest,
  output: ListTagsForResourceResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
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
export const searchImageSets: API.OperationMethod<
  SearchImageSetsRequest,
  SearchImageSetsResponse,
  SearchImageSetsError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: SearchImageSetsRequest,
  ) => stream.Stream<
    SearchImageSetsResponse,
    SearchImageSetsError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: SearchImageSetsRequest,
  ) => stream.Stream<
    ImageSetsMetadataSummary,
    SearchImageSetsError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: SearchImageSetsRequest,
  output: SearchImageSetsResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "imageSetsMetadataSummaries",
    pageSize: "maxResults",
  } as const,
}));
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
 * Start importing bulk data into an `ACTIVE` data store. The import job imports DICOM P10 files found in the S3 prefix specified by the `inputS3Uri` parameter. The import job stores processing results in the file specified by the `outputS3Uri` parameter.
 */
export const startDICOMImportJob: API.OperationMethod<
  StartDICOMImportJobRequest,
  StartDICOMImportJobResponse,
  StartDICOMImportJobError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: StartDICOMImportJobRequest,
  output: StartDICOMImportJobResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: TagResourceRequest,
  output: TagResourceResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UntagResourceRequest,
  output: UntagResourceResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateImageSetMetadataRequest,
  output: UpdateImageSetMetadataResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateDatastoreRequest,
  output: CreateDatastoreResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetDatastoreRequest,
  output: GetDatastoreResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteDatastoreRequest,
  output: DeleteDatastoreResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
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
export const listDatastores: API.OperationMethod<
  ListDatastoresRequest,
  ListDatastoresResponse,
  ListDatastoresError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListDatastoresRequest,
  ) => stream.Stream<
    ListDatastoresResponse,
    ListDatastoresError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListDatastoresRequest,
  ) => stream.Stream<
    DatastoreSummary,
    ListDatastoresError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListDatastoresRequest,
  output: ListDatastoresResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "datastoreSummaries",
    pageSize: "maxResults",
  } as const,
}));
