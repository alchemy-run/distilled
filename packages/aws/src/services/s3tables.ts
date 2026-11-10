import * as API from "@distilled.cloud/core/api";
import * as S from "@distilled.cloud/core/schema-lite";
import * as __L from "@distilled.cloud/core/schema-lite";
import * as TxXray from "@distilled.cloud/core/telemetry-xray";
import type * as HttpClient from "effect/http/HttpClient";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import { AwsProtocol } from "../protocol.ts";
import type { RegionInput } from "../region.ts";
import { Retry } from "../retry.ts";
import * as T from "../traits.ts";
// Schema table, filled on first reach (see __S at the end).
const __s: any[] = [];
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "S3Tables",
  serviceShapeName: "S3TableBuckets",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "s3tables" });
const ver = /*@__PURE__*/ T.ServiceVersion("2018-05-10");
const proto = /*@__PURE__*/ T.AwsProtocolsRestJson1();
const rules = /*@__PURE__*/ T.EndpointResolver((p, _) => {
  const { Region, UseDualStack = false, UseFIPS = false, Endpoint } = p;
  const e = (u: unknown, p = {}, h = {}): T.EndpointResolverResult => ({
    type: "endpoint" as const,
    endpoint: { url: u as string, properties: p, headers: h },
  });
  const err = (m: unknown): T.EndpointResolverResult => ({
    type: "error" as const,
    message: m as string,
  });
  if (Endpoint != null) {
    if (UseFIPS === true) {
      return err("Invalid Configuration: FIPS and custom endpoint are not supported");
    }
    if (UseDualStack === true) {
      return err("Invalid Configuration: Dualstack and custom endpoint are not supported");
    }
    return e(Endpoint);
  }
  if (Region != null) {
    {
      const PartitionResult = _.partition(Region);
      if (PartitionResult != null && PartitionResult !== false) {
        if (UseFIPS === true && UseDualStack === true) {
          if (
            true === _.getAttr(PartitionResult, "supportsFIPS") &&
            true === _.getAttr(PartitionResult, "supportsDualStack")
          ) {
            return e(
              `https://s3tables-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(`https://s3tables-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://s3tables.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://s3tables.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://s3tables.{R}.{D}","properties":{},"headers":{}}');

/** Span facts shared by every operation (com.distilled.telemetry#service). */
const TELEMETRY = {
  system: "aws-api",
  responseHeaders: [
    { header: "x-amzn-requestid", name: "aws.request_id" },
    { header: "x-amz-request-id", name: "aws.request_id" },
    { header: "x-amzn-request-id", name: "aws.request_id" },
    { header: "x-amz-id-2", name: "aws.extended_request_id" },
  ],
  prefix: "S3Tables",
  service: "S3Tables",
  propagate: TxXray.propagate,
} as const;

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class BadRequestException
  extends /*@__PURE__*/ S.TaggedError<BadRequestException>()(
    "BadRequestException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class ForbiddenException
  extends /*@__PURE__*/ S.TaggedError<ForbiddenException>()(
    "ForbiddenException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class InternalServerErrorException
  extends /*@__PURE__*/ S.TaggedError<InternalServerErrorException>()(
    "InternalServerErrorException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError) {}
export class MethodNotAllowedException
  extends /*@__PURE__*/ S.TaggedError<MethodNotAllowedException>()(
    "MethodNotAllowedException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(405),
  ).pipe(C.withBadRequestError) {}
export class NotFoundException
  extends /*@__PURE__*/ S.TaggedError<NotFoundException>()(
    "NotFoundException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class TooManyRequestsException
  extends /*@__PURE__*/ S.TaggedError<TooManyRequestsException>()(
    "TooManyRequestsException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export type TableARN = string;
export interface CompleteTableMigrationRequest {
  tableARN: string;
}
export interface CompleteTableMigrationResponse {}
export type TableBucketARN = string;
export type NamespaceName = string;
export type NamespaceList = string[];
export interface CreateNamespaceRequest {
  tableBucketARN: string;
  namespace: string[];
}
export interface CreateNamespaceResponse {
  tableBucketARN: string;
  namespace: string[];
}
export type TableName = string;
export type OpenTableFormat = "ICEBERG" | (string & {});
export interface SchemaField {
  id?: number | undefined;
  name: string;
  type: string;
  required?: boolean | undefined;
}
export type SchemaFieldList = SchemaField[];
export interface IcebergSchema {
  fields: SchemaField[];
}
export type SchemaV2FieldType = "struct" | (string & {});
export interface SchemaV2Field {
  id: number;
  name: string;
  type: any;
  required: boolean;
  doc?: string | undefined;
}
export type SchemaV2FieldList = SchemaV2Field[];
export type IntegerList = number[];
export interface IcebergSchemaV2 {
  type: SchemaV2FieldType;
  fields: SchemaV2Field[];
  schemaId?: number | undefined;
  identifierFieldIds?: number[] | undefined;
}
export interface IcebergPartitionField {
  sourceId: number;
  transform: string;
  name: string;
  fieldId?: number | undefined;
}
export type IcebergPartitionFieldList = IcebergPartitionField[];
export interface IcebergPartitionSpec {
  fields: IcebergPartitionField[];
  specId?: number | undefined;
}
export type IcebergSortDirection = "asc" | "desc" | (string & {});
export type IcebergNullOrder = "nulls-first" | "nulls-last" | (string & {});
export interface IcebergSortField {
  sourceId: number;
  transform: string;
  direction: IcebergSortDirection;
  nullOrder: IcebergNullOrder;
}
export type IcebergSortFieldList = IcebergSortField[];
export interface IcebergSortOrder {
  orderId: number;
  fields: IcebergSortField[];
}
export type TableProperties = { [key: string]: string | undefined };
export interface IcebergMetadata {
  schema?: IcebergSchema | undefined;
  schemaV2?: IcebergSchemaV2 | undefined;
  partitionSpec?: IcebergPartitionSpec | undefined;
  writeOrder?: IcebergSortOrder | undefined;
  properties?: { [key: string]: string | undefined } | undefined;
}
export type TableMetadata = { iceberg: IcebergMetadata };
export type SSEAlgorithm = "AES256" | "aws:kms" | (string & {});
export interface EncryptionConfiguration {
  sseAlgorithm: SSEAlgorithm;
  kmsKeyArn?: string | undefined;
}
export type StorageClass = "STANDARD" | "INTELLIGENT_TIERING" | (string & {});
export interface StorageClassConfiguration {
  storageClass: StorageClass;
}
export type TagKey = string;
export type TagValue = string;
export type Tags = { [key: string]: string | undefined };
export interface CreateTableRequest {
  tableBucketARN: string;
  namespace: string;
  name: string;
  format: OpenTableFormat;
  metadata?: TableMetadata | undefined;
  encryptionConfiguration?: EncryptionConfiguration | undefined;
  storageClassConfiguration?: StorageClassConfiguration | undefined;
  tags?: { [key: string]: string | undefined } | undefined;
}
export type VersionToken = string;
export interface CreateTableResponse {
  tableARN: string;
  versionToken: string;
}
export type TableBucketName = string;
export interface CreateTableBucketRequest {
  name: string;
  encryptionConfiguration?: EncryptionConfiguration | undefined;
  storageClassConfiguration?: StorageClassConfiguration | undefined;
  tags?: { [key: string]: string | undefined } | undefined;
}
export interface CreateTableBucketResponse {
  arn: string;
}
export interface DeleteNamespaceRequest {
  tableBucketARN: string;
  namespace: string;
}
export interface DeleteNamespaceResponse {}
export interface DeleteTableRequest {
  tableBucketARN: string;
  namespace: string;
  name: string;
  versionToken?: string | undefined;
}
export interface DeleteTableResponse {}
export interface DeleteTableBucketRequest {
  tableBucketARN: string;
}
export interface DeleteTableBucketResponse {}
export interface DeleteTableBucketEncryptionRequest {
  tableBucketARN: string;
}
export interface DeleteTableBucketEncryptionResponse {}
export interface DeleteTableBucketMetricsConfigurationRequest {
  tableBucketARN: string;
}
export interface DeleteTableBucketMetricsConfigurationResponse {}
export interface DeleteTableBucketPolicyRequest {
  tableBucketARN: string;
}
export interface DeleteTableBucketPolicyResponse {}
export interface DeleteTableBucketReplicationRequest {
  tableBucketARN: string;
  versionToken?: string | undefined;
}
export interface DeleteTableBucketReplicationResponse {}
export interface DeleteTablePolicyRequest {
  tableBucketARN: string;
  namespace: string;
  name: string;
}
export interface DeleteTablePolicyResponse {}
export interface DeleteTableReplicationRequest {
  tableArn: string;
  versionToken: string;
}
export interface DeleteTableReplicationResponse {}
export interface GetNamespaceRequest {
  tableBucketARN: string;
  namespace: string;
}
export type AccountId = string;
export type NamespaceId = string;
export type TableBucketId = string;
export interface GetNamespaceResponse {
  namespace: string[];
  createdAt: Date;
  createdBy: string;
  ownerAccountId: string;
  namespaceId?: string | undefined;
  tableBucketId?: string | undefined;
}
export interface GetTableRequest {
  tableBucketARN?: string | undefined;
  namespace?: string | undefined;
  name?: string | undefined;
  tableArn?: string | undefined;
}
export type TableType = "customer" | "aws" | (string & {});
export type MetadataLocation = string;
export type WarehouseLocation = string;
export interface ReplicationInformation {
  sourceTableARN: string;
}
export interface ManagedTableInformation {
  replicationInformation?: ReplicationInformation | undefined;
}
export interface GetTableResponse {
  name: string;
  type: TableType;
  tableARN: string;
  namespace: string[];
  namespaceId?: string | undefined;
  versionToken: string;
  metadataLocation?: string | undefined;
  warehouseLocation: string;
  createdAt: Date;
  createdBy: string;
  managedByService?: string | undefined;
  modifiedAt: Date;
  modifiedBy?: string | undefined;
  ownerAccountId: string;
  format: OpenTableFormat;
  tableBucketId?: string | undefined;
  managedTableInformation?: ManagedTableInformation | undefined;
}
export interface GetTableBucketRequest {
  tableBucketARN: string;
}
export type TableBucketType = "customer" | "aws" | (string & {});
export interface GetTableBucketResponse {
  arn: string;
  name: string;
  ownerAccountId: string;
  createdAt: Date;
  tableBucketId?: string | undefined;
  type?: TableBucketType | undefined;
}
export interface GetTableBucketEncryptionRequest {
  tableBucketARN: string;
}
export interface GetTableBucketEncryptionResponse {
  encryptionConfiguration: EncryptionConfiguration;
}
export interface GetTableBucketMaintenanceConfigurationRequest {
  tableBucketARN: string;
}
export type TableBucketMaintenanceType = "icebergUnreferencedFileRemoval" | (string & {});
export type MaintenanceStatus = "enabled" | "disabled" | (string & {});
export type PositiveInteger = number;
export interface IcebergUnreferencedFileRemovalSettings {
  unreferencedDays?: number | undefined;
  nonCurrentDays?: number | undefined;
}
export type TableBucketMaintenanceSettings = {
  icebergUnreferencedFileRemoval: IcebergUnreferencedFileRemovalSettings;
};
export interface TableBucketMaintenanceConfigurationValue {
  status?: MaintenanceStatus | undefined;
  settings?: TableBucketMaintenanceSettings | undefined;
}
export type TableBucketMaintenanceConfiguration = {
  [key in TableBucketMaintenanceType]?: TableBucketMaintenanceConfigurationValue | undefined;
};
export interface GetTableBucketMaintenanceConfigurationResponse {
  tableBucketARN: string;
  configuration: { [key: string]: TableBucketMaintenanceConfigurationValue | undefined };
}
export interface GetTableBucketMetricsConfigurationRequest {
  tableBucketARN: string;
}
export interface GetTableBucketMetricsConfigurationResponse {
  tableBucketARN: string;
  id?: string | undefined;
}
export interface GetTableBucketPolicyRequest {
  tableBucketARN: string;
}
export type ResourcePolicy = string;
export interface GetTableBucketPolicyResponse {
  resourcePolicy: string;
}
export interface GetTableBucketReplicationRequest {
  tableBucketARN: string;
}
export type IAMRole = string;
export interface ReplicationDestination {
  destinationTableBucketARN: string;
}
export type ReplicationDestinations = ReplicationDestination[];
export interface TableBucketReplicationRule {
  destinations: ReplicationDestination[];
}
export type TableBucketReplicationRules = TableBucketReplicationRule[];
export interface TableBucketReplicationConfiguration {
  role: string;
  rules: TableBucketReplicationRule[];
}
export interface GetTableBucketReplicationResponse {
  versionToken: string;
  configuration: TableBucketReplicationConfiguration;
}
export interface GetTableBucketStorageClassRequest {
  tableBucketARN: string;
}
export interface GetTableBucketStorageClassResponse {
  storageClassConfiguration: StorageClassConfiguration;
}
export interface GetTableEncryptionRequest {
  tableBucketARN: string;
  namespace: string;
  name: string;
}
export interface GetTableEncryptionResponse {
  encryptionConfiguration: EncryptionConfiguration;
}
export interface GetTableMaintenanceConfigurationRequest {
  tableBucketARN: string;
  namespace: string;
  name: string;
}
export type TableMaintenanceType =
  | "icebergCompaction"
  | "icebergSnapshotManagement"
  | (string & {});
export type IcebergCompactionStrategy = "auto" | "binpack" | "sort" | "z-order" | (string & {});
export interface IcebergCompactionSettings {
  targetFileSizeMB?: number | undefined;
  strategy?: IcebergCompactionStrategy | undefined;
}
export interface IcebergSnapshotManagementSettings {
  minSnapshotsToKeep?: number | undefined;
  maxSnapshotAgeHours?: number | undefined;
}
export type TableMaintenanceSettings =
  | { icebergCompaction: IcebergCompactionSettings; icebergSnapshotManagement?: undefined }
  | { icebergCompaction?: undefined; icebergSnapshotManagement: IcebergSnapshotManagementSettings };
export interface TableMaintenanceConfigurationValue {
  status?: MaintenanceStatus | undefined;
  settings?: TableMaintenanceSettings | undefined;
}
export type TableMaintenanceConfiguration = {
  [key in TableMaintenanceType]?: TableMaintenanceConfigurationValue | undefined;
};
export interface GetTableMaintenanceConfigurationResponse {
  tableARN: string;
  configuration: { [key: string]: TableMaintenanceConfigurationValue | undefined };
}
export interface GetTableMaintenanceJobStatusRequest {
  tableBucketARN: string;
  namespace: string;
  name: string;
}
export type TableMaintenanceJobType =
  | "icebergCompaction"
  | "icebergSnapshotManagement"
  | "icebergUnreferencedFileRemoval"
  | (string & {});
export type JobStatus = "Not_Yet_Run" | "Successful" | "Failed" | "Disabled" | (string & {});
export interface TableMaintenanceJobStatusValue {
  status: JobStatus;
  lastRunTimestamp?: Date | undefined;
  failureMessage?: string | undefined;
}
export type TableMaintenanceJobStatus = {
  [key in TableMaintenanceJobType]?: TableMaintenanceJobStatusValue | undefined;
};
export interface GetTableMaintenanceJobStatusResponse {
  tableARN: string;
  status: { [key: string]: TableMaintenanceJobStatusValue | undefined };
}
export interface GetTableMetadataLocationRequest {
  tableBucketARN: string;
  namespace: string;
  name: string;
}
export interface GetTableMetadataLocationResponse {
  versionToken: string;
  metadataLocation?: string | undefined;
  warehouseLocation: string;
}
export type MigrationId = string;
export interface GetTableMigrationRequest {
  migrationId?: string | undefined;
  tableARN?: string | undefined;
}
export type MigrationType = "start" | "sync" | (string & {});
export type MigrationState =
  | "new"
  | "planning"
  | "pendingReview"
  | "queued"
  | "migrating"
  | "succeeded"
  | "failed"
  | "cancelling"
  | "cancelled"
  | (string & {});
export type RoleArn = string;
export type MigrationFailureCode =
  | "rolePermissions"
  | "sourcePermissions"
  | "destinationPermissions"
  | "resourceNotFound"
  | "sourceNotSupported"
  | "objectMigrationReport"
  | "objectCompatibilityReport"
  | "tableCompatibilityReport"
  | "internalError"
  | "reportBucketNotSupported"
  | (string & {});
export type MigrationFailureDetail = string;
export interface MigrationFailureReason {
  code: MigrationFailureCode;
  detail?: string | undefined;
}
export interface PlanningStats {
  objectsScanned?: number | undefined;
  objectsPlanned?: number | undefined;
  partitionCount?: number | undefined;
}
export interface MigrationStats {
  objectsMigrated?: number | undefined;
  objectsFailedMigration?: number | undefined;
  objectsPendingMigration?: number | undefined;
}
export type MigrationSourceType = "glueTable" | (string & {});
export interface GlueTableSource {
  catalogId: string;
  databaseName: string;
  tableName: string;
}
export type SourceConfiguration = { glueTable: GlueTableSource };
export type MigrationTargetFileSizeMB = number;
export interface MigrationCompactionSettings {
  targetFileSizeMB?: number | undefined;
  strategy?: IcebergCompactionStrategy | undefined;
}
export type MigrationMinSnapshotsToKeep = number;
export interface MigrationSnapshotManagementSettings {
  minSnapshotsToKeep?: number | undefined;
  maxSnapshotAgeHours?: number | undefined;
}
export interface MaintenanceSettings {
  icebergCompaction?: MigrationCompactionSettings | undefined;
  icebergSnapshotManagement?: MigrationSnapshotManagementSettings | undefined;
}
export type UnmatchedSourceFieldsPolicy = "fail" | "drop" | (string & {});
export type IncompatibleValuesPolicy = "fail" | "setNull" | (string & {});
export interface MigrationPolicies {
  unmatchedSourceFieldsPolicy?: UnmatchedSourceFieldsPolicy | undefined;
  incompatibleValuesPolicy?: IncompatibleValuesPolicy | undefined;
}
export interface DataMigrationOverview {
  maintenanceSettings: MaintenanceSettings;
  migrationPolicies: MigrationPolicies;
}
export type S3BucketARN = string;
export type MigrationReportPrefix = string;
export type ReportObjectKey = string;
export type ChecksumCRC64NVME = string;
export type FindingCategory = "access" | "metadata" | "data" | "internal" | (string & {});
export type FindingCategoryCounts = { [key in FindingCategory]?: number | undefined };
export interface ReportOverview {
  prefix?: string | undefined;
  key?: string | undefined;
  checksumCRC64NVME?: string | undefined;
  invalidFindings?: { [key: string]: number | undefined } | undefined;
}
export interface MigrationOutputOverview {
  bucket: string;
  tableCompatibilityReport: ReportOverview;
  objectCompatibilityReport: ReportOverview;
  objectMigrationReport: ReportOverview;
}
export interface GetTableMigrationResponse {
  migrationId: string;
  tableBucketARN: string;
  namespace: string;
  tableARN?: string | undefined;
  name: string;
  type: MigrationType;
  state: MigrationState;
  roleARN: string;
  reviewMigrationPlan: boolean;
  hasValidPlan?: boolean | undefined;
  createdAt: Date;
  stateUpdatedAt: Date;
  failureReason?: MigrationFailureReason | undefined;
  planningStats?: PlanningStats | undefined;
  migrationStats?: MigrationStats | undefined;
  sourceType: MigrationSourceType;
  source: SourceConfiguration;
  dataMigration: DataMigrationOverview;
  migrationOutput: MigrationOutputOverview;
}
export interface GetTablePolicyRequest {
  tableBucketARN: string;
  namespace: string;
  name: string;
}
export interface GetTablePolicyResponse {
  resourcePolicy: string;
}
export interface GetTableRecordExpirationConfigurationRequest {
  tableArn: string;
}
export type TableRecordExpirationStatus = "enabled" | "disabled" | (string & {});
export interface TableRecordExpirationSettings {
  days?: number | undefined;
}
export interface TableRecordExpirationConfigurationValue {
  status?: TableRecordExpirationStatus | undefined;
  settings?: TableRecordExpirationSettings | undefined;
}
export interface GetTableRecordExpirationConfigurationResponse {
  configuration: TableRecordExpirationConfigurationValue;
}
export interface GetTableRecordExpirationJobStatusRequest {
  tableArn: string;
}
export type TableRecordExpirationJobStatus =
  | "NotYetRun"
  | "Successful"
  | "Failed"
  | "Disabled"
  | (string & {});
export interface TableRecordExpirationJobMetrics {
  deletedDataFiles?: number | undefined;
  deletedRecords?: number | undefined;
  removedFilesSize?: number | undefined;
}
export interface GetTableRecordExpirationJobStatusResponse {
  status: TableRecordExpirationJobStatus;
  lastRunTimestamp?: Date | undefined;
  failureMessage?: string | undefined;
  metrics?: TableRecordExpirationJobMetrics | undefined;
}
export interface GetTableReplicationRequest {
  tableArn: string;
}
export interface TableReplicationRule {
  destinations: ReplicationDestination[];
}
export type TableReplicationRules = TableReplicationRule[];
export interface TableReplicationConfiguration {
  role: string;
  rules: TableReplicationRule[];
}
export interface GetTableReplicationResponse {
  versionToken: string;
  configuration: TableReplicationConfiguration;
}
export interface GetTableReplicationStatusRequest {
  tableArn: string;
}
export type ReplicationStatus = "pending" | "completed" | "failed" | (string & {});
export interface LastSuccessfulReplicatedUpdate {
  metadataLocation: string;
  timestamp: Date;
}
export interface ReplicationDestinationStatusModel {
  replicationStatus: ReplicationStatus;
  destinationTableBucketArn: string;
  destinationTableArn?: string | undefined;
  lastSuccessfulReplicatedUpdate?: LastSuccessfulReplicatedUpdate | undefined;
  failureMessage?: string | undefined;
}
export type ReplicationDestinationStatuses = ReplicationDestinationStatusModel[];
export interface GetTableReplicationStatusResponse {
  sourceTableArn: string;
  destinations: ReplicationDestinationStatusModel[];
}
export interface GetTableStorageClassRequest {
  tableBucketARN: string;
  namespace: string;
  name: string;
}
export interface GetTableStorageClassResponse {
  storageClassConfiguration: StorageClassConfiguration;
}
export type NextToken = string;
export type ListNamespacesLimit = number;
export interface ListNamespacesRequest {
  tableBucketARN: string;
  prefix?: string | undefined;
  continuationToken?: string | undefined;
  maxNamespaces?: number | undefined;
}
export interface NamespaceSummary {
  namespace: string[];
  createdAt: Date;
  createdBy: string;
  ownerAccountId: string;
  namespaceId?: string | undefined;
  tableBucketId?: string | undefined;
}
export type NamespaceSummaryList = NamespaceSummary[];
export interface ListNamespacesResponse {
  namespaces: NamespaceSummary[];
  continuationToken?: string | undefined;
}
export type ListTableBucketsLimit = number;
export interface ListTableBucketsRequest {
  prefix?: string | undefined;
  continuationToken?: string | undefined;
  maxBuckets?: number | undefined;
  type?: TableBucketType | undefined;
}
export interface TableBucketSummary {
  arn: string;
  name: string;
  ownerAccountId: string;
  createdAt: Date;
  tableBucketId?: string | undefined;
  type?: TableBucketType | undefined;
}
export type TableBucketSummaryList = TableBucketSummary[];
export interface ListTableBucketsResponse {
  tableBuckets: TableBucketSummary[];
  continuationToken?: string | undefined;
}
export type ListTableMigrationsLimit = number;
export interface ListTableMigrationsRequest {
  tableBucketARN?: string | undefined;
  namespace?: string | undefined;
  name?: string | undefined;
  tableARN?: string | undefined;
  state?: MigrationState | undefined;
  hasValidPlan?: boolean | undefined;
  maxResults?: number | undefined;
  nextToken?: string | undefined;
}
export interface MigrationSummary {
  migrationId: string;
  tableBucketARN: string;
  namespace: string;
  tableARN?: string | undefined;
  name: string;
  type: MigrationType;
  state: MigrationState;
  hasValidPlan?: boolean | undefined;
  createdAt: Date;
  stateUpdatedAt: Date;
}
export type MigrationSummaryList = MigrationSummary[];
export interface ListTableMigrationsResponse {
  migrations: MigrationSummary[];
  nextToken?: string | undefined;
}
export type ListTablesLimit = number;
export interface ListTablesRequest {
  tableBucketARN: string;
  namespace?: string | undefined;
  prefix?: string | undefined;
  continuationToken?: string | undefined;
  maxTables?: number | undefined;
}
export interface TableSummary {
  namespace: string[];
  name: string;
  type: TableType;
  tableARN: string;
  createdAt: Date;
  modifiedAt: Date;
  managedByService?: string | undefined;
  namespaceId?: string | undefined;
  tableBucketId?: string | undefined;
}
export type TableSummaryList = TableSummary[];
export interface ListTablesResponse {
  tables: TableSummary[];
  continuationToken?: string | undefined;
}
export type ResourceArn = string;
export interface ListTagsForResourceRequest {
  resourceArn: string;
}
export interface ListTagsForResourceResponse {
  tags?: { [key: string]: string | undefined } | undefined;
}
export interface PutTableBucketEncryptionRequest {
  tableBucketARN: string;
  encryptionConfiguration: EncryptionConfiguration;
}
export interface PutTableBucketEncryptionResponse {}
export interface PutTableBucketMaintenanceConfigurationRequest {
  tableBucketARN: string;
  type: TableBucketMaintenanceType;
  value: TableBucketMaintenanceConfigurationValue;
}
export interface PutTableBucketMaintenanceConfigurationResponse {}
export interface PutTableBucketMetricsConfigurationRequest {
  tableBucketARN: string;
}
export interface PutTableBucketMetricsConfigurationResponse {}
export interface PutTableBucketPolicyRequest {
  tableBucketARN: string;
  resourcePolicy: string;
}
export interface PutTableBucketPolicyResponse {}
export interface PutTableBucketReplicationRequest {
  tableBucketARN: string;
  versionToken?: string | undefined;
  configuration: TableBucketReplicationConfiguration;
}
export interface PutTableBucketReplicationResponse {
  versionToken: string;
  status: string;
}
export interface PutTableBucketStorageClassRequest {
  tableBucketARN: string;
  storageClassConfiguration: StorageClassConfiguration;
}
export interface PutTableBucketStorageClassResponse {}
export interface PutTableMaintenanceConfigurationRequest {
  tableBucketARN: string;
  namespace: string;
  name: string;
  type: TableMaintenanceType;
  value: TableMaintenanceConfigurationValue;
}
export interface PutTableMaintenanceConfigurationResponse {}
export interface PutTablePolicyRequest {
  tableBucketARN: string;
  namespace: string;
  name: string;
  resourcePolicy: string;
}
export interface PutTablePolicyResponse {}
export interface PutTableRecordExpirationConfigurationRequest {
  tableArn: string;
  value: TableRecordExpirationConfigurationValue;
}
export interface PutTableRecordExpirationConfigurationResponse {}
export interface PutTableReplicationRequest {
  tableArn: string;
  versionToken?: string | undefined;
  configuration: TableReplicationConfiguration;
}
export interface PutTableReplicationResponse {
  versionToken: string;
  status: string;
}
export interface RenameTableRequest {
  tableBucketARN: string;
  namespace: string;
  name: string;
  newNamespaceName?: string | undefined;
  newName?: string | undefined;
  versionToken?: string | undefined;
}
export interface RenameTableResponse {}
export type DataFileFormat = "parquet" | (string & {});
export type CompressionCodec = "zstd" | "snappy" | "gzip" | "uncompressed" | (string & {});
export interface MigrationTableProperties {
  writeFormat?: DataFileFormat | undefined;
  icebergFormatVersion?: number | undefined;
  compressionCodec?: CompressionCodec | undefined;
  dictionaryEncoding?: boolean | undefined;
}
export interface DestinationTable {
  tableBucketARN: string;
  namespace: string;
  name: string;
  encryptionConfiguration?: EncryptionConfiguration | undefined;
  storageClassConfiguration?: StorageClassConfiguration | undefined;
  tags?: { [key: string]: string | undefined } | undefined;
  properties?: MigrationTableProperties | undefined;
  schema?: IcebergSchemaV2 | undefined;
  icebergSortOrder?: IcebergSortOrder | undefined;
}
export interface DataMigrationSettings {
  maintenanceSettings?: MaintenanceSettings | undefined;
  migrationPolicies?: MigrationPolicies | undefined;
}
export interface MigrationReportPrefixes {
  tableCompatibilityReport?: string | undefined;
  objectCompatibilityReport?: string | undefined;
  objectMigrationReport?: string | undefined;
}
export interface MigrationOutputConfiguration {
  bucket: string;
  prefixes?: MigrationReportPrefixes | undefined;
}
export interface StartTableMigrationRequest {
  roleARN: string;
  destinationTable: DestinationTable;
  sourceType: MigrationSourceType;
  source: SourceConfiguration;
  dataMigration?: DataMigrationSettings | undefined;
  reviewMigrationPlan?: boolean | undefined;
  migrationOutput: MigrationOutputConfiguration;
}
export interface StartTableMigrationResponse {
  migrationId: string;
  state: MigrationState;
}
export interface SyncTableMigrationRequest {
  roleARN: string;
  tableARN: string;
  reviewMigrationPlan?: boolean | undefined;
  migrationOutput: MigrationOutputConfiguration;
}
export interface SyncTableMigrationResponse {
  migrationId: string;
  state: MigrationState;
}
export interface TagResourceRequest {
  resourceArn: string;
  tags: { [key: string]: string | undefined };
}
export interface TagResourceResponse {}
export type TagKeyList = string[];
export interface UntagResourceRequest {
  resourceArn: string;
  tagKeys: string[];
}
export interface UntagResourceResponse {}
export interface UpdateTableMetadataLocationRequest {
  tableBucketARN: string;
  namespace: string;
  name: string;
  versionToken: string;
  metadataLocation: string;
}
export interface UpdateTableMetadataLocationResponse {
  name: string;
  tableARN: string;
  namespace: string[];
  versionToken: string;
  metadataLocation: string;
}
export type MigrationRequestedState = "queued" | "cancelled" | (string & {});
export interface UpdateTableMigrationRequest {
  tableARN?: string | undefined;
  migrationId?: string | undefined;
  requestedState: MigrationRequestedState;
  updateDescription?: string | undefined;
}
export interface UpdateTableMigrationResponse {
  migrationId: string;
  state: MigrationState;
  tableARN?: string | undefined;
}
export type ErrorMessage = string;
export type CompleteTableMigrationError =
  | AccessDeniedException
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Completes the migration of a table. The table's most recent migration must be in the `succeeded`, `failed` or `cancelled` state. After you complete the migration, you can't sync the table again, and you can write to and maintain the table as you do any other table: compaction starts, and unreferenced file removal follows the table bucket's configuration. You can't undo this operation. Calling it again for the same table returns a `ConflictException`.
 *
 * ### Permissions
 *
 * - You must have the `s3tables:CompleteTableMigration` permission to use this operation.
 */
export const completeTableMigration: API.OperationMethod<
  CompleteTableMigrationRequest & RegionInput,
  CompleteTableMigrationResponse,
  CompleteTableMigrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1136, __c71, 0) as any as S.Schema<CompleteTableMigrationRequest>,
  output: __S(1152, __c72, 0) as any as S.Schema<CompleteTableMigrationResponse>,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CompleteTableMigration",
  telemetry: TELEMETRY,
  span: "CompleteTableMigration",
}));

export type CreateNamespaceError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates a namespace. A namespace is a logical grouping of tables within your table bucket, which you can use to organize tables. For more information, see Create a namespace in the *Amazon Simple Storage Service User Guide*.
 *
 * ### Permissions
 *
 * You must have the `s3tables:CreateNamespace` permission to use this operation.
 */
export const createNamespace: API.OperationMethod<
  CreateNamespaceRequest & RegionInput,
  CreateNamespaceResponse,
  CreateNamespaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1168, __c73, 0) as any as S.Schema<CreateNamespaceRequest>,
  output: __S(1169, __c73, 1) as any as S.Schema<CreateNamespaceResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateNamespace",
  telemetry: TELEMETRY,
  span: "CreateNamespace",
}));

export type CreateTableError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates a new table associated with the given namespace in a table bucket. For more information, see Creating an Amazon S3 table in the *Amazon Simple Storage Service User Guide*.
 *
 * ### Permissions
 *
 * - You must have the `s3tables:CreateTable` permission to use this operation.
 *
 * - If you use this operation with the optional `metadata` request parameter you must have the `s3tables:PutTableData` permission.
 *
 * - If you use this operation with the optional `encryptionConfiguration` request parameter you must have the `s3tables:PutTableEncryption` permission.
 *
 * - If you use this operation with the `storageClassConfiguration` request parameter, you must have the `s3tables:PutTableStorageClass` permission.
 *
 * - To create a table with tags, you must have the `s3tables:TagResource` permission in addition to `s3tables:CreateTable` permission.
 *
 * Additionally, If you choose SSE-KMS encryption you must grant the S3 Tables maintenance principal access to your KMS key. For more information, see Permissions requirements for S3 Tables SSE-KMS encryption.
 */
export const createTable: API.OperationMethod<
  CreateTableRequest & RegionInput,
  CreateTableResponse,
  CreateTableError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(8, __c0, 8) as any as S.Schema<CreateTableRequest>,
  output: __S(9, __c0, 9) as any as S.Schema<CreateTableResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateTable",
  telemetry: TELEMETRY,
  span: "CreateTable",
}));

export type CreateTableBucketError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates a table bucket. For more information, see Creating a table bucket in the *Amazon Simple Storage Service User Guide*.
 *
 * ### Permissions
 *
 * - You must have the `s3tables:CreateTableBucket` permission to use this operation.
 *
 * - If you use this operation with the optional `encryptionConfiguration` parameter you must have the `s3tables:PutTableBucketEncryption` permission.
 *
 * - If you use this operation with the `storageClassConfiguration` request parameter, you must have the `s3tables:PutTableBucketStorageClass` permission.
 *
 * - To create a table bucket with tags, you must have the `s3tables:TagResource` permission in addition to `s3tables:CreateTableBucket` permission.
 */
export const createTableBucket: API.OperationMethod<
  CreateTableBucketRequest & RegionInput,
  CreateTableBucketResponse,
  CreateTableBucketError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(80, __c5, 0) as any as S.Schema<CreateTableBucketRequest>,
  output: __S(81, __c5, 1) as any as S.Schema<CreateTableBucketResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateTableBucket",
  telemetry: TELEMETRY,
  span: "CreateTableBucket",
}));

