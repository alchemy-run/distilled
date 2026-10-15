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
const svc = /*@__PURE__*/ T.AwsApiService({ sdkId: "Athena", serviceShapeName: "AmazonAthena" });
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "athena" });
const ver = /*@__PURE__*/ T.ServiceVersion("2017-05-18");
const proto = /*@__PURE__*/ T.AwsProtocolsAwsJson1_1();
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
              `https://athena-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(`https://athena-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://athena.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://athena.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://athena.{R}.{D}","properties":{},"headers":{}}');

export class DataCatalogNotFound
  extends /*@__PURE__*/ S.TaggedError<DataCatalogNotFound>()(
    "DataCatalogNotFound",
    {
      AthenaErrorCode: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.SyntheticError({
      from: "InvalidRequestException",
      message: { matches: "DataCatalog.*not found" },
    }),
  ).pipe(C.withNotFoundError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()("InternalServerException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class InvalidRequestException
  extends /*@__PURE__*/ S.TaggedError<InvalidRequestException>()("InvalidRequestException", {
    AthenaErrorCode: /*@__PURE__*/ S.optional(S.String),
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class MetadataException
  extends /*@__PURE__*/ S.TaggedError<MetadataException>()("MetadataException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class NamedQueryNotFound
  extends /*@__PURE__*/ S.TaggedError<NamedQueryNotFound>()(
    "NamedQueryNotFound",
    {
      AthenaErrorCode: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.SyntheticError({
      from: "InvalidRequestException",
      message: { matches: "NamedQuery.*does not exist" },
    }),
  ).pipe(C.withNotFoundError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()("ResourceNotFoundException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    ResourceName: /*@__PURE__*/ S.optional(S.String),
  }) {}
export class SessionAlreadyExistsException
  extends /*@__PURE__*/ S.TaggedError<SessionAlreadyExistsException>()(
    "SessionAlreadyExistsException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ).pipe(C.withAlreadyExistsError) {}
export class TooManyRequestsException
  extends /*@__PURE__*/ S.TaggedError<TooManyRequestsException>()("TooManyRequestsException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    Reason: /*@__PURE__*/ S.optional(
      /*@__PURE__*/ S.suspend(() => S.String).annotate({ identifier: "ThrottleReason" }),
    ),
  }) {}
export class WorkGroupNotFound
  extends /*@__PURE__*/ S.TaggedError<WorkGroupNotFound>()(
    "WorkGroupNotFound",
    {
      AthenaErrorCode: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.SyntheticError({
      from: "InvalidRequestException",
      message: { matches: "WorkGroup.*not found" },
    }),
  ).pipe(C.withNotFoundError) {}
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
export type UnprocessedPreparedStatementNameList = UnprocessedPreparedStatementName[];
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
export type DataCatalogType = "LAMBDA" | "GLUE" | "HIVE" | "FEDERATED" | (string & {});
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
export type CapacityAllocationStatus = "PENDING" | "SUCCEEDED" | "FAILED" | (string & {});
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
export type ColumnNullable = "NOT_NULL" | "NULLABLE" | "UNKNOWN" | (string & {});
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
  input: __S(1536, __c96, 0) as any as S.Schema<BatchGetNamedQueryInput>,
  output: __S(1540, __c96, 4) as any as S.Schema<BatchGetNamedQueryOutput>,
  errors: [InternalServerException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetNamedQuery",
}));

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
  input: __S(0, __c0, 0) as any as S.Schema<BatchGetPreparedStatementInput>,
  output: __S(4, __c0, 4) as any as S.Schema<BatchGetPreparedStatementOutput>,
  errors: [InternalServerException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetPreparedStatement",
}));

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
  input: __S(32, __c2, 0) as any as S.Schema<BatchGetQueryExecutionInput>,
  output: __S(36, __c2, 4) as any as S.Schema<BatchGetQueryExecutionOutput>,
  errors: [InternalServerException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetQueryExecution",
}));

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
  input: __S(176, __c11, 0) as any as S.Schema<CancelCapacityReservationInput>,
  output: __S(192, __c12, 0) as any as S.Schema<CancelCapacityReservationOutput>,
  errors: [InternalServerException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelCapacityReservation",
}));

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
  input: __S(208, __c13, 0) as any as S.Schema<CreateCapacityReservationInput>,
  output: __S(192, __c12, 0) as any as S.Schema<CreateCapacityReservationOutput>,
  errors: [InternalServerException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCapacityReservation",
}));

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
  input: __S(240, __c15, 0) as any as S.Schema<CreateDataCatalogInput>,
  output: __S(273, __c17, 1) as any as S.Schema<CreateDataCatalogOutput>,
  errors: [InternalServerException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDataCatalog",
}));

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
  input: __S(288, __c18, 0) as any as S.Schema<CreateNamedQueryInput>,
  output: __S(289, __c18, 1) as any as S.Schema<CreateNamedQueryOutput>,
  errors: [InternalServerException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateNamedQuery",
}));

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
  input: __S(304, __c19, 0) as any as S.Schema<CreateNotebookInput>,
  output: __S(320, __c20, 0) as any as S.Schema<CreateNotebookOutput>,
  errors: [InternalServerException, InvalidRequestException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateNotebook",
}));

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
  input: __S(336, __c21, 0) as any as S.Schema<CreatePreparedStatementInput>,
  output: __S(192, __c12, 0) as any as S.Schema<CreatePreparedStatementOutput>,
  errors: [InternalServerException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePreparedStatement",
}));

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
  input: __S(352, __c22, 0) as any as S.Schema<CreatePresignedNotebookUrlRequest>,
  output: __S(353, __c22, 1) as any as S.Schema<CreatePresignedNotebookUrlResponse>,
  errors: [InternalServerException, InvalidRequestException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePresignedNotebookUrl",
}));

export type CreateWorkGroupError = InternalServerException | InvalidRequestException | CommonErrors;
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
  input: __S(368, __c23, 0) as any as S.Schema<CreateWorkGroupInput>,
  output: __S(192, __c12, 0) as any as S.Schema<CreateWorkGroupOutput>,
  errors: [InternalServerException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateWorkGroup",
}));

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
  input: __S(432, __c27, 0) as any as S.Schema<DeleteCapacityReservationInput>,
  output: __S(192, __c12, 0) as any as S.Schema<DeleteCapacityReservationOutput>,
  errors: [InternalServerException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCapacityReservation",
}));

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
  input: __S(448, __c28, 0) as any as S.Schema<DeleteDataCatalogInput>,
  output: __S(273, __c17, 1) as any as S.Schema<DeleteDataCatalogOutput>,
  errors: [InternalServerException, InvalidRequestException, DataCatalogNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDataCatalog",
}));

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
  input: __S(464, __c29, 0) as any as S.Schema<DeleteNamedQueryInput>,
  output: __S(192, __c12, 0) as any as S.Schema<DeleteNamedQueryOutput>,
  errors: [InternalServerException, InvalidRequestException, NamedQueryNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteNamedQuery",
}));

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
  input: __S(480, __c30, 0) as any as S.Schema<DeleteNotebookInput>,
  output: __S(192, __c12, 0) as any as S.Schema<DeleteNotebookOutput>,
  errors: [InternalServerException, InvalidRequestException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteNotebook",
}));

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
  input: __S(496, __c31, 0) as any as S.Schema<DeletePreparedStatementInput>,
  output: __S(192, __c12, 0) as any as S.Schema<DeletePreparedStatementOutput>,
  errors: [
    InternalServerException,
    InvalidRequestException,
    ResourceNotFoundException,
    WorkGroupNotFound,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePreparedStatement",
}));

