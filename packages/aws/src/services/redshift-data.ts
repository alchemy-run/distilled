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
  sdkId: "Redshift Data",
  serviceShapeName: "RedshiftData",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "redshift-data" });
const ver = /*@__PURE__*/ T.ServiceVersion("2019-12-20");
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
              `https://redshift-data-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://redshift-data-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://redshift-data.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://redshift-data.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://redshift-data.{R}.{D}","properties":{},"headers":{}}');

export class ActiveSessionsExceededException
  extends /*@__PURE__*/ S.TaggedError<ActiveSessionsExceededException>()(
    "ActiveSessionsExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ActiveStatementsExceededException
  extends /*@__PURE__*/ S.TaggedError<ActiveStatementsExceededException>()(
    "ActiveStatementsExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ActiveWaitingRequestsExceededException
  extends /*@__PURE__*/ S.TaggedError<ActiveWaitingRequestsExceededException>()(
    "ActiveWaitingRequestsExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class BatchExecuteStatementException
  extends /*@__PURE__*/ S.TaggedError<BatchExecuteStatementException>()(
    "BatchExecuteStatementException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()), StatementId: S.String },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError) {}
export class DatabaseConnectionException
  extends /*@__PURE__*/ S.TaggedError<DatabaseConnectionException>()(
    "DatabaseConnectionException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError) {}
export class ExecuteStatementException
  extends /*@__PURE__*/ S.TaggedError<ExecuteStatementException>()(
    "ExecuteStatementException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()), StatementId: S.String },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError) {}
export class QueryTimeoutException
  extends /*@__PURE__*/ S.TaggedError<QueryTimeoutException>()(
    "QueryTimeoutException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()), ResourceId: S.String },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type StatementString = string;
export type SqlList = string[];
export type ClusterIdentifierString = string;
export type SecretArn = string;
export type StatementNameString = string;
export type ParameterName = string;
export type ParameterValue = string;
export interface SqlParameter {
  name: string;
  value: string;
}
export type SqlParametersList = SqlParameter[];
export type WorkgroupNameString = string;
export type ClientToken = string;
export type ResultFormatString = string;
export type SessionAliveSeconds = number;
export type UUID = string;
export type ExecutionMode = string;
export type WaitTimeSeconds = number;
export interface BatchExecuteStatementInput {
  Sqls: string[];
  ClusterIdentifier?: string;
  SecretArn?: string;
  DbUser?: string;
  Database?: string;
  WithEvent?: boolean;
  StatementName?: string;
  Parameters?: SqlParameter[];
  WorkgroupName?: string;
  ClientToken?: string;
  ResultFormat?: string;
  SessionKeepAliveSeconds?: number;
  SessionId?: string;
  ExecutionMode?: string;
  WaitTimeSeconds?: number;
}
export type DbGroupList = string[];
export type StatementStatusString = string;
export type BoxedLong = number;
export type BoxedBoolean = boolean;
export interface BatchExecuteStatementOutput {
  Id?: string;
  CreatedAt?: Date;
  ClusterIdentifier?: string;
  DbUser?: string;
  DbGroups?: string[];
  Database?: string;
  SecretArn?: string;
  WorkgroupName?: string;
  SessionId?: string;
  Status?: string;
  RedshiftPid?: number;
  HasResultSet?: boolean;
}
export interface CancelStatementRequest {
  Id: string;
}
export interface CancelStatementResponse {
  Status?: boolean;
}
export interface DescribeStatementRequest {
  Id: string;
  WaitTimeSeconds?: number;
}
export type StatusString = string;
export interface SubStatementData {
  Id: string;
  Duration?: number;
  Error?: string;
  Status?: string;
  CreatedAt?: Date;
  UpdatedAt?: Date;
  QueryString?: string;
  ResultRows?: number;
  ResultSize?: number;
  RedshiftQueryId?: number;
  HasResultSet?: boolean;
}
export type SubStatementList = SubStatementData[];
export interface DescribeStatementResponse {
  Id: string;
  SecretArn?: string;
  DbUser?: string;
  Database?: string;
  ClusterIdentifier?: string;
  Duration?: number;
  Error?: string;
  Status?: string;
  CreatedAt?: Date;
  UpdatedAt?: Date;
  RedshiftPid?: number;
  HasResultSet?: boolean;
  QueryString?: string;
  ResultRows?: number;
  ResultSize?: number;
  RedshiftQueryId?: number;
  QueryParameters?: SqlParameter[];
  SubStatements?: SubStatementData[];
  WorkgroupName?: string;
  ResultFormat?: string;
  SessionId?: string;
  ExecutionMode?: string;
}
export type PageSize = number;
export interface DescribeTableRequest {
  ClusterIdentifier?: string;
  SecretArn?: string;
  DbUser?: string;
  Database: string;
  ConnectedDatabase?: string;
  Schema?: string;
  Table?: string;
  NextToken?: string;
  MaxResults?: number;
  WorkgroupName?: string;
}
export interface ColumnMetadata {
  isCaseSensitive?: boolean;
  isCurrency?: boolean;
  isSigned?: boolean;
  label?: string;
  name?: string;
  nullable?: number;
  precision?: number;
  scale?: number;
  schemaName?: string;
  tableName?: string;
  typeName?: string;
  length?: number;
  columnDefault?: string;
}
export type ColumnList = ColumnMetadata[];
export interface DescribeTableResponse {
  TableName?: string;
  ColumnList?: ColumnMetadata[];
  NextToken?: string;
}
export interface ExecuteStatementInput {
  Sql: string;
  ClusterIdentifier?: string;
  SecretArn?: string;
  DbUser?: string;
  Database?: string;
  WithEvent?: boolean;
  StatementName?: string;
  Parameters?: SqlParameter[];
  WorkgroupName?: string;
  ClientToken?: string;
  ResultFormat?: string;
  SessionKeepAliveSeconds?: number;
  SessionId?: string;
  WaitTimeSeconds?: number;
}
export interface ExecuteStatementOutput {
  Id?: string;
  CreatedAt?: Date;
  ClusterIdentifier?: string;
  DbUser?: string;
  DbGroups?: string[];
  Database?: string;
  SecretArn?: string;
  WorkgroupName?: string;
  SessionId?: string;
  Status?: string;
  RedshiftPid?: number;
  HasResultSet?: boolean;
}
export interface GetStatementResultRequest {
  Id: string;
  NextToken?: string;
  WaitTimeSeconds?: number;
}
export type BoxedDouble = number;
export type Field =
  | {
      isNull: boolean;
      booleanValue?: never;
      longValue?: never;
      doubleValue?: never;
      stringValue?: never;
      blobValue?: never;
    }
  | {
      isNull?: never;
      booleanValue: boolean;
      longValue?: never;
      doubleValue?: never;
      stringValue?: never;
      blobValue?: never;
    }
  | {
      isNull?: never;
      booleanValue?: never;
      longValue: number;
      doubleValue?: never;
      stringValue?: never;
      blobValue?: never;
    }
  | {
      isNull?: never;
      booleanValue?: never;
      longValue?: never;
      doubleValue: number;
      stringValue?: never;
      blobValue?: never;
    }
  | {
      isNull?: never;
      booleanValue?: never;
      longValue?: never;
      doubleValue?: never;
      stringValue: string;
      blobValue?: never;
    }
  | {
      isNull?: never;
      booleanValue?: never;
      longValue?: never;
      doubleValue?: never;
      stringValue?: never;
      blobValue: Uint8Array;
    };
export type FieldList = Field[];
export type SqlRecords = Field[][];
export type ColumnMetadataList = ColumnMetadata[];
export interface GetStatementResultResponse {
  Records: Field[][];
  ColumnMetadata?: ColumnMetadata[];
  TotalNumRows?: number;
  NextToken?: string;
}
export interface GetStatementResultV2Request {
  Id: string;
  NextToken?: string;
  WaitTimeSeconds?: number;
}
export type QueryRecords = { CSVRecords: string };
export type FormattedSqlRecords = QueryRecords[];
export interface GetStatementResultV2Response {
  Records: QueryRecords[];
  ColumnMetadata?: ColumnMetadata[];
  TotalNumRows?: number;
  ResultFormat?: string;
  NextToken?: string;
}
export interface ListDatabasesRequest {
  ClusterIdentifier?: string;
  Database?: string;
  SecretArn?: string;
  DbUser?: string;
  NextToken?: string;
  MaxResults?: number;
  WorkgroupName?: string;
}
export type DatabaseList = string[];
export interface ListDatabasesResponse {
  Databases?: string[];
  NextToken?: string;
}
export interface ListSchemasRequest {
  ClusterIdentifier?: string;
  SecretArn?: string;
  DbUser?: string;
  Database: string;
  ConnectedDatabase?: string;
  SchemaPattern?: string;
  NextToken?: string;
  MaxResults?: number;
  WorkgroupName?: string;
}
export type SchemaList = string[];
export interface ListSchemasResponse {
  Schemas?: string[];
  NextToken?: string;
}
export type ListStatementsLimit = number;
export type SessionStatusString = string;
export interface ListSessionsRequest {
  NextToken?: string;
  MaxResults?: number;
  SessionId?: string;
  Status?: string;
  RoleLevel?: boolean;
  ClusterIdentifier?: string;
  WorkgroupName?: string;
  Database?: string;
}
export interface SessionData {
  SessionId: string;
  Status: string;
  CreatedAt: Date;
  UpdatedAt?: Date;
  Database?: string;
  DbUser?: string;
  ClusterIdentifier?: string;
  WorkgroupName?: string;
  SessionAliveSeconds?: number;
  SessionTtl?: Date;
  CurrentStatementId?: string;
}
export type SessionList = SessionData[];
export interface ListSessionsResponse {
  Sessions: SessionData[];
  NextToken?: string;
}
export interface ListStatementsRequest {
  NextToken?: string;
  MaxResults?: number;
  StatementName?: string;
  Status?: string;
  RoleLevel?: boolean;
  Database?: string;
  ClusterIdentifier?: string;
  WorkgroupName?: string;
}
export type StatementStringList = string[];
export interface StatementData {
  Id: string;
  QueryString?: string;
  QueryStrings?: string[];
  SecretArn?: string;
  Status?: string;
  StatementName?: string;
  CreatedAt?: Date;
  UpdatedAt?: Date;
  QueryParameters?: SqlParameter[];
  IsBatchStatement?: boolean;
  ResultFormat?: string;
  SessionId?: string;
}
export type StatementList = StatementData[];
export interface ListStatementsResponse {
  Statements: StatementData[];
  NextToken?: string;
}
export interface ListTablesRequest {
  ClusterIdentifier?: string;
  SecretArn?: string;
  DbUser?: string;
  Database: string;
  ConnectedDatabase?: string;
  SchemaPattern?: string;
  TablePattern?: string;
  NextToken?: string;
  MaxResults?: number;
  WorkgroupName?: string;
}
export interface TableMember {
  name?: string;
  type?: string;
  schema?: string;
}
export type TableList = TableMember[];
export interface ListTablesResponse {
  Tables?: TableMember[];
  NextToken?: string;
}
export type BatchExecuteStatementError =
  | ActiveSessionsExceededException
  | ActiveStatementsExceededException
  | BatchExecuteStatementException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Runs one or more SQL statements, which can be data manipulation language (DML) or data definition language (DDL). Depending on the authorization method, use one of the following combinations of request parameters:
 *
 * - Secrets Manager - when connecting to a cluster, provide the `secret-arn` of a secret stored in Secrets Manager which has `username` and `password`. The specified secret contains credentials to connect to the `database` you specify. When you are connecting to a cluster, you also supply the database name, If you provide a cluster identifier (`dbClusterIdentifier`), it must match the cluster identifier stored in the secret. When you are connecting to a serverless workgroup, you also supply the database name.
 *
 * - Temporary credentials - when connecting to your data warehouse, choose one of the following options:
 *
 * - When connecting to a serverless workgroup, specify the workgroup name and database name. The database user name is derived from the IAM identity. For example, `arn:iam::123456789012:user:foo` has the database user name `IAM:foo`. Also, permission to call the `redshift-serverless:GetCredentials` operation is required.
 *
 * - When connecting to a cluster as an IAM identity, specify the cluster identifier and the database name. The database user name is derived from the IAM identity. For example, `arn:iam::123456789012:user:foo` has the database user name `IAM:foo`. Also, permission to call the `redshift:GetClusterCredentialsWithIAM` operation is required.
 *
 * - When connecting to a cluster as a database user, specify the cluster identifier, the database name, and the database user name. Also, permission to call the `redshift:GetClusterCredentials` operation is required.
 *
 * For more information about the Amazon Redshift Data API and CLI usage examples, see Using the Amazon Redshift Data API in the *Amazon Redshift Management Guide*.
 */
export const batchExecuteStatement: API.OperationMethod<
  BatchExecuteStatementInput,
  BatchExecuteStatementOutput,
  BatchExecuteStatementError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<BatchExecuteStatementInput>,
  output: __S(16, __c2, 0) as any as S.Schema<BatchExecuteStatementOutput>,
  errors: [
    ActiveSessionsExceededException,
    ActiveStatementsExceededException,
    BatchExecuteStatementException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchExecuteStatement",
}));

export type CancelStatementError =
  | DatabaseConnectionException
  | InternalServerException
  | QueryTimeoutException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Cancels a running query. To be canceled, a query must be running.
 *
 * For more information about the Amazon Redshift Data API and CLI usage examples, see Using the Amazon Redshift Data API in the *Amazon Redshift Management Guide*.
 */
export const cancelStatement: API.OperationMethod<
  CancelStatementRequest,
  CancelStatementResponse,
  CancelStatementError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(32, __c4, 0) as any as S.Schema<CancelStatementRequest>,
  output: __S(33, __c4, 1) as any as S.Schema<CancelStatementResponse>,
  errors: [
    DatabaseConnectionException,
    InternalServerException,
    QueryTimeoutException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelStatement",
}));

export type DescribeStatementError =
  | ActiveWaitingRequestsExceededException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Describes the details about a specific instance when a query was run by the Amazon Redshift Data API. The information includes when the query started, when it finished, the query status, the number of rows returned, and the SQL statement.
 *
 * For more information about the Amazon Redshift Data API and CLI usage examples, see Using the Amazon Redshift Data API in the *Amazon Redshift Management Guide*.
 */
export const describeStatement: API.OperationMethod<
  DescribeStatementRequest,
  DescribeStatementResponse,
  DescribeStatementError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(40, __c5, 0) as any as S.Schema<DescribeStatementRequest>,
  output: __S(43, __c5, 3) as any as S.Schema<DescribeStatementResponse>,
  errors: [
    ActiveWaitingRequestsExceededException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeStatement",
}));

export type DescribeTableError =
  | DatabaseConnectionException
  | InternalServerException
  | QueryTimeoutException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Describes the detailed information about a table from metadata in the cluster. The information includes its columns. A token is returned to page through the column list. Depending on the authorization method, use one of the following combinations of request parameters:
 *
 * - Secrets Manager - when connecting to a cluster, provide the `secret-arn` of a secret stored in Secrets Manager which has `username` and `password`. The specified secret contains credentials to connect to the `database` you specify. When you are connecting to a cluster, you also supply the database name, If you provide a cluster identifier (`dbClusterIdentifier`), it must match the cluster identifier stored in the secret. When you are connecting to a serverless workgroup, you also supply the database name.
 *
 * - Temporary credentials - when connecting to your data warehouse, choose one of the following options:
 *
 * - When connecting to a serverless workgroup, specify the workgroup name and database name. The database user name is derived from the IAM identity. For example, `arn:iam::123456789012:user:foo` has the database user name `IAM:foo`. Also, permission to call the `redshift-serverless:GetCredentials` operation is required.
 *
 * - When connecting to a cluster as an IAM identity, specify the cluster identifier and the database name. The database user name is derived from the IAM identity. For example, `arn:iam::123456789012:user:foo` has the database user name `IAM:foo`. Also, permission to call the `redshift:GetClusterCredentialsWithIAM` operation is required.
 *
 * - When connecting to a cluster as a database user, specify the cluster identifier, the database name, and the database user name. Also, permission to call the `redshift:GetClusterCredentials` operation is required.
 *
 * For more information about the Amazon Redshift Data API and CLI usage examples, see Using the Amazon Redshift Data API in the *Amazon Redshift Management Guide*.
 */
export const describeTable: API.PaginatedOperationMethod<
  DescribeTableRequest,
  DescribeTableResponse,
  DescribeTableError,
  Credentials | HttpClient.HttpClient,
  ColumnMetadata
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(48, __c6, 0) as any as S.Schema<DescribeTableRequest>,
  output: __S(49, __c6, 1) as any as S.Schema<DescribeTableResponse>,
  errors: [
    DatabaseConnectionException,
    InternalServerException,
    QueryTimeoutException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeTable",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ColumnList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ExecuteStatementError =
  | ActiveSessionsExceededException
  | ActiveStatementsExceededException
  | ExecuteStatementException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Runs an SQL statement, which can be data manipulation language (DML) or data definition language (DDL). This statement must be a single SQL statement. Depending on the authorization method, use one of the following combinations of request parameters:
 *
 * - Secrets Manager - when connecting to a cluster, provide the `secret-arn` of a secret stored in Secrets Manager which has `username` and `password`. The specified secret contains credentials to connect to the `database` you specify. When you are connecting to a cluster, you also supply the database name, If you provide a cluster identifier (`dbClusterIdentifier`), it must match the cluster identifier stored in the secret. When you are connecting to a serverless workgroup, you also supply the database name.
 *
 * - Temporary credentials - when connecting to your data warehouse, choose one of the following options:
 *
 * - When connecting to a serverless workgroup, specify the workgroup name and database name. The database user name is derived from the IAM identity. For example, `arn:iam::123456789012:user:foo` has the database user name `IAM:foo`. Also, permission to call the `redshift-serverless:GetCredentials` operation is required.
 *
 * - When connecting to a cluster as an IAM identity, specify the cluster identifier and the database name. The database user name is derived from the IAM identity. For example, `arn:iam::123456789012:user:foo` has the database user name `IAM:foo`. Also, permission to call the `redshift:GetClusterCredentialsWithIAM` operation is required.
 *
 * - When connecting to a cluster as a database user, specify the cluster identifier, the database name, and the database user name. Also, permission to call the `redshift:GetClusterCredentials` operation is required.
 *
 * For more information about the Amazon Redshift Data API and CLI usage examples, see Using the Amazon Redshift Data API in the *Amazon Redshift Management Guide*.
 */
export const executeStatement: API.OperationMethod<
  ExecuteStatementInput,
  ExecuteStatementOutput,
  ExecuteStatementError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(64, __c8, 0) as any as S.Schema<ExecuteStatementInput>,
  output: __S(16, __c2, 0) as any as S.Schema<ExecuteStatementOutput>,
  errors: [
    ActiveSessionsExceededException,
    ActiveStatementsExceededException,
    ExecuteStatementException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ExecuteStatement",
}));

export type GetStatementResultError =
  | ActiveWaitingRequestsExceededException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Fetches the temporarily cached result of an SQL statement in JSON format. The `ExecuteStatement` or `BatchExecuteStatement` operation that ran the SQL statement must have specified `ResultFormat` as `JSON` , or let the format default to JSON. A token is returned to page through the statement results.
 *
 * For more information about the Amazon Redshift Data API and CLI usage examples, see Using the Amazon Redshift Data API in the *Amazon Redshift Management Guide*.
 */
export const getStatementResult: API.PaginatedOperationMethod<
  GetStatementResultRequest,
  GetStatementResultResponse,
  GetStatementResultError,
  Credentials | HttpClient.HttpClient,
  Field[]
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(72, __c9, 0) as any as S.Schema<GetStatementResultRequest>,
  output: __S(76, __c9, 4) as any as S.Schema<GetStatementResultResponse>,
  errors: [
    ActiveWaitingRequestsExceededException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetStatementResult",
  pagination: { inputToken: "NextToken", outputToken: "NextToken", items: "Records" } as const,
})) as any;

export type GetStatementResultV2Error =
  | ActiveWaitingRequestsExceededException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Fetches the temporarily cached result of an SQL statement in CSV format. The `ExecuteStatement` or `BatchExecuteStatement` operation that ran the SQL statement must have specified `ResultFormat` as `CSV`. A token is returned to page through the statement results.
 *
 * For more information about the Amazon Redshift Data API and CLI usage examples, see Using the Amazon Redshift Data API in the *Amazon Redshift Management Guide*.
 */
export const getStatementResultV2: API.PaginatedOperationMethod<
  GetStatementResultV2Request,
  GetStatementResultV2Response,
  GetStatementResultV2Error,
  Credentials | HttpClient.HttpClient,
  QueryRecords
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(80, __c10, 0) as any as S.Schema<GetStatementResultV2Request>,
  output: __S(83, __c10, 3) as any as S.Schema<GetStatementResultV2Response>,
  errors: [
    ActiveWaitingRequestsExceededException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetStatementResultV2",
  pagination: { inputToken: "NextToken", outputToken: "NextToken", items: "Records" } as const,
})) as any;

export type ListDatabasesError =
  | DatabaseConnectionException
  | InternalServerException
  | QueryTimeoutException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * List the databases in a cluster. A token is returned to page through the database list. Depending on the authorization method, use one of the following combinations of request parameters:
 *
 * - Secrets Manager - when connecting to a cluster, provide the `secret-arn` of a secret stored in Secrets Manager which has `username` and `password`. The specified secret contains credentials to connect to the `database` you specify. When you are connecting to a cluster, you also supply the database name, If you provide a cluster identifier (`dbClusterIdentifier`), it must match the cluster identifier stored in the secret. When you are connecting to a serverless workgroup, you also supply the database name.
 *
 * - Temporary credentials - when connecting to your data warehouse, choose one of the following options:
 *
 * - When connecting to a serverless workgroup, specify the workgroup name and database name. The database user name is derived from the IAM identity. For example, `arn:iam::123456789012:user:foo` has the database user name `IAM:foo`. Also, permission to call the `redshift-serverless:GetCredentials` operation is required.
 *
 * - When connecting to a cluster as an IAM identity, specify the cluster identifier and the database name. The database user name is derived from the IAM identity. For example, `arn:iam::123456789012:user:foo` has the database user name `IAM:foo`. Also, permission to call the `redshift:GetClusterCredentialsWithIAM` operation is required.
 *
 * - When connecting to a cluster as a database user, specify the cluster identifier, the database name, and the database user name. Also, permission to call the `redshift:GetClusterCredentials` operation is required.
 *
 * For more information about the Amazon Redshift Data API and CLI usage examples, see Using the Amazon Redshift Data API in the *Amazon Redshift Management Guide*.
 */
export const listDatabases: API.PaginatedOperationMethod<
  ListDatabasesRequest,
  ListDatabasesResponse,
  ListDatabasesError,
  Credentials | HttpClient.HttpClient,
  string
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(88, __c11, 0) as any as S.Schema<ListDatabasesRequest>,
  output: __S(89, __c11, 1) as any as S.Schema<ListDatabasesResponse>,
  errors: [
    DatabaseConnectionException,
    InternalServerException,
    QueryTimeoutException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDatabases",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Databases",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListSchemasError =
  | DatabaseConnectionException
  | InternalServerException
  | QueryTimeoutException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists the schemas in a database. A token is returned to page through the schema list. Depending on the authorization method, use one of the following combinations of request parameters:
 *
 * - Secrets Manager - when connecting to a cluster, provide the `secret-arn` of a secret stored in Secrets Manager which has `username` and `password`. The specified secret contains credentials to connect to the `database` you specify. When you are connecting to a cluster, you also supply the database name, If you provide a cluster identifier (`dbClusterIdentifier`), it must match the cluster identifier stored in the secret. When you are connecting to a serverless workgroup, you also supply the database name.
 *
 * - Temporary credentials - when connecting to your data warehouse, choose one of the following options:
 *
 * - When connecting to a serverless workgroup, specify the workgroup name and database name. The database user name is derived from the IAM identity. For example, `arn:iam::123456789012:user:foo` has the database user name `IAM:foo`. Also, permission to call the `redshift-serverless:GetCredentials` operation is required.
 *
 * - When connecting to a cluster as an IAM identity, specify the cluster identifier and the database name. The database user name is derived from the IAM identity. For example, `arn:iam::123456789012:user:foo` has the database user name `IAM:foo`. Also, permission to call the `redshift:GetClusterCredentialsWithIAM` operation is required.
 *
 * - When connecting to a cluster as a database user, specify the cluster identifier, the database name, and the database user name. Also, permission to call the `redshift:GetClusterCredentials` operation is required.
 *
 * For more information about the Amazon Redshift Data API and CLI usage examples, see Using the Amazon Redshift Data API in the *Amazon Redshift Management Guide*.
 */
export const listSchemas: API.PaginatedOperationMethod<
  ListSchemasRequest,
  ListSchemasResponse,
  ListSchemasError,
  Credentials | HttpClient.HttpClient,
  string
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(96, __c12, 0) as any as S.Schema<ListSchemasRequest>,
  output: __S(97, __c12, 1) as any as S.Schema<ListSchemasResponse>,
  errors: [
    DatabaseConnectionException,
    InternalServerException,
    QueryTimeoutException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSchemas",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Schemas",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListSessionsError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists the sessions that the caller created in the last 24 hours. By default, only sessions with a status of `AVAILABLE` or `BUSY` are returned. You can filter the results by session status, compute target (cluster or serverless workgroup), or database. To retrieve the metadata for a single session, provide the `SessionId` parameter. Use `NextToken` to page through the session list.
 *
 * Returns only the sessions that the caller created. When identity-enhanced role sessions are used, you must provide either the `ClusterIdentifier` or `WorkgroupName` parameter to ensure that the IAM Identity Center user can only access the Amazon Redshift IAM Identity Center applications they are assigned. For more information, see Trusted identity propagation overview.
 */
export const listSessions: API.PaginatedOperationMethod<
  ListSessionsRequest,
  ListSessionsResponse,
  ListSessionsError,
  Credentials | HttpClient.HttpClient,
  SessionData
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(104, __c13, 0) as any as S.Schema<ListSessionsRequest>,
  output: __S(107, __c13, 3) as any as S.Schema<ListSessionsResponse>,
  errors: [InternalServerException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSessions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Sessions",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListStatementsError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * List of SQL statements. By default, only finished statements are shown. A token is returned to page through the statement list.
 *
 * When you use identity-enhanced role sessions to list statements, you must provide either the `cluster-identifier` or `workgroup-name` parameter. This ensures that the IdC user can only access the Amazon Redshift IdC applications they are assigned. For more information, see Trusted identity propagation overview.
 *
 * For more information about the Amazon Redshift Data API and CLI usage examples, see Using the Amazon Redshift Data API in the *Amazon Redshift Management Guide*.
 */
export const listStatements: API.PaginatedOperationMethod<
  ListStatementsRequest,
  ListStatementsResponse,
  ListStatementsError,
  Credentials | HttpClient.HttpClient,
  StatementData
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(112, __c14, 0) as any as S.Schema<ListStatementsRequest>,
  output: __S(115, __c14, 3) as any as S.Schema<ListStatementsResponse>,
  errors: [InternalServerException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListStatements",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Statements",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTablesError =
  | DatabaseConnectionException
  | InternalServerException
  | QueryTimeoutException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * List the tables in a database. If neither `SchemaPattern` nor `TablePattern` are specified, then all tables in the database are returned. A token is returned to page through the table list. Depending on the authorization method, use one of the following combinations of request parameters:
 *
 * - Secrets Manager - when connecting to a cluster, provide the `secret-arn` of a secret stored in Secrets Manager which has `username` and `password`. The specified secret contains credentials to connect to the `database` you specify. When you are connecting to a cluster, you also supply the database name, If you provide a cluster identifier (`dbClusterIdentifier`), it must match the cluster identifier stored in the secret. When you are connecting to a serverless workgroup, you also supply the database name.
 *
 * - Temporary credentials - when connecting to your data warehouse, choose one of the following options:
 *
 * - When connecting to a serverless workgroup, specify the workgroup name and database name. The database user name is derived from the IAM identity. For example, `arn:iam::123456789012:user:foo` has the database user name `IAM:foo`. Also, permission to call the `redshift-serverless:GetCredentials` operation is required.
 *
 * - When connecting to a cluster as an IAM identity, specify the cluster identifier and the database name. The database user name is derived from the IAM identity. For example, `arn:iam::123456789012:user:foo` has the database user name `IAM:foo`. Also, permission to call the `redshift:GetClusterCredentialsWithIAM` operation is required.
 *
 * - When connecting to a cluster as a database user, specify the cluster identifier, the database name, and the database user name. Also, permission to call the `redshift:GetClusterCredentials` operation is required.
 *
 * For more information about the Amazon Redshift Data API and CLI usage examples, see Using the Amazon Redshift Data API in the *Amazon Redshift Management Guide*.
 */
export const listTables: API.PaginatedOperationMethod<
  ListTablesRequest,
  ListTablesResponse,
  ListTablesError,
  Credentials | HttpClient.HttpClient,
  TableMember
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(120, __c15, 0) as any as S.Schema<ListTablesRequest>,
  output: __S(123, __c15, 3) as any as S.Schema<ListTablesResponse>,
  errors: [
    DatabaseConnectionException,
    InternalServerException,
    QueryTimeoutException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTables",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Tables",
    pageSize: "MaxResults",
  } as const,
})) as any;

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Sqls: __S(24, __c3, 0),
          ClusterIdentifier: S.optional(S.String),
          SecretArn: S.optional(S.String),
          DbUser: S.optional(S.String),
          Database: S.optional(S.String),
          WithEvent: S.optional(S.Boolean),
          StatementName: S.optional(S.String),
          Parameters: S.optional(__S(9, __c1, 1)),
          WorkgroupName: S.optional(S.String),
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          ResultFormat: S.optional(S.String),
          SessionKeepAliveSeconds: S.optional(S.Number),
          SessionId: S.optional(S.String),
          ExecutionMode: S.optional(S.String),
          WaitTimeSeconds: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "BatchExecuteStatementInput" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ name: S.String, value: S.String })).annotate({
        identifier: "SqlParameter",
      });
    case 1:
      return S.Array(__S(8, __c1, 0));
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ClusterIdentifier: S.optional(S.String),
          DbUser: S.optional(S.String),
          DbGroups: S.optional(__S(24, __c3, 0)),
          Database: S.optional(S.String),
          SecretArn: S.optional(S.String),
          WorkgroupName: S.optional(S.String),
          SessionId: S.optional(S.String),
          Status: S.optional(S.String),
          RedshiftPid: S.optional(S.Number),
          HasResultSet: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "BatchExecuteStatementOutput" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Id: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CancelStatementRequest" });
    case 1:
      return S.suspend(() => S.Struct({ Status: S.optional(S.Boolean) })).annotate({
        identifier: "CancelStatementResponse",
      });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Id: S.String, WaitTimeSeconds: S.optional(S.Number) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeStatementRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Id: S.String,
          Duration: S.optional(S.Number),
          Error: S.optional(S.String),
          Status: S.optional(S.String),
          CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          UpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          QueryString: S.optional(S.String),
          ResultRows: S.optional(S.Number),
          ResultSize: S.optional(S.Number),
          RedshiftQueryId: S.optional(S.Number),
          HasResultSet: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "SubStatementData" });
    case 2:
      return S.Array(__S(41, __c5, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          Id: S.String,
          SecretArn: S.optional(S.String),
          DbUser: S.optional(S.String),
          Database: S.optional(S.String),
          ClusterIdentifier: S.optional(S.String),
          Duration: S.optional(S.Number),
          Error: S.optional(S.String),
          Status: S.optional(S.String),
          CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          UpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          RedshiftPid: S.optional(S.Number),
          HasResultSet: S.optional(S.Boolean),
          QueryString: S.optional(S.String),
          ResultRows: S.optional(S.Number),
          ResultSize: S.optional(S.Number),
          RedshiftQueryId: S.optional(S.Number),
          QueryParameters: S.optional(__S(9, __c1, 1)),
          SubStatements: S.optional(__S(42, __c5, 2)),
          WorkgroupName: S.optional(S.String),
          ResultFormat: S.optional(S.String),
          SessionId: S.optional(S.String),
          ExecutionMode: S.optional(S.String),
        }),
      ).annotate({ identifier: "DescribeStatementResponse" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClusterIdentifier: S.optional(S.String),
          SecretArn: S.optional(S.String),
          DbUser: S.optional(S.String),
          Database: S.String,
          ConnectedDatabase: S.optional(S.String),
          Schema: S.optional(S.String),
          Table: S.optional(S.String),
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          WorkgroupName: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeTableRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          TableName: S.optional(S.String),
          ColumnList: S.optional(__S(57, __c7, 1)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "DescribeTableResponse" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          isCaseSensitive: S.optional(S.Boolean),
          isCurrency: S.optional(S.Boolean),
          isSigned: S.optional(S.Boolean),
          label: S.optional(S.String),
          name: S.optional(S.String),
          nullable: S.optional(S.Number),
          precision: S.optional(S.Number),
          scale: S.optional(S.Number),
          schemaName: S.optional(S.String),
          tableName: S.optional(S.String),
          typeName: S.optional(S.String),
          length: S.optional(S.Number),
          columnDefault: S.optional(S.String),
        }),
      ).annotate({ identifier: "ColumnMetadata" });
    case 1:
      return S.Array(__S(56, __c7, 0));
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Sql: S.String,
          ClusterIdentifier: S.optional(S.String),
          SecretArn: S.optional(S.String),
          DbUser: S.optional(S.String),
          Database: S.optional(S.String),
          WithEvent: S.optional(S.Boolean),
          StatementName: S.optional(S.String),
          Parameters: S.optional(__S(9, __c1, 1)),
          WorkgroupName: S.optional(S.String),
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          ResultFormat: S.optional(S.String),
          SessionKeepAliveSeconds: S.optional(S.Number),
          SessionId: S.optional(S.String),
          WaitTimeSeconds: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ExecuteStatementInput" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Id: S.String,
          NextToken: S.optional(S.String),
          WaitTimeSeconds: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetStatementResultRequest" });
    case 1:
      return S.Union([
        /*@__PURE__*/ S.Struct({ isNull: S.Boolean }),
        /*@__PURE__*/ S.Struct({ booleanValue: S.Boolean }),
        /*@__PURE__*/ S.Struct({ longValue: S.Number }),
        /*@__PURE__*/ S.Struct({ doubleValue: S.Number }),
        /*@__PURE__*/ S.Struct({ stringValue: S.String }),
        /*@__PURE__*/ S.Struct({ blobValue: T.Blob }),
      ]);
    case 2:
      return S.Array(__S(73, __c9, 1));
    case 3:
      return S.Array(__S(74, __c9, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          Records: __S(75, __c9, 3),
          ColumnMetadata: S.optional(__S(57, __c7, 1)),
          TotalNumRows: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetStatementResultResponse" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Id: S.String,
          NextToken: S.optional(S.String),
          WaitTimeSeconds: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetStatementResultV2Request" });
    case 1:
      return S.Union([/*@__PURE__*/ S.Struct({ CSVRecords: S.String })]);
    case 2:
      return S.Array(__S(81, __c10, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          Records: __S(82, __c10, 2),
          ColumnMetadata: S.optional(__S(57, __c7, 1)),
          TotalNumRows: S.optional(S.Number),
          ResultFormat: S.optional(S.String),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetStatementResultV2Response" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClusterIdentifier: S.optional(S.String),
          Database: S.optional(S.String),
          SecretArn: S.optional(S.String),
          DbUser: S.optional(S.String),
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          WorkgroupName: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListDatabasesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Databases: S.optional(__S(24, __c3, 0)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListDatabasesResponse" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClusterIdentifier: S.optional(S.String),
          SecretArn: S.optional(S.String),
          DbUser: S.optional(S.String),
          Database: S.String,
          ConnectedDatabase: S.optional(S.String),
          SchemaPattern: S.optional(S.String),
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          WorkgroupName: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListSchemasRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Schemas: S.optional(__S(24, __c3, 0)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListSchemasResponse" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          SessionId: S.optional(S.String),
          Status: S.optional(S.String),
          RoleLevel: S.optional(S.Boolean),
          ClusterIdentifier: S.optional(S.String),
          WorkgroupName: S.optional(S.String),
          Database: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListSessionsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          SessionId: S.String,
          Status: S.String,
          CreatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          UpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Database: S.optional(S.String),
          DbUser: S.optional(S.String),
          ClusterIdentifier: S.optional(S.String),
          WorkgroupName: S.optional(S.String),
          SessionAliveSeconds: S.optional(S.Number),
          SessionTtl: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          CurrentStatementId: S.optional(S.String),
        }),
      ).annotate({ identifier: "SessionData" });
    case 2:
      return S.Array(__S(105, __c13, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ Sessions: __S(106, __c13, 2), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListSessionsResponse" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          StatementName: S.optional(S.String),
          Status: S.optional(S.String),
          RoleLevel: S.optional(S.Boolean),
          Database: S.optional(S.String),
          ClusterIdentifier: S.optional(S.String),
          WorkgroupName: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListStatementsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Id: S.String,
          QueryString: S.optional(S.String),
          QueryStrings: S.optional(__S(24, __c3, 0)),
          SecretArn: S.optional(S.String),
          Status: S.optional(S.String),
          StatementName: S.optional(S.String),
          CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          UpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          QueryParameters: S.optional(__S(9, __c1, 1)),
          IsBatchStatement: S.optional(S.Boolean),
          ResultFormat: S.optional(S.String),
          SessionId: S.optional(S.String),
        }),
      ).annotate({ identifier: "StatementData" });
    case 2:
      return S.Array(__S(113, __c14, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ Statements: __S(114, __c14, 2), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListStatementsResponse" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClusterIdentifier: S.optional(S.String),
          SecretArn: S.optional(S.String),
          DbUser: S.optional(S.String),
          Database: S.String,
          ConnectedDatabase: S.optional(S.String),
          SchemaPattern: S.optional(S.String),
          TablePattern: S.optional(S.String),
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          WorkgroupName: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListTablesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          type: S.optional(S.String),
          schema: S.optional(S.String),
        }),
      ).annotate({ identifier: "TableMember" });
    case 2:
      return S.Array(__S(121, __c15, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ Tables: S.optional(__S(122, __c15, 2)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListTablesResponse" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
