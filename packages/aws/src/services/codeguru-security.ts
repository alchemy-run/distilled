import * as API from "@distilled.cloud/core/api";
import * as S from "@distilled.cloud/core/schema-lite";
import * as __L from "@distilled.cloud/core/schema-lite";
import type * as HttpClient from "effect/http/HttpClient";
import type * as redacted from "effect/Redacted";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import { AwsProtocol } from "../protocol.ts";
import { Retry } from "../retry.ts";
import { SensitiveString } from "../sensitive.ts";
import * as T from "../traits.ts";
// Schema table, filled on first reach (see __S at the end).
const __s: any[] = [];
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "CodeGuru Security",
  serviceShapeName: "AwsCodeGuruSecurity",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "codeguru-security" });
const ver = /*@__PURE__*/ T.ServiceVersion("2018-05-10");
const proto = /*@__PURE__*/ T.AwsProtocolsRestJson1();
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
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://codeguru-security.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://codeguru-security.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://codeguru-security.{R}.{D}","properties":{},"headers":{}}');

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    {
      errorCode: S.String,
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      resourceId: /*@__PURE__*/ S.optional(S.String),
      resourceType: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    {
      errorCode: S.String,
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      resourceId: S.String,
      resourceType: S.String,
    },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    {
      error: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.all(/*@__PURE__*/ T.HttpError(500), /*@__PURE__*/ T.Retryable()),
  ).pipe(C.withServerError, C.withRetryableError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    {
      errorCode: S.String,
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      resourceId: S.String,
      resourceType: S.String,
    },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    {
      errorCode: S.String,
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      serviceCode: /*@__PURE__*/ S.optional(S.String),
      quotaCode: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.HttpError(429),
      /*@__PURE__*/ T.Retryable({ throttling: true }),
    ),
  ).pipe(C.withThrottlingError, C.withRetryableError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    {
      errorCode: S.String,
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      reason: /*@__PURE__*/ S.suspend(() => S.String).annotate({
        identifier: "ValidationExceptionReason",
      }),
      fieldList: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => __S(177, __c11, 1)).annotate({
          identifier: "ValidationExceptionFieldList",
        }),
      ),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
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
export type Severity = "Critical" | "High" | "Medium" | "Low" | "Info" | (string & {});
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
  input: __S(194, __c12, 2) as any as S.Schema<BatchGetFindingsRequest>,
  output: __S(197, __c12, 5) as any as S.Schema<BatchGetFindingsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetFindings",
}));

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
  input: __S(241, __c15, 1) as any as S.Schema<CreateScanRequest>,
  output: __S(242, __c15, 2) as any as S.Schema<CreateScanResponse>,
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
}));

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
  input: __S(272, __c17, 0) as any as S.Schema<CreateUploadUrlRequest>,
  output: __S(273, __c17, 1) as any as S.Schema<CreateUploadUrlResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateUploadUrl",
}));

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
  input: __S(288, __c18, 0) as any as S.Schema<GetAccountConfigurationRequest>,
  output: __S(305, __c19, 1) as any as S.Schema<GetAccountConfigurationResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAccountConfiguration",
}));

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
  input: __S(0, __c0, 0) as any as S.Schema<GetFindingsRequest>,
  output: __S(1, __c0, 1) as any as S.Schema<GetFindingsResponse>,
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
  input: __S(16, __c1, 0) as any as S.Schema<GetMetricsSummaryRequest>,
  output: __S(22, __c1, 6) as any as S.Schema<GetMetricsSummaryResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMetricsSummary",
}));

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
  input: __S(48, __c3, 0) as any as S.Schema<GetScanRequest>,
  output: __S(49, __c3, 1) as any as S.Schema<GetScanResponse>,
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
}));

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
  input: __S(64, __c4, 0) as any as S.Schema<ListFindingsMetricsRequest>,
  output: __S(67, __c4, 3) as any as S.Schema<ListFindingsMetricsResponse>,
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
  input: __S(80, __c5, 0) as any as S.Schema<ListScansRequest>,
  output: __S(83, __c5, 3) as any as S.Schema<ListScansResponse>,
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
  input: __S(96, __c6, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(97, __c6, 1) as any as S.Schema<ListTagsForResourceResponse>,
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
}));

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
  input: __S(112, __c7, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(128, __c8, 0) as any as S.Schema<TagResourceResponse>,
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
}));

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
  input: __S(144, __c9, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(128, __c8, 0) as any as S.Schema<UntagResourceResponse>,
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
}));

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
  input: __S(160, __c10, 0) as any as S.Schema<UpdateAccountConfigurationRequest>,
  output: __S(305, __c19, 1) as any as S.Schema<UpdateAccountConfigurationResponse>,
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
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          scanName: S.String.pipe(T.HttpLabel("scanName")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          status: S.optional(S.String).pipe(T.HttpQuery("status")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/findings/{scanName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetFindingsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ findings: S.optional(__S(218, __c13, 10)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "GetFindingsResponse" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          date: S.Date.pipe(T.TimestampFormat("epoch-seconds")).pipe(T.HttpQuery("date")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/metrics/summary" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetMetricsSummaryRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ categoryName: S.optional(S.String), findingNumber: S.optional(S.Number) }),
      ).annotate({ identifier: "CategoryWithFindingNum" });
    case 2:
      return S.Array(__S(17, __c1, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ scanName: S.optional(S.String), findingNumber: S.optional(S.Number) }),
      ).annotate({ identifier: "ScanNameWithFindingNum" });
    case 4:
      return S.Array(__S(19, __c1, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          date: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          openFindings: S.optional(__S(32, __c2, 0)),
          categoriesWithMostFindings: S.optional(__S(18, __c1, 2)),
          scansWithMostOpenFindings: S.optional(__S(20, __c1, 4)),
          scansWithMostOpenCriticalFindings: S.optional(__S(20, __c1, 4)),
        }),
      ).annotate({ identifier: "MetricsSummary" });
    case 6:
      return S.suspend(() => S.Struct({ metricsSummary: S.optional(__S(21, __c1, 5)) })).annotate({
        identifier: "GetMetricsSummaryResponse",
      });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          info: S.optional(S.Number),
          low: S.optional(S.Number),
          medium: S.optional(S.Number),
          high: S.optional(S.Number),
          critical: S.optional(S.Number),
        }),
      ).annotate({ identifier: "FindingMetricsValuePerSeverity" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          scanName: S.String.pipe(T.HttpLabel("scanName")),
          runId: S.optional(S.String).pipe(T.HttpQuery("runId")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/scans/{scanName}" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetScanRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          scanName: S.String,
          runId: S.String,
          scanState: S.String,
          createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          analysisType: S.String,
          updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          numberOfRevisions: S.optional(S.Number),
          scanNameArn: S.optional(S.String),
          errorMessage: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetScanResponse" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          startDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")).pipe(T.HttpQuery("startDate")),
          endDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")).pipe(T.HttpQuery("endDate")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/metrics/findings" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListFindingsMetricsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          date: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          newFindings: S.optional(__S(32, __c2, 0)),
          closedFindings: S.optional(__S(32, __c2, 0)),
          openFindings: S.optional(__S(32, __c2, 0)),
          meanTimeToClose: S.optional(__S(32, __c2, 0)),
        }),
      ).annotate({ identifier: "AccountFindingsMetric" });
    case 2:
      return S.Array(__S(65, __c4, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          findingsMetrics: S.optional(__S(66, __c4, 2)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListFindingsMetricsResponse" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(T.all(T.Http({ method: "GET", uri: "/scans" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListScansRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          scanState: S.String,
          createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          scanName: S.String,
          runId: S.String,
          scanNameArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "ScanSummary" });
    case 2:
      return S.Array(__S(81, __c5, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ summaries: S.optional(__S(82, __c5, 2)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListScansResponse" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceArn: S.String.pipe(T.HttpLabel("resourceArn")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/tags/{resourceArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListTagsForResourceRequest" });
    case 1:
      return S.suspend(() => S.Struct({ tags: S.optional(__S(256, __c16, 0)) })).annotate({
        identifier: "ListTagsForResourceResponse",
      });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
          tags: __S(256, __c16, 0),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/tags/{resourceArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "TagResourceRequest" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "TagResourceResponse" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
          tagKeys: __S(224, __c14, 0).pipe(T.HttpQuery("tagKeys")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/tags/{resourceArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UntagResourceRequest" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ encryptionConfig: __S(304, __c19, 0) }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/updateAccountConfiguration" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateAccountConfigurationRequest" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ name: S.String, message: S.String })).annotate({
        identifier: "ValidationExceptionField",
      });
    case 1:
      return S.Array(__S(176, __c11, 0));
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ scanName: S.String, findingId: S.String })).annotate({
        identifier: "FindingIdentifier",
      });
    case 1:
      return S.Array(__S(192, __c12, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ findingIdentifiers: __S(193, __c12, 1) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/batchGetFindings" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "BatchGetFindingsRequest" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          scanName: S.String,
          findingId: S.String,
          errorCode: S.String,
          message: S.String,
        }),
      ).annotate({ identifier: "BatchGetFindingsError" });
    case 4:
      return S.Array(__S(195, __c12, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({ findings: __S(218, __c13, 10), failedFindings: __S(196, __c12, 4) }),
      ).annotate({ identifier: "BatchGetFindingsResponse" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ id: S.optional(S.String), subResourceId: S.optional(S.String) }),
      ).annotate({ identifier: "Resource" });
    case 1:
      return S.suspend(() =>
        S.Struct({ number: S.optional(S.Number), content: S.optional(S.String) }),
      ).annotate({ identifier: "CodeLine" });
    case 2:
      return S.Array(__S(209, __c13, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          path: S.optional(S.String),
          startLine: S.optional(S.Number),
          endLine: S.optional(S.Number),
          codeSnippet: S.optional(__S(210, __c13, 2)),
        }),
      ).annotate({ identifier: "FilePath" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          referenceUrls: S.optional(__S(224, __c14, 0)),
          relatedVulnerabilities: S.optional(__S(224, __c14, 0)),
          id: S.optional(S.String),
          filePath: S.optional(__S(211, __c13, 3)),
          itemCount: S.optional(S.Number),
        }),
      ).annotate({ identifier: "Vulnerability" });
    case 5:
      return S.suspend(() =>
        S.Struct({ text: S.optional(S.String), url: S.optional(S.String) }),
      ).annotate({ identifier: "Recommendation" });
    case 6:
      return S.suspend(() =>
        S.Struct({ description: S.optional(S.String), code: S.optional(S.String) }),
      ).annotate({ identifier: "SuggestedFix" });
    case 7:
      return S.Array(__S(214, __c13, 6));
    case 8:
      return S.suspend(() =>
        S.Struct({
          recommendation: S.optional(__S(213, __c13, 5)),
          suggestedFixes: S.optional(__S(215, __c13, 7)),
        }),
      ).annotate({ identifier: "Remediation" });
    case 9:
      return S.suspend(() =>
        S.Struct({
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          description: S.optional(S.String),
          generatorId: S.optional(S.String),
          id: S.optional(S.String),
          updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          type: S.optional(S.String),
          status: S.optional(S.String),
          resource: S.optional(__S(208, __c13, 0)),
          vulnerability: S.optional(__S(212, __c13, 4)),
          severity: S.optional(S.String),
          remediation: S.optional(__S(216, __c13, 8)),
          title: S.optional(S.String),
          detectorTags: S.optional(__S(224, __c14, 0)),
          detectorId: S.optional(S.String),
          detectorName: S.optional(S.String),
          ruleId: S.optional(S.String),
        }),
      ).annotate({ identifier: "Finding" });
    case 10:
      return S.Array(__S(217, __c13, 9));
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.Union([/*@__PURE__*/ S.Struct({ codeArtifactId: S.String })]);
    case 1:
      return S.suspend(() =>
        S.Struct({
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          resourceId: __S(240, __c15, 0),
          scanName: S.String,
          scanType: S.optional(S.String),
          analysisType: S.optional(S.String),
          tags: S.optional(__S(256, __c16, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/scans" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateScanRequest" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          scanName: S.String,
          runId: S.String,
          resourceId: __S(240, __c15, 0),
          scanState: S.String,
          scanNameArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "CreateScanResponse" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ scanName: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/uploadUrl" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateUploadUrlRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          s3Url: SensitiveString,
          requestHeaders: __S(256, __c16, 0),
          codeArtifactId: S.String,
        }),
      ).annotate({ identifier: "CreateUploadUrlResponse" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/accountConfiguration/get" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetAccountConfigurationRequest" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ kmsKeyArn: S.optional(S.String) })).annotate({
        identifier: "EncryptionConfig",
      });
    case 1:
      return S.suspend(() => S.Struct({ encryptionConfig: __S(304, __c19, 0) })).annotate({
        identifier: "GetAccountConfigurationResponse",
      });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
