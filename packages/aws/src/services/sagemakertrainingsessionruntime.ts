import * as API from "@distilled.cloud/core/api";
import * as S from "@distilled.cloud/core/schema-lite";
import * as __L from "@distilled.cloud/core/schema-lite";
import * as TxXray from "@distilled.cloud/core/telemetry-xray";
import type * as HttpClient from "effect/http/HttpClient";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import { AwsProtocol } from "../protocol.ts";
import type { RegionInput } from "../region.ts";
import { Retry } from "../retry.ts";
import * as T from "../traits.ts";
// Schema table, filled on first reach (see __S at the end).
const __s: any[] = [];
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "SageMakerTrainingSessionRuntime",
  serviceShapeName: "LegoRouterService",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "sagemaker" });
const ver = /*@__PURE__*/ T.ServiceVersion("2025-02-10");
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
              `https://training-session-runtime.sagemaker.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          if (_.getAttr(PartitionResult, "name") === "aws-cn" && UseFIPS === false) {
            return e(
              `https://training-session-runtime.sagemaker.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          if (_.getAttr(PartitionResult, "name") === "aws-us-gov" && UseFIPS === false) {
            return e(
              `https://training-session-runtime.sagemaker.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          if (UseFIPS === true) {
            return e(
              `https://training-session-runtime.sagemaker-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return e(
            `https://training-session-runtime.sagemaker.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
  '{"url":"https://training-session-runtime.sagemaker.{R}.api.aws","properties":{},"headers":{}}',
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

/** Span facts shared by every operation (com.distilled.telemetry#service). */
const TELEMETRY = {
  system: "aws-api",
  responseHeaders: [
    { header: "x-amzn-requestid", name: "aws.request_id" },
    { header: "x-amz-request-id", name: "aws.request_id" },
    { header: "x-amzn-request-id", name: "aws.request_id" },
    { header: "x-amz-id-2", name: "aws.extended_request_id" },
  ],
  prefix: "SageMakerTrainingSessionRuntime",
  service: "SageMakerTrainingSessionRuntime",
  propagate: TxXray.propagate,
} as const;

export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type TrainingSessionName = string;
export type IntegerList = number[];
export type EncodedTextChunkType = "encoded_text" | (string & {});
export interface EncodedTextChunk {
  tokens: number[];
  type: EncodedTextChunkType;
}
export type EncodedTextChunkList = EncodedTextChunk[];
export interface ModelInput {
  chunks: EncodedTextChunk[];
}
export type StopSequenceList = string[];
export interface SamplingParams {
  maxTokens: number;
  temperature?: number | undefined;
  topK?: number | undefined;
  topP?: number | undefined;
  seed?: number | undefined;
  stop?: string[] | undefined;
}
export interface SampleConfig {
  prompt: ModelInput;
  numSamples: number;
  samplingParams: SamplingParams;
  includePromptLogprobs?: boolean | undefined;
  topkPromptLogprobs?: number | undefined;
  modelPackageArn?: string | undefined;
}
export interface ComputeLogprobsConfig {
  prompt: ModelInput;
  modelPackageArn?: string | undefined;
}
export interface LoadWeightsForSamplingConfig {
  modelPackageArn: string;
}
export type SampleOperationConfig =
  | { sample: SampleConfig; computeLogprobs?: never; loadWeightsForSampling?: never }
  | { sample?: never; computeLogprobs: ComputeLogprobsConfig; loadWeightsForSampling?: never }
  | {
      sample?: never;
      computeLogprobs?: never;
      loadWeightsForSampling: LoadWeightsForSamplingConfig;
    };
export interface ExecuteSamplingOperationInput {
  trainingSessionName: string;
  operationConfig: SampleOperationConfig;
}
export type OperationId = string;
export interface ExecuteSamplingOperationOutput {
  operationId: string;
}
export type SequenceNumber = number;
export type ClientToken = string;
export type LossFnName = "cross_entropy" | "importance_sampling" | "ppo" | "cispo" | (string & {});
export interface TensorData {
  data: any;
  dtype: string;
  shape?: number[] | undefined;
}
export type TensorDataMap = { [key: string]: TensorData | undefined };
export interface Datum {
  modelInput: ModelInput;
  lossFnInputs?: { [key: string]: TensorData | undefined } | undefined;
}
export type DatumList = Datum[];
export interface ForwardConfig {
  lossFnName: LossFnName;
  datumList: Datum[];
  lossFnConfig?: any | undefined;
}
export interface ForwardBackwardConfig {
  lossFnName: LossFnName;
  datumList: Datum[];
  lossFnConfig?: any | undefined;
}
export interface AdamParamsConfig {
  learningRate: number;
  beta1?: number | undefined;
  beta2?: number | undefined;
  eps?: number | undefined;
  weightDecay?: number | undefined;
  gradClipNorm?: number | undefined;
  loraPlusLrRatio?: number | undefined;
}
export interface OptimizerStepConfig {
  adamParamsConfig: AdamParamsConfig;
}
export interface SaveWeightsConfig {
  mergeWeights?: boolean | undefined;
  description?: string | undefined;
}
export interface SaveStateConfig {
  description?: string | undefined;
}
export interface LoadStateConfig {
  modelPackageArn: string;
  loadOptimizer: boolean;
}
export type OperationConfig =
  | {
      forward: ForwardConfig;
      forwardBackward?: never;
      optimizerStep?: never;
      saveWeights?: never;
      saveState?: never;
      loadState?: never;
    }
  | {
      forward?: never;
      forwardBackward: ForwardBackwardConfig;
      optimizerStep?: never;
      saveWeights?: never;
      saveState?: never;
      loadState?: never;
    }
  | {
      forward?: never;
      forwardBackward?: never;
      optimizerStep: OptimizerStepConfig;
      saveWeights?: never;
      saveState?: never;
      loadState?: never;
    }
  | {
      forward?: never;
      forwardBackward?: never;
      optimizerStep?: never;
      saveWeights: SaveWeightsConfig;
      saveState?: never;
      loadState?: never;
    }
  | {
      forward?: never;
      forwardBackward?: never;
      optimizerStep?: never;
      saveWeights?: never;
      saveState: SaveStateConfig;
      loadState?: never;
    }
  | {
      forward?: never;
      forwardBackward?: never;
      optimizerStep?: never;
      saveWeights?: never;
      saveState?: never;
      loadState: LoadStateConfig;
    };
export interface ExecuteTrainingOperationInput {
  trainingSessionName: string;
  sequenceNumber: number;
  clientToken?: string | undefined;
  operationConfig: OperationConfig;
}
export interface ExecuteTrainingOperationOutput {
  operationId: string;
}
export interface GetSamplingOperationResultInput {
  trainingSessionName: string;
  operationId: string;
}
export type RequestStatus =
  | "Pending"
  | "InProgress"
  | "Completed"
  | "Failed"
  | "Skipped"
  | (string & {});
export type StopReason = "stop" | "length" | (string & {});
export type DoubleList = number[];
export interface SampleTokenUsage {
  prefill: number;
  decode: number;
}
export interface SampledSequence {
  stopReason: StopReason;
  tokens: number[];
  logprobs?: number[] | undefined;
  tokenUsage?: SampleTokenUsage | undefined;
}
export type SampledSequenceList = SampledSequence[];
export interface TokenLogprob {
  tokenId: number;
  logprob: number;
}
export type TokenLogprobList = TokenLogprob[];
export type TopkPromptLogprobsList = TokenLogprob[][];
export interface SampleResponse {
  sequences: SampledSequence[];
  promptLogprobs?: number[] | undefined;
  topkPromptLogprobs?: TokenLogprob[][] | undefined;
}
export interface ComputeLogprobsResult {
  logprobs: number[];
}
export interface LoadWeightsForSamplingResult {}
export type SampleOperationResult =
  | { sample: SampleResponse; computeLogprobs?: never; loadWeightsForSampling?: never }
  | { sample?: never; computeLogprobs: ComputeLogprobsResult; loadWeightsForSampling?: never }
  | {
      sample?: never;
      computeLogprobs?: never;
      loadWeightsForSampling: LoadWeightsForSamplingResult;
    };
export interface GetSamplingOperationResultOutput {
  status: RequestStatus;
  operationResult?: SampleOperationResult | undefined;
  errorDetails?: string | undefined;
}
export interface GetTrainingOperationResultInput {
  trainingSessionName: string;
  operationId: string;
}
export type TensorDataMapList = { [key: string]: TensorData | undefined }[];
export type MetricsMap = { [key: string]: number | undefined };
export interface TrainingTokenUsage {
  trainingTokens?: number | undefined;
}
export interface ForwardResult {
  lossFnOutputType?: string | undefined;
  lossFnOutputs?: { [key: string]: TensorData | undefined }[] | undefined;
  metrics?: { [key: string]: number | undefined } | undefined;
  tokenUsage?: TrainingTokenUsage | undefined;
}
export interface ForwardBackwardResult {
  lossFnOutputType?: string | undefined;
  lossFnOutputs?: { [key: string]: TensorData | undefined }[] | undefined;
  metrics?: { [key: string]: number | undefined } | undefined;
  tokenUsage?: TrainingTokenUsage | undefined;
}
export interface OptimizerStepResult {
  metrics?: { [key: string]: number | undefined } | undefined;
}
export interface SaveWeightsResult {
  modelPackageArn?: string | undefined;
}
export interface SaveStateResult {
  modelPackageArn: string;
}
export interface LoadStateResult {}
export type OperationResult =
  | {
      forward: ForwardResult;
      forwardBackward?: never;
      optimizerStep?: never;
      saveWeights?: never;
      saveState?: never;
      loadState?: never;
    }
  | {
      forward?: never;
      forwardBackward: ForwardBackwardResult;
      optimizerStep?: never;
      saveWeights?: never;
      saveState?: never;
      loadState?: never;
    }
  | {
      forward?: never;
      forwardBackward?: never;
      optimizerStep: OptimizerStepResult;
      saveWeights?: never;
      saveState?: never;
      loadState?: never;
    }
  | {
      forward?: never;
      forwardBackward?: never;
      optimizerStep?: never;
      saveWeights: SaveWeightsResult;
      saveState?: never;
      loadState?: never;
    }
  | {
      forward?: never;
      forwardBackward?: never;
      optimizerStep?: never;
      saveWeights?: never;
      saveState: SaveStateResult;
      loadState?: never;
    }
  | {
      forward?: never;
      forwardBackward?: never;
      optimizerStep?: never;
      saveWeights?: never;
      saveState?: never;
      loadState: LoadStateResult;
    };
export interface GetTrainingOperationResultOutput {
  status: RequestStatus;
  operationResult?: OperationResult | undefined;
  errorDetails?: string | undefined;
  tokenUsage?: TrainingTokenUsage | undefined;
}
export interface SampleTrainingSessionInput {
  trainingSessionName: string;
  contentType?: string | undefined;
  accept?: string | undefined;
  modelPackageArn?: string | undefined;
  body?: T.StreamingInputBody | undefined;
}
export interface SampleTrainingSessionOutput {
  contentType?: string | undefined;
  body: T.StreamingOutputBody;
}
export interface SampleTrainingSessionWithResponseStreamInput {
  trainingSessionName: string;
  contentType?: string | undefined;
  accept?: string | undefined;
  modelPackageArn?: string | undefined;
  body?: T.StreamingInputBody | undefined;
}
export interface SampleTrainingSessionWithResponseStreamOutput {
  contentType?: string | undefined;
  body: T.StreamingOutputBody;
}
export type ExecuteSamplingOperationError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Submits an asynchronous sampling operation to generate text or compute log-probabilities from the model associated with the specified training session. The session must be in `Running` or `Blocked` state. Use `GetSamplingOperationResult` to poll for the result.
 */
export const executeSamplingOperation: API.OperationMethod<
  ExecuteSamplingOperationInput & RegionInput,
  ExecuteSamplingOperationOutput,
  ExecuteSamplingOperationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(21, __c1, 5) as any as S.Schema<ExecuteSamplingOperationInput>,
  output: __S(35, __c2, 3) as any as S.Schema<ExecuteSamplingOperationOutput>,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ExecuteSamplingOperation",
  telemetry: TELEMETRY,
  span: "ExecuteSamplingOperation",
}));

export type ExecuteTrainingOperationError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Submits an asynchronous training operation to the specified training session. The service executes operations in sequence number order. The session must be in `Running` or `Blocked` state. Use `GetTrainingOperationResult` to poll for the result. Supported operation types: `forward`, `forwardBackward`, `optimizerStep`, `saveWeights`, `saveState`, and `loadState`.
 */
export const executeTrainingOperation: API.OperationMethod<
  ExecuteTrainingOperationInput & RegionInput,
  ExecuteTrainingOperationOutput,
  ExecuteTrainingOperationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(89, __c5, 9) as any as S.Schema<ExecuteTrainingOperationInput>,
  output: __S(35, __c2, 3) as any as S.Schema<ExecuteTrainingOperationOutput>,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ExecuteTrainingOperation",
  telemetry: TELEMETRY,
  span: "ExecuteTrainingOperation",
}));

export type GetSamplingOperationResultError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the current status and result of a previously submitted sampling operation. Poll this operation until the status reaches a terminal state (Completed or Failed).
 */
export const getSamplingOperationResult: API.OperationMethod<
  GetSamplingOperationResultInput & RegionInput,
  GetSamplingOperationResultOutput,
  GetSamplingOperationResultError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(112, __c7, 0) as any as S.Schema<GetSamplingOperationResultInput>,
  output: __S(122, __c7, 10) as any as S.Schema<GetSamplingOperationResultOutput>,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSamplingOperationResult",
  telemetry: TELEMETRY,
  span: "GetSamplingOperationResult",
}));

export type GetTrainingOperationResultError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the current status and result of a previously submitted training operation. Poll this operation until the status reaches a terminal state (Completed, Failed, or Skipped).
 */
export const getTrainingOperationResult: API.OperationMethod<
  GetTrainingOperationResultInput & RegionInput,
  GetTrainingOperationResultOutput,
  GetTrainingOperationResultError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(144, __c9, 0) as any as S.Schema<GetTrainingOperationResultInput>,
  output: __S(152, __c9, 8) as any as S.Schema<GetTrainingOperationResultOutput>,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTrainingOperationResult",
  telemetry: TELEMETRY,
  span: "GetTrainingOperationResult",
}));

export type SampleTrainingSessionError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Sends an inference request to the model associated with the specified training session and returns the response synchronously. The service passes the request and response bodies to and from the model without modification.
 */
export const sampleTrainingSession: API.OperationMethod<
  SampleTrainingSessionInput & RegionInput,
  SampleTrainingSessionOutput,
  SampleTrainingSessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(160, __c10, 0) as any as S.Schema<SampleTrainingSessionInput>,
  output: __S(176, __c11, 0) as any as S.Schema<SampleTrainingSessionOutput>,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SampleTrainingSession",
  telemetry: TELEMETRY,
  span: "SampleTrainingSession",
}));

export type SampleTrainingSessionWithResponseStreamError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Streams inference responses from the model associated with the specified training session. Use this operation for real-time token-by-token generation. The service passes the request body to the model without modification.
 */
export const sampleTrainingSessionWithResponseStream: API.OperationMethod<
  SampleTrainingSessionWithResponseStreamInput & RegionInput,
  SampleTrainingSessionWithResponseStreamOutput,
  SampleTrainingSessionWithResponseStreamError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<SampleTrainingSessionWithResponseStreamInput>,
  output: __S(176, __c11, 0) as any as S.Schema<SampleTrainingSessionWithResponseStreamOutput>,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SampleTrainingSessionWithResponseStream",
  telemetry: TELEMETRY,
  span: "SampleTrainingSessionWithResponseStream",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          trainingSessionName: S.String.pipe(T.HttpLabel("trainingSessionName")),
          contentType: S.optional(S.String).pipe(T.HttpHeader("Content-Type")),
          accept: S.optional(S.String).pipe(T.HttpHeader("Accept")),
          modelPackageArn: S.optional(S.String).pipe(
            T.HttpHeader("X-Amzn-SageMaker-Model-Package"),
          ),
          body: S.optional(T.StreamingInput).pipe(T.HttpPayload()),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/training-sessions/{trainingSessionName}/sample-with-response-stream",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "SampleTrainingSessionWithResponseStreamInput" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
    case 1:
      return S.suspend(() =>
        S.Struct({
          maxTokens: S.Number,
          temperature: S.optional(S.Number),
          topK: S.optional(S.Number),
          topP: S.optional(S.Number),
          seed: S.optional(S.Number),
          stop: S.optional(__S(16, __c1, 0)),
        }),
      ).annotate({ identifier: "SamplingParams" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          prompt: __S(34, __c2, 2),
          numSamples: S.Number,
          samplingParams: __S(17, __c1, 1),
          includePromptLogprobs: S.optional(S.Boolean),
          topkPromptLogprobs: S.optional(S.Number),
          modelPackageArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "SampleConfig" });
    case 3:
      return S.suspend(() =>
        S.Struct({ prompt: __S(34, __c2, 2), modelPackageArn: S.optional(S.String) }),
      ).annotate({ identifier: "ComputeLogprobsConfig" });
    case 4:
      return S.Union([
        /*@__PURE__*/ S.Struct({ sample: __S(18, __c1, 2) }),
        /*@__PURE__*/ S.Struct({ computeLogprobs: __S(19, __c1, 3) }),
        /*@__PURE__*/ S.Struct({ loadWeightsForSampling: __S(64, __c4, 0) }),
      ]);
    case 5:
      return S.suspend(() =>
        S.Struct({
          trainingSessionName: S.String.pipe(T.HttpLabel("trainingSessionName")),
          operationConfig: __S(20, __c1, 4),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/v1/training-sessions/{trainingSessionName}/sampling-operations",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ExecuteSamplingOperationInput" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ tokens: __S(48, __c3, 0), type: S.String })).annotate({
        identifier: "EncodedTextChunk",
      });
    case 1:
      return S.Array(__S(32, __c2, 0));
    case 2:
      return S.suspend(() => S.Struct({ chunks: __S(33, __c2, 1) })).annotate({
        identifier: "ModelInput",
      });
    case 3:
      return S.suspend(() => S.Struct({ operationId: S.String })).annotate({
        identifier: "ExecuteSamplingOperationOutput",
      });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.Number);
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ modelPackageArn: S.String })).annotate({
        identifier: "LoadWeightsForSamplingConfig",
      });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ modelInput: __S(34, __c2, 2), lossFnInputs: S.optional(__S(97, __c6, 1)) }),
      ).annotate({ identifier: "Datum" });
    case 1:
      return S.Array(__S(80, __c5, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          lossFnName: S.String,
          datumList: __S(81, __c5, 1),
          lossFnConfig: S.optional(S.Any),
        }),
      ).annotate({ identifier: "ForwardConfig" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          learningRate: S.Number,
          beta1: S.optional(S.Number),
          beta2: S.optional(S.Number),
          eps: S.optional(S.Number),
          weightDecay: S.optional(S.Number),
          gradClipNorm: S.optional(S.Number),
          loraPlusLrRatio: S.optional(S.Number),
        }),
      ).annotate({ identifier: "AdamParamsConfig" });
    case 4:
      return S.suspend(() => S.Struct({ adamParamsConfig: __S(83, __c5, 3) })).annotate({
        identifier: "OptimizerStepConfig",
      });
    case 5:
      return S.suspend(() =>
        S.Struct({ mergeWeights: S.optional(S.Boolean), description: S.optional(S.String) }),
      ).annotate({ identifier: "SaveWeightsConfig" });
    case 6:
      return S.suspend(() => S.Struct({ description: S.optional(S.String) })).annotate({
        identifier: "SaveStateConfig",
      });
    case 7:
      return S.suspend(() =>
        S.Struct({ modelPackageArn: S.String, loadOptimizer: S.Boolean }),
      ).annotate({ identifier: "LoadStateConfig" });
    case 8:
      return S.Union([
        /*@__PURE__*/ S.Struct({ forward: __S(82, __c5, 2) }),
        /*@__PURE__*/ S.Struct({ forwardBackward: __S(82, __c5, 2) }),
        /*@__PURE__*/ S.Struct({ optimizerStep: __S(84, __c5, 4) }),
        /*@__PURE__*/ S.Struct({ saveWeights: __S(85, __c5, 5) }),
        /*@__PURE__*/ S.Struct({ saveState: __S(86, __c5, 6) }),
        /*@__PURE__*/ S.Struct({ loadState: __S(87, __c5, 7) }),
      ]);
    case 9:
      return S.suspend(() =>
        S.Struct({
          trainingSessionName: S.String.pipe(T.HttpLabel("trainingSessionName")),
          sequenceNumber: S.Number,
          clientToken: S.optional(S.String),
          operationConfig: __S(88, __c5, 8),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/v1/training-sessions/{trainingSessionName}/operations",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ExecuteTrainingOperationInput" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ data: S.Any, dtype: S.String, shape: S.optional(__S(48, __c3, 0)) }),
      ).annotate({ identifier: "TensorData" });
    case 1:
      return S.Record(S.String, /*@__PURE__*/ __S(96, __c6, 0).pipe(S.optional));
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          trainingSessionName: S.String.pipe(T.HttpLabel("trainingSessionName")),
          operationId: S.String.pipe(T.HttpLabel("operationId")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/v1/training-sessions/{trainingSessionName}/sampling-operations/{operationId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetSamplingOperationResultInput" });
    case 1:
      return S.suspend(() => S.Struct({ prefill: S.Number, decode: S.Number })).annotate({
        identifier: "SampleTokenUsage",
      });
    case 2:
      return S.suspend(() =>
        S.Struct({
          stopReason: S.String,
          tokens: __S(48, __c3, 0),
          logprobs: S.optional(__S(48, __c3, 0)),
          tokenUsage: S.optional(__S(113, __c7, 1)),
        }),
      ).annotate({ identifier: "SampledSequence" });
    case 3:
      return S.Array(__S(114, __c7, 2));
    case 4:
      return S.suspend(() => S.Struct({ tokenId: S.Number, logprob: S.Number })).annotate({
        identifier: "TokenLogprob",
      });
    case 5:
      return S.Array(__S(116, __c7, 4));
    case 6:
      return S.Array(__S(117, __c7, 5));
    case 7:
      return S.suspend(() =>
        S.Struct({
          sequences: __S(115, __c7, 3),
          promptLogprobs: S.optional(__S(48, __c3, 0)),
          topkPromptLogprobs: S.optional(__S(118, __c7, 6)),
        }),
      ).annotate({ identifier: "SampleResponse" });
    case 8:
      return S.suspend(() => S.Struct({ logprobs: __S(48, __c3, 0) })).annotate({
        identifier: "ComputeLogprobsResult",
      });
    case 9:
      return S.Union([
        /*@__PURE__*/ S.Struct({ sample: __S(119, __c7, 7) }),
        /*@__PURE__*/ S.Struct({ computeLogprobs: __S(120, __c7, 8) }),
        /*@__PURE__*/ S.Struct({ loadWeightsForSampling: __S(128, __c8, 0) }),
      ]);
    case 10:
      return S.suspend(() =>
        S.Struct({
          status: S.String,
          operationResult: S.optional(__S(121, __c7, 9)),
          errorDetails: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetSamplingOperationResultOutput" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "LoadWeightsForSamplingResult" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          trainingSessionName: S.String.pipe(T.HttpLabel("trainingSessionName")),
          operationId: S.String.pipe(T.HttpLabel("operationId")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/v1/training-sessions/{trainingSessionName}/operations/{operationId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetTrainingOperationResultInput" });
    case 1:
      return S.Array(__S(97, __c6, 1));
    case 2:
      return S.Record(S.String, /*@__PURE__*/ S.Number.pipe(S.optional));
    case 3:
      return S.suspend(() => S.Struct({ trainingTokens: S.optional(S.Number) })).annotate({
        identifier: "TrainingTokenUsage",
      });
    case 4:
      return S.suspend(() =>
        S.Struct({
          lossFnOutputType: S.optional(S.String),
          lossFnOutputs: S.optional(__S(145, __c9, 1)),
          metrics: S.optional(__S(146, __c9, 2)),
          tokenUsage: S.optional(__S(147, __c9, 3)),
        }),
      ).annotate({ identifier: "ForwardResult" });
    case 5:
      return S.suspend(() => S.Struct({ metrics: S.optional(__S(146, __c9, 2)) })).annotate({
        identifier: "OptimizerStepResult",
      });
    case 6:
      return S.suspend(() => S.Struct({ modelPackageArn: S.optional(S.String) })).annotate({
        identifier: "SaveWeightsResult",
      });
    case 7:
      return S.Union([
        /*@__PURE__*/ S.Struct({ forward: __S(148, __c9, 4) }),
        /*@__PURE__*/ S.Struct({ forwardBackward: __S(148, __c9, 4) }),
        /*@__PURE__*/ S.Struct({ optimizerStep: __S(149, __c9, 5) }),
        /*@__PURE__*/ S.Struct({ saveWeights: __S(150, __c9, 6) }),
        /*@__PURE__*/ S.Struct({ saveState: __S(64, __c4, 0) }),
        /*@__PURE__*/ S.Struct({ loadState: __S(128, __c8, 0) }),
      ]);
    case 8:
      return S.suspend(() =>
        S.Struct({
          status: S.String,
          operationResult: S.optional(__S(151, __c9, 7)),
          errorDetails: S.optional(S.String),
          tokenUsage: S.optional(__S(147, __c9, 3)),
        }),
      ).annotate({ identifier: "GetTrainingOperationResultOutput" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          trainingSessionName: S.String.pipe(T.HttpLabel("trainingSessionName")),
          contentType: S.optional(S.String).pipe(T.HttpHeader("Content-Type")),
          accept: S.optional(S.String).pipe(T.HttpHeader("Accept")),
          modelPackageArn: S.optional(S.String).pipe(
            T.HttpHeader("X-Amzn-SageMaker-Model-Package"),
          ),
          body: S.optional(T.StreamingInput).pipe(T.HttpPayload()),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/training-sessions/{trainingSessionName}/sample" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "SampleTrainingSessionInput" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          contentType: S.optional(S.String).pipe(T.HttpHeader("Content-Type")),
          body: T.StreamingOutput.pipe(T.HttpPayload()),
        }),
      ).annotate({ identifier: "SampleTrainingSessionOutput" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
