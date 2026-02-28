// ==========================================================================
// Data Portability API (dataportability v1)
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
  name: "dataportability",
  version: "v1",
  rootUrl: "https://dataportability.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface InitiatePortabilityArchiveRequest {
  /** The resources from which you're exporting data. These values have a 1:1 correspondence with the OAuth scopes. */
  resources?: Array<string>;
  /** Optional. The timestamp that represents the starting point for the data you are exporting. If the start_time is not specified in the InitiatePortabilityArchiveRequest, the field is set to the earliest available data. */
  startTime?: string;
  /** Optional. The timestamp that represents the end point for the data you are exporting. If the end_time is not specified in the InitiatePortabilityArchiveRequest, this field is set to the latest available data. */
  endTime?: string;
}

export const InitiatePortabilityArchiveRequest: Schema.Schema<InitiatePortabilityArchiveRequest> = Schema.suspend(() => Schema.Struct({
  resources: Schema.optional(Schema.Array(Schema.String)),
  startTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
})).annotate({ identifier: "InitiatePortabilityArchiveRequest" }) as any as Schema.Schema<InitiatePortabilityArchiveRequest>;

export interface InitiatePortabilityArchiveResponse {
  /** The archive job ID that is initiated in the API. This can be used to get the state of the job. */
  archiveJobId?: string;
  /** The access type of the Archive job initiated by the API. */
  accessType?: "ACCESS_TYPE_UNSPECIFIED" | "ACCESS_TYPE_ONE_TIME" | "ACCESS_TYPE_TIME_BASED" | (string & {});
}

export const InitiatePortabilityArchiveResponse: Schema.Schema<InitiatePortabilityArchiveResponse> = Schema.suspend(() => Schema.Struct({
  archiveJobId: Schema.optional(Schema.String),
  accessType: Schema.optional(Schema.String),
})).annotate({ identifier: "InitiatePortabilityArchiveResponse" }) as any as Schema.Schema<InitiatePortabilityArchiveResponse>;

export interface PortabilityArchiveState {
  /** Resource that represents the state of the Archive job. */
  state?: "STATE_UNSPECIFIED" | "IN_PROGRESS" | "COMPLETE" | "FAILED" | "CANCELLED" | (string & {});
  /** If the state is complete, this method returns the signed URLs of the objects in the Cloud Storage bucket. */
  urls?: Array<string>;
  /** The resource name of ArchiveJob's PortabilityArchiveState singleton. The format is: archiveJobs/{archive_job}/portabilityArchiveState. archive_job is the job ID provided in the request. */
  name?: string;
  /** The timestamp that represents the starting point for the data you are exporting. This field is set only if the start_time field is specified in the InitiatePortabilityArchiveRequest. */
  startTime?: string;
  /** The timestamp that represents the end point for the data you are exporting. If the end_time value is set in the InitiatePortabilityArchiveRequest, this field is set to that value. If end_time is not set, this value is set to the time the export was requested. */
  exportTime?: string;
}

export const PortabilityArchiveState: Schema.Schema<PortabilityArchiveState> = Schema.suspend(() => Schema.Struct({
  state: Schema.optional(Schema.String),
  urls: Schema.optional(Schema.Array(Schema.String)),
  name: Schema.optional(Schema.String),
  startTime: Schema.optional(Schema.String),
  exportTime: Schema.optional(Schema.String),
})).annotate({ identifier: "PortabilityArchiveState" }) as any as Schema.Schema<PortabilityArchiveState>;

export interface ResetAuthorizationRequest {
}

export const ResetAuthorizationRequest: Schema.Schema<ResetAuthorizationRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "ResetAuthorizationRequest" }) as any as Schema.Schema<ResetAuthorizationRequest>;

export interface Empty {
}

export const Empty: Schema.Schema<Empty> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "Empty" }) as any as Schema.Schema<Empty>;

export interface RetryPortabilityArchiveRequest {
}

export const RetryPortabilityArchiveRequest: Schema.Schema<RetryPortabilityArchiveRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "RetryPortabilityArchiveRequest" }) as any as Schema.Schema<RetryPortabilityArchiveRequest>;

