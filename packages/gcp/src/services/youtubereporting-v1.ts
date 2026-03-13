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

export interface Empty {}

export const Empty: Schema.Schema<Empty> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "Empty",
  }) as any as Schema.Schema<Empty>;

export interface GdataObjectId {
  /** gdata */
  bucketName?: string;
  /** gdata */
  objectName?: string;
  /** gdata */
  generation?: string;
}

export const GdataObjectId: Schema.Schema<GdataObjectId> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      bucketName: Schema.optional(Schema.String),
      objectName: Schema.optional(Schema.String),
      generation: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GdataObjectId",
  }) as any as Schema.Schema<GdataObjectId>;

export interface Job {
  /** The creation date/time of the job. */
  createTime?: string;
  /** The server-generated ID of the job (max. 40 characters). */
  id?: string;
  /** The type of reports this job creates. Corresponds to the ID of a ReportType. */
  reportTypeId?: string;
  /** The name of the job (max. 100 characters). */
  name?: string;
  /** The date/time when this job will expire/expired. After a job expired, no new reports are generated. */
  expireTime?: string;
  /** True if this a system-managed job that cannot be modified by the user; otherwise false. */
  systemManaged?: boolean;
}

export const Job: Schema.Schema<Job> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      createTime: Schema.optional(Schema.String),
      id: Schema.optional(Schema.String),
      reportTypeId: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
      expireTime: Schema.optional(Schema.String),
      systemManaged: Schema.optional(Schema.Boolean),
    }),
  ).annotate({ identifier: "Job" }) as any as Schema.Schema<Job>;

export interface Report {
  /** The date/time when this report was created. */
  createTime?: string;
  /** The server-generated ID of the report. */
  id?: string;
  /** The URL from which the report can be downloaded (max. 1000 characters). */
  downloadUrl?: string;
  /** The ID of the job that created this report. */
  jobId?: string;
  /** The date/time when the job this report belongs to will expire/expired. */
  jobExpireTime?: string;
  /** The start of the time period that the report instance covers. The value is inclusive. */
  startTime?: string;
  /** The end of the time period that the report instance covers. The value is exclusive. */
  endTime?: string;
}

export const Report: Schema.Schema<Report> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      createTime: Schema.optional(Schema.String),
      id: Schema.optional(Schema.String),
      downloadUrl: Schema.optional(Schema.String),
      jobId: Schema.optional(Schema.String),
      jobExpireTime: Schema.optional(Schema.String),
      startTime: Schema.optional(Schema.String),
      endTime: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Report" }) as any as Schema.Schema<Report>;

export interface ListReportsResponse {
  /** A token to retrieve next page of results. Pass this value in the ListReportsRequest.page_token field in the subsequent call to `ListReports` method to retrieve the next page of results. */
  nextPageToken?: string;
  /** The list of report types. */
  reports?: Array<Report>;
}

export const ListReportsResponse: Schema.Schema<ListReportsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      nextPageToken: Schema.optional(Schema.String),
      reports: Schema.optional(Schema.Array(Report)),
    }),
  ).annotate({
    identifier: "ListReportsResponse",
  }) as any as Schema.Schema<ListReportsResponse>;

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

export interface GdataBlobstore2Info {
  /** gdata */
  blobId?: string;
  /** gdata */
  uploadMetadataContainer?: string;
  /** gdata */
  downloadReadHandle?: string;
  /** gdata */
  downloadExternalReadToken?: string;
  /** gdata */
  readToken?: string;
  /** gdata */
  uploadFragmentListCreationInfo?: string;
  /** gdata */
  blobGeneration?: string;
}

export const GdataBlobstore2Info: Schema.Schema<GdataBlobstore2Info> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      blobId: Schema.optional(Schema.String),
      uploadMetadataContainer: Schema.optional(Schema.String),
      downloadReadHandle: Schema.optional(Schema.String),
      downloadExternalReadToken: Schema.optional(Schema.String),
      readToken: Schema.optional(Schema.String),
      uploadFragmentListCreationInfo: Schema.optional(Schema.String),
      blobGeneration: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GdataBlobstore2Info",
  }) as any as Schema.Schema<GdataBlobstore2Info>;

