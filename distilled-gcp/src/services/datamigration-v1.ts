// ==========================================================================
// Database Migration API (datamigration v1)
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
  name: "datamigration",
  version: "v1",
  rootUrl: "https://datamigration.googleapis.com/",
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

export interface DumpFlag {
  /** The name of the flag */
  name?: string;
  /** The value of the flag. */
  value?: string;
}

export const DumpFlag: Schema.Schema<DumpFlag> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  value: Schema.optional(Schema.String),
})).annotate({ identifier: "DumpFlag" }) as any as Schema.Schema<DumpFlag>;

export interface DumpFlags {
  /** The flags for the initial dump. */
  dumpFlags?: Array<DumpFlag>;
}

export const DumpFlags: Schema.Schema<DumpFlags> = Schema.suspend(() => Schema.Struct({
  dumpFlags: Schema.optional(Schema.Array(DumpFlag)),
})).annotate({ identifier: "DumpFlags" }) as any as Schema.Schema<DumpFlags>;

export interface ReverseSshConnectivity {
  /** Required. The IP of the virtual machine (Compute Engine) used as the bastion server for the SSH tunnel. */
  vmIp?: string;
  /** Required. The forwarding port of the virtual machine (Compute Engine) used as the bastion server for the SSH tunnel. */
  vmPort?: number;
  /** The name of the virtual machine (Compute Engine) used as the bastion server for the SSH tunnel. */
  vm?: string;
  /** The name of the VPC to peer with the Cloud SQL private network. */
  vpc?: string;
}

export const ReverseSshConnectivity: Schema.Schema<ReverseSshConnectivity> = Schema.suspend(() => Schema.Struct({
  vmIp: Schema.optional(Schema.String),
  vmPort: Schema.optional(Schema.Number),
  vm: Schema.optional(Schema.String),
  vpc: Schema.optional(Schema.String),
})).annotate({ identifier: "ReverseSshConnectivity" }) as any as Schema.Schema<ReverseSshConnectivity>;

export interface VpcPeeringConnectivity {
  /** The name of the VPC network to peer with the Cloud SQL private network. */
  vpc?: string;
}

export const VpcPeeringConnectivity: Schema.Schema<VpcPeeringConnectivity> = Schema.suspend(() => Schema.Struct({
  vpc: Schema.optional(Schema.String),
})).annotate({ identifier: "VpcPeeringConnectivity" }) as any as Schema.Schema<VpcPeeringConnectivity>;

export interface StaticIpConnectivity {
}

export const StaticIpConnectivity: Schema.Schema<StaticIpConnectivity> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "StaticIpConnectivity" }) as any as Schema.Schema<StaticIpConnectivity>;

export interface DatabaseType {
  /** The database provider. */
  provider?: "DATABASE_PROVIDER_UNSPECIFIED" | "CLOUDSQL" | "RDS" | "AURORA" | "ALLOYDB" | "AZURE_DATABASE" | (string & {});
  /** The database engine. */
  engine?: "DATABASE_ENGINE_UNSPECIFIED" | "MYSQL" | "POSTGRESQL" | "SQLSERVER" | "ORACLE" | (string & {});
}

export const DatabaseType: Schema.Schema<DatabaseType> = Schema.suspend(() => Schema.Struct({
  provider: Schema.optional(Schema.String),
  engine: Schema.optional(Schema.String),
})).annotate({ identifier: "DatabaseType" }) as any as Schema.Schema<DatabaseType>;

export interface ConversionWorkspaceInfo {
  /** The resource name (URI) of the conversion workspace. */
  name?: string;
  /** The commit ID of the conversion workspace. */
  commitId?: string;
}

export const ConversionWorkspaceInfo: Schema.Schema<ConversionWorkspaceInfo> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  commitId: Schema.optional(Schema.String),
})).annotate({ identifier: "ConversionWorkspaceInfo" }) as any as Schema.Schema<ConversionWorkspaceInfo>;

export interface PerformanceConfig {
  /** Initial dump parallelism level. */
  dumpParallelLevel?: "DUMP_PARALLEL_LEVEL_UNSPECIFIED" | "MIN" | "OPTIMAL" | "MAX" | (string & {});
}

export const PerformanceConfig: Schema.Schema<PerformanceConfig> = Schema.suspend(() => Schema.Struct({
  dumpParallelLevel: Schema.optional(Schema.String),
})).annotate({ identifier: "PerformanceConfig" }) as any as Schema.Schema<PerformanceConfig>;

export interface SqlServerEncryptionOptions {
  /** Required. Path to the Certificate (.cer) in Cloud Storage, in the form `gs://bucketName/fileName`. The instance must have write permissions to the bucket and read access to the file. */
  certPath?: string;
  /** Required. Path to the Certificate Private Key (.pvk) in Cloud Storage, in the form `gs://bucketName/fileName`. The instance must have write permissions to the bucket and read access to the file. */
  pvkPath?: string;
  /** Required. Input only. Password that encrypts the private key. */
  pvkPassword?: string;
}

export const SqlServerEncryptionOptions: Schema.Schema<SqlServerEncryptionOptions> = Schema.suspend(() => Schema.Struct({
  certPath: Schema.optional(Schema.String),
  pvkPath: Schema.optional(Schema.String),
  pvkPassword: Schema.optional(Schema.String),
})).annotate({ identifier: "SqlServerEncryptionOptions" }) as any as Schema.Schema<SqlServerEncryptionOptions>;

export interface SqlServerDatabaseBackup {
  /** Required. Name of a SQL Server database for which to define backup configuration. */
  database?: string;
  /** Optional. Encryption settings for the database. Required if provided database backups are encrypted. Encryption settings include path to certificate, path to certificate private key, and key password. */
  encryptionOptions?: SqlServerEncryptionOptions;
}

export const SqlServerDatabaseBackup: Schema.Schema<SqlServerDatabaseBackup> = Schema.suspend(() => Schema.Struct({
  database: Schema.optional(Schema.String),
  encryptionOptions: Schema.optional(SqlServerEncryptionOptions),
})).annotate({ identifier: "SqlServerDatabaseBackup" }) as any as Schema.Schema<SqlServerDatabaseBackup>;

export interface SqlServerDagConfig {
  /** Required. The name of the source availability group. Only used by DAG migrations. */
  sourceAg?: string;
  /** Required. The name of the linked server that points to the source SQL Server instance. Only used by DAG migrations. */
  linkedServer?: string;
}

export const SqlServerDagConfig: Schema.Schema<SqlServerDagConfig> = Schema.suspend(() => Schema.Struct({
  sourceAg: Schema.optional(Schema.String),
  linkedServer: Schema.optional(Schema.String),
})).annotate({ identifier: "SqlServerDagConfig" }) as any as Schema.Schema<SqlServerDagConfig>;

export interface SqlServerHomogeneousMigrationJobConfig {
  /** Required. Pattern that describes the default backup naming strategy. The specified pattern should ensure lexicographical order of backups. The pattern must define one of the following capture group sets: Capture group set #1 yy/yyyy - year, 2 or 4 digits mm - month number, 1-12 dd - day of month, 1-31 hh - hour of day, 00-23 mi - minutes, 00-59 ss - seconds, 00-59 Example: For backup file TestDB_20230802_155400.trn, use pattern: (?.*)_backup_(?\d{4})(?\d{2})(?\d{2})_(?\d{2})(?\d{2})(?\d{2}).trn Capture group set #2 timestamp - unix timestamp Example: For backup file TestDB.1691448254.trn, use pattern: (?.*)\.(?\d*).trn or (?.*)\.(?\d*).trn */
  backupFilePattern?: string;
  /** Required. Backup details per database in Cloud Storage. */
  databaseBackups?: Array<SqlServerDatabaseBackup>;
  /** Optional. Enable differential backups. */
  useDiffBackup?: boolean;
  /** Optional. Promote databases when ready. */
  promoteWhenReady?: boolean;
  /** Optional. Configuration for distributed availability group (DAG) for the SQL Server homogeneous migration. */
  dagConfig?: SqlServerDagConfig;
}

export const SqlServerHomogeneousMigrationJobConfig: Schema.Schema<SqlServerHomogeneousMigrationJobConfig> = Schema.suspend(() => Schema.Struct({
  backupFilePattern: Schema.optional(Schema.String),
  databaseBackups: Schema.optional(Schema.Array(SqlServerDatabaseBackup)),
  useDiffBackup: Schema.optional(Schema.Boolean),
  promoteWhenReady: Schema.optional(Schema.Boolean),
  dagConfig: Schema.optional(SqlServerDagConfig),
})).annotate({ identifier: "SqlServerHomogeneousMigrationJobConfig" }) as any as Schema.Schema<SqlServerHomogeneousMigrationJobConfig>;

export interface LogMiner {
}

export const LogMiner: Schema.Schema<LogMiner> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "LogMiner" }) as any as Schema.Schema<LogMiner>;

export interface OracleAsmLogFileAccess {
}

export const OracleAsmLogFileAccess: Schema.Schema<OracleAsmLogFileAccess> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "OracleAsmLogFileAccess" }) as any as Schema.Schema<OracleAsmLogFileAccess>;

export interface LogFileDirectories {
  /** Required. Oracle directory for online logs. */
  onlineLogDirectory?: string;
  /** Required. Oracle directory for archived logs. */
  archivedLogDirectory?: string;
}

export const LogFileDirectories: Schema.Schema<LogFileDirectories> = Schema.suspend(() => Schema.Struct({
  onlineLogDirectory: Schema.optional(Schema.String),
  archivedLogDirectory: Schema.optional(Schema.String),
})).annotate({ identifier: "LogFileDirectories" }) as any as Schema.Schema<LogFileDirectories>;

export interface BinaryLogParser {
  /** Use Oracle ASM. */
  oracleAsmLogFileAccess?: OracleAsmLogFileAccess;
  /** Use Oracle directories. */
  logFileDirectories?: LogFileDirectories;
}

export const BinaryLogParser: Schema.Schema<BinaryLogParser> = Schema.suspend(() => Schema.Struct({
  oracleAsmLogFileAccess: Schema.optional(OracleAsmLogFileAccess),
  logFileDirectories: Schema.optional(LogFileDirectories),
})).annotate({ identifier: "BinaryLogParser" }) as any as Schema.Schema<BinaryLogParser>;

export interface OracleSourceConfig {
  /** Optional. Maximum number of connections Database Migration Service will open to the source for full dump phase. */
  maxConcurrentFullDumpConnections?: number;
  /** Optional. Maximum number of connections Database Migration Service will open to the source for CDC phase. */
  maxConcurrentCdcConnections?: number;
  /** Optional. Whether to skip full dump or not. */
  skipFullDump?: boolean;
  /** Optional. The schema change number (SCN) to start CDC data migration from. */
  cdcStartPosition?: string;
  /** Use LogMiner. */
  logMiner?: LogMiner;
  /** Use Binary Log Parser. */
  binaryLogParser?: BinaryLogParser;
}

export const OracleSourceConfig: Schema.Schema<OracleSourceConfig> = Schema.suspend(() => Schema.Struct({
  maxConcurrentFullDumpConnections: Schema.optional(Schema.Number),
  maxConcurrentCdcConnections: Schema.optional(Schema.Number),
  skipFullDump: Schema.optional(Schema.Boolean),
  cdcStartPosition: Schema.optional(Schema.String),
  logMiner: Schema.optional(LogMiner),
  binaryLogParser: Schema.optional(BinaryLogParser),
})).annotate({ identifier: "OracleSourceConfig" }) as any as Schema.Schema<OracleSourceConfig>;

export interface PostgresDestinationConfig {
  /** Optional. Maximum number of connections Database Migration Service will open to the destination for data migration. */
  maxConcurrentConnections?: number;
  /** Optional. Timeout for data migration transactions. */
  transactionTimeout?: string;
}

export const PostgresDestinationConfig: Schema.Schema<PostgresDestinationConfig> = Schema.suspend(() => Schema.Struct({
  maxConcurrentConnections: Schema.optional(Schema.Number),
  transactionTimeout: Schema.optional(Schema.String),
})).annotate({ identifier: "PostgresDestinationConfig" }) as any as Schema.Schema<PostgresDestinationConfig>;

export interface OracleToPostgresConfig {
  /** Optional. Configuration for Oracle source. */
  oracleSourceConfig?: OracleSourceConfig;
  /** Optional. Configuration for Postgres destination. */
  postgresDestinationConfig?: PostgresDestinationConfig;
}

export const OracleToPostgresConfig: Schema.Schema<OracleToPostgresConfig> = Schema.suspend(() => Schema.Struct({
  oracleSourceConfig: Schema.optional(OracleSourceConfig),
  postgresDestinationConfig: Schema.optional(PostgresDestinationConfig),
})).annotate({ identifier: "OracleToPostgresConfig" }) as any as Schema.Schema<OracleToPostgresConfig>;

export interface SqlServerSourceConfig {
  /** Optional. Maximum number of connections Database Migration Service will open to the source for full dump phase. */
  maxConcurrentFullDumpConnections?: number;
  /** Optional. Maximum number of connections Database Migration Service will open to the source for CDC phase. */
  maxConcurrentCdcConnections?: number;
  /** Optional. Whether to skip full dump or not. */
  skipFullDump?: boolean;
  /** Optional. The log sequence number (LSN) to start CDC data migration from. */
  cdcStartPosition?: string;
}

export const SqlServerSourceConfig: Schema.Schema<SqlServerSourceConfig> = Schema.suspend(() => Schema.Struct({
  maxConcurrentFullDumpConnections: Schema.optional(Schema.Number),
  maxConcurrentCdcConnections: Schema.optional(Schema.Number),
  skipFullDump: Schema.optional(Schema.Boolean),
  cdcStartPosition: Schema.optional(Schema.String),
})).annotate({ identifier: "SqlServerSourceConfig" }) as any as Schema.Schema<SqlServerSourceConfig>;

export interface SqlServerToPostgresConfig {
  /** Optional. Configuration for SQL Server source. */
  sqlserverSourceConfig?: SqlServerSourceConfig;
  /** Optional. Configuration for Postgres destination. */
  postgresDestinationConfig?: PostgresDestinationConfig;
}

export const SqlServerToPostgresConfig: Schema.Schema<SqlServerToPostgresConfig> = Schema.suspend(() => Schema.Struct({
  sqlserverSourceConfig: Schema.optional(SqlServerSourceConfig),
  postgresDestinationConfig: Schema.optional(PostgresDestinationConfig),
})).annotate({ identifier: "SqlServerToPostgresConfig" }) as any as Schema.Schema<SqlServerToPostgresConfig>;

export interface PostgresSourceConfig {
  /** Optional. Whether to skip full dump or not. */
  skipFullDump?: boolean;
}

export const PostgresSourceConfig: Schema.Schema<PostgresSourceConfig> = Schema.suspend(() => Schema.Struct({
  skipFullDump: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "PostgresSourceConfig" }) as any as Schema.Schema<PostgresSourceConfig>;

export interface SqlServerDestinationConfig {
  /** Optional. Maximum number of connections Database Migration Service will open to the destination for data migration. */
  maxConcurrentConnections?: number;
  /** Optional. Timeout for data migration transactions. */
  transactionTimeout?: string;
}

export const SqlServerDestinationConfig: Schema.Schema<SqlServerDestinationConfig> = Schema.suspend(() => Schema.Struct({
  maxConcurrentConnections: Schema.optional(Schema.Number),
  transactionTimeout: Schema.optional(Schema.String),
})).annotate({ identifier: "SqlServerDestinationConfig" }) as any as Schema.Schema<SqlServerDestinationConfig>;

export interface PostgresToSqlServerConfig {
  /** Optional. Configuration for PostgreSQL source. */
  postgresSourceConfig?: PostgresSourceConfig;
  /** Optional. Configuration for SQL Server destination. */
  sqlserverDestinationConfig?: SqlServerDestinationConfig;
}

export const PostgresToSqlServerConfig: Schema.Schema<PostgresToSqlServerConfig> = Schema.suspend(() => Schema.Struct({
  postgresSourceConfig: Schema.optional(PostgresSourceConfig),
  sqlserverDestinationConfig: Schema.optional(SqlServerDestinationConfig),
})).annotate({ identifier: "PostgresToSqlServerConfig" }) as any as Schema.Schema<PostgresToSqlServerConfig>;

export interface SourceObjectIdentifier {
  /** Optional. The database name. This will be required only if the object uses a database name as part of its unique identifier. */
  database?: string;
  /** Optional. The schema name. This will be required only if the object uses a schema name as part of its unique identifier. */
  schema?: string;
  /** Optional. The table name. This will be required only if the object is a level below database or schema. */
  table?: string;
  /** Required. The type of the migration job object. */
  type?: "MIGRATION_JOB_OBJECT_TYPE_UNSPECIFIED" | "DATABASE" | "SCHEMA" | "TABLE" | (string & {});
}

export const SourceObjectIdentifier: Schema.Schema<SourceObjectIdentifier> = Schema.suspend(() => Schema.Struct({
  database: Schema.optional(Schema.String),
  schema: Schema.optional(Schema.String),
  table: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
})).annotate({ identifier: "SourceObjectIdentifier" }) as any as Schema.Schema<SourceObjectIdentifier>;

export interface SourceObjectConfig {
  /** Optional. The object identifier. */
  objectIdentifier?: SourceObjectIdentifier;
}

export const SourceObjectConfig: Schema.Schema<SourceObjectConfig> = Schema.suspend(() => Schema.Struct({
  objectIdentifier: Schema.optional(SourceObjectIdentifier),
})).annotate({ identifier: "SourceObjectConfig" }) as any as Schema.Schema<SourceObjectConfig>;

export interface SourceObjectsConfig {
  /** Optional. The list of the objects to be migrated. */
  objectConfigs?: Array<SourceObjectConfig>;
  /** Optional. The objects selection type of the migration job. */
  objectsSelectionType?: "OBJECTS_SELECTION_TYPE_UNSPECIFIED" | "ALL_OBJECTS" | "SPECIFIED_OBJECTS" | (string & {});
}

export const SourceObjectsConfig: Schema.Schema<SourceObjectsConfig> = Schema.suspend(() => Schema.Struct({
  objectConfigs: Schema.optional(Schema.Array(SourceObjectConfig)),
  objectsSelectionType: Schema.optional(Schema.String),
})).annotate({ identifier: "SourceObjectsConfig" }) as any as Schema.Schema<SourceObjectsConfig>;

export interface MigrationJobObjectsConfig {
  /** The list of the migration job objects. */
  sourceObjectsConfig?: SourceObjectsConfig;
}

export const MigrationJobObjectsConfig: Schema.Schema<MigrationJobObjectsConfig> = Schema.suspend(() => Schema.Struct({
  sourceObjectsConfig: Schema.optional(SourceObjectsConfig),
})).annotate({ identifier: "MigrationJobObjectsConfig" }) as any as Schema.Schema<MigrationJobObjectsConfig>;

export interface MigrationJob {
  /** The name (URI) of this migration job resource, in the form of: projects/{project}/locations/{location}/migrationJobs/{migrationJob}. */
  name?: string;
  /** Output only. The timestamp when the migration job resource was created. A timestamp in RFC3339 UTC "Zulu" format, accurate to nanoseconds. Example: "2014-10-02T15:01:23.045123456Z". */
  createTime?: string;
  /** Output only. The timestamp when the migration job resource was last updated. A timestamp in RFC3339 UTC "Zulu" format, accurate to nanoseconds. Example: "2014-10-02T15:01:23.045123456Z". */
  updateTime?: string;
  /** The resource labels for migration job to use to annotate any related underlying resources such as Compute Engine VMs. An object containing a list of "key": "value" pairs. Example: `{ "name": "wrench", "mass": "1.3kg", "count": "3" }`. */
  labels?: Record<string, string>;
  /** The migration job display name. */
  displayName?: string;
  /** The current migration job state. */
  state?: "STATE_UNSPECIFIED" | "MAINTENANCE" | "DRAFT" | "CREATING" | "NOT_STARTED" | "RUNNING" | "FAILED" | "COMPLETED" | "DELETING" | "STOPPING" | "STOPPED" | "DELETED" | "UPDATING" | "STARTING" | "RESTARTING" | "RESUMING" | (string & {});
  /** Output only. The current migration job phase. */
  phase?: "PHASE_UNSPECIFIED" | "FULL_DUMP" | "CDC" | "PROMOTE_IN_PROGRESS" | "WAITING_FOR_SOURCE_WRITES_TO_STOP" | "PREPARING_THE_DUMP" | "READY_FOR_PROMOTE" | (string & {});
  /** Required. The migration job type. */
  type?: "TYPE_UNSPECIFIED" | "ONE_TIME" | "CONTINUOUS" | (string & {});
  /** The path to the dump file in Google Cloud Storage, in the format: (gs://[BUCKET_NAME]/[OBJECT_NAME]). This field and the "dump_flags" field are mutually exclusive. */
  dumpPath?: string;
  /** The initial dump flags. This field and the "dump_path" field are mutually exclusive. */
  dumpFlags?: DumpFlags;
  /** Required. The resource name (URI) of the source connection profile. */
  source?: string;
  /** Required. The resource name (URI) of the destination connection profile. */
  destination?: string;
  /** The details needed to communicate to the source over Reverse SSH tunnel connectivity. */
  reverseSshConnectivity?: ReverseSshConnectivity;
  /** The details of the VPC network that the source database is located in. */
  vpcPeeringConnectivity?: VpcPeeringConnectivity;
  /** static ip connectivity data (default, no additional details needed). */
  staticIpConnectivity?: StaticIpConnectivity;
  /** Output only. The duration of the migration job (in seconds). A duration in seconds with up to nine fractional digits, terminated by 's'. Example: "3.5s". */
  duration?: string;
  /** Output only. The error details in case of state FAILED. */
  error?: Status;
  /** The database engine type and provider of the source. */
  sourceDatabase?: DatabaseType;
  /** The database engine type and provider of the destination. */
  destinationDatabase?: DatabaseType;
  /** Output only. If the migration job is completed, the time when it was completed. */
  endTime?: string;
  /** The conversion workspace used by the migration. */
  conversionWorkspace?: ConversionWorkspaceInfo;
  /** This field can be used to select the entities to migrate as part of the migration job. It uses AIP-160 notation to select a subset of the entities configured on the associated conversion-workspace. This field should not be set on migration-jobs that are not associated with a conversion workspace. */
  filter?: string;
  /** The CMEK (customer-managed encryption key) fully qualified key name used for the migration job. This field supports all migration jobs types except for: * Mysql to Mysql (use the cmek field in the cloudsql connection profile instead). * PostrgeSQL to PostgreSQL (use the cmek field in the cloudsql connection profile instead). * PostgreSQL to AlloyDB (use the kms_key_name field in the alloydb connection profile instead). Each Cloud CMEK key has the following format: projects/[PROJECT]/locations/[REGION]/keyRings/[RING]/cryptoKeys/[KEY_NAME] */
  cmekKeyName?: string;
  /** Optional. Data dump parallelism settings used by the migration. */
  performanceConfig?: PerformanceConfig;
  /** Optional. Configuration for SQL Server homogeneous migration. */
  sqlserverHomogeneousMigrationJobConfig?: SqlServerHomogeneousMigrationJobConfig;
  /** Optional. The type of the data dump. Supported for MySQL to CloudSQL for MySQL migrations only. */
  dumpType?: "DUMP_TYPE_UNSPECIFIED" | "LOGICAL" | "PHYSICAL" | (string & {});
  /** Configuration for heterogeneous **Oracle to Cloud SQL for PostgreSQL** and **Oracle to AlloyDB for PostgreSQL** migrations. */
  oracleToPostgresConfig?: OracleToPostgresConfig;
  /** Configuration for heterogeneous **SQL Server to Cloud SQL for PostgreSQL** migrations. */
  sqlserverToPostgresConfig?: SqlServerToPostgresConfig;
  /** Configuration for heterogeneous failback migrations from **PostgreSQL to SQL Server**. */
  postgresToSqlserverConfig?: PostgresToSqlServerConfig;
  /** Optional. The objects that need to be migrated. */
  objectsConfig?: MigrationJobObjectsConfig;
  /** Output only. Reserved for future use. */
  satisfiesPzs?: boolean;
  /** Output only. Reserved for future use. */
  satisfiesPzi?: boolean;
  /** Output only. Migration job mode. Migration jobs can be standard forward jobs or failback migration jobs. */
  purpose?: "PURPOSE_UNSPECIFIED" | "MIGRATE" | "FAILBACK" | (string & {});
  /** Optional. A failback replication pointer to the resource name (URI) of the original migration job. */
  originalMigrationName?: string;
}

export const MigrationJob: Schema.Schema<MigrationJob> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  displayName: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  phase: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  dumpPath: Schema.optional(Schema.String),
  dumpFlags: Schema.optional(DumpFlags),
  source: Schema.optional(Schema.String),
  destination: Schema.optional(Schema.String),
  reverseSshConnectivity: Schema.optional(ReverseSshConnectivity),
  vpcPeeringConnectivity: Schema.optional(VpcPeeringConnectivity),
  staticIpConnectivity: Schema.optional(StaticIpConnectivity),
  duration: Schema.optional(Schema.String),
  error: Schema.optional(Status),
  sourceDatabase: Schema.optional(DatabaseType),
  destinationDatabase: Schema.optional(DatabaseType),
  endTime: Schema.optional(Schema.String),
  conversionWorkspace: Schema.optional(ConversionWorkspaceInfo),
  filter: Schema.optional(Schema.String),
  cmekKeyName: Schema.optional(Schema.String),
  performanceConfig: Schema.optional(PerformanceConfig),
  sqlserverHomogeneousMigrationJobConfig: Schema.optional(SqlServerHomogeneousMigrationJobConfig),
  dumpType: Schema.optional(Schema.String),
  oracleToPostgresConfig: Schema.optional(OracleToPostgresConfig),
  sqlserverToPostgresConfig: Schema.optional(SqlServerToPostgresConfig),
  postgresToSqlserverConfig: Schema.optional(PostgresToSqlServerConfig),
  objectsConfig: Schema.optional(MigrationJobObjectsConfig),
  satisfiesPzs: Schema.optional(Schema.Boolean),
  satisfiesPzi: Schema.optional(Schema.Boolean),
  purpose: Schema.optional(Schema.String),
  originalMigrationName: Schema.optional(Schema.String),
})).annotate({ identifier: "MigrationJob" }) as any as Schema.Schema<MigrationJob>;

export interface ListMigrationJobsResponse {
  /** The list of migration jobs objects. */
  migrationJobs?: Array<MigrationJob>;
  /** A token which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
}

export const ListMigrationJobsResponse: Schema.Schema<ListMigrationJobsResponse> = Schema.suspend(() => Schema.Struct({
  migrationJobs: Schema.optional(Schema.Array(MigrationJob)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListMigrationJobsResponse" }) as any as Schema.Schema<ListMigrationJobsResponse>;

export interface StartMigrationJobRequest {
  /** Optional. Start the migration job without running prior configuration verification. Defaults to `false`. */
  skipValidation?: boolean;
}

export const StartMigrationJobRequest: Schema.Schema<StartMigrationJobRequest> = Schema.suspend(() => Schema.Struct({
  skipValidation: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "StartMigrationJobRequest" }) as any as Schema.Schema<StartMigrationJobRequest>;

export interface StopMigrationJobRequest {
}

export const StopMigrationJobRequest: Schema.Schema<StopMigrationJobRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "StopMigrationJobRequest" }) as any as Schema.Schema<StopMigrationJobRequest>;

export interface ResumeMigrationJobRequest {
  /** Optional. Resume the migration job without running prior configuration verification. Defaults to `false`. */
  skipValidation?: boolean;
}

export const ResumeMigrationJobRequest: Schema.Schema<ResumeMigrationJobRequest> = Schema.suspend(() => Schema.Struct({
  skipValidation: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "ResumeMigrationJobRequest" }) as any as Schema.Schema<ResumeMigrationJobRequest>;

export interface PromoteMigrationJobRequest {
  /** Optional. The object filter to apply to the migration job. */
  objectsFilter?: MigrationJobObjectsConfig;
}

export const PromoteMigrationJobRequest: Schema.Schema<PromoteMigrationJobRequest> = Schema.suspend(() => Schema.Struct({
  objectsFilter: Schema.optional(MigrationJobObjectsConfig),
})).annotate({ identifier: "PromoteMigrationJobRequest" }) as any as Schema.Schema<PromoteMigrationJobRequest>;

export interface DemoteDestinationRequest {
}

export const DemoteDestinationRequest: Schema.Schema<DemoteDestinationRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "DemoteDestinationRequest" }) as any as Schema.Schema<DemoteDestinationRequest>;

export interface VerifyMigrationJobRequest {
  /** Optional. Field mask is used to specify the changed fields to be verified. It will not update the migration job. */
  updateMask?: string;
  /** Optional. The changed migration job parameters to verify. It will not update the migration job. */
  migrationJob?: MigrationJob;
}

export const VerifyMigrationJobRequest: Schema.Schema<VerifyMigrationJobRequest> = Schema.suspend(() => Schema.Struct({
  updateMask: Schema.optional(Schema.String),
  migrationJob: Schema.optional(MigrationJob),
})).annotate({ identifier: "VerifyMigrationJobRequest" }) as any as Schema.Schema<VerifyMigrationJobRequest>;