export interface RetryPortabilityArchiveResponse {
  /** The archive job ID that is initiated by the retry endpoint. This can be used to get the state of the new job. */
  archiveJobId?: string;
}

export const RetryPortabilityArchiveResponse: Schema.Schema<RetryPortabilityArchiveResponse> = Schema.suspend(() => Schema.Struct({
  archiveJobId: Schema.optional(Schema.String),
})).annotate({ identifier: "RetryPortabilityArchiveResponse" }) as any as Schema.Schema<RetryPortabilityArchiveResponse>;

export interface CancelPortabilityArchiveRequest {
}

export const CancelPortabilityArchiveRequest: Schema.Schema<CancelPortabilityArchiveRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "CancelPortabilityArchiveRequest" }) as any as Schema.Schema<CancelPortabilityArchiveRequest>;

export interface CancelPortabilityArchiveResponse {
}

export const CancelPortabilityArchiveResponse: Schema.Schema<CancelPortabilityArchiveResponse> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "CancelPortabilityArchiveResponse" }) as any as Schema.Schema<CancelPortabilityArchiveResponse>;

export interface CheckAccessTypeRequest {
}

export const CheckAccessTypeRequest: Schema.Schema<CheckAccessTypeRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "CheckAccessTypeRequest" }) as any as Schema.Schema<CheckAccessTypeRequest>;

export interface CheckAccessTypeResponse {
  /** Jobs initiated with this token will be time-based if all requested resources have time-based access. */
  timeBasedResources?: Array<string>;
  /** Jobs initiated with this token will be one-time if any requested resources have one-time access. */
  oneTimeResources?: Array<string>;
}

export const CheckAccessTypeResponse: Schema.Schema<CheckAccessTypeResponse> = Schema.suspend(() => Schema.Struct({
  timeBasedResources: Schema.optional(Schema.Array(Schema.String)),
  oneTimeResources: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "CheckAccessTypeResponse" }) as any as Schema.Schema<CheckAccessTypeResponse>;

// ==========================================================================
// Operations
// ==========================================================================

/** Initiates a new Archive job for the Portability API. */
export interface InitiatePortabilityArchiveRequest_Op {
  /** Request body */
  body?: InitiatePortabilityArchiveRequest;
}

export const InitiatePortabilityArchiveRequest_Op = Schema.Struct({
  body: Schema.optional(InitiatePortabilityArchiveRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/portabilityArchive:initiate", hasBody: true }),
  svc,
) as unknown as Schema.Schema<InitiatePortabilityArchiveRequest_Op>;

export type InitiatePortabilityArchiveResponse_Op = InitiatePortabilityArchiveResponse;
export const InitiatePortabilityArchiveResponse_Op = InitiatePortabilityArchiveResponse;

export type InitiatePortabilityArchiveError = CommonErrors;

export const initiatePortabilityArchive: API.OperationMethod<InitiatePortabilityArchiveRequest_Op, InitiatePortabilityArchiveResponse_Op, InitiatePortabilityArchiveError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: InitiatePortabilityArchiveRequest_Op,
  output: InitiatePortabilityArchiveResponse_Op,
  errors: [],
}));

/** Retrieves the state of an Archive job for the Portability API. */
export interface GetPortabilityArchiveStateArchiveJobsRequest {
  /** Required. The archive job ID that is returned when you request the state of the job. The format is: archiveJobs/{archive_job}/portabilityArchiveState. archive_job is the job ID returned by the InitiatePortabilityArchiveResponse. */
  name: string;
}

export const GetPortabilityArchiveStateArchiveJobsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/archiveJobs/{archiveJobsId}/portabilityArchiveState" }),
  svc,
) as unknown as Schema.Schema<GetPortabilityArchiveStateArchiveJobsRequest>;

export type GetPortabilityArchiveStateArchiveJobsResponse = PortabilityArchiveState;
export const GetPortabilityArchiveStateArchiveJobsResponse = PortabilityArchiveState;

export type GetPortabilityArchiveStateArchiveJobsError = CommonErrors;

