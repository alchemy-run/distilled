// ==========================================================================
// Cloud Firestore API (firestore v1beta2)
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
  name: "firestore",
  version: "v1beta2",
  rootUrl: "https://firestore.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface GoogleFirestoreAdminV1beta2ExportDocumentsRequest {
  /** The output URI. Currently only supports Google Cloud Storage URIs of the form: `gs://BUCKET_NAME[/NAMESPACE_PATH]`, where `BUCKET_NAME` is the name of the Google Cloud Storage bucket and `NAMESPACE_PATH` is an optional Google Cloud Storage namespace path. When choosing a name, be sure to consider Google Cloud Storage naming guidelines: https://cloud.google.com/storage/docs/naming. If the URI is a bucket (without a namespace path), a prefix will be generated based on the start time. */
  outputUriPrefix?: string;
  /** Which collection ids to export. Unspecified means all collections. */
  collectionIds?: Array<string>;
}

export const GoogleFirestoreAdminV1beta2ExportDocumentsRequest: Schema.Schema<GoogleFirestoreAdminV1beta2ExportDocumentsRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      outputUriPrefix: Schema.optional(Schema.String),
      collectionIds: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "GoogleFirestoreAdminV1beta2ExportDocumentsRequest",
  }) as any as Schema.Schema<GoogleFirestoreAdminV1beta2ExportDocumentsRequest>;

export interface GoogleFirestoreAdminV1PitrSnapshot {
  /** Required. The name of the database that this was a snapshot of. Format: `projects/{project}/databases/{database}`. */
  database?: string;
  /** Output only. Public UUID of the database the snapshot was associated with. */
  databaseUid?: string;
  /** Required. Snapshot time of the database. */
  snapshotTime?: string;
}

export const GoogleFirestoreAdminV1PitrSnapshot: Schema.Schema<GoogleFirestoreAdminV1PitrSnapshot> =
  Schema.suspend(() =>
    Schema.Struct({
      database: Schema.optional(Schema.String),
      databaseUid: Schema.optional(Schema.String),
      snapshotTime: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleFirestoreAdminV1PitrSnapshot",
  }) as any as Schema.Schema<GoogleFirestoreAdminV1PitrSnapshot>;

export interface GoogleFirestoreAdminV1beta2ImportDocumentsRequest {
  /** Which collection ids to import. Unspecified means all collections included in the import. */
  collectionIds?: Array<string>;
  /** Location of the exported files. This must match the output_uri_prefix of an ExportDocumentsResponse from an export that has completed successfully. See: google.firestore.admin.v1beta2.ExportDocumentsResponse.output_uri_prefix. */
  inputUriPrefix?: string;
}

export const GoogleFirestoreAdminV1beta2ImportDocumentsRequest: Schema.Schema<GoogleFirestoreAdminV1beta2ImportDocumentsRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      collectionIds: Schema.optional(Schema.Array(Schema.String)),
      inputUriPrefix: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleFirestoreAdminV1beta2ImportDocumentsRequest",
  }) as any as Schema.Schema<GoogleFirestoreAdminV1beta2ImportDocumentsRequest>;

export interface GoogleFirestoreAdminV1beta2Progress {
  /** The amount of work estimated. */
  estimatedWork?: string;
  /** The amount of work completed. */
  completedWork?: string;
}

