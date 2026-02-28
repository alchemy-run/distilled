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

export interface ReportType {
  /** The ID of the report type (max. 100 characters). */
  id?: string;
  /** The name of the report type (max. 100 characters). */
  name?: string;
  /** The date/time when this report type was/will be deprecated. */
  deprecateTime?: string;
  /** True if this a system-managed report type; otherwise false. Reporting jobs for system-managed report types are created automatically and can thus not be used in the `CreateJob` method. */
  systemManaged?: boolean;
}

export const ReportType: Schema.Schema<ReportType> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  deprecateTime: Schema.optional(Schema.String),
  systemManaged: Schema.optional(Schema.Boolean),
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

export interface Job {
  /** The server-generated ID of the job (max. 40 characters). */
  id?: string;
  /** The type of reports this job creates. Corresponds to the ID of a ReportType. */
  reportTypeId?: string;
  /** The name of the job (max. 100 characters). */
  name?: string;
  /** The creation date/time of the job. */
  createTime?: string;
  /** The date/time when this job will expire/expired. After a job expired, no new reports are generated. */
  expireTime?: string;
  /** True if this a system-managed job that cannot be modified by the user; otherwise false. */
  systemManaged?: boolean;
}

export const Job: Schema.Schema<Job> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  reportTypeId: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  expireTime: Schema.optional(Schema.String),
  systemManaged: Schema.optional(Schema.Boolean),
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

export interface Empty {
}

export const Empty: Schema.Schema<Empty> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "Empty" }) as any as Schema.Schema<Empty>;

export interface Report {
  /** The server-generated ID of the report. */
  id?: string;
  /** The ID of the job that created this report. */
  jobId?: string;
  /** The date/time when the job this report belongs to will expire/expired. */
  jobExpireTime?: string;
  /** The start of the time period that the report instance covers. The value is inclusive. */
  startTime?: string;
  /** The end of the time period that the report instance covers. The value is exclusive. */
  endTime?: string;
  /** The date/time when this report was created. */
  createTime?: string;
  /** The URL from which the report can be downloaded (max. 1000 characters). */
  downloadUrl?: string;
}

export const Report: Schema.Schema<Report> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  jobId: Schema.optional(Schema.String),
  jobExpireTime: Schema.optional(Schema.String),
  startTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  downloadUrl: Schema.optional(Schema.String),
})).annotate({ identifier: "Report" }) as any as Schema.Schema<Report>;

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

export interface GdataObjectId {
  /** gdata */
  bucketName?: string;
  /** gdata */
  objectName?: string;
  /** gdata */
  generation?: string;
}

export const GdataObjectId: Schema.Schema<GdataObjectId> = Schema.suspend(() => Schema.Struct({
  bucketName: Schema.optional(Schema.String),
  objectName: Schema.optional(Schema.String),
  generation: Schema.optional(Schema.String),
})).annotate({ identifier: "GdataObjectId" }) as any as Schema.Schema<GdataObjectId>;

export interface GdataBlobstore2Info {
  /** gdata */
  blobId?: string;
  /** gdata */
  blobGeneration?: string;
  /** gdata */
  readToken?: string;
  /** gdata */
  uploadMetadataContainer?: string;
  /** gdata */
  downloadReadHandle?: string;
  /** gdata */
  downloadExternalReadToken?: string;
  /** gdata */
  uploadFragmentListCreationInfo?: string;
}

export const GdataBlobstore2Info: Schema.Schema<GdataBlobstore2Info> = Schema.suspend(() => Schema.Struct({
  blobId: Schema.optional(Schema.String),
  blobGeneration: Schema.optional(Schema.String),
  readToken: Schema.optional(Schema.String),
  uploadMetadataContainer: Schema.optional(Schema.String),
  downloadReadHandle: Schema.optional(Schema.String),
  downloadExternalReadToken: Schema.optional(Schema.String),
  uploadFragmentListCreationInfo: Schema.optional(Schema.String),
})).annotate({ identifier: "GdataBlobstore2Info" }) as any as Schema.Schema<GdataBlobstore2Info>;

export interface GdataCompositeMedia {
  /** gdata */
  length?: string;
  /** gdata */
  referenceType?: "PATH" | "BLOB_REF" | "INLINE" | "BIGSTORE_REF" | "COSMO_BINARY_REFERENCE" | (string & {});
  /** gdata */
  path?: string;
  /** gdata */
  blobRef?: string;
  /** gdata */
  inline?: string;
  /** gdata */
  objectId?: GdataObjectId;
  /** gdata */
  blobstore2Info?: GdataBlobstore2Info;
  /** gdata */
  cosmoBinaryReference?: string;
  /** gdata */
  crc32cHash?: number;
  /** gdata */
  md5Hash?: string;
  /** gdata */
  sha1Hash?: string;
}

