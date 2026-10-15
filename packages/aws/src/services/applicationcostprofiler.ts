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
  sdkId: "ApplicationCostProfiler",
  serviceShapeName: "AWSApplicationCostProfiler",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "application-cost-profiler" });
const ver = /*@__PURE__*/ T.ServiceVersion("2020-09-10");
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
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://application-cost-profiler.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(
          `https://application-cost-profiler.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://application-cost-profiler.{R}.{D}","properties":{},"headers":{}}');

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
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
  input: __S(4, __c1, 0) as any as S.Schema<DeleteReportDefinitionRequest>,
  output: __S(8, __c2, 0) as any as S.Schema<DeleteReportDefinitionResult>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteReportDefinition",
}));

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
  input: __S(12, __c3, 0) as any as S.Schema<GetReportDefinitionRequest>,
  output: __S(13, __c3, 1) as any as S.Schema<GetReportDefinitionResult>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetReportDefinition",
}));

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
  input: __S(21, __c5, 1) as any as S.Schema<ImportApplicationUsageRequest>,
  output: __S(22, __c5, 2) as any as S.Schema<ImportApplicationUsageResult>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ImportApplicationUsage",
}));

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
  input: __S(24, __c6, 0) as any as S.Schema<ListReportDefinitionsRequest>,
  output: __S(27, __c6, 3) as any as S.Schema<ListReportDefinitionsResult>,
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
  input: __S(28, __c7, 0) as any as S.Schema<PutReportDefinitionRequest>,
  output: __S(8, __c2, 0) as any as S.Schema<PutReportDefinitionResult>,
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
}));

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
  input: __S(0, __c0, 0) as any as S.Schema<UpdateReportDefinitionRequest>,
  output: __S(8, __c2, 0) as any as S.Schema<UpdateReportDefinitionResult>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateReportDefinition",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          reportId: S.String.pipe(T.HttpLabel("reportId")),
          reportDescription: S.String,
          reportFrequency: S.String,
          format: S.String,
          destinationS3Location: __S(16, __c4, 0),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/reportDefinition/{reportId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateReportDefinitionRequest" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ reportId: S.String.pipe(T.HttpLabel("reportId")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/reportDefinition/{reportId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteReportDefinitionRequest" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ reportId: S.optional(S.String) })).annotate({
        identifier: "DeleteReportDefinitionResult",
      });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ reportId: S.String.pipe(T.HttpLabel("reportId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/reportDefinition/{reportId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetReportDefinitionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          reportId: S.String,
          reportDescription: S.String,
          reportFrequency: S.String,
          format: S.String,
          destinationS3Location: __S(16, __c4, 0),
          createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          lastUpdated: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "GetReportDefinitionResult" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ bucket: S.String, prefix: S.String })).annotate({
        identifier: "S3Location",
      });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ bucket: S.String, key: S.String, region: S.optional(S.String) }),
      ).annotate({ identifier: "SourceS3Location" });
    case 1:
      return S.suspend(() =>
        S.Struct({ sourceS3Location: __S(20, __c5, 0) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/importApplicationUsage" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ImportApplicationUsageRequest" });
    case 2:
      return S.suspend(() => S.Struct({ importId: S.String })).annotate({
        identifier: "ImportApplicationUsageResult",
      });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/reportDefinition" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListReportDefinitionsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          reportId: S.optional(S.String),
          reportDescription: S.optional(S.String),
          reportFrequency: S.optional(S.String),
          format: S.optional(S.String),
          destinationS3Location: S.optional(__S(16, __c4, 0)),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastUpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "ReportDefinition" });
    case 2:
      return S.Array(__S(25, __c6, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          reportDefinitions: S.optional(__S(26, __c6, 2)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListReportDefinitionsResult" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          reportId: S.String,
          reportDescription: S.String,
          reportFrequency: S.String,
          format: S.String,
          destinationS3Location: __S(16, __c4, 0),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/reportDefinition" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "PutReportDefinitionRequest" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
