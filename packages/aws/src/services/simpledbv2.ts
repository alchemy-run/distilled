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
  sdkId: "SimpleDBv2",
  target: "SimpleDBv2",
  version: "2025-09-26",
  sigv4: "sdb",
  protocol: restJson1Protocol,
  rules: (p, _) => {
    const { UseDualStack = false, UseFIPS = false, Endpoint, Region } = p;
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
          if (
            Region === "us-east-1" &&
            UseFIPS === false &&
            UseDualStack === false
          ) {
            return e("https://sdb.amazonaws.com");
          }
          if (UseFIPS === true && UseDualStack === true) {
            if (
              true === _.getAttr(PartitionResult, "supportsFIPS") &&
              true === _.getAttr(PartitionResult, "supportsDualStack")
            ) {
              return e(
                `https://sdb-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true && UseDualStack === false) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://sdb-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseFIPS === false && UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://sdb.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://sdb.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError(
    "ConflictException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message: string }> {}
export class InvalidNextTokenException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidNextTokenException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message: string }> {}
export class InvalidParameterCombinationException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidParameterCombinationException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message: string }> {}
export class InvalidParameterValueException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidParameterValueException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message: string }> {}
export class NoSuchDomainException
  extends /*@__PURE__*/ TE.TaggedError(
    "NoSuchDomainException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message: string }> {}
export class NoSuchExportException
  extends /*@__PURE__*/ TE.TaggedError(
    "NoSuchExportException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message: string }> {}
export class NumberExportsLimitExceeded
  extends /*@__PURE__*/ TE.TaggedError(
    "NumberExportsLimitExceeded",
    ["ConflictError", "ThrottlingError"],
    { status: 409 },
  )<{ readonly message: string }> {}
export type ExportArn = string;
export interface GetExportRequest {
  exportArn: string;
}
export type IdempotencyToken = string;
export type ExportStatus =
  | "PENDING"
  | "IN_PROGRESS"
  | "SUCCEEDED"
  | "FAILED"
  | (string & {});
export type DomainName = string;
export type RequestedAt = Date;
export type S3BucketName = string;
export type S3KeyPrefix = string;
export type S3SseAlgorithm = "AES256" | "KMS" | (string & {});
export type S3SseKmsKeyId = string;
export type AwsAccountId = string;
export type FailureCode = string;
export type FailureMessage = string;
export type ExportManifestSummary = string;
export type ItemsCount = number;
export type ExportDataCutoffTime = Date;
export interface GetExportResponse {
  exportArn: string;
  clientToken: string;
  exportStatus: ExportStatus;
  domainName: string;
  requestedAt: Date;
  s3Bucket: string;
  s3KeyPrefix?: string;
  s3SseAlgorithm?: S3SseAlgorithm;
  s3SseKmsKeyId?: string;
  s3BucketOwner?: string;
  failureCode?: string;
  failureMessage?: string;
  exportManifest?: string;
  itemsCount?: number;
  exportDataCutoffTime?: Date;
}
export type MaxResults = number;
export type NextToken = string;
export interface ListExportsRequest {
  domainName?: string;
  maxResults?: number;
  nextToken?: string;
}
export interface ExportSummary {
  exportArn: string;
  exportStatus: ExportStatus;
  requestedAt: Date;
  domainName: string;
}
export type ExportSummaries = ExportSummary[];
export interface ListExportsResponse {
  exportSummaries: ExportSummary[];
  nextToken?: string;
}
export interface StartDomainExportRequest {
  clientToken?: string;
  domainName: string;
  s3Bucket: string;
  s3KeyPrefix?: string;
  s3SseAlgorithm?: S3SseAlgorithm;
  s3SseKmsKeyId?: string;
  s3BucketOwner?: string;
}
export interface StartDomainExportResponse {
  clientToken: string;
  exportArn: string;
  requestedAt: Date;
}
export type GetExportError =
  | InvalidParameterValueException
  | NoSuchExportException
  | CommonErrors;
/**
 * Returns information for an existing domain export.
 */
export const getExport: API.OperationMethod<
  GetExportRequest,
  GetExportResponse,
  GetExportError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v2/GetExport",
    input: { exportArn: 0 },
    output: { requestedAt: D.ts, exportDataCutoffTime: D.ts },
    body: true,
  },
  errors: [InvalidParameterValueException, NoSuchExportException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetExport",
})) as any;

export type ListExportsError =
  | InvalidNextTokenException
  | InvalidParameterValueException
  | NoSuchDomainException
  | CommonErrors;
/**
 * Lists all exports that were created. The results are paginated and can be filtered by domain name.
 */
export const listExports: API.PaginatedOperationMethod<
  ListExportsRequest,
  ListExportsResponse,
  ListExportsError,
  Credentials | HttpClient.HttpClient,
  ExportSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /v2/ListExports",
    input: { domainName: 0, maxResults: 0, nextToken: 0 },
    output: { exportSummaries: D.list({ requestedAt: D.ts }) },
    body: true,
  },
  errors: [
    InvalidNextTokenException,
    InvalidParameterValueException,
    NoSuchDomainException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListExports",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "exportSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type StartDomainExportError =
  | ConflictException
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | NoSuchDomainException
  | NumberExportsLimitExceeded
  | CommonErrors;
/**
 * Initiates the export of a SimpleDB domain to an S3 bucket.
 */
export const startDomainExport: API.OperationMethod<
  StartDomainExportRequest,
  StartDomainExportResponse,
  StartDomainExportError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v2/StartDomainExport",
    input: {
      clientToken: D.m({ idempotency: true }),
      domainName: 0,
      s3Bucket: 0,
      s3KeyPrefix: 0,
      s3SseAlgorithm: 0,
      s3SseKmsKeyId: 0,
      s3BucketOwner: 0,
    },
    output: { requestedAt: D.ts },
    body: true,
  },
  errors: [
    ConflictException,
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    NoSuchDomainException,
    NumberExportsLimitExceeded,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartDomainExport",
})) as any;
