// ==========================================================================
// Datastream API (datastream v1alpha1)
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
  name: "datastream",
  version: "v1alpha1",
  rootUrl: "https://datastream.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

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

export interface CancelOperationRequest {
}

export const CancelOperationRequest: Schema.Schema<CancelOperationRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "CancelOperationRequest" }) as any as Schema.Schema<CancelOperationRequest>;

export interface OracleProfile {
  /** Required. Hostname for the Oracle connection. */
  hostname?: string;
  /** Port for the Oracle connection, default value is 1521. */
  port?: number;
  /** Required. Username for the Oracle connection. */
  username?: string;
  /** Required. Password for the Oracle connection. */
  password?: string;
  /** Required. Database for the Oracle connection. */
  databaseService?: string;
  /** Connection string attributes */
  connectionAttributes?: Record<string, string>;
}

export const OracleProfile: Schema.Schema<OracleProfile> = Schema.suspend(() => Schema.Struct({
  hostname: Schema.optional(Schema.String),
  port: Schema.optional(Schema.Number),
  username: Schema.optional(Schema.String),
  password: Schema.optional(Schema.String),
  databaseService: Schema.optional(Schema.String),
  connectionAttributes: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "OracleProfile" }) as any as Schema.Schema<OracleProfile>;

export interface GcsProfile {
  /** Required. The full project and resource path for Cloud Storage bucket including the name. */
  bucketName?: string;
  /** The root path inside the Cloud Storage bucket. */
  rootPath?: string;
}

export const GcsProfile: Schema.Schema<GcsProfile> = Schema.suspend(() => Schema.Struct({
  bucketName: Schema.optional(Schema.String),
  rootPath: Schema.optional(Schema.String),
})).annotate({ identifier: "GcsProfile" }) as any as Schema.Schema<GcsProfile>;

export interface MysqlSslConfig {
  /** Input only. PEM-encoded private key associated with the Client Certificate. If this field is used then the 'client_certificate' and the 'ca_certificate' fields are mandatory. */
  clientKey?: string;
  /** Output only. Indicates whether the client_key field is set. */
  clientKeySet?: boolean;
  /** Input only. PEM-encoded certificate that will be used by the replica to authenticate against the source database server. If this field is used then the 'client_key' and the 'ca_certificate' fields are mandatory. */
  clientCertificate?: string;
  /** Output only. Indicates whether the client_certificate field is set. */
  clientCertificateSet?: boolean;
  /** Input only. PEM-encoded certificate of the CA that signed the source database server's certificate. */
  caCertificate?: string;
  /** Output only. Indicates whether the ca_certificate field is set. */
  caCertificateSet?: boolean;
}

export const MysqlSslConfig: Schema.Schema<MysqlSslConfig> = Schema.suspend(() => Schema.Struct({
  clientKey: Schema.optional(Schema.String),
  clientKeySet: Schema.optional(Schema.Boolean),
  clientCertificate: Schema.optional(Schema.String),
  clientCertificateSet: Schema.optional(Schema.Boolean),
  caCertificate: Schema.optional(Schema.String),
  caCertificateSet: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "MysqlSslConfig" }) as any as Schema.Schema<MysqlSslConfig>;

export interface MysqlProfile {
  /** Required. Hostname for the MySQL connection. */
  hostname?: string;
  /** Port for the MySQL connection, default value is 3306. */
  port?: number;
  /** Required. Username for the MySQL connection. */
  username?: string;
  /** Required. Input only. Password for the MySQL connection. */
  password?: string;
  /** SSL configuration for the MySQL connection. */
  sslConfig?: MysqlSslConfig;
}

export const MysqlProfile: Schema.Schema<MysqlProfile> = Schema.suspend(() => Schema.Struct({
  hostname: Schema.optional(Schema.String),
  port: Schema.optional(Schema.Number),
  username: Schema.optional(Schema.String),
  password: Schema.optional(Schema.String),
  sslConfig: Schema.optional(MysqlSslConfig),
})).annotate({ identifier: "MysqlProfile" }) as any as Schema.Schema<MysqlProfile>;

export interface NoConnectivitySettings {
}

export const NoConnectivitySettings: Schema.Schema<NoConnectivitySettings> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "NoConnectivitySettings" }) as any as Schema.Schema<NoConnectivitySettings>;

export interface StaticServiceIpConnectivity {
}

export const StaticServiceIpConnectivity: Schema.Schema<StaticServiceIpConnectivity> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "StaticServiceIpConnectivity" }) as any as Schema.Schema<StaticServiceIpConnectivity>;

export interface ForwardSshTunnelConnectivity {
  /** Required. Hostname for the SSH tunnel. */
  hostname?: string;
  /** Required. Username for the SSH tunnel. */
  username?: string;
  /** Port for the SSH tunnel, default value is 22. */
  port?: number;
  /** Input only. SSH password. */
  password?: string;
  /** Input only. SSH private key. */
  privateKey?: string;
}

export const ForwardSshTunnelConnectivity: Schema.Schema<ForwardSshTunnelConnectivity> = Schema.suspend(() => Schema.Struct({
  hostname: Schema.optional(Schema.String),
  username: Schema.optional(Schema.String),
  port: Schema.optional(Schema.Number),
  password: Schema.optional(Schema.String),
  privateKey: Schema.optional(Schema.String),
})).annotate({ identifier: "ForwardSshTunnelConnectivity" }) as any as Schema.Schema<ForwardSshTunnelConnectivity>;

export interface PrivateConnectivity {
  privateConnectionName?: string;
}

export const PrivateConnectivity: Schema.Schema<PrivateConnectivity> = Schema.suspend(() => Schema.Struct({
  privateConnectionName: Schema.optional(Schema.String),
})).annotate({ identifier: "PrivateConnectivity" }) as any as Schema.Schema<PrivateConnectivity>;

export interface ConnectionProfile {
  /** Output only. The resource's name. */
  name?: string;
  /** Output only. The create time of the resource. */
  createTime?: string;
  /** Output only. The update time of the resource. */
  updateTime?: string;
  /** Labels. */
  labels?: Record<string, string>;
  /** Required. Display name. */
  displayName?: string;
  /** Oracle ConnectionProfile configuration. */
  oracleProfile?: OracleProfile;
  /** Cloud Storage ConnectionProfile configuration. */
  gcsProfile?: GcsProfile;
  /** MySQL ConnectionProfile configuration. */
  mysqlProfile?: MysqlProfile;
  /** No connectivity option chosen. */
  noConnectivity?: NoConnectivitySettings;
  /** Static Service IP connectivity. */
  staticServiceIpConnectivity?: StaticServiceIpConnectivity;
  /** Forward SSH tunnel connectivity. */
  forwardSshConnectivity?: ForwardSshTunnelConnectivity;
  /** Private connectivity. */
  privateConnectivity?: PrivateConnectivity;
}

export const ConnectionProfile: Schema.Schema<ConnectionProfile> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  displayName: Schema.optional(Schema.String),
  oracleProfile: Schema.optional(OracleProfile),
  gcsProfile: Schema.optional(GcsProfile),
  mysqlProfile: Schema.optional(MysqlProfile),
  noConnectivity: Schema.optional(NoConnectivitySettings),
  staticServiceIpConnectivity: Schema.optional(StaticServiceIpConnectivity),
  forwardSshConnectivity: Schema.optional(ForwardSshTunnelConnectivity),
  privateConnectivity: Schema.optional(PrivateConnectivity),
})).annotate({ identifier: "ConnectionProfile" }) as any as Schema.Schema<ConnectionProfile>;

export interface ListConnectionProfilesResponse {
  /** List of connection profiles. */
  connectionProfiles?: Array<ConnectionProfile>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
}

