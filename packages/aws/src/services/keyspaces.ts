import type * as HttpClient from "effect/unstable/http/HttpClient";
import * as API from "@distilled.cloud/core/api";
import * as D from "@distilled.cloud/core/shape";
import * as TE from "@distilled.cloud/core/error-class";
import { AwsProtocol } from "../protocol.ts";
import { awsJson1_0Protocol } from "../protocols/aws-json.ts";
import { Retry } from "../retry.ts";
import type * as T from "../types.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
const svc: T.ServiceInfo = {
  sdkId: "Keyspaces",
  target: "KeyspacesService",
  version: "2022-02-10",
  sigv4: "cassandra",
  protocol: awsJson1_0Protocol,
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
                `https://cassandra-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              if (_.getAttr(PartitionResult, "name") === "aws-us-gov") {
                return e(`https://cassandra.${Region}.amazonaws.com`);
              }
              return e(
                `https://cassandra-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://cassandra.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://cassandra.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError("ConflictException", ["ConflictError"], {
    status: 409,
  })<{ readonly message?: string }> {}
export class InternalServerException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerException",
    ["ServerError"],
    { status: 500 },
  )<{ readonly message?: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string; readonly resourceArn?: string }> {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceQuotaExceededException",
    ["QuotaError"],
    { status: 402 },
  )<{ readonly message?: string }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError("ValidationException")<{
    readonly message?: string;
  }> {}
export type KeyspaceName = string;
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  key: string;
  value: string;
}
export type TagList = Tag[];
export type Rs = string;
export type Region = string;
export type RegionList = string[];
export interface ReplicationSpecification {
  replicationStrategy: string;
  regionList?: string[];
}
export interface CreateKeyspaceRequest {
  keyspaceName: string;
  tags?: Tag[];
  replicationSpecification?: ReplicationSpecification;
}
export type ARN = string;
export interface CreateKeyspaceResponse {
  resourceArn: string;
}
export type TableName = string;
export interface ColumnDefinition {
  name: string;
  type: string;
}
export type ColumnDefinitionList = ColumnDefinition[];
export interface PartitionKey {
  name: string;
}
export type PartitionKeyList = PartitionKey[];
export type SortOrder = string;
export interface ClusteringKey {
  name: string;
  orderBy: string;
}
export type ClusteringKeyList = ClusteringKey[];
export interface StaticColumn {
  name: string;
}
export type StaticColumnList = StaticColumn[];
export interface SchemaDefinition {
  allColumns: ColumnDefinition[];
  partitionKeys: PartitionKey[];
  clusteringKeys?: ClusteringKey[];
  staticColumns?: StaticColumn[];
}
export interface Comment {
  message: string;
}
export type ThroughputMode = string;
export type CapacityUnits = number;
export interface CapacitySpecification {
  throughputMode: string;
  readCapacityUnits?: number;
  writeCapacityUnits?: number;
}
export type EncryptionType = string;
export type KmsKeyARN = string;
export interface EncryptionSpecification {
  type: string;
  kmsKeyIdentifier?: string;
}
export type PointInTimeRecoveryStatus = string;
export interface PointInTimeRecovery {
  status: string;
}
export type TimeToLiveStatus = string;
export interface TimeToLive {
  status: string;
}
export type DefaultTimeToLive = number;
export type ClientSideTimestampsStatus = string;
export interface ClientSideTimestamps {
  status: string;
}
export type IntegerObject = number;
export type DoubleObject = number;
export interface TargetTrackingScalingPolicyConfiguration {
  disableScaleIn?: boolean;
  scaleInCooldown?: number;
  scaleOutCooldown?: number;
  targetValue: number;
}
export interface AutoScalingPolicy {
  targetTrackingScalingPolicyConfiguration?: TargetTrackingScalingPolicyConfiguration;
}
export interface AutoScalingSettings {
  autoScalingDisabled?: boolean;
  minimumUnits?: number;
  maximumUnits?: number;
  scalingPolicy?: AutoScalingPolicy;
}
export interface AutoScalingSpecification {
  writeCapacityAutoScaling?: AutoScalingSettings;
  readCapacityAutoScaling?: AutoScalingSettings;
}
export interface ReplicaSpecification {
  region: string;
  readCapacityUnits?: number;
  readCapacityAutoScaling?: AutoScalingSettings;
}
export type ReplicaSpecificationList = ReplicaSpecification[];
export type CdcStatus = string;
export type ViewType = string;
export type CdcPropagateTags = string;
export interface CdcSpecification {
  status: string;
  viewType?: string;
  tags?: Tag[];
  propagateTags?: string;
}
export interface WarmThroughputSpecification {
  readUnitsPerSecond?: number;
  writeUnitsPerSecond?: number;
}
export interface CreateTableRequest {
  keyspaceName: string;
  tableName: string;
  schemaDefinition: SchemaDefinition;
  comment?: Comment;
  capacitySpecification?: CapacitySpecification;
  encryptionSpecification?: EncryptionSpecification;
  pointInTimeRecovery?: PointInTimeRecovery;
  ttl?: TimeToLive;
  defaultTimeToLive?: number;
  tags?: Tag[];
  clientSideTimestamps?: ClientSideTimestamps;
  autoScalingSpecification?: AutoScalingSpecification;
  replicaSpecifications?: ReplicaSpecification[];
  cdcSpecification?: CdcSpecification;
  warmThroughputSpecification?: WarmThroughputSpecification;
}
export interface CreateTableResponse {
  resourceArn: string;
}
export type TypeName = string;
export interface FieldDefinition {
  name: string;
  type: string;
}
export type FieldList = FieldDefinition[];
export interface CreateTypeRequest {
  keyspaceName: string;
  typeName: string;
  fieldDefinitions: FieldDefinition[];
}
export interface CreateTypeResponse {
  keyspaceArn: string;
  typeName: string;
}
export interface DeleteKeyspaceRequest {
  keyspaceName: string;
}
export interface DeleteKeyspaceResponse {}
export interface DeleteTableRequest {
  keyspaceName: string;
  tableName: string;
}
export interface DeleteTableResponse {}
export interface DeleteTypeRequest {
  keyspaceName: string;
  typeName: string;
}
export interface DeleteTypeResponse {
  keyspaceArn: string;
  typeName: string;
}
export interface GetKeyspaceRequest {
  keyspaceName: string;
}
export type KeyspaceStatus = string;
export type TablesReplicationProgress = string;
export interface ReplicationGroupStatus {
  region: string;
  keyspaceStatus: string;
  tablesReplicationProgress?: string;
}
export type ReplicationGroupStatusList = ReplicationGroupStatus[];
export interface GetKeyspaceResponse {
  keyspaceName: string;
  resourceArn: string;
  replicationStrategy: string;
  replicationRegions?: string[];
  replicationGroupStatuses?: ReplicationGroupStatus[];
}
export interface GetTableRequest {
  keyspaceName: string;
  tableName: string;
}
export type TableStatus = string;
export interface CapacitySpecificationSummary {
  throughputMode: string;
  readCapacityUnits?: number;
  writeCapacityUnits?: number;
  lastUpdateToPayPerRequestTimestamp?: Date;
}
export interface PointInTimeRecoverySummary {
  status: string;
  earliestRestorableTimestamp?: Date;
}
export type WarmThroughputStatus = string;
export interface WarmThroughputSpecificationSummary {
  readUnitsPerSecond: number;
  writeUnitsPerSecond: number;
  status: string;
}
export interface ReplicaSpecificationSummary {
  region?: string;
  status?: string;
  capacitySpecification?: CapacitySpecificationSummary;
  warmThroughputSpecification?: WarmThroughputSpecificationSummary;
}
export type ReplicaSpecificationSummaryList = ReplicaSpecificationSummary[];
export type StreamArn = string;
export interface CdcSpecificationSummary {
  status: string;
  viewType?: string;
}
export interface GetTableResponse {
  keyspaceName: string;
  tableName: string;
  resourceArn: string;
  creationTimestamp?: Date;
  status?: string;
  schemaDefinition?: SchemaDefinition;
  capacitySpecification?: CapacitySpecificationSummary;
  encryptionSpecification?: EncryptionSpecification;
  pointInTimeRecovery?: PointInTimeRecoverySummary;
  ttl?: TimeToLive;
  defaultTimeToLive?: number;
  comment?: Comment;
  clientSideTimestamps?: ClientSideTimestamps;
  replicaSpecifications?: ReplicaSpecificationSummary[];
  latestStreamArn?: string;
  cdcSpecification?: CdcSpecificationSummary;
  warmThroughputSpecification?: WarmThroughputSpecificationSummary;
}
export interface GetTableAutoScalingSettingsRequest {
  keyspaceName: string;
  tableName: string;
}
export interface ReplicaAutoScalingSpecification {
  region?: string;
  autoScalingSpecification?: AutoScalingSpecification;
}
export type ReplicaAutoScalingSpecificationList =
  ReplicaAutoScalingSpecification[];
export interface GetTableAutoScalingSettingsResponse {
  keyspaceName: string;
  tableName: string;
  resourceArn: string;
  autoScalingSpecification?: AutoScalingSpecification;
  replicaSpecifications?: ReplicaAutoScalingSpecification[];
}
export interface GetTypeRequest {
  keyspaceName: string;
  typeName: string;
}
export type TypeStatus = string;
export type TableNameList = string[];
export type TypeNameList = string[];
export type Depth = number;
export interface GetTypeResponse {
  keyspaceName: string;
  typeName: string;
  fieldDefinitions?: FieldDefinition[];
  lastModifiedTimestamp?: Date;
  status?: string;
  directReferringTables?: string[];
  directParentTypes?: string[];
  maxNestingDepth?: number;
  keyspaceArn: string;
}
export type NextToken = string;
export type MaxResults = number;
export interface ListKeyspacesRequest {
  nextToken?: string;
  maxResults?: number;
}
export interface KeyspaceSummary {
  keyspaceName: string;
  resourceArn: string;
  replicationStrategy: string;
  replicationRegions?: string[];
}
export type KeyspaceSummaryList = KeyspaceSummary[];
export interface ListKeyspacesResponse {
  nextToken?: string;
  keyspaces: KeyspaceSummary[];
}
export interface ListTablesRequest {
  nextToken?: string;
  maxResults?: number;
  keyspaceName: string;
}
export interface TableSummary {
  keyspaceName: string;
  tableName: string;
  resourceArn: string;
}
export type TableSummaryList = TableSummary[];
export interface ListTablesResponse {
  nextToken?: string;
  tables?: TableSummary[];
}
export interface ListTagsForResourceRequest {
  resourceArn: string;
  nextToken?: string;
  maxResults?: number;
}
export interface ListTagsForResourceResponse {
  nextToken?: string;
  tags?: Tag[];
}
export interface ListTypesRequest {
  nextToken?: string;
  maxResults?: number;
  keyspaceName: string;
}
export interface ListTypesResponse {
  nextToken?: string;
  types: string[];
}
export interface RestoreTableRequest {
  sourceKeyspaceName: string;
  sourceTableName: string;
  targetKeyspaceName: string;
  targetTableName: string;
  restoreTimestamp?: Date;
  capacitySpecificationOverride?: CapacitySpecification;
  encryptionSpecificationOverride?: EncryptionSpecification;
  pointInTimeRecoveryOverride?: PointInTimeRecovery;
  tagsOverride?: Tag[];
  autoScalingSpecification?: AutoScalingSpecification;
  replicaSpecifications?: ReplicaSpecification[];
}
export interface RestoreTableResponse {
  restoredTableARN: string;
}
export interface TagResourceRequest {
  resourceArn: string;
  tags: Tag[];
}
export interface TagResourceResponse {}
export interface UntagResourceRequest {
  resourceArn: string;
  tags: Tag[];
}
export interface UntagResourceResponse {}
export interface UpdateKeyspaceRequest {
  keyspaceName: string;
  replicationSpecification: ReplicationSpecification;
  clientSideTimestamps?: ClientSideTimestamps;
}
export interface UpdateKeyspaceResponse {
  resourceArn: string;
}
export interface UpdateTableRequest {
  keyspaceName: string;
  tableName: string;
  addColumns?: ColumnDefinition[];
  capacitySpecification?: CapacitySpecification;
  encryptionSpecification?: EncryptionSpecification;
  pointInTimeRecovery?: PointInTimeRecovery;
  ttl?: TimeToLive;
  defaultTimeToLive?: number;
  clientSideTimestamps?: ClientSideTimestamps;
  autoScalingSpecification?: AutoScalingSpecification;
  replicaSpecifications?: ReplicaSpecification[];
  cdcSpecification?: CdcSpecification;
  warmThroughputSpecification?: WarmThroughputSpecification;
}
export interface UpdateTableResponse {
  resourceArn: string;
}
export type CreateKeyspaceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * The `CreateKeyspace` operation adds a new keyspace to your account. In an Amazon Web Services account, keyspace names must be unique within each Region.
 *
 * `CreateKeyspace` is an asynchronous operation. You can monitor the creation status of the new keyspace by using the `GetKeyspace` operation.
 *
 * For more information, see Create a keyspace in the *Amazon Keyspaces Developer Guide*.
 */
export const createKeyspace: API.OperationMethod<
  CreateKeyspaceRequest,
  CreateKeyspaceResponse,
  CreateKeyspaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      keyspaceName: 0,
      tags: D.list(i_Tag),
      replicationSpecification: i_ReplicationSpecification,
    },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateKeyspace",
})) as any;

export type CreateTableError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * The `CreateTable` operation adds a new table to the specified keyspace. Within a keyspace, table names must be unique.
 *
 * `CreateTable` is an asynchronous operation. When the request is received, the status of the table is set to `CREATING`. You can monitor the creation status of the new table by using the `GetTable` operation, which returns the current `status` of the table. You can start using a table when the status is `ACTIVE`.
 *
 * For more information, see Create a table in the *Amazon Keyspaces Developer Guide*.
 */
export const createTable: API.OperationMethod<
  CreateTableRequest,
  CreateTableResponse,
  CreateTableError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      keyspaceName: 0,
      tableName: 0,
      schemaDefinition: {
        allColumns: D.list(i_ColumnDefinition),
        partitionKeys: D.list({ name: 0 }),
        clusteringKeys: D.list({ name: 0, orderBy: 0 }),
        staticColumns: D.list({ name: 0 }),
      },
      comment: { message: 0 },
      capacitySpecification: i_CapacitySpecification,
      encryptionSpecification: i_EncryptionSpecification,
      pointInTimeRecovery: i_PointInTimeRecovery,
      ttl: i_TimeToLive,
      defaultTimeToLive: 0,
      tags: D.list(i_Tag),
      clientSideTimestamps: i_ClientSideTimestamps,
      autoScalingSpecification: i_AutoScalingSpecification,
      replicaSpecifications: D.list(i_ReplicaSpecification),
      cdcSpecification: i_CdcSpecification,
      warmThroughputSpecification: i_WarmThroughputSpecification,
    },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateTable",
})) as any;

export type CreateTypeError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * The `CreateType` operation creates a new user-defined type in the specified keyspace.
 *
 * To configure the required permissions, see Permissions to create a UDT in the *Amazon Keyspaces Developer Guide*.
 *
 * For more information, see User-defined types (UDTs) in the *Amazon Keyspaces Developer Guide*.
 */
export const createType: API.OperationMethod<
  CreateTypeRequest,
  CreateTypeResponse,
  CreateTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      keyspaceName: 0,
      typeName: 0,
      fieldDefinitions: D.list({ name: 0, type: 0 }),
    },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateType",
})) as any;

export type DeleteKeyspaceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * The `DeleteKeyspace` operation deletes a keyspace and all of its tables.
 */
export const deleteKeyspace: API.OperationMethod<
  DeleteKeyspaceRequest,
  DeleteKeyspaceResponse,
  DeleteKeyspaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { keyspaceName: 0 } },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteKeyspace",
})) as any;

export type DeleteTableError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * The `DeleteTable` operation deletes a table and all of its data. After a `DeleteTable` request is received, the specified table is in the `DELETING` state until Amazon Keyspaces completes the deletion. If the table is in the `ACTIVE` state, you can delete it. If a table is either in the `CREATING` or `UPDATING` states, then Amazon Keyspaces returns a `ResourceInUseException`. If the specified table does not exist, Amazon Keyspaces returns a `ResourceNotFoundException`. If the table is already in the `DELETING` state, no error is returned.
 */
export const deleteTable: API.OperationMethod<
  DeleteTableRequest,
  DeleteTableResponse,
  DeleteTableError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { keyspaceName: 0, tableName: 0 } },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTable",
})) as any;

export type DeleteTypeError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * The `DeleteType` operation deletes a user-defined type (UDT). You can only delete a type that is not used in a table or another UDT.
 *
 * To configure the required permissions, see Permissions to delete a UDT in the *Amazon Keyspaces Developer Guide*.
 */
export const deleteType: API.OperationMethod<
  DeleteTypeRequest,
  DeleteTypeResponse,
  DeleteTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { keyspaceName: 0, typeName: 0 } },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteType",
})) as any;

export type GetKeyspaceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Returns the name of the specified keyspace, the Amazon Resource Name (ARN), the replication strategy, the Amazon Web Services Regions of a multi-Region keyspace, and the status of newly added Regions after an `UpdateKeyspace` operation.
 */
export const getKeyspace: API.OperationMethod<
  GetKeyspaceRequest,
  GetKeyspaceResponse,
  GetKeyspaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { keyspaceName: 0 } },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetKeyspace",
})) as any;

export type GetTableError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about the table, including the table's name and current status, the keyspace name, configuration settings, and metadata.
 *
 * To read table metadata using `GetTable`, the IAM principal needs `Select` action permissions for the table and the system keyspace.
 */
export const getTable: API.OperationMethod<
  GetTableRequest,
  GetTableResponse,
  GetTableError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { keyspaceName: 0, tableName: 0 },
    output: {
      creationTimestamp: D.ts,
      capacitySpecification: o_CapacitySpecificationSummary,
      pointInTimeRecovery: { earliestRestorableTimestamp: D.ts },
      replicaSpecifications: D.list({
        capacitySpecification: o_CapacitySpecificationSummary,
      }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTable",
})) as any;

export type GetTableAutoScalingSettingsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Returns auto scaling related settings of the specified table in JSON format. If the table is a multi-Region table, the Amazon Web Services Region specific auto scaling settings of the table are included.
 *
 * Amazon Keyspaces auto scaling helps you provision throughput capacity for variable workloads efficiently by increasing and decreasing your table's read and write capacity automatically in response to application traffic. For more information, see Managing throughput capacity automatically with Amazon Keyspaces auto scaling in the *Amazon Keyspaces Developer Guide*.
 *
 * `GetTableAutoScalingSettings` can't be used as an action in an IAM policy.
 *
 * To define permissions for `GetTableAutoScalingSettings`, you must allow the following two actions in the IAM policy statement's `Action` element:
 *
 * - `application-autoscaling:DescribeScalableTargets`
 *
 * - `application-autoscaling:DescribeScalingPolicies`
 */
export const getTableAutoScalingSettings: API.OperationMethod<
  GetTableAutoScalingSettingsRequest,
  GetTableAutoScalingSettingsResponse,
  GetTableAutoScalingSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { keyspaceName: 0, tableName: 0 } },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTableAutoScalingSettings",
})) as any;

export type GetTypeError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * The `GetType` operation returns information about the type, for example the field definitions, the timestamp when the type was last modified, the level of nesting, the status, and details about if the type is used in other types and tables.
 *
 * To read keyspace metadata using `GetType`, the IAM principal needs `Select` action permissions for the system keyspace. To configure the required permissions, see Permissions to view a UDT in the *Amazon Keyspaces Developer Guide*.
 */
export const getType: API.OperationMethod<
  GetTypeRequest,
  GetTypeResponse,
  GetTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { keyspaceName: 0, typeName: 0 },
    output: { lastModifiedTimestamp: D.ts },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetType",
})) as any;

export type ListKeyspacesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * The `ListKeyspaces` operation returns a list of keyspaces.
 */
export const listKeyspaces: API.PaginatedOperationMethod<
  ListKeyspacesRequest,
  ListKeyspacesResponse,
  ListKeyspacesError,
  Credentials | HttpClient.HttpClient,
  KeyspaceSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: { service: svc, input: { nextToken: 0, maxResults: 0 } },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListKeyspaces",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "keyspaces",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTablesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * The `ListTables` operation returns a list of tables for a specified keyspace.
 *
 * To read keyspace metadata using `ListTables`, the IAM principal needs `Select` action permissions for the system keyspace.
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
    input: { nextToken: 0, maxResults: 0, keyspaceName: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTables",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "tables",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of all tags associated with the specified Amazon Keyspaces resource.
 *
 * To read keyspace metadata using `ListTagsForResource`, the IAM principal needs `Select` action permissions for the specified resource and the system keyspace.
 */
export const listTagsForResource: API.PaginatedOperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient,
  Tag
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { resourceArn: 0, nextToken: 0, maxResults: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "tags",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTypesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * The `ListTypes` operation returns a list of types for a specified keyspace.
 *
 * To read keyspace metadata using `ListTypes`, the IAM principal needs `Select` action permissions for the system keyspace. To configure the required permissions, see Permissions to view a UDT in the *Amazon Keyspaces Developer Guide*.
 */
export const listTypes: API.PaginatedOperationMethod<
  ListTypesRequest,
  ListTypesResponse,
  ListTypesError,
  Credentials | HttpClient.HttpClient,
  TypeName
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { nextToken: 0, maxResults: 0, keyspaceName: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTypes",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "types",
    pageSize: "maxResults",
  } as const,
})) as any;

export type RestoreTableError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Restores the table to the specified point in time within the `earliest_restorable_timestamp` and the current time. For more information about restore points, see Time window for PITR continuous backups in the *Amazon Keyspaces Developer Guide*.
 *
 * Any number of users can execute up to 4 concurrent restores (any type of restore) in a given account.
 *
 * When you restore using point in time recovery, Amazon Keyspaces restores your source table's schema and data to the state based on the selected timestamp `(day:hour:minute:second)` to a new table. The Time to Live (TTL) settings are also restored to the state based on the selected timestamp.
 *
 * In addition to the table's schema, data, and TTL settings, `RestoreTable` restores the capacity mode, auto scaling settings, encryption settings, and point-in-time recovery settings from the source table. Unlike the table's schema data and TTL settings, which are restored based on the selected timestamp, these settings are always restored based on the table's settings as of the current time or when the table was deleted.
 *
 * You can also overwrite these settings during restore:
 *
 * - Read/write capacity mode
 *
 * - Provisioned throughput capacity units
 *
 * - Auto scaling settings
 *
 * - Point-in-time (PITR) settings
 *
 * - Tags
 *
 * For more information, see PITR restore settings in the *Amazon Keyspaces Developer Guide*.
 *
 * Note that the following settings are not restored, and you must configure them manually for the new table:
 *
 * - Identity and Access Management (IAM) policies
 *
 * - Amazon CloudWatch metrics and alarms
 */
export const restoreTable: API.OperationMethod<
  RestoreTableRequest,
  RestoreTableResponse,
  RestoreTableError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      sourceKeyspaceName: 0,
      sourceTableName: 0,
      targetKeyspaceName: 0,
      targetTableName: 0,
      restoreTimestamp: 0,
      capacitySpecificationOverride: i_CapacitySpecification,
      encryptionSpecificationOverride: i_EncryptionSpecification,
      pointInTimeRecoveryOverride: i_PointInTimeRecovery,
      tagsOverride: D.list(i_Tag),
      autoScalingSpecification: i_AutoScalingSpecification,
      replicaSpecifications: D.list(i_ReplicaSpecification),
    },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RestoreTable",
})) as any;

export type TagResourceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Associates a set of tags with a Amazon Keyspaces resource. You can then activate these user-defined tags so that they appear on the Cost Management Console for cost allocation tracking. For more information, see Adding tags and labels to Amazon Keyspaces resources in the *Amazon Keyspaces Developer Guide*.
 *
 * For IAM policy examples that show how to control access to Amazon Keyspaces resources based on tags, see Amazon Keyspaces resource access based on tags in the *Amazon Keyspaces Developer Guide*.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { resourceArn: 0, tags: D.list(i_Tag) } },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

export type UntagResourceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Removes the association of tags from a Amazon Keyspaces resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { resourceArn: 0, tags: D.list(i_Tag) } },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

export type UpdateKeyspaceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Adds a new Amazon Web Services Region to the keyspace. You can add a new Region to a keyspace that is either a single or a multi-Region keyspace. Amazon Keyspaces is going to replicate all tables in the keyspace to the new Region. To successfully replicate all tables to the new Region, they must use client-side timestamps for conflict resolution. To enable client-side timestamps, specify `clientSideTimestamps.status = enabled` when invoking the API. For more information about client-side timestamps, see Client-side timestamps in Amazon Keyspaces in the *Amazon Keyspaces Developer Guide*.
 *
 * To add a Region to a keyspace using the `UpdateKeyspace` API, the IAM principal needs permissions for the following IAM actions:
 *
 * - `cassandra:Alter`
 *
 * - `cassandra:AlterMultiRegionResource`
 *
 * - `cassandra:Create`
 *
 * - `cassandra:CreateMultiRegionResource`
 *
 * - `cassandra:Select`
 *
 * - `cassandra:SelectMultiRegionResource`
 *
 * - `cassandra:Modify`
 *
 * - `cassandra:ModifyMultiRegionResource`
 *
 * If the keyspace contains a table that is configured in provisioned mode with auto scaling enabled, the following additional IAM actions need to be allowed.
 *
 * - `application-autoscaling:RegisterScalableTarget`
 *
 * - `application-autoscaling:DeregisterScalableTarget`
 *
 * - `application-autoscaling:DescribeScalableTargets`
 *
 * - `application-autoscaling:PutScalingPolicy`
 *
 * - `application-autoscaling:DescribeScalingPolicies`
 *
 * To use the `UpdateKeyspace` API, the IAM principal also needs permissions to create a service-linked role with the following elements:
 *
 * - `iam:CreateServiceLinkedRole` - The **action** the principal can perform.
 *
 * - `arn:aws:iam::*:role/aws-service-role/replication.cassandra.amazonaws.com/AWSServiceRoleForKeyspacesReplication` - The **resource** that the action can be performed on.
 *
 * - `iam:AWSServiceName: replication.cassandra.amazonaws.com` - The only Amazon Web Services service that this role can be attached to is Amazon Keyspaces.
 *
 * For more information, see Configure the IAM permissions required to add an Amazon Web Services Region to a keyspace in the *Amazon Keyspaces Developer Guide*.
 */
export const updateKeyspace: API.OperationMethod<
  UpdateKeyspaceRequest,
  UpdateKeyspaceResponse,
  UpdateKeyspaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      keyspaceName: 0,
      replicationSpecification: i_ReplicationSpecification,
      clientSideTimestamps: i_ClientSideTimestamps,
    },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateKeyspace",
})) as any;

export type UpdateTableError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Adds new columns to the table or updates one of the table's settings, for example capacity mode, auto scaling, encryption, point-in-time recovery, or ttl settings. Note that you can only update one specific table setting per update operation.
 */
export const updateTable: API.OperationMethod<
  UpdateTableRequest,
  UpdateTableResponse,
  UpdateTableError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      keyspaceName: 0,
      tableName: 0,
      addColumns: D.list(i_ColumnDefinition),
      capacitySpecification: i_CapacitySpecification,
      encryptionSpecification: i_EncryptionSpecification,
      pointInTimeRecovery: i_PointInTimeRecovery,
      ttl: i_TimeToLive,
      defaultTimeToLive: 0,
      clientSideTimestamps: i_ClientSideTimestamps,
      autoScalingSpecification: i_AutoScalingSpecification,
      replicaSpecifications: D.list(i_ReplicaSpecification),
      cdcSpecification: i_CdcSpecification,
      warmThroughputSpecification: i_WarmThroughputSpecification,
    },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateTable",
})) as any;

const i_AutoScalingSpecification: D.LazyStruct = () => ({
  writeCapacityAutoScaling: i_AutoScalingSettings,
  readCapacityAutoScaling: i_AutoScalingSettings,
});
const i_CapacitySpecification: D.LazyStruct = () => ({
  throughputMode: 0,
  readCapacityUnits: 0,
  writeCapacityUnits: 0,
});
const i_CdcSpecification: D.LazyStruct = () => ({
  status: 0,
  viewType: 0,
  tags: D.list(i_Tag),
  propagateTags: 0,
});
const i_ClientSideTimestamps: D.LazyStruct = () => ({ status: 0 });
const i_ColumnDefinition: D.LazyStruct = () => ({ name: 0, type: 0 });
const i_EncryptionSpecification: D.LazyStruct = () => ({
  type: 0,
  kmsKeyIdentifier: 0,
});
const i_PointInTimeRecovery: D.LazyStruct = () => ({ status: 0 });
const i_ReplicaSpecification: D.LazyStruct = () => ({
  region: 0,
  readCapacityUnits: 0,
  readCapacityAutoScaling: i_AutoScalingSettings,
});
const i_ReplicationSpecification: D.LazyStruct = () => ({
  replicationStrategy: 0,
  regionList: 0,
});
const i_Tag: D.LazyStruct = () => ({ key: 0, value: 0 });
const i_TimeToLive: D.LazyStruct = () => ({ status: 0 });
const i_WarmThroughputSpecification: D.LazyStruct = () => ({
  readUnitsPerSecond: 0,
  writeUnitsPerSecond: 0,
});
const o_CapacitySpecificationSummary: D.LazyStruct = () => ({
  lastUpdateToPayPerRequestTimestamp: D.ts,
});
const i_AutoScalingSettings: D.LazyStruct = () => ({
  autoScalingDisabled: 0,
  minimumUnits: 0,
  maximumUnits: 0,
  scalingPolicy: {
    targetTrackingScalingPolicyConfiguration: {
      disableScaleIn: 0,
      scaleInCooldown: 0,
      scaleOutCooldown: 0,
      targetValue: 0,
    },
  },
});