export type DeleteNamespaceError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes a namespace. For more information, see Delete a namespace in the *Amazon Simple Storage Service User Guide*.
 *
 * ### Permissions
 *
 * You must have the `s3tables:DeleteNamespace` permission to use this operation.
 */
export const deleteNamespace: API.OperationMethod<
  DeleteNamespaceRequest & RegionInput,
  DeleteNamespaceResponse,
  DeleteNamespaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(96, __c6, 0) as any as S.Schema<DeleteNamespaceRequest>,
  output: __S(1152, __c72, 0) as any as S.Schema<DeleteNamespaceResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteNamespace",
  telemetry: TELEMETRY,
  span: "DeleteNamespace",
}));

export type DeleteTableError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes a table. For more information, see Deleting an Amazon S3 table in the *Amazon Simple Storage Service User Guide*.
 *
 * ### Permissions
 *
 * You must have the `s3tables:DeleteTable` permission to use this operation.
 */
export const deleteTable: API.OperationMethod<
  DeleteTableRequest & RegionInput,
  DeleteTableResponse,
  DeleteTableError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(112, __c7, 0) as any as S.Schema<DeleteTableRequest>,
  output: __S(1152, __c72, 0) as any as S.Schema<DeleteTableResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTable",
  telemetry: TELEMETRY,
  span: "DeleteTable",
}));

