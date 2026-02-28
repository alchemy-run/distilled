// ==========================================================================
// Cloud Firestore API (firestore v1)
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
  name: "firestore",
  version: "v1",
  rootUrl: "https://firestore.googleapis.com/",
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

export interface GoogleLongrunningOperation {
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

export const GoogleLongrunningOperation: Schema.Schema<GoogleLongrunningOperation> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  done: Schema.optional(Schema.Boolean),
  error: Schema.optional(Status),
  response: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "GoogleLongrunningOperation" }) as any as Schema.Schema<GoogleLongrunningOperation>;

export interface GoogleLongrunningListOperationsResponse {
  /** A list of operations that matches the specified filter in the request. */
  operations?: Array<GoogleLongrunningOperation>;
  /** The standard List next-page token. */
  nextPageToken?: string;
  /** Unordered list. Unreachable resources. Populated when the request sets `ListOperationsRequest.return_partial_success` and reads across collections. For example, when attempting to list all resources across all supported locations. */
  unreachable?: Array<string>;
}

export const GoogleLongrunningListOperationsResponse: Schema.Schema<GoogleLongrunningListOperationsResponse> = Schema.suspend(() => Schema.Struct({
  operations: Schema.optional(Schema.Array(GoogleLongrunningOperation)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleLongrunningListOperationsResponse" }) as any as Schema.Schema<GoogleLongrunningListOperationsResponse>;

export interface Empty {
}

export const Empty: Schema.Schema<Empty> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "Empty" }) as any as Schema.Schema<Empty>;

export interface GoogleLongrunningCancelOperationRequest {
}

export const GoogleLongrunningCancelOperationRequest: Schema.Schema<GoogleLongrunningCancelOperationRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleLongrunningCancelOperationRequest" }) as any as Schema.Schema<GoogleLongrunningCancelOperationRequest>;

export interface GoogleFirestoreAdminV1FlatIndex {
}

export const GoogleFirestoreAdminV1FlatIndex: Schema.Schema<GoogleFirestoreAdminV1FlatIndex> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleFirestoreAdminV1FlatIndex" }) as any as Schema.Schema<GoogleFirestoreAdminV1FlatIndex>;

export interface GoogleFirestoreAdminV1VectorConfig {
  /** Required. The vector dimension this configuration applies to. The resulting index will only include vectors of this dimension, and can be used for vector search with the same dimension. */
  dimension?: number;
  /** Indicates the vector index is a flat index. */
  flat?: GoogleFirestoreAdminV1FlatIndex;
}

export const GoogleFirestoreAdminV1VectorConfig: Schema.Schema<GoogleFirestoreAdminV1VectorConfig> = Schema.suspend(() => Schema.Struct({
  dimension: Schema.optional(Schema.Number),
  flat: Schema.optional(GoogleFirestoreAdminV1FlatIndex),
})).annotate({ identifier: "GoogleFirestoreAdminV1VectorConfig" }) as any as Schema.Schema<GoogleFirestoreAdminV1VectorConfig>;

export interface GoogleFirestoreAdminV1IndexField {
  /** Can be __name__. For single field indexes, this must match the name of the field or may be omitted. */
  fieldPath?: string;
  /** Indicates that this field supports ordering by the specified order or comparing using =, !=, <, <=, >, >=. */
  order?: "ORDER_UNSPECIFIED" | "ASCENDING" | "DESCENDING" | (string & {});
  /** Indicates that this field supports operations on `array_value`s. */
  arrayConfig?: "ARRAY_CONFIG_UNSPECIFIED" | "CONTAINS" | (string & {});
  /** Indicates that this field supports nearest neighbor and distance operations on vector. */
  vectorConfig?: GoogleFirestoreAdminV1VectorConfig;
}

export const GoogleFirestoreAdminV1IndexField: Schema.Schema<GoogleFirestoreAdminV1IndexField> = Schema.suspend(() => Schema.Struct({
  fieldPath: Schema.optional(Schema.String),
  order: Schema.optional(Schema.String),
  arrayConfig: Schema.optional(Schema.String),
  vectorConfig: Schema.optional(GoogleFirestoreAdminV1VectorConfig),
})).annotate({ identifier: "GoogleFirestoreAdminV1IndexField" }) as any as Schema.Schema<GoogleFirestoreAdminV1IndexField>;

export interface GoogleFirestoreAdminV1Index {
  /** Output only. A server defined name for this index. The form of this name for composite indexes will be: `projects/{project_id}/databases/{database_id}/collectionGroups/{collection_id}/indexes/{composite_index_id}` For single field indexes, this field will be empty. */
  name?: string;
  /** Indexes with a collection query scope specified allow queries against a collection that is the child of a specific document, specified at query time, and that has the same collection ID. Indexes with a collection group query scope specified allow queries against all collections descended from a specific document, specified at query time, and that have the same collection ID as this index. */
  queryScope?: "QUERY_SCOPE_UNSPECIFIED" | "COLLECTION" | "COLLECTION_GROUP" | "COLLECTION_RECURSIVE" | (string & {});
  /** The API scope supported by this index. */
  apiScope?: "ANY_API" | "DATASTORE_MODE_API" | "MONGODB_COMPATIBLE_API" | (string & {});
  /** The fields supported by this index. For composite indexes, this requires a minimum of 2 and a maximum of 100 fields. The last field entry is always for the field path `__name__`. If, on creation, `__name__` was not specified as the last field, it will be added automatically with the same direction as that of the last field defined. If the final field in a composite index is not directional, the `__name__` will be ordered ASCENDING (unless explicitly specified). For single field indexes, this will always be exactly one entry with a field path equal to the field path of the associated field. */
  fields?: Array<GoogleFirestoreAdminV1IndexField>;
  /** Output only. The serving state of the index. */
  state?: "STATE_UNSPECIFIED" | "CREATING" | "READY" | "NEEDS_REPAIR" | (string & {});
  /** Immutable. The density configuration of the index. */
  density?: "DENSITY_UNSPECIFIED" | "SPARSE_ALL" | "SPARSE_ANY" | "DENSE" | (string & {});
  /** Optional. Whether the index is multikey. By default, the index is not multikey. For non-multikey indexes, none of the paths in the index definition reach or traverse an array, except via an explicit array index. For multikey indexes, at most one of the paths in the index definition reach or traverse an array, except via an explicit array index. Violations will result in errors. Note this field only applies to index with MONGODB_COMPATIBLE_API ApiScope. */
  multikey?: boolean;
  /** Optional. The number of shards for the index. */
  shardCount?: number;
  /** Optional. Whether it is an unique index. Unique index ensures all values for the indexed field(s) are unique across documents. */
  unique?: boolean;
}

export const GoogleFirestoreAdminV1Index: Schema.Schema<GoogleFirestoreAdminV1Index> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  queryScope: Schema.optional(Schema.String),
  apiScope: Schema.optional(Schema.String),
  fields: Schema.optional(Schema.Array(GoogleFirestoreAdminV1IndexField)),
  state: Schema.optional(Schema.String),
  density: Schema.optional(Schema.String),
  multikey: Schema.optional(Schema.Boolean),
  shardCount: Schema.optional(Schema.Number),
  unique: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleFirestoreAdminV1Index" }) as any as Schema.Schema<GoogleFirestoreAdminV1Index>;

export interface GoogleFirestoreAdminV1ListIndexesResponse {
  /** The requested indexes. */
  indexes?: Array<GoogleFirestoreAdminV1Index>;
  /** A page token that may be used to request another page of results. If blank, this is the last page. */
  nextPageToken?: string;
}

export const GoogleFirestoreAdminV1ListIndexesResponse: Schema.Schema<GoogleFirestoreAdminV1ListIndexesResponse> = Schema.suspend(() => Schema.Struct({
  indexes: Schema.optional(Schema.Array(GoogleFirestoreAdminV1Index)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleFirestoreAdminV1ListIndexesResponse" }) as any as Schema.Schema<GoogleFirestoreAdminV1ListIndexesResponse>;

export interface GoogleFirestoreAdminV1IndexConfig {
  /** The indexes supported for this field. */
  indexes?: Array<GoogleFirestoreAdminV1Index>;
  /** Output only. When true, the `Field`'s index configuration is set from the configuration specified by the `ancestor_field`. When false, the `Field`'s index configuration is defined explicitly. */
  usesAncestorConfig?: boolean;
  /** Output only. Specifies the resource name of the `Field` from which this field's index configuration is set (when `uses_ancestor_config` is true), or from which it *would* be set if this field had no index configuration (when `uses_ancestor_config` is false). */
  ancestorField?: string;
  /** Output only When true, the `Field`'s index configuration is in the process of being reverted. Once complete, the index config will transition to the same state as the field specified by `ancestor_field`, at which point `uses_ancestor_config` will be `true` and `reverting` will be `false`. */
  reverting?: boolean;
}

export const GoogleFirestoreAdminV1IndexConfig: Schema.Schema<GoogleFirestoreAdminV1IndexConfig> = Schema.suspend(() => Schema.Struct({
  indexes: Schema.optional(Schema.Array(GoogleFirestoreAdminV1Index)),
  usesAncestorConfig: Schema.optional(Schema.Boolean),
  ancestorField: Schema.optional(Schema.String),
  reverting: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleFirestoreAdminV1IndexConfig" }) as any as Schema.Schema<GoogleFirestoreAdminV1IndexConfig>;

export interface GoogleFirestoreAdminV1TtlConfig {
  /** Output only. The state of the TTL configuration. */
  state?: "STATE_UNSPECIFIED" | "CREATING" | "ACTIVE" | "NEEDS_REPAIR" | (string & {});
}

export const GoogleFirestoreAdminV1TtlConfig: Schema.Schema<GoogleFirestoreAdminV1TtlConfig> = Schema.suspend(() => Schema.Struct({
  state: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleFirestoreAdminV1TtlConfig" }) as any as Schema.Schema<GoogleFirestoreAdminV1TtlConfig>;

export interface GoogleFirestoreAdminV1Field {
  /** Required. A field name of the form: `projects/{project_id}/databases/{database_id}/collectionGroups/{collection_id}/fields/{field_path}` A field path can be a simple field name, e.g. `address` or a path to fields within `map_value` , e.g. `address.city`, or a special field path. The only valid special field is `*`, which represents any field. Field paths can be quoted using `` ` `` (backtick). The only character that must be escaped within a quoted field path is the backtick character itself, escaped using a backslash. Special characters in field paths that must be quoted include: `*`, `.`, `` ` `` (backtick), `[`, `]`, as well as any ascii symbolic characters. Examples: `` `address.city` `` represents a field named `address.city`, not the map key `city` in the field `address`. `` `*` `` represents a field named `*`, not any field. A special `Field` contains the default indexing settings for all fields. This field's resource name is: `projects/{project_id}/databases/{database_id}/collectionGroups/__default__/fields/*` Indexes defined on this `Field` will be applied to all fields which do not have their own `Field` index configuration. */
  name?: string;
  /** The index configuration for this field. If unset, field indexing will revert to the configuration defined by the `ancestor_field`. To explicitly remove all indexes for this field, specify an index config with an empty list of indexes. */
  indexConfig?: GoogleFirestoreAdminV1IndexConfig;
  /** The TTL configuration for this `Field`. Setting or unsetting this will enable or disable the TTL for documents that have this `Field`. */
  ttlConfig?: GoogleFirestoreAdminV1TtlConfig;
}

export const GoogleFirestoreAdminV1Field: Schema.Schema<GoogleFirestoreAdminV1Field> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  indexConfig: Schema.optional(GoogleFirestoreAdminV1IndexConfig),
  ttlConfig: Schema.optional(GoogleFirestoreAdminV1TtlConfig),
})).annotate({ identifier: "GoogleFirestoreAdminV1Field" }) as any as Schema.Schema<GoogleFirestoreAdminV1Field>;

export interface GoogleFirestoreAdminV1ListFieldsResponse {
  /** The requested fields. */
  fields?: Array<GoogleFirestoreAdminV1Field>;
  /** A page token that may be used to request another page of results. If blank, this is the last page. */
  nextPageToken?: string;
}

export const GoogleFirestoreAdminV1ListFieldsResponse: Schema.Schema<GoogleFirestoreAdminV1ListFieldsResponse> = Schema.suspend(() => Schema.Struct({
  fields: Schema.optional(Schema.Array(GoogleFirestoreAdminV1Field)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleFirestoreAdminV1ListFieldsResponse" }) as any as Schema.Schema<GoogleFirestoreAdminV1ListFieldsResponse>;

export interface GoogleFirestoreAdminV1ExportDocumentsRequest {
  /** IDs of the collection groups to export. Unspecified means all collection groups. Each collection group in this list must be unique. */
  collectionIds?: Array<string>;
  /** The output URI. Currently only supports Google Cloud Storage URIs of the form: `gs://BUCKET_NAME[/NAMESPACE_PATH]`, where `BUCKET_NAME` is the name of the Google Cloud Storage bucket and `NAMESPACE_PATH` is an optional Google Cloud Storage namespace path. When choosing a name, be sure to consider Google Cloud Storage naming guidelines: https://cloud.google.com/storage/docs/naming. If the URI is a bucket (without a namespace path), a prefix will be generated based on the start time. */
  outputUriPrefix?: string;
  /** An empty list represents all namespaces. This is the preferred usage for databases that don't use namespaces. An empty string element represents the default namespace. This should be used if the database has data in non-default namespaces, but doesn't want to include them. Each namespace in this list must be unique. */
  namespaceIds?: Array<string>;
  /** The timestamp that corresponds to the version of the database to be exported. The timestamp must be in the past, rounded to the minute and not older than earliestVersionTime. If specified, then the exported documents will represent a consistent view of the database at the provided time. Otherwise, there are no guarantees about the consistency of the exported documents. */
  snapshotTime?: string;
}

export const GoogleFirestoreAdminV1ExportDocumentsRequest: Schema.Schema<GoogleFirestoreAdminV1ExportDocumentsRequest> = Schema.suspend(() => Schema.Struct({
  collectionIds: Schema.optional(Schema.Array(Schema.String)),
  outputUriPrefix: Schema.optional(Schema.String),
  namespaceIds: Schema.optional(Schema.Array(Schema.String)),
  snapshotTime: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleFirestoreAdminV1ExportDocumentsRequest" }) as any as Schema.Schema<GoogleFirestoreAdminV1ExportDocumentsRequest>;

export interface GoogleFirestoreAdminV1ImportDocumentsRequest {
  /** IDs of the collection groups to import. Unspecified means all collection groups that were included in the export. Each collection group in this list must be unique. */
  collectionIds?: Array<string>;
  /** Location of the exported files. This must match the output_uri_prefix of an ExportDocumentsResponse from an export that has completed successfully. See: google.firestore.admin.v1.ExportDocumentsResponse.output_uri_prefix. */
  inputUriPrefix?: string;
  /** An empty list represents all namespaces. This is the preferred usage for databases that don't use namespaces. An empty string element represents the default namespace. This should be used if the database has data in non-default namespaces, but doesn't want to include them. Each namespace in this list must be unique. */
  namespaceIds?: Array<string>;
}

export const GoogleFirestoreAdminV1ImportDocumentsRequest: Schema.Schema<GoogleFirestoreAdminV1ImportDocumentsRequest> = Schema.suspend(() => Schema.Struct({
  collectionIds: Schema.optional(Schema.Array(Schema.String)),
  inputUriPrefix: Schema.optional(Schema.String),
  namespaceIds: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleFirestoreAdminV1ImportDocumentsRequest" }) as any as Schema.Schema<GoogleFirestoreAdminV1ImportDocumentsRequest>;

export interface GoogleFirestoreAdminV1BulkDeleteDocumentsRequest {
  /** Optional. IDs of the collection groups to delete. Unspecified means all collection groups. Each collection group in this list must be unique. */
  collectionIds?: Array<string>;
  /** Optional. Namespaces to delete. An empty list means all namespaces. This is the recommended usage for databases that don't use namespaces. An empty string element represents the default namespace. This should be used if the database has data in non-default namespaces, but doesn't want to delete from them. Each namespace in this list must be unique. */
  namespaceIds?: Array<string>;
}

export const GoogleFirestoreAdminV1BulkDeleteDocumentsRequest: Schema.Schema<GoogleFirestoreAdminV1BulkDeleteDocumentsRequest> = Schema.suspend(() => Schema.Struct({
  collectionIds: Schema.optional(Schema.Array(Schema.String)),
  namespaceIds: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleFirestoreAdminV1BulkDeleteDocumentsRequest" }) as any as Schema.Schema<GoogleFirestoreAdminV1BulkDeleteDocumentsRequest>;

export interface GoogleFirestoreAdminV1CmekConfig {
  /** Required. Only keys in the same location as this database are allowed to be used for encryption. For Firestore's nam5 multi-region, this corresponds to Cloud KMS multi-region us. For Firestore's eur3 multi-region, this corresponds to Cloud KMS multi-region europe. See https://cloud.google.com/kms/docs/locations. The expected format is `projects/{project_id}/locations/{kms_location}/keyRings/{key_ring}/cryptoKeys/{crypto_key}`. */
  kmsKeyName?: string;
  /** Output only. Currently in-use [KMS key versions](https://cloud.google.com/kms/docs/resource-hierarchy#key_versions). During [key rotation](https://cloud.google.com/kms/docs/key-rotation), there can be multiple in-use key versions. The expected format is `projects/{project_id}/locations/{kms_location}/keyRings/{key_ring}/cryptoKeys/{crypto_key}/cryptoKeyVersions/{key_version}`. */
  activeKeyVersion?: Array<string>;
}

export const GoogleFirestoreAdminV1CmekConfig: Schema.Schema<GoogleFirestoreAdminV1CmekConfig> = Schema.suspend(() => Schema.Struct({
  kmsKeyName: Schema.optional(Schema.String),
  activeKeyVersion: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleFirestoreAdminV1CmekConfig" }) as any as Schema.Schema<GoogleFirestoreAdminV1CmekConfig>;

export interface GoogleFirestoreAdminV1BackupSource {
  /** The resource name of the backup that was used to restore this database. Format: `projects/{project}/locations/{location}/backups/{backup}`. */
  backup?: string;
}

export const GoogleFirestoreAdminV1BackupSource: Schema.Schema<GoogleFirestoreAdminV1BackupSource> = Schema.suspend(() => Schema.Struct({
  backup: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleFirestoreAdminV1BackupSource" }) as any as Schema.Schema<GoogleFirestoreAdminV1BackupSource>;

export interface GoogleFirestoreAdminV1SourceInfo {
  /** If set, this database was restored from the specified backup (or a snapshot thereof). */
  backup?: GoogleFirestoreAdminV1BackupSource;
  /** The associated long-running operation. This field may not be set after the operation has completed. Format: `projects/{project}/databases/{database}/operations/{operation}`. */
  operation?: string;
}

export const GoogleFirestoreAdminV1SourceInfo: Schema.Schema<GoogleFirestoreAdminV1SourceInfo> = Schema.suspend(() => Schema.Struct({
  backup: Schema.optional(GoogleFirestoreAdminV1BackupSource),
  operation: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleFirestoreAdminV1SourceInfo" }) as any as Schema.Schema<GoogleFirestoreAdminV1SourceInfo>;

export interface GoogleFirestoreAdminV1Database {
  /** The resource name of the Database. Format: `projects/{project}/databases/{database}` */
  name?: string;
  /** Output only. The system-generated UUID4 for this Database. */
  uid?: string;
  /** Output only. The timestamp at which this database was created. Databases created before 2016 do not populate create_time. */
  createTime?: string;
  /** Output only. The timestamp at which this database was most recently updated. Note this only includes updates to the database resource and not data contained by the database. */
  updateTime?: string;
  /** Output only. The timestamp at which this database was deleted. Only set if the database has been deleted. */
  deleteTime?: string;
  /** The location of the database. Available locations are listed at https://cloud.google.com/firestore/docs/locations. */
  locationId?: string;
  /** The type of the database. See https://cloud.google.com/datastore/docs/firestore-or-datastore for information about how to choose. */
  type?: "DATABASE_TYPE_UNSPECIFIED" | "FIRESTORE_NATIVE" | "DATASTORE_MODE" | (string & {});
  /** The concurrency control mode to use for this database. If unspecified in a CreateDatabase request, this will default based on the database edition: Optimistic for Enterprise and Pessimistic for all other databases. */
  concurrencyMode?: "CONCURRENCY_MODE_UNSPECIFIED" | "OPTIMISTIC" | "PESSIMISTIC" | "OPTIMISTIC_WITH_ENTITY_GROUPS" | (string & {});
  /** Output only. The period during which past versions of data are retained in the database. Any read or query can specify a `read_time` within this window, and will read the state of the database at that time. If the PITR feature is enabled, the retention period is 7 days. Otherwise, the retention period is 1 hour. */
  versionRetentionPeriod?: string;
  /** Output only. The earliest timestamp at which older versions of the data can be read from the database. See [version_retention_period] above; this field is populated with `now - version_retention_period`. This value is continuously updated, and becomes stale the moment it is queried. If you are using this value to recover data, make sure to account for the time from the moment when the value is queried to the moment when you initiate the recovery. */
  earliestVersionTime?: string;
  /** Whether to enable the PITR feature on this database. */
  pointInTimeRecoveryEnablement?: "POINT_IN_TIME_RECOVERY_ENABLEMENT_UNSPECIFIED" | "POINT_IN_TIME_RECOVERY_ENABLED" | "POINT_IN_TIME_RECOVERY_DISABLED" | (string & {});
  /** The App Engine integration mode to use for this database. */
  appEngineIntegrationMode?: "APP_ENGINE_INTEGRATION_MODE_UNSPECIFIED" | "ENABLED" | "DISABLED" | (string & {});
  /** Output only. The key_prefix for this database. This key_prefix is used, in combination with the project ID ("~") to construct the application ID that is returned from the Cloud Datastore APIs in Google App Engine first generation runtimes. This value may be empty in which case the appid to use for URL-encoded keys is the project_id (eg: foo instead of v~foo). */
  keyPrefix?: string;
  /** State of delete protection for the database. */
  deleteProtectionState?: "DELETE_PROTECTION_STATE_UNSPECIFIED" | "DELETE_PROTECTION_DISABLED" | "DELETE_PROTECTION_ENABLED" | (string & {});
  /** Optional. Presence indicates CMEK is enabled for this database. */
  cmekConfig?: GoogleFirestoreAdminV1CmekConfig;
  /** Output only. The database resource's prior database ID. This field is only populated for deleted databases. */
  previousId?: string;
  /** Output only. Information about the provenance of this database. */
  sourceInfo?: GoogleFirestoreAdminV1SourceInfo;
  /** Optional. Input only. Immutable. Tag keys/values directly bound to this resource. For example: "123/environment": "production", "123/costCenter": "marketing" */
  tags?: Record<string, string>;
  /** Output only. Background: Free tier is the ability of a Firestore database to use a small amount of resources every day without being charged. Once usage exceeds the free tier limit further usage is charged. Whether this database can make use of the free tier. Only one database per project can be eligible for the free tier. The first (or next) database that is created in a project without a free tier database will be marked as eligible for the free tier. Databases that are created while there is a free tier database will not be eligible for the free tier. */
  freeTier?: boolean;
  /** This checksum is computed by the server based on the value of other fields, and may be sent on update and delete requests to ensure the client has an up-to-date value before proceeding. */
  etag?: string;
  /** Immutable. The edition of the database. */
  databaseEdition?: "DATABASE_EDITION_UNSPECIFIED" | "STANDARD" | "ENTERPRISE" | (string & {});
  /** Immutable. The default Realtime Updates mode to use for this database. */
  realtimeUpdatesMode?: "REALTIME_UPDATES_MODE_UNSPECIFIED" | "REALTIME_UPDATES_MODE_ENABLED" | "REALTIME_UPDATES_MODE_DISABLED" | (string & {});
  /** Optional. The Firestore API data access mode to use for this database. If not set on write: - the default value is DATA_ACCESS_MODE_DISABLED for Enterprise Edition. - the default value is DATA_ACCESS_MODE_ENABLED for Standard Edition. */
  firestoreDataAccessMode?: "DATA_ACCESS_MODE_UNSPECIFIED" | "DATA_ACCESS_MODE_ENABLED" | "DATA_ACCESS_MODE_DISABLED" | (string & {});
  /** Optional. The MongoDB compatible API data access mode to use for this database. If not set on write, the default value is DATA_ACCESS_MODE_ENABLED for Enterprise Edition. The value is always DATA_ACCESS_MODE_DISABLED for Standard Edition. */
  mongodbCompatibleDataAccessMode?: "DATA_ACCESS_MODE_UNSPECIFIED" | "DATA_ACCESS_MODE_ENABLED" | "DATA_ACCESS_MODE_DISABLED" | (string & {});
}

export const GoogleFirestoreAdminV1Database: Schema.Schema<GoogleFirestoreAdminV1Database> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  uid: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  deleteTime: Schema.optional(Schema.String),
  locationId: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  concurrencyMode: Schema.optional(Schema.String),
  versionRetentionPeriod: Schema.optional(Schema.String),
  earliestVersionTime: Schema.optional(Schema.String),
  pointInTimeRecoveryEnablement: Schema.optional(Schema.String),
  appEngineIntegrationMode: Schema.optional(Schema.String),
  keyPrefix: Schema.optional(Schema.String),
  deleteProtectionState: Schema.optional(Schema.String),
  cmekConfig: Schema.optional(GoogleFirestoreAdminV1CmekConfig),
  previousId: Schema.optional(Schema.String),
  sourceInfo: Schema.optional(GoogleFirestoreAdminV1SourceInfo),
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  freeTier: Schema.optional(Schema.Boolean),
  etag: Schema.optional(Schema.String),
  databaseEdition: Schema.optional(Schema.String),
  realtimeUpdatesMode: Schema.optional(Schema.String),
  firestoreDataAccessMode: Schema.optional(Schema.String),
  mongodbCompatibleDataAccessMode: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleFirestoreAdminV1Database" }) as any as Schema.Schema<GoogleFirestoreAdminV1Database>;

export interface GoogleFirestoreAdminV1ListDatabasesResponse {
  /** The databases in the project. */
  databases?: Array<GoogleFirestoreAdminV1Database>;
  /** In the event that data about individual databases cannot be listed they will be recorded here. An example entry might be: projects/some_project/locations/some_location This can happen if the Cloud Region that the Database resides in is currently unavailable. In this case we can't fetch all the details about the database. You may be able to get a more detailed error message (or possibly fetch the resource) by sending a 'Get' request for the resource or a 'List' request for the specific location. */
  unreachable?: Array<string>;
}

export const GoogleFirestoreAdminV1ListDatabasesResponse: Schema.Schema<GoogleFirestoreAdminV1ListDatabasesResponse> = Schema.suspend(() => Schema.Struct({
  databases: Schema.optional(Schema.Array(GoogleFirestoreAdminV1Database)),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleFirestoreAdminV1ListDatabasesResponse" }) as any as Schema.Schema<GoogleFirestoreAdminV1ListDatabasesResponse>;

export interface GoogleFirestoreAdminV1ResourceIdentity {
  /** Output only. Principal identifier string. See: https://cloud.google.com/iam/docs/principal-identifiers */
  principal?: string;
}

export const GoogleFirestoreAdminV1ResourceIdentity: Schema.Schema<GoogleFirestoreAdminV1ResourceIdentity> = Schema.suspend(() => Schema.Struct({
  principal: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleFirestoreAdminV1ResourceIdentity" }) as any as Schema.Schema<GoogleFirestoreAdminV1ResourceIdentity>;

export interface GoogleFirestoreAdminV1UserCreds {
  /** Identifier. The resource name of the UserCreds. Format: `projects/{project}/databases/{database}/userCreds/{user_creds}` */
  name?: string;
  /** Output only. The time the user creds were created. */
  createTime?: string;
  /** Output only. The time the user creds were last updated. */
  updateTime?: string;
  /** Output only. Whether the user creds are enabled or disabled. Defaults to ENABLED on creation. */
  state?: "STATE_UNSPECIFIED" | "ENABLED" | "DISABLED" | (string & {});
  /** Output only. The plaintext server-generated password for the user creds. Only populated in responses for CreateUserCreds and ResetUserPassword. */
  securePassword?: string;
  /** Resource Identity descriptor. */
  resourceIdentity?: GoogleFirestoreAdminV1ResourceIdentity;
}

export const GoogleFirestoreAdminV1UserCreds: Schema.Schema<GoogleFirestoreAdminV1UserCreds> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  securePassword: Schema.optional(Schema.String),
  resourceIdentity: Schema.optional(GoogleFirestoreAdminV1ResourceIdentity),
})).annotate({ identifier: "GoogleFirestoreAdminV1UserCreds" }) as any as Schema.Schema<GoogleFirestoreAdminV1UserCreds>;

export interface GoogleFirestoreAdminV1ListUserCredsResponse {
  /** The user creds for the database. */
  userCreds?: Array<GoogleFirestoreAdminV1UserCreds>;
}

export const GoogleFirestoreAdminV1ListUserCredsResponse: Schema.Schema<GoogleFirestoreAdminV1ListUserCredsResponse> = Schema.suspend(() => Schema.Struct({
  userCreds: Schema.optional(Schema.Array(GoogleFirestoreAdminV1UserCreds)),
})).annotate({ identifier: "GoogleFirestoreAdminV1ListUserCredsResponse" }) as any as Schema.Schema<GoogleFirestoreAdminV1ListUserCredsResponse>;

export interface GoogleFirestoreAdminV1EnableUserCredsRequest {
}

export const GoogleFirestoreAdminV1EnableUserCredsRequest: Schema.Schema<GoogleFirestoreAdminV1EnableUserCredsRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleFirestoreAdminV1EnableUserCredsRequest" }) as any as Schema.Schema<GoogleFirestoreAdminV1EnableUserCredsRequest>;

export interface GoogleFirestoreAdminV1DisableUserCredsRequest {
}

export const GoogleFirestoreAdminV1DisableUserCredsRequest: Schema.Schema<GoogleFirestoreAdminV1DisableUserCredsRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleFirestoreAdminV1DisableUserCredsRequest" }) as any as Schema.Schema<GoogleFirestoreAdminV1DisableUserCredsRequest>;

export interface GoogleFirestoreAdminV1ResetUserPasswordRequest {
}

export const GoogleFirestoreAdminV1ResetUserPasswordRequest: Schema.Schema<GoogleFirestoreAdminV1ResetUserPasswordRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleFirestoreAdminV1ResetUserPasswordRequest" }) as any as Schema.Schema<GoogleFirestoreAdminV1ResetUserPasswordRequest>;

export interface GoogleFirestoreAdminV1Stats {
  /** Output only. Summation of the size of all documents and index entries in the backup, measured in bytes. */
  sizeBytes?: string;
  /** Output only. The total number of documents contained in the backup. */
  documentCount?: string;
  /** Output only. The total number of index entries contained in the backup. */
  indexCount?: string;
}

export const GoogleFirestoreAdminV1Stats: Schema.Schema<GoogleFirestoreAdminV1Stats> = Schema.suspend(() => Schema.Struct({
  sizeBytes: Schema.optional(Schema.String),
  documentCount: Schema.optional(Schema.String),
  indexCount: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleFirestoreAdminV1Stats" }) as any as Schema.Schema<GoogleFirestoreAdminV1Stats>;

export interface GoogleFirestoreAdminV1Backup {
  /** Output only. The unique resource name of the Backup. Format is `projects/{project}/locations/{location}/backups/{backup}`. The location in the name will be the Standard Managed Multi-Region (SMMR) location (e.g. `us`) if the backup was created with an SMMR location, or the Google Managed Multi-Region (GMMR) location (e.g. `nam5`) if the backup was created with a GMMR location. */
  name?: string;
  /** Output only. Name of the Firestore database that the backup is from. Format is `projects/{project}/databases/{database}`. */
  database?: string;
  /** Output only. The system-generated UUID4 for the Firestore database that the backup is from. */
  databaseUid?: string;
  /** Output only. The backup contains an externally consistent copy of the database at this time. */
  snapshotTime?: string;
  /** Output only. The timestamp at which this backup expires. */
  expireTime?: string;
  /** Output only. Statistics about the backup. This data only becomes available after the backup is fully materialized to secondary storage. This field will be empty till then. */
  stats?: GoogleFirestoreAdminV1Stats;
  /** Output only. The current state of the backup. */
  state?: "STATE_UNSPECIFIED" | "CREATING" | "READY" | "NOT_AVAILABLE" | (string & {});
}

export const GoogleFirestoreAdminV1Backup: Schema.Schema<GoogleFirestoreAdminV1Backup> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  database: Schema.optional(Schema.String),
  databaseUid: Schema.optional(Schema.String),
  snapshotTime: Schema.optional(Schema.String),
  expireTime: Schema.optional(Schema.String),
  stats: Schema.optional(GoogleFirestoreAdminV1Stats),
  state: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleFirestoreAdminV1Backup" }) as any as Schema.Schema<GoogleFirestoreAdminV1Backup>;

export interface GoogleFirestoreAdminV1ListBackupsResponse {
  /** List of all backups for the project. */
  backups?: Array<GoogleFirestoreAdminV1Backup>;
  /** List of locations that existing backups were not able to be fetched from. Instead of failing the entire requests when a single location is unreachable, this response returns a partial result set and list of locations unable to be reached here. The request can be retried against a single location to get a concrete error. */
  unreachable?: Array<string>;
}

export const GoogleFirestoreAdminV1ListBackupsResponse: Schema.Schema<GoogleFirestoreAdminV1ListBackupsResponse> = Schema.suspend(() => Schema.Struct({
  backups: Schema.optional(Schema.Array(GoogleFirestoreAdminV1Backup)),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleFirestoreAdminV1ListBackupsResponse" }) as any as Schema.Schema<GoogleFirestoreAdminV1ListBackupsResponse>;

export interface GoogleFirestoreAdminV1GoogleDefaultEncryptionOptions {
}

export const GoogleFirestoreAdminV1GoogleDefaultEncryptionOptions: Schema.Schema<GoogleFirestoreAdminV1GoogleDefaultEncryptionOptions> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleFirestoreAdminV1GoogleDefaultEncryptionOptions" }) as any as Schema.Schema<GoogleFirestoreAdminV1GoogleDefaultEncryptionOptions>;

export interface GoogleFirestoreAdminV1SourceEncryptionOptions {
}

export const GoogleFirestoreAdminV1SourceEncryptionOptions: Schema.Schema<GoogleFirestoreAdminV1SourceEncryptionOptions> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleFirestoreAdminV1SourceEncryptionOptions" }) as any as Schema.Schema<GoogleFirestoreAdminV1SourceEncryptionOptions>;

export interface GoogleFirestoreAdminV1CustomerManagedEncryptionOptions {
  /** Required. Only keys in the same location as the database are allowed to be used for encryption. For Firestore's nam5 multi-region, this corresponds to Cloud KMS multi-region us. For Firestore's eur3 multi-region, this corresponds to Cloud KMS multi-region europe. See https://cloud.google.com/kms/docs/locations. The expected format is `projects/{project_id}/locations/{kms_location}/keyRings/{key_ring}/cryptoKeys/{crypto_key}`. */
  kmsKeyName?: string;
}

export const GoogleFirestoreAdminV1CustomerManagedEncryptionOptions: Schema.Schema<GoogleFirestoreAdminV1CustomerManagedEncryptionOptions> = Schema.suspend(() => Schema.Struct({
  kmsKeyName: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleFirestoreAdminV1CustomerManagedEncryptionOptions" }) as any as Schema.Schema<GoogleFirestoreAdminV1CustomerManagedEncryptionOptions>;

export interface GoogleFirestoreAdminV1EncryptionConfig {
  /** Use Google default encryption. */
  googleDefaultEncryption?: GoogleFirestoreAdminV1GoogleDefaultEncryptionOptions;
  /** The database will use the same encryption configuration as the source. */
  useSourceEncryption?: GoogleFirestoreAdminV1SourceEncryptionOptions;
  /** Use Customer Managed Encryption Keys (CMEK) for encryption. */
  customerManagedEncryption?: GoogleFirestoreAdminV1CustomerManagedEncryptionOptions;
}

export const GoogleFirestoreAdminV1EncryptionConfig: Schema.Schema<GoogleFirestoreAdminV1EncryptionConfig> = Schema.suspend(() => Schema.Struct({
  googleDefaultEncryption: Schema.optional(GoogleFirestoreAdminV1GoogleDefaultEncryptionOptions),
  useSourceEncryption: Schema.optional(GoogleFirestoreAdminV1SourceEncryptionOptions),
  customerManagedEncryption: Schema.optional(GoogleFirestoreAdminV1CustomerManagedEncryptionOptions),
})).annotate({ identifier: "GoogleFirestoreAdminV1EncryptionConfig" }) as any as Schema.Schema<GoogleFirestoreAdminV1EncryptionConfig>;

export interface GoogleFirestoreAdminV1RestoreDatabaseRequest {
  /** Required. The ID to use for the database, which will become the final component of the database's resource name. This database ID must not be associated with an existing database. This value should be 4-63 characters. Valid characters are /a-z-/ with first character a letter and the last a letter or a number. Must not be UUID-like /[0-9a-f]{8}(-[0-9a-f]{4}){3}-[0-9a-f]{12}/. "(default)" database ID is also valid if the database is Standard edition. */
  databaseId?: string;
  /** Required. Backup to restore from. Must be from the same project as the parent. The restored database will be created in the same location as the source backup. Format is: `projects/{project_id}/locations/{location}/backups/{backup}` */
  backup?: string;
  /** Optional. Encryption configuration for the restored database. If this field is not specified, the restored database will use the same encryption configuration as the backup, namely use_source_encryption. */
  encryptionConfig?: GoogleFirestoreAdminV1EncryptionConfig;
  /** Optional. Immutable. Tags to be bound to the restored database. The tags should be provided in the format of `tagKeys/{tag_key_id} -> tagValues/{tag_value_id}`. */
  tags?: Record<string, string>;
}

export const GoogleFirestoreAdminV1RestoreDatabaseRequest: Schema.Schema<GoogleFirestoreAdminV1RestoreDatabaseRequest> = Schema.suspend(() => Schema.Struct({
  databaseId: Schema.optional(Schema.String),
  backup: Schema.optional(Schema.String),
  encryptionConfig: Schema.optional(GoogleFirestoreAdminV1EncryptionConfig),
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "GoogleFirestoreAdminV1RestoreDatabaseRequest" }) as any as Schema.Schema<GoogleFirestoreAdminV1RestoreDatabaseRequest>;

export interface GoogleFirestoreAdminV1DailyRecurrence {
}

export const GoogleFirestoreAdminV1DailyRecurrence: Schema.Schema<GoogleFirestoreAdminV1DailyRecurrence> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleFirestoreAdminV1DailyRecurrence" }) as any as Schema.Schema<GoogleFirestoreAdminV1DailyRecurrence>;

export interface GoogleFirestoreAdminV1WeeklyRecurrence {
  /** The day of week to run. DAY_OF_WEEK_UNSPECIFIED is not allowed. */
  day?: "DAY_OF_WEEK_UNSPECIFIED" | "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY" | (string & {});
}

export const GoogleFirestoreAdminV1WeeklyRecurrence: Schema.Schema<GoogleFirestoreAdminV1WeeklyRecurrence> = Schema.suspend(() => Schema.Struct({
  day: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleFirestoreAdminV1WeeklyRecurrence" }) as any as Schema.Schema<GoogleFirestoreAdminV1WeeklyRecurrence>;

export interface GoogleFirestoreAdminV1BackupSchedule {
  /** Output only. The unique backup schedule identifier across all locations and databases for the given project. This will be auto-assigned. Format is `projects/{project}/databases/{database}/backupSchedules/{backup_schedule}` */
  name?: string;
  /** Output only. The timestamp at which this backup schedule was created and effective since. No backups will be created for this schedule before this time. */
  createTime?: string;
  /** Output only. The timestamp at which this backup schedule was most recently updated. When a backup schedule is first created, this is the same as create_time. */
  updateTime?: string;
  /** At what relative time in the future, compared to its creation time, the backup should be deleted, e.g. keep backups for 7 days. The maximum supported retention period is 14 weeks. */
  retention?: string;
  /** For a schedule that runs daily. */
  dailyRecurrence?: GoogleFirestoreAdminV1DailyRecurrence;
  /** For a schedule that runs weekly on a specific day. */
  weeklyRecurrence?: GoogleFirestoreAdminV1WeeklyRecurrence;
}

export const GoogleFirestoreAdminV1BackupSchedule: Schema.Schema<GoogleFirestoreAdminV1BackupSchedule> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  retention: Schema.optional(Schema.String),
  dailyRecurrence: Schema.optional(GoogleFirestoreAdminV1DailyRecurrence),
  weeklyRecurrence: Schema.optional(GoogleFirestoreAdminV1WeeklyRecurrence),
})).annotate({ identifier: "GoogleFirestoreAdminV1BackupSchedule" }) as any as Schema.Schema<GoogleFirestoreAdminV1BackupSchedule>;

export interface GoogleFirestoreAdminV1ListBackupSchedulesResponse {
  /** List of all backup schedules. */
  backupSchedules?: Array<GoogleFirestoreAdminV1BackupSchedule>;
}

export const GoogleFirestoreAdminV1ListBackupSchedulesResponse: Schema.Schema<GoogleFirestoreAdminV1ListBackupSchedulesResponse> = Schema.suspend(() => Schema.Struct({
  backupSchedules: Schema.optional(Schema.Array(GoogleFirestoreAdminV1BackupSchedule)),
})).annotate({ identifier: "GoogleFirestoreAdminV1ListBackupSchedulesResponse" }) as any as Schema.Schema<GoogleFirestoreAdminV1ListBackupSchedulesResponse>;

export interface GoogleFirestoreAdminV1PitrSnapshot {
  /** Required. The name of the database that this was a snapshot of. Format: `projects/{project}/databases/{database}`. */
  database?: string;
  /** Output only. Public UUID of the database the snapshot was associated with. */
  databaseUid?: string;
  /** Required. Snapshot time of the database. */
  snapshotTime?: string;
}

export const GoogleFirestoreAdminV1PitrSnapshot: Schema.Schema<GoogleFirestoreAdminV1PitrSnapshot> = Schema.suspend(() => Schema.Struct({
  database: Schema.optional(Schema.String),
  databaseUid: Schema.optional(Schema.String),
  snapshotTime: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleFirestoreAdminV1PitrSnapshot" }) as any as Schema.Schema<GoogleFirestoreAdminV1PitrSnapshot>;

export interface GoogleFirestoreAdminV1CloneDatabaseRequest {
  /** Required. The ID to use for the database, which will become the final component of the database's resource name. This database ID must not be associated with an existing database. This value should be 4-63 characters. Valid characters are /a-z-/ with first character a letter and the last a letter or a number. Must not be UUID-like /[0-9a-f]{8}(-[0-9a-f]{4}){3}-[0-9a-f]{12}/. "(default)" database ID is also valid if the database is Standard edition. */
  databaseId?: string;
  /** Required. Specification of the PITR data to clone from. The source database must exist. The cloned database will be created in the same location as the source database. */
  pitrSnapshot?: GoogleFirestoreAdminV1PitrSnapshot;
  /** Optional. Encryption configuration for the cloned database. If this field is not specified, the cloned database will use the same encryption configuration as the source database, namely use_source_encryption. */
  encryptionConfig?: GoogleFirestoreAdminV1EncryptionConfig;
  /** Optional. Immutable. Tags to be bound to the cloned database. The tags should be provided in the format of `tagKeys/{tag_key_id} -> tagValues/{tag_value_id}`. */
  tags?: Record<string, string>;
}

export const GoogleFirestoreAdminV1CloneDatabaseRequest: Schema.Schema<GoogleFirestoreAdminV1CloneDatabaseRequest> = Schema.suspend(() => Schema.Struct({
  databaseId: Schema.optional(Schema.String),
  pitrSnapshot: Schema.optional(GoogleFirestoreAdminV1PitrSnapshot),
  encryptionConfig: Schema.optional(GoogleFirestoreAdminV1EncryptionConfig),
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "GoogleFirestoreAdminV1CloneDatabaseRequest" }) as any as Schema.Schema<GoogleFirestoreAdminV1CloneDatabaseRequest>;

export interface LatLng {
  /** The latitude in degrees. It must be in the range [-90.0, +90.0]. */
  latitude?: number;
  /** The longitude in degrees. It must be in the range [-180.0, +180.0]. */
  longitude?: number;
}

export const LatLng: Schema.Schema<LatLng> = Schema.suspend(() => Schema.Struct({
  latitude: Schema.optional(Schema.Number),
  longitude: Schema.optional(Schema.Number),
})).annotate({ identifier: "LatLng" }) as any as Schema.Schema<LatLng>;

export interface ArrayValue {
  /** Values in the array. */
  values?: Array<Value>;
}

export const ArrayValue: Schema.Schema<ArrayValue> = Schema.suspend(() => Schema.Struct({
  values: Schema.optional(Schema.Array(Value)),
})).annotate({ identifier: "ArrayValue" }) as any as Schema.Schema<ArrayValue>;

export interface MapValue {
  /** The map's fields. The map keys represent field names. Field names matching the regular expression `__.*__` are reserved. Reserved field names are forbidden except in certain documented contexts. The map keys, represented as UTF-8, must not exceed 1,500 bytes and cannot be empty. */
  fields?: Record<string, Value>;
}

export const MapValue: Schema.Schema<MapValue> = Schema.suspend(() => Schema.Struct({
  fields: Schema.optional(Schema.Record(Schema.String, Value)),
})).annotate({ identifier: "MapValue" }) as any as Schema.Schema<MapValue>;

export interface Firestore_Function {
  /** Required. The name of the function to evaluate. **Requires:** * must be in snake case (lower case with underscore separator). */
  name?: string;
  /** Optional. Ordered list of arguments the given function expects. */
  args?: Array<Value>;
  /** Optional. Optional named arguments that certain functions may support. */
  options?: Record<string, Value>;
}

export const Firestore_Function: Schema.Schema<Firestore_Function> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  args: Schema.optional(Schema.Array(Value)),
  options: Schema.optional(Schema.Record(Schema.String, Value)),
})).annotate({ identifier: "Firestore_Function" }) as any as Schema.Schema<Firestore_Function>;

export interface Stage {
  /** Required. The name of the stage to evaluate. **Requires:** * must be in snake case (lower case with underscore separator). */
  name?: string;
  /** Optional. Ordered list of arguments the given stage expects. */
  args?: Array<Value>;
  /** Optional. Optional named arguments that certain functions may support. */
  options?: Record<string, Value>;
}

export const Stage: Schema.Schema<Stage> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  args: Schema.optional(Schema.Array(Value)),
  options: Schema.optional(Schema.Record(Schema.String, Value)),
})).annotate({ identifier: "Stage" }) as any as Schema.Schema<Stage>;

export interface Pipeline {
  /** Required. Ordered list of stages to evaluate. */
  stages?: Array<Stage>;
}

export const Pipeline: Schema.Schema<Pipeline> = Schema.suspend(() => Schema.Struct({
  stages: Schema.optional(Schema.Array(Stage)),
})).annotate({ identifier: "Pipeline" }) as any as Schema.Schema<Pipeline>;

export interface Value {
  /** A null value. */
  nullValue?: "NULL_VALUE" | (string & {});
  /** A boolean value. */
  booleanValue?: boolean;
  /** An integer value. */
  integerValue?: string;
  /** A double value. */
  doubleValue?: number;
  /** A timestamp value. Precise only to microseconds. When stored, any additional precision is rounded down. */
  timestampValue?: string;
  /** A string value. The string, represented as UTF-8, must not exceed 1 MiB - 89 bytes. Only the first 1,500 bytes of the UTF-8 representation are considered by queries. */
  stringValue?: string;
  /** A bytes value. Must not exceed 1 MiB - 89 bytes. Only the first 1,500 bytes are considered by queries. */
  bytesValue?: string;
  /** A reference to a document. For example: `projects/{project_id}/databases/{database_id}/documents/{document_path}`. */
  referenceValue?: string;
  /** A geo point value representing a point on the surface of Earth. */
  geoPointValue?: LatLng;
  /** An array value. Cannot directly contain another array value, though can contain a map which contains another array. */
  arrayValue?: ArrayValue;
  /** A map value. */
  mapValue?: MapValue;
  /** Value which references a field. This is considered relative (vs absolute) since it only refers to a field and not a field within a particular document. **Requires:** * Must follow field reference limitations. * Not allowed to be used when writing documents. */
  fieldReferenceValue?: string;
  /** A value that represents an unevaluated expression. **Requires:** * Not allowed to be used when writing documents. */
  functionValue?: Firestore_Function;
  /** A value that represents an unevaluated pipeline. **Requires:** * Not allowed to be used when writing documents. */
  pipelineValue?: Pipeline;
}

export const Value: Schema.Schema<Value> = Schema.suspend(() => Schema.Struct({
  nullValue: Schema.optional(Schema.String),
  booleanValue: Schema.optional(Schema.Boolean),
  integerValue: Schema.optional(Schema.String),
  doubleValue: Schema.optional(Schema.Number),
  timestampValue: Schema.optional(Schema.String),
  stringValue: Schema.optional(Schema.String),
  bytesValue: Schema.optional(Schema.String),
  referenceValue: Schema.optional(Schema.String),
  geoPointValue: Schema.optional(LatLng),
  arrayValue: Schema.optional(ArrayValue),
  mapValue: Schema.optional(MapValue),
  fieldReferenceValue: Schema.optional(Schema.String),
  functionValue: Schema.optional(Firestore_Function),
  pipelineValue: Schema.optional(Pipeline),
})).annotate({ identifier: "Value" }) as any as Schema.Schema<Value>;

export interface Document {
  /** The resource name of the document, for example `projects/{project_id}/databases/{database_id}/documents/{document_path}`. */
  name?: string;
  /** The document's fields. The map keys represent field names. Field names matching the regular expression `__.*__` are reserved. Reserved field names are forbidden except in certain documented contexts. The field names, represented as UTF-8, must not exceed 1,500 bytes and cannot be empty. Field paths may be used in other contexts to refer to structured fields defined here. For `map_value`, the field path is represented by a dot-delimited (`.`) string of segments. Each segment is either a simple field name (defined below) or a quoted field name. For example, the structured field `"foo" : { map_value: { "x&y" : { string_value: "hello" }}}` would be represented by the field path `` foo.`x&y` ``. A simple field name contains only characters `a` to `z`, `A` to `Z`, `0` to `9`, or `_`, and must not start with `0` to `9`. For example, `foo_bar_17`. A quoted field name starts and ends with `` ` `` and may contain any character. Some characters, including `` ` ``, must be escaped using a `\`. For example, `` `x&y` `` represents `x&y` and `` `bak\`tik` `` represents `` bak`tik ``. */
  fields?: Record<string, Value>;
  /** Output only. The time at which the document was created. This value increases monotonically when a document is deleted then recreated. It can also be compared to values from other documents and the `read_time` of a query. */
  createTime?: string;
  /** Output only. The time at which the document was last changed. This value is initially set to the `create_time` then increases monotonically with each change to the document. It can also be compared to values from other documents and the `read_time` of a query. */
  updateTime?: string;
}

export const Document: Schema.Schema<Document> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  fields: Schema.optional(Schema.Record(Schema.String, Value)),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
})).annotate({ identifier: "Document" }) as any as Schema.Schema<Document>;

export interface ListDocumentsResponse {
  /** The Documents found. */
  documents?: Array<Document>;
  /** A token to retrieve the next page of documents. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const ListDocumentsResponse: Schema.Schema<ListDocumentsResponse> = Schema.suspend(() => Schema.Struct({
  documents: Schema.optional(Schema.Array(Document)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListDocumentsResponse" }) as any as Schema.Schema<ListDocumentsResponse>;

export interface DocumentMask {
  /** The list of field paths in the mask. See Document.fields for a field path syntax reference. */
  fieldPaths?: Array<string>;
}

export const DocumentMask: Schema.Schema<DocumentMask> = Schema.suspend(() => Schema.Struct({
  fieldPaths: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "DocumentMask" }) as any as Schema.Schema<DocumentMask>;

export interface ReadOnly {
  /** Reads documents at the given time. This must be a microsecond precision timestamp within the past one hour, or if Point-in-Time Recovery is enabled, can additionally be a whole minute timestamp within the past 7 days. */
  readTime?: string;
}

export const ReadOnly: Schema.Schema<ReadOnly> = Schema.suspend(() => Schema.Struct({
  readTime: Schema.optional(Schema.String),
})).annotate({ identifier: "ReadOnly" }) as any as Schema.Schema<ReadOnly>;

export interface ReadWrite {
  /** An optional transaction to retry. */
  retryTransaction?: string;
}

export const ReadWrite: Schema.Schema<ReadWrite> = Schema.suspend(() => Schema.Struct({
  retryTransaction: Schema.optional(Schema.String),
})).annotate({ identifier: "ReadWrite" }) as any as Schema.Schema<ReadWrite>;

export interface TransactionOptions {
  /** The transaction can only be used for read operations. */
  readOnly?: ReadOnly;
  /** The transaction can be used for both read and write operations. */
  readWrite?: ReadWrite;
}

export const TransactionOptions: Schema.Schema<TransactionOptions> = Schema.suspend(() => Schema.Struct({
  readOnly: Schema.optional(ReadOnly),
  readWrite: Schema.optional(ReadWrite),
})).annotate({ identifier: "TransactionOptions" }) as any as Schema.Schema<TransactionOptions>;

export interface BatchGetDocumentsRequest {
  /** The names of the documents to retrieve. In the format: `projects/{project_id}/databases/{database_id}/documents/{document_path}`. The request will fail if any of the document is not a child resource of the given `database`. Duplicate names will be elided. */
  documents?: Array<string>;
  /** The fields to return. If not set, returns all fields. If a document has a field that is not present in this mask, that field will not be returned in the response. */
  mask?: DocumentMask;
  /** Reads documents in a transaction. */
  transaction?: string;
  /** Starts a new transaction and reads the documents. Defaults to a read-only transaction. The new transaction ID will be returned as the first response in the stream. */
  newTransaction?: TransactionOptions;
  /** Reads documents as they were at the given time. This must be a microsecond precision timestamp within the past one hour, or if Point-in-Time Recovery is enabled, can additionally be a whole minute timestamp within the past 7 days. */
  readTime?: string;
}

export const BatchGetDocumentsRequest: Schema.Schema<BatchGetDocumentsRequest> = Schema.suspend(() => Schema.Struct({
  documents: Schema.optional(Schema.Array(Schema.String)),
  mask: Schema.optional(DocumentMask),
  transaction: Schema.optional(Schema.String),
  newTransaction: Schema.optional(TransactionOptions),
  readTime: Schema.optional(Schema.String),
})).annotate({ identifier: "BatchGetDocumentsRequest" }) as any as Schema.Schema<BatchGetDocumentsRequest>;

export interface BatchGetDocumentsResponse {
  /** A document that was requested. */
  found?: Document;
  /** A document name that was requested but does not exist. In the format: `projects/{project_id}/databases/{database_id}/documents/{document_path}`. */
  missing?: string;
  /** The transaction that was started as part of this request. Will only be set in the first response, and only if BatchGetDocumentsRequest.new_transaction was set in the request. */
  transaction?: string;
  /** The time at which the document was read. This may be monotically increasing, in this case the previous documents in the result stream are guaranteed not to have changed between their read_time and this one. */
  readTime?: string;
}

export const BatchGetDocumentsResponse: Schema.Schema<BatchGetDocumentsResponse> = Schema.suspend(() => Schema.Struct({
  found: Schema.optional(Document),
  missing: Schema.optional(Schema.String),
  transaction: Schema.optional(Schema.String),
  readTime: Schema.optional(Schema.String),
})).annotate({ identifier: "BatchGetDocumentsResponse" }) as any as Schema.Schema<BatchGetDocumentsResponse>;

export interface BeginTransactionRequest {
  /** The options for the transaction. Defaults to a read-write transaction. */
  options?: TransactionOptions;
}

export const BeginTransactionRequest: Schema.Schema<BeginTransactionRequest> = Schema.suspend(() => Schema.Struct({
  options: Schema.optional(TransactionOptions),
})).annotate({ identifier: "BeginTransactionRequest" }) as any as Schema.Schema<BeginTransactionRequest>;

export interface BeginTransactionResponse {
  /** The transaction that was started. */
  transaction?: string;
}

export const BeginTransactionResponse: Schema.Schema<BeginTransactionResponse> = Schema.suspend(() => Schema.Struct({
  transaction: Schema.optional(Schema.String),
})).annotate({ identifier: "BeginTransactionResponse" }) as any as Schema.Schema<BeginTransactionResponse>;

export interface FieldTransform {
  /** The path of the field. See Document.fields for the field path syntax reference. */
  fieldPath?: string;
  /** Sets the field to the given server value. */
  setToServerValue?: "SERVER_VALUE_UNSPECIFIED" | "REQUEST_TIME" | (string & {});
  /** Adds the given value to the field's current value. This must be an integer or a double value. If the field is not an integer or double, or if the field does not yet exist, the transformation will set the field to the given value. If either of the given value or the current field value are doubles, both values will be interpreted as doubles. Double arithmetic and representation of double values follow IEEE 754 semantics. If there is positive/negative integer overflow, the field is resolved to the largest magnitude positive/negative integer. */
  increment?: Value;
  /** Sets the field to the maximum of its current value and the given value. This must be an integer or a double value. If the field is not an integer or double, or if the field does not yet exist, the transformation will set the field to the given value. If a maximum operation is applied where the field and the input value are of mixed types (that is - one is an integer and one is a double) the field takes on the type of the larger operand. If the operands are equivalent (e.g. 3 and 3.0), the field does not change. 0, 0.0, and -0.0 are all zero. The maximum of a zero stored value and zero input value is always the stored value. The maximum of any numeric value x and NaN is NaN. */
  maximum?: Value;
  /** Sets the field to the minimum of its current value and the given value. This must be an integer or a double value. If the field is not an integer or double, or if the field does not yet exist, the transformation will set the field to the input value. If a minimum operation is applied where the field and the input value are of mixed types (that is - one is an integer and one is a double) the field takes on the type of the smaller operand. If the operands are equivalent (e.g. 3 and 3.0), the field does not change. 0, 0.0, and -0.0 are all zero. The minimum of a zero stored value and zero input value is always the stored value. The minimum of any numeric value x and NaN is NaN. */
  minimum?: Value;
  /** Append the given elements in order if they are not already present in the current field value. If the field is not an array, or if the field does not yet exist, it is first set to the empty array. Equivalent numbers of different types (e.g. 3L and 3.0) are considered equal when checking if a value is missing. NaN is equal to NaN, and Null is equal to Null. If the input contains multiple equivalent values, only the first will be considered. The corresponding transform_result will be the null value. */
  appendMissingElements?: ArrayValue;
  /** Remove all of the given elements from the array in the field. If the field is not an array, or if the field does not yet exist, it is set to the empty array. Equivalent numbers of the different types (e.g. 3L and 3.0) are considered equal when deciding whether an element should be removed. NaN is equal to NaN, and Null is equal to Null. This will remove all equivalent values if there are duplicates. The corresponding transform_result will be the null value. */
  removeAllFromArray?: ArrayValue;
}

export const FieldTransform: Schema.Schema<FieldTransform> = Schema.suspend(() => Schema.Struct({
  fieldPath: Schema.optional(Schema.String),
  setToServerValue: Schema.optional(Schema.String),
  increment: Schema.optional(Value),
  maximum: Schema.optional(Value),
  minimum: Schema.optional(Value),
  appendMissingElements: Schema.optional(ArrayValue),
  removeAllFromArray: Schema.optional(ArrayValue),
})).annotate({ identifier: "FieldTransform" }) as any as Schema.Schema<FieldTransform>;

export interface DocumentTransform {
  /** The name of the document to transform. */
  document?: string;
  /** The list of transformations to apply to the fields of the document, in order. This must not be empty. */
  fieldTransforms?: Array<FieldTransform>;
}

export const DocumentTransform: Schema.Schema<DocumentTransform> = Schema.suspend(() => Schema.Struct({
  document: Schema.optional(Schema.String),
  fieldTransforms: Schema.optional(Schema.Array(FieldTransform)),
})).annotate({ identifier: "DocumentTransform" }) as any as Schema.Schema<DocumentTransform>;

export interface Precondition {
  /** When set to `true`, the target document must exist. When set to `false`, the target document must not exist. */
  exists?: boolean;
  /** When set, the target document must exist and have been last updated at that time. Timestamp must be microsecond aligned. */
  updateTime?: string;
}

export const Precondition: Schema.Schema<Precondition> = Schema.suspend(() => Schema.Struct({
  exists: Schema.optional(Schema.Boolean),
  updateTime: Schema.optional(Schema.String),
})).annotate({ identifier: "Precondition" }) as any as Schema.Schema<Precondition>;

export interface Write {
  /** A document to write. */
  update?: Document;
  /** A document name to delete. In the format: `projects/{project_id}/databases/{database_id}/documents/{document_path}`. */
  delete?: string;
  /** Applies a transformation to a document. */
  transform?: DocumentTransform;
  /** The fields to update in this write. This field can be set only when the operation is `update`. If the mask is not set for an `update` and the document exists, any existing data will be overwritten. If the mask is set and the document on the server has fields not covered by the mask, they are left unchanged. Fields referenced in the mask, but not present in the input document, are deleted from the document on the server. The field paths in this mask must not contain a reserved field name. */
  updateMask?: DocumentMask;
  /** The transforms to perform after update. This field can be set only when the operation is `update`. If present, this write is equivalent to performing `update` and `transform` to the same document atomically and in order. */
  updateTransforms?: Array<FieldTransform>;
  /** An optional precondition on the document. The write will fail if this is set and not met by the target document. */
  currentDocument?: Precondition;
}

export const Write: Schema.Schema<Write> = Schema.suspend(() => Schema.Struct({
  update: Schema.optional(Document),
  delete: Schema.optional(Schema.String),
  transform: Schema.optional(DocumentTransform),
  updateMask: Schema.optional(DocumentMask),
  updateTransforms: Schema.optional(Schema.Array(FieldTransform)),
  currentDocument: Schema.optional(Precondition),
})).annotate({ identifier: "Write" }) as any as Schema.Schema<Write>;

export interface CommitRequest {
  /** The writes to apply. Always executed atomically and in order. */
  writes?: Array<Write>;
  /** If set, applies all writes in this transaction, and commits it. */
  transaction?: string;
}

export const CommitRequest: Schema.Schema<CommitRequest> = Schema.suspend(() => Schema.Struct({
  writes: Schema.optional(Schema.Array(Write)),
  transaction: Schema.optional(Schema.String),
})).annotate({ identifier: "CommitRequest" }) as any as Schema.Schema<CommitRequest>;

export interface WriteResult {
  /** The last update time of the document after applying the write. Not set after a `delete`. If the write did not actually change the document, this will be the previous update_time. */
  updateTime?: string;
  /** The results of applying each DocumentTransform.FieldTransform, in the same order. */
  transformResults?: Array<Value>;
}

export const WriteResult: Schema.Schema<WriteResult> = Schema.suspend(() => Schema.Struct({
  updateTime: Schema.optional(Schema.String),
  transformResults: Schema.optional(Schema.Array(Value)),
})).annotate({ identifier: "WriteResult" }) as any as Schema.Schema<WriteResult>;

export interface CommitResponse {
  /** The result of applying the writes. This i-th write result corresponds to the i-th write in the request. */
  writeResults?: Array<WriteResult>;
  /** The time at which the commit occurred. Any read with an equal or greater `read_time` is guaranteed to see the effects of the commit. */
  commitTime?: string;
}

export const CommitResponse: Schema.Schema<CommitResponse> = Schema.suspend(() => Schema.Struct({
  writeResults: Schema.optional(Schema.Array(WriteResult)),
  commitTime: Schema.optional(Schema.String),
})).annotate({ identifier: "CommitResponse" }) as any as Schema.Schema<CommitResponse>;

export interface RollbackRequest {
  /** Required. The transaction to roll back. */
  transaction?: string;
}

export const RollbackRequest: Schema.Schema<RollbackRequest> = Schema.suspend(() => Schema.Struct({
  transaction: Schema.optional(Schema.String),
})).annotate({ identifier: "RollbackRequest" }) as any as Schema.Schema<RollbackRequest>;

export interface FieldReference {
  /** A reference to a field in a document. Requires: * MUST be a dot-delimited (`.`) string of segments, where each segment conforms to document field name limitations. */
  fieldPath?: string;
}

export const FieldReference: Schema.Schema<FieldReference> = Schema.suspend(() => Schema.Struct({
  fieldPath: Schema.optional(Schema.String),
})).annotate({ identifier: "FieldReference" }) as any as Schema.Schema<FieldReference>;

export interface Projection {
  /** The fields to return. If empty, all fields are returned. To only return the name of the document, use `['__name__']`. */
  fields?: Array<FieldReference>;
}

export const Projection: Schema.Schema<Projection> = Schema.suspend(() => Schema.Struct({
  fields: Schema.optional(Schema.Array(FieldReference)),
})).annotate({ identifier: "Projection" }) as any as Schema.Schema<Projection>;

export interface CollectionSelector {
  /** The collection ID. When set, selects only collections with this ID. */
  collectionId?: string;
  /** When false, selects only collections that are immediate children of the `parent` specified in the containing `RunQueryRequest`. When true, selects all descendant collections. */
  allDescendants?: boolean;
}

export const CollectionSelector: Schema.Schema<CollectionSelector> = Schema.suspend(() => Schema.Struct({
  collectionId: Schema.optional(Schema.String),
  allDescendants: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "CollectionSelector" }) as any as Schema.Schema<CollectionSelector>;

export interface CompositeFilter {
  /** The operator for combining multiple filters. */
  op?: "OPERATOR_UNSPECIFIED" | "AND" | "OR" | (string & {});
  /** The list of filters to combine. Requires: * At least one filter is present. */
  filters?: Array<Filter>;
}

export const CompositeFilter: Schema.Schema<CompositeFilter> = Schema.suspend(() => Schema.Struct({
  op: Schema.optional(Schema.String),
  filters: Schema.optional(Schema.Array(Filter)),
})).annotate({ identifier: "CompositeFilter" }) as any as Schema.Schema<CompositeFilter>;

export interface FieldFilter {
  /** The field to filter by. */
  field?: FieldReference;
  /** The operator to filter by. */
  op?: "OPERATOR_UNSPECIFIED" | "LESS_THAN" | "LESS_THAN_OR_EQUAL" | "GREATER_THAN" | "GREATER_THAN_OR_EQUAL" | "EQUAL" | "NOT_EQUAL" | "ARRAY_CONTAINS" | "IN" | "ARRAY_CONTAINS_ANY" | "NOT_IN" | (string & {});
  /** The value to compare to. */
  value?: Value;
}

export const FieldFilter: Schema.Schema<FieldFilter> = Schema.suspend(() => Schema.Struct({
  field: Schema.optional(FieldReference),
  op: Schema.optional(Schema.String),
  value: Schema.optional(Value),
})).annotate({ identifier: "FieldFilter" }) as any as Schema.Schema<FieldFilter>;

export interface UnaryFilter {
  /** The unary operator to apply. */
  op?: "OPERATOR_UNSPECIFIED" | "IS_NAN" | "IS_NULL" | "IS_NOT_NAN" | "IS_NOT_NULL" | (string & {});
  /** The field to which to apply the operator. */
  field?: FieldReference;
}

export const UnaryFilter: Schema.Schema<UnaryFilter> = Schema.suspend(() => Schema.Struct({
  op: Schema.optional(Schema.String),
  field: Schema.optional(FieldReference),
})).annotate({ identifier: "UnaryFilter" }) as any as Schema.Schema<UnaryFilter>;

export interface Filter {
  /** A composite filter. */
  compositeFilter?: CompositeFilter;
  /** A filter on a document field. */
  fieldFilter?: FieldFilter;
  /** A filter that takes exactly one argument. */
  unaryFilter?: UnaryFilter;
}

export const Filter: Schema.Schema<Filter> = Schema.suspend(() => Schema.Struct({
  compositeFilter: Schema.optional(CompositeFilter),
  fieldFilter: Schema.optional(FieldFilter),
  unaryFilter: Schema.optional(UnaryFilter),
})).annotate({ identifier: "Filter" }) as any as Schema.Schema<Filter>;

export interface Order {
  /** The field to order by. */
  field?: FieldReference;
  /** The direction to order by. Defaults to `ASCENDING`. */
  direction?: "DIRECTION_UNSPECIFIED" | "ASCENDING" | "DESCENDING" | (string & {});
}

export const Order: Schema.Schema<Order> = Schema.suspend(() => Schema.Struct({
  field: Schema.optional(FieldReference),
  direction: Schema.optional(Schema.String),
})).annotate({ identifier: "Order" }) as any as Schema.Schema<Order>;

export interface Cursor {
  /** The values that represent a position, in the order they appear in the order by clause of a query. Can contain fewer values than specified in the order by clause. */
  values?: Array<Value>;
  /** If the position is just before or just after the given values, relative to the sort order defined by the query. */
  before?: boolean;
}

export const Cursor: Schema.Schema<Cursor> = Schema.suspend(() => Schema.Struct({
  values: Schema.optional(Schema.Array(Value)),
  before: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "Cursor" }) as any as Schema.Schema<Cursor>;

export interface FindNearest {
  /** Required. An indexed vector field to search upon. Only documents which contain vectors whose dimensionality match the query_vector can be returned. */
  vectorField?: FieldReference;
  /** Required. The query vector that we are searching on. Must be a vector of no more than 2048 dimensions. */
  queryVector?: Value;
  /** Required. The distance measure to use, required. */
  distanceMeasure?: "DISTANCE_MEASURE_UNSPECIFIED" | "EUCLIDEAN" | "COSINE" | "DOT_PRODUCT" | (string & {});
  /** Required. The number of nearest neighbors to return. Must be a positive integer of no more than 1000. */
  limit?: number;
  /** Optional. Optional name of the field to output the result of the vector distance calculation. Must conform to document field name limitations. */
  distanceResultField?: string;
  /** Optional. Option to specify a threshold for which no less similar documents will be returned. The behavior of the specified `distance_measure` will affect the meaning of the distance threshold. Since DOT_PRODUCT distances increase when the vectors are more similar, the comparison is inverted. * For EUCLIDEAN, COSINE: `WHERE distance <= distance_threshold` * For DOT_PRODUCT: `WHERE distance >= distance_threshold` */
  distanceThreshold?: number;
}

export const FindNearest: Schema.Schema<FindNearest> = Schema.suspend(() => Schema.Struct({
  vectorField: Schema.optional(FieldReference),
  queryVector: Schema.optional(Value),
  distanceMeasure: Schema.optional(Schema.String),
  limit: Schema.optional(Schema.Number),
  distanceResultField: Schema.optional(Schema.String),
  distanceThreshold: Schema.optional(Schema.Number),
})).annotate({ identifier: "FindNearest" }) as any as Schema.Schema<FindNearest>;

export interface StructuredQuery {
  /** Optional sub-set of the fields to return. This acts as a DocumentMask over the documents returned from a query. When not set, assumes that the caller wants all fields returned. */
  select?: Projection;
  /** The collections to query. */
  from?: Array<CollectionSelector>;
  /** The filter to apply. */
  where?: Filter;
  /** The order to apply to the query results. Firestore allows callers to provide a full ordering, a partial ordering, or no ordering at all. In all cases, Firestore guarantees a stable ordering through the following rules: * The `order_by` is required to reference all fields used with an inequality filter. * All fields that are required to be in the `order_by` but are not already present are appended in lexicographical ordering of the field name. * If an order on `__name__` is not specified, it is appended by default. Fields are appended with the same sort direction as the last order specified, or 'ASCENDING' if no order was specified. For example: * `ORDER BY a` becomes `ORDER BY a ASC, __name__ ASC` * `ORDER BY a DESC` becomes `ORDER BY a DESC, __name__ DESC` * `WHERE a > 1` becomes `WHERE a > 1 ORDER BY a ASC, __name__ ASC` * `WHERE __name__ > ... AND a > 1` becomes `WHERE __name__ > ... AND a > 1 ORDER BY a ASC, __name__ ASC` */
  orderBy?: Array<Order>;
  /** A potential prefix of a position in the result set to start the query at. The ordering of the result set is based on the `ORDER BY` clause of the original query. ``` SELECT * FROM k WHERE a = 1 AND b > 2 ORDER BY b ASC, __name__ ASC; ``` This query's results are ordered by `(b ASC, __name__ ASC)`. Cursors can reference either the full ordering or a prefix of the location, though it cannot reference more fields than what are in the provided `ORDER BY`. Continuing off the example above, attaching the following start cursors will have varying impact: - `START BEFORE (2, /k/123)`: start the query right before `a = 1 AND b > 2 AND __name__ > /k/123`. - `START AFTER (10)`: start the query right after `a = 1 AND b > 10`. Unlike `OFFSET` which requires scanning over the first N results to skip, a start cursor allows the query to begin at a logical position. This position is not required to match an actual result, it will scan forward from this position to find the next document. Requires: * The number of values cannot be greater than the number of fields specified in the `ORDER BY` clause. */
  startAt?: Cursor;
  /** A potential prefix of a position in the result set to end the query at. This is similar to `START_AT` but with it controlling the end position rather than the start position. Requires: * The number of values cannot be greater than the number of fields specified in the `ORDER BY` clause. */
  endAt?: Cursor;
  /** The number of documents to skip before returning the first result. This applies after the constraints specified by the `WHERE`, `START AT`, & `END AT` but before the `LIMIT` clause. Requires: * The value must be greater than or equal to zero if specified. */
  offset?: number;
  /** The maximum number of results to return. Applies after all other constraints. Requires: * The value must be greater than or equal to zero if specified. */
  limit?: number;
  /** Optional. A potential nearest neighbors search. Applies after all other filters and ordering. Finds the closest vector embeddings to the given query vector. */
  findNearest?: FindNearest;
}

export const StructuredQuery: Schema.Schema<StructuredQuery> = Schema.suspend(() => Schema.Struct({
  select: Schema.optional(Projection),
  from: Schema.optional(Schema.Array(CollectionSelector)),
  where: Schema.optional(Filter),
  orderBy: Schema.optional(Schema.Array(Order)),
  startAt: Schema.optional(Cursor),
  endAt: Schema.optional(Cursor),
  offset: Schema.optional(Schema.Number),
  limit: Schema.optional(Schema.Number),
  findNearest: Schema.optional(FindNearest),
})).annotate({ identifier: "StructuredQuery" }) as any as Schema.Schema<StructuredQuery>;

export interface ExplainOptions {
  /** Optional. Whether to execute this query. When false (the default), the query will be planned, returning only metrics from the planning stages. When true, the query will be planned and executed, returning the full query results along with both planning and execution stage metrics. */
  analyze?: boolean;
}

export const ExplainOptions: Schema.Schema<ExplainOptions> = Schema.suspend(() => Schema.Struct({
  analyze: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "ExplainOptions" }) as any as Schema.Schema<ExplainOptions>;

export interface RunQueryRequest {
  /** A structured query. */
  structuredQuery?: StructuredQuery;
  /** Run the query within an already active transaction. The value here is the opaque transaction ID to execute the query in. */
  transaction?: string;
  /** Starts a new transaction and reads the documents. Defaults to a read-only transaction. The new transaction ID will be returned as the first response in the stream. */
  newTransaction?: TransactionOptions;
  /** Reads documents as they were at the given time. This must be a microsecond precision timestamp within the past one hour, or if Point-in-Time Recovery is enabled, can additionally be a whole minute timestamp within the past 7 days. */
  readTime?: string;
  /** Optional. Explain options for the query. If set, additional query statistics will be returned. If not, only query results will be returned. */
  explainOptions?: ExplainOptions;
}

export const RunQueryRequest: Schema.Schema<RunQueryRequest> = Schema.suspend(() => Schema.Struct({
  structuredQuery: Schema.optional(StructuredQuery),
  transaction: Schema.optional(Schema.String),
  newTransaction: Schema.optional(TransactionOptions),
  readTime: Schema.optional(Schema.String),
  explainOptions: Schema.optional(ExplainOptions),
})).annotate({ identifier: "RunQueryRequest" }) as any as Schema.Schema<RunQueryRequest>;

export interface PlanSummary {
  /** The indexes selected for the query. For example: [ {"query_scope": "Collection", "properties": "(foo ASC, __name__ ASC)"}, {"query_scope": "Collection", "properties": "(bar ASC, __name__ ASC)"} ] */
  indexesUsed?: Array<Record<string, unknown>>;
}

export const PlanSummary: Schema.Schema<PlanSummary> = Schema.suspend(() => Schema.Struct({
  indexesUsed: Schema.optional(Schema.Array(Schema.Record(Schema.String, Schema.Unknown))),
})).annotate({ identifier: "PlanSummary" }) as any as Schema.Schema<PlanSummary>;

export interface ExecutionStats {
  /** Total number of results returned, including documents, projections, aggregation results, keys. */
  resultsReturned?: string;
  /** Total time to execute the query in the backend. */
  executionDuration?: string;
  /** Total billable read operations. */
  readOperations?: string;
  /** Debugging statistics from the execution of the query. Note that the debugging stats are subject to change as Firestore evolves. It could include: { "indexes_entries_scanned": "1000", "documents_scanned": "20", "billing_details" : { "documents_billable": "20", "index_entries_billable": "1000", "min_query_cost": "0" } } */
  debugStats?: Record<string, unknown>;
}

export const ExecutionStats: Schema.Schema<ExecutionStats> = Schema.suspend(() => Schema.Struct({
  resultsReturned: Schema.optional(Schema.String),
  executionDuration: Schema.optional(Schema.String),
  readOperations: Schema.optional(Schema.String),
  debugStats: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "ExecutionStats" }) as any as Schema.Schema<ExecutionStats>;

export interface ExplainMetrics {
  /** Planning phase information for the query. */
  planSummary?: PlanSummary;
  /** Aggregated stats from the execution of the query. Only present when ExplainOptions.analyze is set to true. */
  executionStats?: ExecutionStats;
}

export const ExplainMetrics: Schema.Schema<ExplainMetrics> = Schema.suspend(() => Schema.Struct({
  planSummary: Schema.optional(PlanSummary),
  executionStats: Schema.optional(ExecutionStats),
})).annotate({ identifier: "ExplainMetrics" }) as any as Schema.Schema<ExplainMetrics>;

export interface RunQueryResponse {
  /** The transaction that was started as part of this request. Can only be set in the first response, and only if RunQueryRequest.new_transaction was set in the request. If set, no other fields will be set in this response. */
  transaction?: string;
  /** A query result, not set when reporting partial progress. */
  document?: Document;
  /** The time at which the document was read. This may be monotonically increasing; in this case, the previous documents in the result stream are guaranteed not to have changed between their `read_time` and this one. If the query returns no results, a response with `read_time` and no `document` will be sent, and this represents the time at which the query was run. */
  readTime?: string;
  /** The number of results that have been skipped due to an offset between the last response and the current response. */
  skippedResults?: number;
  /** If present, Firestore has completely finished the request and no more documents will be returned. */
  done?: boolean;
  /** Query explain metrics. This is only present when the RunQueryRequest.explain_options is provided, and it is sent only once with the last response in the stream. */
  explainMetrics?: ExplainMetrics;
}

export const RunQueryResponse: Schema.Schema<RunQueryResponse> = Schema.suspend(() => Schema.Struct({
  transaction: Schema.optional(Schema.String),
  document: Schema.optional(Document),
  readTime: Schema.optional(Schema.String),
  skippedResults: Schema.optional(Schema.Number),
  done: Schema.optional(Schema.Boolean),
  explainMetrics: Schema.optional(ExplainMetrics),
})).annotate({ identifier: "RunQueryResponse" }) as any as Schema.Schema<RunQueryResponse>;

export interface StructuredPipeline {
  /** Required. The pipeline query to execute. */
  pipeline?: Pipeline;
  /** Optional. Optional query-level arguments. */
  options?: Record<string, Value>;
}

export const StructuredPipeline: Schema.Schema<StructuredPipeline> = Schema.suspend(() => Schema.Struct({
  pipeline: Schema.optional(Pipeline),
  options: Schema.optional(Schema.Record(Schema.String, Value)),
})).annotate({ identifier: "StructuredPipeline" }) as any as Schema.Schema<StructuredPipeline>;

export interface ExecutePipelineRequest {
  /** A pipelined operation. */
  structuredPipeline?: StructuredPipeline;
  /** Run the query within an already active transaction. The value here is the opaque transaction ID to execute the query in. */
  transaction?: string;
  /** Execute the pipeline in a new transaction. The identifier of the newly created transaction will be returned in the first response on the stream. This defaults to a read-only transaction. */
  newTransaction?: TransactionOptions;
  /** Execute the pipeline in a snapshot transaction at the given time. This must be a microsecond precision timestamp within the past one hour, or if Point-in-Time Recovery is enabled, can additionally be a whole minute timestamp within the past 7 days. */
  readTime?: string;
}

export const ExecutePipelineRequest: Schema.Schema<ExecutePipelineRequest> = Schema.suspend(() => Schema.Struct({
  structuredPipeline: Schema.optional(StructuredPipeline),
  transaction: Schema.optional(Schema.String),
  newTransaction: Schema.optional(TransactionOptions),
  readTime: Schema.optional(Schema.String),
})).annotate({ identifier: "ExecutePipelineRequest" }) as any as Schema.Schema<ExecutePipelineRequest>;

export interface ExplainStats {
  /** The format depends on the `output_format` options in the request. Currently there are two supported options: `TEXT` and `JSON`. Both supply a `google.protobuf.StringValue`. */
  data?: Record<string, unknown>;
}

export const ExplainStats: Schema.Schema<ExplainStats> = Schema.suspend(() => Schema.Struct({
  data: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "ExplainStats" }) as any as Schema.Schema<ExplainStats>;

export interface ExecutePipelineResponse {
  /** Newly created transaction identifier. This field is only specified as part of the first response from the server, alongside the `results` field when the original request specified ExecuteRequest.new_transaction. */
  transaction?: string;
  /** An ordered batch of results returned executing a pipeline. The batch size is variable, and can even be zero for when only a partial progress message is returned. The fields present in the returned documents are only those that were explicitly requested in the pipeline, this includes those like `__name__` and `__update_time__`. This is explicitly a divergence from `Firestore.RunQuery` / `Firestore.GetDocument` RPCs which always return such fields even when they are not specified in the `mask`. */
  results?: Array<Document>;
  /** The time at which the results are valid. This is a (not strictly) monotonically increasing value across multiple responses in the same stream. The API guarantees that all previously returned results are still valid at the latest `execution_time`. This allows the API consumer to treat the query if it ran at the latest `execution_time` returned. If the query returns no results, a response with `execution_time` and no `results` will be sent, and this represents the time at which the operation was run. */
  executionTime?: string;
  /** Query explain stats. This is present on the **last** response if the request configured explain to run in 'analyze' or 'explain' mode in the pipeline options. If the query does not return any results, a response with `explain_stats` and no `results` will still be sent. */
  explainStats?: ExplainStats;
}

export const ExecutePipelineResponse: Schema.Schema<ExecutePipelineResponse> = Schema.suspend(() => Schema.Struct({
  transaction: Schema.optional(Schema.String),
  results: Schema.optional(Schema.Array(Document)),
  executionTime: Schema.optional(Schema.String),
  explainStats: Schema.optional(ExplainStats),
})).annotate({ identifier: "ExecutePipelineResponse" }) as any as Schema.Schema<ExecutePipelineResponse>;

export interface Count {
  /** Optional. Optional constraint on the maximum number of documents to count. This provides a way to set an upper bound on the number of documents to scan, limiting latency, and cost. Unspecified is interpreted as no bound. High-Level Example: ``` AGGREGATE COUNT_UP_TO(1000) OVER ( SELECT * FROM k ); ``` Requires: * Must be greater than zero when present. */
  upTo?: string;
}

export const Count: Schema.Schema<Count> = Schema.suspend(() => Schema.Struct({
  upTo: Schema.optional(Schema.String),
})).annotate({ identifier: "Count" }) as any as Schema.Schema<Count>;

export interface Sum {
  /** The field to aggregate on. */
  field?: FieldReference;
}

export const Sum: Schema.Schema<Sum> = Schema.suspend(() => Schema.Struct({
  field: Schema.optional(FieldReference),
})).annotate({ identifier: "Sum" }) as any as Schema.Schema<Sum>;

export interface Avg {
  /** The field to aggregate on. */
  field?: FieldReference;
}

export const Avg: Schema.Schema<Avg> = Schema.suspend(() => Schema.Struct({
  field: Schema.optional(FieldReference),
})).annotate({ identifier: "Avg" }) as any as Schema.Schema<Avg>;

export interface Aggregation {
  /** Count aggregator. */
  count?: Count;
  /** Sum aggregator. */
  sum?: Sum;
  /** Average aggregator. */
  avg?: Avg;
  /** Optional. Optional name of the field to store the result of the aggregation into. If not provided, Firestore will pick a default name following the format `field_`. For example: ``` AGGREGATE COUNT_UP_TO(1) AS count_up_to_1, COUNT_UP_TO(2), COUNT_UP_TO(3) AS count_up_to_3, COUNT(*) OVER ( ... ); ``` becomes: ``` AGGREGATE COUNT_UP_TO(1) AS count_up_to_1, COUNT_UP_TO(2) AS field_1, COUNT_UP_TO(3) AS count_up_to_3, COUNT(*) AS field_2 OVER ( ... ); ``` Requires: * Must be unique across all aggregation aliases. * Conform to document field name limitations. */
  alias?: string;
}

export const Aggregation: Schema.Schema<Aggregation> = Schema.suspend(() => Schema.Struct({
  count: Schema.optional(Count),
  sum: Schema.optional(Sum),
  avg: Schema.optional(Avg),
  alias: Schema.optional(Schema.String),
})).annotate({ identifier: "Aggregation" }) as any as Schema.Schema<Aggregation>;

export interface StructuredAggregationQuery {
  /** Nested structured query. */
  structuredQuery?: StructuredQuery;
  /** Optional. Series of aggregations to apply over the results of the `structured_query`. Requires: * A minimum of one and maximum of five aggregations per query. */
  aggregations?: Array<Aggregation>;
}

export const StructuredAggregationQuery: Schema.Schema<StructuredAggregationQuery> = Schema.suspend(() => Schema.Struct({
  structuredQuery: Schema.optional(StructuredQuery),
  aggregations: Schema.optional(Schema.Array(Aggregation)),
})).annotate({ identifier: "StructuredAggregationQuery" }) as any as Schema.Schema<StructuredAggregationQuery>;

export interface RunAggregationQueryRequest {
  /** An aggregation query. */
  structuredAggregationQuery?: StructuredAggregationQuery;
  /** Run the aggregation within an already active transaction. The value here is the opaque transaction ID to execute the query in. */
  transaction?: string;
  /** Starts a new transaction as part of the query, defaulting to read-only. The new transaction ID will be returned as the first response in the stream. */
  newTransaction?: TransactionOptions;
  /** Executes the query at the given timestamp. This must be a microsecond precision timestamp within the past one hour, or if Point-in-Time Recovery is enabled, can additionally be a whole minute timestamp within the past 7 days. */
  readTime?: string;
  /** Optional. Explain options for the query. If set, additional query statistics will be returned. If not, only query results will be returned. */
  explainOptions?: ExplainOptions;
}

export const RunAggregationQueryRequest: Schema.Schema<RunAggregationQueryRequest> = Schema.suspend(() => Schema.Struct({
  structuredAggregationQuery: Schema.optional(StructuredAggregationQuery),
  transaction: Schema.optional(Schema.String),
  newTransaction: Schema.optional(TransactionOptions),
  readTime: Schema.optional(Schema.String),
  explainOptions: Schema.optional(ExplainOptions),
})).annotate({ identifier: "RunAggregationQueryRequest" }) as any as Schema.Schema<RunAggregationQueryRequest>;

export interface AggregationResult {
  /** The result of the aggregation functions, ex: `COUNT(*) AS total_docs`. The key is the alias assigned to the aggregation function on input and the size of this map equals the number of aggregation functions in the query. */
  aggregateFields?: Record<string, Value>;
}

export const AggregationResult: Schema.Schema<AggregationResult> = Schema.suspend(() => Schema.Struct({
  aggregateFields: Schema.optional(Schema.Record(Schema.String, Value)),
})).annotate({ identifier: "AggregationResult" }) as any as Schema.Schema<AggregationResult>;

export interface RunAggregationQueryResponse {
  /** A single aggregation result. Not present when reporting partial progress. */
  result?: AggregationResult;
  /** The transaction that was started as part of this request. Only present on the first response when the request requested to start a new transaction. */
  transaction?: string;
  /** The time at which the aggregate result was computed. This is always monotonically increasing; in this case, the previous AggregationResult in the result stream are guaranteed not to have changed between their `read_time` and this one. If the query returns no results, a response with `read_time` and no `result` will be sent, and this represents the time at which the query was run. */
  readTime?: string;
  /** Query explain metrics. This is only present when the RunAggregationQueryRequest.explain_options is provided, and it is sent only once with the last response in the stream. */
  explainMetrics?: ExplainMetrics;
}

export const RunAggregationQueryResponse: Schema.Schema<RunAggregationQueryResponse> = Schema.suspend(() => Schema.Struct({
  result: Schema.optional(AggregationResult),
  transaction: Schema.optional(Schema.String),
  readTime: Schema.optional(Schema.String),
  explainMetrics: Schema.optional(ExplainMetrics),
})).annotate({ identifier: "RunAggregationQueryResponse" }) as any as Schema.Schema<RunAggregationQueryResponse>;

export interface PartitionQueryRequest {
  /** A structured query. Query must specify collection with all descendants and be ordered by name ascending. Other filters, order bys, limits, offsets, and start/end cursors are not supported. */
  structuredQuery?: StructuredQuery;
  /** The desired maximum number of partition points. The partitions may be returned across multiple pages of results. The number must be positive. The actual number of partitions returned may be fewer. For example, this may be set to one fewer than the number of parallel queries to be run, or in running a data pipeline job, one fewer than the number of workers or compute instances available. */
  partitionCount?: string;
  /** The `next_page_token` value returned from a previous call to PartitionQuery that may be used to get an additional set of results. There are no ordering guarantees between sets of results. Thus, using multiple sets of results will require merging the different result sets. For example, two subsequent calls using a page_token may return: * cursor B, cursor M, cursor Q * cursor A, cursor U, cursor W To obtain a complete result set ordered with respect to the results of the query supplied to PartitionQuery, the results sets should be merged: cursor A, cursor B, cursor M, cursor Q, cursor U, cursor W */
  pageToken?: string;
  /** The maximum number of partitions to return in this call, subject to `partition_count`. For example, if `partition_count` = 10 and `page_size` = 8, the first call to PartitionQuery will return up to 8 partitions and a `next_page_token` if more results exist. A second call to PartitionQuery will return up to 2 partitions, to complete the total of 10 specified in `partition_count`. */
  pageSize?: number;
  /** Reads documents as they were at the given time. This must be a microsecond precision timestamp within the past one hour, or if Point-in-Time Recovery is enabled, can additionally be a whole minute timestamp within the past 7 days. */
  readTime?: string;
}

export const PartitionQueryRequest: Schema.Schema<PartitionQueryRequest> = Schema.suspend(() => Schema.Struct({
  structuredQuery: Schema.optional(StructuredQuery),
  partitionCount: Schema.optional(Schema.String),
  pageToken: Schema.optional(Schema.String),
  pageSize: Schema.optional(Schema.Number),
  readTime: Schema.optional(Schema.String),
})).annotate({ identifier: "PartitionQueryRequest" }) as any as Schema.Schema<PartitionQueryRequest>;

export interface PartitionQueryResponse {
  /** Partition results. Each partition is a split point that can be used by RunQuery as a starting or end point for the query results. The RunQuery requests must be made with the same query supplied to this PartitionQuery request. The partition cursors will be ordered according to same ordering as the results of the query supplied to PartitionQuery. For example, if a PartitionQuery request returns partition cursors A and B, running the following three queries will return the entire result set of the original query: * query, end_at A * query, start_at A, end_at B * query, start_at B An empty result may indicate that the query has too few results to be partitioned, or that the query is not yet supported for partitioning. */
  partitions?: Array<Cursor>;
  /** A page token that may be used to request an additional set of results, up to the number specified by `partition_count` in the PartitionQuery request. If blank, there are no more results. */
  nextPageToken?: string;
}

export const PartitionQueryResponse: Schema.Schema<PartitionQueryResponse> = Schema.suspend(() => Schema.Struct({
  partitions: Schema.optional(Schema.Array(Cursor)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "PartitionQueryResponse" }) as any as Schema.Schema<PartitionQueryResponse>;

export interface WriteRequest {
  /** The ID of the write stream to resume. This may only be set in the first message. When left empty, a new write stream will be created. */
  streamId?: string;
  /** The writes to apply. Always executed atomically and in order. This must be empty on the first request. This may be empty on the last request. This must not be empty on all other requests. */
  writes?: Array<Write>;
  /** A stream token that was previously sent by the server. The client should set this field to the token from the most recent WriteResponse it has received. This acknowledges that the client has received responses up to this token. After sending this token, earlier tokens may not be used anymore. The server may close the stream if there are too many unacknowledged responses. Leave this field unset when creating a new stream. To resume a stream at a specific point, set this field and the `stream_id` field. Leave this field unset when creating a new stream. */
  streamToken?: string;
  /** Labels associated with this write request. */
  labels?: Record<string, string>;
}

export const WriteRequest: Schema.Schema<WriteRequest> = Schema.suspend(() => Schema.Struct({
  streamId: Schema.optional(Schema.String),
  writes: Schema.optional(Schema.Array(Write)),
  streamToken: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "WriteRequest" }) as any as Schema.Schema<WriteRequest>;

export interface WriteResponse {
  /** The ID of the stream. Only set on the first message, when a new stream was created. */
  streamId?: string;
  /** A token that represents the position of this response in the stream. This can be used by a client to resume the stream at this point. This field is always set. */
  streamToken?: string;
  /** The result of applying the writes. This i-th write result corresponds to the i-th write in the request. */
  writeResults?: Array<WriteResult>;
  /** The time at which the commit occurred. Any read with an equal or greater `read_time` is guaranteed to see the effects of the write. */
  commitTime?: string;
}

export const WriteResponse: Schema.Schema<WriteResponse> = Schema.suspend(() => Schema.Struct({
  streamId: Schema.optional(Schema.String),
  streamToken: Schema.optional(Schema.String),
  writeResults: Schema.optional(Schema.Array(WriteResult)),
  commitTime: Schema.optional(Schema.String),
})).annotate({ identifier: "WriteResponse" }) as any as Schema.Schema<WriteResponse>;

export interface QueryTarget {
  /** The parent resource name. In the format: `projects/{project_id}/databases/{database_id}/documents` or `projects/{project_id}/databases/{database_id}/documents/{document_path}`. For example: `projects/my-project/databases/my-database/documents` or `projects/my-project/databases/my-database/documents/chatrooms/my-chatroom` */
  parent?: string;
  /** A structured query. */
  structuredQuery?: StructuredQuery;
}

export const QueryTarget: Schema.Schema<QueryTarget> = Schema.suspend(() => Schema.Struct({
  parent: Schema.optional(Schema.String),
  structuredQuery: Schema.optional(StructuredQuery),
})).annotate({ identifier: "QueryTarget" }) as any as Schema.Schema<QueryTarget>;

export interface DocumentsTarget {
  /** The names of the documents to retrieve. In the format: `projects/{project_id}/databases/{database_id}/documents/{document_path}`. The request will fail if any of the document is not a child resource of the given `database`. Duplicate names will be elided. */
  documents?: Array<string>;
}

export const DocumentsTarget: Schema.Schema<DocumentsTarget> = Schema.suspend(() => Schema.Struct({
  documents: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "DocumentsTarget" }) as any as Schema.Schema<DocumentsTarget>;

export interface Target {
  /** A target specified by a query. */
  query?: QueryTarget;
  /** A target specified by a set of document names. */
  documents?: DocumentsTarget;
  /** A resume token from a prior TargetChange for an identical target. Using a resume token with a different target is unsupported and may fail. */
  resumeToken?: string;
  /** Start listening after a specific `read_time`. The client must know the state of matching documents at this time. */
  readTime?: string;
  /** The target ID that identifies the target on the stream. Must be a positive number and non-zero. If `target_id` is 0 (or unspecified), the server will assign an ID for this target and return that in a `TargetChange::ADD` event. Once a target with `target_id=0` is added, all subsequent targets must also have `target_id=0`. If an `AddTarget` request with `target_id != 0` is sent to the server after a target with `target_id=0` is added, the server will immediately send a response with a `TargetChange::Remove` event. Note that if the client sends multiple `AddTarget` requests without an ID, the order of IDs returned in `TargetChange.target_ids` are undefined. Therefore, clients should provide a target ID instead of relying on the server to assign one. If `target_id` is non-zero, there must not be an existing active target on this stream with the same ID. */
  targetId?: number;
  /** If the target should be removed once it is current and consistent. */
  once?: boolean;
  /** The number of documents that last matched the query at the resume token or read time. This value is only relevant when a `resume_type` is provided. This value being present and greater than zero signals that the client wants `ExistenceFilter.unchanged_names` to be included in the response. */
  expectedCount?: number;
}

export const Target: Schema.Schema<Target> = Schema.suspend(() => Schema.Struct({
  query: Schema.optional(QueryTarget),
  documents: Schema.optional(DocumentsTarget),
  resumeToken: Schema.optional(Schema.String),
  readTime: Schema.optional(Schema.String),
  targetId: Schema.optional(Schema.Number),
  once: Schema.optional(Schema.Boolean),
  expectedCount: Schema.optional(Schema.Number),
})).annotate({ identifier: "Target" }) as any as Schema.Schema<Target>;

export interface ListenRequest {
  /** A target to add to this stream. */
  addTarget?: Target;
  /** The ID of a target to remove from this stream. */
  removeTarget?: number;
  /** Labels associated with this target change. */
  labels?: Record<string, string>;
}

export const ListenRequest: Schema.Schema<ListenRequest> = Schema.suspend(() => Schema.Struct({
  addTarget: Schema.optional(Target),
  removeTarget: Schema.optional(Schema.Number),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "ListenRequest" }) as any as Schema.Schema<ListenRequest>;

export interface TargetChange {
  /** The type of change that occurred. */
  targetChangeType?: "NO_CHANGE" | "ADD" | "REMOVE" | "CURRENT" | "RESET" | (string & {});
  /** The target IDs of targets that have changed. If empty, the change applies to all targets. The order of the target IDs is not defined. */
  targetIds?: Array<number>;
  /** The error that resulted in this change, if applicable. */
  cause?: Status;
  /** A token that can be used to resume the stream for the given `target_ids`, or all targets if `target_ids` is empty. Not set on every target change. */
  resumeToken?: string;
  /** The consistent `read_time` for the given `target_ids` (omitted when the target_ids are not at a consistent snapshot). The stream is guaranteed to send a `read_time` with `target_ids` empty whenever the entire stream reaches a new consistent snapshot. ADD, CURRENT, and RESET messages are guaranteed to (eventually) result in a new consistent snapshot (while NO_CHANGE and REMOVE messages are not). For a given stream, `read_time` is guaranteed to be monotonically increasing. */
  readTime?: string;
}

export const TargetChange: Schema.Schema<TargetChange> = Schema.suspend(() => Schema.Struct({
  targetChangeType: Schema.optional(Schema.String),
  targetIds: Schema.optional(Schema.Array(Schema.Number)),
  cause: Schema.optional(Status),
  resumeToken: Schema.optional(Schema.String),
  readTime: Schema.optional(Schema.String),
})).annotate({ identifier: "TargetChange" }) as any as Schema.Schema<TargetChange>;

export interface DocumentChange {
  /** The new state of the Document. If `mask` is set, contains only fields that were updated or added. */
  document?: Document;
  /** A set of target IDs of targets that match this document. */
  targetIds?: Array<number>;
  /** A set of target IDs for targets that no longer match this document. */
  removedTargetIds?: Array<number>;
}

export const DocumentChange: Schema.Schema<DocumentChange> = Schema.suspend(() => Schema.Struct({
  document: Schema.optional(Document),
  targetIds: Schema.optional(Schema.Array(Schema.Number)),
  removedTargetIds: Schema.optional(Schema.Array(Schema.Number)),
})).annotate({ identifier: "DocumentChange" }) as any as Schema.Schema<DocumentChange>;

export interface DocumentDelete {
  /** The resource name of the Document that was deleted. */
  document?: string;
  /** A set of target IDs for targets that previously matched this entity. */
  removedTargetIds?: Array<number>;
  /** The read timestamp at which the delete was observed. Greater or equal to the `commit_time` of the delete. */
  readTime?: string;
}

export const DocumentDelete: Schema.Schema<DocumentDelete> = Schema.suspend(() => Schema.Struct({
  document: Schema.optional(Schema.String),
  removedTargetIds: Schema.optional(Schema.Array(Schema.Number)),
  readTime: Schema.optional(Schema.String),
})).annotate({ identifier: "DocumentDelete" }) as any as Schema.Schema<DocumentDelete>;

export interface DocumentRemove {
  /** The resource name of the Document that has gone out of view. */
  document?: string;
  /** A set of target IDs for targets that previously matched this document. */
  removedTargetIds?: Array<number>;
  /** The read timestamp at which the remove was observed. Greater or equal to the `commit_time` of the change/delete/remove. */
  readTime?: string;
}

export const DocumentRemove: Schema.Schema<DocumentRemove> = Schema.suspend(() => Schema.Struct({
  document: Schema.optional(Schema.String),
  removedTargetIds: Schema.optional(Schema.Array(Schema.Number)),
  readTime: Schema.optional(Schema.String),
})).annotate({ identifier: "DocumentRemove" }) as any as Schema.Schema<DocumentRemove>;

export interface BitSequence {
  /** The bytes that encode the bit sequence. May have a length of zero. */
  bitmap?: string;
  /** The number of bits of the last byte in `bitmap` to ignore as "padding". If the length of `bitmap` is zero, then this value must be `0`. Otherwise, this value must be between 0 and 7, inclusive. */
  padding?: number;
}

export const BitSequence: Schema.Schema<BitSequence> = Schema.suspend(() => Schema.Struct({
  bitmap: Schema.optional(Schema.String),
  padding: Schema.optional(Schema.Number),
})).annotate({ identifier: "BitSequence" }) as any as Schema.Schema<BitSequence>;

export interface BloomFilter {
  /** The bloom filter data. */
  bits?: BitSequence;
  /** The number of hashes used by the algorithm. */
  hashCount?: number;
}

export const BloomFilter: Schema.Schema<BloomFilter> = Schema.suspend(() => Schema.Struct({
  bits: Schema.optional(BitSequence),
  hashCount: Schema.optional(Schema.Number),
})).annotate({ identifier: "BloomFilter" }) as any as Schema.Schema<BloomFilter>;

export interface ExistenceFilter {
  /** The target ID to which this filter applies. */
  targetId?: number;
  /** The total count of documents that match target_id. If different from the count of documents in the client that match, the client must manually determine which documents no longer match the target. The client can use the `unchanged_names` bloom filter to assist with this determination by testing ALL the document names against the filter; if the document name is NOT in the filter, it means the document no longer matches the target. */
  count?: number;
  /** A bloom filter that, despite its name, contains the UTF-8 byte encodings of the resource names of ALL the documents that match target_id, in the form `projects/{project_id}/databases/{database_id}/documents/{document_path}`. This bloom filter may be omitted at the server's discretion, such as if it is deemed that the client will not make use of it or if it is too computationally expensive to calculate or transmit. Clients must gracefully handle this field being absent by falling back to the logic used before this field existed; that is, re-add the target without a resume token to figure out which documents in the client's cache are out of sync. */
  unchangedNames?: BloomFilter;
}

export const ExistenceFilter: Schema.Schema<ExistenceFilter> = Schema.suspend(() => Schema.Struct({
  targetId: Schema.optional(Schema.Number),
  count: Schema.optional(Schema.Number),
  unchangedNames: Schema.optional(BloomFilter),
})).annotate({ identifier: "ExistenceFilter" }) as any as Schema.Schema<ExistenceFilter>;

export interface ListenResponse {
  /** Targets have changed. */
  targetChange?: TargetChange;
  /** A Document has changed. */
  documentChange?: DocumentChange;
  /** A Document has been deleted. */
  documentDelete?: DocumentDelete;
  /** A Document has been removed from a target (because it is no longer relevant to that target). */
  documentRemove?: DocumentRemove;
  /** A filter to apply to the set of documents previously returned for the given target. Returned when documents may have been removed from the given target, but the exact documents are unknown. */
  filter?: ExistenceFilter;
}

export const ListenResponse: Schema.Schema<ListenResponse> = Schema.suspend(() => Schema.Struct({
  targetChange: Schema.optional(TargetChange),
  documentChange: Schema.optional(DocumentChange),
  documentDelete: Schema.optional(DocumentDelete),
  documentRemove: Schema.optional(DocumentRemove),
  filter: Schema.optional(ExistenceFilter),
})).annotate({ identifier: "ListenResponse" }) as any as Schema.Schema<ListenResponse>;

export interface ListCollectionIdsRequest {
  /** The maximum number of results to return. */
  pageSize?: number;
  /** A page token. Must be a value from ListCollectionIdsResponse. */
  pageToken?: string;
  /** Reads documents as they were at the given time. This must be a microsecond precision timestamp within the past one hour, or if Point-in-Time Recovery is enabled, can additionally be a whole minute timestamp within the past 7 days. */
  readTime?: string;
}

export const ListCollectionIdsRequest: Schema.Schema<ListCollectionIdsRequest> = Schema.suspend(() => Schema.Struct({
  pageSize: Schema.optional(Schema.Number),
  pageToken: Schema.optional(Schema.String),
  readTime: Schema.optional(Schema.String),
})).annotate({ identifier: "ListCollectionIdsRequest" }) as any as Schema.Schema<ListCollectionIdsRequest>;

export interface ListCollectionIdsResponse {
  /** The collection ids. */
  collectionIds?: Array<string>;
  /** A page token that may be used to continue the list. */
  nextPageToken?: string;
}

export const ListCollectionIdsResponse: Schema.Schema<ListCollectionIdsResponse> = Schema.suspend(() => Schema.Struct({
  collectionIds: Schema.optional(Schema.Array(Schema.String)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListCollectionIdsResponse" }) as any as Schema.Schema<ListCollectionIdsResponse>;

export interface BatchWriteRequest {
  /** The writes to apply. Method does not apply writes atomically and does not guarantee ordering. Each write succeeds or fails independently. You cannot write to the same document more than once per request. */
  writes?: Array<Write>;
  /** Labels associated with this batch write. */
  labels?: Record<string, string>;
}

export const BatchWriteRequest: Schema.Schema<BatchWriteRequest> = Schema.suspend(() => Schema.Struct({
  writes: Schema.optional(Schema.Array(Write)),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "BatchWriteRequest" }) as any as Schema.Schema<BatchWriteRequest>;

export interface BatchWriteResponse {
  /** The result of applying the writes. This i-th write result corresponds to the i-th write in the request. */
  writeResults?: Array<WriteResult>;
  /** The status of applying the writes. This i-th write status corresponds to the i-th write in the request. */
  status?: Array<Status>;
}

export const BatchWriteResponse: Schema.Schema<BatchWriteResponse> = Schema.suspend(() => Schema.Struct({
  writeResults: Schema.optional(Schema.Array(WriteResult)),
  status: Schema.optional(Schema.Array(Status)),
})).annotate({ identifier: "BatchWriteResponse" }) as any as Schema.Schema<BatchWriteResponse>;

export interface GoogleFirestoreAdminV1IndexConfigDelta {
  /** Specifies how the index is changing. */
  changeType?: "CHANGE_TYPE_UNSPECIFIED" | "ADD" | "REMOVE" | (string & {});
  /** The index being changed. */
  index?: GoogleFirestoreAdminV1Index;
}

export const GoogleFirestoreAdminV1IndexConfigDelta: Schema.Schema<GoogleFirestoreAdminV1IndexConfigDelta> = Schema.suspend(() => Schema.Struct({
  changeType: Schema.optional(Schema.String),
  index: Schema.optional(GoogleFirestoreAdminV1Index),
})).annotate({ identifier: "GoogleFirestoreAdminV1IndexConfigDelta" }) as any as Schema.Schema<GoogleFirestoreAdminV1IndexConfigDelta>;

export interface GoogleFirestoreAdminV1Progress {
  /** The amount of work estimated. */
  estimatedWork?: string;
  /** The amount of work completed. */
  completedWork?: string;
}

export const GoogleFirestoreAdminV1Progress: Schema.Schema<GoogleFirestoreAdminV1Progress> = Schema.suspend(() => Schema.Struct({
  estimatedWork: Schema.optional(Schema.String),
  completedWork: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleFirestoreAdminV1Progress" }) as any as Schema.Schema<GoogleFirestoreAdminV1Progress>;

export interface GoogleFirestoreAdminV1TtlConfigDelta {
  /** Specifies how the TTL configuration is changing. */
  changeType?: "CHANGE_TYPE_UNSPECIFIED" | "ADD" | "REMOVE" | (string & {});
}

export const GoogleFirestoreAdminV1TtlConfigDelta: Schema.Schema<GoogleFirestoreAdminV1TtlConfigDelta> = Schema.suspend(() => Schema.Struct({
  changeType: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleFirestoreAdminV1TtlConfigDelta" }) as any as Schema.Schema<GoogleFirestoreAdminV1TtlConfigDelta>;

export interface GoogleFirestoreAdminV1FieldOperationMetadata {
  /** The time this operation started. */
  startTime?: string;
  /** The time this operation completed. Will be unset if operation still in progress. */
  endTime?: string;
  /** The field resource that this operation is acting on. For example: `projects/{project_id}/databases/{database_id}/collectionGroups/{collection_id}/fields/{field_path}` */
  field?: string;
  /** A list of IndexConfigDelta, which describe the intent of this operation. */
  indexConfigDeltas?: Array<GoogleFirestoreAdminV1IndexConfigDelta>;
  /** The state of the operation. */
  state?: "OPERATION_STATE_UNSPECIFIED" | "INITIALIZING" | "PROCESSING" | "CANCELLING" | "FINALIZING" | "SUCCESSFUL" | "FAILED" | "CANCELLED" | (string & {});
  /** The progress, in documents, of this operation. */
  progressDocuments?: GoogleFirestoreAdminV1Progress;
  /** The progress, in bytes, of this operation. */
  progressBytes?: GoogleFirestoreAdminV1Progress;
  /** Describes the deltas of TTL configuration. */
  ttlConfigDelta?: GoogleFirestoreAdminV1TtlConfigDelta;
}

export const GoogleFirestoreAdminV1FieldOperationMetadata: Schema.Schema<GoogleFirestoreAdminV1FieldOperationMetadata> = Schema.suspend(() => Schema.Struct({
  startTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
  field: Schema.optional(Schema.String),
  indexConfigDeltas: Schema.optional(Schema.Array(GoogleFirestoreAdminV1IndexConfigDelta)),
  state: Schema.optional(Schema.String),
  progressDocuments: Schema.optional(GoogleFirestoreAdminV1Progress),
  progressBytes: Schema.optional(GoogleFirestoreAdminV1Progress),
  ttlConfigDelta: Schema.optional(GoogleFirestoreAdminV1TtlConfigDelta),
})).annotate({ identifier: "GoogleFirestoreAdminV1FieldOperationMetadata" }) as any as Schema.Schema<GoogleFirestoreAdminV1FieldOperationMetadata>;

export interface GoogleFirestoreAdminV1IndexOperationMetadata {
  /** The time this operation started. */
  startTime?: string;
  /** The time this operation completed. Will be unset if operation still in progress. */
  endTime?: string;
  /** The index resource that this operation is acting on. For example: `projects/{project_id}/databases/{database_id}/collectionGroups/{collection_id}/indexes/{index_id}` */
  index?: string;
  /** The state of the operation. */
  state?: "OPERATION_STATE_UNSPECIFIED" | "INITIALIZING" | "PROCESSING" | "CANCELLING" | "FINALIZING" | "SUCCESSFUL" | "FAILED" | "CANCELLED" | (string & {});
  /** The progress, in documents, of this operation. */
  progressDocuments?: GoogleFirestoreAdminV1Progress;
  /** The progress, in bytes, of this operation. */
  progressBytes?: GoogleFirestoreAdminV1Progress;
}

export const GoogleFirestoreAdminV1IndexOperationMetadata: Schema.Schema<GoogleFirestoreAdminV1IndexOperationMetadata> = Schema.suspend(() => Schema.Struct({
  startTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
  index: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  progressDocuments: Schema.optional(GoogleFirestoreAdminV1Progress),
  progressBytes: Schema.optional(GoogleFirestoreAdminV1Progress),
})).annotate({ identifier: "GoogleFirestoreAdminV1IndexOperationMetadata" }) as any as Schema.Schema<GoogleFirestoreAdminV1IndexOperationMetadata>;

export interface GoogleFirestoreAdminV1LocationMetadata {
}

export const GoogleFirestoreAdminV1LocationMetadata: Schema.Schema<GoogleFirestoreAdminV1LocationMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleFirestoreAdminV1LocationMetadata" }) as any as Schema.Schema<GoogleFirestoreAdminV1LocationMetadata>;

export interface GoogleFirestoreAdminV1ExportDocumentsMetadata {
  /** The time this operation started. */
  startTime?: string;
  /** The time this operation completed. Will be unset if operation still in progress. */
  endTime?: string;
  /** The state of the export operation. */
  operationState?: "OPERATION_STATE_UNSPECIFIED" | "INITIALIZING" | "PROCESSING" | "CANCELLING" | "FINALIZING" | "SUCCESSFUL" | "FAILED" | "CANCELLED" | (string & {});
  /** The progress, in documents, of this operation. */
  progressDocuments?: GoogleFirestoreAdminV1Progress;
  /** The progress, in bytes, of this operation. */
  progressBytes?: GoogleFirestoreAdminV1Progress;
  /** Which collection IDs are being exported. */
  collectionIds?: Array<string>;
  /** Where the documents are being exported to. */
  outputUriPrefix?: string;
  /** Which namespace IDs are being exported. */
  namespaceIds?: Array<string>;
  /** The timestamp that corresponds to the version of the database that is being exported. If unspecified, there are no guarantees about the consistency of the documents being exported. */
  snapshotTime?: string;
}

export const GoogleFirestoreAdminV1ExportDocumentsMetadata: Schema.Schema<GoogleFirestoreAdminV1ExportDocumentsMetadata> = Schema.suspend(() => Schema.Struct({
  startTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
  operationState: Schema.optional(Schema.String),
  progressDocuments: Schema.optional(GoogleFirestoreAdminV1Progress),
  progressBytes: Schema.optional(GoogleFirestoreAdminV1Progress),
  collectionIds: Schema.optional(Schema.Array(Schema.String)),
  outputUriPrefix: Schema.optional(Schema.String),
  namespaceIds: Schema.optional(Schema.Array(Schema.String)),
  snapshotTime: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleFirestoreAdminV1ExportDocumentsMetadata" }) as any as Schema.Schema<GoogleFirestoreAdminV1ExportDocumentsMetadata>;

export interface GoogleFirestoreAdminV1BulkDeleteDocumentsMetadata {
  /** The time this operation started. */
  startTime?: string;
  /** The time this operation completed. Will be unset if operation still in progress. */
  endTime?: string;
  /** The state of the operation. */
  operationState?: "OPERATION_STATE_UNSPECIFIED" | "INITIALIZING" | "PROCESSING" | "CANCELLING" | "FINALIZING" | "SUCCESSFUL" | "FAILED" | "CANCELLED" | (string & {});
  /** The progress, in documents, of this operation. */
  progressDocuments?: GoogleFirestoreAdminV1Progress;
  /** The progress, in bytes, of this operation. */
  progressBytes?: GoogleFirestoreAdminV1Progress;
  /** The IDs of the collection groups that are being deleted. */
  collectionIds?: Array<string>;
  /** Which namespace IDs are being deleted. */
  namespaceIds?: Array<string>;
  /** The timestamp that corresponds to the version of the database that is being read to get the list of documents to delete. This time can also be used as the timestamp of PITR in case of disaster recovery (subject to PITR window limit). */
  snapshotTime?: string;
}

export const GoogleFirestoreAdminV1BulkDeleteDocumentsMetadata: Schema.Schema<GoogleFirestoreAdminV1BulkDeleteDocumentsMetadata> = Schema.suspend(() => Schema.Struct({
  startTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
  operationState: Schema.optional(Schema.String),
  progressDocuments: Schema.optional(GoogleFirestoreAdminV1Progress),
  progressBytes: Schema.optional(GoogleFirestoreAdminV1Progress),
  collectionIds: Schema.optional(Schema.Array(Schema.String)),
  namespaceIds: Schema.optional(Schema.Array(Schema.String)),
  snapshotTime: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleFirestoreAdminV1BulkDeleteDocumentsMetadata" }) as any as Schema.Schema<GoogleFirestoreAdminV1BulkDeleteDocumentsMetadata>;

export interface GoogleFirestoreAdminV1ImportDocumentsMetadata {
  /** The time this operation started. */
  startTime?: string;
  /** The time this operation completed. Will be unset if operation still in progress. */
  endTime?: string;
  /** The state of the import operation. */
  operationState?: "OPERATION_STATE_UNSPECIFIED" | "INITIALIZING" | "PROCESSING" | "CANCELLING" | "FINALIZING" | "SUCCESSFUL" | "FAILED" | "CANCELLED" | (string & {});
  /** The progress, in documents, of this operation. */
  progressDocuments?: GoogleFirestoreAdminV1Progress;
  /** The progress, in bytes, of this operation. */
  progressBytes?: GoogleFirestoreAdminV1Progress;
  /** Which collection IDs are being imported. */
  collectionIds?: Array<string>;
  /** The location of the documents being imported. */
  inputUriPrefix?: string;
  /** Which namespace IDs are being imported. */
  namespaceIds?: Array<string>;
}

export const GoogleFirestoreAdminV1ImportDocumentsMetadata: Schema.Schema<GoogleFirestoreAdminV1ImportDocumentsMetadata> = Schema.suspend(() => Schema.Struct({
  startTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
  operationState: Schema.optional(Schema.String),
  progressDocuments: Schema.optional(GoogleFirestoreAdminV1Progress),
  progressBytes: Schema.optional(GoogleFirestoreAdminV1Progress),
  collectionIds: Schema.optional(Schema.Array(Schema.String)),
  inputUriPrefix: Schema.optional(Schema.String),
  namespaceIds: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleFirestoreAdminV1ImportDocumentsMetadata" }) as any as Schema.Schema<GoogleFirestoreAdminV1ImportDocumentsMetadata>;

export interface GoogleFirestoreAdminV1ExportDocumentsResponse {
  /** Location of the output files. This can be used to begin an import into Cloud Firestore (this project or another project) after the operation completes successfully. */
  outputUriPrefix?: string;
}

export const GoogleFirestoreAdminV1ExportDocumentsResponse: Schema.Schema<GoogleFirestoreAdminV1ExportDocumentsResponse> = Schema.suspend(() => Schema.Struct({
  outputUriPrefix: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleFirestoreAdminV1ExportDocumentsResponse" }) as any as Schema.Schema<GoogleFirestoreAdminV1ExportDocumentsResponse>;

export interface GoogleFirestoreAdminV1CreateDatabaseMetadata {
}

export const GoogleFirestoreAdminV1CreateDatabaseMetadata: Schema.Schema<GoogleFirestoreAdminV1CreateDatabaseMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleFirestoreAdminV1CreateDatabaseMetadata" }) as any as Schema.Schema<GoogleFirestoreAdminV1CreateDatabaseMetadata>;

export interface GoogleFirestoreAdminV1DeleteDatabaseMetadata {
}

export const GoogleFirestoreAdminV1DeleteDatabaseMetadata: Schema.Schema<GoogleFirestoreAdminV1DeleteDatabaseMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleFirestoreAdminV1DeleteDatabaseMetadata" }) as any as Schema.Schema<GoogleFirestoreAdminV1DeleteDatabaseMetadata>;

export interface GoogleFirestoreAdminV1UpdateDatabaseMetadata {
}

export const GoogleFirestoreAdminV1UpdateDatabaseMetadata: Schema.Schema<GoogleFirestoreAdminV1UpdateDatabaseMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleFirestoreAdminV1UpdateDatabaseMetadata" }) as any as Schema.Schema<GoogleFirestoreAdminV1UpdateDatabaseMetadata>;

export interface GoogleFirestoreAdminV1RestoreDatabaseMetadata {
  /** The time the restore was started. */
  startTime?: string;
  /** The time the restore finished, unset for ongoing restores. */
  endTime?: string;
  /** The operation state of the restore. */
  operationState?: "OPERATION_STATE_UNSPECIFIED" | "INITIALIZING" | "PROCESSING" | "CANCELLING" | "FINALIZING" | "SUCCESSFUL" | "FAILED" | "CANCELLED" | (string & {});
  /** The name of the database being restored to. */
  database?: string;
  /** The name of the backup restoring from. */
  backup?: string;
  /** How far along the restore is as an estimated percentage of remaining time. */
  progressPercentage?: GoogleFirestoreAdminV1Progress;
}

export const GoogleFirestoreAdminV1RestoreDatabaseMetadata: Schema.Schema<GoogleFirestoreAdminV1RestoreDatabaseMetadata> = Schema.suspend(() => Schema.Struct({
  startTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
  operationState: Schema.optional(Schema.String),
  database: Schema.optional(Schema.String),
  backup: Schema.optional(Schema.String),
  progressPercentage: Schema.optional(GoogleFirestoreAdminV1Progress),
})).annotate({ identifier: "GoogleFirestoreAdminV1RestoreDatabaseMetadata" }) as any as Schema.Schema<GoogleFirestoreAdminV1RestoreDatabaseMetadata>;

export interface GoogleFirestoreAdminV1CloneDatabaseMetadata {
  /** The time the clone was started. */
  startTime?: string;
  /** The time the clone finished, unset for ongoing clones. */
  endTime?: string;
  /** The operation state of the clone. */
  operationState?: "OPERATION_STATE_UNSPECIFIED" | "INITIALIZING" | "PROCESSING" | "CANCELLING" | "FINALIZING" | "SUCCESSFUL" | "FAILED" | "CANCELLED" | (string & {});
  /** The name of the database being cloned to. */
  database?: string;
  /** The snapshot from which this database was cloned. */
  pitrSnapshot?: GoogleFirestoreAdminV1PitrSnapshot;
  /** How far along the clone is as an estimated percentage of remaining time. */
  progressPercentage?: GoogleFirestoreAdminV1Progress;
}

export const GoogleFirestoreAdminV1CloneDatabaseMetadata: Schema.Schema<GoogleFirestoreAdminV1CloneDatabaseMetadata> = Schema.suspend(() => Schema.Struct({
  startTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
  operationState: Schema.optional(Schema.String),
  database: Schema.optional(Schema.String),
  pitrSnapshot: Schema.optional(GoogleFirestoreAdminV1PitrSnapshot),
  progressPercentage: Schema.optional(GoogleFirestoreAdminV1Progress),
})).annotate({ identifier: "GoogleFirestoreAdminV1CloneDatabaseMetadata" }) as any as Schema.Schema<GoogleFirestoreAdminV1CloneDatabaseMetadata>;

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

/** Gets information about a backup. */
export interface GetProjectsLocationsBackupsRequest {
  /** Required. Name of the backup to fetch. Format is `projects/{project}/locations/{location}/backups/{backup}`. */
  name: string;
}

export const GetProjectsLocationsBackupsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/backups/{backupsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsBackupsRequest>;

export type GetProjectsLocationsBackupsResponse = GoogleFirestoreAdminV1Backup;
export const GetProjectsLocationsBackupsResponse = GoogleFirestoreAdminV1Backup;

export type GetProjectsLocationsBackupsError = CommonErrors;

export const getProjectsLocationsBackups: API.OperationMethod<GetProjectsLocationsBackupsRequest, GetProjectsLocationsBackupsResponse, GetProjectsLocationsBackupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsBackupsRequest,
  output: GetProjectsLocationsBackupsResponse,
  errors: [],
}));

/** Lists all the backups. */
export interface ListProjectsLocationsBackupsRequest {
  /** Required. The location to list backups from. Format is `projects/{project}/locations/{location}`. Use `{location} = '-'` to list backups from all locations for the given project. This allows listing backups from a single location or from all locations. */
  parent: string;
  /** An expression that filters the list of returned backups. A filter expression consists of a field name, a comparison operator, and a value for filtering. The value must be a string, a number, or a boolean. The comparison operator must be one of: `<`, `>`, `<=`, `>=`, `!=`, `=`, or `:`. Colon `:` is the contains operator. Filter rules are not case sensitive. The following fields in the Backup are eligible for filtering: * `database_uid` (supports `=` only) */
  filter?: string;
}

export const ListProjectsLocationsBackupsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/backups" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsBackupsRequest>;

export type ListProjectsLocationsBackupsResponse = GoogleFirestoreAdminV1ListBackupsResponse;
export const ListProjectsLocationsBackupsResponse = GoogleFirestoreAdminV1ListBackupsResponse;

export type ListProjectsLocationsBackupsError = CommonErrors;

export const listProjectsLocationsBackups: API.OperationMethod<ListProjectsLocationsBackupsRequest, ListProjectsLocationsBackupsResponse, ListProjectsLocationsBackupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListProjectsLocationsBackupsRequest,
  output: ListProjectsLocationsBackupsResponse,
  errors: [],
}));

/** Deletes a backup. */
export interface DeleteProjectsLocationsBackupsRequest {
  /** Required. Name of the backup to delete. format is `projects/{project}/locations/{location}/backups/{backup}`. */
  name: string;
}

export const DeleteProjectsLocationsBackupsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/backups/{backupsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsBackupsRequest>;

export type DeleteProjectsLocationsBackupsResponse = Empty;
export const DeleteProjectsLocationsBackupsResponse = Empty;

export type DeleteProjectsLocationsBackupsError = CommonErrors;

export const deleteProjectsLocationsBackups: API.OperationMethod<DeleteProjectsLocationsBackupsRequest, DeleteProjectsLocationsBackupsResponse, DeleteProjectsLocationsBackupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsBackupsRequest,
  output: DeleteProjectsLocationsBackupsResponse,
  errors: [],
}));

/** Exports a copy of all or a subset of documents from Google Cloud Firestore to another storage system, such as Google Cloud Storage. Recent updates to documents may not be reflected in the export. The export occurs in the background and its progress can be monitored and managed via the Operation resource that is created. The output of an export may only be used once the associated operation is done. If an export operation is cancelled before completion it may leave partial data behind in Google Cloud Storage. For more details on export behavior and output format, refer to: https://cloud.google.com/firestore/docs/manage-data/export-import */
export interface ExportDocumentsProjectsDatabasesRequest {
  /** Required. Database to export. Should be of the form: `projects/{project_id}/databases/{database_id}`. */
  name: string;
  /** Request body */
  body?: GoogleFirestoreAdminV1ExportDocumentsRequest;
}

export const ExportDocumentsProjectsDatabasesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleFirestoreAdminV1ExportDocumentsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/databases/{databasesId}:exportDocuments", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ExportDocumentsProjectsDatabasesRequest>;

export type ExportDocumentsProjectsDatabasesResponse = GoogleLongrunningOperation;
export const ExportDocumentsProjectsDatabasesResponse = GoogleLongrunningOperation;

export type ExportDocumentsProjectsDatabasesError = CommonErrors;

export const exportDocumentsProjectsDatabases: API.OperationMethod<ExportDocumentsProjectsDatabasesRequest, ExportDocumentsProjectsDatabasesResponse, ExportDocumentsProjectsDatabasesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ExportDocumentsProjectsDatabasesRequest,
  output: ExportDocumentsProjectsDatabasesResponse,
  errors: [],
}));

/** Imports documents into Google Cloud Firestore. Existing documents with the same name are overwritten. The import occurs in the background and its progress can be monitored and managed via the Operation resource that is created. If an ImportDocuments operation is cancelled, it is possible that a subset of the data has already been imported to Cloud Firestore. */
export interface ImportDocumentsProjectsDatabasesRequest {
  /** Required. Database to import into. Should be of the form: `projects/{project_id}/databases/{database_id}`. */
  name: string;
  /** Request body */
  body?: GoogleFirestoreAdminV1ImportDocumentsRequest;
}

export const ImportDocumentsProjectsDatabasesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleFirestoreAdminV1ImportDocumentsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/databases/{databasesId}:importDocuments", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ImportDocumentsProjectsDatabasesRequest>;

export type ImportDocumentsProjectsDatabasesResponse = GoogleLongrunningOperation;
export const ImportDocumentsProjectsDatabasesResponse = GoogleLongrunningOperation;

export type ImportDocumentsProjectsDatabasesError = CommonErrors;

export const importDocumentsProjectsDatabases: API.OperationMethod<ImportDocumentsProjectsDatabasesRequest, ImportDocumentsProjectsDatabasesResponse, ImportDocumentsProjectsDatabasesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ImportDocumentsProjectsDatabasesRequest,
  output: ImportDocumentsProjectsDatabasesResponse,
  errors: [],
}));

/** Bulk deletes a subset of documents from Google Cloud Firestore. Documents created or updated after the underlying system starts to process the request will not be deleted. The bulk delete occurs in the background and its progress can be monitored and managed via the Operation resource that is created. For more details on bulk delete behavior, refer to: https://cloud.google.com/firestore/docs/manage-data/bulk-delete */
export interface BulkDeleteDocumentsProjectsDatabasesRequest {
  /** Required. Database to operate. Should be of the form: `projects/{project_id}/databases/{database_id}`. */
  name: string;
  /** Request body */
  body?: GoogleFirestoreAdminV1BulkDeleteDocumentsRequest;
}

export const BulkDeleteDocumentsProjectsDatabasesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleFirestoreAdminV1BulkDeleteDocumentsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/databases/{databasesId}:bulkDeleteDocuments", hasBody: true }),
  svc,
) as unknown as Schema.Schema<BulkDeleteDocumentsProjectsDatabasesRequest>;

export type BulkDeleteDocumentsProjectsDatabasesResponse = GoogleLongrunningOperation;
export const BulkDeleteDocumentsProjectsDatabasesResponse = GoogleLongrunningOperation;

export type BulkDeleteDocumentsProjectsDatabasesError = CommonErrors;

export const bulkDeleteDocumentsProjectsDatabases: API.OperationMethod<BulkDeleteDocumentsProjectsDatabasesRequest, BulkDeleteDocumentsProjectsDatabasesResponse, BulkDeleteDocumentsProjectsDatabasesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: BulkDeleteDocumentsProjectsDatabasesRequest,
  output: BulkDeleteDocumentsProjectsDatabasesResponse,
  errors: [],
}));

/** Create a database. */
export interface CreateProjectsDatabasesRequest {
  /** Required. A parent name of the form `projects/{project_id}` */
  parent: string;
  /** Required. The ID to use for the database, which will become the final component of the database's resource name. This value should be 4-63 characters. Valid characters are /a-z-/ with first character a letter and the last a letter or a number. Must not be UUID-like /[0-9a-f]{8}(-[0-9a-f]{4}){3}-[0-9a-f]{12}/. "(default)" database ID is also valid if the database is Standard edition. */
  databaseId?: string;
  /** Request body */
  body?: GoogleFirestoreAdminV1Database;
}

export const CreateProjectsDatabasesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  databaseId: Schema.optional(Schema.String).pipe(T.HttpQuery("databaseId")),
  body: Schema.optional(GoogleFirestoreAdminV1Database).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/databases", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsDatabasesRequest>;

export type CreateProjectsDatabasesResponse = GoogleLongrunningOperation;
export const CreateProjectsDatabasesResponse = GoogleLongrunningOperation;

export type CreateProjectsDatabasesError = CommonErrors;

export const createProjectsDatabases: API.OperationMethod<CreateProjectsDatabasesRequest, CreateProjectsDatabasesResponse, CreateProjectsDatabasesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsDatabasesRequest,
  output: CreateProjectsDatabasesResponse,
  errors: [],
}));

/** Gets information about a database. */
export interface GetProjectsDatabasesRequest {
  /** Required. A name of the form `projects/{project_id}/databases/{database_id}` */
  name: string;
}

export const GetProjectsDatabasesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/databases/{databasesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsDatabasesRequest>;

export type GetProjectsDatabasesResponse = GoogleFirestoreAdminV1Database;
export const GetProjectsDatabasesResponse = GoogleFirestoreAdminV1Database;

export type GetProjectsDatabasesError = CommonErrors;

export const getProjectsDatabases: API.OperationMethod<GetProjectsDatabasesRequest, GetProjectsDatabasesResponse, GetProjectsDatabasesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsDatabasesRequest,
  output: GetProjectsDatabasesResponse,
  errors: [],
}));

/** List all the databases in the project. */
export interface ListProjectsDatabasesRequest {
  /** Required. A parent name of the form `projects/{project_id}` */
  parent: string;
  /** If true, also returns deleted resources. */
  showDeleted?: boolean;
}

export const ListProjectsDatabasesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  showDeleted: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("showDeleted")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/databases" }),
  svc,
) as unknown as Schema.Schema<ListProjectsDatabasesRequest>;

export type ListProjectsDatabasesResponse = GoogleFirestoreAdminV1ListDatabasesResponse;
export const ListProjectsDatabasesResponse = GoogleFirestoreAdminV1ListDatabasesResponse;

export type ListProjectsDatabasesError = CommonErrors;

export const listProjectsDatabases: API.OperationMethod<ListProjectsDatabasesRequest, ListProjectsDatabasesResponse, ListProjectsDatabasesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListProjectsDatabasesRequest,
  output: ListProjectsDatabasesResponse,
  errors: [],
}));

/** Updates a database. */
export interface PatchProjectsDatabasesRequest {
  /** The resource name of the Database. Format: `projects/{project}/databases/{database}` */
  name: string;
  /** The list of fields to be updated. */
  updateMask?: string;
  /** Request body */
  body?: GoogleFirestoreAdminV1Database;
}

export const PatchProjectsDatabasesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleFirestoreAdminV1Database).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/databases/{databasesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsDatabasesRequest>;

export type PatchProjectsDatabasesResponse = GoogleLongrunningOperation;
export const PatchProjectsDatabasesResponse = GoogleLongrunningOperation;

export type PatchProjectsDatabasesError = CommonErrors;

export const patchProjectsDatabases: API.OperationMethod<PatchProjectsDatabasesRequest, PatchProjectsDatabasesResponse, PatchProjectsDatabasesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsDatabasesRequest,
  output: PatchProjectsDatabasesResponse,
  errors: [],
}));

/** Deletes a database. */
export interface DeleteProjectsDatabasesRequest {
  /** Required. A name of the form `projects/{project_id}/databases/{database_id}` */
  name: string;
  /** The current etag of the Database. If an etag is provided and does not match the current etag of the database, deletion will be blocked and a FAILED_PRECONDITION error will be returned. */
  etag?: string;
}

export const DeleteProjectsDatabasesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  etag: Schema.optional(Schema.String).pipe(T.HttpQuery("etag")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/databases/{databasesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsDatabasesRequest>;

export type DeleteProjectsDatabasesResponse = GoogleLongrunningOperation;
export const DeleteProjectsDatabasesResponse = GoogleLongrunningOperation;

export type DeleteProjectsDatabasesError = CommonErrors;

export const deleteProjectsDatabases: API.OperationMethod<DeleteProjectsDatabasesRequest, DeleteProjectsDatabasesResponse, DeleteProjectsDatabasesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsDatabasesRequest,
  output: DeleteProjectsDatabasesResponse,
  errors: [],
}));

/** Creates a new database by restoring from an existing backup. The new database must be in the same cloud region or multi-region location as the existing backup. This behaves similar to FirestoreAdmin.CreateDatabase except instead of creating a new empty database, a new database is created with the database type, index configuration, and documents from an existing backup. The long-running operation can be used to track the progress of the restore, with the Operation's metadata field type being the RestoreDatabaseMetadata. The response type is the Database if the restore was successful. The new database is not readable or writeable until the LRO has completed. */
export interface RestoreProjectsDatabasesRequest {
  /** Required. The project to restore the database in. Format is `projects/{project_id}`. */
  parent: string;
  /** Request body */
  body?: GoogleFirestoreAdminV1RestoreDatabaseRequest;
}

export const RestoreProjectsDatabasesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleFirestoreAdminV1RestoreDatabaseRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/databases:restore", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RestoreProjectsDatabasesRequest>;

export type RestoreProjectsDatabasesResponse = GoogleLongrunningOperation;
export const RestoreProjectsDatabasesResponse = GoogleLongrunningOperation;

export type RestoreProjectsDatabasesError = CommonErrors;

export const restoreProjectsDatabases: API.OperationMethod<RestoreProjectsDatabasesRequest, RestoreProjectsDatabasesResponse, RestoreProjectsDatabasesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RestoreProjectsDatabasesRequest,
  output: RestoreProjectsDatabasesResponse,
  errors: [],
}));

/** Creates a new database by cloning an existing one. The new database must be in the same cloud region or multi-region location as the existing database. This behaves similar to FirestoreAdmin.CreateDatabase except instead of creating a new empty database, a new database is created with the database type, index configuration, and documents from an existing database. The long-running operation can be used to track the progress of the clone, with the Operation's metadata field type being the CloneDatabaseMetadata. The response type is the Database if the clone was successful. The new database is not readable or writeable until the LRO has completed. */
export interface CloneProjectsDatabasesRequest {
  /** Required. The project to clone the database in. Format is `projects/{project_id}`. */
  parent: string;
  /** Request body */
  body?: GoogleFirestoreAdminV1CloneDatabaseRequest;
}

export const CloneProjectsDatabasesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleFirestoreAdminV1CloneDatabaseRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/databases:clone", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CloneProjectsDatabasesRequest>;

export type CloneProjectsDatabasesResponse = GoogleLongrunningOperation;
export const CloneProjectsDatabasesResponse = GoogleLongrunningOperation;

export type CloneProjectsDatabasesError = CommonErrors;

export const cloneProjectsDatabases: API.OperationMethod<CloneProjectsDatabasesRequest, CloneProjectsDatabasesResponse, CloneProjectsDatabasesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CloneProjectsDatabasesRequest,
  output: CloneProjectsDatabasesResponse,
  errors: [],
}));

/** Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns `UNIMPLEMENTED`. */
export interface ListProjectsDatabasesOperationsRequest {
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

export const ListProjectsDatabasesOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  returnPartialSuccess: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("returnPartialSuccess")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/databases/{databasesId}/operations" }),
  svc,
) as unknown as Schema.Schema<ListProjectsDatabasesOperationsRequest>;

export type ListProjectsDatabasesOperationsResponse = GoogleLongrunningListOperationsResponse;
export const ListProjectsDatabasesOperationsResponse = GoogleLongrunningListOperationsResponse;

export type ListProjectsDatabasesOperationsError = CommonErrors;

export const listProjectsDatabasesOperations = API.makePaginated(() => ({
  input: ListProjectsDatabasesOperationsRequest,
  output: ListProjectsDatabasesOperationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service. */
export interface GetProjectsDatabasesOperationsRequest {
  /** The name of the operation resource. */
  name: string;
}

export const GetProjectsDatabasesOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/databases/{databasesId}/operations/{operationsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsDatabasesOperationsRequest>;

export type GetProjectsDatabasesOperationsResponse = GoogleLongrunningOperation;
export const GetProjectsDatabasesOperationsResponse = GoogleLongrunningOperation;

export type GetProjectsDatabasesOperationsError = CommonErrors;

export const getProjectsDatabasesOperations: API.OperationMethod<GetProjectsDatabasesOperationsRequest, GetProjectsDatabasesOperationsResponse, GetProjectsDatabasesOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsDatabasesOperationsRequest,
  output: GetProjectsDatabasesOperationsResponse,
  errors: [],
}));

/** Deletes a long-running operation. This method indicates that the client is no longer interested in the operation result. It does not cancel the operation. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. */
export interface DeleteProjectsDatabasesOperationsRequest {
  /** The name of the operation resource to be deleted. */
  name: string;
}

export const DeleteProjectsDatabasesOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/databases/{databasesId}/operations/{operationsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsDatabasesOperationsRequest>;

export type DeleteProjectsDatabasesOperationsResponse = Empty;
export const DeleteProjectsDatabasesOperationsResponse = Empty;

export type DeleteProjectsDatabasesOperationsError = CommonErrors;

export const deleteProjectsDatabasesOperations: API.OperationMethod<DeleteProjectsDatabasesOperationsRequest, DeleteProjectsDatabasesOperationsResponse, DeleteProjectsDatabasesOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsDatabasesOperationsRequest,
  output: DeleteProjectsDatabasesOperationsResponse,
  errors: [],
}));

/** Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`. */
export interface CancelProjectsDatabasesOperationsRequest {
  /** The name of the operation resource to be cancelled. */
  name: string;
  /** Request body */
  body?: GoogleLongrunningCancelOperationRequest;
}

export const CancelProjectsDatabasesOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleLongrunningCancelOperationRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/databases/{databasesId}/operations/{operationsId}:cancel", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CancelProjectsDatabasesOperationsRequest>;

export type CancelProjectsDatabasesOperationsResponse = Empty;
export const CancelProjectsDatabasesOperationsResponse = Empty;

export type CancelProjectsDatabasesOperationsError = CommonErrors;

export const cancelProjectsDatabasesOperations: API.OperationMethod<CancelProjectsDatabasesOperationsRequest, CancelProjectsDatabasesOperationsResponse, CancelProjectsDatabasesOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CancelProjectsDatabasesOperationsRequest,
  output: CancelProjectsDatabasesOperationsResponse,
  errors: [],
}));

/** Creates a composite index. This returns a google.longrunning.Operation which may be used to track the status of the creation. The metadata for the operation will be the type IndexOperationMetadata. */
export interface CreateProjectsDatabasesCollectionGroupsIndexesRequest {
  /** Required. A parent name of the form `projects/{project_id}/databases/{database_id}/collectionGroups/{collection_id}` */
  parent: string;
  /** Request body */
  body?: GoogleFirestoreAdminV1Index;
}

export const CreateProjectsDatabasesCollectionGroupsIndexesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleFirestoreAdminV1Index).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/databases/{databasesId}/collectionGroups/{collectionGroupsId}/indexes", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsDatabasesCollectionGroupsIndexesRequest>;

export type CreateProjectsDatabasesCollectionGroupsIndexesResponse = GoogleLongrunningOperation;
export const CreateProjectsDatabasesCollectionGroupsIndexesResponse = GoogleLongrunningOperation;

export type CreateProjectsDatabasesCollectionGroupsIndexesError = CommonErrors;

export const createProjectsDatabasesCollectionGroupsIndexes: API.OperationMethod<CreateProjectsDatabasesCollectionGroupsIndexesRequest, CreateProjectsDatabasesCollectionGroupsIndexesResponse, CreateProjectsDatabasesCollectionGroupsIndexesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsDatabasesCollectionGroupsIndexesRequest,
  output: CreateProjectsDatabasesCollectionGroupsIndexesResponse,
  errors: [],
}));

/** Lists composite indexes. */
export interface ListProjectsDatabasesCollectionGroupsIndexesRequest {
  /** Required. A parent name of the form `projects/{project_id}/databases/{database_id}/collectionGroups/{collection_id}` */
  parent: string;
  /** The filter to apply to list results. */
  filter?: string;
  /** The number of results to return. */
  pageSize?: number;
  /** A page token, returned from a previous call to FirestoreAdmin.ListIndexes, that may be used to get the next page of results. */
  pageToken?: string;
}

export const ListProjectsDatabasesCollectionGroupsIndexesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/databases/{databasesId}/collectionGroups/{collectionGroupsId}/indexes" }),
  svc,
) as unknown as Schema.Schema<ListProjectsDatabasesCollectionGroupsIndexesRequest>;

export type ListProjectsDatabasesCollectionGroupsIndexesResponse = GoogleFirestoreAdminV1ListIndexesResponse;
export const ListProjectsDatabasesCollectionGroupsIndexesResponse = GoogleFirestoreAdminV1ListIndexesResponse;

export type ListProjectsDatabasesCollectionGroupsIndexesError = CommonErrors;

export const listProjectsDatabasesCollectionGroupsIndexes = API.makePaginated(() => ({
  input: ListProjectsDatabasesCollectionGroupsIndexesRequest,
  output: ListProjectsDatabasesCollectionGroupsIndexesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets a composite index. */
export interface GetProjectsDatabasesCollectionGroupsIndexesRequest {
  /** Required. A name of the form `projects/{project_id}/databases/{database_id}/collectionGroups/{collection_id}/indexes/{index_id}` */
  name: string;
}

export const GetProjectsDatabasesCollectionGroupsIndexesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/databases/{databasesId}/collectionGroups/{collectionGroupsId}/indexes/{indexesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsDatabasesCollectionGroupsIndexesRequest>;

export type GetProjectsDatabasesCollectionGroupsIndexesResponse = GoogleFirestoreAdminV1Index;
export const GetProjectsDatabasesCollectionGroupsIndexesResponse = GoogleFirestoreAdminV1Index;

export type GetProjectsDatabasesCollectionGroupsIndexesError = CommonErrors;

export const getProjectsDatabasesCollectionGroupsIndexes: API.OperationMethod<GetProjectsDatabasesCollectionGroupsIndexesRequest, GetProjectsDatabasesCollectionGroupsIndexesResponse, GetProjectsDatabasesCollectionGroupsIndexesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsDatabasesCollectionGroupsIndexesRequest,
  output: GetProjectsDatabasesCollectionGroupsIndexesResponse,
  errors: [],
}));

/** Deletes a composite index. */
export interface DeleteProjectsDatabasesCollectionGroupsIndexesRequest {
  /** Required. A name of the form `projects/{project_id}/databases/{database_id}/collectionGroups/{collection_id}/indexes/{index_id}` */
  name: string;
}

export const DeleteProjectsDatabasesCollectionGroupsIndexesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/databases/{databasesId}/collectionGroups/{collectionGroupsId}/indexes/{indexesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsDatabasesCollectionGroupsIndexesRequest>;

export type DeleteProjectsDatabasesCollectionGroupsIndexesResponse = Empty;
export const DeleteProjectsDatabasesCollectionGroupsIndexesResponse = Empty;

export type DeleteProjectsDatabasesCollectionGroupsIndexesError = CommonErrors;

export const deleteProjectsDatabasesCollectionGroupsIndexes: API.OperationMethod<DeleteProjectsDatabasesCollectionGroupsIndexesRequest, DeleteProjectsDatabasesCollectionGroupsIndexesResponse, DeleteProjectsDatabasesCollectionGroupsIndexesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsDatabasesCollectionGroupsIndexesRequest,
  output: DeleteProjectsDatabasesCollectionGroupsIndexesResponse,
  errors: [],
}));

/** Gets the metadata and configuration for a Field. */
export interface GetProjectsDatabasesCollectionGroupsFieldsRequest {
  /** Required. A name of the form `projects/{project_id}/databases/{database_id}/collectionGroups/{collection_id}/fields/{field_id}` */
  name: string;
}

export const GetProjectsDatabasesCollectionGroupsFieldsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/databases/{databasesId}/collectionGroups/{collectionGroupsId}/fields/{fieldsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsDatabasesCollectionGroupsFieldsRequest>;

export type GetProjectsDatabasesCollectionGroupsFieldsResponse = GoogleFirestoreAdminV1Field;
export const GetProjectsDatabasesCollectionGroupsFieldsResponse = GoogleFirestoreAdminV1Field;

export type GetProjectsDatabasesCollectionGroupsFieldsError = CommonErrors;

export const getProjectsDatabasesCollectionGroupsFields: API.OperationMethod<GetProjectsDatabasesCollectionGroupsFieldsRequest, GetProjectsDatabasesCollectionGroupsFieldsResponse, GetProjectsDatabasesCollectionGroupsFieldsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsDatabasesCollectionGroupsFieldsRequest,
  output: GetProjectsDatabasesCollectionGroupsFieldsResponse,
  errors: [],
}));

/** Updates a field configuration. Currently, field updates apply only to single field index configuration. However, calls to FirestoreAdmin.UpdateField should provide a field mask to avoid changing any configuration that the caller isn't aware of. The field mask should be specified as: `{ paths: "index_config" }`. This call returns a google.longrunning.Operation which may be used to track the status of the field update. The metadata for the operation will be the type FieldOperationMetadata. To configure the default field settings for the database, use the special `Field` with resource name: `projects/{project_id}/databases/{database_id}/collectionGroups/__default__/fields/*`. */
export interface PatchProjectsDatabasesCollectionGroupsFieldsRequest {
  /** Required. A field name of the form: `projects/{project_id}/databases/{database_id}/collectionGroups/{collection_id}/fields/{field_path}` A field path can be a simple field name, e.g. `address` or a path to fields within `map_value` , e.g. `address.city`, or a special field path. The only valid special field is `*`, which represents any field. Field paths can be quoted using `` ` `` (backtick). The only character that must be escaped within a quoted field path is the backtick character itself, escaped using a backslash. Special characters in field paths that must be quoted include: `*`, `.`, `` ` `` (backtick), `[`, `]`, as well as any ascii symbolic characters. Examples: `` `address.city` `` represents a field named `address.city`, not the map key `city` in the field `address`. `` `*` `` represents a field named `*`, not any field. A special `Field` contains the default indexing settings for all fields. This field's resource name is: `projects/{project_id}/databases/{database_id}/collectionGroups/__default__/fields/*` Indexes defined on this `Field` will be applied to all fields which do not have their own `Field` index configuration. */
  name: string;
  /** A mask, relative to the field. If specified, only configuration specified by this field_mask will be updated in the field. */
  updateMask?: string;
  /** Request body */
  body?: GoogleFirestoreAdminV1Field;
}

export const PatchProjectsDatabasesCollectionGroupsFieldsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleFirestoreAdminV1Field).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/databases/{databasesId}/collectionGroups/{collectionGroupsId}/fields/{fieldsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsDatabasesCollectionGroupsFieldsRequest>;

export type PatchProjectsDatabasesCollectionGroupsFieldsResponse = GoogleLongrunningOperation;
export const PatchProjectsDatabasesCollectionGroupsFieldsResponse = GoogleLongrunningOperation;

export type PatchProjectsDatabasesCollectionGroupsFieldsError = CommonErrors;

export const patchProjectsDatabasesCollectionGroupsFields: API.OperationMethod<PatchProjectsDatabasesCollectionGroupsFieldsRequest, PatchProjectsDatabasesCollectionGroupsFieldsResponse, PatchProjectsDatabasesCollectionGroupsFieldsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsDatabasesCollectionGroupsFieldsRequest,
  output: PatchProjectsDatabasesCollectionGroupsFieldsResponse,
  errors: [],
}));

/** Lists the field configuration and metadata for this database. Currently, FirestoreAdmin.ListFields only supports listing fields that have been explicitly overridden. To issue this query, call FirestoreAdmin.ListFields with the filter set to `indexConfig.usesAncestorConfig:false` or `ttlConfig:*`. */
export interface ListProjectsDatabasesCollectionGroupsFieldsRequest {
  /** Required. A parent name of the form `projects/{project_id}/databases/{database_id}/collectionGroups/{collection_id}` */
  parent: string;
  /** The filter to apply to list results. Currently, FirestoreAdmin.ListFields only supports listing fields that have been explicitly overridden. To issue this query, call FirestoreAdmin.ListFields with a filter that includes `indexConfig.usesAncestorConfig:false` or `ttlConfig:*`. */
  filter?: string;
  /** The number of results to return. */
  pageSize?: number;
  /** A page token, returned from a previous call to FirestoreAdmin.ListFields, that may be used to get the next page of results. */
  pageToken?: string;
}

export const ListProjectsDatabasesCollectionGroupsFieldsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/databases/{databasesId}/collectionGroups/{collectionGroupsId}/fields" }),
  svc,
) as unknown as Schema.Schema<ListProjectsDatabasesCollectionGroupsFieldsRequest>;

export type ListProjectsDatabasesCollectionGroupsFieldsResponse = GoogleFirestoreAdminV1ListFieldsResponse;
export const ListProjectsDatabasesCollectionGroupsFieldsResponse = GoogleFirestoreAdminV1ListFieldsResponse;

export type ListProjectsDatabasesCollectionGroupsFieldsError = CommonErrors;

export const listProjectsDatabasesCollectionGroupsFields = API.makePaginated(() => ({
  input: ListProjectsDatabasesCollectionGroupsFieldsRequest,
  output: ListProjectsDatabasesCollectionGroupsFieldsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Create a user creds. */
export interface CreateProjectsDatabasesUserCredsRequest {
  /** Required. A parent name of the form `projects/{project_id}/databases/{database_id}` */
  parent: string;
  /** Required. The ID to use for the user creds, which will become the final component of the user creds's resource name. This value should be 4-63 characters. Valid characters are /a-z-/ with first character a letter and the last a letter or a number. Must not be UUID-like /[0-9a-f]{8}(-[0-9a-f]{4}){3}-[0-9a-f]{12}/. */
  userCredsId?: string;
  /** Request body */
  body?: GoogleFirestoreAdminV1UserCreds;
}

export const CreateProjectsDatabasesUserCredsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  userCredsId: Schema.optional(Schema.String).pipe(T.HttpQuery("userCredsId")),
  body: Schema.optional(GoogleFirestoreAdminV1UserCreds).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/databases/{databasesId}/userCreds", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsDatabasesUserCredsRequest>;

export type CreateProjectsDatabasesUserCredsResponse = GoogleFirestoreAdminV1UserCreds;
export const CreateProjectsDatabasesUserCredsResponse = GoogleFirestoreAdminV1UserCreds;

export type CreateProjectsDatabasesUserCredsError = CommonErrors;

export const createProjectsDatabasesUserCreds: API.OperationMethod<CreateProjectsDatabasesUserCredsRequest, CreateProjectsDatabasesUserCredsResponse, CreateProjectsDatabasesUserCredsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsDatabasesUserCredsRequest,
  output: CreateProjectsDatabasesUserCredsResponse,
  errors: [],
}));

/** Gets a user creds resource. Note that the returned resource does not contain the secret value itself. */
export interface GetProjectsDatabasesUserCredsRequest {
  /** Required. A name of the form `projects/{project_id}/databases/{database_id}/userCreds/{user_creds_id}` */
  name: string;
}

export const GetProjectsDatabasesUserCredsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/databases/{databasesId}/userCreds/{userCredsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsDatabasesUserCredsRequest>;

export type GetProjectsDatabasesUserCredsResponse = GoogleFirestoreAdminV1UserCreds;
export const GetProjectsDatabasesUserCredsResponse = GoogleFirestoreAdminV1UserCreds;

export type GetProjectsDatabasesUserCredsError = CommonErrors;

export const getProjectsDatabasesUserCreds: API.OperationMethod<GetProjectsDatabasesUserCredsRequest, GetProjectsDatabasesUserCredsResponse, GetProjectsDatabasesUserCredsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsDatabasesUserCredsRequest,
  output: GetProjectsDatabasesUserCredsResponse,
  errors: [],
}));

/** List all user creds in the database. Note that the returned resource does not contain the secret value itself. */
export interface ListProjectsDatabasesUserCredsRequest {
  /** Required. A parent database name of the form `projects/{project_id}/databases/{database_id}` */
  parent: string;
}

export const ListProjectsDatabasesUserCredsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/databases/{databasesId}/userCreds" }),
  svc,
) as unknown as Schema.Schema<ListProjectsDatabasesUserCredsRequest>;

export type ListProjectsDatabasesUserCredsResponse = GoogleFirestoreAdminV1ListUserCredsResponse;
export const ListProjectsDatabasesUserCredsResponse = GoogleFirestoreAdminV1ListUserCredsResponse;

export type ListProjectsDatabasesUserCredsError = CommonErrors;

export const listProjectsDatabasesUserCreds: API.OperationMethod<ListProjectsDatabasesUserCredsRequest, ListProjectsDatabasesUserCredsResponse, ListProjectsDatabasesUserCredsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListProjectsDatabasesUserCredsRequest,
  output: ListProjectsDatabasesUserCredsResponse,
  errors: [],
}));

/** Enables a user creds. No-op if the user creds are already enabled. */
export interface EnableProjectsDatabasesUserCredsRequest {
  /** Required. A name of the form `projects/{project_id}/databases/{database_id}/userCreds/{user_creds_id}` */
  name: string;
  /** Request body */
  body?: GoogleFirestoreAdminV1EnableUserCredsRequest;
}

export const EnableProjectsDatabasesUserCredsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleFirestoreAdminV1EnableUserCredsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/databases/{databasesId}/userCreds/{userCredsId}:enable", hasBody: true }),
  svc,
) as unknown as Schema.Schema<EnableProjectsDatabasesUserCredsRequest>;

export type EnableProjectsDatabasesUserCredsResponse = GoogleFirestoreAdminV1UserCreds;
export const EnableProjectsDatabasesUserCredsResponse = GoogleFirestoreAdminV1UserCreds;

export type EnableProjectsDatabasesUserCredsError = CommonErrors;

export const enableProjectsDatabasesUserCreds: API.OperationMethod<EnableProjectsDatabasesUserCredsRequest, EnableProjectsDatabasesUserCredsResponse, EnableProjectsDatabasesUserCredsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: EnableProjectsDatabasesUserCredsRequest,
  output: EnableProjectsDatabasesUserCredsResponse,
  errors: [],
}));

/** Disables a user creds. No-op if the user creds are already disabled. */
export interface DisableProjectsDatabasesUserCredsRequest {
  /** Required. A name of the form `projects/{project_id}/databases/{database_id}/userCreds/{user_creds_id}` */
  name: string;
  /** Request body */
  body?: GoogleFirestoreAdminV1DisableUserCredsRequest;
}

export const DisableProjectsDatabasesUserCredsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleFirestoreAdminV1DisableUserCredsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/databases/{databasesId}/userCreds/{userCredsId}:disable", hasBody: true }),
  svc,
) as unknown as Schema.Schema<DisableProjectsDatabasesUserCredsRequest>;

export type DisableProjectsDatabasesUserCredsResponse = GoogleFirestoreAdminV1UserCreds;
export const DisableProjectsDatabasesUserCredsResponse = GoogleFirestoreAdminV1UserCreds;

export type DisableProjectsDatabasesUserCredsError = CommonErrors;

export const disableProjectsDatabasesUserCreds: API.OperationMethod<DisableProjectsDatabasesUserCredsRequest, DisableProjectsDatabasesUserCredsResponse, DisableProjectsDatabasesUserCredsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DisableProjectsDatabasesUserCredsRequest,
  output: DisableProjectsDatabasesUserCredsResponse,
  errors: [],
}));

/** Resets the password of a user creds. */
export interface ResetPasswordProjectsDatabasesUserCredsRequest {
  /** Required. A name of the form `projects/{project_id}/databases/{database_id}/userCreds/{user_creds_id}` */
  name: string;
  /** Request body */
  body?: GoogleFirestoreAdminV1ResetUserPasswordRequest;
}

export const ResetPasswordProjectsDatabasesUserCredsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleFirestoreAdminV1ResetUserPasswordRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/databases/{databasesId}/userCreds/{userCredsId}:resetPassword", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ResetPasswordProjectsDatabasesUserCredsRequest>;

export type ResetPasswordProjectsDatabasesUserCredsResponse = GoogleFirestoreAdminV1UserCreds;
export const ResetPasswordProjectsDatabasesUserCredsResponse = GoogleFirestoreAdminV1UserCreds;

export type ResetPasswordProjectsDatabasesUserCredsError = CommonErrors;

export const resetPasswordProjectsDatabasesUserCreds: API.OperationMethod<ResetPasswordProjectsDatabasesUserCredsRequest, ResetPasswordProjectsDatabasesUserCredsResponse, ResetPasswordProjectsDatabasesUserCredsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ResetPasswordProjectsDatabasesUserCredsRequest,
  output: ResetPasswordProjectsDatabasesUserCredsResponse,
  errors: [],
}));

/** Deletes a user creds. */
export interface DeleteProjectsDatabasesUserCredsRequest {
  /** Required. A name of the form `projects/{project_id}/databases/{database_id}/userCreds/{user_creds_id}` */
  name: string;
}

export const DeleteProjectsDatabasesUserCredsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/databases/{databasesId}/userCreds/{userCredsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsDatabasesUserCredsRequest>;

export type DeleteProjectsDatabasesUserCredsResponse = Empty;
export const DeleteProjectsDatabasesUserCredsResponse = Empty;

export type DeleteProjectsDatabasesUserCredsError = CommonErrors;

export const deleteProjectsDatabasesUserCreds: API.OperationMethod<DeleteProjectsDatabasesUserCredsRequest, DeleteProjectsDatabasesUserCredsResponse, DeleteProjectsDatabasesUserCredsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsDatabasesUserCredsRequest,
  output: DeleteProjectsDatabasesUserCredsResponse,
  errors: [],
}));

/** Creates a backup schedule on a database. At most two backup schedules can be configured on a database, one daily backup schedule and one weekly backup schedule. */
export interface CreateProjectsDatabasesBackupSchedulesRequest {
  /** Required. The parent database. Format `projects/{project}/databases/{database}` */
  parent: string;
  /** Request body */
  body?: GoogleFirestoreAdminV1BackupSchedule;
}

export const CreateProjectsDatabasesBackupSchedulesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleFirestoreAdminV1BackupSchedule).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/databases/{databasesId}/backupSchedules", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsDatabasesBackupSchedulesRequest>;

export type CreateProjectsDatabasesBackupSchedulesResponse = GoogleFirestoreAdminV1BackupSchedule;
export const CreateProjectsDatabasesBackupSchedulesResponse = GoogleFirestoreAdminV1BackupSchedule;

export type CreateProjectsDatabasesBackupSchedulesError = CommonErrors;

export const createProjectsDatabasesBackupSchedules: API.OperationMethod<CreateProjectsDatabasesBackupSchedulesRequest, CreateProjectsDatabasesBackupSchedulesResponse, CreateProjectsDatabasesBackupSchedulesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsDatabasesBackupSchedulesRequest,
  output: CreateProjectsDatabasesBackupSchedulesResponse,
  errors: [],
}));

