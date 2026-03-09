// ==========================================================================
// Cloud Datastore API (datastore v1beta1)
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
  name: "datastore",
  version: "v1beta1",
  rootUrl: "https://datastore.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface GoogleDatastoreAdminV1Progress {
  /** The amount of work that has been completed. Note that this may be greater than work_estimated. */
  workCompleted?: string;
  /** An estimate of how much work needs to be performed. May be zero if the work estimate is unavailable. */
  workEstimated?: string;
}

export const GoogleDatastoreAdminV1Progress: Schema.Schema<GoogleDatastoreAdminV1Progress> =
  Schema.suspend(() =>
    Schema.Struct({
      workCompleted: Schema.optional(Schema.String),
      workEstimated: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleDatastoreAdminV1Progress",
  }) as any as Schema.Schema<GoogleDatastoreAdminV1Progress>;

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

export interface GoogleDatastoreAdminV1beta1CommonMetadata {
  /** The client-assigned labels which were provided when the operation was created. May also include additional labels. */
  labels?: Record<string, string>;
  /** The time that work began on the operation. */
  startTime?: string;
  /** The time the operation ended, either successfully or otherwise. */
  endTime?: string;
  /** The type of the operation. Can be used as a filter in ListOperationsRequest. */
  operationType?:
    | "OPERATION_TYPE_UNSPECIFIED"
    | "EXPORT_ENTITIES"
    | "IMPORT_ENTITIES"
    | (string & {});
  /** The current state of the Operation. */
  state?:
    | "STATE_UNSPECIFIED"
    | "INITIALIZING"
    | "PROCESSING"
    | "CANCELLING"
    | "FINALIZING"
    | "SUCCESSFUL"
    | "FAILED"
    | "CANCELLED"
    | (string & {});
}

export const GoogleDatastoreAdminV1beta1CommonMetadata: Schema.Schema<GoogleDatastoreAdminV1beta1CommonMetadata> =
  Schema.suspend(() =>
    Schema.Struct({
      labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      startTime: Schema.optional(Schema.String),
      endTime: Schema.optional(Schema.String),
      operationType: Schema.optional(Schema.String),
      state: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleDatastoreAdminV1beta1CommonMetadata",
  }) as any as Schema.Schema<GoogleDatastoreAdminV1beta1CommonMetadata>;

export interface GoogleDatastoreAdminV1beta1EntityFilter {
  /** If empty, then this represents all kinds. */
  kinds?: Array<string>;
  /** An empty list represents all namespaces. This is the preferred usage for projects that don't use namespaces. An empty string element represents the default namespace. This should be used if the project has data in non-default namespaces, but doesn't want to include them. Each namespace in this list must be unique. */
  namespaceIds?: Array<string>;
}

export const GoogleDatastoreAdminV1beta1EntityFilter: Schema.Schema<GoogleDatastoreAdminV1beta1EntityFilter> =
  Schema.suspend(() =>
    Schema.Struct({
      kinds: Schema.optional(Schema.Array(Schema.String)),
      namespaceIds: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "GoogleDatastoreAdminV1beta1EntityFilter",
  }) as any as Schema.Schema<GoogleDatastoreAdminV1beta1EntityFilter>;

export interface GoogleDatastoreAdminV1beta1ExportEntitiesRequest {
  /** Location for the export metadata and data files. The full resource URL of the external storage location. Currently, only Google Cloud Storage is supported. So output_url_prefix should be of the form: `gs://BUCKET_NAME[/NAMESPACE_PATH]`, where `BUCKET_NAME` is the name of the Cloud Storage bucket and `NAMESPACE_PATH` is an optional Cloud Storage namespace path (this is not a Cloud Datastore namespace). For more information about Cloud Storage namespace paths, see [Object name considerations](https://cloud.google.com/storage/docs/naming#object-considerations). The resulting files will be nested deeper than the specified URL prefix. The final output URL will be provided in the google.datastore.admin.v1beta1.ExportEntitiesResponse.output_url field. That value should be used for subsequent ImportEntities operations. By nesting the data files deeper, the same Cloud Storage bucket can be used in multiple ExportEntities operations without conflict. */
  outputUrlPrefix?: string;
  /** Client-assigned labels. */
  labels?: Record<string, string>;
  /** Description of what data from the project is included in the export. */
  entityFilter?: GoogleDatastoreAdminV1beta1EntityFilter;
}

export const GoogleDatastoreAdminV1beta1ExportEntitiesRequest: Schema.Schema<GoogleDatastoreAdminV1beta1ExportEntitiesRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      outputUrlPrefix: Schema.optional(Schema.String),
      labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      entityFilter: Schema.optional(GoogleDatastoreAdminV1beta1EntityFilter),
    }),
  ).annotate({
    identifier: "GoogleDatastoreAdminV1beta1ExportEntitiesRequest",
  }) as any as Schema.Schema<GoogleDatastoreAdminV1beta1ExportEntitiesRequest>;