export interface RestartMigrationJobRequest {
  /** Optional. Restart the migration job without running prior configuration verification. Defaults to `false`. */
  skipValidation?: boolean;
  /** Optional. The object filter to apply to the migration job. */
  objectsFilter?: MigrationJobObjectsConfig;
  /** Optional. If true, only failed objects will be restarted. */
  restartFailedObjects?: boolean;
}

export const RestartMigrationJobRequest: Schema.Schema<RestartMigrationJobRequest> = Schema.suspend(() => Schema.Struct({
  skipValidation: Schema.optional(Schema.Boolean),
  objectsFilter: Schema.optional(MigrationJobObjectsConfig),
  restartFailedObjects: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "RestartMigrationJobRequest" }) as any as Schema.Schema<RestartMigrationJobRequest>;

export interface VmCreationConfig {
  /** Required. VM instance machine type to create. */
  vmMachineType?: string;
  /** The Google Cloud Platform zone to create the VM in. */
  vmZone?: string;
  /** The subnet name the vm needs to be created in. */
  subnet?: string;
}

export const VmCreationConfig: Schema.Schema<VmCreationConfig> = Schema.suspend(() => Schema.Struct({
  vmMachineType: Schema.optional(Schema.String),
  vmZone: Schema.optional(Schema.String),
  subnet: Schema.optional(Schema.String),
})).annotate({ identifier: "VmCreationConfig" }) as any as Schema.Schema<VmCreationConfig>;

export interface VmSelectionConfig {
  /** Required. The Google Cloud Platform zone the VM is located. */
  vmZone?: string;
}

export const VmSelectionConfig: Schema.Schema<VmSelectionConfig> = Schema.suspend(() => Schema.Struct({
  vmZone: Schema.optional(Schema.String),
})).annotate({ identifier: "VmSelectionConfig" }) as any as Schema.Schema<VmSelectionConfig>;

export interface GenerateSshScriptRequest {
  /** Required. Bastion VM Instance name to use or to create. */
  vm?: string;
  /** The VM creation configuration */
  vmCreationConfig?: VmCreationConfig;
  /** The VM selection configuration */
  vmSelectionConfig?: VmSelectionConfig;
  /** The port that will be open on the bastion host. */
  vmPort?: number;
}

export const GenerateSshScriptRequest: Schema.Schema<GenerateSshScriptRequest> = Schema.suspend(() => Schema.Struct({
  vm: Schema.optional(Schema.String),
  vmCreationConfig: Schema.optional(VmCreationConfig),
  vmSelectionConfig: Schema.optional(VmSelectionConfig),
  vmPort: Schema.optional(Schema.Number),
})).annotate({ identifier: "GenerateSshScriptRequest" }) as any as Schema.Schema<GenerateSshScriptRequest>;

export interface SshScript {
  /** The ssh configuration script. */
  script?: string;
}

export const SshScript: Schema.Schema<SshScript> = Schema.suspend(() => Schema.Struct({
  script: Schema.optional(Schema.String),
})).annotate({ identifier: "SshScript" }) as any as Schema.Schema<SshScript>;

export interface GenerateTcpProxyScriptRequest {
  /** Required. The name of the Compute instance that will host the proxy. */
  vmName?: string;
  /** Required. The type of the Compute instance that will host the proxy. */
  vmMachineType?: string;
  /** Optional. The Google Cloud Platform zone to create the VM in. The fully qualified name of the zone must be specified, including the region name, for example "us-central1-b". If not specified, uses the "-b" zone of the destination Connection Profile's region. */
  vmZone?: string;
  /** Required. The name of the subnet the Compute instance will use for private connectivity. Must be supplied in the form of projects/{project}/regions/{region}/subnetworks/{subnetwork}. Note: the region for the subnet must match the Compute instance region. */
  vmSubnet?: string;
}

export const GenerateTcpProxyScriptRequest: Schema.Schema<GenerateTcpProxyScriptRequest> = Schema.suspend(() => Schema.Struct({
  vmName: Schema.optional(Schema.String),
  vmMachineType: Schema.optional(Schema.String),
  vmZone: Schema.optional(Schema.String),
  vmSubnet: Schema.optional(Schema.String),
})).annotate({ identifier: "GenerateTcpProxyScriptRequest" }) as any as Schema.Schema<GenerateTcpProxyScriptRequest>;

export interface TcpProxyScript {
  /** The TCP Proxy configuration script. */
  script?: string;
}

export const TcpProxyScript: Schema.Schema<TcpProxyScript> = Schema.suspend(() => Schema.Struct({
  script: Schema.optional(Schema.String),
})).annotate({ identifier: "TcpProxyScript" }) as any as Schema.Schema<TcpProxyScript>;

export interface SslConfig {
  /** Optional. The ssl config type according to 'client_key', 'client_certificate' and 'ca_certificate'. */
  type?: "SSL_TYPE_UNSPECIFIED" | "SERVER_ONLY" | "SERVER_CLIENT" | "REQUIRED" | "NONE" | (string & {});
  /** Input only. The unencrypted PKCS#1 or PKCS#8 PEM-encoded private key associated with the Client Certificate. If this field is used then the 'client_certificate' field is mandatory. */
  clientKey?: string;
  /** Input only. The x509 PEM-encoded certificate that will be used by the replica to authenticate against the source database server.If this field is used then the 'client_key' field is mandatory. */
  clientCertificate?: string;
  /** Required. Input only. The x509 PEM-encoded certificate of the CA that signed the source database server's certificate. The replica will use this certificate to verify it's connecting to the right host. */
  caCertificate?: string;
  /** Optional. SSL flags used for establishing SSL connection to the source database. Only source specific flags are supported. An object containing a list of "key": "value" pairs. Example: { "server_certificate_hostname": "server.com"}. */
  sslFlags?: Record<string, string>;
}

export const SslConfig: Schema.Schema<SslConfig> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
  clientKey: Schema.optional(Schema.String),
  clientCertificate: Schema.optional(Schema.String),
  caCertificate: Schema.optional(Schema.String),
  sslFlags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "SslConfig" }) as any as Schema.Schema<SslConfig>;

export interface MySqlConnectionProfile {
  /** Required. The IP or hostname of the source MySQL database. */
  host?: string;
  /** Required. The network port of the source MySQL database. */
  port?: number;
  /** Required. The username that Database Migration Service will use to connect to the database. The value is encrypted when stored in Database Migration Service. */
  username?: string;
  /** Required. Input only. The password for the user that Database Migration Service will be using to connect to the database. This field is not returned on request, and the value is encrypted when stored in Database Migration Service. */
  password?: string;
  /** Output only. Indicates If this connection profile password is stored. */
  passwordSet?: boolean;
  /** SSL configuration for the destination to connect to the source database. */
  ssl?: SslConfig;
  /** If the source is a Cloud SQL database, use this field to provide the Cloud SQL instance ID of the source. */
  cloudSqlId?: string;
}

export const MySqlConnectionProfile: Schema.Schema<MySqlConnectionProfile> = Schema.suspend(() => Schema.Struct({
  host: Schema.optional(Schema.String),
  port: Schema.optional(Schema.Number),
  username: Schema.optional(Schema.String),
  password: Schema.optional(Schema.String),
  passwordSet: Schema.optional(Schema.Boolean),
  ssl: Schema.optional(SslConfig),
  cloudSqlId: Schema.optional(Schema.String),
})).annotate({ identifier: "MySqlConnectionProfile" }) as any as Schema.Schema<MySqlConnectionProfile>;

export interface PrivateServiceConnectConnectivity {
  /** Required. A service attachment that exposes a database, and has the following format: projects/{project}/regions/{region}/serviceAttachments/{service_attachment_name} */
  serviceAttachment?: string;
}

export const PrivateServiceConnectConnectivity: Schema.Schema<PrivateServiceConnectConnectivity> = Schema.suspend(() => Schema.Struct({
  serviceAttachment: Schema.optional(Schema.String),
})).annotate({ identifier: "PrivateServiceConnectConnectivity" }) as any as Schema.Schema<PrivateServiceConnectConnectivity>;

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
  /** Required. The resource name (URI) of the private connection. */
  privateConnection?: string;
}

export const PrivateConnectivity: Schema.Schema<PrivateConnectivity> = Schema.suspend(() => Schema.Struct({
  privateConnection: Schema.optional(Schema.String),
})).annotate({ identifier: "PrivateConnectivity" }) as any as Schema.Schema<PrivateConnectivity>;

export interface PostgreSqlConnectionProfile {
  /** Required. The IP or hostname of the source PostgreSQL database. */
  host?: string;
  /** Required. The network port of the source PostgreSQL database. */
  port?: number;
  /** Required. The username that Database Migration Service will use to connect to the database. The value is encrypted when stored in Database Migration Service. */
  username?: string;
  /** Required. Input only. The password for the user that Database Migration Service will be using to connect to the database. This field is not returned on request, and the value is encrypted when stored in Database Migration Service. */
  password?: string;
  /** Optional. The name of the specific database within the host. */
  database?: string;
  /** Output only. Indicates If this connection profile password is stored. */
  passwordSet?: boolean;
  /** SSL configuration for the destination to connect to the source database. */
  ssl?: SslConfig;
  /** If the source is a Cloud SQL database, use this field to provide the Cloud SQL instance ID of the source. */
  cloudSqlId?: string;
  /** Optional. If the destination is an AlloyDB database, use this field to provide the AlloyDB cluster ID. */
  alloydbClusterId?: string;
  /** Output only. If the source is a Cloud SQL database, this field indicates the network architecture it's associated with. */
  networkArchitecture?: "NETWORK_ARCHITECTURE_UNSPECIFIED" | "NETWORK_ARCHITECTURE_OLD_CSQL_PRODUCER" | "NETWORK_ARCHITECTURE_NEW_CSQL_PRODUCER" | (string & {});
  /** Static ip connectivity data (default, no additional details needed). */
  staticIpConnectivity?: StaticIpConnectivity;
  /** Private service connect connectivity. */
  privateServiceConnectConnectivity?: PrivateServiceConnectConnectivity;
  /** Forward SSH tunnel connectivity. */
  forwardSshConnectivity?: ForwardSshTunnelConnectivity;
  /** Private connectivity. */
  privateConnectivity?: PrivateConnectivity;
}

export const PostgreSqlConnectionProfile: Schema.Schema<PostgreSqlConnectionProfile> = Schema.suspend(() => Schema.Struct({
  host: Schema.optional(Schema.String),
  port: Schema.optional(Schema.Number),
  username: Schema.optional(Schema.String),
  password: Schema.optional(Schema.String),
  database: Schema.optional(Schema.String),
  passwordSet: Schema.optional(Schema.Boolean),
  ssl: Schema.optional(SslConfig),
  cloudSqlId: Schema.optional(Schema.String),
  alloydbClusterId: Schema.optional(Schema.String),
  networkArchitecture: Schema.optional(Schema.String),
  staticIpConnectivity: Schema.optional(StaticIpConnectivity),
  privateServiceConnectConnectivity: Schema.optional(PrivateServiceConnectConnectivity),
  forwardSshConnectivity: Schema.optional(ForwardSshTunnelConnectivity),
  privateConnectivity: Schema.optional(PrivateConnectivity),
})).annotate({ identifier: "PostgreSqlConnectionProfile" }) as any as Schema.Schema<PostgreSqlConnectionProfile>;

export interface SqlServerBackups {
  /** Required. The Cloud Storage bucket that stores backups for all replicated databases. */
  gcsBucket?: string;
  /** Optional. Cloud Storage path inside the bucket that stores backups. */
  gcsPrefix?: string;
}

export const SqlServerBackups: Schema.Schema<SqlServerBackups> = Schema.suspend(() => Schema.Struct({
  gcsBucket: Schema.optional(Schema.String),
  gcsPrefix: Schema.optional(Schema.String),
})).annotate({ identifier: "SqlServerBackups" }) as any as Schema.Schema<SqlServerBackups>;

export interface SqlServerConnectionProfile {
  /** Required. The IP or hostname of the source SQL Server database. */
  host?: string;
  /** Required. The network port of the source SQL Server database. */
  port?: number;
  /** Optional. The Database Mirroring (DBM) port of the source SQL Server instance. */
  dbmPort?: number;
  /** Required. The username that Database Migration Service will use to connect to the database. The value is encrypted when stored in Database Migration Service. */
  username?: string;
  /** Required. Input only. The password for the user that Database Migration Service will be using to connect to the database. This field is not returned on request, and the value is encrypted when stored in Database Migration Service. */
  password?: string;
  /** Output only. Indicates whether a new password is included in the request. */
  passwordSet?: boolean;
  /** SSL configuration for the destination to connect to the source database. */
  ssl?: SslConfig;
  /** Optional. The project id of the Cloud SQL instance. If not provided, the project id of the connection profile will be used. */
  cloudSqlProjectId?: string;
  /** If the source is a Cloud SQL database, use this field to provide the Cloud SQL instance ID of the source. */
  cloudSqlId?: string;
  /** The backup details in Cloud Storage for homogeneous migration to Cloud SQL for SQL Server. */
  backups?: SqlServerBackups;
  /** Required. The name of the specific database within the host. */
  database?: string;
  /** Static IP connectivity data (default, no additional details needed). */
  staticIpConnectivity?: StaticIpConnectivity;
  /** Forward SSH tunnel connectivity. */
  forwardSshConnectivity?: ForwardSshTunnelConnectivity;
  /** Private connectivity. */
  privateConnectivity?: PrivateConnectivity;
  /** Private Service Connect connectivity. */
  privateServiceConnectConnectivity?: PrivateServiceConnectConnectivity;
}

export const SqlServerConnectionProfile: Schema.Schema<SqlServerConnectionProfile> = Schema.suspend(() => Schema.Struct({
  host: Schema.optional(Schema.String),
  port: Schema.optional(Schema.Number),
  dbmPort: Schema.optional(Schema.Number),
  username: Schema.optional(Schema.String),
  password: Schema.optional(Schema.String),
  passwordSet: Schema.optional(Schema.Boolean),
  ssl: Schema.optional(SslConfig),
  cloudSqlProjectId: Schema.optional(Schema.String),
  cloudSqlId: Schema.optional(Schema.String),
  backups: Schema.optional(SqlServerBackups),
  database: Schema.optional(Schema.String),
  staticIpConnectivity: Schema.optional(StaticIpConnectivity),
  forwardSshConnectivity: Schema.optional(ForwardSshTunnelConnectivity),
  privateConnectivity: Schema.optional(PrivateConnectivity),
  privateServiceConnectConnectivity: Schema.optional(PrivateServiceConnectConnectivity),
})).annotate({ identifier: "SqlServerConnectionProfile" }) as any as Schema.Schema<SqlServerConnectionProfile>;

export interface StaticServiceIpConnectivity {
}

export const StaticServiceIpConnectivity: Schema.Schema<StaticServiceIpConnectivity> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "StaticServiceIpConnectivity" }) as any as Schema.Schema<StaticServiceIpConnectivity>;

export interface OracleAsmConfig {
  /** Required. Hostname for the Oracle ASM connection. */
  hostname?: string;
  /** Required. Port for the Oracle ASM connection. */
  port?: number;
  /** Required. Username for the Oracle ASM connection. */
  username?: string;
  /** Required. Input only. Password for the Oracle ASM connection. */
  password?: string;
  /** Output only. Indicates whether a new password is included in the request. */
  passwordSet?: boolean;
  /** Required. ASM service name for the Oracle ASM connection. */
  asmService?: string;
  /** Optional. SSL configuration for the Oracle connection. */
  ssl?: SslConfig;
}

export const OracleAsmConfig: Schema.Schema<OracleAsmConfig> = Schema.suspend(() => Schema.Struct({
  hostname: Schema.optional(Schema.String),
  port: Schema.optional(Schema.Number),
  username: Schema.optional(Schema.String),
  password: Schema.optional(Schema.String),
  passwordSet: Schema.optional(Schema.Boolean),
  asmService: Schema.optional(Schema.String),
  ssl: Schema.optional(SslConfig),
})).annotate({ identifier: "OracleAsmConfig" }) as any as Schema.Schema<OracleAsmConfig>;

export interface OracleConnectionProfile {
  /** Required. The IP or hostname of the source Oracle database. */
  host?: string;
  /** Required. The network port of the source Oracle database. */
  port?: number;
  /** Required. The username that Database Migration Service will use to connect to the database. The value is encrypted when stored in Database Migration Service. */
  username?: string;
  /** Required. Input only. The password for the user that Database Migration Service will be using to connect to the database. This field is not returned on request, and the value is encrypted when stored in Database Migration Service. */
  password?: string;
  /** Output only. Indicates whether a new password is included in the request. */
  passwordSet?: boolean;
  /** Required. Database service for the Oracle connection. */
  databaseService?: string;
  /** SSL configuration for the connection to the source Oracle database. * Only `SERVER_ONLY` configuration is supported for Oracle SSL. * SSL is supported for Oracle versions 12 and above. */
  ssl?: SslConfig;
  /** Static Service IP connectivity. */
  staticServiceIpConnectivity?: StaticServiceIpConnectivity;
  /** Forward SSH tunnel connectivity. */
  forwardSshConnectivity?: ForwardSshTunnelConnectivity;
  /** Private connectivity. */
  privateConnectivity?: PrivateConnectivity;
  /** Optional. Configuration for Oracle ASM connection. */
  oracleAsmConfig?: OracleAsmConfig;
}

export const OracleConnectionProfile: Schema.Schema<OracleConnectionProfile> = Schema.suspend(() => Schema.Struct({
  host: Schema.optional(Schema.String),
  port: Schema.optional(Schema.Number),
  username: Schema.optional(Schema.String),
  password: Schema.optional(Schema.String),
  passwordSet: Schema.optional(Schema.Boolean),
  databaseService: Schema.optional(Schema.String),
  ssl: Schema.optional(SslConfig),
  staticServiceIpConnectivity: Schema.optional(StaticServiceIpConnectivity),
  forwardSshConnectivity: Schema.optional(ForwardSshTunnelConnectivity),
  privateConnectivity: Schema.optional(PrivateConnectivity),
  oracleAsmConfig: Schema.optional(OracleAsmConfig),
})).annotate({ identifier: "OracleConnectionProfile" }) as any as Schema.Schema<OracleConnectionProfile>;

export interface SqlAclEntry {
  /** The allowlisted value for the access control list. */
  value?: string;
  /** The time when this access control entry expires in [RFC 3339](https://tools.ietf.org/html/rfc3339) format, for example: `2012-11-15T16:19:00.094Z`. */
  expireTime?: string;
  /** Input only. The time-to-leave of this access control entry. */
  ttl?: string;
  /** A label to identify this entry. */
  label?: string;
}

export const SqlAclEntry: Schema.Schema<SqlAclEntry> = Schema.suspend(() => Schema.Struct({
  value: Schema.optional(Schema.String),
  expireTime: Schema.optional(Schema.String),
  ttl: Schema.optional(Schema.String),
  label: Schema.optional(Schema.String),
})).annotate({ identifier: "SqlAclEntry" }) as any as Schema.Schema<SqlAclEntry>;

export interface SqlIpConfig {
  /** Whether the instance should be assigned an IPv4 address or not. */
  enableIpv4?: boolean;
  /** The resource link for the VPC network from which the Cloud SQL instance is accessible for private IP. For example, `projects/myProject/global/networks/default`. This setting can be updated, but it cannot be removed after it is set. */
  privateNetwork?: string;
  /** Optional. The name of the allocated IP address range for the private IP Cloud SQL instance. This name refers to an already allocated IP range address. If set, the instance IP address will be created in the allocated range. Note that this IP address range can't be modified after the instance is created. If you change the VPC when configuring connectivity settings for the migration job, this field is not relevant. */
  allocatedIpRange?: string;
  /** Whether SSL connections over IP should be enforced or not. */
  requireSsl?: boolean;
  /** The list of external networks that are allowed to connect to the instance using the IP. See https://en.wikipedia.org/wiki/CIDR_notation#CIDR_notation, also known as 'slash' notation (e.g. `192.168.100.0/24`). */
  authorizedNetworks?: Array<SqlAclEntry>;
}

export const SqlIpConfig: Schema.Schema<SqlIpConfig> = Schema.suspend(() => Schema.Struct({
  enableIpv4: Schema.optional(Schema.Boolean),
  privateNetwork: Schema.optional(Schema.String),
  allocatedIpRange: Schema.optional(Schema.String),
  requireSsl: Schema.optional(Schema.Boolean),
  authorizedNetworks: Schema.optional(Schema.Array(SqlAclEntry)),
})).annotate({ identifier: "SqlIpConfig" }) as any as Schema.Schema<SqlIpConfig>;

export interface DataCacheConfig {
  /** Optional. Whether data cache is enabled for the instance. */
  dataCacheEnabled?: boolean;
}

