import type * as HttpClient from "effect/unstable/http/HttpClient";
import * as API from "@distilled.cloud/core/api";
import * as D from "@distilled.cloud/core/shape";
import * as TE from "@distilled.cloud/core/error-class";
import { AwsProtocol } from "../protocol.ts";
import { restJson1Protocol } from "../protocols/rest-json.ts";
import { Retry } from "../retry.ts";
import type * as T from "../types.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
const svc: T.ServiceInfo = {
  sdkId: "S3Tables",
  target: "S3TableBuckets",
  version: "2018-05-10",
  sigv4: "s3tables",
  protocol: restJson1Protocol,
  rules: (p, _) => {
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
        return err(
          "Invalid Configuration: FIPS and custom endpoint are not supported",
        );
      }
      if (UseDualStack === true) {
        return err(
          "Invalid Configuration: Dualstack and custom endpoint are not supported",
        );
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
              return e(
                `https://s3tables-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://s3tables.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://s3tables.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class AccessDeniedException
  extends /*@__PURE__*/ TE.TaggedError("AccessDeniedException", ["AuthError"], {
    status: 403,
  })<{ readonly message?: string }> {}
export class BadRequestException
  extends /*@__PURE__*/ TE.TaggedError(
    "BadRequestException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError("ConflictException", ["ConflictError"], {
    status: 409,
  })<{ readonly message?: string }> {}
export class ForbiddenException
  extends /*@__PURE__*/ TE.TaggedError("ForbiddenException", ["AuthError"], {
    status: 403,
  })<{ readonly message?: string }> {}
export class InternalServerErrorException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerErrorException",
    ["ServerError"],
    { status: 500 },
  )<{ readonly message?: string }> {}
export class MethodNotAllowedException
  extends /*@__PURE__*/ TE.TaggedError(
    "MethodNotAllowedException",
    ["BadRequestError"],
    { status: 405 },
  )<{ readonly message?: string }> {}
export class NotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "NotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class TooManyRequestsException
  extends /*@__PURE__*/ TE.TaggedError(
    "TooManyRequestsException",
    ["ThrottlingError"],
    { status: 429 },
  )<{ readonly message?: string }> {}
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
export type TableBucketMaintenanceType =
  | "icebergUnreferencedFileRemoval"
  | (string & {});
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
  [
    key in TableBucketMaintenanceType
  ]?: TableBucketMaintenanceConfigurationValue;
};
export interface GetTableBucketMaintenanceConfigurationResponse {
  tableBucketARN: string;
  configuration: {
    [key: string]: TableBucketMaintenanceConfigurationValue | undefined;
  };
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
export type IcebergCompactionStrategy =
  | "auto"
  | "binpack"
  | "sort"
  | "z-order"
  | (string & {});
export interface IcebergCompactionSettings {
  targetFileSizeMB?: number;
  strategy?: IcebergCompactionStrategy;
}
export interface IcebergSnapshotManagementSettings {
  minSnapshotsToKeep?: number;
  maxSnapshotAgeHours?: number;
}
export type TableMaintenanceSettings =
  | {
      icebergCompaction: IcebergCompactionSettings;
      icebergSnapshotManagement?: never;
    }
  | {
      icebergCompaction?: never;
      icebergSnapshotManagement: IcebergSnapshotManagementSettings;
    };
export interface TableMaintenanceConfigurationValue {
  status?: MaintenanceStatus;
  settings?: TableMaintenanceSettings;
}
export type TableMaintenanceConfiguration = {
  [key in TableMaintenanceType]?: TableMaintenanceConfigurationValue;
};
export interface GetTableMaintenanceConfigurationResponse {
  tableARN: string;
  configuration: {
    [key: string]: TableMaintenanceConfigurationValue | undefined;
  };
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
export type JobStatus =
  | "Not_Yet_Run"
  | "Successful"
  | "Failed"
  | "Disabled"
  | (string & {});
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
export type TableRecordExpirationStatus =
  | "enabled"
  | "disabled"
  | (string & {});
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
export type ReplicationStatus =
  | "pending"
  | "completed"
  | "failed"
  | (string & {});
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
export type ReplicationDestinationStatuses =
  ReplicationDestinationStatusModel[];
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
  descriptor: {
    service: svc,
    http: "PUT /namespaces/{tableBucketARN}",
    input: { tableBucketARN: 0, namespace: 0 },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /tables/{tableBucketARN}/{namespace}",
    input: {
      tableBucketARN: 0,
      namespace: 0,
      name: 0,
      format: 0,
      metadata: {
        iceberg: {
          schema: { fields: D.list({ id: 0, name: 0, type: 0, required: 0 }) },
          schemaV2: {
            type: 0,
            fields: D.list({ id: 0, name: 0, type: 0, required: 0, doc: 0 }),
            schemaId: D.m({ wire: "schema-id" }),
            identifierFieldIds: D.m({ wire: "identifier-field-ids" }),
          },
          partitionSpec: {
            fields: D.list({
              sourceId: D.m({ wire: "source-id" }),
              transform: 0,
              name: 0,
              fieldId: D.m({ wire: "field-id" }),
            }),
            specId: D.m({ wire: "spec-id" }),
          },
          writeOrder: {
            orderId: D.m({ wire: "order-id" }),
            fields: D.list({
              sourceId: D.m({ wire: "source-id" }),
              transform: 0,
              direction: 0,
              nullOrder: D.m({ wire: "null-order" }),
            }),
          },
          properties: 0,
        },
      },
      encryptionConfiguration: i_EncryptionConfiguration,
      storageClassConfiguration: i_StorageClassConfiguration,
      tags: 0,
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /buckets",
    input: {
      name: 0,
      encryptionConfiguration: i_EncryptionConfiguration,
      storageClassConfiguration: i_StorageClassConfiguration,
      tags: 0,
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /namespaces/{tableBucketARN}/{namespace}",
    input: { tableBucketARN: 0, namespace: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /tables/{tableBucketARN}/{namespace}/{name}",
    input: {
      tableBucketARN: 0,
      namespace: 0,
      name: 0,
      versionToken: D.m({ query: "versionToken" }),
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /buckets/{tableBucketARN}",
    input: { tableBucketARN: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /buckets/{tableBucketARN}/encryption",
    input: { tableBucketARN: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /buckets/{tableBucketARN}/metrics",
    input: { tableBucketARN: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /buckets/{tableBucketARN}/policy",
    input: { tableBucketARN: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /table-bucket-replication",
    input: {
      tableBucketARN: D.m({ query: "tableBucketARN" }),
      versionToken: D.m({ query: "versionToken" }),
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /tables/{tableBucketARN}/{namespace}/{name}/policy",
    input: { tableBucketARN: 0, namespace: 0, name: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /table-replication",
    input: {
      tableArn: D.m({ query: "tableArn" }),
      versionToken: D.m({ query: "versionToken" }),
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /namespaces/{tableBucketARN}/{namespace}",
    input: { tableBucketARN: 0, namespace: 0 },
    output: { createdAt: D.ts },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /get-table",
    input: {
      tableBucketARN: D.m({ query: "tableBucketARN" }),
      namespace: D.m({ query: "namespace" }),
      name: D.m({ query: "name" }),
      tableArn: D.m({ query: "tableArn" }),
    },
    output: { createdAt: D.ts, modifiedAt: D.ts },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /buckets/{tableBucketARN}",
    input: { tableBucketARN: 0 },
    output: { createdAt: D.ts },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /buckets/{tableBucketARN}/encryption",
    input: { tableBucketARN: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /buckets/{tableBucketARN}/maintenance",
    input: { tableBucketARN: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /buckets/{tableBucketARN}/metrics",
    input: { tableBucketARN: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /buckets/{tableBucketARN}/policy",
    input: { tableBucketARN: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /table-bucket-replication",
    input: { tableBucketARN: D.m({ query: "tableBucketARN" }) },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /buckets/{tableBucketARN}/storage-class",
    input: { tableBucketARN: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /tables/{tableBucketARN}/{namespace}/{name}/encryption",
    input: { tableBucketARN: 0, namespace: 0, name: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /tables/{tableBucketARN}/{namespace}/{name}/maintenance",
    input: { tableBucketARN: 0, namespace: 0, name: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /tables/{tableBucketARN}/{namespace}/{name}/maintenance-job-status",
    input: { tableBucketARN: 0, namespace: 0, name: 0 },
    output: { status: D.map({ lastRunTimestamp: D.ts }) },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /tables/{tableBucketARN}/{namespace}/{name}/metadata-location",
    input: { tableBucketARN: 0, namespace: 0, name: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /tables/{tableBucketARN}/{namespace}/{name}/policy",
    input: { tableBucketARN: 0, namespace: 0, name: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /table-record-expiration",
    input: { tableArn: D.m({ query: "tableArn" }) },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /table-record-expiration-job-status",
    input: { tableArn: D.m({ query: "tableArn" }) },
    output: { lastRunTimestamp: D.ts },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /table-replication",
    input: { tableArn: D.m({ query: "tableArn" }) },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /replication-status",
    input: { tableArn: D.m({ query: "tableArn" }) },
    output: {
      destinations: D.list({
        lastSuccessfulReplicatedUpdate: { timestamp: D.ts },
      }),
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /tables/{tableBucketARN}/{namespace}/{name}/storage-class",
    input: { tableBucketARN: 0, namespace: 0, name: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /namespaces/{tableBucketARN}",
    input: {
      tableBucketARN: 0,
      prefix: D.m({ query: "prefix" }),
      continuationToken: D.m({ query: "continuationToken" }),
      maxNamespaces: D.m({ query: "maxNamespaces" }),
    },
    output: { namespaces: D.list({ createdAt: D.ts }) },
  },
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
  descriptor: {
    service: svc,
    http: "GET /buckets",
    input: {
      prefix: D.m({ query: "prefix" }),
      continuationToken: D.m({ query: "continuationToken" }),
      maxBuckets: D.m({ query: "maxBuckets" }),
      type: D.m({ query: "type" }),
    },
    output: { tableBuckets: D.list({ createdAt: D.ts }) },
  },
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
  descriptor: {
    service: svc,
    http: "GET /tables/{tableBucketARN}",
    input: {
      tableBucketARN: 0,
      namespace: D.m({ query: "namespace" }),
      prefix: D.m({ query: "prefix" }),
      continuationToken: D.m({ query: "continuationToken" }),
      maxTables: D.m({ query: "maxTables" }),
    },
    output: { tables: D.list({ createdAt: D.ts, modifiedAt: D.ts }) },
  },
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
  descriptor: {
    service: svc,
    http: "GET /tag/{resourceArn}",
    input: { resourceArn: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /buckets/{tableBucketARN}/encryption",
    input: {
      tableBucketARN: 0,
      encryptionConfiguration: i_EncryptionConfiguration,
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /buckets/{tableBucketARN}/maintenance/{type}",
    input: {
      tableBucketARN: 0,
      type: 0,
      value: {
        status: 0,
        settings: {
          icebergUnreferencedFileRemoval: {
            unreferencedDays: 0,
            nonCurrentDays: 0,
          },
        },
      },
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /buckets/{tableBucketARN}/metrics",
    input: { tableBucketARN: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /buckets/{tableBucketARN}/policy",
    input: { tableBucketARN: 0, resourcePolicy: 0 },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /table-bucket-replication",
    input: {
      tableBucketARN: D.m({ query: "tableBucketARN" }),
      versionToken: D.m({ query: "versionToken" }),
      configuration: {
        role: 0,
        rules: D.list({ destinations: D.list(i_ReplicationDestination) }),
      },
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /buckets/{tableBucketARN}/storage-class",
    input: {
      tableBucketARN: 0,
      storageClassConfiguration: i_StorageClassConfiguration,
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /tables/{tableBucketARN}/{namespace}/{name}/maintenance/{type}",
    input: {
      tableBucketARN: 0,
      namespace: 0,
      name: 0,
      type: 0,
      value: {
        status: 0,
        settings: {
          icebergCompaction: { targetFileSizeMB: 0, strategy: 0 },
          icebergSnapshotManagement: {
            minSnapshotsToKeep: 0,
            maxSnapshotAgeHours: 0,
          },
        },
      },
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /tables/{tableBucketARN}/{namespace}/{name}/policy",
    input: { tableBucketARN: 0, namespace: 0, name: 0, resourcePolicy: 0 },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /table-record-expiration",
    input: {
      tableArn: D.m({ query: "tableArn" }),
      value: { status: 0, settings: { days: 0 } },
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /table-replication",
    input: {
      tableArn: D.m({ query: "tableArn" }),
      versionToken: D.m({ query: "versionToken" }),
      configuration: {
        role: 0,
        rules: D.list({ destinations: D.list(i_ReplicationDestination) }),
      },
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /tables/{tableBucketARN}/{namespace}/{name}/rename",
    input: {
      tableBucketARN: 0,
      namespace: 0,
      name: 0,
      newNamespaceName: 0,
      newName: 0,
      versionToken: 0,
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /tag/{resourceArn}",
    input: { resourceArn: 0, tags: 0 },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /tag/{resourceArn}",
    input: { resourceArn: 0, tagKeys: D.m({ query: "tagKeys" }) },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /tables/{tableBucketARN}/{namespace}/{name}/metadata-location",
    input: {
      tableBucketARN: 0,
      namespace: 0,
      name: 0,
      versionToken: 0,
      metadataLocation: 0,
    },
    body: true,
  },
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
})) as any;

const i_EncryptionConfiguration: D.LazyStruct = () => ({
  sseAlgorithm: 0,
  kmsKeyArn: 0,
});
const i_ReplicationDestination: D.LazyStruct = () => ({
  destinationTableBucketARN: 0,
});
const i_StorageClassConfiguration: D.LazyStruct = () => ({ storageClass: 0 });
