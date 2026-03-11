// ==========================================================================
// Firebase Realtime Database Management API (firebasedatabase v1beta)
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
  name: "firebasedatabase",
  version: "v1beta",
  rootUrl: "https://firebasedatabase.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface UndeleteDatabaseInstanceRequest {}

export const UndeleteDatabaseInstanceRequest: Schema.Schema<UndeleteDatabaseInstanceRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "UndeleteDatabaseInstanceRequest",
  }) as any as Schema.Schema<UndeleteDatabaseInstanceRequest>;

export interface DatabaseInstance {
  /** Output only. The resource name of the project this instance belongs to. For example: `projects/{project-number}`. */
  project?: string;
  /** Output only. Output Only. The globally unique hostname of the database. */
  databaseUrl?: string;
  /** The fully qualified resource name of the database instance, in the form: `projects/{project-number}/locations/{location-id}/instances/{database-id}`. */
  name?: string;
  /** Immutable. The database instance type. On creation only USER_DATABASE is allowed, which is also the default when omitted. */
  type?:
    | "DATABASE_INSTANCE_TYPE_UNSPECIFIED"
    | "DEFAULT_DATABASE"
    | "USER_DATABASE"
    | (string & {});
  /** Output only. The database's lifecycle state. Read-only. */
  state?:
    | "LIFECYCLE_STATE_UNSPECIFIED"
    | "ACTIVE"
    | "DISABLED"
    | "DELETED"
    | (string & {});
}

export const DatabaseInstance: Schema.Schema<DatabaseInstance> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      project: Schema.optional(Schema.String),
      databaseUrl: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
      type: Schema.optional(Schema.String),
      state: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "DatabaseInstance",
  }) as any as Schema.Schema<DatabaseInstance>;

export interface ListDatabaseInstancesResponse {
  /** If the result list is too large to fit in a single response, then a token is returned. If the string is empty, then this response is the last page of results. This token can be used in a subsequent call to `ListDatabaseInstances` to find the next group of database instances. Page tokens are short-lived and should not be persisted. */
  nextPageToken?: string;
  /** List of each DatabaseInstance that is in the parent Firebase project. */
  instances?: Array<DatabaseInstance>;
}

export const ListDatabaseInstancesResponse: Schema.Schema<ListDatabaseInstancesResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      nextPageToken: Schema.optional(Schema.String),
      instances: Schema.optional(Schema.Array(DatabaseInstance)),
    }),
  ).annotate({
    identifier: "ListDatabaseInstancesResponse",
  }) as any as Schema.Schema<ListDatabaseInstancesResponse>;

export interface DisableDatabaseInstanceRequest {}

export const DisableDatabaseInstanceRequest: Schema.Schema<DisableDatabaseInstanceRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "DisableDatabaseInstanceRequest",
  }) as any as Schema.Schema<DisableDatabaseInstanceRequest>;

export interface ReenableDatabaseInstanceRequest {}

export const ReenableDatabaseInstanceRequest: Schema.Schema<ReenableDatabaseInstanceRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "ReenableDatabaseInstanceRequest",
  }) as any as Schema.Schema<ReenableDatabaseInstanceRequest>;

// ==========================================================================
// Operations
// ==========================================================================

export interface ListProjectsLocationsInstancesRequest {
  /** The maximum number of database instances to return in the response. The server may return fewer than this at its discretion. If no value is specified (or too large a value is specified), then the server will impose its own limit. */
  pageSize?: number;
  /** Indicate that DatabaseInstances in the `DELETED` state should also be returned. */
  showDeleted?: boolean;
  /** Required. The parent project for which to list database instances, in the form: `projects/{project-number}/locations/{location-id}` To list across all locations, use a parent in the form: `projects/{project-number}/locations/-` */
  parent: string;
  /** Token returned from a previous call to `ListDatabaseInstances` indicating where in the set of database instances to resume listing. */
  pageToken?: string;
}

export const ListProjectsLocationsInstancesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    showDeleted: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("showDeleted"),
    ),
    parent: Schema.String.pipe(T.HttpPath("parent")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta/projects/{projectsId}/locations/{locationsId}/instances",
    }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsLocationsInstancesRequest>;

export type ListProjectsLocationsInstancesResponse =
  ListDatabaseInstancesResponse;
export const ListProjectsLocationsInstancesResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListDatabaseInstancesResponse;

export type ListProjectsLocationsInstancesError = DefaultErrors;