export const ListConnectionProfilesResponse: Schema.Schema<ListConnectionProfilesResponse> = Schema.suspend(() => Schema.Struct({
  connectionProfiles: Schema.optional(Schema.Array(ConnectionProfile)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListConnectionProfilesResponse" }) as any as Schema.Schema<ListConnectionProfilesResponse>;

export interface OracleColumn {
  /** Column name. */
  columnName?: string;
  /** The Oracle data type. */
  dataType?: string;
  /** Column length. */
  length?: number;
  /** Column precision. */
  precision?: number;
  /** Column scale. */
  scale?: number;
  /** Column encoding. */
  encoding?: string;
  /** Whether or not the column represents a primary key. */
  primaryKey?: boolean;
  /** Whether or not the column can accept a null value. */
  nullable?: boolean;
  /** The ordinal position of the column in the table. */
  ordinalPosition?: number;
}

export const OracleColumn: Schema.Schema<OracleColumn> = Schema.suspend(() => Schema.Struct({
  columnName: Schema.optional(Schema.String),
  dataType: Schema.optional(Schema.String),
  length: Schema.optional(Schema.Number),
  precision: Schema.optional(Schema.Number),
  scale: Schema.optional(Schema.Number),
  encoding: Schema.optional(Schema.String),
  primaryKey: Schema.optional(Schema.Boolean),
  nullable: Schema.optional(Schema.Boolean),
  ordinalPosition: Schema.optional(Schema.Number),
})).annotate({ identifier: "OracleColumn" }) as any as Schema.Schema<OracleColumn>;

export interface OracleTable {
  /** Table name. */
  tableName?: string;
  /** Oracle columns in the schema. When unspecified as part of inclue/exclude lists, includes/excludes everything. */
  oracleColumns?: Array<OracleColumn>;
}

export const OracleTable: Schema.Schema<OracleTable> = Schema.suspend(() => Schema.Struct({
  tableName: Schema.optional(Schema.String),
  oracleColumns: Schema.optional(Schema.Array(OracleColumn)),
})).annotate({ identifier: "OracleTable" }) as any as Schema.Schema<OracleTable>;

export interface OracleSchema {
  /** Schema name. */
  schemaName?: string;
  /** Tables in the schema. */
  oracleTables?: Array<OracleTable>;
}

export const OracleSchema: Schema.Schema<OracleSchema> = Schema.suspend(() => Schema.Struct({
  schemaName: Schema.optional(Schema.String),
  oracleTables: Schema.optional(Schema.Array(OracleTable)),
})).annotate({ identifier: "OracleSchema" }) as any as Schema.Schema<OracleSchema>;

export interface OracleRdbms {
  /** Oracle schemas/databases in the database server. */
  oracleSchemas?: Array<OracleSchema>;
}

export const OracleRdbms: Schema.Schema<OracleRdbms> = Schema.suspend(() => Schema.Struct({
  oracleSchemas: Schema.optional(Schema.Array(OracleSchema)),
})).annotate({ identifier: "OracleRdbms" }) as any as Schema.Schema<OracleRdbms>;

export interface MysqlColumn {
  /** Column name. */
  columnName?: string;
  /** The MySQL data type. Full data types list can be found here: https://dev.mysql.com/doc/refman/8.0/en/data-types.html */
  dataType?: string;
  /** Column length. */
  length?: number;
  /** Column collation. */
  collation?: string;
  /** Whether or not the column represents a primary key. */
  primaryKey?: boolean;
  /** Whether or not the column can accept a null value. */
  nullable?: boolean;
  /** The ordinal position of the column in the table. */
  ordinalPosition?: number;
}

export const MysqlColumn: Schema.Schema<MysqlColumn> = Schema.suspend(() => Schema.Struct({
  columnName: Schema.optional(Schema.String),
  dataType: Schema.optional(Schema.String),
  length: Schema.optional(Schema.Number),
  collation: Schema.optional(Schema.String),
  primaryKey: Schema.optional(Schema.Boolean),
  nullable: Schema.optional(Schema.Boolean),
  ordinalPosition: Schema.optional(Schema.Number),
})).annotate({ identifier: "MysqlColumn" }) as any as Schema.Schema<MysqlColumn>;

export interface MysqlTable {
  /** Table name. */
  tableName?: string;
  /** MySQL columns in the database. When unspecified as part of include/exclude lists, includes/excludes everything. */
  mysqlColumns?: Array<MysqlColumn>;
}

export const MysqlTable: Schema.Schema<MysqlTable> = Schema.suspend(() => Schema.Struct({
  tableName: Schema.optional(Schema.String),
  mysqlColumns: Schema.optional(Schema.Array(MysqlColumn)),
})).annotate({ identifier: "MysqlTable" }) as any as Schema.Schema<MysqlTable>;

export interface MysqlDatabase {
  /** Database name. */
  databaseName?: string;
  /** Tables in the database. */
  mysqlTables?: Array<MysqlTable>;
}

export const MysqlDatabase: Schema.Schema<MysqlDatabase> = Schema.suspend(() => Schema.Struct({
  databaseName: Schema.optional(Schema.String),
  mysqlTables: Schema.optional(Schema.Array(MysqlTable)),
})).annotate({ identifier: "MysqlDatabase" }) as any as Schema.Schema<MysqlDatabase>;

export interface MysqlRdbms {
  /** Mysql databases on the server */
  mysqlDatabases?: Array<MysqlDatabase>;
}

export const MysqlRdbms: Schema.Schema<MysqlRdbms> = Schema.suspend(() => Schema.Struct({
  mysqlDatabases: Schema.optional(Schema.Array(MysqlDatabase)),
})).annotate({ identifier: "MysqlRdbms" }) as any as Schema.Schema<MysqlRdbms>;

export interface DiscoverConnectionProfileRequest {
  /** An ad-hoc ConnectionProfile configuration. */
  connectionProfile?: ConnectionProfile;
  /** A reference to an existing ConnectionProfile. */
  connectionProfileName?: string;
  /** Whether to retrieve the full hierarchy of data objects (TRUE) or only the current level (FALSE). */
  recursive?: boolean;
  /** The number of hierarchy levels below the current level to be retrieved. */
  recursionDepth?: number;
  /** Oracle RDBMS to enrich with child data objects and metadata. */
  oracleRdbms?: OracleRdbms;
  /** MySQL RDBMS to enrich with child data objects and metadata. */
  mysqlRdbms?: MysqlRdbms;
}

export const DiscoverConnectionProfileRequest: Schema.Schema<DiscoverConnectionProfileRequest> = Schema.suspend(() => Schema.Struct({
  connectionProfile: Schema.optional(ConnectionProfile),
  connectionProfileName: Schema.optional(Schema.String),
  recursive: Schema.optional(Schema.Boolean),
  recursionDepth: Schema.optional(Schema.Number),
  oracleRdbms: Schema.optional(OracleRdbms),
  mysqlRdbms: Schema.optional(MysqlRdbms),
})).annotate({ identifier: "DiscoverConnectionProfileRequest" }) as any as Schema.Schema<DiscoverConnectionProfileRequest>;

export interface DiscoverConnectionProfileResponse {
  /** Enriched Oracle RDBMS object. */
  oracleRdbms?: OracleRdbms;
  /** Enriched MySQL RDBMS object. */
  mysqlRdbms?: MysqlRdbms;
}

export const DiscoverConnectionProfileResponse: Schema.Schema<DiscoverConnectionProfileResponse> = Schema.suspend(() => Schema.Struct({
  oracleRdbms: Schema.optional(OracleRdbms),
  mysqlRdbms: Schema.optional(MysqlRdbms),
})).annotate({ identifier: "DiscoverConnectionProfileResponse" }) as any as Schema.Schema<DiscoverConnectionProfileResponse>;

export interface DropLargeObjects {
}

export const DropLargeObjects: Schema.Schema<DropLargeObjects> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "DropLargeObjects" }) as any as Schema.Schema<DropLargeObjects>;

export interface OracleSourceConfig {
  /** Oracle objects to include in the stream. */
  allowlist?: OracleRdbms;
  /** Oracle objects to exclude from the stream. */
  rejectlist?: OracleRdbms;
  /** Drop large object values. */
  dropLargeObjects?: DropLargeObjects;
}

export const OracleSourceConfig: Schema.Schema<OracleSourceConfig> = Schema.suspend(() => Schema.Struct({
  allowlist: Schema.optional(OracleRdbms),
  rejectlist: Schema.optional(OracleRdbms),
  dropLargeObjects: Schema.optional(DropLargeObjects),
})).annotate({ identifier: "OracleSourceConfig" }) as any as Schema.Schema<OracleSourceConfig>;

export interface MysqlSourceConfig {
  /** MySQL objects to retrieve from the source. */
  allowlist?: MysqlRdbms;
  /** MySQL objects to exclude from the stream. */
  rejectlist?: MysqlRdbms;
}

export const MysqlSourceConfig: Schema.Schema<MysqlSourceConfig> = Schema.suspend(() => Schema.Struct({
  allowlist: Schema.optional(MysqlRdbms),
  rejectlist: Schema.optional(MysqlRdbms),
})).annotate({ identifier: "MysqlSourceConfig" }) as any as Schema.Schema<MysqlSourceConfig>;

export interface SourceConfig {
  /** Required. Source connection profile identifier. */
  sourceConnectionProfileName?: string;
  /** Oracle data source configuration */
  oracleSourceConfig?: OracleSourceConfig;
  /** MySQL data source configuration */
  mysqlSourceConfig?: MysqlSourceConfig;
}

export const SourceConfig: Schema.Schema<SourceConfig> = Schema.suspend(() => Schema.Struct({
  sourceConnectionProfileName: Schema.optional(Schema.String),
  oracleSourceConfig: Schema.optional(OracleSourceConfig),
  mysqlSourceConfig: Schema.optional(MysqlSourceConfig),
})).annotate({ identifier: "SourceConfig" }) as any as Schema.Schema<SourceConfig>;

export interface AvroFileFormat {
}

export const AvroFileFormat: Schema.Schema<AvroFileFormat> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "AvroFileFormat" }) as any as Schema.Schema<AvroFileFormat>;

export interface JsonFileFormat {
  /** The schema file format along JSON data files. */
  schemaFileFormat?: "SCHEMA_FILE_FORMAT_UNSPECIFIED" | "NO_SCHEMA_FILE" | "AVRO_SCHEMA_FILE" | (string & {});
  /** Compression of the loaded JSON file. */
  compression?: "JSON_COMPRESSION_UNSPECIFIED" | "NO_COMPRESSION" | "GZIP" | (string & {});
}

export const JsonFileFormat: Schema.Schema<JsonFileFormat> = Schema.suspend(() => Schema.Struct({
  schemaFileFormat: Schema.optional(Schema.String),
  compression: Schema.optional(Schema.String),
})).annotate({ identifier: "JsonFileFormat" }) as any as Schema.Schema<JsonFileFormat>;

export interface GcsDestinationConfig {
  /** Path inside the Cloud Storage bucket to write data to. */
  path?: string;
  /** File format that data should be written in. Deprecated field (b/169501737) - use file_format instead. */
  gcsFileFormat?: "GCS_FILE_FORMAT_UNSPECIFIED" | "AVRO" | (string & {});
  /** The maximum file size to be saved in the bucket. */
  fileRotationMb?: number;
  /** The maximum duration for which new events are added before a file is closed and a new file is created. */
  fileRotationInterval?: string;
  /** AVRO file format configuration. */
  avroFileFormat?: AvroFileFormat;
  /** JSON file format configuration. */
  jsonFileFormat?: JsonFileFormat;
}

export const GcsDestinationConfig: Schema.Schema<GcsDestinationConfig> = Schema.suspend(() => Schema.Struct({
  path: Schema.optional(Schema.String),
  gcsFileFormat: Schema.optional(Schema.String),
  fileRotationMb: Schema.optional(Schema.Number),
  fileRotationInterval: Schema.optional(Schema.String),
  avroFileFormat: Schema.optional(AvroFileFormat),
  jsonFileFormat: Schema.optional(JsonFileFormat),
})).annotate({ identifier: "GcsDestinationConfig" }) as any as Schema.Schema<GcsDestinationConfig>;

export interface DestinationConfig {
  /** Required. Destination connection profile identifier. */
  destinationConnectionProfileName?: string;
  /** GCS destination configuration. */
  gcsDestinationConfig?: GcsDestinationConfig;
}

export const DestinationConfig: Schema.Schema<DestinationConfig> = Schema.suspend(() => Schema.Struct({
  destinationConnectionProfileName: Schema.optional(Schema.String),
  gcsDestinationConfig: Schema.optional(GcsDestinationConfig),
})).annotate({ identifier: "DestinationConfig" }) as any as Schema.Schema<DestinationConfig>;

export interface BackfillAllStrategy {
  /** Oracle data source objects to avoid backfilling. */
  oracleExcludedObjects?: OracleRdbms;
  /** MySQL data source objects to avoid backfilling. */
  mysqlExcludedObjects?: MysqlRdbms;
}

