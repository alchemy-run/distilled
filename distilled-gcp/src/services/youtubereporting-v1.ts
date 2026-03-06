// ==========================================================================
// YouTube Reporting API (youtubereporting v1)
// DO NOT EDIT - Generated from GCP Discovery Document
// ==========================================================================

import * as Schema from "effect/Schema";
import * as API from "../client/api.ts";
import * as T from "../traits.ts";
import * as C from "../category.ts";
import type { GCPAuth } from "../auth.ts";
import type { CommonErrors } from "../errors.ts";
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

export interface GdataObjectId {
  /** gdata */
  generation?: string;
  /** gdata */
  bucketName?: string;
  /** gdata */
  objectName?: string;
}

export const GdataObjectId: Schema.Schema<GdataObjectId> = Schema.suspend(() => Schema.Struct({
  generation: Schema.optional(Schema.String),
  bucketName: Schema.optional(Schema.String),
  objectName: Schema.optional(Schema.String),
})).annotate({ identifier: "GdataObjectId" }) as any as Schema.Schema<GdataObjectId>;

export interface GdataBlobstore2Info {
  /** gdata */
  uploadFragmentListCreationInfo?: string;
  /** gdata */
  downloadReadHandle?: string;
  /** gdata */
  blobId?: string;
  /** gdata */
  blobGeneration?: string;
  /** gdata */
  readToken?: string;
  /** gdata */
  uploadMetadataContainer?: string;
  /** gdata */
  downloadExternalReadToken?: string;
}

export const GdataBlobstore2Info: Schema.Schema<GdataBlobstore2Info> = Schema.suspend(() => Schema.Struct({
  uploadFragmentListCreationInfo: Schema.optional(Schema.String),
  downloadReadHandle: Schema.optional(Schema.String),
  blobId: Schema.optional(Schema.String),
  blobGeneration: Schema.optional(Schema.String),
  readToken: Schema.optional(Schema.String),
  uploadMetadataContainer: Schema.optional(Schema.String),
  downloadExternalReadToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GdataBlobstore2Info" }) as any as Schema.Schema<GdataBlobstore2Info>;

export interface GdataCompositeMedia {
  /** gdata */
  blobRef?: string;
  /** gdata */
  inline?: string;
  /** gdata */
  referenceType?: "PATH" | "BLOB_REF" | "INLINE" | "BIGSTORE_REF" | "COSMO_BINARY_REFERENCE" | (string & {});
  /** gdata */
  path?: string;
  /** gdata */
  md5Hash?: string;
  /** gdata */
  crc32cHash?: number;
  /** gdata */
  sha1Hash?: string;
  /** gdata */
  objectId?: GdataObjectId;
  /** gdata */
  blobstore2Info?: GdataBlobstore2Info;
  /** gdata */
  cosmoBinaryReference?: string;
  /** gdata */
  length?: string;
}

export const GdataCompositeMedia: Schema.Schema<GdataCompositeMedia> = Schema.suspend(() => Schema.Struct({
  blobRef: Schema.optional(Schema.String),
  inline: Schema.optional(Schema.String),
  referenceType: Schema.optional(Schema.String),
  path: Schema.optional(Schema.String),
  md5Hash: Schema.optional(Schema.String),
  crc32cHash: Schema.optional(Schema.Number),
  sha1Hash: Schema.optional(Schema.String),
  objectId: Schema.optional(GdataObjectId),
  blobstore2Info: Schema.optional(GdataBlobstore2Info),
  cosmoBinaryReference: Schema.optional(Schema.String),
  length: Schema.optional(Schema.String),
})).annotate({ identifier: "GdataCompositeMedia" }) as any as Schema.Schema<GdataCompositeMedia>;

export interface GdataDiffDownloadResponse {
  /** gdata */
  objectLocation?: GdataCompositeMedia;
}

export const GdataDiffDownloadResponse: Schema.Schema<GdataDiffDownloadResponse> = Schema.suspend(() => Schema.Struct({
  objectLocation: Schema.optional(GdataCompositeMedia),
})).annotate({ identifier: "GdataDiffDownloadResponse" }) as any as Schema.Schema<GdataDiffDownloadResponse>;

export interface Report {
  /** The server-generated ID of the report. */
  id?: string;
  /** The date/time when this report was created. */
  createTime?: string;
  /** The ID of the job that created this report. */
  jobId?: string;
  /** The date/time when the job this report belongs to will expire/expired. */
  jobExpireTime?: string;
  /** The start of the time period that the report instance covers. The value is inclusive. */
  startTime?: string;
  /** The URL from which the report can be downloaded (max. 1000 characters). */
  downloadUrl?: string;
  /** The end of the time period that the report instance covers. The value is exclusive. */
  endTime?: string;
}

export const Report: Schema.Schema<Report> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  jobId: Schema.optional(Schema.String),
  jobExpireTime: Schema.optional(Schema.String),
  startTime: Schema.optional(Schema.String),
  downloadUrl: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
})).annotate({ identifier: "Report" }) as any as Schema.Schema<Report>;

