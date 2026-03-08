// ==========================================================================
// Firebase ML API (firebaseml v1beta2)
// DO NOT EDIT - Generated from GCP Discovery Document
// ==========================================================================

import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";
import type { Credentials } from "../credentials";
import type { DefaultErrors } from "../errors";
import type * as HttpClient from "effect/unstable/http/HttpClient";

// Service metadata
const svc = T.Service({
  name: "firebaseml",
  version: "v1beta2",
  rootUrl: "https://firebaseml.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface Empty {}

export const Empty: Schema.Schema<Empty> = Schema.suspend(() =>
  Schema.Struct({}),
).annotate({ identifier: "Empty" }) as any as Schema.Schema<Empty>;

export interface TfLiteModel {
  /** Output only. The size of the TFLite model */
  sizeBytes?: string;
  /** The AutoML model id referencing a model you created with the AutoML API. The name should have format 'projects//locations//models/' (This is the model resource name returned from the AutoML API) */
  automlModel?: string;
  /** The TfLite file containing the model. (Stored in Google Cloud). The gcs_tflite_uri should have form: gs://some-bucket/some-model.tflite Note: If you update the file in the original location, it is necessary to call UpdateModel for ML to pick up and validate the updated file. */
  gcsTfliteUri?: string;
}

export const TfLiteModel: Schema.Schema<TfLiteModel> = Schema.suspend(() =>
  Schema.Struct({
    sizeBytes: Schema.optional(Schema.String),
    automlModel: Schema.optional(Schema.String),
    gcsTfliteUri: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "TfLiteModel" }) as any as Schema.Schema<TfLiteModel>;

export interface Status {
  /** The status code, which should be an enum value of google.rpc.Code. */
  code?: number;
  /** A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. */
  message?: string;
  /** A list of messages that carry the error details. There is a common set of message types for APIs to use. */
  details?: Array<Record<string, unknown>>;
}

export const Status: Schema.Schema<Status> = Schema.suspend(() =>
  Schema.Struct({
    code: Schema.optional(Schema.Number),
    message: Schema.optional(Schema.String),
    details: Schema.optional(
      Schema.Array(Schema.Record(Schema.String, Schema.Unknown)),
    ),
  }),
).annotate({ identifier: "Status" }) as any as Schema.Schema<Status>;

export interface ModelState {
  /** Indicates if this model has been published. */
  published?: boolean;
  /** Output only. Indicates the latest validation error on the model if any. A model may have validation errors if there were problems during the model creation/update. e.g. in the case of a TfLiteModel, if a tflite model file was missing or in the wrong format. This field will be empty for valid models. */
  validationError?: Status;
}

export const ModelState: Schema.Schema<ModelState> = Schema.suspend(() =>
  Schema.Struct({
    published: Schema.optional(Schema.Boolean),
    validationError: Schema.optional(Status),
  }),
).annotate({ identifier: "ModelState" }) as any as Schema.Schema<ModelState>;

export interface Operation {
  /** If the value is `false`, it means the operation is still in progress. If `true`, the operation is completed, and either `error` or `response` is available. */
  done?: boolean;
  /** The error result of the operation in case of failure or cancellation. */
  error?: Status;
  /** The server-assigned name, which is only unique within the same service that originally returns it. If you use the default HTTP mapping, the `name` should be a resource name ending with `operations/{unique_id}`. */
  name?: string;
  /** The normal, successful response of the operation. If the original method returns no data on success, such as `Delete`, the response is `google.protobuf.Empty`. If the original method is standard `Get`/`Create`/`Update`, the response should be the resource. For other methods, the response should have the type `XxxResponse`, where `Xxx` is the original method name. For example, if the original method name is `TakeSnapshot()`, the inferred response type is `TakeSnapshotResponse`. */
  response?: Record<string, unknown>;
  /** Service-specific metadata associated with the operation. It typically contains progress information and common metadata such as create time. Some services might not provide such metadata. Any method that returns a long-running operation should document the metadata type, if any. */
  metadata?: Record<string, unknown>;
}

export const Operation: Schema.Schema<Operation> = Schema.suspend(() =>
  Schema.Struct({
    done: Schema.optional(Schema.Boolean),
    error: Schema.optional(Status),
    name: Schema.optional(Schema.String),
    response: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
    metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  }),
).annotate({ identifier: "Operation" }) as any as Schema.Schema<Operation>;

export interface Model {
  /** Output only. Timestamp when this model was created in Firebase ML. */
  createTime?: string;
  /** A TFLite Model */
  tfliteModel?: TfLiteModel;
  /** Required. The name of the model to create. The name can be up to 32 characters long and can consist only of ASCII Latin letters A-Z and a-z, underscores(_) and ASCII digits 0-9. It must start with a letter. */
  displayName?: string;
  /** Output only. Timestamp when this model was updated in Firebase ML. */
  updateTime?: string;
  /** State common to all model types. Includes publishing and validation information. */
  state?: ModelState;
  /** The resource name of the Model. Model names have the form `projects/{project_id}/models/{model_id}` The name is ignored when creating a model. */
  name?: string;
  /** Output only. Lists operation ids associated with this model whose status is NOT done. */
  activeOperations?: Array<Operation>;
  /** Output only. The model_hash will change if a new file is available for download. */
  modelHash?: string;
  /** User defined tags which can be used to group/filter models during listing */
  tags?: Array<string>;
  /** Output only. See RFC7232 https://tools.ietf.org/html/rfc7232#section-2.3 */
  etag?: string;
}

export const Model: Schema.Schema<Model> = Schema.suspend(() =>
  Schema.Struct({
    createTime: Schema.optional(Schema.String),
    tfliteModel: Schema.optional(TfLiteModel),
    displayName: Schema.optional(Schema.String),
    updateTime: Schema.optional(Schema.String),
    state: Schema.optional(ModelState),
    name: Schema.optional(Schema.String),
    activeOperations: Schema.optional(Schema.Array(Operation)),
    modelHash: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Array(Schema.String)),
    etag: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Model" }) as any as Schema.Schema<Model>;

export interface ListModelsResponse {
  /** The list of models */
  models?: Array<Model>;
  /** Token to retrieve the next page of results, or empty if there are no more results in the list. */
  nextPageToken?: string;
}

export const ListModelsResponse: Schema.Schema<ListModelsResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      models: Schema.optional(Schema.Array(Model)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListModelsResponse",
  }) as any as Schema.Schema<ListModelsResponse>;

export interface ModelOperationMetadata {
  /** The name of the model we are creating/updating The name must have the form `projects/{project_id}/models/{model_id}` */
  name?: string;
  basicOperationStatus?:
    | "BASIC_OPERATION_STATUS_UNSPECIFIED"
    | "BASIC_OPERATION_STATUS_UPLOADING"
    | "BASIC_OPERATION_STATUS_VERIFYING"
    | (string & {});
}

export const ModelOperationMetadata: Schema.Schema<ModelOperationMetadata> =
  Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      basicOperationStatus: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ModelOperationMetadata",
  }) as any as Schema.Schema<ModelOperationMetadata>;

export interface DownloadModelResponse {
  /** Output only. The size of the file(s), if this information is available. */
  sizeBytes?: string;
  /** Output only. The format of the model being downloaded. */
  modelFormat?: "MODEL_FORMAT_UNSPECIFIED" | "TFLITE" | (string & {});
  /** Output only. A download URI for the model/zip file. */
  downloadUri?: string;
  /** Output only. The time that the download URI link expires. If the link has expired, the REST call must be repeated. */
  expireTime?: string;
}

export const DownloadModelResponse: Schema.Schema<DownloadModelResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      sizeBytes: Schema.optional(Schema.String),
      modelFormat: Schema.optional(Schema.String),
      downloadUri: Schema.optional(Schema.String),
      expireTime: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "DownloadModelResponse",
  }) as any as Schema.Schema<DownloadModelResponse>;

