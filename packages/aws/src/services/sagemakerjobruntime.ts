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
  sdkId: "SagemakerJobRuntime",
  target: "AgenticRFTRuntimeService",
  version: "2026-02-01",
  sigv4: "sagemaker",
  protocol: restJson1Protocol,
  rules: (p, _) => {
    const { UseFIPS = false, Endpoint, Region } = p;
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
      return e(Endpoint);
    }
    if (Region != null) {
      {
        const PartitionResult = _.partition(Region);
        if (PartitionResult != null && PartitionResult !== false) {
          if (
            _.getAttr(PartitionResult, "name") === "aws" &&
            UseFIPS === false
          ) {
            return e(
              `https://job-runtime.sagemaker.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws-cn" &&
            UseFIPS === false
          ) {
            return e(
              `https://job-runtime.sagemaker.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws-us-gov" &&
            UseFIPS === false
          ) {
            return e(
              `https://job-runtime.sagemaker.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          if (UseFIPS === true) {
            return e(
              `https://job-runtime.sagemaker-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return e(
            `https://job-runtime.sagemaker.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
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
  })<{ readonly message: string }> {}
export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError("ConflictException", ["ConflictError"], {
    status: 409,
  })<{ readonly message: string }> {}
export class InternalServiceError
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServiceError",
    ["ServerError", "RetryableError"],
    { status: 500 },
  )<{ readonly message: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message: string }> {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceQuotaExceededException",
    ["QuotaError"],
    { status: 402 },
  )<{ readonly message: string }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["ThrottlingError", "RetryableError"],
    { status: 429 },
  )<{ readonly message: string }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message: string }> {}
export type JobArn = string;
export type TrajectoryId = string;
export type CompletionStatus = "ready" | "failed" | (string & {});
export interface CompleteRolloutRequest {
  JobArn: string;
  TrajectoryId: string;
  Status?: CompletionStatus;
  ClientToken?: string;
}
export interface CompleteRolloutResponse {}
export interface SampleRequest {
  JobArn: string;
  TrajectoryId: string;
  Body: T.StreamingInputBody;
}
export interface SampleResponse {
  ContentType?: string;
  Body: T.StreamingOutputBody;
}
export interface SampleWithResponseStreamRequest {
  JobArn: string;
  TrajectoryId: string;
  Body: T.StreamingInputBody;
}
export interface SampleWithResponseStreamResponse {
  ContentType?: string;
  Body: T.StreamingOutputBody;
}
export type DoubleList = number[];
export interface UpdateRewardRequest {
  JobArn: string;
  TrajectoryId: string;
  Rewards: number[];
  ClientToken?: string;
}
export interface UpdateRewardResponse {}
export type FailureReason = string;
export type CompleteRolloutError =
  | AccessDeniedException
  | ConflictException
  | InternalServiceError
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Marks a rollout as complete, indicating that no further turns will be appended
 * to the trajectory. After calling this operation, the trajectory is sealed and
 * eligible for reward submission via the UpdateReward operation.
 */
export const completeRollout: API.OperationMethod<
  CompleteRolloutRequest,
  CompleteRolloutResponse,
  CompleteRolloutError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /complete-rollout",
    input: {
      JobArn: D.m({ header: "X-Amzn-SageMaker-Job-Arn" }),
      TrajectoryId: 0,
      Status: 0,
      ClientToken: D.m({ idempotency: true }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServiceError,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CompleteRollout",
})) as any;

export type SampleError =
  | AccessDeniedException
  | InternalServiceError
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Sends an inference request to the model during a job execution. The request
 * and response bodies are forwarded to and from the model without modification.
 * Each turn (prompt and response) is captured for later use.
 */
export const sample: API.OperationMethod<
  SampleRequest,
  SampleResponse,
  SampleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /sample",
    input: {
      JobArn: D.m({ header: "X-Amzn-SageMaker-Job-Arn" }),
      TrajectoryId: D.m({ header: "X-Amzn-SageMaker-Trajectory-Id" }),
      Body: D.m({ payload: true, shape: D.stream }),
    },
    output: {
      ContentType: D.m({ header: "Content-Type" }),
      Body: D.m({ payload: true, shape: D.stream }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServiceError,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "Sample",
})) as any;

export type SampleWithResponseStreamError =
  | AccessDeniedException
  | InternalServiceError
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Sends a streaming inference request to the model during a job execution.
 * Returns the response as a stream of payload chunks. Each turn is captured
 * for later use.
 */
export const sampleWithResponseStream: API.OperationMethod<
  SampleWithResponseStreamRequest,
  SampleWithResponseStreamResponse,
  SampleWithResponseStreamError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /sample-with-response-stream",
    input: {
      JobArn: D.m({ header: "X-Amzn-SageMaker-Job-Arn" }),
      TrajectoryId: D.m({ header: "X-Amzn-SageMaker-Trajectory-Id" }),
      Body: D.m({ payload: true, shape: D.stream }),
    },
    output: {
      ContentType: D.m({ header: "Content-Type" }),
      Body: D.m({ payload: true, shape: D.stream }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServiceError,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SampleWithResponseStream",
})) as any;

export type UpdateRewardError =
  | AccessDeniedException
  | ConflictException
  | InternalServiceError
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the reward values for a trajectory and transitions it to
 * reward-received status, signaling that it is eligible for processing. Call this
 * operation after CompleteRollout to provide the computed reward scores.
 */
export const updateReward: API.OperationMethod<
  UpdateRewardRequest,
  UpdateRewardResponse,
  UpdateRewardError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /update-reward",
    input: {
      JobArn: D.m({ header: "X-Amzn-SageMaker-Job-Arn" }),
      TrajectoryId: 0,
      Rewards: 0,
      ClientToken: D.m({ idempotency: true }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServiceError,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateReward",
})) as any;
