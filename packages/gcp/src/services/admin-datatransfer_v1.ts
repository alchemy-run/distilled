// ==========================================================================
// Admin SDK API (admin datatransfer_v1)
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
  name: "admin",
  version: "datatransfer_v1",
  rootUrl: "https://admin.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface ApplicationTransferParam {
  /** The type of the transfer parameter, such as `PRIVACY_LEVEL`. */
  key?: string;
  /** The value of the transfer parameter, such as `PRIVATE` or `SHARED`. */
  value?: Array<string>;
}

export const ApplicationTransferParam: Schema.Schema<ApplicationTransferParam> =
  Schema.suspend(() =>
    Schema.Struct({
      key: Schema.optional(Schema.String),
      value: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "ApplicationTransferParam",
  }) as any as Schema.Schema<ApplicationTransferParam>;

export interface Application {
  /** The application's ID. Retrievable by using the [`applications.list()`](https://developers.google.com/workspace/admin/data-transfer/reference/rest/v1/applications/list) method. */
  id?: string;
  /** The application's name. */
  name?: string;
  /** The list of all possible transfer parameters for this application. These parameters select which categories of the user's data to transfer. */
  transferParams?: Array<ApplicationTransferParam>;
  /** Identifies the resource as a DataTransfer Application Resource. */
  kind?: string;
  /** Etag of the resource. */
  etag?: string;
}

export const Application: Schema.Schema<Application> = Schema.suspend(() =>
  Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    transferParams: Schema.optional(Schema.Array(ApplicationTransferParam)),
    kind: Schema.optional(Schema.String),
    etag: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Application" }) as any as Schema.Schema<Application>;

export interface ApplicationsListResponse {
  /** Identifies the resource as a collection of Applications. */
  kind?: string;
  /** ETag of the resource. */
  etag?: string;
  /** The list of applications that support data transfer and are also installed for the customer. */
  applications?: Array<Application>;
  /** Token to specify the next page in the list. */
  nextPageToken?: string;
}

export const ApplicationsListResponse: Schema.Schema<ApplicationsListResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      kind: Schema.optional(Schema.String),
      etag: Schema.optional(Schema.String),
      applications: Schema.optional(Schema.Array(Application)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ApplicationsListResponse",
  }) as any as Schema.Schema<ApplicationsListResponse>;

export interface ApplicationDataTransfer {
  /** The application's ID. */
  applicationId?: string;
  /** The transfer parameters for the application. These parameters are used to select the data which will get transferred in context of this application. For more information about the specific values available for each application, see the [Transfer parameters](https://developers.google.com/workspace/admin/data-transfer/v1/parameters) reference. */
  applicationTransferParams?: Array<ApplicationTransferParam>;
  /** Read-only. Current status of transfer for this application. */
  applicationTransferStatus?: string;
}

export const ApplicationDataTransfer: Schema.Schema<ApplicationDataTransfer> =
  Schema.suspend(() =>
    Schema.Struct({
      applicationId: Schema.optional(Schema.String),
      applicationTransferParams: Schema.optional(
        Schema.Array(ApplicationTransferParam),
      ),
      applicationTransferStatus: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ApplicationDataTransfer",
  }) as any as Schema.Schema<ApplicationDataTransfer>;

export interface DataTransfer {
  /** Read-only. The transfer's ID. */
  id?: string;
  /** ID of the user whose data is being transferred. */
  oldOwnerUserId?: string;
  /** ID of the user to whom the data is being transferred. */
  newOwnerUserId?: string;
  /** The list of per-application data transfer resources. It contains details of the applications associated with this transfer resource, and also specifies the applications for which data transfer has to be done at the time of the transfer resource creation. */
  applicationDataTransfers?: Array<ApplicationDataTransfer>;
  /** Read-only. Overall transfer status. */
  overallTransferStatusCode?: string;
  /** Identifies the resource as a DataTransfer request. */
  kind?: string;
  /** ETag of the resource. */
  etag?: string;
  /** Read-only. The time at which the data transfer was requested. */
  requestTime?: string;
}

export const DataTransfer: Schema.Schema<DataTransfer> = Schema.suspend(() =>
  Schema.Struct({
    id: Schema.optional(Schema.String),
    oldOwnerUserId: Schema.optional(Schema.String),
    newOwnerUserId: Schema.optional(Schema.String),
    applicationDataTransfers: Schema.optional(
      Schema.Array(ApplicationDataTransfer),
    ),
    overallTransferStatusCode: Schema.optional(Schema.String),
    kind: Schema.optional(Schema.String),
    etag: Schema.optional(Schema.String),
    requestTime: Schema.optional(Schema.String),
  }),
).annotate({
  identifier: "DataTransfer",
}) as any as Schema.Schema<DataTransfer>;

export interface DataTransfersListResponse {
  /** Identifies the resource as a collection of data transfer requests. */
  kind?: string;
  /** ETag of the resource. */
  etag?: string;
  /** List of data transfer requests. */
  dataTransfers?: Array<DataTransfer>;
  /** Token to specify the next page in the list. */
  nextPageToken?: string;
}

export const DataTransfersListResponse: Schema.Schema<DataTransfersListResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      kind: Schema.optional(Schema.String),
      etag: Schema.optional(Schema.String),
      dataTransfers: Schema.optional(Schema.Array(DataTransfer)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "DataTransfersListResponse",
  }) as any as Schema.Schema<DataTransfersListResponse>;

// ==========================================================================
// Operations
// ==========================================================================

export interface GetApplicationsRequest {
  /** ID of the application resource to be retrieved. */
  applicationId: string;
}

export const GetApplicationsRequest = Schema.Struct({
  applicationId: Schema.String.pipe(T.HttpPath("applicationId")),
}).pipe(
  T.Http({
    method: "GET",
    path: "admin/datatransfer/v1/applications/{applicationId}",
  }),
  svc,
) as unknown as Schema.Schema<GetApplicationsRequest>;

export type GetApplicationsResponse = Application;
export const GetApplicationsResponse = Application;

export type GetApplicationsError = DefaultErrors;

/** Retrieves information about an application for the given application ID. */
export const getApplications: API.OperationMethod<
  GetApplicationsRequest,
  GetApplicationsResponse,
  GetApplicationsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetApplicationsRequest,
  output: GetApplicationsResponse,
  errors: [],
}));