export type DeleteTableBucketError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes a table bucket. For more information, see Deleting a table bucket in the *Amazon Simple Storage Service User Guide*.
 *
 * ### Permissions
 *
 * You must have the `s3tables:DeleteTableBucket` permission to use this operation.
 */
export const deleteTableBucket: API.OperationMethod<
  DeleteTableBucketRequest & RegionInput,
  DeleteTableBucketResponse,
  DeleteTableBucketError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(128, __c8, 0) as any as S.Schema<DeleteTableBucketRequest>,
  output: __S(1152, __c72, 0) as any as S.Schema<DeleteTableBucketResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTableBucket",
  telemetry: TELEMETRY,
  span: "DeleteTableBucket",
}));

export type DeleteTableBucketEncryptionError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes the encryption configuration for a table bucket.
 *
 * ### Permissions
 *
 * You must have the `s3tables:DeleteTableBucketEncryption` permission to use this operation.
 */
export const deleteTableBucketEncryption: API.OperationMethod<
  DeleteTableBucketEncryptionRequest & RegionInput,
  DeleteTableBucketEncryptionResponse,
  DeleteTableBucketEncryptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(144, __c9, 0) as any as S.Schema<DeleteTableBucketEncryptionRequest>,
  output: __S(1152, __c72, 0) as any as S.Schema<DeleteTableBucketEncryptionResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTableBucketEncryption",
  telemetry: TELEMETRY,
  span: "DeleteTableBucketEncryption",
}));

export type DeleteTableBucketMetricsConfigurationError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes the metrics configuration for a table bucket.
 *
 * ### Permissions
 *
 * You must have the `s3tables:DeleteTableBucketMetricsConfiguration` permission to use this operation.
 */
export const deleteTableBucketMetricsConfiguration: API.OperationMethod<
  DeleteTableBucketMetricsConfigurationRequest & RegionInput,
  DeleteTableBucketMetricsConfigurationResponse,
  DeleteTableBucketMetricsConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(160, __c10, 0) as any as S.Schema<DeleteTableBucketMetricsConfigurationRequest>,
  output: __S(1152, __c72, 0) as any as S.Schema<DeleteTableBucketMetricsConfigurationResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTableBucketMetricsConfiguration",
  telemetry: TELEMETRY,
  span: "DeleteTableBucketMetricsConfiguration",
}));

export type DeleteTableBucketPolicyError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes a table bucket policy. For more information, see Deleting a table bucket policy in the *Amazon Simple Storage Service User Guide*.
 *
 * ### Permissions
 *
 * You must have the `s3tables:DeleteTableBucketPolicy` permission to use this operation.
 */
export const deleteTableBucketPolicy: API.OperationMethod<
  DeleteTableBucketPolicyRequest & RegionInput,
  DeleteTableBucketPolicyResponse,
  DeleteTableBucketPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(176, __c11, 0) as any as S.Schema<DeleteTableBucketPolicyRequest>,
  output: __S(1152, __c72, 0) as any as S.Schema<DeleteTableBucketPolicyResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTableBucketPolicy",
  telemetry: TELEMETRY,
  span: "DeleteTableBucketPolicy",
}));

export type DeleteTableBucketReplicationError =
  | AccessDeniedException
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes the replication configuration for a table bucket. After deletion, new table updates will no longer be replicated to destination buckets, though existing replicated tables will remain in destination buckets.
 *
 * ### Permissions
 *
 * You must have the `s3tables:DeleteTableBucketReplication` permission to use this operation.
 */
export const deleteTableBucketReplication: API.OperationMethod<
  DeleteTableBucketReplicationRequest & RegionInput,
  DeleteTableBucketReplicationResponse,
  DeleteTableBucketReplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(192, __c12, 0) as any as S.Schema<DeleteTableBucketReplicationRequest>,
  output: __S(1152, __c72, 0) as any as S.Schema<DeleteTableBucketReplicationResponse>,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTableBucketReplication",
  telemetry: TELEMETRY,
  span: "DeleteTableBucketReplication",
}));

export type DeleteTablePolicyError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes a table policy. For more information, see Deleting a table policy in the *Amazon Simple Storage Service User Guide*.
 *
 * ### Permissions
 *
 * You must have the `s3tables:DeleteTablePolicy` permission to use this operation.
 */
export const deleteTablePolicy: API.OperationMethod<
  DeleteTablePolicyRequest & RegionInput,
  DeleteTablePolicyResponse,
  DeleteTablePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(208, __c13, 0) as any as S.Schema<DeleteTablePolicyRequest>,
  output: __S(1152, __c72, 0) as any as S.Schema<DeleteTablePolicyResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTablePolicy",
  telemetry: TELEMETRY,
  span: "DeleteTablePolicy",
}));

export type DeleteTableReplicationError =
  | AccessDeniedException
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes the replication configuration for a specific table. After deletion, new updates to this table will no longer be replicated to destination tables, though existing replicated copies will remain in destination buckets.
 *
 * ### Permissions
 *
 * You must have the `s3tables:DeleteTableReplication` permission to use this operation.
 */
export const deleteTableReplication: API.OperationMethod<
  DeleteTableReplicationRequest & RegionInput,
  DeleteTableReplicationResponse,
  DeleteTableReplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(224, __c14, 0) as any as S.Schema<DeleteTableReplicationRequest>,
  output: __S(1152, __c72, 0) as any as S.Schema<DeleteTableReplicationResponse>,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTableReplication",
  telemetry: TELEMETRY,
  span: "DeleteTableReplication",
}));

export type GetNamespaceError =
  | AccessDeniedException
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets details about a namespace. For more information, see Table namespaces in the *Amazon Simple Storage Service User Guide*.
 *
 * ### Permissions
 *
 * You must have the `s3tables:GetNamespace` permission to use this operation.
 */