/** Gets information about a backup schedule. */
export interface GetProjectsDatabasesBackupSchedulesRequest {
  /** Required. The name of the backup schedule. Format `projects/{project}/databases/{database}/backupSchedules/{backup_schedule}` */
  name: string;
}

export const GetProjectsDatabasesBackupSchedulesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/databases/{databasesId}/backupSchedules/{backupSchedulesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsDatabasesBackupSchedulesRequest>;

export type GetProjectsDatabasesBackupSchedulesResponse = GoogleFirestoreAdminV1BackupSchedule;
export const GetProjectsDatabasesBackupSchedulesResponse = GoogleFirestoreAdminV1BackupSchedule;

export type GetProjectsDatabasesBackupSchedulesError = CommonErrors;

export const getProjectsDatabasesBackupSchedules: API.OperationMethod<GetProjectsDatabasesBackupSchedulesRequest, GetProjectsDatabasesBackupSchedulesResponse, GetProjectsDatabasesBackupSchedulesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsDatabasesBackupSchedulesRequest,
  output: GetProjectsDatabasesBackupSchedulesResponse,
  errors: [],
}));

/** List backup schedules. */
export interface ListProjectsDatabasesBackupSchedulesRequest {
  /** Required. The parent database. Format is `projects/{project}/databases/{database}`. */
  parent: string;
}

export const ListProjectsDatabasesBackupSchedulesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/databases/{databasesId}/backupSchedules" }),
  svc,
) as unknown as Schema.Schema<ListProjectsDatabasesBackupSchedulesRequest>;

export type ListProjectsDatabasesBackupSchedulesResponse = GoogleFirestoreAdminV1ListBackupSchedulesResponse;
export const ListProjectsDatabasesBackupSchedulesResponse = GoogleFirestoreAdminV1ListBackupSchedulesResponse;

export type ListProjectsDatabasesBackupSchedulesError = CommonErrors;

export const listProjectsDatabasesBackupSchedules: API.OperationMethod<ListProjectsDatabasesBackupSchedulesRequest, ListProjectsDatabasesBackupSchedulesResponse, ListProjectsDatabasesBackupSchedulesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListProjectsDatabasesBackupSchedulesRequest,
  output: ListProjectsDatabasesBackupSchedulesResponse,
  errors: [],
}));

/** Updates a backup schedule. */
export interface PatchProjectsDatabasesBackupSchedulesRequest {
  /** Output only. The unique backup schedule identifier across all locations and databases for the given project. This will be auto-assigned. Format is `projects/{project}/databases/{database}/backupSchedules/{backup_schedule}` */
  name: string;
  /** The list of fields to be updated. */
  updateMask?: string;
  /** Request body */
  body?: GoogleFirestoreAdminV1BackupSchedule;
}

