import * as API from "@distilled.cloud/core/api";
import * as S from "@distilled.cloud/core/schema-lite";
import * as __L from "@distilled.cloud/core/schema-lite";
import type * as HttpClient from "effect/http/HttpClient";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import { AwsProtocol } from "../protocol.ts";
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
  id?: number;
  name: string;
  type: string;
  required?: boolean;
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
  doc?: string;
}
export type SchemaV2FieldList = SchemaV2Field[];
export type IntegerList = number[];
export interface IcebergSchemaV2 {
  type: SchemaV2FieldType;
  fields: SchemaV2Field[];
  schemaId?: number;
  identifierFieldIds?: number[];
}
export interface IcebergPartitionField {
  sourceId: number;
  transform: string;
  name: string;
  fieldId?: number;
}
export type IcebergPartitionFieldList = IcebergPartitionField[];
export interface IcebergPartitionSpec {
  fields: IcebergPartitionField[];
  specId?: number;
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
  schema?: IcebergSchema;
  schemaV2?: IcebergSchemaV2;
  partitionSpec?: IcebergPartitionSpec;
  writeOrder?: IcebergSortOrder;
  properties?: { [key: string]: string | undefined };
}
export type TableMetadata = { iceberg: IcebergMetadata };
export type SSEAlgorithm = "AES256" | "aws:kms" | (string & {});
export interface EncryptionConfiguration {
  sseAlgorithm: SSEAlgorithm;
  kmsKeyArn?: string;
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
  metadata?: TableMetadata;
  encryptionConfiguration?: EncryptionConfiguration;
  storageClassConfiguration?: StorageClassConfiguration;
  tags?: { [key: string]: string | undefined };
}
export type TableARN = string;
export type VersionToken = string;
export interface CreateTableResponse {
  tableARN: string;
  versionToken: string;
}
export type TableBucketName = string;
export interface CreateTableBucketRequest {
  name: string;
  encryptionConfiguration?: EncryptionConfiguration;
  storageClassConfiguration?: StorageClassConfiguration;
  tags?: { [key: string]: string | undefined };
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
  versionToken?: string;
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
  versionToken?: string;
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
  namespaceId?: string;
  tableBucketId?: string;
}
export interface GetTableRequest {
  tableBucketARN?: string;
  namespace?: string;
  name?: string;
  tableArn?: string;
}
export type TableType = "customer" | "aws" | (string & {});
export type MetadataLocation = string;
export type WarehouseLocation = string;
export interface ReplicationInformation {
  sourceTableARN: string;
}
export interface ManagedTableInformation {
  replicationInformation?: ReplicationInformation;
}
export interface GetTableResponse {
  name: string;
  type: TableType;
  tableARN: string;
  namespace: string[];
  namespaceId?: string;
  versionToken: string;
  metadataLocation?: string;
  warehouseLocation: string;
  createdAt: Date;
  createdBy: string;
  managedByService?: string;
  modifiedAt: Date;
  modifiedBy?: string;
  ownerAccountId: string;
  format: OpenTableFormat;
  tableBucketId?: string;
  managedTableInformation?: ManagedTableInformation;
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
  tableBucketId?: string;
  type?: TableBucketType;
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
  unreferencedDays?: number;
  nonCurrentDays?: number;
}
export type TableBucketMaintenanceSettings = {
  icebergUnreferencedFileRemoval: IcebergUnreferencedFileRemovalSettings;
};
export interface TableBucketMaintenanceConfigurationValue {
  status?: MaintenanceStatus;
  settings?: TableBucketMaintenanceSettings;
}
export type TableBucketMaintenanceConfiguration = {
  [key in TableBucketMaintenanceType]?: TableBucketMaintenanceConfigurationValue;
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
  id?: string;
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
  targetFileSizeMB?: number;
  strategy?: IcebergCompactionStrategy;
}
export interface IcebergSnapshotManagementSettings {
  minSnapshotsToKeep?: number;
  maxSnapshotAgeHours?: number;
}
export type TableMaintenanceSettings =
  | { icebergCompaction: IcebergCompactionSettings; icebergSnapshotManagement?: never }
  | { icebergCompaction?: never; icebergSnapshotManagement: IcebergSnapshotManagementSettings };
