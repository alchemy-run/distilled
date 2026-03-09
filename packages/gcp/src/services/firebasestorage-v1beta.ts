// ==========================================================================
// Cloud Storage for Firebase API (firebasestorage v1beta)
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
  name: "firebasestorage",
  version: "v1beta",
  rootUrl: "https://firebasestorage.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface Bucket {
  /** Output only. Resource name of the bucket. */
  name?: string;
}

export const Bucket: Schema.Schema<Bucket> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Bucket" }) as any as Schema.Schema<Bucket>;

export interface ListBucketsResponse {
  /** The list of linked buckets. */
  buckets?: Array<Bucket>;
  /** A token that can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const ListBucketsResponse: Schema.Schema<ListBucketsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      buckets: Schema.optional(Schema.Array(Bucket)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListBucketsResponse",
  }) as any as Schema.Schema<ListBucketsResponse>;

export interface DefaultBucket {
  /** Identifier. Resource name of the default bucket. */
  name?: string;
  /** Immutable. Location of the default bucket. */
  location?: string;
  /** Output only. Underlying bucket resource. */
  bucket?: Bucket;
  /** Immutable. Storage class of the default bucket. Supported values are available at https://cloud.google.com/storage/docs/storage-classes#classes. */
  storageClass?: string;
}

export const DefaultBucket: Schema.Schema<DefaultBucket> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      location: Schema.optional(Schema.String),
      bucket: Schema.optional(Bucket),
      storageClass: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "DefaultBucket",
  }) as any as Schema.Schema<DefaultBucket>;

export interface Empty {}

export const Empty: Schema.Schema<Empty> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "Empty",
  }) as any as Schema.Schema<Empty>;

export interface AddFirebaseRequest {}

export const AddFirebaseRequest: Schema.Schema<AddFirebaseRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "AddFirebaseRequest",
  }) as any as Schema.Schema<AddFirebaseRequest>;

export interface RemoveFirebaseRequest {}

export const RemoveFirebaseRequest: Schema.Schema<RemoveFirebaseRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "RemoveFirebaseRequest",
  }) as any as Schema.Schema<RemoveFirebaseRequest>;

// ==========================================================================
// Operations
// ==========================================================================

export interface GetDefaultBucketProjectsRequest {
  /** Required. The name of the default bucket to retrieve, `projects/{project_id_or_number}/defaultBucket`. */
  name: string;
}

export const GetDefaultBucketProjectsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta/projects/{projectsId}/defaultBucket",
    }),
    svc,
  ) as unknown as Schema.Schema<GetDefaultBucketProjectsRequest>;

export type GetDefaultBucketProjectsResponse = DefaultBucket;
export const GetDefaultBucketProjectsResponse =
  /*@__PURE__*/ /*#__PURE__*/ DefaultBucket;

export type GetDefaultBucketProjectsError = DefaultErrors;

/** Gets the default bucket. */
export const getDefaultBucketProjects: API.OperationMethod<
  GetDefaultBucketProjectsRequest,
  GetDefaultBucketProjectsResponse,
  GetDefaultBucketProjectsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetDefaultBucketProjectsRequest,
  output: GetDefaultBucketProjectsResponse,
  errors: [],
}));

export interface DeleteDefaultBucketProjectsRequest {
  /** Required. The name of the default bucket to delete, `projects/{project_id_or_number}/defaultBucket`. */
  name: string;
}

export const DeleteDefaultBucketProjectsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v1beta/projects/{projectsId}/defaultBucket",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteDefaultBucketProjectsRequest>;

export type DeleteDefaultBucketProjectsResponse = Empty;
export const DeleteDefaultBucketProjectsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Empty;

export type DeleteDefaultBucketProjectsError = DefaultErrors;

/** Unlinks and deletes the default bucket. */
export const deleteDefaultBucketProjects: API.OperationMethod<
  DeleteDefaultBucketProjectsRequest,
  DeleteDefaultBucketProjectsResponse,
  DeleteDefaultBucketProjectsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteDefaultBucketProjectsRequest,
  output: DeleteDefaultBucketProjectsResponse,
  errors: [],
}));

export interface GetProjectsBucketsRequest {
  /** Required. Resource name of the bucket, mirrors the ID of the underlying Google Cloud Storage bucket, `projects/{project_id_or_number}/buckets/{bucket_id}`. */
  name: string;
}

export const GetProjectsBucketsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta/projects/{projectsId}/buckets/{bucketsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsBucketsRequest>;

export type GetProjectsBucketsResponse = Bucket;
export const GetProjectsBucketsResponse = /*@__PURE__*/ /*#__PURE__*/ Bucket;

export type GetProjectsBucketsError = DefaultErrors;

/** Gets a single linked storage bucket. */
export const getProjectsBuckets: API.OperationMethod<
  GetProjectsBucketsRequest,
  GetProjectsBucketsResponse,
  GetProjectsBucketsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProjectsBucketsRequest,
  output: GetProjectsBucketsResponse,
  errors: [],
}));

