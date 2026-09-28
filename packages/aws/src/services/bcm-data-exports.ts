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
  sdkId: "BCM Data Exports",
  target: "AWSBillingAndCostManagementDataExports",
  version: "2023-11-26",
  sigv4: "bcm-data-exports",
  protocol: awsJson1_1Protocol,
  rules: (p, _) => {
    const { UseFIPS = false, Endpoint, Region } = p;
    const e = (u: unknown, p = {}, h = {}): T.EndpointResolverResult => ({
      type: "endpoint" as const,
      endpoint: { url: u as string, properties: p, headers: h },
    });
    const err = (m: unknown): T.EndpointResolverResult => ({
      type: "error" as const,
      message: m as string,
    });
    const _p0 = (_0: unknown) => ({
      authSchemes: [
        {
          name: "sigv4",
          signingRegion: `${_.getAttr(_0, "implicitGlobalRegion")}`,
        },
      ],
    });
    if (Endpoint != null) {
      if (UseFIPS === true) {
        return err(
          "Invalid Configuration: FIPS and custom endpoint are not supported",
        );
      }
      return e(Endpoint);
    }
    if (Region != null) {
      {
        const PartitionResult = _.partition(Region);
        if (PartitionResult != null && PartitionResult !== false) {
          if (
            _.getAttr(PartitionResult, "name") === "aws-iso" &&
            UseFIPS === false
          ) {
            return e(
              "https://bcm-data-exports.us-iso-east-1.c2s.ic.gov",
              {
                authSchemes: [
                  { name: "sigv4", signingRegion: "us-iso-east-1" },
                ],
              },
              {},
            );
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws-iso-b" &&
            UseFIPS === false
          ) {
            return e(
              "https://bcm-data-exports.us-isob-east-1.sc2s.sgov.gov",
              {
                authSchemes: [
                  { name: "sigv4", signingRegion: "us-isob-east-1" },
                ],
              },
              {},
            );
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws-iso-e" &&
            UseFIPS === false
          ) {
            return e(
              "https://bcm-data-exports.eu-isoe-west-1.cloud.adc-e.uk",
              {
                authSchemes: [
                  { name: "sigv4", signingRegion: "eu-isoe-west-1" },
                ],
              },
              {},
            );
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws-iso-f" &&
            UseFIPS === false
          ) {
            return e(
              "https://bcm-data-exports.us-isof-south-1.csp.hci.ic.gov",
              {
                authSchemes: [
                  { name: "sigv4", signingRegion: "us-isof-south-1" },
                ],
              },
              {},
            );
          }
          if (UseFIPS === true) {
            return e(
              `https://bcm-data-exports-fips.${_.getAttr(PartitionResult, "implicitGlobalRegion")}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              _p0(PartitionResult),
              {},
            );
          }
          return e(
            `https://bcm-data-exports.${_.getAttr(PartitionResult, "implicitGlobalRegion")}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            _p0(PartitionResult),
            {},
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
  })<{ readonly message: string }> {}
export class InternalServerException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerException",
    ["ServerError"],
    { status: 500 },
  )<{ readonly message: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{
    readonly message: string;
    readonly ResourceId: string;
    readonly ResourceType: string;
  }> {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceQuotaExceededException",
    ["QuotaError"],
    { status: 402 },
  )<{
    readonly message: string;
    readonly ResourceId?: string;
    readonly ResourceType?: string;
    readonly QuotaCode: string;
    readonly ServiceCode: string;
  }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["ThrottlingError"],
    { status: 429 },
  )<{
    readonly message: string;
    readonly QuotaCode?: string;
    readonly ServiceCode?: string;
  }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{
    readonly message: string;
    readonly Reason?: ValidationExceptionReason;
    readonly Fields?: ValidationExceptionField[];
  }> {}
export type Arn = string;
export type ExportName = string;
export type QueryStatement = string;
export type TableName = string;
export type TableProperty = string;
export type TablePropertyGenericString = string;
export type TableProperties = { [key: string]: string | undefined };
export type TableConfigurations = {
  [key: string]: { [key: string]: string | undefined } | undefined;
};
export interface DataQuery {
  QueryStatement: string;
  TableConfigurations?: {
    [key: string]: { [key: string]: string | undefined } | undefined;
  };
}
export type AccountId = string;
export type S3OutputType = "CUSTOM" | "ATHENA" | "REDSHIFT" | (string & {});
export type FormatOption = "TEXT_OR_CSV" | "PARQUET" | (string & {});
export type CompressionOption = "GZIP" | "PARQUET" | "ZIP" | (string & {});
export type OverwriteOption =
  | "CREATE_NEW_REPORT"
  | "OVERWRITE_REPORT"
  | (string & {});
export interface S3OutputConfigurations {
  OutputType: S3OutputType;
  Format: FormatOption;
  Compression: CompressionOption;
  Overwrite: OverwriteOption;
}
export interface S3Destination {
  S3Bucket: string;
  S3BucketOwner?: string;
  S3Prefix: string;
  S3Region: string;
  S3OutputConfigurations: S3OutputConfigurations;
}
export interface DestinationConfigurations {
  S3Destination: S3Destination;
}
export type FrequencyOption = "SYNCHRONOUS" | (string & {});
export interface RefreshCadence {
  Frequency: FrequencyOption;
}
export interface Export {
  ExportArn?: string;
  Name: string;
  Description?: string;
  DataQuery: DataQuery;
  DestinationConfigurations: DestinationConfigurations;
  RefreshCadence: RefreshCadence;
}
export type ResourceTagKey = string;
export type ResourceTagValue = string;
export interface ResourceTag {
  Key: string;
  Value: string;
}
export type ResourceTagList = ResourceTag[];
export interface CreateExportRequest {
  Export: Export;
  ResourceTags?: ResourceTag[];
}
export interface CreateExportResponse {
  ExportArn?: string;
}
export interface DeleteExportRequest {
  ExportArn: string;
}
export interface DeleteExportResponse {
  ExportArn?: string;
}
export interface GetExecutionRequest {
  ExportArn: string;
  ExecutionId: string;
}
export type ExecutionStatusCode =
  | "INITIATION_IN_PROCESS"
  | "QUERY_QUEUED"
  | "QUERY_IN_PROCESS"
  | "QUERY_FAILURE"
  | "DELIVERY_IN_PROCESS"
  | "DELIVERY_SUCCESS"
  | "DELIVERY_FAILURE"
  | (string & {});
export type ExecutionStatusReason =
  | "INSUFFICIENT_PERMISSION"
  | "BILL_OWNER_CHANGED"
  | "INTERNAL_FAILURE"
  | "DEPRECATED"
  | (string & {});
export interface ExecutionStatus {
  StatusCode?: ExecutionStatusCode;
  StatusReason?: ExecutionStatusReason;
  CreatedAt?: Date;
  CompletedAt?: Date;
  LastUpdatedAt?: Date;
}
export interface GetExecutionResponse {
  ExecutionId?: string;
  Export?: Export;
  ExecutionStatus?: ExecutionStatus;
}
export interface GetExportRequest {
  ExportArn: string;
}
export type ExportStatusCode = "HEALTHY" | "UNHEALTHY" | (string & {});
export interface ExportStatus {
  StatusCode?: ExportStatusCode;
  StatusReason?: ExecutionStatusReason;
  CreatedAt?: Date;
  LastUpdatedAt?: Date;
  LastRefreshedAt?: Date;
}
export interface GetExportResponse {
  Export?: Export;
  ExportStatus?: ExportStatus;
}
export interface GetTableRequest {
  TableName: string;
  TableProperties?: { [key: string]: string | undefined };
}
export interface Column {
  Name?: string;
  Type?: string;
  Description?: string;
}
export type ColumnList = Column[];
export interface GetTableResponse {
  TableName?: string;
  Description?: string;
  TableProperties?: { [key: string]: string | undefined };
  Schema?: Column[];
}
export type MaxResults = number;
export type NextPageToken = string;
export interface ListExecutionsRequest {
  ExportArn: string;
  MaxResults?: number;
  NextToken?: string;
}
export interface ExecutionReference {
  ExecutionId: string;
  ExecutionStatus: ExecutionStatus;
}
export type ExecutionReferenceList = ExecutionReference[];
export interface ListExecutionsResponse {
  Executions?: ExecutionReference[];
  NextToken?: string;
}
export interface ListExportsRequest {
  MaxResults?: number;
  NextToken?: string;
}
export interface ExportReference {
  ExportArn: string;
  ExportName: string;
  ExportStatus: ExportStatus;
}
export type ExportReferenceList = ExportReference[];
export interface ListExportsResponse {
  Exports?: ExportReference[];
  NextToken?: string;
}
export interface ListTablesRequest {
  NextToken?: string;
  MaxResults?: number;
}
export type GenericStringList = string[];
export interface TablePropertyDescription {
  Name?: string;
  ValidValues?: string[];
  DefaultValue?: string;
  Description?: string;
}
export type TablePropertyDescriptionList = TablePropertyDescription[];
export interface Table {
  TableName?: string;
  Description?: string;
  TableProperties?: TablePropertyDescription[];
}
export type TableList = Table[];
export interface ListTablesResponse {
  Tables?: Table[];
  NextToken?: string;
}
export interface ListTagsForResourceRequest {
  ResourceArn: string;
  MaxResults?: number;
  NextToken?: string;
}
export interface ListTagsForResourceResponse {
  ResourceTags?: ResourceTag[];
  NextToken?: string;
}
export interface TagResourceRequest {
  ResourceArn: string;
  ResourceTags: ResourceTag[];
}
export interface TagResourceResponse {}
export type ResourceTagKeyList = string[];
export interface UntagResourceRequest {
  ResourceArn: string;
  ResourceTagKeys: string[];
}
export interface UntagResourceResponse {}
export interface UpdateExportRequest {
  ExportArn: string;
  Export: Export;
}
export interface UpdateExportResponse {
  ExportArn?: string;
}
export type ValidationExceptionReason =
  | "unknownOperation"
  | "cannotParse"
  | "fieldValidationFailed"
  | "other"
  | (string & {});
export interface ValidationExceptionField {
  Name: string;
  Message: string;
}
export type ValidationExceptionFieldList = ValidationExceptionField[];
export type CreateExportError =
  | AccessDeniedException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a data export and specifies the data query, the delivery preference, and any optional resource tags.
 *
 * A `DataQuery` consists of both a `QueryStatement` and `TableConfigurations`.
 *
 * The `QueryStatement` is an SQL statement. Data Exports only supports a limited subset of the SQL syntax. For more information on the SQL syntax that is supported, see Data query. To view the available tables and columns, see the Data Exports table dictionary.
 *
 * The `TableConfigurations` is a collection of specified `TableProperties` for the table being queried in the `QueryStatement`. TableProperties are additional configurations you can provide to change the data and schema of a table. Each table can have different TableProperties. However, tables are not required to have any TableProperties. Each table property has a default value that it assumes if not specified. For more information on table configurations, see Data query. To view the table properties available for each table, see the Data Exports table dictionary or use the `ListTables` API to get a response of all tables and their available properties.
 */
export const createExport: API.OperationMethod<
  CreateExportRequest,
  CreateExportResponse,
  CreateExportError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { Export: i_Export, ResourceTags: D.list(i_ResourceTag) },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateExport",
})) as any;