export const BackfillAllStrategy: Schema.Schema<BackfillAllStrategy> = Schema.suspend(() => Schema.Struct({
  oracleExcludedObjects: Schema.optional(OracleRdbms),
  mysqlExcludedObjects: Schema.optional(MysqlRdbms),
})).annotate({ identifier: "BackfillAllStrategy" }) as any as Schema.Schema<BackfillAllStrategy>;

export interface BackfillNoneStrategy {
}

export const BackfillNoneStrategy: Schema.Schema<BackfillNoneStrategy> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "BackfillNoneStrategy" }) as any as Schema.Schema<BackfillNoneStrategy>;

export interface Datastream_Error {
  /** A title that explains the reason for the error. */
  reason?: string;
  /** A unique identifier for this specific error, allowing it to be traced throughout the system in logs and API responses. */
  errorUuid?: string;
  /** A message containing more information about the error that occurred. */
  message?: string;
  /** The time when the error occurred. */
  errorTime?: string;
  /** Additional information about the error. */
  details?: Record<string, string>;
}

export const Datastream_Error: Schema.Schema<Datastream_Error> = Schema.suspend(() => Schema.Struct({
  reason: Schema.optional(Schema.String),
  errorUuid: Schema.optional(Schema.String),
  message: Schema.optional(Schema.String),
  errorTime: Schema.optional(Schema.String),
  details: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "Datastream_Error" }) as any as Schema.Schema<Datastream_Error>;

export interface Stream {
  /** Output only. The stream's name. */
  name?: string;
  /** Output only. The creation time of the stream. */
  createTime?: string;
  /** Output only. The last update time of the stream. */
  updateTime?: string;
  /** Labels. */
  labels?: Record<string, string>;
  /** Required. Display name. */
  displayName?: string;
  /** Required. Source connection profile configuration. */
  sourceConfig?: SourceConfig;
  /** Required. Destination connection profile configuration. */
  destinationConfig?: DestinationConfig;
  /** The state of the stream. */
  state?: "STATE_UNSPECIFIED" | "CREATED" | "RUNNING" | "PAUSED" | "MAINTENANCE" | "FAILED" | "FAILED_PERMANENTLY" | "STARTING" | "DRAINING" | (string & {});
  /** Automatically backfill objects included in the stream source configuration. Specific objects can be excluded. */
  backfillAll?: BackfillAllStrategy;
  /** Do not automatically backfill any objects. */
  backfillNone?: BackfillNoneStrategy;
  /** Output only. Errors on the Stream. */
  errors?: Array<Datastream_Error>;
  /** Immutable. A reference to a KMS encryption key. If provided, it will be used to encrypt the data. If left blank, data will be encrypted using an internal Stream-specific encryption key provisioned through KMS. */
  customerManagedEncryptionKey?: string;
}

export const Stream: Schema.Schema<Stream> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  displayName: Schema.optional(Schema.String),
  sourceConfig: Schema.optional(SourceConfig),
  destinationConfig: Schema.optional(DestinationConfig),
  state: Schema.optional(Schema.String),
  backfillAll: Schema.optional(BackfillAllStrategy),
  backfillNone: Schema.optional(BackfillNoneStrategy),
  errors: Schema.optional(Schema.Array(Datastream_Error)),
  customerManagedEncryptionKey: Schema.optional(Schema.String),
})).annotate({ identifier: "Stream" }) as any as Schema.Schema<Stream>;

export interface ListStreamsResponse {
  /** List of streams */
  streams?: Array<Stream>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
}

export const ListStreamsResponse: Schema.Schema<ListStreamsResponse> = Schema.suspend(() => Schema.Struct({
  streams: Schema.optional(Schema.Array(Stream)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListStreamsResponse" }) as any as Schema.Schema<ListStreamsResponse>;

export interface FetchErrorsRequest {
}

export const FetchErrorsRequest: Schema.Schema<FetchErrorsRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "FetchErrorsRequest" }) as any as Schema.Schema<FetchErrorsRequest>;

export interface BackfillJob {
  /** Backfill job state. */
  state?: "STATE_UNSPECIFIED" | "NOT_STARTED" | "PENDING" | "ACTIVE" | "STOPPED" | "FAILED" | "COMPLETED" | "UNSUPPORTED" | (string & {});
  /** Backfill job's triggering reason. */
  trigger?: "TRIGGER_UNSPECIFIED" | "AUTOMATIC" | "MANUAL" | (string & {});
  /** Output only. Backfill job's start time. */
  lastStartTime?: string;
  /** Output only. Backfill job's end time. */
  lastEndTime?: string;
  /** Output only. Errors which caused the backfill job to fail. */
  errors?: Array<Datastream_Error>;
}

export const BackfillJob: Schema.Schema<BackfillJob> = Schema.suspend(() => Schema.Struct({
  state: Schema.optional(Schema.String),
  trigger: Schema.optional(Schema.String),
  lastStartTime: Schema.optional(Schema.String),
  lastEndTime: Schema.optional(Schema.String),
  errors: Schema.optional(Schema.Array(Datastream_Error)),
})).annotate({ identifier: "BackfillJob" }) as any as Schema.Schema<BackfillJob>;

export interface OracleObjectIdentifier {
  /** Required. The schema name. */
  schema?: string;
  /** Required. The table name. */
  table?: string;
}

export const OracleObjectIdentifier: Schema.Schema<OracleObjectIdentifier> = Schema.suspend(() => Schema.Struct({
  schema: Schema.optional(Schema.String),
  table: Schema.optional(Schema.String),
})).annotate({ identifier: "OracleObjectIdentifier" }) as any as Schema.Schema<OracleObjectIdentifier>;

export interface MysqlObjectIdentifier {
  /** Required. The database name. */
  database?: string;
  /** Required. The table name. */
  table?: string;
}

export const MysqlObjectIdentifier: Schema.Schema<MysqlObjectIdentifier> = Schema.suspend(() => Schema.Struct({
  database: Schema.optional(Schema.String),
  table: Schema.optional(Schema.String),
})).annotate({ identifier: "MysqlObjectIdentifier" }) as any as Schema.Schema<MysqlObjectIdentifier>;

export interface SourceObjectIdentifier {
  /** Oracle data source object identifier. */
  oracleIdentifier?: OracleObjectIdentifier;
  /** Mysql data source object identifier. */
  mysqlIdentifier?: MysqlObjectIdentifier;
}

export const SourceObjectIdentifier: Schema.Schema<SourceObjectIdentifier> = Schema.suspend(() => Schema.Struct({
  oracleIdentifier: Schema.optional(OracleObjectIdentifier),
  mysqlIdentifier: Schema.optional(MysqlObjectIdentifier),
})).annotate({ identifier: "SourceObjectIdentifier" }) as any as Schema.Schema<SourceObjectIdentifier>;

export interface StreamObject {
  /** Output only. The object's name. */
  name?: string;
  /** Output only. The creation time of the object. */
  createTime?: string;
  /** Output only. The last update time of the object. */
  updateTime?: string;
  /** Required. Display name. */
  displayName?: string;
  /** Output only. Active errors on the object. */
  errors?: Array<Datastream_Error>;
  /** The latest backfill job that was initiated for the stream object. */
  backfillJob?: BackfillJob;
  /** The object identifier in the data source. */
  sourceObject?: SourceObjectIdentifier;
}

export const StreamObject: Schema.Schema<StreamObject> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  errors: Schema.optional(Schema.Array(Datastream_Error)),
  backfillJob: Schema.optional(BackfillJob),
  sourceObject: Schema.optional(SourceObjectIdentifier),
})).annotate({ identifier: "StreamObject" }) as any as Schema.Schema<StreamObject>;

export interface ListStreamObjectsResponse {
  /** List of stream objects. */
  streamObjects?: Array<StreamObject>;
  /** A token, which can be sent as `page_token` to retrieve the next page. */
  nextPageToken?: string;
}