// ==========================================================================
// Operations
// ==========================================================================

export interface DownloadProjectsModelsRequest {
  /** Required. The name of the model to download. The name must have the form `projects/{project}/models/{model}` */
  name: string;
}

export const DownloadProjectsModelsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1beta2/projects/{projectsId}/models/{modelsId}:download",
  }),
  svc,
) as unknown as Schema.Schema<DownloadProjectsModelsRequest>;

export type DownloadProjectsModelsResponse = DownloadModelResponse;
export const DownloadProjectsModelsResponse = DownloadModelResponse;

export type DownloadProjectsModelsError = DefaultErrors;

/** Gets Download information for a model. This is meant for downloading model resources onto devices. It gives very limited information about the model. */
export const downloadProjectsModels: API.OperationMethod<
  DownloadProjectsModelsRequest,
  DownloadProjectsModelsResponse,
  DownloadProjectsModelsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DownloadProjectsModelsRequest,
  output: DownloadProjectsModelsResponse,
  errors: [],
}));

export interface ListProjectsModelsRequest {
  /** The next_page_token value returned from a previous List request, if any. */
  pageToken?: string;
  /** Required. The name of the parent to list models for. The parent must have the form `projects/{project_id}' */
  parent: string;
  /** A filter for the list e.g. 'tags: abc' to list models which are tagged with "abc" */
  filter?: string;
  /** The maximum number of items to return */
  pageSize?: number;
}