export interface GdataDiffVersionResponse {
  /** gdata */
  objectVersion?: string;
  /** gdata */
  objectSizeBytes?: string;
}

export const GdataDiffVersionResponse: Schema.Schema<GdataDiffVersionResponse> = Schema.suspend(() => Schema.Struct({
  objectVersion: Schema.optional(Schema.String),
  objectSizeBytes: Schema.optional(Schema.String),
})).annotate({ identifier: "GdataDiffVersionResponse" }) as any as Schema.Schema<GdataDiffVersionResponse>;

export interface Job {
  /** The type of reports this job creates. Corresponds to the ID of a ReportType. */
  reportTypeId?: string;
  /** True if this a system-managed job that cannot be modified by the user; otherwise false. */
  systemManaged?: boolean;
  /** The server-generated ID of the job (max. 40 characters). */
  id?: string;
  /** The creation date/time of the job. */
  createTime?: string;
  /** The date/time when this job will expire/expired. After a job expired, no new reports are generated. */
  expireTime?: string;
  /** The name of the job (max. 100 characters). */
  name?: string;
}

export const Job: Schema.Schema<Job> = Schema.suspend(() => Schema.Struct({
  reportTypeId: Schema.optional(Schema.String),
  systemManaged: Schema.optional(Schema.Boolean),
  id: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  expireTime: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "Job" }) as any as Schema.Schema<Job>;

export interface ListJobsResponse {
  /** The list of jobs. */
  jobs?: Array<Job>;
  /** A token to retrieve next page of results. Pass this value in the ListJobsRequest.page_token field in the subsequent call to `ListJobs` method to retrieve the next page of results. */
  nextPageToken?: string;
}

export const ListJobsResponse: Schema.Schema<ListJobsResponse> = Schema.suspend(() => Schema.Struct({
  jobs: Schema.optional(Schema.Array(Job)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListJobsResponse" }) as any as Schema.Schema<ListJobsResponse>;

export interface GdataDownloadParameters {
  /** gdata */
  allowGzipCompression?: boolean;
  /** gdata */
  ignoreRange?: boolean;
}

export const GdataDownloadParameters: Schema.Schema<GdataDownloadParameters> = Schema.suspend(() => Schema.Struct({
  allowGzipCompression: Schema.optional(Schema.Boolean),
  ignoreRange: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GdataDownloadParameters" }) as any as Schema.Schema<GdataDownloadParameters>;

export interface GdataDiffUploadResponse {
  /** gdata */
  objectVersion?: string;
  /** gdata */
  originalObject?: GdataCompositeMedia;
}

export const GdataDiffUploadResponse: Schema.Schema<GdataDiffUploadResponse> = Schema.suspend(() => Schema.Struct({
  objectVersion: Schema.optional(Schema.String),
  originalObject: Schema.optional(GdataCompositeMedia),
})).annotate({ identifier: "GdataDiffUploadResponse" }) as any as Schema.Schema<GdataDiffUploadResponse>;

export interface GdataDiffUploadRequest {
  /** gdata */
  objectInfo?: GdataCompositeMedia;
  /** gdata */
  objectVersion?: string;
  /** gdata */
  checksumsInfo?: GdataCompositeMedia;
}

export const GdataDiffUploadRequest: Schema.Schema<GdataDiffUploadRequest> = Schema.suspend(() => Schema.Struct({
  objectInfo: Schema.optional(GdataCompositeMedia),
  objectVersion: Schema.optional(Schema.String),
  checksumsInfo: Schema.optional(GdataCompositeMedia),
})).annotate({ identifier: "GdataDiffUploadRequest" }) as any as Schema.Schema<GdataDiffUploadRequest>;

export interface GdataDiffChecksumsResponse {
  /** gdata */
  objectSizeBytes?: string;
  /** gdata */
  objectVersion?: string;
  /** gdata */
  chunkSizeBytes?: string;
  /** gdata */
  checksumsLocation?: GdataCompositeMedia;
  /** gdata */
  objectLocation?: GdataCompositeMedia;
}

export const GdataDiffChecksumsResponse: Schema.Schema<GdataDiffChecksumsResponse> = Schema.suspend(() => Schema.Struct({
  objectSizeBytes: Schema.optional(Schema.String),
  objectVersion: Schema.optional(Schema.String),
  chunkSizeBytes: Schema.optional(Schema.String),
  checksumsLocation: Schema.optional(GdataCompositeMedia),
  objectLocation: Schema.optional(GdataCompositeMedia),
})).annotate({ identifier: "GdataDiffChecksumsResponse" }) as any as Schema.Schema<GdataDiffChecksumsResponse>;

export interface GdataContentTypeInfo {
  /** gdata */
  fromUrlPath?: string;
  /** gdata */
  fromHeader?: string;
  /** gdata */
  bestGuess?: string;
  /** gdata */
  fromBytes?: string;
  /** gdata */
  fromFileName?: string;
}

export const GdataContentTypeInfo: Schema.Schema<GdataContentTypeInfo> = Schema.suspend(() => Schema.Struct({
  fromUrlPath: Schema.optional(Schema.String),
  fromHeader: Schema.optional(Schema.String),
  bestGuess: Schema.optional(Schema.String),
  fromBytes: Schema.optional(Schema.String),
  fromFileName: Schema.optional(Schema.String),
})).annotate({ identifier: "GdataContentTypeInfo" }) as any as Schema.Schema<GdataContentTypeInfo>;

export interface GdataMedia {
  /** gdata */
  downloadParameters?: GdataDownloadParameters;
  /** gdata */
  sha1Hash?: string;
  /** gdata */
  objectId?: GdataObjectId;
  /** gdata */
  timestamp?: string;
  /** gdata */
  cosmoBinaryReference?: string;
  /** gdata */
  filename?: string;
  /** gdata */
  algorithm?: string;
  /** gdata */
  diffVersionResponse?: GdataDiffVersionResponse;
  /** gdata */
  mediaId?: string;
  /** gdata */
  inline?: string;
  /** gdata */
  contentType?: string;
  /** gdata */
  token?: string;
  /** gdata */
  diffUploadResponse?: GdataDiffUploadResponse;
  /** gdata */
  diffDownloadResponse?: GdataDiffDownloadResponse;
  /** gdata */
  md5Hash?: string;
  /** gdata */
  hash?: string;
  /** gdata */
  compositeMedia?: Array<GdataCompositeMedia>;
  /** gdata */
  hashVerified?: boolean;
  /** gdata */
  diffUploadRequest?: GdataDiffUploadRequest;
  /** gdata */
  sha256Hash?: string;
  /** gdata */
  length?: string;
  /** gdata */
  isPotentialRetry?: boolean;
  /** gdata */
  blobRef?: string;
  /** gdata */
  diffChecksumsResponse?: GdataDiffChecksumsResponse;
  /** gdata */
  crc32cHash?: number;
  /** gdata */
  referenceType?: "PATH" | "BLOB_REF" | "INLINE" | "GET_MEDIA" | "COMPOSITE_MEDIA" | "BIGSTORE_REF" | "DIFF_VERSION_RESPONSE" | "DIFF_CHECKSUMS_RESPONSE" | "DIFF_DOWNLOAD_RESPONSE" | "DIFF_UPLOAD_REQUEST" | "DIFF_UPLOAD_RESPONSE" | "COSMO_BINARY_REFERENCE" | "ARBITRARY_BYTES" | (string & {});
  /** gdata */
  path?: string;
  /** gdata */
  blobstore2Info?: GdataBlobstore2Info;
  /** gdata */
  bigstoreObjectRef?: string;
  /** gdata */
  contentTypeInfo?: GdataContentTypeInfo;
}

export const GdataMedia: Schema.Schema<GdataMedia> = Schema.suspend(() => Schema.Struct({
  downloadParameters: Schema.optional(GdataDownloadParameters),
  sha1Hash: Schema.optional(Schema.String),
  objectId: Schema.optional(GdataObjectId),
  timestamp: Schema.optional(Schema.String),
  cosmoBinaryReference: Schema.optional(Schema.String),
  filename: Schema.optional(Schema.String),
  algorithm: Schema.optional(Schema.String),
  diffVersionResponse: Schema.optional(GdataDiffVersionResponse),
  mediaId: Schema.optional(Schema.String),
  inline: Schema.optional(Schema.String),
  contentType: Schema.optional(Schema.String),
  token: Schema.optional(Schema.String),
  diffUploadResponse: Schema.optional(GdataDiffUploadResponse),
  diffDownloadResponse: Schema.optional(GdataDiffDownloadResponse),
  md5Hash: Schema.optional(Schema.String),
  hash: Schema.optional(Schema.String),
  compositeMedia: Schema.optional(Schema.Array(GdataCompositeMedia)),
  hashVerified: Schema.optional(Schema.Boolean),
  diffUploadRequest: Schema.optional(GdataDiffUploadRequest),
  sha256Hash: Schema.optional(Schema.String),
  length: Schema.optional(Schema.String),
  isPotentialRetry: Schema.optional(Schema.Boolean),
  blobRef: Schema.optional(Schema.String),
  diffChecksumsResponse: Schema.optional(GdataDiffChecksumsResponse),
  crc32cHash: Schema.optional(Schema.Number),
  referenceType: Schema.optional(Schema.String),
  path: Schema.optional(Schema.String),
  blobstore2Info: Schema.optional(GdataBlobstore2Info),
  bigstoreObjectRef: Schema.optional(Schema.String),
  contentTypeInfo: Schema.optional(GdataContentTypeInfo),
})).annotate({ identifier: "GdataMedia" }) as any as Schema.Schema<GdataMedia>;

export interface ListReportsResponse {
  /** The list of report types. */
  reports?: Array<Report>;
  /** A token to retrieve next page of results. Pass this value in the ListReportsRequest.page_token field in the subsequent call to `ListReports` method to retrieve the next page of results. */
  nextPageToken?: string;
}

export const ListReportsResponse: Schema.Schema<ListReportsResponse> = Schema.suspend(() => Schema.Struct({
  reports: Schema.optional(Schema.Array(Report)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListReportsResponse" }) as any as Schema.Schema<ListReportsResponse>;

export interface Empty {
}

export const Empty: Schema.Schema<Empty> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "Empty" }) as any as Schema.Schema<Empty>;

export interface ReportType {
  /** The date/time when this report type was/will be deprecated. */
  deprecateTime?: string;
  /** The ID of the report type (max. 100 characters). */
  id?: string;
  /** True if this a system-managed report type; otherwise false. Reporting jobs for system-managed report types are created automatically and can thus not be used in the `CreateJob` method. */
  systemManaged?: boolean;
  /** The name of the report type (max. 100 characters). */
  name?: string;
}

export const ReportType: Schema.Schema<ReportType> = Schema.suspend(() => Schema.Struct({
  deprecateTime: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
  systemManaged: Schema.optional(Schema.Boolean),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "ReportType" }) as any as Schema.Schema<ReportType>;

export interface ListReportTypesResponse {
  /** The list of report types. */
  reportTypes?: Array<ReportType>;
  /** A token to retrieve next page of results. Pass this value in the ListReportTypesRequest.page_token field in the subsequent call to `ListReportTypes` method to retrieve the next page of results. */
  nextPageToken?: string;
}

export const ListReportTypesResponse: Schema.Schema<ListReportTypesResponse> = Schema.suspend(() => Schema.Struct({
  reportTypes: Schema.optional(Schema.Array(ReportType)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListReportTypesResponse" }) as any as Schema.Schema<ListReportTypesResponse>;

// ==========================================================================
// Operations
// ==========================================================================

export interface DownloadMediaRequest {
  /** Name of the media that is being downloaded. */
  resourceName: string;
}

export const DownloadMediaRequest = Schema.Struct({
  resourceName: Schema.String.pipe(T.HttpPath("resourceName")),
}).pipe(
  T.Http({ method: "GET", path: "v1/media/{mediaId}" }),
  svc,
) as unknown as Schema.Schema<DownloadMediaRequest>;

export type DownloadMediaResponse = GdataMedia;
export const DownloadMediaResponse = GdataMedia;

export type DownloadMediaError = CommonErrors;

/** Method for media download. Download is supported on the URI `/v1/media/{+name}?alt=media`. */
export const downloadMedia: API.OperationMethod<DownloadMediaRequest, DownloadMediaResponse, DownloadMediaError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DownloadMediaRequest,
  output: DownloadMediaResponse,
  errors: [],
}));

export interface ListReportTypesRequest {
  /** The content owner's external ID on which behalf the user is acting on. If not set, the user is acting for himself (his own channel). */
  onBehalfOfContentOwner?: string;
  /** A token identifying a page of results the server should return. Typically, this is the value of ListReportTypesResponse.next_page_token returned in response to the previous call to the `ListReportTypes` method. */
  pageToken?: string;
  /** Requested page size. Server may return fewer report types than requested. If unspecified, server will pick an appropriate default. */
  pageSize?: number;
  /** If set to true, also system-managed report types will be returned; otherwise only the report types that can be used to create new reporting jobs will be returned. */
  includeSystemManaged?: boolean;
}

export const ListReportTypesRequest = Schema.Struct({
  onBehalfOfContentOwner: Schema.optional(Schema.String).pipe(T.HttpQuery("onBehalfOfContentOwner")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  includeSystemManaged: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("includeSystemManaged")),
}).pipe(
  T.Http({ method: "GET", path: "v1/reportTypes" }),
  svc,
) as unknown as Schema.Schema<ListReportTypesRequest>;

export type ListReportTypesResponse_Op = ListReportTypesResponse;
export const ListReportTypesResponse_Op = ListReportTypesResponse;

export type ListReportTypesError = CommonErrors;

/** Lists report types. */
export const listReportTypes: API.PaginatedOperationMethod<ListReportTypesRequest, ListReportTypesResponse_Op, ListReportTypesError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListReportTypesRequest,
  output: ListReportTypesResponse_Op,
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

export const GetJobsRequest = Schema.Struct({
  jobId: Schema.String.pipe(T.HttpPath("jobId")),
  onBehalfOfContentOwner: Schema.optional(Schema.String).pipe(T.HttpQuery("onBehalfOfContentOwner")),
}).pipe(
  T.Http({ method: "GET", path: "v1/jobs/{jobId}" }),
  svc,
) as unknown as Schema.Schema<GetJobsRequest>;

export type GetJobsResponse = Job;
export const GetJobsResponse = Job;

export type GetJobsError = CommonErrors;

/** Gets a job. */
export const getJobs: API.OperationMethod<GetJobsRequest, GetJobsResponse, GetJobsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
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

export const CreateJobsRequest = Schema.Struct({
  onBehalfOfContentOwner: Schema.optional(Schema.String).pipe(T.HttpQuery("onBehalfOfContentOwner")),
  body: Schema.optional(Job).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/jobs", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateJobsRequest>;

export type CreateJobsResponse = Job;
export const CreateJobsResponse = Job;

export type CreateJobsError = CommonErrors;

/** Creates a job and returns it. */
export const createJobs: API.OperationMethod<CreateJobsRequest, CreateJobsResponse, CreateJobsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateJobsRequest,
  output: CreateJobsResponse,
  errors: [],
}));

export interface ListJobsRequest {
  /** Requested page size. Server may return fewer jobs than requested. If unspecified, server will pick an appropriate default. */
  pageSize?: number;
  /** If set to true, also system-managed jobs will be returned; otherwise only user-created jobs will be returned. System-managed jobs can neither be modified nor deleted. */
  includeSystemManaged?: boolean;
  /** A token identifying a page of results the server should return. Typically, this is the value of ListReportTypesResponse.next_page_token returned in response to the previous call to the `ListJobs` method. */
  pageToken?: string;
  /** The content owner's external ID on which behalf the user is acting on. If not set, the user is acting for himself (his own channel). */
  onBehalfOfContentOwner?: string;
}

export const ListJobsRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  includeSystemManaged: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("includeSystemManaged")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  onBehalfOfContentOwner: Schema.optional(Schema.String).pipe(T.HttpQuery("onBehalfOfContentOwner")),
}).pipe(
  T.Http({ method: "GET", path: "v1/jobs" }),
  svc,
) as unknown as Schema.Schema<ListJobsRequest>;

export type ListJobsResponse_Op = ListJobsResponse;
export const ListJobsResponse_Op = ListJobsResponse;

export type ListJobsError = CommonErrors;

/** Lists jobs. */
export const listJobs: API.PaginatedOperationMethod<ListJobsRequest, ListJobsResponse_Op, ListJobsError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListJobsRequest,
  output: ListJobsResponse_Op,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface DeleteJobsRequest {
  /** The ID of the job to delete. */
  jobId: string;
  /** The content owner's external ID on which behalf the user is acting on. If not set, the user is acting for himself (his own channel). */
  onBehalfOfContentOwner?: string;
}

export const DeleteJobsRequest = Schema.Struct({
  jobId: Schema.String.pipe(T.HttpPath("jobId")),
  onBehalfOfContentOwner: Schema.optional(Schema.String).pipe(T.HttpQuery("onBehalfOfContentOwner")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/jobs/{jobId}" }),
  svc,
) as unknown as Schema.Schema<DeleteJobsRequest>;

export type DeleteJobsResponse = Empty;
export const DeleteJobsResponse = Empty;

export type DeleteJobsError = CommonErrors;

/** Deletes a job. */
export const deleteJobs: API.OperationMethod<DeleteJobsRequest, DeleteJobsResponse, DeleteJobsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteJobsRequest,
  output: DeleteJobsResponse,
  errors: [],
}));

export interface GetJobsReportsRequest {
  /** The ID of the report to retrieve. */
  reportId: string;
  /** The content owner's external ID on which behalf the user is acting on. If not set, the user is acting for himself (his own channel). */
  onBehalfOfContentOwner?: string;
  /** The ID of the job. */
  jobId: string;
}

export const GetJobsReportsRequest = Schema.Struct({
  reportId: Schema.String.pipe(T.HttpPath("reportId")),
  onBehalfOfContentOwner: Schema.optional(Schema.String).pipe(T.HttpQuery("onBehalfOfContentOwner")),
  jobId: Schema.String.pipe(T.HttpPath("jobId")),
}).pipe(
  T.Http({ method: "GET", path: "v1/jobs/{jobId}/reports/{reportId}" }),
  svc,
) as unknown as Schema.Schema<GetJobsReportsRequest>;

export type GetJobsReportsResponse = Report;
export const GetJobsReportsResponse = Report;

export type GetJobsReportsError = CommonErrors;

/** Gets the metadata of a specific report. */
export const getJobsReports: API.OperationMethod<GetJobsReportsRequest, GetJobsReportsResponse, GetJobsReportsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetJobsReportsRequest,
  output: GetJobsReportsResponse,
  errors: [],
}));

export interface ListJobsReportsRequest {
  /** A token identifying a page of results the server should return. Typically, this is the value of ListReportsResponse.next_page_token returned in response to the previous call to the `ListReports` method. */
  pageToken?: string;
  /** If set, only reports created after the specified date/time are returned. */
  createdAfter?: string;
  /** If set, only reports whose start time is greater than or equal the specified date/time are returned. */
  startTimeAtOrAfter?: string;
  /** The content owner's external ID on which behalf the user is acting on. If not set, the user is acting for himself (his own channel). */
  onBehalfOfContentOwner?: string;
  /** The ID of the job. */
  jobId: string;
  /** If set, only reports whose start time is smaller than the specified date/time are returned. */
  startTimeBefore?: string;
  /** Requested page size. Server may return fewer report types than requested. If unspecified, server will pick an appropriate default. */
  pageSize?: number;
}

export const ListJobsReportsRequest = Schema.Struct({
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  createdAfter: Schema.optional(Schema.String).pipe(T.HttpQuery("createdAfter")),
  startTimeAtOrAfter: Schema.optional(Schema.String).pipe(T.HttpQuery("startTimeAtOrAfter")),
  onBehalfOfContentOwner: Schema.optional(Schema.String).pipe(T.HttpQuery("onBehalfOfContentOwner")),
  jobId: Schema.String.pipe(T.HttpPath("jobId")),
  startTimeBefore: Schema.optional(Schema.String).pipe(T.HttpQuery("startTimeBefore")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v1/jobs/{jobId}/reports" }),
  svc,
) as unknown as Schema.Schema<ListJobsReportsRequest>;

export type ListJobsReportsResponse = ListReportsResponse;
export const ListJobsReportsResponse = ListReportsResponse;

export type ListJobsReportsError = CommonErrors;

/** Lists reports created by a specific job. Returns NOT_FOUND if the job does not exist. */
export const listJobsReports: API.PaginatedOperationMethod<ListJobsReportsRequest, ListJobsReportsResponse, ListJobsReportsError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListJobsReportsRequest,
  output: ListJobsReportsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