export interface GoogleDatastoreAdminV1MigrationStateEvent {
  /** The new state of the migration. */
  state?:
    | "MIGRATION_STATE_UNSPECIFIED"
    | "RUNNING"
    | "PAUSED"
    | "COMPLETE"
    | (string & {});
}

export const GoogleDatastoreAdminV1MigrationStateEvent: Schema.Schema<GoogleDatastoreAdminV1MigrationStateEvent> =
  Schema.suspend(() =>
    Schema.Struct({
      state: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleDatastoreAdminV1MigrationStateEvent",
  }) as any as Schema.Schema<GoogleDatastoreAdminV1MigrationStateEvent>;

export interface GoogleDatastoreAdminV1EntityFilter {
  /** If empty, then this represents all kinds. */
  kinds?: Array<string>;
  /** An empty list represents all namespaces. This is the preferred usage for projects that don't use namespaces. An empty string element represents the default namespace. This should be used if the project has data in non-default namespaces, but doesn't want to include them. Each namespace in this list must be unique. */
  namespaceIds?: Array<string>;
}

export const GoogleDatastoreAdminV1EntityFilter: Schema.Schema<GoogleDatastoreAdminV1EntityFilter> =
  Schema.suspend(() =>
    Schema.Struct({
      kinds: Schema.optional(Schema.Array(Schema.String)),
      namespaceIds: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "GoogleDatastoreAdminV1EntityFilter",
  }) as any as Schema.Schema<GoogleDatastoreAdminV1EntityFilter>;

export interface GoogleDatastoreAdminV1CommonMetadata {
  /** The current state of the Operation. */
  state?:
    | "STATE_UNSPECIFIED"
    | "INITIALIZING"
    | "PROCESSING"
    | "CANCELLING"
    | "FINALIZING"
    | "SUCCESSFUL"
    | "FAILED"
    | "CANCELLED"
    | (string & {});
  /** The type of the operation. Can be used as a filter in ListOperationsRequest. */
  operationType?:
    | "OPERATION_TYPE_UNSPECIFIED"
    | "EXPORT_ENTITIES"
    | "IMPORT_ENTITIES"
    | "CREATE_INDEX"
    | "DELETE_INDEX"
    | (string & {});
  /** The time the operation ended, either successfully or otherwise. */
  endTime?: string;
  /** The time that work began on the operation. */
  startTime?: string;
  /** The client-assigned labels which were provided when the operation was created. May also include additional labels. */
  labels?: Record<string, string>;
}

export const GoogleDatastoreAdminV1CommonMetadata: Schema.Schema<GoogleDatastoreAdminV1CommonMetadata> =
  Schema.suspend(() =>
    Schema.Struct({
      state: Schema.optional(Schema.String),
      operationType: Schema.optional(Schema.String),
      endTime: Schema.optional(Schema.String),
      startTime: Schema.optional(Schema.String),
      labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    }),
  ).annotate({
    identifier: "GoogleDatastoreAdminV1CommonMetadata",
  }) as any as Schema.Schema<GoogleDatastoreAdminV1CommonMetadata>;

export interface GoogleDatastoreAdminV1ImportEntitiesMetadata {
  /** An estimate of the number of entities processed. */
  progressEntities?: GoogleDatastoreAdminV1Progress;
  /** Description of which entities are being imported. */
  entityFilter?: GoogleDatastoreAdminV1EntityFilter;
  /** Metadata common to all Datastore Admin operations. */
  common?: GoogleDatastoreAdminV1CommonMetadata;
  /** An estimate of the number of bytes processed. */
  progressBytes?: GoogleDatastoreAdminV1Progress;
  /** The location of the import metadata file. This will be the same value as the google.datastore.admin.v1.ExportEntitiesResponse.output_url field. */
  inputUrl?: string;
}

export const GoogleDatastoreAdminV1ImportEntitiesMetadata: Schema.Schema<GoogleDatastoreAdminV1ImportEntitiesMetadata> =
  Schema.suspend(() =>
    Schema.Struct({
      progressEntities: Schema.optional(GoogleDatastoreAdminV1Progress),
      entityFilter: Schema.optional(GoogleDatastoreAdminV1EntityFilter),
      common: Schema.optional(GoogleDatastoreAdminV1CommonMetadata),
      progressBytes: Schema.optional(GoogleDatastoreAdminV1Progress),
      inputUrl: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleDatastoreAdminV1ImportEntitiesMetadata",
  }) as any as Schema.Schema<GoogleDatastoreAdminV1ImportEntitiesMetadata>;

export interface GoogleDatastoreAdminV1beta1Progress {
  /** The amount of work that has been completed. Note that this may be greater than work_estimated. */
  workCompleted?: string;
  /** An estimate of how much work needs to be performed. May be zero if the work estimate is unavailable. */
  workEstimated?: string;
}

export const GoogleDatastoreAdminV1beta1Progress: Schema.Schema<GoogleDatastoreAdminV1beta1Progress> =
  Schema.suspend(() =>
    Schema.Struct({
      workCompleted: Schema.optional(Schema.String),
      workEstimated: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleDatastoreAdminV1beta1Progress",
  }) as any as Schema.Schema<GoogleDatastoreAdminV1beta1Progress>;

export interface GoogleDatastoreAdminV1IndexOperationMetadata {
  /** Metadata common to all Datastore Admin operations. */
  common?: GoogleDatastoreAdminV1CommonMetadata;
  /** An estimate of the number of entities processed. */
  progressEntities?: GoogleDatastoreAdminV1Progress;
  /** The index resource ID that this operation is acting on. */
  indexId?: string;
}

export const GoogleDatastoreAdminV1IndexOperationMetadata: Schema.Schema<GoogleDatastoreAdminV1IndexOperationMetadata> =
  Schema.suspend(() =>
    Schema.Struct({
      common: Schema.optional(GoogleDatastoreAdminV1CommonMetadata),
      progressEntities: Schema.optional(GoogleDatastoreAdminV1Progress),
      indexId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleDatastoreAdminV1IndexOperationMetadata",
  }) as any as Schema.Schema<GoogleDatastoreAdminV1IndexOperationMetadata>;

export interface GoogleDatastoreAdminV1beta1ImportEntitiesRequest {
  /** The full resource URL of the external storage location. Currently, only Google Cloud Storage is supported. So input_url should be of the form: `gs://BUCKET_NAME[/NAMESPACE_PATH]/OVERALL_EXPORT_METADATA_FILE`, where `BUCKET_NAME` is the name of the Cloud Storage bucket, `NAMESPACE_PATH` is an optional Cloud Storage namespace path (this is not a Cloud Datastore namespace), and `OVERALL_EXPORT_METADATA_FILE` is the metadata file written by the ExportEntities operation. For more information about Cloud Storage namespace paths, see [Object name considerations](https://cloud.google.com/storage/docs/naming#object-considerations). For more information, see google.datastore.admin.v1beta1.ExportEntitiesResponse.output_url. */
  inputUrl?: string;
  /** Client-assigned labels. */
  labels?: Record<string, string>;
  /** Optionally specify which kinds/namespaces are to be imported. If provided, the list must be a subset of the EntityFilter used in creating the export, otherwise a FAILED_PRECONDITION error will be returned. If no filter is specified then all entities from the export are imported. */
  entityFilter?: GoogleDatastoreAdminV1beta1EntityFilter;
}

export const GoogleDatastoreAdminV1beta1ImportEntitiesRequest: Schema.Schema<GoogleDatastoreAdminV1beta1ImportEntitiesRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      inputUrl: Schema.optional(Schema.String),
      labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      entityFilter: Schema.optional(GoogleDatastoreAdminV1beta1EntityFilter),
    }),
  ).annotate({
    identifier: "GoogleDatastoreAdminV1beta1ImportEntitiesRequest",
  }) as any as Schema.Schema<GoogleDatastoreAdminV1beta1ImportEntitiesRequest>;

export interface GoogleDatastoreAdminV1beta1ExportEntitiesMetadata {
  /** Metadata common to all Datastore Admin operations. */
  common?: GoogleDatastoreAdminV1beta1CommonMetadata;
  /** An estimate of the number of bytes processed. */
  progressBytes?: GoogleDatastoreAdminV1beta1Progress;
  /** Location for the export metadata and data files. This will be the same value as the google.datastore.admin.v1beta1.ExportEntitiesRequest.output_url_prefix field. The final output location is provided in google.datastore.admin.v1beta1.ExportEntitiesResponse.output_url. */
  outputUrlPrefix?: string;
  /** Description of which entities are being exported. */
  entityFilter?: GoogleDatastoreAdminV1beta1EntityFilter;
  /** An estimate of the number of entities processed. */
  progressEntities?: GoogleDatastoreAdminV1beta1Progress;
}

export const GoogleDatastoreAdminV1beta1ExportEntitiesMetadata: Schema.Schema<GoogleDatastoreAdminV1beta1ExportEntitiesMetadata> =
  Schema.suspend(() =>
    Schema.Struct({
      common: Schema.optional(GoogleDatastoreAdminV1beta1CommonMetadata),
      progressBytes: Schema.optional(GoogleDatastoreAdminV1beta1Progress),
      outputUrlPrefix: Schema.optional(Schema.String),
      entityFilter: Schema.optional(GoogleDatastoreAdminV1beta1EntityFilter),
      progressEntities: Schema.optional(GoogleDatastoreAdminV1beta1Progress),
    }),
  ).annotate({
    identifier: "GoogleDatastoreAdminV1beta1ExportEntitiesMetadata",
  }) as any as Schema.Schema<GoogleDatastoreAdminV1beta1ExportEntitiesMetadata>;

export interface GoogleDatastoreAdminV1beta1ImportEntitiesMetadata {
  /** Description of which entities are being imported. */
  entityFilter?: GoogleDatastoreAdminV1beta1EntityFilter;
  /** An estimate of the number of entities processed. */
  progressEntities?: GoogleDatastoreAdminV1beta1Progress;
  /** Metadata common to all Datastore Admin operations. */
  common?: GoogleDatastoreAdminV1beta1CommonMetadata;
  /** An estimate of the number of bytes processed. */
  progressBytes?: GoogleDatastoreAdminV1beta1Progress;
  /** The location of the import metadata file. This will be the same value as the google.datastore.admin.v1beta1.ExportEntitiesResponse.output_url field. */
  inputUrl?: string;
}

export const GoogleDatastoreAdminV1beta1ImportEntitiesMetadata: Schema.Schema<GoogleDatastoreAdminV1beta1ImportEntitiesMetadata> =
  Schema.suspend(() =>
    Schema.Struct({
      entityFilter: Schema.optional(GoogleDatastoreAdminV1beta1EntityFilter),
      progressEntities: Schema.optional(GoogleDatastoreAdminV1beta1Progress),
      common: Schema.optional(GoogleDatastoreAdminV1beta1CommonMetadata),
      progressBytes: Schema.optional(GoogleDatastoreAdminV1beta1Progress),
      inputUrl: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleDatastoreAdminV1beta1ImportEntitiesMetadata",
  }) as any as Schema.Schema<GoogleDatastoreAdminV1beta1ImportEntitiesMetadata>;

export interface GoogleDatastoreAdminV1DatastoreFirestoreMigrationMetadata {
  /** The current step of migration from Cloud Datastore to Cloud Firestore in Datastore mode. */
  migrationStep?:
    | "MIGRATION_STEP_UNSPECIFIED"
    | "PREPARE"
    | "START"
    | "APPLY_WRITES_SYNCHRONOUSLY"
    | "COPY_AND_VERIFY"
    | "REDIRECT_EVENTUALLY_CONSISTENT_READS"
    | "REDIRECT_STRONGLY_CONSISTENT_READS"
    | "REDIRECT_WRITES"
    | (string & {});
  /** The current state of migration from Cloud Datastore to Cloud Firestore in Datastore mode. */
  migrationState?:
    | "MIGRATION_STATE_UNSPECIFIED"
    | "RUNNING"
    | "PAUSED"
    | "COMPLETE"
    | (string & {});
}

export const GoogleDatastoreAdminV1DatastoreFirestoreMigrationMetadata: Schema.Schema<GoogleDatastoreAdminV1DatastoreFirestoreMigrationMetadata> =
  Schema.suspend(() =>
    Schema.Struct({
      migrationStep: Schema.optional(Schema.String),
      migrationState: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleDatastoreAdminV1DatastoreFirestoreMigrationMetadata",
  }) as any as Schema.Schema<GoogleDatastoreAdminV1DatastoreFirestoreMigrationMetadata>;

export interface GoogleDatastoreAdminV1ExportEntitiesResponse {
  /** Location of the output metadata file. This can be used to begin an import into Cloud Datastore (this project or another project). See google.datastore.admin.v1.ImportEntitiesRequest.input_url. Only present if the operation completed successfully. */
  outputUrl?: string;
}

export const GoogleDatastoreAdminV1ExportEntitiesResponse: Schema.Schema<GoogleDatastoreAdminV1ExportEntitiesResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      outputUrl: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleDatastoreAdminV1ExportEntitiesResponse",
  }) as any as Schema.Schema<GoogleDatastoreAdminV1ExportEntitiesResponse>;

export interface GoogleLongrunningOperation {
  /** The server-assigned name, which is only unique within the same service that originally returns it. If you use the default HTTP mapping, the `name` should be a resource name ending with `operations/{unique_id}`. */
  name?: string;
  /** The error result of the operation in case of failure or cancellation. */
  error?: Status;
  /** The normal, successful response of the operation. If the original method returns no data on success, such as `Delete`, the response is `google.protobuf.Empty`. If the original method is standard `Get`/`Create`/`Update`, the response should be the resource. For other methods, the response should have the type `XxxResponse`, where `Xxx` is the original method name. For example, if the original method name is `TakeSnapshot()`, the inferred response type is `TakeSnapshotResponse`. */
  response?: Record<string, unknown>;
  /** If the value is `false`, it means the operation is still in progress. If `true`, the operation is completed, and either `error` or `response` is available. */
  done?: boolean;
  /** Service-specific metadata associated with the operation. It typically contains progress information and common metadata such as create time. Some services might not provide such metadata. Any method that returns a long-running operation should document the metadata type, if any. */
  metadata?: Record<string, unknown>;
}

export const GoogleLongrunningOperation: Schema.Schema<GoogleLongrunningOperation> =
  Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      error: Schema.optional(Status),
      response: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
      done: Schema.optional(Schema.Boolean),
      metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
    }),
  ).annotate({
    identifier: "GoogleLongrunningOperation",
  }) as any as Schema.Schema<GoogleLongrunningOperation>;

