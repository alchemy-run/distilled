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
  sdkId: "RDS Data",
  target: "RdsDataService",
  version: "2018-08-01",
  sigv4: "rds-data",
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
                `https://rds-data-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://rds-data-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://rds-data.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://rds-data.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
export class DatabaseErrorException
  extends /*@__PURE__*/ TE.TaggedError(
    "DatabaseErrorException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class DatabaseNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "DatabaseNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class DatabaseResumingException
  extends /*@__PURE__*/ TE.TaggedError(
    "DatabaseResumingException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class DatabaseUnavailableException
  extends /*@__PURE__*/ TE.TaggedError(
    "DatabaseUnavailableException",
    ["TimeoutError"],
    { status: 504 },
  )<{ readonly message?: string }> {}
export class ForbiddenException
  extends /*@__PURE__*/ TE.TaggedError("ForbiddenException", ["AuthError"], {
    status: 403,
  })<{ readonly message?: string }> {}
export class HttpEndpointNotEnabledException
  extends /*@__PURE__*/ TE.TaggedError(
    "HttpEndpointNotEnabledException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class InternalServerErrorException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerErrorException",
    ["ServerError"],
    { status: 500 },
  )<{ readonly message?: string }> {}
export class InvalidResourceStateException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidResourceStateException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidSecretException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidSecretException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class NotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "NotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class SecretsErrorException
  extends /*@__PURE__*/ TE.TaggedError(
    "SecretsErrorException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class ServiceUnavailableError
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceUnavailableError",
    ["ServerError"],
    { status: 503 },
  )<{ readonly message?: string }> {}
export class StatementTimeoutException
  extends /*@__PURE__*/ TE.TaggedError(
    "StatementTimeoutException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string; readonly dbConnectionId?: number }> {}
export class TransactionNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "TransactionNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class UnsupportedResultException
  extends /*@__PURE__*/ TE.TaggedError(
    "UnsupportedResultException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export type Arn = string;
export type SqlStatement = string;
export type DbName = string;
export type ParameterName = string;
export type BoxedBoolean = boolean;
export type BoxedLong = number;
export type BoxedDouble = number;
export type BooleanArray = boolean[];
export type LongArray = number[];
export type DoubleArray = number[];
export type StringArray = string[];
export type ArrayOfArray = ArrayValue[];
export type ArrayValue =
  | {
      booleanValues: boolean[];
      longValues?: never;
      doubleValues?: never;
      stringValues?: never;
      arrayValues?: never;
    }
  | {
      booleanValues?: never;
      longValues: number[];
      doubleValues?: never;
      stringValues?: never;
      arrayValues?: never;
    }
  | {
      booleanValues?: never;
      longValues?: never;
      doubleValues: number[];
      stringValues?: never;
      arrayValues?: never;
    }
  | {
      booleanValues?: never;
      longValues?: never;
      doubleValues?: never;
      stringValues: string[];
      arrayValues?: never;
    }
  | {
      booleanValues?: never;
      longValues?: never;
      doubleValues?: never;
      stringValues?: never;
      arrayValues: ArrayValue[];
    };
export type Field =
  | {
      isNull: boolean;
      booleanValue?: never;
      longValue?: never;
      doubleValue?: never;
      stringValue?: never;
      blobValue?: never;
      arrayValue?: never;
    }
  | {
      isNull?: never;
      booleanValue: boolean;
      longValue?: never;
      doubleValue?: never;
      stringValue?: never;
      blobValue?: never;
      arrayValue?: never;
    }
  | {
      isNull?: never;
      booleanValue?: never;
      longValue: number;
      doubleValue?: never;
      stringValue?: never;
      blobValue?: never;
      arrayValue?: never;
    }
  | {
      isNull?: never;
      booleanValue?: never;
      longValue?: never;
      doubleValue: number;
      stringValue?: never;
      blobValue?: never;
      arrayValue?: never;
    }
  | {
      isNull?: never;
      booleanValue?: never;
      longValue?: never;
      doubleValue?: never;
      stringValue: string;
      blobValue?: never;
      arrayValue?: never;
    }
  | {
      isNull?: never;
      booleanValue?: never;
      longValue?: never;
      doubleValue?: never;
      stringValue?: never;
      blobValue: Uint8Array;
      arrayValue?: never;
    }
  | {
      isNull?: never;
      booleanValue?: never;
      longValue?: never;
      doubleValue?: never;
      stringValue?: never;
      blobValue?: never;
      arrayValue: ArrayValue;
    };
export type TypeHint =
  | "JSON"
  | "UUID"
  | "TIMESTAMP"
  | "DATE"
  | "TIME"
  | "DECIMAL"
  | (string & {});
export interface SqlParameter {
  name?: string;
  value?: Field;
  typeHint?: TypeHint;
}
export type SqlParametersList = SqlParameter[];
export type SqlParameterSets = SqlParameter[][];
export type Id = string;
export interface BatchExecuteStatementRequest {
  resourceArn: string;
  secretArn: string;
  sql: string;
  database?: string;
  schema?: string;
  parameterSets?: SqlParameter[][];
  transactionId?: string;
}
export type FieldList = Field[];
export interface UpdateResult {
  generatedFields?: Field[];
}
export type UpdateResults = UpdateResult[];
export interface BatchExecuteStatementResponse {
  updateResults?: UpdateResult[];
}
export interface BeginTransactionRequest {
  resourceArn: string;
  secretArn: string;
  database?: string;
  schema?: string;
}
export interface BeginTransactionResponse {
  transactionId?: string;
}
export interface CommitTransactionRequest {
  resourceArn: string;
  secretArn: string;
  transactionId: string;
}
export type TransactionStatus = string;
export interface CommitTransactionResponse {
  transactionStatus?: string;
}
export interface ExecuteSqlRequest {
  dbClusterOrInstanceArn: string;
  awsSecretStoreArn: string;
  sqlStatements: string;
  database?: string;
  schema?: string;
}
export interface ColumnMetadata {
  name?: string;
  type?: number;
  typeName?: string;
  label?: string;
  schemaName?: string;
  tableName?: string;
  isAutoIncrement?: boolean;
  isSigned?: boolean;
  isCurrency?: boolean;
  isCaseSensitive?: boolean;
  nullable?: number;
  precision?: number;
  scale?: number;
  arrayBaseColumnType?: number;
}
export type Metadata = ColumnMetadata[];
export interface ResultSetMetadata {
  columnCount?: number;
  columnMetadata?: ColumnMetadata[];
}
export type BoxedInteger = number;
export type BoxedFloat = number;
export type ArrayValueList = Value[];
export interface StructValue {
  attributes?: Value[];
}
export type Value =
  | {
      isNull: boolean;
      bitValue?: never;
      bigIntValue?: never;
      intValue?: never;
      doubleValue?: never;
      realValue?: never;
      stringValue?: never;
      blobValue?: never;
      arrayValues?: never;
      structValue?: never;
    }
  | {
      isNull?: never;
      bitValue: boolean;
      bigIntValue?: never;
      intValue?: never;
      doubleValue?: never;
      realValue?: never;
      stringValue?: never;
      blobValue?: never;
      arrayValues?: never;
      structValue?: never;
    }
  | {
      isNull?: never;
      bitValue?: never;
      bigIntValue: number;
      intValue?: never;
      doubleValue?: never;
      realValue?: never;
      stringValue?: never;
      blobValue?: never;
      arrayValues?: never;
      structValue?: never;
    }
  | {
      isNull?: never;
      bitValue?: never;
      bigIntValue?: never;
      intValue: number;
      doubleValue?: never;
      realValue?: never;
      stringValue?: never;
      blobValue?: never;
      arrayValues?: never;
      structValue?: never;
    }
  | {
      isNull?: never;
      bitValue?: never;
      bigIntValue?: never;
      intValue?: never;
      doubleValue: number;
      realValue?: never;
      stringValue?: never;
      blobValue?: never;
      arrayValues?: never;
      structValue?: never;
    }
  | {
      isNull?: never;
      bitValue?: never;
      bigIntValue?: never;
      intValue?: never;
      doubleValue?: never;
      realValue: number;
      stringValue?: never;
      blobValue?: never;
      arrayValues?: never;
      structValue?: never;
    }
  | {
      isNull?: never;
      bitValue?: never;
      bigIntValue?: never;
      intValue?: never;
      doubleValue?: never;
      realValue?: never;
      stringValue: string;
      blobValue?: never;
      arrayValues?: never;
      structValue?: never;
    }
  | {
      isNull?: never;
      bitValue?: never;
      bigIntValue?: never;
      intValue?: never;
      doubleValue?: never;
      realValue?: never;
      stringValue?: never;
      blobValue: Uint8Array;
      arrayValues?: never;
      structValue?: never;
    }
  | {
      isNull?: never;
      bitValue?: never;
      bigIntValue?: never;
      intValue?: never;
      doubleValue?: never;
      realValue?: never;
      stringValue?: never;
      blobValue?: never;
      arrayValues: Value[];
      structValue?: never;
    }
  | {
      isNull?: never;
      bitValue?: never;
      bigIntValue?: never;
      intValue?: never;
      doubleValue?: never;
      realValue?: never;
      stringValue?: never;
      blobValue?: never;
      arrayValues?: never;
      structValue: StructValue;
    };
export type Row = Value[];
export interface Record {
  values?: Value[];
}
export type Records = Record[];
export interface ResultFrame {
  resultSetMetadata?: ResultSetMetadata;
  records?: Record[];
}
export type RecordsUpdated = number;
export interface SqlStatementResult {
  resultFrame?: ResultFrame;
  numberOfRecordsUpdated?: number;
}
export type SqlStatementResults = SqlStatementResult[];
export interface ExecuteSqlResponse {
  sqlStatementResults?: SqlStatementResult[];
}
export type DecimalReturnType = "STRING" | "DOUBLE_OR_LONG" | (string & {});
export type LongReturnType = "STRING" | "LONG" | (string & {});
export interface ResultSetOptions {
  decimalReturnType?: DecimalReturnType;
  longReturnType?: LongReturnType;
}
export type RecordsFormatType = "NONE" | "JSON" | (string & {});
export interface ExecuteStatementRequest {
  resourceArn: string;
  secretArn: string;
  sql: string;
  database?: string;
  schema?: string;
  parameters?: SqlParameter[];
  transactionId?: string;
  includeResultMetadata?: boolean;
  continueAfterTimeout?: boolean;
  resultSetOptions?: ResultSetOptions;
  formatRecordsAs?: RecordsFormatType;
}
export type SqlRecords = Field[][];
export type FormattedSqlRecords = string;
export interface ExecuteStatementResponse {
  records?: Field[][];
  columnMetadata?: ColumnMetadata[];
  numberOfRecordsUpdated?: number;
  generatedFields?: Field[];
  formattedRecords?: string;
}
export interface RollbackTransactionRequest {
  resourceArn: string;
  secretArn: string;
  transactionId: string;
}
export interface RollbackTransactionResponse {
  transactionStatus?: string;
}
export type ErrorMessage = string;
export type BatchExecuteStatementError =
  | AccessDeniedException
  | BadRequestException
  | DatabaseErrorException
  | DatabaseNotFoundException
  | DatabaseResumingException
  | DatabaseUnavailableException
  | ForbiddenException
  | HttpEndpointNotEnabledException
  | InternalServerErrorException
  | InvalidResourceStateException
  | InvalidSecretException
  | SecretsErrorException
  | ServiceUnavailableError
  | StatementTimeoutException
  | TransactionNotFoundException
  | CommonErrors;
/**
 * Runs a batch SQL statement over an array of data.
 *
 * You can run bulk update and insert operations for multiple records using a DML statement with different parameter sets. Bulk operations can provide a significant performance improvement over individual insert and update operations.
 *
 * If a call isn't part of a transaction because it doesn't include the `transactionID` parameter, changes that result from the call are committed automatically.
 *
 * There isn't a fixed upper limit on the number of parameter sets. However, the maximum size of the HTTP request submitted through the Data API is 4 MiB. If the request exceeds this limit, the Data API returns an error and doesn't process the request. This 4-MiB limit includes the size of the HTTP headers and the JSON notation in the request. Thus, the number of parameter sets that you can include depends on a combination of factors, such as the size of the SQL statement and the size of each parameter set.
 *
 * The response size limit is 1 MiB. If the call returns more than 1 MiB of response data, the call is terminated.
 */
export const batchExecuteStatement: API.OperationMethod<
  BatchExecuteStatementRequest,
  BatchExecuteStatementResponse,
  BatchExecuteStatementError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /BatchExecute",
    input: {
      resourceArn: 0,
      secretArn: 0,
      sql: 0,
      database: 0,
      schema: 0,
      parameterSets: D.list(D.list(i_SqlParameter)),
      transactionId: 0,
    },
    output: { updateResults: D.list({ generatedFields: D.list(o_Field) }) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    DatabaseErrorException,
    DatabaseNotFoundException,
    DatabaseResumingException,
    DatabaseUnavailableException,
    ForbiddenException,
    HttpEndpointNotEnabledException,
    InternalServerErrorException,
    InvalidResourceStateException,
    InvalidSecretException,
    SecretsErrorException,
    ServiceUnavailableError,
    StatementTimeoutException,
    TransactionNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchExecuteStatement",
})) as any;

export type BeginTransactionError =
  | AccessDeniedException
  | BadRequestException
  | DatabaseErrorException
  | DatabaseNotFoundException
  | DatabaseResumingException
  | DatabaseUnavailableException
  | ForbiddenException
  | HttpEndpointNotEnabledException
  | InternalServerErrorException
  | InvalidResourceStateException
  | InvalidSecretException
  | SecretsErrorException
  | ServiceUnavailableError
  | StatementTimeoutException
  | TransactionNotFoundException
  | CommonErrors;
/**
 * Starts a SQL transaction.
 *
 * A transaction can run for a maximum of 24 hours. A transaction is terminated and rolled back automatically after 24 hours.
 *
 * A transaction times out if no calls use its transaction ID in three minutes. If a transaction times out before it's committed, it's rolled back automatically.
 *
 * For Aurora MySQL, DDL statements inside a transaction cause an implicit commit. We recommend that you run each MySQL DDL statement in a separate `ExecuteStatement` call with `continueAfterTimeout` enabled.
 */
export const beginTransaction: API.OperationMethod<
  BeginTransactionRequest,
  BeginTransactionResponse,
  BeginTransactionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /BeginTransaction",
    input: { resourceArn: 0, secretArn: 0, database: 0, schema: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    DatabaseErrorException,
    DatabaseNotFoundException,
    DatabaseResumingException,
    DatabaseUnavailableException,
    ForbiddenException,
    HttpEndpointNotEnabledException,
    InternalServerErrorException,
    InvalidResourceStateException,
    InvalidSecretException,
    SecretsErrorException,
    ServiceUnavailableError,
    StatementTimeoutException,
    TransactionNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BeginTransaction",
})) as any;

export type CommitTransactionError =
  | AccessDeniedException
  | BadRequestException
  | DatabaseErrorException
  | DatabaseNotFoundException
  | DatabaseUnavailableException
  | ForbiddenException
  | HttpEndpointNotEnabledException
  | InternalServerErrorException
  | InvalidResourceStateException
  | InvalidSecretException
  | NotFoundException
  | SecretsErrorException
  | ServiceUnavailableError
  | StatementTimeoutException
  | TransactionNotFoundException
  | CommonErrors;
/**
 * Ends a SQL transaction started with the `BeginTransaction` operation and commits the changes.
 */
export const commitTransaction: API.OperationMethod<
  CommitTransactionRequest,
  CommitTransactionResponse,
  CommitTransactionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /CommitTransaction",
    input: { resourceArn: 0, secretArn: 0, transactionId: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    DatabaseErrorException,
    DatabaseNotFoundException,
    DatabaseUnavailableException,
    ForbiddenException,
    HttpEndpointNotEnabledException,
    InternalServerErrorException,
    InvalidResourceStateException,
    InvalidSecretException,
    NotFoundException,
    SecretsErrorException,
    ServiceUnavailableError,
    StatementTimeoutException,
    TransactionNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CommitTransaction",
})) as any;

export type ExecuteSqlError =
  | AccessDeniedException
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | ServiceUnavailableError
  | CommonErrors;
/**
 * Runs one or more SQL statements.
 *
 * This operation is deprecated. Please use the `BatchExecuteStatement` or `ExecuteStatement` operation.
 */
export const executeSql: API.OperationMethod<
  ExecuteSqlRequest,
  ExecuteSqlResponse,
  ExecuteSqlError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /ExecuteSql",
    input: {
      dbClusterOrInstanceArn: 0,
      awsSecretStoreArn: 0,
      sqlStatements: 0,
      database: 0,
      schema: 0,
    },
    output: {
      sqlStatementResults: D.list({
        resultFrame: { records: D.list({ values: D.list(o_Value) }) },
      }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    ServiceUnavailableError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ExecuteSql",
})) as any;

export type ExecuteStatementError =
  | AccessDeniedException
  | BadRequestException
  | DatabaseErrorException
  | DatabaseNotFoundException
  | DatabaseResumingException
  | DatabaseUnavailableException
  | ForbiddenException
  | HttpEndpointNotEnabledException
  | InternalServerErrorException
  | InvalidResourceStateException
  | InvalidSecretException
  | SecretsErrorException
  | ServiceUnavailableError
  | StatementTimeoutException
  | TransactionNotFoundException
  | UnsupportedResultException
  | CommonErrors;
/**
 * Runs a SQL statement against a database.
 *
 * If a call isn't part of a transaction because it doesn't include the `transactionID` parameter, changes that result from the call are committed automatically.
 *
 * If the binary response data from the database is more than 1 MB, the call is terminated.
 */
export const executeStatement: API.OperationMethod<
  ExecuteStatementRequest,
  ExecuteStatementResponse,
  ExecuteStatementError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /Execute",
    input: {
      resourceArn: 0,
      secretArn: 0,
      sql: 0,
      database: 0,
      schema: 0,
      parameters: D.list(i_SqlParameter),
      transactionId: 0,
      includeResultMetadata: 0,
      continueAfterTimeout: 0,
      resultSetOptions: { decimalReturnType: 0, longReturnType: 0 },
      formatRecordsAs: 0,
    },
    output: {
      records: D.list(D.list(o_Field)),
      generatedFields: D.list(o_Field),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    DatabaseErrorException,
    DatabaseNotFoundException,
    DatabaseResumingException,
    DatabaseUnavailableException,
    ForbiddenException,
    HttpEndpointNotEnabledException,
    InternalServerErrorException,
    InvalidResourceStateException,
    InvalidSecretException,
    SecretsErrorException,
    ServiceUnavailableError,
    StatementTimeoutException,
    TransactionNotFoundException,
    UnsupportedResultException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ExecuteStatement",
})) as any;

export type RollbackTransactionError =
  | AccessDeniedException
  | BadRequestException
  | DatabaseErrorException
  | DatabaseNotFoundException
  | DatabaseUnavailableException
  | ForbiddenException
  | HttpEndpointNotEnabledException
  | InternalServerErrorException
  | InvalidResourceStateException
  | InvalidSecretException
  | NotFoundException
  | SecretsErrorException
  | ServiceUnavailableError
  | StatementTimeoutException
  | TransactionNotFoundException
  | CommonErrors;
/**
 * Performs a rollback of a transaction. Rolling back a transaction cancels its changes.
 */
export const rollbackTransaction: API.OperationMethod<
  RollbackTransactionRequest,
  RollbackTransactionResponse,
  RollbackTransactionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /RollbackTransaction",
    input: { resourceArn: 0, secretArn: 0, transactionId: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    DatabaseErrorException,
    DatabaseNotFoundException,
    DatabaseUnavailableException,
    ForbiddenException,
    HttpEndpointNotEnabledException,
    InternalServerErrorException,
    InvalidResourceStateException,
    InvalidSecretException,
    NotFoundException,
    SecretsErrorException,
    ServiceUnavailableError,
    StatementTimeoutException,
    TransactionNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RollbackTransaction",
})) as any;

const i_SqlParameter: D.LazyStruct = () => ({
  name: 0,
  value: {
    isNull: 0,
    booleanValue: 0,
    longValue: 0,
    doubleValue: 0,
    stringValue: 0,
    blobValue: 0,
    arrayValue: i_ArrayValue,
  },
  typeHint: 0,
});
const o_Field: D.LazyStruct = () => ({ blobValue: D.blob });
const o_Value: D.LazyStruct = () => ({
  blobValue: D.blob,
  arrayValues: D.list(o_Value),
  structValue: { attributes: D.list(o_Value) },
});
const i_ArrayValue: D.LazyStruct = () => ({
  booleanValues: 0,
  longValues: 0,
  doubleValues: 0,
  stringValues: 0,
  arrayValues: D.list(i_ArrayValue),
});
