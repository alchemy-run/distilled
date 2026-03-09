// ==========================================================================
// YouTube Reporting API (youtubereporting v1)
// DO NOT EDIT - Generated from GCP Discovery Document
// ==========================================================================

import * as Schema from "effect/Schema";
import * as API from "../client/api.ts";
import * as T from "../traits";
import type { Credentials } from "../credentials";
import type { DefaultErrors } from "../errors";
import type * as HttpClient from "effect/unstable/http/HttpClient";

// Service metadata
const svc = T.Service({
  name: "youtubereporting",
  version: "v1",
  rootUrl: "https://youtubereporting.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface Job {
  /** The date/time when this job will expire/expired. After a job expired, no new reports are generated. */
  expireTime?: string;
  /** True if this a system-managed job that cannot be modified by the user; otherwise false. */
  systemManaged?: boolean;
  /** The server-generated ID of the job (max. 40 characters). */
  id?: string;
  /** The name of the job (max. 100 characters). */
  name?: string;
  /** The creation date/time of the job. */
  createTime?: string;
  /** The type of reports this job creates. Corresponds to the ID of a ReportType. */
  reportTypeId?: string;
}

export const Job: Schema.Schema<Job> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      expireTime: Schema.optional(Schema.String),
      systemManaged: Schema.optional(Schema.Boolean),
      id: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
      createTime: Schema.optional(Schema.String),
      reportTypeId: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Job" }) as any as Schema.Schema<Job>;

export interface ListJobsResponse {
  /** A token to retrieve next page of results. Pass this value in the ListJobsRequest.page_token field in the subsequent call to `ListJobs` method to retrieve the next page of results. */
  nextPageToken?: string;
  /** The list of jobs. */
  jobs?: Array<Job>;
}

export const ListJobsResponse: Schema.Schema<ListJobsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      nextPageToken: Schema.optional(Schema.String),
      jobs: Schema.optional(Schema.Array(Job)),
    }),
  ).annotate({
    identifier: "ListJobsResponse",
  }) as any as Schema.Schema<ListJobsResponse>;

export interface Empty {}

export const Empty: Schema.Schema<Empty> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "Empty",
  }) as any as Schema.Schema<Empty>;

export interface GdataObjectId {
  /** gdata */
  generation?: string;
  /** gdata */
  bucketName?: string;
  /** gdata */
  objectName?: string;
}

export const GdataObjectId: Schema.Schema<GdataObjectId> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      generation: Schema.optional(Schema.String),
      bucketName: Schema.optional(Schema.String),
      objectName: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GdataObjectId",
  }) as any as Schema.Schema<GdataObjectId>;

export interface GdataBlobstore2Info {
  /** gdata */
  downloadReadHandle?: string;
  /** gdata */
  downloadExternalReadToken?: string;
  /** gdata */
  uploadFragmentListCreationInfo?: string;
  /** gdata */
  uploadMetadataContainer?: string;
  /** gdata */
  blobId?: string;
  /** gdata */
  readToken?: string;
  /** gdata */
  blobGeneration?: string;
}

export const GdataBlobstore2Info: Schema.Schema<GdataBlobstore2Info> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      downloadReadHandle: Schema.optional(Schema.String),
      downloadExternalReadToken: Schema.optional(Schema.String),
      uploadFragmentListCreationInfo: Schema.optional(Schema.String),
      uploadMetadataContainer: Schema.optional(Schema.String),
      blobId: Schema.optional(Schema.String),
      readToken: Schema.optional(Schema.String),
      blobGeneration: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GdataBlobstore2Info",
  }) as any as Schema.Schema<GdataBlobstore2Info>;

export interface GdataCompositeMedia {
  /** gdata */
  inline?: string;
  /** gdata */
  objectId?: GdataObjectId;
  /** gdata */
  blobstore2Info?: GdataBlobstore2Info;
  /** gdata */
  referenceType?:
    | "PATH"
    | "BLOB_REF"
    | "INLINE"
    | "BIGSTORE_REF"
    | "COSMO_BINARY_REFERENCE"
    | (string & {});
  /** gdata */
  length?: string;
  /** gdata */
  sha1Hash?: string;
  /** gdata */
  md5Hash?: string;
  /** gdata */
  path?: string;
  /** gdata */
  blobRef?: string;
  /** gdata */
  cosmoBinaryReference?: string;
  /** gdata */
  crc32cHash?: number;
}

