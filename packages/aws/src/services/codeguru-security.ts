import type * as HttpClient from "effect/unstable/http/HttpClient";
import type * as redacted from "effect/Redacted";
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
  sdkId: "CodeGuru Security",
  target: "AwsCodeGuruSecurity",
  version: "2018-05-10",
  sigv4: "codeguru-security",
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
                `https://codeguru-security-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://codeguru-security-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://codeguru-security.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://codeguru-security.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
  })<{
    readonly errorCode: string;
    readonly message: string;
    readonly resourceId?: string;
    readonly resourceType?: string;
  }> {}
export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError("ConflictException", ["ConflictError"], {
    status: 409,
  })<{
    readonly errorCode: string;
    readonly message: string;
    readonly resourceId: string;
    readonly resourceType: string;
  }> {}
export class InternalServerException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerException",
    ["ServerError", "RetryableError"],
    { status: 500 },
  )<{ readonly error?: string; readonly message?: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{
    readonly errorCode: string;
    readonly message: string;
    readonly resourceId: string;
    readonly resourceType: string;
  }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["ThrottlingError", "RetryableError"],
    { status: 429 },
  )<{
    readonly errorCode: string;
    readonly message: string;
    readonly serviceCode?: string;
    readonly quotaCode?: string;
  }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{
    readonly errorCode: string;
    readonly message: string;
    readonly reason: ValidationExceptionReason;
    readonly fieldList?: ValidationExceptionField[];
  }> {}
export interface FindingIdentifier {
  scanName: string;
  findingId: string;
}
export type FindingIdentifiers = FindingIdentifier[];
export interface BatchGetFindingsRequest {
  findingIdentifiers: FindingIdentifier[];
}
export type Status = "Closed" | "Open" | "All" | (string & {});
export interface Resource {
  id?: string;
  subResourceId?: string;
}
export type ReferenceUrls = string[];
export type RelatedVulnerabilities = string[];
export interface CodeLine {
  number?: number;
  content?: string;
}
export type CodeSnippet = CodeLine[];
export interface FilePath {
  name?: string;
  path?: string;
  startLine?: number;
  endLine?: number;
  codeSnippet?: CodeLine[];
}
export interface Vulnerability {
  referenceUrls?: string[];
  relatedVulnerabilities?: string[];
  id?: string;
  filePath?: FilePath;
  itemCount?: number;
}
export type Severity =
  | "Critical"
  | "High"
  | "Medium"
  | "Low"
  | "Info"
  | (string & {});
export interface Recommendation {
  text?: string;
  url?: string;
}
export interface SuggestedFix {
  description?: string;
  code?: string;
}
export type SuggestedFixes = SuggestedFix[];
export interface Remediation {
  recommendation?: Recommendation;
  suggestedFixes?: SuggestedFix[];
}
export type DetectorTags = string[];
export interface Finding {
  createdAt?: Date;
  description?: string;
  generatorId?: string;
  id?: string;
  updatedAt?: Date;
  type?: string;
  status?: Status;
  resource?: Resource;
  vulnerability?: Vulnerability;
  severity?: Severity;
  remediation?: Remediation;
  title?: string;
  detectorTags?: string[];
  detectorId?: string;
  detectorName?: string;
  ruleId?: string;
}
export type Findings = Finding[];
export type ScanName = string;
export type ErrorCode =
  | "DUPLICATE_IDENTIFIER"
  | "ITEM_DOES_NOT_EXIST"
  | "INTERNAL_ERROR"
  | "INVALID_FINDING_ID"
  | "INVALID_SCAN_NAME"
  | (string & {});
export interface BatchGetFindingsError_ {
  scanName: string;
  findingId: string;
  errorCode: ErrorCode;
  message: string;
}
export type BatchGetFindingsErrors = BatchGetFindingsError_[];
export interface BatchGetFindingsResponse {
  findings: Finding[];
  failedFindings: BatchGetFindingsError_[];
}
export type ClientToken = string;
export type Uuid = string;
export type ResourceId = { codeArtifactId: string };
export type ScanType = "Standard" | "Express" | (string & {});
export type AnalysisType = "Security" | "All" | (string & {});
export type TagKey = string;
export type TagValue = string;
export type TagMap = { [key: string]: string | undefined };
export interface CreateScanRequest {
  clientToken?: string;
  resourceId: ResourceId;
  scanName: string;
  scanType?: ScanType;
  analysisType?: AnalysisType;
  tags?: { [key: string]: string | undefined };
}
export type ScanState = "InProgress" | "Successful" | "Failed" | (string & {});
export type ScanNameArn = string;
export interface CreateScanResponse {
  scanName: string;
  runId: string;
  resourceId: ResourceId;
  scanState: ScanState;
  scanNameArn?: string;
}
export interface CreateUploadUrlRequest {
  scanName: string;
}
export type S3Url = string | redacted.Redacted<string>;
export type HeaderKey = string;
export type HeaderValue = string;
export type RequestHeaderMap = { [key: string]: string | undefined };
export interface CreateUploadUrlResponse {
  s3Url: string | redacted.Redacted<string>;
  requestHeaders: { [key: string]: string | undefined };
  codeArtifactId: string;
}
export interface GetAccountConfigurationRequest {}
export type KmsKeyArn = string;
export interface EncryptionConfig {
  kmsKeyArn?: string;
}
export interface GetAccountConfigurationResponse {
  encryptionConfig: EncryptionConfig;
}
export type NextToken = string;
export interface GetFindingsRequest {
  scanName: string;
  nextToken?: string;
  maxResults?: number;
  status?: Status;
}
export interface GetFindingsResponse {
  findings?: Finding[];
  nextToken?: string;
}
export interface GetMetricsSummaryRequest {
  date: Date;
}
export interface FindingMetricsValuePerSeverity {
  info?: number;
  low?: number;
  medium?: number;
  high?: number;
  critical?: number;
}
export interface CategoryWithFindingNum {
  categoryName?: string;
  findingNumber?: number;
}
export type CategoriesWithMostFindings = CategoryWithFindingNum[];
export interface ScanNameWithFindingNum {
  scanName?: string;
  findingNumber?: number;
}
export type ScansWithMostOpenFindings = ScanNameWithFindingNum[];
export type ScansWithMostOpenCriticalFindings = ScanNameWithFindingNum[];
export interface MetricsSummary {
  date?: Date;
  openFindings?: FindingMetricsValuePerSeverity;
  categoriesWithMostFindings?: CategoryWithFindingNum[];
  scansWithMostOpenFindings?: ScanNameWithFindingNum[];
  scansWithMostOpenCriticalFindings?: ScanNameWithFindingNum[];
}
export interface GetMetricsSummaryResponse {
  metricsSummary?: MetricsSummary;
}
export interface GetScanRequest {
  scanName: string;
  runId?: string;
}
export type ErrorMessage = string;
export interface GetScanResponse {
  scanName: string;
  runId: string;
  scanState: ScanState;
  createdAt: Date;
  analysisType: AnalysisType;
  updatedAt?: Date;
  numberOfRevisions?: number;
  scanNameArn?: string;
  errorMessage?: string;
}
export interface ListFindingsMetricsRequest {
  nextToken?: string;
  maxResults?: number;
  startDate: Date;
  endDate: Date;
}
export interface AccountFindingsMetric {
  date?: Date;
  newFindings?: FindingMetricsValuePerSeverity;
  closedFindings?: FindingMetricsValuePerSeverity;
  openFindings?: FindingMetricsValuePerSeverity;
  meanTimeToClose?: FindingMetricsValuePerSeverity;
}
export type FindingsMetricList = AccountFindingsMetric[];
export interface ListFindingsMetricsResponse {
  findingsMetrics?: AccountFindingsMetric[];
  nextToken?: string;
}
export interface ListScansRequest {
  nextToken?: string;
  maxResults?: number;
}
export interface ScanSummary {
  scanState: ScanState;
  createdAt: Date;
  updatedAt?: Date;
  scanName: string;
  runId: string;
  scanNameArn?: string;
}
export type ScanSummaries = ScanSummary[];
export interface ListScansResponse {
  summaries?: ScanSummary[];
  nextToken?: string;
}
export interface ListTagsForResourceRequest {
  resourceArn: string;
}
export interface ListTagsForResourceResponse {
  tags?: { [key: string]: string | undefined };
}
export interface TagResourceRequest {
  resourceArn: string;
  tags: { [key: string]: string | undefined };
}
export interface TagResourceResponse {}
export type TagKeyList = string[];
export interface UntagResourceRequest {
  resourceArn: string;
  tagKeys: string[];
}
export interface UntagResourceResponse {}
export interface UpdateAccountConfigurationRequest {
  encryptionConfig: EncryptionConfig;
}
export interface UpdateAccountConfigurationResponse {
  encryptionConfig: EncryptionConfig;
}
export type ValidationExceptionReason =
  | "unknownOperation"
  | "cannotParse"
  | "fieldValidationFailed"
  | "other"
  | "lambdaCodeShaMisMatch"
  | (string & {});
export interface ValidationExceptionField {
  name: string;
  message: string;
}
export type ValidationExceptionFieldList = ValidationExceptionField[];
export type BatchGetFindingsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of requested findings from standard scans.
 */
export const batchGetFindings: API.OperationMethod<
  BatchGetFindingsRequest,
  BatchGetFindingsResponse,
  BatchGetFindingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /batchGetFindings",
    input: { findingIdentifiers: D.list({ scanName: 0, findingId: 0 }) },
    output: { findings: D.list(o_Finding) },
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
  operationName: "BatchGetFindings",
})) as any;

export type CreateScanError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Use to create a scan using code uploaded to an Amazon S3 bucket.
 */
export const createScan: API.OperationMethod<
  CreateScanRequest,
  CreateScanResponse,
  CreateScanError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /scans",
    input: {
      clientToken: D.m({ idempotency: true }),
      resourceId: { codeArtifactId: 0 },
      scanName: 0,
      scanType: 0,
      analysisType: 0,
      tags: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateScan",
})) as any;

export type CreateUploadUrlError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Generates a pre-signed URL, request headers used to upload a code resource, and code artifact identifier for the uploaded resource.
 *
 * You can upload your code resource to the URL with the request headers using any HTTP client.
 */
export const createUploadUrl: API.OperationMethod<
  CreateUploadUrlRequest,
  CreateUploadUrlResponse,
  CreateUploadUrlError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /uploadUrl",
    input: { scanName: 0 },
    output: { s3Url: D.secret },
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
  operationName: "CreateUploadUrl",
})) as any;

export type GetAccountConfigurationError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Use to get the encryption configuration for an account.
 */
export const getAccountConfiguration: API.OperationMethod<
  GetAccountConfigurationRequest,
  GetAccountConfigurationResponse,
  GetAccountConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /accountConfiguration/get",
    input: {},
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAccountConfiguration",
})) as any;

export type GetFindingsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of all findings generated by a particular scan.
 */
export const getFindings: API.PaginatedOperationMethod<
  GetFindingsRequest,
  GetFindingsResponse,
  GetFindingsError,
  Credentials | HttpClient.HttpClient,
  Finding
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /findings/{scanName}",
    input: {
      scanName: 0,
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
      status: D.m({ query: "status" }),
    },
    output: { findings: D.list(o_Finding) },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetFindings",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "findings",
    pageSize: "maxResults",
  } as const,
})) as any;

export type GetMetricsSummaryError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a summary of metrics for an account from a specified date, including number of open findings, the categories with most findings, the scans with most open findings, and scans with most open critical findings.
 */
export const getMetricsSummary: API.OperationMethod<
  GetMetricsSummaryRequest,
  GetMetricsSummaryResponse,
  GetMetricsSummaryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /metrics/summary",
    input: { date: D.m({ query: "date", shape: D.tsAs("epoch-seconds") }) },
    output: { metricsSummary: { date: D.ts } },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMetricsSummary",
})) as any;

export type GetScanError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns details about a scan, including whether or not a scan has completed.
 */
export const getScan: API.OperationMethod<
  GetScanRequest,
  GetScanResponse,
  GetScanError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /scans/{scanName}",
    input: { scanName: 0, runId: D.m({ query: "runId" }) },
    output: { createdAt: D.ts, updatedAt: D.ts },
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
  operationName: "GetScan",
})) as any;

export type ListFindingsMetricsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns metrics about all findings in an account within a specified time range.
 */
export const listFindingsMetrics: API.PaginatedOperationMethod<
  ListFindingsMetricsRequest,
  ListFindingsMetricsResponse,
  ListFindingsMetricsError,
  Credentials | HttpClient.HttpClient,
  AccountFindingsMetric
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /metrics/findings",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
      startDate: D.m({ query: "startDate", shape: D.tsAs("epoch-seconds") }),
      endDate: D.m({ query: "endDate", shape: D.tsAs("epoch-seconds") }),
    },
    output: { findingsMetrics: D.list({ date: D.ts }) },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListFindingsMetrics",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "findingsMetrics",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListScansError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of all scans in an account. Does not return `EXPRESS` scans.
 */
export const listScans: API.PaginatedOperationMethod<
  ListScansRequest,
  ListScansResponse,
  ListScansError,
  Credentials | HttpClient.HttpClient,
  ScanSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /scans",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: { summaries: D.list({ createdAt: D.ts, updatedAt: D.ts }) },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListScans",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "summaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of all tags associated with a scan.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /tags/{resourceArn}",
    input: { resourceArn: 0 },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
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
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Use to add one or more tags to an existing scan.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /tags/{resourceArn}",
    input: { resourceArn: 0, tags: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
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
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Use to remove one or more tags from an existing scan.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /tags/{resourceArn}",
    input: { resourceArn: 0, tagKeys: D.m({ query: "tagKeys" }) },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

export type UpdateAccountConfigurationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Use to update the encryption configuration for an account.
 */
export const updateAccountConfiguration: API.OperationMethod<
  UpdateAccountConfigurationRequest,
  UpdateAccountConfigurationResponse,
  UpdateAccountConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /updateAccountConfiguration",
    input: { encryptionConfig: { kmsKeyArn: 0 } },
    body: true,
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
  operationName: "UpdateAccountConfiguration",
})) as any;

const o_Finding: D.LazyStruct = () => ({ createdAt: D.ts, updatedAt: D.ts });