export const ListStreamObjectsResponse: Schema.Schema<ListStreamObjectsResponse> = Schema.suspend(() => Schema.Struct({
  streamObjects: Schema.optional(Schema.Array(StreamObject)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListStreamObjectsResponse" }) as any as Schema.Schema<ListStreamObjectsResponse>;

export interface StartBackfillJobResponse {
  /** The stream object resource a backfill job was started for. */
  object?: StreamObject;
}

export const StartBackfillJobResponse: Schema.Schema<StartBackfillJobResponse> = Schema.suspend(() => Schema.Struct({
  object: Schema.optional(StreamObject),
})).annotate({ identifier: "StartBackfillJobResponse" }) as any as Schema.Schema<StartBackfillJobResponse>;

export interface StopBackfillJobResponse {
  /** The stream object resource the backfill job was stopped for. */
  object?: StreamObject;
}

export const StopBackfillJobResponse: Schema.Schema<StopBackfillJobResponse> = Schema.suspend(() => Schema.Struct({
  object: Schema.optional(StreamObject),
})).annotate({ identifier: "StopBackfillJobResponse" }) as any as Schema.Schema<StopBackfillJobResponse>;

export interface FetchStaticIpsResponse {
  /** list of static ips by account */
  staticIps?: Array<string>;
  /** A token that can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const FetchStaticIpsResponse: Schema.Schema<FetchStaticIpsResponse> = Schema.suspend(() => Schema.Struct({
  staticIps: Schema.optional(Schema.Array(Schema.String)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "FetchStaticIpsResponse" }) as any as Schema.Schema<FetchStaticIpsResponse>;

export interface VpcPeeringConfig {
  /** Required. fully qualified name of the VPC Datastream will peer to. */
  vpcName?: string;
  /** Required. A free subnet for peering. (CIDR of /29) */
  subnet?: string;
}

export const VpcPeeringConfig: Schema.Schema<VpcPeeringConfig> = Schema.suspend(() => Schema.Struct({
  vpcName: Schema.optional(Schema.String),
  subnet: Schema.optional(Schema.String),
})).annotate({ identifier: "VpcPeeringConfig" }) as any as Schema.Schema<VpcPeeringConfig>;

export interface PrivateConnection {
  /** Output only. The resource's name. */
  name?: string;
  /** Output only. The create time of the resource. */
  createTime?: string;
  /** Output only. The update time of the resource. */
  updateTime?: string;
  /** Labels. */
  labels?: Record<string, string>;
  /** Required. Display name. */
  displayName?: string;
  /** Output only. The state of the Private Connection. */
  state?: "STATE_UNSPECIFIED" | "CREATING" | "CREATED" | "FAILED" | "DELETING" | "FAILED_TO_DELETE" | (string & {});
  /** Output only. In case of error, the details of the error in a user-friendly format. */
  error?: Datastream_Error;
  /** VPC Peering Config */
  vpcPeeringConfig?: VpcPeeringConfig;
}

export const PrivateConnection: Schema.Schema<PrivateConnection> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  displayName: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  error: Schema.optional(Datastream_Error),
  vpcPeeringConfig: Schema.optional(VpcPeeringConfig),
})).annotate({ identifier: "PrivateConnection" }) as any as Schema.Schema<PrivateConnection>;

export interface ListPrivateConnectionsResponse {
  /** List of private connectivity configurations. */
  privateConnections?: Array<PrivateConnection>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
}

export const ListPrivateConnectionsResponse: Schema.Schema<ListPrivateConnectionsResponse> = Schema.suspend(() => Schema.Struct({
  privateConnections: Schema.optional(Schema.Array(PrivateConnection)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListPrivateConnectionsResponse" }) as any as Schema.Schema<ListPrivateConnectionsResponse>;

export interface Route {
  /** Output only. The resource's name. */
  name?: string;
  /** Output only. The create time of the resource. */
  createTime?: string;
  /** Output only. The update time of the resource. */
  updateTime?: string;
  /** Labels. */
  labels?: Record<string, string>;
  /** Required. Display name. */
  displayName?: string;
  /** Required. Destination address for connection */
  destinationAddress?: string;
  /** Destination port for connection */
  destinationPort?: number;
}

export const Route: Schema.Schema<Route> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  displayName: Schema.optional(Schema.String),
  destinationAddress: Schema.optional(Schema.String),
  destinationPort: Schema.optional(Schema.Number),
})).annotate({ identifier: "Route" }) as any as Schema.Schema<Route>;

export interface ListRoutesResponse {
  /** List of Routes. */
  routes?: Array<Route>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
}

export const ListRoutesResponse: Schema.Schema<ListRoutesResponse> = Schema.suspend(() => Schema.Struct({
  routes: Schema.optional(Schema.Array(Route)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListRoutesResponse" }) as any as Schema.Schema<ListRoutesResponse>;

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

export interface ValidationMessage {
  /** The result of the validation. */
  message?: string;
  /** Message severity level (warning or error). */
  level?: "LEVEL_UNSPECIFIED" | "WARNING" | "ERROR" | (string & {});
  /** Additional metadata related to the result. */
  metadata?: Record<string, string>;
  /** A custom code identifying this specific message. */
  code?: string;
}

export const ValidationMessage: Schema.Schema<ValidationMessage> = Schema.suspend(() => Schema.Struct({
  message: Schema.optional(Schema.String),
  level: Schema.optional(Schema.String),
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  code: Schema.optional(Schema.String),
})).annotate({ identifier: "ValidationMessage" }) as any as Schema.Schema<ValidationMessage>;

export interface Validation {
  /** A short description of the validation. */
  description?: string;
  /** Validation execution status. */
  status?: "STATUS_UNSPECIFIED" | "NOT_EXECUTED" | "FAILED" | "PASSED" | (string & {});
  /** Messages reflecting the validation results. */
  message?: Array<ValidationMessage>;
  /** A custom code identifying this validation. */
  code?: string;
}

export const Validation: Schema.Schema<Validation> = Schema.suspend(() => Schema.Struct({
  description: Schema.optional(Schema.String),
  status: Schema.optional(Schema.String),
  message: Schema.optional(Schema.Array(ValidationMessage)),
  code: Schema.optional(Schema.String),
})).annotate({ identifier: "Validation" }) as any as Schema.Schema<Validation>;

export interface ValidationResult {
  /** A list of validations (includes both executed as well as not executed validations). */
  validations?: Array<Validation>;
}

export const ValidationResult: Schema.Schema<ValidationResult> = Schema.suspend(() => Schema.Struct({
  validations: Schema.optional(Schema.Array(Validation)),
})).annotate({ identifier: "ValidationResult" }) as any as Schema.Schema<ValidationResult>;

export interface OperationMetadata {
  /** Output only. The time the operation was created. */
  createTime?: string;
  /** Output only. The time the operation finished running. */
  endTime?: string;
  /** Output only. Server-defined resource path for the target of the operation. */
  target?: string;
  /** Output only. Name of the verb executed by the operation. */
  verb?: string;
  /** Output only. Human-readable status of the operation, if any. */
  statusMessage?: string;
  /** Output only. Identifies whether the user has requested cancellation of the operation. Operations that have successfully been cancelled have google.longrunning.Operation.error value with a google.rpc.Status.code of 1, corresponding to `Code.CANCELLED`. */
  requestedCancellation?: boolean;
  /** Output only. API version used to start the operation. */
  apiVersion?: string;
  /** Output only. Results of executed validations if there are any. */
  validationResult?: ValidationResult;
}

export const OperationMetadata: Schema.Schema<OperationMetadata> = Schema.suspend(() => Schema.Struct({
  createTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
  target: Schema.optional(Schema.String),
  verb: Schema.optional(Schema.String),
  statusMessage: Schema.optional(Schema.String),
  requestedCancellation: Schema.optional(Schema.Boolean),
  apiVersion: Schema.optional(Schema.String),
  validationResult: Schema.optional(ValidationResult),
})).annotate({ identifier: "OperationMetadata" }) as any as Schema.Schema<OperationMetadata>;

export interface FetchErrorsResponse {
  /** The list of errors on the Stream. */
  errors?: Array<Datastream_Error>;
}

export const FetchErrorsResponse: Schema.Schema<FetchErrorsResponse> = Schema.suspend(() => Schema.Struct({
  errors: Schema.optional(Schema.Array(Datastream_Error)),
})).annotate({ identifier: "FetchErrorsResponse" }) as any as Schema.Schema<FetchErrorsResponse>;

export interface LocalizedMessage {
  /** The locale used following the specification defined at https://www.rfc-editor.org/rfc/bcp/bcp47.txt. Examples are: "en-US", "fr-CH", "es-MX" */
  locale?: string;
  /** The localized error message in the above locale. */
  message?: string;
}

export const LocalizedMessage: Schema.Schema<LocalizedMessage> = Schema.suspend(() => Schema.Struct({
  locale: Schema.optional(Schema.String),
  message: Schema.optional(Schema.String),
})).annotate({ identifier: "LocalizedMessage" }) as any as Schema.Schema<LocalizedMessage>;

export interface FieldViolation {
  /** A path that leads to a field in the request body. The value will be a sequence of dot-separated identifiers that identify a protocol buffer field. Consider the following: message CreateContactRequest { message EmailAddress { enum Type { TYPE_UNSPECIFIED = 0; HOME = 1; WORK = 2; } optional string email = 1; repeated EmailType type = 2; } string full_name = 1; repeated EmailAddress email_addresses = 2; } In this example, in proto `field` could take one of the following values: * `full_name` for a violation in the `full_name` value * `email_addresses[1].email` for a violation in the `email` field of the first `email_addresses` message * `email_addresses[3].type[2]` for a violation in the second `type` value in the third `email_addresses` message. In JSON, the same values are represented as: * `fullName` for a violation in the `fullName` value * `emailAddresses[1].email` for a violation in the `email` field of the first `emailAddresses` message * `emailAddresses[3].type[2]` for a violation in the second `type` value in the third `emailAddresses` message. */
  field?: string;
  /** A description of why the request element is bad. */
  description?: string;
  /** The reason of the field-level error. This is a constant value that identifies the proximate cause of the field-level error. It should uniquely identify the type of the FieldViolation within the scope of the google.rpc.ErrorInfo.domain. This should be at most 63 characters and match a regular expression of `A-Z+[A-Z0-9]`, which represents UPPER_SNAKE_CASE. */
  reason?: string;
  /** Provides a localized error message for field-level errors that is safe to return to the API consumer. */
  localizedMessage?: LocalizedMessage;
}

export const FieldViolation: Schema.Schema<FieldViolation> = Schema.suspend(() => Schema.Struct({
  field: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  reason: Schema.optional(Schema.String),
  localizedMessage: Schema.optional(LocalizedMessage),
})).annotate({ identifier: "FieldViolation" }) as any as Schema.Schema<FieldViolation>;

export interface BadRequest {
  /** Describes all violations in a client request. */
  fieldViolations?: Array<FieldViolation>;
}

export const BadRequest: Schema.Schema<BadRequest> = Schema.suspend(() => Schema.Struct({
  fieldViolations: Schema.optional(Schema.Array(FieldViolation)),
})).annotate({ identifier: "BadRequest" }) as any as Schema.Schema<BadRequest>;

export interface DebugInfo {
  /** The stack trace entries indicating where the error occurred. */
  stackEntries?: Array<string>;
  /** Additional debugging information provided by the server. */
  detail?: string;
}

export const DebugInfo: Schema.Schema<DebugInfo> = Schema.suspend(() => Schema.Struct({
  stackEntries: Schema.optional(Schema.Array(Schema.String)),
  detail: Schema.optional(Schema.String),
})).annotate({ identifier: "DebugInfo" }) as any as Schema.Schema<DebugInfo>;

export interface ErrorInfo {
  /** The reason of the error. This is a constant value that identifies the proximate cause of the error. Error reasons are unique within a particular domain of errors. This should be at most 63 characters and match a regular expression of `A-Z+[A-Z0-9]`, which represents UPPER_SNAKE_CASE. */
  reason?: string;
  /** The logical grouping to which the "reason" belongs. The error domain is typically the registered service name of the tool or product that generates the error. Example: "pubsub.googleapis.com". If the error is generated by some common infrastructure, the error domain must be a globally unique value that identifies the infrastructure. For Google API infrastructure, the error domain is "googleapis.com". */
  domain?: string;
  /** Additional structured details about this error. Keys must match a regular expression of `a-z+` but should ideally be lowerCamelCase. Also, they must be limited to 64 characters in length. When identifying the current value of an exceeded limit, the units should be contained in the key, not the value. For example, rather than `{"instanceLimit": "100/request"}`, should be returned as, `{"instanceLimitPerRequest": "100"}`, if the client exceeds the number of instances that can be created in a single (batch) request. */
  metadata?: Record<string, string>;
}

export const ErrorInfo: Schema.Schema<ErrorInfo> = Schema.suspend(() => Schema.Struct({
  reason: Schema.optional(Schema.String),
  domain: Schema.optional(Schema.String),
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "ErrorInfo" }) as any as Schema.Schema<ErrorInfo>;

export interface Link {
  /** Describes what the link offers. */
  description?: string;
  /** The URL of the link. */
  url?: string;
}

export const Link: Schema.Schema<Link> = Schema.suspend(() => Schema.Struct({
  description: Schema.optional(Schema.String),
  url: Schema.optional(Schema.String),
})).annotate({ identifier: "Link" }) as any as Schema.Schema<Link>;

export interface Help {
  /** URL(s) pointing to additional information on handling the current error. */
  links?: Array<Link>;
}

export const Help: Schema.Schema<Help> = Schema.suspend(() => Schema.Struct({
  links: Schema.optional(Schema.Array(Link)),
})).annotate({ identifier: "Help" }) as any as Schema.Schema<Help>;

export interface PreconditionFailureViolation {
  /** The type of PreconditionFailure. We recommend using a service-specific enum type to define the supported precondition violation subjects. For example, "TOS" for "Terms of Service violation". */
  type?: string;
  /** The subject, relative to the type, that failed. For example, "google.com/cloud" relative to the "TOS" type would indicate which terms of service is being referenced. */
  subject?: string;
  /** A description of how the precondition failed. Developers can use this description to understand how to fix the failure. For example: "Terms of service not accepted". */
  description?: string;
}

export const PreconditionFailureViolation: Schema.Schema<PreconditionFailureViolation> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
  subject: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
})).annotate({ identifier: "PreconditionFailureViolation" }) as any as Schema.Schema<PreconditionFailureViolation>;

export interface PreconditionFailure {
  /** Describes all precondition violations. */
  violations?: Array<PreconditionFailureViolation>;
}

export const PreconditionFailure: Schema.Schema<PreconditionFailure> = Schema.suspend(() => Schema.Struct({
  violations: Schema.optional(Schema.Array(PreconditionFailureViolation)),
})).annotate({ identifier: "PreconditionFailure" }) as any as Schema.Schema<PreconditionFailure>;

export interface QuotaFailureViolation {
  /** The subject on which the quota check failed. For example, "clientip:" or "project:". */
  subject?: string;
  /** A description of how the quota check failed. Clients can use this description to find more about the quota configuration in the service's public documentation, or find the relevant quota limit to adjust through developer console. For example: "Service disabled" or "Daily Limit for read operations exceeded". */
  description?: string;
  /** The API Service from which the `QuotaFailure.Violation` orginates. In some cases, Quota issues originate from an API Service other than the one that was called. In other words, a dependency of the called API Service could be the cause of the `QuotaFailure`, and this field would have the dependency API service name. For example, if the called API is Kubernetes Engine API (container.googleapis.com), and a quota violation occurs in the Kubernetes Engine API itself, this field would be "container.googleapis.com". On the other hand, if the quota violation occurs when the Kubernetes Engine API creates VMs in the Compute Engine API (compute.googleapis.com), this field would be "compute.googleapis.com". */
  apiService?: string;
  /** The metric of the violated quota. A quota metric is a named counter to measure usage, such as API requests or CPUs. When an activity occurs in a service, such as Virtual Machine allocation, one or more quota metrics may be affected. For example, "compute.googleapis.com/cpus_per_vm_family", "storage.googleapis.com/internet_egress_bandwidth". */
  quotaMetric?: string;
  /** The id of the violated quota. Also know as "limit name", this is the unique identifier of a quota in the context of an API service. For example, "CPUS-PER-VM-FAMILY-per-project-region". */
  quotaId?: string;
  /** The dimensions of the violated quota. Every non-global quota is enforced on a set of dimensions. While quota metric defines what to count, the dimensions specify for what aspects the counter should be increased. For example, the quota "CPUs per region per VM family" enforces a limit on the metric "compute.googleapis.com/cpus_per_vm_family" on dimensions "region" and "vm_family". And if the violation occurred in region "us-central1" and for VM family "n1", the quota_dimensions would be, { "region": "us-central1", "vm_family": "n1", } When a quota is enforced globally, the quota_dimensions would always be empty. */
  quotaDimensions?: Record<string, string>;
  /** The enforced quota value at the time of the `QuotaFailure`. For example, if the enforced quota value at the time of the `QuotaFailure` on the number of CPUs is "10", then the value of this field would reflect this quantity. */
  quotaValue?: string;
  /** The new quota value being rolled out at the time of the violation. At the completion of the rollout, this value will be enforced in place of quota_value. If no rollout is in progress at the time of the violation, this field is not set. For example, if at the time of the violation a rollout is in progress changing the number of CPUs quota from 10 to 20, 20 would be the value of this field. */
  futureQuotaValue?: string;
}

export const QuotaFailureViolation: Schema.Schema<QuotaFailureViolation> = Schema.suspend(() => Schema.Struct({
  subject: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  apiService: Schema.optional(Schema.String),
  quotaMetric: Schema.optional(Schema.String),
  quotaId: Schema.optional(Schema.String),
  quotaDimensions: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  quotaValue: Schema.optional(Schema.String),
  futureQuotaValue: Schema.optional(Schema.String),
})).annotate({ identifier: "QuotaFailureViolation" }) as any as Schema.Schema<QuotaFailureViolation>;

export interface QuotaFailure {
  /** Describes all quota violations. */
  violations?: Array<QuotaFailureViolation>;
}

export const QuotaFailure: Schema.Schema<QuotaFailure> = Schema.suspend(() => Schema.Struct({
  violations: Schema.optional(Schema.Array(QuotaFailureViolation)),
})).annotate({ identifier: "QuotaFailure" }) as any as Schema.Schema<QuotaFailure>;

export interface RequestInfo {
  /** An opaque string that should only be interpreted by the service generating it. For example, it can be used to identify requests in the service's logs. */
  requestId?: string;
  /** Any data that was used to serve this request. For example, an encrypted stack trace that can be sent back to the service provider for debugging. */
  servingData?: string;
}

export const RequestInfo: Schema.Schema<RequestInfo> = Schema.suspend(() => Schema.Struct({
  requestId: Schema.optional(Schema.String),
  servingData: Schema.optional(Schema.String),
})).annotate({ identifier: "RequestInfo" }) as any as Schema.Schema<RequestInfo>;

export interface ResourceInfo {
  /** A name for the type of resource being accessed, e.g. "sql table", "cloud storage bucket", "file", "Google calendar"; or the type URL of the resource: e.g. "type.googleapis.com/google.pubsub.v1.Topic". */
  resourceType?: string;
  /** The name of the resource being accessed. For example, a shared calendar name: "example.com_4fghdhgsrgh@group.calendar.google.com", if the current error is google.rpc.Code.PERMISSION_DENIED. */
  resourceName?: string;
  /** The owner of the resource (optional). For example, "user:" or "project:". */
  owner?: string;
  /** Describes what error is encountered when accessing this resource. For example, updating a cloud project may require the `writer` permission on the developer console project. */
  description?: string;
}

export const ResourceInfo: Schema.Schema<ResourceInfo> = Schema.suspend(() => Schema.Struct({
  resourceType: Schema.optional(Schema.String),
  resourceName: Schema.optional(Schema.String),
  owner: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
})).annotate({ identifier: "ResourceInfo" }) as any as Schema.Schema<ResourceInfo>;

export interface RetryInfo {
  /** Clients should wait at least this long between retrying the same request. */
  retryDelay?: string;
}

export const RetryInfo: Schema.Schema<RetryInfo> = Schema.suspend(() => Schema.Struct({
  retryDelay: Schema.optional(Schema.String),
})).annotate({ identifier: "RetryInfo" }) as any as Schema.Schema<RetryInfo>;

// ==========================================================================
// Operations
// ==========================================================================

export interface FetchStaticIpsProjectsLocationsRequest {
  /** Required. The name resource of the Response type. Must be in the format `projects/* /locations/*`. */
  name: string;
  /** Maximum number of Ips to return, will likely not be specified. */
  pageSize?: number;
  /** A page token, received from a previous `ListStaticIps` call. will likely not be specified. */
  pageToken?: string;
}

export const FetchStaticIpsProjectsLocationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1alpha1/projects/{projectsId}/locations/{locationsId}:fetchStaticIps" }),
  svc,
) as unknown as Schema.Schema<FetchStaticIpsProjectsLocationsRequest>;

export type FetchStaticIpsProjectsLocationsResponse = FetchStaticIpsResponse;
export const FetchStaticIpsProjectsLocationsResponse = FetchStaticIpsResponse;

export type FetchStaticIpsProjectsLocationsError = CommonErrors;

/** The FetchStaticIps API call exposes the static IP addresses used by Datastream. */
export const fetchStaticIpsProjectsLocations: API.PaginatedOperationMethod<FetchStaticIpsProjectsLocationsRequest, FetchStaticIpsProjectsLocationsResponse, FetchStaticIpsProjectsLocationsError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: FetchStaticIpsProjectsLocationsRequest,
  output: FetchStaticIpsProjectsLocationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

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
  T.Http({ method: "GET", path: "v1alpha1/projects/{projectsId}/locations" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsRequest>;

export type ListProjectsLocationsResponse = ListLocationsResponse;
export const ListProjectsLocationsResponse = ListLocationsResponse;

export type ListProjectsLocationsError = CommonErrors;

/** Lists information about the supported locations for this service. This method can be called in two ways: * **List all public locations:** Use the path `GET /v1/locations`. * **List project-visible locations:** Use the path `GET /v1/projects/{project_id}/locations`. This may include public locations as well as private or other locations specifically visible to the project. */
export const listProjectsLocations: API.PaginatedOperationMethod<ListProjectsLocationsRequest, ListProjectsLocationsResponse, ListProjectsLocationsError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsLocationsRequest,
  output: ListProjectsLocationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsLocationsRequest {
  /** Resource name for the location. */
  name: string;
}

export const GetProjectsLocationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1alpha1/projects/{projectsId}/locations/{locationsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsRequest>;

export type GetProjectsLocationsResponse = Location;
export const GetProjectsLocationsResponse = Location;

export type GetProjectsLocationsError = CommonErrors;

/** Gets information about a location. */
export const getProjectsLocations: API.OperationMethod<GetProjectsLocationsRequest, GetProjectsLocationsResponse, GetProjectsLocationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsRequest,
  output: GetProjectsLocationsResponse,
  errors: [],
}));

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
  T.Http({ method: "GET", path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/operations" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsOperationsRequest>;

export type ListProjectsLocationsOperationsResponse = ListOperationsResponse;
export const ListProjectsLocationsOperationsResponse = ListOperationsResponse;

export type ListProjectsLocationsOperationsError = CommonErrors;

/** Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns `UNIMPLEMENTED`. */
export const listProjectsLocationsOperations: API.PaginatedOperationMethod<ListProjectsLocationsOperationsRequest, ListProjectsLocationsOperationsResponse, ListProjectsLocationsOperationsError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsLocationsOperationsRequest,
  output: ListProjectsLocationsOperationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsLocationsOperationsRequest {
  /** The name of the operation resource. */
  name: string;
}

export const GetProjectsLocationsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/operations/{operationsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsOperationsRequest>;

export type GetProjectsLocationsOperationsResponse = Operation;
export const GetProjectsLocationsOperationsResponse = Operation;

export type GetProjectsLocationsOperationsError = CommonErrors;

/** Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service. */
export const getProjectsLocationsOperations: API.OperationMethod<GetProjectsLocationsOperationsRequest, GetProjectsLocationsOperationsResponse, GetProjectsLocationsOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsOperationsRequest,
  output: GetProjectsLocationsOperationsResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsOperationsRequest {
  /** The name of the operation resource to be deleted. */
  name: string;
}

export const DeleteProjectsLocationsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/operations/{operationsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsOperationsRequest>;

export type DeleteProjectsLocationsOperationsResponse = Empty;
export const DeleteProjectsLocationsOperationsResponse = Empty;

export type DeleteProjectsLocationsOperationsError = CommonErrors;

/** Deletes a long-running operation. This method indicates that the client is no longer interested in the operation result. It does not cancel the operation. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. */
export const deleteProjectsLocationsOperations: API.OperationMethod<DeleteProjectsLocationsOperationsRequest, DeleteProjectsLocationsOperationsResponse, DeleteProjectsLocationsOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsOperationsRequest,
  output: DeleteProjectsLocationsOperationsResponse,
  errors: [],
}));

export interface CancelProjectsLocationsOperationsRequest {
  /** The name of the operation resource to be cancelled. */
  name: string;
  /** Request body */
  body?: CancelOperationRequest;
}

export const CancelProjectsLocationsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(CancelOperationRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/operations/{operationsId}:cancel", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CancelProjectsLocationsOperationsRequest>;

export type CancelProjectsLocationsOperationsResponse = Empty;
export const CancelProjectsLocationsOperationsResponse = Empty;

export type CancelProjectsLocationsOperationsError = CommonErrors;

/** Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`. */
export const cancelProjectsLocationsOperations: API.OperationMethod<CancelProjectsLocationsOperationsRequest, CancelProjectsLocationsOperationsResponse, CancelProjectsLocationsOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CancelProjectsLocationsOperationsRequest,
  output: CancelProjectsLocationsOperationsResponse,
  errors: [],
}));

export interface ListProjectsLocationsConnectionProfilesRequest {
  /** Required. The parent that owns the collection of connection profiles. */
  parent: string;
  /** Maximum number of connection profiles to return. If unspecified, at most 50 connection profiles will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. */
  pageSize?: number;
  /** Page token received from a previous `ListConnectionProfiles` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListConnectionProfiles` must match the call that provided the page token. */
  pageToken?: string;
  /** Filter request. */
  filter?: string;
  /** Order by fields for the result. */
  orderBy?: string;
}

export const ListProjectsLocationsConnectionProfilesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/connectionProfiles" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsConnectionProfilesRequest>;

export type ListProjectsLocationsConnectionProfilesResponse = ListConnectionProfilesResponse;
export const ListProjectsLocationsConnectionProfilesResponse = ListConnectionProfilesResponse;

export type ListProjectsLocationsConnectionProfilesError = CommonErrors;

/** Use this method to list connection profiles created in a project and location. */
export const listProjectsLocationsConnectionProfiles: API.PaginatedOperationMethod<ListProjectsLocationsConnectionProfilesRequest, ListProjectsLocationsConnectionProfilesResponse, ListProjectsLocationsConnectionProfilesError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsLocationsConnectionProfilesRequest,
  output: ListProjectsLocationsConnectionProfilesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsLocationsConnectionProfilesRequest {
  /** Required. The name of the connection profile resource to get. */
  name: string;
}

export const GetProjectsLocationsConnectionProfilesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/connectionProfiles/{connectionProfilesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsConnectionProfilesRequest>;

export type GetProjectsLocationsConnectionProfilesResponse = ConnectionProfile;
export const GetProjectsLocationsConnectionProfilesResponse = ConnectionProfile;

export type GetProjectsLocationsConnectionProfilesError = CommonErrors;

/** Use this method to get details about a connection profile. */
export const getProjectsLocationsConnectionProfiles: API.OperationMethod<GetProjectsLocationsConnectionProfilesRequest, GetProjectsLocationsConnectionProfilesResponse, GetProjectsLocationsConnectionProfilesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsConnectionProfilesRequest,
  output: GetProjectsLocationsConnectionProfilesResponse,
  errors: [],
}));