export const GdataCompositeMedia: Schema.Schema<GdataCompositeMedia> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      inline: Schema.optional(Schema.String),
      objectId: Schema.optional(GdataObjectId),
      blobstore2Info: Schema.optional(GdataBlobstore2Info),
      referenceType: Schema.optional(Schema.String),
      length: Schema.optional(Schema.String),
      sha1Hash: Schema.optional(Schema.String),
      md5Hash: Schema.optional(Schema.String),
      path: Schema.optional(Schema.String),
      blobRef: Schema.optional(Schema.String),
      cosmoBinaryReference: Schema.optional(Schema.String),
      crc32cHash: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "GdataCompositeMedia",
  }) as any as Schema.Schema<GdataCompositeMedia>;

export interface GdataDiffUploadRequest {
  /** gdata */
  objectVersion?: string;
  /** gdata */
  objectInfo?: GdataCompositeMedia;
  /** gdata */
  checksumsInfo?: GdataCompositeMedia;
}

export const GdataDiffUploadRequest: Schema.Schema<GdataDiffUploadRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      objectVersion: Schema.optional(Schema.String),
      objectInfo: Schema.optional(GdataCompositeMedia),
      checksumsInfo: Schema.optional(GdataCompositeMedia),
    }),
  ).annotate({
    identifier: "GdataDiffUploadRequest",
  }) as any as Schema.Schema<GdataDiffUploadRequest>;

export interface GdataDiffDownloadResponse {
  /** gdata */
  objectLocation?: GdataCompositeMedia;
}

export const GdataDiffDownloadResponse: Schema.Schema<GdataDiffDownloadResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      objectLocation: Schema.optional(GdataCompositeMedia),
    }),
  ).annotate({
    identifier: "GdataDiffDownloadResponse",
  }) as any as Schema.Schema<GdataDiffDownloadResponse>;

export interface GdataDiffUploadResponse {
  /** gdata */
  objectVersion?: string;
  /** gdata */
  originalObject?: GdataCompositeMedia;
}

export const GdataDiffUploadResponse: Schema.Schema<GdataDiffUploadResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      objectVersion: Schema.optional(Schema.String),
      originalObject: Schema.optional(GdataCompositeMedia),
    }),
  ).annotate({
    identifier: "GdataDiffUploadResponse",
  }) as any as Schema.Schema<GdataDiffUploadResponse>;

export interface Report {
  /** The date/time when the job this report belongs to will expire/expired. */
  jobExpireTime?: string;
  /** The server-generated ID of the report. */
  id?: string;
  /** The URL from which the report can be downloaded (max. 1000 characters). */
  downloadUrl?: string;
  /** The start of the time period that the report instance covers. The value is inclusive. */
  startTime?: string;
  /** The end of the time period that the report instance covers. The value is exclusive. */
  endTime?: string;
  /** The ID of the job that created this report. */
  jobId?: string;
  /** The date/time when this report was created. */
  createTime?: string;
}

export const Report: Schema.Schema<Report> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      jobExpireTime: Schema.optional(Schema.String),
      id: Schema.optional(Schema.String),
      downloadUrl: Schema.optional(Schema.String),
      startTime: Schema.optional(Schema.String),
      endTime: Schema.optional(Schema.String),
      jobId: Schema.optional(Schema.String),
      createTime: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Report" }) as any as Schema.Schema<Report>;

export interface ListReportsResponse {
  /** The list of report types. */
  reports?: Array<Report>;
  /** A token to retrieve next page of results. Pass this value in the ListReportsRequest.page_token field in the subsequent call to `ListReports` method to retrieve the next page of results. */
  nextPageToken?: string;
}

export const ListReportsResponse: Schema.Schema<ListReportsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      reports: Schema.optional(Schema.Array(Report)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListReportsResponse",
  }) as any as Schema.Schema<ListReportsResponse>;

export interface GdataContentTypeInfo {
  /** gdata */
  fromHeader?: string;
  /** gdata */
  fromBytes?: string;
  /** gdata */
  bestGuess?: string;
  /** gdata */
  fromFileName?: string;
  /** gdata */
  fromUrlPath?: string;
}

export const GdataContentTypeInfo: Schema.Schema<GdataContentTypeInfo> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      fromHeader: Schema.optional(Schema.String),
      fromBytes: Schema.optional(Schema.String),
      bestGuess: Schema.optional(Schema.String),
      fromFileName: Schema.optional(Schema.String),
      fromUrlPath: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GdataContentTypeInfo",
  }) as any as Schema.Schema<GdataContentTypeInfo>;