export const GoogleFirestoreAdminV1beta2Progress: Schema.Schema<GoogleFirestoreAdminV1beta2Progress> =
  Schema.suspend(() =>
    Schema.Struct({
      estimatedWork: Schema.optional(Schema.String),
      completedWork: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleFirestoreAdminV1beta2Progress",
  }) as any as Schema.Schema<GoogleFirestoreAdminV1beta2Progress>;

export interface GoogleFirestoreAdminV1beta2ImportDocumentsMetadata {
  /** The progress, in bytes, of this operation. */
  progressBytes?: GoogleFirestoreAdminV1beta2Progress;
  /** The time this operation started. */
  startTime?: string;
  /** Which collection ids are being imported. */
  collectionIds?: Array<string>;
  /** The location of the documents being imported. */
  inputUriPrefix?: string;
  /** The time this operation completed. Will be unset if operation still in progress. */
  endTime?: string;
  /** The state of the import operation. */
  operationState?:
    | "OPERATION_STATE_UNSPECIFIED"
    | "INITIALIZING"
    | "PROCESSING"
    | "CANCELLING"
    | "FINALIZING"
    | "SUCCESSFUL"
    | "FAILED"
    | "CANCELLED"
    | (string & {});
  /** The progress, in documents, of this operation. */
  progressDocuments?: GoogleFirestoreAdminV1beta2Progress;
}

export const GoogleFirestoreAdminV1beta2ImportDocumentsMetadata: Schema.Schema<GoogleFirestoreAdminV1beta2ImportDocumentsMetadata> =
  Schema.suspend(() =>
    Schema.Struct({
      progressBytes: Schema.optional(GoogleFirestoreAdminV1beta2Progress),
      startTime: Schema.optional(Schema.String),
      collectionIds: Schema.optional(Schema.Array(Schema.String)),
      inputUriPrefix: Schema.optional(Schema.String),
      endTime: Schema.optional(Schema.String),
      operationState: Schema.optional(Schema.String),
      progressDocuments: Schema.optional(GoogleFirestoreAdminV1beta2Progress),
    }),
  ).annotate({
    identifier: "GoogleFirestoreAdminV1beta2ImportDocumentsMetadata",
  }) as any as Schema.Schema<GoogleFirestoreAdminV1beta2ImportDocumentsMetadata>;

export interface GoogleFirestoreAdminV1Progress {
  /** The amount of work estimated. */
  estimatedWork?: string;
  /** The amount of work completed. */
  completedWork?: string;
}

export const GoogleFirestoreAdminV1Progress: Schema.Schema<GoogleFirestoreAdminV1Progress> =
  Schema.suspend(() =>
    Schema.Struct({
      estimatedWork: Schema.optional(Schema.String),
      completedWork: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleFirestoreAdminV1Progress",
  }) as any as Schema.Schema<GoogleFirestoreAdminV1Progress>;

export interface GoogleFirestoreAdminV1BulkDeleteDocumentsMetadata {
  /** The time this operation completed. Will be unset if operation still in progress. */
  endTime?: string;
  /** The state of the operation. */
  operationState?:
    | "OPERATION_STATE_UNSPECIFIED"
    | "INITIALIZING"
    | "PROCESSING"
    | "CANCELLING"
    | "FINALIZING"
    | "SUCCESSFUL"
    | "FAILED"
    | "CANCELLED"
    | (string & {});
  /** The progress, in documents, of this operation. */
  progressDocuments?: GoogleFirestoreAdminV1Progress;
  /** Which namespace IDs are being deleted. */
  namespaceIds?: Array<string>;
  /** The timestamp that corresponds to the version of the database that is being read to get the list of documents to delete. This time can also be used as the timestamp of PITR in case of disaster recovery (subject to PITR window limit). */
  snapshotTime?: string;
  /** The progress, in bytes, of this operation. */
  progressBytes?: GoogleFirestoreAdminV1Progress;
  /** The time this operation started. */
  startTime?: string;
  /** The IDs of the collection groups that are being deleted. */
  collectionIds?: Array<string>;
}

export const GoogleFirestoreAdminV1BulkDeleteDocumentsMetadata: Schema.Schema<GoogleFirestoreAdminV1BulkDeleteDocumentsMetadata> =
  Schema.suspend(() =>
    Schema.Struct({
      endTime: Schema.optional(Schema.String),
      operationState: Schema.optional(Schema.String),
      progressDocuments: Schema.optional(GoogleFirestoreAdminV1Progress),
      namespaceIds: Schema.optional(Schema.Array(Schema.String)),
      snapshotTime: Schema.optional(Schema.String),
      progressBytes: Schema.optional(GoogleFirestoreAdminV1Progress),
      startTime: Schema.optional(Schema.String),
      collectionIds: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "GoogleFirestoreAdminV1BulkDeleteDocumentsMetadata",
  }) as any as Schema.Schema<GoogleFirestoreAdminV1BulkDeleteDocumentsMetadata>;

export interface GoogleFirestoreAdminV1RestoreDatabaseMetadata {
  /** The time the restore finished, unset for ongoing restores. */
  endTime?: string;
  /** The operation state of the restore. */
  operationState?:
    | "OPERATION_STATE_UNSPECIFIED"
    | "INITIALIZING"
    | "PROCESSING"
    | "CANCELLING"
    | "FINALIZING"
    | "SUCCESSFUL"
    | "FAILED"
    | "CANCELLED"
    | (string & {});
  /** How far along the restore is as an estimated percentage of remaining time. */
  progressPercentage?: GoogleFirestoreAdminV1Progress;
  /** The time the restore was started. */
  startTime?: string;
  /** The name of the backup restoring from. */
  backup?: string;
  /** The name of the database being restored to. */
  database?: string;
}

export const GoogleFirestoreAdminV1RestoreDatabaseMetadata: Schema.Schema<GoogleFirestoreAdminV1RestoreDatabaseMetadata> =
  Schema.suspend(() =>
    Schema.Struct({
      endTime: Schema.optional(Schema.String),
      operationState: Schema.optional(Schema.String),
      progressPercentage: Schema.optional(GoogleFirestoreAdminV1Progress),
      startTime: Schema.optional(Schema.String),
      backup: Schema.optional(Schema.String),
      database: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleFirestoreAdminV1RestoreDatabaseMetadata",
  }) as any as Schema.Schema<GoogleFirestoreAdminV1RestoreDatabaseMetadata>;

export interface Status {
  /** A list of messages that carry the error details. There is a common set of message types for APIs to use. */
  details?: Array<Record<string, unknown>>;
  /** A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. */
  message?: string;
  /** The status code, which should be an enum value of google.rpc.Code. */
  code?: number;
}

export const Status: Schema.Schema<Status> = Schema.suspend(() =>
  Schema.Struct({
    details: Schema.optional(
      Schema.Array(Schema.Record(Schema.String, Schema.Unknown)),
    ),
    message: Schema.optional(Schema.String),
    code: Schema.optional(Schema.Number),
  }),
).annotate({ identifier: "Status" }) as any as Schema.Schema<Status>;

export interface GoogleLongrunningOperation {
  /** If the value is `false`, it means the operation is still in progress. If `true`, the operation is completed, and either `error` or `response` is available. */
  done?: boolean;
  /** The normal, successful response of the operation. If the original method returns no data on success, such as `Delete`, the response is `google.protobuf.Empty`. If the original method is standard `Get`/`Create`/`Update`, the response should be the resource. For other methods, the response should have the type `XxxResponse`, where `Xxx` is the original method name. For example, if the original method name is `TakeSnapshot()`, the inferred response type is `TakeSnapshotResponse`. */
  response?: Record<string, unknown>;
  /** Service-specific metadata associated with the operation. It typically contains progress information and common metadata such as create time. Some services might not provide such metadata. Any method that returns a long-running operation should document the metadata type, if any. */
  metadata?: Record<string, unknown>;
  /** The server-assigned name, which is only unique within the same service that originally returns it. If you use the default HTTP mapping, the `name` should be a resource name ending with `operations/{unique_id}`. */
  name?: string;
  /** The error result of the operation in case of failure or cancellation. */
  error?: Status;
}

export const GoogleLongrunningOperation: Schema.Schema<GoogleLongrunningOperation> =
  Schema.suspend(() =>
    Schema.Struct({
      done: Schema.optional(Schema.Boolean),
      response: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
      metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
      name: Schema.optional(Schema.String),
      error: Schema.optional(Status),
    }),
  ).annotate({
    identifier: "GoogleLongrunningOperation",
  }) as any as Schema.Schema<GoogleLongrunningOperation>;

export interface GoogleFirestoreAdminV1beta2IndexOperationMetadata {
  /** The time this operation started. */
  startTime?: string;
  /** The state of the operation. */
  state?:
    | "OPERATION_STATE_UNSPECIFIED"
    | "INITIALIZING"
    | "PROCESSING"
    | "CANCELLING"
    | "FINALIZING"
    | "SUCCESSFUL"
    | "FAILED"
    | "CANCELLED"
    | (string & {});
  /** The progress, in bytes, of this operation. */
  progressBytes?: GoogleFirestoreAdminV1beta2Progress;
  /** The time this operation completed. Will be unset if operation still in progress. */
  endTime?: string;
  /** The progress, in documents, of this operation. */
  progressDocuments?: GoogleFirestoreAdminV1beta2Progress;
  /** The index resource that this operation is acting on. For example: `projects/{project_id}/databases/{database_id}/collectionGroups/{collection_id}/indexes/{index_id}` */
  index?: string;
}

export const GoogleFirestoreAdminV1beta2IndexOperationMetadata: Schema.Schema<GoogleFirestoreAdminV1beta2IndexOperationMetadata> =
  Schema.suspend(() =>
    Schema.Struct({
      startTime: Schema.optional(Schema.String),
      state: Schema.optional(Schema.String),
      progressBytes: Schema.optional(GoogleFirestoreAdminV1beta2Progress),
      endTime: Schema.optional(Schema.String),
      progressDocuments: Schema.optional(GoogleFirestoreAdminV1beta2Progress),
      index: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleFirestoreAdminV1beta2IndexOperationMetadata",
  }) as any as Schema.Schema<GoogleFirestoreAdminV1beta2IndexOperationMetadata>;

export interface Empty {}

export const Empty: Schema.Schema<Empty> = Schema.suspend(() =>
  Schema.Struct({}),
).annotate({ identifier: "Empty" }) as any as Schema.Schema<Empty>;

export interface GoogleFirestoreAdminV1beta2IndexField {
  /** Can be __name__. For single field indexes, this must match the name of the field or may be omitted. */
  fieldPath?: string;
  /** Indicates that this field supports operations on `array_value`s. */
  arrayConfig?: "ARRAY_CONFIG_UNSPECIFIED" | "CONTAINS" | (string & {});
  /** Indicates that this field supports ordering by the specified order or comparing using =, <, <=, >, >=. */
  order?: "ORDER_UNSPECIFIED" | "ASCENDING" | "DESCENDING" | (string & {});
}

export const GoogleFirestoreAdminV1beta2IndexField: Schema.Schema<GoogleFirestoreAdminV1beta2IndexField> =
  Schema.suspend(() =>
    Schema.Struct({
      fieldPath: Schema.optional(Schema.String),
      arrayConfig: Schema.optional(Schema.String),
      order: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleFirestoreAdminV1beta2IndexField",
  }) as any as Schema.Schema<GoogleFirestoreAdminV1beta2IndexField>;

export interface GoogleFirestoreAdminV1beta2Index {
  /** Indexes with a collection query scope specified allow queries against a collection that is the child of a specific document, specified at query time, and that has the same collection id. Indexes with a collection group query scope specified allow queries against all collections descended from a specific document, specified at query time, and that have the same collection id as this index. */
  queryScope?:
    | "QUERY_SCOPE_UNSPECIFIED"
    | "COLLECTION"
    | "COLLECTION_GROUP"
    | (string & {});
  /** Output only. A server defined name for this index. The form of this name for composite indexes will be: `projects/{project_id}/databases/{database_id}/collectionGroups/{collection_id}/indexes/{composite_index_id}` For single field indexes, this field will be empty. */
  name?: string;
  /** The fields supported by this index. For composite indexes, this is always 2 or more fields. The last field entry is always for the field path `__name__`. If, on creation, `__name__` was not specified as the last field, it will be added automatically with the same direction as that of the last field defined. If the final field in a composite index is not directional, the `__name__` will be ordered ASCENDING (unless explicitly specified). For single field indexes, this will always be exactly one entry with a field path equal to the field path of the associated field. */
  fields?: Array<GoogleFirestoreAdminV1beta2IndexField>;
  /** Output only. The serving state of the index. */
  state?:
    | "STATE_UNSPECIFIED"
    | "CREATING"
    | "READY"
    | "NEEDS_REPAIR"
    | (string & {});
}

export const GoogleFirestoreAdminV1beta2Index: Schema.Schema<GoogleFirestoreAdminV1beta2Index> =
  Schema.suspend(() =>
    Schema.Struct({
      queryScope: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
      fields: Schema.optional(
        Schema.Array(GoogleFirestoreAdminV1beta2IndexField),
      ),
      state: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleFirestoreAdminV1beta2Index",
  }) as any as Schema.Schema<GoogleFirestoreAdminV1beta2Index>;

export interface GoogleFirestoreAdminV1beta2IndexConfigDelta {
  /** Specifies how the index is changing. */
  changeType?: "CHANGE_TYPE_UNSPECIFIED" | "ADD" | "REMOVE" | (string & {});
  /** The index being changed. */
  index?: GoogleFirestoreAdminV1beta2Index;
}

export const GoogleFirestoreAdminV1beta2IndexConfigDelta: Schema.Schema<GoogleFirestoreAdminV1beta2IndexConfigDelta> =
  Schema.suspend(() =>
    Schema.Struct({
      changeType: Schema.optional(Schema.String),
      index: Schema.optional(GoogleFirestoreAdminV1beta2Index),
    }),
  ).annotate({
    identifier: "GoogleFirestoreAdminV1beta2IndexConfigDelta",
  }) as any as Schema.Schema<GoogleFirestoreAdminV1beta2IndexConfigDelta>;

export interface GoogleFirestoreAdminV1beta2ExportDocumentsMetadata {
  /** The time this operation completed. Will be unset if operation still in progress. */
  endTime?: string;
  /** The state of the export operation. */
  operationState?:
    | "OPERATION_STATE_UNSPECIFIED"
    | "INITIALIZING"
    | "PROCESSING"
    | "CANCELLING"
    | "FINALIZING"
    | "SUCCESSFUL"
    | "FAILED"
    | "CANCELLED"
    | (string & {});
  /** The progress, in documents, of this operation. */
  progressDocuments?: GoogleFirestoreAdminV1beta2Progress;
  /** Where the entities are being exported to. */
  outputUriPrefix?: string;
  /** The time this operation started. */
  startTime?: string;
  /** Which collection ids are being exported. */
  collectionIds?: Array<string>;
  /** The progress, in bytes, of this operation. */
  progressBytes?: GoogleFirestoreAdminV1beta2Progress;
}

export const GoogleFirestoreAdminV1beta2ExportDocumentsMetadata: Schema.Schema<GoogleFirestoreAdminV1beta2ExportDocumentsMetadata> =
  Schema.suspend(() =>
    Schema.Struct({
      endTime: Schema.optional(Schema.String),
      operationState: Schema.optional(Schema.String),
      progressDocuments: Schema.optional(GoogleFirestoreAdminV1beta2Progress),
      outputUriPrefix: Schema.optional(Schema.String),
      startTime: Schema.optional(Schema.String),
      collectionIds: Schema.optional(Schema.Array(Schema.String)),
      progressBytes: Schema.optional(GoogleFirestoreAdminV1beta2Progress),
    }),
  ).annotate({
    identifier: "GoogleFirestoreAdminV1beta2ExportDocumentsMetadata",
  }) as any as Schema.Schema<GoogleFirestoreAdminV1beta2ExportDocumentsMetadata>;

export interface GoogleFirestoreAdminV1beta2IndexConfig {
  /** Output only. Specifies the resource name of the `Field` from which this field's index configuration is set (when `uses_ancestor_config` is true), or from which it *would* be set if this field had no index configuration (when `uses_ancestor_config` is false). */
  ancestorField?: string;
  /** The indexes supported for this field. */
  indexes?: Array<GoogleFirestoreAdminV1beta2Index>;
  /** Output only. When true, the `Field`'s index configuration is set from the configuration specified by the `ancestor_field`. When false, the `Field`'s index configuration is defined explicitly. */
  usesAncestorConfig?: boolean;
  /** Output only When true, the `Field`'s index configuration is in the process of being reverted. Once complete, the index config will transition to the same state as the field specified by `ancestor_field`, at which point `uses_ancestor_config` will be `true` and `reverting` will be `false`. */
  reverting?: boolean;
}

export const GoogleFirestoreAdminV1beta2IndexConfig: Schema.Schema<GoogleFirestoreAdminV1beta2IndexConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      ancestorField: Schema.optional(Schema.String),
      indexes: Schema.optional(Schema.Array(GoogleFirestoreAdminV1beta2Index)),
      usesAncestorConfig: Schema.optional(Schema.Boolean),
      reverting: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "GoogleFirestoreAdminV1beta2IndexConfig",
  }) as any as Schema.Schema<GoogleFirestoreAdminV1beta2IndexConfig>;

export interface GoogleFirestoreAdminV1beta2Field {
  /** The index configuration for this field. If unset, field indexing will revert to the configuration defined by the `ancestor_field`. To explicitly remove all indexes for this field, specify an index config with an empty list of indexes. */
  indexConfig?: GoogleFirestoreAdminV1beta2IndexConfig;
  /** A field name of the form `projects/{project_id}/databases/{database_id}/collectionGroups/{collection_id}/fields/{field_path}` A field path may be a simple field name, e.g. `address` or a path to fields within map_value , e.g. `address.city`, or a special field path. The only valid special field is `*`, which represents any field. Field paths may be quoted using ` (backtick). The only character that needs to be escaped within a quoted field path is the backtick character itself, escaped using a backslash. Special characters in field paths that must be quoted include: `*`, `.`, ``` (backtick), `[`, `]`, as well as any ascii symbolic characters. Examples: (Note: Comments here are written in markdown syntax, so there is an additional layer of backticks to represent a code block) `\`address.city\`` represents a field named `address.city`, not the map key `city` in the field `address`. `\`*\`` represents a field named `*`, not any field. A special `Field` contains the default indexing settings for all fields. This field's resource name is: `projects/{project_id}/databases/{database_id}/collectionGroups/__default__/fields/*` Indexes defined on this `Field` will be applied to all fields which do not have their own `Field` index configuration. */
  name?: string;
}

export const GoogleFirestoreAdminV1beta2Field: Schema.Schema<GoogleFirestoreAdminV1beta2Field> =
  Schema.suspend(() =>
    Schema.Struct({
      indexConfig: Schema.optional(GoogleFirestoreAdminV1beta2IndexConfig),
      name: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleFirestoreAdminV1beta2Field",
  }) as any as Schema.Schema<GoogleFirestoreAdminV1beta2Field>;

export interface GoogleFirestoreAdminV1DeleteDatabaseMetadata {}

export const GoogleFirestoreAdminV1DeleteDatabaseMetadata: Schema.Schema<GoogleFirestoreAdminV1DeleteDatabaseMetadata> =
  Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "GoogleFirestoreAdminV1DeleteDatabaseMetadata",
  }) as any as Schema.Schema<GoogleFirestoreAdminV1DeleteDatabaseMetadata>;

export interface GoogleFirestoreAdminV1beta2ListIndexesResponse {
  /** The requested indexes. */
  indexes?: Array<GoogleFirestoreAdminV1beta2Index>;
  /** A page token that may be used to request another page of results. If blank, this is the last page. */
  nextPageToken?: string;
}

export const GoogleFirestoreAdminV1beta2ListIndexesResponse: Schema.Schema<GoogleFirestoreAdminV1beta2ListIndexesResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      indexes: Schema.optional(Schema.Array(GoogleFirestoreAdminV1beta2Index)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleFirestoreAdminV1beta2ListIndexesResponse",
  }) as any as Schema.Schema<GoogleFirestoreAdminV1beta2ListIndexesResponse>;

export interface GoogleFirestoreAdminV1CloneDatabaseMetadata {
  /** How far along the clone is as an estimated percentage of remaining time. */
  progressPercentage?: GoogleFirestoreAdminV1Progress;
  /** The time the clone finished, unset for ongoing clones. */
  endTime?: string;
  /** The operation state of the clone. */
  operationState?:
    | "OPERATION_STATE_UNSPECIFIED"
    | "INITIALIZING"
    | "PROCESSING"
    | "CANCELLING"
    | "FINALIZING"
    | "SUCCESSFUL"
    | "FAILED"
    | "CANCELLED"
    | (string & {});
  /** The name of the database being cloned to. */
  database?: string;
  /** The snapshot from which this database was cloned. */
  pitrSnapshot?: GoogleFirestoreAdminV1PitrSnapshot;
  /** The time the clone was started. */
  startTime?: string;
}

export const GoogleFirestoreAdminV1CloneDatabaseMetadata: Schema.Schema<GoogleFirestoreAdminV1CloneDatabaseMetadata> =
  Schema.suspend(() =>
    Schema.Struct({
      progressPercentage: Schema.optional(GoogleFirestoreAdminV1Progress),
      endTime: Schema.optional(Schema.String),
      operationState: Schema.optional(Schema.String),
      database: Schema.optional(Schema.String),
      pitrSnapshot: Schema.optional(GoogleFirestoreAdminV1PitrSnapshot),
      startTime: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleFirestoreAdminV1CloneDatabaseMetadata",
  }) as any as Schema.Schema<GoogleFirestoreAdminV1CloneDatabaseMetadata>;

export interface GoogleFirestoreAdminV1UpdateDatabaseMetadata {}

export const GoogleFirestoreAdminV1UpdateDatabaseMetadata: Schema.Schema<GoogleFirestoreAdminV1UpdateDatabaseMetadata> =
  Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "GoogleFirestoreAdminV1UpdateDatabaseMetadata",
  }) as any as Schema.Schema<GoogleFirestoreAdminV1UpdateDatabaseMetadata>;

export interface GoogleFirestoreAdminV1beta2ExportDocumentsResponse {
  /** Location of the output files. This can be used to begin an import into Cloud Firestore (this project or another project) after the operation completes successfully. */
  outputUriPrefix?: string;
}

export const GoogleFirestoreAdminV1beta2ExportDocumentsResponse: Schema.Schema<GoogleFirestoreAdminV1beta2ExportDocumentsResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      outputUriPrefix: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleFirestoreAdminV1beta2ExportDocumentsResponse",
  }) as any as Schema.Schema<GoogleFirestoreAdminV1beta2ExportDocumentsResponse>;

