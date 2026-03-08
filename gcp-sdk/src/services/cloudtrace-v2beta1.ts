// ==========================================================================
// Cloud Trace API (cloudtrace v2beta1)
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
  name: "cloudtrace",
  version: "v2beta1",
  rootUrl: "https://cloudtrace.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface OutputConfig {
  /** Required. The destination for writing trace data. Supported formats include: "bigquery.googleapis.com/projects/[PROJECT_ID]/datasets/[DATASET]" */
  destination?: string;
}

export const OutputConfig: Schema.Schema<OutputConfig> = Schema.suspend(() =>
  Schema.Struct({
    destination: Schema.optional(Schema.String),
  }),
).annotate({
  identifier: "OutputConfig",
}) as any as Schema.Schema<OutputConfig>;

export interface TraceSink {
  /** Identifier. The canonical sink resource name, unique within the project. Must be of the form: projects/[PROJECT_NUMBER]/traceSinks/[SINK_ID]. E.g.: `"projects/12345/traceSinks/my-project-trace-sink"`. Sink identifiers are limited to 256 characters and can include only the following characters: upper and lower-case alphanumeric characters, underscores, hyphens, and periods. */
  name?: string;
  /** Required. The export destination. */
  outputConfig?: OutputConfig;
  /** Output only. A service account name for exporting the data. This field is set by sinks.create and sinks.update. The service account will need to be granted write access to the destination specified in the output configuration, see [Granting access for a resource](/iam/docs/granting-roles-to-service-accounts#granting_access_to_a_service_account_for_a_resource). To create tables and to write data, this account needs the `dataEditor` role. Read more about roles in the [BigQuery documentation](https://cloud.google.com/bigquery/docs/access-control). E.g.: "service-00000001@00000002.iam.gserviceaccount.com" */
  writerIdentity?: string;
}

export const TraceSink: Schema.Schema<TraceSink> = Schema.suspend(() =>
  Schema.Struct({
    name: Schema.optional(Schema.String),
    outputConfig: Schema.optional(OutputConfig),
    writerIdentity: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "TraceSink" }) as any as Schema.Schema<TraceSink>;

export interface ListTraceSinksResponse {
  /** A list of sinks. */
  sinks?: Array<TraceSink>;
  /** A paginated response where more pages might be available has `next_page_token` set. To get the next set of results, call the same method again using the value of `next_page_token` as `page_token`. */
  nextPageToken?: string;
}

export const ListTraceSinksResponse: Schema.Schema<ListTraceSinksResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      sinks: Schema.optional(Schema.Array(TraceSink)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListTraceSinksResponse",
  }) as any as Schema.Schema<ListTraceSinksResponse>;

export interface Empty {}

export const Empty: Schema.Schema<Empty> = Schema.suspend(() =>
  Schema.Struct({}),
).annotate({ identifier: "Empty" }) as any as Schema.Schema<Empty>;

// ==========================================================================
// Operations
// ==========================================================================

export interface ListProjectsTraceSinksRequest {
  /** Required. The parent resource whose sinks are to be listed (currently only project parent resources are supported): "projects/[PROJECT_ID]" */
  parent: string;
  /** Optional. If present, then retrieve the next batch of results from the preceding call to this method. `page_token` must be the value of `next_page_token` from the previous response. The values of other method parameters should be identical to those in the previous call. */
  pageToken?: string;
  /** Optional. The maximum number of results to return from this request. Non-positive values are ignored. The presence of `next_page_token` in the response indicates that more results might be available. */
  pageSize?: number;
}

export const ListProjectsTraceSinksRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v2beta1/projects/{projectsId}/traceSinks" }),
  svc,
) as unknown as Schema.Schema<ListProjectsTraceSinksRequest>;

export type ListProjectsTraceSinksResponse = ListTraceSinksResponse;
export const ListProjectsTraceSinksResponse = ListTraceSinksResponse;

export type ListProjectsTraceSinksError = DefaultErrors;

/** List all sinks for the parent resource (GCP project). */
export const listProjectsTraceSinks: API.PaginatedOperationMethod<
  ListProjectsTraceSinksRequest,
  ListProjectsTraceSinksResponse,
  ListProjectsTraceSinksError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListProjectsTraceSinksRequest,
  output: ListProjectsTraceSinksResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsTraceSinksRequest {
  /** Required. The resource name of the sink: "projects/[PROJECT_NUMBER]/traceSinks/[SINK_ID]" Example: `"projects/12345/traceSinks/my-sink-id"`. */
  name: string;
}

export const GetProjectsTraceSinksRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v2beta1/projects/{projectsId}/traceSinks/{traceSinksId}",
  }),
  svc,
) as unknown as Schema.Schema<GetProjectsTraceSinksRequest>;

export type GetProjectsTraceSinksResponse = TraceSink;
export const GetProjectsTraceSinksResponse = TraceSink;

export type GetProjectsTraceSinksError = DefaultErrors;

/** Get a trace sink by name under the parent resource (GCP project). */
export const getProjectsTraceSinks: API.OperationMethod<
  GetProjectsTraceSinksRequest,
  GetProjectsTraceSinksResponse,
  GetProjectsTraceSinksError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetProjectsTraceSinksRequest,
  output: GetProjectsTraceSinksResponse,
  errors: [],
}));

export interface CreateProjectsTraceSinksRequest {
  /** Required. The resource in which to create the sink (currently only project sinks are supported): "projects/[PROJECT_ID]" Examples: `"projects/my-trace-project"`, `"projects/123456789"`. */
  parent: string;
  /** Request body */
  body?: TraceSink;
}

export const CreateProjectsTraceSinksRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(TraceSink).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v2beta1/projects/{projectsId}/traceSinks",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<CreateProjectsTraceSinksRequest>;

export type CreateProjectsTraceSinksResponse = TraceSink;
export const CreateProjectsTraceSinksResponse = TraceSink;

export type CreateProjectsTraceSinksError = DefaultErrors;

/** Creates a sink that exports trace spans to a destination. The export of newly-ingested traces begins immediately, unless the sink's `writer_identity` is not permitted to write to the destination. A sink can export traces only from the resource owning the sink (the 'parent'). */
export const createProjectsTraceSinks: API.OperationMethod<
  CreateProjectsTraceSinksRequest,
  CreateProjectsTraceSinksResponse,
  CreateProjectsTraceSinksError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateProjectsTraceSinksRequest,
  output: CreateProjectsTraceSinksResponse,
  errors: [],
}));

export interface PatchProjectsTraceSinksRequest {
  /** Required. The full resource name of the sink to update, including the parent resource and the sink identifier: "projects/[PROJECT_NUMBER]/traceSinks/[SINK_ID]" Example: `"projects/12345/traceSinks/my-sink-id"`. */
  name: string;
  /** Required. Field mask that specifies the fields in `trace_sink` that are to be updated. A sink field is overwritten if, and only if, it is in the update mask. `name` and `writer_identity` fields cannot be updated. An empty `update_mask` is considered an error. For a detailed `FieldMask` definition, see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#fieldmask Example: `updateMask=output_config`. */
  updateMask?: string;
  /** Request body */
  body?: TraceSink;
}

export const PatchProjectsTraceSinksRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(TraceSink).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "v2beta1/projects/{projectsId}/traceSinks/{traceSinksId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<PatchProjectsTraceSinksRequest>;

export type PatchProjectsTraceSinksResponse = TraceSink;
export const PatchProjectsTraceSinksResponse = TraceSink;

export type PatchProjectsTraceSinksError = DefaultErrors;

/** Updates a sink. This method updates fields in the existing sink according to the provided update mask. The sink's name cannot be changed nor any output-only fields (e.g. the writer_identity). */
export const patchProjectsTraceSinks: API.OperationMethod<
  PatchProjectsTraceSinksRequest,
  PatchProjectsTraceSinksResponse,
  PatchProjectsTraceSinksError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchProjectsTraceSinksRequest,
  output: PatchProjectsTraceSinksResponse,
  errors: [],
}));

export interface DeleteProjectsTraceSinksRequest {
  /** Required. The full resource name of the sink to delete, including the parent resource and the sink identifier: "projects/[PROJECT_NUMBER]/traceSinks/[SINK_ID]" Example: `"projects/12345/traceSinks/my-sink-id"`. */
  name: string;
}

export const DeleteProjectsTraceSinksRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "v2beta1/projects/{projectsId}/traceSinks/{traceSinksId}",
  }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsTraceSinksRequest>;

export type DeleteProjectsTraceSinksResponse = Empty;
export const DeleteProjectsTraceSinksResponse = Empty;

export type DeleteProjectsTraceSinksError = DefaultErrors;

/** Deletes a sink. */
export const deleteProjectsTraceSinks: API.OperationMethod<
  DeleteProjectsTraceSinksRequest,
  DeleteProjectsTraceSinksResponse,
  DeleteProjectsTraceSinksError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteProjectsTraceSinksRequest,
  output: DeleteProjectsTraceSinksResponse,
  errors: [],
}));
