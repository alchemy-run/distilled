import * as API from "@distilled.cloud/core/api";
import * as S from "@distilled.cloud/core/schema-lite";
import * as __L from "@distilled.cloud/core/schema-lite";
import * as TxXray from "@distilled.cloud/core/telemetry-xray";
import type * as HttpClient from "effect/http/HttpClient";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import { awsServiceErrorsWith } from "../errors.ts";
import { AwsProtocol } from "../protocol.ts";
import type { RegionInput } from "../region.ts";
import { Retry } from "../retry.ts";
import * as T from "../traits.ts";
// Schema table, filled on first reach (see __S at the end).
const __s: any[] = [];
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "Abuse Signal",
  serviceShapeName: "AbuseReportApi",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "abuse" });
const ver = /*@__PURE__*/ T.ServiceVersion("2026-01-12");
const proto = /*@__PURE__*/ T.AwsProtocolsRestJson1();
const rules = /*@__PURE__*/ T.EndpointResolver((p, _) => {
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
              `https://abuse-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true && UseDualStack === false) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(`https://abuse-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseFIPS === false && UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(`https://abuse.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`);
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://abuse.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://abuse.{R}.{D}","properties":{},"headers":{}}');

/** Span facts shared by every operation (com.distilled.telemetry#service). */
const TELEMETRY = {
  system: "aws-api",
  responseHeaders: [
    { header: "x-amzn-requestid", name: "aws.request_id" },
    { header: "x-amz-request-id", name: "aws.request_id" },
    { header: "x-amzn-request-id", name: "aws.request_id" },
    { header: "x-amz-id-2", name: "aws.extended_request_id" },
  ],
  prefix: "AbuseSignal",
  service: "AbuseSignal",
  propagate: TxXray.propagate,
} as const;

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      retryAfterSeconds: /*@__PURE__*/ S.optional(S.Number).pipe(
        /*@__PURE__*/ T.HttpHeader("Retry-After"),
      ),
    },
    /*@__PURE__*/ T.all(/*@__PURE__*/ T.HttpError(500), /*@__PURE__*/ T.Retryable()),
  ).pipe(C.withServerError, C.withRetryableError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()), resourceId: S.String },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class SubmissionRequirementException
  extends /*@__PURE__*/ S.TaggedError<SubmissionRequirementException>()(
    "SubmissionRequirementException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      unmetRequirements: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => __S(1, __c0, 1)).annotate({
          identifier: "SubmissionRequirementList",
        }),
      ),
    },
    /*@__PURE__*/ T.HttpError(422),
  ).pipe(C.withBadRequestError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      serviceCode: /*@__PURE__*/ S.optional(S.String),
      quotaCode: /*@__PURE__*/ S.optional(S.String),
      retryAfterSeconds: /*@__PURE__*/ S.optional(S.Number).pipe(
        /*@__PURE__*/ T.HttpHeader("Retry-After"),
      ),
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
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      fieldList: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => __S(5, __c1, 1)).annotate({
          identifier: "ValidationExceptionFieldList",
        }),
      ),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type ReportData = { xarf: any };
export type CorrelationId = string;
export type ClientToken = string;
export interface CreateAbuseReportRequest {
  report: ReportData;
  correlationId?: string | undefined;
  clientToken?: string | undefined;
}
export type ReportId = string;
export interface CreateAbuseReportResponse {
  reportId: string;
  correlationId?: string | undefined;
}
export interface GetAbuseReportStatusRequest {
  reportId: string;
}
export type ReportSubmissionStatus = "QUEUED" | "PROCESSING" | "COMPLETED" | (string & {});
export type ReasonCode =
  | "ACTIONED"
  | "NOT_RESOLVABLE_TO_AWS"
  | "REVIEWED_NO_AWS_ACTION"
  | "CONTENT_DOWN_OR_INACCESSIBLE"
  | "NEED_MORE_INFORMATION"
  | (string & {});
export interface GetAbuseReportStatusResponse {
  reportId: string;
  correlationId?: string | undefined;
  status: ReportSubmissionStatus;
  description: string;
  reasonCode?: ReasonCode | undefined;
  submittedAt: Date;
  lastUpdatedAt?: Date | undefined;
}
export type NextToken = string;
export interface ListAbuseReportStatusesRequest {
  correlationId?: string | undefined;
  nextToken?: string | undefined;
  maxResults?: number | undefined;
}
export interface ReportStatusListItem {
  reportId: string;
  correlationId?: string | undefined;
  status: ReportSubmissionStatus;
  description: string;
  reasonCode?: ReasonCode | undefined;
}
export type ReportStatusList = ReportStatusListItem[];
export interface ListAbuseReportStatusesResponse {
  reports: ReportStatusListItem[];
  nextToken?: string | undefined;
}
export interface SubmissionRequirement {
  code?: string | undefined;
  path: string;
  message: string;
}
export type SubmissionRequirementList = SubmissionRequirement[];
export interface ValidationExceptionField {
  path: string;
  message: string;
}
export type ValidationExceptionFieldList = ValidationExceptionField[];
export type CreateAbuseReportError =
  | ConflictException
  | SubmissionRequirementException
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Submits a structured report. Amazon Web Services validates it and returns a report ID. A successful response confirms that Amazon Web Services received your report. It doesn't mean that Amazon Web Services has reached an outcome. Use GetAbuseReportStatus with the report ID to check the report's status and outcome.
 *
 * This operation is idempotent within a time window. If you provide a `clientToken`, duplicate requests within 24 hours return the existing report ID. If you omit it, the service generates a token scoped to 5 minutes.
 *
 * **Cross-Region data residency:** By submitting a report, you instruct Amazon Web Services to store it in all supported Regions (`us-east-1`, `us-west-2`, and `eu-west-2`), including across the United States and Europe. If data must remain in a single Region, do not include it in the report.
 */
