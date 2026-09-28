import type * as HttpClient from "effect/unstable/http/HttpClient";
import * as API from "@distilled.cloud/core/api";
import * as D from "@distilled.cloud/core/shape";
import * as TE from "@distilled.cloud/core/error-class";
import { AwsProtocol } from "../protocol.ts";
import { awsJson1_1Protocol } from "../protocols/aws-json.ts";
import { Retry } from "../retry.ts";
import type * as T from "../types.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
const svc: T.ServiceInfo = {
  sdkId: "Athena",
  target: "AmazonAthena",
  version: "2017-05-18",
  sigv4: "athena",
  protocol: awsJson1_1Protocol,
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
                `https://athena-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://athena-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://athena.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://athena.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class DataCatalogNotFound
  extends /*@__PURE__*/ TE.TaggedError(
    "DataCatalogNotFound",
    ["NotFoundError"],
    {
      synthetic: {
        from: "InvalidRequestException",
        message: { matches: "DataCatalog.*not found" },
      },
    },
  )<{ readonly AthenaErrorCode?: string; readonly message?: string }> {}
export class InternalServerException
  extends /*@__PURE__*/ TE.TaggedError("InternalServerException")<{
    readonly message?: string;
  }> {}
export class InvalidRequestException
  extends /*@__PURE__*/ TE.TaggedError("InvalidRequestException")<{
    readonly AthenaErrorCode?: string;
    readonly message?: string;
  }> {}
export class MetadataException
  extends /*@__PURE__*/ TE.TaggedError("MetadataException")<{
    readonly message?: string;
  }> {}
export class NamedQueryNotFound
  extends /*@__PURE__*/ TE.TaggedError(
    "NamedQueryNotFound",
    ["NotFoundError"],
    {
      synthetic: {
        from: "InvalidRequestException",
        message: { matches: "NamedQuery.*does not exist" },
      },
    },
  )<{ readonly AthenaErrorCode?: string; readonly message?: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError("ResourceNotFoundException")<{
    readonly message?: string;
    readonly ResourceName?: string;
  }> {}
export class SessionAlreadyExistsException
  extends /*@__PURE__*/ TE.TaggedError("SessionAlreadyExistsException", [
    "AlreadyExistsError",
  ])<{ readonly message?: string }> {}
export class TooManyRequestsException
  extends /*@__PURE__*/ TE.TaggedError("TooManyRequestsException")<{
    readonly message?: string;
    readonly Reason?: ThrottleReason;
  }> {}
export class WorkGroupNotFound
  extends /*@__PURE__*/ TE.TaggedError("WorkGroupNotFound", ["NotFoundError"], {
    synthetic: {
      from: "InvalidRequestException",
      message: { matches: "WorkGroup.*not found" },
    },
  })<{ readonly AthenaErrorCode?: string; readonly message?: string }> {}
export type NamedQueryId = string;
export type NamedQueryIdList = string[];
export interface BatchGetNamedQueryInput {
  NamedQueryIds: string[];
}
export type NameString = string;
export type DescriptionString = string;
export type DatabaseString = string;
export type QueryString = string;
export type WorkGroupName = string;
export interface NamedQuery {
  Name: string;
  Description?: string;
  Database: string;
  QueryString: string;
  NamedQueryId?: string;
  WorkGroup?: string;
}
export type NamedQueryList = NamedQuery[];
export type ErrorCode = string;
export type ErrorMessage = string;
export interface UnprocessedNamedQueryId {
  NamedQueryId?: string;
  ErrorCode?: string;
  ErrorMessage?: string;
}
export type UnprocessedNamedQueryIdList = UnprocessedNamedQueryId[];
export interface BatchGetNamedQueryOutput {
  NamedQueries?: NamedQuery[];
  UnprocessedNamedQueryIds?: UnprocessedNamedQueryId[];
}
export type StatementName = string;
export type PreparedStatementNameList = string[];
export interface BatchGetPreparedStatementInput {
  PreparedStatementNames: string[];
  WorkGroup: string;
}
export interface PreparedStatement {
  StatementName?: string;
  QueryStatement?: string;
  WorkGroupName?: string;
  Description?: string;
  LastModifiedTime?: Date;
}
export type PreparedStatementDetailsList = PreparedStatement[];
export interface UnprocessedPreparedStatementName {
  StatementName?: string;
  ErrorCode?: string;
  ErrorMessage?: string;
}
export type UnprocessedPreparedStatementNameList =
  UnprocessedPreparedStatementName[];
export interface BatchGetPreparedStatementOutput {
  PreparedStatements?: PreparedStatement[];
  UnprocessedPreparedStatementNames?: UnprocessedPreparedStatementName[];
}
export type QueryExecutionId = string;
export type QueryExecutionIdList = string[];
export interface BatchGetQueryExecutionInput {
  QueryExecutionIds: string[];
}
export type StatementType = "DDL" | "DML" | "UTILITY" | (string & {});
export type KmsKey = string;
export interface ManagedQueryResultsEncryptionConfiguration {
  KmsKey: string;
}
export interface ManagedQueryResultsConfiguration {
  Enabled: boolean;
  EncryptionConfiguration?: ManagedQueryResultsEncryptionConfiguration;
}
export type ResultOutputLocation = string;
export type EncryptionOption = "SSE_S3" | "SSE_KMS" | "CSE_KMS" | (string & {});
export interface EncryptionConfiguration {
  EncryptionOption: EncryptionOption;
  KmsKey?: string;
}
export type AwsAccountId = string;
export type S3AclOption = "BUCKET_OWNER_FULL_CONTROL" | (string & {});
export interface AclConfiguration {
  S3AclOption: S3AclOption;
}
export interface ResultConfiguration {
  OutputLocation?: string;
  EncryptionConfiguration?: EncryptionConfiguration;
  ExpectedBucketOwner?: string;
  AclConfiguration?: AclConfiguration;
}
export type Age = number;
export interface ResultReuseByAgeConfiguration {
  Enabled: boolean;
  MaxAgeInMinutes?: number;
}
export interface ResultReuseConfiguration {
  ResultReuseByAgeConfiguration?: ResultReuseByAgeConfiguration;
}
export type CatalogNameString = string;
export interface QueryExecutionContext {
  Database?: string;
  Catalog?: string;
}
export type QueryExecutionState =
  | "QUEUED"
  | "RUNNING"
  | "SUCCEEDED"
  | "FAILED"
  | "CANCELLED"
  | (string & {});
export type ErrorCategory = number;
export type ErrorType = number;
export interface AthenaError {
  ErrorCategory?: number;
  ErrorType?: number;
  Retryable?: boolean;
  ErrorMessage?: string;
}
export interface QueryExecutionStatus {
  State?: QueryExecutionState;
  StateChangeReason?: string;
  SubmissionDateTime?: Date;
  CompletionDateTime?: Date;
  AthenaError?: AthenaError;
}
export interface ResultReuseInformation {
  ReusedPreviousResult: boolean;
}
export type DpuCount = number;
export interface QueryExecutionStatistics {
  EngineExecutionTimeInMillis?: number;
  DataScannedInBytes?: number;
  DataManifestLocation?: string;
  TotalExecutionTimeInMillis?: number;
  QueryQueueTimeInMillis?: number;
  ServicePreProcessingTimeInMillis?: number;
  QueryPlanningTimeInMillis?: number;
  ServiceProcessingTimeInMillis?: number;
  ResultReuseInformation?: ResultReuseInformation;
  DpuCount?: number;
}
export interface EngineVersion {
  SelectedEngineVersion?: string;
  EffectiveEngineVersion?: string;
}
export type ExecutionParameter = string;
export type ExecutionParameters = string[];
export type BoxedBoolean = boolean;
export type AuthenticationType = "DIRECTORY_IDENTITY" | (string & {});
export interface QueryResultsS3AccessGrantsConfiguration {
  EnableS3AccessGrants: boolean;
  CreateUserLevelPrefix?: boolean;
  AuthenticationType: AuthenticationType;
}
export interface QueryExecution {
  QueryExecutionId?: string;
  Query?: string;
  StatementType?: StatementType;
  ManagedQueryResultsConfiguration?: ManagedQueryResultsConfiguration;
  ResultConfiguration?: ResultConfiguration;
  ResultReuseConfiguration?: ResultReuseConfiguration;
  QueryExecutionContext?: QueryExecutionContext;
  Status?: QueryExecutionStatus;
  Statistics?: QueryExecutionStatistics;
  WorkGroup?: string;
  EngineVersion?: EngineVersion;
  ExecutionParameters?: string[];
  SubstatementType?: string;
  QueryResultsS3AccessGrantsConfiguration?: QueryResultsS3AccessGrantsConfiguration;
}
export type QueryExecutionList = QueryExecution[];
export interface UnprocessedQueryExecutionId {
  QueryExecutionId?: string;
  ErrorCode?: string;
  ErrorMessage?: string;
}
export type UnprocessedQueryExecutionIdList = UnprocessedQueryExecutionId[];
export interface BatchGetQueryExecutionOutput {
  QueryExecutions?: QueryExecution[];
  UnprocessedQueryExecutionIds?: UnprocessedQueryExecutionId[];
}
export type CapacityReservationName = string;
export interface CancelCapacityReservationInput {
  Name: string;
}
export interface CancelCapacityReservationOutput {}
export type TargetDpusInteger = number;
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  Key?: string;
  Value?: string;
}
export type TagList = Tag[];
export interface CreateCapacityReservationInput {
  TargetDpus: number;
  Name: string;
  Tags?: Tag[];
}
export interface CreateCapacityReservationOutput {}
export type DataCatalogType =
  | "LAMBDA"
  | "GLUE"
  | "HIVE"
  | "FEDERATED"
  | (string & {});
export type KeyString = string;
export type ParametersMapValue = string;
export type ParametersMap = { [key: string]: string | undefined };
export interface CreateDataCatalogInput {
  Name: string;
  Type: DataCatalogType;
  Description?: string;
  Parameters?: { [key: string]: string | undefined };
  Tags?: Tag[];
}
export type DataCatalogStatus =
  | "CREATE_IN_PROGRESS"
  | "CREATE_COMPLETE"
  | "CREATE_FAILED"
  | "CREATE_FAILED_CLEANUP_IN_PROGRESS"
  | "CREATE_FAILED_CLEANUP_COMPLETE"
  | "CREATE_FAILED_CLEANUP_FAILED"
  | "DELETE_IN_PROGRESS"
  | "DELETE_COMPLETE"
  | "DELETE_FAILED"
  | (string & {});
export type ConnectionType =
  | "DYNAMODB"
  | "MYSQL"
  | "POSTGRESQL"
  | "REDSHIFT"
  | "ORACLE"
  | "SYNAPSE"
  | "SQLSERVER"
  | "DB2"
  | "OPENSEARCH"
  | "BIGQUERY"
  | "GOOGLECLOUDSTORAGE"
  | "HBASE"
  | "DOCUMENTDB"
  | "CMDB"
  | "TPCDS"
  | "TIMESTREAM"
  | "SAPHANA"
  | "SNOWFLAKE"
  | "DATALAKEGEN2"
  | "DB2AS400"
  | (string & {});
export interface DataCatalog {
  Name: string;
  Description?: string;
  Type: DataCatalogType;
  Parameters?: { [key: string]: string | undefined };
  Status?: DataCatalogStatus;
  ConnectionType?: ConnectionType;
  Error?: string;
}
export interface CreateDataCatalogOutput {
  DataCatalog?: DataCatalog;
}
export type IdempotencyToken = string;
export interface CreateNamedQueryInput {
  Name: string;
  Description?: string;
  Database: string;
  QueryString: string;
  ClientRequestToken?: string;
  WorkGroup?: string;
}
export interface CreateNamedQueryOutput {
  NamedQueryId?: string;
}
export type NotebookName = string;
export type ClientRequestToken = string;
export interface CreateNotebookInput {
  WorkGroup: string;
  Name: string;
  ClientRequestToken?: string;
}
export type NotebookId = string;
export interface CreateNotebookOutput {
  NotebookId?: string;
}
export interface CreatePreparedStatementInput {
  StatementName: string;
  WorkGroup: string;
  QueryStatement: string;
  Description?: string;
}
export interface CreatePreparedStatementOutput {}
export type SessionId = string;
export interface CreatePresignedNotebookUrlRequest {
  SessionId: string;
}
export type AuthToken = string;
export interface CreatePresignedNotebookUrlResponse {
  NotebookUrl: string;
  AuthToken: string;
  AuthTokenExpirationTime: number;
}
export type BytesScannedCutoffValue = number;
export type RoleArn = string;
export type LogGroupName = string;
export type LogStreamNamePrefix = string;
export type LogTypeKey = string;
export type LogTypeValue = string;
export type LogTypeValuesList = string[];
export type LogTypesMap = { [key: string]: string[] | undefined };
export interface CloudWatchLoggingConfiguration {
  Enabled: boolean;
  LogGroup?: string;
  LogStreamNamePrefix?: string;
  LogTypes?: { [key: string]: string[] | undefined };
}
export interface ManagedLoggingConfiguration {
  Enabled: boolean;
  KmsKey?: string;
}
export type S3OutputLocation = string;
export interface S3LoggingConfiguration {
  Enabled: boolean;
  KmsKey?: string;
  LogLocation?: string;
}
export interface MonitoringConfiguration {
  CloudWatchLoggingConfiguration?: CloudWatchLoggingConfiguration;
  ManagedLoggingConfiguration?: ManagedLoggingConfiguration;
  S3LoggingConfiguration?: S3LoggingConfiguration;
}
export type CoordinatorDpuSize = number;
export type MaxConcurrentDpus = number;
export type DefaultExecutorDpuSize = number;
export interface Classification {
  Name?: string;
  Properties?: { [key: string]: string | undefined };
}
export type ClassificationList = Classification[];
export interface EngineConfiguration {
  CoordinatorDpuSize?: number;
  MaxConcurrentDpus?: number;
  DefaultExecutorDpuSize?: number;
  AdditionalConfigs?: { [key: string]: string | undefined };
  SparkProperties?: { [key: string]: string | undefined };
  Classifications?: Classification[];
}
export interface CustomerContentEncryptionConfiguration {
  KmsKey: string;
}
export type IdentityCenterInstanceArn = string;
export interface IdentityCenterConfiguration {
  EnableIdentityCenter?: boolean;
  IdentityCenterInstanceArn?: string;
}
export interface WorkGroupConfiguration {
  ResultConfiguration?: ResultConfiguration;
  ManagedQueryResultsConfiguration?: ManagedQueryResultsConfiguration;
  EnforceWorkGroupConfiguration?: boolean;
  PublishCloudWatchMetricsEnabled?: boolean;
  BytesScannedCutoffPerQuery?: number;
  RequesterPaysEnabled?: boolean;
  EngineVersion?: EngineVersion;
  AdditionalConfiguration?: string;
  ExecutionRole?: string;
  MonitoringConfiguration?: MonitoringConfiguration;
  EngineConfiguration?: EngineConfiguration;
  CustomerContentEncryptionConfiguration?: CustomerContentEncryptionConfiguration;
  EnableMinimumEncryptionConfiguration?: boolean;
  IdentityCenterConfiguration?: IdentityCenterConfiguration;
  QueryResultsS3AccessGrantsConfiguration?: QueryResultsS3AccessGrantsConfiguration;
}
export type WorkGroupDescriptionString = string;
export interface CreateWorkGroupInput {
  Name: string;
  Configuration?: WorkGroupConfiguration;
  Description?: string;
  Tags?: Tag[];
}
export interface CreateWorkGroupOutput {}
export interface DeleteCapacityReservationInput {
  Name: string;
}
export interface DeleteCapacityReservationOutput {}
export interface DeleteDataCatalogInput {
  Name: string;
  DeleteCatalogOnly?: boolean;
}
export interface DeleteDataCatalogOutput {
  DataCatalog?: DataCatalog;
}
export interface DeleteNamedQueryInput {
  NamedQueryId: string;
}
export interface DeleteNamedQueryOutput {}
export interface DeleteNotebookInput {
  NotebookId: string;
}
export interface DeleteNotebookOutput {}
export interface DeletePreparedStatementInput {
  StatementName: string;
  WorkGroup: string;
}
export interface DeletePreparedStatementOutput {}
export interface DeleteWorkGroupInput {
  WorkGroup: string;
  RecursiveDeleteOption?: boolean;
}
export interface DeleteWorkGroupOutput {}
export interface ExportNotebookInput {
  NotebookId: string;
}
export type NotebookType = "IPYNB" | (string & {});
export interface NotebookMetadata {
  NotebookId?: string;
  Name?: string;
  WorkGroup?: string;
  CreationTime?: Date;
  Type?: NotebookType;
  LastModifiedTime?: Date;
}
export type Payload = string;
export interface ExportNotebookOutput {
  NotebookMetadata?: NotebookMetadata;
  Payload?: string;
}
export type CalculationExecutionId = string;
export interface GetCalculationExecutionRequest {
  CalculationExecutionId: string;
}
export type S3Uri = string;
export type CalculationExecutionState =
  | "CREATING"
  | "CREATED"
  | "QUEUED"
  | "RUNNING"
  | "CANCELING"
  | "CANCELED"
  | "COMPLETED"
  | "FAILED"
  | (string & {});
export interface CalculationStatus {
  SubmissionDateTime?: Date;
  CompletionDateTime?: Date;
  State?: CalculationExecutionState;
  StateChangeReason?: string;
}
export interface CalculationStatistics {
  DpuExecutionInMillis?: number;
  Progress?: string;
}
export type CalculationResultType = string;
export interface CalculationResult {
  StdOutS3Uri?: string;
  StdErrorS3Uri?: string;
  ResultS3Uri?: string;
  ResultType?: string;
}
export interface GetCalculationExecutionResponse {
  CalculationExecutionId?: string;
  SessionId?: string;
  Description?: string;
  WorkingDirectory?: string;
  Status?: CalculationStatus;
  Statistics?: CalculationStatistics;
  Result?: CalculationResult;
}
export interface GetCalculationExecutionCodeRequest {
  CalculationExecutionId: string;
}
export type CodeBlock = string;
export interface GetCalculationExecutionCodeResponse {
  CodeBlock?: string;
}
export interface GetCalculationExecutionStatusRequest {
  CalculationExecutionId: string;
}
export interface GetCalculationExecutionStatusResponse {
  Status?: CalculationStatus;
  Statistics?: CalculationStatistics;
}
export interface GetCapacityAssignmentConfigurationInput {
  CapacityReservationName: string;
}
export type WorkGroupNamesList = string[];
export interface CapacityAssignment {
  WorkGroupNames?: string[];
}
export type CapacityAssignmentsList = CapacityAssignment[];
export interface CapacityAssignmentConfiguration {
  CapacityReservationName?: string;
  CapacityAssignments?: CapacityAssignment[];
}
export interface GetCapacityAssignmentConfigurationOutput {
  CapacityAssignmentConfiguration: CapacityAssignmentConfiguration;
}
export interface GetCapacityReservationInput {
  Name: string;
}
export type CapacityReservationStatus =
  | "PENDING"
  | "ACTIVE"
  | "CANCELLING"
  | "CANCELLED"
  | "FAILED"
  | "UPDATE_PENDING"
  | (string & {});
export type AllocatedDpusInteger = number;
export type CapacityAllocationStatus =
  | "PENDING"
  | "SUCCEEDED"
  | "FAILED"
  | (string & {});
export interface CapacityAllocation {
  Status: CapacityAllocationStatus;
  StatusMessage?: string;
  RequestTime: Date;
  RequestCompletionTime?: Date;
}
export interface CapacityReservation {
  Name: string;
  Status: CapacityReservationStatus;
  TargetDpus: number;
  AllocatedDpus: number;
  LastAllocation?: CapacityAllocation;
  LastSuccessfulAllocationTime?: Date;
  CreationTime: Date;
}
export interface GetCapacityReservationOutput {
  CapacityReservation: CapacityReservation;
}
export interface GetDatabaseInput {
  CatalogName: string;
  DatabaseName: string;
  WorkGroup?: string;
}
export interface Database {
  Name: string;
  Description?: string;
  Parameters?: { [key: string]: string | undefined };
}
export interface GetDatabaseOutput {
  Database?: Database;
}
export interface GetDataCatalogInput {
  Name: string;
  WorkGroup?: string;
}
export interface GetDataCatalogOutput {
  DataCatalog?: DataCatalog;
}
export interface GetNamedQueryInput {
  NamedQueryId: string;
}
export interface GetNamedQueryOutput {
  NamedQuery?: NamedQuery;
}
export interface GetNotebookMetadataInput {
  NotebookId: string;
}
export interface GetNotebookMetadataOutput {
  NotebookMetadata?: NotebookMetadata;
}
export interface GetPreparedStatementInput {
  StatementName: string;
  WorkGroup: string;
}
export interface GetPreparedStatementOutput {
  PreparedStatement?: PreparedStatement;
}
export interface GetQueryExecutionInput {
  QueryExecutionId: string;
}
export interface GetQueryExecutionOutput {
  QueryExecution?: QueryExecution;
}
export type Token = string;
export type MaxQueryResults = number;
export type QueryResultType = "DATA_MANIFEST" | "DATA_ROWS" | (string & {});
export interface GetQueryResultsInput {
  QueryExecutionId: string;
  NextToken?: string;
  MaxResults?: number;
  QueryResultType?: QueryResultType;
}
export type DatumString = string;
export interface Datum {
  VarCharValue?: string;
}
export type DatumList = Datum[];
export interface Row {
  Data?: Datum[];
}
export type RowList = Row[];
export type ColumnNullable =
  | "NOT_NULL"
  | "NULLABLE"
  | "UNKNOWN"
  | (string & {});
export interface ColumnInfo {
  CatalogName?: string;
  SchemaName?: string;
  TableName?: string;
  Name: string;
  Label?: string;
  Type: string;
  Precision?: number;
  Scale?: number;
  Nullable?: ColumnNullable;
  CaseSensitive?: boolean;
}
export type ColumnInfoList = ColumnInfo[];
export interface ResultSetMetadata {
  ColumnInfo?: ColumnInfo[];
}
export interface ResultSet {
  Rows?: Row[];
  ResultSetMetadata?: ResultSetMetadata;
}
export interface GetQueryResultsOutput {
  UpdateCount?: number;
  ResultSet?: ResultSet;
  NextToken?: string;
}
export interface GetQueryRuntimeStatisticsInput {
  QueryExecutionId: string;
}
export interface QueryRuntimeStatisticsTimeline {
  QueryQueueTimeInMillis?: number;
  ServicePreProcessingTimeInMillis?: number;
  QueryPlanningTimeInMillis?: number;
  EngineExecutionTimeInMillis?: number;
  ServiceProcessingTimeInMillis?: number;
  TotalExecutionTimeInMillis?: number;
}
export interface QueryRuntimeStatisticsRows {
  InputRows?: number;
  InputBytes?: number;
  OutputBytes?: number;
  OutputRows?: number;
}
export type QueryStagePlanNodes = QueryStagePlanNode[];
export type StringList = string[];
export interface QueryStagePlanNode {
  Name?: string;
  Identifier?: string;
  Children?: QueryStagePlanNode[];
  RemoteSources?: string[];
}
export type QueryStages = QueryStage[];
export interface QueryStage {
  StageId?: number;
  State?: string;
  OutputBytes?: number;
  OutputRows?: number;
  InputBytes?: number;
  InputRows?: number;
  ExecutionTime?: number;
  QueryStagePlan?: QueryStagePlanNode;
  SubStages?: QueryStage[];
}
export interface QueryRuntimeStatistics {
  Timeline?: QueryRuntimeStatisticsTimeline;
  Rows?: QueryRuntimeStatisticsRows;
  OutputStage?: QueryStage;
}
export interface GetQueryRuntimeStatisticsOutput {
  QueryRuntimeStatistics?: QueryRuntimeStatistics;
}
export type AmazonResourceName = string;
export interface GetResourceDashboardRequest {
  ResourceARN: string;
}
export interface GetResourceDashboardResponse {
  Url: string;
}
export interface GetSessionRequest {
  SessionId: string;
}
export type SessionIdleTimeoutInMinutes = number;
export interface SessionConfiguration {
  ExecutionRole?: string;
  WorkingDirectory?: string;
  IdleTimeoutSeconds?: number;
  SessionIdleTimeoutInMinutes?: number;
  EncryptionConfiguration?: EncryptionConfiguration;
}
export type SessionState =
  | "CREATING"
  | "CREATED"
  | "IDLE"
  | "BUSY"
  | "TERMINATING"
  | "TERMINATED"
  | "DEGRADED"
  | "FAILED"
  | (string & {});
export interface SessionStatus {
  StartDateTime?: Date;
  LastModifiedDateTime?: Date;
  EndDateTime?: Date;
  IdleSinceDateTime?: Date;
  State?: SessionState;
  StateChangeReason?: string;
}
export interface SessionStatistics {
  DpuExecutionInMillis?: number;
}
export interface GetSessionResponse {
  SessionId?: string;
  Description?: string;
  WorkGroup?: string;
  EngineVersion?: string;
  EngineConfiguration?: EngineConfiguration;
  NotebookVersion?: string;
  MonitoringConfiguration?: MonitoringConfiguration;
  SessionConfiguration?: SessionConfiguration;
  Status?: SessionStatus;
  Statistics?: SessionStatistics;
}
export interface GetSessionEndpointRequest {
  SessionId: string;
}
export interface GetSessionEndpointResponse {
  EndpointUrl: string;
  AuthToken: string;
  AuthTokenExpirationTime: Date;
}
export interface GetSessionStatusRequest {
  SessionId: string;
}
export interface GetSessionStatusResponse {
  SessionId?: string;
  Status?: SessionStatus;
}
export interface GetTableMetadataInput {
  CatalogName: string;
  DatabaseName: string;
  TableName: string;
  WorkGroup?: string;
}
export type TableTypeString = string;
export type TypeString = string;
export type CommentString = string;
export interface Column {
  Name: string;
  Type?: string;
  Comment?: string;
}
export type ColumnList = Column[];
export interface TableMetadata {
  Name: string;
  CreateTime?: Date;
  LastAccessTime?: Date;
  TableType?: string;
  Columns?: Column[];
  PartitionKeys?: Column[];
  Parameters?: { [key: string]: string | undefined };
}
export interface GetTableMetadataOutput {
  TableMetadata?: TableMetadata;
}
export interface GetWorkGroupInput {
  WorkGroup: string;
}
export type WorkGroupState = "ENABLED" | "DISABLED" | (string & {});
export type IdentityCenterApplicationArn = string;
export interface WorkGroup {
  Name: string;
  State?: WorkGroupState;
  Configuration?: WorkGroupConfiguration;
  Description?: string;
  CreationTime?: Date;
  IdentityCenterApplicationArn?: string;
}
export interface GetWorkGroupOutput {
  WorkGroup?: WorkGroup;
}
export interface ImportNotebookInput {
  WorkGroup: string;
  Name: string;
  Payload?: string;
  Type: NotebookType;
  NotebookS3LocationUri?: string;
  ClientRequestToken?: string;
}
export interface ImportNotebookOutput {
  NotebookId?: string;
}
export type MaxApplicationDPUSizesCount = number;
export interface ListApplicationDPUSizesInput {
  MaxResults?: number;
  NextToken?: string;
}
export type SupportedDPUSizeList = number[];
export interface ApplicationDPUSizes {
  ApplicationRuntimeId?: string;
  SupportedDPUSizes?: number[];
}
export type ApplicationDPUSizesList = ApplicationDPUSizes[];
export interface ListApplicationDPUSizesOutput {
  ApplicationDPUSizes?: ApplicationDPUSizes[];
  NextToken?: string;
}
export type MaxCalculationsCount = number;
export type SessionManagerToken = string;
export interface ListCalculationExecutionsRequest {
  SessionId: string;
  StateFilter?: CalculationExecutionState;
  MaxResults?: number;
  NextToken?: string;
}
export interface CalculationSummary {
  CalculationExecutionId?: string;
  Description?: string;
  Status?: CalculationStatus;
}
export type CalculationsList = CalculationSummary[];
export interface ListCalculationExecutionsResponse {
  NextToken?: string;
  Calculations?: CalculationSummary[];
}
export type MaxCapacityReservationsCount = number;
export interface ListCapacityReservationsInput {
  NextToken?: string;
  MaxResults?: number;
}
export type CapacityReservationsList = CapacityReservation[];
export interface ListCapacityReservationsOutput {
  NextToken?: string;
  CapacityReservations: CapacityReservation[];
}
export type MaxDatabasesCount = number;
export interface ListDatabasesInput {
  CatalogName: string;
  NextToken?: string;
  MaxResults?: number;
  WorkGroup?: string;
}
export type DatabaseList = Database[];
export interface ListDatabasesOutput {
  DatabaseList?: Database[];
  NextToken?: string;
}
export type MaxDataCatalogsCount = number;
export interface ListDataCatalogsInput {
  NextToken?: string;
  MaxResults?: number;
  WorkGroup?: string;
}
export interface DataCatalogSummary {
  CatalogName?: string;
  Type?: DataCatalogType;
  Status?: DataCatalogStatus;
  ConnectionType?: ConnectionType;
  Error?: string;
}
export type DataCatalogSummaryList = DataCatalogSummary[];
export interface ListDataCatalogsOutput {
  DataCatalogsSummary?: DataCatalogSummary[];
  NextToken?: string;
}
export type MaxEngineVersionsCount = number;
export interface ListEngineVersionsInput {
  NextToken?: string;
  MaxResults?: number;
}
export type EngineVersionsList = EngineVersion[];
export interface ListEngineVersionsOutput {
  EngineVersions?: EngineVersion[];
  NextToken?: string;
}
export type ExecutorState =
  | "CREATING"
  | "CREATED"
  | "REGISTERED"
  | "TERMINATING"
  | "TERMINATED"
  | "FAILED"
  | (string & {});
export type MaxListExecutorsCount = number;
export interface ListExecutorsRequest {
  SessionId: string;
  ExecutorStateFilter?: ExecutorState;
  MaxResults?: number;
  NextToken?: string;
}
export type ExecutorId = string;
export type ExecutorType = "COORDINATOR" | "GATEWAY" | "WORKER" | (string & {});
export interface ExecutorsSummary {
  ExecutorId: string;
  ExecutorType?: ExecutorType;
  StartDateTime?: number;
  TerminationDateTime?: number;
  ExecutorState?: ExecutorState;
  ExecutorSize?: number;
}
export type ExecutorsSummaryList = ExecutorsSummary[];
export interface ListExecutorsResponse {
  SessionId: string;
  NextToken?: string;
  ExecutorsSummary?: ExecutorsSummary[];
}
export type MaxNamedQueriesCount = number;
export interface ListNamedQueriesInput {
  NextToken?: string;
  MaxResults?: number;
  WorkGroup?: string;
}
export interface ListNamedQueriesOutput {
  NamedQueryIds?: string[];
  NextToken?: string;
}
export interface FilterDefinition {
  Name?: string;
}
export type MaxNotebooksCount = number;
export interface ListNotebookMetadataInput {
  Filters?: FilterDefinition;
  NextToken?: string;
  MaxResults?: number;
  WorkGroup: string;
}
export type NotebookMetadataArray = NotebookMetadata[];
export interface ListNotebookMetadataOutput {
  NextToken?: string;
  NotebookMetadataList?: NotebookMetadata[];
}
export type MaxSessionsCount = number;
export interface ListNotebookSessionsRequest {
  NotebookId: string;
  MaxResults?: number;
  NextToken?: string;
}
export interface NotebookSessionSummary {
  SessionId?: string;
  CreationTime?: Date;
}
export type NotebookSessionsList = NotebookSessionSummary[];
export interface ListNotebookSessionsResponse {
  NotebookSessionsList: NotebookSessionSummary[];
  NextToken?: string;
}
export type MaxPreparedStatementsCount = number;
export interface ListPreparedStatementsInput {
  WorkGroup: string;
  NextToken?: string;
  MaxResults?: number;
}
export interface PreparedStatementSummary {
  StatementName?: string;
  LastModifiedTime?: Date;
}
export type PreparedStatementsList = PreparedStatementSummary[];
export interface ListPreparedStatementsOutput {
  PreparedStatements?: PreparedStatementSummary[];
  NextToken?: string;
}
export type MaxQueryExecutionsCount = number;
export interface ListQueryExecutionsInput {
  NextToken?: string;
  MaxResults?: number;
  WorkGroup?: string;
}
export interface ListQueryExecutionsOutput {
  QueryExecutionIds?: string[];
  NextToken?: string;
}
export interface ListSessionsRequest {
  WorkGroup: string;
  StateFilter?: SessionState;
  MaxResults?: number;
  NextToken?: string;
}
export interface SessionSummary {
  SessionId?: string;
  Description?: string;
  EngineVersion?: EngineVersion;
  NotebookVersion?: string;
  Status?: SessionStatus;
}
export type SessionsList = SessionSummary[];
export interface ListSessionsResponse {
  NextToken?: string;
  Sessions?: SessionSummary[];
}
export type ExpressionString = string;
export type MaxTableMetadataCount = number;
export interface ListTableMetadataInput {
  CatalogName: string;
  DatabaseName: string;
  Expression?: string;
  NextToken?: string;
  MaxResults?: number;
  WorkGroup?: string;
}
export type TableMetadataList = TableMetadata[];
export interface ListTableMetadataOutput {
  TableMetadataList?: TableMetadata[];
  NextToken?: string;
}
export type MaxTagsCount = number;
export interface ListTagsForResourceInput {
  ResourceARN: string;
  NextToken?: string;
  MaxResults?: number;
}
export interface ListTagsForResourceOutput {
  Tags?: Tag[];
  NextToken?: string;
}
export type MaxWorkGroupsCount = number;
export interface ListWorkGroupsInput {
  NextToken?: string;
  MaxResults?: number;
}
export interface WorkGroupSummary {
  Name?: string;
  State?: WorkGroupState;
  Description?: string;
  CreationTime?: Date;
  EngineVersion?: EngineVersion;
  IdentityCenterApplicationArn?: string;
}
export type WorkGroupsList = WorkGroupSummary[];
export interface ListWorkGroupsOutput {
  WorkGroups?: WorkGroupSummary[];
  NextToken?: string;
}
export interface PutCapacityAssignmentConfigurationInput {
  CapacityReservationName: string;
  CapacityAssignments: CapacityAssignment[];
}
export interface PutCapacityAssignmentConfigurationOutput {}
export interface CalculationConfiguration {
  CodeBlock?: string;
}
export interface StartCalculationExecutionRequest {
  SessionId: string;
  Description?: string;
  CalculationConfiguration?: CalculationConfiguration;
  CodeBlock?: string;
  ClientRequestToken?: string;
}
export interface StartCalculationExecutionResponse {
  CalculationExecutionId?: string;
  State?: CalculationExecutionState;
}
export interface StartQueryExecutionInput {
  QueryString: string;
  ClientRequestToken?: string;
  QueryExecutionContext?: QueryExecutionContext;
  ResultConfiguration?: ResultConfiguration;
  WorkGroup?: string;
  ExecutionParameters?: string[];
  ResultReuseConfiguration?: ResultReuseConfiguration;
  EngineConfiguration?: EngineConfiguration;
}
export interface StartQueryExecutionOutput {
  QueryExecutionId?: string;
}
export interface StartSessionRequest {
  Description?: string;
  WorkGroup: string;
  EngineConfiguration: EngineConfiguration;
  ExecutionRole?: string;
  MonitoringConfiguration?: MonitoringConfiguration;
  NotebookVersion?: string;
  SessionIdleTimeoutInMinutes?: number;
  ClientRequestToken?: string;
  Tags?: Tag[];
  CopyWorkGroupTags?: boolean;
}
export interface StartSessionResponse {
  SessionId?: string;
  State?: SessionState;
}
export interface StopCalculationExecutionRequest {
  CalculationExecutionId: string;
}
export interface StopCalculationExecutionResponse {
  State?: CalculationExecutionState;
}
export interface StopQueryExecutionInput {
  QueryExecutionId: string;
}
export interface StopQueryExecutionOutput {}
export interface TagResourceInput {
  ResourceARN: string;
  Tags: Tag[];
}
export interface TagResourceOutput {}
export interface TerminateSessionRequest {
  SessionId: string;
}
export interface TerminateSessionResponse {
  State?: SessionState;
}
export type TagKeyList = string[];
export interface UntagResourceInput {
  ResourceARN: string;
  TagKeys: string[];
}
export interface UntagResourceOutput {}
export interface UpdateCapacityReservationInput {
  TargetDpus: number;
  Name: string;
}
export interface UpdateCapacityReservationOutput {}
export interface UpdateDataCatalogInput {
  Name: string;
  Type: DataCatalogType;
  Description?: string;
  Parameters?: { [key: string]: string | undefined };
}
export interface UpdateDataCatalogOutput {}
export type NamedQueryDescriptionString = string;
export interface UpdateNamedQueryInput {
  NamedQueryId: string;
  Name: string;
  Description?: string;
  QueryString: string;
}
export interface UpdateNamedQueryOutput {}
export interface UpdateNotebookInput {
  NotebookId: string;
  Payload: string;
  Type: NotebookType;
  SessionId?: string;
  ClientRequestToken?: string;
}
export interface UpdateNotebookOutput {}
export interface UpdateNotebookMetadataInput {
  NotebookId: string;
  ClientRequestToken?: string;
  Name: string;
}
export interface UpdateNotebookMetadataOutput {}
export interface UpdatePreparedStatementInput {
  StatementName: string;
  WorkGroup: string;
  QueryStatement: string;
  Description?: string;
}
export interface UpdatePreparedStatementOutput {}
export interface ResultConfigurationUpdates {
  OutputLocation?: string;
  RemoveOutputLocation?: boolean;
  EncryptionConfiguration?: EncryptionConfiguration;
  RemoveEncryptionConfiguration?: boolean;
  ExpectedBucketOwner?: string;
  RemoveExpectedBucketOwner?: boolean;
  AclConfiguration?: AclConfiguration;
  RemoveAclConfiguration?: boolean;
}
export interface ManagedQueryResultsConfigurationUpdates {
  Enabled?: boolean;
  EncryptionConfiguration?: ManagedQueryResultsEncryptionConfiguration;
  RemoveEncryptionConfiguration?: boolean;
}
export interface WorkGroupConfigurationUpdates {
  EnforceWorkGroupConfiguration?: boolean;
  ResultConfigurationUpdates?: ResultConfigurationUpdates;
  ManagedQueryResultsConfigurationUpdates?: ManagedQueryResultsConfigurationUpdates;
  PublishCloudWatchMetricsEnabled?: boolean;
  BytesScannedCutoffPerQuery?: number;
  RemoveBytesScannedCutoffPerQuery?: boolean;
  RequesterPaysEnabled?: boolean;
  EngineVersion?: EngineVersion;
  RemoveCustomerContentEncryptionConfiguration?: boolean;
  AdditionalConfiguration?: string;
  ExecutionRole?: string;
  CustomerContentEncryptionConfiguration?: CustomerContentEncryptionConfiguration;
  EnableMinimumEncryptionConfiguration?: boolean;
  QueryResultsS3AccessGrantsConfiguration?: QueryResultsS3AccessGrantsConfiguration;
  MonitoringConfiguration?: MonitoringConfiguration;
  EngineConfiguration?: EngineConfiguration;
}
export interface UpdateWorkGroupInput {
  WorkGroup: string;
  Description?: string;
  ConfigurationUpdates?: WorkGroupConfigurationUpdates;
  State?: WorkGroupState;
}
export interface UpdateWorkGroupOutput {}
export type ThrottleReason = "CONCURRENT_QUERY_LIMIT_EXCEEDED" | (string & {});
export type BatchGetNamedQueryError =
  | InternalServerException
  | InvalidRequestException
  | CommonErrors;
/**
 * Returns the details of a single named query or a list of up to 50 queries, which you
 * provide as an array of query ID strings. Requires you to have access to the workgroup in
 * which the queries were saved. Use ListNamedQueriesInput to get the
 * list of named query IDs in the specified workgroup. If information could not be
 * retrieved for a submitted query ID, information about the query ID submitted is listed
 * under UnprocessedNamedQueryId. Named queries differ from executed
 * queries. Use BatchGetQueryExecutionInput to get details about each
 * unique query execution, and ListQueryExecutionsInput to get a list of
 * query execution IDs.
 */
export const batchGetNamedQuery: API.OperationMethod<
  BatchGetNamedQueryInput,
  BatchGetNamedQueryOutput,
  BatchGetNamedQueryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { NamedQueryIds: 0 } },
  errors: [InternalServerException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetNamedQuery",
})) as any;

export type BatchGetPreparedStatementError =
  | InternalServerException
  | InvalidRequestException
  | CommonErrors;
/**
 * Returns the details of a single prepared statement or a list of up to 256 prepared
 * statements for the array of prepared statement names that you provide. Requires you to
 * have access to the workgroup to which the prepared statements belong. If a prepared
 * statement cannot be retrieved for the name specified, the statement is listed in
 * `UnprocessedPreparedStatementNames`.
 */
export const batchGetPreparedStatement: API.OperationMethod<
  BatchGetPreparedStatementInput,
  BatchGetPreparedStatementOutput,
  BatchGetPreparedStatementError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { PreparedStatementNames: 0, WorkGroup: 0 },
    output: { PreparedStatements: D.list(o_PreparedStatement) },
  },
  errors: [InternalServerException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetPreparedStatement",
})) as any;

export type BatchGetQueryExecutionError =
  | InternalServerException
  | InvalidRequestException
  | CommonErrors;
/**
 * Returns the details of a single query execution or a list of up to 50 query
 * executions, which you provide as an array of query execution ID strings. Requires you to
 * have access to the workgroup in which the queries ran. To get a list of query execution
 * IDs, use ListQueryExecutionsInput$WorkGroup. Query executions differ
 * from named (saved) queries. Use BatchGetNamedQueryInput to get details
 * about named queries.
 */
export const batchGetQueryExecution: API.OperationMethod<
  BatchGetQueryExecutionInput,
  BatchGetQueryExecutionOutput,
  BatchGetQueryExecutionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { QueryExecutionIds: 0 },
    output: { QueryExecutions: D.list(o_QueryExecution) },
  },
  errors: [InternalServerException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetQueryExecution",
})) as any;

export type CancelCapacityReservationError =
  | InternalServerException
  | InvalidRequestException
  | CommonErrors;
/**
 * Cancels the capacity reservation with the specified name. Cancelled reservations
 * remain in your account and will be deleted 45 days after cancellation. During the 45
 * days, you cannot re-purpose or reuse a reservation that has been cancelled, but you can
 * refer to its tags and view it for historical reference.
 */
export const cancelCapacityReservation: API.OperationMethod<
  CancelCapacityReservationInput,
  CancelCapacityReservationOutput,
  CancelCapacityReservationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { Name: 0 } },
  errors: [InternalServerException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelCapacityReservation",
})) as any;

export type CreateCapacityReservationError =
  | InternalServerException
  | InvalidRequestException
  | CommonErrors;
/**
 * Creates a capacity reservation with the specified name and number of requested data
 * processing units.
 */
export const createCapacityReservation: API.OperationMethod<
  CreateCapacityReservationInput,
  CreateCapacityReservationOutput,
  CreateCapacityReservationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { TargetDpus: 0, Name: 0, Tags: D.list(i_Tag) },
  },
  errors: [InternalServerException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCapacityReservation",
})) as any;

export type CreateDataCatalogError =
  | InternalServerException
  | InvalidRequestException
  | CommonErrors;
/**
 * Creates (registers) a data catalog with the specified name and properties. Catalogs
 * created are visible to all users of the same Amazon Web Services account.
 *
 * For a `FEDERATED` catalog, this API operation creates the following
 * resources.
 *
 * - CFN Stack Name with a maximum length of 128 characters and prefix
 * `athenafederatedcatalog-CATALOG_NAME_SANITIZED` with length 23
 * characters.
 *
 * - Lambda Function Name with a maximum length of 64 characters and prefix
 * `athenafederatedcatalog_CATALOG_NAME_SANITIZED` with length 23
 * characters.
 *
 * - Glue Connection Name with a maximum length of 255 characters and a prefix
 * `athenafederatedcatalog_CATALOG_NAME_SANITIZED` with length 23
 * characters.
 */
export const createDataCatalog: API.OperationMethod<
  CreateDataCatalogInput,
  CreateDataCatalogOutput,
  CreateDataCatalogError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Name: 0,
      Type: 0,
      Description: 0,
      Parameters: 0,
      Tags: D.list(i_Tag),
    },
  },
  errors: [InternalServerException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDataCatalog",
})) as any;

export type CreateNamedQueryError =
  | InternalServerException
  | InvalidRequestException
  | CommonErrors;
/**
 * Creates a named query in the specified workgroup. Requires that you have access to the
 * workgroup.
 */
export const createNamedQuery: API.OperationMethod<
  CreateNamedQueryInput,
  CreateNamedQueryOutput,
  CreateNamedQueryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Name: 0,
      Description: 0,
      Database: 0,
      QueryString: 0,
      ClientRequestToken: D.m({ idempotency: true }),
      WorkGroup: 0,
    },
  },
  errors: [InternalServerException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateNamedQuery",
})) as any;

export type CreateNotebookError =
  | InternalServerException
  | InvalidRequestException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates an empty `ipynb` file in the specified Apache Spark enabled
 * workgroup. Throws an error if a file in the workgroup with the same name already
 * exists.
 */
export const createNotebook: API.OperationMethod<
  CreateNotebookInput,
  CreateNotebookOutput,
  CreateNotebookError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { WorkGroup: 0, Name: 0, ClientRequestToken: 0 },
  },
  errors: [
    InternalServerException,
    InvalidRequestException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateNotebook",
})) as any;

export type CreatePreparedStatementError =
  | InternalServerException
  | InvalidRequestException
  | CommonErrors;
/**
 * Creates a prepared statement for use with SQL queries in Athena.
 */
export const createPreparedStatement: API.OperationMethod<
  CreatePreparedStatementInput,
  CreatePreparedStatementOutput,
  CreatePreparedStatementError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      StatementName: 0,
      WorkGroup: 0,
      QueryStatement: 0,
      Description: 0,
    },
  },
  errors: [InternalServerException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePreparedStatement",
})) as any;

export type CreatePresignedNotebookUrlError =
  | InternalServerException
  | InvalidRequestException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Gets an authentication token and the URL at which the notebook can be accessed. During
 * programmatic access, `CreatePresignedNotebookUrl` must be called every 10
 * minutes to refresh the authentication token. For information about granting programmatic
 * access, see Grant
 * programmatic access.
 */
export const createPresignedNotebookUrl: API.OperationMethod<
  CreatePresignedNotebookUrlRequest,
  CreatePresignedNotebookUrlResponse,
  CreatePresignedNotebookUrlError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { SessionId: 0 } },
  errors: [
    InternalServerException,
    InvalidRequestException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePresignedNotebookUrl",
})) as any;

export type CreateWorkGroupError =
  | InternalServerException
  | InvalidRequestException
  | CommonErrors;
/**
 * Creates a workgroup with the specified name. A workgroup can be an Apache Spark
 * enabled workgroup or an Athena SQL workgroup.
 */
export const createWorkGroup: API.OperationMethod<
  CreateWorkGroupInput,
  CreateWorkGroupOutput,
  CreateWorkGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Name: 0,
      Configuration: {
        ResultConfiguration: i_ResultConfiguration,
        ManagedQueryResultsConfiguration: {
          Enabled: 0,
          EncryptionConfiguration: i_ManagedQueryResultsEncryptionConfiguration,
        },
        EnforceWorkGroupConfiguration: 0,
        PublishCloudWatchMetricsEnabled: 0,
        BytesScannedCutoffPerQuery: 0,
        RequesterPaysEnabled: 0,
        EngineVersion: i_EngineVersion,
        AdditionalConfiguration: 0,
        ExecutionRole: 0,
        MonitoringConfiguration: i_MonitoringConfiguration,
        EngineConfiguration: i_EngineConfiguration,
        CustomerContentEncryptionConfiguration:
          i_CustomerContentEncryptionConfiguration,
        EnableMinimumEncryptionConfiguration: 0,
        IdentityCenterConfiguration: {
          EnableIdentityCenter: 0,
          IdentityCenterInstanceArn: 0,
        },
        QueryResultsS3AccessGrantsConfiguration:
          i_QueryResultsS3AccessGrantsConfiguration,
      },
      Description: 0,
      Tags: D.list(i_Tag),
    },
  },
  errors: [InternalServerException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateWorkGroup",
})) as any;

export type DeleteCapacityReservationError =
  | InternalServerException
  | InvalidRequestException
  | CommonErrors;
/**
 * Deletes a cancelled capacity reservation. A reservation must be cancelled before it
 * can be deleted. A deleted reservation is immediately removed from your account and can
 * no longer be referenced, including by its ARN. A deleted reservation cannot be called by
 * `GetCapacityReservation`, and deleted reservations do not appear in the
 * output of `ListCapacityReservations`.
 */
export const deleteCapacityReservation: API.OperationMethod<
  DeleteCapacityReservationInput,
  DeleteCapacityReservationOutput,
  DeleteCapacityReservationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { Name: 0 } },
  errors: [InternalServerException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCapacityReservation",
})) as any;

export type DeleteDataCatalogError =
  | InternalServerException
  | InvalidRequestException
  | DataCatalogNotFound
  | CommonErrors;
/**
 * Deletes a data catalog.
 */
export const deleteDataCatalog: API.OperationMethod<
  DeleteDataCatalogInput,
  DeleteDataCatalogOutput,
  DeleteDataCatalogError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { Name: 0, DeleteCatalogOnly: 0 } },
  errors: [
    InternalServerException,
    InvalidRequestException,
    DataCatalogNotFound,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDataCatalog",
})) as any;

export type DeleteNamedQueryError =
  | InternalServerException
  | InvalidRequestException
  | NamedQueryNotFound
  | CommonErrors;
/**
 * Deletes the named query if you have access to the workgroup in which the query was
 * saved.
 */
export const deleteNamedQuery: API.OperationMethod<
  DeleteNamedQueryInput,
  DeleteNamedQueryOutput,
  DeleteNamedQueryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { NamedQueryId: D.m({ idempotency: true }) },
  },
  errors: [
    InternalServerException,
    InvalidRequestException,
    NamedQueryNotFound,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteNamedQuery",
})) as any;

export type DeleteNotebookError =
  | InternalServerException
  | InvalidRequestException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes the specified notebook.
 */
export const deleteNotebook: API.OperationMethod<
  DeleteNotebookInput,
  DeleteNotebookOutput,
  DeleteNotebookError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { NotebookId: 0 } },
  errors: [
    InternalServerException,
    InvalidRequestException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteNotebook",
})) as any;

export type DeletePreparedStatementError =
  | InternalServerException
  | InvalidRequestException
  | ResourceNotFoundException
  | WorkGroupNotFound
  | CommonErrors;
/**
 * Deletes the prepared statement with the specified name from the specified
 * workgroup.
 */
export const deletePreparedStatement: API.OperationMethod<
  DeletePreparedStatementInput,
  DeletePreparedStatementOutput,
  DeletePreparedStatementError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { StatementName: 0, WorkGroup: 0 } },
  errors: [
    InternalServerException,
    InvalidRequestException,
    ResourceNotFoundException,
    WorkGroupNotFound,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePreparedStatement",
})) as any;

export type DeleteWorkGroupError =
  | InternalServerException
  | InvalidRequestException
  | CommonErrors;
/**
 * Deletes the workgroup with the specified name. The primary workgroup cannot be
 * deleted.
 */
export const deleteWorkGroup: API.OperationMethod<
  DeleteWorkGroupInput,
  DeleteWorkGroupOutput,
  DeleteWorkGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { WorkGroup: 0, RecursiveDeleteOption: 0 },
  },
  errors: [InternalServerException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteWorkGroup",
})) as any;

export type ExportNotebookError =
  | InternalServerException
  | InvalidRequestException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Exports the specified notebook and its metadata.
 */
export const exportNotebook: API.OperationMethod<
  ExportNotebookInput,
  ExportNotebookOutput,
  ExportNotebookError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { NotebookId: 0 },
    output: { NotebookMetadata: o_NotebookMetadata },
  },
  errors: [
    InternalServerException,
    InvalidRequestException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ExportNotebook",
})) as any;

export type GetCalculationExecutionError =
  | InternalServerException
  | InvalidRequestException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Describes a previously submitted calculation execution.
 */
export const getCalculationExecution: API.OperationMethod<
  GetCalculationExecutionRequest,
  GetCalculationExecutionResponse,
  GetCalculationExecutionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { CalculationExecutionId: 0 },
    output: { Status: o_CalculationStatus },
  },
  errors: [
    InternalServerException,
    InvalidRequestException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCalculationExecution",
})) as any;

export type GetCalculationExecutionCodeError =
  | InternalServerException
  | InvalidRequestException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Retrieves the unencrypted code that was executed for the calculation.
 */
export const getCalculationExecutionCode: API.OperationMethod<
  GetCalculationExecutionCodeRequest,
  GetCalculationExecutionCodeResponse,
  GetCalculationExecutionCodeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { CalculationExecutionId: 0 } },
  errors: [
    InternalServerException,
    InvalidRequestException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCalculationExecutionCode",
})) as any;

export type GetCalculationExecutionStatusError =
  | InternalServerException
  | InvalidRequestException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Gets the status of a current calculation.
 */
export const getCalculationExecutionStatus: API.OperationMethod<
  GetCalculationExecutionStatusRequest,
  GetCalculationExecutionStatusResponse,
  GetCalculationExecutionStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { CalculationExecutionId: 0 },
    output: { Status: o_CalculationStatus },
  },
  errors: [
    InternalServerException,
    InvalidRequestException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCalculationExecutionStatus",
})) as any;

export type GetCapacityAssignmentConfigurationError =
  | InternalServerException
  | InvalidRequestException
  | CommonErrors;
/**
 * Gets the capacity assignment configuration for a capacity reservation, if one
 * exists.
 */
export const getCapacityAssignmentConfiguration: API.OperationMethod<
  GetCapacityAssignmentConfigurationInput,
  GetCapacityAssignmentConfigurationOutput,
  GetCapacityAssignmentConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { CapacityReservationName: 0 } },
  errors: [InternalServerException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCapacityAssignmentConfiguration",
})) as any;

export type GetCapacityReservationError =
  | InternalServerException
  | InvalidRequestException
  | CommonErrors;
/**
 * Returns information about the capacity reservation with the specified name.
 */
export const getCapacityReservation: API.OperationMethod<
  GetCapacityReservationInput,
  GetCapacityReservationOutput,
  GetCapacityReservationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { Name: 0 },
    output: { CapacityReservation: o_CapacityReservation },
  },
  errors: [InternalServerException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCapacityReservation",
})) as any;

export type GetDatabaseError =
  | InternalServerException
  | InvalidRequestException
  | MetadataException
  | CommonErrors;
/**
 * Returns a database object for the specified database and data catalog.
 */
export const getDatabase: API.OperationMethod<
  GetDatabaseInput,
  GetDatabaseOutput,
  GetDatabaseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { CatalogName: 0, DatabaseName: 0, WorkGroup: 0 },
  },
  errors: [InternalServerException, InvalidRequestException, MetadataException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDatabase",
})) as any;

export type GetDataCatalogError =
  | InternalServerException
  | InvalidRequestException
  | DataCatalogNotFound
  | CommonErrors;
/**
 * Returns the specified data catalog.
 */
export const getDataCatalog: API.OperationMethod<
  GetDataCatalogInput,
  GetDataCatalogOutput,
  GetDataCatalogError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { Name: 0, WorkGroup: 0 } },
  errors: [
    InternalServerException,
    InvalidRequestException,
    DataCatalogNotFound,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDataCatalog",
})) as any;

export type GetNamedQueryError =
  | InternalServerException
  | InvalidRequestException
  | NamedQueryNotFound
  | CommonErrors;
/**
 * Returns information about a single query. Requires that you have access to the
 * workgroup in which the query was saved.
 */
export const getNamedQuery: API.OperationMethod<
  GetNamedQueryInput,
  GetNamedQueryOutput,
  GetNamedQueryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { NamedQueryId: 0 } },
  errors: [
    InternalServerException,
    InvalidRequestException,
    NamedQueryNotFound,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetNamedQuery",
})) as any;

export type GetNotebookMetadataError =
  | InternalServerException
  | InvalidRequestException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves notebook metadata for the specified notebook ID.
 */
export const getNotebookMetadata: API.OperationMethod<
  GetNotebookMetadataInput,
  GetNotebookMetadataOutput,
  GetNotebookMetadataError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { NotebookId: 0 },
    output: { NotebookMetadata: o_NotebookMetadata },
  },
  errors: [
    InternalServerException,
    InvalidRequestException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetNotebookMetadata",
})) as any;

export type GetPreparedStatementError =
  | InternalServerException
  | InvalidRequestException
  | ResourceNotFoundException
  | WorkGroupNotFound
  | CommonErrors;
/**
 * Retrieves the prepared statement with the specified name from the specified
 * workgroup.
 */
export const getPreparedStatement: API.OperationMethod<
  GetPreparedStatementInput,
  GetPreparedStatementOutput,
  GetPreparedStatementError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { StatementName: 0, WorkGroup: 0 },
    output: { PreparedStatement: o_PreparedStatement },
  },
  errors: [
    InternalServerException,
    InvalidRequestException,
    ResourceNotFoundException,
    WorkGroupNotFound,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPreparedStatement",
})) as any;

export type GetQueryExecutionError =
  | InternalServerException
  | InvalidRequestException
  | CommonErrors;
/**
 * Returns information about a single execution of a query if you have access to the
 * workgroup in which the query ran. Each time a query executes, information about the
 * query execution is saved with a unique ID.
 */
export const getQueryExecution: API.OperationMethod<
  GetQueryExecutionInput,
  GetQueryExecutionOutput,
  GetQueryExecutionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { QueryExecutionId: 0 },
    output: { QueryExecution: o_QueryExecution },
  },
  errors: [InternalServerException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetQueryExecution",
})) as any;

export type GetQueryResultsError =
  | InternalServerException
  | InvalidRequestException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Streams the results of a single query execution specified by
 * `QueryExecutionId` from the Athena query results location in
 * Amazon S3. For more information, see Working with query results, recent queries, and
 * output files in the *Amazon Athena User Guide*.
 * This request does not execute the query but returns results. Use StartQueryExecution to run a query.
 *
 * To stream query results successfully, the IAM principal with permission to call
 * `GetQueryResults` also must have permissions to the Amazon S3
 * `GetObject` action for the Athena query results location.
 *
 * IAM principals with permission to the Amazon S3
 * `GetObject` action for the query results location are able to retrieve
 * query results from Amazon S3 even if permission to the
 * `GetQueryResults` action is denied. To restrict user or role access,
 * ensure that Amazon S3 permissions to the Athena query location
 * are denied.
 */
export const getQueryResults: API.PaginatedOperationMethod<
  GetQueryResultsInput,
  GetQueryResultsOutput,
  GetQueryResultsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      QueryExecutionId: 0,
      NextToken: 0,
      MaxResults: 0,
      QueryResultType: 0,
    },
  },
  errors: [
    InternalServerException,
    InvalidRequestException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetQueryResults",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetQueryRuntimeStatisticsError =
  | InternalServerException
  | InvalidRequestException
  | CommonErrors;
/**
 * Returns query execution runtime statistics related to a single execution of a query if
 * you have access to the workgroup in which the query ran. Statistics from the
 * `Timeline` section of the response object are available as soon as QueryExecutionStatus$State is in a SUCCEEDED or FAILED state. The
 * remaining non-timeline statistics in the response (like stage-level input and output row
 * count and data size) are updated asynchronously and may not be available immediately
 * after a query completes or, in some cases, may not be returned. The non-timeline
 * statistics are also not included when a query has row-level filters defined in Lake Formation.
 */
export const getQueryRuntimeStatistics: API.OperationMethod<
  GetQueryRuntimeStatisticsInput,
  GetQueryRuntimeStatisticsOutput,
  GetQueryRuntimeStatisticsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { QueryExecutionId: 0 } },
  errors: [InternalServerException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetQueryRuntimeStatistics",
})) as any;

export type GetResourceDashboardError =
  | InternalServerException
  | InvalidRequestException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Gets the Live UI/Persistence UI for a session.
 */
export const getResourceDashboard: API.OperationMethod<
  GetResourceDashboardRequest,
  GetResourceDashboardResponse,
  GetResourceDashboardError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceARN: 0 } },
  errors: [
    InternalServerException,
    InvalidRequestException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetResourceDashboard",
})) as any;

export type GetSessionError =
  | InternalServerException
  | InvalidRequestException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Gets the full details of a previously created session, including the session status
 * and configuration.
 */
export const getSession: API.OperationMethod<
  GetSessionRequest,
  GetSessionResponse,
  GetSessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { SessionId: 0 },
    output: { Status: o_SessionStatus },
  },
  errors: [
    InternalServerException,
    InvalidRequestException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSession",
})) as any;

export type GetSessionEndpointError =
  | InternalServerException
  | InvalidRequestException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Gets a connection endpoint and authentication token for a given session Id.
 */
export const getSessionEndpoint: API.OperationMethod<
  GetSessionEndpointRequest,
  GetSessionEndpointResponse,
  GetSessionEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { SessionId: 0 },
    output: { AuthTokenExpirationTime: D.ts },
  },
  errors: [
    InternalServerException,
    InvalidRequestException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSessionEndpoint",
})) as any;

export type GetSessionStatusError =
  | InternalServerException
  | InvalidRequestException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Gets the current status of a session.
 */
export const getSessionStatus: API.OperationMethod<
  GetSessionStatusRequest,
  GetSessionStatusResponse,
  GetSessionStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { SessionId: 0 },
    output: { Status: o_SessionStatus },
  },
  errors: [
    InternalServerException,
    InvalidRequestException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSessionStatus",
})) as any;

export type GetTableMetadataError =
  | InternalServerException
  | InvalidRequestException
  | MetadataException
  | CommonErrors;
/**
 * Returns table metadata for the specified catalog, database, and table.
 */
export const getTableMetadata: API.OperationMethod<
  GetTableMetadataInput,
  GetTableMetadataOutput,
  GetTableMetadataError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { CatalogName: 0, DatabaseName: 0, TableName: 0, WorkGroup: 0 },
    output: { TableMetadata: o_TableMetadata },
  },
  errors: [InternalServerException, InvalidRequestException, MetadataException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTableMetadata",
})) as any;

export type GetWorkGroupError =
  | InternalServerException
  | InvalidRequestException
  | WorkGroupNotFound
  | CommonErrors;
/**
 * Returns information about the workgroup with the specified name.
 */
export const getWorkGroup: API.OperationMethod<
  GetWorkGroupInput,
  GetWorkGroupOutput,
  GetWorkGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { WorkGroup: 0 },
    output: { WorkGroup: { CreationTime: D.ts } },
  },
  errors: [InternalServerException, InvalidRequestException, WorkGroupNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetWorkGroup",
})) as any;

export type ImportNotebookError =
  | InternalServerException
  | InvalidRequestException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Imports a single `ipynb` file to a Spark enabled workgroup. To import the
 * notebook, the request must specify a value for either `Payload` or
 * `NoteBookS3LocationUri`. If neither is specified or both are specified,
 * an `InvalidRequestException` occurs. The maximum file size that can be
 * imported is 10 megabytes. If an `ipynb` file with the same name already
 * exists in the workgroup, throws an error.
 */
export const importNotebook: API.OperationMethod<
  ImportNotebookInput,
  ImportNotebookOutput,
  ImportNotebookError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      WorkGroup: 0,
      Name: 0,
      Payload: 0,
      Type: 0,
      NotebookS3LocationUri: 0,
      ClientRequestToken: 0,
    },
  },
  errors: [
    InternalServerException,
    InvalidRequestException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ImportNotebook",
})) as any;

export type ListApplicationDPUSizesError =
  | InternalServerException
  | InvalidRequestException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Returns the supported DPU sizes for the supported application runtimes (for example,
 * `Athena notebook version 1`).
 */
export const listApplicationDPUSizes: API.PaginatedOperationMethod<
  ListApplicationDPUSizesInput,
  ListApplicationDPUSizesOutput,
  ListApplicationDPUSizesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: { service: svc, input: { MaxResults: 0, NextToken: 0 } },
  errors: [
    InternalServerException,
    InvalidRequestException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListApplicationDPUSizes",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListCalculationExecutionsError =
  | InternalServerException
  | InvalidRequestException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Lists the calculations that have been submitted to a session in descending order.
 * Newer calculations are listed first; older calculations are listed later.
 */
export const listCalculationExecutions: API.PaginatedOperationMethod<
  ListCalculationExecutionsRequest,
  ListCalculationExecutionsResponse,
  ListCalculationExecutionsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { SessionId: 0, StateFilter: 0, MaxResults: 0, NextToken: 0 },
    output: { Calculations: D.list({ Status: o_CalculationStatus }) },
  },
  errors: [
    InternalServerException,
    InvalidRequestException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCalculationExecutions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListCapacityReservationsError =
  | InternalServerException
  | InvalidRequestException
  | CommonErrors;
/**
 * Lists the capacity reservations for the current account.
 */
export const listCapacityReservations: API.PaginatedOperationMethod<
  ListCapacityReservationsInput,
  ListCapacityReservationsOutput,
  ListCapacityReservationsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { NextToken: 0, MaxResults: 0 },
    output: { CapacityReservations: D.list(o_CapacityReservation) },
  },
  errors: [InternalServerException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCapacityReservations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListDatabasesError =
  | InternalServerException
  | InvalidRequestException
  | MetadataException
  | CommonErrors;
/**
 * Lists the databases in the specified data catalog.
 */
export const listDatabases: API.PaginatedOperationMethod<
  ListDatabasesInput,
  ListDatabasesOutput,
  ListDatabasesError,
  Credentials | HttpClient.HttpClient,
  Database
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { CatalogName: 0, NextToken: 0, MaxResults: 0, WorkGroup: 0 },
  },
  errors: [InternalServerException, InvalidRequestException, MetadataException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDatabases",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "DatabaseList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListDataCatalogsError =
  | InternalServerException
  | InvalidRequestException
  | CommonErrors;
/**
 * Lists the data catalogs in the current Amazon Web Services account.
 *
 * In the Athena console, data catalogs are listed as "data sources" on
 * the **Data sources** page under the **Data source name** column.
 */
export const listDataCatalogs: API.PaginatedOperationMethod<
  ListDataCatalogsInput,
  ListDataCatalogsOutput,
  ListDataCatalogsError,
  Credentials | HttpClient.HttpClient,
  DataCatalogSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { NextToken: 0, MaxResults: 0, WorkGroup: 0 },
  },
  errors: [InternalServerException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDataCatalogs",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "DataCatalogsSummary",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListEngineVersionsError =
  | InternalServerException
  | InvalidRequestException
  | CommonErrors;
/**
 * Returns a list of engine versions that are available to choose from, including the
 * Auto option.
 */
export const listEngineVersions: API.PaginatedOperationMethod<
  ListEngineVersionsInput,
  ListEngineVersionsOutput,
  ListEngineVersionsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: { service: svc, input: { NextToken: 0, MaxResults: 0 } },
  errors: [InternalServerException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEngineVersions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListExecutorsError =
  | InternalServerException
  | InvalidRequestException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Lists, in descending order, the executors that joined a session. Newer executors are
 * listed first; older executors are listed later. The result can be optionally filtered by
 * state.
 */
export const listExecutors: API.PaginatedOperationMethod<
  ListExecutorsRequest,
  ListExecutorsResponse,
  ListExecutorsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      SessionId: 0,
      ExecutorStateFilter: 0,
      MaxResults: 0,
      NextToken: 0,
    },
  },
  errors: [
    InternalServerException,
    InvalidRequestException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListExecutors",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListNamedQueriesError =
  | InternalServerException
  | InvalidRequestException
  | CommonErrors;
/**
 * Provides a list of available query IDs only for queries saved in the specified
 * workgroup. Requires that you have access to the specified workgroup. If a workgroup is
 * not specified, lists the saved queries for the primary workgroup.
 */
export const listNamedQueries: API.PaginatedOperationMethod<
  ListNamedQueriesInput,
  ListNamedQueriesOutput,
  ListNamedQueriesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { NextToken: 0, MaxResults: 0, WorkGroup: 0 },
  },
  errors: [InternalServerException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListNamedQueries",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListNotebookMetadataError =
  | InternalServerException
  | InvalidRequestException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Displays the notebook files for the specified workgroup in paginated format.
 */
export const listNotebookMetadata: API.OperationMethod<
  ListNotebookMetadataInput,
  ListNotebookMetadataOutput,
  ListNotebookMetadataError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { Filters: { Name: 0 }, NextToken: 0, MaxResults: 0, WorkGroup: 0 },
    output: { NotebookMetadataList: D.list(o_NotebookMetadata) },
  },
  errors: [
    InternalServerException,
    InvalidRequestException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListNotebookMetadata",
})) as any;

export type ListNotebookSessionsError =
  | InternalServerException
  | InvalidRequestException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Lists, in descending order, the sessions that have been created in a notebook that are
 * in an active state like `CREATING`, `CREATED`, `IDLE`
 * or `BUSY`. Newer sessions are listed first; older sessions are listed
 * later.
 */
export const listNotebookSessions: API.OperationMethod<
  ListNotebookSessionsRequest,
  ListNotebookSessionsResponse,
  ListNotebookSessionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { NotebookId: 0, MaxResults: 0, NextToken: 0 },
    output: { NotebookSessionsList: D.list({ CreationTime: D.ts }) },
  },
  errors: [
    InternalServerException,
    InvalidRequestException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListNotebookSessions",
})) as any;

export type ListPreparedStatementsError =
  | InternalServerException
  | InvalidRequestException
  | CommonErrors;
/**
 * Lists the prepared statements in the specified workgroup.
 */
export const listPreparedStatements: API.PaginatedOperationMethod<
  ListPreparedStatementsInput,
  ListPreparedStatementsOutput,
  ListPreparedStatementsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { WorkGroup: 0, NextToken: 0, MaxResults: 0 },
    output: { PreparedStatements: D.list({ LastModifiedTime: D.ts }) },
  },
  errors: [InternalServerException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPreparedStatements",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListQueryExecutionsError =
  | InternalServerException
  | InvalidRequestException
  | CommonErrors;
/**
 * Provides a list of available query execution IDs for the queries in the specified
 * workgroup. Athena keeps a query history for 45 days. If a workgroup is not
 * specified, returns a list of query execution IDs for the primary workgroup. Requires you
 * to have access to the workgroup in which the queries ran.
 */
export const listQueryExecutions: API.PaginatedOperationMethod<
  ListQueryExecutionsInput,
  ListQueryExecutionsOutput,
  ListQueryExecutionsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { NextToken: 0, MaxResults: 0, WorkGroup: 0 },
  },
  errors: [InternalServerException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListQueryExecutions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListSessionsError =
  | InternalServerException
  | InvalidRequestException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Lists the sessions in a workgroup that are in an active state like
 * `CREATING`, `CREATED`, `IDLE`, or
 * `BUSY`. Newer sessions are listed first; older sessions are listed
 * later.
 */
export const listSessions: API.PaginatedOperationMethod<
  ListSessionsRequest,
  ListSessionsResponse,
  ListSessionsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { WorkGroup: 0, StateFilter: 0, MaxResults: 0, NextToken: 0 },
    output: { Sessions: D.list({ Status: o_SessionStatus }) },
  },
  errors: [
    InternalServerException,
    InvalidRequestException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSessions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTableMetadataError =
  | InternalServerException
  | InvalidRequestException
  | MetadataException
  | CommonErrors;
/**
 * Lists the metadata for the tables in the specified data catalog database.
 */
export const listTableMetadata: API.PaginatedOperationMethod<
  ListTableMetadataInput,
  ListTableMetadataOutput,
  ListTableMetadataError,
  Credentials | HttpClient.HttpClient,
  TableMetadata
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      CatalogName: 0,
      DatabaseName: 0,
      Expression: 0,
      NextToken: 0,
      MaxResults: 0,
      WorkGroup: 0,
    },
    output: { TableMetadataList: D.list(o_TableMetadata) },
  },
  errors: [InternalServerException, InvalidRequestException, MetadataException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTableMetadata",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "TableMetadataList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | InternalServerException
  | InvalidRequestException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Lists the tags associated with an Athena resource.
 */
export const listTagsForResource: API.PaginatedOperationMethod<
  ListTagsForResourceInput,
  ListTagsForResourceOutput,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient,
  Tag
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { ResourceARN: 0, NextToken: 0, MaxResults: 0 },
  },
  errors: [
    InternalServerException,
    InvalidRequestException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Tags",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListWorkGroupsError =
  | InternalServerException
  | InvalidRequestException
  | CommonErrors;
/**
 * Lists available workgroups for the account.
 */
export const listWorkGroups: API.PaginatedOperationMethod<
  ListWorkGroupsInput,
  ListWorkGroupsOutput,
  ListWorkGroupsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { NextToken: 0, MaxResults: 0 },
    output: { WorkGroups: D.list({ CreationTime: D.ts }) },
  },
  errors: [InternalServerException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListWorkGroups",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type PutCapacityAssignmentConfigurationError =
  | InternalServerException
  | InvalidRequestException
  | CommonErrors;
/**
 * Puts a new capacity assignment configuration for a specified capacity reservation. If
 * a capacity assignment configuration already exists for the capacity reservation,
 * replaces the existing capacity assignment configuration.
 */
export const putCapacityAssignmentConfiguration: API.OperationMethod<
  PutCapacityAssignmentConfigurationInput,
  PutCapacityAssignmentConfigurationOutput,
  PutCapacityAssignmentConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      CapacityReservationName: 0,
      CapacityAssignments: D.list({ WorkGroupNames: 0 }),
    },
  },
  errors: [InternalServerException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutCapacityAssignmentConfiguration",
})) as any;

export type StartCalculationExecutionError =
  | InternalServerException
  | InvalidRequestException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Submits calculations for execution within a session. You can supply the code to run as
 * an inline code block within the request.
 *
 * The request syntax requires the StartCalculationExecutionRequest$CodeBlock parameter or the CalculationConfiguration$CodeBlock parameter, but not both. Because
 * CalculationConfiguration$CodeBlock is deprecated, use the
 * StartCalculationExecutionRequest$CodeBlock parameter
 * instead.
 */
export const startCalculationExecution: API.OperationMethod<
  StartCalculationExecutionRequest,
  StartCalculationExecutionResponse,
  StartCalculationExecutionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      SessionId: 0,
      Description: 0,
      CalculationConfiguration: { CodeBlock: 0 },
      CodeBlock: 0,
      ClientRequestToken: 0,
    },
  },
  errors: [
    InternalServerException,
    InvalidRequestException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartCalculationExecution",
})) as any;

export type StartQueryExecutionError =
  | InternalServerException
  | InvalidRequestException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Runs the SQL query statements contained in the `Query`. Requires you to
 * have access to the workgroup in which the query ran. Running queries against an external
 * catalog requires GetDataCatalog permission to the catalog. For code
 * samples using the Amazon Web Services SDK for Java, see Examples and
 * Code Samples in the Amazon Athena User
 * Guide.
 */
export const startQueryExecution: API.OperationMethod<
  StartQueryExecutionInput,
  StartQueryExecutionOutput,
  StartQueryExecutionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      QueryString: 0,
      ClientRequestToken: D.m({ idempotency: true }),
      QueryExecutionContext: { Database: 0, Catalog: 0 },
      ResultConfiguration: i_ResultConfiguration,
      WorkGroup: 0,
      ExecutionParameters: 0,
      ResultReuseConfiguration: {
        ResultReuseByAgeConfiguration: { Enabled: 0, MaxAgeInMinutes: 0 },
      },
      EngineConfiguration: i_EngineConfiguration,
    },
  },
  errors: [
    InternalServerException,
    InvalidRequestException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartQueryExecution",
})) as any;

export type StartSessionError =
  | InternalServerException
  | InvalidRequestException
  | ResourceNotFoundException
  | SessionAlreadyExistsException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates a session for running calculations within a workgroup. The session is ready
 * when it reaches an `IDLE` state.
 */
export const startSession: API.OperationMethod<
  StartSessionRequest,
  StartSessionResponse,
  StartSessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Description: 0,
      WorkGroup: 0,
      EngineConfiguration: i_EngineConfiguration,
      ExecutionRole: 0,
      MonitoringConfiguration: i_MonitoringConfiguration,
      NotebookVersion: 0,
      SessionIdleTimeoutInMinutes: 0,
      ClientRequestToken: 0,
      Tags: D.list(i_Tag),
      CopyWorkGroupTags: 0,
    },
  },
  errors: [
    InternalServerException,
    InvalidRequestException,
    ResourceNotFoundException,
    SessionAlreadyExistsException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartSession",
})) as any;

export type StopCalculationExecutionError =
  | InternalServerException
  | InvalidRequestException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Requests the cancellation of a calculation. A `StopCalculationExecution`
 * call on a calculation that is already in a terminal state (for example,
 * `STOPPED`, `FAILED`, or `COMPLETED`) succeeds but
 * has no effect.
 *
 * Cancelling a calculation is done on a best effort basis. If a calculation cannot
 * be cancelled, you can be charged for its completion. If you are concerned about
 * being charged for a calculation that cannot be cancelled, consider terminating the
 * session in which the calculation is running.
 */
export const stopCalculationExecution: API.OperationMethod<
  StopCalculationExecutionRequest,
  StopCalculationExecutionResponse,
  StopCalculationExecutionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { CalculationExecutionId: 0 } },
  errors: [
    InternalServerException,
    InvalidRequestException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopCalculationExecution",
})) as any;

export type StopQueryExecutionError =
  | InternalServerException
  | InvalidRequestException
  | CommonErrors;
/**
 * Stops a query execution. Requires you to have access to the workgroup in which the
 * query ran.
 */
export const stopQueryExecution: API.OperationMethod<
  StopQueryExecutionInput,
  StopQueryExecutionOutput,
  StopQueryExecutionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { QueryExecutionId: D.m({ idempotency: true }) },
  },
  errors: [InternalServerException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopQueryExecution",
})) as any;

export type TagResourceError =
  | InternalServerException
  | InvalidRequestException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Adds one or more tags to an Athena resource. A tag is a label that you
 * assign to a resource. Each tag consists of a key and an optional value, both of which
 * you define. For example, you can use tags to categorize Athena workgroups,
 * data catalogs, or capacity reservations by purpose, owner, or environment. Use a
 * consistent set of tag keys to make it easier to search and filter the resources in your
 * account. For best practices, see Tagging
 * Best Practices. Tag keys can be from 1 to 128 UTF-8 Unicode characters, and
 * tag values can be from 0 to 256 UTF-8 Unicode characters. Tags can use letters and
 * numbers representable in UTF-8, and the following characters: + - = . _ : / @. Tag keys
 * and values are case-sensitive. Tag keys must be unique per resource. If you specify more
 * than one tag, separate them by commas.
 */
export const tagResource: API.OperationMethod<
  TagResourceInput,
  TagResourceOutput,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceARN: 0, Tags: D.list(i_Tag) } },
  errors: [
    InternalServerException,
    InvalidRequestException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

export type TerminateSessionError =
  | InternalServerException
  | InvalidRequestException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Terminates an active session. A `TerminateSession` call on a session that
 * is already inactive (for example, in a `FAILED`, `TERMINATED` or
 * `TERMINATING` state) succeeds but has no effect. Calculations running in
 * the session when `TerminateSession` is called are forcefully stopped, but may
 * display as `FAILED` instead of `STOPPED`.
 */
export const terminateSession: API.OperationMethod<
  TerminateSessionRequest,
  TerminateSessionResponse,
  TerminateSessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { SessionId: 0 } },
  errors: [
    InternalServerException,
    InvalidRequestException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TerminateSession",
})) as any;

export type UntagResourceError =
  | InternalServerException
  | InvalidRequestException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Removes one or more tags from an Athena resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceInput,
  UntagResourceOutput,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceARN: 0, TagKeys: 0 } },
  errors: [
    InternalServerException,
    InvalidRequestException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

export type UpdateCapacityReservationError =
  | InternalServerException
  | InvalidRequestException
  | CommonErrors;
/**
 * Updates the number of requested data processing units for the capacity reservation
 * with the specified name.
 */
export const updateCapacityReservation: API.OperationMethod<
  UpdateCapacityReservationInput,
  UpdateCapacityReservationOutput,
  UpdateCapacityReservationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { TargetDpus: 0, Name: 0 } },
  errors: [InternalServerException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateCapacityReservation",
})) as any;

export type UpdateDataCatalogError =
  | InternalServerException
  | InvalidRequestException
  | DataCatalogNotFound
  | CommonErrors;
/**
 * Updates the data catalog that has the specified name.
 */
export const updateDataCatalog: API.OperationMethod<
  UpdateDataCatalogInput,
  UpdateDataCatalogOutput,
  UpdateDataCatalogError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { Name: 0, Type: 0, Description: 0, Parameters: 0 },
  },
  errors: [
    InternalServerException,
    InvalidRequestException,
    DataCatalogNotFound,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDataCatalog",
})) as any;

export type UpdateNamedQueryError =
  | InternalServerException
  | InvalidRequestException
  | NamedQueryNotFound
  | CommonErrors;
/**
 * Updates a NamedQuery object. The database or workgroup cannot be
 * updated.
 */
export const updateNamedQuery: API.OperationMethod<
  UpdateNamedQueryInput,
  UpdateNamedQueryOutput,
  UpdateNamedQueryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { NamedQueryId: 0, Name: 0, Description: 0, QueryString: 0 },
  },
  errors: [
    InternalServerException,
    InvalidRequestException,
    NamedQueryNotFound,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateNamedQuery",
})) as any;

export type UpdateNotebookError =
  | InternalServerException
  | InvalidRequestException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates the contents of a Spark notebook.
 */
export const updateNotebook: API.OperationMethod<
  UpdateNotebookInput,
  UpdateNotebookOutput,
  UpdateNotebookError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      NotebookId: 0,
      Payload: 0,
      Type: 0,
      SessionId: 0,
      ClientRequestToken: 0,
    },
  },
  errors: [
    InternalServerException,
    InvalidRequestException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateNotebook",
})) as any;

export type UpdateNotebookMetadataError =
  | InternalServerException
  | InvalidRequestException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates the metadata for a notebook.
 */
export const updateNotebookMetadata: API.OperationMethod<
  UpdateNotebookMetadataInput,
  UpdateNotebookMetadataOutput,
  UpdateNotebookMetadataError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { NotebookId: 0, ClientRequestToken: 0, Name: 0 },
  },
  errors: [
    InternalServerException,
    InvalidRequestException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateNotebookMetadata",
})) as any;

export type UpdatePreparedStatementError =
  | InternalServerException
  | InvalidRequestException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Updates a prepared statement.
 */
export const updatePreparedStatement: API.OperationMethod<
  UpdatePreparedStatementInput,
  UpdatePreparedStatementOutput,
  UpdatePreparedStatementError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      StatementName: 0,
      WorkGroup: 0,
      QueryStatement: 0,
      Description: 0,
    },
  },
  errors: [
    InternalServerException,
    InvalidRequestException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdatePreparedStatement",
})) as any;

export type UpdateWorkGroupError =
  | InternalServerException
  | InvalidRequestException
  | WorkGroupNotFound
  | CommonErrors;
/**
 * Updates the workgroup with the specified name. The workgroup's name cannot be changed.
 * Only `ConfigurationUpdates` can be specified.
 */
export const updateWorkGroup: API.OperationMethod<
  UpdateWorkGroupInput,
  UpdateWorkGroupOutput,
  UpdateWorkGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      WorkGroup: 0,
      Description: 0,
      ConfigurationUpdates: {
        EnforceWorkGroupConfiguration: 0,
        ResultConfigurationUpdates: {
          OutputLocation: 0,
          RemoveOutputLocation: 0,
          EncryptionConfiguration: i_EncryptionConfiguration,
          RemoveEncryptionConfiguration: 0,
          ExpectedBucketOwner: 0,
          RemoveExpectedBucketOwner: 0,
          AclConfiguration: i_AclConfiguration,
          RemoveAclConfiguration: 0,
        },
        ManagedQueryResultsConfigurationUpdates: {
          Enabled: 0,
          EncryptionConfiguration: i_ManagedQueryResultsEncryptionConfiguration,
          RemoveEncryptionConfiguration: 0,
        },
        PublishCloudWatchMetricsEnabled: 0,
        BytesScannedCutoffPerQuery: 0,
        RemoveBytesScannedCutoffPerQuery: 0,
        RequesterPaysEnabled: 0,
        EngineVersion: i_EngineVersion,
        RemoveCustomerContentEncryptionConfiguration: 0,
        AdditionalConfiguration: 0,
        ExecutionRole: 0,
        CustomerContentEncryptionConfiguration:
          i_CustomerContentEncryptionConfiguration,
        EnableMinimumEncryptionConfiguration: 0,
        QueryResultsS3AccessGrantsConfiguration:
          i_QueryResultsS3AccessGrantsConfiguration,
        MonitoringConfiguration: i_MonitoringConfiguration,
        EngineConfiguration: i_EngineConfiguration,
      },
      State: 0,
    },
  },
  errors: [InternalServerException, InvalidRequestException, WorkGroupNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateWorkGroup",
})) as any;

const i_AclConfiguration: D.LazyStruct = () => ({ S3AclOption: 0 });
const i_CustomerContentEncryptionConfiguration: D.LazyStruct = () => ({
  KmsKey: 0,
});
const i_EncryptionConfiguration: D.LazyStruct = () => ({
  EncryptionOption: 0,
  KmsKey: 0,
});
const i_EngineConfiguration: D.LazyStruct = () => ({
  CoordinatorDpuSize: 0,
  MaxConcurrentDpus: 0,
  DefaultExecutorDpuSize: 0,
  AdditionalConfigs: 0,
  SparkProperties: 0,
  Classifications: D.list({ Name: 0, Properties: 0 }),
});
const i_EngineVersion: D.LazyStruct = () => ({
  SelectedEngineVersion: 0,
  EffectiveEngineVersion: 0,
});
const i_ManagedQueryResultsEncryptionConfiguration: D.LazyStruct = () => ({
  KmsKey: 0,
});
const i_MonitoringConfiguration: D.LazyStruct = () => ({
  CloudWatchLoggingConfiguration: {
    Enabled: 0,
    LogGroup: 0,
    LogStreamNamePrefix: 0,
    LogTypes: 0,
  },
  ManagedLoggingConfiguration: { Enabled: 0, KmsKey: 0 },
  S3LoggingConfiguration: { Enabled: 0, KmsKey: 0, LogLocation: 0 },
});
const i_QueryResultsS3AccessGrantsConfiguration: D.LazyStruct = () => ({
  EnableS3AccessGrants: 0,
  CreateUserLevelPrefix: 0,
  AuthenticationType: 0,
});
const i_ResultConfiguration: D.LazyStruct = () => ({
  OutputLocation: 0,
  EncryptionConfiguration: i_EncryptionConfiguration,
  ExpectedBucketOwner: 0,
  AclConfiguration: i_AclConfiguration,
});
const i_Tag: D.LazyStruct = () => ({ Key: 0, Value: 0 });
const o_CalculationStatus: D.LazyStruct = () => ({
  SubmissionDateTime: D.ts,
  CompletionDateTime: D.ts,
});
const o_CapacityReservation: D.LazyStruct = () => ({
  LastAllocation: { RequestTime: D.ts, RequestCompletionTime: D.ts },
  LastSuccessfulAllocationTime: D.ts,
  CreationTime: D.ts,
});
const o_NotebookMetadata: D.LazyStruct = () => ({
  CreationTime: D.ts,
  LastModifiedTime: D.ts,
});
const o_PreparedStatement: D.LazyStruct = () => ({ LastModifiedTime: D.ts });
const o_QueryExecution: D.LazyStruct = () => ({
  Status: { SubmissionDateTime: D.ts, CompletionDateTime: D.ts },
});
const o_SessionStatus: D.LazyStruct = () => ({
  StartDateTime: D.ts,
  LastModifiedDateTime: D.ts,
  EndDateTime: D.ts,
  IdleSinceDateTime: D.ts,
});
const o_TableMetadata: D.LazyStruct = () => ({
  CreateTime: D.ts,
  LastAccessTime: D.ts,
});