export const DataCacheConfig: Schema.Schema<DataCacheConfig> = Schema.suspend(() => Schema.Struct({
  dataCacheEnabled: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "DataCacheConfig" }) as any as Schema.Schema<DataCacheConfig>;

export interface CloudSqlSettings {
  /** The database engine type and version. Deprecated. Use database_version_name instead. */
  databaseVersion?: "SQL_DATABASE_VERSION_UNSPECIFIED" | "MYSQL_5_6" | "MYSQL_5_7" | "MYSQL_8_0" | "MYSQL_8_0_18" | "MYSQL_8_0_26" | "MYSQL_8_0_27" | "MYSQL_8_0_28" | "MYSQL_8_0_30" | "MYSQL_8_0_31" | "MYSQL_8_0_32" | "MYSQL_8_0_33" | "MYSQL_8_0_34" | "MYSQL_8_0_35" | "MYSQL_8_0_36" | "MYSQL_8_0_37" | "MYSQL_8_4" | "POSTGRES_9_6" | "POSTGRES_11" | "POSTGRES_10" | "POSTGRES_12" | "POSTGRES_13" | "POSTGRES_14" | "POSTGRES_15" | "POSTGRES_16" | (string & {});
  /** Optional. The database engine type and version name. */
  databaseVersionName?: string;
  /** The resource labels for a Cloud SQL instance to use to annotate any related underlying resources such as Compute Engine VMs. An object containing a list of "key": "value" pairs. Example: `{ "name": "wrench", "mass": "18kg", "count": "3" }`. */
  userLabels?: Record<string, string>;
  /** The tier (or machine type) for this instance, for example: `db-n1-standard-1` (MySQL instances) or `db-custom-1-3840` (PostgreSQL instances). For more information, see [Cloud SQL Instance Settings](https://cloud.google.com/sql/docs/mysql/instance-settings). */
  tier?: string;
  /** The maximum size to which storage capacity can be automatically increased. The default value is 0, which specifies that there is no limit. */
  storageAutoResizeLimit?: string;
  /** The activation policy specifies when the instance is activated; it is applicable only when the instance state is 'RUNNABLE'. Valid values: 'ALWAYS': The instance is on, and remains so even in the absence of connection requests. `NEVER`: The instance is off; it is not activated, even if a connection request arrives. */
  activationPolicy?: "SQL_ACTIVATION_POLICY_UNSPECIFIED" | "ALWAYS" | "NEVER" | (string & {});
  /** The settings for IP Management. This allows to enable or disable the instance IP and manage which external networks can connect to the instance. The IPv4 address cannot be disabled. */
  ipConfig?: SqlIpConfig;
  /** [default: ON] If you enable this setting, Cloud SQL checks your available storage every 30 seconds. If the available storage falls below a threshold size, Cloud SQL automatically adds additional storage capacity. If the available storage repeatedly falls below the threshold size, Cloud SQL continues to add storage until it reaches the maximum of 30 TB. */
  autoStorageIncrease?: boolean;
  /** The database flags passed to the Cloud SQL instance at startup. An object containing a list of "key": value pairs. Example: { "name": "wrench", "mass": "1.3kg", "count": "3" }. */
  databaseFlags?: Record<string, string>;
  /** The type of storage: `PD_SSD` (default) or `PD_HDD` or `HYPERDISK_BALANCED`. */
  dataDiskType?: "SQL_DATA_DISK_TYPE_UNSPECIFIED" | "PD_SSD" | "PD_HDD" | "HYPERDISK_BALANCED" | (string & {});
  /** The storage capacity available to the database, in GB. The minimum (and default) size is 10GB. */
  dataDiskSizeGb?: string;
  /** The Google Cloud Platform zone where your Cloud SQL database instance is located. */
  zone?: string;
  /** Optional. The Google Cloud Platform zone where the failover Cloud SQL database instance is located. Used when the Cloud SQL database availability type is REGIONAL (i.e. multiple zones / highly available). */
  secondaryZone?: string;
  /** The Database Migration Service source connection profile ID, in the format: `projects/my_project_name/locations/us-central1/connectionProfiles/connection_profile_ID` */
  sourceId?: string;
  /** Input only. Initial root password. */
  rootPassword?: string;
  /** Output only. Indicates If this connection profile root password is stored. */
  rootPasswordSet?: boolean;
  /** The Cloud SQL default instance level collation. */
  collation?: string;
  /** The KMS key name used for the csql instance. */
  cmekKeyName?: string;
  /** Optional. Availability type. Potential values: * `ZONAL`: The instance serves data from only one zone. Outages in that zone affect data availability. * `REGIONAL`: The instance can serve data from more than one zone in a region (it is highly available). */
  availabilityType?: "SQL_AVAILABILITY_TYPE_UNSPECIFIED" | "ZONAL" | "REGIONAL" | (string & {});
  /** Optional. The edition of the given Cloud SQL instance. */
  edition?: "EDITION_UNSPECIFIED" | "ENTERPRISE" | "ENTERPRISE_PLUS" | (string & {});
  /** Optional. Data cache is an optional feature available for Cloud SQL for MySQL Enterprise Plus edition only. For more information on data cache, see [Data cache overview](https://cloud.google.com/sql/help/mysql-data-cache) in Cloud SQL documentation. */
  dataCacheConfig?: DataCacheConfig;
  /** Optional. Provisioned number of I/O operations per second for the data disk. This field is only used for hyperdisk-balanced disk types. */
  dataDiskProvisionedIops?: string;
  /** Optional. Provisioned throughput measured in MiB per second for the data disk. This field is only used for hyperdisk-balanced disk types. */
  dataDiskProvisionedThroughput?: string;
}

export const CloudSqlSettings: Schema.Schema<CloudSqlSettings> = Schema.suspend(() => Schema.Struct({
  databaseVersion: Schema.optional(Schema.String),
  databaseVersionName: Schema.optional(Schema.String),
  userLabels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  tier: Schema.optional(Schema.String),
  storageAutoResizeLimit: Schema.optional(Schema.String),
  activationPolicy: Schema.optional(Schema.String),
  ipConfig: Schema.optional(SqlIpConfig),
  autoStorageIncrease: Schema.optional(Schema.Boolean),
  databaseFlags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  dataDiskType: Schema.optional(Schema.String),
  dataDiskSizeGb: Schema.optional(Schema.String),
  zone: Schema.optional(Schema.String),
  secondaryZone: Schema.optional(Schema.String),
  sourceId: Schema.optional(Schema.String),
  rootPassword: Schema.optional(Schema.String),
  rootPasswordSet: Schema.optional(Schema.Boolean),
  collation: Schema.optional(Schema.String),
  cmekKeyName: Schema.optional(Schema.String),
  availabilityType: Schema.optional(Schema.String),
  edition: Schema.optional(Schema.String),
  dataCacheConfig: Schema.optional(DataCacheConfig),
  dataDiskProvisionedIops: Schema.optional(Schema.String),
  dataDiskProvisionedThroughput: Schema.optional(Schema.String),
})).annotate({ identifier: "CloudSqlSettings" }) as any as Schema.Schema<CloudSqlSettings>;

export interface CloudSqlConnectionProfile {
  /** Output only. The Cloud SQL instance ID that this connection profile is associated with. */
  cloudSqlId?: string;
  /** Immutable. Metadata used to create the destination Cloud SQL database. */
  settings?: CloudSqlSettings;
  /** Output only. The Cloud SQL database instance's private IP. */
  privateIp?: string;
  /** Output only. The Cloud SQL database instance's public IP. */
  publicIp?: string;
  /** Output only. The Cloud SQL database instance's additional (outgoing) public IP. Used when the Cloud SQL database availability type is REGIONAL (i.e. multiple zones / highly available). */
  additionalPublicIp?: string;
}

export const CloudSqlConnectionProfile: Schema.Schema<CloudSqlConnectionProfile> = Schema.suspend(() => Schema.Struct({
  cloudSqlId: Schema.optional(Schema.String),
  settings: Schema.optional(CloudSqlSettings),
  privateIp: Schema.optional(Schema.String),
  publicIp: Schema.optional(Schema.String),
  additionalPublicIp: Schema.optional(Schema.String),
})).annotate({ identifier: "CloudSqlConnectionProfile" }) as any as Schema.Schema<CloudSqlConnectionProfile>;

export interface UserPassword {
  /** The database username. */
  user?: string;
  /** The initial password for the user. */
  password?: string;
  /** Output only. Indicates if the initial_user.password field has been set. */
  passwordSet?: boolean;
}

export const UserPassword: Schema.Schema<UserPassword> = Schema.suspend(() => Schema.Struct({
  user: Schema.optional(Schema.String),
  password: Schema.optional(Schema.String),
  passwordSet: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "UserPassword" }) as any as Schema.Schema<UserPassword>;

export interface MachineConfig {
  /** The number of CPU's in the VM instance. */
  cpuCount?: number;
  /** Optional. Machine type of the VM instance. E.g. "n2-highmem-4", "n2-highmem-8", "c4a-highmem-4-lssd". cpu_count must match the number of vCPUs in the machine type. */
  machineType?: string;
}

export const MachineConfig: Schema.Schema<MachineConfig> = Schema.suspend(() => Schema.Struct({
  cpuCount: Schema.optional(Schema.Number),
  machineType: Schema.optional(Schema.String),
})).annotate({ identifier: "MachineConfig" }) as any as Schema.Schema<MachineConfig>;

export interface AuthorizedNetwork {
  /** Optional. CIDR range for one authorzied network of the instance. */
  cidrRange?: string;
}

export const AuthorizedNetwork: Schema.Schema<AuthorizedNetwork> = Schema.suspend(() => Schema.Struct({
  cidrRange: Schema.optional(Schema.String),
})).annotate({ identifier: "AuthorizedNetwork" }) as any as Schema.Schema<AuthorizedNetwork>;

export interface InstanceNetworkConfig {
  /** Optional. A list of external network authorized to access this instance. */
  authorizedExternalNetworks?: Array<AuthorizedNetwork>;
  /** Optional. Enabling public ip for the instance. */
  enablePublicIp?: boolean;
  /** Optional. Enabling an outbound public IP address to support a database server sending requests out into the internet. */
  enableOutboundPublicIp?: boolean;
}

export const InstanceNetworkConfig: Schema.Schema<InstanceNetworkConfig> = Schema.suspend(() => Schema.Struct({
  authorizedExternalNetworks: Schema.optional(Schema.Array(AuthorizedNetwork)),
  enablePublicIp: Schema.optional(Schema.Boolean),
  enableOutboundPublicIp: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "InstanceNetworkConfig" }) as any as Schema.Schema<InstanceNetworkConfig>;

export interface PrimaryInstanceSettings {
  /** Required. The ID of the AlloyDB primary instance. The ID must satisfy the regex expression "[a-z0-9-]+". */
  id?: string;
  /** Configuration for the machines that host the underlying database engine. */
  machineConfig?: MachineConfig;
  /** Database flags to pass to AlloyDB when DMS is creating the AlloyDB cluster and instances. See the AlloyDB documentation for how these can be used. */
  databaseFlags?: Record<string, string>;
  /** Labels for the AlloyDB primary instance created by DMS. An object containing a list of 'key', 'value' pairs. */
  labels?: Record<string, string>;
  /** Output only. The private IP address for the Instance. This is the connection endpoint for an end-user application. */
  privateIp?: string;
  /** Optional. Metadata related to instance level network configuration. */
  instanceNetworkConfig?: InstanceNetworkConfig;
  /** Output only. All outbound public IP addresses configured for the instance. */
  outboundPublicIpAddresses?: Array<string>;
}

export const PrimaryInstanceSettings: Schema.Schema<PrimaryInstanceSettings> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  machineConfig: Schema.optional(MachineConfig),
  databaseFlags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  privateIp: Schema.optional(Schema.String),
  instanceNetworkConfig: Schema.optional(InstanceNetworkConfig),
  outboundPublicIpAddresses: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "PrimaryInstanceSettings" }) as any as Schema.Schema<PrimaryInstanceSettings>;

export interface EncryptionConfig {
  /** The fully-qualified resource name of the KMS key. Each Cloud KMS key is regionalized and has the following format: projects/[PROJECT]/locations/[REGION]/keyRings/[RING]/cryptoKeys/[KEY_NAME] */
  kmsKeyName?: string;
}

export const EncryptionConfig: Schema.Schema<EncryptionConfig> = Schema.suspend(() => Schema.Struct({
  kmsKeyName: Schema.optional(Schema.String),
})).annotate({ identifier: "EncryptionConfig" }) as any as Schema.Schema<EncryptionConfig>;

export interface AlloyDbSettings {
  /** Required. Input only. Initial user to setup during cluster creation. Required. */
  initialUser?: UserPassword;
  /** Required. The resource link for the VPC network in which cluster resources are created and from which they are accessible via Private IP. The network must belong to the same project as the cluster. It is specified in the form: "projects/{project_number}/global/networks/{network_id}". This is required to create a cluster. */
  vpcNetwork?: string;
  /** Labels for the AlloyDB cluster created by DMS. An object containing a list of 'key', 'value' pairs. */
  labels?: Record<string, string>;
  /** Settings for the cluster's primary instance */
  primaryInstanceSettings?: PrimaryInstanceSettings;
  /** Optional. The encryption config can be specified to encrypt the data disks and other persistent data resources of a cluster with a customer-managed encryption key (CMEK). When this field is not specified, the cluster will then use default encryption scheme to protect the user data. */
  encryptionConfig?: EncryptionConfig;
  /** Optional. The database engine major version. This is an optional field. If a database version is not supplied at cluster creation time, then a default database version will be used. */
  databaseVersion?: "DATABASE_VERSION_UNSPECIFIED" | "POSTGRES_14" | "POSTGRES_15" | "POSTGRES_16" | "POSTGRES_17" | "POSTGRES_18" | (string & {});
}

export const AlloyDbSettings: Schema.Schema<AlloyDbSettings> = Schema.suspend(() => Schema.Struct({
  initialUser: Schema.optional(UserPassword),
  vpcNetwork: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  primaryInstanceSettings: Schema.optional(PrimaryInstanceSettings),
  encryptionConfig: Schema.optional(EncryptionConfig),
  databaseVersion: Schema.optional(Schema.String),
})).annotate({ identifier: "AlloyDbSettings" }) as any as Schema.Schema<AlloyDbSettings>;

export interface AlloyDbConnectionProfile {
  /** Required. The AlloyDB cluster ID that this connection profile is associated with. */
  clusterId?: string;
  /** Immutable. Metadata used to create the destination AlloyDB cluster. */
  settings?: AlloyDbSettings;
}

export const AlloyDbConnectionProfile: Schema.Schema<AlloyDbConnectionProfile> = Schema.suspend(() => Schema.Struct({
  clusterId: Schema.optional(Schema.String),
  settings: Schema.optional(AlloyDbSettings),
})).annotate({ identifier: "AlloyDbConnectionProfile" }) as any as Schema.Schema<AlloyDbConnectionProfile>;

export interface ConnectionProfile {
  /** The name of this connection profile resource in the form of projects/{project}/locations/{location}/connectionProfiles/{connectionProfile}. */
  name?: string;
  /** Output only. The timestamp when the resource was created. A timestamp in RFC3339 UTC "Zulu" format, accurate to nanoseconds. Example: "2014-10-02T15:01:23.045123456Z". */
  createTime?: string;
  /** Output only. The timestamp when the resource was last updated. A timestamp in RFC3339 UTC "Zulu" format, accurate to nanoseconds. Example: "2014-10-02T15:01:23.045123456Z". */
  updateTime?: string;
  /** The resource labels for connection profile to use to annotate any related underlying resources such as Compute Engine VMs. An object containing a list of "key": "value" pairs. Example: `{ "name": "wrench", "mass": "1.3kg", "count": "3" }`. */
  labels?: Record<string, string>;
  /** The current connection profile state (e.g. DRAFT, READY, or FAILED). */
  state?: "STATE_UNSPECIFIED" | "DRAFT" | "CREATING" | "READY" | "UPDATING" | "DELETING" | "DELETED" | "FAILED" | (string & {});
  /** The connection profile display name. */
  displayName?: string;
  /** Optional. The connection profile role. */
  role?: "ROLE_UNSPECIFIED" | "SOURCE" | "DESTINATION" | (string & {});
  /** A MySQL database connection profile. */
  mysql?: MySqlConnectionProfile;
  /** A PostgreSQL database connection profile. */
  postgresql?: PostgreSqlConnectionProfile;
  /** Connection profile for a SQL Server data source. */
  sqlserver?: SqlServerConnectionProfile;
  /** An Oracle database connection profile. */
  oracle?: OracleConnectionProfile;
  /** A CloudSQL database connection profile. */
  cloudsql?: CloudSqlConnectionProfile;
  /** An AlloyDB cluster connection profile. */
  alloydb?: AlloyDbConnectionProfile;
  /** Output only. The error details in case of state FAILED. */
  error?: Status;
  /** The database provider. */
  provider?: "DATABASE_PROVIDER_UNSPECIFIED" | "CLOUDSQL" | "RDS" | "AURORA" | "ALLOYDB" | "AZURE_DATABASE" | (string & {});
  /** Output only. Reserved for future use. */
  satisfiesPzs?: boolean;
  /** Output only. Reserved for future use. */
  satisfiesPzi?: boolean;
}

export const ConnectionProfile: Schema.Schema<ConnectionProfile> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  state: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  role: Schema.optional(Schema.String),
  mysql: Schema.optional(MySqlConnectionProfile),
  postgresql: Schema.optional(PostgreSqlConnectionProfile),
  sqlserver: Schema.optional(SqlServerConnectionProfile),
  oracle: Schema.optional(OracleConnectionProfile),
  cloudsql: Schema.optional(CloudSqlConnectionProfile),
  alloydb: Schema.optional(AlloyDbConnectionProfile),
  error: Schema.optional(Status),
  provider: Schema.optional(Schema.String),
  satisfiesPzs: Schema.optional(Schema.Boolean),
  satisfiesPzi: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "ConnectionProfile" }) as any as Schema.Schema<ConnectionProfile>;

export interface ListConnectionProfilesResponse {
  /** The response list of connection profiles. */
  connectionProfiles?: Array<ConnectionProfile>;
  /** A token which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
}

export const ListConnectionProfilesResponse: Schema.Schema<ListConnectionProfilesResponse> = Schema.suspend(() => Schema.Struct({
  connectionProfiles: Schema.optional(Schema.Array(ConnectionProfile)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListConnectionProfilesResponse" }) as any as Schema.Schema<ListConnectionProfilesResponse>;

export interface VpcPeeringConfig {
  /** Required. Fully qualified name of the VPC that Database Migration Service will peer to. */
  vpcName?: string;
  /** Required. A free subnet for peering. (CIDR of /29) */
  subnet?: string;
}

export const VpcPeeringConfig: Schema.Schema<VpcPeeringConfig> = Schema.suspend(() => Schema.Struct({
  vpcName: Schema.optional(Schema.String),
  subnet: Schema.optional(Schema.String),
})).annotate({ identifier: "VpcPeeringConfig" }) as any as Schema.Schema<VpcPeeringConfig>;

export interface PscInterfaceConfig {
  /** Required. Fully qualified name of the Network Attachment that DMS will connect to. Format: `projects/{{project}}/regions/{{region}}/networkAttachments/{{name}}` */
  networkAttachment?: string;
}

export const PscInterfaceConfig: Schema.Schema<PscInterfaceConfig> = Schema.suspend(() => Schema.Struct({
  networkAttachment: Schema.optional(Schema.String),
})).annotate({ identifier: "PscInterfaceConfig" }) as any as Schema.Schema<PscInterfaceConfig>;

export interface PrivateConnection {
  /** The name of the resource. */
  name?: string;
  /** Output only. The create time of the resource. */
  createTime?: string;
  /** Output only. The last update time of the resource. */
  updateTime?: string;
  /** The resource labels for private connections to use to annotate any related underlying resources such as Compute Engine VMs. An object containing a list of "key": "value" pairs. Example: `{ "name": "wrench", "mass": "1.3kg", "count": "3" }`. */
  labels?: Record<string, string>;
  /** The private connection display name. */
  displayName?: string;
  /** Output only. The state of the private connection. */
  state?: "STATE_UNSPECIFIED" | "CREATING" | "CREATED" | "FAILED" | "DELETING" | "FAILED_TO_DELETE" | "DELETED" | (string & {});
  /** Output only. The error details in case of state FAILED. */
  error?: Status;
  /** Output only. Reserved for future use. */
  satisfiesPzs?: boolean;
  /** Output only. Reserved for future use. */
  satisfiesPzi?: boolean;
  /** VPC peering configuration. */
  vpcPeeringConfig?: VpcPeeringConfig;
  /** PSC Interface configuration. */
  pscInterfaceConfig?: PscInterfaceConfig;
}

export const PrivateConnection: Schema.Schema<PrivateConnection> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  displayName: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  error: Schema.optional(Status),
  satisfiesPzs: Schema.optional(Schema.Boolean),
  satisfiesPzi: Schema.optional(Schema.Boolean),
  vpcPeeringConfig: Schema.optional(VpcPeeringConfig),
  pscInterfaceConfig: Schema.optional(PscInterfaceConfig),
})).annotate({ identifier: "PrivateConnection" }) as any as Schema.Schema<PrivateConnection>;

export interface ListPrivateConnectionsResponse {
  /** List of private connections. */
  privateConnections?: Array<PrivateConnection>;
  /** A token which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
}

export const ListPrivateConnectionsResponse: Schema.Schema<ListPrivateConnectionsResponse> = Schema.suspend(() => Schema.Struct({
  privateConnections: Schema.optional(Schema.Array(PrivateConnection)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListPrivateConnectionsResponse" }) as any as Schema.Schema<ListPrivateConnectionsResponse>;

export interface DatabaseEngineInfo {
  /** Required. Engine type. */
  engine?: "DATABASE_ENGINE_UNSPECIFIED" | "MYSQL" | "POSTGRESQL" | "SQLSERVER" | "ORACLE" | (string & {});
  /** Required. Engine version, for example "12.c.1". */
  version?: string;
}

export const DatabaseEngineInfo: Schema.Schema<DatabaseEngineInfo> = Schema.suspend(() => Schema.Struct({
  engine: Schema.optional(Schema.String),
  version: Schema.optional(Schema.String),
})).annotate({ identifier: "DatabaseEngineInfo" }) as any as Schema.Schema<DatabaseEngineInfo>;

export interface ConversionWorkspace {
  /** Full name of the workspace resource, in the form of: projects/{project}/locations/{location}/conversionWorkspaces/{conversion_workspace}. */
  name?: string;
  /** Required. The source engine details. */
  source?: DatabaseEngineInfo;
  /** Required. The destination engine details. */
  destination?: DatabaseEngineInfo;
  /** Optional. A generic list of settings for the workspace. The settings are database pair dependant and can indicate default behavior for the mapping rules engine or turn on or off specific features. Such examples can be: convert_foreign_key_to_interleave=true, skip_triggers=false, ignore_non_table_synonyms=true */
  globalSettings?: Record<string, string>;
  /** Output only. Whether the workspace has uncommitted changes (changes which were made after the workspace was committed). */
  hasUncommittedChanges?: boolean;
  /** Output only. The latest commit ID. */
  latestCommitId?: string;
  /** Output only. The timestamp when the workspace was committed. */
  latestCommitTime?: string;
  /** Output only. The timestamp when the workspace resource was created. */
  createTime?: string;
  /** Output only. The timestamp when the workspace resource was last updated. */
  updateTime?: string;
  /** Optional. The display name for the workspace. */
  displayName?: string;
  /** Optional. The provider for the destination database. */
  destinationProvider?: "DATABASE_PROVIDER_UNSPECIFIED" | "CLOUDSQL" | "RDS" | "AURORA" | "ALLOYDB" | "AZURE_DATABASE" | (string & {});
  /** Optional. The provider for the source database. */
  sourceProvider?: "DATABASE_PROVIDER_UNSPECIFIED" | "CLOUDSQL" | "RDS" | "AURORA" | "ALLOYDB" | "AZURE_DATABASE" | (string & {});
}

export const ConversionWorkspace: Schema.Schema<ConversionWorkspace> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  source: Schema.optional(DatabaseEngineInfo),
  destination: Schema.optional(DatabaseEngineInfo),
  globalSettings: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  hasUncommittedChanges: Schema.optional(Schema.Boolean),
  latestCommitId: Schema.optional(Schema.String),
  latestCommitTime: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  destinationProvider: Schema.optional(Schema.String),
  sourceProvider: Schema.optional(Schema.String),
})).annotate({ identifier: "ConversionWorkspace" }) as any as Schema.Schema<ConversionWorkspace>;

export interface ListConversionWorkspacesResponse {
  /** The list of conversion workspace objects. */
  conversionWorkspaces?: Array<ConversionWorkspace>;
  /** A token which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
}

export const ListConversionWorkspacesResponse: Schema.Schema<ListConversionWorkspacesResponse> = Schema.suspend(() => Schema.Struct({
  conversionWorkspaces: Schema.optional(Schema.Array(ConversionWorkspace)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListConversionWorkspacesResponse" }) as any as Schema.Schema<ListConversionWorkspacesResponse>;

export interface MappingRuleFilter {
  /** Optional. The rule should be applied to entities whose parent entity (fully qualified name) matches the given value. For example, if the rule applies to a table entity, the expected value should be a schema (schema). If the rule applies to a column or index entity, the expected value can be either a schema (schema) or a table (schema.table) */
  parentEntity?: string;
  /** Optional. The rule should be applied to entities whose non-qualified name starts with the given prefix. */
  entityNamePrefix?: string;
  /** Optional. The rule should be applied to entities whose non-qualified name ends with the given suffix. */
  entityNameSuffix?: string;
  /** Optional. The rule should be applied to entities whose non-qualified name contains the given string. */
  entityNameContains?: string;
  /** Optional. The rule should be applied to specific entities defined by their fully qualified names. */
  entities?: Array<string>;
}

