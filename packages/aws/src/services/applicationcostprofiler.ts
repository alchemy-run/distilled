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
  sdkId: "ApplicationCostProfiler",
  target: "AWSApplicationCostProfiler",
  version: "2020-09-10",
  sigv4: "application-cost-profiler",
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
                `https://application-cost-profiler-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://application-cost-profiler-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://application-cost-profiler.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://application-cost-profiler.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
export class InternalServerException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerException",
    ["ServerError"],
    { status: 500 },
  )<{ readonly message?: string }> {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceQuotaExceededException",
    ["QuotaError"],
    { status: 402 },
  )<{ readonly message?: string }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["ThrottlingError"],
    { status: 429 },
  )<{ readonly message?: string }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export type ReportId = string;
export interface DeleteReportDefinitionRequest {
  reportId: string;
}
export interface DeleteReportDefinitionResult {
  reportId?: string;
}
export interface GetReportDefinitionRequest {
  reportId: string;
}
export type ReportDescription = string;
export type ReportFrequency = "MONTHLY" | "DAILY" | "ALL" | (string & {});
export type Format = "CSV" | "PARQUET" | (string & {});
export type S3Bucket = string;
export type S3Prefix = string;
export interface S3Location {
  bucket: string;
  prefix: string;
}
export interface GetReportDefinitionResult {
  reportId: string;
  reportDescription: string;
  reportFrequency: ReportFrequency;
  format: Format;
  destinationS3Location: S3Location;
  createdAt: Date;
  lastUpdated: Date;
}
export type S3Key = string;
export type S3BucketRegion =
  | "ap-east-1"
  | "me-south-1"
  | "eu-south-1"
  | "af-south-1"
  | (string & {});
export interface SourceS3Location {
  bucket: string;
  key: string;
  region?: S3BucketRegion;
}
export interface ImportApplicationUsageRequest {
  sourceS3Location: SourceS3Location;
}
export type ImportId = string;
export interface ImportApplicationUsageResult {
  importId: string;
}
export type Token = string;
export interface ListReportDefinitionsRequest {
  nextToken?: string;
  maxResults?: number;
}
export interface ReportDefinition {
  reportId?: string;
  reportDescription?: string;
  reportFrequency?: ReportFrequency;
  format?: Format;
  destinationS3Location?: S3Location;
  createdAt?: Date;
  lastUpdatedAt?: Date;
}
export type ReportDefinitionList = ReportDefinition[];
export interface ListReportDefinitionsResult {
  reportDefinitions?: ReportDefinition[];
  nextToken?: string;
}
export interface PutReportDefinitionRequest {
  reportId: string;
  reportDescription: string;
  reportFrequency: ReportFrequency;
  format: Format;
  destinationS3Location: S3Location;
}
export interface PutReportDefinitionResult {
  reportId?: string;
}
export interface UpdateReportDefinitionRequest {
  reportId: string;
  reportDescription: string;
  reportFrequency: ReportFrequency;
  format: Format;
  destinationS3Location: S3Location;
}
export interface UpdateReportDefinitionResult {
  reportId?: string;
}
export type ErrorMessage = string;
export type DeleteReportDefinitionError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the specified report definition in AWS Application Cost Profiler. This stops the report from being
 * generated.
 */
export const deleteReportDefinition: API.OperationMethod<
  DeleteReportDefinitionRequest,
  DeleteReportDefinitionResult,
  DeleteReportDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /reportDefinition/{reportId}",
    input: { reportId: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteReportDefinition",
})) as any;

export type GetReportDefinitionError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the definition of a report already configured in AWS Application Cost Profiler.
 */
export const getReportDefinition: API.OperationMethod<
  GetReportDefinitionRequest,
  GetReportDefinitionResult,
  GetReportDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /reportDefinition/{reportId}",
    input: { reportId: 0 },
    output: { createdAt: D.ts, lastUpdated: D.ts },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetReportDefinition",
})) as any;

export type ImportApplicationUsageError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Ingests application usage data from Amazon Simple Storage Service (Amazon S3).
 *
 * The data must already exist in the S3 location. As part of the action, AWS Application Cost Profiler
 * copies the object from your S3 bucket to an S3 bucket owned by Amazon for processing
 * asynchronously.
 */
export const importApplicationUsage: API.OperationMethod<
  ImportApplicationUsageRequest,
  ImportApplicationUsageResult,
  ImportApplicationUsageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /importApplicationUsage",
    input: { sourceS3Location: { bucket: 0, key: 0, region: 0 } },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ImportApplicationUsage",
})) as any;

export type ListReportDefinitionsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a list of all reports and their configurations for your AWS account.
 *
 * The maximum number of reports is one.
 */
export const listReportDefinitions: API.PaginatedOperationMethod<
  ListReportDefinitionsRequest,
  ListReportDefinitionsResult,
  ListReportDefinitionsError,
  Credentials | HttpClient.HttpClient,
  ReportDefinition
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /reportDefinition",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: {
      reportDefinitions: D.list({ createdAt: D.ts, lastUpdatedAt: D.ts }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListReportDefinitions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "reportDefinitions",
    pageSize: "maxResults",
  } as const,
})) as any;

export type PutReportDefinitionError =
  | AccessDeniedException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates the report definition for a report in Application Cost Profiler.
 */
export const putReportDefinition: API.OperationMethod<
  PutReportDefinitionRequest,
  PutReportDefinitionResult,
  PutReportDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /reportDefinition",
    input: {
      reportId: 0,
      reportDescription: 0,
      reportFrequency: 0,
      format: 0,
      destinationS3Location: i_S3Location,
    },
    body: true,
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
  operationName: "PutReportDefinition",
})) as any;

export type UpdateReportDefinitionError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates existing report in AWS Application Cost Profiler.
 */
export const updateReportDefinition: API.OperationMethod<
  UpdateReportDefinitionRequest,
  UpdateReportDefinitionResult,
  UpdateReportDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /reportDefinition/{reportId}",
    input: {
      reportId: 0,
      reportDescription: 0,
      reportFrequency: 0,
      format: 0,
      destinationS3Location: i_S3Location,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateReportDefinition",
})) as any;

const i_S3Location: D.LazyStruct = () => ({ bucket: 0, prefix: 0 });