export const getNamespace: API.OperationMethod<
  GetNamespaceRequest & RegionInput,
  GetNamespaceResponse,
  GetNamespaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(240, __c15, 0) as any as S.Schema<GetNamespaceRequest>,
  output: __S(256, __c16, 0) as any as S.Schema<GetNamespaceResponse>,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetNamespace",
  telemetry: TELEMETRY,
  span: "GetNamespace",
}));

export type GetTableError =
  | AccessDeniedException
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets details about a table. For more information, see S3 Tables in the *Amazon Simple Storage Service User Guide*.
 *
 * ### Permissions
 *
 * You must have the `s3tables:GetTable` permission to use this operation.
 */
export const getTable: API.OperationMethod<
  GetTableRequest & RegionInput,
  GetTableResponse,
  GetTableError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(272, __c17, 0) as any as S.Schema<GetTableRequest>,
  output: __S(275, __c17, 3) as any as S.Schema<GetTableResponse>,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTable",
  telemetry: TELEMETRY,
  span: "GetTable",
}));

export type GetTableBucketError =
  | AccessDeniedException
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets details on a table bucket. For more information, see Viewing details about an Amazon S3 table bucket in the *Amazon Simple Storage Service User Guide*.
 *
 * ### Permissions
 *
 * You must have the `s3tables:GetTableBucket` permission to use this operation.
 */
export const getTableBucket: API.OperationMethod<
  GetTableBucketRequest & RegionInput,
  GetTableBucketResponse,
  GetTableBucketError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(288, __c18, 0) as any as S.Schema<GetTableBucketRequest>,
  output: __S(304, __c19, 0) as any as S.Schema<GetTableBucketResponse>,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTableBucket",
  telemetry: TELEMETRY,
  span: "GetTableBucket",
}));

export type GetTableBucketEncryptionError =
  | AccessDeniedException
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets the encryption configuration for a table bucket.
 *
 * ### Permissions
 *
 * You must have the `s3tables:GetTableBucketEncryption` permission to use this operation.
 */
export const getTableBucketEncryption: API.OperationMethod<
  GetTableBucketEncryptionRequest & RegionInput,
  GetTableBucketEncryptionResponse,
  GetTableBucketEncryptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(320, __c20, 0) as any as S.Schema<GetTableBucketEncryptionRequest>,
  output: __S(336, __c21, 0) as any as S.Schema<GetTableBucketEncryptionResponse>,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTableBucketEncryption",
  telemetry: TELEMETRY,
  span: "GetTableBucketEncryption",
}));

export type GetTableBucketMaintenanceConfigurationError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets details about a maintenance configuration for a given table bucket. For more information, see Amazon S3 table bucket maintenance in the *Amazon Simple Storage Service User Guide*.
 *
 * ### Permissions
 *
 * You must have the `s3tables:GetTableBucketMaintenanceConfiguration` permission to use this operation.
 */
export const getTableBucketMaintenanceConfiguration: API.OperationMethod<
  GetTableBucketMaintenanceConfigurationRequest & RegionInput,
  GetTableBucketMaintenanceConfigurationResponse,
  GetTableBucketMaintenanceConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(352, __c22, 0) as any as S.Schema<GetTableBucketMaintenanceConfigurationRequest>,
  output: __S(354, __c22, 2) as any as S.Schema<GetTableBucketMaintenanceConfigurationResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTableBucketMaintenanceConfiguration",
  telemetry: TELEMETRY,
  span: "GetTableBucketMaintenanceConfiguration",
}));

export type GetTableBucketMetricsConfigurationError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets the metrics configuration for a table bucket.
 *
 * ### Permissions
 *
 * You must have the `s3tables:GetTableBucketMetricsConfiguration` permission to use this operation.
 */
export const getTableBucketMetricsConfiguration: API.OperationMethod<
  GetTableBucketMetricsConfigurationRequest & RegionInput,
  GetTableBucketMetricsConfigurationResponse,
  GetTableBucketMetricsConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(384, __c24, 0) as any as S.Schema<GetTableBucketMetricsConfigurationRequest>,
  output: __S(385, __c24, 1) as any as S.Schema<GetTableBucketMetricsConfigurationResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTableBucketMetricsConfiguration",
  telemetry: TELEMETRY,
  span: "GetTableBucketMetricsConfiguration",
}));

export type GetTableBucketPolicyError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets details about a table bucket policy. For more information, see Viewing a table bucket policy in the *Amazon Simple Storage Service User Guide*.
 *
 * ### Permissions
 *
 * You must have the `s3tables:GetTableBucketPolicy` permission to use this operation.
 */
export const getTableBucketPolicy: API.OperationMethod<
  GetTableBucketPolicyRequest & RegionInput,
  GetTableBucketPolicyResponse,
  GetTableBucketPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(400, __c25, 0) as any as S.Schema<GetTableBucketPolicyRequest>,
  output: __S(416, __c26, 0) as any as S.Schema<GetTableBucketPolicyResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTableBucketPolicy",
  telemetry: TELEMETRY,
  span: "GetTableBucketPolicy",
}));

export type GetTableBucketReplicationError =
  | AccessDeniedException
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves the replication configuration for a table bucket.This operation returns the IAM role, `versionToken`, and replication rules that define how tables in this bucket are replicated to other buckets.
 *
 * ### Permissions
 *
 * You must have the `s3tables:GetTableBucketReplication` permission to use this operation.
 */
export const getTableBucketReplication: API.OperationMethod<
  GetTableBucketReplicationRequest & RegionInput,
  GetTableBucketReplicationResponse,
  GetTableBucketReplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(432, __c27, 0) as any as S.Schema<GetTableBucketReplicationRequest>,
  output: __S(448, __c28, 0) as any as S.Schema<GetTableBucketReplicationResponse>,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTableBucketReplication",
  telemetry: TELEMETRY,
  span: "GetTableBucketReplication",
}));

export type GetTableBucketStorageClassError =
  | AccessDeniedException
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves the storage class configuration for a specific table. This allows you to view the storage class settings that apply to an individual table, which may differ from the table bucket's default configuration.
 *
 * ### Permissions
 *
 * You must have the `s3tables:GetTableBucketStorageClass` permission to use this operation.
 */
export const getTableBucketStorageClass: API.OperationMethod<
  GetTableBucketStorageClassRequest & RegionInput,
  GetTableBucketStorageClassResponse,
  GetTableBucketStorageClassError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(480, __c30, 0) as any as S.Schema<GetTableBucketStorageClassRequest>,
  output: __S(496, __c31, 0) as any as S.Schema<GetTableBucketStorageClassResponse>,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTableBucketStorageClass",
  telemetry: TELEMETRY,
  span: "GetTableBucketStorageClass",
}));

export type GetTableEncryptionError =
  | AccessDeniedException
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets the encryption configuration for a table.
 *
 * ### Permissions
 *
 * You must have the `s3tables:GetTableEncryption` permission to use this operation.
 */
export const getTableEncryption: API.OperationMethod<
  GetTableEncryptionRequest & RegionInput,
  GetTableEncryptionResponse,
  GetTableEncryptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(512, __c32, 0) as any as S.Schema<GetTableEncryptionRequest>,
  output: __S(336, __c21, 0) as any as S.Schema<GetTableEncryptionResponse>,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTableEncryption",
  telemetry: TELEMETRY,
  span: "GetTableEncryption",
}));

export type GetTableMaintenanceConfigurationError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets details about the maintenance configuration of a table. For more information, see S3 Tables maintenance in the *Amazon Simple Storage Service User Guide*.
 *
 * ### Permissions
 *
 * - You must have the `s3tables:GetTableMaintenanceConfiguration` permission to use this operation.
 *
 * - You must have the `s3tables:GetTableData` permission to use set the compaction strategy to `sort` or `zorder`.
 */
export const getTableMaintenanceConfiguration: API.OperationMethod<
  GetTableMaintenanceConfigurationRequest & RegionInput,
  GetTableMaintenanceConfigurationResponse,
  GetTableMaintenanceConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(528, __c33, 0) as any as S.Schema<GetTableMaintenanceConfigurationRequest>,
  output: __S(530, __c33, 2) as any as S.Schema<GetTableMaintenanceConfigurationResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTableMaintenanceConfiguration",
  telemetry: TELEMETRY,
  span: "GetTableMaintenanceConfiguration",
}));

export type GetTableMaintenanceJobStatusError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets the status of a maintenance job for a table. For more information, see S3 Tables maintenance in the *Amazon Simple Storage Service User Guide*.
 *
 * ### Permissions
 *
 * You must have the `s3tables:GetTableMaintenanceJobStatus` permission to use this operation.
 */
export const getTableMaintenanceJobStatus: API.OperationMethod<
  GetTableMaintenanceJobStatusRequest & RegionInput,
  GetTableMaintenanceJobStatusResponse,
  GetTableMaintenanceJobStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(576, __c36, 0) as any as S.Schema<GetTableMaintenanceJobStatusRequest>,
  output: __S(579, __c36, 3) as any as S.Schema<GetTableMaintenanceJobStatusResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTableMaintenanceJobStatus",
  telemetry: TELEMETRY,
  span: "GetTableMaintenanceJobStatus",
}));

export type GetTableMetadataLocationError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets the location of the table metadata.
 *
 * ### Permissions
 *
 * You must have the `s3tables:GetTableMetadataLocation` permission to use this operation.
 */
export const getTableMetadataLocation: API.OperationMethod<
  GetTableMetadataLocationRequest & RegionInput,
  GetTableMetadataLocationResponse,
  GetTableMetadataLocationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(592, __c37, 0) as any as S.Schema<GetTableMetadataLocationRequest>,
  output: __S(593, __c37, 1) as any as S.Schema<GetTableMetadataLocationResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTableMetadataLocation",
  telemetry: TELEMETRY,
  span: "GetTableMetadataLocation",
}));

export type GetTableMigrationError =
  | AccessDeniedException
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets the details of a migration, including its state, the reason it failed, its statistics and the location of its reports. Identify the migration by its `migrationId`, or specify the `tableARN` of a destination table to get that table's most recent migration.
 *
 * ### Permissions
 *
 * - You must have the `s3tables:GetTableMigration` permission to use this operation.
 */
export const getTableMigration: API.OperationMethod<
  GetTableMigrationRequest & RegionInput,
  GetTableMigrationResponse,
  GetTableMigrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(608, __c38, 0) as any as S.Schema<GetTableMigrationRequest>,
  output: __S(616, __c38, 8) as any as S.Schema<GetTableMigrationResponse>,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTableMigration",
  telemetry: TELEMETRY,
  span: "GetTableMigration",
}));

export type GetTablePolicyError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets details about a table policy. For more information, see Viewing a table policy in the *Amazon Simple Storage Service User Guide*.
 *
 * ### Permissions
 *
 * You must have the `s3tables:GetTablePolicy` permission to use this operation.
 */
export const getTablePolicy: API.OperationMethod<
  GetTablePolicyRequest & RegionInput,
  GetTablePolicyResponse,
  GetTablePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(640, __c40, 0) as any as S.Schema<GetTablePolicyRequest>,
  output: __S(416, __c26, 0) as any as S.Schema<GetTablePolicyResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTablePolicy",
  telemetry: TELEMETRY,
  span: "GetTablePolicy",
}));

export type GetTableRecordExpirationConfigurationError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves the expiration configuration settings for records in a table, and the status of the configuration. If the status of the configuration is `enabled`, records expire and are automatically removed from the table after the specified number of days.
 *
 * ### Permissions
 *
 * You must have the `s3tables:GetTableRecordExpirationConfiguration` permission to use this operation.
 */
export const getTableRecordExpirationConfiguration: API.OperationMethod<
  GetTableRecordExpirationConfigurationRequest & RegionInput,
  GetTableRecordExpirationConfigurationResponse,
  GetTableRecordExpirationConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(656, __c41, 0) as any as S.Schema<GetTableRecordExpirationConfigurationRequest>,
  output: __S(657, __c41, 1) as any as S.Schema<GetTableRecordExpirationConfigurationResponse>,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTableRecordExpirationConfiguration",
  telemetry: TELEMETRY,
  span: "GetTableRecordExpirationConfiguration",
}));

export type GetTableRecordExpirationJobStatusError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves the status, metrics, and details of the latest record expiration job for a table. This includes when the job ran, and whether it succeeded or failed. If the job ran successfully, this also includes statistics about the records that were removed.
 *
 * ### Permissions
 *
 * You must have the `s3tables:GetTableRecordExpirationJobStatus` permission to use this operation.
 */
export const getTableRecordExpirationJobStatus: API.OperationMethod<
  GetTableRecordExpirationJobStatusRequest & RegionInput,
  GetTableRecordExpirationJobStatusResponse,
  GetTableRecordExpirationJobStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(688, __c43, 0) as any as S.Schema<GetTableRecordExpirationJobStatusRequest>,
  output: __S(690, __c43, 2) as any as S.Schema<GetTableRecordExpirationJobStatusResponse>,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTableRecordExpirationJobStatus",
  telemetry: TELEMETRY,
  span: "GetTableRecordExpirationJobStatus",
}));

export type GetTableReplicationError =
  | AccessDeniedException
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves the replication configuration for a specific table.
 *
 * ### Permissions
 *
 * You must have the `s3tables:GetTableReplication` permission to use this operation.
 */
export const getTableReplication: API.OperationMethod<
  GetTableReplicationRequest & RegionInput,
  GetTableReplicationResponse,
  GetTableReplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(704, __c44, 0) as any as S.Schema<GetTableReplicationRequest>,
  output: __S(448, __c28, 0) as any as S.Schema<GetTableReplicationResponse>,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTableReplication",
  telemetry: TELEMETRY,
  span: "GetTableReplication",
}));

export type GetTableReplicationStatusError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves the replication status for a table, including the status of replication to each destination. This operation provides visibility into replication health and progress.
 *
 * ### Permissions
 *
 * You must have the `s3tables:GetTableReplicationStatus` permission to use this operation.
 */