export interface GdataDiffChecksumsResponse {
  /** gdata */
  objectLocation?: GdataCompositeMedia;
  /** gdata */
  checksumsLocation?: GdataCompositeMedia;
  /** gdata */
  objectSizeBytes?: string;
  /** gdata */
  objectVersion?: string;
  /** gdata */
  chunkSizeBytes?: string;
}

export const GdataDiffChecksumsResponse: Schema.Schema<GdataDiffChecksumsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      objectLocation: Schema.optional(GdataCompositeMedia),
      checksumsLocation: Schema.optional(GdataCompositeMedia),
      objectSizeBytes: Schema.optional(Schema.String),
      objectVersion: Schema.optional(Schema.String),
      chunkSizeBytes: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GdataDiffChecksumsResponse",
  }) as any as Schema.Schema<GdataDiffChecksumsResponse>;

export interface GdataDownloadParameters {
  /** gdata */
  ignoreRange?: boolean;
  /** gdata */
  allowGzipCompression?: boolean;
}

export const GdataDownloadParameters: Schema.Schema<GdataDownloadParameters> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      ignoreRange: Schema.optional(Schema.Boolean),
      allowGzipCompression: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "GdataDownloadParameters",
  }) as any as Schema.Schema<GdataDownloadParameters>;

export interface GdataDiffVersionResponse {
  /** gdata */
  objectSizeBytes?: string;
  /** gdata */
  objectVersion?: string;
}

export const GdataDiffVersionResponse: Schema.Schema<GdataDiffVersionResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      objectSizeBytes: Schema.optional(Schema.String),
      objectVersion: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GdataDiffVersionResponse",
  }) as any as Schema.Schema<GdataDiffVersionResponse>;

export interface GdataMedia {
  /** gdata */
  contentType?: string;
  /** gdata */
  md5Hash?: string;
  /** gdata */
  sha1Hash?: string;
  /** gdata */
  diffChecksumsResponse?: GdataDiffChecksumsResponse;
  /** gdata */
  diffVersionResponse?: GdataDiffVersionResponse;
  /** gdata */
  inline?: string;
  /** gdata */
  token?: string;
  /** gdata */
  path?: string;
  /** gdata */
  algorithm?: string;
  /** gdata */
  mediaId?: string;
  /** gdata */
  hashVerified?: boolean;
  /** gdata */
  filename?: string;
  /** gdata */
  diffDownloadResponse?: GdataDiffDownloadResponse;
  /** gdata */
  diffUploadRequest?: GdataDiffUploadRequest;
  /** gdata */
  objectId?: GdataObjectId;
  /** gdata */
  contentTypeInfo?: GdataContentTypeInfo;
  /** gdata */
  crc32cHash?: number;
  /** gdata */
  compositeMedia?: Array<GdataCompositeMedia>;
  /** gdata */
  length?: string;
  /** gdata */
  downloadParameters?: GdataDownloadParameters;
  /** gdata */
  diffUploadResponse?: GdataDiffUploadResponse;
  /** gdata */
  bigstoreObjectRef?: string;
  /** gdata */
  sha256Hash?: string;
  /** gdata */
  blobRef?: string;
  /** gdata */
  cosmoBinaryReference?: string;
  /** gdata */
  isPotentialRetry?: boolean;
  /** gdata */
  referenceType?:
    | "PATH"
    | "BLOB_REF"
    | "INLINE"
    | "GET_MEDIA"
    | "COMPOSITE_MEDIA"
    | "BIGSTORE_REF"
    | "DIFF_VERSION_RESPONSE"
    | "DIFF_CHECKSUMS_RESPONSE"
    | "DIFF_DOWNLOAD_RESPONSE"
    | "DIFF_UPLOAD_REQUEST"
    | "DIFF_UPLOAD_RESPONSE"
    | "COSMO_BINARY_REFERENCE"
    | "ARBITRARY_BYTES"
    | (string & {});
  /** gdata */
  timestamp?: string;
  /** gdata */
  hash?: string;
  /** gdata */
  blobstore2Info?: GdataBlobstore2Info;
}