export const getPortabilityArchiveStateArchiveJobs: API.OperationMethod<GetPortabilityArchiveStateArchiveJobsRequest, GetPortabilityArchiveStateArchiveJobsResponse, GetPortabilityArchiveStateArchiveJobsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetPortabilityArchiveStateArchiveJobsRequest,
  output: GetPortabilityArchiveStateArchiveJobsResponse,
  errors: [],
}));

/** Retries a failed Portability Archive job. */
export interface RetryArchiveJobsRequest {
  /** Required. The Archive job ID you're retrying. This is returned by the InitiatePortabilityArchiveResponse. Retrying is only executed if the initial job failed. */
  name: string;
  /** Request body */
  body?: RetryPortabilityArchiveRequest;
}

export const RetryArchiveJobsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(RetryPortabilityArchiveRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/archiveJobs/{archiveJobsId}:retry", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RetryArchiveJobsRequest>;

export type RetryArchiveJobsResponse = RetryPortabilityArchiveResponse;
export const RetryArchiveJobsResponse = RetryPortabilityArchiveResponse;

export type RetryArchiveJobsError = CommonErrors;

export const retryArchiveJobs: API.OperationMethod<RetryArchiveJobsRequest, RetryArchiveJobsResponse, RetryArchiveJobsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RetryArchiveJobsRequest,
  output: RetryArchiveJobsResponse,
  errors: [],
}));

/** Cancels a Portability Archive job. */
export interface CancelArchiveJobsRequest {
  /** Required. The Archive job ID you're canceling. This is returned by the InitiatePortabilityArchive response. The format is: archiveJobs/{archive_job}. Canceling is only executed if the job is in progress. */
  name: string;
  /** Request body */
  body?: CancelPortabilityArchiveRequest;
}

export const CancelArchiveJobsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(CancelPortabilityArchiveRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/archiveJobs/{archiveJobsId}:cancel", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CancelArchiveJobsRequest>;

export type CancelArchiveJobsResponse = CancelPortabilityArchiveResponse;
export const CancelArchiveJobsResponse = CancelPortabilityArchiveResponse;

export type CancelArchiveJobsError = CommonErrors;

export const cancelArchiveJobs: API.OperationMethod<CancelArchiveJobsRequest, CancelArchiveJobsResponse, CancelArchiveJobsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CancelArchiveJobsRequest,
  output: CancelArchiveJobsResponse,
  errors: [],
}));

/** Revokes OAuth tokens and resets exhausted scopes for a user/project pair. This method allows you to initiate a request after a new consent is granted. This method also indicates that previous archives can be garbage collected. You should call this method when all jobs are complete and all archives are downloaded. Do not call it only when you start a new job. */
export interface ResetAuthorizationRequest_Op {
  /** Request body */
  body?: ResetAuthorizationRequest;
}

export const ResetAuthorizationRequest_Op = Schema.Struct({
  body: Schema.optional(ResetAuthorizationRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/authorization:reset", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ResetAuthorizationRequest_Op>;

export type ResetAuthorizationResponse = Empty;
export const ResetAuthorizationResponse = Empty;

export type ResetAuthorizationError = CommonErrors;

export const resetAuthorization: API.OperationMethod<ResetAuthorizationRequest_Op, ResetAuthorizationResponse, ResetAuthorizationError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ResetAuthorizationRequest_Op,
  output: ResetAuthorizationResponse,
  errors: [],
}));

/** Gets the access type of the token. */
export interface CheckAccessTypeRequest_Op {
  /** Request body */
  body?: CheckAccessTypeRequest;
}

export const CheckAccessTypeRequest_Op = Schema.Struct({
  body: Schema.optional(CheckAccessTypeRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/accessType:check", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CheckAccessTypeRequest_Op>;

export type CheckAccessTypeResponse_Op = CheckAccessTypeResponse;
export const CheckAccessTypeResponse_Op = CheckAccessTypeResponse;

export type CheckAccessTypeError = CommonErrors;

export const checkAccessType: API.OperationMethod<CheckAccessTypeRequest_Op, CheckAccessTypeResponse_Op, CheckAccessTypeError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CheckAccessTypeRequest_Op,
  output: CheckAccessTypeResponse_Op,
  errors: [],
}));