export const PatchProjectsDatabasesBackupSchedulesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleFirestoreAdminV1BackupSchedule).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/databases/{databasesId}/backupSchedules/{backupSchedulesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsDatabasesBackupSchedulesRequest>;

export type PatchProjectsDatabasesBackupSchedulesResponse = GoogleFirestoreAdminV1BackupSchedule;
export const PatchProjectsDatabasesBackupSchedulesResponse = GoogleFirestoreAdminV1BackupSchedule;

export type PatchProjectsDatabasesBackupSchedulesError = CommonErrors;

export const patchProjectsDatabasesBackupSchedules: API.OperationMethod<PatchProjectsDatabasesBackupSchedulesRequest, PatchProjectsDatabasesBackupSchedulesResponse, PatchProjectsDatabasesBackupSchedulesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsDatabasesBackupSchedulesRequest,
  output: PatchProjectsDatabasesBackupSchedulesResponse,
  errors: [],
}));

/** Deletes a backup schedule. */
export interface DeleteProjectsDatabasesBackupSchedulesRequest {
  /** Required. The name of the backup schedule. Format `projects/{project}/databases/{database}/backupSchedules/{backup_schedule}` */
  name: string;
}

export const DeleteProjectsDatabasesBackupSchedulesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/databases/{databasesId}/backupSchedules/{backupSchedulesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsDatabasesBackupSchedulesRequest>;

export type DeleteProjectsDatabasesBackupSchedulesResponse = Empty;
export const DeleteProjectsDatabasesBackupSchedulesResponse = Empty;

export type DeleteProjectsDatabasesBackupSchedulesError = CommonErrors;

export const deleteProjectsDatabasesBackupSchedules: API.OperationMethod<DeleteProjectsDatabasesBackupSchedulesRequest, DeleteProjectsDatabasesBackupSchedulesResponse, DeleteProjectsDatabasesBackupSchedulesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsDatabasesBackupSchedulesRequest,
  output: DeleteProjectsDatabasesBackupSchedulesResponse,
  errors: [],
}));