export const getTableReplicationStatus: API.OperationMethod<
  GetTableReplicationStatusRequest & RegionInput,
  GetTableReplicationStatusResponse,
  GetTableReplicationStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(720, __c45, 0) as any as S.Schema<GetTableReplicationStatusRequest>,
  output: __S(724, __c45, 4) as any as S.Schema<GetTableReplicationStatusResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTableReplicationStatus",
  telemetry: TELEMETRY,
  span: "GetTableReplicationStatus",
}));

export type GetTableStorageClassError =
  | AccessDeniedException
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves the storage class configuration for a specific table. This allows you to view the storage class settings that apply to an individual table, which may differ from the table bucket's default configuration.
 *
 * ### Permissions
 *
 * You must have the `s3tables:GetTableStorageClass` permission to use this operation.
 */
export const getTableStorageClass: API.OperationMethod<
  GetTableStorageClassRequest & RegionInput,
  GetTableStorageClassResponse,
  GetTableStorageClassError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(736, __c46, 0) as any as S.Schema<GetTableStorageClassRequest>,
  output: __S(496, __c31, 0) as any as S.Schema<GetTableStorageClassResponse>,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTableStorageClass",
  telemetry: TELEMETRY,
  span: "GetTableStorageClass",
}));

export type ListNamespacesError =
  | AccessDeniedException
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Lists the namespaces within a table bucket. For more information, see Table namespaces in the *Amazon Simple Storage Service User Guide*.
 *
 * ### Permissions
 *
 * You must have the `s3tables:ListNamespaces` permission to use this operation.
 */
export const listNamespaces: API.PaginatedOperationMethod<
  ListNamespacesRequest & RegionInput,
  ListNamespacesResponse,
  ListNamespacesError,
  Credentials | HttpClient.HttpClient,
  NamespaceSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(752, __c47, 0) as any as S.Schema<ListNamespacesRequest>,
  output: __S(754, __c47, 2) as any as S.Schema<ListNamespacesResponse>,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListNamespaces",
  pagination: {
    inputToken: "continuationToken",
    outputToken: "continuationToken",
    items: "namespaces",
    pageSize: "maxNamespaces",
  } as const,
  telemetry: TELEMETRY,
  span: "ListNamespaces",
})) as any;

export type ListTableBucketsError =
  | AccessDeniedException
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Lists table buckets for your account. For more information, see S3 Table buckets in the *Amazon Simple Storage Service User Guide*.
 *
 * ### Permissions
 *
 * You must have the `s3tables:ListTableBuckets` permission to use this operation.
 */
export const listTableBuckets: API.PaginatedOperationMethod<
  ListTableBucketsRequest & RegionInput,
  ListTableBucketsResponse,
  ListTableBucketsError,
  Credentials | HttpClient.HttpClient,
  TableBucketSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(768, __c48, 0) as any as S.Schema<ListTableBucketsRequest>,
  output: __S(770, __c48, 2) as any as S.Schema<ListTableBucketsResponse>,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTableBuckets",
  pagination: {
    inputToken: "continuationToken",
    outputToken: "continuationToken",
    items: "tableBuckets",
    pageSize: "maxBuckets",
  } as const,
  telemetry: TELEMETRY,
  span: "ListTableBuckets",
})) as any;

export type ListTableMigrationsError =
  | AccessDeniedException
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Lists the migrations whose destination is in a table bucket, a namespace or a table. Specify a `tableBucketARN` to list the migrations into a table bucket, and add a `namespace`, or a `namespace` and a `name`, to narrow the list. Or specify a `tableARN` to list the migrations into a table.
 *
 * Migrations are listed newest first. Results are paginated: use `maxResults` to set the page size, and pass the `nextToken` from a response to retrieve the next page of results. A page can contain fewer migrations than `maxResults`, or none, and still return a `nextToken`. Continue until a response has no `nextToken`.
 *
 * ### Permissions
 *
 * - You must have the `s3tables:ListTableMigrations` permission to use this operation.
 */
export const listTableMigrations: API.PaginatedOperationMethod<
  ListTableMigrationsRequest & RegionInput,
  ListTableMigrationsResponse,
  ListTableMigrationsError,
  Credentials | HttpClient.HttpClient,
  MigrationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(784, __c49, 0) as any as S.Schema<ListTableMigrationsRequest>,
  output: __S(787, __c49, 3) as any as S.Schema<ListTableMigrationsResponse>,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTableMigrations",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "migrations",
    pageSize: "maxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListTableMigrations",
})) as any;

export type ListTablesError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * List tables in the given table bucket. For more information, see S3 Tables in the *Amazon Simple Storage Service User Guide*.
 *
 * ### Permissions
 *
 * You must have the `s3tables:ListTables` permission to use this operation.
 */
export const listTables: API.PaginatedOperationMethod<
  ListTablesRequest & RegionInput,
  ListTablesResponse,
  ListTablesError,
  Credentials | HttpClient.HttpClient,
  TableSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(800, __c50, 0) as any as S.Schema<ListTablesRequest>,
  output: __S(803, __c50, 3) as any as S.Schema<ListTablesResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTables",
  pagination: {
    inputToken: "continuationToken",
    outputToken: "continuationToken",
    items: "tables",
    pageSize: "maxTables",
  } as const,
  telemetry: TELEMETRY,
  span: "ListTables",
})) as any;

export type ListTagsForResourceError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Lists all of the tags applied to a specified Amazon S3 Tables resource. Each tag is a label consisting of a key and value pair. Tags can help you organize, track costs for, and control access to resources.
 *
 * For a list of S3 resources that support tagging, see Managing tags for Amazon S3 resources.
 *
 * ### Permissions
 *
 * For tables and table buckets, you must have the `s3tables:ListTagsForResource` permission to use this operation.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest & RegionInput,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(816, __c51, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(817, __c51, 1) as any as S.Schema<ListTagsForResourceResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
  telemetry: TELEMETRY,
  span: "ListTagsForResource",
}));

export type PutTableBucketEncryptionError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Sets the encryption configuration for a table bucket.
 *
 * ### Permissions
 *
 * You must have the `s3tables:PutTableBucketEncryption` permission to use this operation.
 *
 * If you choose SSE-KMS encryption you must grant the S3 Tables maintenance principal access to your KMS key. For more information, see Permissions requirements for S3 Tables SSE-KMS encryption in the *Amazon Simple Storage Service User Guide*.
 */
export const putTableBucketEncryption: API.OperationMethod<
  PutTableBucketEncryptionRequest & RegionInput,
  PutTableBucketEncryptionResponse,
  PutTableBucketEncryptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(832, __c52, 0) as any as S.Schema<PutTableBucketEncryptionRequest>,
  output: __S(1152, __c72, 0) as any as S.Schema<PutTableBucketEncryptionResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutTableBucketEncryption",
  telemetry: TELEMETRY,
  span: "PutTableBucketEncryption",
}));

export type PutTableBucketMaintenanceConfigurationError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates a new maintenance configuration or replaces an existing maintenance configuration for a table bucket. For more information, see Amazon S3 table bucket maintenance in the *Amazon Simple Storage Service User Guide*.
 *
 * ### Permissions
 *
 * You must have the `s3tables:PutTableBucketMaintenanceConfiguration` permission to use this operation.
 */
export const putTableBucketMaintenanceConfiguration: API.OperationMethod<
  PutTableBucketMaintenanceConfigurationRequest & RegionInput,
  PutTableBucketMaintenanceConfigurationResponse,
  PutTableBucketMaintenanceConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(848, __c53, 0) as any as S.Schema<PutTableBucketMaintenanceConfigurationRequest>,
  output: __S(1152, __c72, 0) as any as S.Schema<PutTableBucketMaintenanceConfigurationResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutTableBucketMaintenanceConfiguration",
  telemetry: TELEMETRY,
  span: "PutTableBucketMaintenanceConfiguration",
}));

export type PutTableBucketMetricsConfigurationError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Sets the metrics configuration for a table bucket.
 *
 * ### Permissions
 *
 * You must have the `s3tables:PutTableBucketMetricsConfiguration` permission to use this operation.
 */
export const putTableBucketMetricsConfiguration: API.OperationMethod<
  PutTableBucketMetricsConfigurationRequest & RegionInput,
  PutTableBucketMetricsConfigurationResponse,
  PutTableBucketMetricsConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(864, __c54, 0) as any as S.Schema<PutTableBucketMetricsConfigurationRequest>,
  output: __S(1152, __c72, 0) as any as S.Schema<PutTableBucketMetricsConfigurationResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutTableBucketMetricsConfiguration",
  telemetry: TELEMETRY,
  span: "PutTableBucketMetricsConfiguration",
}));

export type PutTableBucketPolicyError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates a new table bucket policy or replaces an existing table bucket policy for a table bucket. For more information, see Adding a table bucket policy in the *Amazon Simple Storage Service User Guide*.
 *
 * ### Permissions
 *
 * You must have the `s3tables:PutTableBucketPolicy` permission to use this operation.
 */
export const putTableBucketPolicy: API.OperationMethod<
  PutTableBucketPolicyRequest & RegionInput,
  PutTableBucketPolicyResponse,
  PutTableBucketPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(880, __c55, 0) as any as S.Schema<PutTableBucketPolicyRequest>,
  output: __S(1152, __c72, 0) as any as S.Schema<PutTableBucketPolicyResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutTableBucketPolicy",
  telemetry: TELEMETRY,
  span: "PutTableBucketPolicy",
}));

export type PutTableBucketReplicationError =
  | AccessDeniedException
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates or updates the replication configuration for a table bucket. This operation defines how tables in the source bucket are replicated to destination buckets. Replication helps ensure data availability and disaster recovery across regions or accounts.
 *
 * ### Permissions
 *
 * - You must have the `s3tables:PutTableBucketReplication` permission to use this operation. The IAM role specified in the configuration must have permissions to read from the source bucket and write permissions to all destination buckets.
 *
 * - You must also have the following permissions:
 *
 * - `s3tables:GetTable` permission on the source table.
 *
 * - `s3tables:ListTables` permission on the bucket containing the table.
 *
 * - `s3tables:CreateTable` permission for the destination.
 *
 * - `s3tables:CreateNamespace` permission for the destination.
 *
 * - `s3tables:GetTableMaintenanceConfig` permission for the source bucket.
 *
 * - `s3tables:PutTableMaintenanceConfig` permission for the destination bucket.
 *
 * - You must have `iam:PassRole` permission with condition allowing roles to be passed to `replication.s3tables.amazonaws.com`.
 */
export const putTableBucketReplication: API.OperationMethod<
  PutTableBucketReplicationRequest & RegionInput,
  PutTableBucketReplicationResponse,
  PutTableBucketReplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(896, __c56, 0) as any as S.Schema<PutTableBucketReplicationRequest>,
  output: __S(912, __c57, 0) as any as S.Schema<PutTableBucketReplicationResponse>,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutTableBucketReplication",
  telemetry: TELEMETRY,
  span: "PutTableBucketReplication",
}));

export type PutTableBucketStorageClassError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Sets or updates the storage class configuration for a table bucket. This configuration serves as the default storage class for all new tables created in the bucket, allowing you to optimize storage costs at the bucket level.
 *
 * ### Permissions
 *
 * You must have the `s3tables:PutTableBucketStorageClass` permission to use this operation.
 */
export const putTableBucketStorageClass: API.OperationMethod<
  PutTableBucketStorageClassRequest & RegionInput,
  PutTableBucketStorageClassResponse,
  PutTableBucketStorageClassError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(928, __c58, 0) as any as S.Schema<PutTableBucketStorageClassRequest>,
  output: __S(1152, __c72, 0) as any as S.Schema<PutTableBucketStorageClassResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutTableBucketStorageClass",
  telemetry: TELEMETRY,
  span: "PutTableBucketStorageClass",
}));

export type PutTableMaintenanceConfigurationError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates a new maintenance configuration or replaces an existing maintenance configuration for a table. For more information, see S3 Tables maintenance in the *Amazon Simple Storage Service User Guide*.
 *
 * ### Permissions
 *
 * You must have the `s3tables:PutTableMaintenanceConfiguration` permission to use this operation.
 */
export const putTableMaintenanceConfiguration: API.OperationMethod<
  PutTableMaintenanceConfigurationRequest & RegionInput,
  PutTableMaintenanceConfigurationResponse,
  PutTableMaintenanceConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(944, __c59, 0) as any as S.Schema<PutTableMaintenanceConfigurationRequest>,
  output: __S(1152, __c72, 0) as any as S.Schema<PutTableMaintenanceConfigurationResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutTableMaintenanceConfiguration",
  telemetry: TELEMETRY,
  span: "PutTableMaintenanceConfiguration",
}));

export type PutTablePolicyError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates a new table policy or replaces an existing table policy for a table. For more information, see Adding a table policy in the *Amazon Simple Storage Service User Guide*.
 *
 * ### Permissions
 *
 * You must have the `s3tables:PutTablePolicy` permission to use this operation.
 */
export const putTablePolicy: API.OperationMethod<
  PutTablePolicyRequest & RegionInput,
  PutTablePolicyResponse,
  PutTablePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(960, __c60, 0) as any as S.Schema<PutTablePolicyRequest>,
  output: __S(1152, __c72, 0) as any as S.Schema<PutTablePolicyResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutTablePolicy",
  telemetry: TELEMETRY,
  span: "PutTablePolicy",
}));

export type PutTableRecordExpirationConfigurationError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates or updates the expiration configuration settings for records in a table, including the status of the configuration. If you enable record expiration for a table, records expire and are automatically removed from the table after the number of days that you specify.
 *
 * ### Permissions
 *
 * You must have the `s3tables:PutTableRecordExpirationConfiguration` permission to use this operation.
 */
