// ==========================================================================
// Workflows API (workflows v1)
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
  name: "workflows",
  version: "v1",
  rootUrl: "https://workflows.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface Location {
  /** Resource name for the location, which may vary between implementations. For example: `"projects/example-project/locations/us-east1"` */
  name?: string;
  /** The canonical id for this location. For example: `"us-east1"`. */
  locationId?: string;
  /** The friendly name for this location, typically a nearby city name. For example, "Tokyo". */
  displayName?: string;
  /** Cross-service attributes for the location. For example {"cloud.googleapis.com/region": "us-east1"} */
  labels?: Record<string, string>;
  /** Service-specific metadata. For example the available capacity at the given location. */
  metadata?: Record<string, unknown>;
}

export const Location: Schema.Schema<Location> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  locationId: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "Location" }) as any as Schema.Schema<Location>;

export interface ListLocationsResponse {
  /** A list of locations that matches the specified filter in the request. */
  locations?: Array<Location>;
  /** The standard List next-page token. */
  nextPageToken?: string;
}

export const ListLocationsResponse: Schema.Schema<ListLocationsResponse> = Schema.suspend(() => Schema.Struct({
  locations: Schema.optional(Schema.Array(Location)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListLocationsResponse" }) as any as Schema.Schema<ListLocationsResponse>;

export interface Status {
  /** The status code, which should be an enum value of google.rpc.Code. */
  code?: number;
  /** A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. */
  message?: string;
  /** A list of messages that carry the error details. There is a common set of message types for APIs to use. */
  details?: Array<Record<string, unknown>>;
}

export const Status: Schema.Schema<Status> = Schema.suspend(() => Schema.Struct({
  code: Schema.optional(Schema.Number),
  message: Schema.optional(Schema.String),
  details: Schema.optional(Schema.Array(Schema.Record(Schema.String, Schema.Unknown))),
})).annotate({ identifier: "Status" }) as any as Schema.Schema<Status>;

export interface Operation {
  /** The server-assigned name, which is only unique within the same service that originally returns it. If you use the default HTTP mapping, the `name` should be a resource name ending with `operations/{unique_id}`. */
  name?: string;
  /** Service-specific metadata associated with the operation. It typically contains progress information and common metadata such as create time. Some services might not provide such metadata. Any method that returns a long-running operation should document the metadata type, if any. */
  metadata?: Record<string, unknown>;
  /** If the value is `false`, it means the operation is still in progress. If `true`, the operation is completed, and either `error` or `response` is available. */
  done?: boolean;
  /** The error result of the operation in case of failure or cancellation. */
  error?: Status;
  /** The normal, successful response of the operation. If the original method returns no data on success, such as `Delete`, the response is `google.protobuf.Empty`. If the original method is standard `Get`/`Create`/`Update`, the response should be the resource. For other methods, the response should have the type `XxxResponse`, where `Xxx` is the original method name. For example, if the original method name is `TakeSnapshot()`, the inferred response type is `TakeSnapshotResponse`. */
  response?: Record<string, unknown>;
}

export const Operation: Schema.Schema<Operation> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  done: Schema.optional(Schema.Boolean),
  error: Schema.optional(Status),
  response: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "Operation" }) as any as Schema.Schema<Operation>;

export interface ListOperationsResponse {
  /** A list of operations that matches the specified filter in the request. */
  operations?: Array<Operation>;
  /** The standard List next-page token. */
  nextPageToken?: string;
  /** Unordered list. Unreachable resources. Populated when the request sets `ListOperationsRequest.return_partial_success` and reads across collections. For example, when attempting to list all resources across all supported locations. */
  unreachable?: Array<string>;
}

export const ListOperationsResponse: Schema.Schema<ListOperationsResponse> = Schema.suspend(() => Schema.Struct({
  operations: Schema.optional(Schema.Array(Operation)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListOperationsResponse" }) as any as Schema.Schema<ListOperationsResponse>;

export interface Empty {
}

export const Empty: Schema.Schema<Empty> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "Empty" }) as any as Schema.Schema<Empty>;

export interface StateError {
  /** Provides specifics about the error. */
  details?: string;
  /** The type of this state error. */
  type?: "TYPE_UNSPECIFIED" | "KMS_ERROR" | (string & {});
}

export const StateError: Schema.Schema<StateError> = Schema.suspend(() => Schema.Struct({
  details: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
})).annotate({ identifier: "StateError" }) as any as Schema.Schema<StateError>;

export interface Workflow {
  /** The resource name of the workflow. Format: projects/{project}/locations/{location}/workflows/{workflow}. This is a workflow-wide field and is not tied to a specific revision. */
  name?: string;
  /** Description of the workflow provided by the user. Must be at most 1000 Unicode characters long. This is a workflow-wide field and is not tied to a specific revision. */
  description?: string;
  /** Output only. State of the workflow deployment. */
  state?: "STATE_UNSPECIFIED" | "ACTIVE" | "UNAVAILABLE" | (string & {});
  /** Output only. The revision of the workflow. A new revision of a workflow is created as a result of updating the following properties of a workflow: - Service account - Workflow code to be executed The format is "000001-a4d", where the first six characters define the zero-padded revision ordinal number. They are followed by a hyphen and three hexadecimal random characters. */
  revisionId?: string;
  /** Output only. The timestamp for when the workflow was created. This is a workflow-wide field and is not tied to a specific revision. */
  createTime?: string;
  /** Output only. The timestamp for when the workflow was last updated. This is a workflow-wide field and is not tied to a specific revision. */
  updateTime?: string;
  /** Output only. The timestamp for the latest revision of the workflow's creation. */
  revisionCreateTime?: string;
  /** Labels associated with this workflow. Labels can contain at most 64 entries. Keys and values can be no longer than 63 characters and can only contain lowercase letters, numeric characters, underscores, and dashes. Label keys must start with a letter. International characters are allowed. This is a workflow-wide field and is not tied to a specific revision. */
  labels?: Record<string, string>;
  /** The service account associated with the latest workflow version. This service account represents the identity of the workflow and determines what permissions the workflow has. Format: projects/{project}/serviceAccounts/{account} or {account} Using `-` as a wildcard for the `{project}` or not providing one at all will infer the project from the account. The `{account}` value can be the `email` address or the `unique_id` of the service account. If not provided, workflow will use the project's default service account. Modifying this field for an existing workflow results in a new workflow revision. */
  serviceAccount?: string;
  /** Workflow code to be executed. The size limit is 128KB. */
  sourceContents?: string;
  /** Optional. The resource name of a KMS crypto key used to encrypt or decrypt the data associated with the workflow. Format: projects/{project}/locations/{location}/keyRings/{keyRing}/cryptoKeys/{cryptoKey} Using `-` as a wildcard for the `{project}` or not providing one at all will infer the project from the account. If not provided, data associated with the workflow will not be CMEK-encrypted. */
  cryptoKeyName?: string;
  /** Output only. Error regarding the state of the workflow. For example, this field will have error details if the execution data is unavailable due to revoked KMS key permissions. */
  stateError?: StateError;
  /** Optional. Describes the level of platform logging to apply to calls and call responses during executions of this workflow. If both the workflow and the execution specify a logging level, the execution level takes precedence. */
  callLogLevel?: "CALL_LOG_LEVEL_UNSPECIFIED" | "LOG_ALL_CALLS" | "LOG_ERRORS_ONLY" | "LOG_NONE" | (string & {});
  /** Optional. User-defined environment variables associated with this workflow revision. This map has a maximum length of 20. Each string can take up to 4KiB. Keys cannot be empty strings and cannot start with "GOOGLE" or "WORKFLOWS". */
  userEnvVars?: Record<string, string>;
  /** Optional. Describes the execution history level to apply to this workflow. */
  executionHistoryLevel?: "EXECUTION_HISTORY_LEVEL_UNSPECIFIED" | "EXECUTION_HISTORY_BASIC" | "EXECUTION_HISTORY_DETAILED" | (string & {});
  /** Output only. A list of all KMS crypto keys used to encrypt or decrypt the data associated with the workflow. */
  allKmsKeys?: Array<string>;
  /** Output only. A list of all KMS crypto key versions used to encrypt or decrypt the data associated with the workflow. */
  allKmsKeysVersions?: Array<string>;
  /** Output only. The resource name of a KMS crypto key version used to encrypt or decrypt the data associated with the workflow. Format: projects/{project}/locations/{location}/keyRings/{keyRing}/cryptoKeys/{cryptoKey}/cryptoKeyVersions/{cryptoKeyVersion} */
  cryptoKeyVersion?: string;
  /** Optional. Input only. Immutable. Tags associated with this workflow. */
  tags?: Record<string, string>;
}

export const Workflow: Schema.Schema<Workflow> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  revisionId: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  revisionCreateTime: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  serviceAccount: Schema.optional(Schema.String),
  sourceContents: Schema.optional(Schema.String),
  cryptoKeyName: Schema.optional(Schema.String),
  stateError: Schema.optional(StateError),
  callLogLevel: Schema.optional(Schema.String),
  userEnvVars: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  executionHistoryLevel: Schema.optional(Schema.String),
  allKmsKeys: Schema.optional(Schema.Array(Schema.String)),
  allKmsKeysVersions: Schema.optional(Schema.Array(Schema.String)),
  cryptoKeyVersion: Schema.optional(Schema.String),
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "Workflow" }) as any as Schema.Schema<Workflow>;

export interface ListWorkflowsResponse {
  /** The workflows that match the request. */
  workflows?: Array<Workflow>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
  /** Unreachable resources. */
  unreachable?: Array<string>;
}

export const ListWorkflowsResponse: Schema.Schema<ListWorkflowsResponse> = Schema.suspend(() => Schema.Struct({
  workflows: Schema.optional(Schema.Array(Workflow)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListWorkflowsResponse" }) as any as Schema.Schema<ListWorkflowsResponse>;

export interface ListWorkflowRevisionsResponse {
  /** The revisions of the workflow, ordered in reverse chronological order. */
  workflows?: Array<Workflow>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const ListWorkflowRevisionsResponse: Schema.Schema<ListWorkflowRevisionsResponse> = Schema.suspend(() => Schema.Struct({
  workflows: Schema.optional(Schema.Array(Workflow)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListWorkflowRevisionsResponse" }) as any as Schema.Schema<ListWorkflowRevisionsResponse>;

export interface OperationMetadata {
  /** The time the operation was created. */
  createTime?: string;
  /** The time the operation finished running. */
  endTime?: string;
  /** Server-defined resource path for the target of the operation. */
  target?: string;
  /** Name of the verb executed by the operation. */
  verb?: string;
  /** API version used to start the operation. */
  apiVersion?: string;
}

export const OperationMetadata: Schema.Schema<OperationMetadata> = Schema.suspend(() => Schema.Struct({
  createTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
  target: Schema.optional(Schema.String),
  verb: Schema.optional(Schema.String),
  apiVersion: Schema.optional(Schema.String),
})).annotate({ identifier: "OperationMetadata" }) as any as Schema.Schema<OperationMetadata>;

// ==========================================================================
// Operations
// ==========================================================================

/** Lists information about the supported locations for this service. This method can be called in two ways: * **List all public locations:** Use the path `GET /v1/locations`. * **List project-visible locations:** Use the path `GET /v1/projects/{project_id}/locations`. This may include public locations as well as private or other locations specifically visible to the project. */
export interface ListProjectsLocationsRequest {
  /** The resource that owns the locations collection, if applicable. */
  name: string;
  /** A filter to narrow down results to a preferred subset. The filtering language accepts strings like `"displayName=tokyo"`, and is documented in more detail in [AIP-160](https://google.aip.dev/160). */
  filter?: string;
  /** The maximum number of results to return. If not set, the service selects a default. */
  pageSize?: number;
  /** A page token received from the `next_page_token` field in the response. Send that page token to receive the subsequent page. */
  pageToken?: string;
  /** Optional. Do not use this field. It is unsupported and is ignored unless explicitly documented otherwise. This is primarily for internal usage. */
  extraLocationTypes?: string[];
}

export const ListProjectsLocationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  extraLocationTypes: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("extraLocationTypes")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsRequest>;

export type ListProjectsLocationsResponse = ListLocationsResponse;
export const ListProjectsLocationsResponse = ListLocationsResponse;

export type ListProjectsLocationsError = CommonErrors;

export const listProjectsLocations = API.makePaginated(() => ({
  input: ListProjectsLocationsRequest,
  output: ListProjectsLocationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets information about a location. */
export interface GetProjectsLocationsRequest {
  /** Resource name for the location. */
  name: string;
}

export const GetProjectsLocationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsRequest>;

export type GetProjectsLocationsResponse = Location;
export const GetProjectsLocationsResponse = Location;

export type GetProjectsLocationsError = CommonErrors;

export const getProjectsLocations: API.OperationMethod<GetProjectsLocationsRequest, GetProjectsLocationsResponse, GetProjectsLocationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsRequest,
  output: GetProjectsLocationsResponse,
  errors: [],
}));

/** Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns `UNIMPLEMENTED`. */
export interface ListProjectsLocationsOperationsRequest {
  /** The name of the operation's parent resource. */
  name: string;
  /** The standard list filter. */
  filter?: string;
  /** The standard list page size. */
  pageSize?: number;
  /** The standard list page token. */
  pageToken?: string;
  /** When set to `true`, operations that are reachable are returned as normal, and those that are unreachable are returned in the ListOperationsResponse.unreachable field. This can only be `true` when reading across collections. For example, when `parent` is set to `"projects/example/locations/-"`. This field is not supported by default and will result in an `UNIMPLEMENTED` error if set unless explicitly documented otherwise in service or product specific documentation. */
  returnPartialSuccess?: boolean;
}

export const ListProjectsLocationsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  returnPartialSuccess: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("returnPartialSuccess")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/operations" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsOperationsRequest>;

export type ListProjectsLocationsOperationsResponse = ListOperationsResponse;
export const ListProjectsLocationsOperationsResponse = ListOperationsResponse;

export type ListProjectsLocationsOperationsError = CommonErrors;

export const listProjectsLocationsOperations = API.makePaginated(() => ({
  input: ListProjectsLocationsOperationsRequest,
  output: ListProjectsLocationsOperationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service. */
export interface GetProjectsLocationsOperationsRequest {
  /** The name of the operation resource. */
  name: string;
}

export const GetProjectsLocationsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/operations/{operationsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsOperationsRequest>;

export type GetProjectsLocationsOperationsResponse = Operation;
export const GetProjectsLocationsOperationsResponse = Operation;

export type GetProjectsLocationsOperationsError = CommonErrors;

export const getProjectsLocationsOperations: API.OperationMethod<GetProjectsLocationsOperationsRequest, GetProjectsLocationsOperationsResponse, GetProjectsLocationsOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsOperationsRequest,
  output: GetProjectsLocationsOperationsResponse,
  errors: [],
}));

/** Deletes a long-running operation. This method indicates that the client is no longer interested in the operation result. It does not cancel the operation. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. */
export interface DeleteProjectsLocationsOperationsRequest {
  /** The name of the operation resource to be deleted. */
  name: string;
}

export const DeleteProjectsLocationsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/operations/{operationsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsOperationsRequest>;

export type DeleteProjectsLocationsOperationsResponse = Empty;
export const DeleteProjectsLocationsOperationsResponse = Empty;

export type DeleteProjectsLocationsOperationsError = CommonErrors;

export const deleteProjectsLocationsOperations: API.OperationMethod<DeleteProjectsLocationsOperationsRequest, DeleteProjectsLocationsOperationsResponse, DeleteProjectsLocationsOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsOperationsRequest,
  output: DeleteProjectsLocationsOperationsResponse,
  errors: [],
}));

/** Lists workflows in a given project and location. The default order is not specified. */
export interface ListProjectsLocationsWorkflowsRequest {
  /** Required. Project and location from which the workflows should be listed. Format: projects/{project}/locations/{location} */
  parent: string;
  /** Maximum number of workflows to return per call. The service might return fewer than this value even if not at the end of the collection. If a value is not specified, a default value of 500 is used. The maximum permitted value is 1000 and values greater than 1000 are coerced down to 1000. */
  pageSize?: number;
  /** A page token, received from a previous `ListWorkflows` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListWorkflows` must match the call that provided the page token. */
  pageToken?: string;
  /** Filter to restrict results to specific workflows. For details, see AIP-160. For example, if you are using the Google APIs Explorer: `state="SUCCEEDED"` or `createTime>"2023-08-01" AND state="FAILED"` */
  filter?: string;
  /** Comma-separated list of fields that specify the order of the results. Default sorting order for a field is ascending. To specify descending order for a field, append a "desc" suffix. If not specified, the results are returned in an unspecified order. */
  orderBy?: string;
}

export const ListProjectsLocationsWorkflowsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/workflows" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsWorkflowsRequest>;

export type ListProjectsLocationsWorkflowsResponse = ListWorkflowsResponse;
export const ListProjectsLocationsWorkflowsResponse = ListWorkflowsResponse;

export type ListProjectsLocationsWorkflowsError = CommonErrors;

export const listProjectsLocationsWorkflows = API.makePaginated(() => ({
  input: ListProjectsLocationsWorkflowsRequest,
  output: ListProjectsLocationsWorkflowsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets details of a single workflow. */
export interface GetProjectsLocationsWorkflowsRequest {
  /** Required. Name of the workflow for which information should be retrieved. Format: projects/{project}/locations/{location}/workflows/{workflow} */
  name: string;
  /** Optional. The revision of the workflow to retrieve. If the revision_id is empty, the latest revision is retrieved. The format is "000001-a4d", where the first six characters define the zero-padded decimal revision number. They are followed by a hyphen and three hexadecimal characters. */
  revisionId?: string;
}

export const GetProjectsLocationsWorkflowsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  revisionId: Schema.optional(Schema.String).pipe(T.HttpQuery("revisionId")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/workflows/{workflowsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsWorkflowsRequest>;

export type GetProjectsLocationsWorkflowsResponse = Workflow;
export const GetProjectsLocationsWorkflowsResponse = Workflow;

export type GetProjectsLocationsWorkflowsError = CommonErrors;

export const getProjectsLocationsWorkflows: API.OperationMethod<GetProjectsLocationsWorkflowsRequest, GetProjectsLocationsWorkflowsResponse, GetProjectsLocationsWorkflowsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsWorkflowsRequest,
  output: GetProjectsLocationsWorkflowsResponse,
  errors: [],
}));

/** Creates a new workflow. If a workflow with the specified name already exists in the specified project and location, the long running operation returns a ALREADY_EXISTS error. */
export interface CreateProjectsLocationsWorkflowsRequest {
  /** Required. Project and location in which the workflow should be created. Format: projects/{project}/locations/{location} */
  parent: string;
  /** Required. The ID of the workflow to be created. It has to fulfill the following requirements: * Must contain only letters, numbers, underscores and hyphens. * Must start with a letter. * Must be between 1-64 characters. * Must end with a number or a letter. * Must be unique within the customer project and location. */
  workflowId?: string;
  /** Request body */
  body?: Workflow;
}

export const CreateProjectsLocationsWorkflowsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  workflowId: Schema.optional(Schema.String).pipe(T.HttpQuery("workflowId")),
  body: Schema.optional(Workflow).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/workflows", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsWorkflowsRequest>;

export type CreateProjectsLocationsWorkflowsResponse = Operation;
export const CreateProjectsLocationsWorkflowsResponse = Operation;

export type CreateProjectsLocationsWorkflowsError = CommonErrors;

export const createProjectsLocationsWorkflows: API.OperationMethod<CreateProjectsLocationsWorkflowsRequest, CreateProjectsLocationsWorkflowsResponse, CreateProjectsLocationsWorkflowsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsWorkflowsRequest,
  output: CreateProjectsLocationsWorkflowsResponse,
  errors: [],
}));

/** Deletes a workflow with the specified name. This method also cancels and deletes all running executions of the workflow. */
export interface DeleteProjectsLocationsWorkflowsRequest {
  /** Required. Name of the workflow to be deleted. Format: projects/{project}/locations/{location}/workflows/{workflow} */
  name: string;
}

export const DeleteProjectsLocationsWorkflowsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/workflows/{workflowsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsWorkflowsRequest>;

export type DeleteProjectsLocationsWorkflowsResponse = Operation;
export const DeleteProjectsLocationsWorkflowsResponse = Operation;

export type DeleteProjectsLocationsWorkflowsError = CommonErrors;

export const deleteProjectsLocationsWorkflows: API.OperationMethod<DeleteProjectsLocationsWorkflowsRequest, DeleteProjectsLocationsWorkflowsResponse, DeleteProjectsLocationsWorkflowsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsWorkflowsRequest,
  output: DeleteProjectsLocationsWorkflowsResponse,
  errors: [],
}));

/** Updates an existing workflow. Running this method has no impact on already running executions of the workflow. A new revision of the workflow might be created as a result of a successful update operation. In that case, the new revision is used in new workflow executions. */
export interface PatchProjectsLocationsWorkflowsRequest {
  /** The resource name of the workflow. Format: projects/{project}/locations/{location}/workflows/{workflow}. This is a workflow-wide field and is not tied to a specific revision. */
  name: string;
  /** List of fields to be updated. If not present, the entire workflow will be updated. */
  updateMask?: string;
  /** Request body */
  body?: Workflow;
}

export const PatchProjectsLocationsWorkflowsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(Workflow).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/workflows/{workflowsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsWorkflowsRequest>;

export type PatchProjectsLocationsWorkflowsResponse = Operation;
export const PatchProjectsLocationsWorkflowsResponse = Operation;

export type PatchProjectsLocationsWorkflowsError = CommonErrors;

export const patchProjectsLocationsWorkflows: API.OperationMethod<PatchProjectsLocationsWorkflowsRequest, PatchProjectsLocationsWorkflowsResponse, PatchProjectsLocationsWorkflowsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsWorkflowsRequest,
  output: PatchProjectsLocationsWorkflowsResponse,
  errors: [],
}));

/** Lists revisions for a given workflow. */
export interface ListRevisionsProjectsLocationsWorkflowsRequest {
  /** Required. Workflow for which the revisions should be listed. Format: projects/{project}/locations/{location}/workflows/{workflow} */
  name: string;
  /** The maximum number of revisions to return per page. If a value is not specified, a default value of 20 is used. The maximum permitted value is 100. Values greater than 100 are coerced down to 100. */
  pageSize?: number;
  /** The page token, received from a previous ListWorkflowRevisions call. Provide this to retrieve the subsequent page. */
  pageToken?: string;
}

export const ListRevisionsProjectsLocationsWorkflowsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/workflows/{workflowsId}:listRevisions" }),
  svc,
) as unknown as Schema.Schema<ListRevisionsProjectsLocationsWorkflowsRequest>;

export type ListRevisionsProjectsLocationsWorkflowsResponse = ListWorkflowRevisionsResponse;
export const ListRevisionsProjectsLocationsWorkflowsResponse = ListWorkflowRevisionsResponse;

export type ListRevisionsProjectsLocationsWorkflowsError = CommonErrors;

export const listRevisionsProjectsLocationsWorkflows = API.makePaginated(() => ({
  input: ListRevisionsProjectsLocationsWorkflowsRequest,
  output: ListRevisionsProjectsLocationsWorkflowsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