export const GdataMedia: Schema.Schema<GdataMedia> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      contentType: Schema.optional(Schema.String),
      md5Hash: Schema.optional(Schema.String),
      sha1Hash: Schema.optional(Schema.String),
      diffChecksumsResponse: Schema.optional(GdataDiffChecksumsResponse),
      diffVersionResponse: Schema.optional(GdataDiffVersionResponse),
      inline: Schema.optional(Schema.String),
      token: Schema.optional(Schema.String),
      path: Schema.optional(Schema.String),
      algorithm: Schema.optional(Schema.String),
      mediaId: Schema.optional(Schema.String),
      hashVerified: Schema.optional(Schema.Boolean),
      filename: Schema.optional(Schema.String),
      diffDownloadResponse: Schema.optional(GdataDiffDownloadResponse),
      diffUploadRequest: Schema.optional(GdataDiffUploadRequest),
      objectId: Schema.optional(GdataObjectId),
      contentTypeInfo: Schema.optional(GdataContentTypeInfo),
      crc32cHash: Schema.optional(Schema.Number),
      compositeMedia: Schema.optional(Schema.Array(GdataCompositeMedia)),
      length: Schema.optional(Schema.String),
      downloadParameters: Schema.optional(GdataDownloadParameters),
      diffUploadResponse: Schema.optional(GdataDiffUploadResponse),
      bigstoreObjectRef: Schema.optional(Schema.String),
      sha256Hash: Schema.optional(Schema.String),
      blobRef: Schema.optional(Schema.String),
      cosmoBinaryReference: Schema.optional(Schema.String),
      isPotentialRetry: Schema.optional(Schema.Boolean),
      referenceType: Schema.optional(Schema.String),
      timestamp: Schema.optional(Schema.String),
      hash: Schema.optional(Schema.String),
      blobstore2Info: Schema.optional(GdataBlobstore2Info),
    }),
  ).annotate({ identifier: "GdataMedia" }) as any as Schema.Schema<GdataMedia>;

export interface ReportType {
  /** The date/time when this report type was/will be deprecated. */
  deprecateTime?: string;
  /** The name of the report type (max. 100 characters). */
  name?: string;
  /** True if this a system-managed report type; otherwise false. Reporting jobs for system-managed report types are created automatically and can thus not be used in the `CreateJob` method. */
  systemManaged?: boolean;
  /** The ID of the report type (max. 100 characters). */
  id?: string;
}

export const ReportType: Schema.Schema<ReportType> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      deprecateTime: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
      systemManaged: Schema.optional(Schema.Boolean),
      id: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "ReportType" }) as any as Schema.Schema<ReportType>;

export interface ListReportTypesResponse {
  /** A token to retrieve next page of results. Pass this value in the ListReportTypesRequest.page_token field in the subsequent call to `ListReportTypes` method to retrieve the next page of results. */
  nextPageToken?: string;
  /** The list of report types. */
  reportTypes?: Array<ReportType>;
}

export const ListReportTypesResponse: Schema.Schema<ListReportTypesResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      nextPageToken: Schema.optional(Schema.String),
      reportTypes: Schema.optional(Schema.Array(ReportType)),
    }),
  ).annotate({
    identifier: "ListReportTypesResponse",
  }) as any as Schema.Schema<ListReportTypesResponse>;

// ==========================================================================
// Operations
// ==========================================================================

export interface ListReportTypesRequest {
  /** The content owner's external ID on which behalf the user is acting on. If not set, the user is acting for himself (his own channel). */
  onBehalfOfContentOwner?: string;
  /** Requested page size. Server may return fewer report types than requested. If unspecified, server will pick an appropriate default. */
  pageSize?: number;
  /** A token identifying a page of results the server should return. Typically, this is the value of ListReportTypesResponse.next_page_token returned in response to the previous call to the `ListReportTypes` method. */
  pageToken?: string;
  /** If set to true, also system-managed report types will be returned; otherwise only the report types that can be used to create new reporting jobs will be returned. */
  includeSystemManaged?: boolean;
}

export const ListReportTypesRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    onBehalfOfContentOwner: Schema.optional(Schema.String).pipe(
      T.HttpQuery("onBehalfOfContentOwner"),
    ),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    includeSystemManaged: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("includeSystemManaged"),
    ),
  },
).pipe(
  T.Http({ method: "GET", path: "v1/reportTypes" }),
  svc,
) as unknown as Schema.Schema<ListReportTypesRequest>;

export type ListReportTypesResponse_Op = ListReportTypesResponse;
export const ListReportTypesResponse_Op =
  /*@__PURE__*/ /*#__PURE__*/ ListReportTypesResponse;

export type ListReportTypesError = DefaultErrors;

/** Lists report types. */
export const listReportTypes: API.PaginatedOperationMethod<
  ListReportTypesRequest,
  ListReportTypesResponse_Op,
  ListReportTypesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListReportTypesRequest,
  output: ListReportTypesResponse_Op,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface DownloadMediaRequest {
  /** Name of the media that is being downloaded. */
  resourceName: string;
}