export interface ListApplicationsRequest {
  /** Immutable ID of the Google Workspace account. */
  customerId?: string;
  /** Maximum number of results to return. Default is 100. */
  maxResults?: number;
  /** Token to specify next page in the list. */
  pageToken?: string;
}

export const ListApplicationsRequest = Schema.Struct({
  customerId: Schema.optional(Schema.String).pipe(T.HttpQuery("customerId")),
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "admin/datatransfer/v1/applications" }),
  svc,
) as unknown as Schema.Schema<ListApplicationsRequest>;

export type ListApplicationsResponse = ApplicationsListResponse;
export const ListApplicationsResponse = ApplicationsListResponse;

export type ListApplicationsError = DefaultErrors;

/** Lists the applications available for data transfer for a customer. */
export const listApplications: API.PaginatedOperationMethod<
  ListApplicationsRequest,
  ListApplicationsResponse,
  ListApplicationsError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListApplicationsRequest,
  output: ListApplicationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetTransfersRequest {
  /** ID of the resource to be retrieved. This is returned in the response from the insert method. */
  dataTransferId: string;
}

export const GetTransfersRequest = Schema.Struct({
  dataTransferId: Schema.String.pipe(T.HttpPath("dataTransferId")),
}).pipe(
  T.Http({
    method: "GET",
    path: "admin/datatransfer/v1/transfers/{dataTransferId}",
  }),
  svc,
) as unknown as Schema.Schema<GetTransfersRequest>;

export type GetTransfersResponse = DataTransfer;
export const GetTransfersResponse = DataTransfer;

export type GetTransfersError = DefaultErrors;

/** Retrieves a data transfer request by its resource ID. */
export const getTransfers: API.OperationMethod<
  GetTransfersRequest,
  GetTransfersResponse,
  GetTransfersError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetTransfersRequest,
  output: GetTransfersResponse,
  errors: [],
}));

export interface InsertTransfersRequest {
  /** Request body */
  body?: DataTransfer;
}

export const InsertTransfersRequest = Schema.Struct({
  body: Schema.optional(DataTransfer).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "admin/datatransfer/v1/transfers",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<InsertTransfersRequest>;

export type InsertTransfersResponse = DataTransfer;
export const InsertTransfersResponse = DataTransfer;

export type InsertTransfersError = DefaultErrors;

/** Inserts a data transfer request. See the [Transfer parameters](https://developers.google.com/workspace/admin/data-transfer/v1/parameters) reference for specific application requirements. */
export const insertTransfers: API.OperationMethod<
  InsertTransfersRequest,
  InsertTransfersResponse,
  InsertTransfersError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: InsertTransfersRequest,
  output: InsertTransfersResponse,
  errors: [],
}));

export interface ListTransfersRequest {
  /** Immutable ID of the Google Workspace account. */
  customerId?: string;
  /** Maximum number of results to return. Default is 100. */
  maxResults?: number;
  /** Destination user's profile ID. */
  newOwnerUserId?: string;
  /** Source user's profile ID. */
  oldOwnerUserId?: string;
  /** Token to specify the next page in the list. */
  pageToken?: string;
  /** Status of the transfer. */
  status?: string;
}

export const ListTransfersRequest = Schema.Struct({
  customerId: Schema.optional(Schema.String).pipe(T.HttpQuery("customerId")),
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  newOwnerUserId: Schema.optional(Schema.String).pipe(
    T.HttpQuery("newOwnerUserId"),
  ),
  oldOwnerUserId: Schema.optional(Schema.String).pipe(
    T.HttpQuery("oldOwnerUserId"),
  ),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  status: Schema.optional(Schema.String).pipe(T.HttpQuery("status")),
}).pipe(
  T.Http({ method: "GET", path: "admin/datatransfer/v1/transfers" }),
  svc,
) as unknown as Schema.Schema<ListTransfersRequest>;

export type ListTransfersResponse = DataTransfersListResponse;
export const ListTransfersResponse = DataTransfersListResponse;

export type ListTransfersError = DefaultErrors;

/** Lists the transfers for a customer by source user, destination user, or status. */
export const listTransfers: API.PaginatedOperationMethod<
  ListTransfersRequest,
  ListTransfersResponse,
  ListTransfersError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListTransfersRequest,
  output: ListTransfersResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));