/** Gets a single document. */
export interface GetProjectsDatabasesDocumentsRequest {
  /** Required. The resource name of the Document to get. In the format: `projects/{project_id}/databases/{database_id}/documents/{document_path}`. */
  name: string;
  /** The list of field paths in the mask. See Document.fields for a field path syntax reference. */
  "mask.fieldPaths"?: string[];
  /** Reads the document in a transaction. */
  transaction?: string;
  /** Reads the version of the document at the given time. This must be a microsecond precision timestamp within the past one hour, or if Point-in-Time Recovery is enabled, can additionally be a whole minute timestamp within the past 7 days. */
  readTime?: string;
}

export const GetProjectsDatabasesDocumentsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  "mask.fieldPaths": Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("mask.fieldPaths")),
  transaction: Schema.optional(Schema.String).pipe(T.HttpQuery("transaction")),
  readTime: Schema.optional(Schema.String).pipe(T.HttpQuery("readTime")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/databases/{databasesId}/documents/{documentsId}/{documentsId1}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsDatabasesDocumentsRequest>;

export type GetProjectsDatabasesDocumentsResponse = Document;
export const GetProjectsDatabasesDocumentsResponse = Document;

export type GetProjectsDatabasesDocumentsError = CommonErrors;

export const getProjectsDatabasesDocuments: API.OperationMethod<GetProjectsDatabasesDocumentsRequest, GetProjectsDatabasesDocumentsResponse, GetProjectsDatabasesDocumentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsDatabasesDocumentsRequest,
  output: GetProjectsDatabasesDocumentsResponse,
  errors: [],
}));