export interface GoogleDatastoreAdminV1PrepareStepDetails {
  /** The concurrency mode this database will use when it reaches the `REDIRECT_WRITES` step. */
  concurrencyMode?:
    | "CONCURRENCY_MODE_UNSPECIFIED"
    | "PESSIMISTIC"
    | "OPTIMISTIC"
    | "OPTIMISTIC_WITH_ENTITY_GROUPS"
    | (string & {});
}

export const GoogleDatastoreAdminV1PrepareStepDetails: Schema.Schema<GoogleDatastoreAdminV1PrepareStepDetails> =
  Schema.suspend(() =>
    Schema.Struct({
      concurrencyMode: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleDatastoreAdminV1PrepareStepDetails",
  }) as any as Schema.Schema<GoogleDatastoreAdminV1PrepareStepDetails>;

export interface GoogleDatastoreAdminV1RedirectWritesStepDetails {
  /** The concurrency mode for this database. */
  concurrencyMode?:
    | "CONCURRENCY_MODE_UNSPECIFIED"
    | "PESSIMISTIC"
    | "OPTIMISTIC"
    | "OPTIMISTIC_WITH_ENTITY_GROUPS"
    | (string & {});
}

export const GoogleDatastoreAdminV1RedirectWritesStepDetails: Schema.Schema<GoogleDatastoreAdminV1RedirectWritesStepDetails> =
  Schema.suspend(() =>
    Schema.Struct({
      concurrencyMode: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleDatastoreAdminV1RedirectWritesStepDetails",
  }) as any as Schema.Schema<GoogleDatastoreAdminV1RedirectWritesStepDetails>;

export interface GoogleDatastoreAdminV1MigrationProgressEvent {
  /** Details for the `PREPARE` step. */
  prepareStepDetails?: GoogleDatastoreAdminV1PrepareStepDetails;
  /** The step that is starting. An event with step set to `START` indicates that the migration has been reverted back to the initial pre-migration state. */
  step?:
    | "MIGRATION_STEP_UNSPECIFIED"
    | "PREPARE"
    | "START"
    | "APPLY_WRITES_SYNCHRONOUSLY"
    | "COPY_AND_VERIFY"
    | "REDIRECT_EVENTUALLY_CONSISTENT_READS"
    | "REDIRECT_STRONGLY_CONSISTENT_READS"
    | "REDIRECT_WRITES"
    | (string & {});
  /** Details for the `REDIRECT_WRITES` step. */
  redirectWritesStepDetails?: GoogleDatastoreAdminV1RedirectWritesStepDetails;
}

export const GoogleDatastoreAdminV1MigrationProgressEvent: Schema.Schema<GoogleDatastoreAdminV1MigrationProgressEvent> =
  Schema.suspend(() =>
    Schema.Struct({
      prepareStepDetails: Schema.optional(
        GoogleDatastoreAdminV1PrepareStepDetails,
      ),
      step: Schema.optional(Schema.String),
      redirectWritesStepDetails: Schema.optional(
        GoogleDatastoreAdminV1RedirectWritesStepDetails,
      ),
    }),
  ).annotate({
    identifier: "GoogleDatastoreAdminV1MigrationProgressEvent",
  }) as any as Schema.Schema<GoogleDatastoreAdminV1MigrationProgressEvent>;

export interface GoogleDatastoreAdminV1ExportEntitiesMetadata {
  /** An estimate of the number of entities processed. */
  progressEntities?: GoogleDatastoreAdminV1Progress;
  /** Description of which entities are being exported. */
  entityFilter?: GoogleDatastoreAdminV1EntityFilter;
  /** Metadata common to all Datastore Admin operations. */
  common?: GoogleDatastoreAdminV1CommonMetadata;
  /** An estimate of the number of bytes processed. */
  progressBytes?: GoogleDatastoreAdminV1Progress;
  /** Location for the export metadata and data files. This will be the same value as the google.datastore.admin.v1.ExportEntitiesRequest.output_url_prefix field. The final output location is provided in google.datastore.admin.v1.ExportEntitiesResponse.output_url. */
  outputUrlPrefix?: string;
}

export const GoogleDatastoreAdminV1ExportEntitiesMetadata: Schema.Schema<GoogleDatastoreAdminV1ExportEntitiesMetadata> =
  Schema.suspend(() =>
    Schema.Struct({
      progressEntities: Schema.optional(GoogleDatastoreAdminV1Progress),
      entityFilter: Schema.optional(GoogleDatastoreAdminV1EntityFilter),
      common: Schema.optional(GoogleDatastoreAdminV1CommonMetadata),
      progressBytes: Schema.optional(GoogleDatastoreAdminV1Progress),
      outputUrlPrefix: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleDatastoreAdminV1ExportEntitiesMetadata",
  }) as any as Schema.Schema<GoogleDatastoreAdminV1ExportEntitiesMetadata>;

export interface GoogleDatastoreAdminV1beta1ExportEntitiesResponse {
  /** Location of the output metadata file. This can be used to begin an import into Cloud Datastore (this project or another project). See google.datastore.admin.v1beta1.ImportEntitiesRequest.input_url. Only present if the operation completed successfully. */
  outputUrl?: string;
}

export const GoogleDatastoreAdminV1beta1ExportEntitiesResponse: Schema.Schema<GoogleDatastoreAdminV1beta1ExportEntitiesResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      outputUrl: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleDatastoreAdminV1beta1ExportEntitiesResponse",
  }) as any as Schema.Schema<GoogleDatastoreAdminV1beta1ExportEntitiesResponse>;

// ==========================================================================
// Operations
// ==========================================================================

export interface ExportProjectsRequest {
  /** Project ID against which to make the request. */
  projectId: string;
  /** Request body */
  body?: GoogleDatastoreAdminV1beta1ExportEntitiesRequest;
}

export const ExportProjectsRequest = Schema.Struct({
  projectId: Schema.String.pipe(T.HttpPath("projectId")),
  body: Schema.optional(GoogleDatastoreAdminV1beta1ExportEntitiesRequest).pipe(
    T.HttpBody(),
  ),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1beta1/projects/{projectId}:export",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<ExportProjectsRequest>;

export type ExportProjectsResponse = GoogleLongrunningOperation;
export const ExportProjectsResponse = GoogleLongrunningOperation;

export type ExportProjectsError = DefaultErrors;

/** Exports a copy of all or a subset of entities from Google Cloud Datastore to another storage system, such as Google Cloud Storage. Recent updates to entities may not be reflected in the export. The export occurs in the background and its progress can be monitored and managed via the Operation resource that is created. The output of an export may only be used once the associated operation is done. If an export operation is cancelled before completion it may leave partial data behind in Google Cloud Storage. */
export const exportProjects: API.OperationMethod<
  ExportProjectsRequest,
  ExportProjectsResponse,
  ExportProjectsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: ExportProjectsRequest,
  output: ExportProjectsResponse,
  errors: [],
}));

export interface ImportProjectsRequest {
  /** Project ID against which to make the request. */
  projectId: string;
  /** Request body */
  body?: GoogleDatastoreAdminV1beta1ImportEntitiesRequest;
}

export const ImportProjectsRequest = Schema.Struct({
  projectId: Schema.String.pipe(T.HttpPath("projectId")),
  body: Schema.optional(GoogleDatastoreAdminV1beta1ImportEntitiesRequest).pipe(
    T.HttpBody(),
  ),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1beta1/projects/{projectId}:import",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<ImportProjectsRequest>;

export type ImportProjectsResponse = GoogleLongrunningOperation;
export const ImportProjectsResponse = GoogleLongrunningOperation;

export type ImportProjectsError = DefaultErrors;

/** Imports entities into Google Cloud Datastore. Existing entities with the same key are overwritten. The import occurs in the background and its progress can be monitored and managed via the Operation resource that is created. If an ImportEntities operation is cancelled, it is possible that a subset of the data has already been imported to Cloud Datastore. */
export const importProjects: API.OperationMethod<
  ImportProjectsRequest,
  ImportProjectsResponse,
  ImportProjectsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: ImportProjectsRequest,
  output: ImportProjectsResponse,
  errors: [],
}));
