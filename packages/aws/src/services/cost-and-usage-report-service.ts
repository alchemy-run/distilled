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
  sdkId: "Cost and Usage Report Service",
  target: "AWSOrigamiServiceGatewayService",
  version: "2017-01-06",
  sigv4: "cur",
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
                `https://cur-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://cur-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://cur.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://cur.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class DuplicateReportNameException
  extends /*@__PURE__*/ TE.TaggedError("DuplicateReportNameException")<{
    readonly message?: string;
  }> {}
export class InternalErrorException
  extends /*@__PURE__*/ TE.TaggedError("InternalErrorException", [
    "ServerError",
  ])<{ readonly message?: string }> {}
export class ReportBucketNotVerified
  extends /*@__PURE__*/ TE.TaggedError(
    "ReportBucketNotVerified",
    ["RetryableError"],
    {
      synthetic: {
        from: "ValidationException",
        message: { matches: "[Bb]ucket" },
      },
    },
  )<{ readonly message?: string }> {}
export class ReportLimitReachedException
  extends /*@__PURE__*/ TE.TaggedError("ReportLimitReachedException")<{
    readonly message?: string;
  }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError("ResourceNotFoundException")<{
    readonly message?: string;
  }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError("ValidationException")<{
    readonly message?: string;
  }> {}
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
export type AdditionalArtifact =
  | "REDSHIFT"
  | "QUICKSIGHT"
  | "ATHENA"
  | (string & {});
export type AdditionalArtifactList = AdditionalArtifact[];
export type RefreshClosedReports = boolean;
export type ReportVersioning =
  | "CREATE_NEW_REPORT"
  | "OVERWRITE_REPORT"
  | (string & {});
export type BillingViewArn = string;
export type LastDelivery = string;
export type LastStatus =
  | "SUCCESS"
  | "ERROR_PERMISSIONS"
  | "ERROR_NO_BUCKET"
  | (string & {});
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
  descriptor: { service: svc, input: { ReportName: 0 } },
  errors: [InternalErrorException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteReportDefinition",
})) as any;

export type DescribeReportDefinitionsError =
  | InternalErrorException
  | CommonErrors;
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
  descriptor: { service: svc, input: { MaxResults: 0, NextToken: 0 } },
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
  descriptor: { service: svc, input: { ReportName: 0 } },
  errors: [
    InternalErrorException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

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
  descriptor: {
    service: svc,
    input: { ReportName: 0, ReportDefinition: i_ReportDefinition },
  },
  errors: [
    InternalErrorException,
    ValidationException,
    ReportBucketNotVerified,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyReportDefinition",
})) as any;

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
  descriptor: {
    service: svc,
    input: { ReportDefinition: i_ReportDefinition, Tags: D.list(i_Tag) },
  },
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
})) as any;

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
  descriptor: { service: svc, input: { ReportName: 0, Tags: D.list(i_Tag) } },
  errors: [
    InternalErrorException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

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
  descriptor: { service: svc, input: { ReportName: 0, TagKeys: 0 } },
  errors: [
    InternalErrorException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

const i_ReportDefinition: D.LazyStruct = () => ({
  ReportName: 0,
  TimeUnit: 0,
  Format: 0,
  Compression: 0,
  AdditionalSchemaElements: 0,
  S3Bucket: 0,
  S3Prefix: 0,
  S3Region: 0,
  AdditionalArtifacts: 0,
  RefreshClosedReports: 0,
  ReportVersioning: 0,
  BillingViewArn: 0,
  ReportStatus: { lastDelivery: 0, lastStatus: 0 },
});
const i_Tag: D.LazyStruct = () => ({ Key: 0, Value: 0 });