/** Lists documents. */
export interface ListProjectsDatabasesDocumentsRequest {
  /** Required. The parent resource name. In the format: `projects/{project_id}/databases/{database_id}/documents` or `projects/{project_id}/databases/{database_id}/documents/{document_path}`. For example: `projects/my-project/databases/my-database/documents` or `projects/my-project/databases/my-database/documents/chatrooms/my-chatroom` */
  parent: string;
  /** Optional. The collection ID, relative to `parent`, to list. For example: `chatrooms` or `messages`. This is optional, and when not provided, Firestore will list documents from all collections under the provided `parent`. */
  collectionId: string;
  /** Optional. The maximum number of documents to return in a single response. Firestore may return fewer than this value. */
  pageSize?: number;
  /** Optional. A page token, received from a previous `ListDocuments` response. Provide this to retrieve the subsequent page. When paginating, all other parameters (with the exception of `page_size`) must match the values set in the request that generated the page token. */
  pageToken?: string;
  /** Optional. The optional ordering of the documents to return. For example: `priority desc, __name__ desc`. This mirrors the `ORDER BY` used in Firestore queries but in a string representation. When absent, documents are ordered based on `__name__ ASC`. */
  orderBy?: string;
  /** The list of field paths in the mask. See Document.fields for a field path syntax reference. */
  "mask.fieldPaths"?: string[];
  /** Perform the read as part of an already active transaction. */
  transaction?: string;
  /** Perform the read at the provided time. This must be a microsecond precision timestamp within the past one hour, or if Point-in-Time Recovery is enabled, can additionally be a whole minute timestamp within the past 7 days. */
  readTime?: string;
  /** If the list should show missing documents. A document is missing if it does not exist, but there are sub-documents nested underneath it. When true, such missing documents will be returned with a key but will not have fields, `create_time`, or `update_time` set. Requests with `show_missing` may not specify `where` or `order_by`. */
  showMissing?: boolean;
}

export const ListProjectsDatabasesDocumentsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  collectionId: Schema.String.pipe(T.HttpPath("collectionId")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  "mask.fieldPaths": Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("mask.fieldPaths")),
  transaction: Schema.optional(Schema.String).pipe(T.HttpQuery("transaction")),
  readTime: Schema.optional(Schema.String).pipe(T.HttpQuery("readTime")),
  showMissing: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("showMissing")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/databases/{databasesId}/documents/{documentsId}/{documentsId1}/{collectionId}" }),
  svc,
) as unknown as Schema.Schema<ListProjectsDatabasesDocumentsRequest>;

export type ListProjectsDatabasesDocumentsResponse = ListDocumentsResponse;
export const ListProjectsDatabasesDocumentsResponse = ListDocumentsResponse;

export type ListProjectsDatabasesDocumentsError = CommonErrors;

export const listProjectsDatabasesDocuments = API.makePaginated(() => ({
  input: ListProjectsDatabasesDocumentsRequest,
  output: ListProjectsDatabasesDocumentsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Lists documents. */
export interface ListDocumentsProjectsDatabasesDocumentsRequest {
  /** Required. The parent resource name. In the format: `projects/{project_id}/databases/{database_id}/documents` or `projects/{project_id}/databases/{database_id}/documents/{document_path}`. For example: `projects/my-project/databases/my-database/documents` or `projects/my-project/databases/my-database/documents/chatrooms/my-chatroom` */
  parent: string;
  /** Optional. The collection ID, relative to `parent`, to list. For example: `chatrooms` or `messages`. This is optional, and when not provided, Firestore will list documents from all collections under the provided `parent`. */
  collectionId: string;
  /** Optional. The maximum number of documents to return in a single response. Firestore may return fewer than this value. */
  pageSize?: number;
  /** Optional. A page token, received from a previous `ListDocuments` response. Provide this to retrieve the subsequent page. When paginating, all other parameters (with the exception of `page_size`) must match the values set in the request that generated the page token. */
  pageToken?: string;
  /** Optional. The optional ordering of the documents to return. For example: `priority desc, __name__ desc`. This mirrors the `ORDER BY` used in Firestore queries but in a string representation. When absent, documents are ordered based on `__name__ ASC`. */
  orderBy?: string;
  /** The list of field paths in the mask. See Document.fields for a field path syntax reference. */
  "mask.fieldPaths"?: string[];
  /** Perform the read as part of an already active transaction. */
  transaction?: string;
  /** Perform the read at the provided time. This must be a microsecond precision timestamp within the past one hour, or if Point-in-Time Recovery is enabled, can additionally be a whole minute timestamp within the past 7 days. */
  readTime?: string;
  /** If the list should show missing documents. A document is missing if it does not exist, but there are sub-documents nested underneath it. When true, such missing documents will be returned with a key but will not have fields, `create_time`, or `update_time` set. Requests with `show_missing` may not specify `where` or `order_by`. */
  showMissing?: boolean;
}

export const ListDocumentsProjectsDatabasesDocumentsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  collectionId: Schema.String.pipe(T.HttpPath("collectionId")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  "mask.fieldPaths": Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("mask.fieldPaths")),
  transaction: Schema.optional(Schema.String).pipe(T.HttpQuery("transaction")),
  readTime: Schema.optional(Schema.String).pipe(T.HttpQuery("readTime")),
  showMissing: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("showMissing")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/databases/{databasesId}/documents/{collectionId}" }),
  svc,
) as unknown as Schema.Schema<ListDocumentsProjectsDatabasesDocumentsRequest>;

export type ListDocumentsProjectsDatabasesDocumentsResponse = ListDocumentsResponse;
export const ListDocumentsProjectsDatabasesDocumentsResponse = ListDocumentsResponse;

export type ListDocumentsProjectsDatabasesDocumentsError = CommonErrors;

export const listDocumentsProjectsDatabasesDocuments = API.makePaginated(() => ({
  input: ListDocumentsProjectsDatabasesDocumentsRequest,
  output: ListDocumentsProjectsDatabasesDocumentsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Updates or inserts a document. */
export interface PatchProjectsDatabasesDocumentsRequest {
  /** The resource name of the document, for example `projects/{project_id}/databases/{database_id}/documents/{document_path}`. */
  name: string;
  /** The list of field paths in the mask. See Document.fields for a field path syntax reference. */
  "updateMask.fieldPaths"?: string[];
  /** The list of field paths in the mask. See Document.fields for a field path syntax reference. */
  "mask.fieldPaths"?: string[];
  /** When set to `true`, the target document must exist. When set to `false`, the target document must not exist. */
  "currentDocument.exists"?: boolean;
  /** When set, the target document must exist and have been last updated at that time. Timestamp must be microsecond aligned. */
  "currentDocument.updateTime"?: string;
  /** Request body */
  body?: Document;
}

export const PatchProjectsDatabasesDocumentsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  "updateMask.fieldPaths": Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("updateMask.fieldPaths")),
  "mask.fieldPaths": Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("mask.fieldPaths")),
  "currentDocument.exists": Schema.optional(Schema.Boolean).pipe(T.HttpQuery("currentDocument.exists")),
  "currentDocument.updateTime": Schema.optional(Schema.String).pipe(T.HttpQuery("currentDocument.updateTime")),
  body: Schema.optional(Document).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/databases/{databasesId}/documents/{documentsId}/{documentsId1}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsDatabasesDocumentsRequest>;

export type PatchProjectsDatabasesDocumentsResponse = Document;
export const PatchProjectsDatabasesDocumentsResponse = Document;

export type PatchProjectsDatabasesDocumentsError = CommonErrors;

export const patchProjectsDatabasesDocuments: API.OperationMethod<PatchProjectsDatabasesDocumentsRequest, PatchProjectsDatabasesDocumentsResponse, PatchProjectsDatabasesDocumentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsDatabasesDocumentsRequest,
  output: PatchProjectsDatabasesDocumentsResponse,
  errors: [],
}));