export type DeleteExportError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an existing data export.
 */
export const deleteExport: API.OperationMethod<
  DeleteExportRequest,
  DeleteExportResponse,
  DeleteExportError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ExportArn: 0 } },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteExport",
})) as any;

export type GetExecutionError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Exports data based on the source data update.
 */
export const getExecution: API.OperationMethod<
  GetExecutionRequest,
  GetExecutionResponse,
  GetExecutionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ExportArn: 0, ExecutionId: 0 },
    output: { ExecutionStatus: o_ExecutionStatus },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetExecution",
})) as any;

export type GetExportError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Views the definition of an existing data export.
 */
export const getExport: API.OperationMethod<
  GetExportRequest,
  GetExportResponse,
  GetExportError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ExportArn: 0 },
    output: { ExportStatus: o_ExportStatus },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetExport",
})) as any;

export type GetTableError =
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns the metadata for the specified table and table properties. This includes the list of columns in the table schema, their data types, and column descriptions.
 */
export const getTable: API.OperationMethod<
  GetTableRequest,
  GetTableResponse,
  GetTableError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { TableName: 0, TableProperties: 0 } },
  errors: [InternalServerException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTable",
})) as any;

export type ListExecutionsError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the historical executions for the export.
 */
export const listExecutions: API.PaginatedOperationMethod<
  ListExecutionsRequest,
  ListExecutionsResponse,
  ListExecutionsError,
  Credentials | HttpClient.HttpClient,
  ExecutionReference
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { ExportArn: 0, MaxResults: 0, NextToken: 0 },
    output: { Executions: D.list({ ExecutionStatus: o_ExecutionStatus }) },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListExecutions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Executions",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListExportsError =
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all data export definitions.
 */