export interface GoogleFirestoreAdminV1CreateDatabaseMetadata {}

export const GoogleFirestoreAdminV1CreateDatabaseMetadata: Schema.Schema<GoogleFirestoreAdminV1CreateDatabaseMetadata> =
  Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "GoogleFirestoreAdminV1CreateDatabaseMetadata",
  }) as any as Schema.Schema<GoogleFirestoreAdminV1CreateDatabaseMetadata>;

export interface GoogleFirestoreAdminV1beta2FieldOperationMetadata {
  /** The state of the operation. */
  state?:
    | "OPERATION_STATE_UNSPECIFIED"
    | "INITIALIZING"
    | "PROCESSING"
    | "CANCELLING"
    | "FINALIZING"
    | "SUCCESSFUL"
    | "FAILED"
    | "CANCELLED"
    | (string & {});
  /** The time this operation started. */
  startTime?: string;
  /** A list of IndexConfigDelta, which describe the intent of this operation. */
  indexConfigDeltas?: Array<GoogleFirestoreAdminV1beta2IndexConfigDelta>;
  /** The progress, in bytes, of this operation. */
  bytesProgress?: GoogleFirestoreAdminV1beta2Progress;
  /** The field resource that this operation is acting on. For example: `projects/{project_id}/databases/{database_id}/collectionGroups/{collection_id}/fields/{field_path}` */
  field?: string;
  /** The progress, in documents, of this operation. */
  documentProgress?: GoogleFirestoreAdminV1beta2Progress;
  /** The time this operation completed. Will be unset if operation still in progress. */
  endTime?: string;
}