export const DownloadMediaRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceName: Schema.String.pipe(T.HttpPath("resourceName")),
}).pipe(
  T.Http({ method: "GET", path: "v1/media/{mediaId}" }),
  svc,
) as unknown as Schema.Schema<DownloadMediaRequest>;

export type DownloadMediaResponse = GdataMedia;
export const DownloadMediaResponse = /*@__PURE__*/ /*#__PURE__*/ GdataMedia;

export type DownloadMediaError = DefaultErrors;

/** Method for media download. Download is supported on the URI `/v1/media/{+name}?alt=media`. */
export const downloadMedia: API.OperationMethod<
  DownloadMediaRequest,
  DownloadMediaResponse,
  DownloadMediaError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DownloadMediaRequest,
  output: DownloadMediaResponse,
  errors: [],
}));

export interface ListJobsRequest {
  /** The content owner's external ID on which behalf the user is acting on. If not set, the user is acting for himself (his own channel). */
  onBehalfOfContentOwner?: string;
  /** Requested page size. Server may return fewer jobs than requested. If unspecified, server will pick an appropriate default. */
  pageSize?: number;
  /** A token identifying a page of results the server should return. Typically, this is the value of ListReportTypesResponse.next_page_token returned in response to the previous call to the `ListJobs` method. */
  pageToken?: string;
  /** If set to true, also system-managed jobs will be returned; otherwise only user-created jobs will be returned. System-managed jobs can neither be modified nor deleted. */
  includeSystemManaged?: boolean;
}

export const ListJobsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  onBehalfOfContentOwner: Schema.optional(Schema.String).pipe(
    T.HttpQuery("onBehalfOfContentOwner"),
  ),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  includeSystemManaged: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("includeSystemManaged"),
  ),
}).pipe(
  T.Http({ method: "GET", path: "v1/jobs" }),
  svc,
) as unknown as Schema.Schema<ListJobsRequest>;

export type ListJobsResponse_Op = ListJobsResponse;
export const ListJobsResponse_Op = /*@__PURE__*/ /*#__PURE__*/ ListJobsResponse;

export type ListJobsError = DefaultErrors;

/** Lists jobs. */
export const listJobs: API.PaginatedOperationMethod<
  ListJobsRequest,
  ListJobsResponse_Op,
  ListJobsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListJobsRequest,
  output: ListJobsResponse_Op,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetJobsRequest {
  /** The ID of the job to retrieve. */
  jobId: string;
  /** The content owner's external ID on which behalf the user is acting on. If not set, the user is acting for himself (his own channel). */
  onBehalfOfContentOwner?: string;
}

export const GetJobsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  jobId: Schema.String.pipe(T.HttpPath("jobId")),
  onBehalfOfContentOwner: Schema.optional(Schema.String).pipe(
    T.HttpQuery("onBehalfOfContentOwner"),
  ),
}).pipe(
  T.Http({ method: "GET", path: "v1/jobs/{jobId}" }),
  svc,
) as unknown as Schema.Schema<GetJobsRequest>;

export type GetJobsResponse = Job;
export const GetJobsResponse = /*@__PURE__*/ /*#__PURE__*/ Job;

export type GetJobsError = DefaultErrors;

/** Gets a job. */
export const getJobs: API.OperationMethod<
  GetJobsRequest,
  GetJobsResponse,
  GetJobsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetJobsRequest,
  output: GetJobsResponse,
  errors: [],
}));

export interface CreateJobsRequest {
  /** The content owner's external ID on which behalf the user is acting on. If not set, the user is acting for himself (his own channel). */
  onBehalfOfContentOwner?: string;
  /** Request body */
  body?: Job;
}

export const CreateJobsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  onBehalfOfContentOwner: Schema.optional(Schema.String).pipe(
    T.HttpQuery("onBehalfOfContentOwner"),
  ),
  body: Schema.optional(Job).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/jobs", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateJobsRequest>;

export type CreateJobsResponse = Job;
export const CreateJobsResponse = /*@__PURE__*/ /*#__PURE__*/ Job;

export type CreateJobsError = DefaultErrors;

/** Creates a job and returns it. */
export const createJobs: API.OperationMethod<
  CreateJobsRequest,
  CreateJobsResponse,
  CreateJobsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateJobsRequest,
  output: CreateJobsResponse,
  errors: [],
}));