export const listExports: API.PaginatedOperationMethod<
  ListExportsRequest,
  ListExportsResponse,
  ListExportsError,
  Credentials | HttpClient.HttpClient,
  ExportReference
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { MaxResults: 0, NextToken: 0 },
    output: { Exports: D.list({ ExportStatus: o_ExportStatus }) },
  },
  errors: [InternalServerException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListExports",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Exports",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTablesError =
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all available tables in data exports.
 */
export const listTables: API.PaginatedOperationMethod<
  ListTablesRequest,
  ListTablesResponse,
  ListTablesError,
  Credentials | HttpClient.HttpClient,
  Table
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: { service: svc, input: { NextToken: 0, MaxResults: 0 } },
  errors: [InternalServerException, ThrottlingException, ValidationException],
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

export type ListTagsForResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List tags associated with an existing data export.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ResourceArn: 0, MaxResults: 0, NextToken: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

export type TagResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Adds tags for an existing data export definition.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ResourceArn: 0, ResourceTags: D.list(i_ResourceTag) },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

export type UntagResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes tags associated with an existing data export definition.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceArn: 0, ResourceTagKeys: 0 } },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

export type UpdateExportError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates an existing data export by overwriting all export parameters. All export parameters must be provided in the UpdateExport request.
 */
export const updateExport: API.OperationMethod<
  UpdateExportRequest,
  UpdateExportResponse,
  UpdateExportError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ExportArn: 0, Export: i_Export } },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateExport",
})) as any;

const i_Export: D.LazyStruct = () => ({
  ExportArn: 0,
  Name: 0,
  Description: 0,
  DataQuery: { QueryStatement: 0, TableConfigurations: 0 },
  DestinationConfigurations: {
    S3Destination: {
      S3Bucket: 0,
      S3BucketOwner: 0,
      S3Prefix: 0,
      S3Region: 0,
      S3OutputConfigurations: {
        OutputType: 0,
        Format: 0,
        Compression: 0,
        Overwrite: 0,
      },
    },
  },
  RefreshCadence: { Frequency: 0 },
});
const i_ResourceTag: D.LazyStruct = () => ({ Key: 0, Value: 0 });
const o_ExecutionStatus: D.LazyStruct = () => ({
  CreatedAt: D.ts,
  CompletedAt: D.ts,
  LastUpdatedAt: D.ts,
});
const o_ExportStatus: D.LazyStruct = () => ({
  CreatedAt: D.ts,
  LastUpdatedAt: D.ts,
  LastRefreshedAt: D.ts,
});