export interface GdataCompositeMedia {
  /** gdata */
  length?: string;
  /** gdata */
  referenceType?:
    | "PATH"
    | "BLOB_REF"
    | "INLINE"
    | "BIGSTORE_REF"
    | "COSMO_BINARY_REFERENCE"
    | (string & {});
  /** gdata */
  path?: string;
  /** gdata */
  inline?: string;
  /** gdata */
  cosmoBinaryReference?: string;
  /** gdata */
  md5Hash?: string;
  /** gdata */
  blobstore2Info?: GdataBlobstore2Info;
  /** gdata */
  sha1Hash?: string;
  /** gdata */
  objectId?: GdataObjectId;
  /** gdata */
  crc32cHash?: number;
  /** gdata */
  blobRef?: string;
}

export const GdataCompositeMedia: Schema.Schema<GdataCompositeMedia> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      length: Schema.optional(Schema.String),
      referenceType: Schema.optional(Schema.String),
      path: Schema.optional(Schema.String),
      inline: Schema.optional(Schema.String),
      cosmoBinaryReference: Schema.optional(Schema.String),
      md5Hash: Schema.optional(Schema.String),
      blobstore2Info: Schema.optional(GdataBlobstore2Info),
      sha1Hash: Schema.optional(Schema.String),
      objectId: Schema.optional(GdataObjectId),
      crc32cHash: Schema.optional(Schema.Number),
      blobRef: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GdataCompositeMedia",
  }) as any as Schema.Schema<GdataCompositeMedia>;

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

export interface ReportType {
  /** True if this a system-managed report type; otherwise false. Reporting jobs for system-managed report types are created automatically and can thus not be used in the `CreateJob` method. */
  systemManaged?: boolean;
  /** The ID of the report type (max. 100 characters). */
  id?: string;
  /** The name of the report type (max. 100 characters). */
  name?: string;
  /** The date/time when this report type was/will be deprecated. */
  deprecateTime?: string;
}

export const ReportType: Schema.Schema<ReportType> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      systemManaged: Schema.optional(Schema.Boolean),
      id: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
      deprecateTime: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "ReportType" }) as any as Schema.Schema<ReportType>;

export interface ListReportTypesResponse {
  /** The list of report types. */
  reportTypes?: Array<ReportType>;
  /** A token to retrieve next page of results. Pass this value in the ListReportTypesRequest.page_token field in the subsequent call to `ListReportTypes` method to retrieve the next page of results. */
  nextPageToken?: string;
}

export const ListReportTypesResponse: Schema.Schema<ListReportTypesResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      reportTypes: Schema.optional(Schema.Array(ReportType)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListReportTypesResponse",
  }) as any as Schema.Schema<ListReportTypesResponse>;

export interface GdataDiffVersionResponse {
  /** gdata */
  objectVersion?: string;
  /** gdata */
  objectSizeBytes?: string;
}

export const GdataDiffVersionResponse: Schema.Schema<GdataDiffVersionResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      objectVersion: Schema.optional(Schema.String),
      objectSizeBytes: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GdataDiffVersionResponse",
  }) as any as Schema.Schema<GdataDiffVersionResponse>;

export interface GdataDiffUploadRequest {
  /** gdata */
  objectInfo?: GdataCompositeMedia;
  /** gdata */
  objectVersion?: string;
  /** gdata */
  checksumsInfo?: GdataCompositeMedia;
}

export const GdataDiffUploadRequest: Schema.Schema<GdataDiffUploadRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      objectInfo: Schema.optional(GdataCompositeMedia),
      objectVersion: Schema.optional(Schema.String),
      checksumsInfo: Schema.optional(GdataCompositeMedia),
    }),
  ).annotate({
    identifier: "GdataDiffUploadRequest",
  }) as any as Schema.Schema<GdataDiffUploadRequest>;

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

export interface GdataDiffChecksumsResponse {
  /** gdata */
  checksumsLocation?: GdataCompositeMedia;
  /** gdata */
  objectVersion?: string;
  /** gdata */
  objectSizeBytes?: string;
  /** gdata */
  chunkSizeBytes?: string;
  /** gdata */
  objectLocation?: GdataCompositeMedia;
}