export interface TableMaintenanceConfigurationValue {
  status?: MaintenanceStatus;
  settings?: TableMaintenanceSettings;
}
export type TableMaintenanceConfiguration = {
  [key in TableMaintenanceType]?: TableMaintenanceConfigurationValue;
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
  lastRunTimestamp?: Date;
  failureMessage?: string;
}
export type TableMaintenanceJobStatus = {
  [key in TableMaintenanceJobType]?: TableMaintenanceJobStatusValue;
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
  metadataLocation?: string;
  warehouseLocation: string;
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
  days?: number;
}
export interface TableRecordExpirationConfigurationValue {
  status?: TableRecordExpirationStatus;
  settings?: TableRecordExpirationSettings;
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
  deletedDataFiles?: number;
  deletedRecords?: number;
  removedFilesSize?: number;
}
export interface GetTableRecordExpirationJobStatusResponse {
  status: TableRecordExpirationJobStatus;
  lastRunTimestamp?: Date;
  failureMessage?: string;
  metrics?: TableRecordExpirationJobMetrics;
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
  destinationTableArn?: string;
  lastSuccessfulReplicatedUpdate?: LastSuccessfulReplicatedUpdate;
  failureMessage?: string;
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
  prefix?: string;
  continuationToken?: string;
  maxNamespaces?: number;
}
export interface NamespaceSummary {
  namespace: string[];
  createdAt: Date;
  createdBy: string;
  ownerAccountId: string;
  namespaceId?: string;
  tableBucketId?: string;
}
export type NamespaceSummaryList = NamespaceSummary[];
export interface ListNamespacesResponse {
  namespaces: NamespaceSummary[];
  continuationToken?: string;
}
export type ListTableBucketsLimit = number;
export interface ListTableBucketsRequest {
  prefix?: string;
  continuationToken?: string;
  maxBuckets?: number;
  type?: TableBucketType;
}
export interface TableBucketSummary {
  arn: string;
  name: string;
  ownerAccountId: string;
  createdAt: Date;
  tableBucketId?: string;
  type?: TableBucketType;
}
export type TableBucketSummaryList = TableBucketSummary[];
export interface ListTableBucketsResponse {
  tableBuckets: TableBucketSummary[];
  continuationToken?: string;
}
export type ListTablesLimit = number;
export interface ListTablesRequest {
  tableBucketARN: string;
  namespace?: string;
  prefix?: string;
  continuationToken?: string;
  maxTables?: number;
}
export interface TableSummary {
  namespace: string[];
  name: string;
  type: TableType;
  tableARN: string;
  createdAt: Date;
  modifiedAt: Date;
  managedByService?: string;
  namespaceId?: string;
  tableBucketId?: string;
}
export type TableSummaryList = TableSummary[];
export interface ListTablesResponse {
  tables: TableSummary[];
  continuationToken?: string;
}
export type ResourceArn = string;
export interface ListTagsForResourceRequest {
  resourceArn: string;
}
export interface ListTagsForResourceResponse {
  tags?: { [key: string]: string | undefined };
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
  versionToken?: string;
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
  versionToken?: string;
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
  newNamespaceName?: string;
  newName?: string;
  versionToken?: string;
}
export interface RenameTableResponse {}
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
export type ErrorMessage = string;
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
  CreateNamespaceRequest,
  CreateNamespaceResponse,
  CreateNamespaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1888, __c59, 0) as any as S.Schema<CreateNamespaceRequest>,
  output: __S(1889, __c59, 1) as any as S.Schema<CreateNamespaceResponse>,
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
  CreateTableRequest,
  CreateTableResponse,
  CreateTableError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1967, __c61, 15) as any as S.Schema<CreateTableRequest>,
  output: __S(1968, __c61, 16) as any as S.Schema<CreateTableResponse>,
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
  CreateTableBucketRequest,
  CreateTableBucketResponse,
  CreateTableBucketError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<CreateTableBucketRequest>,
  output: __S(1, __c0, 1) as any as S.Schema<CreateTableBucketResponse>,
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
  DeleteNamespaceRequest,
  DeleteNamespaceResponse,
  DeleteNamespaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(32, __c1, 0) as any as S.Schema<DeleteNamespaceRequest>,
  output: __S(64, __c2, 0) as any as S.Schema<DeleteNamespaceResponse>,
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
  DeleteTableRequest,
  DeleteTableResponse,
  DeleteTableError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(96, __c3, 0) as any as S.Schema<DeleteTableRequest>,
  output: __S(64, __c2, 0) as any as S.Schema<DeleteTableResponse>,
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
  DeleteTableBucketRequest,
  DeleteTableBucketResponse,
  DeleteTableBucketError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(128, __c4, 0) as any as S.Schema<DeleteTableBucketRequest>,
  output: __S(64, __c2, 0) as any as S.Schema<DeleteTableBucketResponse>,
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
  DeleteTableBucketEncryptionRequest,
  DeleteTableBucketEncryptionResponse,
  DeleteTableBucketEncryptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(160, __c5, 0) as any as S.Schema<DeleteTableBucketEncryptionRequest>,
  output: __S(64, __c2, 0) as any as S.Schema<DeleteTableBucketEncryptionResponse>,
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
  DeleteTableBucketMetricsConfigurationRequest,
  DeleteTableBucketMetricsConfigurationResponse,
  DeleteTableBucketMetricsConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(192, __c6, 0) as any as S.Schema<DeleteTableBucketMetricsConfigurationRequest>,
  output: __S(64, __c2, 0) as any as S.Schema<DeleteTableBucketMetricsConfigurationResponse>,
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
  DeleteTableBucketPolicyRequest,
  DeleteTableBucketPolicyResponse,
  DeleteTableBucketPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(224, __c7, 0) as any as S.Schema<DeleteTableBucketPolicyRequest>,
  output: __S(64, __c2, 0) as any as S.Schema<DeleteTableBucketPolicyResponse>,
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
  DeleteTableBucketReplicationRequest,
  DeleteTableBucketReplicationResponse,
  DeleteTableBucketReplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(256, __c8, 0) as any as S.Schema<DeleteTableBucketReplicationRequest>,
  output: __S(64, __c2, 0) as any as S.Schema<DeleteTableBucketReplicationResponse>,
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
  DeleteTablePolicyRequest,
  DeleteTablePolicyResponse,
  DeleteTablePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(288, __c9, 0) as any as S.Schema<DeleteTablePolicyRequest>,
  output: __S(64, __c2, 0) as any as S.Schema<DeleteTablePolicyResponse>,
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
  DeleteTableReplicationRequest,
  DeleteTableReplicationResponse,
  DeleteTableReplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(320, __c10, 0) as any as S.Schema<DeleteTableReplicationRequest>,
  output: __S(64, __c2, 0) as any as S.Schema<DeleteTableReplicationResponse>,
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
  GetNamespaceRequest,
  GetNamespaceResponse,
  GetNamespaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(352, __c11, 0) as any as S.Schema<GetNamespaceRequest>,
  output: __S(384, __c12, 0) as any as S.Schema<GetNamespaceResponse>,
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
  GetTableRequest,
  GetTableResponse,
  GetTableError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(416, __c13, 0) as any as S.Schema<GetTableRequest>,
  output: __S(419, __c13, 3) as any as S.Schema<GetTableResponse>,
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
  GetTableBucketRequest,
  GetTableBucketResponse,
  GetTableBucketError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(448, __c14, 0) as any as S.Schema<GetTableBucketRequest>,
  output: __S(480, __c15, 0) as any as S.Schema<GetTableBucketResponse>,
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
  GetTableBucketEncryptionRequest,
  GetTableBucketEncryptionResponse,
  GetTableBucketEncryptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(512, __c16, 0) as any as S.Schema<GetTableBucketEncryptionRequest>,
  output: __S(544, __c17, 0) as any as S.Schema<GetTableBucketEncryptionResponse>,
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
  GetTableBucketMaintenanceConfigurationRequest,
  GetTableBucketMaintenanceConfigurationResponse,
  GetTableBucketMaintenanceConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(576, __c18, 0) as any as S.Schema<GetTableBucketMaintenanceConfigurationRequest>,
  output: __S(578, __c18, 2) as any as S.Schema<GetTableBucketMaintenanceConfigurationResponse>,
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
  GetTableBucketMetricsConfigurationRequest,
  GetTableBucketMetricsConfigurationResponse,
  GetTableBucketMetricsConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(640, __c20, 0) as any as S.Schema<GetTableBucketMetricsConfigurationRequest>,
  output: __S(641, __c20, 1) as any as S.Schema<GetTableBucketMetricsConfigurationResponse>,
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
  GetTableBucketPolicyRequest,
  GetTableBucketPolicyResponse,
  GetTableBucketPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(672, __c21, 0) as any as S.Schema<GetTableBucketPolicyRequest>,
  output: __S(704, __c22, 0) as any as S.Schema<GetTableBucketPolicyResponse>,
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
  GetTableBucketReplicationRequest,
  GetTableBucketReplicationResponse,
  GetTableBucketReplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(736, __c23, 0) as any as S.Schema<GetTableBucketReplicationRequest>,
  output: __S(768, __c24, 0) as any as S.Schema<GetTableBucketReplicationResponse>,
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
  GetTableBucketStorageClassRequest,
  GetTableBucketStorageClassResponse,
  GetTableBucketStorageClassError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(832, __c26, 0) as any as S.Schema<GetTableBucketStorageClassRequest>,
  output: __S(864, __c27, 0) as any as S.Schema<GetTableBucketStorageClassResponse>,
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
  GetTableEncryptionRequest,
  GetTableEncryptionResponse,
  GetTableEncryptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(896, __c28, 0) as any as S.Schema<GetTableEncryptionRequest>,
  output: __S(544, __c17, 0) as any as S.Schema<GetTableEncryptionResponse>,
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
  GetTableMaintenanceConfigurationRequest,
  GetTableMaintenanceConfigurationResponse,
  GetTableMaintenanceConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(928, __c29, 0) as any as S.Schema<GetTableMaintenanceConfigurationRequest>,
  output: __S(930, __c29, 2) as any as S.Schema<GetTableMaintenanceConfigurationResponse>,
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
  GetTableMaintenanceJobStatusRequest,
  GetTableMaintenanceJobStatusResponse,
  GetTableMaintenanceJobStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(992, __c31, 0) as any as S.Schema<GetTableMaintenanceJobStatusRequest>,
  output: __S(995, __c31, 3) as any as S.Schema<GetTableMaintenanceJobStatusResponse>,
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
  GetTableMetadataLocationRequest,
  GetTableMetadataLocationResponse,
  GetTableMetadataLocationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1024, __c32, 0) as any as S.Schema<GetTableMetadataLocationRequest>,
  output: __S(1025, __c32, 1) as any as S.Schema<GetTableMetadataLocationResponse>,
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
  GetTablePolicyRequest,
  GetTablePolicyResponse,
  GetTablePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1056, __c33, 0) as any as S.Schema<GetTablePolicyRequest>,
  output: __S(704, __c22, 0) as any as S.Schema<GetTablePolicyResponse>,
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
  GetTableRecordExpirationConfigurationRequest,
  GetTableRecordExpirationConfigurationResponse,
  GetTableRecordExpirationConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1088, __c34, 0) as any as S.Schema<GetTableRecordExpirationConfigurationRequest>,
  output: __S(1089, __c34, 1) as any as S.Schema<GetTableRecordExpirationConfigurationResponse>,
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
  GetTableRecordExpirationJobStatusRequest,
  GetTableRecordExpirationJobStatusResponse,
  GetTableRecordExpirationJobStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1152, __c36, 0) as any as S.Schema<GetTableRecordExpirationJobStatusRequest>,
  output: __S(1154, __c36, 2) as any as S.Schema<GetTableRecordExpirationJobStatusResponse>,
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
  GetTableReplicationRequest,
  GetTableReplicationResponse,
  GetTableReplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1184, __c37, 0) as any as S.Schema<GetTableReplicationRequest>,
  output: __S(768, __c24, 0) as any as S.Schema<GetTableReplicationResponse>,
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
  GetTableReplicationStatusRequest,
  GetTableReplicationStatusResponse,
  GetTableReplicationStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1216, __c38, 0) as any as S.Schema<GetTableReplicationStatusRequest>,
  output: __S(1220, __c38, 4) as any as S.Schema<GetTableReplicationStatusResponse>,
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
  GetTableStorageClassRequest,
  GetTableStorageClassResponse,
  GetTableStorageClassError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1248, __c39, 0) as any as S.Schema<GetTableStorageClassRequest>,
  output: __S(864, __c27, 0) as any as S.Schema<GetTableStorageClassResponse>,
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
  ListNamespacesRequest,
  ListNamespacesResponse,
  ListNamespacesError,
  Credentials | HttpClient.HttpClient,
  NamespaceSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1280, __c40, 0) as any as S.Schema<ListNamespacesRequest>,
  output: __S(1282, __c40, 2) as any as S.Schema<ListNamespacesResponse>,
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
  ListTableBucketsRequest,
  ListTableBucketsResponse,
  ListTableBucketsError,
  Credentials | HttpClient.HttpClient,
  TableBucketSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1312, __c41, 0) as any as S.Schema<ListTableBucketsRequest>,
  output: __S(1314, __c41, 2) as any as S.Schema<ListTableBucketsResponse>,
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
  ListTablesRequest,
  ListTablesResponse,
  ListTablesError,
  Credentials | HttpClient.HttpClient,
  TableSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1344, __c42, 0) as any as S.Schema<ListTablesRequest>,
  output: __S(1347, __c42, 3) as any as S.Schema<ListTablesResponse>,
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
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1376, __c43, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(1377, __c43, 1) as any as S.Schema<ListTagsForResourceResponse>,
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
  PutTableBucketEncryptionRequest,
  PutTableBucketEncryptionResponse,
  PutTableBucketEncryptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1408, __c44, 0) as any as S.Schema<PutTableBucketEncryptionRequest>,
  output: __S(64, __c2, 0) as any as S.Schema<PutTableBucketEncryptionResponse>,
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
  PutTableBucketMaintenanceConfigurationRequest,
  PutTableBucketMaintenanceConfigurationResponse,
  PutTableBucketMaintenanceConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1440, __c45, 0) as any as S.Schema<PutTableBucketMaintenanceConfigurationRequest>,
  output: __S(64, __c2, 0) as any as S.Schema<PutTableBucketMaintenanceConfigurationResponse>,
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
  PutTableBucketMetricsConfigurationRequest,
  PutTableBucketMetricsConfigurationResponse,
  PutTableBucketMetricsConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1472, __c46, 0) as any as S.Schema<PutTableBucketMetricsConfigurationRequest>,
  output: __S(64, __c2, 0) as any as S.Schema<PutTableBucketMetricsConfigurationResponse>,
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
  PutTableBucketPolicyRequest,
  PutTableBucketPolicyResponse,
  PutTableBucketPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1504, __c47, 0) as any as S.Schema<PutTableBucketPolicyRequest>,
  output: __S(64, __c2, 0) as any as S.Schema<PutTableBucketPolicyResponse>,
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
  PutTableBucketReplicationRequest,
  PutTableBucketReplicationResponse,
  PutTableBucketReplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1536, __c48, 0) as any as S.Schema<PutTableBucketReplicationRequest>,
  output: __S(1568, __c49, 0) as any as S.Schema<PutTableBucketReplicationResponse>,
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
  PutTableBucketStorageClassRequest,
  PutTableBucketStorageClassResponse,
  PutTableBucketStorageClassError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1600, __c50, 0) as any as S.Schema<PutTableBucketStorageClassRequest>,
  output: __S(64, __c2, 0) as any as S.Schema<PutTableBucketStorageClassResponse>,
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
  PutTableMaintenanceConfigurationRequest,
  PutTableMaintenanceConfigurationResponse,
  PutTableMaintenanceConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1632, __c51, 0) as any as S.Schema<PutTableMaintenanceConfigurationRequest>,
  output: __S(64, __c2, 0) as any as S.Schema<PutTableMaintenanceConfigurationResponse>,
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
  PutTablePolicyRequest,
  PutTablePolicyResponse,
  PutTablePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1664, __c52, 0) as any as S.Schema<PutTablePolicyRequest>,
  output: __S(64, __c2, 0) as any as S.Schema<PutTablePolicyResponse>,
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
  PutTableRecordExpirationConfigurationRequest,
  PutTableRecordExpirationConfigurationResponse,
  PutTableRecordExpirationConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1696, __c53, 0) as any as S.Schema<PutTableRecordExpirationConfigurationRequest>,
  output: __S(64, __c2, 0) as any as S.Schema<PutTableRecordExpirationConfigurationResponse>,
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
  PutTableReplicationRequest,
  PutTableReplicationResponse,
  PutTableReplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1728, __c54, 0) as any as S.Schema<PutTableReplicationRequest>,
  output: __S(1568, __c49, 0) as any as S.Schema<PutTableReplicationResponse>,
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
  RenameTableRequest,
  RenameTableResponse,
  RenameTableError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1760, __c55, 0) as any as S.Schema<RenameTableRequest>,
  output: __S(64, __c2, 0) as any as S.Schema<RenameTableResponse>,
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
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1792, __c56, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(64, __c2, 0) as any as S.Schema<TagResourceResponse>,
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
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1824, __c57, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(64, __c2, 0) as any as S.Schema<UntagResourceResponse>,
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
  UpdateTableMetadataLocationRequest,
  UpdateTableMetadataLocationResponse,
  UpdateTableMetadataLocationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1856, __c58, 0) as any as S.Schema<UpdateTableMetadataLocationRequest>,
  output: __S(1857, __c58, 1) as any as S.Schema<UpdateTableMetadataLocationResponse>,
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
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          encryptionConfiguration: S.optional(__S(1984, __c62, 0)),
          storageClassConfiguration: S.optional(__S(2016, __c63, 0)),
          tags: S.optional(__S(2048, __c64, 0)),
        }).pipe(T.all(T.Http({ method: "PUT", uri: "/buckets" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateTableBucketRequest" });
    case 1:
      return S.suspend(() => S.Struct({ arn: S.String })).annotate({
        identifier: "CreateTableBucketResponse",
      });
  }
}
function __c1(j: number): any {
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
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "DeleteNamespaceResponse" });
  }
}
function __c3(j: number): any {
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
function __c4(j: number): any {
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
function __c5(j: number): any {
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
function __c6(j: number): any {
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
function __c7(j: number): any {
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
function __c8(j: number): any {
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
function __c9(j: number): any {
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
function __c10(j: number): any {
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
function __c11(j: number): any {
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
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          namespace: __S(1920, __c60, 0),
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          createdBy: S.String,
          ownerAccountId: S.String,
          namespaceId: S.optional(S.String),
          tableBucketId: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetNamespaceResponse" });
  }
}
function __c13(j: number): any {
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
        S.Struct({ replicationInformation: S.optional(__S(417, __c13, 1)) }),
      ).annotate({ identifier: "ManagedTableInformation" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          type: S.String,
          tableARN: S.String,
          namespace: __S(1920, __c60, 0),
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
          managedTableInformation: S.optional(__S(418, __c13, 2)),
        }),
      ).annotate({ identifier: "GetTableResponse" });
  }
}
function __c14(j: number): any {
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
function __c15(j: number): any {
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
function __c16(j: number): any {
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
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ encryptionConfiguration: __S(1984, __c62, 0) })).annotate({
        identifier: "GetTableBucketEncryptionResponse",
      });
  }
}
function __c18(j: number): any {
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
      return S.Record(S.String, /*@__PURE__*/ __S(610, __c19, 2).pipe(S.optional));
    case 2:
      return S.suspend(() =>
        S.Struct({ tableBucketARN: S.String, configuration: __S(577, __c18, 1) }),
      ).annotate({ identifier: "GetTableBucketMaintenanceConfigurationResponse" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ unreferencedDays: S.optional(S.Number), nonCurrentDays: S.optional(S.Number) }),
      ).annotate({ identifier: "IcebergUnreferencedFileRemovalSettings" });
    case 1:
      return S.Union([
        /*@__PURE__*/ S.Struct({ icebergUnreferencedFileRemoval: __S(608, __c19, 0) }),
      ]);
    case 2:
      return S.suspend(() =>
        S.Struct({ status: S.optional(S.String), settings: S.optional(__S(609, __c19, 1)) }),
      ).annotate({ identifier: "TableBucketMaintenanceConfigurationValue" });
  }
}
function __c20(j: number): any {
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
function __c21(j: number): any {
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
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ resourcePolicy: S.String })).annotate({
        identifier: "GetTableBucketPolicyResponse",
      });
  }
}
function __c23(j: number): any {
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
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ versionToken: S.String, configuration: __S(804, __c25, 4) }),
      ).annotate({ identifier: "GetTableBucketReplicationResponse" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ destinationTableBucketARN: S.String })).annotate({
        identifier: "ReplicationDestination",
      });
    case 1:
      return S.Array(__S(800, __c25, 0));
    case 2:
      return S.suspend(() => S.Struct({ destinations: __S(801, __c25, 1) })).annotate({
        identifier: "TableBucketReplicationRule",
      });
    case 3:
      return S.Array(__S(802, __c25, 2));
    case 4:
      return S.suspend(() => S.Struct({ role: S.String, rules: __S(803, __c25, 3) })).annotate({
        identifier: "TableBucketReplicationConfiguration",
      });
  }
}
function __c26(j: number): any {
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
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ storageClassConfiguration: __S(2016, __c63, 0) })).annotate(
        { identifier: "GetTableBucketStorageClassResponse" },
      );
  }
}
function __c28(j: number): any {
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
function __c29(j: number): any {
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
      return S.Record(S.String, /*@__PURE__*/ __S(963, __c30, 3).pipe(S.optional));
    case 2:
      return S.suspend(() =>
        S.Struct({ tableARN: S.String, configuration: __S(929, __c29, 1) }),
      ).annotate({ identifier: "GetTableMaintenanceConfigurationResponse" });
  }
}
function __c30(j: number): any {
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
    case 2:
      return S.Union([
        /*@__PURE__*/ S.Struct({ icebergCompaction: __S(960, __c30, 0) }),
        /*@__PURE__*/ S.Struct({ icebergSnapshotManagement: __S(961, __c30, 1) }),
      ]);
    case 3:
      return S.suspend(() =>
        S.Struct({ status: S.optional(S.String), settings: S.optional(__S(962, __c30, 2)) }),
      ).annotate({ identifier: "TableMaintenanceConfigurationValue" });
  }
}
function __c31(j: number): any {
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
      return S.Record(S.String, /*@__PURE__*/ __S(993, __c31, 1).pipe(S.optional));
    case 3:
      return S.suspend(() => S.Struct({ tableARN: S.String, status: __S(994, __c31, 2) })).annotate(
        { identifier: "GetTableMaintenanceJobStatusResponse" },
      );
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
function __c34(j: number): any {
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
      return S.suspend(() => S.Struct({ configuration: __S(1121, __c35, 1) })).annotate({
        identifier: "GetTableRecordExpirationConfigurationResponse",
      });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ days: S.optional(S.Number) })).annotate({
        identifier: "TableRecordExpirationSettings",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({ status: S.optional(S.String), settings: S.optional(__S(1120, __c35, 0)) }),
      ).annotate({ identifier: "TableRecordExpirationConfigurationValue" });
  }
}
function __c36(j: number): any {
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
          metrics: S.optional(__S(1153, __c36, 1)),
        }),
      ).annotate({ identifier: "GetTableRecordExpirationJobStatusResponse" });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ tableArn: S.String.pipe(T.HttpQuery("tableArn")) }).pipe(
          T.all(T.Http({ method: "GET", uri: "/table-replication" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetTableReplicationRequest" });
  }
}
function __c38(j: number): any {
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
          lastSuccessfulReplicatedUpdate: S.optional(__S(1217, __c38, 1)),
          failureMessage: S.optional(S.String),
        }),
      ).annotate({ identifier: "ReplicationDestinationStatusModel" });
    case 3:
      return S.Array(__S(1218, __c38, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({ sourceTableArn: S.String, destinations: __S(1219, __c38, 3) }),
      ).annotate({ identifier: "GetTableReplicationStatusResponse" });
  }
}
function __c39(j: number): any {
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
function __c40(j: number): any {
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
      return S.Array(__S(384, __c12, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ namespaces: __S(1281, __c40, 1), continuationToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListNamespacesResponse" });
  }
}
function __c41(j: number): any {
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
      return S.Array(__S(480, __c15, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ tableBuckets: __S(1313, __c41, 1), continuationToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListTableBucketsResponse" });
  }
}
function __c42(j: number): any {
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
          namespace: __S(1920, __c60, 0),
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
      return S.Array(__S(1345, __c42, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ tables: __S(1346, __c42, 2), continuationToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListTablesResponse" });
  }
}
function __c43(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceArn: S.String.pipe(T.HttpLabel("resourceArn")) }).pipe(
          T.all(T.Http({ method: "GET", uri: "/tag/{resourceArn}" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListTagsForResourceRequest" });
    case 1:
      return S.suspend(() => S.Struct({ tags: S.optional(__S(2048, __c64, 0)) })).annotate({
        identifier: "ListTagsForResourceResponse",
      });
  }
}
function __c44(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          tableBucketARN: S.String.pipe(T.HttpLabel("tableBucketARN")),
          encryptionConfiguration: __S(1984, __c62, 0),
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
function __c45(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          tableBucketARN: S.String.pipe(T.HttpLabel("tableBucketARN")),
          type: S.String.pipe(T.HttpLabel("type")),
          value: __S(610, __c19, 2),
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
function __c46(j: number): any {
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
function __c47(j: number): any {
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
function __c48(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          tableBucketARN: S.String.pipe(T.HttpQuery("tableBucketARN")),
          versionToken: S.optional(S.String).pipe(T.HttpQuery("versionToken")),
          configuration: __S(804, __c25, 4),
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
function __c49(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ versionToken: S.String, status: S.String })).annotate({
        identifier: "PutTableBucketReplicationResponse",
      });
  }
}
function __c50(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          tableBucketARN: S.String.pipe(T.HttpLabel("tableBucketARN")),
          storageClassConfiguration: __S(2016, __c63, 0),
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
function __c51(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          tableBucketARN: S.String.pipe(T.HttpLabel("tableBucketARN")),
          namespace: S.String.pipe(T.HttpLabel("namespace")),
          name: S.String.pipe(T.HttpLabel("name")),
          type: S.String.pipe(T.HttpLabel("type")),
          value: __S(963, __c30, 3),
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
function __c52(j: number): any {
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
function __c53(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          tableArn: S.String.pipe(T.HttpQuery("tableArn")),
          value: __S(1121, __c35, 1),
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
function __c54(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          tableArn: S.String.pipe(T.HttpQuery("tableArn")),
          versionToken: S.optional(S.String).pipe(T.HttpQuery("versionToken")),
          configuration: __S(804, __c25, 4),
        }).pipe(
          T.all(T.Http({ method: "PUT", uri: "/table-replication" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "PutTableReplicationRequest" });
  }
}
function __c55(j: number): any {
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
function __c56(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
          tags: __S(2048, __c64, 0),
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
function __c57(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
          tagKeys: __S(1920, __c60, 0).pipe(T.HttpQuery("tagKeys")),
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
function __c58(j: number): any {
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
          namespace: __S(1920, __c60, 0),
          versionToken: S.String,
          metadataLocation: S.String,
        }),
      ).annotate({ identifier: "UpdateTableMetadataLocationResponse" });
  }
}
function __c59(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          tableBucketARN: S.String.pipe(T.HttpLabel("tableBucketARN")),
          namespace: __S(1920, __c60, 0),
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
        S.Struct({ tableBucketARN: S.String, namespace: __S(1920, __c60, 0) }),
      ).annotate({ identifier: "CreateNamespaceResponse" });
  }
}
function __c60(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c61(j: number): any {
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
      return S.Array(__S(1952, __c61, 0));
    case 2:
      return S.suspend(() => S.Struct({ fields: __S(1953, __c61, 1) })).annotate({
        identifier: "IcebergSchema",
      });
    case 3:
      return S.suspend(() =>
        S.Struct({
          id: S.Number,
          name: S.String,
          type: S.Any,
          required: S.Boolean,
          doc: S.optional(S.String),
        }),
      ).annotate({ identifier: "SchemaV2Field" });
    case 4:
      return S.Array(__S(1955, __c61, 3));
    case 5:
      return S.Array(S.Number);
    case 6:
      return S.suspend(() =>
        S.Struct({
          type: S.String,
          fields: __S(1956, __c61, 4),
          schemaId: S.optional(S.Number),
          identifierFieldIds: S.optional(__S(1957, __c61, 5)),
        }).pipe(
          S.encodeKeys({ schemaId: "schema-id", identifierFieldIds: "identifier-field-ids" }),
        ),
      ).annotate({ identifier: "IcebergSchemaV2" });
    case 7:
      return S.suspend(() =>
        S.Struct({
          sourceId: S.Number,
          transform: S.String,
          name: S.String,
          fieldId: S.optional(S.Number),
        }).pipe(S.encodeKeys({ sourceId: "source-id", fieldId: "field-id" })),
      ).annotate({ identifier: "IcebergPartitionField" });
    case 8:
      return S.Array(__S(1959, __c61, 7));
    case 9:
      return S.suspend(() =>
        S.Struct({ fields: __S(1960, __c61, 8), specId: S.optional(S.Number) }).pipe(
          S.encodeKeys({ specId: "spec-id" }),
        ),
      ).annotate({ identifier: "IcebergPartitionSpec" });
    case 10:
      return S.suspend(() =>
        S.Struct({
          sourceId: S.Number,
          transform: S.String,
          direction: S.String,
          nullOrder: S.String,
        }).pipe(S.encodeKeys({ sourceId: "source-id", nullOrder: "null-order" })),
      ).annotate({ identifier: "IcebergSortField" });
    case 11:
      return S.Array(__S(1962, __c61, 10));
    case 12:
      return S.suspend(() =>
        S.Struct({ orderId: S.Number, fields: __S(1963, __c61, 11) }).pipe(
          S.encodeKeys({ orderId: "order-id" }),
        ),
      ).annotate({ identifier: "IcebergSortOrder" });
    case 13:
      return S.suspend(() =>
        S.Struct({
          schema: S.optional(__S(1954, __c61, 2)),
          schemaV2: S.optional(__S(1958, __c61, 6)),
          partitionSpec: S.optional(__S(1961, __c61, 9)),
          writeOrder: S.optional(__S(1964, __c61, 12)),
          properties: S.optional(__S(2048, __c64, 0)),
        }),
      ).annotate({ identifier: "IcebergMetadata" });
    case 14:
      return S.Union([/*@__PURE__*/ S.Struct({ iceberg: __S(1965, __c61, 13) })]);
    case 15:
      return S.suspend(() =>
        S.Struct({
          tableBucketARN: S.String.pipe(T.HttpLabel("tableBucketARN")),
          namespace: S.String.pipe(T.HttpLabel("namespace")),
          name: S.String,
          format: S.String,
          metadata: S.optional(__S(1966, __c61, 14)),
          encryptionConfiguration: S.optional(__S(1984, __c62, 0)),
          storageClassConfiguration: S.optional(__S(2016, __c63, 0)),
          tags: S.optional(__S(2048, __c64, 0)),
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
    case 16:
      return S.suspend(() => S.Struct({ tableARN: S.String, versionToken: S.String })).annotate({
        identifier: "CreateTableResponse",
      });
  }
}
function __c62(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ sseAlgorithm: S.String, kmsKeyArn: S.optional(S.String) }),
      ).annotate({ identifier: "EncryptionConfiguration" });
  }
}
function __c63(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ storageClass: S.String })).annotate({
        identifier: "StorageClassConfiguration",
      });
  }
}
function __c64(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