export const MappingRuleFilter: Schema.Schema<MappingRuleFilter> = Schema.suspend(() => Schema.Struct({
  parentEntity: Schema.optional(Schema.String),
  entityNamePrefix: Schema.optional(Schema.String),
  entityNameSuffix: Schema.optional(Schema.String),
  entityNameContains: Schema.optional(Schema.String),
  entities: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "MappingRuleFilter" }) as any as Schema.Schema<MappingRuleFilter>;

export interface SingleEntityRename {
  /** Required. The new name of the destination entity */
  newName?: string;
}

export const SingleEntityRename: Schema.Schema<SingleEntityRename> = Schema.suspend(() => Schema.Struct({
  newName: Schema.optional(Schema.String),
})).annotate({ identifier: "SingleEntityRename" }) as any as Schema.Schema<SingleEntityRename>;

export interface MultiEntityRename {
  /** Optional. The pattern used to generate the new entity's name. This pattern must include the characters '{name}', which will be replaced with the name of the original entity. For example, the pattern 't_{name}' for an entity name jobs would be converted to 't_jobs'. If unspecified, the default value for this field is '{name}' */
  newNamePattern?: string;
  /** Optional. Additional transformation that can be done on the source entity name before it is being used by the new_name_pattern, for example lower case. If no transformation is desired, use NO_TRANSFORMATION */
  sourceNameTransformation?: "ENTITY_NAME_TRANSFORMATION_UNSPECIFIED" | "ENTITY_NAME_TRANSFORMATION_NO_TRANSFORMATION" | "ENTITY_NAME_TRANSFORMATION_LOWER_CASE" | "ENTITY_NAME_TRANSFORMATION_UPPER_CASE" | "ENTITY_NAME_TRANSFORMATION_CAPITALIZED_CASE" | (string & {});
}

export const MultiEntityRename: Schema.Schema<MultiEntityRename> = Schema.suspend(() => Schema.Struct({
  newNamePattern: Schema.optional(Schema.String),
  sourceNameTransformation: Schema.optional(Schema.String),
})).annotate({ identifier: "MultiEntityRename" }) as any as Schema.Schema<MultiEntityRename>;

export interface EntityMove {
  /** Required. The new schema */
  newSchema?: string;
}

export const EntityMove: Schema.Schema<EntityMove> = Schema.suspend(() => Schema.Struct({
  newSchema: Schema.optional(Schema.String),
})).annotate({ identifier: "EntityMove" }) as any as Schema.Schema<EntityMove>;

export interface SingleColumnChange {
  /** Optional. Column data type name. */
  dataType?: string;
  /** Optional. Charset override - instead of table level charset. */
  charset?: string;
  /** Optional. Collation override - instead of table level collation. */
  collation?: string;
  /** Optional. Column length - e.g. 50 as in varchar (50) - when relevant. */
  length?: string;
  /** Optional. Column precision - e.g. 8 as in double (8,2) - when relevant. */
  precision?: number;
  /** Optional. Column scale - e.g. 2 as in double (8,2) - when relevant. */
  scale?: number;
  /** Optional. Column fractional seconds precision - e.g. 2 as in timestamp (2) - when relevant. */
  fractionalSecondsPrecision?: number;
  /** Optional. Is the column of array type. */
  array?: boolean;
  /** Optional. The length of the array, only relevant if the column type is an array. */
  arrayLength?: number;
  /** Optional. Is the column nullable. */
  nullable?: boolean;
  /** Optional. Is the column auto-generated/identity. */
  autoGenerated?: boolean;
  /** Optional. Is the column a UDT (User-defined Type). */
  udt?: boolean;
  /** Optional. Custom engine specific features. */
  customFeatures?: Record<string, unknown>;
  /** Optional. Specifies the list of values allowed in the column. */
  setValues?: Array<string>;
  /** Optional. Comment associated with the column. */
  comment?: string;
}

export const SingleColumnChange: Schema.Schema<SingleColumnChange> = Schema.suspend(() => Schema.Struct({
  dataType: Schema.optional(Schema.String),
  charset: Schema.optional(Schema.String),
  collation: Schema.optional(Schema.String),
  length: Schema.optional(Schema.String),
  precision: Schema.optional(Schema.Number),
  scale: Schema.optional(Schema.Number),
  fractionalSecondsPrecision: Schema.optional(Schema.Number),
  array: Schema.optional(Schema.Boolean),
  arrayLength: Schema.optional(Schema.Number),
  nullable: Schema.optional(Schema.Boolean),
  autoGenerated: Schema.optional(Schema.Boolean),
  udt: Schema.optional(Schema.Boolean),
  customFeatures: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  setValues: Schema.optional(Schema.Array(Schema.String)),
  comment: Schema.optional(Schema.String),
})).annotate({ identifier: "SingleColumnChange" }) as any as Schema.Schema<SingleColumnChange>;

export interface SourceTextFilter {
  /** Optional. The filter will match columns with length greater than or equal to this number. */
  sourceMinLengthFilter?: string;
  /** Optional. The filter will match columns with length smaller than or equal to this number. */
  sourceMaxLengthFilter?: string;
}

export const SourceTextFilter: Schema.Schema<SourceTextFilter> = Schema.suspend(() => Schema.Struct({
  sourceMinLengthFilter: Schema.optional(Schema.String),
  sourceMaxLengthFilter: Schema.optional(Schema.String),
})).annotate({ identifier: "SourceTextFilter" }) as any as Schema.Schema<SourceTextFilter>;

export interface SourceNumericFilter {
  /** Optional. The filter will match columns with scale greater than or equal to this number. */
  sourceMinScaleFilter?: number;
  /** Optional. The filter will match columns with scale smaller than or equal to this number. */
  sourceMaxScaleFilter?: number;
  /** Optional. The filter will match columns with precision greater than or equal to this number. */
  sourceMinPrecisionFilter?: number;
  /** Optional. The filter will match columns with precision smaller than or equal to this number. */
  sourceMaxPrecisionFilter?: number;
  /** Required. Enum to set the option defining the datatypes numeric filter has to be applied to */
  numericFilterOption?: "NUMERIC_FILTER_OPTION_UNSPECIFIED" | "NUMERIC_FILTER_OPTION_ALL" | "NUMERIC_FILTER_OPTION_LIMIT" | "NUMERIC_FILTER_OPTION_LIMITLESS" | (string & {});
}

export const SourceNumericFilter: Schema.Schema<SourceNumericFilter> = Schema.suspend(() => Schema.Struct({
  sourceMinScaleFilter: Schema.optional(Schema.Number),
  sourceMaxScaleFilter: Schema.optional(Schema.Number),
  sourceMinPrecisionFilter: Schema.optional(Schema.Number),
  sourceMaxPrecisionFilter: Schema.optional(Schema.Number),
  numericFilterOption: Schema.optional(Schema.String),
})).annotate({ identifier: "SourceNumericFilter" }) as any as Schema.Schema<SourceNumericFilter>;

export interface MultiColumnDatatypeChange {
  /** Required. Filter on source data type. */
  sourceDataTypeFilter?: string;
  /** Optional. Filter for text-based data types like varchar. */
  sourceTextFilter?: SourceTextFilter;
  /** Optional. Filter for fixed point number data types such as NUMERIC/NUMBER. */
  sourceNumericFilter?: SourceNumericFilter;
  /** Required. New data type. */
  newDataType?: string;
  /** Optional. Column length - e.g. varchar (50) - if not specified and relevant uses the source column length. */
  overrideLength?: string;
  /** Optional. Column scale - when relevant - if not specified and relevant uses the source column scale. */
  overrideScale?: number;
  /** Optional. Column precision - when relevant - if not specified and relevant uses the source column precision. */
  overridePrecision?: number;
  /** Optional. Column fractional seconds precision - used only for timestamp based datatypes - if not specified and relevant uses the source column fractional seconds precision. */
  overrideFractionalSecondsPrecision?: number;
  /** Optional. Custom engine specific features. */
  customFeatures?: Record<string, unknown>;
}

export const MultiColumnDatatypeChange: Schema.Schema<MultiColumnDatatypeChange> = Schema.suspend(() => Schema.Struct({
  sourceDataTypeFilter: Schema.optional(Schema.String),
  sourceTextFilter: Schema.optional(SourceTextFilter),
  sourceNumericFilter: Schema.optional(SourceNumericFilter),
  newDataType: Schema.optional(Schema.String),
  overrideLength: Schema.optional(Schema.String),
  overrideScale: Schema.optional(Schema.Number),
  overridePrecision: Schema.optional(Schema.Number),
  overrideFractionalSecondsPrecision: Schema.optional(Schema.Number),
  customFeatures: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "MultiColumnDatatypeChange" }) as any as Schema.Schema<MultiColumnDatatypeChange>;

export interface ValueListFilter {
  /** Required. Indicates whether the filter matches rows with values that are present in the list or those with values not present in it. */
  valuePresentList?: "VALUE_PRESENT_IN_LIST_UNSPECIFIED" | "VALUE_PRESENT_IN_LIST_IF_VALUE_LIST" | "VALUE_PRESENT_IN_LIST_IF_VALUE_NOT_LIST" | (string & {});
  /** Required. The list to be used to filter by */
  values?: Array<string>;
  /** Required. Whether to ignore case when filtering by values. Defaults to false */
  ignoreCase?: boolean;
}

export const ValueListFilter: Schema.Schema<ValueListFilter> = Schema.suspend(() => Schema.Struct({
  valuePresentList: Schema.optional(Schema.String),
  values: Schema.optional(Schema.Array(Schema.String)),
  ignoreCase: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "ValueListFilter" }) as any as Schema.Schema<ValueListFilter>;

export interface IntComparisonFilter {
  /** Required. Relation between source value and compare value */
  valueComparison?: "VALUE_COMPARISON_UNSPECIFIED" | "VALUE_COMPARISON_IF_VALUE_SMALLER_THAN" | "VALUE_COMPARISON_IF_VALUE_SMALLER_EQUAL_THAN" | "VALUE_COMPARISON_IF_VALUE_LARGER_THAN" | "VALUE_COMPARISON_IF_VALUE_LARGER_EQUAL_THAN" | (string & {});
  /** Required. Integer compare value to be used */
  value?: string;
}

export const IntComparisonFilter: Schema.Schema<IntComparisonFilter> = Schema.suspend(() => Schema.Struct({
  valueComparison: Schema.optional(Schema.String),
  value: Schema.optional(Schema.String),
})).annotate({ identifier: "IntComparisonFilter" }) as any as Schema.Schema<IntComparisonFilter>;

export interface DoubleComparisonFilter {
  /** Required. Relation between source value and compare value */
  valueComparison?: "VALUE_COMPARISON_UNSPECIFIED" | "VALUE_COMPARISON_IF_VALUE_SMALLER_THAN" | "VALUE_COMPARISON_IF_VALUE_SMALLER_EQUAL_THAN" | "VALUE_COMPARISON_IF_VALUE_LARGER_THAN" | "VALUE_COMPARISON_IF_VALUE_LARGER_EQUAL_THAN" | (string & {});
  /** Required. Double compare value to be used */
  value?: number;
}

export const DoubleComparisonFilter: Schema.Schema<DoubleComparisonFilter> = Schema.suspend(() => Schema.Struct({
  valueComparison: Schema.optional(Schema.String),
  value: Schema.optional(Schema.Number),
})).annotate({ identifier: "DoubleComparisonFilter" }) as any as Schema.Schema<DoubleComparisonFilter>;

export interface AssignSpecificValue {
  /** Required. Specific value to be assigned */
  value?: string;
}

export const AssignSpecificValue: Schema.Schema<AssignSpecificValue> = Schema.suspend(() => Schema.Struct({
  value: Schema.optional(Schema.String),
})).annotate({ identifier: "AssignSpecificValue" }) as any as Schema.Schema<AssignSpecificValue>;

export interface RoundToScale {
  /** Required. Scale value to be used */
  scale?: number;
}

export const RoundToScale: Schema.Schema<RoundToScale> = Schema.suspend(() => Schema.Struct({
  scale: Schema.optional(Schema.Number),
})).annotate({ identifier: "RoundToScale" }) as any as Schema.Schema<RoundToScale>;

export interface ApplyHash {
  /** Optional. Generate UUID from the data's byte array */
  uuidFromBytes?: Empty;
}

export const ApplyHash: Schema.Schema<ApplyHash> = Schema.suspend(() => Schema.Struct({
  uuidFromBytes: Schema.optional(Empty),
})).annotate({ identifier: "ApplyHash" }) as any as Schema.Schema<ApplyHash>;

export interface ValueTransformation {
  /** Optional. Value is null */
  isNull?: Empty;
  /** Optional. Value is found in the specified list. */
  valueList?: ValueListFilter;
  /** Optional. Filter on relation between source value and compare value of type integer. */
  intComparison?: IntComparisonFilter;
  /** Optional. Filter on relation between source value and compare value of type double. */
  doubleComparison?: DoubleComparisonFilter;
  /** Optional. Set to null */
  assignNull?: Empty;
  /** Optional. Set to a specific value (value is converted to fit the target data type) */
  assignSpecificValue?: AssignSpecificValue;
  /** Optional. Set to min_value - if integer or numeric, will use int.minvalue, etc */
  assignMinValue?: Empty;
  /** Optional. Set to max_value - if integer or numeric, will use int.maxvalue, etc */
  assignMaxValue?: Empty;
  /** Optional. Allows the data to change scale */
  roundScale?: RoundToScale;
  /** Optional. Applies a hash function on the data */
  applyHash?: ApplyHash;
}

export const ValueTransformation: Schema.Schema<ValueTransformation> = Schema.suspend(() => Schema.Struct({
  isNull: Schema.optional(Empty),
  valueList: Schema.optional(ValueListFilter),
  intComparison: Schema.optional(IntComparisonFilter),
  doubleComparison: Schema.optional(DoubleComparisonFilter),
  assignNull: Schema.optional(Empty),
  assignSpecificValue: Schema.optional(AssignSpecificValue),
  assignMinValue: Schema.optional(Empty),
  assignMaxValue: Schema.optional(Empty),
  roundScale: Schema.optional(RoundToScale),
  applyHash: Schema.optional(ApplyHash),
})).annotate({ identifier: "ValueTransformation" }) as any as Schema.Schema<ValueTransformation>;

export interface ConditionalColumnSetValue {
  /** Optional. Optional filter on source column length. Used for text based data types like varchar. */
  sourceTextFilter?: SourceTextFilter;
  /** Optional. Optional filter on source column precision and scale. Used for fixed point numbers such as NUMERIC/NUMBER data types. */
  sourceNumericFilter?: SourceNumericFilter;
  /** Required. Description of data transformation during migration. */
  valueTransformation?: ValueTransformation;
  /** Optional. Custom engine specific features. */
  customFeatures?: Record<string, unknown>;
}

export const ConditionalColumnSetValue: Schema.Schema<ConditionalColumnSetValue> = Schema.suspend(() => Schema.Struct({
  sourceTextFilter: Schema.optional(SourceTextFilter),
  sourceNumericFilter: Schema.optional(SourceNumericFilter),
  valueTransformation: Schema.optional(ValueTransformation),
  customFeatures: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "ConditionalColumnSetValue" }) as any as Schema.Schema<ConditionalColumnSetValue>;

export interface ConvertRowIdToColumn {
  /** Required. Only work on tables without primary key defined */
  onlyIfNoPrimaryKey?: boolean;
}

export const ConvertRowIdToColumn: Schema.Schema<ConvertRowIdToColumn> = Schema.suspend(() => Schema.Struct({
  onlyIfNoPrimaryKey: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "ConvertRowIdToColumn" }) as any as Schema.Schema<ConvertRowIdToColumn>;

export interface SetTablePrimaryKey {
  /** Required. List of column names for the primary key */
  primaryKeyColumns?: Array<string>;
  /** Optional. Name for the primary key */
  primaryKey?: string;
}

export const SetTablePrimaryKey: Schema.Schema<SetTablePrimaryKey> = Schema.suspend(() => Schema.Struct({
  primaryKeyColumns: Schema.optional(Schema.Array(Schema.String)),
  primaryKey: Schema.optional(Schema.String),
})).annotate({ identifier: "SetTablePrimaryKey" }) as any as Schema.Schema<SetTablePrimaryKey>;

export interface SinglePackageChange {
  /** Optional. Sql code for package description */
  packageDescription?: string;
  /** Optional. Sql code for package body */
  packageBody?: string;
}

export const SinglePackageChange: Schema.Schema<SinglePackageChange> = Schema.suspend(() => Schema.Struct({
  packageDescription: Schema.optional(Schema.String),
  packageBody: Schema.optional(Schema.String),
})).annotate({ identifier: "SinglePackageChange" }) as any as Schema.Schema<SinglePackageChange>;

export interface SourceSqlChange {
  /** Required. Sql code for source (stored procedure, function, trigger or view) */
  sqlCode?: string;
}

export const SourceSqlChange: Schema.Schema<SourceSqlChange> = Schema.suspend(() => Schema.Struct({
  sqlCode: Schema.optional(Schema.String),
})).annotate({ identifier: "SourceSqlChange" }) as any as Schema.Schema<SourceSqlChange>;

export interface FilterTableColumns {
  /** Optional. List of columns to be included for a particular table. */
  includeColumns?: Array<string>;
  /** Optional. List of columns to be excluded for a particular table. */
  excludeColumns?: Array<string>;
}

export const FilterTableColumns: Schema.Schema<FilterTableColumns> = Schema.suspend(() => Schema.Struct({
  includeColumns: Schema.optional(Schema.Array(Schema.String)),
  excludeColumns: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "FilterTableColumns" }) as any as Schema.Schema<FilterTableColumns>;

export interface MappingRule {
  /** Full name of the mapping rule resource, in the form of: projects/{project}/locations/{location}/conversionWorkspaces/{set}/mappingRule/{rule}. */
  name?: string;
  /** Optional. A human readable name */
  displayName?: string;
  /** Optional. The mapping rule state */
  state?: "STATE_UNSPECIFIED" | "ENABLED" | "DISABLED" | "DELETED" | (string & {});
  /** Required. The rule scope */
  ruleScope?: "DATABASE_ENTITY_TYPE_UNSPECIFIED" | "DATABASE_ENTITY_TYPE_SCHEMA" | "DATABASE_ENTITY_TYPE_TABLE" | "DATABASE_ENTITY_TYPE_COLUMN" | "DATABASE_ENTITY_TYPE_CONSTRAINT" | "DATABASE_ENTITY_TYPE_INDEX" | "DATABASE_ENTITY_TYPE_TRIGGER" | "DATABASE_ENTITY_TYPE_VIEW" | "DATABASE_ENTITY_TYPE_SEQUENCE" | "DATABASE_ENTITY_TYPE_STORED_PROCEDURE" | "DATABASE_ENTITY_TYPE_FUNCTION" | "DATABASE_ENTITY_TYPE_SYNONYM" | "DATABASE_ENTITY_TYPE_DATABASE_PACKAGE" | "DATABASE_ENTITY_TYPE_UDT" | "DATABASE_ENTITY_TYPE_MATERIALIZED_VIEW" | "DATABASE_ENTITY_TYPE_DATABASE" | (string & {});
  /** Required. The rule filter */
  filter?: MappingRuleFilter;
  /** Required. The order in which the rule is applied. Lower order rules are applied before higher value rules so they may end up being overridden. */
  ruleOrder?: string;
  /** Output only. The revision ID of the mapping rule. A new revision is committed whenever the mapping rule is changed in any way. The format is an 8-character hexadecimal string. */
  revisionId?: string;
  /** Output only. The timestamp that the revision was created. */
  revisionCreateTime?: string;
  /** Optional. Rule to specify how a single entity should be renamed. */
  singleEntityRename?: SingleEntityRename;
  /** Optional. Rule to specify how multiple entities should be renamed. */
  multiEntityRename?: MultiEntityRename;
  /** Optional. Rule to specify how multiple entities should be relocated into a different schema. */
  entityMove?: EntityMove;
  /** Optional. Rule to specify how a single column is converted. */
  singleColumnChange?: SingleColumnChange;
  /** Optional. Rule to specify how multiple columns should be converted to a different data type. */
  multiColumnDataTypeChange?: MultiColumnDatatypeChange;
  /** Optional. Rule to specify how the data contained in a column should be transformed (such as trimmed, rounded, etc) provided that the data meets certain criteria. */
  conditionalColumnSetValue?: ConditionalColumnSetValue;
  /** Optional. Rule to specify how multiple tables should be converted with an additional rowid column. */
  convertRowidColumn?: ConvertRowIdToColumn;
  /** Optional. Rule to specify the primary key for a table */
  setTablePrimaryKey?: SetTablePrimaryKey;
  /** Optional. Rule to specify how a single package is converted. */
  singlePackageChange?: SinglePackageChange;
  /** Optional. Rule to change the sql code for an entity, for example, function, procedure. */
  sourceSqlChange?: SourceSqlChange;
  /** Optional. Rule to specify the list of columns to include or exclude from a table. */
  filterTableColumns?: FilterTableColumns;
}

export const MappingRule: Schema.Schema<MappingRule> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  ruleScope: Schema.optional(Schema.String),
  filter: Schema.optional(MappingRuleFilter),
  ruleOrder: Schema.optional(Schema.String),
  revisionId: Schema.optional(Schema.String),
  revisionCreateTime: Schema.optional(Schema.String),
  singleEntityRename: Schema.optional(SingleEntityRename),
  multiEntityRename: Schema.optional(MultiEntityRename),
  entityMove: Schema.optional(EntityMove),
  singleColumnChange: Schema.optional(SingleColumnChange),
  multiColumnDataTypeChange: Schema.optional(MultiColumnDatatypeChange),
  conditionalColumnSetValue: Schema.optional(ConditionalColumnSetValue),
  convertRowidColumn: Schema.optional(ConvertRowIdToColumn),
  setTablePrimaryKey: Schema.optional(SetTablePrimaryKey),
  singlePackageChange: Schema.optional(SinglePackageChange),
  sourceSqlChange: Schema.optional(SourceSqlChange),
  filterTableColumns: Schema.optional(FilterTableColumns),
})).annotate({ identifier: "MappingRule" }) as any as Schema.Schema<MappingRule>;

export interface ListMappingRulesResponse {
  /** The list of conversion workspace mapping rules. */
  mappingRules?: Array<MappingRule>;
  /** A token which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const ListMappingRulesResponse: Schema.Schema<ListMappingRulesResponse> = Schema.suspend(() => Schema.Struct({
  mappingRules: Schema.optional(Schema.Array(MappingRule)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListMappingRulesResponse" }) as any as Schema.Schema<ListMappingRulesResponse>;

export interface SeedConversionWorkspaceRequest {
  /** Should the conversion workspace be committed automatically after the seed operation. */
  autoCommit?: boolean;
  /** Optional. Fully qualified (Uri) name of the source connection profile. */
  sourceConnectionProfile?: string;
  /** Optional. Fully qualified (Uri) name of the destination connection profile. */
  destinationConnectionProfile?: string;
}

export const SeedConversionWorkspaceRequest: Schema.Schema<SeedConversionWorkspaceRequest> = Schema.suspend(() => Schema.Struct({
  autoCommit: Schema.optional(Schema.Boolean),
  sourceConnectionProfile: Schema.optional(Schema.String),
  destinationConnectionProfile: Schema.optional(Schema.String),
})).annotate({ identifier: "SeedConversionWorkspaceRequest" }) as any as Schema.Schema<SeedConversionWorkspaceRequest>;

export interface RulesFile {
  /** Required. The filename of the rules that needs to be converted. The filename is used mainly so that future logs of the import rules job contain it, and can therefore be searched by it. */
  rulesSourceFilename?: string;
  /** Required. The text content of the rules that needs to be converted. */
  rulesContent?: string;
}

export const RulesFile: Schema.Schema<RulesFile> = Schema.suspend(() => Schema.Struct({
  rulesSourceFilename: Schema.optional(Schema.String),
  rulesContent: Schema.optional(Schema.String),
})).annotate({ identifier: "RulesFile" }) as any as Schema.Schema<RulesFile>;

export interface ImportMappingRulesRequest {
  /** Required. The format of the rules content file. */
  rulesFormat?: "IMPORT_RULES_FILE_FORMAT_UNSPECIFIED" | "IMPORT_RULES_FILE_FORMAT_HARBOUR_BRIDGE_SESSION_FILE" | "IMPORT_RULES_FILE_FORMAT_ORATOPG_CONFIG_FILE" | (string & {});
  /** Required. One or more rules files. */
  rulesFiles?: Array<RulesFile>;
  /** Required. Should the conversion workspace be committed automatically after the import operation. */
  autoCommit?: boolean;
}

export const ImportMappingRulesRequest: Schema.Schema<ImportMappingRulesRequest> = Schema.suspend(() => Schema.Struct({
  rulesFormat: Schema.optional(Schema.String),
  rulesFiles: Schema.optional(Schema.Array(RulesFile)),
  autoCommit: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "ImportMappingRulesRequest" }) as any as Schema.Schema<ImportMappingRulesRequest>;

export interface ConvertConversionWorkspaceRequest {
  /** Optional. Specifies whether the conversion workspace is to be committed automatically after the conversion. */
  autoCommit?: boolean;
  /** Optional. Filter the entities to convert. Leaving this field empty will convert all of the entities. Supports Google AIP-160 style filtering. */
  filter?: string;
  /** Optional. Automatically convert the full entity path for each entity specified by the filter. For example, if the filter specifies a table, that table schema (and database if there is one) will also be converted. */
  convertFullPath?: boolean;
}

export const ConvertConversionWorkspaceRequest: Schema.Schema<ConvertConversionWorkspaceRequest> = Schema.suspend(() => Schema.Struct({
  autoCommit: Schema.optional(Schema.Boolean),
  filter: Schema.optional(Schema.String),
  convertFullPath: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "ConvertConversionWorkspaceRequest" }) as any as Schema.Schema<ConvertConversionWorkspaceRequest>;

export interface CommitConversionWorkspaceRequest {
  /** Optional. Optional name of the commit. */
  commitName?: string;
}

export const CommitConversionWorkspaceRequest: Schema.Schema<CommitConversionWorkspaceRequest> = Schema.suspend(() => Schema.Struct({
  commitName: Schema.optional(Schema.String),
})).annotate({ identifier: "CommitConversionWorkspaceRequest" }) as any as Schema.Schema<CommitConversionWorkspaceRequest>;

export interface RollbackConversionWorkspaceRequest {
}

export const RollbackConversionWorkspaceRequest: Schema.Schema<RollbackConversionWorkspaceRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "RollbackConversionWorkspaceRequest" }) as any as Schema.Schema<RollbackConversionWorkspaceRequest>;

export interface ApplyConversionWorkspaceRequest {
  /** Optional. Filter which entities to apply. Leaving this field empty will apply all of the entities. Supports Google AIP 160 based filtering. */
  filter?: string;
  /** Optional. Only validates the apply process, but doesn't change the destination database. Only works for PostgreSQL destination connection profile. */
  dryRun?: boolean;
  /** Optional. Specifies whether the conversion workspace is to be committed automatically after the apply. */
  autoCommit?: boolean;
  /** Optional. Fully qualified (Uri) name of the destination connection profile. */
  connectionProfile?: string;
}

export const ApplyConversionWorkspaceRequest: Schema.Schema<ApplyConversionWorkspaceRequest> = Schema.suspend(() => Schema.Struct({
  filter: Schema.optional(Schema.String),
  dryRun: Schema.optional(Schema.Boolean),
  autoCommit: Schema.optional(Schema.Boolean),
  connectionProfile: Schema.optional(Schema.String),
})).annotate({ identifier: "ApplyConversionWorkspaceRequest" }) as any as Schema.Schema<ApplyConversionWorkspaceRequest>;

export interface EntityMappingLogEntry {
  /** Which rule caused this log entry. */
  ruleId?: string;
  /** Rule revision ID. */
  ruleRevisionId?: string;
  /** Comment. */
  mappingComment?: string;
}

export const EntityMappingLogEntry: Schema.Schema<EntityMappingLogEntry> = Schema.suspend(() => Schema.Struct({
  ruleId: Schema.optional(Schema.String),
  ruleRevisionId: Schema.optional(Schema.String),
  mappingComment: Schema.optional(Schema.String),
})).annotate({ identifier: "EntityMappingLogEntry" }) as any as Schema.Schema<EntityMappingLogEntry>;

export interface EntityMapping {
  /** Source entity full name. The source entity can also be a column, index or constraint using the same naming notation schema.table.column. */
  sourceEntity?: string;
  /** Target entity full name. The draft entity can also include a column, index or constraint using the same naming notation schema.table.column. */
  draftEntity?: string;
  /** Type of source entity. */
  sourceType?: "DATABASE_ENTITY_TYPE_UNSPECIFIED" | "DATABASE_ENTITY_TYPE_SCHEMA" | "DATABASE_ENTITY_TYPE_TABLE" | "DATABASE_ENTITY_TYPE_COLUMN" | "DATABASE_ENTITY_TYPE_CONSTRAINT" | "DATABASE_ENTITY_TYPE_INDEX" | "DATABASE_ENTITY_TYPE_TRIGGER" | "DATABASE_ENTITY_TYPE_VIEW" | "DATABASE_ENTITY_TYPE_SEQUENCE" | "DATABASE_ENTITY_TYPE_STORED_PROCEDURE" | "DATABASE_ENTITY_TYPE_FUNCTION" | "DATABASE_ENTITY_TYPE_SYNONYM" | "DATABASE_ENTITY_TYPE_DATABASE_PACKAGE" | "DATABASE_ENTITY_TYPE_UDT" | "DATABASE_ENTITY_TYPE_MATERIALIZED_VIEW" | "DATABASE_ENTITY_TYPE_DATABASE" | (string & {});
  /** Type of draft entity. */
  draftType?: "DATABASE_ENTITY_TYPE_UNSPECIFIED" | "DATABASE_ENTITY_TYPE_SCHEMA" | "DATABASE_ENTITY_TYPE_TABLE" | "DATABASE_ENTITY_TYPE_COLUMN" | "DATABASE_ENTITY_TYPE_CONSTRAINT" | "DATABASE_ENTITY_TYPE_INDEX" | "DATABASE_ENTITY_TYPE_TRIGGER" | "DATABASE_ENTITY_TYPE_VIEW" | "DATABASE_ENTITY_TYPE_SEQUENCE" | "DATABASE_ENTITY_TYPE_STORED_PROCEDURE" | "DATABASE_ENTITY_TYPE_FUNCTION" | "DATABASE_ENTITY_TYPE_SYNONYM" | "DATABASE_ENTITY_TYPE_DATABASE_PACKAGE" | "DATABASE_ENTITY_TYPE_UDT" | "DATABASE_ENTITY_TYPE_MATERIALIZED_VIEW" | "DATABASE_ENTITY_TYPE_DATABASE" | (string & {});
  /** Entity mapping log entries. Multiple rules can be effective and contribute changes to a converted entity, such as a rule can handle the entity name, another rule can handle an entity type. In addition, rules which did not change the entity are also logged along with the reason preventing them to do so. */
  mappingLog?: Array<EntityMappingLogEntry>;
}

export const EntityMapping: Schema.Schema<EntityMapping> = Schema.suspend(() => Schema.Struct({
  sourceEntity: Schema.optional(Schema.String),
  draftEntity: Schema.optional(Schema.String),
  sourceType: Schema.optional(Schema.String),
  draftType: Schema.optional(Schema.String),
  mappingLog: Schema.optional(Schema.Array(EntityMappingLogEntry)),
})).annotate({ identifier: "EntityMapping" }) as any as Schema.Schema<EntityMapping>;

export interface EntityDdl {
  /** Type of DDL (Create, Alter). */
  ddlType?: string;
  /** The name of the database entity the ddl refers to. */
  entity?: string;
  /** The actual ddl code. */
  ddl?: string;
  /** The entity type (if the DDL is for a sub entity). */
  entityType?: "DATABASE_ENTITY_TYPE_UNSPECIFIED" | "DATABASE_ENTITY_TYPE_SCHEMA" | "DATABASE_ENTITY_TYPE_TABLE" | "DATABASE_ENTITY_TYPE_COLUMN" | "DATABASE_ENTITY_TYPE_CONSTRAINT" | "DATABASE_ENTITY_TYPE_INDEX" | "DATABASE_ENTITY_TYPE_TRIGGER" | "DATABASE_ENTITY_TYPE_VIEW" | "DATABASE_ENTITY_TYPE_SEQUENCE" | "DATABASE_ENTITY_TYPE_STORED_PROCEDURE" | "DATABASE_ENTITY_TYPE_FUNCTION" | "DATABASE_ENTITY_TYPE_SYNONYM" | "DATABASE_ENTITY_TYPE_DATABASE_PACKAGE" | "DATABASE_ENTITY_TYPE_UDT" | "DATABASE_ENTITY_TYPE_MATERIALIZED_VIEW" | "DATABASE_ENTITY_TYPE_DATABASE" | (string & {});
  /** The DDL Kind selected for apply, or UNSPECIFIED if the entity wasn't converted yet. */
  ddlKind?: "DDL_KIND_UNSPECIFIED" | "SOURCE" | "DETERMINISTIC" | "AI" | "USER_EDIT" | (string & {});
  /** If ddl_kind is USER_EDIT, this holds the DDL kind of the original content - DETERMINISTIC or AI. Otherwise, this is DDL_KIND_UNSPECIFIED. */
  editedDdlKind?: "DDL_KIND_UNSPECIFIED" | "SOURCE" | "DETERMINISTIC" | "AI" | "USER_EDIT" | (string & {});
  /** EntityIssues found for this ddl. */
  issueId?: Array<string>;
}

export const EntityDdl: Schema.Schema<EntityDdl> = Schema.suspend(() => Schema.Struct({
  ddlType: Schema.optional(Schema.String),
  entity: Schema.optional(Schema.String),
  ddl: Schema.optional(Schema.String),
  entityType: Schema.optional(Schema.String),
  ddlKind: Schema.optional(Schema.String),
  editedDdlKind: Schema.optional(Schema.String),
  issueId: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "EntityDdl" }) as any as Schema.Schema<EntityDdl>;

export interface Position {
  /** Issue line number */
  line?: number;
  /** Issue column number */
  column?: number;
  /** Issue offset */
  offset?: number;
  /** Issue length */
  length?: number;
}

export const Position: Schema.Schema<Position> = Schema.suspend(() => Schema.Struct({
  line: Schema.optional(Schema.Number),
  column: Schema.optional(Schema.Number),
  offset: Schema.optional(Schema.Number),
  length: Schema.optional(Schema.Number),
})).annotate({ identifier: "Position" }) as any as Schema.Schema<Position>;

export interface EntityIssue {
  /** Unique Issue ID. */
  id?: string;
  /** The type of the issue. */
  type?: "ISSUE_TYPE_UNSPECIFIED" | "ISSUE_TYPE_DDL" | "ISSUE_TYPE_APPLY" | "ISSUE_TYPE_CONVERT" | (string & {});
  /** Severity of the issue */
  severity?: "ISSUE_SEVERITY_UNSPECIFIED" | "ISSUE_SEVERITY_INFO" | "ISSUE_SEVERITY_WARNING" | "ISSUE_SEVERITY_ERROR" | (string & {});
  /** Issue detailed message */
  message?: string;
  /** Error/Warning code */
  code?: string;
  /** The ddl which caused the issue, if relevant. */
  ddl?: string;
  /** The position of the issue found, if relevant. */
  position?: Position;
  /** The entity type (if the DDL is for a sub entity). */
  entityType?: "DATABASE_ENTITY_TYPE_UNSPECIFIED" | "DATABASE_ENTITY_TYPE_SCHEMA" | "DATABASE_ENTITY_TYPE_TABLE" | "DATABASE_ENTITY_TYPE_COLUMN" | "DATABASE_ENTITY_TYPE_CONSTRAINT" | "DATABASE_ENTITY_TYPE_INDEX" | "DATABASE_ENTITY_TYPE_TRIGGER" | "DATABASE_ENTITY_TYPE_VIEW" | "DATABASE_ENTITY_TYPE_SEQUENCE" | "DATABASE_ENTITY_TYPE_STORED_PROCEDURE" | "DATABASE_ENTITY_TYPE_FUNCTION" | "DATABASE_ENTITY_TYPE_SYNONYM" | "DATABASE_ENTITY_TYPE_DATABASE_PACKAGE" | "DATABASE_ENTITY_TYPE_UDT" | "DATABASE_ENTITY_TYPE_MATERIALIZED_VIEW" | "DATABASE_ENTITY_TYPE_DATABASE" | (string & {});
}

export const EntityIssue: Schema.Schema<EntityIssue> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  severity: Schema.optional(Schema.String),
  message: Schema.optional(Schema.String),
  code: Schema.optional(Schema.String),
  ddl: Schema.optional(Schema.String),
  position: Schema.optional(Position),
  entityType: Schema.optional(Schema.String),
})).annotate({ identifier: "EntityIssue" }) as any as Schema.Schema<EntityIssue>;

export interface DatabaseInstanceEntity {
  /** Custom engine specific features. */
  customFeatures?: Record<string, unknown>;
}

export const DatabaseInstanceEntity: Schema.Schema<DatabaseInstanceEntity> = Schema.suspend(() => Schema.Struct({
  customFeatures: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "DatabaseInstanceEntity" }) as any as Schema.Schema<DatabaseInstanceEntity>;

export interface SchemaEntity {
  /** Custom engine specific features. */
  customFeatures?: Record<string, unknown>;
}

export const SchemaEntity: Schema.Schema<SchemaEntity> = Schema.suspend(() => Schema.Struct({
  customFeatures: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "SchemaEntity" }) as any as Schema.Schema<SchemaEntity>;

export interface ColumnEntity {
  /** Column name. */
  name?: string;
  /** Column data type. */
  dataType?: string;
  /** Charset override - instead of table level charset. */
  charset?: string;
  /** Collation override - instead of table level collation. */
  collation?: string;
  /** Column length - e.g. varchar (50). */
  length?: string;
  /** Column precision - when relevant. */
  precision?: number;
  /** Column scale - when relevant. */
  scale?: number;
  /** Column fractional second precision - used for timestamp based datatypes. */
  fractionalSecondsPrecision?: number;
  /** Is the column of array type. */
  array?: boolean;
  /** If the column is array, of which length. */
  arrayLength?: number;
  /** Is the column nullable. */
  nullable?: boolean;
  /** Is the column auto-generated/identity. */
  autoGenerated?: boolean;
  /** Is the column a UDT. */
  udt?: boolean;
  /** Custom engine specific features. */
  customFeatures?: Record<string, unknown>;
  /** Specifies the list of values allowed in the column. Only used for set data type. */
  setValues?: Array<string>;
  /** Comment associated with the column. */
  comment?: string;
  /** Column order in the table. */
  ordinalPosition?: number;
  /** Default value of the column. */
  defaultValue?: string;
  /** Is the column a computed column. */
  computed?: boolean;
}

export const ColumnEntity: Schema.Schema<ColumnEntity> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  dataType: Schema.optional(Schema.String),
  charset: Schema.optional(Schema.String),
  collation: Schema.optional(Schema.String),
  length: Schema.optional(Schema.String),
  precision: Schema.optional(Schema.Number),
  scale: Schema.optional(Schema.Number),
  fractionalSecondsPrecision: Schema.optional(Schema.Number),
  array: Schema.optional(Schema.Boolean),
  arrayLength: Schema.optional(Schema.Number),
  nullable: Schema.optional(Schema.Boolean),
  autoGenerated: Schema.optional(Schema.Boolean),
  udt: Schema.optional(Schema.Boolean),
  customFeatures: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  setValues: Schema.optional(Schema.Array(Schema.String)),
  comment: Schema.optional(Schema.String),
  ordinalPosition: Schema.optional(Schema.Number),
  defaultValue: Schema.optional(Schema.String),
  computed: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "ColumnEntity" }) as any as Schema.Schema<ColumnEntity>;

export interface ConstraintEntity {
  /** The name of the table constraint. */
  name?: string;
  /** Type of constraint, for example unique, primary key, foreign key (currently only primary key is supported). */
  type?: string;
  /** Table columns used as part of the Constraint, for example primary key constraint should list the columns which constitutes the key. */
  tableColumns?: Array<string>;
  /** Custom engine specific features. */
  customFeatures?: Record<string, unknown>;
  /** Reference columns which may be associated with the constraint. For example, if the constraint is a FOREIGN_KEY, this represents the list of full names of referenced columns by the foreign key. */
  referenceColumns?: Array<string>;
  /** Reference table which may be associated with the constraint. For example, if the constraint is a FOREIGN_KEY, this represents the list of full name of the referenced table by the foreign key. */
  referenceTable?: string;
  /** Table which is associated with the constraint. In case the constraint is defined on a table, this field is left empty as this information is stored in parent_name. However, if constraint is defined on a view, this field stores the table name on which the view is defined. */
  tableName?: string;
}

export const ConstraintEntity: Schema.Schema<ConstraintEntity> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  tableColumns: Schema.optional(Schema.Array(Schema.String)),
  customFeatures: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  referenceColumns: Schema.optional(Schema.Array(Schema.String)),
  referenceTable: Schema.optional(Schema.String),
  tableName: Schema.optional(Schema.String),
})).annotate({ identifier: "ConstraintEntity" }) as any as Schema.Schema<ConstraintEntity>;

