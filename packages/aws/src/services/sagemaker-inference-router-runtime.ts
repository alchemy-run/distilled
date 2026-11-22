import * as API from "@distilled.cloud/core/api";
import * as S from "@distilled.cloud/core/schema-lite";
import * as __L from "@distilled.cloud/core/schema-lite";
import * as TxXray from "@distilled.cloud/core/telemetry-xray";
import type * as HttpClient from "effect/http/HttpClient";
import type * as redacted from "effect/Redacted";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import { AwsServiceErrors } from "../errors.ts";
import { AwsProtocol } from "../protocol.ts";
import type { RegionInput } from "../region.ts";
import { Retry } from "../retry.ts";
import { SensitiveString } from "../sensitive.ts";
import * as T from "../traits.ts";
// Schema table, filled on first reach (see __S at the end).
const __s: any[] = [];
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "SageMaker Inference Router Runtime",
  serviceShapeName: "SageMakerInferenceRouterRuntime",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "sagemaker" });
const ver = /*@__PURE__*/ T.ServiceVersion("2026-01-01");
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
        if (
          _.getAttr(PartitionResult, "name") === "aws" &&
          UseFIPS === false &&
          UseDualStack === false
        ) {
          return e(
            `https://inferencerouter-runtime.sagemaker.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
        if (
          _.getAttr(PartitionResult, "name") === "aws" &&
          UseFIPS === false &&
          UseDualStack === true
        ) {
          return e(
            `https://inferencerouter-runtime.sagemaker.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
          );
        }
        if (UseFIPS === true && UseDualStack === true) {
          if (
            true === _.getAttr(PartitionResult, "supportsFIPS") &&
            true === _.getAttr(PartitionResult, "supportsDualStack")
          ) {
            return e(
              `https://inferencerouter-runtime.sagemaker-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true && UseDualStack === false) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://inferencerouter-runtime.sagemaker-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseFIPS === false && UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://inferencerouter-runtime.sagemaker.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(
          `https://inferencerouter-runtime.sagemaker.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://inferencerouter-runtime.sagemaker.{R}.{D}","properties":{},"headers":{}}');

/** Span facts shared by every operation (com.distilled.telemetry#service). */
const TELEMETRY = {
  system: "aws-api",
  responseHeaders: [
    { header: "x-amzn-requestid", name: "aws.request_id" },
    { header: "x-amz-request-id", name: "aws.request_id" },
    { header: "x-amzn-request-id", name: "aws.request_id" },
    { header: "x-amz-id-2", name: "aws.extended_request_id" },
  ],
  prefix: "SageMakerInferenceRouterRuntime",
  service: "SageMakerInferenceRouterRuntime",
  propagate: TxXray.propagate,
} as const;

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class InternalDependencyException
  extends /*@__PURE__*/ S.TaggedError<InternalDependencyException>()(
    "InternalDependencyException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(530),
  ).pipe(C.withServerError) {}
export class InternalFailure
  extends /*@__PURE__*/ S.TaggedError<InternalFailure>()(
    "InternalFailure",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError, C.withRetryableError) {}
export class ModelError
  extends /*@__PURE__*/ S.TaggedError<ModelError>()(
    "ModelError",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      OriginalStatusCode: /*@__PURE__*/ S.optional(S.Number),
      OriginalMessage: /*@__PURE__*/ S.optional(S.String),
      LogStreamArn: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(424),
  ) {}
export class ModelNotReadyException
  extends /*@__PURE__*/ S.TaggedError<ModelNotReadyException>()(
    "ModelNotReadyException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.HttpError(429),
      /*@__PURE__*/ T.Retryable({ throttling: true }),
    ),
  ).pipe(C.withThrottlingError, C.withRetryableError) {}
export class RequestTimeoutException
  extends /*@__PURE__*/ S.TaggedError<RequestTimeoutException>()(
    "RequestTimeoutException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(/*@__PURE__*/ T.HttpError(408), /*@__PURE__*/ T.Retryable()),
  ).pipe(C.withTimeoutError, C.withRetryableError) {}
export class ServiceUnavailableException
  extends /*@__PURE__*/ S.TaggedError<ServiceUnavailableException>()(
    "ServiceUnavailableException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(503),
  ).pipe(C.withServerError, C.withRetryableError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.HttpError(429),
      /*@__PURE__*/ T.Retryable({ throttling: true }),
    ),
  ).pipe(C.withThrottlingError, C.withRetryableError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type CustomAttributesHeader = string | redacted.Redacted<string>;
export interface InvokeInferenceRouterInput {
  InferenceRouterName: string;
  RoutingTargetName: string;
  ContentType?: string | undefined;
  Accept?: string | undefined;
  InferenceId?: string | undefined;
  PrefixAwareId?: string | undefined;
  CustomAttributes?: string | redacted.Redacted<string> | undefined;
  Body: T.StreamingInputBody;
}
export interface InvokeInferenceRouterOutput {
  Body?: T.StreamingOutputBody | undefined;
  ContentType?: string | undefined;
  InvokedRoutedResourceArn?: string | undefined;
  RoutingReason?: string | undefined;
  InvokedProductionVariant?: string | undefined;
  CustomAttributes?: string | redacted.Redacted<string> | undefined;
}
export interface InvokeInferenceRouterAsyncInput {
  InferenceRouterName: string;
  RoutingTargetName: string;
  ContentType?: string | undefined;
  Accept?: string | undefined;
  CustomAttributes?: string | redacted.Redacted<string> | undefined;
  InferenceId?: string | undefined;
  InputLocation: string;
  S3OutputPathExtension?: string | undefined;
  Filename?: string | undefined;
  RequestTTLSeconds?: number | undefined;
  InvocationTimeoutSeconds?: number | undefined;
}
export interface InvokeInferenceRouterAsyncOutput {
  InferenceId?: string | undefined;
  OutputLocation?: string | undefined;
  FailureLocation?: string | undefined;
}
export type InvokeInferenceRouterError =
  | AccessDeniedException
  | InternalDependencyException
  | InternalFailure
  | ModelError
  | ModelNotReadyException
  | RequestTimeoutException
  | ServiceUnavailableException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Sends a real-time inference request to an inference router. In the request, you name the routing target, and the router sends the request to one of the routing target's destinations. The response includes the destination that served the request and the reason that the router chose it.
 *
 * The following limits apply:
 *
 * - The maximum request payload is 6 MB. A request with a larger body fails with HTTP status code 413.
 *
 * - Your model has up to 60 seconds for each attempt, the same limit as `InvokeEndpoint`. If your account has a higher model execution timeout for `InvokeEndpoint`, it doesn't apply through an inference router. For models that take longer, use `InvokeInferenceRouterAsync`.
 *
 * If a destination returns an error that the router can retry, such as a throttling error, before your model produces a response, the router retries the request once on another destination. A request that times out on a destination isn't retried. Because a request can make two attempts, set your client read timeout to at least 170 seconds.
 *
 * The caller needs permission to invoke the inference router and every destination of the routing target. For information about permissions, see Route requests across Regions with inference routers.
 */
export const invokeInferenceRouter: API.OperationMethod<
  InvokeInferenceRouterInput & RegionInput,
  InvokeInferenceRouterOutput,
  InvokeInferenceRouterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2, __c1, 0) as any as S.Schema<InvokeInferenceRouterInput>,
  output: __S(3, __c1, 1) as any as S.Schema<InvokeInferenceRouterOutput>,
  errors: [
    AccessDeniedException,
    InternalDependencyException,
    InternalFailure,
    ModelError,
    ModelNotReadyException,
    RequestTimeoutException,
    ServiceUnavailableException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "InvokeInferenceRouter",
  telemetry: TELEMETRY,
  span: "InvokeInferenceRouter",
}));