export const GoogleFirestoreAdminV1beta2FieldOperationMetadata: Schema.Schema<GoogleFirestoreAdminV1beta2FieldOperationMetadata> =
  Schema.suspend(() =>
    Schema.Struct({
      state: Schema.optional(Schema.String),
      startTime: Schema.optional(Schema.String),
      indexConfigDeltas: Schema.optional(
        Schema.Array(GoogleFirestoreAdminV1beta2IndexConfigDelta),
      ),
      bytesProgress: Schema.optional(GoogleFirestoreAdminV1beta2Progress),
      field: Schema.optional(Schema.String),
      documentProgress: Schema.optional(GoogleFirestoreAdminV1beta2Progress),
      endTime: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleFirestoreAdminV1beta2FieldOperationMetadata",
  }) as any as Schema.Schema<GoogleFirestoreAdminV1beta2FieldOperationMetadata>;

export interface GoogleFirestoreAdminV1beta2ListFieldsResponse {
  /** The requested fields. */
  fields?: Array<GoogleFirestoreAdminV1beta2Field>;
  /** A page token that may be used to request another page of results. If blank, this is the last page. */
  nextPageToken?: string;
}

export const GoogleFirestoreAdminV1beta2ListFieldsResponse: Schema.Schema<GoogleFirestoreAdminV1beta2ListFieldsResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      fields: Schema.optional(Schema.Array(GoogleFirestoreAdminV1beta2Field)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleFirestoreAdminV1beta2ListFieldsResponse",
  }) as any as Schema.Schema<GoogleFirestoreAdminV1beta2ListFieldsResponse>;