export interface IndexEntity {
  /** The name of the index. */
  name?: string;
  /** Type of index, for example B-TREE. */
  type?: string;
  /** Table columns used as part of the Index, for example B-TREE index should list the columns which constitutes the index. */
  tableColumns?: Array<string>;
  /** For each table_column, mark whether it's sorting order is ascending (false) or descending (true). If no value is defined, assume all columns are sorted in ascending order. Otherwise, the number of items must match that of table_columns with each value specifying the direction of the matched column by its index. */
  tableColumnsDescending?: Array<boolean>;
  /** Boolean value indicating whether the index is unique. */
  unique?: boolean;
  /** Custom engine specific features. */
  customFeatures?: Record<string, unknown>;
}

export const IndexEntity: Schema.Schema<IndexEntity> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  tableColumns: Schema.optional(Schema.Array(Schema.String)),
  tableColumnsDescending: Schema.optional(Schema.Array(Schema.Boolean)),
  unique: Schema.optional(Schema.Boolean),
  customFeatures: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "IndexEntity" }) as any as Schema.Schema<IndexEntity>;

export interface TriggerEntity {
  /** The name of the trigger. */
  name?: string;
  /** The DML, DDL, or database events that fire the trigger, for example INSERT, UPDATE. */
  triggeringEvents?: Array<string>;
  /** Indicates when the trigger fires, for example BEFORE STATEMENT, AFTER EACH ROW. */
  triggerType?: string;
  /** The SQL code which creates the trigger. */
  sqlCode?: string;
  /** Custom engine specific features. */
  customFeatures?: Record<string, unknown>;
}

export const TriggerEntity: Schema.Schema<TriggerEntity> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  triggeringEvents: Schema.optional(Schema.Array(Schema.String)),
  triggerType: Schema.optional(Schema.String),
  sqlCode: Schema.optional(Schema.String),
  customFeatures: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "TriggerEntity" }) as any as Schema.Schema<TriggerEntity>;

export interface TableEntity {
  /** Table columns. */
  columns?: Array<ColumnEntity>;
  /** Table constraints. */
  constraints?: Array<ConstraintEntity>;
  /** Table indices. */
  indices?: Array<IndexEntity>;
  /** Table triggers. */
  triggers?: Array<TriggerEntity>;
  /** Custom engine specific features. */
  customFeatures?: Record<string, unknown>;
  /** Comment associated with the table. */
  comment?: string;
}

export const TableEntity: Schema.Schema<TableEntity> = Schema.suspend(() => Schema.Struct({
  columns: Schema.optional(Schema.Array(ColumnEntity)),
  constraints: Schema.optional(Schema.Array(ConstraintEntity)),
  indices: Schema.optional(Schema.Array(IndexEntity)),
  triggers: Schema.optional(Schema.Array(TriggerEntity)),
  customFeatures: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  comment: Schema.optional(Schema.String),
})).annotate({ identifier: "TableEntity" }) as any as Schema.Schema<TableEntity>;

export interface ViewEntity {
  /** The SQL code which creates the view. */
  sqlCode?: string;
  /** Custom engine specific features. */
  customFeatures?: Record<string, unknown>;
  /** View constraints. */
  constraints?: Array<ConstraintEntity>;
}

export const ViewEntity: Schema.Schema<ViewEntity> = Schema.suspend(() => Schema.Struct({
  sqlCode: Schema.optional(Schema.String),
  customFeatures: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  constraints: Schema.optional(Schema.Array(ConstraintEntity)),
})).annotate({ identifier: "ViewEntity" }) as any as Schema.Schema<ViewEntity>;

export interface SequenceEntity {
  /** Increment value for the sequence. */
  increment?: string;
  /** Start number for the sequence represented as bytes to accommodate large. numbers */
  startValue?: string;
  /** Maximum number for the sequence represented as bytes to accommodate large. numbers */
  maxValue?: string;
  /** Minimum number for the sequence represented as bytes to accommodate large. numbers */
  minValue?: string;
  /** Indicates whether the sequence value should cycle through. */
  cycle?: boolean;
  /** Indicates number of entries to cache / precreate. */
  cache?: string;
  /** Custom engine specific features. */
  customFeatures?: Record<string, unknown>;
}

export const SequenceEntity: Schema.Schema<SequenceEntity> = Schema.suspend(() => Schema.Struct({
  increment: Schema.optional(Schema.String),
  startValue: Schema.optional(Schema.String),
  maxValue: Schema.optional(Schema.String),
  minValue: Schema.optional(Schema.String),
  cycle: Schema.optional(Schema.Boolean),
  cache: Schema.optional(Schema.String),
  customFeatures: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "SequenceEntity" }) as any as Schema.Schema<SequenceEntity>;

export interface StoredProcedureEntity {
  /** The SQL code which creates the stored procedure. */
  sqlCode?: string;
  /** Custom engine specific features. */
  customFeatures?: Record<string, unknown>;
}

export const StoredProcedureEntity: Schema.Schema<StoredProcedureEntity> = Schema.suspend(() => Schema.Struct({
  sqlCode: Schema.optional(Schema.String),
  customFeatures: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "StoredProcedureEntity" }) as any as Schema.Schema<StoredProcedureEntity>;

export interface FunctionEntity {
  /** The SQL code which creates the function. */
  sqlCode?: string;
  /** Custom engine specific features. */
  customFeatures?: Record<string, unknown>;
}

export const FunctionEntity: Schema.Schema<FunctionEntity> = Schema.suspend(() => Schema.Struct({
  sqlCode: Schema.optional(Schema.String),
  customFeatures: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "FunctionEntity" }) as any as Schema.Schema<FunctionEntity>;

export interface SynonymEntity {
  /** The name of the entity for which the synonym is being created (the source). */
  sourceEntity?: string;
  /** The type of the entity for which the synonym is being created (usually a table or a sequence). */
  sourceType?: "DATABASE_ENTITY_TYPE_UNSPECIFIED" | "DATABASE_ENTITY_TYPE_SCHEMA" | "DATABASE_ENTITY_TYPE_TABLE" | "DATABASE_ENTITY_TYPE_COLUMN" | "DATABASE_ENTITY_TYPE_CONSTRAINT" | "DATABASE_ENTITY_TYPE_INDEX" | "DATABASE_ENTITY_TYPE_TRIGGER" | "DATABASE_ENTITY_TYPE_VIEW" | "DATABASE_ENTITY_TYPE_SEQUENCE" | "DATABASE_ENTITY_TYPE_STORED_PROCEDURE" | "DATABASE_ENTITY_TYPE_FUNCTION" | "DATABASE_ENTITY_TYPE_SYNONYM" | "DATABASE_ENTITY_TYPE_DATABASE_PACKAGE" | "DATABASE_ENTITY_TYPE_UDT" | "DATABASE_ENTITY_TYPE_MATERIALIZED_VIEW" | "DATABASE_ENTITY_TYPE_DATABASE" | (string & {});
  /** Custom engine specific features. */
  customFeatures?: Record<string, unknown>;
}

export const SynonymEntity: Schema.Schema<SynonymEntity> = Schema.suspend(() => Schema.Struct({
  sourceEntity: Schema.optional(Schema.String),
  sourceType: Schema.optional(Schema.String),
  customFeatures: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "SynonymEntity" }) as any as Schema.Schema<SynonymEntity>;

export interface PackageEntity {
  /** The SQL code which creates the package. */
  packageSqlCode?: string;
  /** The SQL code which creates the package body. If the package specification has cursors or subprograms, then the package body is mandatory. */
  packageBody?: string;
  /** Custom engine specific features. */
  customFeatures?: Record<string, unknown>;
}

export const PackageEntity: Schema.Schema<PackageEntity> = Schema.suspend(() => Schema.Struct({
  packageSqlCode: Schema.optional(Schema.String),
  packageBody: Schema.optional(Schema.String),
  customFeatures: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "PackageEntity" }) as any as Schema.Schema<PackageEntity>;

export interface UDTEntity {
  /** The SQL code which creates the udt. */
  udtSqlCode?: string;
  /** The SQL code which creates the udt body. */
  udtBody?: string;
  /** Custom engine specific features. */
  customFeatures?: Record<string, unknown>;
}

export const UDTEntity: Schema.Schema<UDTEntity> = Schema.suspend(() => Schema.Struct({
  udtSqlCode: Schema.optional(Schema.String),
  udtBody: Schema.optional(Schema.String),
  customFeatures: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "UDTEntity" }) as any as Schema.Schema<UDTEntity>;

export interface MaterializedViewEntity {
  /** The SQL code which creates the view. */
  sqlCode?: string;
  /** View indices. */
  indices?: Array<IndexEntity>;
  /** Custom engine specific features. */
  customFeatures?: Record<string, unknown>;
}

export const MaterializedViewEntity: Schema.Schema<MaterializedViewEntity> = Schema.suspend(() => Schema.Struct({
  sqlCode: Schema.optional(Schema.String),
  indices: Schema.optional(Schema.Array(IndexEntity)),
  customFeatures: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "MaterializedViewEntity" }) as any as Schema.Schema<MaterializedViewEntity>;

export interface DatabaseEntity {
  /** The short name (e.g. table name) of the entity. */
  shortName?: string;
  /** The full name of the parent entity (e.g. schema name). */
  parentEntity?: string;
  /** The type of tree the entity belongs to. */
  tree?: "TREE_TYPE_UNSPECIFIED" | "SOURCE" | "DRAFT" | "DESTINATION" | (string & {});
  /** The type of the database entity (table, view, index, ...). */
  entityType?: "DATABASE_ENTITY_TYPE_UNSPECIFIED" | "DATABASE_ENTITY_TYPE_SCHEMA" | "DATABASE_ENTITY_TYPE_TABLE" | "DATABASE_ENTITY_TYPE_COLUMN" | "DATABASE_ENTITY_TYPE_CONSTRAINT" | "DATABASE_ENTITY_TYPE_INDEX" | "DATABASE_ENTITY_TYPE_TRIGGER" | "DATABASE_ENTITY_TYPE_VIEW" | "DATABASE_ENTITY_TYPE_SEQUENCE" | "DATABASE_ENTITY_TYPE_STORED_PROCEDURE" | "DATABASE_ENTITY_TYPE_FUNCTION" | "DATABASE_ENTITY_TYPE_SYNONYM" | "DATABASE_ENTITY_TYPE_DATABASE_PACKAGE" | "DATABASE_ENTITY_TYPE_UDT" | "DATABASE_ENTITY_TYPE_MATERIALIZED_VIEW" | "DATABASE_ENTITY_TYPE_DATABASE" | (string & {});
  /** Details about entity mappings. For source tree entities, this holds the draft entities which were generated by the mapping rules. For draft tree entities, this holds the source entities which were converted to form the draft entity. Destination entities will have no mapping details. */
  mappings?: Array<EntityMapping>;
  /** Details about the entity DDL script. Multiple DDL scripts are provided for child entities such as a table entity will have one DDL for the table with additional DDLs for each index, constraint and such. */
  entityDdl?: Array<EntityDdl>;
  /** Details about the various issues found for the entity. */
  issues?: Array<EntityIssue>;
  /** Database. */
  database?: DatabaseInstanceEntity;
  /** Schema. */
  schema?: SchemaEntity;
  /** Table. */
  table?: TableEntity;
  /** View. */
  view?: ViewEntity;
  /** Sequence. */
  sequence?: SequenceEntity;
  /** Stored procedure. */
  storedProcedure?: StoredProcedureEntity;
  /** Function. */
  databaseFunction?: FunctionEntity;
  /** Synonym. */
  synonym?: SynonymEntity;
  /** Package. */
  databasePackage?: PackageEntity;
  /** UDT. */
  udt?: UDTEntity;
  /** Materialized view. */
  materializedView?: MaterializedViewEntity;
}

export const DatabaseEntity: Schema.Schema<DatabaseEntity> = Schema.suspend(() => Schema.Struct({
  shortName: Schema.optional(Schema.String),
  parentEntity: Schema.optional(Schema.String),
  tree: Schema.optional(Schema.String),
  entityType: Schema.optional(Schema.String),
  mappings: Schema.optional(Schema.Array(EntityMapping)),
  entityDdl: Schema.optional(Schema.Array(EntityDdl)),
  issues: Schema.optional(Schema.Array(EntityIssue)),
  database: Schema.optional(DatabaseInstanceEntity),
  schema: Schema.optional(SchemaEntity),
  table: Schema.optional(TableEntity),
  view: Schema.optional(ViewEntity),
  sequence: Schema.optional(SequenceEntity),
  storedProcedure: Schema.optional(StoredProcedureEntity),
  databaseFunction: Schema.optional(FunctionEntity),
  synonym: Schema.optional(SynonymEntity),
  databasePackage: Schema.optional(PackageEntity),
  udt: Schema.optional(UDTEntity),
  materializedView: Schema.optional(MaterializedViewEntity),
})).annotate({ identifier: "DatabaseEntity" }) as any as Schema.Schema<DatabaseEntity>;

export interface DescribeDatabaseEntitiesResponse {
  /** The list of database entities for the conversion workspace. */
  databaseEntities?: Array<DatabaseEntity>;
  /** A token which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const DescribeDatabaseEntitiesResponse: Schema.Schema<DescribeDatabaseEntitiesResponse> = Schema.suspend(() => Schema.Struct({
  databaseEntities: Schema.optional(Schema.Array(DatabaseEntity)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "DescribeDatabaseEntitiesResponse" }) as any as Schema.Schema<DescribeDatabaseEntitiesResponse>;

export interface SeedJobDetails {
  /** Output only. The connection profile which was used for the seed job. */
  connectionProfile?: string;
}

export const SeedJobDetails: Schema.Schema<SeedJobDetails> = Schema.suspend(() => Schema.Struct({
  connectionProfile: Schema.optional(Schema.String),
})).annotate({ identifier: "SeedJobDetails" }) as any as Schema.Schema<SeedJobDetails>;

export interface ImportRulesJobDetails {
  /** Output only. File names used for the import rules job. */
  files?: Array<string>;
  /** Output only. The requested file format. */
  fileFormat?: "IMPORT_RULES_FILE_FORMAT_UNSPECIFIED" | "IMPORT_RULES_FILE_FORMAT_HARBOUR_BRIDGE_SESSION_FILE" | "IMPORT_RULES_FILE_FORMAT_ORATOPG_CONFIG_FILE" | (string & {});
}

export const ImportRulesJobDetails: Schema.Schema<ImportRulesJobDetails> = Schema.suspend(() => Schema.Struct({
  files: Schema.optional(Schema.Array(Schema.String)),
  fileFormat: Schema.optional(Schema.String),
})).annotate({ identifier: "ImportRulesJobDetails" }) as any as Schema.Schema<ImportRulesJobDetails>;

export interface ConvertJobDetails {
  /** Output only. AIP-160 based filter used to specify the entities to convert */
  filter?: string;
}

export const ConvertJobDetails: Schema.Schema<ConvertJobDetails> = Schema.suspend(() => Schema.Struct({
  filter: Schema.optional(Schema.String),
})).annotate({ identifier: "ConvertJobDetails" }) as any as Schema.Schema<ConvertJobDetails>;

export interface ApplyJobDetails {
  /** Output only. The connection profile which was used for the apply job. */
  connectionProfile?: string;
  /** Output only. AIP-160 based filter used to specify the entities to apply */
  filter?: string;
}

export const ApplyJobDetails: Schema.Schema<ApplyJobDetails> = Schema.suspend(() => Schema.Struct({
  connectionProfile: Schema.optional(Schema.String),
  filter: Schema.optional(Schema.String),
})).annotate({ identifier: "ApplyJobDetails" }) as any as Schema.Schema<ApplyJobDetails>;

export interface BackgroundJobLogEntry {
  /** The background job log entry ID. */
  id?: string;
  /** The type of job that was executed. */
  jobType?: "BACKGROUND_JOB_TYPE_UNSPECIFIED" | "BACKGROUND_JOB_TYPE_SOURCE_SEED" | "BACKGROUND_JOB_TYPE_CONVERT" | "BACKGROUND_JOB_TYPE_APPLY_DESTINATION" | "BACKGROUND_JOB_TYPE_IMPORT_RULES_FILE" | (string & {});
  /** The timestamp when the background job was started. */
  startTime?: string;
  /** The timestamp when the background job was finished. */
  finishTime?: string;
  /** Output only. Job completion state, i.e. the final state after the job completed. */
  completionState?: "JOB_COMPLETION_STATE_UNSPECIFIED" | "SUCCEEDED" | "FAILED" | (string & {});
  /** Output only. Job completion comment, such as how many entities were seeded, how many warnings were found during conversion, and similar information. */
  completionComment?: string;
  /** Output only. Whether the client requested the conversion workspace to be committed after a successful completion of the job. */
  requestAutocommit?: boolean;
  /** Output only. Seed job details. */
  seedJobDetails?: SeedJobDetails;
  /** Output only. Import rules job details. */
  importRulesJobDetails?: ImportRulesJobDetails;
  /** Output only. Convert job details. */
  convertJobDetails?: ConvertJobDetails;
  /** Output only. Apply job details. */
  applyJobDetails?: ApplyJobDetails;
}

export const BackgroundJobLogEntry: Schema.Schema<BackgroundJobLogEntry> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  jobType: Schema.optional(Schema.String),
  startTime: Schema.optional(Schema.String),
  finishTime: Schema.optional(Schema.String),
  completionState: Schema.optional(Schema.String),
  completionComment: Schema.optional(Schema.String),
  requestAutocommit: Schema.optional(Schema.Boolean),
  seedJobDetails: Schema.optional(SeedJobDetails),
  importRulesJobDetails: Schema.optional(ImportRulesJobDetails),
  convertJobDetails: Schema.optional(ConvertJobDetails),
  applyJobDetails: Schema.optional(ApplyJobDetails),
})).annotate({ identifier: "BackgroundJobLogEntry" }) as any as Schema.Schema<BackgroundJobLogEntry>;

export interface SearchBackgroundJobsResponse {
  /** The list of conversion workspace mapping rules. */
  jobs?: Array<BackgroundJobLogEntry>;
}

export const SearchBackgroundJobsResponse: Schema.Schema<SearchBackgroundJobsResponse> = Schema.suspend(() => Schema.Struct({
  jobs: Schema.optional(Schema.Array(BackgroundJobLogEntry)),
})).annotate({ identifier: "SearchBackgroundJobsResponse" }) as any as Schema.Schema<SearchBackgroundJobsResponse>;

export interface DescribeConversionWorkspaceRevisionsResponse {
  /** The list of conversion workspace revisions. */
  revisions?: Array<ConversionWorkspace>;
}

export const DescribeConversionWorkspaceRevisionsResponse: Schema.Schema<DescribeConversionWorkspaceRevisionsResponse> = Schema.suspend(() => Schema.Struct({
  revisions: Schema.optional(Schema.Array(ConversionWorkspace)),
})).annotate({ identifier: "DescribeConversionWorkspaceRevisionsResponse" }) as any as Schema.Schema<DescribeConversionWorkspaceRevisionsResponse>;

export interface FetchStaticIpsResponse {
  /** List of static IPs. */
  staticIps?: Array<string>;
  /** A token that can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const FetchStaticIpsResponse: Schema.Schema<FetchStaticIpsResponse> = Schema.suspend(() => Schema.Struct({
  staticIps: Schema.optional(Schema.Array(Schema.String)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "FetchStaticIpsResponse" }) as any as Schema.Schema<FetchStaticIpsResponse>;

export interface HeterogeneousMetadata {
  /** The number of unsupported events. */
  unsupportedEventsCount?: string;
}

export const HeterogeneousMetadata: Schema.Schema<HeterogeneousMetadata> = Schema.suspend(() => Schema.Struct({
  unsupportedEventsCount: Schema.optional(Schema.String),
})).annotate({ identifier: "HeterogeneousMetadata" }) as any as Schema.Schema<HeterogeneousMetadata>;

export interface MigrationJobObject {
  /** The object's name. */
  name?: string;
  /** The object identifier in the data source. */
  sourceObject?: SourceObjectIdentifier;
  /** Output only. The error details in case of failure. */
  error?: Status;
  /** The state of the migration job object. */
  state?: "STATE_UNSPECIFIED" | "NOT_STARTED" | "RUNNING" | "STOPPING" | "STOPPED" | "RESTARTING" | "FAILED" | "REMOVING" | "NOT_SELECTED" | "COMPLETED" | (string & {});
  /** Output only. The phase of the migration job object. */
  phase?: "PHASE_UNSPECIFIED" | "FULL_DUMP" | "CDC" | "READY_FOR_PROMOTE" | "PROMOTE_IN_PROGRESS" | "PROMOTED" | "DIFF_BACKUP" | (string & {});
  /** Output only. The creation time of the migration job object. */
  createTime?: string;
  /** Output only. The last update time of the migration job object. */
  updateTime?: string;
  /** Output only. Metadata for heterogeneous migration jobs objects. */
  heterogeneousMetadata?: HeterogeneousMetadata;
}

export const MigrationJobObject: Schema.Schema<MigrationJobObject> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  sourceObject: Schema.optional(SourceObjectIdentifier),
  error: Schema.optional(Status),
  state: Schema.optional(Schema.String),
  phase: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  heterogeneousMetadata: Schema.optional(HeterogeneousMetadata),
})).annotate({ identifier: "MigrationJobObject" }) as any as Schema.Schema<MigrationJobObject>;

export interface LookupMigrationJobObjectRequest {
  /** Required. The source object identifier which maps to the migration job object. */
  sourceObjectIdentifier?: SourceObjectIdentifier;
}

export const LookupMigrationJobObjectRequest: Schema.Schema<LookupMigrationJobObjectRequest> = Schema.suspend(() => Schema.Struct({
  sourceObjectIdentifier: Schema.optional(SourceObjectIdentifier),
})).annotate({ identifier: "LookupMigrationJobObjectRequest" }) as any as Schema.Schema<LookupMigrationJobObjectRequest>;

export interface ListMigrationJobObjectsResponse {
  /** List of migration job objects. */
  migrationJobObjects?: Array<MigrationJobObject>;
  /** A token, which can be sent as `page_token` to retrieve the next page. */
  nextPageToken?: string;
}

export const ListMigrationJobObjectsResponse: Schema.Schema<ListMigrationJobObjectsResponse> = Schema.suspend(() => Schema.Struct({
  migrationJobObjects: Schema.optional(Schema.Array(MigrationJobObject)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListMigrationJobObjectsResponse" }) as any as Schema.Schema<ListMigrationJobObjectsResponse>;

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

export interface Expr {
  /** Textual representation of an expression in Common Expression Language syntax. */
  expression?: string;
  /** Optional. Title for the expression, i.e. a short string describing its purpose. This can be used e.g. in UIs which allow to enter the expression. */
  title?: string;
  /** Optional. Description of the expression. This is a longer text which describes the expression, e.g. when hovered over it in a UI. */
  description?: string;
  /** Optional. String indicating the location of the expression for error reporting, e.g. a file name and a position in the file. */
  location?: string;
}

export const Expr: Schema.Schema<Expr> = Schema.suspend(() => Schema.Struct({
  expression: Schema.optional(Schema.String),
  title: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  location: Schema.optional(Schema.String),
})).annotate({ identifier: "Expr" }) as any as Schema.Schema<Expr>;

export interface Binding {
  /** Role that is assigned to the list of `members`, or principals. For example, `roles/viewer`, `roles/editor`, or `roles/owner`. For an overview of the IAM roles and permissions, see the [IAM documentation](https://cloud.google.com/iam/docs/roles-overview). For a list of the available pre-defined roles, see [here](https://cloud.google.com/iam/docs/understanding-roles). */
  role?: string;
  /** Specifies the principals requesting access for a Google Cloud resource. `members` can have the following values: * `allUsers`: A special identifier that represents anyone who is on the internet; with or without a Google account. * `allAuthenticatedUsers`: A special identifier that represents anyone who is authenticated with a Google account or a service account. Does not include identities that come from external identity providers (IdPs) through identity federation. * `user:{emailid}`: An email address that represents a specific Google account. For example, `alice@example.com` . * `serviceAccount:{emailid}`: An email address that represents a Google service account. For example, `my-other-app@appspot.gserviceaccount.com`. * `serviceAccount:{projectid}.svc.id.goog[{namespace}/{kubernetes-sa}]`: An identifier for a [Kubernetes service account](https://cloud.google.com/kubernetes-engine/docs/how-to/kubernetes-service-accounts). For example, `my-project.svc.id.goog[my-namespace/my-kubernetes-sa]`. * `group:{emailid}`: An email address that represents a Google group. For example, `admins@example.com`. * `domain:{domain}`: The G Suite domain (primary) that represents all the users of that domain. For example, `google.com` or `example.com`. * `principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workforce identity pool. * `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/group/{group_id}`: All workforce identities in a group. * `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All workforce identities with a specific attribute value. * `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/*`: All identities in a workforce identity pool. * `principal://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workload identity pool. * `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/group/{group_id}`: A workload identity pool group. * `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All identities in a workload identity pool with a certain attribute. * `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/*`: All identities in a workload identity pool. * `deleted:user:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a user that has been recently deleted. For example, `alice@example.com?uid=123456789012345678901`. If the user is recovered, this value reverts to `user:{emailid}` and the recovered user retains the role in the binding. * `deleted:serviceAccount:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a service account that has been recently deleted. For example, `my-other-app@appspot.gserviceaccount.com?uid=123456789012345678901`. If the service account is undeleted, this value reverts to `serviceAccount:{emailid}` and the undeleted service account retains the role in the binding. * `deleted:group:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a Google group that has been recently deleted. For example, `admins@example.com?uid=123456789012345678901`. If the group is recovered, this value reverts to `group:{emailid}` and the recovered group retains the role in the binding. * `deleted:principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: Deleted single identity in a workforce identity pool. For example, `deleted:principal://iam.googleapis.com/locations/global/workforcePools/my-pool-id/subject/my-subject-attribute-value`. */
  members?: Array<string>;
  /** The condition that is associated with this binding. If the condition evaluates to `true`, then this binding applies to the current request. If the condition evaluates to `false`, then this binding does not apply to the current request. However, a different role binding might grant the same role to one or more of the principals in this binding. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  condition?: Expr;
}

export const Binding: Schema.Schema<Binding> = Schema.suspend(() => Schema.Struct({
  role: Schema.optional(Schema.String),
  members: Schema.optional(Schema.Array(Schema.String)),
  condition: Schema.optional(Expr),
})).annotate({ identifier: "Binding" }) as any as Schema.Schema<Binding>;

export interface AuditLogConfig {
  /** The log type that this config enables. */
  logType?: "LOG_TYPE_UNSPECIFIED" | "ADMIN_READ" | "DATA_WRITE" | "DATA_READ" | (string & {});
  /** Specifies the identities that do not cause logging for this type of permission. Follows the same format of Binding.members. */
  exemptedMembers?: Array<string>;
}

export const AuditLogConfig: Schema.Schema<AuditLogConfig> = Schema.suspend(() => Schema.Struct({
  logType: Schema.optional(Schema.String),
  exemptedMembers: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "AuditLogConfig" }) as any as Schema.Schema<AuditLogConfig>;

export interface AuditConfig {
  /** Specifies a service that will be enabled for audit logging. For example, `storage.googleapis.com`, `cloudsql.googleapis.com`. `allServices` is a special value that covers all services. */
  service?: string;
  /** The configuration for logging of each type of permission. */
  auditLogConfigs?: Array<AuditLogConfig>;
}

export const AuditConfig: Schema.Schema<AuditConfig> = Schema.suspend(() => Schema.Struct({
  service: Schema.optional(Schema.String),
  auditLogConfigs: Schema.optional(Schema.Array(AuditLogConfig)),
})).annotate({ identifier: "AuditConfig" }) as any as Schema.Schema<AuditConfig>;

export interface Policy {
  /** Specifies the format of the policy. Valid values are `0`, `1`, and `3`. Requests that specify an invalid value are rejected. Any operation that affects conditional role bindings must specify version `3`. This requirement applies to the following operations: * Getting a policy that includes a conditional role binding * Adding a conditional role binding to a policy * Changing a conditional role binding in a policy * Removing any role binding, with or without a condition, from a policy that includes conditions **Important:** If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. If a policy does not include any conditions, operations on that policy may specify any valid version or leave the field unset. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  version?: number;
  /** Associates a list of `members`, or principals, with a `role`. Optionally, may specify a `condition` that determines how and when the `bindings` are applied. Each of the `bindings` must contain at least one principal. The `bindings` in a `Policy` can refer to up to 1,500 principals; up to 250 of these principals can be Google groups. Each occurrence of a principal counts towards these limits. For example, if the `bindings` grant 50 different roles to `user:alice@example.com`, and not to any other principal, then you can add another 1,450 principals to the `bindings` in the `Policy`. */
  bindings?: Array<Binding>;
  /** Specifies cloud audit logging configuration for this policy. */
  auditConfigs?: Array<AuditConfig>;
  /** `etag` is used for optimistic concurrency control as a way to help prevent simultaneous updates of a policy from overwriting each other. It is strongly suggested that systems make use of the `etag` in the read-modify-write cycle to perform policy updates in order to avoid race conditions: An `etag` is returned in the response to `getIamPolicy`, and systems are expected to put that etag in the request to `setIamPolicy` to ensure that their change will be applied to the same version of the policy. **Important:** If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. */
  etag?: string;
}

export const Policy: Schema.Schema<Policy> = Schema.suspend(() => Schema.Struct({
  version: Schema.optional(Schema.Number),
  bindings: Schema.optional(Schema.Array(Binding)),
  auditConfigs: Schema.optional(Schema.Array(AuditConfig)),
  etag: Schema.optional(Schema.String),
})).annotate({ identifier: "Policy" }) as any as Schema.Schema<Policy>;

export interface SetIamPolicyRequest {
  /** REQUIRED: The complete policy to be applied to the `resource`. The size of the policy is limited to a few 10s of KB. An empty policy is a valid policy but certain Google Cloud services (such as Projects) might reject them. */
  policy?: Policy;
  /** OPTIONAL: A FieldMask specifying which fields of the policy to modify. Only the fields in the mask will be modified. If no mask is provided, the following default mask is used: `paths: "bindings, etag"` */
  updateMask?: string;
}

export const SetIamPolicyRequest: Schema.Schema<SetIamPolicyRequest> = Schema.suspend(() => Schema.Struct({
  policy: Schema.optional(Policy),
  updateMask: Schema.optional(Schema.String),
})).annotate({ identifier: "SetIamPolicyRequest" }) as any as Schema.Schema<SetIamPolicyRequest>;

export interface TestIamPermissionsRequest {
  /** The set of permissions to check for the `resource`. Permissions with wildcards (such as `*` or `storage.*`) are not allowed. For more information see [IAM Overview](https://cloud.google.com/iam/docs/overview#permissions). */
  permissions?: Array<string>;
}

export const TestIamPermissionsRequest: Schema.Schema<TestIamPermissionsRequest> = Schema.suspend(() => Schema.Struct({
  permissions: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "TestIamPermissionsRequest" }) as any as Schema.Schema<TestIamPermissionsRequest>;

export interface TestIamPermissionsResponse {
  /** A subset of `TestPermissionsRequest.permissions` that the caller is allowed. */
  permissions?: Array<string>;
}

export const TestIamPermissionsResponse: Schema.Schema<TestIamPermissionsResponse> = Schema.suspend(() => Schema.Struct({
  permissions: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "TestIamPermissionsResponse" }) as any as Schema.Schema<TestIamPermissionsResponse>;

export interface GoogleCloudClouddmsV1OperationMetadata {
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
  /** Output only. Additional metadata that is returned by the backend for the operation. */
  metadata?: Record<string, string>;
}

export const GoogleCloudClouddmsV1OperationMetadata: Schema.Schema<GoogleCloudClouddmsV1OperationMetadata> = Schema.suspend(() => Schema.Struct({
  createTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
  target: Schema.optional(Schema.String),
  verb: Schema.optional(Schema.String),
  statusMessage: Schema.optional(Schema.String),
  requestedCancellation: Schema.optional(Schema.Boolean),
  apiVersion: Schema.optional(Schema.String),
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "GoogleCloudClouddmsV1OperationMetadata" }) as any as Schema.Schema<GoogleCloudClouddmsV1OperationMetadata>;

export interface MigrationJobVerificationError {
  /** Output only. An instance of ErrorCode specifying the error that occurred. */
  errorCode?: "ERROR_CODE_UNSPECIFIED" | "CONNECTION_FAILURE" | "AUTHENTICATION_FAILURE" | "INVALID_CONNECTION_PROFILE_CONFIG" | "VERSION_INCOMPATIBILITY" | "CONNECTION_PROFILE_TYPES_INCOMPATIBILITY" | "NO_PGLOGICAL_INSTALLED" | "PGLOGICAL_NODE_ALREADY_EXISTS" | "INVALID_WAL_LEVEL" | "INVALID_SHARED_PRELOAD_LIBRARY" | "INSUFFICIENT_MAX_REPLICATION_SLOTS" | "INSUFFICIENT_MAX_WAL_SENDERS" | "INSUFFICIENT_MAX_WORKER_PROCESSES" | "UNSUPPORTED_EXTENSIONS" | "UNSUPPORTED_MIGRATION_TYPE" | "INVALID_RDS_LOGICAL_REPLICATION" | "UNSUPPORTED_GTID_MODE" | "UNSUPPORTED_TABLE_DEFINITION" | "UNSUPPORTED_DEFINER" | "CANT_RESTART_RUNNING_MIGRATION" | "SOURCE_ALREADY_SETUP" | "TABLES_WITH_LIMITED_SUPPORT" | "UNSUPPORTED_DATABASE_LOCALE" | "UNSUPPORTED_DATABASE_FDW_CONFIG" | "ERROR_RDBMS" | "SOURCE_SIZE_EXCEEDS_THRESHOLD" | "EXISTING_CONFLICTING_DATABASES" | "PARALLEL_IMPORT_INSUFFICIENT_PRIVILEGE" | "EXISTING_DATA" | "SOURCE_MAX_SUBSCRIPTIONS" | (string & {});
  /** Output only. A formatted message with further details about the error and a CTA. */
  errorMessage?: string;
  /** Output only. A specific detailed error message, if supplied by the engine. */
  errorDetailMessage?: string;
}

export const MigrationJobVerificationError: Schema.Schema<MigrationJobVerificationError> = Schema.suspend(() => Schema.Struct({
  errorCode: Schema.optional(Schema.String),
  errorMessage: Schema.optional(Schema.String),
  errorDetailMessage: Schema.optional(Schema.String),
})).annotate({ identifier: "MigrationJobVerificationError" }) as any as Schema.Schema<MigrationJobVerificationError>;

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

/** Fetches a set of static IP addresses that need to be allowlisted by the customer when using the static-IP connectivity method. */
export interface FetchStaticIpsProjectsLocationsRequest {
  /** Required. The resource name for the location for which static IPs should be returned. Must be in the format `projects/* /locations/*`. */
  name: string;
  /** Optional. Maximum number of IPs to return. */
  pageSize?: number;
  /** Optional. A page token, received from a previous `FetchStaticIps` call. */
  pageToken?: string;
}

export const FetchStaticIpsProjectsLocationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}:fetchStaticIps" }),
  svc,
) as unknown as Schema.Schema<FetchStaticIpsProjectsLocationsRequest>;

export type FetchStaticIpsProjectsLocationsResponse = FetchStaticIpsResponse;
export const FetchStaticIpsProjectsLocationsResponse = FetchStaticIpsResponse;

export type FetchStaticIpsProjectsLocationsError = CommonErrors;

export const fetchStaticIpsProjectsLocations = API.makePaginated(() => ({
  input: FetchStaticIpsProjectsLocationsRequest,
  output: FetchStaticIpsProjectsLocationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

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

/** Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`. */
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
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/operations/{operationsId}:cancel", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CancelProjectsLocationsOperationsRequest>;

export type CancelProjectsLocationsOperationsResponse = Empty;
export const CancelProjectsLocationsOperationsResponse = Empty;

export type CancelProjectsLocationsOperationsError = CommonErrors;

export const cancelProjectsLocationsOperations: API.OperationMethod<CancelProjectsLocationsOperationsRequest, CancelProjectsLocationsOperationsResponse, CancelProjectsLocationsOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CancelProjectsLocationsOperationsRequest,
  output: CancelProjectsLocationsOperationsResponse,
  errors: [],
}));

/** Lists migration jobs in a given project and location. */
export interface ListProjectsLocationsMigrationJobsRequest {
  /** Required. The parent which owns this collection of migrationJobs. */
  parent: string;
  /** Optional. The maximum number of migration jobs to return. The service may return fewer than this value. If unspecified, at most 50 migration jobs will be returned. The maximum value is 1000; values above 1000 are coerced to 1000. */
  pageSize?: number;
  /** Optional. The nextPageToken value received in the previous call to migrationJobs.list, used in the subsequent request to retrieve the next page of results. On first call this should be left blank. When paginating, all other parameters provided to migrationJobs.list must match the call that provided the page token. */
  pageToken?: string;
  /** Optional. A filter expression that filters migration jobs listed in the response. The expression must specify the field name, a comparison operator, and the value that you want to use for filtering. The value must be a string, a number, or a boolean. The comparison operator must be either =, !=, >, or <. For example, list migration jobs created this year by specifying **createTime %gt; 2020-01-01T00:00:00.000000000Z.** You can also filter nested fields. For example, you could specify **reverseSshConnectivity.vmIp = "1.2.3.4"** to select all migration jobs connecting through the specific SSH tunnel bastion. */
  filter?: string;
  /** Optional. Sort the results based on the migration job name. Valid values are: "name", "name asc", and "name desc". */
  orderBy?: string;
}

export const ListProjectsLocationsMigrationJobsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/migrationJobs" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsMigrationJobsRequest>;

export type ListProjectsLocationsMigrationJobsResponse = ListMigrationJobsResponse;
export const ListProjectsLocationsMigrationJobsResponse = ListMigrationJobsResponse;

export type ListProjectsLocationsMigrationJobsError = CommonErrors;

export const listProjectsLocationsMigrationJobs = API.makePaginated(() => ({
  input: ListProjectsLocationsMigrationJobsRequest,
  output: ListProjectsLocationsMigrationJobsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets details of a single migration job. */
export interface GetProjectsLocationsMigrationJobsRequest {
  /** Required. Name of the migration job resource to get. */
  name: string;
}

export const GetProjectsLocationsMigrationJobsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/migrationJobs/{migrationJobsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsMigrationJobsRequest>;

export type GetProjectsLocationsMigrationJobsResponse = MigrationJob;
export const GetProjectsLocationsMigrationJobsResponse = MigrationJob;

export type GetProjectsLocationsMigrationJobsError = CommonErrors;

export const getProjectsLocationsMigrationJobs: API.OperationMethod<GetProjectsLocationsMigrationJobsRequest, GetProjectsLocationsMigrationJobsResponse, GetProjectsLocationsMigrationJobsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsMigrationJobsRequest,
  output: GetProjectsLocationsMigrationJobsResponse,
  errors: [],
}));

/** Creates a new migration job in a given project and location. */
export interface CreateProjectsLocationsMigrationJobsRequest {
  /** Required. The parent which owns this collection of migration jobs. */
  parent: string;
  /** Required. The ID of the instance to create. */
  migrationJobId?: string;
  /** Optional. A unique ID used to identify the request. If the server receives two requests with the same ID, then the second request is ignored. It is recommended to always set this value to a UUID. The ID must contain only letters (a-z, A-Z), numbers (0-9), underscores (_), and hyphens (-). The maximum length is 40 characters. */
  requestId?: string;
  /** Request body */
  body?: MigrationJob;
}

export const CreateProjectsLocationsMigrationJobsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  migrationJobId: Schema.optional(Schema.String).pipe(T.HttpQuery("migrationJobId")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  body: Schema.optional(MigrationJob).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/migrationJobs", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsMigrationJobsRequest>;

export type CreateProjectsLocationsMigrationJobsResponse = Operation;
export const CreateProjectsLocationsMigrationJobsResponse = Operation;

export type CreateProjectsLocationsMigrationJobsError = CommonErrors;

export const createProjectsLocationsMigrationJobs: API.OperationMethod<CreateProjectsLocationsMigrationJobsRequest, CreateProjectsLocationsMigrationJobsResponse, CreateProjectsLocationsMigrationJobsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsMigrationJobsRequest,
  output: CreateProjectsLocationsMigrationJobsResponse,
  errors: [],
}));

/** Updates the parameters of a single migration job. */
export interface PatchProjectsLocationsMigrationJobsRequest {
  /** The name (URI) of this migration job resource, in the form of: projects/{project}/locations/{location}/migrationJobs/{migrationJob}. */
  name: string;
  /** Required. Field mask is used to specify the fields to be overwritten by the update in the conversion workspace resource. */
  updateMask?: string;
  /** Optional. A unique ID used to identify the request. If the server receives two requests with the same ID, then the second request is ignored. It is recommended to always set this value to a UUID. The ID must contain only letters (a-z, A-Z), numbers (0-9), underscores (_), and hyphens (-). The maximum length is 40 characters. */
  requestId?: string;
  /** Request body */
  body?: MigrationJob;
}

export const PatchProjectsLocationsMigrationJobsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  body: Schema.optional(MigrationJob).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/migrationJobs/{migrationJobsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsMigrationJobsRequest>;

export type PatchProjectsLocationsMigrationJobsResponse = Operation;
export const PatchProjectsLocationsMigrationJobsResponse = Operation;

export type PatchProjectsLocationsMigrationJobsError = CommonErrors;

export const patchProjectsLocationsMigrationJobs: API.OperationMethod<PatchProjectsLocationsMigrationJobsRequest, PatchProjectsLocationsMigrationJobsResponse, PatchProjectsLocationsMigrationJobsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsMigrationJobsRequest,
  output: PatchProjectsLocationsMigrationJobsResponse,
  errors: [],
}));

/** Deletes a single migration job. */
export interface DeleteProjectsLocationsMigrationJobsRequest {
  /** Required. Name of the migration job resource to delete. */
  name: string;
  /** Optional. A unique ID used to identify the request. If the server receives two requests with the same ID, then the second request is ignored. It is recommended to always set this value to a UUID. The ID must contain only letters (a-z, A-Z), numbers (0-9), underscores (_), and hyphens (-). The maximum length is 40 characters. */
  requestId?: string;
  /** Optional. The destination CloudSQL connection profile is always deleted with the migration job. In case of force delete, the destination CloudSQL replica database is also deleted. */
  force?: boolean;
}

export const DeleteProjectsLocationsMigrationJobsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  force: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("force")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/migrationJobs/{migrationJobsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsMigrationJobsRequest>;

export type DeleteProjectsLocationsMigrationJobsResponse = Operation;
export const DeleteProjectsLocationsMigrationJobsResponse = Operation;

export type DeleteProjectsLocationsMigrationJobsError = CommonErrors;

export const deleteProjectsLocationsMigrationJobs: API.OperationMethod<DeleteProjectsLocationsMigrationJobsRequest, DeleteProjectsLocationsMigrationJobsResponse, DeleteProjectsLocationsMigrationJobsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsMigrationJobsRequest,
  output: DeleteProjectsLocationsMigrationJobsResponse,
  errors: [],
}));

/** Start an already created migration job. */
export interface StartProjectsLocationsMigrationJobsRequest {
  /** Name of the migration job resource to start. */
  name: string;
  /** Request body */
  body?: StartMigrationJobRequest;
}

export const StartProjectsLocationsMigrationJobsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(StartMigrationJobRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/migrationJobs/{migrationJobsId}:start", hasBody: true }),
  svc,
) as unknown as Schema.Schema<StartProjectsLocationsMigrationJobsRequest>;

export type StartProjectsLocationsMigrationJobsResponse = Operation;
export const StartProjectsLocationsMigrationJobsResponse = Operation;

export type StartProjectsLocationsMigrationJobsError = CommonErrors;

export const startProjectsLocationsMigrationJobs: API.OperationMethod<StartProjectsLocationsMigrationJobsRequest, StartProjectsLocationsMigrationJobsResponse, StartProjectsLocationsMigrationJobsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: StartProjectsLocationsMigrationJobsRequest,
  output: StartProjectsLocationsMigrationJobsResponse,
  errors: [],
}));