export interface CreateProjectsLocationsConnectionProfilesRequest {
  /** Required. The parent that owns the collection of ConnectionProfiles. */
  parent: string;
  /** Required. The connection profile identifier. */
  connectionProfileId?: string;
  /** Optional. A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Request body */
  body?: ConnectionProfile;
}

export const CreateProjectsLocationsConnectionProfilesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  connectionProfileId: Schema.optional(Schema.String).pipe(T.HttpQuery("connectionProfileId")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  body: Schema.optional(ConnectionProfile).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/connectionProfiles", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsConnectionProfilesRequest>;

export type CreateProjectsLocationsConnectionProfilesResponse = Operation;
export const CreateProjectsLocationsConnectionProfilesResponse = Operation;

export type CreateProjectsLocationsConnectionProfilesError = CommonErrors;

/** Use this method to create a connection profile in a project and location. */
export const createProjectsLocationsConnectionProfiles: API.OperationMethod<CreateProjectsLocationsConnectionProfilesRequest, CreateProjectsLocationsConnectionProfilesResponse, CreateProjectsLocationsConnectionProfilesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsConnectionProfilesRequest,
  output: CreateProjectsLocationsConnectionProfilesResponse,
  errors: [],
}));

export interface PatchProjectsLocationsConnectionProfilesRequest {
  /** Output only. The resource's name. */
  name: string;
  /** Optional. Field mask is used to specify the fields to be overwritten in the ConnectionProfile resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then all fields will be overwritten. */
  updateMask?: string;
  /** Optional. A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Optional. Only validate the connection profile, but do not update any resources. The default is false. */
  validateOnly?: boolean;
  /** Request body */
  body?: ConnectionProfile;
}

export const PatchProjectsLocationsConnectionProfilesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  validateOnly: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("validateOnly")),
  body: Schema.optional(ConnectionProfile).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/connectionProfiles/{connectionProfilesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsConnectionProfilesRequest>;

export type PatchProjectsLocationsConnectionProfilesResponse = Operation;
export const PatchProjectsLocationsConnectionProfilesResponse = Operation;

export type PatchProjectsLocationsConnectionProfilesError = CommonErrors;

/** Use this method to update the parameters of a connection profile. */
export const patchProjectsLocationsConnectionProfiles: API.OperationMethod<PatchProjectsLocationsConnectionProfilesRequest, PatchProjectsLocationsConnectionProfilesResponse, PatchProjectsLocationsConnectionProfilesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsConnectionProfilesRequest,
  output: PatchProjectsLocationsConnectionProfilesResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsConnectionProfilesRequest {
  /** Required. The name of the connection profile resource to delete. */
  name: string;
  /** Optional. A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
}

export const DeleteProjectsLocationsConnectionProfilesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/connectionProfiles/{connectionProfilesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsConnectionProfilesRequest>;

export type DeleteProjectsLocationsConnectionProfilesResponse = Operation;
export const DeleteProjectsLocationsConnectionProfilesResponse = Operation;

export type DeleteProjectsLocationsConnectionProfilesError = CommonErrors;

/** Use this method to delete a connection profile.. */
export const deleteProjectsLocationsConnectionProfiles: API.OperationMethod<DeleteProjectsLocationsConnectionProfilesRequest, DeleteProjectsLocationsConnectionProfilesResponse, DeleteProjectsLocationsConnectionProfilesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsConnectionProfilesRequest,
  output: DeleteProjectsLocationsConnectionProfilesResponse,
  errors: [],
}));

export interface DiscoverProjectsLocationsConnectionProfilesRequest {
  /** Required. The parent resource of the ConnectionProfile type. Must be in the format `projects/* /locations/*`. */
  parent: string;
  /** Request body */
  body?: DiscoverConnectionProfileRequest;
}

export const DiscoverProjectsLocationsConnectionProfilesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(DiscoverConnectionProfileRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/connectionProfiles:discover", hasBody: true }),
  svc,
) as unknown as Schema.Schema<DiscoverProjectsLocationsConnectionProfilesRequest>;

export type DiscoverProjectsLocationsConnectionProfilesResponse = DiscoverConnectionProfileResponse;
export const DiscoverProjectsLocationsConnectionProfilesResponse = DiscoverConnectionProfileResponse;

export type DiscoverProjectsLocationsConnectionProfilesError = CommonErrors;

/** Use this method to discover a connection profile. The discover API call exposes the data objects and metadata belonging to the profile. Typically, a request returns children data objects under a parent data object that's optionally supplied in the request. */
export const discoverProjectsLocationsConnectionProfiles: API.OperationMethod<DiscoverProjectsLocationsConnectionProfilesRequest, DiscoverProjectsLocationsConnectionProfilesResponse, DiscoverProjectsLocationsConnectionProfilesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DiscoverProjectsLocationsConnectionProfilesRequest,
  output: DiscoverProjectsLocationsConnectionProfilesResponse,
  errors: [],
}));