export interface DeleteJobsRequest {
  /** The ID of the job to delete. */
  jobId: string;
  /** The content owner's external ID on which behalf the user is acting on. If not set, the user is acting for himself (his own channel). */
  onBehalfOfContentOwner?: string;
}

export const DeleteJobsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  jobId: Schema.String.pipe(T.HttpPath("jobId")),
  onBehalfOfContentOwner: Schema.optional(Schema.String).pipe(
    T.HttpQuery("onBehalfOfContentOwner"),
  ),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/jobs/{jobId}" }),
  svc,
) as unknown as Schema.Schema<DeleteJobsRequest>;

export type DeleteJobsResponse = Empty;
export const DeleteJobsResponse = /*@__PURE__*/ /*#__PURE__*/ Empty;

export type DeleteJobsError = DefaultErrors;

/** Deletes a job. */
export const deleteJobs: API.OperationMethod<
  DeleteJobsRequest,
  DeleteJobsResponse,
  DeleteJobsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteJobsRequest,
  output: DeleteJobsResponse,
  errors: [],
}));

export interface ListJobsReportsRequest {
  /** A token identifying a page of results the server should return. Typically, this is the value of ListReportsResponse.next_page_token returned in response to the previous call to the `ListReports` method. */
  pageToken?: string;
  /** If set, only reports created after the specified date/time are returned. */
  createdAfter?: string;
  /** The ID of the job. */
  jobId: string;
  /** The content owner's external ID on which behalf the user is acting on. If not set, the user is acting for himself (his own channel). */
  onBehalfOfContentOwner?: string;
  /** Requested page size. Server may return fewer report types than requested. If unspecified, server will pick an appropriate default. */
  pageSize?: number;
  /** If set, only reports whose start time is greater than or equal the specified date/time are returned. */
  startTimeAtOrAfter?: string;
  /** If set, only reports whose start time is smaller than the specified date/time are returned. */
  startTimeBefore?: string;
}

export const ListJobsReportsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    createdAfter: Schema.optional(Schema.String).pipe(
      T.HttpQuery("createdAfter"),
    ),
    jobId: Schema.String.pipe(T.HttpPath("jobId")),
    onBehalfOfContentOwner: Schema.optional(Schema.String).pipe(
      T.HttpQuery("onBehalfOfContentOwner"),
    ),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    startTimeAtOrAfter: Schema.optional(Schema.String).pipe(
      T.HttpQuery("startTimeAtOrAfter"),
    ),
    startTimeBefore: Schema.optional(Schema.String).pipe(
      T.HttpQuery("startTimeBefore"),
    ),
  },
).pipe(
  T.Http({ method: "GET", path: "v1/jobs/{jobId}/reports" }),
  svc,
) as unknown as Schema.Schema<ListJobsReportsRequest>;

export type ListJobsReportsResponse = ListReportsResponse;
export const ListJobsReportsResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListReportsResponse;

export type ListJobsReportsError = DefaultErrors;

/** Lists reports created by a specific job. Returns NOT_FOUND if the job does not exist. */
export const listJobsReports: API.PaginatedOperationMethod<
  ListJobsReportsRequest,
  ListJobsReportsResponse,
  ListJobsReportsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListJobsReportsRequest,
  output: ListJobsReportsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetJobsReportsRequest {
  /** The ID of the report to retrieve. */
  reportId: string;
  /** The ID of the job. */
  jobId: string;
  /** The content owner's external ID on which behalf the user is acting on. If not set, the user is acting for himself (his own channel). */
  onBehalfOfContentOwner?: string;
}

export const GetJobsReportsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  reportId: Schema.String.pipe(T.HttpPath("reportId")),
  jobId: Schema.String.pipe(T.HttpPath("jobId")),
  onBehalfOfContentOwner: Schema.optional(Schema.String).pipe(
    T.HttpQuery("onBehalfOfContentOwner"),
  ),
}).pipe(
  T.Http({ method: "GET", path: "v1/jobs/{jobId}/reports/{reportId}" }),
  svc,
) as unknown as Schema.Schema<GetJobsReportsRequest>;

export type GetJobsReportsResponse = Report;
export const GetJobsReportsResponse = /*@__PURE__*/ /*#__PURE__*/ Report;

export type GetJobsReportsError = DefaultErrors;

/** Gets the metadata of a specific report. */
export const getJobsReports: API.OperationMethod<
  GetJobsReportsRequest,
  GetJobsReportsResponse,
  GetJobsReportsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetJobsReportsRequest,
  output: GetJobsReportsResponse,
  errors: [],
}));