/** Stops a running migration job. */
export interface StopProjectsLocationsMigrationJobsRequest {
  /** Name of the migration job resource to stop. */
  name: string;
  /** Request body */
  body?: StopMigrationJobRequest;
}

export const StopProjectsLocationsMigrationJobsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(StopMigrationJobRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/migrationJobs/{migrationJobsId}:stop", hasBody: true }),
  svc,
) as unknown as Schema.Schema<StopProjectsLocationsMigrationJobsRequest>;

export type StopProjectsLocationsMigrationJobsResponse = Operation;
export const StopProjectsLocationsMigrationJobsResponse = Operation;

export type StopProjectsLocationsMigrationJobsError = CommonErrors;

export const stopProjectsLocationsMigrationJobs: API.OperationMethod<StopProjectsLocationsMigrationJobsRequest, StopProjectsLocationsMigrationJobsResponse, StopProjectsLocationsMigrationJobsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: StopProjectsLocationsMigrationJobsRequest,
  output: StopProjectsLocationsMigrationJobsResponse,
  errors: [],
}));

/** Resume a migration job that is currently stopped and is resumable (was stopped during CDC phase). */
export interface ResumeProjectsLocationsMigrationJobsRequest {
  /** Name of the migration job resource to resume. */
  name: string;
  /** Request body */
  body?: ResumeMigrationJobRequest;
}

export const ResumeProjectsLocationsMigrationJobsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(ResumeMigrationJobRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/migrationJobs/{migrationJobsId}:resume", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ResumeProjectsLocationsMigrationJobsRequest>;

export type ResumeProjectsLocationsMigrationJobsResponse = Operation;
export const ResumeProjectsLocationsMigrationJobsResponse = Operation;

export type ResumeProjectsLocationsMigrationJobsError = CommonErrors;

export const resumeProjectsLocationsMigrationJobs: API.OperationMethod<ResumeProjectsLocationsMigrationJobsRequest, ResumeProjectsLocationsMigrationJobsResponse, ResumeProjectsLocationsMigrationJobsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ResumeProjectsLocationsMigrationJobsRequest,
  output: ResumeProjectsLocationsMigrationJobsResponse,
  errors: [],
}));

/** Promote a migration job, stopping replication to the destination and promoting the destination to be a standalone database. */
export interface PromoteProjectsLocationsMigrationJobsRequest {
  /** Name of the migration job resource to promote. */
  name: string;
  /** Request body */
  body?: PromoteMigrationJobRequest;
}

export const PromoteProjectsLocationsMigrationJobsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(PromoteMigrationJobRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/migrationJobs/{migrationJobsId}:promote", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PromoteProjectsLocationsMigrationJobsRequest>;

export type PromoteProjectsLocationsMigrationJobsResponse = Operation;
export const PromoteProjectsLocationsMigrationJobsResponse = Operation;

export type PromoteProjectsLocationsMigrationJobsError = CommonErrors;

export const promoteProjectsLocationsMigrationJobs: API.OperationMethod<PromoteProjectsLocationsMigrationJobsRequest, PromoteProjectsLocationsMigrationJobsResponse, PromoteProjectsLocationsMigrationJobsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PromoteProjectsLocationsMigrationJobsRequest,
  output: PromoteProjectsLocationsMigrationJobsResponse,
  errors: [],
}));

/** Demotes the destination database to become a read replica of the source. This is applicable for the following migrations: 1. MySQL to Cloud SQL for MySQL 2. PostgreSQL to Cloud SQL for PostgreSQL 3. PostgreSQL to AlloyDB for PostgreSQL. */
export interface DemoteDestinationProjectsLocationsMigrationJobsRequest {
  /** Required. Name of the migration job resource to demote its destination. */
  name: string;
  /** Request body */
  body?: DemoteDestinationRequest;
}

export const DemoteDestinationProjectsLocationsMigrationJobsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(DemoteDestinationRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/migrationJobs/{migrationJobsId}:demoteDestination", hasBody: true }),
  svc,
) as unknown as Schema.Schema<DemoteDestinationProjectsLocationsMigrationJobsRequest>;

export type DemoteDestinationProjectsLocationsMigrationJobsResponse = Operation;
export const DemoteDestinationProjectsLocationsMigrationJobsResponse = Operation;

export type DemoteDestinationProjectsLocationsMigrationJobsError = CommonErrors;

export const demoteDestinationProjectsLocationsMigrationJobs: API.OperationMethod<DemoteDestinationProjectsLocationsMigrationJobsRequest, DemoteDestinationProjectsLocationsMigrationJobsResponse, DemoteDestinationProjectsLocationsMigrationJobsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DemoteDestinationProjectsLocationsMigrationJobsRequest,
  output: DemoteDestinationProjectsLocationsMigrationJobsResponse,
  errors: [],
}));

/** Verify a migration job, making sure the destination can reach the source and that all configuration and prerequisites are met. */
export interface VerifyProjectsLocationsMigrationJobsRequest {
  /** Name of the migration job resource to verify. */
  name: string;
  /** Request body */
  body?: VerifyMigrationJobRequest;
}

export const VerifyProjectsLocationsMigrationJobsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(VerifyMigrationJobRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/migrationJobs/{migrationJobsId}:verify", hasBody: true }),
  svc,
) as unknown as Schema.Schema<VerifyProjectsLocationsMigrationJobsRequest>;

export type VerifyProjectsLocationsMigrationJobsResponse = Operation;
export const VerifyProjectsLocationsMigrationJobsResponse = Operation;

export type VerifyProjectsLocationsMigrationJobsError = CommonErrors;

export const verifyProjectsLocationsMigrationJobs: API.OperationMethod<VerifyProjectsLocationsMigrationJobsRequest, VerifyProjectsLocationsMigrationJobsResponse, VerifyProjectsLocationsMigrationJobsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: VerifyProjectsLocationsMigrationJobsRequest,
  output: VerifyProjectsLocationsMigrationJobsResponse,
  errors: [],
}));

/** Restart a stopped or failed migration job, resetting the destination instance to its original state and starting the migration process from scratch. */
export interface RestartProjectsLocationsMigrationJobsRequest {
  /** Name of the migration job resource to restart. */
  name: string;
  /** Request body */
  body?: RestartMigrationJobRequest;
}

export const RestartProjectsLocationsMigrationJobsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(RestartMigrationJobRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/migrationJobs/{migrationJobsId}:restart", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RestartProjectsLocationsMigrationJobsRequest>;

export type RestartProjectsLocationsMigrationJobsResponse = Operation;
export const RestartProjectsLocationsMigrationJobsResponse = Operation;

export type RestartProjectsLocationsMigrationJobsError = CommonErrors;

export const restartProjectsLocationsMigrationJobs: API.OperationMethod<RestartProjectsLocationsMigrationJobsRequest, RestartProjectsLocationsMigrationJobsResponse, RestartProjectsLocationsMigrationJobsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RestartProjectsLocationsMigrationJobsRequest,
  output: RestartProjectsLocationsMigrationJobsResponse,
  errors: [],
}));

/** Generate a SSH configuration script to configure the reverse SSH connectivity. */
export interface GenerateSshScriptProjectsLocationsMigrationJobsRequest {
  /** Name of the migration job resource to generate the SSH script. */
  migrationJob: string;
  /** Request body */
  body?: GenerateSshScriptRequest;
}

export const GenerateSshScriptProjectsLocationsMigrationJobsRequest = Schema.Struct({
  migrationJob: Schema.String.pipe(T.HttpPath("migrationJob")),
  body: Schema.optional(GenerateSshScriptRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/migrationJobs/{migrationJobsId}:generateSshScript", hasBody: true }),
  svc,
) as unknown as Schema.Schema<GenerateSshScriptProjectsLocationsMigrationJobsRequest>;

export type GenerateSshScriptProjectsLocationsMigrationJobsResponse = SshScript;
export const GenerateSshScriptProjectsLocationsMigrationJobsResponse = SshScript;

export type GenerateSshScriptProjectsLocationsMigrationJobsError = CommonErrors;

export const generateSshScriptProjectsLocationsMigrationJobs: API.OperationMethod<GenerateSshScriptProjectsLocationsMigrationJobsRequest, GenerateSshScriptProjectsLocationsMigrationJobsResponse, GenerateSshScriptProjectsLocationsMigrationJobsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GenerateSshScriptProjectsLocationsMigrationJobsRequest,
  output: GenerateSshScriptProjectsLocationsMigrationJobsResponse,
  errors: [],
}));

/** Generate a TCP Proxy configuration script to configure a cloud-hosted VM running a TCP Proxy. */
export interface GenerateTcpProxyScriptProjectsLocationsMigrationJobsRequest {
  /** Name of the migration job resource to generate the TCP Proxy script. */
  migrationJob: string;
  /** Request body */
  body?: GenerateTcpProxyScriptRequest;
}

export const GenerateTcpProxyScriptProjectsLocationsMigrationJobsRequest = Schema.Struct({
  migrationJob: Schema.String.pipe(T.HttpPath("migrationJob")),
  body: Schema.optional(GenerateTcpProxyScriptRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/migrationJobs/{migrationJobsId}:generateTcpProxyScript", hasBody: true }),
  svc,
) as unknown as Schema.Schema<GenerateTcpProxyScriptProjectsLocationsMigrationJobsRequest>;

export type GenerateTcpProxyScriptProjectsLocationsMigrationJobsResponse = TcpProxyScript;
export const GenerateTcpProxyScriptProjectsLocationsMigrationJobsResponse = TcpProxyScript;

export type GenerateTcpProxyScriptProjectsLocationsMigrationJobsError = CommonErrors;

export const generateTcpProxyScriptProjectsLocationsMigrationJobs: API.OperationMethod<GenerateTcpProxyScriptProjectsLocationsMigrationJobsRequest, GenerateTcpProxyScriptProjectsLocationsMigrationJobsResponse, GenerateTcpProxyScriptProjectsLocationsMigrationJobsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GenerateTcpProxyScriptProjectsLocationsMigrationJobsRequest,
  output: GenerateTcpProxyScriptProjectsLocationsMigrationJobsResponse,
  errors: [],
}));

/** Retrieves objects from the source database that can be selected for data migration. This is applicable for the following migrations: 1. PostgreSQL to Cloud SQL for PostgreSQL 2. PostgreSQL to AlloyDB for PostgreSQL. */
export interface FetchSourceObjectsProjectsLocationsMigrationJobsRequest {
  /** Required. The resource name for the migration job for which source objects should be returned. */
  name: string;
}

export const FetchSourceObjectsProjectsLocationsMigrationJobsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/migrationJobs/{migrationJobsId}:fetchSourceObjects" }),
  svc,
) as unknown as Schema.Schema<FetchSourceObjectsProjectsLocationsMigrationJobsRequest>;

export type FetchSourceObjectsProjectsLocationsMigrationJobsResponse = Operation;
export const FetchSourceObjectsProjectsLocationsMigrationJobsResponse = Operation;

export type FetchSourceObjectsProjectsLocationsMigrationJobsError = CommonErrors;

export const fetchSourceObjectsProjectsLocationsMigrationJobs: API.OperationMethod<FetchSourceObjectsProjectsLocationsMigrationJobsRequest, FetchSourceObjectsProjectsLocationsMigrationJobsResponse, FetchSourceObjectsProjectsLocationsMigrationJobsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: FetchSourceObjectsProjectsLocationsMigrationJobsRequest,
  output: FetchSourceObjectsProjectsLocationsMigrationJobsResponse,
  errors: [],
}));

/** Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors. */
export interface SetIamPolicyProjectsLocationsMigrationJobsRequest {
  /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyProjectsLocationsMigrationJobsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/migrationJobs/{migrationJobsId}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProjectsLocationsMigrationJobsRequest>;

export type SetIamPolicyProjectsLocationsMigrationJobsResponse = Policy;
export const SetIamPolicyProjectsLocationsMigrationJobsResponse = Policy;

export type SetIamPolicyProjectsLocationsMigrationJobsError = CommonErrors;

export const setIamPolicyProjectsLocationsMigrationJobs: API.OperationMethod<SetIamPolicyProjectsLocationsMigrationJobsRequest, SetIamPolicyProjectsLocationsMigrationJobsResponse, SetIamPolicyProjectsLocationsMigrationJobsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyProjectsLocationsMigrationJobsRequest,
  output: SetIamPolicyProjectsLocationsMigrationJobsResponse,
  errors: [],
}));

/** Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set. */
export interface GetIamPolicyProjectsLocationsMigrationJobsRequest {
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  "options.requestedPolicyVersion"?: number;
}

export const GetIamPolicyProjectsLocationsMigrationJobsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  "options.requestedPolicyVersion": Schema.optional(Schema.Number).pipe(T.HttpQuery("options.requestedPolicyVersion")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/migrationJobs/{migrationJobsId}:getIamPolicy" }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProjectsLocationsMigrationJobsRequest>;

export type GetIamPolicyProjectsLocationsMigrationJobsResponse = Policy;
export const GetIamPolicyProjectsLocationsMigrationJobsResponse = Policy;

export type GetIamPolicyProjectsLocationsMigrationJobsError = CommonErrors;

export const getIamPolicyProjectsLocationsMigrationJobs: API.OperationMethod<GetIamPolicyProjectsLocationsMigrationJobsRequest, GetIamPolicyProjectsLocationsMigrationJobsResponse, GetIamPolicyProjectsLocationsMigrationJobsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyProjectsLocationsMigrationJobsRequest,
  output: GetIamPolicyProjectsLocationsMigrationJobsResponse,
  errors: [],
}));

/** Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning. */
export interface TestIamPermissionsProjectsLocationsMigrationJobsRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsLocationsMigrationJobsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/migrationJobs/{migrationJobsId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsProjectsLocationsMigrationJobsRequest>;

export type TestIamPermissionsProjectsLocationsMigrationJobsResponse = TestIamPermissionsResponse;
export const TestIamPermissionsProjectsLocationsMigrationJobsResponse = TestIamPermissionsResponse;

export type TestIamPermissionsProjectsLocationsMigrationJobsError = CommonErrors;

export const testIamPermissionsProjectsLocationsMigrationJobs: API.OperationMethod<TestIamPermissionsProjectsLocationsMigrationJobsRequest, TestIamPermissionsProjectsLocationsMigrationJobsResponse, TestIamPermissionsProjectsLocationsMigrationJobsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsProjectsLocationsMigrationJobsRequest,
  output: TestIamPermissionsProjectsLocationsMigrationJobsResponse,
  errors: [],
}));

/** Use this method to get details about a migration job object. */
export interface GetProjectsLocationsMigrationJobsObjectsRequest {
  /** Required. The name of the migration job object resource to get. */
  name: string;
}

export const GetProjectsLocationsMigrationJobsObjectsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/migrationJobs/{migrationJobsId}/objects/{objectsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsMigrationJobsObjectsRequest>;

export type GetProjectsLocationsMigrationJobsObjectsResponse = MigrationJobObject;
export const GetProjectsLocationsMigrationJobsObjectsResponse = MigrationJobObject;

export type GetProjectsLocationsMigrationJobsObjectsError = CommonErrors;

export const getProjectsLocationsMigrationJobsObjects: API.OperationMethod<GetProjectsLocationsMigrationJobsObjectsRequest, GetProjectsLocationsMigrationJobsObjectsResponse, GetProjectsLocationsMigrationJobsObjectsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsMigrationJobsObjectsRequest,
  output: GetProjectsLocationsMigrationJobsObjectsResponse,
  errors: [],
}));

/** Use this method to look up a migration job object by its source object identifier. */
export interface LookupProjectsLocationsMigrationJobsObjectsRequest {
  /** Required. The parent migration job that owns the collection of objects. */
  parent: string;
  /** Request body */
  body?: LookupMigrationJobObjectRequest;
}

export const LookupProjectsLocationsMigrationJobsObjectsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(LookupMigrationJobObjectRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/migrationJobs/{migrationJobsId}/objects:lookup", hasBody: true }),
  svc,
) as unknown as Schema.Schema<LookupProjectsLocationsMigrationJobsObjectsRequest>;

export type LookupProjectsLocationsMigrationJobsObjectsResponse = MigrationJobObject;
export const LookupProjectsLocationsMigrationJobsObjectsResponse = MigrationJobObject;

export type LookupProjectsLocationsMigrationJobsObjectsError = CommonErrors;

export const lookupProjectsLocationsMigrationJobsObjects: API.OperationMethod<LookupProjectsLocationsMigrationJobsObjectsRequest, LookupProjectsLocationsMigrationJobsObjectsResponse, LookupProjectsLocationsMigrationJobsObjectsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: LookupProjectsLocationsMigrationJobsObjectsRequest,
  output: LookupProjectsLocationsMigrationJobsObjectsResponse,
  errors: [],
}));

/** Use this method to list the objects of a specific migration job. */
export interface ListProjectsLocationsMigrationJobsObjectsRequest {
  /** Required. The parent migration job that owns the collection of objects. */
  parent: string;
  /** Optional. Maximum number of objects to return. Default is 50. The maximum value is 1000; values above 1000 will be coerced to 1000. */
  pageSize?: number;
  /** Optional. Page token received from a previous `ListMigrationJObObjectsRequest` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListMigrationJobObjectsRequest` must match the call that provided the page token. */
  pageToken?: string;
}

export const ListProjectsLocationsMigrationJobsObjectsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/migrationJobs/{migrationJobsId}/objects" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsMigrationJobsObjectsRequest>;

export type ListProjectsLocationsMigrationJobsObjectsResponse = ListMigrationJobObjectsResponse;
export const ListProjectsLocationsMigrationJobsObjectsResponse = ListMigrationJobObjectsResponse;

export type ListProjectsLocationsMigrationJobsObjectsError = CommonErrors;

export const listProjectsLocationsMigrationJobsObjects = API.makePaginated(() => ({
  input: ListProjectsLocationsMigrationJobsObjectsRequest,
  output: ListProjectsLocationsMigrationJobsObjectsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors. */
export interface SetIamPolicyProjectsLocationsMigrationJobsObjectsRequest {
  /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyProjectsLocationsMigrationJobsObjectsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/migrationJobs/{migrationJobsId}/objects/{objectsId}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProjectsLocationsMigrationJobsObjectsRequest>;

export type SetIamPolicyProjectsLocationsMigrationJobsObjectsResponse = Policy;
export const SetIamPolicyProjectsLocationsMigrationJobsObjectsResponse = Policy;

export type SetIamPolicyProjectsLocationsMigrationJobsObjectsError = CommonErrors;

export const setIamPolicyProjectsLocationsMigrationJobsObjects: API.OperationMethod<SetIamPolicyProjectsLocationsMigrationJobsObjectsRequest, SetIamPolicyProjectsLocationsMigrationJobsObjectsResponse, SetIamPolicyProjectsLocationsMigrationJobsObjectsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyProjectsLocationsMigrationJobsObjectsRequest,
  output: SetIamPolicyProjectsLocationsMigrationJobsObjectsResponse,
  errors: [],
}));

/** Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set. */
export interface GetIamPolicyProjectsLocationsMigrationJobsObjectsRequest {
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  "options.requestedPolicyVersion"?: number;
}

export const GetIamPolicyProjectsLocationsMigrationJobsObjectsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  "options.requestedPolicyVersion": Schema.optional(Schema.Number).pipe(T.HttpQuery("options.requestedPolicyVersion")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/migrationJobs/{migrationJobsId}/objects/{objectsId}:getIamPolicy" }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProjectsLocationsMigrationJobsObjectsRequest>;

export type GetIamPolicyProjectsLocationsMigrationJobsObjectsResponse = Policy;
export const GetIamPolicyProjectsLocationsMigrationJobsObjectsResponse = Policy;

export type GetIamPolicyProjectsLocationsMigrationJobsObjectsError = CommonErrors;

export const getIamPolicyProjectsLocationsMigrationJobsObjects: API.OperationMethod<GetIamPolicyProjectsLocationsMigrationJobsObjectsRequest, GetIamPolicyProjectsLocationsMigrationJobsObjectsResponse, GetIamPolicyProjectsLocationsMigrationJobsObjectsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyProjectsLocationsMigrationJobsObjectsRequest,
  output: GetIamPolicyProjectsLocationsMigrationJobsObjectsResponse,
  errors: [],
}));

/** Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning. */
export interface TestIamPermissionsProjectsLocationsMigrationJobsObjectsRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsLocationsMigrationJobsObjectsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/migrationJobs/{migrationJobsId}/objects/{objectsId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsProjectsLocationsMigrationJobsObjectsRequest>;

export type TestIamPermissionsProjectsLocationsMigrationJobsObjectsResponse = TestIamPermissionsResponse;
export const TestIamPermissionsProjectsLocationsMigrationJobsObjectsResponse = TestIamPermissionsResponse;

export type TestIamPermissionsProjectsLocationsMigrationJobsObjectsError = CommonErrors;

export const testIamPermissionsProjectsLocationsMigrationJobsObjects: API.OperationMethod<TestIamPermissionsProjectsLocationsMigrationJobsObjectsRequest, TestIamPermissionsProjectsLocationsMigrationJobsObjectsResponse, TestIamPermissionsProjectsLocationsMigrationJobsObjectsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsProjectsLocationsMigrationJobsObjectsRequest,
  output: TestIamPermissionsProjectsLocationsMigrationJobsObjectsResponse,
  errors: [],
}));

/** Retrieves a list of all connection profiles in a given project and location. */
export interface ListProjectsLocationsConnectionProfilesRequest {
  /** Required. The parent which owns this collection of connection profiles. */
  parent: string;
  /** The maximum number of connection profiles to return. The service may return fewer than this value. If unspecified, at most 50 connection profiles will be returned. The maximum value is 1000; values above 1000 are coerced to 1000. */
  pageSize?: number;
  /** Optional. A page token, received from a previous `ListConnectionProfiles` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListConnectionProfiles` must match the call that provided the page token. */
  pageToken?: string;
  /** Optional. A filter expression that filters connection profiles listed in the response. The expression must specify the field name, a comparison operator, and the value that you want to use for filtering. The value must be a string, a number, or a boolean. The comparison operator must be either =, !=, >, or <. For example, list connection profiles created this year by specifying **createTime %gt; 2020-01-01T00:00:00.000000000Z**. You can also filter nested fields. For example, you could specify **mySql.username = %lt;my_username%gt;** to list all connection profiles configured to connect with a specific username. */
  filter?: string;
  /** Optional. A comma-separated list of fields to order results according to. */
  orderBy?: string;
}

export const ListProjectsLocationsConnectionProfilesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/connectionProfiles" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsConnectionProfilesRequest>;

export type ListProjectsLocationsConnectionProfilesResponse = ListConnectionProfilesResponse;
export const ListProjectsLocationsConnectionProfilesResponse = ListConnectionProfilesResponse;

export type ListProjectsLocationsConnectionProfilesError = CommonErrors;

export const listProjectsLocationsConnectionProfiles = API.makePaginated(() => ({
  input: ListProjectsLocationsConnectionProfilesRequest,
  output: ListProjectsLocationsConnectionProfilesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets details of a single connection profile. */
export interface GetProjectsLocationsConnectionProfilesRequest {
  /** Required. Name of the connection profile resource to get. */
  name: string;
}

export const GetProjectsLocationsConnectionProfilesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/connectionProfiles/{connectionProfilesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsConnectionProfilesRequest>;

export type GetProjectsLocationsConnectionProfilesResponse = ConnectionProfile;
export const GetProjectsLocationsConnectionProfilesResponse = ConnectionProfile;

export type GetProjectsLocationsConnectionProfilesError = CommonErrors;

export const getProjectsLocationsConnectionProfiles: API.OperationMethod<GetProjectsLocationsConnectionProfilesRequest, GetProjectsLocationsConnectionProfilesResponse, GetProjectsLocationsConnectionProfilesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsConnectionProfilesRequest,
  output: GetProjectsLocationsConnectionProfilesResponse,
  errors: [],
}));

/** Creates a new connection profile in a given project and location. */
export interface CreateProjectsLocationsConnectionProfilesRequest {
  /** Required. The parent which owns this collection of connection profiles. */
  parent: string;
  /** Required. The connection profile identifier. */
  connectionProfileId?: string;
  /** Optional. A unique ID used to identify the request. If the server receives two requests with the same ID, then the second request is ignored. It is recommended to always set this value to a UUID. The ID must contain only letters (a-z, A-Z), numbers (0-9), underscores (_), and hyphens (-). The maximum length is 40 characters. */
  requestId?: string;
  /** Optional. Only validate the connection profile, but don't create any resources. The default is false. Only supported for Oracle connection profiles. */
  validateOnly?: boolean;
  /** Optional. Create the connection profile without validating it. The default is false. Only supported for Oracle connection profiles. */
  skipValidation?: boolean;
  /** Request body */
  body?: ConnectionProfile;
}

export const CreateProjectsLocationsConnectionProfilesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  connectionProfileId: Schema.optional(Schema.String).pipe(T.HttpQuery("connectionProfileId")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  validateOnly: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("validateOnly")),
  skipValidation: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("skipValidation")),
  body: Schema.optional(ConnectionProfile).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/connectionProfiles", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsConnectionProfilesRequest>;

export type CreateProjectsLocationsConnectionProfilesResponse = Operation;
export const CreateProjectsLocationsConnectionProfilesResponse = Operation;

export type CreateProjectsLocationsConnectionProfilesError = CommonErrors;

export const createProjectsLocationsConnectionProfiles: API.OperationMethod<CreateProjectsLocationsConnectionProfilesRequest, CreateProjectsLocationsConnectionProfilesResponse, CreateProjectsLocationsConnectionProfilesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsConnectionProfilesRequest,
  output: CreateProjectsLocationsConnectionProfilesResponse,
  errors: [],
}));

/** Update the configuration of a single connection profile. */
export interface PatchProjectsLocationsConnectionProfilesRequest {
  /** The name of this connection profile resource in the form of projects/{project}/locations/{location}/connectionProfiles/{connectionProfile}. */
  name: string;
  /** Required. Field mask is used to specify the fields to be overwritten by the update in the conversion workspace resource. */
  updateMask?: string;
  /** Optional. A unique ID used to identify the request. If the server receives two requests with the same ID, then the second request is ignored. It is recommended to always set this value to a UUID. The ID must contain only letters (a-z, A-Z), numbers (0-9), underscores (_), and hyphens (-). The maximum length is 40 characters. */
  requestId?: string;
  /** Optional. Only validate the connection profile, but don't update any resources. The default is false. Only supported for Oracle connection profiles. */
  validateOnly?: boolean;
  /** Optional. Update the connection profile without validating it. The default is false. Only supported for Oracle connection profiles. */
  skipValidation?: boolean;
  /** Request body */
  body?: ConnectionProfile;
}

export const PatchProjectsLocationsConnectionProfilesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  validateOnly: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("validateOnly")),
  skipValidation: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("skipValidation")),
  body: Schema.optional(ConnectionProfile).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/connectionProfiles/{connectionProfilesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsConnectionProfilesRequest>;

export type PatchProjectsLocationsConnectionProfilesResponse = Operation;
export const PatchProjectsLocationsConnectionProfilesResponse = Operation;

export type PatchProjectsLocationsConnectionProfilesError = CommonErrors;

export const patchProjectsLocationsConnectionProfiles: API.OperationMethod<PatchProjectsLocationsConnectionProfilesRequest, PatchProjectsLocationsConnectionProfilesResponse, PatchProjectsLocationsConnectionProfilesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsConnectionProfilesRequest,
  output: PatchProjectsLocationsConnectionProfilesResponse,
  errors: [],
}));

/** Deletes a single Database Migration Service connection profile. A connection profile can only be deleted if it is not in use by any active migration jobs. */
export interface DeleteProjectsLocationsConnectionProfilesRequest {
  /** Required. Name of the connection profile resource to delete. */
  name: string;
  /** A unique ID used to identify the request. If the server receives two requests with the same ID, then the second request is ignored. It is recommended to always set this value to a UUID. The ID must contain only letters (a-z, A-Z), numbers (0-9), underscores (_), and hyphens (-). The maximum length is 40 characters. */
  requestId?: string;
  /** In case of force delete, the CloudSQL replica database is also deleted (only for CloudSQL connection profile). */
  force?: boolean;
}

export const DeleteProjectsLocationsConnectionProfilesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  force: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("force")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/connectionProfiles/{connectionProfilesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsConnectionProfilesRequest>;

export type DeleteProjectsLocationsConnectionProfilesResponse = Operation;
export const DeleteProjectsLocationsConnectionProfilesResponse = Operation;

export type DeleteProjectsLocationsConnectionProfilesError = CommonErrors;

export const deleteProjectsLocationsConnectionProfiles: API.OperationMethod<DeleteProjectsLocationsConnectionProfilesRequest, DeleteProjectsLocationsConnectionProfilesResponse, DeleteProjectsLocationsConnectionProfilesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsConnectionProfilesRequest,
  output: DeleteProjectsLocationsConnectionProfilesResponse,
  errors: [],
}));

/** Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors. */
export interface SetIamPolicyProjectsLocationsConnectionProfilesRequest {
  /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyProjectsLocationsConnectionProfilesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/connectionProfiles/{connectionProfilesId}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProjectsLocationsConnectionProfilesRequest>;

export type SetIamPolicyProjectsLocationsConnectionProfilesResponse = Policy;
export const SetIamPolicyProjectsLocationsConnectionProfilesResponse = Policy;

export type SetIamPolicyProjectsLocationsConnectionProfilesError = CommonErrors;

export const setIamPolicyProjectsLocationsConnectionProfiles: API.OperationMethod<SetIamPolicyProjectsLocationsConnectionProfilesRequest, SetIamPolicyProjectsLocationsConnectionProfilesResponse, SetIamPolicyProjectsLocationsConnectionProfilesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyProjectsLocationsConnectionProfilesRequest,
  output: SetIamPolicyProjectsLocationsConnectionProfilesResponse,
  errors: [],
}));

/** Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set. */
export interface GetIamPolicyProjectsLocationsConnectionProfilesRequest {
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  "options.requestedPolicyVersion"?: number;
}

export const GetIamPolicyProjectsLocationsConnectionProfilesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  "options.requestedPolicyVersion": Schema.optional(Schema.Number).pipe(T.HttpQuery("options.requestedPolicyVersion")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/connectionProfiles/{connectionProfilesId}:getIamPolicy" }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProjectsLocationsConnectionProfilesRequest>;

export type GetIamPolicyProjectsLocationsConnectionProfilesResponse = Policy;
export const GetIamPolicyProjectsLocationsConnectionProfilesResponse = Policy;

export type GetIamPolicyProjectsLocationsConnectionProfilesError = CommonErrors;

export const getIamPolicyProjectsLocationsConnectionProfiles: API.OperationMethod<GetIamPolicyProjectsLocationsConnectionProfilesRequest, GetIamPolicyProjectsLocationsConnectionProfilesResponse, GetIamPolicyProjectsLocationsConnectionProfilesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyProjectsLocationsConnectionProfilesRequest,
  output: GetIamPolicyProjectsLocationsConnectionProfilesResponse,
  errors: [],
}));

/** Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning. */
export interface TestIamPermissionsProjectsLocationsConnectionProfilesRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsLocationsConnectionProfilesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/connectionProfiles/{connectionProfilesId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsProjectsLocationsConnectionProfilesRequest>;

export type TestIamPermissionsProjectsLocationsConnectionProfilesResponse = TestIamPermissionsResponse;
export const TestIamPermissionsProjectsLocationsConnectionProfilesResponse = TestIamPermissionsResponse;

export type TestIamPermissionsProjectsLocationsConnectionProfilesError = CommonErrors;

export const testIamPermissionsProjectsLocationsConnectionProfiles: API.OperationMethod<TestIamPermissionsProjectsLocationsConnectionProfilesRequest, TestIamPermissionsProjectsLocationsConnectionProfilesResponse, TestIamPermissionsProjectsLocationsConnectionProfilesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsProjectsLocationsConnectionProfilesRequest,
  output: TestIamPermissionsProjectsLocationsConnectionProfilesResponse,
  errors: [],
}));

/** Creates a new private connection in a given project and location. */
export interface CreateProjectsLocationsPrivateConnectionsRequest {
  /** Required. The parent that owns the collection of PrivateConnections. */
  parent: string;
  /** Required. The private connection identifier. */
  privateConnectionId?: string;
  /** Optional. A unique ID used to identify the request. If the server receives two requests with the same ID, then the second request is ignored. It is recommended to always set this value to a UUID. The ID must contain only letters (a-z, A-Z), numbers (0-9), underscores (_), and hyphens (-). The maximum length is 40 characters. */
  requestId?: string;
  /** Optional. If set to true, will skip validations. */
  skipValidation?: boolean;
  /** Optional. For PSC Interface only - get the tenant project before creating the resource. */
  validateOnly?: boolean;
  /** Request body */
  body?: PrivateConnection;
}

export const CreateProjectsLocationsPrivateConnectionsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  privateConnectionId: Schema.optional(Schema.String).pipe(T.HttpQuery("privateConnectionId")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  skipValidation: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("skipValidation")),
  validateOnly: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("validateOnly")),
  body: Schema.optional(PrivateConnection).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/privateConnections", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsPrivateConnectionsRequest>;

export type CreateProjectsLocationsPrivateConnectionsResponse = Operation;
export const CreateProjectsLocationsPrivateConnectionsResponse = Operation;

export type CreateProjectsLocationsPrivateConnectionsError = CommonErrors;

export const createProjectsLocationsPrivateConnections: API.OperationMethod<CreateProjectsLocationsPrivateConnectionsRequest, CreateProjectsLocationsPrivateConnectionsResponse, CreateProjectsLocationsPrivateConnectionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsPrivateConnectionsRequest,
  output: CreateProjectsLocationsPrivateConnectionsResponse,
  errors: [],
}));

/** Gets details of a single private connection. */
export interface GetProjectsLocationsPrivateConnectionsRequest {
  /** Required. The name of the private connection to get. */
  name: string;
}

export const GetProjectsLocationsPrivateConnectionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/privateConnections/{privateConnectionsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsPrivateConnectionsRequest>;

export type GetProjectsLocationsPrivateConnectionsResponse = PrivateConnection;
export const GetProjectsLocationsPrivateConnectionsResponse = PrivateConnection;

export type GetProjectsLocationsPrivateConnectionsError = CommonErrors;

export const getProjectsLocationsPrivateConnections: API.OperationMethod<GetProjectsLocationsPrivateConnectionsRequest, GetProjectsLocationsPrivateConnectionsResponse, GetProjectsLocationsPrivateConnectionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsPrivateConnectionsRequest,
  output: GetProjectsLocationsPrivateConnectionsResponse,
  errors: [],
}));

/** Retrieves a list of private connections in a given project and location. */
export interface ListProjectsLocationsPrivateConnectionsRequest {
  /** Required. The parent that owns the collection of private connections. */
  parent: string;
  /** Optional. Maximum number of private connections to return. If unspecified, at most 50 private connections that are returned. The maximum value is 1000; values above 1000 are coerced to 1000. */
  pageSize?: number;
  /** Optional. Page token received from a previous `ListPrivateConnections` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListPrivateConnections` must match the call that provided the page token. */
  pageToken?: string;
  /** Optional. A filter expression that filters private connections listed in the response. The expression must specify the field name, a comparison operator, and the value that you want to use for filtering. The value must be a string, a number, or a boolean. The comparison operator must be either =, !=, >, or <. For example, list private connections created this year by specifying **createTime %gt; 2021-01-01T00:00:00.000000000Z**. */
  filter?: string;
  /** Optional. Order by fields for the result. */
  orderBy?: string;
}

export const ListProjectsLocationsPrivateConnectionsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/privateConnections" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsPrivateConnectionsRequest>;

export type ListProjectsLocationsPrivateConnectionsResponse = ListPrivateConnectionsResponse;
export const ListProjectsLocationsPrivateConnectionsResponse = ListPrivateConnectionsResponse;

export type ListProjectsLocationsPrivateConnectionsError = CommonErrors;

export const listProjectsLocationsPrivateConnections = API.makePaginated(() => ({
  input: ListProjectsLocationsPrivateConnectionsRequest,
  output: ListProjectsLocationsPrivateConnectionsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Deletes a single Database Migration Service private connection. */
export interface DeleteProjectsLocationsPrivateConnectionsRequest {
  /** Required. The name of the private connection to delete. */
  name: string;
  /** Optional. A unique ID used to identify the request. If the server receives two requests with the same ID, then the second request is ignored. It is recommended to always set this value to a UUID. The ID must contain only letters (a-z, A-Z), numbers (0-9), underscores (_), and hyphens (-). The maximum length is 40 characters. */
  requestId?: string;
}

export const DeleteProjectsLocationsPrivateConnectionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/privateConnections/{privateConnectionsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsPrivateConnectionsRequest>;

export type DeleteProjectsLocationsPrivateConnectionsResponse = Operation;
export const DeleteProjectsLocationsPrivateConnectionsResponse = Operation;

export type DeleteProjectsLocationsPrivateConnectionsError = CommonErrors;

export const deleteProjectsLocationsPrivateConnections: API.OperationMethod<DeleteProjectsLocationsPrivateConnectionsRequest, DeleteProjectsLocationsPrivateConnectionsResponse, DeleteProjectsLocationsPrivateConnectionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsPrivateConnectionsRequest,
  output: DeleteProjectsLocationsPrivateConnectionsResponse,
  errors: [],
}));

/** Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors. */
export interface SetIamPolicyProjectsLocationsPrivateConnectionsRequest {
  /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyProjectsLocationsPrivateConnectionsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/privateConnections/{privateConnectionsId}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProjectsLocationsPrivateConnectionsRequest>;

export type SetIamPolicyProjectsLocationsPrivateConnectionsResponse = Policy;
export const SetIamPolicyProjectsLocationsPrivateConnectionsResponse = Policy;

export type SetIamPolicyProjectsLocationsPrivateConnectionsError = CommonErrors;

export const setIamPolicyProjectsLocationsPrivateConnections: API.OperationMethod<SetIamPolicyProjectsLocationsPrivateConnectionsRequest, SetIamPolicyProjectsLocationsPrivateConnectionsResponse, SetIamPolicyProjectsLocationsPrivateConnectionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyProjectsLocationsPrivateConnectionsRequest,
  output: SetIamPolicyProjectsLocationsPrivateConnectionsResponse,
  errors: [],
}));

/** Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set. */
export interface GetIamPolicyProjectsLocationsPrivateConnectionsRequest {
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  "options.requestedPolicyVersion"?: number;
}

export const GetIamPolicyProjectsLocationsPrivateConnectionsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  "options.requestedPolicyVersion": Schema.optional(Schema.Number).pipe(T.HttpQuery("options.requestedPolicyVersion")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/privateConnections/{privateConnectionsId}:getIamPolicy" }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProjectsLocationsPrivateConnectionsRequest>;

export type GetIamPolicyProjectsLocationsPrivateConnectionsResponse = Policy;
export const GetIamPolicyProjectsLocationsPrivateConnectionsResponse = Policy;

export type GetIamPolicyProjectsLocationsPrivateConnectionsError = CommonErrors;

export const getIamPolicyProjectsLocationsPrivateConnections: API.OperationMethod<GetIamPolicyProjectsLocationsPrivateConnectionsRequest, GetIamPolicyProjectsLocationsPrivateConnectionsResponse, GetIamPolicyProjectsLocationsPrivateConnectionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyProjectsLocationsPrivateConnectionsRequest,
  output: GetIamPolicyProjectsLocationsPrivateConnectionsResponse,
  errors: [],
}));

/** Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning. */
export interface TestIamPermissionsProjectsLocationsPrivateConnectionsRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsLocationsPrivateConnectionsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/privateConnections/{privateConnectionsId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsProjectsLocationsPrivateConnectionsRequest>;

export type TestIamPermissionsProjectsLocationsPrivateConnectionsResponse = TestIamPermissionsResponse;
export const TestIamPermissionsProjectsLocationsPrivateConnectionsResponse = TestIamPermissionsResponse;

export type TestIamPermissionsProjectsLocationsPrivateConnectionsError = CommonErrors;

export const testIamPermissionsProjectsLocationsPrivateConnections: API.OperationMethod<TestIamPermissionsProjectsLocationsPrivateConnectionsRequest, TestIamPermissionsProjectsLocationsPrivateConnectionsResponse, TestIamPermissionsProjectsLocationsPrivateConnectionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsProjectsLocationsPrivateConnectionsRequest,
  output: TestIamPermissionsProjectsLocationsPrivateConnectionsResponse,
  errors: [],
}));

/** Gets details of a single conversion workspace. */
export interface GetProjectsLocationsConversionWorkspacesRequest {
  /** Required. Name of the conversion workspace resource to get. */
  name: string;
}

export const GetProjectsLocationsConversionWorkspacesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/conversionWorkspaces/{conversionWorkspacesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsConversionWorkspacesRequest>;

export type GetProjectsLocationsConversionWorkspacesResponse = ConversionWorkspace;
export const GetProjectsLocationsConversionWorkspacesResponse = ConversionWorkspace;

export type GetProjectsLocationsConversionWorkspacesError = CommonErrors;

export const getProjectsLocationsConversionWorkspaces: API.OperationMethod<GetProjectsLocationsConversionWorkspacesRequest, GetProjectsLocationsConversionWorkspacesResponse, GetProjectsLocationsConversionWorkspacesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsConversionWorkspacesRequest,
  output: GetProjectsLocationsConversionWorkspacesResponse,
  errors: [],
}));

/** Lists conversion workspaces in a given project and location. */
export interface ListProjectsLocationsConversionWorkspacesRequest {
  /** Required. The parent which owns this collection of conversion workspaces. */
  parent: string;
  /** Optional. The maximum number of conversion workspaces to return. The service may return fewer than this value. If unspecified, at most 50 sets are returned. */
  pageSize?: number;
  /** Optional. The nextPageToken value received in the previous call to conversionWorkspaces.list, used in the subsequent request to retrieve the next page of results. On first call this should be left blank. When paginating, all other parameters provided to conversionWorkspaces.list must match the call that provided the page token. */
  pageToken?: string;
  /** Optional. A filter expression that filters conversion workspaces listed in the response. The expression must specify the field name, a comparison operator, and the value that you want to use for filtering. The value must be a string, a number, or a boolean. The comparison operator must be either =, !=, >, or <. For example, list conversion workspaces created this year by specifying **createTime %gt; 2020-01-01T00:00:00.000000000Z.** You can also filter nested fields. For example, you could specify **source.version = "12.c.1"** to select all conversion workspaces with source database version equal to 12.c.1. */
  filter?: string;
}

export const ListProjectsLocationsConversionWorkspacesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/conversionWorkspaces" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsConversionWorkspacesRequest>;

export type ListProjectsLocationsConversionWorkspacesResponse = ListConversionWorkspacesResponse;
export const ListProjectsLocationsConversionWorkspacesResponse = ListConversionWorkspacesResponse;

export type ListProjectsLocationsConversionWorkspacesError = CommonErrors;

export const listProjectsLocationsConversionWorkspaces = API.makePaginated(() => ({
  input: ListProjectsLocationsConversionWorkspacesRequest,
  output: ListProjectsLocationsConversionWorkspacesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Creates a new conversion workspace in a given project and location. */
export interface CreateProjectsLocationsConversionWorkspacesRequest {
  /** Required. The parent which owns this collection of conversion workspaces. */
  parent: string;
  /** Required. The ID of the conversion workspace to create. */
  conversionWorkspaceId?: string;
  /** Optional. A unique ID used to identify the request. If the server receives two requests with the same ID, then the second request is ignored. It is recommended to always set this value to a UUID. The ID must contain only letters (a-z, A-Z), numbers (0-9), underscores (_), and hyphens (-). The maximum length is 40 characters. */
  requestId?: string;
  /** Request body */
  body?: ConversionWorkspace;
}

export const CreateProjectsLocationsConversionWorkspacesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  conversionWorkspaceId: Schema.optional(Schema.String).pipe(T.HttpQuery("conversionWorkspaceId")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  body: Schema.optional(ConversionWorkspace).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/conversionWorkspaces", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsConversionWorkspacesRequest>;

export type CreateProjectsLocationsConversionWorkspacesResponse = Operation;
export const CreateProjectsLocationsConversionWorkspacesResponse = Operation;

export type CreateProjectsLocationsConversionWorkspacesError = CommonErrors;

export const createProjectsLocationsConversionWorkspaces: API.OperationMethod<CreateProjectsLocationsConversionWorkspacesRequest, CreateProjectsLocationsConversionWorkspacesResponse, CreateProjectsLocationsConversionWorkspacesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsConversionWorkspacesRequest,
  output: CreateProjectsLocationsConversionWorkspacesResponse,
  errors: [],
}));

/** Updates the parameters of a single conversion workspace. */
export interface PatchProjectsLocationsConversionWorkspacesRequest {
  /** Full name of the workspace resource, in the form of: projects/{project}/locations/{location}/conversionWorkspaces/{conversion_workspace}. */
  name: string;
  /** Required. Field mask is used to specify the fields to be overwritten by the update in the conversion workspace resource. */
  updateMask?: string;
  /** Optional. A unique ID used to identify the request. If the server receives two requests with the same ID, then the second request is ignored. It is recommended to always set this value to a UUID. The ID must contain only letters (a-z, A-Z), numbers (0-9), underscores (_), and hyphens (-). The maximum length is 40 characters. */
  requestId?: string;
  /** Request body */
  body?: ConversionWorkspace;
}

export const PatchProjectsLocationsConversionWorkspacesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  body: Schema.optional(ConversionWorkspace).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/conversionWorkspaces/{conversionWorkspacesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsConversionWorkspacesRequest>;

export type PatchProjectsLocationsConversionWorkspacesResponse = Operation;
export const PatchProjectsLocationsConversionWorkspacesResponse = Operation;

export type PatchProjectsLocationsConversionWorkspacesError = CommonErrors;

export const patchProjectsLocationsConversionWorkspaces: API.OperationMethod<PatchProjectsLocationsConversionWorkspacesRequest, PatchProjectsLocationsConversionWorkspacesResponse, PatchProjectsLocationsConversionWorkspacesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsConversionWorkspacesRequest,
  output: PatchProjectsLocationsConversionWorkspacesResponse,
  errors: [],
}));

/** Deletes a single conversion workspace. */
export interface DeleteProjectsLocationsConversionWorkspacesRequest {
  /** Required. Name of the conversion workspace resource to delete. */
  name: string;
  /** Optional. A unique ID used to identify the request. If the server receives two requests with the same ID, then the second request is ignored. It is recommended to always set this value to a UUID. The ID must contain only letters (a-z, A-Z), numbers (0-9), underscores (_), and hyphens (-). The maximum length is 40 characters. */
  requestId?: string;
  /** Optional. Force delete the conversion workspace, even if there's a running migration that is using the workspace. */
  force?: boolean;
}

export const DeleteProjectsLocationsConversionWorkspacesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  force: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("force")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/conversionWorkspaces/{conversionWorkspacesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsConversionWorkspacesRequest>;

export type DeleteProjectsLocationsConversionWorkspacesResponse = Operation;
export const DeleteProjectsLocationsConversionWorkspacesResponse = Operation;

export type DeleteProjectsLocationsConversionWorkspacesError = CommonErrors;

export const deleteProjectsLocationsConversionWorkspaces: API.OperationMethod<DeleteProjectsLocationsConversionWorkspacesRequest, DeleteProjectsLocationsConversionWorkspacesResponse, DeleteProjectsLocationsConversionWorkspacesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsConversionWorkspacesRequest,
  output: DeleteProjectsLocationsConversionWorkspacesResponse,
  errors: [],
}));

/** Imports a snapshot of the source database into the conversion workspace. */
export interface SeedProjectsLocationsConversionWorkspacesRequest {
  /** Name of the conversion workspace resource to seed with new database structure, in the form of: projects/{project}/locations/{location}/conversionWorkspaces/{conversion_workspace}. */
  name: string;
  /** Request body */
  body?: SeedConversionWorkspaceRequest;
}

export const SeedProjectsLocationsConversionWorkspacesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(SeedConversionWorkspaceRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/conversionWorkspaces/{conversionWorkspacesId}:seed", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SeedProjectsLocationsConversionWorkspacesRequest>;

export type SeedProjectsLocationsConversionWorkspacesResponse = Operation;
export const SeedProjectsLocationsConversionWorkspacesResponse = Operation;

export type SeedProjectsLocationsConversionWorkspacesError = CommonErrors;

export const seedProjectsLocationsConversionWorkspaces: API.OperationMethod<SeedProjectsLocationsConversionWorkspacesRequest, SeedProjectsLocationsConversionWorkspacesResponse, SeedProjectsLocationsConversionWorkspacesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SeedProjectsLocationsConversionWorkspacesRequest,
  output: SeedProjectsLocationsConversionWorkspacesResponse,
  errors: [],
}));

/** Creates a draft tree schema for the destination database. */
export interface ConvertProjectsLocationsConversionWorkspacesRequest {
  /** Name of the conversion workspace resource to convert in the form of: projects/{project}/locations/{location}/conversionWorkspaces/{conversion_workspace}. */
  name: string;
  /** Request body */
  body?: ConvertConversionWorkspaceRequest;
}

export const ConvertProjectsLocationsConversionWorkspacesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(ConvertConversionWorkspaceRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/conversionWorkspaces/{conversionWorkspacesId}:convert", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ConvertProjectsLocationsConversionWorkspacesRequest>;

export type ConvertProjectsLocationsConversionWorkspacesResponse = Operation;
export const ConvertProjectsLocationsConversionWorkspacesResponse = Operation;

export type ConvertProjectsLocationsConversionWorkspacesError = CommonErrors;

export const convertProjectsLocationsConversionWorkspaces: API.OperationMethod<ConvertProjectsLocationsConversionWorkspacesRequest, ConvertProjectsLocationsConversionWorkspacesResponse, ConvertProjectsLocationsConversionWorkspacesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ConvertProjectsLocationsConversionWorkspacesRequest,
  output: ConvertProjectsLocationsConversionWorkspacesResponse,
  errors: [],
}));

/** Marks all the data in the conversion workspace as committed. */
export interface CommitProjectsLocationsConversionWorkspacesRequest {
  /** Required. Name of the conversion workspace resource to commit. */
  name: string;
  /** Request body */
  body?: CommitConversionWorkspaceRequest;
}

export const CommitProjectsLocationsConversionWorkspacesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(CommitConversionWorkspaceRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/conversionWorkspaces/{conversionWorkspacesId}:commit", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CommitProjectsLocationsConversionWorkspacesRequest>;

export type CommitProjectsLocationsConversionWorkspacesResponse = Operation;
export const CommitProjectsLocationsConversionWorkspacesResponse = Operation;

export type CommitProjectsLocationsConversionWorkspacesError = CommonErrors;

export const commitProjectsLocationsConversionWorkspaces: API.OperationMethod<CommitProjectsLocationsConversionWorkspacesRequest, CommitProjectsLocationsConversionWorkspacesResponse, CommitProjectsLocationsConversionWorkspacesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CommitProjectsLocationsConversionWorkspacesRequest,
  output: CommitProjectsLocationsConversionWorkspacesResponse,
  errors: [],
}));

/** Rolls back a conversion workspace to the last committed snapshot. */
export interface RollbackProjectsLocationsConversionWorkspacesRequest {
  /** Required. Name of the conversion workspace resource to roll back to. */
  name: string;
  /** Request body */
  body?: RollbackConversionWorkspaceRequest;
}

export const RollbackProjectsLocationsConversionWorkspacesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(RollbackConversionWorkspaceRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/conversionWorkspaces/{conversionWorkspacesId}:rollback", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RollbackProjectsLocationsConversionWorkspacesRequest>;

export type RollbackProjectsLocationsConversionWorkspacesResponse = Operation;
export const RollbackProjectsLocationsConversionWorkspacesResponse = Operation;

export type RollbackProjectsLocationsConversionWorkspacesError = CommonErrors;

export const rollbackProjectsLocationsConversionWorkspaces: API.OperationMethod<RollbackProjectsLocationsConversionWorkspacesRequest, RollbackProjectsLocationsConversionWorkspacesResponse, RollbackProjectsLocationsConversionWorkspacesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RollbackProjectsLocationsConversionWorkspacesRequest,
  output: RollbackProjectsLocationsConversionWorkspacesResponse,
  errors: [],
}));

/** Applies draft tree onto a specific destination database. */
export interface ApplyProjectsLocationsConversionWorkspacesRequest {
  /** Required. The name of the conversion workspace resource for which to apply the draft tree. Must be in the form of: projects/{project}/locations/{location}/conversionWorkspaces/{conversion_workspace}. */
  name: string;
  /** Request body */
  body?: ApplyConversionWorkspaceRequest;
}

export const ApplyProjectsLocationsConversionWorkspacesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(ApplyConversionWorkspaceRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/conversionWorkspaces/{conversionWorkspacesId}:apply", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ApplyProjectsLocationsConversionWorkspacesRequest>;

export type ApplyProjectsLocationsConversionWorkspacesResponse = Operation;
export const ApplyProjectsLocationsConversionWorkspacesResponse = Operation;

export type ApplyProjectsLocationsConversionWorkspacesError = CommonErrors;

export const applyProjectsLocationsConversionWorkspaces: API.OperationMethod<ApplyProjectsLocationsConversionWorkspacesRequest, ApplyProjectsLocationsConversionWorkspacesResponse, ApplyProjectsLocationsConversionWorkspacesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ApplyProjectsLocationsConversionWorkspacesRequest,
  output: ApplyProjectsLocationsConversionWorkspacesResponse,
  errors: [],
}));

/** Describes the database entities tree for a specific conversion workspace and a specific tree type. Database entities are not resources like conversion workspaces or mapping rules, and they can't be created, updated or deleted. Instead, they are simple data objects describing the structure of the client database. */
export interface DescribeDatabaseEntitiesProjectsLocationsConversionWorkspacesRequest {
  /** Required. Name of the conversion workspace resource whose database entities are described. Must be in the form of: projects/{project}/locations/{location}/conversionWorkspaces/{conversion_workspace}. */
  conversionWorkspace: string;
  /** Optional. The maximum number of entities to return. The service may return fewer entities than the value specifies. */
  pageSize?: number;
  /** Optional. The nextPageToken value received in the previous call to conversionWorkspace.describeDatabaseEntities, used in the subsequent request to retrieve the next page of results. On first call this should be left blank. When paginating, all other parameters provided to conversionWorkspace.describeDatabaseEntities must match the call that provided the page token. */
  pageToken?: string;
  /** Required. The tree to fetch. */
  tree?: "DB_TREE_TYPE_UNSPECIFIED" | "SOURCE_TREE" | "DRAFT_TREE" | "DESTINATION_TREE" | (string & {});
  /** Optional. Whether to retrieve the latest committed version of the entities or the latest version. This field is ignored if a specific commit_id is specified. */
  uncommitted?: boolean;
  /** Optional. Request a specific commit ID. If not specified, the entities from the latest commit are returned. */
  commitId?: string;
  /** Optional. Filter the returned entities based on AIP-160 standard. */
  filter?: string;
  /** Optional. Results view based on AIP-157 */
  view?: "DATABASE_ENTITY_VIEW_UNSPECIFIED" | "DATABASE_ENTITY_VIEW_BASIC" | "DATABASE_ENTITY_VIEW_FULL" | "DATABASE_ENTITY_VIEW_ROOT_SUMMARY" | "DATABASE_ENTITY_VIEW_FULL_COMPACT" | (string & {});
}

export const DescribeDatabaseEntitiesProjectsLocationsConversionWorkspacesRequest = Schema.Struct({
  conversionWorkspace: Schema.String.pipe(T.HttpPath("conversionWorkspace")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  tree: Schema.optional(Schema.String).pipe(T.HttpQuery("tree")),
  uncommitted: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("uncommitted")),
  commitId: Schema.optional(Schema.String).pipe(T.HttpQuery("commitId")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/conversionWorkspaces/{conversionWorkspacesId}:describeDatabaseEntities" }),
  svc,
) as unknown as Schema.Schema<DescribeDatabaseEntitiesProjectsLocationsConversionWorkspacesRequest>;

export type DescribeDatabaseEntitiesProjectsLocationsConversionWorkspacesResponse = DescribeDatabaseEntitiesResponse;
export const DescribeDatabaseEntitiesProjectsLocationsConversionWorkspacesResponse = DescribeDatabaseEntitiesResponse;

export type DescribeDatabaseEntitiesProjectsLocationsConversionWorkspacesError = CommonErrors;

export const describeDatabaseEntitiesProjectsLocationsConversionWorkspaces = API.makePaginated(() => ({
  input: DescribeDatabaseEntitiesProjectsLocationsConversionWorkspacesRequest,
  output: DescribeDatabaseEntitiesProjectsLocationsConversionWorkspacesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Searches/lists the background jobs for a specific conversion workspace. The background jobs are not resources like conversion workspaces or mapping rules, and they can't be created, updated or deleted. Instead, they are a way to expose the data plane jobs log. */
export interface SearchBackgroundJobsProjectsLocationsConversionWorkspacesRequest {
  /** Required. Name of the conversion workspace resource whose jobs are listed, in the form of: projects/{project}/locations/{location}/conversionWorkspaces/{conversion_workspace}. */
  conversionWorkspace: string;
  /** Optional. Whether or not to return just the most recent job per job type, */
  returnMostRecentPerJobType?: boolean;
  /** Optional. The maximum number of jobs to return. The service may return fewer than this value. If unspecified, at most 100 jobs are returned. The maximum value is 100; values above 100 are coerced to 100. */
  maxSize?: number;
  /** Optional. If provided, only returns jobs that completed until (not including) the given timestamp. */
  completedUntilTime?: string;
}

export const SearchBackgroundJobsProjectsLocationsConversionWorkspacesRequest = Schema.Struct({
  conversionWorkspace: Schema.String.pipe(T.HttpPath("conversionWorkspace")),
  returnMostRecentPerJobType: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("returnMostRecentPerJobType")),
  maxSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxSize")),
  completedUntilTime: Schema.optional(Schema.String).pipe(T.HttpQuery("completedUntilTime")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/conversionWorkspaces/{conversionWorkspacesId}:searchBackgroundJobs" }),
  svc,
) as unknown as Schema.Schema<SearchBackgroundJobsProjectsLocationsConversionWorkspacesRequest>;

export type SearchBackgroundJobsProjectsLocationsConversionWorkspacesResponse = SearchBackgroundJobsResponse;
export const SearchBackgroundJobsProjectsLocationsConversionWorkspacesResponse = SearchBackgroundJobsResponse;

export type SearchBackgroundJobsProjectsLocationsConversionWorkspacesError = CommonErrors;

export const searchBackgroundJobsProjectsLocationsConversionWorkspaces: API.OperationMethod<SearchBackgroundJobsProjectsLocationsConversionWorkspacesRequest, SearchBackgroundJobsProjectsLocationsConversionWorkspacesResponse, SearchBackgroundJobsProjectsLocationsConversionWorkspacesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SearchBackgroundJobsProjectsLocationsConversionWorkspacesRequest,
  output: SearchBackgroundJobsProjectsLocationsConversionWorkspacesResponse,
  errors: [],
}));

/** Retrieves a list of committed revisions of a specific conversion workspace. */
export interface DescribeConversionWorkspaceRevisionsProjectsLocationsConversionWorkspacesRequest {
  /** Required. Name of the conversion workspace resource whose revisions are listed. Must be in the form of: projects/{project}/locations/{location}/conversionWorkspaces/{conversion_workspace}. */
  conversionWorkspace: string;
  /** Optional. Optional filter to request a specific commit ID. */
  commitId?: string;
}

export const DescribeConversionWorkspaceRevisionsProjectsLocationsConversionWorkspacesRequest = Schema.Struct({
  conversionWorkspace: Schema.String.pipe(T.HttpPath("conversionWorkspace")),
  commitId: Schema.optional(Schema.String).pipe(T.HttpQuery("commitId")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/conversionWorkspaces/{conversionWorkspacesId}:describeConversionWorkspaceRevisions" }),
  svc,
) as unknown as Schema.Schema<DescribeConversionWorkspaceRevisionsProjectsLocationsConversionWorkspacesRequest>;

export type DescribeConversionWorkspaceRevisionsProjectsLocationsConversionWorkspacesResponse = DescribeConversionWorkspaceRevisionsResponse;
export const DescribeConversionWorkspaceRevisionsProjectsLocationsConversionWorkspacesResponse = DescribeConversionWorkspaceRevisionsResponse;

export type DescribeConversionWorkspaceRevisionsProjectsLocationsConversionWorkspacesError = CommonErrors;

export const describeConversionWorkspaceRevisionsProjectsLocationsConversionWorkspaces: API.OperationMethod<DescribeConversionWorkspaceRevisionsProjectsLocationsConversionWorkspacesRequest, DescribeConversionWorkspaceRevisionsProjectsLocationsConversionWorkspacesResponse, DescribeConversionWorkspaceRevisionsProjectsLocationsConversionWorkspacesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DescribeConversionWorkspaceRevisionsProjectsLocationsConversionWorkspacesRequest,
  output: DescribeConversionWorkspaceRevisionsProjectsLocationsConversionWorkspacesResponse,
  errors: [],
}));

/** Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors. */
export interface SetIamPolicyProjectsLocationsConversionWorkspacesRequest {
  /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyProjectsLocationsConversionWorkspacesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/conversionWorkspaces/{conversionWorkspacesId}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProjectsLocationsConversionWorkspacesRequest>;

export type SetIamPolicyProjectsLocationsConversionWorkspacesResponse = Policy;
export const SetIamPolicyProjectsLocationsConversionWorkspacesResponse = Policy;

export type SetIamPolicyProjectsLocationsConversionWorkspacesError = CommonErrors;

export const setIamPolicyProjectsLocationsConversionWorkspaces: API.OperationMethod<SetIamPolicyProjectsLocationsConversionWorkspacesRequest, SetIamPolicyProjectsLocationsConversionWorkspacesResponse, SetIamPolicyProjectsLocationsConversionWorkspacesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyProjectsLocationsConversionWorkspacesRequest,
  output: SetIamPolicyProjectsLocationsConversionWorkspacesResponse,
  errors: [],
}));

/** Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set. */
export interface GetIamPolicyProjectsLocationsConversionWorkspacesRequest {
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  "options.requestedPolicyVersion"?: number;
}

export const GetIamPolicyProjectsLocationsConversionWorkspacesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  "options.requestedPolicyVersion": Schema.optional(Schema.Number).pipe(T.HttpQuery("options.requestedPolicyVersion")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/conversionWorkspaces/{conversionWorkspacesId}:getIamPolicy" }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProjectsLocationsConversionWorkspacesRequest>;

export type GetIamPolicyProjectsLocationsConversionWorkspacesResponse = Policy;
export const GetIamPolicyProjectsLocationsConversionWorkspacesResponse = Policy;

export type GetIamPolicyProjectsLocationsConversionWorkspacesError = CommonErrors;

export const getIamPolicyProjectsLocationsConversionWorkspaces: API.OperationMethod<GetIamPolicyProjectsLocationsConversionWorkspacesRequest, GetIamPolicyProjectsLocationsConversionWorkspacesResponse, GetIamPolicyProjectsLocationsConversionWorkspacesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyProjectsLocationsConversionWorkspacesRequest,
  output: GetIamPolicyProjectsLocationsConversionWorkspacesResponse,
  errors: [],
}));

/** Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning. */
export interface TestIamPermissionsProjectsLocationsConversionWorkspacesRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsLocationsConversionWorkspacesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/conversionWorkspaces/{conversionWorkspacesId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsProjectsLocationsConversionWorkspacesRequest>;

export type TestIamPermissionsProjectsLocationsConversionWorkspacesResponse = TestIamPermissionsResponse;
export const TestIamPermissionsProjectsLocationsConversionWorkspacesResponse = TestIamPermissionsResponse;

export type TestIamPermissionsProjectsLocationsConversionWorkspacesError = CommonErrors;

export const testIamPermissionsProjectsLocationsConversionWorkspaces: API.OperationMethod<TestIamPermissionsProjectsLocationsConversionWorkspacesRequest, TestIamPermissionsProjectsLocationsConversionWorkspacesResponse, TestIamPermissionsProjectsLocationsConversionWorkspacesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsProjectsLocationsConversionWorkspacesRequest,
  output: TestIamPermissionsProjectsLocationsConversionWorkspacesResponse,
  errors: [],
}));

/** Creates a new mapping rule for a given conversion workspace. */
export interface CreateProjectsLocationsConversionWorkspacesMappingRulesRequest {
  /** Required. The parent which owns this collection of mapping rules. */
  parent: string;
  /** Required. The ID of the rule to create. */
  mappingRuleId?: string;
  /** Optional. A unique ID used to identify the request. If the server receives two requests with the same ID, then the second request is ignored. It is recommended to always set this value to a UUID. The ID must contain only letters (a-z, A-Z), numbers (0-9), underscores (_), and hyphens (-). The maximum length is 40 characters. */
  requestId?: string;
  /** Request body */
  body?: MappingRule;
}

export const CreateProjectsLocationsConversionWorkspacesMappingRulesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  mappingRuleId: Schema.optional(Schema.String).pipe(T.HttpQuery("mappingRuleId")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  body: Schema.optional(MappingRule).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/conversionWorkspaces/{conversionWorkspacesId}/mappingRules", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsConversionWorkspacesMappingRulesRequest>;

export type CreateProjectsLocationsConversionWorkspacesMappingRulesResponse = MappingRule;
export const CreateProjectsLocationsConversionWorkspacesMappingRulesResponse = MappingRule;

export type CreateProjectsLocationsConversionWorkspacesMappingRulesError = CommonErrors;

export const createProjectsLocationsConversionWorkspacesMappingRules: API.OperationMethod<CreateProjectsLocationsConversionWorkspacesMappingRulesRequest, CreateProjectsLocationsConversionWorkspacesMappingRulesResponse, CreateProjectsLocationsConversionWorkspacesMappingRulesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsConversionWorkspacesMappingRulesRequest,
  output: CreateProjectsLocationsConversionWorkspacesMappingRulesResponse,
  errors: [],
}));

/** Deletes a single mapping rule. */
export interface DeleteProjectsLocationsConversionWorkspacesMappingRulesRequest {
  /** Required. Name of the mapping rule resource to delete. */
  name: string;
  /** Optional. A unique ID used to identify the request. If the server receives two requests with the same ID, then the second request is ignored. It is recommended to always set this value to a UUID. The ID must contain only letters (a-z, A-Z), numbers (0-9), underscores (_), and hyphens (-). The maximum length is 40 characters. */
  requestId?: string;
}

export const DeleteProjectsLocationsConversionWorkspacesMappingRulesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/conversionWorkspaces/{conversionWorkspacesId}/mappingRules/{mappingRulesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsConversionWorkspacesMappingRulesRequest>;

export type DeleteProjectsLocationsConversionWorkspacesMappingRulesResponse = Empty;
export const DeleteProjectsLocationsConversionWorkspacesMappingRulesResponse = Empty;

export type DeleteProjectsLocationsConversionWorkspacesMappingRulesError = CommonErrors;

export const deleteProjectsLocationsConversionWorkspacesMappingRules: API.OperationMethod<DeleteProjectsLocationsConversionWorkspacesMappingRulesRequest, DeleteProjectsLocationsConversionWorkspacesMappingRulesResponse, DeleteProjectsLocationsConversionWorkspacesMappingRulesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsConversionWorkspacesMappingRulesRequest,
  output: DeleteProjectsLocationsConversionWorkspacesMappingRulesResponse,
  errors: [],
}));

/** Lists the mapping rules for a specific conversion workspace. */
export interface ListProjectsLocationsConversionWorkspacesMappingRulesRequest {
  /** Required. Name of the conversion workspace resource whose mapping rules are listed in the form of: projects/{project}/locations/{location}/conversionWorkspaces/{conversion_workspace}. */
  parent: string;
  /** Optional. The maximum number of rules to return. The service may return fewer than this value. */
  pageSize?: number;
  /** Optional. The nextPageToken value received in the previous call to mappingRules.list, used in the subsequent request to retrieve the next page of results. On first call this should be left blank. When paginating, all other parameters provided to mappingRules.list must match the call that provided the page token. */
  pageToken?: string;
}

export const ListProjectsLocationsConversionWorkspacesMappingRulesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/conversionWorkspaces/{conversionWorkspacesId}/mappingRules" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsConversionWorkspacesMappingRulesRequest>;

export type ListProjectsLocationsConversionWorkspacesMappingRulesResponse = ListMappingRulesResponse;
export const ListProjectsLocationsConversionWorkspacesMappingRulesResponse = ListMappingRulesResponse;

export type ListProjectsLocationsConversionWorkspacesMappingRulesError = CommonErrors;

export const listProjectsLocationsConversionWorkspacesMappingRules = API.makePaginated(() => ({
  input: ListProjectsLocationsConversionWorkspacesMappingRulesRequest,
  output: ListProjectsLocationsConversionWorkspacesMappingRulesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets the details of a mapping rule. */
export interface GetProjectsLocationsConversionWorkspacesMappingRulesRequest {
  /** Required. Name of the mapping rule resource to get. Example: conversionWorkspaces/123/mappingRules/rule123 In order to retrieve a previous revision of the mapping rule, also provide the revision ID. Example: conversionWorkspace/123/mappingRules/rule123@c7cfa2a8c7cfa2a8c7cfa2a8c7cfa2a8 */
  name: string;
}

export const GetProjectsLocationsConversionWorkspacesMappingRulesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/conversionWorkspaces/{conversionWorkspacesId}/mappingRules/{mappingRulesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsConversionWorkspacesMappingRulesRequest>;

export type GetProjectsLocationsConversionWorkspacesMappingRulesResponse = MappingRule;
export const GetProjectsLocationsConversionWorkspacesMappingRulesResponse = MappingRule;

export type GetProjectsLocationsConversionWorkspacesMappingRulesError = CommonErrors;

export const getProjectsLocationsConversionWorkspacesMappingRules: API.OperationMethod<GetProjectsLocationsConversionWorkspacesMappingRulesRequest, GetProjectsLocationsConversionWorkspacesMappingRulesResponse, GetProjectsLocationsConversionWorkspacesMappingRulesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsConversionWorkspacesMappingRulesRequest,
  output: GetProjectsLocationsConversionWorkspacesMappingRulesResponse,
  errors: [],
}));

/** Imports the mapping rules for a given conversion workspace. Supports various formats of external rules files. */
export interface ImportProjectsLocationsConversionWorkspacesMappingRulesRequest {
  /** Required. Name of the conversion workspace resource to import the rules to in the form of: projects/{project}/locations/{location}/conversionWorkspaces/{conversion_workspace}. */
  parent: string;
  /** Request body */
  body?: ImportMappingRulesRequest;
}

export const ImportProjectsLocationsConversionWorkspacesMappingRulesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(ImportMappingRulesRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/conversionWorkspaces/{conversionWorkspacesId}/mappingRules:import", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ImportProjectsLocationsConversionWorkspacesMappingRulesRequest>;

export type ImportProjectsLocationsConversionWorkspacesMappingRulesResponse = Operation;
export const ImportProjectsLocationsConversionWorkspacesMappingRulesResponse = Operation;

export type ImportProjectsLocationsConversionWorkspacesMappingRulesError = CommonErrors;

export const importProjectsLocationsConversionWorkspacesMappingRules: API.OperationMethod<ImportProjectsLocationsConversionWorkspacesMappingRulesRequest, ImportProjectsLocationsConversionWorkspacesMappingRulesResponse, ImportProjectsLocationsConversionWorkspacesMappingRulesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ImportProjectsLocationsConversionWorkspacesMappingRulesRequest,
  output: ImportProjectsLocationsConversionWorkspacesMappingRulesResponse,
  errors: [],
}));