export const GdataDiffChecksumsResponse: Schema.Schema<GdataDiffChecksumsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      checksumsLocation: Schema.optional(GdataCompositeMedia),
      objectVersion: Schema.optional(Schema.String),
      objectSizeBytes: Schema.optional(Schema.String),
      chunkSizeBytes: Schema.optional(Schema.String),
      objectLocation: Schema.optional(GdataCompositeMedia),
    }),
  ).annotate({
    identifier: "GdataDiffChecksumsResponse",
  }) as any as Schema.Schema<GdataDiffChecksumsResponse>;

export interface GdataContentTypeInfo {
  /** gdata */
  fromFileName?: string;
  /** gdata */
  bestGuess?: string;
  /** gdata */
  fromUrlPath?: string;
  /** gdata */
  fromHeader?: string;
  /** gdata */
  fromBytes?: string;
}

export const GdataContentTypeInfo: Schema.Schema<GdataContentTypeInfo> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      fromFileName: Schema.optional(Schema.String),
      bestGuess: Schema.optional(Schema.String),
      fromUrlPath: Schema.optional(Schema.String),
      fromHeader: Schema.optional(Schema.String),
      fromBytes: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GdataContentTypeInfo",
  }) as any as Schema.Schema<GdataContentTypeInfo>;

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

export interface GdataMedia {
  /** gdata */
  isPotentialRetry?: boolean;
  /** gdata */
  downloadParameters?: GdataDownloadParameters;
  /** gdata */
  filename?: string;
  /** gdata */
  md5Hash?: string;
  /** gdata */
  diffChecksumsResponse?: GdataDiffChecksumsResponse;
  /** gdata */
  length?: string;
  /** gdata */
  crc32cHash?: number;
  /** gdata */
  blobRef?: string;
  /** gdata */
  diffUploadRequest?: GdataDiffUploadRequest;
  /** gdata */
  hash?: string;
  /** gdata */
  diffVersionResponse?: GdataDiffVersionResponse;
  /** gdata */
  contentType?: string;
  /** gdata */
  path?: string;
  /** gdata */
  mediaId?: string;
  /** gdata */
  bigstoreObjectRef?: string;
  /** gdata */
  cosmoBinaryReference?: string;
  /** gdata */
  sha256Hash?: string;
  /** gdata */
  token?: string;
  /** gdata */
  contentTypeInfo?: GdataContentTypeInfo;
  /** gdata */
  diffUploadResponse?: GdataDiffUploadResponse;
  /** gdata */
  blobstore2Info?: GdataBlobstore2Info;
  /** gdata */
  inline?: string;
  /** gdata */
  diffDownloadResponse?: GdataDiffDownloadResponse;
  /** gdata */
  sha1Hash?: string;
  /** gdata */
  hashVerified?: boolean;
  /** gdata */
  objectId?: GdataObjectId;
  /** gdata */
  compositeMedia?: Array<GdataCompositeMedia>;
  /** gdata */
  algorithm?: string;
  /** gdata */
  timestamp?: string;
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
}

