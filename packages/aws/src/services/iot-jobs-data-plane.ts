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
  sdkId: "IoT Jobs Data Plane",
  target: "IotLaserThingJobManagerExternalService",
  version: "2017-09-29",
  sigv4: "iot-jobs-data",
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
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://data.jobs.iot.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://data.jobs.iot.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class CertificateValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "CertificateValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError("ConflictException", ["ConflictError"], {
    status: 409,
  })<{ readonly message?: string; readonly resourceId?: string }> {}
export class InternalServerException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerException",
    ["ServerError"],
    { status: 500 },
  )<{ readonly message?: string }> {}
export class InvalidRequestException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidRequestException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidStateTransitionException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidStateTransitionException",
    ["ConflictError"],
    { status: 409 },
  )<{ readonly message?: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceQuotaExceededException",
    ["QuotaError"],
    { status: 402 },
  )<{ readonly message?: string }> {}
export class ServiceUnavailableException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceUnavailableException",
    ["ServerError"],
    { status: 503 },
  )<{ readonly message?: string }> {}
export class TerminalStateException
  extends /*@__PURE__*/ TE.TaggedError(
    "TerminalStateException",
    ["BadRequestError"],
    { status: 410 },
  )<{ readonly message?: string }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["ThrottlingError"],
    { status: 429 },
  )<{ readonly message?: string; readonly payload?: Uint8Array }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
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
export type CommandExecutionParameterMap = {
  [key: string]: CommandParameterValue | undefined;
};
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
  descriptor: {
    service: svc,
    http: "GET /things/{thingName}/jobs/{jobId}",
    input: {
      jobId: 0,
      thingName: 0,
      includeJobDocument: D.m({ query: "includeJobDocument" }),
      executionNumber: D.m({ query: "executionNumber" }),
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /things/{thingName}/jobs",
    input: { thingName: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /command-executions",
    input: {
      targetArn: 0,
      commandArn: 0,
      parameters: D.map({ S: 0, B: 0, I: 0, L: 0, D: 0, BIN: 0, UL: 0 }),
      executionTimeoutSeconds: 0,
      clientToken: D.m({ idempotency: true }),
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /things/{thingName}/jobs/$next",
    input: { thingName: 0, statusDetails: 0, stepTimeoutInMinutes: 0 },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /things/{thingName}/jobs/{jobId}",
    input: {
      jobId: 0,
      thingName: 0,
      status: 0,
      statusDetails: 0,
      stepTimeoutInMinutes: 0,
      expectedVersion: 0,
      includeJobExecutionState: 0,
      includeJobDocument: 0,
      executionNumber: 0,
    },
    body: true,
  },
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
})) as any;