export const putTableRecordExpirationConfiguration: API.OperationMethod<
  PutTableRecordExpirationConfigurationRequest & RegionInput,
  PutTableRecordExpirationConfigurationResponse,
  PutTableRecordExpirationConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(976, __c61, 0) as any as S.Schema<PutTableRecordExpirationConfigurationRequest>,
  output: __S(1152, __c72, 0) as any as S.Schema<PutTableRecordExpirationConfigurationResponse>,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutTableRecordExpirationConfiguration",
  telemetry: TELEMETRY,
  span: "PutTableRecordExpirationConfiguration",
}));

export type PutTableReplicationError =
  | AccessDeniedException
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates or updates the replication configuration for a specific table. This operation allows you to define table-level replication independently of bucket-level replication, providing granular control over which tables are replicated and where.
 *
 * ### Permissions
 *
 * - You must have the `s3tables:PutTableReplication` permission to use this operation. The IAM role specified in the configuration must have permissions to read from the source table and write to all destination tables.
 *
 * - You must also have the following permissions:
 *
 * - `s3tables:GetTable` permission on the source table being replicated.
 *
 * - `s3tables:CreateTable` permission for the destination.
 *
 * - `s3tables:CreateNamespace` permission for the destination.
 *
 * - `s3tables:GetTableMaintenanceConfig` permission for the source table.
 *
 * - `s3tables:PutTableMaintenanceConfig` permission for the destination table.
 *
 * - You must have `iam:PassRole` permission with condition allowing roles to be passed to `replication.s3tables.amazonaws.com`.
 */
export const putTableReplication: API.OperationMethod<
  PutTableReplicationRequest & RegionInput,
  PutTableReplicationResponse,
  PutTableReplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(992, __c62, 0) as any as S.Schema<PutTableReplicationRequest>,
  output: __S(912, __c57, 0) as any as S.Schema<PutTableReplicationResponse>,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutTableReplication",
  telemetry: TELEMETRY,
  span: "PutTableReplication",
}));

export type RenameTableError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Renames a table or a namespace. For more information, see S3 Tables in the *Amazon Simple Storage Service User Guide*.
 *
 * ### Permissions
 *
 * You must have the `s3tables:RenameTable` permission to use this operation.
 */
export const renameTable: API.OperationMethod<
  RenameTableRequest & RegionInput,
  RenameTableResponse,
  RenameTableError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1008, __c63, 0) as any as S.Schema<RenameTableRequest>,
  output: __S(1152, __c72, 0) as any as S.Schema<RenameTableResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RenameTable",
  telemetry: TELEMETRY,
  span: "RenameTable",
}));

export type StartTableMigrationError =
  | AccessDeniedException
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Starts migrating an Amazon Web Services Glue Data Catalog table into a new table in a table bucket. The migration runs asynchronously: this operation returns the migration ID and its initial state, and you track progress with `GetTableMigration`.
 *
 * The namespace must already exist, and a table with the specified name must not. The migration creates the table during planning and commits data to it as it runs. Until you call `CompleteTableMigration`, you can read the table but you can't write to it. If the migration fails or is cancelled, the table and the data already committed to it remain.
 *
 * The migration first checks the source and the destination, and writes the table compatibility and object compatibility reports to the bucket that you specify in `migrationOutput`. If you set `reviewMigrationPlan` to `true`, the migration waits in the `pendingReview` state so that you can review the reports, and continues only when you call `UpdateTableMigration` with `requestedState` set to `queued`. If you don't continue or cancel the migration within 30 days, the migration fails. Otherwise it continues to migrate the data, and writes the object migration report when the migration ends. If planning fails, the migration writes no object migration report.
 *
 * ### Permissions
 *
 * - You must have the `s3tables:StartTableMigration` permission to use this operation.
 *
 * - You must have the `iam:PassRole` permission on the role that you specify in `roleARN`, with a condition that allows passing it to `migration.s3tables.amazonaws.com`. The associated resource is the table bucket.
 *
 * - If `destinationTable` specifies SSE-KMS encryption, you must have the `kms:DescribeKey` and `kms:GenerateDataKey` permissions on the KMS key. You must also grant the S3 Tables maintenance principal access to the key. For more information, see Permissions requirements for S3 Tables SSE-KMS encryption.
 */
export const startTableMigration: API.OperationMethod<
  StartTableMigrationRequest & RegionInput,
  StartTableMigrationResponse,
  StartTableMigrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1027, __c64, 3) as any as S.Schema<StartTableMigrationRequest>,
  output: __S(1042, __c65, 2) as any as S.Schema<StartTableMigrationResponse>,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartTableMigration",
  telemetry: TELEMETRY,
  span: "StartTableMigration",
}));

export type SyncTableMigrationError =
  | AccessDeniedException
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Migrates the changes in the source table since the previous start or sync, such as added and deleted source objects, into the destination table. The sync runs asynchronously: this operation returns the migration ID of the sync and its initial state, and you track progress with `GetTableMigration`.
 *
 * A sync uses the source, destination and data migration settings of the table's migration, and plans the work and writes its reports in the same way as `StartTableMigration`. You can sync after a start or sync that succeeded, failed or was cancelled, if an earlier start or sync of the table has a valid plan (`hasValidPlan`). You can't sync a table while a start or sync is in progress for it, and you can sync a table until you call `CompleteTableMigration` for it. If a source object that an earlier migration migrated has since been overwritten, the sync fails.
 *
 * ### Permissions
 *
 * - You must have the `s3tables:SyncTableMigration` permission to use this operation.
 *
 * - You must have the `iam:PassRole` permission on the role that you specify in `roleARN`, with a condition that allows passing it to `migration.s3tables.amazonaws.com`. The associated resource is the table.
 */
export const syncTableMigration: API.OperationMethod<
  SyncTableMigrationRequest & RegionInput,
  SyncTableMigrationResponse,
  SyncTableMigrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1056, __c66, 0) as any as S.Schema<SyncTableMigrationRequest>,
  output: __S(1042, __c65, 2) as any as S.Schema<SyncTableMigrationResponse>,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SyncTableMigration",
  telemetry: TELEMETRY,
  span: "SyncTableMigration",
}));

export type TagResourceError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Applies one or more user-defined tags to an Amazon S3 Tables resource or updates existing tags. Each tag is a label consisting of a key and value pair. Tags can help you organize, track costs for, and control access to your resources. You can add up to 50 tags for each S3 resource.
 *
 * For a list of S3 resources that support tagging, see Managing tags for Amazon S3 resources.
 *
 * ### Permissions
 *
 * For tables and table buckets, you must have the `s3tables:TagResource` permission to use this operation.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest & RegionInput,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1072, __c67, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(1152, __c72, 0) as any as S.Schema<TagResourceResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
  telemetry: TELEMETRY,
  span: "TagResource",
}));

export type UntagResourceError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Removes the specified user-defined tags from an Amazon S3 Tables resource. You can pass one or more tag keys.
 *
 * For a list of S3 resources that support tagging, see Managing tags for Amazon S3 resources.
 *
 * ### Permissions
 *
 * For tables and table buckets, you must have the `s3tables:UntagResource` permission to use this operation.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest & RegionInput,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1088, __c68, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(1152, __c72, 0) as any as S.Schema<UntagResourceResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
  telemetry: TELEMETRY,
  span: "UntagResource",
}));

export type UpdateTableMetadataLocationError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates the metadata location for a table. The metadata location of a table must be an S3 URI that begins with the table's warehouse location. The metadata location for an Apache Iceberg table must end with `.metadata.json`, or if the metadata file is Gzip-compressed, `.metadata.json.gz`.
 *
 * ### Permissions
 *
 * You must have the `s3tables:UpdateTableMetadataLocation` permission to use this operation.
 */
export const updateTableMetadataLocation: API.OperationMethod<
  UpdateTableMetadataLocationRequest & RegionInput,
  UpdateTableMetadataLocationResponse,
  UpdateTableMetadataLocationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1104, __c69, 0) as any as S.Schema<UpdateTableMetadataLocationRequest>,
  output: __S(1105, __c69, 1) as any as S.Schema<UpdateTableMetadataLocationResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateTableMetadataLocation",
  telemetry: TELEMETRY,
  span: "UpdateTableMetadataLocation",
}));

export type UpdateTableMigrationError =
  | AccessDeniedException
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Requests a state change for a migration. Identify the migration by its `migrationId` or by the `tableARN` of its destination table.
 *
 * Set `requestedState` to `queued` to continue a migration in the `pendingReview` state; the migration moves to `queued` or `migrating`. Set it to `cancelled` to cancel a migration in the `new`, `planning`, `pendingReview`, `queued` or `migrating` state; the migration moves to `cancelling`, finishes the work in progress, and then ends in the `cancelled` state, or in the `failed` state if any objects failed to migrate. Data that the migration already committed stays in the destination table.
 *
 * ### Permissions
 *
 * - You must have the `s3tables:UpdateTableMigration` permission to use this operation.
 */