export const ListProjectsModelsRequest = Schema.Struct({
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta2/projects/{projectsId}/models" }),
  svc,
) as unknown as Schema.Schema<ListProjectsModelsRequest>;

export type ListProjectsModelsResponse = ListModelsResponse;
export const ListProjectsModelsResponse = ListModelsResponse;

export type ListProjectsModelsError = DefaultErrors;

/** Lists the models */
export const listProjectsModels: API.PaginatedOperationMethod<
  ListProjectsModelsRequest,
  ListProjectsModelsResponse,
  ListProjectsModelsError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListProjectsModelsRequest,
  output: ListProjectsModelsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface CreateProjectsModelsRequest {
  /** Required. The parent project resource where the model is to be created. The parent must have the form `projects/{project_id}` */
  parent: string;
  /** Request body */
  body?: Model;
}

export const CreateProjectsModelsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(Model).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1beta2/projects/{projectsId}/models",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<CreateProjectsModelsRequest>;

export type CreateProjectsModelsResponse = Operation;
export const CreateProjectsModelsResponse = Operation;

export type CreateProjectsModelsError = DefaultErrors;

/** Creates a model in Firebase ML. The longrunning operation will eventually return a Model */
export const createProjectsModels: API.OperationMethod<
  CreateProjectsModelsRequest,
  CreateProjectsModelsResponse,
  CreateProjectsModelsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateProjectsModelsRequest,
  output: CreateProjectsModelsResponse,
  errors: [],
}));

export interface GetProjectsModelsRequest {
  /** Required. The name of the model to get. The name must have the form `projects/{project_id}/models/{model_id}` */
  name: string;
}

export const GetProjectsModelsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1beta2/projects/{projectsId}/models/{modelsId}",
  }),
  svc,
) as unknown as Schema.Schema<GetProjectsModelsRequest>;

export type GetProjectsModelsResponse = Model;
export const GetProjectsModelsResponse = Model;

export type GetProjectsModelsError = DefaultErrors;

/** Gets a model resource. */
export const getProjectsModels: API.OperationMethod<
  GetProjectsModelsRequest,
  GetProjectsModelsResponse,
  GetProjectsModelsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetProjectsModelsRequest,
  output: GetProjectsModelsResponse,
  errors: [],
}));

export interface PatchProjectsModelsRequest {
  /** The resource name of the Model. Model names have the form `projects/{project_id}/models/{model_id}` The name is ignored when creating a model. */
  name: string;
  /** The update mask */
  updateMask?: string;
  /** Request body */
  body?: Model;
}

export const PatchProjectsModelsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(Model).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "v1beta2/projects/{projectsId}/models/{modelsId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<PatchProjectsModelsRequest>;

export type PatchProjectsModelsResponse = Operation;
export const PatchProjectsModelsResponse = Operation;

export type PatchProjectsModelsError = DefaultErrors;

/** Updates a model. The longrunning operation will eventually return a Model. */
export const patchProjectsModels: API.OperationMethod<
  PatchProjectsModelsRequest,
  PatchProjectsModelsResponse,
  PatchProjectsModelsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchProjectsModelsRequest,
  output: PatchProjectsModelsResponse,
  errors: [],
}));

export interface DeleteProjectsModelsRequest {
  /** Required. The name of the model to delete. The name must have the form `projects/{project_id}/models/{model_id}` */
  name: string;
}

export const DeleteProjectsModelsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "v1beta2/projects/{projectsId}/models/{modelsId}",
  }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsModelsRequest>;

export type DeleteProjectsModelsResponse = Empty;
export const DeleteProjectsModelsResponse = Empty;

export type DeleteProjectsModelsError = DefaultErrors;

/** Deletes a model */
export const deleteProjectsModels: API.OperationMethod<
  DeleteProjectsModelsRequest,
  DeleteProjectsModelsResponse,
  DeleteProjectsModelsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteProjectsModelsRequest,
  output: DeleteProjectsModelsResponse,
  errors: [],
}));

export interface GetProjectsOperationsRequest {
  /** The name of the operation resource. */
  name: string;
}

export const GetProjectsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1beta2/projects/{projectsId}/operations/{operationsId}",
  }),
  svc,
) as unknown as Schema.Schema<GetProjectsOperationsRequest>;

export type GetProjectsOperationsResponse = Operation;
export const GetProjectsOperationsResponse = Operation;

export type GetProjectsOperationsError = DefaultErrors;

/** Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service. */
export const getProjectsOperations: API.OperationMethod<
  GetProjectsOperationsRequest,
  GetProjectsOperationsResponse,
  GetProjectsOperationsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetProjectsOperationsRequest,
  output: GetProjectsOperationsResponse,
  errors: [],
}));