export const GdataCompositeMedia: Schema.Schema<GdataCompositeMedia> = Schema.suspend(() => Schema.Struct({
  length: Schema.optional(Schema.String),
  referenceType: Schema.optional(Schema.String),
  path: Schema.optional(Schema.String),
  blobRef: Schema.optional(Schema.String),
  inline: Schema.optional(Schema.String),
  objectId: Schema.optional(GdataObjectId),
  blobstore2Info: Schema.optional(GdataBlobstore2Info),
  cosmoBinaryReference: Schema.optional(Schema.String),
  crc32cHash: Schema.optional(Schema.Number),
  md5Hash: Schema.optional(Schema.String),
  sha1Hash: Schema.optional(Schema.String),
})).annotate({ identifier: "GdataCompositeMedia" }) as any as Schema.Schema<GdataCompositeMedia>;

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

export interface GdataDiffChecksumsResponse {
  /** gdata */
  objectVersion?: string;
  /** gdata */
  objectSizeBytes?: string;
  /** gdata */
  chunkSizeBytes?: string;
  /** gdata */
  checksumsLocation?: GdataCompositeMedia;
  /** gdata */
  objectLocation?: GdataCompositeMedia;
}

export const GdataDiffChecksumsResponse: Schema.Schema<GdataDiffChecksumsResponse> = Schema.suspend(() => Schema.Struct({
  objectVersion: Schema.optional(Schema.String),
  objectSizeBytes: Schema.optional(Schema.String),
  chunkSizeBytes: Schema.optional(Schema.String),
  checksumsLocation: Schema.optional(GdataCompositeMedia),
  objectLocation: Schema.optional(GdataCompositeMedia),
})).annotate({ identifier: "GdataDiffChecksumsResponse" }) as any as Schema.Schema<GdataDiffChecksumsResponse>;

export interface GdataDiffDownloadResponse {
  /** gdata */
  objectLocation?: GdataCompositeMedia;
}

export const GdataDiffDownloadResponse: Schema.Schema<GdataDiffDownloadResponse> = Schema.suspend(() => Schema.Struct({
  objectLocation: Schema.optional(GdataCompositeMedia),
})).annotate({ identifier: "GdataDiffDownloadResponse" }) as any as Schema.Schema<GdataDiffDownloadResponse>;

export interface GdataDiffUploadRequest {
  /** gdata */
  objectVersion?: string;
  /** gdata */
  objectInfo?: GdataCompositeMedia;
  /** gdata */
  checksumsInfo?: GdataCompositeMedia;
}

export const GdataDiffUploadRequest: Schema.Schema<GdataDiffUploadRequest> = Schema.suspend(() => Schema.Struct({
  objectVersion: Schema.optional(Schema.String),
  objectInfo: Schema.optional(GdataCompositeMedia),
  checksumsInfo: Schema.optional(GdataCompositeMedia),
})).annotate({ identifier: "GdataDiffUploadRequest" }) as any as Schema.Schema<GdataDiffUploadRequest>;

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

export interface GdataContentTypeInfo {
  /** gdata */
  bestGuess?: string;
  /** gdata */
  fromHeader?: string;
  /** gdata */
  fromFileName?: string;
  /** gdata */
  fromUrlPath?: string;
  /** gdata */
  fromBytes?: string;
}

export const GdataContentTypeInfo: Schema.Schema<GdataContentTypeInfo> = Schema.suspend(() => Schema.Struct({
  bestGuess: Schema.optional(Schema.String),
  fromHeader: Schema.optional(Schema.String),
  fromFileName: Schema.optional(Schema.String),
  fromUrlPath: Schema.optional(Schema.String),
  fromBytes: Schema.optional(Schema.String),
})).annotate({ identifier: "GdataContentTypeInfo" }) as any as Schema.Schema<GdataContentTypeInfo>;

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

