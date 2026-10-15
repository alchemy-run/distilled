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
  sdkId: "SagemakerJobRuntime",
  serviceShapeName: "AgenticRFTRuntimeService",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "sagemaker" });
const ver = /*@__PURE__*/ T.ServiceVersion("2026-02-01");
const proto = /*@__PURE__*/ T.AwsProtocolsRestJson1();
const rules = /*@__PURE__*/ T.EndpointResolver(
  (p, _) => {
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
        return err("Invalid Configuration: FIPS and custom endpoint are not supported");
      }
      return e(Endpoint);
    }
    if (Region != null) {
      {
        const PartitionResult = _.partition(Region);
        if (PartitionResult != null && PartitionResult !== false) {
          if (_.getAttr(PartitionResult, "name") === "aws" && UseFIPS === false) {
            return e(
              `https://job-runtime.sagemaker.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          if (_.getAttr(PartitionResult, "name") === "aws-cn" && UseFIPS === false) {
            return e(
              `https://job-runtime.sagemaker.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          if (_.getAttr(PartitionResult, "name") === "aws-us-gov" && UseFIPS === false) {
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
  '{"url":"https://job-runtime.sagemaker.{R}.api.aws","properties":{},"headers":{}}',
  [
    "cn-north-1",
    "cn-northwest-1",
    "aws-cn-global",
    "us-iso-east-1",
    "us-iso-west-1",
    "aws-iso-global",
    "us-isob-east-1",
    "aws-iso-b-global",
    "aws-iso-f-global",
    "us-isof-east-1",
    "us-isof-south-1",
    "eusc-de-east-1",
  ],
);

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
export class InternalServiceError
  extends /*@__PURE__*/ S.TaggedError<InternalServiceError>()(
    "InternalServiceError",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(/*@__PURE__*/ T.HttpError(500), /*@__PURE__*/ T.Retryable()),
  ).pipe(C.withServerError, C.withRetryableError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(/*@__PURE__*/ T.HttpError(429), /*@__PURE__*/ T.Retryable()),
  ).pipe(C.withThrottlingError, C.withRetryableError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
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
  input: __S(2, __c1, 0) as any as S.Schema<CompleteRolloutRequest>,
  output: __S(4, __c2, 0) as any as S.Schema<CompleteRolloutResponse>,
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
}));

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
  input: __S(6, __c3, 0) as any as S.Schema<SampleRequest>,
  output: __S(8, __c4, 0) as any as S.Schema<SampleResponse>,
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
}));

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
  input: __S(10, __c5, 0) as any as S.Schema<SampleWithResponseStreamRequest>,
  output: __S(8, __c4, 0) as any as S.Schema<SampleWithResponseStreamResponse>,
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
}));

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
  input: __S(1, __c0, 1) as any as S.Schema<UpdateRewardRequest>,
  output: __S(4, __c2, 0) as any as S.Schema<UpdateRewardResponse>,
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
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.Number);
    case 1:
      return S.suspend(() =>
        S.Struct({
          JobArn: S.String.pipe(T.HttpHeader("X-Amzn-SageMaker-Job-Arn")),
          TrajectoryId: S.String,
          Rewards: __S(0, __c0, 0),
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/update-reward" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UpdateRewardRequest" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          JobArn: S.String.pipe(T.HttpHeader("X-Amzn-SageMaker-Job-Arn")),
          TrajectoryId: S.String,
          Status: S.optional(S.String),
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/complete-rollout" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CompleteRolloutRequest" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "CompleteRolloutResponse" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          JobArn: S.String.pipe(T.HttpHeader("X-Amzn-SageMaker-Job-Arn")),
          TrajectoryId: S.String.pipe(T.HttpHeader("X-Amzn-SageMaker-Trajectory-Id")),
          Body: T.StreamingInput.pipe(T.HttpPayload()),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/sample" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "SampleRequest" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ContentType: S.optional(S.String).pipe(T.HttpHeader("Content-Type")),
          Body: T.StreamingOutput.pipe(T.HttpPayload()),
        }),
      ).annotate({ identifier: "SampleResponse" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          JobArn: S.String.pipe(T.HttpHeader("X-Amzn-SageMaker-Job-Arn")),
          TrajectoryId: S.String.pipe(T.HttpHeader("X-Amzn-SageMaker-Trajectory-Id")),
          Body: T.StreamingInput.pipe(T.HttpPayload()),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/sample-with-response-stream" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "SampleWithResponseStreamRequest" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
