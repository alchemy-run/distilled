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
  sdkId: "Cost and Usage Report Service",
  serviceShapeName: "AWSOrigamiServiceGatewayService",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "cur" });
const ver = /*@__PURE__*/ T.ServiceVersion("2017-01-06");
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
              `https://cur-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(`https://cur-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(`https://cur.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`);
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://cur.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://cur.{R}.{D}","properties":{},"headers":{}}');

export class DuplicateReportNameException
  extends /*@__PURE__*/ S.TaggedError<DuplicateReportNameException>()(
    "DuplicateReportNameException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class InternalErrorException
  extends /*@__PURE__*/ S.TaggedError<InternalErrorException>()("InternalErrorException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }).pipe(C.withServerError) {}
export class ReportBucketNotVerified
  extends /*@__PURE__*/ S.TaggedError<ReportBucketNotVerified>()(
    "ReportBucketNotVerified",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.SyntheticError({
      from: "ValidationException",
      message: { matches: "[Bb]ucket" },
    }),
  ).pipe(C.withRetryableError) {}
export class ReportLimitReachedException
  extends /*@__PURE__*/ S.TaggedError<ReportLimitReachedException>()(
    "ReportLimitReachedException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()("ResourceNotFoundException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()("ValidationException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export type ReportName = string;
export interface DeleteReportDefinitionRequest {
  ReportName: string;
}
export type DeleteResponseMessage = string;
export interface DeleteReportDefinitionResponse {
  ResponseMessage?: string;
}
export type MaxResults = number;
export interface DescribeReportDefinitionsRequest {
  MaxResults?: number;
  NextToken?: string;
}
export type TimeUnit = "HOURLY" | "DAILY" | "MONTHLY" | (string & {});
export type ReportFormat = "textORcsv" | "Parquet" | (string & {});
export type CompressionFormat = "ZIP" | "GZIP" | "Parquet" | (string & {});
export type SchemaElement =
  | "RESOURCES"
  | "SPLIT_COST_ALLOCATION_DATA"
  | "MANUAL_DISCOUNT_COMPATIBILITY"
  | (string & {});
export type SchemaElementList = SchemaElement[];
export type S3Bucket = string;
export type S3Prefix = string;
export type AWSRegion =
  | "af-south-1"
  | "ap-east-1"
  | "ap-south-1"
  | "ap-south-2"
  | "ap-southeast-1"
  | "ap-southeast-2"
  | "ap-southeast-3"
  | "ap-northeast-1"
  | "ap-northeast-2"
  | "ap-northeast-3"
  | "ca-central-1"
  | "eu-central-1"
  | "eu-central-2"
  | "eu-west-1"
  | "eu-west-2"
  | "eu-west-3"
  | "eu-north-1"
  | "eu-south-1"
  | "eu-south-2"
  | "me-central-1"
  | "me-south-1"
  | "sa-east-1"
  | "us-east-1"
  | "us-east-2"
  | "us-west-1"
  | "us-west-2"
  | "cn-north-1"
  | "cn-northwest-1"
  | (string & {});
export type AdditionalArtifact = "REDSHIFT" | "QUICKSIGHT" | "ATHENA" | (string & {});
export type AdditionalArtifactList = AdditionalArtifact[];
export type RefreshClosedReports = boolean;
export type ReportVersioning = "CREATE_NEW_REPORT" | "OVERWRITE_REPORT" | (string & {});
export type BillingViewArn = string;
export type LastDelivery = string;
export type LastStatus = "SUCCESS" | "ERROR_PERMISSIONS" | "ERROR_NO_BUCKET" | (string & {});
export interface ReportStatus {
  lastDelivery?: string;
  lastStatus?: LastStatus;
}
export interface ReportDefinition {
  ReportName: string;
  TimeUnit: TimeUnit;
  Format: ReportFormat;
  Compression: CompressionFormat;
  AdditionalSchemaElements: SchemaElement[];
  S3Bucket: string;
  S3Prefix: string;
  S3Region: AWSRegion;
  AdditionalArtifacts?: AdditionalArtifact[];
  RefreshClosedReports?: boolean;
  ReportVersioning?: ReportVersioning;
  BillingViewArn?: string;
  ReportStatus?: ReportStatus;
}
export type ReportDefinitionList = ReportDefinition[];
export interface DescribeReportDefinitionsResponse {
  ReportDefinitions?: ReportDefinition[];
  NextToken?: string;
}
export interface ListTagsForResourceRequest {
  ReportName: string;
}
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  Key: string;
  Value: string;
}
export type TagList = Tag[];
export interface ListTagsForResourceResponse {
  Tags?: Tag[];
}
export interface ModifyReportDefinitionRequest {
  ReportName: string;
  ReportDefinition: ReportDefinition;
}
export interface ModifyReportDefinitionResponse {}
export interface PutReportDefinitionRequest {
  ReportDefinition: ReportDefinition;
  Tags?: Tag[];
}
export interface PutReportDefinitionResponse {}
export interface TagResourceRequest {
  ReportName: string;
  Tags: Tag[];
}
export interface TagResourceResponse {}
export type TagKeyList = string[];
export interface UntagResourceRequest {
  ReportName: string;
  TagKeys: string[];
}
export interface UntagResourceResponse {}
export type ErrorMessage = string;
export type DeleteReportDefinitionError =
  | InternalErrorException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the specified report. Any tags associated with the report are also
 * deleted.
 */
export const deleteReportDefinition: API.OperationMethod<
  DeleteReportDefinitionRequest,
  DeleteReportDefinitionResponse,
  DeleteReportDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(12, __c3, 0) as any as S.Schema<DeleteReportDefinitionRequest>,
  output: __S(13, __c3, 1) as any as S.Schema<DeleteReportDefinitionResponse>,
  errors: [InternalErrorException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteReportDefinition",
}));

export type DescribeReportDefinitionsError = InternalErrorException | CommonErrors;
/**
 * Lists the Amazon Web Services Cost and Usage Report available to this account.
 */
export const describeReportDefinitions: API.PaginatedOperationMethod<
  DescribeReportDefinitionsRequest,
  DescribeReportDefinitionsResponse,
  DescribeReportDefinitionsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(16, __c4, 0) as any as S.Schema<DescribeReportDefinitionsRequest>,
  output: __S(18, __c4, 2) as any as S.Schema<DescribeReportDefinitionsResponse>,
  errors: [InternalErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeReportDefinitions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | InternalErrorException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists the tags associated with the specified report definition.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(24, __c6, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(25, __c6, 1) as any as S.Schema<ListTagsForResourceResponse>,
  errors: [InternalErrorException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type ModifyReportDefinitionError =
  | InternalErrorException
  | ValidationException
  | ReportBucketNotVerified
  | CommonErrors;
/**
 * Allows you to programmatically update your report preferences.
 */
export const modifyReportDefinition: API.OperationMethod<
  ModifyReportDefinitionRequest,
  ModifyReportDefinitionResponse,
  ModifyReportDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(32, __c8, 0) as any as S.Schema<ModifyReportDefinitionRequest>,
  output: __S(36, __c9, 0) as any as S.Schema<ModifyReportDefinitionResponse>,
  errors: [InternalErrorException, ValidationException, ReportBucketNotVerified],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyReportDefinition",
}));

export type PutReportDefinitionError =
  | DuplicateReportNameException
  | InternalErrorException
  | ReportLimitReachedException
  | ResourceNotFoundException
  | ValidationException
  | ReportBucketNotVerified
  | CommonErrors;
/**
 * Creates a new report using the description that you provide.
 */
export const putReportDefinition: API.OperationMethod<
  PutReportDefinitionRequest,
  PutReportDefinitionResponse,
  PutReportDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<PutReportDefinitionRequest>,
  output: __S(36, __c9, 0) as any as S.Schema<PutReportDefinitionResponse>,
  errors: [
    DuplicateReportNameException,
    InternalErrorException,
    ReportLimitReachedException,
    ResourceNotFoundException,
    ValidationException,
    ReportBucketNotVerified,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutReportDefinition",
}));