export interface GdataMedia {
  /** gdata */
  contentType?: string;
  /** gdata */
  timestamp?: string;
  /** gdata */
  token?: string;
  /** gdata */
  length?: string;
  /** gdata */
  filename?: string;
  /** gdata */
  referenceType?: "PATH" | "BLOB_REF" | "INLINE" | "GET_MEDIA" | "COMPOSITE_MEDIA" | "BIGSTORE_REF" | "DIFF_VERSION_RESPONSE" | "DIFF_CHECKSUMS_RESPONSE" | "DIFF_DOWNLOAD_RESPONSE" | "DIFF_UPLOAD_REQUEST" | "DIFF_UPLOAD_RESPONSE" | "COSMO_BINARY_REFERENCE" | "ARBITRARY_BYTES" | (string & {});
  /** gdata */
  path?: string;
  /** gdata */
  blobRef?: string;
  /** gdata */
  inline?: string;
  /** gdata */
  mediaId?: string;
  /** gdata */
  hash?: string;
  /** gdata */
  algorithm?: string;
  /** gdata */
  compositeMedia?: Array<GdataCompositeMedia>;
  /** gdata */
  bigstoreObjectRef?: string;
  /** gdata */
  objectId?: GdataObjectId;
  /** gdata */
  blobstore2Info?: GdataBlobstore2Info;
  /** gdata */
  diffVersionResponse?: GdataDiffVersionResponse;
  /** gdata */
  diffChecksumsResponse?: GdataDiffChecksumsResponse;
  /** gdata */
  diffDownloadResponse?: GdataDiffDownloadResponse;
  /** gdata */
  diffUploadRequest?: GdataDiffUploadRequest;
  /** gdata */
  diffUploadResponse?: GdataDiffUploadResponse;
  /** gdata */
  contentTypeInfo?: GdataContentTypeInfo;
  /** gdata */
  downloadParameters?: GdataDownloadParameters;
  /** gdata */
  crc32cHash?: number;
  /** gdata */
  md5Hash?: string;
  /** gdata */
  sha1Hash?: string;
  /** gdata */
  sha256Hash?: string;
  /** gdata */
  isPotentialRetry?: boolean;
  /** gdata */
  cosmoBinaryReference?: string;
  /** gdata */
  hashVerified?: boolean;
}

export const GdataMedia: Schema.Schema<GdataMedia> = Schema.suspend(() => Schema.Struct({
  contentType: Schema.optional(Schema.String),
  timestamp: Schema.optional(Schema.String),
  token: Schema.optional(Schema.String),
  length: Schema.optional(Schema.String),
  filename: Schema.optional(Schema.String),
  referenceType: Schema.optional(Schema.String),
  path: Schema.optional(Schema.String),
  blobRef: Schema.optional(Schema.String),
  inline: Schema.optional(Schema.String),
  mediaId: Schema.optional(Schema.String),
  hash: Schema.optional(Schema.String),
  algorithm: Schema.optional(Schema.String),
  compositeMedia: Schema.optional(Schema.Array(GdataCompositeMedia)),
  bigstoreObjectRef: Schema.optional(Schema.String),
  objectId: Schema.optional(GdataObjectId),
  blobstore2Info: Schema.optional(GdataBlobstore2Info),
  diffVersionResponse: Schema.optional(GdataDiffVersionResponse),
  diffChecksumsResponse: Schema.optional(GdataDiffChecksumsResponse),
  diffDownloadResponse: Schema.optional(GdataDiffDownloadResponse),
  diffUploadRequest: Schema.optional(GdataDiffUploadRequest),
  diffUploadResponse: Schema.optional(GdataDiffUploadResponse),
  contentTypeInfo: Schema.optional(GdataContentTypeInfo),
  downloadParameters: Schema.optional(GdataDownloadParameters),
  crc32cHash: Schema.optional(Schema.Number),
  md5Hash: Schema.optional(Schema.String),
  sha1Hash: Schema.optional(Schema.String),
  sha256Hash: Schema.optional(Schema.String),
  isPotentialRetry: Schema.optional(Schema.Boolean),
  cosmoBinaryReference: Schema.optional(Schema.String),
  hashVerified: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GdataMedia" }) as any as Schema.Schema<GdataMedia>;

// ==========================================================================
// Operations
// ==========================================================================

/** Lists report types. */
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

export const ListReportTypesRequest = Schema.Struct({
  onBehalfOfContentOwner: Schema.optional(Schema.String).pipe(T.HttpQuery("onBehalfOfContentOwner")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  includeSystemManaged: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("includeSystemManaged")),
}).pipe(
  T.Http({ method: "GET", path: "v1/reportTypes" }),
  svc,
) as unknown as Schema.Schema<ListReportTypesRequest>;

export type ListReportTypesResponse_Op = ListReportTypesResponse;
export const ListReportTypesResponse_Op = ListReportTypesResponse;

export type ListReportTypesError = CommonErrors;

export const listReportTypes = API.makePaginated(() => ({
  input: ListReportTypesRequest,
  output: ListReportTypesResponse_Op,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Creates a job and returns it. */
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

export const createJobs: API.OperationMethod<CreateJobsRequest, CreateJobsResponse, CreateJobsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateJobsRequest,
  output: CreateJobsResponse,
  errors: [],
}));

/** Lists jobs. */
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

export const ListJobsRequest = Schema.Struct({
  onBehalfOfContentOwner: Schema.optional(Schema.String).pipe(T.HttpQuery("onBehalfOfContentOwner")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  includeSystemManaged: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("includeSystemManaged")),
}).pipe(
  T.Http({ method: "GET", path: "v1/jobs" }),
  svc,
) as unknown as Schema.Schema<ListJobsRequest>;

export type ListJobsResponse_Op = ListJobsResponse;
export const ListJobsResponse_Op = ListJobsResponse;

export type ListJobsError = CommonErrors;

export const listJobs = API.makePaginated(() => ({
  input: ListJobsRequest,
  output: ListJobsResponse_Op,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets a job. */
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

export const getJobs: API.OperationMethod<GetJobsRequest, GetJobsResponse, GetJobsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetJobsRequest,
  output: GetJobsResponse,
  errors: [],
}));

/** Deletes a job. */
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

export const deleteJobs: API.OperationMethod<DeleteJobsRequest, DeleteJobsResponse, DeleteJobsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteJobsRequest,
  output: DeleteJobsResponse,
  errors: [],
}));