export const updateTableMigration: API.OperationMethod<
  UpdateTableMigrationRequest & RegionInput,
  UpdateTableMigrationResponse,
  UpdateTableMigrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1120, __c70, 0) as any as S.Schema<UpdateTableMigrationRequest>,
  output: __S(1121, __c70, 1) as any as S.Schema<UpdateTableMigrationResponse>,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateTableMigration",
  telemetry: TELEMETRY,
  span: "UpdateTableMigration",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          id: S.optional(S.Number),
          name: S.String,
          type: S.String,
          required: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "SchemaField" });
    case 1:
      return S.Array(__S(0, __c0, 0));
    case 2:
      return S.suspend(() => S.Struct({ fields: __S(1, __c0, 1) })).annotate({
        identifier: "IcebergSchema",
      });
    case 3:
      return S.suspend(() =>
        S.Struct({
          sourceId: S.Number,
          transform: S.String,
          name: S.String,
          fieldId: S.optional(S.Number),
        }).pipe(S.encodeKeys({ sourceId: "source-id", fieldId: "field-id" })),
      ).annotate({ identifier: "IcebergPartitionField" });
    case 4:
      return S.Array(__S(3, __c0, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({ fields: __S(4, __c0, 4), specId: S.optional(S.Number) }).pipe(
          S.encodeKeys({ specId: "spec-id" }),
        ),
      ).annotate({ identifier: "IcebergPartitionSpec" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          schema: S.optional(__S(2, __c0, 2)),
          schemaV2: S.optional(__S(67, __c4, 3)),
          partitionSpec: S.optional(__S(5, __c0, 5)),
          writeOrder: S.optional(__S(70, __c4, 6)),
          properties: S.optional(__S(48, __c3, 0)),
        }),
      ).annotate({ identifier: "IcebergMetadata" });
    case 7:
      return S.Union([/*@__PURE__*/ S.Struct({ iceberg: __S(6, __c0, 6) })]);
    case 8:
      return S.suspend(() =>
        S.Struct({
          tableBucketARN: S.String.pipe(T.HttpLabel("tableBucketARN")),
          namespace: S.String.pipe(T.HttpLabel("namespace")),
          name: S.String,
          format: S.String,
          metadata: S.optional(__S(7, __c0, 7)),
          encryptionConfiguration: S.optional(__S(16, __c1, 0)),
          storageClassConfiguration: S.optional(__S(32, __c2, 0)),
          tags: S.optional(__S(48, __c3, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/tables/{tableBucketARN}/{namespace}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateTableRequest" });
    case 9:
      return S.suspend(() => S.Struct({ tableARN: S.String, versionToken: S.String })).annotate({
        identifier: "CreateTableResponse",
      });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ sseAlgorithm: S.String, kmsKeyArn: S.optional(S.String) }),
      ).annotate({ identifier: "EncryptionConfiguration" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ storageClass: S.String })).annotate({
        identifier: "StorageClassConfiguration",
      });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          id: S.Number,
          name: S.String,
          type: S.Any,
          required: S.Boolean,
          doc: S.optional(S.String),
        }),
      ).annotate({ identifier: "SchemaV2Field" });
    case 1:
      return S.Array(__S(64, __c4, 0));
    case 2:
      return S.Array(S.Number);
    case 3:
      return S.suspend(() =>
        S.Struct({
          type: S.String,
          fields: __S(65, __c4, 1),
          schemaId: S.optional(S.Number),
          identifierFieldIds: S.optional(__S(66, __c4, 2)),
        }).pipe(
          S.encodeKeys({ schemaId: "schema-id", identifierFieldIds: "identifier-field-ids" }),
        ),
      ).annotate({ identifier: "IcebergSchemaV2" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          sourceId: S.Number,
          transform: S.String,
          direction: S.String,
          nullOrder: S.String,
        }).pipe(S.encodeKeys({ sourceId: "source-id", nullOrder: "null-order" })),
      ).annotate({ identifier: "IcebergSortField" });
    case 5:
      return S.Array(__S(68, __c4, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({ orderId: S.Number, fields: __S(69, __c4, 5) }).pipe(
          S.encodeKeys({ orderId: "order-id" }),
        ),
      ).annotate({ identifier: "IcebergSortOrder" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          encryptionConfiguration: S.optional(__S(16, __c1, 0)),
          storageClassConfiguration: S.optional(__S(32, __c2, 0)),
          tags: S.optional(__S(48, __c3, 0)),
        }).pipe(T.all(T.Http({ method: "PUT", uri: "/buckets" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateTableBucketRequest" });
    case 1:
      return S.suspend(() => S.Struct({ arn: S.String })).annotate({
        identifier: "CreateTableBucketResponse",
      });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          tableBucketARN: S.String.pipe(T.HttpLabel("tableBucketARN")),
          namespace: S.String.pipe(T.HttpLabel("namespace")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/namespaces/{tableBucketARN}/{namespace}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteNamespaceRequest" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          tableBucketARN: S.String.pipe(T.HttpLabel("tableBucketARN")),
          namespace: S.String.pipe(T.HttpLabel("namespace")),
          name: S.String.pipe(T.HttpLabel("name")),
          versionToken: S.optional(S.String).pipe(T.HttpQuery("versionToken")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/tables/{tableBucketARN}/{namespace}/{name}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteTableRequest" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ tableBucketARN: S.String.pipe(T.HttpLabel("tableBucketARN")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/buckets/{tableBucketARN}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteTableBucketRequest" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ tableBucketARN: S.String.pipe(T.HttpLabel("tableBucketARN")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/buckets/{tableBucketARN}/encryption" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteTableBucketEncryptionRequest" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ tableBucketARN: S.String.pipe(T.HttpLabel("tableBucketARN")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/buckets/{tableBucketARN}/metrics" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteTableBucketMetricsConfigurationRequest" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ tableBucketARN: S.String.pipe(T.HttpLabel("tableBucketARN")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/buckets/{tableBucketARN}/policy" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteTableBucketPolicyRequest" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          tableBucketARN: S.String.pipe(T.HttpQuery("tableBucketARN")),
          versionToken: S.optional(S.String).pipe(T.HttpQuery("versionToken")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/table-bucket-replication" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteTableBucketReplicationRequest" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          tableBucketARN: S.String.pipe(T.HttpLabel("tableBucketARN")),
          namespace: S.String.pipe(T.HttpLabel("namespace")),
          name: S.String.pipe(T.HttpLabel("name")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/tables/{tableBucketARN}/{namespace}/{name}/policy" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteTablePolicyRequest" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          tableArn: S.String.pipe(T.HttpQuery("tableArn")),
          versionToken: S.String.pipe(T.HttpQuery("versionToken")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/table-replication" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteTableReplicationRequest" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          tableBucketARN: S.String.pipe(T.HttpLabel("tableBucketARN")),
          namespace: S.String.pipe(T.HttpLabel("namespace")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/namespaces/{tableBucketARN}/{namespace}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetNamespaceRequest" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          namespace: __S(1184, __c74, 0),
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          createdBy: S.String,
          ownerAccountId: S.String,
          namespaceId: S.optional(S.String),
          tableBucketId: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetNamespaceResponse" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          tableBucketARN: S.optional(S.String).pipe(T.HttpQuery("tableBucketARN")),
          namespace: S.optional(S.String).pipe(T.HttpQuery("namespace")),
          name: S.optional(S.String).pipe(T.HttpQuery("name")),
          tableArn: S.optional(S.String).pipe(T.HttpQuery("tableArn")),
        }).pipe(T.all(T.Http({ method: "GET", uri: "/get-table" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetTableRequest" });
    case 1:
      return S.suspend(() => S.Struct({ sourceTableARN: S.String })).annotate({
        identifier: "ReplicationInformation",
      });
    case 2:
      return S.suspend(() =>
        S.Struct({ replicationInformation: S.optional(__S(273, __c17, 1)) }),
      ).annotate({ identifier: "ManagedTableInformation" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          type: S.String,
          tableARN: S.String,
          namespace: __S(1184, __c74, 0),
          namespaceId: S.optional(S.String),
          versionToken: S.String,
          metadataLocation: S.optional(S.String),
          warehouseLocation: S.String,
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          createdBy: S.String,
          managedByService: S.optional(S.String),
          modifiedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          modifiedBy: S.optional(S.String),
          ownerAccountId: S.String,
          format: S.String,
          tableBucketId: S.optional(S.String),
          managedTableInformation: S.optional(__S(274, __c17, 2)),
        }),
      ).annotate({ identifier: "GetTableResponse" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ tableBucketARN: S.String.pipe(T.HttpLabel("tableBucketARN")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/buckets/{tableBucketARN}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetTableBucketRequest" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          arn: S.String,
          name: S.String,
          ownerAccountId: S.String,
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          tableBucketId: S.optional(S.String),
          type: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetTableBucketResponse" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ tableBucketARN: S.String.pipe(T.HttpLabel("tableBucketARN")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/buckets/{tableBucketARN}/encryption" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetTableBucketEncryptionRequest" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ encryptionConfiguration: __S(16, __c1, 0) })).annotate({
        identifier: "GetTableBucketEncryptionResponse",
      });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ tableBucketARN: S.String.pipe(T.HttpLabel("tableBucketARN")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/buckets/{tableBucketARN}/maintenance" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetTableBucketMaintenanceConfigurationRequest" });
    case 1:
      return S.Record(S.String, /*@__PURE__*/ __S(370, __c23, 2).pipe(S.optional));
    case 2:
      return S.suspend(() =>
        S.Struct({ tableBucketARN: S.String, configuration: __S(353, __c22, 1) }),
      ).annotate({ identifier: "GetTableBucketMaintenanceConfigurationResponse" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ unreferencedDays: S.optional(S.Number), nonCurrentDays: S.optional(S.Number) }),
      ).annotate({ identifier: "IcebergUnreferencedFileRemovalSettings" });
    case 1:
      return S.Union([
        /*@__PURE__*/ S.Struct({ icebergUnreferencedFileRemoval: __S(368, __c23, 0) }),
      ]);
    case 2:
      return S.suspend(() =>
        S.Struct({ status: S.optional(S.String), settings: S.optional(__S(369, __c23, 1)) }),
      ).annotate({ identifier: "TableBucketMaintenanceConfigurationValue" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ tableBucketARN: S.String.pipe(T.HttpLabel("tableBucketARN")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/buckets/{tableBucketARN}/metrics" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetTableBucketMetricsConfigurationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ tableBucketARN: S.String, id: S.optional(S.String) }),
      ).annotate({ identifier: "GetTableBucketMetricsConfigurationResponse" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ tableBucketARN: S.String.pipe(T.HttpLabel("tableBucketARN")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/buckets/{tableBucketARN}/policy" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetTableBucketPolicyRequest" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ resourcePolicy: S.String })).annotate({
        identifier: "GetTableBucketPolicyResponse",
      });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ tableBucketARN: S.String.pipe(T.HttpQuery("tableBucketARN")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/table-bucket-replication" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetTableBucketReplicationRequest" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ versionToken: S.String, configuration: __S(468, __c29, 4) }),
      ).annotate({ identifier: "GetTableBucketReplicationResponse" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ destinationTableBucketARN: S.String })).annotate({
        identifier: "ReplicationDestination",
      });
    case 1:
      return S.Array(__S(464, __c29, 0));
    case 2:
      return S.suspend(() => S.Struct({ destinations: __S(465, __c29, 1) })).annotate({
        identifier: "TableBucketReplicationRule",
      });
    case 3:
      return S.Array(__S(466, __c29, 2));
    case 4:
      return S.suspend(() => S.Struct({ role: S.String, rules: __S(467, __c29, 3) })).annotate({
        identifier: "TableBucketReplicationConfiguration",
      });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ tableBucketARN: S.String.pipe(T.HttpLabel("tableBucketARN")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/buckets/{tableBucketARN}/storage-class" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetTableBucketStorageClassRequest" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ storageClassConfiguration: __S(32, __c2, 0) })).annotate({
        identifier: "GetTableBucketStorageClassResponse",
      });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          tableBucketARN: S.String.pipe(T.HttpLabel("tableBucketARN")),
          namespace: S.String.pipe(T.HttpLabel("namespace")),
          name: S.String.pipe(T.HttpLabel("name")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/tables/{tableBucketARN}/{namespace}/{name}/encryption",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetTableEncryptionRequest" });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          tableBucketARN: S.String.pipe(T.HttpLabel("tableBucketARN")),
          namespace: S.String.pipe(T.HttpLabel("namespace")),
          name: S.String.pipe(T.HttpLabel("name")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/tables/{tableBucketARN}/{namespace}/{name}/maintenance",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetTableMaintenanceConfigurationRequest" });
    case 1:
      return S.Record(S.String, /*@__PURE__*/ __S(561, __c35, 1).pipe(S.optional));
    case 2:
      return S.suspend(() =>
        S.Struct({ tableARN: S.String, configuration: __S(529, __c33, 1) }),
      ).annotate({ identifier: "GetTableMaintenanceConfigurationResponse" });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ targetFileSizeMB: S.optional(S.Number), strategy: S.optional(S.String) }),
      ).annotate({ identifier: "IcebergCompactionSettings" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          minSnapshotsToKeep: S.optional(S.Number),
          maxSnapshotAgeHours: S.optional(S.Number),
        }),
      ).annotate({ identifier: "IcebergSnapshotManagementSettings" });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.Union([
        /*@__PURE__*/ S.Struct({ icebergCompaction: __S(544, __c34, 0) }),
        /*@__PURE__*/ S.Struct({ icebergSnapshotManagement: __S(545, __c34, 1) }),
      ]);
    case 1:
      return S.suspend(() =>
        S.Struct({ status: S.optional(S.String), settings: S.optional(__S(560, __c35, 0)) }),
      ).annotate({ identifier: "TableMaintenanceConfigurationValue" });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          tableBucketARN: S.String.pipe(T.HttpLabel("tableBucketARN")),
          namespace: S.String.pipe(T.HttpLabel("namespace")),
          name: S.String.pipe(T.HttpLabel("name")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/tables/{tableBucketARN}/{namespace}/{name}/maintenance-job-status",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetTableMaintenanceJobStatusRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          status: S.String,
          lastRunTimestamp: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          failureMessage: S.optional(S.String),
        }),
      ).annotate({ identifier: "TableMaintenanceJobStatusValue" });
    case 2:
      return S.Record(S.String, /*@__PURE__*/ __S(577, __c36, 1).pipe(S.optional));
    case 3:
      return S.suspend(() => S.Struct({ tableARN: S.String, status: __S(578, __c36, 2) })).annotate(
        { identifier: "GetTableMaintenanceJobStatusResponse" },
      );
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          tableBucketARN: S.String.pipe(T.HttpLabel("tableBucketARN")),
          namespace: S.String.pipe(T.HttpLabel("namespace")),
          name: S.String.pipe(T.HttpLabel("name")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/tables/{tableBucketARN}/{namespace}/{name}/metadata-location",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetTableMetadataLocationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          versionToken: S.String,
          metadataLocation: S.optional(S.String),
          warehouseLocation: S.String,
        }),
      ).annotate({ identifier: "GetTableMetadataLocationResponse" });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          migrationId: S.optional(S.String).pipe(T.HttpQuery("migrationId")),
          tableARN: S.optional(S.String).pipe(T.HttpQuery("tableARN")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/get-table-migration" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetTableMigrationRequest" });
    case 1:
      return S.suspend(() => S.Struct({ code: S.String, detail: S.optional(S.String) })).annotate({
        identifier: "MigrationFailureReason",
      });
    case 2:
      return S.suspend(() =>
        S.Struct({
          objectsScanned: S.optional(S.Number),
          objectsPlanned: S.optional(S.Number),
          partitionCount: S.optional(S.Number),
        }),
      ).annotate({ identifier: "PlanningStats" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          objectsMigrated: S.optional(S.Number),
          objectsFailedMigration: S.optional(S.Number),
          objectsPendingMigration: S.optional(S.Number),
        }),
      ).annotate({ identifier: "MigrationStats" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          maintenanceSettings: __S(626, __c39, 2),
          migrationPolicies: __S(627, __c39, 3),
        }),
      ).annotate({ identifier: "DataMigrationOverview" });
    case 5:
      return S.Record(S.String, /*@__PURE__*/ S.Number.pipe(S.optional));
    case 6:
      return S.suspend(() =>
        S.Struct({
          prefix: S.optional(S.String),
          key: S.optional(S.String),
          checksumCRC64NVME: S.optional(S.String),
          invalidFindings: S.optional(__S(613, __c38, 5)),
        }),
      ).annotate({ identifier: "ReportOverview" });
    case 7:
      return S.suspend(() =>
        S.Struct({
          bucket: S.String,
          tableCompatibilityReport: __S(614, __c38, 6),
          objectCompatibilityReport: __S(614, __c38, 6),
          objectMigrationReport: __S(614, __c38, 6),
        }),
      ).annotate({ identifier: "MigrationOutputOverview" });
    case 8:
      return S.suspend(() =>
        S.Struct({
          migrationId: S.String,
          tableBucketARN: S.String,
          namespace: S.String,
          tableARN: S.optional(S.String),
          name: S.String,
          type: S.String,
          state: S.String,
          roleARN: S.String,
          reviewMigrationPlan: S.Boolean,
          hasValidPlan: S.optional(S.Boolean),
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          stateUpdatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          failureReason: S.optional(__S(609, __c38, 1)),
          planningStats: S.optional(__S(610, __c38, 2)),
          migrationStats: S.optional(__S(611, __c38, 3)),
          sourceType: S.String,
          source: __S(625, __c39, 1),
          dataMigration: __S(612, __c38, 4),
          migrationOutput: __S(615, __c38, 7),
        }),
      ).annotate({ identifier: "GetTableMigrationResponse" });
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ catalogId: S.String, databaseName: S.String, tableName: S.String }),
      ).annotate({ identifier: "GlueTableSource" });
    case 1:
      return S.Union([/*@__PURE__*/ S.Struct({ glueTable: __S(624, __c39, 0) })]);
    case 2:
      return S.suspend(() =>
        S.Struct({
          icebergCompaction: S.optional(__S(544, __c34, 0)),
          icebergSnapshotManagement: S.optional(__S(545, __c34, 1)),
        }),
      ).annotate({ identifier: "MaintenanceSettings" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          unmatchedSourceFieldsPolicy: S.optional(S.String),
          incompatibleValuesPolicy: S.optional(S.String),
        }),
      ).annotate({ identifier: "MigrationPolicies" });
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          tableBucketARN: S.String.pipe(T.HttpLabel("tableBucketARN")),
          namespace: S.String.pipe(T.HttpLabel("namespace")),
          name: S.String.pipe(T.HttpLabel("name")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/tables/{tableBucketARN}/{namespace}/{name}/policy" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetTablePolicyRequest" });
  }
}
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ tableArn: S.String.pipe(T.HttpQuery("tableArn")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/table-record-expiration" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetTableRecordExpirationConfigurationRequest" });
    case 1:
      return S.suspend(() => S.Struct({ configuration: __S(673, __c42, 1) })).annotate({
        identifier: "GetTableRecordExpirationConfigurationResponse",
      });
  }
}
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ days: S.optional(S.Number) })).annotate({
        identifier: "TableRecordExpirationSettings",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({ status: S.optional(S.String), settings: S.optional(__S(672, __c42, 0)) }),
      ).annotate({ identifier: "TableRecordExpirationConfigurationValue" });
  }
}
function __c43(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ tableArn: S.String.pipe(T.HttpQuery("tableArn")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/table-record-expiration-job-status" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetTableRecordExpirationJobStatusRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          deletedDataFiles: S.optional(S.Number),
          deletedRecords: S.optional(S.Number),
          removedFilesSize: S.optional(S.Number),
        }),
      ).annotate({ identifier: "TableRecordExpirationJobMetrics" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          status: S.String,
          lastRunTimestamp: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          failureMessage: S.optional(S.String),
          metrics: S.optional(__S(689, __c43, 1)),
        }),
      ).annotate({ identifier: "GetTableRecordExpirationJobStatusResponse" });
  }
}
function __c44(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ tableArn: S.String.pipe(T.HttpQuery("tableArn")) }).pipe(
          T.all(T.Http({ method: "GET", uri: "/table-replication" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetTableReplicationRequest" });
  }
}
function __c45(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ tableArn: S.String.pipe(T.HttpQuery("tableArn")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/replication-status" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetTableReplicationStatusRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          metadataLocation: S.String,
          timestamp: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }),
      ).annotate({ identifier: "LastSuccessfulReplicatedUpdate" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          replicationStatus: S.String,
          destinationTableBucketArn: S.String,
          destinationTableArn: S.optional(S.String),
          lastSuccessfulReplicatedUpdate: S.optional(__S(721, __c45, 1)),
          failureMessage: S.optional(S.String),
        }),
      ).annotate({ identifier: "ReplicationDestinationStatusModel" });
    case 3:
      return S.Array(__S(722, __c45, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({ sourceTableArn: S.String, destinations: __S(723, __c45, 3) }),
      ).annotate({ identifier: "GetTableReplicationStatusResponse" });
  }
}
function __c46(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          tableBucketARN: S.String.pipe(T.HttpLabel("tableBucketARN")),
          namespace: S.String.pipe(T.HttpLabel("namespace")),
          name: S.String.pipe(T.HttpLabel("name")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/tables/{tableBucketARN}/{namespace}/{name}/storage-class",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetTableStorageClassRequest" });
  }
}
function __c47(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          tableBucketARN: S.String.pipe(T.HttpLabel("tableBucketARN")),
          prefix: S.optional(S.String).pipe(T.HttpQuery("prefix")),
          continuationToken: S.optional(S.String).pipe(T.HttpQuery("continuationToken")),
          maxNamespaces: S.optional(S.Number).pipe(T.HttpQuery("maxNamespaces")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/namespaces/{tableBucketARN}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListNamespacesRequest" });
    case 1:
      return S.Array(__S(256, __c16, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ namespaces: __S(753, __c47, 1), continuationToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListNamespacesResponse" });
  }
}
function __c48(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          prefix: S.optional(S.String).pipe(T.HttpQuery("prefix")),
          continuationToken: S.optional(S.String).pipe(T.HttpQuery("continuationToken")),
          maxBuckets: S.optional(S.Number).pipe(T.HttpQuery("maxBuckets")),
          type: S.optional(S.String).pipe(T.HttpQuery("type")),
        }).pipe(T.all(T.Http({ method: "GET", uri: "/buckets" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListTableBucketsRequest" });
    case 1:
      return S.Array(__S(304, __c19, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ tableBuckets: __S(769, __c48, 1), continuationToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListTableBucketsResponse" });
  }
}
function __c49(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          tableBucketARN: S.optional(S.String).pipe(T.HttpQuery("tableBucketARN")),
          namespace: S.optional(S.String).pipe(T.HttpQuery("namespace")),
          name: S.optional(S.String).pipe(T.HttpQuery("name")),
          tableARN: S.optional(S.String).pipe(T.HttpQuery("tableARN")),
          state: S.optional(S.String).pipe(T.HttpQuery("state")),
          hasValidPlan: S.optional(S.Boolean).pipe(T.HttpQuery("hasValidPlan")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/list-table-migrations" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListTableMigrationsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          migrationId: S.String,
          tableBucketARN: S.String,
          namespace: S.String,
          tableARN: S.optional(S.String),
          name: S.String,
          type: S.String,
          state: S.String,
          hasValidPlan: S.optional(S.Boolean),
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          stateUpdatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }),
      ).annotate({ identifier: "MigrationSummary" });
    case 2:
      return S.Array(__S(785, __c49, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ migrations: __S(786, __c49, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListTableMigrationsResponse" });
  }
}
function __c50(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          tableBucketARN: S.String.pipe(T.HttpLabel("tableBucketARN")),
          namespace: S.optional(S.String).pipe(T.HttpQuery("namespace")),
          prefix: S.optional(S.String).pipe(T.HttpQuery("prefix")),
          continuationToken: S.optional(S.String).pipe(T.HttpQuery("continuationToken")),
          maxTables: S.optional(S.Number).pipe(T.HttpQuery("maxTables")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/tables/{tableBucketARN}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListTablesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          namespace: __S(1184, __c74, 0),
          name: S.String,
          type: S.String,
          tableARN: S.String,
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          modifiedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          managedByService: S.optional(S.String),
          namespaceId: S.optional(S.String),
          tableBucketId: S.optional(S.String),
        }),
      ).annotate({ identifier: "TableSummary" });
    case 2:
      return S.Array(__S(801, __c50, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ tables: __S(802, __c50, 2), continuationToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListTablesResponse" });
  }
}
function __c51(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceArn: S.String.pipe(T.HttpLabel("resourceArn")) }).pipe(
          T.all(T.Http({ method: "GET", uri: "/tag/{resourceArn}" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListTagsForResourceRequest" });
    case 1:
      return S.suspend(() => S.Struct({ tags: S.optional(__S(48, __c3, 0)) })).annotate({
        identifier: "ListTagsForResourceResponse",
      });
  }
}
function __c52(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          tableBucketARN: S.String.pipe(T.HttpLabel("tableBucketARN")),
          encryptionConfiguration: __S(16, __c1, 0),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/buckets/{tableBucketARN}/encryption" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutTableBucketEncryptionRequest" });
  }
}
function __c53(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          tableBucketARN: S.String.pipe(T.HttpLabel("tableBucketARN")),
          type: S.String.pipe(T.HttpLabel("type")),
          value: __S(370, __c23, 2),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/buckets/{tableBucketARN}/maintenance/{type}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutTableBucketMaintenanceConfigurationRequest" });
  }
}
function __c54(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ tableBucketARN: S.String.pipe(T.HttpLabel("tableBucketARN")) }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/buckets/{tableBucketARN}/metrics" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutTableBucketMetricsConfigurationRequest" });
  }
}
function __c55(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          tableBucketARN: S.String.pipe(T.HttpLabel("tableBucketARN")),
          resourcePolicy: S.String,
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/buckets/{tableBucketARN}/policy" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutTableBucketPolicyRequest" });
  }
}
function __c56(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          tableBucketARN: S.String.pipe(T.HttpQuery("tableBucketARN")),
          versionToken: S.optional(S.String).pipe(T.HttpQuery("versionToken")),
          configuration: __S(468, __c29, 4),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/table-bucket-replication" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutTableBucketReplicationRequest" });
  }
}
function __c57(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ versionToken: S.String, status: S.String })).annotate({
        identifier: "PutTableBucketReplicationResponse",
      });
  }
}
function __c58(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          tableBucketARN: S.String.pipe(T.HttpLabel("tableBucketARN")),
          storageClassConfiguration: __S(32, __c2, 0),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/buckets/{tableBucketARN}/storage-class" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutTableBucketStorageClassRequest" });
  }
}
function __c59(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          tableBucketARN: S.String.pipe(T.HttpLabel("tableBucketARN")),
          namespace: S.String.pipe(T.HttpLabel("namespace")),
          name: S.String.pipe(T.HttpLabel("name")),
          type: S.String.pipe(T.HttpLabel("type")),
          value: __S(561, __c35, 1),
        }).pipe(
          T.all(
            T.Http({
              method: "PUT",
              uri: "/tables/{tableBucketARN}/{namespace}/{name}/maintenance/{type}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutTableMaintenanceConfigurationRequest" });
  }
}
function __c60(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          tableBucketARN: S.String.pipe(T.HttpLabel("tableBucketARN")),
          namespace: S.String.pipe(T.HttpLabel("namespace")),
          name: S.String.pipe(T.HttpLabel("name")),
          resourcePolicy: S.String,
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/tables/{tableBucketARN}/{namespace}/{name}/policy" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutTablePolicyRequest" });
  }
}
function __c61(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          tableArn: S.String.pipe(T.HttpQuery("tableArn")),
          value: __S(673, __c42, 1),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/table-record-expiration" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutTableRecordExpirationConfigurationRequest" });
  }
}
function __c62(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          tableArn: S.String.pipe(T.HttpQuery("tableArn")),
          versionToken: S.optional(S.String).pipe(T.HttpQuery("versionToken")),
          configuration: __S(468, __c29, 4),
        }).pipe(
          T.all(T.Http({ method: "PUT", uri: "/table-replication" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "PutTableReplicationRequest" });
  }
}
function __c63(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          tableBucketARN: S.String.pipe(T.HttpLabel("tableBucketARN")),
          namespace: S.String.pipe(T.HttpLabel("namespace")),
          name: S.String.pipe(T.HttpLabel("name")),
          newNamespaceName: S.optional(S.String),
          newName: S.optional(S.String),
          versionToken: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/tables/{tableBucketARN}/{namespace}/{name}/rename" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "RenameTableRequest" });
  }
}
function __c64(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          writeFormat: S.optional(S.String),
          icebergFormatVersion: S.optional(S.Number),
          compressionCodec: S.optional(S.String),
          dictionaryEncoding: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "MigrationTableProperties" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          tableBucketARN: S.String,
          namespace: S.String,
          name: S.String,
          encryptionConfiguration: S.optional(__S(16, __c1, 0)),
          storageClassConfiguration: S.optional(__S(32, __c2, 0)),
          tags: S.optional(__S(48, __c3, 0)),
          properties: S.optional(__S(1024, __c64, 0)),
          schema: S.optional(__S(67, __c4, 3)),
          icebergSortOrder: S.optional(__S(70, __c4, 6)),
        }),
      ).annotate({ identifier: "DestinationTable" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          maintenanceSettings: S.optional(__S(626, __c39, 2)),
          migrationPolicies: S.optional(__S(627, __c39, 3)),
        }),
      ).annotate({ identifier: "DataMigrationSettings" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          roleARN: S.String,
          destinationTable: __S(1025, __c64, 1),
          sourceType: S.String,
          source: __S(625, __c39, 1),
          dataMigration: S.optional(__S(1026, __c64, 2)),
          reviewMigrationPlan: S.optional(S.Boolean),
          migrationOutput: __S(1041, __c65, 1),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/start-table-migration" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartTableMigrationRequest" });
  }
}
function __c65(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          tableCompatibilityReport: S.optional(S.String),
          objectCompatibilityReport: S.optional(S.String),
          objectMigrationReport: S.optional(S.String),
        }),
      ).annotate({ identifier: "MigrationReportPrefixes" });
    case 1:
      return S.suspend(() =>
        S.Struct({ bucket: S.String, prefixes: S.optional(__S(1040, __c65, 0)) }),
      ).annotate({ identifier: "MigrationOutputConfiguration" });
    case 2:
      return S.suspend(() => S.Struct({ migrationId: S.String, state: S.String })).annotate({
        identifier: "StartTableMigrationResponse",
      });
  }
}
function __c66(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          roleARN: S.String,
          tableARN: S.String,
          reviewMigrationPlan: S.optional(S.Boolean),
          migrationOutput: __S(1041, __c65, 1),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/sync-table-migration" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "SyncTableMigrationRequest" });
  }
}
function __c67(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
          tags: __S(48, __c3, 0),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/tag/{resourceArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "TagResourceRequest" });
  }
}
function __c68(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
          tagKeys: __S(1184, __c74, 0).pipe(T.HttpQuery("tagKeys")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/tag/{resourceArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UntagResourceRequest" });
  }
}
function __c69(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          tableBucketARN: S.String.pipe(T.HttpLabel("tableBucketARN")),
          namespace: S.String.pipe(T.HttpLabel("namespace")),
          name: S.String.pipe(T.HttpLabel("name")),
          versionToken: S.String,
          metadataLocation: S.String,
        }).pipe(
          T.all(
            T.Http({
              method: "PUT",
              uri: "/tables/{tableBucketARN}/{namespace}/{name}/metadata-location",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateTableMetadataLocationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          tableARN: S.String,
          namespace: __S(1184, __c74, 0),
          versionToken: S.String,
          metadataLocation: S.String,
        }),
      ).annotate({ identifier: "UpdateTableMetadataLocationResponse" });
  }
}
function __c70(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          tableARN: S.optional(S.String).pipe(T.HttpQuery("tableARN")),
          migrationId: S.optional(S.String).pipe(T.HttpQuery("migrationId")),
          requestedState: S.String,
          updateDescription: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/update-table-migration" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateTableMigrationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ migrationId: S.String, state: S.String, tableARN: S.optional(S.String) }),
      ).annotate({ identifier: "UpdateTableMigrationResponse" });
  }
}
function __c71(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ tableARN: S.String.pipe(T.HttpQuery("tableARN")) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/complete-table-migration" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CompleteTableMigrationRequest" });
  }
}
function __c72(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({
        identifier: "CompleteTableMigrationResponse",
      });
  }
}
function __c73(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          tableBucketARN: S.String.pipe(T.HttpLabel("tableBucketARN")),
          namespace: __S(1184, __c74, 0),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/namespaces/{tableBucketARN}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateNamespaceRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ tableBucketARN: S.String, namespace: __S(1184, __c74, 0) }),
      ).annotate({ identifier: "CreateNamespaceResponse" });
  }
}
function __c74(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