// ==========================================================================
// Operations
// ==========================================================================

export interface ExportDocumentsProjectsDatabasesRequest {
  /** Database to export. Should be of the form: `projects/{project_id}/databases/{database_id}`. */
  name: string;
  /** Request body */
  body?: GoogleFirestoreAdminV1beta2ExportDocumentsRequest;
}

export const ExportDocumentsProjectsDatabasesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleFirestoreAdminV1beta2ExportDocumentsRequest).pipe(
    T.HttpBody(),
  ),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1beta2/projects/{projectsId}/databases/{databasesId}:exportDocuments",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<ExportDocumentsProjectsDatabasesRequest>;

export type ExportDocumentsProjectsDatabasesResponse =
  GoogleLongrunningOperation;
export const ExportDocumentsProjectsDatabasesResponse =
  GoogleLongrunningOperation;

export type ExportDocumentsProjectsDatabasesError = DefaultErrors;

/** Exports a copy of all or a subset of documents from Google Cloud Firestore to another storage system, such as Google Cloud Storage. Recent updates to documents may not be reflected in the export. The export occurs in the background and its progress can be monitored and managed via the Operation resource that is created. The output of an export may only be used once the associated operation is done. If an export operation is cancelled before completion it may leave partial data behind in Google Cloud Storage. */
export const exportDocumentsProjectsDatabases: API.OperationMethod<
  ExportDocumentsProjectsDatabasesRequest,
  ExportDocumentsProjectsDatabasesResponse,
  ExportDocumentsProjectsDatabasesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: ExportDocumentsProjectsDatabasesRequest,
  output: ExportDocumentsProjectsDatabasesResponse,
  errors: [],
}));