export const createAbuseReport: API.OperationMethod<
  CreateAbuseReportRequest & RegionInput,
  CreateAbuseReportResponse,
  CreateAbuseReportError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(9, __c2, 1) as any as S.Schema<CreateAbuseReportRequest>,
  output: __S(10, __c2, 2) as any as S.Schema<CreateAbuseReportResponse>,
  errors: [ConflictException, SubmissionRequirementException],
  serviceErrors: awsServiceErrorsWith(
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ),
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAbuseReport",
  telemetry: TELEMETRY,
  span: "CreateAbuseReport",
}));

export type GetAbuseReportStatusError =
  | ResourceNotFoundException
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the current processing status of a previously submitted abuse report, including the status, submission timestamp, and last-update time.
 *
 * You can poll this operation to track the report's status. `PROCESSING` confirms that Amazon Web Services received your report and is processing it. `COMPLETED` means Amazon Web Services finished resolving the report, and the response includes a `reasonCode`. The time to reach `COMPLETED` may vary and can take up to several days depending on the scope and complexity of the suspected abuse.
 *
 * `COMPLETED` is the only terminal status. To wait for a report, use the `ReportProcessing` waiter, which succeeds when the report reaches `PROCESSING` or `COMPLETED`. If you poll this operation yourself, wait 1-5 seconds between calls.
 */
export const getAbuseReportStatus: API.OperationMethod<
  GetAbuseReportStatusRequest & RegionInput,
  GetAbuseReportStatusResponse,
  GetAbuseReportStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(12, __c3, 0) as any as S.Schema<GetAbuseReportStatusRequest>,
  output: __S(13, __c3, 1) as any as S.Schema<GetAbuseReportStatusResponse>,
  errors: [ResourceNotFoundException],
  serviceErrors: awsServiceErrorsWith(
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ),
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAbuseReportStatus",
  telemetry: TELEMETRY,
  span: "GetAbuseReportStatus",
}));

export type ListAbuseReportStatusesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists abuse report statuses for the calling account, ordered by submission time, with optional filtering and pagination.
 *
 * Use the `correlationId` parameter to filter results by the reporter-provided correlation ID that was specified during report submission.
 *
 * Results are paginated. Use `nextToken` to retrieve additional results.
 */
export const listAbuseReportStatuses: API.PaginatedOperationMethod<
  ListAbuseReportStatusesRequest & RegionInput,
  ListAbuseReportStatusesResponse,
  ListAbuseReportStatusesError,
  Credentials | HttpClient.HttpClient,
  ReportStatusListItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(16, __c4, 0) as any as S.Schema<ListAbuseReportStatusesRequest>,
  output: __S(19, __c4, 3) as any as S.Schema<ListAbuseReportStatusesResponse>,
  errors: [],
  serviceErrors: awsServiceErrorsWith(
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ),
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAbuseReportStatuses",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "reports",
    pageSize: "maxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListAbuseReportStatuses",
})) as any;

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ code: S.optional(S.String), path: S.String, message: S.String }),
      ).annotate({ identifier: "SubmissionRequirement" });
    case 1:
      return S.Array(__S(0, __c0, 0));
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ path: S.String, message: S.String })).annotate({
        identifier: "ValidationExceptionField",
      });
    case 1:
      return S.Array(__S(4, __c1, 0));
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.Union([/*@__PURE__*/ S.Struct({ xarf: S.Any })]);
    case 1:
      return S.suspend(() =>
        S.Struct({
          report: __S(8, __c2, 0),
          correlationId: S.optional(S.String),
          clientToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/v1/abuse" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateAbuseReportRequest" });
    case 2:
      return S.suspend(() =>
        S.Struct({ reportId: S.String, correlationId: S.optional(S.String) }),
      ).annotate({ identifier: "CreateAbuseReportResponse" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ reportId: S.String.pipe(T.HttpLabel("reportId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v1/abuse/{reportId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetAbuseReportStatusRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          reportId: S.String,
          correlationId: S.optional(S.String),
          status: S.String,
          description: S.String,
          reasonCode: S.optional(S.String),
          submittedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          lastUpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "GetAbuseReportStatusResponse" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          correlationId: S.optional(S.String).pipe(T.HttpQuery("correlationId")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/v1/abusestatuses" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListAbuseReportStatusesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          reportId: S.String,
          correlationId: S.optional(S.String),
          status: S.String,
          description: S.String,
          reasonCode: S.optional(S.String),
        }),
      ).annotate({ identifier: "ReportStatusListItem" });
    case 2:
      return S.Array(__S(17, __c4, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ reports: __S(18, __c4, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListAbuseReportStatusesResponse" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