export type TagResourceError =
  | InternalErrorException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Associates a set of tags with a report definition.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4, __c1, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(36, __c9, 0) as any as S.Schema<TagResourceResponse>,
  errors: [InternalErrorException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError =
  | InternalErrorException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Disassociates a set of tags from a report definition.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(9, __c2, 1) as any as S.Schema<UntagResourceRequest>,
  output: __S(36, __c9, 0) as any as S.Schema<UntagResourceResponse>,
  errors: [InternalErrorException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ReportDefinition: __S(22, __c5, 2), Tags: S.optional(__S(29, __c7, 1)) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "PutReportDefinitionRequest" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ReportName: S.String, Tags: __S(29, __c7, 1) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "TagResourceRequest" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
    case 1:
      return S.suspend(() =>
        S.Struct({ ReportName: S.String, TagKeys: __S(8, __c2, 0) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UntagResourceRequest" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ReportName: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteReportDefinitionRequest" });
    case 1:
      return S.suspend(() => S.Struct({ ResponseMessage: S.optional(S.String) })).annotate({
        identifier: "DeleteReportDefinitionResponse",
      });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ MaxResults: S.optional(S.Number), NextToken: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeReportDefinitionsRequest" });
    case 1:
      return S.Array(__S(22, __c5, 2));
    case 2:
      return S.suspend(() =>
        S.Struct({
          ReportDefinitions: S.optional(__S(17, __c4, 1)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "DescribeReportDefinitionsResponse" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
    case 1:
      return S.suspend(() =>
        S.Struct({ lastDelivery: S.optional(S.String), lastStatus: S.optional(S.String) }),
      ).annotate({ identifier: "ReportStatus" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          ReportName: S.String,
          TimeUnit: S.String,
          Format: S.String,
          Compression: S.String,
          AdditionalSchemaElements: __S(20, __c5, 0),
          S3Bucket: S.String,
          S3Prefix: S.String,
          S3Region: S.String,
          AdditionalArtifacts: S.optional(__S(20, __c5, 0)),
          RefreshClosedReports: S.optional(S.Boolean),
          ReportVersioning: S.optional(S.String),
          BillingViewArn: S.optional(S.String),
          ReportStatus: S.optional(__S(21, __c5, 1)),
        }),
      ).annotate({ identifier: "ReportDefinition" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ReportName: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListTagsForResourceRequest" });
    case 1:
      return S.suspend(() => S.Struct({ Tags: S.optional(__S(29, __c7, 1)) })).annotate({
        identifier: "ListTagsForResourceResponse",
      });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Key: S.String, Value: S.String })).annotate({
        identifier: "Tag",
      });
    case 1:
      return S.Array(__S(28, __c7, 0));
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ReportName: S.String, ReportDefinition: __S(22, __c5, 2) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ModifyReportDefinitionRequest" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({
        identifier: "ModifyReportDefinitionResponse",
      });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