export interface ImportDocumentsProjectsDatabasesRequest {
  /** Database to import into. Should be of the form: `projects/{project_id}/databases/{database_id}`. */
  name: string;
  /** Request body */
  body?: GoogleFirestoreAdminV1beta2ImportDocumentsRequest;
}

export const ImportDocumentsProjectsDatabasesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleFirestoreAdminV1beta2ImportDocumentsRequest).pipe(
    T.HttpBody(),
  ),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1beta2/projects/{projectsId}/databases/{databasesId}:importDocuments",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<ImportDocumentsProjectsDatabasesRequest>;

export type ImportDocumentsProjectsDatabasesResponse =
  GoogleLongrunningOperation;
export const ImportDocumentsProjectsDatabasesResponse =
  GoogleLongrunningOperation;

export type ImportDocumentsProjectsDatabasesError = DefaultErrors;

/** Imports documents into Google Cloud Firestore. Existing documents with the same name are overwritten. The import occurs in the background and its progress can be monitored and managed via the Operation resource that is created. If an ImportDocuments operation is cancelled, it is possible that a subset of the data has already been imported to Cloud Firestore. */
export const importDocumentsProjectsDatabases: API.OperationMethod<
  ImportDocumentsProjectsDatabasesRequest,
  ImportDocumentsProjectsDatabasesResponse,
  ImportDocumentsProjectsDatabasesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: ImportDocumentsProjectsDatabasesRequest,
  output: ImportDocumentsProjectsDatabasesResponse,
  errors: [],
}));

export interface GetProjectsDatabasesCollectionGroupsIndexesRequest {
  /** A name of the form `projects/{project_id}/databases/{database_id}/collectionGroups/{collection_id}/indexes/{index_id}` */
  name: string;
}

export const GetProjectsDatabasesCollectionGroupsIndexesRequest = Schema.Struct(
  {
    name: Schema.String.pipe(T.HttpPath("name")),
  },
).pipe(
  T.Http({
    method: "GET",
    path: "v1beta2/projects/{projectsId}/databases/{databasesId}/collectionGroups/{collectionGroupsId}/indexes/{indexesId}",
  }),
  svc,
) as unknown as Schema.Schema<GetProjectsDatabasesCollectionGroupsIndexesRequest>;

export type GetProjectsDatabasesCollectionGroupsIndexesResponse =
  GoogleFirestoreAdminV1beta2Index;
export const GetProjectsDatabasesCollectionGroupsIndexesResponse =
  GoogleFirestoreAdminV1beta2Index;

export type GetProjectsDatabasesCollectionGroupsIndexesError = DefaultErrors;

/** Gets a composite index. */
export const getProjectsDatabasesCollectionGroupsIndexes: API.OperationMethod<
  GetProjectsDatabasesCollectionGroupsIndexesRequest,
  GetProjectsDatabasesCollectionGroupsIndexesResponse,
  GetProjectsDatabasesCollectionGroupsIndexesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetProjectsDatabasesCollectionGroupsIndexesRequest,
  output: GetProjectsDatabasesCollectionGroupsIndexesResponse,
  errors: [],
}));