export type DeleteWorkGroupError = InternalServerException | InvalidRequestException | CommonErrors;
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
  input: __S(512, __c32, 0) as any as S.Schema<DeleteWorkGroupInput>,
  output: __S(192, __c12, 0) as any as S.Schema<DeleteWorkGroupOutput>,
  errors: [InternalServerException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteWorkGroup",
}));

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
  input: __S(528, __c33, 0) as any as S.Schema<ExportNotebookInput>,
  output: __S(529, __c33, 1) as any as S.Schema<ExportNotebookOutput>,
  errors: [InternalServerException, InvalidRequestException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ExportNotebook",
}));

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
  input: __S(560, __c35, 0) as any as S.Schema<GetCalculationExecutionRequest>,
  output: __S(562, __c35, 2) as any as S.Schema<GetCalculationExecutionResponse>,
  errors: [InternalServerException, InvalidRequestException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCalculationExecution",
}));

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
  input: __S(608, __c38, 0) as any as S.Schema<GetCalculationExecutionCodeRequest>,
  output: __S(624, __c39, 0) as any as S.Schema<GetCalculationExecutionCodeResponse>,
  errors: [InternalServerException, InvalidRequestException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCalculationExecutionCode",
}));

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
  input: __S(640, __c40, 0) as any as S.Schema<GetCalculationExecutionStatusRequest>,
  output: __S(641, __c40, 1) as any as S.Schema<GetCalculationExecutionStatusResponse>,
  errors: [InternalServerException, InvalidRequestException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCalculationExecutionStatus",
}));

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
  input: __S(656, __c41, 0) as any as S.Schema<GetCapacityAssignmentConfigurationInput>,
  output: __S(658, __c41, 2) as any as S.Schema<GetCapacityAssignmentConfigurationOutput>,
  errors: [InternalServerException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCapacityAssignmentConfiguration",
}));

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
  input: __S(688, __c43, 0) as any as S.Schema<GetCapacityReservationInput>,
  output: __S(689, __c43, 1) as any as S.Schema<GetCapacityReservationOutput>,
  errors: [InternalServerException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCapacityReservation",
}));

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
  input: __S(720, __c45, 0) as any as S.Schema<GetDatabaseInput>,
  output: __S(721, __c45, 1) as any as S.Schema<GetDatabaseOutput>,
  errors: [InternalServerException, InvalidRequestException, MetadataException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDatabase",
}));

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
  input: __S(752, __c47, 0) as any as S.Schema<GetDataCatalogInput>,
  output: __S(273, __c17, 1) as any as S.Schema<GetDataCatalogOutput>,
  errors: [InternalServerException, InvalidRequestException, DataCatalogNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDataCatalog",
}));

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
  input: __S(768, __c48, 0) as any as S.Schema<GetNamedQueryInput>,
  output: __S(769, __c48, 1) as any as S.Schema<GetNamedQueryOutput>,
  errors: [InternalServerException, InvalidRequestException, NamedQueryNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetNamedQuery",
}));

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
  input: __S(784, __c49, 0) as any as S.Schema<GetNotebookMetadataInput>,
  output: __S(785, __c49, 1) as any as S.Schema<GetNotebookMetadataOutput>,
  errors: [InternalServerException, InvalidRequestException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetNotebookMetadata",
}));

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
  input: __S(800, __c50, 0) as any as S.Schema<GetPreparedStatementInput>,
  output: __S(801, __c50, 1) as any as S.Schema<GetPreparedStatementOutput>,
  errors: [
    InternalServerException,
    InvalidRequestException,
    ResourceNotFoundException,
    WorkGroupNotFound,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPreparedStatement",
}));

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
  input: __S(816, __c51, 0) as any as S.Schema<GetQueryExecutionInput>,
  output: __S(817, __c51, 1) as any as S.Schema<GetQueryExecutionOutput>,
  errors: [InternalServerException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetQueryExecution",
}));

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
  input: __S(832, __c52, 0) as any as S.Schema<GetQueryResultsInput>,
  output: __S(841, __c52, 9) as any as S.Schema<GetQueryResultsOutput>,
  errors: [InternalServerException, InvalidRequestException, TooManyRequestsException],
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
  input: __S(848, __c53, 0) as any as S.Schema<GetQueryRuntimeStatisticsInput>,
  output: __S(856, __c53, 8) as any as S.Schema<GetQueryRuntimeStatisticsOutput>,
  errors: [InternalServerException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetQueryRuntimeStatistics",
}));

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
  input: __S(864, __c54, 0) as any as S.Schema<GetResourceDashboardRequest>,
  output: __S(865, __c54, 1) as any as S.Schema<GetResourceDashboardResponse>,
  errors: [InternalServerException, InvalidRequestException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetResourceDashboard",
}));

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
  input: __S(880, __c55, 0) as any as S.Schema<GetSessionRequest>,
  output: __S(883, __c55, 3) as any as S.Schema<GetSessionResponse>,
  errors: [InternalServerException, InvalidRequestException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSession",
}));

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
  input: __S(912, __c57, 0) as any as S.Schema<GetSessionEndpointRequest>,
  output: __S(913, __c57, 1) as any as S.Schema<GetSessionEndpointResponse>,
  errors: [InternalServerException, InvalidRequestException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSessionEndpoint",
}));

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
  input: __S(928, __c58, 0) as any as S.Schema<GetSessionStatusRequest>,
  output: __S(929, __c58, 1) as any as S.Schema<GetSessionStatusResponse>,
  errors: [InternalServerException, InvalidRequestException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSessionStatus",
}));

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
  input: __S(944, __c59, 0) as any as S.Schema<GetTableMetadataInput>,
  output: __S(945, __c59, 1) as any as S.Schema<GetTableMetadataOutput>,
  errors: [InternalServerException, InvalidRequestException, MetadataException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTableMetadata",
}));

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
  input: __S(976, __c61, 0) as any as S.Schema<GetWorkGroupInput>,
  output: __S(978, __c61, 2) as any as S.Schema<GetWorkGroupOutput>,
  errors: [InternalServerException, InvalidRequestException, WorkGroupNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetWorkGroup",
}));

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
  input: __S(992, __c62, 0) as any as S.Schema<ImportNotebookInput>,
  output: __S(320, __c20, 0) as any as S.Schema<ImportNotebookOutput>,
  errors: [InternalServerException, InvalidRequestException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ImportNotebook",
}));

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
  input: __S(1008, __c63, 0) as any as S.Schema<ListApplicationDPUSizesInput>,
  output: __S(1012, __c63, 4) as any as S.Schema<ListApplicationDPUSizesOutput>,
  errors: [InternalServerException, InvalidRequestException, TooManyRequestsException],
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
  input: __S(1024, __c64, 0) as any as S.Schema<ListCalculationExecutionsRequest>,
  output: __S(1027, __c64, 3) as any as S.Schema<ListCalculationExecutionsResponse>,
  errors: [InternalServerException, InvalidRequestException, ResourceNotFoundException],
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
  input: __S(1040, __c65, 0) as any as S.Schema<ListCapacityReservationsInput>,
  output: __S(1042, __c65, 2) as any as S.Schema<ListCapacityReservationsOutput>,
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
  input: __S(1056, __c66, 0) as any as S.Schema<ListDatabasesInput>,
  output: __S(1058, __c66, 2) as any as S.Schema<ListDatabasesOutput>,
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
  input: __S(1072, __c67, 0) as any as S.Schema<ListDataCatalogsInput>,
  output: __S(1075, __c67, 3) as any as S.Schema<ListDataCatalogsOutput>,
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
  input: __S(1088, __c68, 0) as any as S.Schema<ListEngineVersionsInput>,
  output: __S(1090, __c68, 2) as any as S.Schema<ListEngineVersionsOutput>,
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
  input: __S(1104, __c69, 0) as any as S.Schema<ListExecutorsRequest>,
  output: __S(1107, __c69, 3) as any as S.Schema<ListExecutorsResponse>,
  errors: [InternalServerException, InvalidRequestException, ResourceNotFoundException],
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
  input: __S(1120, __c70, 0) as any as S.Schema<ListNamedQueriesInput>,
  output: __S(1121, __c70, 1) as any as S.Schema<ListNamedQueriesOutput>,
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
  input: __S(1137, __c71, 1) as any as S.Schema<ListNotebookMetadataInput>,
  output: __S(1139, __c71, 3) as any as S.Schema<ListNotebookMetadataOutput>,
  errors: [InternalServerException, InvalidRequestException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListNotebookMetadata",
}));

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
  input: __S(1152, __c72, 0) as any as S.Schema<ListNotebookSessionsRequest>,
  output: __S(1155, __c72, 3) as any as S.Schema<ListNotebookSessionsResponse>,
  errors: [InternalServerException, InvalidRequestException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListNotebookSessions",
}));

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
  input: __S(1168, __c73, 0) as any as S.Schema<ListPreparedStatementsInput>,
  output: __S(1171, __c73, 3) as any as S.Schema<ListPreparedStatementsOutput>,
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
  input: __S(1184, __c74, 0) as any as S.Schema<ListQueryExecutionsInput>,
  output: __S(1185, __c74, 1) as any as S.Schema<ListQueryExecutionsOutput>,
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
  input: __S(1200, __c75, 0) as any as S.Schema<ListSessionsRequest>,
  output: __S(1203, __c75, 3) as any as S.Schema<ListSessionsResponse>,
  errors: [InternalServerException, InvalidRequestException, ResourceNotFoundException],
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
  input: __S(1216, __c76, 0) as any as S.Schema<ListTableMetadataInput>,
  output: __S(1218, __c76, 2) as any as S.Schema<ListTableMetadataOutput>,
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
  input: __S(1232, __c77, 0) as any as S.Schema<ListTagsForResourceInput>,
  output: __S(1233, __c77, 1) as any as S.Schema<ListTagsForResourceOutput>,
  errors: [InternalServerException, InvalidRequestException, ResourceNotFoundException],
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