export interface ListProjectsLocationsStreamsRequest {
  /** Required. The parent that owns the collection of streams. */
  parent: string;
  /** Maximum number of streams to return. If unspecified, at most 50 streams will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. */
  pageSize?: number;
  /** Page token received from a previous `ListStreams` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListStreams` must match the call that provided the page token. */
  pageToken?: string;
  /** Filter request. */
  filter?: string;
  /** Order by fields for the result. */
  orderBy?: string;
}

export const ListProjectsLocationsStreamsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/streams" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsStreamsRequest>;

export type ListProjectsLocationsStreamsResponse = ListStreamsResponse;
export const ListProjectsLocationsStreamsResponse = ListStreamsResponse;

export type ListProjectsLocationsStreamsError = CommonErrors;

/** Use this method to list streams in a project and location. */
export const listProjectsLocationsStreams: API.PaginatedOperationMethod<ListProjectsLocationsStreamsRequest, ListProjectsLocationsStreamsResponse, ListProjectsLocationsStreamsError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsLocationsStreamsRequest,
  output: ListProjectsLocationsStreamsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsLocationsStreamsRequest {
  /** Required. The name of the stream resource to get. */
  name: string;
}

export const GetProjectsLocationsStreamsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/streams/{streamsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsStreamsRequest>;

export type GetProjectsLocationsStreamsResponse = Stream;
export const GetProjectsLocationsStreamsResponse = Stream;

export type GetProjectsLocationsStreamsError = CommonErrors;

/** Use this method to get details about a stream. */
export const getProjectsLocationsStreams: API.OperationMethod<GetProjectsLocationsStreamsRequest, GetProjectsLocationsStreamsResponse, GetProjectsLocationsStreamsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsStreamsRequest,
  output: GetProjectsLocationsStreamsResponse,
  errors: [],
}));

export interface CreateProjectsLocationsStreamsRequest {
  /** Required. The parent that owns the collection of streams. */
  parent: string;
  /** Required. The stream identifier. */
  streamId?: string;
  /** Optional. A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Optional. Only validate the stream, but do not create any resources. The default is false. */
  validateOnly?: boolean;
  /** Optional. Create the stream without validating it. */
  force?: boolean;
  /** Request body */
  body?: Stream;
}

export const CreateProjectsLocationsStreamsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  streamId: Schema.optional(Schema.String).pipe(T.HttpQuery("streamId")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  validateOnly: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("validateOnly")),
  force: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("force")),
  body: Schema.optional(Stream).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/streams", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsStreamsRequest>;

export type CreateProjectsLocationsStreamsResponse = Operation;
export const CreateProjectsLocationsStreamsResponse = Operation;

export type CreateProjectsLocationsStreamsError = CommonErrors;

/** Use this method to create a stream. */
export const createProjectsLocationsStreams: API.OperationMethod<CreateProjectsLocationsStreamsRequest, CreateProjectsLocationsStreamsResponse, CreateProjectsLocationsStreamsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsStreamsRequest,
  output: CreateProjectsLocationsStreamsResponse,
  errors: [],
}));

export interface PatchProjectsLocationsStreamsRequest {
  /** Output only. The stream's name. */
  name: string;
  /** Optional. Field mask is used to specify the fields to be overwritten in the stream resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then all fields will be overwritten. */
  updateMask?: string;
  /** Optional. A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Optional. Only validate the stream with the changes, without actually updating it. The default is false. */
  validateOnly?: boolean;
  /** Optional. Execute the update without validating it. */
  force?: boolean;
  /** Request body */
  body?: Stream;
}

export const PatchProjectsLocationsStreamsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  validateOnly: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("validateOnly")),
  force: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("force")),
  body: Schema.optional(Stream).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/streams/{streamsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsStreamsRequest>;

export type PatchProjectsLocationsStreamsResponse = Operation;
export const PatchProjectsLocationsStreamsResponse = Operation;

export type PatchProjectsLocationsStreamsError = CommonErrors;

/** Use this method to update the configuration of a stream. */
export const patchProjectsLocationsStreams: API.OperationMethod<PatchProjectsLocationsStreamsRequest, PatchProjectsLocationsStreamsResponse, PatchProjectsLocationsStreamsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsStreamsRequest,
  output: PatchProjectsLocationsStreamsResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsStreamsRequest {
  /** Required. The name of the stream resource to delete. */
  name: string;
  /** Optional. A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
}

export const DeleteProjectsLocationsStreamsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/streams/{streamsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsStreamsRequest>;

export type DeleteProjectsLocationsStreamsResponse = Operation;
export const DeleteProjectsLocationsStreamsResponse = Operation;

export type DeleteProjectsLocationsStreamsError = CommonErrors;

/** Use this method to delete a stream. */
export const deleteProjectsLocationsStreams: API.OperationMethod<DeleteProjectsLocationsStreamsRequest, DeleteProjectsLocationsStreamsResponse, DeleteProjectsLocationsStreamsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsStreamsRequest,
  output: DeleteProjectsLocationsStreamsResponse,
  errors: [],
}));

export interface FetchErrorsProjectsLocationsStreamsRequest {
  /** Name of the Stream resource for which to fetch any errors. */
  stream: string;
  /** Request body */
  body?: FetchErrorsRequest;
}

export const FetchErrorsProjectsLocationsStreamsRequest = Schema.Struct({
  stream: Schema.String.pipe(T.HttpPath("stream")),
  body: Schema.optional(FetchErrorsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/streams/{streamsId}:fetchErrors", hasBody: true }),
  svc,
) as unknown as Schema.Schema<FetchErrorsProjectsLocationsStreamsRequest>;

export type FetchErrorsProjectsLocationsStreamsResponse = Operation;
export const FetchErrorsProjectsLocationsStreamsResponse = Operation;

export type FetchErrorsProjectsLocationsStreamsError = CommonErrors;

/** Use this method to fetch any errors associated with a stream. */
export const fetchErrorsProjectsLocationsStreams: API.OperationMethod<FetchErrorsProjectsLocationsStreamsRequest, FetchErrorsProjectsLocationsStreamsResponse, FetchErrorsProjectsLocationsStreamsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: FetchErrorsProjectsLocationsStreamsRequest,
  output: FetchErrorsProjectsLocationsStreamsResponse,
  errors: [],
}));

export interface GetProjectsLocationsStreamsObjectsRequest {
  /** Required. The name of the stream object resource to get. */
  name: string;
}

export const GetProjectsLocationsStreamsObjectsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/streams/{streamsId}/objects/{objectsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsStreamsObjectsRequest>;

export type GetProjectsLocationsStreamsObjectsResponse = StreamObject;
export const GetProjectsLocationsStreamsObjectsResponse = StreamObject;

export type GetProjectsLocationsStreamsObjectsError = CommonErrors;

/** Use this method to get details about a stream object. */
export const getProjectsLocationsStreamsObjects: API.OperationMethod<GetProjectsLocationsStreamsObjectsRequest, GetProjectsLocationsStreamsObjectsResponse, GetProjectsLocationsStreamsObjectsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsStreamsObjectsRequest,
  output: GetProjectsLocationsStreamsObjectsResponse,
  errors: [],
}));

export interface ListProjectsLocationsStreamsObjectsRequest {
  /** Required. The parent stream that owns the collection of objects. */
  parent: string;
  /** Maximum number of objects to return. Default is 50. The maximum value is 1000; values above 1000 will be coerced to 1000. */
  pageSize?: number;
  /** Page token received from a previous `ListStreamObjectsRequest` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListStreamObjectsRequest` must match the call that provided the page token. */
  pageToken?: string;
}

export const ListProjectsLocationsStreamsObjectsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/streams/{streamsId}/objects" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsStreamsObjectsRequest>;

export type ListProjectsLocationsStreamsObjectsResponse = ListStreamObjectsResponse;
export const ListProjectsLocationsStreamsObjectsResponse = ListStreamObjectsResponse;

export type ListProjectsLocationsStreamsObjectsError = CommonErrors;

/** Use this method to list the objects of a specific stream. */
export const listProjectsLocationsStreamsObjects: API.PaginatedOperationMethod<ListProjectsLocationsStreamsObjectsRequest, ListProjectsLocationsStreamsObjectsResponse, ListProjectsLocationsStreamsObjectsError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsLocationsStreamsObjectsRequest,
  output: ListProjectsLocationsStreamsObjectsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface StartBackfillJobProjectsLocationsStreamsObjectsRequest {
  /** Required. The name of the stream object resource to start a backfill job for. */
  object: string;
}

export const StartBackfillJobProjectsLocationsStreamsObjectsRequest = Schema.Struct({
  object: Schema.String.pipe(T.HttpPath("object")),
}).pipe(
  T.Http({ method: "POST", path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/streams/{streamsId}/objects/{objectsId}:startBackfillJob", hasBody: true }),
  svc,
) as unknown as Schema.Schema<StartBackfillJobProjectsLocationsStreamsObjectsRequest>;

export type StartBackfillJobProjectsLocationsStreamsObjectsResponse = StartBackfillJobResponse;
export const StartBackfillJobProjectsLocationsStreamsObjectsResponse = StartBackfillJobResponse;

export type StartBackfillJobProjectsLocationsStreamsObjectsError = CommonErrors;

/** Starts backfill job for the specified stream object. */
export const startBackfillJobProjectsLocationsStreamsObjects: API.OperationMethod<StartBackfillJobProjectsLocationsStreamsObjectsRequest, StartBackfillJobProjectsLocationsStreamsObjectsResponse, StartBackfillJobProjectsLocationsStreamsObjectsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: StartBackfillJobProjectsLocationsStreamsObjectsRequest,
  output: StartBackfillJobProjectsLocationsStreamsObjectsResponse,
  errors: [],
}));

export interface StopBackfillJobProjectsLocationsStreamsObjectsRequest {
  /** Required. The name of the stream object resource to stop the backfill job for. */
  object: string;
}