export interface DeleteProjectsDatabasesCollectionGroupsIndexesRequest {
  /** A name of the form `projects/{project_id}/databases/{database_id}/collectionGroups/{collection_id}/indexes/{index_id}` */
  name: string;
}

export const DeleteProjectsDatabasesCollectionGroupsIndexesRequest =
  Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v1beta2/projects/{projectsId}/databases/{databasesId}/collectionGroups/{collectionGroupsId}/indexes/{indexesId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteProjectsDatabasesCollectionGroupsIndexesRequest>;

export type DeleteProjectsDatabasesCollectionGroupsIndexesResponse = Empty;
export const DeleteProjectsDatabasesCollectionGroupsIndexesResponse = Empty;

export type DeleteProjectsDatabasesCollectionGroupsIndexesError = DefaultErrors;

/** Deletes a composite index. */
export const deleteProjectsDatabasesCollectionGroupsIndexes: API.OperationMethod<
  DeleteProjectsDatabasesCollectionGroupsIndexesRequest,
  DeleteProjectsDatabasesCollectionGroupsIndexesResponse,
  DeleteProjectsDatabasesCollectionGroupsIndexesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteProjectsDatabasesCollectionGroupsIndexesRequest,
  output: DeleteProjectsDatabasesCollectionGroupsIndexesResponse,
  errors: [],
}));

export interface CreateProjectsDatabasesCollectionGroupsIndexesRequest {
  /** A parent name of the form `projects/{project_id}/databases/{database_id}/collectionGroups/{collection_id}` */
  parent: string;
  /** Request body */
  body?: GoogleFirestoreAdminV1beta2Index;
}

export const CreateProjectsDatabasesCollectionGroupsIndexesRequest =
  Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    body: Schema.optional(GoogleFirestoreAdminV1beta2Index).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta2/projects/{projectsId}/databases/{databasesId}/collectionGroups/{collectionGroupsId}/indexes",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateProjectsDatabasesCollectionGroupsIndexesRequest>;

export type CreateProjectsDatabasesCollectionGroupsIndexesResponse =
  GoogleLongrunningOperation;
export const CreateProjectsDatabasesCollectionGroupsIndexesResponse =
  GoogleLongrunningOperation;

export type CreateProjectsDatabasesCollectionGroupsIndexesError = DefaultErrors;

/** Creates a composite index. This returns a google.longrunning.Operation which may be used to track the status of the creation. The metadata for the operation will be the type IndexOperationMetadata. */
export const createProjectsDatabasesCollectionGroupsIndexes: API.OperationMethod<
  CreateProjectsDatabasesCollectionGroupsIndexesRequest,
  CreateProjectsDatabasesCollectionGroupsIndexesResponse,
  CreateProjectsDatabasesCollectionGroupsIndexesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateProjectsDatabasesCollectionGroupsIndexesRequest,
  output: CreateProjectsDatabasesCollectionGroupsIndexesResponse,
  errors: [],
}));

export interface ListProjectsDatabasesCollectionGroupsIndexesRequest {
  /** A parent name of the form `projects/{project_id}/databases/{database_id}/collectionGroups/{collection_id}` */
  parent: string;
  /** The filter to apply to list results. */
  filter?: string;
  /** The number of results to return. */
  pageSize?: number;
  /** A page token, returned from a previous call to FirestoreAdmin.ListIndexes, that may be used to get the next page of results. */
  pageToken?: string;
}

export const ListProjectsDatabasesCollectionGroupsIndexesRequest =
  Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta2/projects/{projectsId}/databases/{databasesId}/collectionGroups/{collectionGroupsId}/indexes",
    }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsDatabasesCollectionGroupsIndexesRequest>;

export type ListProjectsDatabasesCollectionGroupsIndexesResponse =
  GoogleFirestoreAdminV1beta2ListIndexesResponse;
export const ListProjectsDatabasesCollectionGroupsIndexesResponse =
  GoogleFirestoreAdminV1beta2ListIndexesResponse;

export type ListProjectsDatabasesCollectionGroupsIndexesError = DefaultErrors;

/** Lists composite indexes. */
export const listProjectsDatabasesCollectionGroupsIndexes: API.PaginatedOperationMethod<
  ListProjectsDatabasesCollectionGroupsIndexesRequest,
  ListProjectsDatabasesCollectionGroupsIndexesResponse,
  ListProjectsDatabasesCollectionGroupsIndexesError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListProjectsDatabasesCollectionGroupsIndexesRequest,
  output: ListProjectsDatabasesCollectionGroupsIndexesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsDatabasesCollectionGroupsFieldsRequest {
  /** A name of the form `projects/{project_id}/databases/{database_id}/collectionGroups/{collection_id}/fields/{field_id}` */
  name: string;
}

export const GetProjectsDatabasesCollectionGroupsFieldsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1beta2/projects/{projectsId}/databases/{databasesId}/collectionGroups/{collectionGroupsId}/fields/{fieldsId}",
  }),
  svc,
) as unknown as Schema.Schema<GetProjectsDatabasesCollectionGroupsFieldsRequest>;

export type GetProjectsDatabasesCollectionGroupsFieldsResponse =
  GoogleFirestoreAdminV1beta2Field;
export const GetProjectsDatabasesCollectionGroupsFieldsResponse =
  GoogleFirestoreAdminV1beta2Field;

export type GetProjectsDatabasesCollectionGroupsFieldsError = DefaultErrors;