/** Deletes a document. */
export interface DeleteProjectsDatabasesDocumentsRequest {
  /** Required. The resource name of the Document to delete. In the format: `projects/{project_id}/databases/{database_id}/documents/{document_path}`. */
  name: string;
  /** When set to `true`, the target document must exist. When set to `false`, the target document must not exist. */
  "currentDocument.exists"?: boolean;
  /** When set, the target document must exist and have been last updated at that time. Timestamp must be microsecond aligned. */
  "currentDocument.updateTime"?: string;
}

export const DeleteProjectsDatabasesDocumentsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  "currentDocument.exists": Schema.optional(Schema.Boolean).pipe(T.HttpQuery("currentDocument.exists")),
  "currentDocument.updateTime": Schema.optional(Schema.String).pipe(T.HttpQuery("currentDocument.updateTime")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/databases/{databasesId}/documents/{documentsId}/{documentsId1}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsDatabasesDocumentsRequest>;

export type DeleteProjectsDatabasesDocumentsResponse = Empty;
export const DeleteProjectsDatabasesDocumentsResponse = Empty;

export type DeleteProjectsDatabasesDocumentsError = CommonErrors;

export const deleteProjectsDatabasesDocuments: API.OperationMethod<DeleteProjectsDatabasesDocumentsRequest, DeleteProjectsDatabasesDocumentsResponse, DeleteProjectsDatabasesDocumentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsDatabasesDocumentsRequest,
  output: DeleteProjectsDatabasesDocumentsResponse,
  errors: [],
}));

/** Gets multiple documents. Documents returned by this method are not guaranteed to be returned in the same order that they were requested. */
export interface BatchGetProjectsDatabasesDocumentsRequest {
  /** Required. The database name. In the format: `projects/{project_id}/databases/{database_id}`. */
  database: string;
  /** Request body */
  body?: BatchGetDocumentsRequest;
}

export const BatchGetProjectsDatabasesDocumentsRequest = Schema.Struct({
  database: Schema.String.pipe(T.HttpPath("database")),
  body: Schema.optional(BatchGetDocumentsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/databases/{databasesId}/documents:batchGet", hasBody: true }),
  svc,
) as unknown as Schema.Schema<BatchGetProjectsDatabasesDocumentsRequest>;

export type BatchGetProjectsDatabasesDocumentsResponse = BatchGetDocumentsResponse;
export const BatchGetProjectsDatabasesDocumentsResponse = BatchGetDocumentsResponse;

export type BatchGetProjectsDatabasesDocumentsError = CommonErrors;

export const batchGetProjectsDatabasesDocuments: API.OperationMethod<BatchGetProjectsDatabasesDocumentsRequest, BatchGetProjectsDatabasesDocumentsResponse, BatchGetProjectsDatabasesDocumentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: BatchGetProjectsDatabasesDocumentsRequest,
  output: BatchGetProjectsDatabasesDocumentsResponse,
  errors: [],
}));

/** Starts a new transaction. */
export interface BeginTransactionProjectsDatabasesDocumentsRequest {
  /** Required. The database name. In the format: `projects/{project_id}/databases/{database_id}`. */
  database: string;
  /** Request body */
  body?: BeginTransactionRequest;
}

export const BeginTransactionProjectsDatabasesDocumentsRequest = Schema.Struct({
  database: Schema.String.pipe(T.HttpPath("database")),
  body: Schema.optional(BeginTransactionRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/databases/{databasesId}/documents:beginTransaction", hasBody: true }),
  svc,
) as unknown as Schema.Schema<BeginTransactionProjectsDatabasesDocumentsRequest>;

export type BeginTransactionProjectsDatabasesDocumentsResponse = BeginTransactionResponse;
export const BeginTransactionProjectsDatabasesDocumentsResponse = BeginTransactionResponse;

export type BeginTransactionProjectsDatabasesDocumentsError = CommonErrors;

export const beginTransactionProjectsDatabasesDocuments: API.OperationMethod<BeginTransactionProjectsDatabasesDocumentsRequest, BeginTransactionProjectsDatabasesDocumentsResponse, BeginTransactionProjectsDatabasesDocumentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: BeginTransactionProjectsDatabasesDocumentsRequest,
  output: BeginTransactionProjectsDatabasesDocumentsResponse,
  errors: [],
}));

/** Commits a transaction, while optionally updating documents. */
export interface CommitProjectsDatabasesDocumentsRequest {
  /** Required. The database name. In the format: `projects/{project_id}/databases/{database_id}`. */
  database: string;
  /** Request body */
  body?: CommitRequest;
}

export const CommitProjectsDatabasesDocumentsRequest = Schema.Struct({
  database: Schema.String.pipe(T.HttpPath("database")),
  body: Schema.optional(CommitRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/databases/{databasesId}/documents:commit", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CommitProjectsDatabasesDocumentsRequest>;

export type CommitProjectsDatabasesDocumentsResponse = CommitResponse;
export const CommitProjectsDatabasesDocumentsResponse = CommitResponse;

export type CommitProjectsDatabasesDocumentsError = CommonErrors;

export const commitProjectsDatabasesDocuments: API.OperationMethod<CommitProjectsDatabasesDocumentsRequest, CommitProjectsDatabasesDocumentsResponse, CommitProjectsDatabasesDocumentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CommitProjectsDatabasesDocumentsRequest,
  output: CommitProjectsDatabasesDocumentsResponse,
  errors: [],
}));

/** Rolls back a transaction. */
export interface RollbackProjectsDatabasesDocumentsRequest {
  /** Required. The database name. In the format: `projects/{project_id}/databases/{database_id}`. */
  database: string;
  /** Request body */
  body?: RollbackRequest;
}

export const RollbackProjectsDatabasesDocumentsRequest = Schema.Struct({
  database: Schema.String.pipe(T.HttpPath("database")),
  body: Schema.optional(RollbackRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/databases/{databasesId}/documents:rollback", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RollbackProjectsDatabasesDocumentsRequest>;

export type RollbackProjectsDatabasesDocumentsResponse = Empty;
export const RollbackProjectsDatabasesDocumentsResponse = Empty;

export type RollbackProjectsDatabasesDocumentsError = CommonErrors;

export const rollbackProjectsDatabasesDocuments: API.OperationMethod<RollbackProjectsDatabasesDocumentsRequest, RollbackProjectsDatabasesDocumentsResponse, RollbackProjectsDatabasesDocumentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RollbackProjectsDatabasesDocumentsRequest,
  output: RollbackProjectsDatabasesDocumentsResponse,
  errors: [],
}));

/** Runs a query. */
export interface RunQueryProjectsDatabasesDocumentsRequest {
  /** Required. The parent resource name. In the format: `projects/{project_id}/databases/{database_id}/documents` or `projects/{project_id}/databases/{database_id}/documents/{document_path}`. For example: `projects/my-project/databases/my-database/documents` or `projects/my-project/databases/my-database/documents/chatrooms/my-chatroom` */
  parent: string;
  /** Request body */
  body?: RunQueryRequest;
}

export const RunQueryProjectsDatabasesDocumentsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(RunQueryRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/databases/{databasesId}/documents/{documentsId}/{documentsId1}:runQuery", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RunQueryProjectsDatabasesDocumentsRequest>;

export type RunQueryProjectsDatabasesDocumentsResponse = RunQueryResponse;
export const RunQueryProjectsDatabasesDocumentsResponse = RunQueryResponse;

export type RunQueryProjectsDatabasesDocumentsError = CommonErrors;

export const runQueryProjectsDatabasesDocuments: API.OperationMethod<RunQueryProjectsDatabasesDocumentsRequest, RunQueryProjectsDatabasesDocumentsResponse, RunQueryProjectsDatabasesDocumentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RunQueryProjectsDatabasesDocumentsRequest,
  output: RunQueryProjectsDatabasesDocumentsResponse,
  errors: [],
}));

/** Executes a pipeline query. */
export interface ExecutePipelineProjectsDatabasesDocumentsRequest {
  /** Required. Database identifier, in the form `projects/{project}/databases/{database}`. */
  database: string;
  /** Request body */
  body?: ExecutePipelineRequest;
}

export const ExecutePipelineProjectsDatabasesDocumentsRequest = Schema.Struct({
  database: Schema.String.pipe(T.HttpPath("database")),
  body: Schema.optional(ExecutePipelineRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/databases/{databasesId}/documents:executePipeline", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ExecutePipelineProjectsDatabasesDocumentsRequest>;

export type ExecutePipelineProjectsDatabasesDocumentsResponse = ExecutePipelineResponse;
export const ExecutePipelineProjectsDatabasesDocumentsResponse = ExecutePipelineResponse;

export type ExecutePipelineProjectsDatabasesDocumentsError = CommonErrors;

export const executePipelineProjectsDatabasesDocuments: API.OperationMethod<ExecutePipelineProjectsDatabasesDocumentsRequest, ExecutePipelineProjectsDatabasesDocumentsResponse, ExecutePipelineProjectsDatabasesDocumentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ExecutePipelineProjectsDatabasesDocumentsRequest,
  output: ExecutePipelineProjectsDatabasesDocumentsResponse,
  errors: [],
}));

/** Runs an aggregation query. Rather than producing Document results like Firestore.RunQuery, this API allows running an aggregation to produce a series of AggregationResult server-side. High-Level Example: ``` -- Return the number of documents in table given a filter. SELECT COUNT(*) FROM ( SELECT * FROM k where a = true ); ``` */
export interface RunAggregationQueryProjectsDatabasesDocumentsRequest {
  /** Required. The parent resource name. In the format: `projects/{project_id}/databases/{database_id}/documents` or `projects/{project_id}/databases/{database_id}/documents/{document_path}`. For example: `projects/my-project/databases/my-database/documents` or `projects/my-project/databases/my-database/documents/chatrooms/my-chatroom` */
  parent: string;
  /** Request body */
  body?: RunAggregationQueryRequest;
}

export const RunAggregationQueryProjectsDatabasesDocumentsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(RunAggregationQueryRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/databases/{databasesId}/documents/{documentsId}/{documentsId1}:runAggregationQuery", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RunAggregationQueryProjectsDatabasesDocumentsRequest>;

export type RunAggregationQueryProjectsDatabasesDocumentsResponse = RunAggregationQueryResponse;
export const RunAggregationQueryProjectsDatabasesDocumentsResponse = RunAggregationQueryResponse;

export type RunAggregationQueryProjectsDatabasesDocumentsError = CommonErrors;

export const runAggregationQueryProjectsDatabasesDocuments: API.OperationMethod<RunAggregationQueryProjectsDatabasesDocumentsRequest, RunAggregationQueryProjectsDatabasesDocumentsResponse, RunAggregationQueryProjectsDatabasesDocumentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RunAggregationQueryProjectsDatabasesDocumentsRequest,
  output: RunAggregationQueryProjectsDatabasesDocumentsResponse,
  errors: [],
}));

/** Partitions a query by returning partition cursors that can be used to run the query in parallel. The returned partition cursors are split points that can be used by RunQuery as starting/end points for the query results. */
export interface PartitionQueryProjectsDatabasesDocumentsRequest {
  /** Required. The parent resource name. In the format: `projects/{project_id}/databases/{database_id}/documents`. Document resource names are not supported; only database resource names can be specified. */
  parent: string;
  /** Request body */
  body?: PartitionQueryRequest;
}

export const PartitionQueryProjectsDatabasesDocumentsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(PartitionQueryRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/databases/{databasesId}/documents/{documentsId}/{documentsId1}:partitionQuery", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PartitionQueryProjectsDatabasesDocumentsRequest>;

export type PartitionQueryProjectsDatabasesDocumentsResponse = PartitionQueryResponse;
export const PartitionQueryProjectsDatabasesDocumentsResponse = PartitionQueryResponse;

export type PartitionQueryProjectsDatabasesDocumentsError = CommonErrors;

export const partitionQueryProjectsDatabasesDocuments: API.OperationMethod<PartitionQueryProjectsDatabasesDocumentsRequest, PartitionQueryProjectsDatabasesDocumentsResponse, PartitionQueryProjectsDatabasesDocumentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PartitionQueryProjectsDatabasesDocumentsRequest,
  output: PartitionQueryProjectsDatabasesDocumentsResponse,
  errors: [],
}));

/** Streams batches of document updates and deletes, in order. This method is only available via gRPC or WebChannel (not REST). */
export interface WriteProjectsDatabasesDocumentsRequest {
  /** Required. The database name. In the format: `projects/{project_id}/databases/{database_id}`. This is only required in the first message. */
  database: string;
  /** Request body */
  body?: WriteRequest;
}

export const WriteProjectsDatabasesDocumentsRequest = Schema.Struct({
  database: Schema.String.pipe(T.HttpPath("database")),
  body: Schema.optional(WriteRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/databases/{databasesId}/documents:write", hasBody: true }),
  svc,
) as unknown as Schema.Schema<WriteProjectsDatabasesDocumentsRequest>;

export type WriteProjectsDatabasesDocumentsResponse = WriteResponse;
export const WriteProjectsDatabasesDocumentsResponse = WriteResponse;

export type WriteProjectsDatabasesDocumentsError = CommonErrors;

export const writeProjectsDatabasesDocuments: API.OperationMethod<WriteProjectsDatabasesDocumentsRequest, WriteProjectsDatabasesDocumentsResponse, WriteProjectsDatabasesDocumentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: WriteProjectsDatabasesDocumentsRequest,
  output: WriteProjectsDatabasesDocumentsResponse,
  errors: [],
}));

/** Listens to changes. This method is only available via gRPC or WebChannel (not REST). */
export interface ListenProjectsDatabasesDocumentsRequest {
  /** Required. The database name. In the format: `projects/{project_id}/databases/{database_id}`. */
  database: string;
  /** Request body */
  body?: ListenRequest;
}

export const ListenProjectsDatabasesDocumentsRequest = Schema.Struct({
  database: Schema.String.pipe(T.HttpPath("database")),
  body: Schema.optional(ListenRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/databases/{databasesId}/documents:listen", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ListenProjectsDatabasesDocumentsRequest>;

export type ListenProjectsDatabasesDocumentsResponse = ListenResponse;
export const ListenProjectsDatabasesDocumentsResponse = ListenResponse;

export type ListenProjectsDatabasesDocumentsError = CommonErrors;

export const listenProjectsDatabasesDocuments: API.OperationMethod<ListenProjectsDatabasesDocumentsRequest, ListenProjectsDatabasesDocumentsResponse, ListenProjectsDatabasesDocumentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListenProjectsDatabasesDocumentsRequest,
  output: ListenProjectsDatabasesDocumentsResponse,
  errors: [],
}));

/** Lists all the collection IDs underneath a document. */
export interface ListCollectionIdsProjectsDatabasesDocumentsRequest {
  /** Required. The parent document. In the format: `projects/{project_id}/databases/{database_id}/documents/{document_path}`. For example: `projects/my-project/databases/my-database/documents/chatrooms/my-chatroom` */
  parent: string;
  /** Request body */
  body?: ListCollectionIdsRequest;
}

export const ListCollectionIdsProjectsDatabasesDocumentsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(ListCollectionIdsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/databases/{databasesId}/documents/{documentsId}/{documentsId1}:listCollectionIds", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ListCollectionIdsProjectsDatabasesDocumentsRequest>;

export type ListCollectionIdsProjectsDatabasesDocumentsResponse = ListCollectionIdsResponse;
export const ListCollectionIdsProjectsDatabasesDocumentsResponse = ListCollectionIdsResponse;

export type ListCollectionIdsProjectsDatabasesDocumentsError = CommonErrors;

export const listCollectionIdsProjectsDatabasesDocuments: API.OperationMethod<ListCollectionIdsProjectsDatabasesDocumentsRequest, ListCollectionIdsProjectsDatabasesDocumentsResponse, ListCollectionIdsProjectsDatabasesDocumentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListCollectionIdsProjectsDatabasesDocumentsRequest,
  output: ListCollectionIdsProjectsDatabasesDocumentsResponse,
  errors: [],
}));

/** Applies a batch of write operations. The BatchWrite method does not apply the write operations atomically and can apply them out of order. Method does not allow more than one write per document. Each write succeeds or fails independently. See the BatchWriteResponse for the success status of each write. If you require an atomically applied set of writes, use Commit instead. */
export interface BatchWriteProjectsDatabasesDocumentsRequest {
  /** Required. The database name. In the format: `projects/{project_id}/databases/{database_id}`. */
  database: string;
  /** Request body */
  body?: BatchWriteRequest;
}

export const BatchWriteProjectsDatabasesDocumentsRequest = Schema.Struct({
  database: Schema.String.pipe(T.HttpPath("database")),
  body: Schema.optional(BatchWriteRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/databases/{databasesId}/documents:batchWrite", hasBody: true }),
  svc,
) as unknown as Schema.Schema<BatchWriteProjectsDatabasesDocumentsRequest>;

export type BatchWriteProjectsDatabasesDocumentsResponse = BatchWriteResponse;
export const BatchWriteProjectsDatabasesDocumentsResponse = BatchWriteResponse;

export type BatchWriteProjectsDatabasesDocumentsError = CommonErrors;

export const batchWriteProjectsDatabasesDocuments: API.OperationMethod<BatchWriteProjectsDatabasesDocumentsRequest, BatchWriteProjectsDatabasesDocumentsResponse, BatchWriteProjectsDatabasesDocumentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: BatchWriteProjectsDatabasesDocumentsRequest,
  output: BatchWriteProjectsDatabasesDocumentsResponse,
  errors: [],
}));

/** Creates a new document. */
export interface CreateDocumentProjectsDatabasesDocumentsRequest {
  /** Required. The parent resource. For example: `projects/{project_id}/databases/{database_id}/documents` or `projects/{project_id}/databases/{database_id}/documents/chatrooms/{chatroom_id}` */
  parent: string;
  /** Required. The collection ID, relative to `parent`, to list. For example: `chatrooms`. */
  collectionId: string;
  /** The client-assigned document ID to use for this document. Optional. If not specified, an ID will be assigned by the service. */
  documentId?: string;
  /** The list of field paths in the mask. See Document.fields for a field path syntax reference. */
  "mask.fieldPaths"?: string[];
  /** Request body */
  body?: Document;
}

export const CreateDocumentProjectsDatabasesDocumentsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  collectionId: Schema.String.pipe(T.HttpPath("collectionId")),
  documentId: Schema.optional(Schema.String).pipe(T.HttpQuery("documentId")),
  "mask.fieldPaths": Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("mask.fieldPaths")),
  body: Schema.optional(Document).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/databases/{databasesId}/documents/{documentsId}/{collectionId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateDocumentProjectsDatabasesDocumentsRequest>;

export type CreateDocumentProjectsDatabasesDocumentsResponse = Document;
export const CreateDocumentProjectsDatabasesDocumentsResponse = Document;

export type CreateDocumentProjectsDatabasesDocumentsError = CommonErrors;

export const createDocumentProjectsDatabasesDocuments: API.OperationMethod<CreateDocumentProjectsDatabasesDocumentsRequest, CreateDocumentProjectsDatabasesDocumentsResponse, CreateDocumentProjectsDatabasesDocumentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateDocumentProjectsDatabasesDocumentsRequest,
  output: CreateDocumentProjectsDatabasesDocumentsResponse,
  errors: [],
}));

