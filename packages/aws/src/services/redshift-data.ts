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
  sdkId: "Redshift Data",
  target: "RedshiftData",
  version: "2019-12-20",
  sigv4: "redshift-data",
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
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://redshift-data.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://redshift-data.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class ActiveSessionsExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ActiveSessionsExceededException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class ActiveStatementsExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ActiveStatementsExceededException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class ActiveWaitingRequestsExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ActiveWaitingRequestsExceededException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class BatchExecuteStatementException
  extends /*@__PURE__*/ TE.TaggedError(
    "BatchExecuteStatementException",
    ["ServerError"],
    { status: 500 },
  )<{ readonly message: string; readonly StatementId: string }> {}
export class DatabaseConnectionException
  extends /*@__PURE__*/ TE.TaggedError(
    "DatabaseConnectionException",
    ["ServerError"],
    { status: 500 },
  )<{ readonly message: string }> {}
export class ExecuteStatementException
  extends /*@__PURE__*/ TE.TaggedError(
    "ExecuteStatementException",
    ["ServerError"],
    { status: 500 },
  )<{ readonly message: string; readonly StatementId: string }> {}
export class InternalServerException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerException",
    ["ServerError"],
    { status: 500 },
  )<{ readonly message: string }> {}
export class QueryTimeoutException
  extends /*@__PURE__*/ TE.TaggedError(
    "QueryTimeoutException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message: string; readonly ResourceId: string }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
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
  Database: string;
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
  descriptor: {
    service: svc,
    input: {
      Sqls: 0,
      ClusterIdentifier: 0,
      SecretArn: 0,
      DbUser: 0,
      Database: 0,
      WithEvent: 0,
      StatementName: 0,
      Parameters: D.list(i_SqlParameter),
      WorkgroupName: 0,
      ClientToken: D.m({ idempotency: true }),
      ResultFormat: 0,
      SessionKeepAliveSeconds: 0,
      SessionId: 0,
      ExecutionMode: 0,
      WaitTimeSeconds: 0,
    },
    output: { CreatedAt: D.ts },
  },
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
})) as any;

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
  descriptor: { service: svc, input: { Id: 0 } },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: { Id: 0, WaitTimeSeconds: 0 },
    output: {
      CreatedAt: D.ts,
      UpdatedAt: D.ts,
      SubStatements: D.list({ CreatedAt: D.ts, UpdatedAt: D.ts }),
    },
  },
  errors: [
    ActiveWaitingRequestsExceededException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeStatement",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      ClusterIdentifier: 0,
      SecretArn: 0,
      DbUser: 0,
      Database: 0,
      ConnectedDatabase: 0,
      Schema: 0,
      Table: 0,
      NextToken: 0,
      MaxResults: 0,
      WorkgroupName: 0,
    },
  },
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
  descriptor: {
    service: svc,
    input: {
      Sql: 0,
      ClusterIdentifier: 0,
      SecretArn: 0,
      DbUser: 0,
      Database: 0,
      WithEvent: 0,
      StatementName: 0,
      Parameters: D.list(i_SqlParameter),
      WorkgroupName: 0,
      ClientToken: D.m({ idempotency: true }),
      ResultFormat: 0,
      SessionKeepAliveSeconds: 0,
      SessionId: 0,
      WaitTimeSeconds: 0,
    },
    output: { CreatedAt: D.ts },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: { Id: 0, NextToken: 0, WaitTimeSeconds: 0 },
    output: { Records: D.list(D.list({ blobValue: D.blob })) },
  },
  errors: [
    ActiveWaitingRequestsExceededException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetStatementResult",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Records",
  } as const,
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
  descriptor: {
    service: svc,
    input: { Id: 0, NextToken: 0, WaitTimeSeconds: 0 },
  },
  errors: [
    ActiveWaitingRequestsExceededException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetStatementResultV2",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Records",
  } as const,
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
  descriptor: {
    service: svc,
    input: {
      ClusterIdentifier: 0,
      Database: 0,
      SecretArn: 0,
      DbUser: 0,
      NextToken: 0,
      MaxResults: 0,
      WorkgroupName: 0,
    },
  },
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
  descriptor: {
    service: svc,
    input: {
      ClusterIdentifier: 0,
      SecretArn: 0,
      DbUser: 0,
      Database: 0,
      ConnectedDatabase: 0,
      SchemaPattern: 0,
      NextToken: 0,
      MaxResults: 0,
      WorkgroupName: 0,
    },
  },
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
 * Returns only the sessions that the caller created. When identity-enhanced role sessions are used, you must provide either the `ClusterIdentifier` or `WorkgroupName` parameter to ensure that the AWS IAM Identity Center user can only access the Amazon Redshift IAM Identity Center applications they are assigned. For more information, see Trusted identity propagation overview.
 */
export const listSessions: API.PaginatedOperationMethod<
  ListSessionsRequest,
  ListSessionsResponse,
  ListSessionsError,
  Credentials | HttpClient.HttpClient,
  SessionData
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      NextToken: 0,
      MaxResults: 0,
      SessionId: 0,
      Status: 0,
      RoleLevel: 0,
      ClusterIdentifier: 0,
      WorkgroupName: 0,
      Database: 0,
    },
    output: {
      Sessions: D.list({ CreatedAt: D.ts, UpdatedAt: D.ts, SessionTtl: D.ts }),
    },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
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
  descriptor: {
    service: svc,
    input: {
      NextToken: 0,
      MaxResults: 0,
      StatementName: 0,
      Status: 0,
      RoleLevel: 0,
      Database: 0,
      ClusterIdentifier: 0,
      WorkgroupName: 0,
    },
    output: { Statements: D.list({ CreatedAt: D.ts, UpdatedAt: D.ts }) },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
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
  descriptor: {
    service: svc,
    input: {
      ClusterIdentifier: 0,
      SecretArn: 0,
      DbUser: 0,
      Database: 0,
      ConnectedDatabase: 0,
      SchemaPattern: 0,
      TablePattern: 0,
      NextToken: 0,
      MaxResults: 0,
      WorkgroupName: 0,
    },
  },
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

const i_SqlParameter: D.LazyStruct = () => ({ name: 0, value: 0 });
