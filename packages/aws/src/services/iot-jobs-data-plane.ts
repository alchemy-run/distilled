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
  sdkId: "IoT Jobs Data Plane",
  serviceShapeName: "IotLaserThingJobManagerExternalService",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "iot-jobs-data" });
const ver = /*@__PURE__*/ T.ServiceVersion("2017-09-29");
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
              `https://data.jobs.iot-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://data.jobs.iot-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://data.jobs.iot.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://data.jobs.iot.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://data.jobs.iot.{R}.{D}","properties":{},"headers":{}}');

export class CertificateValidationException
  extends /*@__PURE__*/ S.TaggedError<CertificateValidationException>()(
    "CertificateValidationException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      resourceId: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError) {}
export class InvalidRequestException
  extends /*@__PURE__*/ S.TaggedError<InvalidRequestException>()(
    "InvalidRequestException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidStateTransitionException
  extends /*@__PURE__*/ S.TaggedError<InvalidStateTransitionException>()(
    "InvalidStateTransitionException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class ServiceUnavailableException
  extends /*@__PURE__*/ S.TaggedError<ServiceUnavailableException>()(
    "ServiceUnavailableException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(503),
  ).pipe(C.withServerError) {}
export class TerminalStateException
  extends /*@__PURE__*/ S.TaggedError<TerminalStateException>()(
    "TerminalStateException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(410),
  ).pipe(C.withBadRequestError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      payload: /*@__PURE__*/ S.optional(T.Blob),
    },
    /*@__PURE__*/ T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type DescribeJobExecutionJobId = string;
export type ThingName = string;
export type IncludeJobDocument = boolean;
export type ExecutionNumber = number;
export interface DescribeJobExecutionRequest {
  jobId: string;
  thingName: string;
  includeJobDocument?: boolean;
  executionNumber?: number;
}
export type JobId = string;
export type JobExecutionStatus =
  | "QUEUED"
  | "IN_PROGRESS"
  | "SUCCEEDED"
  | "FAILED"
  | "TIMED_OUT"
  | "REJECTED"
  | "REMOVED"
  | "CANCELED"
  | (string & {});
export type DetailsKey = string;
export type DetailsValue = string;
export type DetailsMap = { [key: string]: string | undefined };
export type QueuedAt = number;
export type StartedAt = number;
export type LastUpdatedAt = number;
export type ApproximateSecondsBeforeTimedOut = number;
export type VersionNumber = number;
export type JobDocument = string;
export interface JobExecution {
  jobId?: string;
  thingName?: string;
  status?: JobExecutionStatus;
  statusDetails?: { [key: string]: string | undefined };
  queuedAt?: number;
  startedAt?: number;
  lastUpdatedAt?: number;
  approximateSecondsBeforeTimedOut?: number;
  versionNumber?: number;
  executionNumber?: number;
  jobDocument?: string;
}
export interface DescribeJobExecutionResponse {
  execution?: JobExecution;
}
export interface GetPendingJobExecutionsRequest {
  thingName: string;
}
export interface JobExecutionSummary {
  jobId?: string;
  queuedAt?: number;
  startedAt?: number;
  lastUpdatedAt?: number;
  versionNumber?: number;
  executionNumber?: number;
}
export type JobExecutionSummaryList = JobExecutionSummary[];
export interface GetPendingJobExecutionsResponse {
  inProgressJobs?: JobExecutionSummary[];
  queuedJobs?: JobExecutionSummary[];
}
export type TargetArn = string;
export type CommandArn = string;
export type CommandParameterName = string;
export type StringParameterValue = string;
export type BooleanParameterValue = boolean;
export type IntegerParameterValue = number;
export type LongParameterValue = number;
export type DoubleParameterValue = number;
export type BinaryParameterValue = Uint8Array;
export type UnsignedLongParameterValue = string;
export interface CommandParameterValue {
  S?: string;
  B?: boolean;
  I?: number;
  L?: number;
  D?: number;
  BIN?: Uint8Array;
  UL?: string;
}
export type CommandExecutionParameterMap = { [key: string]: CommandParameterValue | undefined };
export type CommandExecutionTimeoutInSeconds = number;
export type ClientRequestTokenV2 = string;
export interface StartCommandExecutionRequest {
  targetArn: string;
  commandArn: string;
  parameters?: { [key: string]: CommandParameterValue | undefined };
  executionTimeoutSeconds?: number;
  clientToken?: string;
}
export type CommandExecutionId = string;
export interface StartCommandExecutionResponse {
  executionId?: string;
}
export type StepTimeoutInMinutes = number;
export interface StartNextPendingJobExecutionRequest {
  thingName: string;
  statusDetails?: { [key: string]: string | undefined };
  stepTimeoutInMinutes?: number;
}
export interface StartNextPendingJobExecutionResponse {
  execution?: JobExecution;
}
export type ExpectedVersion = number;
export type IncludeExecutionState = boolean;
export interface UpdateJobExecutionRequest {
  jobId: string;
  thingName: string;
  status: JobExecutionStatus;
  statusDetails?: { [key: string]: string | undefined };
  stepTimeoutInMinutes?: number;
  expectedVersion?: number;
  includeJobExecutionState?: boolean;
  includeJobDocument?: boolean;
  executionNumber?: number;
}
export interface JobExecutionState {
  status?: JobExecutionStatus;
  statusDetails?: { [key: string]: string | undefined };
  versionNumber?: number;
}
export interface UpdateJobExecutionResponse {
  executionState?: JobExecutionState;
  jobDocument?: string;
}
export type ErrorMessage = string;
export type BinaryBlob = Uint8Array;
export type ResourceId = string;
export type DescribeJobExecutionError =
  | CertificateValidationException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | TerminalStateException
  | ThrottlingException
  | CommonErrors;
/**
 * Gets details of a job execution.
 *
 * Requires permission to access the DescribeJobExecution action.
 */
export const describeJobExecution: API.OperationMethod<
  DescribeJobExecutionRequest,
  DescribeJobExecutionResponse,
  DescribeJobExecutionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<DescribeJobExecutionRequest>,
  output: __S(5, __c1, 1) as any as S.Schema<DescribeJobExecutionResponse>,
  errors: [
    CertificateValidationException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    TerminalStateException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeJobExecution",
}));

export type GetPendingJobExecutionsError =
  | CertificateValidationException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Gets the list of all jobs for a thing that are not in a terminal status.
 *
 * Requires permission to access the GetPendingJobExecutions action.
 */
export const getPendingJobExecutions: API.OperationMethod<
  GetPendingJobExecutionsRequest,
  GetPendingJobExecutionsResponse,
  GetPendingJobExecutionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(12, __c3, 0) as any as S.Schema<GetPendingJobExecutionsRequest>,
  output: __S(15, __c3, 3) as any as S.Schema<GetPendingJobExecutionsResponse>,
  errors: [
    CertificateValidationException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPendingJobExecutions",
}));

export type StartCommandExecutionError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Using the command created with the `CreateCommand` API, start a command
 * execution on a specific device.
 */
export const startCommandExecution: API.OperationMethod<
  StartCommandExecutionRequest,
  StartCommandExecutionResponse,
  StartCommandExecutionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(18, __c4, 2) as any as S.Schema<StartCommandExecutionRequest>,
  output: __S(19, __c4, 3) as any as S.Schema<StartCommandExecutionResponse>,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartCommandExecution",
}));

export type StartNextPendingJobExecutionError =
  | CertificateValidationException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Gets and starts the next pending (status IN_PROGRESS or QUEUED) job execution for a
 * thing.
 *
 * Requires permission to access the StartNextPendingJobExecution action.
 */
export const startNextPendingJobExecution: API.OperationMethod<
  StartNextPendingJobExecutionRequest,
  StartNextPendingJobExecutionResponse,
  StartNextPendingJobExecutionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(20, __c5, 0) as any as S.Schema<StartNextPendingJobExecutionRequest>,
  output: __S(5, __c1, 1) as any as S.Schema<StartNextPendingJobExecutionResponse>,
  errors: [
    CertificateValidationException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartNextPendingJobExecution",
}));

export type UpdateJobExecutionError =
  | CertificateValidationException
  | InvalidRequestException
  | InvalidStateTransitionException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates the status of a job execution.
 *
 * Requires permission to access the UpdateJobExecution action.
 */
export const updateJobExecution: API.OperationMethod<
  UpdateJobExecutionRequest,
  UpdateJobExecutionResponse,
  UpdateJobExecutionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(24, __c6, 0) as any as S.Schema<UpdateJobExecutionRequest>,
  output: __S(26, __c6, 2) as any as S.Schema<UpdateJobExecutionResponse>,
  errors: [
    CertificateValidationException,
    InvalidRequestException,
    InvalidStateTransitionException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateJobExecution",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          jobId: S.String.pipe(T.HttpLabel("jobId")),
          thingName: S.String.pipe(T.HttpLabel("thingName")),
          includeJobDocument: S.optional(S.Boolean).pipe(T.HttpQuery("includeJobDocument")),
          executionNumber: S.optional(S.Number).pipe(T.HttpQuery("executionNumber")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/things/{thingName}/jobs/{jobId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeJobExecutionRequest" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          jobId: S.optional(S.String),
          thingName: S.optional(S.String),
          status: S.optional(S.String),
          statusDetails: S.optional(__S(8, __c2, 0)),
          queuedAt: S.optional(S.Number),
          startedAt: S.optional(S.Number),
          lastUpdatedAt: S.optional(S.Number),
          approximateSecondsBeforeTimedOut: S.optional(S.Number),
          versionNumber: S.optional(S.Number),
          executionNumber: S.optional(S.Number),
          jobDocument: S.optional(S.String),
        }),
      ).annotate({ identifier: "JobExecution" });
    case 1:
      return S.suspend(() => S.Struct({ execution: S.optional(__S(4, __c1, 0)) })).annotate({
        identifier: "DescribeJobExecutionResponse",
      });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ thingName: S.String.pipe(T.HttpLabel("thingName")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/things/{thingName}/jobs" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetPendingJobExecutionsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          jobId: S.optional(S.String),
          queuedAt: S.optional(S.Number),
          startedAt: S.optional(S.Number),
          lastUpdatedAt: S.optional(S.Number),
          versionNumber: S.optional(S.Number),
          executionNumber: S.optional(S.Number),
        }),
      ).annotate({ identifier: "JobExecutionSummary" });
    case 2:
      return S.Array(__S(13, __c3, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          inProgressJobs: S.optional(__S(14, __c3, 2)),
          queuedJobs: S.optional(__S(14, __c3, 2)),
        }),
      ).annotate({ identifier: "GetPendingJobExecutionsResponse" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          S: S.optional(S.String),
          B: S.optional(S.Boolean),
          I: S.optional(S.Number),
          L: S.optional(S.Number),
          D: S.optional(S.Number),
          BIN: S.optional(T.Blob),
          UL: S.optional(S.String),
        }),
      ).annotate({ identifier: "CommandParameterValue" });
    case 1:
      return S.Record(S.String, /*@__PURE__*/ __S(16, __c4, 0).pipe(S.optional));
    case 2:
      return S.suspend(() =>
        S.Struct({
          targetArn: S.String,
          commandArn: S.String,
          parameters: S.optional(__S(17, __c4, 1)),
          executionTimeoutSeconds: S.optional(S.Number),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/command-executions" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartCommandExecutionRequest" });
    case 3:
      return S.suspend(() => S.Struct({ executionId: S.optional(S.String) })).annotate({
        identifier: "StartCommandExecutionResponse",
      });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          thingName: S.String.pipe(T.HttpLabel("thingName")),
          statusDetails: S.optional(__S(8, __c2, 0)),
          stepTimeoutInMinutes: S.optional(S.Number),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/things/{thingName}/jobs/$next" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartNextPendingJobExecutionRequest" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          jobId: S.String.pipe(T.HttpLabel("jobId")),
          thingName: S.String.pipe(T.HttpLabel("thingName")),
          status: S.String,
          statusDetails: S.optional(__S(8, __c2, 0)),
          stepTimeoutInMinutes: S.optional(S.Number),
          expectedVersion: S.optional(S.Number),
          includeJobExecutionState: S.optional(S.Boolean),
          includeJobDocument: S.optional(S.Boolean),
          executionNumber: S.optional(S.Number),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/things/{thingName}/jobs/{jobId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateJobExecutionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          status: S.optional(S.String),
          statusDetails: S.optional(__S(8, __c2, 0)),
          versionNumber: S.optional(S.Number),
        }),
      ).annotate({ identifier: "JobExecutionState" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          executionState: S.optional(__S(25, __c6, 1)),
          jobDocument: S.optional(S.String),
        }),
      ).annotate({ identifier: "UpdateJobExecutionResponse" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
