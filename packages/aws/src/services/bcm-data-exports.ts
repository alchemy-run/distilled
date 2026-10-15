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
  sdkId: "BCM Data Exports",
  serviceShapeName: "AWSBillingAndCostManagementDataExports",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "bcm-data-exports" });
const ver = /*@__PURE__*/ T.ServiceVersion("2023-11-26");
const proto = /*@__PURE__*/ T.AwsProtocolsAwsJson1_1();
const rules = /*@__PURE__*/ T.EndpointResolver(
  (p, _) => {
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
      authSchemes: [{ name: "sigv4", signingRegion: `${_.getAttr(_0, "implicitGlobalRegion")}` }],
    });
    if (Endpoint != null) {
      if (UseFIPS === true) {
        return err("Invalid Configuration: FIPS and custom endpoint are not supported");
      }
      return e(Endpoint);
    }
    if (Region != null) {
      {
        const PartitionResult = _.partition(Region);
        if (PartitionResult != null && PartitionResult !== false) {
          if (_.getAttr(PartitionResult, "name") === "aws-iso" && UseFIPS === false) {
            return e(
              "https://bcm-data-exports.us-iso-east-1.c2s.ic.gov",
              { authSchemes: [{ name: "sigv4", signingRegion: "us-iso-east-1" }] },
              {},
            );
          }
          if (_.getAttr(PartitionResult, "name") === "aws-iso-b" && UseFIPS === false) {
            return e(
              "https://bcm-data-exports.us-isob-east-1.sc2s.sgov.gov",
              { authSchemes: [{ name: "sigv4", signingRegion: "us-isob-east-1" }] },
              {},
            );
          }
          if (_.getAttr(PartitionResult, "name") === "aws-iso-e" && UseFIPS === false) {
            return e(
              "https://bcm-data-exports.eu-isoe-west-1.cloud.adc-e.uk",
              { authSchemes: [{ name: "sigv4", signingRegion: "eu-isoe-west-1" }] },
              {},
            );
          }
          if (_.getAttr(PartitionResult, "name") === "aws-iso-f" && UseFIPS === false) {
            return e(
              "https://bcm-data-exports.us-isof-south-1.csp.hci.ic.gov",
              { authSchemes: [{ name: "sigv4", signingRegion: "us-isof-south-1" }] },
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
  '{"url":"https://bcm-data-exports.us-east-1.api.aws","properties":{"authSchemes":[{"name":"sigv4","signingRegion":"us-east-1"}]},"headers":{}}',
  [
    "us-gov-west-1",
    "us-gov-east-1",
    "aws-us-gov-global",
    "cn-north-1",
    "cn-northwest-1",
    "aws-cn-global",
    "us-iso-east-1",
    "us-iso-west-1",
    "aws-iso-global",
    "us-isob-east-1",
    "aws-iso-b-global",
    "aws-iso-f-global",
    "us-isof-east-1",
    "us-isof-south-1",
    "eusc-de-east-1",
  ],
);

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      ResourceId: S.String,
      ResourceType: S.String,
    },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      ResourceId: /*@__PURE__*/ S.optional(S.String),
      ResourceType: /*@__PURE__*/ S.optional(S.String),
      QuotaCode: S.String,
      ServiceCode: S.String,
    },
    /*@__PURE__*/ T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      QuotaCode: /*@__PURE__*/ S.optional(S.String),
      ServiceCode: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      Reason: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => S.String).annotate({
          identifier: "ValidationExceptionReason",
        }),
      ),
      Fields: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => __S(81, __c10, 1)).annotate({
          identifier: "ValidationExceptionFieldList",
        }),
      ),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
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
  TableConfigurations?: { [key: string]: { [key: string]: string | undefined } | undefined };
}
export type AccountId = string;
export type S3OutputType = "CUSTOM" | "ATHENA" | "REDSHIFT" | (string & {});
export type FormatOption = "TEXT_OR_CSV" | "PARQUET" | (string & {});
export type CompressionOption = "GZIP" | "PARQUET" | "ZIP" | (string & {});
export type OverwriteOption = "CREATE_NEW_REPORT" | "OVERWRITE_REPORT" | (string & {});
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
  input: __S(88, __c11, 0) as any as S.Schema<CreateExportRequest>,
  output: __S(104, __c13, 0) as any as S.Schema<CreateExportResponse>,
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
}));

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
  input: __S(128, __c16, 0) as any as S.Schema<DeleteExportRequest>,
  output: __S(104, __c13, 0) as any as S.Schema<DeleteExportResponse>,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteExport",
}));

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
  input: __S(136, __c17, 0) as any as S.Schema<GetExecutionRequest>,
  output: __S(137, __c17, 1) as any as S.Schema<GetExecutionResponse>,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetExecution",
}));

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
  input: __S(152, __c19, 0) as any as S.Schema<GetExportRequest>,
  output: __S(153, __c19, 1) as any as S.Schema<GetExportResponse>,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetExport",
}));

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
  input: __S(0, __c0, 0) as any as S.Schema<GetTableRequest>,
  output: __S(3, __c0, 3) as any as S.Schema<GetTableResponse>,
  errors: [InternalServerException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTable",
}));

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
  input: __S(8, __c1, 0) as any as S.Schema<ListExecutionsRequest>,
  output: __S(11, __c1, 3) as any as S.Schema<ListExecutionsResponse>,
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
  input: __S(16, __c2, 0) as any as S.Schema<ListExportsRequest>,
  output: __S(19, __c2, 3) as any as S.Schema<ListExportsResponse>,
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
  input: __S(24, __c3, 0) as any as S.Schema<ListTablesRequest>,
  output: __S(29, __c3, 5) as any as S.Schema<ListTablesResponse>,
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
  input: __S(40, __c5, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(41, __c5, 1) as any as S.Schema<ListTagsForResourceResponse>,
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
}));

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
  input: __S(48, __c6, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(56, __c7, 0) as any as S.Schema<TagResourceResponse>,
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
}));

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
  input: __S(64, __c8, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(56, __c7, 0) as any as S.Schema<UntagResourceResponse>,
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
}));

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
  input: __S(72, __c9, 0) as any as S.Schema<UpdateExportRequest>,
  output: __S(104, __c13, 0) as any as S.Schema<UpdateExportResponse>,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateExport",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ TableName: S.String, TableProperties: S.optional(__S(112, __c14, 0)) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetTableRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Type: S.optional(S.String),
          Description: S.optional(S.String),
        }),
      ).annotate({ identifier: "Column" });
    case 2:
      return S.Array(__S(1, __c0, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          TableName: S.optional(S.String),
          Description: S.optional(S.String),
          TableProperties: S.optional(__S(112, __c14, 0)),
          Schema: S.optional(__S(2, __c0, 2)),
        }),
      ).annotate({ identifier: "GetTableResponse" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ExportArn: S.String,
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListExecutionsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ ExecutionId: S.String, ExecutionStatus: __S(144, __c18, 0) }),
      ).annotate({ identifier: "ExecutionReference" });
    case 2:
      return S.Array(__S(9, __c1, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ Executions: S.optional(__S(10, __c1, 2)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListExecutionsResponse" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ MaxResults: S.optional(S.Number), NextToken: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListExportsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ ExportArn: S.String, ExportName: S.String, ExportStatus: __S(160, __c20, 0) }),
      ).annotate({ identifier: "ExportReference" });
    case 2:
      return S.Array(__S(17, __c2, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ Exports: S.optional(__S(18, __c2, 2)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListExportsResponse" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ NextToken: S.optional(S.String), MaxResults: S.optional(S.Number) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListTablesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          ValidValues: S.optional(__S(32, __c4, 0)),
          DefaultValue: S.optional(S.String),
          Description: S.optional(S.String),
        }),
      ).annotate({ identifier: "TablePropertyDescription" });
    case 2:
      return S.Array(__S(25, __c3, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          TableName: S.optional(S.String),
          Description: S.optional(S.String),
          TableProperties: S.optional(__S(26, __c3, 2)),
        }),
      ).annotate({ identifier: "Table" });
    case 4:
      return S.Array(__S(27, __c3, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({ Tables: S.optional(__S(28, __c3, 4)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListTablesResponse" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceArn: S.String,
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListTagsForResourceRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ ResourceTags: S.optional(__S(97, __c12, 1)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListTagsForResourceResponse" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceArn: S.String, ResourceTags: __S(97, __c12, 1) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "TagResourceRequest" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "TagResourceResponse" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceArn: S.String, ResourceTagKeys: __S(32, __c4, 0) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UntagResourceRequest" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ExportArn: S.String, Export: __S(126, __c15, 6) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UpdateExportRequest" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Name: S.String, Message: S.String })).annotate({
        identifier: "ValidationExceptionField",
      });
    case 1:
      return S.Array(__S(80, __c10, 0));
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Export: __S(126, __c15, 6), ResourceTags: S.optional(__S(97, __c12, 1)) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateExportRequest" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Key: S.String, Value: S.String })).annotate({
        identifier: "ResourceTag",
      });
    case 1:
      return S.Array(__S(96, __c12, 0));
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ ExportArn: S.optional(S.String) })).annotate({
        identifier: "CreateExportResponse",
      });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ __S(112, __c14, 0).pipe(S.optional));
    case 1:
      return S.suspend(() =>
        S.Struct({ QueryStatement: S.String, TableConfigurations: S.optional(__S(120, __c15, 0)) }),
      ).annotate({ identifier: "DataQuery" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          OutputType: S.String,
          Format: S.String,
          Compression: S.String,
          Overwrite: S.String,
        }),
      ).annotate({ identifier: "S3OutputConfigurations" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          S3Bucket: S.String,
          S3BucketOwner: S.optional(S.String),
          S3Prefix: S.String,
          S3Region: S.String,
          S3OutputConfigurations: __S(122, __c15, 2),
        }),
      ).annotate({ identifier: "S3Destination" });
    case 4:
      return S.suspend(() => S.Struct({ S3Destination: __S(123, __c15, 3) })).annotate({
        identifier: "DestinationConfigurations",
      });
    case 5:
      return S.suspend(() => S.Struct({ Frequency: S.String })).annotate({
        identifier: "RefreshCadence",
      });
    case 6:
      return S.suspend(() =>
        S.Struct({
          ExportArn: S.optional(S.String),
          Name: S.String,
          Description: S.optional(S.String),
          DataQuery: __S(121, __c15, 1),
          DestinationConfigurations: __S(124, __c15, 4),
          RefreshCadence: __S(125, __c15, 5),
        }),
      ).annotate({ identifier: "Export" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ExportArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteExportRequest" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ExportArn: S.String, ExecutionId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetExecutionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ExecutionId: S.optional(S.String),
          Export: S.optional(__S(126, __c15, 6)),
          ExecutionStatus: S.optional(__S(144, __c18, 0)),
        }),
      ).annotate({ identifier: "GetExecutionResponse" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          StatusCode: S.optional(S.String),
          StatusReason: S.optional(S.String),
          CreatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          CompletedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          LastUpdatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "ExecutionStatus" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ExportArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetExportRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Export: S.optional(__S(126, __c15, 6)),
          ExportStatus: S.optional(__S(160, __c20, 0)),
        }),
      ).annotate({ identifier: "GetExportResponse" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          StatusCode: S.optional(S.String),
          StatusReason: S.optional(S.String),
          CreatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          LastUpdatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          LastRefreshedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "ExportStatus" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