/** Gets the metadata and configuration for a Field. */
export const getProjectsDatabasesCollectionGroupsFields: API.OperationMethod<
  GetProjectsDatabasesCollectionGroupsFieldsRequest,
  GetProjectsDatabasesCollectionGroupsFieldsResponse,
  GetProjectsDatabasesCollectionGroupsFieldsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetProjectsDatabasesCollectionGroupsFieldsRequest,
  output: GetProjectsDatabasesCollectionGroupsFieldsResponse,
  errors: [],
}));

export interface PatchProjectsDatabasesCollectionGroupsFieldsRequest {
  /** A field name of the form `projects/{project_id}/databases/{database_id}/collectionGroups/{collection_id}/fields/{field_path}` A field path may be a simple field name, e.g. `address` or a path to fields within map_value , e.g. `address.city`, or a special field path. The only valid special field is `*`, which represents any field. Field paths may be quoted using ` (backtick). The only character that needs to be escaped within a quoted field path is the backtick character itself, escaped using a backslash. Special characters in field paths that must be quoted include: `*`, `.`, ``` (backtick), `[`, `]`, as well as any ascii symbolic characters. Examples: (Note: Comments here are written in markdown syntax, so there is an additional layer of backticks to represent a code block) `\`address.city\`` represents a field named `address.city`, not the map key `city` in the field `address`. `\`*\`` represents a field named `*`, not any field. A special `Field` contains the default indexing settings for all fields. This field's resource name is: `projects/{project_id}/databases/{database_id}/collectionGroups/__default__/fields/*` Indexes defined on this `Field` will be applied to all fields which do not have their own `Field` index configuration. */
  name: string;
  /** A mask, relative to the field. If specified, only configuration specified by this field_mask will be updated in the field. */
  updateMask?: string;
  /** Request body */
  body?: GoogleFirestoreAdminV1beta2Field;
}

export const PatchProjectsDatabasesCollectionGroupsFieldsRequest =
  Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    body: Schema.optional(GoogleFirestoreAdminV1beta2Field).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v1beta2/projects/{projectsId}/databases/{databasesId}/collectionGroups/{collectionGroupsId}/fields/{fieldsId}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PatchProjectsDatabasesCollectionGroupsFieldsRequest>;

export type PatchProjectsDatabasesCollectionGroupsFieldsResponse =
  GoogleLongrunningOperation;
export const PatchProjectsDatabasesCollectionGroupsFieldsResponse =
  GoogleLongrunningOperation;

export type PatchProjectsDatabasesCollectionGroupsFieldsError = DefaultErrors;

/** Updates a field configuration. Currently, field updates apply only to single field index configuration. However, calls to FirestoreAdmin.UpdateField should provide a field mask to avoid changing any configuration that the caller isn't aware of. The field mask should be specified as: `{ paths: "index_config" }`. This call returns a google.longrunning.Operation which may be used to track the status of the field update. The metadata for the operation will be the type FieldOperationMetadata. To configure the default field settings for the database, use the special `Field` with resource name: `projects/{project_id}/databases/{database_id}/collectionGroups/__default__/fields/*`. */
export const patchProjectsDatabasesCollectionGroupsFields: API.OperationMethod<
  PatchProjectsDatabasesCollectionGroupsFieldsRequest,
  PatchProjectsDatabasesCollectionGroupsFieldsResponse,
  PatchProjectsDatabasesCollectionGroupsFieldsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchProjectsDatabasesCollectionGroupsFieldsRequest,
  output: PatchProjectsDatabasesCollectionGroupsFieldsResponse,
  errors: [],
}));

export interface ListProjectsDatabasesCollectionGroupsFieldsRequest {
  /** A page token, returned from a previous call to FirestoreAdmin.ListFields, that may be used to get the next page of results. */
  pageToken?: string;
  /** A parent name of the form `projects/{project_id}/databases/{database_id}/collectionGroups/{collection_id}` */
  parent: string;
  /** The filter to apply to list results. Currently, FirestoreAdmin.ListFields only supports listing fields that have been explicitly overridden. To issue this query, call FirestoreAdmin.ListFields with the filter set to `indexConfig.usesAncestorConfig:false`. */
  filter?: string;
  /** The number of results to return. */
  pageSize?: number;
}

export const ListProjectsDatabasesCollectionGroupsFieldsRequest = Schema.Struct(
  {
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    parent: Schema.String.pipe(T.HttpPath("parent")),
    filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  },
).pipe(
  T.Http({
    method: "GET",
    path: "v1beta2/projects/{projectsId}/databases/{databasesId}/collectionGroups/{collectionGroupsId}/fields",
  }),
  svc,
) as unknown as Schema.Schema<ListProjectsDatabasesCollectionGroupsFieldsRequest>;

export type ListProjectsDatabasesCollectionGroupsFieldsResponse =
  GoogleFirestoreAdminV1beta2ListFieldsResponse;
export const ListProjectsDatabasesCollectionGroupsFieldsResponse =
  GoogleFirestoreAdminV1beta2ListFieldsResponse;

export type ListProjectsDatabasesCollectionGroupsFieldsError = DefaultErrors;

/** Lists the field configuration and metadata for this database. Currently, FirestoreAdmin.ListFields only supports listing fields that have been explicitly overridden. To issue this query, call FirestoreAdmin.ListFields with the filter set to `indexConfig.usesAncestorConfig:false`. */
export const listProjectsDatabasesCollectionGroupsFields: API.PaginatedOperationMethod<
  ListProjectsDatabasesCollectionGroupsFieldsRequest,
  ListProjectsDatabasesCollectionGroupsFieldsResponse,
  ListProjectsDatabasesCollectionGroupsFieldsError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListProjectsDatabasesCollectionGroupsFieldsRequest,
  output: ListProjectsDatabasesCollectionGroupsFieldsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));