export type InvokeInferenceRouterAsyncError =
  | AccessDeniedException
  | InternalFailure
  | RequestTimeoutException
  | ServiceUnavailableException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Submits an asynchronous inference request to an inference router. Before you call this operation, upload the input data to Amazon S3 in the router's Amazon Web Services Region. The router returns as soon as it accepts the request, and sends the request to one of the destinations of the routing target. The destination reads the input from Amazon S3, and the inference response is written to the Amazon S3 output path that the routing target specifies.
 *
 * If a destination doesn't start the request within the routing target's `MaxTimeInBacklogSeconds`, the router moves the request to another destination. After your model starts processing the request, the request doesn't move. If no destination can take the request before `RequestTTLSeconds` runs out, or every destination has been tried, the router writes a failure object to the `FailureLocation` and publishes a notification to the routing target's error topic, if one is configured.
 *
 * For information about the permissions that the caller and each destination need, see Send asynchronous requests through an inference router.
 */
export const invokeInferenceRouterAsync: API.OperationMethod<
  InvokeInferenceRouterAsyncInput & RegionInput,
  InvokeInferenceRouterAsyncOutput,
  InvokeInferenceRouterAsyncError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<InvokeInferenceRouterAsyncInput>,
  output: __S(1, __c0, 1) as any as S.Schema<InvokeInferenceRouterAsyncOutput>,
  errors: [
    AccessDeniedException,
    InternalFailure,
    RequestTimeoutException,
    ServiceUnavailableException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "InvokeInferenceRouterAsync",
  telemetry: TELEMETRY,
  span: "InvokeInferenceRouterAsync",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          InferenceRouterName: S.String.pipe(T.HttpLabel("InferenceRouterName")),
          RoutingTargetName: S.String.pipe(T.HttpHeader("X-Amzn-SageMaker-Routing-Target-Name")),
          ContentType: S.optional(S.String).pipe(T.HttpHeader("X-Amzn-SageMaker-Content-Type")),
          Accept: S.optional(S.String).pipe(T.HttpHeader("X-Amzn-SageMaker-Accept")),
          CustomAttributes: S.optional(SensitiveString).pipe(
            T.HttpHeader("X-Amzn-SageMaker-Custom-Attributes"),
          ),
          InferenceId: S.optional(S.String).pipe(T.HttpHeader("X-Amzn-SageMaker-Inference-Id")),
          InputLocation: S.String.pipe(T.HttpHeader("X-Amzn-SageMaker-InputLocation")),
          S3OutputPathExtension: S.optional(S.String).pipe(
            T.HttpHeader("X-Amzn-SageMaker-S3OutputPathExtension"),
          ),
          Filename: S.optional(S.String).pipe(T.HttpHeader("X-Amzn-SageMaker-Filename")),
          RequestTTLSeconds: S.optional(S.Number).pipe(
            T.HttpHeader("X-Amzn-SageMaker-RequestTTLSeconds"),
          ),
          InvocationTimeoutSeconds: S.optional(S.Number).pipe(
            T.HttpHeader("X-Amzn-SageMaker-InvocationTimeoutSeconds"),
          ),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/inference-routers/{InferenceRouterName}/async-invocations",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "InvokeInferenceRouterAsyncInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          InferenceId: S.optional(S.String),
          OutputLocation: S.optional(S.String).pipe(
            T.HttpHeader("X-Amzn-SageMaker-OutputLocation"),
          ),
          FailureLocation: S.optional(S.String).pipe(
            T.HttpHeader("X-Amzn-SageMaker-FailureLocation"),
          ),
        }),
      ).annotate({ identifier: "InvokeInferenceRouterAsyncOutput" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          InferenceRouterName: S.String.pipe(T.HttpLabel("InferenceRouterName")),
          RoutingTargetName: S.String.pipe(T.HttpHeader("X-Amzn-SageMaker-Routing-Target-Name")),
          ContentType: S.optional(S.String).pipe(T.HttpHeader("Content-Type")),
          Accept: S.optional(S.String).pipe(T.HttpHeader("Accept")),
          InferenceId: S.optional(S.String).pipe(T.HttpHeader("X-Amzn-SageMaker-Inference-Id")),
          PrefixAwareId: S.optional(S.String).pipe(
            T.HttpHeader("X-Amzn-SageMaker-Prefix-Aware-Id"),
          ),
          CustomAttributes: S.optional(SensitiveString).pipe(
            T.HttpHeader("X-Amzn-SageMaker-Custom-Attributes"),
          ),
          Body: T.StreamingInput.pipe(T.HttpPayload()),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/inference-routers/{InferenceRouterName}/invocations" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "InvokeInferenceRouterInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Body: S.optional(T.StreamingOutput).pipe(T.HttpPayload()),
          ContentType: S.optional(S.String).pipe(T.HttpHeader("Content-Type")),
          InvokedRoutedResourceArn: S.optional(S.String).pipe(
            T.HttpHeader("X-Amzn-SageMaker-Invoked-Routed-Resource-Arn"),
          ),
          RoutingReason: S.optional(S.String).pipe(
            T.HttpHeader("X-Amzn-SageMaker-Invoked-Routing-Reason"),
          ),
          InvokedProductionVariant: S.optional(S.String).pipe(
            T.HttpHeader("X-Amzn-Invoked-Production-Variant"),
          ),
          CustomAttributes: S.optional(SensitiveString).pipe(
            T.HttpHeader("X-Amzn-SageMaker-Custom-Attributes"),
          ),
        }),
      ).annotate({ identifier: "InvokeInferenceRouterOutput" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