/** Lists each DatabaseInstance associated with the specified parent project. The list items are returned in no particular order, but will be a consistent view of the database instances when additional requests are made with a `pageToken`. The resulting list contains instances in any STATE. The list results may be stale by a few seconds. Use GetDatabaseInstance for consistent reads. */
export const listProjectsLocationsInstances: API.PaginatedOperationMethod<
  ListProjectsLocationsInstancesRequest,
  ListProjectsLocationsInstancesResponse,
  ListProjectsLocationsInstancesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListProjectsLocationsInstancesRequest,
  output: ListProjectsLocationsInstancesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface DeleteProjectsLocationsInstancesRequest {
  /** Required. The fully qualified resource name of the database instance, in the form: `projects/{project-number}/locations/{location-id}/instances/{database-id}` */
  name: string;
}

export const DeleteProjectsLocationsInstancesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v1beta/projects/{projectsId}/locations/{locationsId}/instances/{instancesId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteProjectsLocationsInstancesRequest>;

export type DeleteProjectsLocationsInstancesResponse = DatabaseInstance;
export const DeleteProjectsLocationsInstancesResponse =
  /*@__PURE__*/ /*#__PURE__*/ DatabaseInstance;

export type DeleteProjectsLocationsInstancesError = DefaultErrors;

/** Marks a DatabaseInstance to be deleted. The DatabaseInstance will be set to the DELETED state for 20 days, and will be purged within 30 days. The default database cannot be deleted. IDs for deleted database instances may never be recovered or re-used. The Database may only be deleted if it is already in a DISABLED state. */
export const deleteProjectsLocationsInstances: API.OperationMethod<
  DeleteProjectsLocationsInstancesRequest,
  DeleteProjectsLocationsInstancesResponse,
  DeleteProjectsLocationsInstancesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteProjectsLocationsInstancesRequest,
  output: DeleteProjectsLocationsInstancesResponse,
  errors: [],
}));

export interface UndeleteProjectsLocationsInstancesRequest {
  /** Required. The fully qualified resource name of the database instance, in the form: `projects/{project-number}/locations/{location-id}/instances/{database-id}` */
  name: string;
  /** Request body */
  body?: UndeleteDatabaseInstanceRequest;
}

export const UndeleteProjectsLocationsInstancesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    body: Schema.optional(UndeleteDatabaseInstanceRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta/projects/{projectsId}/locations/{locationsId}/instances/{instancesId}:undelete",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<UndeleteProjectsLocationsInstancesRequest>;

export type UndeleteProjectsLocationsInstancesResponse = DatabaseInstance;
export const UndeleteProjectsLocationsInstancesResponse =
  /*@__PURE__*/ /*#__PURE__*/ DatabaseInstance;

export type UndeleteProjectsLocationsInstancesError = DefaultErrors;

/** Restores a DatabaseInstance that was previously marked to be deleted. After the delete method is used, DatabaseInstances are set to the DELETED state for 20 days, and will be purged within 30 days. Databases in the DELETED state can be undeleted without losing any data. This method may only be used on a DatabaseInstance in the DELETED state. Purged DatabaseInstances may not be recovered. */
export const undeleteProjectsLocationsInstances: API.OperationMethod<
  UndeleteProjectsLocationsInstancesRequest,
  UndeleteProjectsLocationsInstancesResponse,
  UndeleteProjectsLocationsInstancesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UndeleteProjectsLocationsInstancesRequest,
  output: UndeleteProjectsLocationsInstancesResponse,
  errors: [],
}));

export interface ReenableProjectsLocationsInstancesRequest {
  /** Required. The fully qualified resource name of the database instance, in the form: `projects/{project-number}/locations/{location-id}/instances/{database-id}` */
  name: string;
  /** Request body */
  body?: ReenableDatabaseInstanceRequest;
}

export const ReenableProjectsLocationsInstancesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    body: Schema.optional(ReenableDatabaseInstanceRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta/projects/{projectsId}/locations/{locationsId}/instances/{instancesId}:reenable",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<ReenableProjectsLocationsInstancesRequest>;

export type ReenableProjectsLocationsInstancesResponse = DatabaseInstance;
export const ReenableProjectsLocationsInstancesResponse =
  /*@__PURE__*/ /*#__PURE__*/ DatabaseInstance;

export type ReenableProjectsLocationsInstancesError = DefaultErrors;

/** Enables a DatabaseInstance. The database must have been disabled previously using DisableDatabaseInstance. The state of a successfully reenabled DatabaseInstance is ACTIVE. */
export const reenableProjectsLocationsInstances: API.OperationMethod<
  ReenableProjectsLocationsInstancesRequest,
  ReenableProjectsLocationsInstancesResponse,
  ReenableProjectsLocationsInstancesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ReenableProjectsLocationsInstancesRequest,
  output: ReenableProjectsLocationsInstancesResponse,
  errors: [],
}));