export const GdataMedia: Schema.Schema<GdataMedia> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      isPotentialRetry: Schema.optional(Schema.Boolean),
      downloadParameters: Schema.optional(GdataDownloadParameters),
      filename: Schema.optional(Schema.String),
      md5Hash: Schema.optional(Schema.String),
      diffChecksumsResponse: Schema.optional(GdataDiffChecksumsResponse),
      length: Schema.optional(Schema.String),
      crc32cHash: Schema.optional(Schema.Number),
      blobRef: Schema.optional(Schema.String),
      diffUploadRequest: Schema.optional(GdataDiffUploadRequest),
      hash: Schema.optional(Schema.String),
      diffVersionResponse: Schema.optional(GdataDiffVersionResponse),
      contentType: Schema.optional(Schema.String),
      path: Schema.optional(Schema.String),
      mediaId: Schema.optional(Schema.String),
      bigstoreObjectRef: Schema.optional(Schema.String),
      cosmoBinaryReference: Schema.optional(Schema.String),
      sha256Hash: Schema.optional(Schema.String),
      token: Schema.optional(Schema.String),
      contentTypeInfo: Schema.optional(GdataContentTypeInfo),
      diffUploadResponse: Schema.optional(GdataDiffUploadResponse),
      blobstore2Info: Schema.optional(GdataBlobstore2Info),
      inline: Schema.optional(Schema.String),
      diffDownloadResponse: Schema.optional(GdataDiffDownloadResponse),
      sha1Hash: Schema.optional(Schema.String),
      hashVerified: Schema.optional(Schema.Boolean),
      objectId: Schema.optional(GdataObjectId),
      compositeMedia: Schema.optional(Schema.Array(GdataCompositeMedia)),
      algorithm: Schema.optional(Schema.String),
      timestamp: Schema.optional(Schema.String),
      referenceType: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "GdataMedia" }) as any as Schema.Schema<GdataMedia>;

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
  /** Requested page size. Server may return fewer jobs than requested. If unspecified, server will pick an appropriate default. */
  pageSize?: number;
  /** The content owner's external ID on which behalf the user is acting on. If not set, the user is acting for himself (his own channel). */
  onBehalfOfContentOwner?: string;
  /** A token identifying a page of results the server should return. Typically, this is the value of ListReportTypesResponse.next_page_token returned in response to the previous call to the `ListJobs` method. */
  pageToken?: string;
  /** If set to true, also system-managed jobs will be returned; otherwise only user-created jobs will be returned. System-managed jobs can neither be modified nor deleted. */
  includeSystemManaged?: boolean;
}

export const ListJobsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  onBehalfOfContentOwner: Schema.optional(Schema.String).pipe(
    T.HttpQuery("onBehalfOfContentOwner"),
  ),
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

export interface GetJobsRequest {
  /** The content owner's external ID on which behalf the user is acting on. If not set, the user is acting for himself (his own channel). */
  onBehalfOfContentOwner?: string;
  /** The ID of the job to retrieve. */
  jobId: string;
}

export const GetJobsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  onBehalfOfContentOwner: Schema.optional(Schema.String).pipe(
    T.HttpQuery("onBehalfOfContentOwner"),
  ),
  jobId: Schema.String.pipe(T.HttpPath("jobId")),
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
  /** Requested page size. Server may return fewer report types than requested. If unspecified, server will pick an appropriate default. */
  pageSize?: number;
  /** If set, only reports created after the specified date/time are returned. */
  createdAfter?: string;
  /** A token identifying a page of results the server should return. Typically, this is the value of ListReportsResponse.next_page_token returned in response to the previous call to the `ListReports` method. */
  pageToken?: string;
  /** The content owner's external ID on which behalf the user is acting on. If not set, the user is acting for himself (his own channel). */
  onBehalfOfContentOwner?: string;
  /** If set, only reports whose start time is greater than or equal the specified date/time are returned. */
  startTimeAtOrAfter?: string;
  /** The ID of the job. */
  jobId: string;
  /** If set, only reports whose start time is smaller than the specified date/time are returned. */
  startTimeBefore?: string;
}

export const ListJobsReportsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    createdAfter: Schema.optional(Schema.String).pipe(
      T.HttpQuery("createdAfter"),
    ),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    onBehalfOfContentOwner: Schema.optional(Schema.String).pipe(
      T.HttpQuery("onBehalfOfContentOwner"),
    ),
    startTimeAtOrAfter: Schema.optional(Schema.String).pipe(
      T.HttpQuery("startTimeAtOrAfter"),
    ),
    jobId: Schema.String.pipe(T.HttpPath("jobId")),
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
  /** The content owner's external ID on which behalf the user is acting on. If not set, the user is acting for himself (his own channel). */
  onBehalfOfContentOwner?: string;
  /** The ID of the job. */
  jobId: string;
}

export const GetJobsReportsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  reportId: Schema.String.pipe(T.HttpPath("reportId")),
  onBehalfOfContentOwner: Schema.optional(Schema.String).pipe(
    T.HttpQuery("onBehalfOfContentOwner"),
  ),
  jobId: Schema.String.pipe(T.HttpPath("jobId")),
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