export interface ListProjectsBucketsRequest {
  /** Required. Resource name of the parent Firebase project, `projects/{project_id_or_number}`. */
  parent: string;
  /** The maximum number of buckets to return. If not set, the server will use a reasonable default. */
  pageSize?: number;
  /** A page token, received from a previous `ListBuckets` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListBuckets` must match the call that provided the page token. */
  pageToken?: string;
}

export const ListProjectsBucketsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  }).pipe(
    T.Http({ method: "GET", path: "v1beta/projects/{projectsId}/buckets" }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsBucketsRequest>;

export type ListProjectsBucketsResponse = ListBucketsResponse;
export const ListProjectsBucketsResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListBucketsResponse;

export type ListProjectsBucketsError = DefaultErrors;

/** Lists the linked storage buckets for a project. */
export const listProjectsBuckets: API.PaginatedOperationMethod<
  ListProjectsBucketsRequest,
  ListProjectsBucketsResponse,
  ListProjectsBucketsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListProjectsBucketsRequest,
  output: ListProjectsBucketsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface AddFirebaseProjectsBucketsRequest {
  /** Required. Resource name of the bucket, mirrors the ID of the underlying Google Cloud Storage bucket, `projects/{project_id_or_number}/buckets/{bucket_id}`. */
  bucket: string;
  /** Request body */
  body?: AddFirebaseRequest;
}

export const AddFirebaseProjectsBucketsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    bucket: Schema.String.pipe(T.HttpPath("bucket")),
    body: Schema.optional(AddFirebaseRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta/projects/{projectsId}/buckets/{bucketsId}:addFirebase",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<AddFirebaseProjectsBucketsRequest>;

export type AddFirebaseProjectsBucketsResponse = Bucket;
export const AddFirebaseProjectsBucketsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Bucket;

export type AddFirebaseProjectsBucketsError = DefaultErrors;

/** Links a Google Cloud Storage bucket to a Firebase project. */
export const addFirebaseProjectsBuckets: API.OperationMethod<
  AddFirebaseProjectsBucketsRequest,
  AddFirebaseProjectsBucketsResponse,
  AddFirebaseProjectsBucketsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: AddFirebaseProjectsBucketsRequest,
  output: AddFirebaseProjectsBucketsResponse,
  errors: [],
}));

export interface RemoveFirebaseProjectsBucketsRequest {
  /** Required. Resource name of the bucket, mirrors the ID of the underlying Google Cloud Storage bucket, `projects/{project_id_or_number}/buckets/{bucket_id}`. */
  bucket: string;
  /** Request body */
  body?: RemoveFirebaseRequest;
}

export const RemoveFirebaseProjectsBucketsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    bucket: Schema.String.pipe(T.HttpPath("bucket")),
    body: Schema.optional(RemoveFirebaseRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta/projects/{projectsId}/buckets/{bucketsId}:removeFirebase",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<RemoveFirebaseProjectsBucketsRequest>;

export type RemoveFirebaseProjectsBucketsResponse = Empty;
export const RemoveFirebaseProjectsBucketsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Empty;

export type RemoveFirebaseProjectsBucketsError = DefaultErrors;

/** Unlinks a linked Google Cloud Storage bucket from a Firebase project. */
export const removeFirebaseProjectsBuckets: API.OperationMethod<
  RemoveFirebaseProjectsBucketsRequest,
  RemoveFirebaseProjectsBucketsResponse,
  RemoveFirebaseProjectsBucketsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: RemoveFirebaseProjectsBucketsRequest,
  output: RemoveFirebaseProjectsBucketsResponse,
  errors: [],
}));

export interface CreateProjectsDefaultBucketRequest {
  /** Required. The parent resource where the default bucket will be created, `projects/{project_id_or_number}`. */
  parent: string;
  /** Request body */
  body?: DefaultBucket;
}

export const CreateProjectsDefaultBucketRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    body: Schema.optional(DefaultBucket).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta/projects/{projectsId}/defaultBucket",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateProjectsDefaultBucketRequest>;

export type CreateProjectsDefaultBucketResponse = DefaultBucket;
export const CreateProjectsDefaultBucketResponse =
  /*@__PURE__*/ /*#__PURE__*/ DefaultBucket;

export type CreateProjectsDefaultBucketError = DefaultErrors;

/** Creates a Spark tier-eligible Cloud Storage bucket and links it to your Firebase project. If the default bucket already exists, this method will re-link it to your Firebase project. See https://firebase.google.com/pricing for pricing details. */
export const createProjectsDefaultBucket: API.OperationMethod<
  CreateProjectsDefaultBucketRequest,
  CreateProjectsDefaultBucketResponse,
  CreateProjectsDefaultBucketError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateProjectsDefaultBucketRequest,
  output: CreateProjectsDefaultBucketResponse,
  errors: [],
}));