/** Lists reports created by a specific job. Returns NOT_FOUND if the job does not exist. */
export interface ListJobsReportsRequest {
  /** The ID of the job. */
  jobId: string;
  /** The content owner's external ID on which behalf the user is acting on. If not set, the user is acting for himself (his own channel). */
  onBehalfOfContentOwner?: string;
  /** Requested page size. Server may return fewer report types than requested. If unspecified, server will pick an appropriate default. */
  pageSize?: number;
  /** A token identifying a page of results the server should return. Typically, this is the value of ListReportsResponse.next_page_token returned in response to the previous call to the `ListReports` method. */
  pageToken?: string;
  /** If set, only reports created after the specified date/time are returned. */
  createdAfter?: string;
  /** If set, only reports whose start time is greater than or equal the specified date/time are returned. */
  startTimeAtOrAfter?: string;
  /** If set, only reports whose start time is smaller than the specified date/time are returned. */
  startTimeBefore?: string;
}

export const ListJobsReportsRequest = Schema.Struct({
  jobId: Schema.String.pipe(T.HttpPath("jobId")),
  onBehalfOfContentOwner: Schema.optional(Schema.String).pipe(T.HttpQuery("onBehalfOfContentOwner")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  createdAfter: Schema.optional(Schema.String).pipe(T.HttpQuery("createdAfter")),
  startTimeAtOrAfter: Schema.optional(Schema.String).pipe(T.HttpQuery("startTimeAtOrAfter")),
  startTimeBefore: Schema.optional(Schema.String).pipe(T.HttpQuery("startTimeBefore")),
}).pipe(
  T.Http({ method: "GET", path: "v1/jobs/{jobId}/reports" }),
  svc,
) as unknown as Schema.Schema<ListJobsReportsRequest>;

export type ListJobsReportsResponse = ListReportsResponse;
export const ListJobsReportsResponse = ListReportsResponse;

export type ListJobsReportsError = CommonErrors;

export const listJobsReports = API.makePaginated(() => ({
  input: ListJobsReportsRequest,
  output: ListJobsReportsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets the metadata of a specific report. */
export interface GetJobsReportsRequest {
  /** The ID of the job. */
  jobId: string;
  /** The ID of the report to retrieve. */
  reportId: string;
  /** The content owner's external ID on which behalf the user is acting on. If not set, the user is acting for himself (his own channel). */
  onBehalfOfContentOwner?: string;
}

export const GetJobsReportsRequest = Schema.Struct({
  jobId: Schema.String.pipe(T.HttpPath("jobId")),
  reportId: Schema.String.pipe(T.HttpPath("reportId")),
  onBehalfOfContentOwner: Schema.optional(Schema.String).pipe(T.HttpQuery("onBehalfOfContentOwner")),
}).pipe(
  T.Http({ method: "GET", path: "v1/jobs/{jobId}/reports/{reportId}" }),
  svc,
) as unknown as Schema.Schema<GetJobsReportsRequest>;

export type GetJobsReportsResponse = Report;
export const GetJobsReportsResponse = Report;

export type GetJobsReportsError = CommonErrors;

export const getJobsReports: API.OperationMethod<GetJobsReportsRequest, GetJobsReportsResponse, GetJobsReportsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetJobsReportsRequest,
  output: GetJobsReportsResponse,
  errors: [],
}));

/** Method for media download. Download is supported on the URI `/v1/media/{+name}?alt=media`. */
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

export const downloadMedia: API.OperationMethod<DownloadMediaRequest, DownloadMediaResponse, DownloadMediaError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DownloadMediaRequest,
  output: DownloadMediaResponse,
  errors: [],
}));