export interface GetProjectsLocationsInstancesRequest {
  /** Required. The fully qualified resource name of the database instance, in the form: `projects/{project-number}/locations/{location-id}/instances/{database-id}`. `database-id` is a globally unique identifier across all parent collections. For convenience, this method allows you to supply `-` as a wildcard character in place of specific collections under `projects` and `locations`. The resulting wildcarding form of the method is: `projects/-/locations/-/instances/{database-id}`. */
  name: string;
}

export const GetProjectsLocationsInstancesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta/projects/{projectsId}/locations/{locationsId}/instances/{instancesId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsLocationsInstancesRequest>;

export type GetProjectsLocationsInstancesResponse = DatabaseInstance;
export const GetProjectsLocationsInstancesResponse =
  /*@__PURE__*/ /*#__PURE__*/ DatabaseInstance;

export type GetProjectsLocationsInstancesError = DefaultErrors;

/** Gets the DatabaseInstance identified by the specified resource name. */
export const getProjectsLocationsInstances: API.OperationMethod<
  GetProjectsLocationsInstancesRequest,
  GetProjectsLocationsInstancesResponse,
  GetProjectsLocationsInstancesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProjectsLocationsInstancesRequest,
  output: GetProjectsLocationsInstancesResponse,
  errors: [],
}));

export interface CreateProjectsLocationsInstancesRequest {
  /** Required. The parent project for which to create a database instance, in the form: `projects/{project-number}/locations/{location-id}`. */
  parent: string;
  /** The globally unique identifier of the database instance. */
  databaseId?: string;
  /** When set to true, the request will be validated but not submitted. */
  validateOnly?: boolean;
  /** Request body */
  body?: DatabaseInstance;
}

export const CreateProjectsLocationsInstancesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    databaseId: Schema.optional(Schema.String).pipe(T.HttpQuery("databaseId")),
    validateOnly: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("validateOnly"),
    ),
    body: Schema.optional(DatabaseInstance).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta/projects/{projectsId}/locations/{locationsId}/instances",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateProjectsLocationsInstancesRequest>;

export type CreateProjectsLocationsInstancesResponse = DatabaseInstance;
export const CreateProjectsLocationsInstancesResponse =
  /*@__PURE__*/ /*#__PURE__*/ DatabaseInstance;

export type CreateProjectsLocationsInstancesError = DefaultErrors;

/** Requests that a new DatabaseInstance be created. The state of a successfully created DatabaseInstance is ACTIVE. Only available for projects on the Blaze plan. Projects can be upgraded using the Cloud Billing API https://cloud.google.com/billing/reference/rest/v1/projects/updateBillingInfo. Note that it might take a few minutes for billing enablement state to propagate to Firebase systems. */
export const createProjectsLocationsInstances: API.OperationMethod<
  CreateProjectsLocationsInstancesRequest,
  CreateProjectsLocationsInstancesResponse,
  CreateProjectsLocationsInstancesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateProjectsLocationsInstancesRequest,
  output: CreateProjectsLocationsInstancesResponse,
  errors: [],
}));

export interface DisableProjectsLocationsInstancesRequest {
  /** Required. The fully qualified resource name of the database instance, in the form: `projects/{project-number}/locations/{location-id}/instances/{database-id}` */
  name: string;
  /** Request body */
  body?: DisableDatabaseInstanceRequest;
}

export const DisableProjectsLocationsInstancesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    body: Schema.optional(DisableDatabaseInstanceRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta/projects/{projectsId}/locations/{locationsId}/instances/{instancesId}:disable",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<DisableProjectsLocationsInstancesRequest>;

export type DisableProjectsLocationsInstancesResponse = DatabaseInstance;
export const DisableProjectsLocationsInstancesResponse =
  /*@__PURE__*/ /*#__PURE__*/ DatabaseInstance;

export type DisableProjectsLocationsInstancesError = DefaultErrors;

/** Disables a DatabaseInstance. The database can be re-enabled later using ReenableDatabaseInstance. When a database is disabled, all reads and writes are denied, including view access in the Firebase console. */
export const disableProjectsLocationsInstances: API.OperationMethod<
  DisableProjectsLocationsInstancesRequest,
  DisableProjectsLocationsInstancesResponse,
  DisableProjectsLocationsInstancesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DisableProjectsLocationsInstancesRequest,
  output: DisableProjectsLocationsInstancesResponse,
  errors: [],
}));