export type ListWorkGroupsError = InternalServerException | InvalidRequestException | CommonErrors;
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
  input: __S(1248, __c78, 0) as any as S.Schema<ListWorkGroupsInput>,
  output: __S(1251, __c78, 3) as any as S.Schema<ListWorkGroupsOutput>,
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
  input: __S(1264, __c79, 0) as any as S.Schema<PutCapacityAssignmentConfigurationInput>,
  output: __S(192, __c12, 0) as any as S.Schema<PutCapacityAssignmentConfigurationOutput>,
  errors: [InternalServerException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutCapacityAssignmentConfiguration",
}));

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
  input: __S(1280, __c80, 0) as any as S.Schema<StartCalculationExecutionRequest>,
  output: __S(1281, __c80, 1) as any as S.Schema<StartCalculationExecutionResponse>,
  errors: [InternalServerException, InvalidRequestException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartCalculationExecution",
}));

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
  input: __S(1296, __c81, 0) as any as S.Schema<StartQueryExecutionInput>,
  output: __S(1297, __c81, 1) as any as S.Schema<StartQueryExecutionOutput>,
  errors: [InternalServerException, InvalidRequestException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartQueryExecution",
}));

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
  input: __S(1312, __c82, 0) as any as S.Schema<StartSessionRequest>,
  output: __S(1313, __c82, 1) as any as S.Schema<StartSessionResponse>,
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
}));

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
  input: __S(1328, __c83, 0) as any as S.Schema<StopCalculationExecutionRequest>,
  output: __S(1344, __c84, 0) as any as S.Schema<StopCalculationExecutionResponse>,
  errors: [InternalServerException, InvalidRequestException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopCalculationExecution",
}));

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
  input: __S(1360, __c85, 0) as any as S.Schema<StopQueryExecutionInput>,
  output: __S(192, __c12, 0) as any as S.Schema<StopQueryExecutionOutput>,
  errors: [InternalServerException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopQueryExecution",
}));

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
  input: __S(1376, __c86, 0) as any as S.Schema<TagResourceInput>,
  output: __S(192, __c12, 0) as any as S.Schema<TagResourceOutput>,
  errors: [InternalServerException, InvalidRequestException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

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
  input: __S(1392, __c87, 0) as any as S.Schema<TerminateSessionRequest>,
  output: __S(1344, __c84, 0) as any as S.Schema<TerminateSessionResponse>,
  errors: [InternalServerException, InvalidRequestException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TerminateSession",
}));

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
  input: __S(1408, __c88, 0) as any as S.Schema<UntagResourceInput>,
  output: __S(192, __c12, 0) as any as S.Schema<UntagResourceOutput>,
  errors: [InternalServerException, InvalidRequestException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

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
  input: __S(1424, __c89, 0) as any as S.Schema<UpdateCapacityReservationInput>,
  output: __S(192, __c12, 0) as any as S.Schema<UpdateCapacityReservationOutput>,
  errors: [InternalServerException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateCapacityReservation",
}));

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
  input: __S(1440, __c90, 0) as any as S.Schema<UpdateDataCatalogInput>,
  output: __S(192, __c12, 0) as any as S.Schema<UpdateDataCatalogOutput>,
  errors: [InternalServerException, InvalidRequestException, DataCatalogNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDataCatalog",
}));

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
  input: __S(1456, __c91, 0) as any as S.Schema<UpdateNamedQueryInput>,
  output: __S(192, __c12, 0) as any as S.Schema<UpdateNamedQueryOutput>,
  errors: [InternalServerException, InvalidRequestException, NamedQueryNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateNamedQuery",
}));

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
  input: __S(1472, __c92, 0) as any as S.Schema<UpdateNotebookInput>,
  output: __S(192, __c12, 0) as any as S.Schema<UpdateNotebookOutput>,
  errors: [InternalServerException, InvalidRequestException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateNotebook",
}));

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
  input: __S(1488, __c93, 0) as any as S.Schema<UpdateNotebookMetadataInput>,
  output: __S(192, __c12, 0) as any as S.Schema<UpdateNotebookMetadataOutput>,
  errors: [InternalServerException, InvalidRequestException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateNotebookMetadata",
}));

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
  input: __S(1504, __c94, 0) as any as S.Schema<UpdatePreparedStatementInput>,
  output: __S(192, __c12, 0) as any as S.Schema<UpdatePreparedStatementOutput>,
  errors: [InternalServerException, InvalidRequestException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdatePreparedStatement",
}));

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
  input: __S(1523, __c95, 3) as any as S.Schema<UpdateWorkGroupInput>,
  output: __S(192, __c12, 0) as any as S.Schema<UpdateWorkGroupOutput>,
  errors: [InternalServerException, InvalidRequestException, WorkGroupNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateWorkGroup",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ PreparedStatementNames: __S(1552, __c97, 0), WorkGroup: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "BatchGetPreparedStatementInput" });
    case 1:
      return S.Array(__S(16, __c1, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          StatementName: S.optional(S.String),
          ErrorCode: S.optional(S.String),
          ErrorMessage: S.optional(S.String),
        }),
      ).annotate({ identifier: "UnprocessedPreparedStatementName" });
    case 3:
      return S.Array(__S(2, __c0, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          PreparedStatements: S.optional(__S(1, __c0, 1)),
          UnprocessedPreparedStatementNames: S.optional(__S(3, __c0, 3)),
        }),
      ).annotate({ identifier: "BatchGetPreparedStatementOutput" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          StatementName: S.optional(S.String),
          QueryStatement: S.optional(S.String),
          WorkGroupName: S.optional(S.String),
          Description: S.optional(S.String),
          LastModifiedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "PreparedStatement" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ QueryExecutionIds: __S(1552, __c97, 0) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "BatchGetQueryExecutionInput" });
    case 1:
      return S.Array(__S(148, __c9, 4));
    case 2:
      return S.suspend(() =>
        S.Struct({
          QueryExecutionId: S.optional(S.String),
          ErrorCode: S.optional(S.String),
          ErrorMessage: S.optional(S.String),
        }),
      ).annotate({ identifier: "UnprocessedQueryExecutionId" });
    case 3:
      return S.Array(__S(34, __c2, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          QueryExecutions: S.optional(__S(33, __c2, 1)),
          UnprocessedQueryExecutionIds: S.optional(__S(35, __c2, 3)),
        }),
      ).annotate({ identifier: "BatchGetQueryExecutionOutput" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ EncryptionOption: S.String, KmsKey: S.optional(S.String) }),
      ).annotate({ identifier: "EncryptionConfiguration" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Enabled: S.Boolean, EncryptionConfiguration: S.optional(__S(128, __c8, 0)) }),
      ).annotate({ identifier: "ManagedQueryResultsConfiguration" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SelectedEngineVersion: S.optional(S.String),
          EffectiveEngineVersion: S.optional(S.String),
        }),
      ).annotate({ identifier: "EngineVersion" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          OutputLocation: S.optional(S.String),
          EncryptionConfiguration: S.optional(__S(48, __c3, 0)),
          ExpectedBucketOwner: S.optional(S.String),
          AclConfiguration: S.optional(__S(112, __c7, 0)),
        }),
      ).annotate({ identifier: "ResultConfiguration" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ S3AclOption: S.String })).annotate({
        identifier: "AclConfiguration",
      });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ KmsKey: S.String })).annotate({
        identifier: "ManagedQueryResultsEncryptionConfiguration",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          EnableS3AccessGrants: S.Boolean,
          CreateUserLevelPrefix: S.optional(S.Boolean),
          AuthenticationType: S.String,
        }),
      ).annotate({ identifier: "QueryResultsS3AccessGrantsConfiguration" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ErrorCategory: S.optional(S.Number),
          ErrorType: S.optional(S.Number),
          Retryable: S.optional(S.Boolean),
          ErrorMessage: S.optional(S.String),
        }),
      ).annotate({ identifier: "AthenaError" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          State: S.optional(S.String),
          StateChangeReason: S.optional(S.String),
          SubmissionDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          CompletionDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          AthenaError: S.optional(__S(144, __c9, 0)),
        }),
      ).annotate({ identifier: "QueryExecutionStatus" });
    case 2:
      return S.suspend(() => S.Struct({ ReusedPreviousResult: S.Boolean })).annotate({
        identifier: "ResultReuseInformation",
      });
    case 3:
      return S.suspend(() =>
        S.Struct({
          EngineExecutionTimeInMillis: S.optional(S.Number),
          DataScannedInBytes: S.optional(S.Number),
          DataManifestLocation: S.optional(S.String),
          TotalExecutionTimeInMillis: S.optional(S.Number),
          QueryQueueTimeInMillis: S.optional(S.Number),
          ServicePreProcessingTimeInMillis: S.optional(S.Number),
          QueryPlanningTimeInMillis: S.optional(S.Number),
          ServiceProcessingTimeInMillis: S.optional(S.Number),
          ResultReuseInformation: S.optional(__S(146, __c9, 2)),
          DpuCount: S.optional(S.Number),
        }),
      ).annotate({ identifier: "QueryExecutionStatistics" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          QueryExecutionId: S.optional(S.String),
          Query: S.optional(S.String),
          StatementType: S.optional(S.String),
          ManagedQueryResultsConfiguration: S.optional(__S(64, __c4, 0)),
          ResultConfiguration: S.optional(__S(96, __c6, 0)),
          ResultReuseConfiguration: S.optional(__S(161, __c10, 1)),
          QueryExecutionContext: S.optional(__S(162, __c10, 2)),
          Status: S.optional(__S(145, __c9, 1)),
          Statistics: S.optional(__S(147, __c9, 3)),
          WorkGroup: S.optional(S.String),
          EngineVersion: S.optional(__S(80, __c5, 0)),
          ExecutionParameters: S.optional(__S(1552, __c97, 0)),
          SubstatementType: S.optional(S.String),
          QueryResultsS3AccessGrantsConfiguration: S.optional(__S(129, __c8, 1)),
        }),
      ).annotate({ identifier: "QueryExecution" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Enabled: S.Boolean, MaxAgeInMinutes: S.optional(S.Number) }),
      ).annotate({ identifier: "ResultReuseByAgeConfiguration" });
    case 1:
      return S.suspend(() =>
        S.Struct({ ResultReuseByAgeConfiguration: S.optional(__S(160, __c10, 0)) }),
      ).annotate({ identifier: "ResultReuseConfiguration" });
    case 2:
      return S.suspend(() =>
        S.Struct({ Database: S.optional(S.String), Catalog: S.optional(S.String) }),
      ).annotate({ identifier: "QueryExecutionContext" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CancelCapacityReservationInput" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({
        identifier: "CancelCapacityReservationOutput",
      });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          TargetDpus: S.Number,
          Name: S.String,
          Tags: S.optional(__S(225, __c14, 1)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateCapacityReservationInput" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Key: S.optional(S.String), Value: S.optional(S.String) }),
      ).annotate({ identifier: "Tag" });
    case 1:
      return S.Array(__S(224, __c14, 0));
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          Type: S.String,
          Description: S.optional(S.String),
          Parameters: S.optional(__S(256, __c16, 0)),
          Tags: S.optional(__S(225, __c14, 1)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateDataCatalogInput" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          Description: S.optional(S.String),
          Type: S.String,
          Parameters: S.optional(__S(256, __c16, 0)),
          Status: S.optional(S.String),
          ConnectionType: S.optional(S.String),
          Error: S.optional(S.String),
        }),
      ).annotate({ identifier: "DataCatalog" });
    case 1:
      return S.suspend(() => S.Struct({ DataCatalog: S.optional(__S(272, __c17, 0)) })).annotate({
        identifier: "CreateDataCatalogOutput",
      });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          Description: S.optional(S.String),
          Database: S.String,
          QueryString: S.String,
          ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          WorkGroup: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateNamedQueryInput" });
    case 1:
      return S.suspend(() => S.Struct({ NamedQueryId: S.optional(S.String) })).annotate({
        identifier: "CreateNamedQueryOutput",
      });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          WorkGroup: S.String,
          Name: S.String,
          ClientRequestToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateNotebookInput" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ NotebookId: S.optional(S.String) })).annotate({
        identifier: "CreateNotebookOutput",
      });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          StatementName: S.String,
          WorkGroup: S.String,
          QueryStatement: S.String,
          Description: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreatePreparedStatementInput" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ SessionId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreatePresignedNotebookUrlRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ NotebookUrl: S.String, AuthToken: S.String, AuthTokenExpirationTime: S.Number }),
      ).annotate({ identifier: "CreatePresignedNotebookUrlResponse" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          Configuration: S.optional(__S(417, __c26, 1)),
          Description: S.optional(S.String),
          Tags: S.optional(__S(225, __c14, 1)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateWorkGroupInput" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.optional(S.String), Properties: S.optional(__S(256, __c16, 0)) }),
      ).annotate({ identifier: "Classification" });
    case 1:
      return S.Array(__S(384, __c24, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          CoordinatorDpuSize: S.optional(S.Number),
          MaxConcurrentDpus: S.optional(S.Number),
          DefaultExecutorDpuSize: S.optional(S.Number),
          AdditionalConfigs: S.optional(__S(256, __c16, 0)),
          SparkProperties: S.optional(__S(256, __c16, 0)),
          Classifications: S.optional(__S(385, __c24, 1)),
        }),
      ).annotate({ identifier: "EngineConfiguration" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ __S(1552, __c97, 0).pipe(S.optional));
    case 1:
      return S.suspend(() =>
        S.Struct({
          Enabled: S.Boolean,
          LogGroup: S.optional(S.String),
          LogStreamNamePrefix: S.optional(S.String),
          LogTypes: S.optional(__S(400, __c25, 0)),
        }),
      ).annotate({ identifier: "CloudWatchLoggingConfiguration" });
    case 2:
      return S.suspend(() =>
        S.Struct({ Enabled: S.Boolean, KmsKey: S.optional(S.String) }),
      ).annotate({ identifier: "ManagedLoggingConfiguration" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          Enabled: S.Boolean,
          KmsKey: S.optional(S.String),
          LogLocation: S.optional(S.String),
        }),
      ).annotate({ identifier: "S3LoggingConfiguration" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          CloudWatchLoggingConfiguration: S.optional(__S(401, __c25, 1)),
          ManagedLoggingConfiguration: S.optional(__S(402, __c25, 2)),
          S3LoggingConfiguration: S.optional(__S(403, __c25, 3)),
        }),
      ).annotate({ identifier: "MonitoringConfiguration" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          EnableIdentityCenter: S.optional(S.Boolean),
          IdentityCenterInstanceArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "IdentityCenterConfiguration" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ResultConfiguration: S.optional(__S(96, __c6, 0)),
          ManagedQueryResultsConfiguration: S.optional(__S(64, __c4, 0)),
          EnforceWorkGroupConfiguration: S.optional(S.Boolean),
          PublishCloudWatchMetricsEnabled: S.optional(S.Boolean),
          BytesScannedCutoffPerQuery: S.optional(S.Number),
          RequesterPaysEnabled: S.optional(S.Boolean),
          EngineVersion: S.optional(__S(80, __c5, 0)),
          AdditionalConfiguration: S.optional(S.String),
          ExecutionRole: S.optional(S.String),
          MonitoringConfiguration: S.optional(__S(404, __c25, 4)),
          EngineConfiguration: S.optional(__S(386, __c24, 2)),
          CustomerContentEncryptionConfiguration: S.optional(__S(128, __c8, 0)),
          EnableMinimumEncryptionConfiguration: S.optional(S.Boolean),
          IdentityCenterConfiguration: S.optional(__S(416, __c26, 0)),
          QueryResultsS3AccessGrantsConfiguration: S.optional(__S(129, __c8, 1)),
        }),
      ).annotate({ identifier: "WorkGroupConfiguration" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteCapacityReservationInput" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.String, DeleteCatalogOnly: S.optional(S.Boolean) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteDataCatalogInput" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ NamedQueryId: S.String.pipe(T.IdempotencyToken()) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteNamedQueryInput" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ NotebookId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteNotebookInput" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ StatementName: S.String, WorkGroup: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeletePreparedStatementInput" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ WorkGroup: S.String, RecursiveDeleteOption: S.optional(S.Boolean) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteWorkGroupInput" });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ NotebookId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ExportNotebookInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          NotebookMetadata: S.optional(__S(544, __c34, 0)),
          Payload: S.optional(S.String),
        }),
      ).annotate({ identifier: "ExportNotebookOutput" });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NotebookId: S.optional(S.String),
          Name: S.optional(S.String),
          WorkGroup: S.optional(S.String),
          CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Type: S.optional(S.String),
          LastModifiedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "NotebookMetadata" });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ CalculationExecutionId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetCalculationExecutionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          StdOutS3Uri: S.optional(S.String),
          StdErrorS3Uri: S.optional(S.String),
          ResultS3Uri: S.optional(S.String),
          ResultType: S.optional(S.String),
        }),
      ).annotate({ identifier: "CalculationResult" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          CalculationExecutionId: S.optional(S.String),
          SessionId: S.optional(S.String),
          Description: S.optional(S.String),
          WorkingDirectory: S.optional(S.String),
          Status: S.optional(__S(592, __c37, 0)),
          Statistics: S.optional(__S(576, __c36, 0)),
          Result: S.optional(__S(561, __c35, 1)),
        }),
      ).annotate({ identifier: "GetCalculationExecutionResponse" });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DpuExecutionInMillis: S.optional(S.Number), Progress: S.optional(S.String) }),
      ).annotate({ identifier: "CalculationStatistics" });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SubmissionDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          CompletionDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          State: S.optional(S.String),
          StateChangeReason: S.optional(S.String),
        }),
      ).annotate({ identifier: "CalculationStatus" });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ CalculationExecutionId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetCalculationExecutionCodeRequest" });
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ CodeBlock: S.optional(S.String) })).annotate({
        identifier: "GetCalculationExecutionCodeResponse",
      });
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ CalculationExecutionId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetCalculationExecutionStatusRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Status: S.optional(__S(592, __c37, 0)),
          Statistics: S.optional(__S(576, __c36, 0)),
        }),
      ).annotate({ identifier: "GetCalculationExecutionStatusResponse" });
  }
}
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ CapacityReservationName: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetCapacityAssignmentConfigurationInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          CapacityReservationName: S.optional(S.String),
          CapacityAssignments: S.optional(__S(673, __c42, 1)),
        }),
      ).annotate({ identifier: "CapacityAssignmentConfiguration" });
    case 2:
      return S.suspend(() =>
        S.Struct({ CapacityAssignmentConfiguration: __S(657, __c41, 1) }),
      ).annotate({ identifier: "GetCapacityAssignmentConfigurationOutput" });
  }
}
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ WorkGroupNames: S.optional(__S(1552, __c97, 0)) }),
      ).annotate({ identifier: "CapacityAssignment" });
    case 1:
      return S.Array(__S(672, __c42, 0));
  }
}
function __c43(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetCapacityReservationInput" });
    case 1:
      return S.suspend(() => S.Struct({ CapacityReservation: __S(705, __c44, 1) })).annotate({
        identifier: "GetCapacityReservationOutput",
      });
  }
}
function __c44(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Status: S.String,
          StatusMessage: S.optional(S.String),
          RequestTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          RequestCompletionTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "CapacityAllocation" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          Status: S.String,
          TargetDpus: S.Number,
          AllocatedDpus: S.Number,
          LastAllocation: S.optional(__S(704, __c44, 0)),
          LastSuccessfulAllocationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          CreationTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "CapacityReservation" });
  }
}
function __c45(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CatalogName: S.String,
          DatabaseName: S.String,
          WorkGroup: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetDatabaseInput" });
    case 1:
      return S.suspend(() => S.Struct({ Database: S.optional(__S(736, __c46, 0)) })).annotate({
        identifier: "GetDatabaseOutput",
      });
  }
}
function __c46(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          Description: S.optional(S.String),
          Parameters: S.optional(__S(256, __c16, 0)),
        }),
      ).annotate({ identifier: "Database" });
  }
}
function __c47(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.String, WorkGroup: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetDataCatalogInput" });
  }
}
function __c48(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ NamedQueryId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetNamedQueryInput" });
    case 1:
      return S.suspend(() => S.Struct({ NamedQuery: S.optional(__S(1568, __c98, 0)) })).annotate({
        identifier: "GetNamedQueryOutput",
      });
  }
}
function __c49(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ NotebookId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetNotebookMetadataInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ NotebookMetadata: S.optional(__S(544, __c34, 0)) }),
      ).annotate({ identifier: "GetNotebookMetadataOutput" });
  }
}
function __c50(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ StatementName: S.String, WorkGroup: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetPreparedStatementInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ PreparedStatement: S.optional(__S(16, __c1, 0)) }),
      ).annotate({ identifier: "GetPreparedStatementOutput" });
  }
}
function __c51(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ QueryExecutionId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetQueryExecutionInput" });
    case 1:
      return S.suspend(() => S.Struct({ QueryExecution: S.optional(__S(148, __c9, 4)) })).annotate({
        identifier: "GetQueryExecutionOutput",
      });
  }
}
function __c52(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          QueryExecutionId: S.String,
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          QueryResultType: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetQueryResultsInput" });
    case 1:
      return S.suspend(() => S.Struct({ VarCharValue: S.optional(S.String) })).annotate({
        identifier: "Datum",
      });
    case 2:
      return S.Array(__S(833, __c52, 1));
    case 3:
      return S.suspend(() => S.Struct({ Data: S.optional(__S(834, __c52, 2)) })).annotate({
        identifier: "Row",
      });
    case 4:
      return S.Array(__S(835, __c52, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          CatalogName: S.optional(S.String),
          SchemaName: S.optional(S.String),
          TableName: S.optional(S.String),
          Name: S.String,
          Label: S.optional(S.String),
          Type: S.String,
          Precision: S.optional(S.Number),
          Scale: S.optional(S.Number),
          Nullable: S.optional(S.String),
          CaseSensitive: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "ColumnInfo" });
    case 6:
      return S.Array(__S(837, __c52, 5));
    case 7:
      return S.suspend(() => S.Struct({ ColumnInfo: S.optional(__S(838, __c52, 6)) })).annotate({
        identifier: "ResultSetMetadata",
      });
    case 8:
      return S.suspend(() =>
        S.Struct({
          Rows: S.optional(__S(836, __c52, 4)),
          ResultSetMetadata: S.optional(__S(839, __c52, 7)),
        }),
      ).annotate({ identifier: "ResultSet" });
    case 9:
      return S.suspend(() =>
        S.Struct({
          UpdateCount: S.optional(S.Number),
          ResultSet: S.optional(__S(840, __c52, 8)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetQueryResultsOutput" });
  }
}
function __c53(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ QueryExecutionId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetQueryRuntimeStatisticsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          QueryQueueTimeInMillis: S.optional(S.Number),
          ServicePreProcessingTimeInMillis: S.optional(S.Number),
          QueryPlanningTimeInMillis: S.optional(S.Number),
          EngineExecutionTimeInMillis: S.optional(S.Number),
          ServiceProcessingTimeInMillis: S.optional(S.Number),
          TotalExecutionTimeInMillis: S.optional(S.Number),
        }),
      ).annotate({ identifier: "QueryRuntimeStatisticsTimeline" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          InputRows: S.optional(S.Number),
          InputBytes: S.optional(S.Number),
          OutputBytes: S.optional(S.Number),
          OutputRows: S.optional(S.Number),
        }),
      ).annotate({ identifier: "QueryRuntimeStatisticsRows" });
    case 3:
      return S.Array(
        /*@__PURE__*/ S.suspend((): S.Schema<QueryStagePlanNode> => __S(852, __c53, 4)).annotate({
          identifier: "QueryStagePlanNode",
        }),
      );
    case 4:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Identifier: S.optional(S.String),
          Children: S.optional(
            S.suspend(() => __S(851, __c53, 3)).annotate({ identifier: "QueryStagePlanNodes" }),
          ),
          RemoteSources: S.optional(__S(1552, __c97, 0)),
        }),
      ).annotate({ identifier: "QueryStagePlanNode" });
    case 5:
      return S.Array(
        /*@__PURE__*/ S.suspend((): S.Schema<QueryStage> => __S(854, __c53, 6)).annotate({
          identifier: "QueryStage",
        }),
      );
    case 6:
      return S.suspend(() =>
        S.Struct({
          StageId: S.optional(S.Number),
          State: S.optional(S.String),
          OutputBytes: S.optional(S.Number),
          OutputRows: S.optional(S.Number),
          InputBytes: S.optional(S.Number),
          InputRows: S.optional(S.Number),
          ExecutionTime: S.optional(S.Number),
          QueryStagePlan: S.optional(
            S.suspend((): S.Schema<QueryStagePlanNode> => __S(852, __c53, 4)).annotate({
              identifier: "QueryStagePlanNode",
            }),
          ),
          SubStages: S.optional(
            S.suspend(() => __S(853, __c53, 5)).annotate({ identifier: "QueryStages" }),
          ),
        }),
      ).annotate({ identifier: "QueryStage" });
    case 7:
      return S.suspend(() =>
        S.Struct({
          Timeline: S.optional(__S(849, __c53, 1)),
          Rows: S.optional(__S(850, __c53, 2)),
          OutputStage: S.optional(__S(854, __c53, 6)),
        }),
      ).annotate({ identifier: "QueryRuntimeStatistics" });
    case 8:
      return S.suspend(() =>
        S.Struct({ QueryRuntimeStatistics: S.optional(__S(855, __c53, 7)) }),
      ).annotate({ identifier: "GetQueryRuntimeStatisticsOutput" });
  }
}
function __c54(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceARN: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetResourceDashboardRequest" });
    case 1:
      return S.suspend(() => S.Struct({ Url: S.String })).annotate({
        identifier: "GetResourceDashboardResponse",
      });
  }
}
function __c55(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ SessionId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetSessionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ExecutionRole: S.optional(S.String),
          WorkingDirectory: S.optional(S.String),
          IdleTimeoutSeconds: S.optional(S.Number),
          SessionIdleTimeoutInMinutes: S.optional(S.Number),
          EncryptionConfiguration: S.optional(__S(48, __c3, 0)),
        }),
      ).annotate({ identifier: "SessionConfiguration" });
    case 2:
      return S.suspend(() => S.Struct({ DpuExecutionInMillis: S.optional(S.Number) })).annotate({
        identifier: "SessionStatistics",
      });
    case 3:
      return S.suspend(() =>
        S.Struct({
          SessionId: S.optional(S.String),
          Description: S.optional(S.String),
          WorkGroup: S.optional(S.String),
          EngineVersion: S.optional(S.String),
          EngineConfiguration: S.optional(__S(386, __c24, 2)),
          NotebookVersion: S.optional(S.String),
          MonitoringConfiguration: S.optional(__S(404, __c25, 4)),
          SessionConfiguration: S.optional(__S(881, __c55, 1)),
          Status: S.optional(__S(896, __c56, 0)),
          Statistics: S.optional(__S(882, __c55, 2)),
        }),
      ).annotate({ identifier: "GetSessionResponse" });
  }
}
function __c56(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          StartDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastModifiedDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          EndDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          IdleSinceDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          State: S.optional(S.String),
          StateChangeReason: S.optional(S.String),
        }),
      ).annotate({ identifier: "SessionStatus" });
  }
}
function __c57(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ SessionId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetSessionEndpointRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          EndpointUrl: S.String,
          AuthToken: S.String,
          AuthTokenExpirationTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "GetSessionEndpointResponse" });
  }
}
function __c58(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ SessionId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetSessionStatusRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ SessionId: S.optional(S.String), Status: S.optional(__S(896, __c56, 0)) }),
      ).annotate({ identifier: "GetSessionStatusResponse" });
  }
}
function __c59(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CatalogName: S.String,
          DatabaseName: S.String,
          TableName: S.String,
          WorkGroup: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetTableMetadataInput" });
    case 1:
      return S.suspend(() => S.Struct({ TableMetadata: S.optional(__S(962, __c60, 2)) })).annotate({
        identifier: "GetTableMetadataOutput",
      });
  }
}
function __c60(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.String, Type: S.optional(S.String), Comment: S.optional(S.String) }),
      ).annotate({ identifier: "Column" });
    case 1:
      return S.Array(__S(960, __c60, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          CreateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastAccessTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          TableType: S.optional(S.String),
          Columns: S.optional(__S(961, __c60, 1)),
          PartitionKeys: S.optional(__S(961, __c60, 1)),
          Parameters: S.optional(__S(256, __c16, 0)),
        }),
      ).annotate({ identifier: "TableMetadata" });
  }
}
function __c61(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ WorkGroup: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetWorkGroupInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          State: S.optional(S.String),
          Configuration: S.optional(__S(417, __c26, 1)),
          Description: S.optional(S.String),
          CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          IdentityCenterApplicationArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "WorkGroup" });
    case 2:
      return S.suspend(() => S.Struct({ WorkGroup: S.optional(__S(977, __c61, 1)) })).annotate({
        identifier: "GetWorkGroupOutput",
      });
  }
}
function __c62(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          WorkGroup: S.String,
          Name: S.String,
          Payload: S.optional(S.String),
          Type: S.String,
          NotebookS3LocationUri: S.optional(S.String),
          ClientRequestToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ImportNotebookInput" });
  }
}
function __c63(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ MaxResults: S.optional(S.Number), NextToken: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListApplicationDPUSizesInput" });
    case 1:
      return S.Array(S.Number);
    case 2:
      return S.suspend(() =>
        S.Struct({
          ApplicationRuntimeId: S.optional(S.String),
          SupportedDPUSizes: S.optional(__S(1009, __c63, 1)),
        }),
      ).annotate({ identifier: "ApplicationDPUSizes" });
    case 3:
      return S.Array(__S(1010, __c63, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          ApplicationDPUSizes: S.optional(__S(1011, __c63, 3)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListApplicationDPUSizesOutput" });
  }
}
function __c64(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SessionId: S.String,
          StateFilter: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListCalculationExecutionsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          CalculationExecutionId: S.optional(S.String),
          Description: S.optional(S.String),
          Status: S.optional(__S(592, __c37, 0)),
        }),
      ).annotate({ identifier: "CalculationSummary" });
    case 2:
      return S.Array(__S(1025, __c64, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          Calculations: S.optional(__S(1026, __c64, 2)),
        }),
      ).annotate({ identifier: "ListCalculationExecutionsResponse" });
  }
}
function __c65(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ NextToken: S.optional(S.String), MaxResults: S.optional(S.Number) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListCapacityReservationsInput" });
    case 1:
      return S.Array(__S(705, __c44, 1));
    case 2:
      return S.suspend(() =>
        S.Struct({ NextToken: S.optional(S.String), CapacityReservations: __S(1041, __c65, 1) }),
      ).annotate({ identifier: "ListCapacityReservationsOutput" });
  }
}
function __c66(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CatalogName: S.String,
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          WorkGroup: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListDatabasesInput" });
    case 1:
      return S.Array(__S(736, __c46, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          DatabaseList: S.optional(__S(1057, __c66, 1)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListDatabasesOutput" });
  }
}
function __c67(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          WorkGroup: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListDataCatalogsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          CatalogName: S.optional(S.String),
          Type: S.optional(S.String),
          Status: S.optional(S.String),
          ConnectionType: S.optional(S.String),
          Error: S.optional(S.String),
        }),
      ).annotate({ identifier: "DataCatalogSummary" });
    case 2:
      return S.Array(__S(1073, __c67, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          DataCatalogsSummary: S.optional(__S(1074, __c67, 2)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListDataCatalogsOutput" });
  }
}
function __c68(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ NextToken: S.optional(S.String), MaxResults: S.optional(S.Number) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListEngineVersionsInput" });
    case 1:
      return S.Array(__S(80, __c5, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          EngineVersions: S.optional(__S(1089, __c68, 1)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListEngineVersionsOutput" });
  }
}
function __c69(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SessionId: S.String,
          ExecutorStateFilter: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListExecutorsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ExecutorId: S.String,
          ExecutorType: S.optional(S.String),
          StartDateTime: S.optional(S.Number),
          TerminationDateTime: S.optional(S.Number),
          ExecutorState: S.optional(S.String),
          ExecutorSize: S.optional(S.Number),
        }),
      ).annotate({ identifier: "ExecutorsSummary" });
    case 2:
      return S.Array(__S(1105, __c69, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          SessionId: S.String,
          NextToken: S.optional(S.String),
          ExecutorsSummary: S.optional(__S(1106, __c69, 2)),
        }),
      ).annotate({ identifier: "ListExecutorsResponse" });
  }
}
function __c70(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          WorkGroup: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListNamedQueriesInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          NamedQueryIds: S.optional(__S(1552, __c97, 0)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListNamedQueriesOutput" });
  }
}
function __c71(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Name: S.optional(S.String) })).annotate({
        identifier: "FilterDefinition",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Filters: S.optional(__S(1136, __c71, 0)),
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          WorkGroup: S.String,
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListNotebookMetadataInput" });
    case 2:
      return S.Array(__S(544, __c34, 0));
    case 3:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          NotebookMetadataList: S.optional(__S(1138, __c71, 2)),
        }),
      ).annotate({ identifier: "ListNotebookMetadataOutput" });
  }
}
function __c72(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NotebookId: S.String,
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListNotebookSessionsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          SessionId: S.optional(S.String),
          CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "NotebookSessionSummary" });
    case 2:
      return S.Array(__S(1153, __c72, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ NotebookSessionsList: __S(1154, __c72, 2), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListNotebookSessionsResponse" });
  }
}
function __c73(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          WorkGroup: S.String,
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListPreparedStatementsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          StatementName: S.optional(S.String),
          LastModifiedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "PreparedStatementSummary" });
    case 2:
      return S.Array(__S(1169, __c73, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          PreparedStatements: S.optional(__S(1170, __c73, 2)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListPreparedStatementsOutput" });
  }
}
function __c74(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          WorkGroup: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListQueryExecutionsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          QueryExecutionIds: S.optional(__S(1552, __c97, 0)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListQueryExecutionsOutput" });
  }
}
function __c75(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          WorkGroup: S.String,
          StateFilter: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListSessionsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          SessionId: S.optional(S.String),
          Description: S.optional(S.String),
          EngineVersion: S.optional(__S(80, __c5, 0)),
          NotebookVersion: S.optional(S.String),
          Status: S.optional(__S(896, __c56, 0)),
        }),
      ).annotate({ identifier: "SessionSummary" });
    case 2:
      return S.Array(__S(1201, __c75, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ NextToken: S.optional(S.String), Sessions: S.optional(__S(1202, __c75, 2)) }),
      ).annotate({ identifier: "ListSessionsResponse" });
  }
}
function __c76(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CatalogName: S.String,
          DatabaseName: S.String,
          Expression: S.optional(S.String),
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          WorkGroup: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListTableMetadataInput" });
    case 1:
      return S.Array(__S(962, __c60, 2));
    case 2:
      return S.suspend(() =>
        S.Struct({
          TableMetadataList: S.optional(__S(1217, __c76, 1)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListTableMetadataOutput" });
  }
}
function __c77(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceARN: S.String,
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListTagsForResourceInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Tags: S.optional(__S(225, __c14, 1)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListTagsForResourceOutput" });
  }
}
function __c78(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ NextToken: S.optional(S.String), MaxResults: S.optional(S.Number) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListWorkGroupsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          State: S.optional(S.String),
          Description: S.optional(S.String),
          CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          EngineVersion: S.optional(__S(80, __c5, 0)),
          IdentityCenterApplicationArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "WorkGroupSummary" });
    case 2:
      return S.Array(__S(1249, __c78, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ WorkGroups: S.optional(__S(1250, __c78, 2)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListWorkGroupsOutput" });
  }
}
function __c79(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CapacityReservationName: S.String,
          CapacityAssignments: __S(673, __c42, 1),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "PutCapacityAssignmentConfigurationInput" });
  }
}
function __c80(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SessionId: S.String,
          Description: S.optional(S.String),
          CalculationConfiguration: S.optional(__S(624, __c39, 0)),
          CodeBlock: S.optional(S.String),
          ClientRequestToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "StartCalculationExecutionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ CalculationExecutionId: S.optional(S.String), State: S.optional(S.String) }),
      ).annotate({ identifier: "StartCalculationExecutionResponse" });
  }
}
function __c81(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          QueryString: S.String,
          ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          QueryExecutionContext: S.optional(__S(162, __c10, 2)),
          ResultConfiguration: S.optional(__S(96, __c6, 0)),
          WorkGroup: S.optional(S.String),
          ExecutionParameters: S.optional(__S(1552, __c97, 0)),
          ResultReuseConfiguration: S.optional(__S(161, __c10, 1)),
          EngineConfiguration: S.optional(__S(386, __c24, 2)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "StartQueryExecutionInput" });
    case 1:
      return S.suspend(() => S.Struct({ QueryExecutionId: S.optional(S.String) })).annotate({
        identifier: "StartQueryExecutionOutput",
      });
  }
}
function __c82(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Description: S.optional(S.String),
          WorkGroup: S.String,
          EngineConfiguration: __S(386, __c24, 2),
          ExecutionRole: S.optional(S.String),
          MonitoringConfiguration: S.optional(__S(404, __c25, 4)),
          NotebookVersion: S.optional(S.String),
          SessionIdleTimeoutInMinutes: S.optional(S.Number),
          ClientRequestToken: S.optional(S.String),
          Tags: S.optional(__S(225, __c14, 1)),
          CopyWorkGroupTags: S.optional(S.Boolean),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "StartSessionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ SessionId: S.optional(S.String), State: S.optional(S.String) }),
      ).annotate({ identifier: "StartSessionResponse" });
  }
}
function __c83(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ CalculationExecutionId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "StopCalculationExecutionRequest" });
  }
}
function __c84(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ State: S.optional(S.String) })).annotate({
        identifier: "StopCalculationExecutionResponse",
      });
  }
}
function __c85(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ QueryExecutionId: S.String.pipe(T.IdempotencyToken()) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "StopQueryExecutionInput" });
  }
}
function __c86(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceARN: S.String, Tags: __S(225, __c14, 1) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "TagResourceInput" });
  }
}
function __c87(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ SessionId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "TerminateSessionRequest" });
  }
}
function __c88(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceARN: S.String, TagKeys: __S(1552, __c97, 0) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UntagResourceInput" });
  }
}
function __c89(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ TargetDpus: S.Number, Name: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UpdateCapacityReservationInput" });
  }
}
function __c90(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          Type: S.String,
          Description: S.optional(S.String),
          Parameters: S.optional(__S(256, __c16, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateDataCatalogInput" });
  }
}
function __c91(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NamedQueryId: S.String,
          Name: S.String,
          Description: S.optional(S.String),
          QueryString: S.String,
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateNamedQueryInput" });
  }
}
function __c92(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NotebookId: S.String,
          Payload: S.String,
          Type: S.String,
          SessionId: S.optional(S.String),
          ClientRequestToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateNotebookInput" });
  }
}
function __c93(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NotebookId: S.String,
          ClientRequestToken: S.optional(S.String),
          Name: S.String,
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateNotebookMetadataInput" });
  }
}
function __c94(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          StatementName: S.String,
          WorkGroup: S.String,
          QueryStatement: S.String,
          Description: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdatePreparedStatementInput" });
  }
}
function __c95(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          OutputLocation: S.optional(S.String),
          RemoveOutputLocation: S.optional(S.Boolean),
          EncryptionConfiguration: S.optional(__S(48, __c3, 0)),
          RemoveEncryptionConfiguration: S.optional(S.Boolean),
          ExpectedBucketOwner: S.optional(S.String),
          RemoveExpectedBucketOwner: S.optional(S.Boolean),
          AclConfiguration: S.optional(__S(112, __c7, 0)),
          RemoveAclConfiguration: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "ResultConfigurationUpdates" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Enabled: S.optional(S.Boolean),
          EncryptionConfiguration: S.optional(__S(128, __c8, 0)),
          RemoveEncryptionConfiguration: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "ManagedQueryResultsConfigurationUpdates" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          EnforceWorkGroupConfiguration: S.optional(S.Boolean),
          ResultConfigurationUpdates: S.optional(__S(1520, __c95, 0)),
          ManagedQueryResultsConfigurationUpdates: S.optional(__S(1521, __c95, 1)),
          PublishCloudWatchMetricsEnabled: S.optional(S.Boolean),
          BytesScannedCutoffPerQuery: S.optional(S.Number),
          RemoveBytesScannedCutoffPerQuery: S.optional(S.Boolean),
          RequesterPaysEnabled: S.optional(S.Boolean),
          EngineVersion: S.optional(__S(80, __c5, 0)),
          RemoveCustomerContentEncryptionConfiguration: S.optional(S.Boolean),
          AdditionalConfiguration: S.optional(S.String),
          ExecutionRole: S.optional(S.String),
          CustomerContentEncryptionConfiguration: S.optional(__S(128, __c8, 0)),
          EnableMinimumEncryptionConfiguration: S.optional(S.Boolean),
          QueryResultsS3AccessGrantsConfiguration: S.optional(__S(129, __c8, 1)),
          MonitoringConfiguration: S.optional(__S(404, __c25, 4)),
          EngineConfiguration: S.optional(__S(386, __c24, 2)),
        }),
      ).annotate({ identifier: "WorkGroupConfigurationUpdates" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          WorkGroup: S.String,
          Description: S.optional(S.String),
          ConfigurationUpdates: S.optional(__S(1522, __c95, 2)),
          State: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateWorkGroupInput" });
  }
}
function __c96(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ NamedQueryIds: __S(1552, __c97, 0) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "BatchGetNamedQueryInput" });
    case 1:
      return S.Array(__S(1568, __c98, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          NamedQueryId: S.optional(S.String),
          ErrorCode: S.optional(S.String),
          ErrorMessage: S.optional(S.String),
        }),
      ).annotate({ identifier: "UnprocessedNamedQueryId" });
    case 3:
      return S.Array(__S(1538, __c96, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          NamedQueries: S.optional(__S(1537, __c96, 1)),
          UnprocessedNamedQueryIds: S.optional(__S(1539, __c96, 3)),
        }),
      ).annotate({ identifier: "BatchGetNamedQueryOutput" });
  }
}
function __c97(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c98(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          Description: S.optional(S.String),
          Database: S.String,
          QueryString: S.String,
          NamedQueryId: S.optional(S.String),
          WorkGroup: S.optional(S.String),
        }),
      ).annotate({ identifier: "NamedQuery" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