export const StopBackfillJobProjectsLocationsStreamsObjectsRequest = Schema.Struct({
  object: Schema.String.pipe(T.HttpPath("object")),
}).pipe(
  T.Http({ method: "POST", path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/streams/{streamsId}/objects/{objectsId}:stopBackfillJob", hasBody: true }),
  svc,
) as unknown as Schema.Schema<StopBackfillJobProjectsLocationsStreamsObjectsRequest>;

export type StopBackfillJobProjectsLocationsStreamsObjectsResponse = StopBackfillJobResponse;
export const StopBackfillJobProjectsLocationsStreamsObjectsResponse = StopBackfillJobResponse;

export type StopBackfillJobProjectsLocationsStreamsObjectsError = CommonErrors;

/** Stops the backfill job for the specified stream object. */
export const stopBackfillJobProjectsLocationsStreamsObjects: API.OperationMethod<StopBackfillJobProjectsLocationsStreamsObjectsRequest, StopBackfillJobProjectsLocationsStreamsObjectsResponse, StopBackfillJobProjectsLocationsStreamsObjectsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: StopBackfillJobProjectsLocationsStreamsObjectsRequest,
  output: StopBackfillJobProjectsLocationsStreamsObjectsResponse,
  errors: [],
}));

export interface CreateProjectsLocationsPrivateConnectionsRequest {
  /** Required. The parent that owns the collection of PrivateConnections. */
  parent: string;
  /** Required. The private connectivity identifier. */
  privateConnectionId?: string;
  /** Optional. A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Request body */
  body?: PrivateConnection;
}

export const CreateProjectsLocationsPrivateConnectionsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  privateConnectionId: Schema.optional(Schema.String).pipe(T.HttpQuery("privateConnectionId")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  body: Schema.optional(PrivateConnection).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/privateConnections", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsPrivateConnectionsRequest>;

export type CreateProjectsLocationsPrivateConnectionsResponse = Operation;
export const CreateProjectsLocationsPrivateConnectionsResponse = Operation;

export type CreateProjectsLocationsPrivateConnectionsError = CommonErrors;

/** Use this method to create a private connectivity configuration. */
export const createProjectsLocationsPrivateConnections: API.OperationMethod<CreateProjectsLocationsPrivateConnectionsRequest, CreateProjectsLocationsPrivateConnectionsResponse, CreateProjectsLocationsPrivateConnectionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsPrivateConnectionsRequest,
  output: CreateProjectsLocationsPrivateConnectionsResponse,
  errors: [],
}));

export interface GetProjectsLocationsPrivateConnectionsRequest {
  /** Required. The name of the private connectivity configuration to get. */
  name: string;
}

export const GetProjectsLocationsPrivateConnectionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/privateConnections/{privateConnectionsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsPrivateConnectionsRequest>;

export type GetProjectsLocationsPrivateConnectionsResponse = PrivateConnection;
export const GetProjectsLocationsPrivateConnectionsResponse = PrivateConnection;

export type GetProjectsLocationsPrivateConnectionsError = CommonErrors;

/** Use this method to get details about a private connectivity configuration. */
export const getProjectsLocationsPrivateConnections: API.OperationMethod<GetProjectsLocationsPrivateConnectionsRequest, GetProjectsLocationsPrivateConnectionsResponse, GetProjectsLocationsPrivateConnectionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsPrivateConnectionsRequest,
  output: GetProjectsLocationsPrivateConnectionsResponse,
  errors: [],
}));

export interface ListProjectsLocationsPrivateConnectionsRequest {
  /** Required. The parent that owns the collection of private connectivity configurations. */
  parent: string;
  /** Maximum number of private connectivity configurations to return. If unspecified, at most 50 private connectivity configurations that will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. */
  pageSize?: number;
  /** Page token received from a previous `ListPrivateConnections` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListPrivateConnections` must match the call that provided the page token. */
  pageToken?: string;
  /** Filter request. */
  filter?: string;
  /** Order by fields for the result. */
  orderBy?: string;
}

export const ListProjectsLocationsPrivateConnectionsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/privateConnections" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsPrivateConnectionsRequest>;

export type ListProjectsLocationsPrivateConnectionsResponse = ListPrivateConnectionsResponse;
export const ListProjectsLocationsPrivateConnectionsResponse = ListPrivateConnectionsResponse;

export type ListProjectsLocationsPrivateConnectionsError = CommonErrors;

/** Use this method to list private connectivity configurations in a project and location. */
export const listProjectsLocationsPrivateConnections: API.PaginatedOperationMethod<ListProjectsLocationsPrivateConnectionsRequest, ListProjectsLocationsPrivateConnectionsResponse, ListProjectsLocationsPrivateConnectionsError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsLocationsPrivateConnectionsRequest,
  output: ListProjectsLocationsPrivateConnectionsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface DeleteProjectsLocationsPrivateConnectionsRequest {
  /** Required. The name of the private connectivity configuration to delete. */
  name: string;
  /** Optional. A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Optional. If set to true, any child routes that belong to this PrivateConnection will also be deleted. */
  force?: boolean;
}

export const DeleteProjectsLocationsPrivateConnectionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  force: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("force")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/privateConnections/{privateConnectionsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsPrivateConnectionsRequest>;

export type DeleteProjectsLocationsPrivateConnectionsResponse = Operation;
export const DeleteProjectsLocationsPrivateConnectionsResponse = Operation;

export type DeleteProjectsLocationsPrivateConnectionsError = CommonErrors;

/** Use this method to delete a private connectivity configuration. */
export const deleteProjectsLocationsPrivateConnections: API.OperationMethod<DeleteProjectsLocationsPrivateConnectionsRequest, DeleteProjectsLocationsPrivateConnectionsResponse, DeleteProjectsLocationsPrivateConnectionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsPrivateConnectionsRequest,
  output: DeleteProjectsLocationsPrivateConnectionsResponse,
  errors: [],
}));

export interface CreateProjectsLocationsPrivateConnectionsRoutesRequest {
  /** Required. The parent that owns the collection of Routes. */
  parent: string;
  /** Required. The Route identifier. */
  routeId?: string;
  /** Optional. A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Request body */
  body?: Route;
}

export const CreateProjectsLocationsPrivateConnectionsRoutesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  routeId: Schema.optional(Schema.String).pipe(T.HttpQuery("routeId")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  body: Schema.optional(Route).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/privateConnections/{privateConnectionsId}/routes", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsPrivateConnectionsRoutesRequest>;

export type CreateProjectsLocationsPrivateConnectionsRoutesResponse = Operation;
export const CreateProjectsLocationsPrivateConnectionsRoutesResponse = Operation;

export type CreateProjectsLocationsPrivateConnectionsRoutesError = CommonErrors;

/** Use this method to create a route for a private connectivity in a project and location. */
export const createProjectsLocationsPrivateConnectionsRoutes: API.OperationMethod<CreateProjectsLocationsPrivateConnectionsRoutesRequest, CreateProjectsLocationsPrivateConnectionsRoutesResponse, CreateProjectsLocationsPrivateConnectionsRoutesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsPrivateConnectionsRoutesRequest,
  output: CreateProjectsLocationsPrivateConnectionsRoutesResponse,
  errors: [],
}));

export interface GetProjectsLocationsPrivateConnectionsRoutesRequest {
  /** Required. The name of the Route resource to get. */
  name: string;
}

export const GetProjectsLocationsPrivateConnectionsRoutesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/privateConnections/{privateConnectionsId}/routes/{routesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsPrivateConnectionsRoutesRequest>;

export type GetProjectsLocationsPrivateConnectionsRoutesResponse = Route;
export const GetProjectsLocationsPrivateConnectionsRoutesResponse = Route;

export type GetProjectsLocationsPrivateConnectionsRoutesError = CommonErrors;

/** Use this method to get details about a route. */
export const getProjectsLocationsPrivateConnectionsRoutes: API.OperationMethod<GetProjectsLocationsPrivateConnectionsRoutesRequest, GetProjectsLocationsPrivateConnectionsRoutesResponse, GetProjectsLocationsPrivateConnectionsRoutesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsPrivateConnectionsRoutesRequest,
  output: GetProjectsLocationsPrivateConnectionsRoutesResponse,
  errors: [],
}));

export interface ListProjectsLocationsPrivateConnectionsRoutesRequest {
  /** Required. The parent that owns the collection of Routess. */
  parent: string;
  /** Maximum number of Routes to return. The service may return fewer than this value. If unspecified, at most 50 Routes will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. */
  pageSize?: number;
  /** Page token received from a previous `ListRoutes` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListRoutes` must match the call that provided the page token. */
  pageToken?: string;
  /** Filter request. */
  filter?: string;
  /** Order by fields for the result. */
  orderBy?: string;
}

export const ListProjectsLocationsPrivateConnectionsRoutesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/privateConnections/{privateConnectionsId}/routes" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsPrivateConnectionsRoutesRequest>;

export type ListProjectsLocationsPrivateConnectionsRoutesResponse = ListRoutesResponse;
export const ListProjectsLocationsPrivateConnectionsRoutesResponse = ListRoutesResponse;

export type ListProjectsLocationsPrivateConnectionsRoutesError = CommonErrors;

/** Use this method to list routes created for a private connectivity in a project and location. */
export const listProjectsLocationsPrivateConnectionsRoutes: API.PaginatedOperationMethod<ListProjectsLocationsPrivateConnectionsRoutesRequest, ListProjectsLocationsPrivateConnectionsRoutesResponse, ListProjectsLocationsPrivateConnectionsRoutesError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsLocationsPrivateConnectionsRoutesRequest,
  output: ListProjectsLocationsPrivateConnectionsRoutesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface DeleteProjectsLocationsPrivateConnectionsRoutesRequest {
  /** Required. The name of the Route resource to delete. */
  name: string;
  /** Optional. A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
}

export const DeleteProjectsLocationsPrivateConnectionsRoutesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/privateConnections/{privateConnectionsId}/routes/{routesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsPrivateConnectionsRoutesRequest>;

export type DeleteProjectsLocationsPrivateConnectionsRoutesResponse = Operation;
export const DeleteProjectsLocationsPrivateConnectionsRoutesResponse = Operation;

export type DeleteProjectsLocationsPrivateConnectionsRoutesError = CommonErrors;

/** Use this method to delete a route. */
export const deleteProjectsLocationsPrivateConnectionsRoutes: API.OperationMethod<DeleteProjectsLocationsPrivateConnectionsRoutesRequest, DeleteProjectsLocationsPrivateConnectionsRoutesResponse, DeleteProjectsLocationsPrivateConnectionsRoutesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsPrivateConnectionsRoutesRequest,
  output: DeleteProjectsLocationsPrivateConnectionsRoutesResponse,
  errors: [],
}));

